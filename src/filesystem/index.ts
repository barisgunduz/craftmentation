import fs from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { Failure, ioFailure } from '../shared/errors.js';
export const hash = (bytes: string | Uint8Array): string =>
  createHash('sha256').update(bytes).digest('hex');
const forbidden = new Set([
  '.git',
  '.ssh',
  '.aws',
  '.gnupg',
  'node_modules',
  'vendor',
  'dist',
  'build',
  'coverage',
  '__pycache__',
]);
export function safeRelative(value: string): string {
  if (
    !value ||
    value.length > 1024 ||
    /[\\:\x00-\x1f]/.test(value) ||
    value.startsWith('/') ||
    value.startsWith('~') ||
    value
      .split('/')
      .some(
        (s) =>
          !s ||
          s === '.' ||
          s === '..' ||
          /[. ]$/.test(s) ||
          /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(?:\.|$)/i.test(s),
      )
  )
    throw new Failure(
      'E_PATH',
      3,
      'Expected a portable root-relative path without traversal or reserved names.',
    );
  if (
    value
      .split('/')
      .some(
        (s) =>
          forbidden.has(s.toLowerCase()) ||
          (/^\.env(?:\.|$)/i.test(s) && !/\.(example|sample|template)$/i.test(s)) ||
          /(?:credentials|id_rsa|id_ed25519)|\.(pem|key|p12|pfx)$/i.test(s),
      )
  )
    throw new Failure('E_PATH', 3, 'Protected paths cannot be inspected or written.');
  return value;
}
const same = (a: { dev: number; ino: number }, b: { dev: number; ino: number }) =>
  a.dev === b.dev && a.ino === b.ino;
export class SafeFS {
  private constructor(
    public root: string,
    private identity: { dev: number; ino: number },
  ) {}
  static async open(root: string): Promise<SafeFS> {
    try {
      const stat = await fs.lstat(path.resolve(root));
      if (stat.isSymbolicLink() || !stat.isDirectory())
        throw new Failure('E_PATH', 3, 'Root must be a regular directory, not a symlink.');
      return new SafeFS(await fs.realpath(root), stat);
    } catch (e) {
      throw ioFailure(e);
    }
  }
  async resolve(relative: string, absent = false): Promise<string> {
    safeRelative(relative);
    try {
      if (!same(await fs.lstat(this.root), this.identity))
        throw new Failure('E_CONCURRENT', 3, 'Root identity changed.');
      let current = this.root;
      const parts = relative.split('/');
      for (const [index, part] of parts.entries()) {
        const names: string[] = [];
        for await (const entry of await fs.opendir(current)) {
          names.push(entry.name);
          if (names.length > 10000)
            throw new Failure('E_SCAN_LIMIT', 4, 'Directory exceeds the inspection limit.');
        }
        if (names.some((n) => n !== part && n.toLowerCase() === part.toLowerCase()))
          throw new Failure('E_PATH', 3, 'Case-insensitive path collision.', relative);
        current = path.join(current, part);
        let stat;
        try {
          stat = await fs.lstat(current);
        } catch (e) {
          if (
            (e as NodeJS.ErrnoException).code === 'ENOENT' &&
            absent &&
            index === parts.length - 1
          )
            return current;
          throw e;
        }
        if (stat.isSymbolicLink())
          throw new Failure('E_SYMLINK', 3, 'Symlinks are not allowed.', relative);
        if (
          (index < parts.length - 1 && !stat.isDirectory()) ||
          (index === parts.length - 1 && !stat.isFile())
        )
          throw new Failure(
            'E_PATH',
            3,
            'Expected a regular file and existing parent directories.',
            relative,
          );
      }
      const real = await fs.realpath(current);
      if (
        path.relative(this.root, real).startsWith('..') ||
        path.isAbsolute(path.relative(this.root, real))
      )
        throw new Failure('E_PATH', 3, 'Path escapes the authorized root.', relative);
      return current;
    } catch (e) {
      throw ioFailure(e, relative);
    }
  }
  async exists(relative: string): Promise<boolean> {
    const resolved = await this.resolve(relative, true);
    try {
      await fs.lstat(resolved);
      return true;
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') return false;
      throw ioFailure(e, relative);
    }
  }
  async read(relative: string, max = 1024 * 1024): Promise<Buffer> {
    const resolved = await this.resolve(relative);
    let handle;
    try {
      const before = await fs.lstat(resolved);
      handle = await fs.open(resolved, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0));
      const opened = await handle.stat();
      if (!opened.isFile() || !same(before, opened))
        throw new Failure('E_CONCURRENT', 3, 'Source identity changed.', relative);
      if (opened.size > max)
        throw new Failure('E_SCAN_LIMIT', 4, 'File exceeds the read limit.', relative);
      const buffer = Buffer.alloc(Math.min(opened.size + 1, max + 1));
      const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
      const after = await handle.stat();
      await this.resolve(relative);
      if (bytesRead > max)
        throw new Failure('E_SCAN_LIMIT', 4, 'File exceeds the read limit.', relative);
      if (
        !same(opened, after) ||
        opened.size !== after.size ||
        opened.mtimeMs !== after.mtimeMs ||
        opened.ctimeMs !== after.ctimeMs ||
        bytesRead !== after.size
      )
        throw new Failure('E_CONCURRENT', 3, 'Source changed during inspection.', relative);
      return buffer.subarray(0, bytesRead);
    } catch (e) {
      throw ioFailure(e, relative);
    } finally {
      await handle?.close();
    }
  }
  async text(relative: string): Promise<string> {
    try {
      return new TextDecoder('utf-8', { fatal: true }).decode(await this.read(relative));
    } catch (e) {
      if (e instanceof Failure) throw e;
      throw new Failure('E_IO', 4, 'Expected valid UTF-8 text.', relative);
    }
  }
  async create(
    relative: string,
    bytes: string,
    dryRun: boolean,
    signal?: AbortSignal,
  ): Promise<boolean> {
    const interrupted = () => {
      if (signal?.aborted) throw new Failure('E_INTERRUPTED', 4, 'Operation interrupted.');
    };
    interrupted();
    if (Buffer.byteLength(bytes, 'utf8') > 1024 * 1024)
      throw new Failure('E_SCAN_LIMIT', 4, 'Generated document exceeds the 1 MiB output limit.');
    const dest = await this.resolve(relative, true);
    if (await this.exists(relative))
      throw new Failure(
        'E_EXISTS',
        3,
        'Output already exists; it will not be overwritten.',
        relative,
      );
    if (dryRun) return false;
    const parent = path.dirname(dest),
      parentStat = await fs.lstat(parent);
    const token = randomUUID(),
      lock = `${dest}.craftmentation.lock`,
      temp = `${dest}.craftmentation-${token}.tmp`;
    let lockHandle,
      stage,
      stageIdentity: { dev: number; ino: number } | undefined,
      lockIdentity: { dev: number; ino: number } | undefined,
      published = false;
    try {
      interrupted();
      lockHandle = await fs.open(lock, 'wx', 0o600);
      lockIdentity = await lockHandle.stat();
      await lockHandle.writeFile(token);
      stage = await fs.open(temp, 'wx', 0o600);
      stageIdentity = await stage.stat();
      await stage.writeFile(bytes, 'utf8');
      await stage.sync();
      await stage.close();
      stage = undefined;
      if (hash(await fs.readFile(temp)) !== hash(bytes))
        throw new Failure('E_IO', 4, 'Staging integrity check failed.', relative);
      await this.resolve(relative, true);
      if (!same(parentStat, await fs.lstat(parent)))
        throw new Failure('E_CONCURRENT', 3, 'Parent directory changed.', relative);
      interrupted();
      await fs.link(temp, dest);
      published = true;
    } catch (e) {
      const failure = ioFailure(e, relative);
      failure.data = { committed: published };
      throw failure;
    } finally {
      await stage?.close();
      try {
        if (lockHandle) {
          if (
            !same(lockIdentity!, await fs.lstat(lock)) ||
            (await fs.readFile(lock, 'utf8')) !== token
          )
            throw new Failure('E_CONCURRENT', 3, 'Lock ownership changed.', relative);
          if (stageIdentity) {
            if (!same(stageIdentity, await fs.lstat(temp)))
              throw new Failure('E_CONCURRENT', 3, 'Staging ownership changed.', relative);
            await fs.unlink(temp);
          }
          await lockHandle.close();
          lockHandle = undefined;
          await fs.unlink(lock);
        }
      } catch {
        throw new Failure('E_IO', 4, 'Owned operation cleanup failed.', relative, {
          committed: published,
        });
      } finally {
        await lockHandle?.close();
      }
    }
    return published;
  }
}

import fs from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { Failure } from '../shared/errors.js';

const packages = { codex: '@openai/codex', claude: '@anthropic-ai/claude-code' };

// Ignore npm's project-local bins and relative PATH entries. Clients must be trusted
// user/global installations, not executables supplied by the analyzed repository.
export function clientDirectories(searchPath: string, windows = process.platform === 'win32') {
  return searchPath
    .split(windows ? ';' : ':')
    .filter(
      (directory) =>
        path.isAbsolute(directory) && !/(^|[/\\])node_modules([/\\]|$)/i.test(directory),
    );
}

export async function resolveClient(
  agent: keyof typeof packages,
  directories: string[],
  windows = process.platform === 'win32',
): Promise<{ command: string; prefix: string[] }> {
  for (const directory of directories) {
    for (const suffix of windows ? ['.exe', '.com'] : ['']) {
      const candidate = path.join(directory, agent + suffix);
      try {
        if (!(await fs.stat(candidate)).isFile()) continue;
        await fs.access(candidate, windows ? constants.F_OK : constants.X_OK);
        return { command: candidate, prefix: [] };
      } catch {
        // Continue searching the trusted PATH.
      }
    }
    if (!windows) continue;
    // npm's Windows .cmd shims cannot be spawned without a shell. Read only the
    // known global package's bin metadata and invoke its JS entry with Node instead.
    try {
      const root = await fs.realpath(path.join(directory, 'node_modules', packages[agent]));
      const manifest = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'));
      if (manifest.name !== packages[agent]) continue;
      const entry = typeof manifest.bin === 'string' ? manifest.bin : manifest.bin?.[agent];
      if (typeof entry !== 'string' || !/\.(?:c|m)?js$/i.test(entry)) continue;
      const script = await fs.realpath(path.resolve(root, entry));
      const relative = path.relative(root, script);
      if (relative.startsWith('..') || path.isAbsolute(relative)) continue;
      if (!(await fs.stat(script)).isFile()) continue;
      return { command: process.execPath, prefix: [script] };
    } catch {
      // Missing, invalid, or unsupported global installation: fail closed.
    }
  }
  throw new Failure(
    'E_PROVIDER',
    6,
    'Trusted agent not found. Install the selected CLI globally or as a native user installation on PATH; project-local clients and shell shims are not executed.',
  );
}

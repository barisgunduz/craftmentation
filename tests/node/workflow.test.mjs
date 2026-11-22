import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { SafeFS, hash } from '../../dist/filesystem/index.js';
import { regions, wrap } from '../../dist/renderer/managed.js';
import { updatePlan } from '../../dist/generator/update.js';
import { assertSchema } from '../../dist/shared/library.js';
const root = fileURLToPath(new URL('../../', import.meta.url));
const cli = path.join(root, 'dist/cli/index.js');
async function fixture(t) {
  const dir = await fs.realpath(
    await fs.mkdtemp(path.join(os.tmpdir(), 'craftmentation-workflow-')),
  );
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  return dir;
}
function invoke(dir, ...args) {
  const result = spawnSync(process.execPath, [cli, ...args, '--root', dir, '--json'], {
    encoding: 'utf8',
    timeout: 20000,
  });
  assert.equal(result.error, undefined);
  assert.equal(result.signal, null);
  assert.equal(result.stderr, '');
  const report = JSON.parse(result.stdout);
  assertSchema('report', report);
  assert.equal(result.status, report.exitCode);
  return report;
}
async function fresh(dir) {
  await fs.writeFile(
    path.join(dir, 'package.json'),
    JSON.stringify({
      name: 'fixture',
      description: 'A real fixture.',
      scripts: { test: 'node CANARY.js' },
    }),
  );
  await fs.writeFile(path.join(dir, 'USAGE.md'), 'Read the local package metadata.\r\n');
}
test('fresh repository gives actionable guidance and accepts a reviewed usage file without configuration', async (t) => {
  const dir = await fixture(t);
  await fresh(dir);
  const missing = invoke(dir, 'generate', '--dry-run');
  assert.equal(missing.exitCode, 1);
  assert.match(missing.diagnostics[0].message, /--usage-file/);
  const before = await fs.readdir(dir);
  const draft = invoke(
    dir,
    'generate',
    '--usage-file',
    'USAGE.md',
    '--include',
    'scripts',
    '--dry-run',
  );
  assert.equal(draft.exitCode, 0, JSON.stringify(draft));
  assert.match(draft.data.preview, /npm run test/);
  assert.match(draft.data.preview, /No successful execution is implied/);
  assert.deepEqual(await fs.readdir(dir), before);
  assert.equal(invoke(dir, 'generate', '--usage-file', '../outside.md').exitCode, 3);
  assert.equal(
    invoke(dir, 'generate', '--usage-file', 'USAGE.md', '--expect', '0'.repeat(64)).exitCode,
    3,
  );
  const saved = invoke(
    dir,
    'generate',
    '--usage-file',
    'USAGE.md',
    '--include',
    'scripts',
    '--expect',
    draft.data.documentHash,
  );
  assert.equal(saved.exitCode, 0);
  assert.equal(await fs.readFile(path.join(dir, 'README.md'), 'utf8'), draft.data.preview);
  assert.equal(invoke(dir, 'validate').exitCode, 0);
  assert.ok(!(await fs.readdir(dir)).includes('CANARY.js'));
});
test('managed lifecycle previews exact changes, preserves custom bytes and keeps a verified original backup', async (t) => {
  const dir = await fixture(t);
  await fresh(dir);
  assert.equal(invoke(dir, 'generate', '--usage-file', 'USAGE.md', '--managed').exitCode, 0);
  const file = path.join(dir, 'README.md');
  let text = await fs.readFile(file, 'utf8');
  // Real CRLF owned regions and custom spans; no whole-document newline normalization.
  for (const r of regions(text).reverse())
    text =
      text.slice(0, r.start) +
      wrap(r.id, r.body.replace(/\n/g, '\r\n'), '\r\n') +
      text.slice(r.end);
  const custom = '\r\n## Maintainer notes\r\n\r\nKeep these exact spaces.  \r\n';
  const first = regions(text)[0];
  text = text.slice(0, first.end) + custom + text.slice(first.end);
  text = '\uFEFF' + text;
  await fs.writeFile(file, text);
  const pkg = JSON.parse(await fs.readFile(path.join(dir, 'package.json'), 'utf8'));
  pkg.description = 'A changed verified description.';
  await fs.writeFile(path.join(dir, 'package.json'), JSON.stringify(pkg));
  const before = await fs.readdir(dir),
    preview = invoke(dir, 'update');
  assert.equal(preview.exitCode, 0, JSON.stringify(preview));
  assert.equal(preview.data.operation, 'update');
  assert.ok(preview.data.preview.includes(custom));
  assert.match(preview.data.diff, /A changed verified description/);
  assert.deepEqual(await fs.readdir(dir), before);
  assert.equal(await fs.readFile(file, 'utf8'), text);
  assert.equal(invoke(dir, 'update', '--write').exitCode, 2);
  assert.equal(
    invoke(dir, 'update', '--write', '--dry-run', '--expect', preview.data.documentHash).exitCode,
    2,
  );
  assert.equal(invoke(dir, 'update', '--write', '--expect', '0'.repeat(64)).exitCode, 3);
  const saved = invoke(dir, 'update', '--write', '--expect', preview.data.documentHash);
  assert.equal(saved.exitCode, 0, JSON.stringify(saved));
  assert.equal(saved.data.committed, true);
  assert.equal(await fs.readFile(file, 'utf8'), preview.data.preview);
  const backup = saved.diagnostics.find((d) => d.code === 'I_BACKUP').path;
  assert.equal(await fs.readFile(path.join(dir, backup), 'utf8'), text);
  assert.equal(invoke(dir, 'validate').exitCode, 0);
  const noop = invoke(dir, 'update');
  assert.equal(noop.data.operation, 'noop');
  assert.equal(noop.data.diff, null);
  assert.equal(
    invoke(dir, 'update', '--write', '--expect', noop.data.documentHash).data.committed,
    false,
  );
  assert.equal((await fs.readdir(dir)).filter((f) => f.endsWith('.bak')).length, 1);
});
test('legacy and edited managed documents are never adopted or overwritten; stale custom edits invalidate review', async (t) => {
  const dir = await fixture(t);
  await fresh(dir);
  const file = path.join(dir, 'README.md'),
    legacy = '# Custom\n\nUnmanaged content.\n';
  await fs.writeFile(file, legacy);
  assert.equal(invoke(dir, 'update').data.preview, legacy);
  assert.equal(invoke(dir, 'update', '--write', '--expect', hash(legacy)).exitCode, 3);
  await fs.unlink(file);
  assert.equal(invoke(dir, 'generate', '--managed', '--usage-file', 'USAGE.md').exitCode, 0);
  const managed = await fs.readFile(file, 'utf8'),
    preview = invoke(dir, 'update');
  await fs.appendFile(file, '\n## Custom notes\n\nA new edit after review.\n');
  assert.equal(invoke(dir, 'update', '--write', '--expect', preview.data.documentHash).exitCode, 3);
  await fs.writeFile(file, managed.replace('Read the local', 'Edit the local'));
  const edited = await fs.readFile(file, 'utf8');
  assert.equal(invoke(dir, 'update').diagnostics[0].code, 'E_OWNERSHIP');
  assert.equal(await fs.readFile(file, 'utf8'), edited);
});
test('ownership parser rejects malformed, duplicate, nested, unknown and fenced markers', () => {
  const one = wrap('usage', '## Usage\n\nRead the file.\n');
  for (const bad of [
    one + '\n' + one,
    one.replace('end usage', 'end overview'),
    '```html\n' + one + '\n```',
    one.replace('Read the file.', 'Edited.'),
    '<!-- craftmentation:begin -->',
    wrap('usage', one),
    wrap('not-a-section', 'Body'),
  ])
    assert.throws(() => regions(bad), /markers/);
  const original = '\uFEFFintro\r\n' + one + '\n## Custom\n\nKeep.  \n';
  const changed = updatePlan(original, wrap('usage', '## Usage\n\nNew instructions.\n'));
  assert.ok(changed.startsWith('\uFEFFintro\r\n'));
  assert.ok(changed.endsWith('\n## Custom\n\nKeep.  \n'));
});
test('writer rejects changed identity/content, hard links and existing locks before replacing', async (t) => {
  const dir = await fixture(t),
    reader = await SafeFS.open(dir),
    file = path.join(dir, 'README.md');
  await fs.writeFile(file, 'Original\n');
  const snapshot = await reader.snapshot('README.md');
  await fs.writeFile(file, 'Changed\n');
  await assert.rejects(
    reader.replace('README.md', snapshot, 'New\n'),
    (e) => e.code === 'E_CONCURRENT',
  );
  await fs.writeFile(file, 'Original\n');
  const current = await reader.snapshot('README.md');
  await fs.link(file, path.join(dir, 'alias.md'));
  await assert.rejects(reader.replace('README.md', current, 'New\n'), (e) => e.code === 'E_PATH');
  await fs.unlink(path.join(dir, 'alias.md'));
  await fs.writeFile(file + '.craftmentation.lock', 'someone else');
  await assert.rejects(
    reader.replace('README.md', await reader.snapshot('README.md'), 'New\n'),
    (e) => e.code === 'E_EXISTS',
  );
  assert.equal(await fs.readFile(file, 'utf8'), 'Original\n');
  assert.equal(await fs.readFile(file + '.craftmentation.lock', 'utf8'), 'someone else');
});
test('update publication and cleanup faults retain recovery bytes and report commit truthfully', async (t) => {
  const dir = await fixture(t),
    reader = await SafeFS.open(dir),
    file = path.join(dir, 'README.md');
  await fs.writeFile(file, 'Original\n');
  const rename = fs.rename,
    unlink = fs.unlink;
  try {
    fs.rename = async () => {
      throw Object.assign(new Error('denied'), { code: 'EACCES' });
    };
    await assert.rejects(
      reader.replace('README.md', await reader.snapshot('README.md'), 'New\n'),
      (e) => e.code === 'E_PERMISSION' && !e.data.committed && !!e.data.backup,
    );
  } finally {
    fs.rename = rename;
  }
  assert.equal(await fs.readFile(file, 'utf8'), 'Original\n');
  assert.equal(
    (await fs.readdir(dir)).filter((f) => f.endsWith('.tmp') || f.endsWith('.lock')).length,
    0,
  );
  try {
    fs.unlink = async (name) => {
      if (String(name).endsWith('.lock')) throw new Error('cleanup');
      return unlink(name);
    };
    await assert.rejects(
      reader.replace('README.md', await reader.snapshot('README.md'), 'New\n'),
      (e) => e.code === 'E_IO' && e.data.committed && !!e.data.backup,
    );
  } finally {
    fs.unlink = unlink;
  }
  assert.equal(await fs.readFile(file, 'utf8'), 'New\n');
  for (const name of (await fs.readdir(dir)).filter((f) => f.endsWith('.bak')))
    assert.equal(await fs.readFile(path.join(dir, name), 'utf8'), 'Original\n');
});
test('real Craftmentation checkout supports draft and legacy-update previews without writes', () => {
  const preview = invoke(root, 'generate', '--output', 'README.draft.md', '--dry-run');
  assert.equal(preview.exitCode, 0, JSON.stringify(preview));
  assert.match(preview.data.preview, /Create or improve this project/);
  assert.equal(invoke(root, 'update').data.operation, 'noop');
});

test('all five examples support explicitly managed drafts and no-op update previews', async (t) => {
  for (const name of ['web-app', 'cli-tool', 'api', 'library', 'desktop-app']) {
    const dir = await fixture(t);
    await fs.cp(path.join(root, 'examples', name), dir, { recursive: true });
    const original = await fs.readFile(path.join(dir, 'README.md'));
    const created = invoke(dir, 'generate', '--output', 'README.managed.md', '--managed');
    assert.equal(created.exitCode, 0, JSON.stringify(created));
    const before = await fs.readdir(dir),
      preview = invoke(dir, 'update', '--output', 'README.managed.md');
    assert.equal(preview.exitCode, 0, JSON.stringify(preview));
    assert.equal(preview.data.operation, 'noop');
    assert.deepEqual(await fs.readdir(dir), before);
    assert.deepEqual(await fs.readFile(path.join(dir, 'README.md')), original);
  }
});
test('update staging permissions, interruption and competing writers fail safely', async (t) => {
  const dir = await fixture(t),
    reader = await SafeFS.open(dir),
    file = path.join(dir, 'README.md');
  await fs.writeFile(file, 'Original\n');
  const snapshot = await reader.snapshot('README.md'),
    open = fs.open;
  try {
    fs.open = async (name, ...args) => {
      if (String(name).endsWith('.tmp'))
        throw Object.assign(new Error('denied'), { code: 'EACCES' });
      return open(name, ...args);
    };
    await assert.rejects(
      reader.replace('README.md', snapshot, 'New\n'),
      (e) => e.code === 'E_PERMISSION' && !e.data.committed,
    );
  } finally {
    fs.open = open;
  }
  assert.deepEqual(await fs.readdir(dir), ['README.md']);
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(
    reader.replace('README.md', snapshot, 'New\n', controller.signal),
    (e) => e.code === 'E_INTERRUPTED',
  );
  assert.deepEqual(await fs.readdir(dir), ['README.md']);
  const attempts = await Promise.allSettled([
    reader.replace('README.md', snapshot, 'First\n'),
    reader.replace('README.md', snapshot, 'Second\n'),
  ]);
  assert.equal(attempts.filter((r) => r.status === 'fulfilled').length, 1);
  assert.equal(attempts.filter((r) => r.status === 'rejected').length, 1);
  assert.ok(['First\n', 'Second\n'].includes(await reader.text('README.md')));
  assert.equal(
    (await fs.readdir(dir)).filter((f) => f.endsWith('.tmp') || f.endsWith('.lock')).length,
    0,
  );
});

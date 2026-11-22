import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { SafeFS, safeRelative } from '../../dist/filesystem/index.js';
import { strictJSON, assertSchema, catalog, profiles } from '../../dist/shared/library.js';
import { merge, defaults, effectiveConfig } from '../../dist/configuration/index.js';
import { inventory, detect } from '../../dist/analyzer/index.js';
import { render } from '../../dist/renderer/index.js';
import { validateDocument } from '../../dist/validator/index.js';
import { select } from '../../dist/generator/selection.js';
const temporary = async (t) => {
  const root = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'craftmentation-')));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  return root;
};

test('strict JSON rejects duplicate, escaped duplicate, prototype, comments, and trailing comma', () => {
  for (const value of [
    '{"a":1,"a":2}',
    '{"a":1,"\\u0061":2}',
    '{"__proto__":{}}',
    '{"constructor":1}',
    '{/*x*/"a":1}',
    '{"a":1,}',
  ])
    assert.throws(() => strictJSON(value));
  assert.deepEqual(strictJSON('{"a":["}\\\"",true,null]}'), { a: ['}"', true, null] });
});
test('actual Ajv validates schema corpus and existing metadata without mutation', async () => {
  for (const [id, file] of [
    ['configuration', 'config-minimal'],
    ['configuration', 'config-full'],
    ['analysis', 'analysis-example'],
    ['report', 'report-example'],
  ]) {
    const value = JSON.parse(
        await fs.readFile(new URL(`../fixtures/contracts/${file}.json`, import.meta.url), 'utf8'),
      ),
      before = structuredClone(value);
    assertSchema(id, value);
    assert.deepEqual(value, before);
  }
  for (const output of [
    '../README.md',
    'x/../README.md',
    '/README.md',
    'C:/README.md',
    'x\\README.md',
    'x/\x00README.md',
  ])
    assert.throws(() => assertSchema('configuration', { schemaVersion: 1, output }));
  assert.throws(() =>
    assertSchema('configuration', { schemaVersion: 1, sections: { usage: false } }),
  );
  assert.throws(() => assertSchema('configuration', { schemaVersion: 1, ai: { enabled: true } }));
  assertSchema('configuration', { schemaVersion: 1, template: './templates/local' });
});
test('all 18 Python policy scenarios have matching selection behavior', async () => {
  const fixture = JSON.parse(
    await fs.readFile(new URL('../fixtures/templates/selection-cases.json', import.meta.url)),
  );
  for (const item of fixture.cases) {
    if (item.error) {
      // Production path validation is separate; pure selection must still reject traversal metadata.
      if (item.name.includes('traversal'))
        assert.throws(() => safeRelative(item.request.customSections[0].path));
      else assert.throws(() => select(catalog, profiles, item.request), item.name);
    } else {
      const result = select(catalog, profiles, item.request);
      for (const [key, value] of Object.entries(item.expected))
        assert.deepEqual(result[key], value, item.name);
    }
  }
});
test('explicit CLI values override profile values and content maps merge by field', () => {
  const base = merge(defaults(), {
    projectType: 'library',
    output: 'base.md',
    content: { usage: { A: { value: 'a' } } },
    profiles: { library: { content: { usage: { B: { value: 'b' } } } } },
  });
  assert.equal(merge(base, { output: 'other.md' }).output, 'other.md');
  const valid = merge(defaults(), {
    projectType: 'library',
    sections: { features: true },
    profiles: { library: { sections: { features: false } } },
  });
  assert.equal(
    effectiveConfig(valid, 'general', { include: ['features'] }).sections.features,
    true,
  );
  assert.equal(
    effectiveConfig(valid, 'general', { include: ['features'], exclude: ['features'] }).sections
      .features,
    false,
  );
  assert.deepEqual(merge(base, base.profiles.library).content.usage, {
    A: { value: 'a' },
    B: { value: 'b' },
  });
});
test('portable paths reject drive, ADS, devices, trailing dots, and traversal', () => {
  for (const value of [
    '../a',
    'x/../a',
    '/a',
    'C:a',
    'x:stream',
    'NUL.md',
    'docs/COM1.txt',
    'docs/a.',
    'docs/a ',
    'docs\\a',
    '.git/config',
    '.env',
    'a.pem',
  ])
    assert.throws(() => safeRelative(value), value);
  assert.equal(safeRelative('docs/README.tr.md'), 'docs/README.tr.md');
});
test('safe creates are no-clobber, dry-run has zero writes, and locks are not stolen', async (t) => {
  const root = await temporary(t),
    reader = await SafeFS.open(root);
  await reader.create('README.md', '# Test\n', true);
  assert.deepEqual(await fs.readdir(root), []);
  assert.equal(await reader.create('README.md', '# Test\n', false), true);
  await assert.rejects(reader.create('README.md', 'bad', false));
  assert.equal(await reader.text('README.md'), '# Test\n');
  await fs.writeFile(path.join(root, 'next.md.craftmentation.lock'), 'someone else');
  await assert.rejects(reader.create('next.md', 'bad', false));
  assert.equal(
    await fs.readFile(path.join(root, 'next.md.craftmentation.lock'), 'utf8'),
    'someone else',
  );
  const abort = new AbortController();
  abort.abort();
  await assert.rejects(reader.create('abort.md', 'bad', false, abort.signal));
  assert.deepEqual((await fs.readdir(root)).sort(), ['README.md', 'next.md.craftmentation.lock']);
});
test('two competing creates cannot overwrite each other or leave owned artifacts', async (t) => {
  const root = await temporary(t),
    reader = await SafeFS.open(root);
  const result = await Promise.allSettled([
    reader.create('README.md', 'one', false),
    reader.create('README.md', 'two', false),
  ]);
  assert.equal(result.filter((r) => r.status === 'fulfilled').length, 1);
  assert.ok(['one', 'two'].includes(await reader.text('README.md')));
  assert.deepEqual(await fs.readdir(root), ['README.md']);
});
test('confinement rejects parent/leaf/dangling symlinks, case collisions, directories', async (t) => {
  const root = await temporary(t),
    reader = await SafeFS.open(root);
  await fs.mkdir(path.join(root, 'docs'));
  try {
    await fs.symlink(path.join(root, 'docs'), path.join(root, 'link'));
  } catch (e) {
    if (process.platform === 'win32' && ['EPERM', 'EACCES'].includes(e.code))
      return t.skip('No symlink privilege');
    throw e;
  }
  await fs.symlink(path.join(root, 'missing'), path.join(root, 'dangling.md'));
  await assert.rejects(reader.create('link/README.md', 'bad', false));
  await assert.rejects(reader.create('dangling.md', 'bad', false));
  await assert.rejects(reader.read('docs'));
  await fs.writeFile(path.join(root, 'README.md'), 'original');
  await assert.rejects(reader.create('readme.md', 'bad', false));
});
test('inventory excludes secret files, symlinks and dependency trees, and bounds traversal', async (t) => {
  const root = await temporary(t),
    reader = await SafeFS.open(root);
  await fs.writeFile(path.join(root, '.env'), 'NEVER_PRINT_THIS');
  await fs.mkdir(path.join(root, 'node_modules'));
  await fs.writeFile(path.join(root, 'node_modules', 'run.js'), 'bad');
  await fs.writeFile(path.join(root, 'a.txt'), 'hello');
  const scan = await inventory(reader);
  assert.deepEqual(
    scan.files.map((f) => f.path),
    ['a.txt'],
  );
  assert.ok(scan.limits.skipped.length);
  await assert.rejects(inventory(reader, 1), /limit/i);
  await fs.writeFile(path.join(root, 'large.txt'), 'a'.repeat(1024 * 1024 + 1));
  await assert.rejects(inventory(reader), /limit/i);
});
test('AST validator handles reference links, HTML pictures, Unicode/duplicate slugs and code literals', async (t) => {
  const root = await temporary(t),
    reader = await SafeFS.open(root);
  await fs.writeFile(path.join(root, 'logo.svg'), '<svg/>');
  const good =
    '# Test\n\nDescription.\n\n## Usage\n\n[Local][ref]\n\n[ref]: #başlık-1\n\n## Başlık\n\nOne.\n\n## Başlık\n\nTwo.\n\n<picture><source srcset="logo.svg"><img src="logo.svg" alt="Logo"></picture>\n\n```text\n{{VALID_EXAMPLE}}\n```\n';
  assert.deepEqual(
    (await validateDocument(good, 'README.md', reader)).filter((d) => d.severity === 'error'),
    [],
  );
  for (const bad of [
    '{{UNRESOLVED}}',
    '[bad](javascript:alert%281%29)',
    '[bad](../outside.md)',
    '[bad](missing.md)',
    '[bad](#unknown)',
    '<img src="logo.svg" onerror="alert(1)">',
  ])
    assert.ok(
      (await validateDocument(good + '\n' + bad, 'README.md', reader)).some(
        (d) => d.severity === 'error',
      ),
      bad,
    );
});
test('renderer is nonrecursive and does not erase literal code content', () => {
  const sections = [
    { id: 'x', order: 1, fields: ['A'], path: '', classification: 'Core', standardItem: 'x' },
  ];
  assert.equal(
    render(
      sections,
      ['x'],
      {
        x: {
          A: {
            value: '```text\n{{A}}\n\n\nend\n```',
            format: 'markdown',
            sources: ['maintainer:test'],
            safe: true,
          },
        },
      },
      { x: '{{A}}' },
      'README.md',
    ),
    '```text\n{{A}}\n\n\nend\n```\n',
  );
});

test('publication failures fail closed and cleanup owns only its own paths', async (t) => {
  const root = await temporary(t),
    reader = await SafeFS.open(root),
    original = fs.link;
  try {
    fs.link = async () => {
      throw Object.assign(new Error('unsupported'), { code: 'EXDEV' });
    };
    await assert.rejects(
      reader.create('README.md', '# Test\n', false),
      (e) => e.code === 'E_IO' && e.data.committed === false,
    );
  } finally {
    fs.link = original;
  }
  assert.deepEqual(await fs.readdir(root), []);
});
test('permission faults clean lock, and postcommit cleanup reports publication truthfully', async (t) => {
  const root = await temporary(t),
    reader = await SafeFS.open(root),
    open = fs.open,
    unlink = fs.unlink;
  try {
    fs.open = async (file, ...args) => {
      if (String(file).endsWith('.tmp'))
        throw Object.assign(new Error('denied'), { code: 'EACCES' });
      return open(file, ...args);
    };
    await assert.rejects(
      reader.create('README.md', '# Test\n', false),
      (e) => e.code === 'E_PERMISSION',
    );
  } finally {
    fs.open = open;
  }
  assert.deepEqual(await fs.readdir(root), []);
  try {
    fs.unlink = async (file) => {
      if (String(file).endsWith('.tmp')) throw new Error('cleanup failed');
      return unlink(file);
    };
    await assert.rejects(
      reader.create('README.md', '# Test\n', false),
      (e) => e.code === 'E_IO' && e.data.committed === true,
    );
  } finally {
    fs.unlink = unlink;
  }
  assert.equal(await reader.text('README.md'), '# Test\n');
});

test('type hints handle ambiguity, empty manifests and explicit package roles conservatively', () => {
  const kind = (pkg) => detect(new Map([['package.json', JSON.stringify(pkg)]])).detected;
  assert.equal(kind({ workspaces: [], bin: {} }), 'general');
  assert.equal(kind({ dependencies: { react: '*', express: '*' } }), 'general');
  assert.equal(kind({ exports: './index.js', dependencies: { react: '*' } }), 'library');
  assert.equal(kind({ workspaces: ['packages/*'] }), 'monorepo');
});

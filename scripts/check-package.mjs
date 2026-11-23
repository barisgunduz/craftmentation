import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const root = fileURLToPath(new URL('../', import.meta.url));
const npmCLI = process.env.npm_execpath;
if (!npmCLI) throw new Error('Run this check through npm run package:check.');
const offline = process.argv.slice(2).includes('--offline');
if (process.argv.slice(2).some((arg) => arg !== '--offline'))
  throw new Error('Supported option: --offline');
const pkg = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'));
const temporary = await fs.realpath(
  await fs.mkdtemp(path.join(os.tmpdir(), 'craftmentation-package-')),
);
function run(args, cwd, executable = process.execPath) {
  const result = spawnSync(executable, args, {
    cwd,
    encoding: 'utf8',
    timeout: 180000,
    windowsHide: true,
    shell: false,
  });
  if (result.error || result.status !== 0)
    throw new Error(
      `Package check command failed: ${args[0] === npmCLI ? 'npm ' + args.slice(1, 3).join(' ') : 'installed CLI'}\n${result.error?.message ?? result.stderr ?? result.stdout}`,
    );
  return result.stdout;
}
function cli(consumer, ...args) {
  const result = JSON.parse(
    run([npmCLI, 'exec', '--offline', '--', 'craftmentation', ...args, '--json'], consumer),
  );
  assert.equal(result.exitCode, 0, JSON.stringify(result));
  return result;
}
try {
  const [packed] = JSON.parse(
    run([npmCLI, 'pack', '--json', '--ignore-scripts', '--pack-destination', temporary], root),
  );
  const paths = packed.files.map((file) => file.path);
  for (const required of [
    'package.json',
    'dist/cli/index.js',
    'schemas/proposal.schema.json',
    'templates/catalog.json',
    'templates/default/layout.json',
    'sections/core/usage.md',
    'prompts/generate-readme.md',
    'docs/ai-drafting.md',
    'docs/release-notes.md',
    'docs/release-readiness.md',
    'docs/upgrading.md',
    'docs/dependency-licenses.md',
    'README.md',
    'README.template.md',
    'LICENSE',
    'THIRD_PARTY_NOTICES.md',
    'assets/brand/inter-OFL.txt',
    'assets/brand/logo-readme.svg',
    'assets/brand/brand-guidelines.md',
  ])
    assert.ok(paths.includes(required), `Missing package file: ${required}`);
  for (const file of paths)
    assert.ok(
      !/(^|\/)(node_modules|src|tests|examples|\.git|\.github|artifacts|identity-board\.png)(\/|$)|(^|\/)\.env(?:\.|$)|\.(pem|key|log|tgz)$|craftmentation-.*\.(tmp|bak)$/.test(
        file,
      ),
      `Forbidden package file: ${file}`,
    );
  const repeatedDirectory = path.join(temporary, 'repeat');
  await fs.mkdir(repeatedDirectory);
  const [repeated] = JSON.parse(
    run(
      [npmCLI, 'pack', '--json', '--ignore-scripts', '--pack-destination', repeatedDirectory],
      root,
    ),
  );
  const originalBytes = await fs.readFile(path.join(temporary, packed.filename));
  assert.deepEqual(
    await fs.readFile(path.join(repeatedDirectory, repeated.filename)),
    originalBytes,
    'Consecutive tarballs differ for unchanged inputs.',
  );
  const consumer = path.join(temporary, 'consumer');
  await fs.mkdir(consumer);
  await fs.writeFile(
    path.join(consumer, 'package.json'),
    JSON.stringify({ private: true, name: 'craftmentation-install-check', version: '0.0.0' }),
  );
  const tarball = path.join(temporary, packed.filename);
  run(
    [
      npmCLI,
      'install',
      '--ignore-scripts',
      '--omit=dev',
      '--no-audit',
      '--no-fund',
      '--package-lock=false',
      ...(offline ? ['--offline'] : []),
      tarball,
    ],
    consumer,
  );
  const installed = path.join(consumer, 'node_modules', 'craftmentation');
  const metadata = JSON.parse(await fs.readFile(path.join(installed, 'package.json'), 'utf8'));
  assert.equal(metadata.version, pkg.version);
  for (const notice of ['LICENSE', 'THIRD_PARTY_NOTICES.md', 'assets/brand/inter-OFL.txt'])
    assert.deepEqual(
      await fs.readFile(path.join(installed, notice)),
      await fs.readFile(path.join(root, notice)),
      `Notice changed during packaging: ${notice}`,
    );
  for (const hook of ['preinstall', 'install', 'postinstall', 'prepare'])
    assert.equal(metadata.scripts?.[hook], undefined, `Unexpected install hook: ${hook}`);
  assert.equal(cli(consumer, '--version').data.text, pkg.version);
  assert.match(cli(consumer, '--help').data.text, /generate/);
  // npm exec exercises the actual installed POSIX/Windows bin wrapper, not the source checkout.
  const project = path.join(consumer, 'project');
  await fs.mkdir(project);
  await fs.writeFile(
    path.join(project, 'package.json'),
    JSON.stringify({
      name: 'install-fixture',
      description: 'A local installation verification fixture.',
    }),
  );
  await fs.writeFile(path.join(project, 'USAGE.md'), 'Inspect the local package metadata.\n');
  const rootArgs = ['--root', project];
  assert.equal(cli(consumer, 'init', ...rootArgs).data.committed, true);
  assert.equal(cli(consumer, 'analyze', ...rootArgs).data.root, '.');
  const preview = cli(
    consumer,
    'generate',
    '--managed',
    '--usage-file',
    'USAGE.md',
    '--dry-run',
    ...rootArgs,
  );
  assert.equal(preview.data.committed, false);
  const saved = cli(
    consumer,
    'generate',
    '--managed',
    '--usage-file',
    'USAGE.md',
    '--expect',
    preview.data.documentHash,
    ...rootArgs,
  );
  assert.equal(saved.data.committed, true);
  assert.equal(cli(consumer, 'validate', ...rootArgs).data.errors, 0);
  assert.equal(cli(consumer, 'update', ...rootArgs).data.operation, 'noop');
  const newMetadata = {
    name: 'install-fixture',
    description: 'A changed installation verification fixture.',
  };
  await fs.writeFile(path.join(project, 'package.json'), JSON.stringify(newMetadata));
  const update = cli(consumer, 'update', ...rootArgs);
  assert.equal(update.data.operation, 'update');
  assert.equal(
    cli(consumer, 'update', '--write', '--expect', update.data.documentHash, ...rootArgs).data
      .committed,
    true,
  );
  const context = cli(consumer, 'generate', '--agent', 'codex', '--preview-context', ...rootArgs);
  assert.equal(context.data.ai.kind, 'context');
  assert.equal(context.data.committed, false);
  // Source-free installed data must resolve independently of cwd; no model is invoked.
  const bytes = await fs.readFile(tarball),
    digest = createHash('sha256').update(bytes).digest('hex');
  const artifacts = path.join(root, 'artifacts');
  await fs.mkdir(artifacts, { recursive: true });
  if ((await fs.lstat(artifacts)).isSymbolicLink())
    throw new Error('Artifacts must be a regular directory.');
  const artifact = path.join(artifacts, packed.filename);
  try {
    if (!(await fs.lstat(artifact)).isFile() || (await fs.lstat(artifact)).isSymbolicLink())
      throw new Error('Artifact destination is not a regular file.');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  await fs.copyFile(tarball, artifact);
  const report = {
    version: pkg.version,
    private: pkg.private,
    reproducible: true,
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    offlineInstall: offline,
    artifact: `artifacts/${packed.filename}`,
    sha256: digest,
    files: paths.length,
    packedBytes: packed.size,
    unpackedBytes: packed.unpackedSize,
    installedCommands: ['init', 'analyze', 'generate', 'validate', 'update'],
    agentInvocations: 0,
  };
  const reportPath = path.join(artifacts, 'verification.json');
  try {
    if ((await fs.lstat(reportPath)).isSymbolicLink())
      throw new Error('Report destination cannot be a symlink.');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally {
  await fs.rm(temporary, { recursive: true, force: true });
}

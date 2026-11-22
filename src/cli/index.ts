#!/usr/bin/env node
import { realpath } from 'node:fs/promises';
import { Command, CommanderError } from 'commander';
import { pathToFileURL } from 'node:url';
import { SafeFS, hash } from '../filesystem/index.js';
import {
  loadConfig,
  effectiveConfig,
  configName,
  initialConfig,
  defaults,
} from '../configuration/index.js';
import { analyze, detect, inventory } from '../analyzer/index.js';
import { generate } from '../generator/index.js';
import { updatePlan, diff } from '../generator/update.js';
import { regions } from '../renderer/managed.js';
import { validateDocument } from '../validator/index.js';
import { assertSchema, version, catalog } from '../shared/library.js';
import { Failure, ioFailure, diagnosticsOrder } from '../shared/errors.js';
import type { Options, Report, Diagnostic, Selection } from '../shared/types.js';
type IO = { stdout: (text: string) => void; stderr: (text: string) => void };
const commands = ['init', 'analyze', 'generate', 'update', 'validate'];
function change(
  path: string,
  dryRun: boolean,
  committed: boolean,
  text: string,
  fingerprint: string | null = null,
  selection: Selection = { selected: [], omitted: [], unresolved: [] },
  operation = 'create',
) {
  return {
    path,
    operation,
    dryRun,
    committed,
    documentHash: hash(text),
    sourceFingerprint: fingerprint,
    preview: dryRun ? text : null,
    diff: null as string | null,
    ...selection,
  };
}
async function execute(
  command: string,
  options: Options,
  signal?: AbortSignal,
): Promise<Omit<Report, 'schemaVersion' | 'command'>> {
  if (options.write && options.dryRun)
    throw new Failure('E_ARGUMENT', 2, '--write and --dry-run cannot be combined.');
  if (options.expect && !/^[a-f0-9]{64}$/.test(options.expect))
    throw new Failure(
      'E_ARGUMENT',
      2,
      'Expected hash must be a 64-character lowercase SHA-256 from the document preview.',
    );
  if (options.write && !options.expect)
    throw new Failure(
      'E_ARGUMENT',
      2,
      'Preview first, then use update --write --expect <documentHash> with the reviewed hash.',
    );
  const reader = await SafeFS.open(options.root ?? process.cwd());
  const location = options.config ?? configName;
  const base =
    command === 'init' && !(await reader.exists(location))
      ? defaults()
      : await loadConfig(reader, options);
  if (command === 'init') {
    if (
      location.split('/').at(-1) !== configName ||
      location
        .split('/')
        .some((p) => /^\.(github|claude|cursor|codex|agents|windsurf|devin)$/i.test(p))
    )
      throw new Failure(
        'E_PATH',
        3,
        'Init writes only craftmentation.config.json in an authorized document root.',
      );
    effectiveConfig(base, 'general', options);
    if (await reader.exists(location)) {
      if ((await reader.text(location)) !== initialConfig)
        throw new Failure(
          'E_EXISTS',
          3,
          'Existing configuration differs; it will not be replaced.',
          location,
        );
      return {
        status: 'ok',
        exitCode: 0,
        diagnostics: [],
        data: change(location, !!options.dryRun, false, initialConfig, null, undefined, 'noop'),
      };
    }
    const committed = await reader.create(location, initialConfig, !!options.dryRun, signal);
    return {
      status: 'ok',
      exitCode: 0,
      diagnostics: [],
      data: change(location, !!options.dryRun, committed, initialConfig),
    };
  }
  if (command === 'validate') {
    const config = effectiveConfig(base, 'general', options),
      document = options.document ?? config.output;
    const diagnostics = await validateDocument(await reader.text(document), document, reader);
    const errors = diagnostics.filter((d) => d.severity === 'error').length,
      warnings = diagnostics.filter((d) => d.severity === 'warning').length;
    const exitCode = errors || (options.strict && warnings) ? 1 : 0;
    return {
      status: exitCode ? 'invalid' : 'ok',
      exitCode,
      diagnostics,
      data: {
        document,
        errors,
        warnings,
        checks: [
          'configuration',
          'structure',
          'placeholders',
          'relative-links',
          'html-safety',
          'image-alternatives',
        ],
      },
    };
  }
  const scan = await inventory(reader, 10000, signal),
    config = effectiveConfig(base, detect(scan.texts).detected, options);
  const original = command === 'update' ? await reader.snapshot(config.output) : undefined;
  if (original && scan.files.find((f) => f.path === config.output)?.sha256 !== original.digest)
    throw new Failure(
      'E_CONCURRENT',
      3,
      'Document changed during analysis; retry the preview.',
      config.output,
    );
  if (original && !regions(original.text).length) {
    if (options.write)
      throw new Failure(
        'E_OWNERSHIP',
        3,
        'This README has no managed sections. Use your agent to review a focused edit; the CLI will not adopt or overwrite it.',
        config.output,
      );
    return {
      status: 'ok',
      exitCode: 0,
      diagnostics: [
        {
          code: 'W_UNMANAGED',
          severity: 'warning',
          message:
            'Existing README is preserved. Ask your agent for a focused update. CLI-managed updates require a document explicitly created with generate --managed.',
          path: config.output,
        },
      ],
      data: change(config.output, true, false, original.text, null, undefined, 'noop'),
    };
  }
  if (options.usageFile) {
    const body = await reader.text(options.usageFile);
    if (!body.trim())
      throw new Failure(
        'E_EVIDENCE',
        1,
        'Usage file is empty; provide actual steps and examples.',
        options.usageFile,
      );
    config.content.usage = Object.fromEntries(
      catalog
        .find((s) => s.id === 'usage')!
        .fields.map((field, index) => [
          field,
          {
            value: index ? '' : body,
            format: 'markdown',
            sources: [options.usageFile!],
            safe: true,
          },
        ]),
    );
  }
  const findings = await analyze(reader, config, scan, location);
  assertSchema('analysis', findings.analysis);
  if (command === 'analyze')
    return {
      status: 'ok',
      exitCode: 0,
      diagnostics: findings.analysis.diagnostics,
      data: findings.analysis,
    };
  if (command === 'generate' && (await reader.exists(config.output)))
    throw new Failure(
      'E_EXISTS',
      3,
      'Output already exists. Use update for a safe preview, or generate --output README.draft.md --dry-run for a separate draft. Generation never replaces existing documentation.',
      config.output,
    );
  if (original) {
    // Refresh every owned section, even when its profile would not recommend it today.
    findings.analysis.selection.include = [
      ...new Set([
        ...findings.analysis.selection.include,
        ...regions(original.text).map((r) => r.id),
      ]),
    ];
  }
  const result = await generate(findings, config, command === 'update' || !!options.managed);
  const text = original ? updatePlan(original.text, result.text) : result.text;
  if (options.managed) regions(text);
  if (options.expect && hash(text) !== options.expect)
    throw new Failure(
      'E_CONCURRENT',
      3,
      'The proposed document differs from the reviewed hash. Preview again; no files were changed.',
      config.output,
    );
  const diagnostics = [
    ...findings.analysis.diagnostics,
    ...(await validateDocument(text, config.output, reader)),
  ].sort(diagnosticsOrder);
  if (diagnostics.some((d) => d.severity === 'error'))
    return { status: 'invalid', exitCode: 1, diagnostics, data: null };
  const preview = command === 'update' ? !options.write : !!options.dryRun;
  const changed = !original || original.text !== text;
  let committed = false;
  if (original) {
    if (options.write && changed) {
      const backup = await reader.replace(config.output, original, text, signal);
      diagnostics.push({
        code: 'I_BACKUP',
        severity: 'info',
        message: `Original retained in backup. Original hash: ${original.digest}. New hash: ${hash(text)}.`,
        path: backup,
      });
      committed = true;
    }
  } else committed = await reader.create(config.output, text, preview, signal);
  const summary = change(
    config.output,
    preview,
    committed,
    text,
    findings.analysis.sourceFingerprint,
    original
      ? {
          selected: result.selection.selected.filter((id) =>
            regions(original.text).some((r) => r.id === id),
          ),
          omitted: [
            ...new Set([
              ...result.selection.omitted,
              ...result.selection.selected.filter(
                (id) => !regions(original.text).some((r) => r.id === id),
              ),
            ]),
          ],
          unresolved: result.selection.unresolved,
        }
      : result.selection,
    changed ? (original ? 'update' : 'create') : 'noop',
  );
  if (original) summary.diff = diff(original.text, text, config.output);
  return {
    status: 'ok',
    exitCode: 0,
    diagnostics: diagnostics.sort(diagnosticsOrder),
    data: summary,
  };
}
export async function run(argv: string[], io: IO, signal?: AbortSignal): Promise<number> {
  let help = '',
    report: Report,
    command: string | null = null;
  const json = argv.some((x) => x === '--json');
  try {
    if (![24, 26].includes(Number(process.versions.node.split('.')[0])))
      throw new Failure('E_CAPABILITY', 2, 'Use a supported Node.js 24 or 26 runtime.');
    const seen = new Set<string>();
    for (const token of argv)
      if (token.startsWith('--')) {
        const key = token.split('=')[0]!;
        if (!['--include', '--exclude'].includes(key) && seen.has(key))
          throw new Failure('E_ARGUMENT', 2, 'Duplicate scalar option.');
        seen.add(key);
      }
    const program = new Command()
      .name('craftmentation')
      .description('Repository-aware documentation framework')
      .version(version)
      .exitOverride()
      .allowExcessArguments(false)
      .showSuggestionAfterError(false)
      .configureOutput({
        writeOut: (s) => {
          help += s;
        },
        writeErr: () => {},
      });
    program
      .option('--root <path>', 'Target directory (default current working directory)')
      .option('--config <path>', 'Root-relative configuration path')
      .option('--json', 'Emit a JSON result');
    for (const name of commands) {
      const sub = program
        .command(name)
        .description(
          {
            init: 'Create configuration without overwriting files',
            analyze: 'Inspect static repository evidence',
            generate: 'Generate a missing README from evidence',
            update:
              'Preview managed changes; explicit writes require a reviewed hash and quiet workspace',
            validate: 'Check a Markdown document offline',
          }[name]!,
        )
        .allowExcessArguments(false);
      if (['init', 'generate', 'update'].includes(name))
        sub.option('--dry-run', 'Preview without any filesystem writes');
      if (['analyze', 'generate', 'update'].includes(name))
        sub.option('--project-type <id>', 'Explicit project profile');
      if (['generate', 'update'].includes(name))
        sub
          .option('--output <path>', 'Root-relative output')
          .option('--language <tag>', 'Output language (MVP: en)')
          .option('--usage-file <path>', 'Reviewed usage Markdown inside the target root')
          .option('--expect <sha256>', 'Require this exact reviewed document hash')
          .option(
            '--include <id>',
            'Include section (repeatable)',
            (s, p: string[]) => [...p, s],
            [],
          )
          .option(
            '--exclude <id>',
            'Exclude non-Core section (repeatable)',
            (s, p: string[]) => [...p, s],
            [],
          );
      if (name === 'generate')
        sub.option('--managed', 'Explicitly mark generated sections for later safe updates');
      if (name === 'update')
        sub.option(
          '--write',
          'Apply reviewed managed changes; retain backup (requires --expect and a quiet workspace)',
        );
      if (name === 'validate')
        sub
          .option('--document <path>', 'Document to validate')
          .option('--strict', 'Treat warnings as failure');
      sub.action(async (_, cmd: Command) => {
        command = name;
        report = {
          schemaVersion: 1,
          command: name,
          ...(await execute(name, cmd.optsWithGlobals<Options>(), signal)),
        };
      });
    }
    if (!argv.length) throw new Failure('E_ARGUMENT', 2, program.helpInformation().trim());
    try {
      await program.parseAsync(argv, { from: 'user' });
    } catch (e) {
      if (e instanceof CommanderError && e.exitCode === 0)
        report = {
          schemaVersion: 1,
          command: null,
          status: 'ok',
          exitCode: 0,
          diagnostics: [],
          data: { text: help.trim() },
        };
      else throw e;
    }
    if (!report!) throw new Failure('E_ARGUMENT', 2, 'A supported command is required.');
    assertSchema('report', report);
  } catch (error) {
    const failure =
      error instanceof Failure
        ? error
        : error instanceof CommanderError
          ? new Failure(
              'E_ARGUMENT',
              2,
              'Invalid command or options. Use --help for supported syntax.',
            )
          : (error as NodeJS.ErrnoException)?.code
            ? ioFailure(error)
            : new Failure('E_INTERNAL', 5, 'An internal error prevented completion.');
    report = {
      schemaVersion: 1,
      command,
      status: failure.exitCode === 1 ? 'invalid' : 'error',
      exitCode: failure.exitCode,
      diagnostics: [failure.diagnostic()],
      data: failure.data,
    };
  }
  if (signal?.aborted) {
    io.stderr('Operation interrupted; inspect any reported owned artifacts before retrying.\n');
    return signal.reason === 'SIGTERM' ? 143 : 130;
  }
  if (json) io.stdout(JSON.stringify(report) + '\n');
  else {
    const data = report.data as {
      text?: string;
      preview?: string;
      path?: string;
      diff?: string;
      documentHash?: string;
    } | null;
    if (report.status === 'ok' && report.command === 'analyze') {
      const a = report.data as import('../shared/types.js').Analysis;
      io.stdout(
        `Profile: ${a.projectType.selected}\nInspected files: ${a.files.length}\nSourced facts: ${a.facts.length}\nFingerprint: ${a.sourceFingerprint}\n`,
      );
    } else if (report.status === 'ok' && report.command === 'update') {
      if (report.diagnostics.some((d) => d.code === 'W_UNMANAGED'))
        io.stdout('Existing README preserved. Use your agent for a focused update.\n');
      else if (!data?.diff)
        io.stdout(`No managed changes. No files written.\nDocument hash: ${data?.documentHash}\n`);
      else
        io.stdout(
          `${data.diff}\nDocument hash: ${data.documentHash}\n${data.preview ? 'Preview only. Apply with update --write --expect <documentHash> using the same options in a quiet workspace.' : `update: ${data.path}`}\n`,
        );
    } else if (report.status === 'ok')
      io.stdout(
        (data?.text ?? data?.preview ?? `${report.command}: ${data?.path ?? 'completed'}`) + '\n',
      );
    for (const d of report.diagnostics)
      (d.severity === 'error' ? io.stderr : io.stdout)(
        `${d.code}: ${d.message}${d.path ? ` (${d.path})` : ''}\n`,
      );
  }
  return report.exitCode;
}
const entry = process.argv[1]
  ? await realpath(process.argv[1]).catch(() => process.argv[1]!)
  : undefined;
if (entry && import.meta.url === pathToFileURL(entry).href) {
  const controller = new AbortController();
  const interrupt = () => controller.abort('SIGINT'),
    terminate = () => controller.abort('SIGTERM');
  process.once('SIGINT', interrupt);
  process.once('SIGTERM', terminate);
  try {
    process.exitCode = await run(
      process.argv.slice(2),
      {
        stdout: (text) => {
          process.stdout.write(text);
        },
        stderr: (text) => {
          process.stderr.write(text);
        },
      },
      controller.signal,
    );
  } finally {
    process.off('SIGINT', interrupt);
    process.off('SIGTERM', terminate);
  }
}

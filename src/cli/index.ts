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
import { validateDocument } from '../validator/index.js';
import { assertSchema, version } from '../shared/library.js';
import { Failure, ioFailure, diagnosticsOrder } from '../shared/errors.js';
import type { Options, Report, Diagnostic, Selection } from '../shared/types.js';
type IO = { stdout: (text: string) => void; stderr: (text: string) => void };
const commands = ['init', 'analyze', 'generate', 'validate'];
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
    diff: null,
    ...selection,
  };
}
async function execute(
  command: string,
  options: Options,
  signal?: AbortSignal,
): Promise<Omit<Report, 'schemaVersion' | 'command'>> {
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
  const findings = await analyze(reader, config, scan, location);
  assertSchema('analysis', findings.analysis);
  if (command === 'analyze')
    return {
      status: 'ok',
      exitCode: 0,
      diagnostics: findings.analysis.diagnostics,
      data: findings.analysis,
    };
  if (await reader.exists(config.output))
    throw new Failure(
      'E_EXISTS',
      3,
      'Output already exists; generation never replaces existing documentation.',
      config.output,
    );
  const result = await generate(findings, config),
    diagnostics = [
      ...findings.analysis.diagnostics,
      ...(await validateDocument(result.text, config.output, reader)),
    ].sort(diagnosticsOrder);
  if (diagnostics.some((d) => d.severity === 'error'))
    return { status: 'invalid', exitCode: 1, diagnostics, data: null };
  const committed = await reader.create(config.output, result.text, !!options.dryRun, signal);
  return {
    status: 'ok',
    exitCode: 0,
    diagnostics,
    data: change(
      config.output,
      !!options.dryRun,
      committed,
      result.text,
      findings.analysis.sourceFingerprint,
      result.selection,
    ),
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
            validate: 'Check a Markdown document offline',
          }[name]!,
        )
        .allowExcessArguments(false);
      if (['init', 'generate'].includes(name))
        sub.option('--dry-run', 'Preview without any filesystem writes');
      if (['analyze', 'generate'].includes(name))
        sub.option('--project-type <id>', 'Explicit project profile');
      if (name === 'generate')
        sub
          .option('--output <path>', 'Root-relative output')
          .option('--language <tag>', 'Output language (MVP: en)')
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
    const data = report.data as { text?: string; preview?: string; path?: string } | null;
    if (report.status === 'ok' && report.command === 'analyze') {
      const a = report.data as import('../shared/types.js').Analysis;
      io.stdout(
        `Profile: ${a.projectType.selected}\nInspected files: ${a.files.length}\nSourced facts: ${a.facts.length}\nFingerprint: ${a.sourceFingerprint}\n`,
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

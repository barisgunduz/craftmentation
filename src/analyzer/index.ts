import fs from 'node:fs/promises';
import { withoutMarkers } from '../renderer/managed.js';
import path from 'node:path';
import { SafeFS, hash, safeRelative } from '../filesystem/index.js';
import { catalog, strictJSON } from '../shared/library.js';
import { Failure, compare } from '../shared/errors.js';
import { unsafeText } from '../shared/safety.js';
import { parseMarkdown, plain } from '../shared/markdown.js';
import type {
  Analysis,
  Config,
  Content,
  Diagnostic,
  Fact,
  Field,
  Source,
} from '../shared/types.js';
const excluded =
  /^(?:\.git|\.svn|\.hg|node_modules|vendor|dist|build|coverage|__pycache__|\.aws|\.ssh|\.gnupg|\.venv|venv|\.idea|\.vscode)$/i;
const binary = /\.(png|jpe?g|gif|ico|webp|pdf|zip|gz|woff2?|ttf|mp[34]|mov|exe|dll|so|dylib|pyc)$/i;
export async function inventory(
  reader: SafeFS,
  maxFiles = 10000,
  signal?: AbortSignal,
): Promise<{
  texts: Map<string, string>;
  files: Analysis['files'];
  diagnostics: Diagnostic[];
  limits: Analysis['limits'];
}> {
  const texts = new Map<string, string>(),
    files: Analysis['files'] = [],
    diagnostics: Diagnostic[] = [];
  const limits: Analysis['limits'] = {
    filesVisited: 0,
    bytesRead: 0,
    truncated: false,
    skipped: [],
  };
  const skip = new Set<string>();
  let entriesVisited = 0;
  function limit(): never {
    throw new Failure(
      'E_SCAN_LIMIT',
      4,
      'Repository inspection exceeded its bounded resource limit.',
    );
  }
  async function walk(directory: string, depth: number): Promise<void> {
    if (signal?.aborted) throw new Failure('E_INTERRUPTED', 4, 'Operation interrupted.');
    if (depth > 20) limit();
    const physical = path.join(reader.root, directory);
    const current = await fs.lstat(physical);
    if (
      !current.isDirectory() ||
      current.isSymbolicLink() ||
      (await fs.realpath(physical)) !== physical
    )
      throw new Failure('E_CONCURRENT', 3, 'Directory identity changed during inspection.');
    const entries = [];
    for await (const entry of await fs.opendir(physical)) {
      if (++entriesVisited > maxFiles) limit();
      entries.push(entry);
    }
    entries.sort((a, b) => compare(a.name, b.name));
    for (const entry of entries) {
      if (signal?.aborted) throw new Failure('E_INTERRUPTED', 4, 'Operation interrupted.');
      if (
        excluded.test(entry.name) ||
        /(?:\.craftmentation(?:-|\.)|\.DS_Store$)/.test(entry.name)
      ) {
        skip.add('generated or protected entries');
        continue;
      }
      const relative = directory ? `${directory}/${entry.name}` : entry.name;
      try {
        safeRelative(relative);
        if (unsafeText(relative)) throw new Error('sensitive path');
      } catch {
        skip.add('nonportable or protected paths');
        continue;
      }
      if (entry.isSymbolicLink()) {
        skip.add('symlinks');
        continue;
      }
      if (entry.isDirectory()) {
        await walk(relative, depth + 1);
        continue;
      }
      if (!entry.isFile()) {
        skip.add('nonregular entries');
        continue;
      }
      if (++limits.filesVisited > maxFiles) limit();
      if (binary.test(relative)) {
        skip.add('binary assets');
        continue;
      }
      const buffer = await reader.read(relative);
      limits.bytesRead += buffer.length;
      if (limits.bytesRead > 32 * 1024 * 1024) limit();
      let text;
      try {
        text = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(buffer);
      } catch {
        skip.add('non-UTF-8 files');
        continue;
      }
      if (text.includes('\0')) {
        skip.add('binary content');
        continue;
      }
      const role = /^license$|^copying$|^notice$/i.test(path.posix.basename(relative))
        ? 'license'
        : relative.endsWith('package.json')
          ? 'manifest'
          : /(^|\/)tests?\//.test(relative)
            ? 'test'
            : relative.startsWith('.github/')
              ? 'ci'
              : /\.md$/i.test(relative)
                ? 'documentation'
                : /\.(json|toml|ya?ml)$/i.test(relative)
                  ? 'configuration'
                  : 'source';
      files.push({ path: relative, sha256: hash(buffer), role });
      if (unsafeText(text)) {
        skip.add('potentially sensitive or hostile content');
        diagnostics.push({
          code: 'W_UNSAFE_CONTENT',
          severity: 'warning',
          message: 'Potentially sensitive or hostile content was excluded from facts.',
          path: relative,
        });
        continue;
      }
      texts.set(relative, text);
    }
  }
  await walk('', 0);
  limits.skipped = [...skip].sort(compare);
  files.sort((a, b) => compare(a.path, b.path));
  return { texts, files, diagnostics, limits };
}
export function detect(texts: Map<string, string>): { detected: string; signals: Source[] } {
  const manifest = texts.get('package.json');
  if (manifest) {
    const pkg = strictJSON(manifest, 'package.json') as Record<string, unknown>;
    if (pkg && typeof pkg === 'object' && !Array.isArray(pkg)) {
      const dependencies = { ...(pkg.dependencies as object), ...(pkg.devDependencies as object) };
      const workspaces = Array.isArray(pkg.workspaces)
        ? pkg.workspaces.length > 0
        : pkg.workspaces &&
          typeof pkg.workspaces === 'object' &&
          Array.isArray((pkg.workspaces as { packages?: unknown }).packages) &&
          (pkg.workspaces as { packages: unknown[] }).packages.length > 0;
      const bin =
        typeof pkg.bin === 'string'
          ? pkg.bin.trim()
          : pkg.bin && typeof pkg.bin === 'object' && Object.keys(pkg.bin).length > 0;
      const mobile = 'react-native' in dependencies || 'expo' in dependencies,
        desktop = 'electron' in dependencies;
      const web = ['next', 'react', 'vue', 'svelte'].some((k) => k in dependencies),
        api = ['express', 'fastify', 'koa'].some((k) => k in dependencies);
      const kind = workspaces
        ? 'monorepo'
        : bin
          ? 'cli-tool'
          : mobile && desktop
            ? 'general'
            : mobile
              ? 'mobile-app'
              : desktop
                ? 'desktop-app'
                : pkg.exports || pkg.main
                  ? 'library'
                  : web && api
                    ? 'general'
                    : web
                      ? 'web-app'
                      : api
                        ? 'api'
                        : 'general';
      return {
        detected: kind,
        signals: [
          {
            path: 'package.json',
            locator: 'manifest fields and dependency names (type hints only)',
          },
        ],
      };
    }
  }
  return texts.has('index.html')
    ? {
        detected: 'static-website',
        signals: [{ path: 'index.html', locator: 'static HTML entry point' }],
      }
    : { detected: 'general', signals: [] };
}
export type Findings = { analysis: Analysis; content: Content };
export async function analyze(
  reader: SafeFS,
  config: Config,
  scan: Awaited<ReturnType<typeof inventory>>,
  configPath = 'craftmentation.config.json',
): Promise<Findings> {
  const facts: Fact[] = [],
    content: Content = {};
  function set(
    id: string,
    values: string[],
    source: string,
    format: Field['format'] = 'text',
  ): void {
    if (values.some(unsafeText)) return;
    const section = catalog.find((s) => s.id === id)!;
    content[id] = Object.fromEntries(
      section.fields.map((key, i) => [
        key,
        { value: values[i] ?? '', format, sources: [source], safe: true },
      ]),
    );
    facts.push({
      id: `${id}-source`,
      kind: id === 'license' ? 'license' : 'text',
      value: values.filter(Boolean).join('\n\n'),
      state: 'verified',
      verification: 'inspected',
      sources: [{ path: source, locator: id }],
      safe: true,
    });
  }
  const readme = scan.texts.has(config.output)
    ? config.output
    : [...scan.texts.keys()].find((x) => /^readme\.md$/i.test(x));
  if (readme) {
    const text = withoutMarkers(scan.texts.get(readme)!),
      tree = parseMarkdown(text),
      nodes = tree.children ?? [];
    const title = nodes.find((n) => n.type === 'heading' && n.depth === 1);
    if (title && plain(title).trim()) set('project-name', [plain(title).trim()], readme);
    const intro = nodes
      .slice(title ? nodes.indexOf(title) + 1 : 0)
      .find((n) => n.type === 'paragraph');
    if (intro && plain(intro).trim()) set('description', [plain(intro).trim()], readme);
    const aliases: Record<string, string> = {
      'quick start': 'usage',
      'getting started': 'usage',
      'tech stack': 'technology-stack',
      development: 'local-development',
    };
    for (const [i, node] of nodes.entries()) {
      if (node.type !== 'heading' || node.depth !== 2) continue;
      const heading = plain(node).trim().toLowerCase(),
        section =
          aliases[heading] ?? catalog.find((s) => s.standardItem.toLowerCase() === heading)?.id;
      if (!section || ['project-name', 'description', 'license'].includes(section)) continue;
      const end =
        nodes.slice(i + 1).find((n) => n.type === 'heading' && n.depth! <= 2)?.position?.start
          .offset ?? text.length;
      const body = text.slice(node.position!.end.offset, end).trim();
      if (body && !content[section]) set(section, [body], readme, 'markdown');
    }
  }
  if (scan.texts.has('package.json')) {
    const pkg = strictJSON(scan.texts.get('package.json')!, 'package.json') as Record<
      string,
      unknown
    >;
    if (pkg && typeof pkg === 'object' && !Array.isArray(pkg)) {
      if (typeof pkg.name === 'string' && pkg.name.trim())
        set('project-name', [pkg.name.trim()], 'package.json');
      if (typeof pkg.description === 'string' && pkg.description.trim())
        set('description', [pkg.description.trim()], 'package.json');
      if (pkg.engines && typeof pkg.engines === 'object' && !Array.isArray(pkg.engines)) {
        const values = Object.entries(pkg.engines)
          .filter(([, v]) => typeof v === 'string')
          .map(([k, v]) => `${k}: ${v}`);
        if (values.length && !content.requirements)
          set('requirements', [values.join('\n'), ''], 'package.json');
      }
      if (pkg.scripts && typeof pkg.scripts === 'object' && !Array.isArray(pkg.scripts)) {
        const entries = Object.entries(pkg.scripts).filter(
          ([name, v]) => typeof v === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9:._-]*$/.test(name),
        );
        if (entries.length && !content.scripts)
          set(
            'scripts',
            [
              entries
                .map(
                  ([name]) =>
                    `- \`npm run ${name}\` — declared in package.json; inspect before running. No successful execution is implied.`,
                )
                .join('\n'),
            ],
            'package.json',
            'markdown',
          );
        for (const [name, value] of entries)
          if (/^[a-zA-Z0-9][a-zA-Z0-9:._-]*$/.test(name))
            facts.push({
              id: `script-${hash(name).slice(0, 12)}`,
              kind: 'command',
              value: unsafeText(value as string) ? null : (value as string),
              state: unsafeText(value as string) ? 'unknown' : 'verified',
              verification: 'inspected',
              sources: [{ path: 'package.json', locator: `scripts.${name}` }],
              safe: !unsafeText(value as string),
            });
      }
    }
  }
  if (!content.overview && content.description) {
    const field = Object.values(content.description)[0]!;
    set('overview', [field.value, ''], field.sources[0]!);
  }
  for (const [filename, body] of scan.texts) {
    if (/^license(?:\.md|\.txt)?$/i.test(filename)) {
      // License declaration requires an actual notice; never infer it from a manifest.
      const label =
        /MIT License/.test(body) &&
        /Permission is hereby granted, free of charge/.test(body) &&
        /THE SOFTWARE IS PROVIDED "AS IS"/.test(body)
          ? 'MIT License'
          : 'the license terms in the repository notice';
      set(
        'license',
        [
          `See ${label} in [${filename}](${encodeURI(filename)}).`,
          'Retain the copyright, permission, and third-party notices required by that file.',
        ],
        filename,
        'markdown',
      );
      break;
    }
  }
  if (config.assets.length) {
    for (const asset of config.assets) await reader.resolve(asset.path);
    const markdown = config.assets
      .map(
        (a) =>
          `![${a.alt.replace(/[\\[\]]/g, '\\$&')}](${encodeURI(a.path).replace(/[()]/g, (c) => encodeURIComponent(c))})`,
      )
      .join('\n\n');
    set('logo', [markdown], configPath, 'markdown');
  }
  if (config.content.license && !content.license)
    throw new Failure(
      'E_EVIDENCE',
      1,
      'License content requires an inspected target license notice.',
    );
  for (const [id, values] of Object.entries(config.content)) {
    for (const field of Object.values(values))
      for (const source of field.sources) {
        if (source.startsWith('maintainer:')) {
          if (!source.slice(11).trim())
            throw new Failure('E_CONFIG', 2, 'Maintainer attribution must be explicit.');
        } else await reader.read(source);
      }
    content[id] = { ...content[id], ...values };
    const safeValues = Object.values(values);
    facts.push({
      id: `${id}-configured`,
      kind: 'text',
      value:
        safeValues
          .map((x) => x.value)
          .filter(Boolean)
          .join('\n\n') || null,
      state: safeValues.some((x) => x.value) ? 'verified' : 'unknown',
      verification: 'maintainer',
      sources: safeValues.flatMap((x) =>
        x.sources
          .filter((s) => !s.startsWith('maintainer:'))
          .map((s) => ({ path: s, locator: 'explicit configured content' })),
      ),
      safe: true,
    });
    // Maintainer statements have config as their inspectable provenance, never a fake path.
    if (!facts.at(-1)!.sources.length)
      facts.at(-1)!.sources.push({ path: configPath, locator: 'explicit maintainer statement' });
  }
  const evidence: Analysis['selection']['evidence'] = {};
  for (const section of catalog) {
    const fields = content[section.id];
    if (
      fields &&
      section.fields.every((k) => fields[k]?.safe && fields[k]?.sources.length) &&
      Object.values(fields).some((x) => x.value.trim())
    )
      evidence[section.id] = {
        state: 'verified',
        sources: [...new Set(Object.values(fields).flatMap((f) => f.sources))],
        safe: true,
      };
  }
  const detection = detect(scan.texts);
  const analysis: Analysis = {
    schemaVersion: 1,
    root: '.',
    sourceFingerprint: hash(scan.files.map((f) => `${f.path}\0${f.sha256}`).join('\n')),
    projectType: {
      ...detection,
      selected: config.projectType === 'auto' ? detection.detected : config.projectType,
    },
    files: scan.files,
    facts: facts.sort((a, b) => compare(a.id, b.id)),
    selection: {
      profile: config.projectType === 'auto' ? detection.detected : config.projectType,
      include: [
        ...new Set([
          ...Object.keys(config.sections).filter((k) => config.sections[k] === true),
          ...(config.assets.length ? ['logo'] : []),
        ]),
      ],
      exclude: Object.keys(config.sections).filter((k) => config.sections[k] === false),
      evidence,
      customSections: [],
    },
    diagnostics: scan.diagnostics,
    limits: scan.limits,
  };
  return { analysis, content };
}

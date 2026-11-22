import { SafeFS, safeRelative } from '../filesystem/index.js';
import { assertSchema, catalog, profiles, strictJSON } from '../shared/library.js';
import { Failure } from '../shared/errors.js';
import { unsafeText } from '../shared/safety.js';
import type { Config, Options } from '../shared/types.js';
export const configName = 'craftmentation.config.json';
export const initialConfig = JSON.stringify({ schemaVersion: 1 }, null, 2) + '\n';
export function defaults(): Config {
  return {
    schemaVersion: 1,
    projectType: 'auto',
    language: 'en',
    additionalLanguages: [],
    output: 'README.md',
    template: 'default',
    sections: {},
    customSections: [],
    content: {},
    assets: [],
    profiles: {},
    ai: { enabled: false, provider: null },
  };
}
export function merge(base: Config, extra: Partial<Config>): Config {
  const content = { ...base.content };
  for (const [id, fields] of Object.entries(extra.content ?? {}))
    content[id] = { ...content[id], ...fields };
  return {
    ...base,
    ...extra,
    sections: { ...base.sections, ...extra.sections },
    content,
    ai: { ...base.ai, ...extra.ai },
  };
}
export function applyOptions(config: Config, options: Options): Config {
  for (const id of [...(options.include ?? []), ...(options.exclude ?? [])]) {
    if (!catalog.some((section) => section.id === id))
      throw new Failure('E_CONFIG', 2, 'Unknown or unsupported custom section.');
  }
  const result = merge(config, {
    ...(options.output !== undefined ? { output: options.output } : {}),
    ...(options.language !== undefined ? { language: options.language } : {}),
    ...(options.projectType !== undefined ? { projectType: options.projectType } : {}),
  });
  for (const id of options.include ?? []) result.sections[id] = true;
  for (const id of options.exclude ?? []) result.sections[id] = false;
  return result;
}
export async function loadConfig(reader: SafeFS, options: Options): Promise<Config> {
  const location = options.config ?? configName;
  safeRelative(location);
  let value: unknown = { schemaVersion: 1 };
  if (await reader.exists(location)) value = strictJSON(await reader.text(location), location);
  else if (options.config !== undefined)
    throw new Failure('E_CONFIG', 2, 'Requested configuration file is missing.', location);
  if (value && typeof value === 'object' && 'schemaVersion' in value && value.schemaVersion !== 1)
    throw new Failure('E_SCHEMA_VERSION', 2, 'Unsupported configuration schemaVersion.', location);
  assertSchema('configuration', value, location);
  return applyOptions(merge(defaults(), value as Partial<Config>), options);
}
export function effectiveConfig(base: Config, detected: string, options: Options): Config {
  const selected =
    options.projectType ?? (base.projectType === 'auto' ? detected : base.projectType);
  if (!profiles[selected]) throw new Failure('E_CONFIG', 2, 'Unknown project profile.');
  const result = applyOptions(merge(base, base.profiles[selected] ?? {}), options);
  checkConfig(result);
  return result;
}
export function checkConfig(config: Config): void {
  assertSchema('configuration', config);
  safeRelative(config.output);
  if (
    config.output
      .split('/')
      .some((p) => /^\.(github|claude|cursor|codex|agents|windsurf|devin)$/i.test(p)) ||
    !config.output.toLowerCase().endsWith('.md') ||
    /^(agents|claude|contributing|security|support|code_of_conduct|license|copying|notice)(?:\.|$)/i.test(
      config.output.split('/').at(-1)!,
    )
  )
    throw new Failure('E_PATH', 3, 'Output must be an unprotected Markdown document.');
  if (
    config.language !== 'en' ||
    config.additionalLanguages.length ||
    config.template !== 'default' ||
    config.customSections.length ||
    config.ai.enabled
  )
    throw new Failure(
      'E_CAPABILITY',
      2,
      'MVP supports English, bundled templates, built-in sections, and deterministic generation only.',
    );
  if (config.additionalLanguages.includes(config.language))
    throw new Failure('E_CONFIG', 2, 'Primary language cannot appear in additionalLanguages.');
  for (const [id, fields] of Object.entries(config.content)) {
    const section = catalog.find((s) => s.id === id);
    if (!section)
      throw new Failure(
        'E_CONFIG',
        2,
        'Content references an unknown or unsupported custom section.',
      );
    for (const [field, value] of Object.entries(fields)) {
      if (!section.fields.includes(field))
        throw new Failure('E_CONFIG', 2, 'Content field does not belong to the selected section.');
      if (!value.safe || unsafeText(value.value))
        throw new Failure('E_EVIDENCE', 1, 'Unsafe content cannot be included.');
    }
  }
  for (const id of Object.keys(config.sections))
    if (!catalog.some((s) => s.id === id))
      throw new Failure('E_CONFIG', 2, 'Unknown or unsupported custom section.');
  for (const asset of config.assets) safeRelative(asset.path);
}

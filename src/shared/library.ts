import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Ajv2020 } from 'ajv/dist/2020.js';
import { parseTree, type Node as JSONNode, type ParseError } from 'jsonc-parser';
import { Failure } from './errors.js';
import type { Profile, Section } from './types.js';
export const packageRoot = fileURLToPath(new URL('../../', import.meta.url));
export function strictJSON(text: string, location?: string): unknown {
  const errors: ParseError[] = [];
  const tree = parseTree(text, errors, { disallowComments: true, allowTrailingComma: false });
  if (!tree || errors.length) throw new Failure('E_CONFIG', 2, 'Invalid strict JSON.', location);
  function walk(node: JSONNode): void {
    if (node.type === 'object') {
      const seen = new Set<string>();
      for (const prop of node.children ?? []) {
        const key: string = prop.children?.[0]?.value;
        if (
          seen.has(key) ||
          ['__proto__', 'prototype', 'constructor', 'valueOf', 'toString'].includes(key)
        )
          throw new Failure(
            'E_CONFIG',
            2,
            'Duplicate or prototype-affecting JSON property.',
            location,
          );
        seen.add(key);
      }
    }
    for (const child of node.children ?? []) walk(child);
  }
  walk(tree);
  return JSON.parse(text) as unknown;
}
export const bundledText = (relative: string): Promise<string> =>
  readFile(path.join(packageRoot, relative), 'utf8');
export const bundledJSON = async <T>(relative: string): Promise<T> =>
  strictJSON(await bundledText(relative)) as T;
export const catalog = (await bundledJSON<{ sections: Section[] }>('templates/catalog.json'))
  .sections;
export const profiles: Record<string, Profile> = Object.fromEntries(
  await Promise.all(
    (await readdir(path.join(packageRoot, 'templates/profiles')))
      .filter((x) => x.endsWith('.json'))
      .sort()
      .map(async (x) => {
        const p = await bundledJSON<Profile>(`templates/profiles/${x}`);
        return [p.id, p];
      }),
  ),
);
export const version = (await bundledJSON<{ version: string }>('package.json')).version;
const ajv = new Ajv2020({
  strict: true,
  allErrors: true,
  coerceTypes: false,
  removeAdditional: false,
  useDefaults: false,
});
for (const name of ['library', 'config', 'analysis', 'report'])
  ajv.addSchema(await bundledJSON(`schemas/${name}.schema.json`));
for (const id of ['library', 'configuration', 'analysis', 'report'])
  if (!ajv.getSchema(`urn:craftmentation:${id}:v1`)) throw new Error('Missing bundled schema');
export function assertSchema(id: string, value: unknown, location?: string): void {
  const validator = ajv.getSchema(`urn:craftmentation:${id}:v1`)!;
  if (!validator(value))
    throw new Failure(
      id === 'configuration' ? 'E_CONFIG' : 'E_INTERNAL',
      id === 'configuration' ? 2 : 5,
      `Invalid ${id} structure at ${validator.errors?.[0]?.instancePath || '/'}.`,
      location,
    );
}
assertSchema('library', await bundledJSON('templates/catalog.json'));
for (const profile of Object.values(profiles)) assertSchema('library', profile);

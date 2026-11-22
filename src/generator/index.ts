import { catalog, profiles, bundledText } from '../shared/library.js';
import { select } from './selection.js';
import { render } from '../renderer/index.js';
import type { Findings } from '../analyzer/index.js';
import { Failure } from '../shared/errors.js';
import type { Config } from '../shared/types.js';
export async function generate(
  findings: Findings,
  config: Config,
): Promise<{ text: string; selection: ReturnType<typeof select> }> {
  const selection = select(catalog, profiles, findings.analysis.selection);
  if (selection.unresolved.length)
    throw new Failure(
      'E_EVIDENCE',
      1,
      `Missing verified content for: ${selection.unresolved.join(', ')}. Supply source-backed content in configuration.`,
    );
  const fragments = Object.fromEntries(
    await Promise.all(
      selection.selected.map(async (id) => [
        id,
        await bundledText(catalog.find((s) => s.id === id)!.path),
      ]),
    ),
  );
  return {
    text: render(catalog, selection.selected, findings.content, fragments, config.output),
    selection,
  };
}

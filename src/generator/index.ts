import { catalog, profiles, bundledText } from '../shared/library.js';
import { select } from './selection.js';
import { render } from '../renderer/index.js';
import type { Findings } from '../analyzer/index.js';
import { Failure } from '../shared/errors.js';
import type { Config } from '../shared/types.js';
export async function generate(
  findings: Findings,
  config: Config,
  managed = false,
): Promise<{ text: string; selection: ReturnType<typeof select> }> {
  const selection = select(catalog, profiles, findings.analysis.selection);
  if (selection.unresolved.length)
    throw new Failure(
      'E_EVIDENCE',
      1,
      `Missing verified content for: ${selection.unresolved.join(', ')}. Add the missing facts to your existing README or provide reviewed content. For missing usage, write a root-relative Markdown file with real steps, then retry generate --usage-file USAGE.md --dry-run. Other fields can be supplied in content; see docs/configuration.md.`,
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
    text: render(catalog, selection.selected, findings.content, fragments, config.output, managed),
    selection,
  };
}

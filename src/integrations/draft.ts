import { aiSections, evidenceBundle, prompt } from './evidence.js';
import { requestProposal, type Agent, type Runner } from './agents.js';
import { assertSchema, catalog, profiles, bundledText } from '../shared/library.js';
import { Failure } from '../shared/errors.js';
import { unsafeText } from '../shared/safety.js';
import { parseMarkdown, visit } from '../shared/markdown.js';
import { render, rebaseMarkdown } from '../renderer/index.js';
import type { Findings, inventory } from '../analyzer/index.js';
import type { Config, Content, Selection } from '../shared/types.js';

export type Proposal = {
  projectType: string;
  sections: { id: string; content: string; sources: { path: string; quote: string }[] }[];
  unknowns: string[];
};
export async function aiDraft(
  scan: Awaited<ReturnType<typeof inventory>>,
  findings: Findings,
  config: Config,
  agent: Agent,
  contextOnly: boolean,
  signal?: AbortSignal,
  runner?: Runner,
) {
  const bundle = evidenceBundle(scan);
  const metadata = {
    agent,
    reviewStatus: 'unreviewed',
    fingerprint: bundle.fingerprint,
    contextBytes: bundle.bytes,
    includedFiles: bundle.files.map((f) => f.path),
    omittedFiles: bundle.omitted,
    omittedCount: bundle.omittedCount,
    truncatedFiles: bundle.files.filter((f) => f.truncated).map((f) => f.path),
  };
  if (contextOnly)
    return {
      text: JSON.stringify(bundle, null, 2) + '\n',
      selection: { selected: [], omitted: [], unresolved: [] } as Selection,
      ai: { ...metadata, kind: 'context', unknowns: [], citations: [] },
    };
  const requested = findings.analysis.selection;
  const raw = await requestProposal(
    agent,
    prompt(bundle, {
      profile:
        config.projectType === 'auto'
          ? `auto (static hint: ${requested.profile})`
          : config.projectType,
      include: requested.include,
      exclude: requested.exclude,
    }),
    signal,
    runner,
  );
  try {
    assertSchema('proposal', raw);
  } catch {
    throw new Failure('E_PROVIDER', 6, 'Agent proposal does not match the required schema.');
  }
  const proposal = raw as Proposal;
  const bad = (): never => {
    throw new Failure(
      'E_PROVIDER',
      6,
      'Proposal contains unsupported, unsafe, duplicate, or uncited content. Review the evidence; no target document was written.',
    );
  };
  if (
    !profiles[proposal.projectType] ||
    (config.projectType !== 'auto' && proposal.projectType !== config.projectType) ||
    unsafeText(JSON.stringify(proposal))
  )
    bad();
  const content: Content = {},
    ids = new Set<string>();
  for (const section of proposal.sections) {
    const record = aiSections.find((s) => s.id === section.id);
    if (!record || ids.has(section.id) || requested.exclude.includes(section.id)) bad();
    ids.add(section.id);
    for (const source of section.sources) {
      const file = bundle.files.find((f) => f.path === source.path);
      if (!file || !source.quote.trim() || !file.content.includes(source.quote)) bad();
    }
    visit(parseMarkdown(section.content), (node) => {
      if (node.type === 'heading' && node.depth! < 3) bad();
      if (
        node.url &&
        /^[a-z][a-z0-9+.-]*:/i.test(node.url) &&
        !bundle.files.some((f) => f.content.includes(node.url!))
      )
        bad();
    });
    const text = rebaseMarkdown(section.content, 'README.md', config.output);
    content[section.id] = Object.fromEntries(
      record!.fields.map((field, index) => [
        field,
        {
          value: index ? '' : text,
          format: ['project-name', 'description'].includes(section.id) ? 'text' : 'markdown',
          sources: section.sources.map((s) => s.path),
          safe: true,
        },
      ]),
    );
  }
  for (const id of [
    ...catalog.filter((s) => s.classification === 'Core').map((s) => s.id),
    ...requested.include.filter((id) => id !== 'license'),
  ])
    if (!ids.has(id)) bad();
  // Licensing is derived from the inspected target notice, never from model interpretation.
  if (findings.content.license && config.sections.license !== false) {
    ids.add('license');
    content.license = Object.fromEntries(
      Object.entries(findings.content.license).map(([key, f]) => [
        key,
        { ...f, value: rebaseMarkdown(f.value, f.sources[0]!, config.output) },
      ]),
    );
  } else if (requested.include.includes('license'))
    throw new Failure('E_EVIDENCE', 1, 'Requested license requires an inspected target notice.');
  const selected = catalog
    .filter((s) => ids.has(s.id))
    .sort((a, b) => a.order - b.order)
    .map((s) => s.id);
  const fragments = Object.fromEntries(
    await Promise.all(
      selected.map(async (id) => [id, await bundledText(catalog.find((s) => s.id === id)!.path)]),
    ),
  );
  const text =
    '<!-- AI-assisted draft: review factual accuracy before publishing. -->\n\n' +
    render(catalog, selected, content, fragments, config.output, false, true);
  return {
    text,
    selection: {
      selected,
      omitted: catalog.filter((s) => !ids.has(s.id)).map((s) => s.id),
      unresolved: [],
    } as Selection,
    ai: {
      ...metadata,
      kind: 'proposal',
      projectType: proposal.projectType,
      unknowns: proposal.unknowns,
      citations: proposal.sections.map((s) => ({ id: s.id, sources: s.sources })),
    },
  };
}

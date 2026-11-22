import type { Section, Profile, SelectionRequest, Selection } from '../shared/types.js';
import { Failure, compare } from '../shared/errors.js';
// Shared with all profiles; this pure function never reads a filesystem or writes output.
export function select(
  sections: Section[],
  profiles: Record<string, Profile>,
  request: SelectionRequest,
): Selection {
  const records = [...sections, ...request.customSections];
  if (new Set(records.map((s) => s.id)).size !== records.length || !profiles[request.profile])
    throw new Failure('E_CONFIG', 2, 'Duplicate section ID or unknown profile.');
  for (const custom of request.customSections)
    if (!custom.id.startsWith('custom-') || custom.classification === 'Core')
      throw new Failure('E_CONFIG', 2, 'Invalid custom section.');
  const known = new Set(records.map((s) => s.id));
  if (
    [...request.include, ...request.exclude, ...Object.keys(request.evidence)].some(
      (id) => !known.has(id),
    )
  )
    throw new Failure('E_CONFIG', 2, 'Unknown section ID.');
  for (const evidence of Object.values(request.evidence))
    if (
      !['verified', 'missing', 'unknown'].includes(evidence.state) ||
      typeof evidence.safe !== 'boolean' ||
      !Array.isArray(evidence.sources) ||
      evidence.sources.some((s) => typeof s !== 'string' || !s.trim())
    )
      throw new Failure('E_CONFIG', 2, 'Invalid evidence record.');
  const core = new Set(records.filter((s) => s.classification === 'Core').map((s) => s.id));
  if (request.exclude.some((id) => core.has(id)))
    throw new Failure('E_CONFIG', 2, 'Cannot exclude Core information.');
  const candidates = new Set([
    ...core,
    ...sections.filter((s) => s.classification === 'Recommended').map((s) => s.id),
    ...profiles[request.profile]!.recommendations,
    ...request.include,
  ]);
  const result: Selection = { selected: [], omitted: [], unresolved: [] };
  for (const record of records.sort((a, b) => a.order - b.order || compare(a.id, b.id))) {
    const id = record.id,
      e = request.evidence[id];
    if (!candidates.has(id) || request.exclude.includes(id)) result.omitted.push(id);
    else if (e?.state === 'verified' && e.safe && e.sources.length) result.selected.push(id);
    else if (core.has(id) || request.include.includes(id)) result.unresolved.push(id);
    else result.omitted.push(id);
  }
  return result;
}

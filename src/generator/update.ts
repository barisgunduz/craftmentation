import { regions, wrap } from '../renderer/managed.js';
import { Failure } from '../shared/errors.js';

export function updatePlan(original: string, generated: string): string {
  const existing = regions(original),
    proposed = new Map(regions(generated).map((r) => [r.id, r.body]));
  let result = original;
  for (const region of existing.reverse()) {
    const body = proposed.get(region.id);
    if (body === undefined)
      throw new Failure(
        'E_EVIDENCE',
        1,
        `Cannot refresh managed section ${region.id}. Keep verified evidence available; sections are never silently deleted.`,
      );
    // Keep unchanged regions byte-for-byte, including CRLF and marker formatting.
    if (body.replace(/\r\n/g, '\n') === region.body.replace(/\r\n/g, '\n')) continue;
    const eol = region.body.includes('\r\n') ? '\r\n' : '\n';
    const replacement = wrap(region.id, body.replace(/\r?\n/g, eol), eol);
    result = result.slice(0, region.start) + replacement + result.slice(region.end);
  }
  regions(result);
  return result;
}

export function diff(before: string, after: string, file: string): string | null {
  if (before === after) return null;
  const a = before.split('\n'),
    b = after.split('\n');
  let start = 0,
    tail = 0;
  while (start < a.length && start < b.length && a[start] === b[start]) start++;
  while (
    tail < a.length - start &&
    tail < b.length - start &&
    a[a.length - tail - 1] === b[b.length - tail - 1]
  )
    tail++;
  const from = Math.max(0, start - 3),
    aEnd = Math.min(a.length, a.length - tail + 3),
    bEnd = Math.min(b.length, b.length - tail + 3);
  return (
    [
      `--- a/${file}`,
      `+++ b/${file}`,
      `@@ -${from + 1},${aEnd - from} +${from + 1},${bEnd - from} @@`,
      ...a.slice(from, start).map((s) => ' ' + s),
      ...a.slice(start, a.length - tail).map((s) => '-' + s),
      ...b.slice(start, b.length - tail).map((s) => '+' + s),
      ...a.slice(a.length - tail, aEnd).map((s) => ' ' + s),
    ].join('\n') + '\n'
  );
}

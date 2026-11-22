import { hash } from '../filesystem/index.js';
import { catalog } from '../shared/library.js';
import { parseMarkdown, visit } from '../shared/markdown.js';
import { Failure } from '../shared/errors.js';

export type Region = { id: string; start: number; end: number; body: string };
export function wrap(id: string, body: string, eol = '\n'): string {
  const bytes = body.endsWith(eol) ? body : body + eol;
  return `<!-- craftmentation:begin ${id} ${hash(bytes)} -->${eol}${bytes}<!-- craftmentation:end ${id} -->`;
}

// Ownership is explicit, standalone Markdown HTML, never inferred from headings.
export function regions(text: string): Region[] {
  const tokens: { start: number; end: number; value: string }[] = [];
  visit(parseMarkdown(text), (node) => {
    if (node.type !== 'html' || !node.value?.includes('craftmentation:')) return;
    const start = node.position!.start.offset!,
      end = node.position!.end.offset!;
    tokens.push({ start, end, value: text.slice(start, end) });
  });
  const fail = (): never => {
    throw new Failure(
      'E_OWNERSHIP',
      3,
      'Managed markers are malformed, ambiguous, or modified. Restore the reviewed original or reconcile with your agent; no files were changed.',
    );
  };
  const rawCount = [...text.matchAll(/craftmentation:/g)].length;
  if (tokens.length !== rawCount) fail();
  const result: Region[] = [],
    seen = new Set<string>();
  let open: { id: string; digest: string; start: number; bodyStart: number } | undefined;
  for (const token of tokens) {
    const begin = /^<!-- craftmentation:begin ([a-z][a-z0-9-]*) ([a-f0-9]{64}) -->$/.exec(
      token.value,
    );
    const end = /^<!-- craftmentation:end ([a-z][a-z0-9-]*) -->$/.exec(token.value);
    if (
      token.start > 0 &&
      text[token.start - 1] !== '\n' &&
      !(token.start === 1 && text.startsWith('\uFEFF'))
    )
      fail();
    const newline = text.slice(token.end).match(/^(\r?\n|$)/);
    if (!newline) fail();
    if (begin) {
      const id = begin[1]!;
      if (open || seen.has(id) || !catalog.some((s) => s.id === id)) fail();
      if (!newline![0]) fail();
      open = {
        id,
        digest: begin[2]!,
        start: token.start,
        bodyStart: token.end + newline![0].length,
      };
      seen.add(id);
    } else if (end) {
      if (!open || open.id !== end[1]) fail();
      const body = text.slice(open!.bodyStart, token.start);
      if (hash(body) !== open!.digest) fail();
      result.push({ id: open!.id, start: open!.start, end: token.end, body });
      open = undefined;
    } else fail();
  }
  if (open) fail();
  return result;
}

export function withoutMarkers(text: string): string {
  for (const region of regions(text).reverse())
    text = text.slice(0, region.start) + region.body + text.slice(region.end);
  return text;
}

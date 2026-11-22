import path from 'node:path';
import { wrap } from './managed.js';
import type { Content, Section } from '../shared/types.js';
import { escapeMarkdown } from '../shared/safety.js';
import { checkContent } from '../validator/index.js';
import { parseMarkdown, visit } from '../shared/markdown.js';
import { Failure } from '../shared/errors.js';
export function rebaseMarkdown(value: string, source: string, output: string): string {
  if (source.startsWith('maintainer:') || source === output) return value;
  const edits: { start: number; end: number; value: string }[] = [];
  visit(parseMarkdown(value), (node) => {
    const url = node.url;
    if (!url || /^(?:[a-z][a-z0-9+.-]*:|#|\/)/i.test(url) || !node.position) return;
    const [file = '', ...tail] = url.split('#');
    const relative = path.posix.relative(
      path.posix.dirname(output),
      path.posix.normalize(path.posix.join(path.posix.dirname(source), file)),
    );
    const replacement = relative + (tail.length ? '#' + tail.join('#') : '');
    const start = node.position.start.offset!,
      end = node.position.end.offset!,
      raw = value.slice(start, end),
      at = raw.lastIndexOf(url);
    if (at >= 0)
      edits.push({ start: start + at, end: start + at + url.length, value: replacement });
  });
  for (const edit of edits.sort((a, b) => b.start - a.start))
    value = value.slice(0, edit.start) + edit.value + value.slice(edit.end);
  return value;
}
export function render(
  sections: Section[],
  selected: string[],
  content: Content,
  fragments: Record<string, string>,
  output: string,
  managed = false,
): string {
  return (
    selected
      .map((id) => {
        const section = sections.find((s) => s.id === id)!,
          fields = content[id]!;
        const fragment = fragments[id]!.replace(/<!--[^]*?-->/g, '').trim();
        const tokens = [...fragment.matchAll(/\{\{([^]*?)\}\}/g)].map((m) => m[1]);
        if (
          tokens.some((t) => !section.fields.includes(t!)) ||
          section.fields.some((f) => !tokens.includes(f))
        )
          throw new Failure('E_INTERNAL', 5, 'Bundled template field mismatch.');
        const rendered = fragment
          .replace(/\{\{([A-Z][A-Z0-9_]*)\}\}/g, (_, name: string) => {
            const field = fields[name];
            if (!field?.safe || !field.sources.length)
              throw new Failure('E_EVIDENCE', 1, 'Selected field is missing verified content.');
            if (field.format === 'text') return escapeMarkdown(field.value);
            try {
              checkContent(field.value);
            } catch {
              throw new Failure(
                'E_CONTENT',
                1,
                'Configured or extracted Markdown contains unsafe content.',
              );
            }
            return rebaseMarkdown(field.value, field.sources[0]!, output);
          })
          .trim();
        return managed ? wrap(id, rendered.replace(/\r\n/g, '\n')) : rendered;
      })
      .join('\n\n')
      .replace(/\r\n/g, '\n') + '\n'
  );
}

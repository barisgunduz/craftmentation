import path from 'node:path';
import GithubSlugger from 'github-slugger';
import { parseFragment } from 'parse5';
import { SafeFS, safeRelative } from '../filesystem/index.js';
import { parseMarkdown, plain, visit, type MdNode } from '../shared/markdown.js';
import { unsafeText } from '../shared/safety.js';
import { diagnosticsOrder } from '../shared/errors.js';
import type { Diagnostic } from '../shared/types.js';
export function checkContent(text: string): void {
  if (unsafeText(text)) throw new Error('unsafe');
  visit(parseMarkdown(text), (node) => {
    if (
      (node.type === 'html' && !/^<!--[^]*-->$/.test(node.value ?? '')) ||
      (node.type === 'link' && !allowedURL(node.url ?? '')) ||
      (node.type === 'image' && !allowedURL(node.url ?? ''))
    )
      throw new Error('unsafe');
  });
}
function allowedURL(url: string): boolean {
  return !/^[a-z][a-z0-9+.-]*:/i.test(url) || /^(https?:|mailto:)/i.test(url);
}
function anchors(text: string): Set<string> {
  const result = new Set<string>(),
    slugger = new GithubSlugger();
  visit(parseMarkdown(text), (n) => {
    if (n.type === 'heading') result.add(slugger.slug(plain(n)));
    if (n.type === 'html')
      htmlAttributes(n.value ?? '', (_, key, value) => {
        if (key === 'id' || key === 'name') result.add(value);
      });
  });
  return result;
}
function htmlAttributes(
  value: string,
  fn: (tag: string, key: string, value: string) => void,
  tags?: (tag: string) => void,
): void {
  const root = parseFragment(value);
  function walk(node: any): void {
    if (node.tagName) tags?.(node.tagName);
    for (const attr of node.attrs ?? []) fn(node.tagName, attr.name, attr.value);
    for (const child of node.childNodes ?? []) walk(child);
    if (node.content) walk(node.content);
  }
  walk(root);
}
export async function validateDocument(
  text: string,
  document: string,
  reader: SafeFS,
  core = true,
): Promise<Diagnostic[]> {
  const diagnostics: Diagnostic[] = [],
    tree = parseMarkdown(text),
    links: { url: string; line: number }[] = [],
    definitions = new Map<string, string>();
  const add = (
    code: string,
    message: string,
    line?: number,
    severity: Diagnostic['severity'] = 'error',
  ) => diagnostics.push({ code, severity, message, path: document, ...(line ? { line } : {}) });
  if (unsafeText(text)) {
    add(
      'E_CONTENT',
      'Potentially sensitive or hostile content must be reviewed before publication.',
    );
    return diagnostics;
  }
  let h1 = 0,
    previous = 0;
  visit(tree, (n) => {
    if (n.type === 'definition') definitions.set(n.identifier?.toUpperCase() ?? '', n.url ?? '');
  });
  visit(tree, (node: MdNode) => {
    const line = node.position?.start.line ?? 1;
    if (node.type === 'heading') {
      if (node.depth === 1) h1++;
      if (node.depth! > previous + 1)
        add('W_HEADING', 'Heading depth skips a level.', line, 'warning');
      previous = node.depth!;
    }
    if (
      node.type === 'text' &&
      /\{\{[A-Z][A-Z0-9_]*\}\}|\[(?:Project Name|PROJECT_NAME|LICENSE_URL|DOCS_URL|VERSION)\]/.test(
        node.value ?? '',
      )
    )
      add('E_PLACEHOLDER', 'Unresolved authoring field in published prose.', line);
    if (['link', 'image', 'definition'].includes(node.type))
      links.push({ url: node.url ?? '', line });
    if (['linkReference', 'imageReference'].includes(node.type)) {
      const url = definitions.get(node.identifier?.toUpperCase() ?? '');
      if (url === undefined) add('E_LINK', 'Undefined reference-style link.', line);
      else links.push({ url, line });
    }
    if (node.type === 'image' && !node.alt?.trim())
      add('W_ALT', 'Image lacks meaningful alternative text.', line, 'warning');
    if (node.type === 'html') {
      htmlAttributes(
        node.value ?? '',
        (tag, key, value) => {
          if (/^on/i.test(key) || key === 'style')
            add('E_HTML', 'Executable or styling HTML attributes are not allowed.', line);
          if (['href', 'src', 'poster'].includes(key)) links.push({ url: value, line });
          if (key === 'srcset')
            for (const candidate of value.split(','))
              links.push({ url: candidate.trim().split(/\s+/)[0] ?? '', line });
        },
        (tag) => {
          if (
            !new Set([
              'a',
              'p',
              'div',
              'span',
              'picture',
              'source',
              'img',
              'details',
              'summary',
              'br',
              'hr',
              'kbd',
              'samp',
              'sub',
              'sup',
              'strong',
              'em',
              'b',
              'i',
            ]).has(tag)
          )
            add('E_HTML', 'Unsupported raw HTML element.', line);
        },
      );
    }
  });
  if (core) {
    if (h1 !== 1) add('E_STRUCTURE', 'Published documentation needs exactly one H1.');
    if (!(tree.children ?? []).some((n) => n.type === 'paragraph' && plain(n).trim()))
      add('E_EVIDENCE', 'Description/purpose text is missing.');
    if (
      !(tree.children ?? []).some(
        (n) =>
          n.type === 'heading' && /^(usage|quick start|getting started|kullanım)$/i.test(plain(n)),
      )
    )
      add('E_EVIDENCE', 'Useful usage or quick-start information is missing.');
  }
  for (const [index, node] of (tree.children ?? []).entries())
    if (node.type === 'heading') {
      const following = tree.children?.[index + 1];
      if (!following || (following.type === 'heading' && following.depth! <= node.depth!))
        add('E_STRUCTURE', 'Empty section.', node.position?.start.line);
    }
  const cached = new Map<string, Set<string>>([[document, anchors(text)]]);
  let external = false;
  for (const link of links) {
    if (
      !link.url ||
      !allowedURL(link.url) ||
      link.url.startsWith('//') ||
      link.url.includes('\\')
    ) {
      add('E_LINK', 'Unsafe or empty link destination.', link.line);
      continue;
    }
    if (/^(https?:|mailto:)/i.test(link.url)) {
      external = true;
      continue;
    }
    try {
      const [destination = '', fragment] = link.url.split('#');
      const decoded = decodeURIComponent(destination.split('?')[0]!);
      if (decoded.startsWith('/') || /[\\:\x00-\x1f]/.test(decoded)) throw new Error('unsafe');
      const resolved = decoded
        ? path.posix.normalize(path.posix.join(path.posix.dirname(document), decoded))
        : document;
      safeRelative(resolved);
      if (resolved !== document && !(await reader.exists(resolved))) throw new Error('missing');
      if (fragment && /\.md$/i.test(resolved)) {
        if (!cached.has(resolved)) cached.set(resolved, anchors(await reader.text(resolved)));
        if (!cached.get(resolved)!.has(decodeURIComponent(fragment))) throw new Error('anchor');
      }
    } catch {
      add('E_LINK', 'Broken, unconfined, symlinked, or invalid relative link/anchor.', link.line);
    }
  }
  if (external)
    add(
      'I_OFFLINE_LINKS',
      'External URLs were not fetched (offline validation).',
      undefined,
      'info',
    );
  return diagnostics.sort(diagnosticsOrder);
}

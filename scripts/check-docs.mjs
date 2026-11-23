import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import GithubSlugger from 'github-slugger';
import { parseFragment } from 'parse5';
const root = fileURLToPath(new URL('../', import.meta.url));
const files = [
  ...new Set(
    execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], {
      cwd: root,
      encoding: 'utf8',
    })
      .split('\0')
      .filter((f) => f.endsWith('.md')),
  ),
];
const parser = unified().use(remarkParse).use(remarkGfm),
  trees = new Map(),
  anchors = new Map(),
  errors = [];
function walk(node, visit) {
  visit(node);
  for (const child of node.children ?? []) walk(child, visit);
}
function plain(node) {
  return node.type === 'html' ? '' : (node.value ?? (node.children ?? []).map(plain).join(''));
}
function html(value, visit) {
  const scan = (n) => {
    visit(n);
    for (const child of n.childNodes ?? []) scan(child);
    if (n.content) scan(n.content);
  };
  scan(parseFragment(value));
}
for (const file of files) {
  const absolute = path.join(root, file);
  if ((await fs.lstat(absolute)).isSymbolicLink()) {
    errors.push(`${file}: symbolic documentation path`);
    continue;
  }
  const tree = parser.parse(await fs.readFile(absolute, 'utf8')),
    ids = new Set(),
    slugger = new GithubSlugger();
  walk(tree, (n) => {
    if (n.type === 'heading') ids.add(slugger.slug(plain(n)));
    if (n.type === 'html')
      html(n.value, (el) => {
        for (const attr of el.attrs ?? [])
          if (['id', 'name'].includes(attr.name)) ids.add(attr.value);
      });
  });
  trees.set(absolute, tree);
  anchors.set(absolute, ids);
}
let references = 0;
for (const [file, tree] of trees) {
  const label = path.relative(root, file),
    definitions = new Map(),
    links = [];
  walk(tree, (n) => {
    if (n.type === 'definition') definitions.set(n.identifier?.toUpperCase(), n.url);
  });
  walk(tree, (n) => {
    if (['link', 'image'].includes(n.type)) links.push(n.url);
    if (['linkReference', 'imageReference'].includes(n.type)) {
      const url = definitions.get(n.identifier?.toUpperCase());
      if (url) links.push(url);
      else errors.push(`${label}: undefined reference ${n.identifier}`);
    }
    if (n.type === 'html')
      html(n.value, (el) => {
        for (const attr of el.attrs ?? []) {
          if (['href', 'src'].includes(attr.name)) links.push(attr.value);
          if (attr.name === 'srcset')
            links.push(...attr.value.split(',').map((s) => s.trim().split(/\s+/)[0]));
        }
      });
    const published =
      /^(README\.md|CONTRIBUTING\.md|CODE_OF_CONDUCT\.md|SECURITY\.md|SUPPORT\.md|CHANGELOG\.md|examples\/[^/]+\/README(?:\.ai)?\.md)$/.test(
        label.split(path.sep).join('/'),
      );
    if (
      published &&
      n.type === 'text' &&
      /\{\{[A-Z][A-Z0-9_]*\}\}|\[(?:PROJECT_NAME|Project Name|LICENSE_URL|DOCS_URL|VERSION)\]/.test(
        n.value ?? '',
      )
    )
      errors.push(`${label}:${n.position.start.line}: unresolved authoring placeholder`);
  });
  for (const url of links) {
    if (!url || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url)) continue;
    references++;
    try {
      const [destination, fragment] = url.split('#'),
        target = destination
          ? path.resolve(path.dirname(file), decodeURIComponent(destination.split('?')[0]))
          : file;
      const relative = path.relative(root, target);
      if (relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative))
        throw new Error('outside repository');
      let current = root;
      for (const segment of relative.split(path.sep).filter(Boolean)) {
        if (!(await fs.readdir(current)).includes(segment))
          throw new Error('missing/case-mismatched path');
        current = path.join(current, segment);
        if ((await fs.lstat(current)).isSymbolicLink()) throw new Error('symlink target');
      }
      if (fragment && anchors.has(target) && !anchors.get(target).has(decodeURIComponent(fragment)))
        throw new Error('missing heading anchor');
    } catch (error) {
      errors.push(`${label}: ${url} (${error.message})`);
    }
  }
}
if (errors.length) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else
  console.log(
    `PASS: ${trees.size} Markdown files, ${references} local file/asset/anchor references, published placeholders checked; external URLs not fetched.`,
  );

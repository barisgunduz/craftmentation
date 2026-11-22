import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
export type MdNode = {
  type: string;
  value?: string;
  depth?: number;
  url?: string;
  identifier?: string;
  alt?: string;
  children?: MdNode[];
  position?: { start: { line: number; offset?: number }; end: { line: number; offset?: number } };
};
const processor = unified().use(remarkParse).use(remarkGfm);
export function parseMarkdown(text: string): MdNode {
  const tree = processor.parse(text) as MdNode;
  // remark omits an initial UTF-8 BOM from its offsets; edits still index original bytes/text.
  if (text.startsWith('\uFEFF'))
    visit(tree, (node) => {
      if (node.position?.start.offset !== undefined) node.position.start.offset++;
      if (node.position?.end.offset !== undefined) node.position.end.offset++;
    });
  return tree;
}
export const plain = (node: MdNode): string =>
  node.type === 'html'
    ? ''
    : node.type === 'image'
      ? (node.alt ?? '')
      : (node.value ?? node.children?.map(plain).join('') ?? '');
export function visit(node: MdNode, fn: (node: MdNode) => void): void {
  fn(node);
  for (const child of node.children ?? []) visit(child, fn);
}

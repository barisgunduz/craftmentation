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
export const parseMarkdown = (text: string): MdNode => processor.parse(text) as MdNode;
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

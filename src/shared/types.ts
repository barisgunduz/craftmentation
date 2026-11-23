export type Diagnostic = {
  code: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  path?: string;
  line?: number;
};
export type Field = {
  value: string;
  format: 'text' | 'markdown';
  sources: string[];
  safe: boolean;
};
export type Evidence = {
  state: 'verified' | 'missing' | 'unknown';
  sources: string[];
  safe: boolean;
};
export type Section = {
  id: string;
  standardItem: string;
  classification: string;
  order: number;
  path: string;
  fields: string[];
};
export type Profile = {
  formatVersion: number;
  id: string;
  name: string;
  recommendations: string[];
  notes: string[];
};
export type Content = Record<string, Record<string, Field>>;
export type Config = {
  schemaVersion: number;
  projectType: string;
  language: string;
  additionalLanguages: string[];
  output: string;
  template: string;
  sections: Record<string, boolean | 'auto'>;
  customSections: Section[];
  content: Content;
  assets: { path: string; alt: string }[];
  profiles: Record<string, Partial<Config>>;
  ai: { enabled: boolean; provider: string | null };
};
export type Source = { path: string; locator: string };
export type Fact = {
  id: string;
  kind: 'text' | 'command' | 'path' | 'license';
  value: string | null;
  state: Evidence['state'];
  verification: 'inspected' | 'maintainer';
  sources: Source[];
  safe: boolean;
};
export type SelectionRequest = {
  profile: string;
  include: string[];
  exclude: string[];
  evidence: Record<string, Evidence>;
  customSections: Section[];
};
export type Analysis = {
  schemaVersion: number;
  root: '.';
  sourceFingerprint: string;
  projectType: { detected: string; selected: string; signals: Source[] };
  files: { path: string; sha256: string; role: string }[];
  facts: Fact[];
  selection: SelectionRequest;
  diagnostics: Diagnostic[];
  limits: { filesVisited: number; bytesRead: number; truncated: boolean; skipped: string[] };
};
export type Selection = { selected: string[]; omitted: string[]; unresolved: string[] };
export type Report = {
  schemaVersion: 1;
  command: string | null;
  status: 'ok' | 'invalid' | 'error';
  exitCode: number;
  diagnostics: Diagnostic[];
  data: unknown;
};
export type Options = {
  root?: string;
  config?: string;
  output?: string;
  language?: string;
  projectType?: string;
  include?: string[];
  exclude?: string[];
  dryRun?: boolean;
  managed?: boolean;
  write?: boolean;
  expect?: string;
  usageFile?: string;
  agent?: string;
  previewContext?: boolean;
  from?: string;
  document?: string;
  strict?: boolean;
  json?: boolean;
};

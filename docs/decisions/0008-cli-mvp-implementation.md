# ADR 0008: MVP implementation refinements

Status: Accepted

## Context

Phase 6 implements the accepted TypeScript/Node.js architecture. Actual dependency
engines, schema compilation, strict JSON behavior, safe writes, and conservative static
population must now replace the Phase 5 design-only assumptions.

## Decision

Use the locked dependency versions in package.json/package-lock.json. Add jsonc-parser
for syntax-tree inspection of duplicate and prototype-affecting keys before JSON.parse;
JSON.parse alone loses duplicate-key evidence. Despite its name, configure it with comments
and trailing commas disabled. [The upstream parser documentation](https://github.com/microsoft/node-jsonc-parser)
documents tree/error inspection. Use ordinary JSON.parse objects after tree validation:
jsonc-parser's null-prototype value objects are incompatible with Ajv's deep equality on
the bundled layout constant. Never evaluate repository configuration.

The internal development package version is 0.0.0-dev.0 and private is true. This is not
an announced release or a selected first public release version. No publish hook exists.
Node engines are the 24/26 lines; checked runtime patches are recorded in the roadmap.
Commander requires Node >=22.12.0; the chosen supported lines satisfy it. Dependency versions
and licenses were read from installed package metadata, not inferred from package names.

MVP analysis extracts JSON package metadata and existing README sections, records other
bounded text files without executing them, and supports explicit profile overrides and
source-backed configuration content. Extracted complete sections fill the first layout
field and intentionally leave remaining subfields blank; their combined content is verified
as one source section. No claim of semantic source-code verification or universal ecosystem
detection is made. Missing usage blocks generation instead of fabricating a runnable example.

Init writes only a file named craftmentation.config.json, including a requested nested
location with an existing safe parent. Other --config paths remain available for read-only
configuration loading, but init cannot create an arbitrary application manifest. Generation
also protects hidden agent/CI directories and policy/instruction filenames. This narrows the
Phase 5 write target design to prevent accidental manifests or adapters as a side effect.

Structured assets become explicit logo content, with nonempty alt text, confined paths,
and the same evidence gates. New arbitrary HTML remains disallowed in extracted/configured
Markdown; existing documents can be checked for a restricted set of inert GitHub HTML.
New output is bounded to 1 MiB, matching the subsequent text-read bound. Basic --dry-run
is implemented now for safe MVP writes; Phase 7 retains responsibility for the advanced CLI.

## Alternatives considered

- Hand-written duplicate-key scanner: avoid an extra dependency, but risk incomplete JSON grammar handling.
- JSONC permissiveness: convenient but contradicts the strict JSON format already chosen.
- Generic --config writes: simpler dispatch but permits creating files that look like application metadata.
- Inferring usage/features from dependency or script names: more output, less trustworthy documentation.
- Automatic whole-document rewriting or AI fallback: violates preservation/offline architecture boundaries.

## Consequences

Real Ajv compilation and the existing/new contract corpus validate structure with no
coercion/default mutation. There is still no provider, localization, custom-template loader,
update/check/doctor command, network link fetcher, or production source-code execution.
Direct dependencies remain separated from dev-only TypeScript/type definitions and
Prettier, which formats/checks TypeScript, Node tests, and package/build metadata only. OS/filesystem
coverage beyond actually run tests is not implied by cross-platform path handling.

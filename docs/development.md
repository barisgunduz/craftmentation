# Development and testing

## Commands available now

The current checkout has documentation, schemas, Python development checks, and example
programs. It has no product package.json, npm build/test scripts, compiled CLI, or release.
Use [Contributing](../CONTRIBUTING.md) for the existing Python library and test commands.
The contract checker introduced in Phase 5 is exercised by the same unittest discovery.
No extra dependency is required for these development checks.

## Phase 6 implementation sequence

1. Re-read continuity docs and the accepted CLI contracts. Prepare a supported Node 24/26
   development environment; the Phase 5 machine's Node 20 is not a supported target.
2. Create one TypeScript/ESM npm package, resolve exact compatible dependencies, inspect
   licenses/engines, create the lockfile, and add a build and Node test setup. Do not publish.
3. Implement strict configuration loading, bundled Ajv schema compilation, defaults/merge,
   capability checks, and JSON diagnostics. Run the existing contract corpus through the
   actual Ajv engine before treating schema enforcement as implemented.
4. Implement confined reads/snapshots and single-file safe create before any command writes.
5. Implement bounded static analysis and provenance, keeping unknown facts unknown. Port
   Phase 3's selection cases rather than inventing incompatible IDs or rules.
6. Implement deterministic field mapping and literal Markdown rendering. Refuse unresolved
   Core/explicit content, and preserve attribution. No AI provider is required or installed.
7. Implement AST-based Markdown/link/placeholder/config validation and its diagnostics.
8. Wire init/analyze/generate/validate and dry-run/noninteractive/JSON behavior. Do not add
   Phase 7 commands as fake stubs. Update docs to distinguish actually supported settings.
9. Verify unit, integration, packed-package data paths, and platform safety before accepting
   the MVP. Update roadmap/changelog and stop. Do not install, push, deploy, or release remotely.

Planned scripts will be named only when package.json actually defines them. This document
is not evidence that npm commands, binaries, schemas, providers, or supported platforms work.

## Test architecture

Use TypeScript strict compilation for static checking and Node's built-in test runner for
new product unit/integration tests. Existing Python tests remain independent regression
oracles until explicitly replaced. Do not run arbitrary target fixture commands through
the analyzer; tests may run newly authored isolated CLI fixtures under test control.

| Layer | Required verification |
|---|---|
| Configuration | Missing/default file vs explicit missing path; duplicate keys, unknown keys, unsupported versions, no coercion/default mutation, precedence, array replacement, invalid Core exclusions, profile overrides, unsupported capabilities |
| Analysis | Stable order/hashes, limits, skipped secrets/binaries/symlinks, conflicting type signals, declared-vs-executed commands, root-relative output, no process/network calls |
| Selection/rendering | Port 18 policy scenarios; all profiles; unresolved fields fail; literal/nonrecursive substitution; escaping; Unicode, GFM tables/fences, and source attribution |
| Validation | Heading hierarchy and duplicate/Unicode slugs; reference links; img/picture/srcset; percent escapes; code-literal placeholders; unsafe schemes; outside-root/symlink links; no outbound HTTP by default |
| Filesystem | Traversal, root/ancestor symlinks, dangling links, case collisions, Windows devices/ADS, exclusive create, no-clobber conflict, hard-link unsupported path, permission faults, interrupted cleanup, no false success |
| Commands | Help without scanning; unknown flags/commands; exact exit and JSON envelope behavior; read-only/dry-run has zero writes; config-only init; generate refuses existing output |
| Packaging | Built package contains required data and notices, no fixture/secret payload, works outside the source cwd without install hooks |
| Update, Phase 7 | Byte-identical custom spans, modified/ambiguous markers rejected, backup integrity, hash/identity recheck, preview-only default, concurrency limitations disclosed |
| Localization, Phase 8 | Source revision drift, language navigation, technical literal preservation, edition path collisions and partial-commit recovery |

Use temporary directories for all mutation tests. Inject permission/I/O/failure points for
portable tests, and perform actual filesystem tests on each target OS/filesystem before
claiming support. On Windows, unavailable symlink privileges may skip only the explicit
symlink-creation test with a reason; other path/containment tests remain required.
Test min supported runtime and each claimed LTS line with exact package-engine constraints.
No performance benchmark, test coverage target, security certification, or cross-platform
success is invented by this design.

## Phase 5 schema verification boundary

Four Draft 2020-12 schemas and synthetic contract instances are checked by the narrow
Python helper in `tests/schema_subset.py`. It supports only the keywords these files use,
rejects unknown keywords, resolves known local URNs only, and performs no network fetch.
It is an executable contract oracle, not a full JSON Schema implementation or metaschema
validator. It tests positive/negative structure, local references, and existing library
compatibility without adding a documentation-validation dependency.

Ajv compilation, formal metaschema validation, dependency installation, TypeScript build,
CLI tests, and Node 24/26 runtime tests remain Phase 6 gates. The Python checks do not
prove future filesystem safety, semantic source truth, or renderer correctness. Synthetic
zero hashes and package/asset names in contract fixtures are not claims of an analysis run.

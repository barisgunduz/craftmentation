# Development and testing

## Commands available now

Use Node 24/26 and npm for the TypeScript CLI, plus Python 3.9+ for legacy checks:

```bash
npm ci --ignore-scripts
npm run build
npm run typecheck
npm run format:check
npm test
npm run test:legacy
```

Tests run real CLI processes in temporary directories, validate actual Ajv schemas, and
cover the five source-backed examples. Product scripts are defined in package.json.
`npm test` builds before running Node tests. No test invokes an external provider, target
script, live network server, GUI, publish, or deployment. The package is private at an
unreleased development version. Node engines target 24/26; exact tested patches and host
platform are recorded in the roadmap. Other OS execution is not yet verified.

For a local package smoke check, build, then run `npm pack --ignore-scripts` into an owned
temporary directory and explicitly install that tarball into a separate consumer directory.
The packed CLI must resolve data from its installed location and work outside the source cwd.
No install hook is required. Developer evaluation reports refer to source-checkout fixtures;
the npm tarball excludes tests, examples, and the large brand identity board. It is not a
standalone offline archive of every linked development artifact.

## Phase 6 implementation sequence (delivered MVP baseline)

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
   unimplemented commands as fake stubs. Update docs to distinguish actually supported settings.
9. Verify unit, integration, packed-package data paths, and platform safety before accepting
   the MVP. Update roadmap/changelog and stop. Do not install, push, deploy, or release remotely.

The implemented scripts are listed above. Update/check/doctor, custom templates/sections,
localization, providers, and general source-code understanding remain outside this MVP.

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
| Update, revised Phase 8 (planned) | Byte-identical custom spans, modified/ambiguous markers rejected, backup integrity, hash/identity recheck, preview-only default, concurrency limitations disclosed |
| Historical localization design | Outside active scope; existing prompt/artifact regression checks remain, with no engine promised |

Use temporary directories for all mutation tests. Inject permission/I/O/failure points for
portable tests, and perform actual filesystem tests on each target OS/filesystem before
claiming support. On Windows, unavailable symlink privileges may skip only the explicit
symlink-creation test with a reason; other path/containment tests remain required.
Test min supported runtime and each claimed LTS line with exact package-engine constraints.
No performance benchmark, test coverage target, security certification, or cross-platform
success is invented by this design.

## Schema verification boundary

Four Draft 2020-12 schemas and synthetic contract instances are checked by the narrow
Python helper in `tests/schema_subset.py`. It supports only the keywords these files use,
rejects unknown keywords, resolves known local URNs only, and performs no network fetch.
It is an executable contract oracle, not a full JSON Schema implementation or metaschema
validator. It tests positive/negative structure, local references, and existing library
compatibility without adding a documentation-validation dependency.

Ajv compilation/metaschema checks, dependency installation, TypeScript build, CLI tests,
and Node 24/26 tests are now exercised separately by the implementation checks. The Python checks do not
prove future filesystem safety, semantic source truth, or renderer correctness. Synthetic
zero hashes and package/asset names in contract fixtures are not claims of an analysis run.

# Development roadmap

## Current state

- Latest completed work: practical README preview/review/save and managed updates, revised Phase 8.
- Phase 0–6 implementation history is retained below; it is not a requirement to build every earlier plan.
- Current phase: Phase 9, AI-Assisted Source Understanding; connection-route research in progress.
- Release confidence follows in Phase 10; source-aware AI is now an explicit pre-release goal.
- Out of scope: a standalone documentation website and multilingual/translation automation.
- Language: English documentation by default; the chosen AI agent may write a user-requested language.
- Existing CLI: init, analyze, generate, validate, and preview-first managed update.
  No public release, provider SDK, background updater, website, or localization engine.
- Main limitation: deterministic population relies on package metadata and existing README
  sections; it cannot invent missing usage or replace an agent's repository understanding.
- Native runtime verification covers macOS/Node 24 and 26. Linux/Windows remain release gates.
- Validation and the current usability audit are recorded in docs/audit.md and phase results.

The [current specification](PROJECT_SPEC.md) governs active scope. The
[original roadmap](history/roadmap.initial.md) is historical. No removed feature is counted
as completed. Work one phase at a time and stop before starting the next phase.

## Phase 0: Repository Audit and Permanent Specification

Status: **Completed**

Completed tasks: all fifteen tasks below.

Remaining tasks: none.

- [x] Inspect the repository.
- [x] Read all existing documentation.
- [x] Verify MIT License.
- [x] Verify copyright holder.
- [x] Inspect brand assets.
- [x] Review README templates.
- [x] Review AI instructions.
- [x] Identify incomplete files.
- [x] Identify architectural gaps.
- [x] Create `docs/PROJECT_SPEC.md` containing this complete specification.
- [x] Update `AGENTS.md` to reference the permanent specification.
- [x] Create `docs/roadmap.md` containing every phase.
- [x] Create `docs/decisions/`.
- [x] Produce `docs/audit.md`.
- [x] Recommend the Phase 1 implementation sequence.

Acceptance: satisfy the phase goal and deliverable in specification section 16.

Validation: Phase 0 checks passed; runtime tests not applicable.

Blockers: none.

## Phase 1: Open-Source Foundation

Status: **Completed**

Completed tasks: all thirteen tasks below.

Remaining tasks: none for Phase 1.

- [x] Finalize repository structure.
- [x] Improve the main README.
- [x] Finalize contribution guidelines.
- [x] Add Code of Conduct.
- [x] Add Security Policy.
- [x] Add Support documentation.
- [x] Add GitHub issue templates.
- [x] Add pull request template.
- [x] Initialize Changelog.
- [x] Establish release conventions.
- [x] Define documentation style guidelines.
- [x] Verify licensing.
- [x] Ensure repository consistency.

Acceptance: coherent repository foundation delivered with accurate README navigation,
community policies, issue and PR templates, contribution/style/release conventions,
and preserved MIT licensing. No future CLI capability is presented as implemented.

Validation (2026-11-22):

- 66 local Markdown links, asset references, and heading anchors checked, excluding
  the preserved master specification and intentional README template placeholders.
- Both issue-template YAML headers parsed using installed Ruby YAML; names,
  descriptions, labels, and assignee fields checked.
- Five SVGs parsed as XML; light/dark wordmark text contrast measured at 15.72:1
  against the prescribed background colors. MIT LICENSE is byte-identical to HEAD.
- Published foundation prose checked for unresolved authoring markers; `git diff --check` passed.
- GitHub API confirmed Issues enabled, Discussions disabled, and private vulnerability
  reporting disabled. Remote settings were read only; no account settings were changed.
- Raster preview attempts: CairoSVG could not load Cairo; ImageMagick rendered using
  the installed Arial fallback but produced overlapping glyphs. These previews are not
  reliable browser validation. GitHub/browser rendering and Inter availability remain
  unverified; SVG typography and geometry were preserved, with only the light text fill changed.
- No executable tests or CI exist; no dependency was added. No commits or publication performed.

Blockers: none. Maintainer follow-up: establish confidential security and conduct
reporting routes. Policies explicitly describe the limitation and require a private
route before sensitive details are shared. Browser preview remains a manual follow-up.

## Phase 2: README Standard v0.1

Status: **Completed**

Completed tasks: all thirteen tasks below.

Remaining tasks: none for Phase 2.

- [x] Classify README sections.
- [x] Define core sections.
- [x] Define recommended sections.
- [x] Define optional sections.
- [x] Define section ordering.
- [x] Define badge guidelines.
- [x] Define image and media standards.
- [x] Define code example standards.
- [x] Define link conventions.
- [x] Define accessibility requirements.
- [x] Define multilingual conventions.
- [x] Create the formal README specification.
- [x] Refine `README.template.md`.

Acceptance: README Standard v0.1 defines all 48 specified catalog items with a
classification and inclusion criteria, default ordering, quality requirements, and
multilingual authoring conventions. The manual README template follows the standard;
repository documentation now references it as the formal standard.

Validation (2026-11-22):

- All 48 content items from master specification section 6 matched to exactly one
  catalog row, with nonempty inclusion criteria and all four classes represented.
- 69 local links, asset references, and heading anchors checked. Master specification
  and intentional README template authoring fields excluded from published-link checks.
- Template reviewed against catalog ordering and inclusion rules: Core information
  retained, conditional content identified, no sample badge URLs, fixed title anchor,
  empty code fences, or unbalanced authoring comments.
- LICENSE and master specification are byte-identical to HEAD; `git diff --check` passed.
- Manual review confirmed documentation-only usage, conditional license handling,
  separation of future work, and multilingual conventions without claiming automation.
- No runtime tests apply; no dependency, translation, executable module, or CI was added.
  Browser rendering and external link reachability were not tested in this phase.

Blockers: none. Modular section metadata and complete profiles remain Phase 3 work;
localization automation and executable validation remain assigned to later phases.

## Phase 3: Modular Template System

Status: **Completed**

Completed tasks: all nine tasks below.

Remaining tasks: none for Phase 3.

- [x] Design template architecture.
- [x] Define section metadata.
- [x] Create reusable section modules.
- [x] Define project profiles.
- [x] Implement inclusion rules.
- [x] Implement exclusion rules.
- [x] Support custom sections.
- [x] Create realistic project examples.
- [x] Validate template consistency.

Acceptance: versioned metadata, 48 reusable fragments, a default layout, all fourteen
profiles, executable evidence-gated selection reference, custom-section support, and
five source-backed README examples delivered. The library guide and ADR describe module
boundaries and manual composition without claiming a product renderer or CLI.

Validation (2026-11-22; Python 3.13.2):

- `python3 scripts/check_template_library.py` passed: 48 catalog/standard mappings,
  14 profiles, 18 inclusion/exclusion policy cases, and five example evidence inventories.
- `python3 -m unittest discover -s tests -p 'test_*.py'` passed seven tests: CLI outputs,
  argument/UTF-8 errors, API JSON/status/headers at handler level, library function results,
  fixture syntax, duplicate JSON keys, symlink rejection, and unsupported/boolean versions.
- 130 relative Markdown links, asset references, and anchors checked; verification Python
  syntax and example prose checked. Intentional authoring fragments remain templates.
- LICENSE and master specification are unchanged; `git diff --check` passed.
- CLI and library fixture commands were verified in subprocess/behavior checks. The API
  was tested without opening a listening socket. Browser interaction and desktop GUI
  launch were not tested, and those limitations are stated in the examples.
- No production runtime, package dependency, generated README writer, provider integration,
  translation, workflow, commit, or publication was introduced.

Blockers: none. Evidence inventories are human assertions, not scanner output; the
checker does not verify source truth, secret safety, network reachability, or rendering.
CLI technology and full configuration/schema design remain Phase 5 responsibilities.

## Phase 4: AI Integration v0.1

Status: **Completed**

Completed tasks: all thirteen tasks below.

Remaining tasks: none for Phase 4.

- [x] Refine shared agent instructions.
- [x] Refine Claude integration.
- [x] Add Copilot instructions.
- [x] Add Codex guidance.
- [x] Evaluate Cursor integration.
- [x] Evaluate Windsurf integration.
- [x] Create repository analysis prompts.
- [x] Create generation prompts.
- [x] Create update prompts.
- [x] Create translation prompts.
- [x] Test against representative repositories.
- [x] Document compatibility.
- [x] Implement hallucination-prevention guidance.

Acceptance: one shared AI workflow policy, four operation prompts, refined Claude and
AGENTS entry points, a thin Copilot entry point, Codex guidance, and documented
Cursor/Windsurf evaluations delivered. Representative fixture walkthroughs and regression
checks are recorded without claiming native-client or cross-vendor model compatibility.

Validation (2026-11-22; Python 3.13.2):

- Official instruction documentation reviewed for Codex, Claude Code, Copilot, Cursor,
  and the redirected historical Windsurf route. Source links and limitations are in
  `docs/ai-integrations.md`. No native client was launched for discovery or model testing.
- Thirteen manual task applications recorded: five analyses, five generation drafts,
  one focused update, one Turkish translation, and one hostile-input handling example.
- `python3 -m unittest discover -s tests -p 'test_*.py'` passed twelve tests, including
  five new artifact tests for source excerpts/selection, unsupported-claim exclusions,
  custom-content preservation, code/literal translation integrity, and shared entry points.
  The translation test was corrected to compare inline-literal multisets, allowing natural
  word order changes while preserving technical values and exact fenced code.
- `python3 scripts/check_template_library.py` passed: 48 sections, 14 profiles, 18 policy
  scenarios, and five canonical examples.
- 204 local file/asset/anchor references checked. LICENSE, master specification, and all
  canonical example files are unchanged; `git diff --check` passed.
- No API service, provider dependency, AI client process, paid model call, automatic
  documentation writer, live network server, GUI test, commit, or publication was introduced.

Blockers: none for the instruction/prompt deliverable. Native client discovery and
independent repeated model evaluations remain unverified. Artifact assertions do not
prove model accuracy, secret detection, or arbitrary prompt-injection resistance.
Legacy Windsurf behavior is unverified because its historical docs now redirect.
CLI technology, provider abstraction, and configuration design remain Phase 5+ work.

## Phase 5: CLI Architecture

Status: **Completed**

Completed tasks: all thirteen tasks below.

Remaining tasks: none for the Phase 5 architecture deliverable.

- [x] Evaluate technology choices.
- [x] Select implementation language.
- [x] Select CLI framework.
- [x] Design package structure.
- [x] Design command interfaces.
- [x] Define configuration schema.
- [x] Define repository analysis data model.
- [x] Define template rendering architecture.
- [x] Define validation architecture.
- [x] Define safe file operations.
- [x] Define error handling.
- [x] Define testing strategy.
- [x] Record architectural decisions.

Acceptance: CLI architecture specification delivered with technology/parser selection,
module/package/interface design, seven-command/exit/JSON contracts, four versioned schemas,
provenance/selection model, deterministic rendering and AST validation, optional provider
boundary, safe-write/update protocols, and a staged testing/implementation plan. No
working CLI or package is claimed. ADRs 0003–0007 record the decisions and alternatives.

Validation (2026-11-22; Python 3.13.2, local Node 20.19.4):

- `python3 -m unittest discover -s tests -p 'test_*.py'` passed eighteen tests, including
  six new contract tests. Positive/negative cases cover schema versions, unknown properties,
  Core exclusions, path forms, language/provider constraints, provenance/redaction,
  report status/exit consistency, and dry-run/noncommit invariants.
- Four schema resources and all URN references/used keywords checked by a narrow offline
  Python oracle. Sixteen existing catalog/profile/layout documents remain structurally
  compatible. Synthetic instance paths and zero hashes are explicitly illustrative.
- `python3 scripts/check_template_library.py` passed: 48 sections, 14 profiles, 18 selection
  scenarios, five source-backed examples.
- 247 relative file/asset/anchor references checked; LICENSE, master specification,
  canonical templates, profiles, fragments, and examples are unchanged. `git diff --check` passed.
- Official primary docs reviewed for Node release status, Commander, TypeScript modules,
  Ajv/schema options, JSON Schema, Markdown/GFM parsers, heading slugs, HTML parsing,
  filesystem primitives, and alternative Python/Go parsers. Source links are in the ADRs.
- No product dependency installation, package manifest, TypeScript source, CLI executable,
  runtime upgrade, npm publication, commit, or deployment was performed.

Blockers: none for the architecture phase. Phase 6 must prepare Node 24/26, resolve
compatible exact dependencies/engines, compile schemas with real Ajv and validate against
the metaschema, then implement/test the CLI. The Python subset helper is not a general
JSON Schema engine. CLI runtime/OS/filesystem safety and update concurrency remain design
requirements, not verified functionality. No Phase 6 work has started.

## Phase 6: CLI MVP

Status: **Completed**

Completed tasks: working four-command MVP and all requirements below, with native OS coverage limited as recorded.

Remaining tasks: none for the MVP implementation phase. Native Linux/Windows execution
remains an explicit release-verification gate, not a claimed result.

- [x] Implement real `init`, `analyze`, `generate`, and `validate` commands.
- [x] Verify cross-platform behavior, safe files, errors, unit/integration tests, documentation, and operation without AI.

Acceptance: real init/analyze/generate/validate commands with strict JSON/Ajv configuration,
source-backed bounded analysis, evidence-gated literal generation, offline Markdown checks,
safe no-clobber creates, useful JSON/exit diagnostics, dry-run, and unit/integration coverage.
No AI service is required. Existing output is never replaced. Documentation and locked
private development package/build tooling are included; no public release is claimed.

Validation (2026-11-22, macOS):

- Installed Node 24.22.3 and fetched Node 26.13.1 without replacing the Node 24 default.
  The final functional implementation passed 25 Node tests on each runtime, with no skips.
- Tests cover actual Ajv compilation/metaschema checks and corpus validation; all 18 selection
  scenarios; CLI JSON/error/help/no-op behavior; five real example generation/validation
  flows; unknown/prototype options; source/UTF-8 handling; no script execution; path/symlink/
  device/case protection; concurrent no-clobber creates; permission/publication/cleanup fault
  injection; offline links/anchors/HTML; literal code preservation; installed-style bin symlinks.
- `npm run test:legacy` passed eighteen Python tests plus 48 sections, 14 profiles,
  18 selection cases, and five canonical examples. `npm run typecheck`, `npm run format:check`,
  and `git diff --check` passed. Fresh offline `npm ci --ignore-scripts` succeeded.
- Local npm tarball inspected: required compiled code/library/schemas/notices present;
  tests/examples/node_modules/brand board absent. Offline installation with --ignore-scripts
  into a separate consumer succeeded; installed bin/version and all four commands worked
  outside the source cwd. No npm publication or installation hook was used.
- Direct dependency versions/engines/licenses were inspected and locked. Installation audit
  reported zero known vulnerabilities; an offline cached audit also reported zero. This is
  not a full legal/security release audit or a guarantee against future vulnerabilities.
- README passed the actual offline CLI validator. 249 local Markdown file/asset/anchor
  references checked; the root license, master specification, canonical library metadata,
  fragments, profiles, and example files are unchanged.
- package.json is private at 0.0.0-dev.0 (internal development metadata, not a released
  version). No commits, pushes, releases, workflow deployment, or provider calls occurred.

Blockers: none for the working MVP. Linux/Windows runtime/filesystem execution is not
verified; portable-path cases and actual macOS filesystems were tested. Static population
is limited to JSON metadata and existing README sections, not semantic code understanding.
Secret/injection heuristics are conservative, not security guarantees. Unsupported custom
libraries/sections, localization, providers, and Phase 7 commands fail explicitly.
Filesystem writes assume a quiescent local workspace and supported no-clobber primitives.
The next phase must preserve these boundaries and add advanced features without rewriting
custom content or reintroducing mandatory AI/network access.

## Phase 7: Product Clarity and Representative Examples

Status: **Completed**

Completed tasks: all eight refinement deliverables below. Remaining tasks: none.

- [x] Amend the specification and preserve historical records.
- [x] Record an evidence-based usability audit of the actual CLI and repository.
- [x] Give the README one recommended AI-assisted entry path and an optional CLI route.
- [x] Explain what each repository area is for, separating user material from implementation/tests.
- [x] Improve five source-backed example READMEs without inventing capabilities or sections.
- [x] Explain curated examples versus current CLI output and omitted unsupported sections.
- [x] Align language guidance, active plans, architecture, and change history.
- [x] Verify links, examples, source commands, and relevant regression checks.

Acceptance: a new user can identify how to start, find a finished example, and understand
what the tool can/cannot do without reading schemas, ADRs, or every module.
Validation (2026-11-22, macOS, Node 24.22.3):

- `npm test`: all 25 Node unit/integration tests passed, including generation and validation
  for the five expanded examples; no skips. No new runtime capability is claimed.
- `npm run test:legacy`: all 18 Python tests passed; the library checker passed 48 sections,
  14 profiles, 18 policy cases, and five updated evidence inventories.
- `npm run typecheck` and `npm run format:check` passed.
- The actual CLI validator accepted the main README with zero errors/warnings.
- Parsed 119 Markdown files and checked 258 local file/asset/heading references: no errors.
- `git diff --check` passed. The original master specification archive is byte-identical
  to the pre-revision version. Application/runtime source, dependencies, schemas, canonical
  templates/sections, tests, and license are unchanged. Roadmap archive links were rebased
  to preserve navigation; its historical tasks/statuses remain unchanged.

Limitations: browser/desktop GUI interaction, live HTTP, native Linux/Windows execution,
and external model evaluations were not performed. CLI static population remains limited;
full workflow/update improvements belong to the next phase. No commits or pushes occurred.
Blockers: none for this phase. Next action: Phase 8 only when the owner asks to continue.

## Phase 8: Practical README Workflow

Status: **Completed**

Completed tasks: all eight deliverables below. Remaining tasks: none.

- [x] Observe the complete journey on representative examples and Craftmentation itself;
  include an external repository only when supplied/authorized by the owner.
- [x] Turn missing-information errors into clear minimal next steps.
- [x] Establish one preview/review/save path with safe existing-document preservation.
- [x] Improve verified field population where it improves the actual README.
- [x] Implement safe update proposals and explicit application with conflict/custom-content tests.
- [x] Add check/doctor/custom templates only for a demonstrated need; document deliberate exclusions.
- [x] Demonstrate output quality, offline operation, exact writes, and no target command execution.
- [x] Update the user guide, tests, architecture, changelog, and roadmap to actual behavior.

Acceptance: a reviewable good README can be produced without studying internal metadata or
replacing custom content. No invented facts, unsafe overwrite, or mandatory AI provider.
Validation (2026-11-23, macOS):

- Built with TypeScript; full 34-test Node suite passed on Node 24.22.3 and 26.13.1,
  without skips. This includes all five real example generation/validation flows plus
  managed draft/no-op update flows, a fresh manifest/usage-file journey, and read-only
  generation/update previews against Craftmentation itself. No external repository was changed.
- New coverage checks exact preview/save hashes, stale review rejection, original-byte
  backups, legacy refusal, custom spans, CRLF/BOM preservation, malformed/edited/fenced
  markers, hard links, lock conflicts, concurrent writers, interruption, staging permission,
  precommit publication failure, and truthful postcommit cleanup outcomes.
- Final human-reporting refinements were rebuilt/typechecked/formatted and separately
  exercised on both runtimes: legacy guidance never suggests an ineligible write;
  invalid generation hashes never suggest an unsupported --write flag.
- `npm run test:legacy` passed all 18 Python tests plus 48 sections, 14 profiles,
  18 policy cases, and five evidence inventories. `npm run typecheck`,
  `npm run format:check`, and `git diff --check` passed.
- Main README passed the actual CLI validator with zero errors/warnings. 121 Markdown
  files and 271 local file/asset/heading references were checked without errors.
- No dependency, application example source, license, config schema, or report schema change.
  No target commands, external models, publication, commits, or pushes were performed.

Deliberate exclusions: check/doctor, custom-template loading, providers, automatic ownership
adoption, and automatic section insertion/removal add no necessary capability to this
scoped workflow. Existing validation/help and agent reconciliation serve those needs.

Limitations: CLI inference remains package/Markdown-based; reviewed usage is maintainer
input, not inferred source behavior. Update writes require a quiet local workspace and
have a final check-to-rename race with uncooperative editors. Backups remain local recovery
artifacts. Native Linux/Windows, live HTTP/browser/GUI, and external model runs were not
performed. Existing documents without ownership are never automatically rewritten.
Blockers: none for Phase 8. Next action: execute Phase 9 only when the owner asks to continue.

## Phase 9: AI-Assisted Source Understanding

Status: **In Progress**

Completed tasks: inspected the existing proposal boundary and installed agent help; confirmed
that the earlier Advanced CLI scope did not implement source interpretation. Owner explicitly
requested this capability. No model was invoked and no adapter is implemented yet.

Remaining tasks:

- [ ] Confirm existing-agent versus direct-API connection with the owner.
- [ ] Define bounded source evidence and observable selection/omission rules.
- [ ] Implement a vendor-neutral proposal boundary and selected real adapter.
- [ ] Check source references, unknowns, Markdown, paths, and license safeguards.
- [ ] Integrate a clear preview/review/save journey with existing-document preservation.
- [ ] Test timeout/cancellation/failure/unsafe evidence and unchanged offline operation.
- [ ] Run explicitly authorized real model evaluations on source-only examples and Craftmentation.
- [ ] Update user guidance, architecture/ADRs, changelog, and actual progress.

Acceptance: without an existing README, inspect real application source and produce a useful
project-specific draft through an explicitly selected model/agent. No invented claims,
implicit source transmission, automatic application-code execution, unsafe overwrite, or
mandatory AI dependency for existing deterministic commands. Model claims remain proposals.

Validation: local codex exec/claude help inspected and official noninteractive references
reviewed; these establish invocation options, not successful integration or model quality.
Pending input: initial connection route. Other implementation/evaluation tasks remain open.
Next action: resolve the pending connection question, implement the adapter, and resume this
phase. Release Phase 10 must not start before this acceptance is met.

## Phase 10: Release Confidence and Distribution

Status: **Not Started**

Completed tasks: none. Remaining tasks:

- [ ] Verify package contents, runtime versions, installation, and upgrade guidance.
- [ ] Run native Linux/Windows checks in addition to macOS.
- [ ] Add minimal read-only GitHub test/document checks with least-privilege permissions.
- [ ] Review dependencies, notices/licenses, security reports, and repository completeness.
- [ ] Resolve/document private reporting and remaining operational limits.
- [ ] Verify examples, navigation, and promises against the product.
- [ ] Choose a public version and prepare release notes/checklist.
- [ ] Present a concrete release candidate; publish only with explicit owner authorization.

Acceptance: a reproducible release candidate with honest platform evidence and a concise user path.
Validation: not run. Blockers: prior phase acceptance and publication authorization when applicable.

## Removed from active scope

The former localization and website phases will not be implemented under the current owner
decision. Existing optional translation prompts/evaluation artifacts and reserved config fields
are retained without promising a future engine. Unsupported settings continue to fail clearly.
Advanced CLI features not justified by the user journey are not release blockers merely because
they appeared in the original broad plan. No automatic PR-writing/update service is required.

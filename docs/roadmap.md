# Development roadmap

## Current state

- Latest completed work: release-candidate preparation and six-job native verification, revised Phase 10.
- Phase 0–6 implementation history is retained below; it is not a requirement to build every earlier plan.
- Phases 9 and 10 are completed. The private 0.1.0-rc.1 candidate is verified; public
  publication remains a separate owner-authorized operation, not completed functionality.
- Out of scope: a standalone documentation website and multilingual/translation automation.
- Language: English documentation by default; the chosen AI agent may write a user-requested language.
- Existing CLI: init, analyze, generate, validate, and preview-first managed update.
  No public release, provider SDK, background updater, website, or localization engine.
- Source-aware --agent mode interprets bounded code excerpts through a trusted installed client.
  Without it, deterministic population still relies on metadata/Markdown/reviewed content.
  Model interpretations remain unreviewed proposals; context limits and unknowns are visible.
- Final native CI covers Linux/Windows/Intel macOS on both Node floors, with separate
  local ARM64 macOS checks. Live Claude remains an explicit unverified limitation.
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

Status: **Completed**

Completed tasks: existing-agent route, bounded evidence, Codex/Claude transport, source-quoted
proposal validation, reviewed-file saves, documentation, and authorized live Codex evaluations.
All acceptance checks below passed. Remaining tasks: none. No release work has started.

Remaining tasks:

- [x] Confirm existing-agent versus direct-API connection with the owner.
- [x] Define bounded source evidence and observable selection/omission rules.
- [x] Implement a vendor-neutral proposal boundary and selected real adapter.
- [x] Check source references, unknowns, Markdown, paths, and license safeguards.
- [x] Integrate a clear preview/review/save journey with existing-document preservation.
- [x] Test timeout/cancellation/failure/unsafe evidence and unchanged offline operation.
- [x] Run explicitly authorized real model evaluations on source-only examples and Craftmentation.
- [x] Update user guidance, architecture/ADRs, changelog, and actual progress.

Acceptance: without an existing README, inspect real application source and produce a useful
project-specific draft through an explicitly selected model/agent. No invented claims,
implicit source transmission, automatic application-code execution, unsafe overwrite, or
mandatory AI dependency for existing deterministic commands. Model claims remain proposals.

Validation (2026-11-23, macOS):

- Full 43-test Node suite passed on Node 24.22.3 and 26.13.1 without skips. Includes
  bounded evidence/metadata, exact quotes and URL checks, rejected legal/unsafe proposals,
  adapter protocol shapes, real subprocess UTF-8/output/time limits, cancellation, source
  freshness, reviewed-file hashes, offline saves, and all prior safe-update regressions.
- `npm run test:legacy`: 18 Python tests, 48 sections, 14 profiles, 18 policy cases, and
  five evidence inventories passed. Build/typecheck/Prettier and `git diff --check` passed.
- Actual main README validation passed with zero errors/warnings. 125 Markdown files and
  299 local file/asset/heading references checked with no failures.
- After the initial sandboxed client attempt failed, the concrete Codex network/client
  integration test was explicitly approved. Six live model calls succeeded: five authored
  examples copied with source only (no README) and one read-only Craftmentation preview.
  The framework preview selected seven sections from six included files (49,070 source
  bytes, three truncated excerpts). No existing README or application source was changed.
- The live framework preview exposed an empty optional table scaffold; AST-based removal
  and a regression test fixed it without another model call. Observed snapshot bytes,
  input hashes, and available citations are retained separately from mock protocol tests.
- Actual source-only library output is readable in examples/library/README.ai.md; the
  evaluation records unknowns and shortcomings rather than claiming broad model accuracy.

Limits: quote matches are provenance, not semantic proof. Source text is capped at 48 KiB,
12 KiB/file, 40 files; metadata lists at most 100 omissions with a full count. AI dry-run
can use quota/client local state while leaving the target unwritten. Clients/admin policies
must be trusted; this is not a hermetic sandbox or complete secret scanner. Live evaluation
used Codex CLI 0.171.0 only; Claude is protocol-tested, with live-account compatibility not
verified. Native Linux/Windows remain release gates. Deterministic mode requires no agent.
Direct API SDKs, automatic AI update/adoption, and implicit config-triggered transmission
remain outside this implementation. No commits, pushes, release, or deployment occurred.

Blockers: none for Phase 9's selected-adapter acceptance. Next action: Phase 10 only on
owner continuation; native platform and wider client verification belong to that phase.

## Phase 10: Release Confidence and Distribution

Status: **Completed**

Completed tasks: candidate preparation, final launcher verification, and successful native
matrix execution. Remaining phase tasks: none. Publication is not this phase's deliverable.

- [x] Verify package contents, runtime versions, installation, and upgrade guidance locally.
- [x] Run native Linux/Windows checks in addition to macOS (baseline run recorded below).
- [x] Add active minimal read-only GitHub checks (six successful jobs).
- [x] Run the final trusted-client launcher revision through the native matrix.
- [x] Review dependencies, notices/licenses, security reports, and repository completeness.
- [x] Document private reporting and remaining operational/client limits.
- [x] Verify examples, navigation, and promises against the product.
- [x] Choose candidate 0.1.0-rc.1 and prepare release notes/checklist; package remains private.
- [x] Prepare a concrete local candidate for owner review; no publication is authorized.

Local validation (2026-11-23, macOS arm64):

- Full 43-test Node suite passed on Node 24.22.3 and 26.13.1 without skips. Version-report
  tests now compare package metadata instead of stale development-version literals.
- All 18 Python tests passed through the new cross-platform interpreter launcher, plus
  48 sections, 14 profiles, 18 policy cases, and five canonical evidence inventories.
- Build, typecheck, formatting, and git diff --check passed. The actual README validator
  reported zero errors/warnings; 130 Markdown files and 325 local references passed the
  reusable offline docs/placeholder check. External URLs were not crawled.
- The actual npm tarball was installed into a separate consumer from cache with lifecycle
  scripts disabled. Its installed npm bin exercised all five commands, managed update
  publication/backup, and no-model context preview outside the source cwd. Final payload
  and SHA-256 are in ignored artifacts/verification.json; no self-hashed report is shipped.
- Fresh registry npm audit returned zero known advisories for 103 lockfile entries. All
  79 runtime notice texts were read and matched their declared license identifiers;
  metadata-only optional development packages are identified in docs/dependency-licenses.md.
- actionlint 1.7.12 passed. Official action v6 refs were resolved through GitHub API and
  pinned by SHA. Workflow uses contents:read, persist-credentials:false, no model calls,
  and six native runner/floor-Node combinations. LF checkout attributes preserve fixture
  quote/hash bytes on Windows without rewriting existing Git history.
- Read-only GitHub API inspection: Actions enabled, zero remote workflows, private
  vulnerability reporting disabled. No settings were changed and no contact was invented.
- Docker executable exists but daemon socket is absent; no Linux or Windows native run
  was performed. Prepared workflow or portable-path tests are not native execution proof.

Candidate constraints: ^24.22.3 or ^26.13.1; private:true; no public npm install/version claim.
Optional client/platform coverage remains as recorded in Phase 9. No dependency upgrade,
AI request, global install, cache ownership change, commit, push, release, or deployment.

Follow-up verification (2026-11-23):

- The owner uploaded commit 6459e645938ae14f4b7ba4bb0fbffd5e50f65b8d. All six jobs in
  [run 45221783275](https://github.com/barisgunduz/craftmentation/actions/runs/45221783275)
  passed. Each logged 43 Node tests with no skips, 18 Python tests, documentation checks,
  and successful installed-package smoke checks. All six tarballs matched SHA-256
  36a27f52a5490989fa62f4ea3b4c6e3b585e02d692aba4020273a90e76e9e2a6.
- Browser-authorized npm login completed; npm whoami confirmed barisgunduz. Login is
  not publication authorization. Claude authentication is absent; no live Claude call ran.
- Final review found the Windows npm .cmd client-launch limitation. ADR 0013 records the
  shell-free global-package entry resolver and exclusion of relative/project npm PATH bins.
  Earlier CI does not verify this later change. Local follow-up results are recorded below.
- Final launcher revision: all 45 Node tests passed on both Node 24.22.3 and 26.13.1
  on macOS, with zero failures/skips. Typecheck, formatting, 18 Python tests, library
  checks, 131 Markdown files / 330 local references, and git diff --check passed.
  Both trusted launchers returned their versions without a model call: Codex 0.171.0
  and Claude Code 2.1.330. The actual tarball installed into a separate registry-backed
  consumer; all five commands, managed backup, and no-model preview checks passed.
  Package reproducibility passed; the final generated artifact/digest is in ignored
  artifacts/verification.json. No client was installed, no model quota was consumed,
  and no commit, push, tag, or publication was performed by this verification step.

Authorized source upload (2026-11-23):

- The owner explicitly approved committing/pushing the launcher revision and checking CI.
  Commit bec0246477622b5cdebc60f9a80e96f98de8929a was pushed to origin/master.
- [Run 45230655922](https://github.com/barisgunduz/craftmentation/actions/runs/45230655922)
  has four successful jobs: Linux and Windows on both Node floors. Both macOS jobs
  were cancelled after 15 minutes without acquiring a runner; neither ran any test step.
  GitHub annotations explicitly reported hosted arm64 capacity constraints. Overall run
  conclusion is failure, not success; this does not indicate a macOS code/test failure.
- Switch the two macOS CI jobs to the documented standard macos-15-intel pool. Preserve
  both Node floors and all checks; local ARM results remain distinct from Intel CI.
  Record rationale in ADR 0012. The replacement workflow completed successfully below.
- Commit 400cf57cd65fb73fe836c3ff14ae89f13394fbe1 passed all six jobs in
  [run 45233777732](https://github.com/barisgunduz/craftmentation/actions/runs/45233777732).
  Both Intel macOS jobs passed, alongside Linux/Windows and both Node floors. macOS logs
  confirm 45 Node tests, zero failures/skips, 18 Python tests, offline docs checks, and
  reproducible package/installed-consumer smoke checks with zero agent invocations.

Acceptance: a verified private release candidate, documented operational/client limits,
and a concrete publication checklist are delivered. No automatic publication occurred.
Blockers: none for candidate preparation. Live Claude and confidential reporting remain
documented limitations; public distribution still requires its own approval.
Next action: commit/push these verification notes under the existing source-upload approval,
check their CI, then present the candidate/publication plan to the owner.
Source-upload authorization is already granted; do not request it again for these notes.
Publication/tagging/merging remain separate unauthorized actions.

## Removed from active scope

The former localization and website phases will not be implemented under the current owner
decision. Existing optional translation prompts/evaluation artifacts and reserved config fields
are retained without promising a future engine. Unsupported settings continue to fail clearly.
Advanced CLI features not justified by the user journey are not release blockers merely because
they appeared in the original broad plan. No automatic PR-writing/update service is required.

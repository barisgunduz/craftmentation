# Development roadmap

## Current state

- Current phase: Phase 4 — Completed.
- Current focus: AI instruction/prompt framework delivered; awaiting authorization for Phase 5.
- Next action: on `devam`, inspect repository state and execute Phase 5, CLI Architecture, only.
- Maintenance: `.gitignore` excludes OS metadata, local editor state, and environment files
  while preserving shareable examples. After Phase 2, branding was reconciled with the
  owner-supplied identity board; the README now uses a dark panel and outlined Inter text.
  Logo geometry, transparent variants, monochrome symbol, and favicon were updated.
  Original reference and Inter attribution are retained under `assets/brand/`.
  Local raster previews passed on light and dark backgrounds; live GitHub rendering
  was not tested. This maintenance preceded Phase 3.
- Blockers: none for the completed phase. Confidential security and conduct reporting
  remain operational limitations; no private channel is advertised.
- Known limitations: no CLI, product package, automatic README renderer/validator, translations,
  CI, or website. GitHub Discussions and private vulnerability reporting are disabled.
- Validation: see phase results below; library checks and twelve development tests pass.

Acceptance requirements are in [PROJECT_SPEC.md](PROJECT_SPEC.md). Initial drafts do not
constitute completed phases. Phase 0 architecture and changelog files fulfilled permanent
memory requirements; Phase 1 finalized the repository foundation.

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

Status: **Not Started**

Completed tasks: none accepted for this phase.

Remaining tasks: all checklist items below and applicable specification requirements.

- [ ] Evaluate technology choices.
- [ ] Select implementation language.
- [ ] Select CLI framework.
- [ ] Design package structure.
- [ ] Design command interfaces.
- [ ] Define configuration schema.
- [ ] Define repository analysis data model.
- [ ] Define template rendering architecture.
- [ ] Define validation architecture.
- [ ] Define safe file operations.
- [ ] Define error handling.
- [ ] Define testing strategy.
- [ ] Record architectural decisions.

Acceptance: satisfy the phase goal and deliverable in specification section 16.

Validation: not run; no completion claimed.

Blockers: no active blocker identified; prior phases and authorization are prerequisites.

## Phase 6: CLI MVP

Status: **Not Started**

Completed tasks: none accepted for this phase.

Remaining tasks: all checklist items below and applicable specification requirements.

- [ ] Implement real `init`, `analyze`, `generate`, and `validate` commands.
- [ ] Verify cross-platform behavior, safe files, errors, unit/integration tests, documentation, and operation without AI.

Acceptance: satisfy the phase goal and deliverable in specification section 16.

Validation: not run; no completion claimed.

Blockers: no active blocker identified; prior phases and authorization are prerequisites.

## Phase 7: Advanced CLI

Status: **Not Started**

Completed tasks: none accepted for this phase.

Remaining tasks: all checklist items below and applicable specification requirements.

- [ ] Implement `update`, `check`, and `doctor`.
- [ ] Deliver dry-run, custom templates, overrides, preservation, improved detection, validation, and diagnostics.

Acceptance: satisfy the phase goal and deliverable in specification section 16.

Validation: not run; no completion claimed.

Blockers: no active blocker identified; prior phases and authorization are prerequisites.

## Phase 8: Localization

Status: **Not Started**

Completed tasks: none accepted for this phase.

Remaining tasks: all checklist items below and applicable specification requirements.

- [ ] Design localization architecture.
- [ ] Implement language configuration.
- [ ] Implement language navigation.
- [ ] Detect translation drift.
- [ ] Preserve technical content.
- [ ] Support optional AI translation.
- [ ] Test English and Turkish.
- [ ] Document localization workflows.

Acceptance: satisfy the phase goal and deliverable in specification section 16.

Validation: not run; no completion claimed.

Blockers: no active blocker identified; prior phases and authorization are prerequisites.

## Phase 9: GitHub Actions

Status: **Not Started**

Completed tasks: none accepted for this phase.

Remaining tasks: all checklist items below and applicable specification requirements.

- [ ] Create validation workflows.
- [ ] Add link checking.
- [ ] Add placeholder detection.
- [ ] Add configuration validation.
- [ ] Add documentation quality checks.
- [ ] Add optional update workflows.
- [ ] Add PR-based suggestions.
- [ ] Review workflow permissions.
- [ ] Document integration.

Acceptance: satisfy the phase goal and deliverable in specification section 16.

Validation: not run; no completion claimed.

Blockers: no active blocker identified; prior phases and authorization are prerequisites.

## Phase 10: Documentation Website

Status: **Not Started**

Completed tasks: none accepted for this phase.

Remaining tasks: all checklist items below and applicable specification requirements.

- [ ] Evaluate documentation frameworks.
- [ ] Select technology.
- [ ] Apply branding.
- [ ] Build navigation.
- [ ] Document installation.
- [ ] Document CLI commands.
- [ ] Document configuration.
- [ ] Document templates.
- [ ] Document AI integrations.
- [ ] Document GitHub Actions.
- [ ] Add examples.
- [ ] Verify accessibility.
- [ ] Verify responsive behavior.
- [ ] Prepare deployment configuration.

Acceptance: satisfy the phase goal and deliverable in specification section 16.

Validation: not run; no completion claimed.

Blockers: no active blocker identified; prior phases and authorization are prerequisites.

## Phase 11: Release Preparation

Status: **Not Started**

Completed tasks: none accepted for this phase.

Remaining tasks: all checklist items below and applicable specification requirements.

- [ ] Review repository completeness.
- [ ] Run tests.
- [ ] Run static analysis.
- [ ] Validate documentation.
- [ ] Review package contents.
- [ ] Audit dependencies.
- [ ] Review licenses.
- [ ] Test installation.
- [ ] Verify cross-platform behavior.
- [ ] Prepare release notes.
- [ ] Establish versioning.
- [ ] Prepare package publishing.
- [ ] Document upgrade procedures.
- [ ] Complete release checklist.

Acceptance: satisfy the phase goal and deliverable in specification section 16.

Validation: not run; no completion claimed.

Blockers: no active blocker identified; prior phases and authorization are prerequisites.


# Development roadmap

## Current state

- Current phase: Phase 2 — Completed.
- Current focus: README Standard v0.1 established; awaiting authorization for Phase 3.
- Next action: on `devam`, inspect repository state and execute Phase 3, Modular Template System, only.
- Maintenance: `.gitignore` excludes OS metadata, local editor state, and environment files
  while preserving shareable examples. After Phase 2, branding was reconciled with the
  owner-supplied identity board; the README now uses a dark panel and outlined Inter text.
  Logo geometry, transparent variants, monochrome symbol, and favicon were updated.
  Original reference and Inter attribution are retained under `assets/brand/`.
  Local raster previews passed on light and dark backgrounds; live GitHub rendering
  was not tested. This maintenance does not start Phase 3.
- Blockers: none for the completed phase. Confidential security and conduct reporting
  remain operational limitations; no private channel is advertised.
- Known limitations: no CLI, package, automated test suite, modular library, translations,
  CI, or website. GitHub Discussions and private vulnerability reporting are disabled.
- Validation: see phase results below. No executable test suite exists.

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

Status: **Not Started**

Completed tasks: none accepted for this phase.

Remaining tasks: all checklist items below and applicable specification requirements.

- [ ] Design template architecture.
- [ ] Define section metadata.
- [ ] Create reusable section modules.
- [ ] Define project profiles.
- [ ] Implement inclusion rules.
- [ ] Implement exclusion rules.
- [ ] Support custom sections.
- [ ] Create realistic project examples.
- [ ] Validate template consistency.

Acceptance: satisfy the phase goal and deliverable in specification section 16.

Validation: not run; no completion claimed.

Blockers: no active blocker identified; prior phases and authorization are prerequisites.

## Phase 4: AI Integration v0.1

Status: **Not Started**

Completed tasks: none accepted for this phase.

Remaining tasks: all checklist items below and applicable specification requirements.

- [ ] Refine shared agent instructions.
- [ ] Refine Claude integration.
- [ ] Add Copilot instructions.
- [ ] Add Codex guidance.
- [ ] Evaluate Cursor integration.
- [ ] Evaluate Windsurf integration.
- [ ] Create repository analysis prompts.
- [ ] Create generation prompts.
- [ ] Create update prompts.
- [ ] Create translation prompts.
- [ ] Test against representative repositories.
- [ ] Document compatibility.
- [ ] Implement hallucination-prevention guidance.

Acceptance: satisfy the phase goal and deliverable in specification section 16.

Validation: not run; no completion claimed.

Blockers: no active blocker identified; prior phases and authorization are prerequisites.

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


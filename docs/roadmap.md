# Development roadmap

## Current state

- Current phase: Phase 0 — Completed.
- Current focus: continuity established; awaiting authorization for Phase 1.
- Maintenance: added `.gitignore` for OS metadata, editor state, and local environment
  files; verified ignore behavior and preservation of shared examples. Phase 1 remains Not Started.
- Next action: on `devam`, inspect repository state and execute Phase 1 only, following
  the [implementation sequence](audit.md#exact-phase-1-implementation-sequence).
- Blockers: none for Phase 0. Phase 1 must verify support and confidential reporting channels.
- Known limitations: no CLI, package, automated tests, module library, translations, CI, or website.
- Validation: documentation and license inspection, five SVG XML parses, specification and
  roadmap structure, continuity file links, and `git diff --check` passed. No executable
  test suite exists. Visual rendering and external services were not tested.

Acceptance requirements are in [PROJECT_SPEC.md](PROJECT_SPEC.md). Initial drafts do not
constitute completed phases. The Phase 0 architecture inventory and changelog satisfy
permanent-memory requirements; Phase 1 still must finalize its full foundation deliverable.

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

Status: **Not Started**

Completed tasks: none accepted for this phase.

Remaining tasks: all checklist items below and applicable specification requirements.

- [ ] Finalize repository structure.
- [ ] Improve the main README.
- [ ] Finalize contribution guidelines.
- [ ] Add Code of Conduct.
- [ ] Add Security Policy.
- [ ] Add Support documentation.
- [ ] Add GitHub issue templates.
- [ ] Add pull request template.
- [ ] Initialize Changelog.
- [ ] Establish release conventions.
- [ ] Define documentation style guidelines.
- [ ] Verify licensing.
- [ ] Ensure repository consistency.

Acceptance: satisfy the phase goal and deliverable in specification section 16.

Validation: not run; no completion claimed.

Blockers: no active blocker identified; prior phases and authorization are prerequisites.

## Phase 2: README Standard v0.1

Status: **Not Started**

Completed tasks: none accepted for this phase.

Remaining tasks: all checklist items below and applicable specification requirements.

- [ ] Classify README sections.
- [ ] Define core sections.
- [ ] Define recommended sections.
- [ ] Define optional sections.
- [ ] Define section ordering.
- [ ] Define badge guidelines.
- [ ] Define image and media standards.
- [ ] Define code example standards.
- [ ] Define link conventions.
- [ ] Define accessibility requirements.
- [ ] Define multilingual conventions.
- [ ] Create the formal README specification.
- [ ] Refine `README.template.md`.

Acceptance: satisfy the phase goal and deliverable in specification section 16.

Validation: not run; no completion claimed.

Blockers: no active blocker identified; prior phases and authorization are prerequisites.

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


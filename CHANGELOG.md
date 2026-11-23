# Changelog

All notable changes to Craftmentation will be documented in this file.
The format follows Keep a Changelog. Released versions will follow Semantic Versioning.
No release version is assigned yet.

## [Unreleased]

### Changed

- Remove empty optional table scaffolds when rendering a whole-section prose body.

- Prioritize owner-requested opt-in AI-assisted source understanding before release
  preparation, using installed clients first and deferring direct API credentials/SDKs.

- Recognize Quick start/Getting started as Core usage; preserve UTF-8 BOM when inspecting
  and updating documents, and explain actionable steps for missing usage/existing output.
- Render declared npm scripts as copyable invocations without claiming execution.

- Focus the product on a simple agent-assisted README workflow and optional local CLI.
- Remove the standalone website and automated localization from active scope; retain
  English defaults and user-requested language guidance without a translation engine.
- Replace the remaining broad feature roadmap with product clarity/examples, practical
  preview/review/save, and release confidence/distribution phases.
- Expand all five curated example READMEs with verified behavior, meaningful usage,
  troubleshooting, testing boundaries, and explicit omission rationale; align selection inventories.
- Distinguish manually authored examples from the CLI's limited static population capabilities.

### Added

- Opt-in source-aware generation through installed Codex/Claude clients, bounded evidence
  previews, structured source-quoted proposals, unknowns, and factual-review diagnostics.
- Validation document hashes and offline --from --expect saving of an exact reviewed local draft without a second model call.
- Proposal schema and optional AI report metadata without promoting model claims into verified facts.
- Agent timeout/output/cancellation controls, scratch isolation and cleanup, source freshness checks,
  adapter protocol tests, and recorded live Codex source-only evaluations.

- Practical local preview/review/save guide, --usage-file for reviewed Markdown, and
  --expect to bind writes to the exact reviewed document hash.
- Explicit --managed generation and default-preview update command; guarded --write
  refreshes unchanged managed regions, preserves custom bytes, and retains an original backup.
- Ownership/conflict, CRLF/BOM preservation, stale-review, backup, and failure regression tests.

- Repository guide explaining the user entry path, optional CLI, and maintainer-only areas.
- Preserved initial specification/roadmap archives and ADR 0009 for the owner-approved scope revision.

- Working TypeScript/Node.js CLI MVP with init, bounded static analyze, no-clobber generate,
  and offline AST-based validate commands, including JSON diagnostics and dry-run.
- Strict JSON loading, actual Ajv 2020 schemas, profile/configuration precedence, provenance,
  source-backed field population, and explicit unsupported-capability diagnostics.
- Confined reads, bounded inventory, symlink/device/path protections, owned locks/staging,
  no-clobber publication, interruption handling, and truthful postcommit cleanup errors.
- Locked npm dependencies, a private development package, TypeScript build/typecheck,
  Node unit/integration tests, Prettier source format checks, and direct third-party license inventory.

- Accepted CLI architecture and seven-command interface design, including diagnostics,
  exit codes, strict configuration precedence, provenance, and staged capability checks.
- Four version-1 JSON Schemas for library metadata, configuration, analysis, and reports,
  with synthetic contract instances and six structural design tests.
- Safe-create/update protocols, explicit concurrency limits, and Phase 6 testing/implementation plan.
- ADRs selecting TypeScript/Node.js/Commander, strict JSON/Ajv, literal rendering with
  AST validation, safe update ownership, and optional AI/localization boundaries.

- Shared vendor-neutral documentation workflow policy and reusable analysis, update,
  and translation prompts alongside the refined generation prompt.
- Thin GitHub Copilot entry point, Codex guidance, and documented Claude/Cursor/Windsurf
  integration assessment with official sources and explicit client-test limitations.
- Thirteen recorded manual AI workflow applications across five example repositories,
  preservation, translation, and hostile-input cases, with five artifact regression tests.
- Architecture decision for shared AI rules and distinct framework/target repository scope.

- Version-1 modular library metadata, 48 reusable section fragments, a default layout,
  and all fourteen project profiles with domain evidence guidance.
- Evidence-gated inclusion/exclusion reference, custom-section contract, library guide,
  and an architecture decision record.
- Five source-backed example projects and manually composed READMEs with selection inventories.
- Dependency-free development checker, 18 policy scenarios, four example behavior tests,
  and three metadata/path guardrail tests.

- Owner-supplied brand identity board, theme-independent README lockup, and Inter font attribution.

- README Standard v0.1 with section classifications and inclusion rules, ordering,
  badge/media/code/link/accessibility requirements, and manual multilingual conventions.

- Code of Conduct, Security Policy, and Support guide with verified GitHub reporting limitations.
- Bug and feature issue templates and a pull request review template.
- Documentation style guide and release preparation conventions.

- Repository ignore rules for OS metadata, local editor files, and environment files,
  while preserving shareable environment examples.

- Complete permanent master project specification and twelve-phase development roadmap.
- Repository audit, Phase 1 implementation sequence, and current architecture inventory.
- Architecture decision record guidance for future technical selections.

### Changed

- Ignore coverage output, TypeScript build caches, npm diagnostic logs, and CLI
  operation artifacts while retaining test sources, fixtures, and package-lock.json.

- README, configuration/CLI/development guides, architecture and roadmap now document
  the actual MVP, its available commands, and unverified platform/release boundaries.
- Node dependencies and compiled tarball/build outputs are ignored; the lockfile remains tracked.

- Architecture, README, library and contribution guides now distinguish accepted CLI
  contracts from unimplemented runtime behavior. No product package or dependency was installed.

- AGENTS.md and CLAUDE.md now reference the shared workflow authority without duplicating
  content standards; project continuity and phase boundaries remain explicit.
- README, contribution guide, architecture, and roadmap describe AI workflows and their
  actual verification scope.

- README, architecture, contribution instructions, and standard references now describe
  the available modular library and development verification workflow.
- Python verification bytecode is excluded from version control.

- README template aligned with Standard v0.1 using explicit manual authoring fields and
  conditional guidance, without fabricated badge URLs or a fixed project-title anchor.
- README, style guide, and architecture now reference the formal standard.

- README now separates available manual materials from planned tooling and links project guides.
- Contribution guidance now covers phase scope, evidence, verification, and safe AI assistance.


- Agent instructions now require repository-based session initialization, phase boundaries,
  progress updates, and Turkish owner reports.

### Fixed

- Restored the identity board's nested angular C mark across logos, symbols, and favicon.
- README branding now uses a dark panel with high-contrast outlined Inter lettering,
  avoiding theme-selection mismatches and installed-font rendering differences.

- Light-theme wordmark text now uses the brand dark color for readable contrast.

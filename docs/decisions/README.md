# Architecture decision records

Record significant technical choices here using sequential filenames such as
`0013-next-decision.md`. Each record must include status, context, decision,
alternatives considered, and consequences. Supersede earlier decisions explicitly
rather than silently rewriting their rationale.

Current product decisions are recorded in [PROJECT_SPEC.md](../PROJECT_SPEC.md#19-established-product-decisions).
Phases 5–6 selected and implemented the CLI technology. ADR 0009 revises the future
product scope without erasing earlier design rationale.

## Accepted records

- [0001: Declarative Markdown template library](0001-template-library.md) — JSON metadata,
  evidence-gated selection, custom sections, and a development-only verification reference.

- [0002: Shared AI workflow policy with thin entry points](0002-shared-ai-workflows.md) —
  reusable prompts, shared evidence rules, and explicit evaluation limits.

- [0003: CLI technology](0003-cli-technology.md) — TypeScript, Node LTS, Commander, and packaging.
- [0004: Configuration schema](0004-configuration-schema.md) — strict versioned JSON and offline schemas.
- [0005: Rendering and validation](0005-rendering-validation.md) — literal fields and Markdown/HTML ASTs.
- [0006: Safe updates](0006-safe-updates.md) — no-clobber creation, owned regions, preview, and concurrency limits.
- [0007: AI/localization boundaries](0007-ai-localization-boundaries.md) — optional proposal providers and source-tracked editions.

- [0008: CLI MVP implementation refinements](0008-cli-mvp-implementation.md) — strict JSON,
  locked dependencies, conservative population, and restricted init/write targets.

- [0009: Usability and revised product scope](0009-usability-and-scope.md) — one primary
  user path, representative examples, optional CLI, and removal of website/localization automation.

- [0010: Reviewed managed updates](0010-reviewed-managed-updates.md) — minimal usage input,
  explicit managed generation, exact reviewed hashes, preserved custom spans, and original-byte backups.

- [0011: Source-aware installed-agent drafting](0011-source-aware-agent-drafting.md) — explicit
  source transmission, bounded evidence, unreviewed proposals, client controls, and offline reviewed saves.

- [0012: Private release candidate and verification gates](0012-release-candidate-gates.md) —
  package/install smoke checks, pinned read-only CI, tested Node floors, and explicit remote/publication authorization.

- [0013: Trusted agent launchers](0013-trusted-agent-launchers.md) — global/native client
  lookup and shell-free Windows npm entry points, excluding repository-local npm bins.

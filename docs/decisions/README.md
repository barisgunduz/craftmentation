# Architecture decision records

Record significant technical choices here using sequential filenames such as
`0009-next-decision.md`. Each record must include status, context, decision,
alternatives considered, and consequences. Supersede earlier decisions explicitly
rather than silently rewriting their rationale.

No implementation technology has been selected during Phase 0. Product decisions
already mandated by the owner are recorded in [PROJECT_SPEC.md](../PROJECT_SPEC.md#19-established-product-decisions).
CLI technology, framework, configuration, rendering, provider abstractions,
localization, and update safety decisions belong to their designated roadmap phases.

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

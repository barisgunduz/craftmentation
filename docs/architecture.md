# Current architecture

## Implementation state

Craftmentation implements init, analyze, generate, offline validate, and preview-first update.
TypeScript compiles to ESM with locked npm dependencies and bundled Ajv schemas. The
48-section library, fourteen profiles, manual AI workflows, and source-backed examples
remain available. Version 0.1.1 is packaged for npm with a read-only six-job native CI
matrix. There is no provider SDK, localization engine, check, or doctor command.
Product requirements remain in [PROJECT_SPEC.md](PROJECT_SPEC.md). Phase 9 implements opt-in source interpretation through installed Codex/Claude clients.
Live Codex results and Claude protocol-only evidence are recorded separately. No existing
README or API key managed by Craftmentation is necessary for this explicit mode. The active scope
prioritizes an agent-based quick start and optional CLI, without a website or localization
engine. See [ADR 0009](decisions/0009-usability-and-scope.md) and the
[repository guide](README.md) for the user-facing organization.

## Components and responsibilities

| Component | Existing files | Responsibility |
|---|---|---|
| Documentation guidance | `docs/standard.md`, `docs/project-profiles.md` | README Standard v0.1 and fourteen evidence-gated profile recommendations |
| Template library | `README.template.md`, `templates/`, `sections/`, `docs/templates.md` | Manual starter, version-1 metadata, 48 fragments, default selection and ordering |
| Development verification | `scripts/check_template_library.py`, `tests/` | Metadata validation, selection reference, policy fixtures, and example behavior tests |
| CLI implementation | `src/cli/`, `src/configuration/`, `src/analyzer/`, `src/generator/`, `src/renderer/`, `src/validator/`, `src/filesystem/`, `src/shared/` | Five real commands, static provenance, literal rendering, offline checks, no-clobber creation, and guarded managed updates |
| Agent runtime bridge | `src/integrations/`, `schemas/proposal.schema.json` | Bounded evidence, explicit client subprocesses, source-quoted unreviewed proposals, and validated draft rendering |
| CLI design contracts | `docs/cli-architecture.md`, `docs/cli-reference.md`, `docs/configuration.md`, `docs/safe-file-operations.md`, `schemas/` | Implemented MVP contracts with future capabilities explicitly marked |
| Contract verification | `tests/schema_subset.py`, `tests/test_cli_contracts.py`, `tests/fixtures/contracts/` | Narrow structural oracle and synthetic instances, independent of actual Ajv compilation/runtime validation |
| Documentation fixtures | `examples/` | Five real source projects with manually composed READMEs and evidence inventories |
| Agent entry points | `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md` | Thin project-specific instruction routes |
| Shared AI workflows | `docs/ai-instructions.md`, `prompts/`, `docs/ai-integrations.md` | One workflow policy and four operation prompts, with compatibility limits |
| AI walkthrough verification | `docs/ai-evaluation.md`, `tests/fixtures/ai/`, `tests/test_ai_workflows.py` | Recorded manual outputs and deterministic artifact checks, not live provider evaluations |
| Live source-aware evaluation | `docs/ai-source-evaluation.md`, `tests/fixtures/ai-live/`, `examples/library/README.ai.md` | Actual Codex source-only outcomes, input/output integrity, and explicit semantic review limitations |
| Branding | `assets/brand/` | SVG symbols, wordmarks, favicon, palette and usage rules |
| Governance and continuity | `docs/PROJECT_SPEC.md`, `docs/roadmap.md`, `docs/audit.md`, `CHANGELOG.md` | Requirements, progress, findings and change history |
| Community and contribution guidance | `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `SUPPORT.md`, `.github/ISSUE_TEMPLATE/`, `.github/PULL_REQUEST_TEMPLATE.md` | Participation, reporting routes, and review inputs |
| Licensing and maintenance conventions | `LICENSE`, `docs/licensing.md`, `docs/style-guide.md`, `docs/releasing.md` | Reuse terms, documentation style, and release preparation |

GitHub issue templates and the PR template collect reports and review evidence; they
do not run validation or modify repository files. Issues is enabled; Discussions and
private vulnerability reporting were verified disabled on 2026-11-22. No confidential
reporting channel is established. The README embeds a local SVG lockup with an explicit dark panel, avoiding a
mismatch between browser color preference and the selected GitHub theme.

Brand assets follow the owner-supplied `assets/brand/identity-board.png`: two nested
angular C forms and Inter lettering. Wordmarks use outlined glyphs instead of SVG
text, so installed fonts and text rendering differences cannot alter the lockup.
Transparent light/dark variants, a light monochrome symbol, and a dark favicon
share the same mark. Inter attribution is retained in `assets/brand/inter-OFL.txt`;
no runtime font dependency is introduced.

## Current data flow and boundaries

Humans/agents can compose documentation manually. The CLI also loads strict JSON,
confines a static inventory, extracts supported package/README facts, resolves profile
overrides, selects evidence, renders literal fields, validates Markdown, and creates
a missing output through exclusive staging/no-clobber publication. Explicit --managed
generation adds exact-body ownership hashes. Update composes verified replacements for
existing unmodified regions, preserves custom spans, validates the complete candidate, and
defaults to diff/preview. --write --expect binds application to the reviewed candidate;
identity/hash checks, a cooperative lock, flushed stage, and retained original-byte backup
precede replacement. The deterministic route never executes repository scripts, loads target provider code,
or fetches external links. Explicit --agent invokes a trusted installed client in an owned
scratch directory, with selected source passed through stdin and command tools disabled.
The result is a proposal with exact-quote references, never verified static Analysis facts.
Source freshness and document validation precede any no-clobber draft save. --from --expect
can save exact reviewed bytes offline without regenerating nondeterministic model output.
The analysis, generation, update, and translation prompts all reference a shared workflow
policy, the standard, and the library contract. Operation prompts add scoped procedures;
entry files do not duplicate policy. A target repository and framework root are distinct,
so adopter instructions and licensing are preserved. The development checker validates metadata
and explicit evidence inventories, but does not inspect repository contents or verify claims.
`CLAUDE.md` imports AGENTS.md, while Copilot requests explicit reads. Cursor reuses
AGENTS.md; no legacy Windsurf adapter is installed. Official documentation review and
manual fixture walkthroughs do not establish native client discovery or model reliability.
Templates contain authoring placeholders and are not ready-to-publish project documentation.
The README standard defines four section classes and evidence-based inclusion criteria.
The default template uses double-brace manual authoring fields and conditional comments;
the CLI renderer now performs one nonrecursive literal substitution pass. No expression,
helper, include, or executable template engine is introduced. Localization conventions
apply only to explicitly requested multiple editions. Existing optional prompts and fixtures
remain; no localization engine or automated drift detection is planned.

## Interfaces, configuration and extension points

Current interfaces are Markdown documents, SVG assets, and version-1 JSON metadata.
Catalog IDs link standard content to fragments; profiles recommend IDs. The default layout
selects Core/Recommended candidates plus profile and explicit inclusions. Explicit non-Core
exclusions win; unknown, missing, sourceless, or unsafe evidence never produces a claim.
Unresolved Core or explicitly requested sections block readiness. Stable ordering uses
`(order, id)`. Custom sections share metadata with a reserved `custom-` prefix.

Example inventories contain per-section evidence states, sources, safety assessments,
and expected selections. The checker reads these declarative records and fragments without
executing their contents, rejecting traversal and symlink fragment paths. It never renders
or writes README files. Evidence truth and filled Markdown require human review.

Internal interfaces and the installed CLI are implemented for five commands.
There is no stable import API, deterministic general source-code understanding, provider SDK,
custom-template loader, localization engine, check/doctor implementation, or
online link checker. JSON package fields and existing output/root Markdown provide initial facts;
--usage-file adds explicitly reviewed Markdown without requiring configuration.
unsupported formats remain unclassified/unknown unless explicitly configured.
[Configuration](configuration.md) describes supported defaults, merge rules, source-backed
fields, and rejected future capabilities. Five [schemas](../schemas/README.md) are compiled
with actual Ajv 2020, without coercion, unknown-field removal, or default mutation.
Existing catalog/profile IDs and selection/evidence shapes are unchanged.
AI analysis walkthroughs reuse the library selection request/evidence shape; their
surrounding reports and source excerpts are evaluation artifacts, not a CLI analysis schema.
Update artifacts demonstrate focused preservation; translation artifacts record a source
fingerprint and Unreviewed status. Automated tests use controlled protocol responses and local child processes; live evaluation
calls are recorded separately and require source/cost authorization.

## Technology choices and constraints

Markdown, SVG, and JSON are the library formats. The checker and example tests use the
Python standard library only. The accepted product design selects TypeScript/Node.js ESM
and Commander, with bundled Ajv schemas, strict duplicate-key inspection via jsonc-parser,
and Markdown/HTML AST parsers. Exact versions and direct license metadata are recorded
in package-lock.json and THIRD_PARTY_NOTICES.md. Node ^24.22.3 and ^26.13.1 are runtime targets; exact
macOS-tested patches and package smoke results are in the roadmap. Linux/Windows execution
and release readiness remain unverified. Generation rejects existing output, protected
paths, unsupported capabilities, and missing Core evidence. Filesystem safety assumes a
quiescent workspace and supported local filesystem semantics; it is not a hostile-race sandbox.
See [safe operations](safe-file-operations.md) and [ADR 0008](decisions/0008-cli-mvp-implementation.md).
Future components must share schemas, keep AI optional, use safe file operations,
and treat target repositories as untrusted input. The framework's MIT license must
never silently become an adopting repository's license.

See [AI integrations](ai-integrations.md) and [ADR 0002](decisions/0002-shared-ai-workflows.md)
for workflow boundaries and source-backed compatibility assessment.
Phase 5 decisions are indexed in [ADRs](decisions/README.md); [Development](development.md)
defines the actual current checks and future implementation/test gates.

See [ADR 0010](decisions/0010-reviewed-managed-updates.md) for update/ownership boundaries
and the [practical workflow](workflow.md) for preview/review/save. The internal modules
`renderer/managed.ts` and `generator/update.ts` parse ownership and plan edits without writing;
`SafeFS.snapshot/replace` owns backup/publication and failure reporting.

See [ADR 0011](decisions/0011-source-aware-agent-drafting.md), the
[AI guide](ai-drafting.md), and [live evaluation](ai-source-evaluation.md) for source budgets,
client trust assumptions, runtime limits, and review boundaries.

See the [audit](audit.md) for gaps and the [roadmap](roadmap.md) for delivery order.

## Candidate verification

Phase 10 adds offline repository documentation checks, a cross-platform Python launcher,
and tarball/consumer smoke verification under scripts/. The six-job SHA-pinned workflow
has contents-read permission and never invokes a model or publishes. All six native jobs
passed for commit 400cf57cd65fb73fe836c3ff14ae89f13394fbe1, including the shell-free
Windows launcher. The matrix uses Intel macOS after the ARM64 hosted pool failed to
acquire runners; local ARM64 results remain separate evidence. Agent lookup excludes relative/project npm
PATH entries and uses trusted global/native clients; see [ADR 0013](decisions/0013-trusted-agent-launchers.md).
See [release readiness](release-readiness.md)
and [ADR 0012](decisions/0012-release-candidate-gates.md).

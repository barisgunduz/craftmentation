# Current architecture

## Implementation state

Craftmentation currently provides a documentation standard, declarative template library,
manual authoring workflows, and a development-only checker. Small executable example
projects and their behavior tests support the documentation. There is no product CLI,
package manifest, installed runtime dependency, configuration loader, or GitHub Actions
workflow. Phase 5 defines CLI/configuration/analysis/report schemas and accepted design
contracts, but no CLI implementation. Product requirements remain in
[PROJECT_SPEC.md](PROJECT_SPEC.md).

## Components and responsibilities

| Component | Existing files | Responsibility |
|---|---|---|
| Documentation guidance | `docs/standard.md`, `docs/project-profiles.md` | README Standard v0.1 and fourteen evidence-gated profile recommendations |
| Template library | `README.template.md`, `templates/`, `sections/`, `docs/templates.md` | Manual starter, version-1 metadata, 48 fragments, default selection and ordering |
| Development verification | `scripts/check_template_library.py`, `tests/` | Metadata validation, selection reference, policy fixtures, and example behavior tests |
| CLI design contracts | `docs/cli-architecture.md`, `docs/cli-reference.md`, `docs/configuration.md`, `docs/safe-file-operations.md`, `schemas/` | Accepted future command/data/safety architecture, not executable functionality |
| Contract verification | `tests/schema_subset.py`, `tests/test_cli_contracts.py`, `tests/fixtures/contracts/` | Narrow structural oracle and synthetic instances, not full metaschema/Ajv validation |
| Documentation fixtures | `examples/` | Five real source projects with manually composed READMEs and evidence inventories |
| Agent entry points | `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md` | Thin project-specific instruction routes |
| Shared AI workflows | `docs/ai-instructions.md`, `prompts/`, `docs/ai-integrations.md` | One workflow policy and four operation prompts, with compatibility limits |
| AI walkthrough verification | `docs/ai-evaluation.md`, `tests/fixtures/ai/`, `tests/test_ai_workflows.py` | Recorded manual outputs and deterministic artifact checks, not live provider evaluations |
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

A human or coding agent inspects the target repository, consults the standard and
README template, selects relevant sections, and manually writes verified documentation.
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
these are not a renderer syntax or executable template engine. Localization conventions
include manual source-revision/status tracking; automated drift detection is not implemented.

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

There is no implemented public API, automatic project detection, renderer, provider
adapter, or configuration loader. The [CLI architecture](cli-architecture.md) now specifies
future module interfaces and data flow; [configuration](configuration.md) defines version-1
structure, defaults, and precedence. Four [schemas](../schemas/README.md) encode design
shapes using existing section/profile IDs and the same selection/evidence contract.
The master-spec JSON was conceptual; the Phase 5 contract is the design authority for
implementation, without claiming any setting is executable yet. See [the library contract](templates.md)
and [ADR 0001](decisions/0001-template-library.md) for existing metadata boundaries.
AI analysis walkthroughs reuse the library selection request/evidence shape; their
surrounding reports and source excerpts are evaluation artifacts, not a CLI analysis schema.
Update artifacts demonstrate focused preservation; translation artifacts record a source
fingerprint and Unreviewed status. No prompt or test starts an external agent/provider.

## Technology choices and constraints

Markdown, SVG, and JSON are the library formats. The checker and example tests use the
Python standard library only. The accepted product design selects TypeScript/Node.js ESM
and Commander, with bundled Ajv schemas and Markdown/HTML AST parsers. Node 24 and 26 LTS
are planned targets; exact dependency versions/engines and platform compatibility must be
verified in Phase 6. The local Node 20 runtime was not upgraded or counted as CLI validation.
The product pipeline separates bounded static analysis, evidence-based planning, literal
rendering, validation, and confined writing. AI is an optional proposal port, not a core
runtime dependency. Generate must refuse existing output; guarded update defaults to preview.
See [safe operations](safe-file-operations.md) for explicit concurrency/filesystem limits.
No package/dependency installation or TypeScript/product source is added by this phase.
Future components must share schemas, keep AI optional, use safe file operations,
and treat target repositories as untrusted input. The framework's MIT license must
never silently become an adopting repository's license.

See [AI integrations](ai-integrations.md) and [ADR 0002](decisions/0002-shared-ai-workflows.md)
for workflow boundaries and source-backed compatibility assessment.
Phase 5 decisions are indexed in [ADRs](decisions/README.md); [Development](development.md)
defines the actual current checks and future implementation/test gates.

See the [audit](audit.md) for gaps and the [roadmap](roadmap.md) for delivery order.

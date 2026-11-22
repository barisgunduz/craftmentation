# Current architecture

## Implementation state

Craftmentation is currently a documentation-only framework under development.
There is no executable, package manifest, runtime dependency, configuration schema,
automated test suite, or GitHub Actions workflow. Planned capabilities are defined
in [PROJECT_SPEC.md](PROJECT_SPEC.md); they are not implemented interfaces.

## Components and responsibilities

| Component | Existing files | Responsibility |
|---|---|---|
| Documentation guidance | `docs/standard.md`, `docs/project-profiles.md` | Draft README order and initial profile recommendations |
| Template | `README.template.md` | Manually adapted Markdown starting point |
| Agent guidance | `AGENTS.md`, `CLAUDE.md`, `prompts/generate-readme.md` | Repository inspection and evidence-based writing instructions |
| Branding | `assets/brand/` | SVG symbols, wordmarks, favicon, palette and usage rules |
| Governance and continuity | `docs/PROJECT_SPEC.md`, `docs/roadmap.md`, `docs/audit.md`, `CHANGELOG.md` | Requirements, progress, findings and change history |
| Community and contribution guidance | `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `SUPPORT.md`, `.github/ISSUE_TEMPLATE/`, `.github/PULL_REQUEST_TEMPLATE.md` | Participation, reporting routes, and review inputs |
| Licensing and maintenance conventions | `LICENSE`, `docs/licensing.md`, `docs/style-guide.md`, `docs/releasing.md` | Reuse terms, documentation style, and release preparation |

GitHub issue templates and the PR template collect reports and review evidence; they
do not run validation or modify repository files. Issues is enabled; Discussions and
private vulnerability reporting were verified disabled on 2026-11-22. No confidential
reporting channel is established. The README selects local SVG wordmarks by theme.

## Current data flow and boundaries

A human or coding agent inspects the target repository, consults the standard and
README template, selects relevant sections, and manually writes verified documentation.
The generation prompt describes this workflow; no software enforces it yet.
`CLAUDE.md` references the shared agent instructions rather than replacing them.
Templates contain authoring placeholders and are not ready-to-publish project documentation.

## Interfaces, configuration and extension points

The only current interfaces are Markdown documents and SVG assets. Users can edit
the template and choose sections manually. There is no programmatic API, automatic
project detection, renderer, provider interface, or configuration precedence model.
`templates/`, `sections/`, and `examples/` contain only `.gitkeep` files.
The configuration JSON in the specification is conceptual, not a supported format.

## Technology choices and constraints

Markdown and SVG are the existing formats; no implementation language or CLI framework
has been selected. Phase 5 must evaluate choices and record ADRs before implementation.
Future components must share schemas, keep AI optional, use safe file operations,
and treat target repositories as untrusted input. The framework's MIT license must
never silently become an adopting repository's license.

See the [audit](audit.md) for gaps and the [roadmap](roadmap.md) for delivery order.

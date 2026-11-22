# Repository guide

You do not need to read this whole repository to create a README.
Start with the route that matches your task.

| I want to… | Read/use |
|---|---|
| Write a README with my existing AI tool | [Main quick start](../README.md#quick-start), [standard](standard.md), [starter](../README.template.md) |
| See what a finished result should contain | [Example gallery](../examples/README.md) |
| Analyze or update documentation repeatably | [Workflow prompts](../prompts/README.md) |
| Run the optional local CLI | [Practical workflow](workflow.md), [CLI reference](cli-reference.md), then [configuration](configuration.md) only when needed |
| Understand what exists and what is next | [Current audit](audit.md#product-and-usability-review), [roadmap](roadmap.md) |
| Contribute code or documentation | [Contributing](../CONTRIBUTING.md), [development checks](development.md) |

## What each area does

| Area | Purpose | Who normally needs it? |
|---|---|---|
| README.md | Product explanation and the recommended starting route | Everyone |
| README.template.md | A manual starting structure; remove irrelevant sections and fill real facts | README authors |
| docs/standard.md | Quality/inclusion rules and evidence requirements | Authors and agents |
| prompts/ | Optional task instructions for analysis, generation, updates, and requested-language work | AI-assisted authors |
| examples/ | Five real small source projects and curated READMEs explaining their choices | Authors comparing good results |
| templates/ | Catalog, default layout, and fourteen profile recommendations | Template contributors and CLI |
| sections/ | Forty-eight reusable Markdown fragments | Template contributors and CLI |
| src/ | TypeScript implementation of the five-command CLI | CLI contributors |
| schemas/ | Machine-checkable structure for configuration, analysis, library data, and reports | CLI contributors; ordinary users rarely need to open them |
| tests/node/ | CLI unit/integration test source; belongs in GitHub | Contributors and future CI |
| tests/fixtures/ | Deliberately authored evidence, expected outputs, edge cases, and historical evaluation artifacts | Test contributors |
| scripts/ | Development-only library verification | Contributors |
| assets/brand/ | Craftmentation's own identity; not a logo to copy into another project | Brand/documentation contributors |
| AGENTS.md, CLAUDE.md, .github/copilot-instructions.md | Instructions for developing Craftmentation | Agents working on this repository, not automatic installation into yours |
| docs/architecture.md and docs/decisions/ | Current implementation and reasons for significant choices | Maintainers |
| docs/PROJECT_SPEC.md and docs/roadmap.md | Active owner decisions and actual progress | Maintainers and contributing agents |
| docs/history/ | Earlier specification/roadmap preserved for context; not current obligations | Maintainers investigating history |
| Community policies, LICENSE, and notices | Participation, support, reporting, and reuse terms | Contributors and people redistributing material |

`node_modules/`, `dist/`, caches, coverage, logs, and CLI temporary operation files are
local/generated artifacts. They are ignored by Git. `package-lock.json`, source, schemas,
fixtures, and tests are shared repository material. GitHub contents and the npm package
have different purposes: test source belongs here even though the tarball excludes it.

## Two different ways to use Craftmentation

**AI-assisted writing** uses your agent's repository access and the supplied standard.
It can draft more contextual prose and follow the language you request. You review facts
and changes; Craftmentation does not host a model, install an SDK, or promise tool obedience.

**Deterministic CLI generation** uses supported static metadata and existing Markdown,
with explicit reviewed content for missing fields. It is repeatable and offline, but cannot
understand every codebase or infer a working usage example from a dependency name.
A useful AI draft can later be checked using the CLI; neither path requires learning all internals.

The current improvement focus and remaining product gaps are in the [audit](audit.md).
Use the [roadmap](roadmap.md) for next work, not the superseded plan in history.

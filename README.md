<img alt="Craftmentation — Craft better. Document smarter." src="assets/brand/logo-readme.svg" width="720">

# Craftmentation

**Craft better. Document smarter.**

A universal, AI-ready README and documentation framework for modern software projects.

Craftmentation helps developers, maintainers, engineering teams, technical writers, and
coding agents write documentation grounded in the repository they are documenting.
Its approach combines relevant sections, verified examples, and reusable guidance.

> Early development: the current workflow is manual. The CLI, automated README validation,
> localization tooling, and documentation website are planned.

[Quick start](#quick-start) · [Documentation](#documentation) · [Roadmap](docs/roadmap.md) · [Contributing](CONTRIBUTING.md)

## Available today

- A [README template](README.template.md) to adapt by hand.
- The [README Standard v0.1](docs/standard.md) and [14 project profiles](docs/project-profiles.md).
- A [modular library](docs/templates.md) with 48 reusable sections and [five source-backed examples](examples/README.md).
- Four [AI workflow prompts](prompts/README.md) for analysis, generation, updates, and translation,
  backed by [shared instructions](docs/ai-instructions.md).
- [Brand assets and usage guidelines](assets/brand/brand-guidelines.md).

No AI service is required to use these materials. [Integration guidance](docs/ai-integrations.md)
distinguishes documented entry points, manual walkthroughs, and untested native client behavior.

## Quick start

1. Download or clone this repository and read the [README Standard v0.1](docs/standard.md).
2. Inspect your target project's manifests, source, tests, scripts, CI, and existing documentation.
3. Copy `README.template.md` into your project as `README.md` only after reviewing and
   backing up any existing README. Preserve valid custom content.
4. Keep relevant sections, fill them with verified information, and remove unused
   sections, all authoring placeholders, and authoring comments.
5. Check commands against the repository, verify links, and preview the result on GitHub.

For AI assistance, choose a [workflow prompt](prompts/README.md) alongside
your project's own instructions. Craftmentation's [AGENTS.md](AGENTS.md) governs
contributions to this repository; do not overwrite another project's agent instructions.

Keep required Craftmentation copyright and permission notices when reusing substantial
material. Do not copy its license as your project's license unless you have chosen MIT.
See the [licensing guide](docs/licensing.md).

## Principles

- **Evidence over assumptions:** document confirmed behavior and report unknowns separately.
- **Relevant sections:** omit content that does not help the intended reader.
- **Human-readable first:** keep documentation useful without AI tooling.
- **GitHub-compatible Markdown:** use portable text, links, code examples, and accessible media.
- **Modular direction:** build toward reusable sections and project profiles.
- **License neutrality:** preserve each adopting project's licensing decisions.

## Documentation

| Guide | Purpose |
|---|---|
| [README Standard v0.1](docs/standard.md) | Section classifications, inclusion rules, and quality requirements |
| [Template library](docs/templates.md) | Metadata, composition, evidence gates, and custom sections |
| [Project profiles](docs/project-profiles.md) | Recommendations for all 14 project categories |
| [Examples](examples/README.md) | Five source-backed manual README compositions |
| [AI integrations](docs/ai-integrations.md) | Tool entry points, shared policy, and compatibility limits |
| [AI evaluation](docs/ai-evaluation.md) | Recorded walkthroughs and regression checks |
| [Architecture](docs/architecture.md) | Current components and implementation boundaries |
| [CLI design](docs/cli-architecture.md) | Accepted future commands, modules, schemas, and safety design |
| [Configuration design](docs/configuration.md) | Version-1 schema and precedence; no loader implemented yet |
| [Style guide](docs/style-guide.md) | Repository documentation conventions |
| [Roadmap](docs/roadmap.md) | Phase progress, limitations, and next work |
| [Master specification](docs/PROJECT_SPEC.md) | Complete product requirements |
| [Release conventions](docs/releasing.md) | Versioning, changelog, and release preparation |
| [Changelog](CHANGELOG.md) | Meaningful changes |

The repository contains Markdown guidance and fragments, JSON catalogs and profiles,
example source projects, prompts, and SVG assets. A development checker verifies library
consistency and evidence-gated section selection; it does not generate READMEs. See
[Contributing](CONTRIBUTING.md) for verification commands. There is no product package
installation or build step yet. The [CLI architecture](docs/cli-architecture.md) is defined
for the next implementation phase; its commands are not available in this checkout.

## Community

Read [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md)
before participating. Use [Support](SUPPORT.md) for questions and bug reports, and
[Security](SECURITY.md) for sensitive concerns. Private reporting is not currently enabled.

## License

Copyright © 2026 Barış Gündüz. Craftmentation is distributed under the [MIT License](LICENSE).
Its license does not automatically determine the license of projects using its templates.

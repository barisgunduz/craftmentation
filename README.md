<img alt="Craftmentation — Craft better. Document smarter." src="assets/brand/logo-readme.svg" width="720">

# Craftmentation

**Craft better. Document smarter.**

A universal, AI-ready README and documentation framework for modern software projects.

Craftmentation helps developers, maintainers, engineering teams, technical writers, and
coding agents write documentation grounded in the repository they are documenting.
Its approach combines relevant sections, verified examples, and reusable guidance.

> Early development: the current workflow is manual. The CLI, modular section library,
> automated validation, localization tooling, and documentation website are planned.

[Quick start](#quick-start) · [Documentation](#documentation) · [Roadmap](docs/roadmap.md) · [Contributing](CONTRIBUTING.md)

## Available today

- A [README template](README.template.md) to adapt by hand.
- The [README Standard v0.1](docs/standard.md) and [initial project profiles](docs/project-profiles.md).
- A [generation prompt](prompts/generate-readme.md) and repository inspection guidance for coding agents.
- [Brand assets and usage guidelines](assets/brand/brand-guidelines.md).

No AI service is required to use these materials. Agent compatibility has not yet been tested.

## Quick start

1. Download or clone this repository and read the [README Standard v0.1](docs/standard.md).
2. Inspect your target project's manifests, source, tests, scripts, CI, and existing documentation.
3. Copy `README.template.md` into your project as `README.md` only after reviewing and
   backing up any existing README. Preserve valid custom content.
4. Keep relevant sections, fill them with verified information, and remove unused
   sections, all authoring placeholders, and authoring comments.
5. Check commands against the repository, verify links, and preview the result on GitHub.

For AI assistance, use the [generation prompt](prompts/generate-readme.md) alongside
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
| [Project profiles](docs/project-profiles.md) | Initial category recommendations |
| [Architecture](docs/architecture.md) | Current components and implementation boundaries |
| [Style guide](docs/style-guide.md) | Repository documentation conventions |
| [Roadmap](docs/roadmap.md) | Phase progress, limitations, and next work |
| [Master specification](docs/PROJECT_SPEC.md) | Complete product requirements |
| [Release conventions](docs/releasing.md) | Versioning, changelog, and release preparation |
| [Changelog](CHANGELOG.md) | Meaningful changes |

The repository currently contains Markdown guidance, templates, prompts, and SVG assets.
`sections/`, `templates/`, and `examples/` are reserved scaffolding; their libraries
will be developed in later phases. There is no package installation or build step yet.

## Community

Read [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md)
before participating. Use [Support](SUPPORT.md) for questions and bug reports, and
[Security](SECURITY.md) for sensitive concerns. Private reporting is not currently enabled.

## License

Copyright © 2026 Barış Gündüz. Craftmentation is distributed under the [MIT License](LICENSE).
Its license does not automatically determine the license of projects using its templates.

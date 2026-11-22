# Craftmentation

**Craft better. Document smarter.**

A universal, AI-ready README and documentation framework for modern software projects.

Craftmentation helps developers create consistent, useful, and maintainable project documentation. It combines a reusable README standard, modular documentation sections, and AI-agent instructions that adapt to the actual contents of a repository.

> Status: Early development. The structure and conventions may evolve before the first stable release.

## What it aims to provide

- A reusable README structure for different kinds of software projects
- Optional sections that adapt to the project's real features and needs
- Clear installation, configuration, usage, testing, and contribution guidance
- Support for screenshots, diagrams, demos, and other project assets
- Multilingual README support
- AI-agnostic instructions for repository-aware documentation generation

## Principles

1. **Evidence over assumptions.** Documentation must reflect the repository, not imagined features.
2. **Relevant, not exhaustive.** Omit sections that do not apply.
3. **Human-readable first.** AI tooling should improve documentation, not make it harder to maintain.
4. **Markdown-native.** Generated README files should work on GitHub without a special renderer.
5. **Modular by design.** Projects can adopt only the sections they need.
6. **License-neutral for adopters.** Craftmentation does not assign a license to projects using its templates.

## Repository structure

```text
craftmentation/
├── README.md
├── README.template.md
├── LICENSE
├── AGENTS.md
├── CLAUDE.md
├── CONTRIBUTING.md
├── templates/
├── sections/
├── prompts/
├── examples/
├── docs/
├── assets/
│   └── brand/
└── .github/
```

## Quick start

1. Copy `README.template.md` into your project as `README.md`.
2. Review the template and keep only sections relevant to your project.
3. Follow `AGENTS.md` when using an AI coding assistant.
4. Replace every placeholder with verified project information.
5. Preview the Markdown on GitHub before publishing.

For AI-assisted generation, start with [`prompts/generate-readme.md`](prompts/generate-readme.md).

## Project status

Craftmentation is being developed in stages:

- [x] Project name and initial identity direction
- [x] Initial repository structure
- [ ] README content standard
- [ ] Modular section library
- [ ] AI instruction compatibility checks
- [ ] Example repositories and project profiles
- [ ] Validation tooling
- [ ] First stable release

## Contributing

Ideas, issues, and pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before contributing.

## License

Craftmentation is available under the [MIT License](LICENSE). The license applies to Craftmentation and reused portions subject to its terms; it does not automatically determine the license of projects using its templates. See [Licensing guide](docs/licensing.md).

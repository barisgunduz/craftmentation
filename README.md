<img alt="Craftmentation — Craft better. Document smarter." src="assets/brand/logo-readme.svg" width="720">

# Craftmentation

**Craft better. Document smarter.**

Create a useful README for the project you actually have. Craftmentation gives you a
reusable structure, evidence-based AI instructions, finished examples, and an optional
local CLI for source-aware drafting, generation, and validation.

[Start here](#quick-start) · [See examples](examples/README.md) · [Repository guide](docs/README.md) · [Roadmap](docs/roadmap.md)

## Quick start

The easiest route is your existing AI coding tool. You do not need to install the CLI,
configure an API key, or read the framework internals.

1. Open **your project** in your coding agent.
2. Give it [the README standard](docs/standard.md) and [the starter template](README.template.md)
   as files or accessible local references.
3. Send this request:

```text
Create or improve this project's README using the supplied Craftmentation standard and template.
Inspect the actual repository first. Keep relevant sections and preserve accurate custom content.
Use verified installation, configuration, and usage examples. Do not invent missing facts.
Write in English unless I request another language.
Show me a reviewable draft and list unresolved questions separately before saving.
```

Review the draft, fill genuine information gaps, then ask your agent to save the intended
change. If a README already exists, preserve useful content and legal notices. Your
project keeps its own license; Craftmentation does not assign one to it.

For manual writing, use the same standard and starter yourself. Fill relevant sections
with verified facts and remove unused fields and sections.

For repeatable analysis, updates, or a language-specific request, use the optional
[workflow prompts](prompts/README.md). They work with the materials you provide; automatic
instruction loading and output quality depend on your chosen tool and available context.

## What should the result look like?

Start with the [example gallery](examples/README.md). It shows complete READMEs for a
web app, CLI, API, library, and desktop app, with real source, meaningful examples,
troubleshooting, and honest limits. Each explains why some sections were omitted.

These are curated examples of documentation quality. They are not claims that the CLI
can infer every detail automatically. A simple project needs a concise useful README;
it does not need fabricated features or empty sections to look substantial.

## Optional: generate from source with the CLI

For repeated local checks or deterministic drafts, the local CLI has five commands:

| Command | What it does |
|---|---|
| `init` | Create configuration without overwriting an existing file |
| `analyze` | Inspect static repository evidence |
| `generate` | Draft from source with an opted-in agent, or generate deterministically from supported facts |
| `validate` | Check Markdown, placeholders, internal links, and configuration offline |
| `update` | Preview managed changes; apply only an explicitly reviewed update with a backup |

Use Node.js 24.22.3+ (24.x) or 26.13.1+ (26.x) and npm:

```bash
npm install --global craftmentation@0.1.0
craftmentation --help
craftmentation analyze --root /path/to/your-project
```

Replace the example path with your project directory. Analysis is read-only. For source-code
interpretation, use an installed, authenticated Codex or Claude CLI explicitly:

```bash
craftmentation generate --agent codex --root /path/to/your-project
```

Replace the example path with your project directory; use `--agent claude` for Claude.
The command returns a reviewable draft, source citations, and unresolved questions. It
works without an existing README. To save a new draft, add `--output README.draft.md`.
Existing files are protected. See the [AI drafting guide](docs/ai-drafting.md) for reviewing
what is sent and saving an exact reviewed draft.

`--agent` explicitly sends bounded source excerpts through your selected client and may
consume its quota or incur charges, including with `--dry-run`. Without it, generation
stays offline and uses JSON package metadata, existing Markdown, and reviewed input.
Craftmentation does not execute project scripts. Model interpretations need factual review.
Follow the [preview/review/save workflow](docs/workflow.md), including missing usage and
safe updates. See the [CLI reference](docs/cli-reference.md) for flags.

Version `0.1.0` includes the five commands and optional agent drafting described here. Runtime
checks passed on Linux, Windows, and Intel macOS with both Node floors; macOS ARM64 was
also tested locally. See [release readiness](docs/release-readiness.md) for exact evidence and limits.
See [release notes](docs/release-notes.md) and [installation/upgrade guidance](docs/upgrading.md)
for npm, source-checkout, and local-package routes.

## What is in this repository?

Most users need only the standard, starter, and an example. `templates/` and `sections/`
are reusable building blocks; `src/`, `schemas/`, tests, and architectural records maintain
the optional CLI. [The repository guide](docs/README.md) explains every area and where to
start. You do not have to learn their internal formats to write one README.

There is no separate documentation website or translation platform planned. Documentation
lives here. Ask your AI tool for the output language you want; English is the default.

## Contributing and support

See [Contributing](CONTRIBUTING.md), [Support](SUPPORT.md), [Code of Conduct](CODE_OF_CONDUCT.md),
and [Security](SECURITY.md). The [roadmap](docs/roadmap.md) now prioritizes usability,
output quality, safe maintenance, and release confidence.

## License

Copyright © 2026 Barış Gündüz. Craftmentation uses the [MIT License](LICENSE).
Keep required notices when reusing substantial material. Your project's license remains
your own decision; see the [licensing guide](docs/licensing.md).

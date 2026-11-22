# AI integrations v0.1

## Available workflow

Craftmentation provides shared instructions and four reusable prompts, not an AI SDK,
API provider, or automatic agent installer. Read [shared instructions](ai-instructions.md),
[README Standard v0.1](standard.md), and [the library contract](templates.md). Select an
[analysis, generation, update, or translation prompt](../prompts/README.md), supply the
framework and target roots, and explicitly request either a preview or scoped document edit.

For another repository, keep its existing agent instructions and reference a local copy
of the shared materials. Do not install Craftmentation's development AGENTS.md there:
its phase protocol is specific to developing Craftmentation. Never overwrite a project's
instruction files to add an integration. A file link is a request to read context, not
proof that an agent has loaded it. Ask the active agent to identify which files it read.

## Compatibility and verification

Official documentation was checked on 2026-11-22. Documentation support means a documented
instruction entry point exists, not that a client or model obeyed it. No separate vendor
client was launched for an end-to-end discovery or model-output test in this phase.
The implementing coding agent performed manual prompt walkthroughs on five local source
fixtures; automated checks validate the recorded artifacts, not model reliability.

| Environment | Repository entry point | Evidence and limits |
|---|---|---|
| Codex | `AGENTS.md`, with explicit reads of shared policy and prompt | Documented discovery route; guidance in the Codex guide below. This development session uses the supplied repository instructions; no separate CLI discovery test was run. |
| Claude Code | `CLAUDE.md` imports `AGENTS.md` | Import syntax documented; adapter paths statically checked. No Claude session was launched. |
| GitHub Copilot | `.github/copilot-instructions.md` points to AGENTS and shared policy | Repository-wide file documented; feature and IDE support can differ. No Copilot session was exercised. |
| Cursor | Existing root `AGENTS.md`; explicitly attach referenced files if needed | Official docs describe root/nested AGENTS. Evaluated as sufficient for this repository; no duplicate `.cursor/rules` adapter added and no client test run. |
| Windsurf | Explicitly supplied shared policy and prompt | Historical documentation route now redirects to Devin Local. Destination documents AGENTS, but legacy Windsurf behavior is not verified. No legacy adapter added. |
| Other coding agents | Explicitly provided shared policy, standard, and chosen prompt | Portable text workflow; automatic instruction discovery is unknown unless independently verified. |

### Official sources

- [Codex AGENTS.md guidance](https://developers.openai.com/codex/guides/agents-md/):
  project instruction discovery, nested scope, and overrides. Checked redirect to ChatGPT Learn.
- [Claude Code memory](https://code.claude.com/docs/en/memory): `CLAUDE.md` and `@path` imports.
- [Copilot repository instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions):
  `.github/copilot-instructions.md` and feature-dependent instruction handling.
- [Cursor rules](https://cursor.com/docs/rules): AGENTS.md as a plain Markdown alternative to project rules.
- [Historical Windsurf AGENTS route](https://docs.windsurf.com/windsurf/cascade/agents-md):
  redirected during review to [Devin Local customizations](https://docs.devin.ai/desktop/devin-local/customizations),
  which documents AGENTS-based rules. This does not establish behavior of an installed legacy client.

## Codex guidance

Start documentation work in the intended target workspace and identify framework materials
explicitly. In Craftmentation development, read the permanent specification and roadmap
before executing only the authorized phase, as required by AGENTS.md. In adopting projects,
follow their instructions and use the shared documentation policy without copying this
project's phase lifecycle.

Codex's documented discovery distinguishes AGENTS.md from AGENTS.override.md and combines
applicable scopes. A user or nested override may change the active guidance. Inspect the
active context instead of assuming the root file is the only source. Do not change global
settings, create overrides, bypass sandbox approvals, or enable an AI provider for these
prompts. Use the analysis prompt for a read-only evidence report before authoring if needed.
The prompts themselves are not `craftmentation` commands.

## Workflow evaluation and limits

The [evaluation record](ai-evaluation.md) documents manual analysis/generation walkthroughs
for web, CLI, API, library, and desktop fixtures, plus preservation, translation, and hostile
content scenarios. These are small authored repositories, not an external benchmark or
endorsement by their tool vendors. Artifact assertions and existing example tests provide
regression checks; they cannot prove future AI output is correct or injection-resistant.

Re-evaluate discovery and model behavior in each tool/version before making a runtime
compatibility claim. Do not run external models, transmit repository content, incur provider
charges, or install clients merely to exercise this framework without the necessary authorization.
The provider boundary is designed but has no SDK/adapter. The four-command CLI MVP
operates deterministically without AI. Automated localization is outside the active scope;
users can request a language from their agent without installing a translation system.

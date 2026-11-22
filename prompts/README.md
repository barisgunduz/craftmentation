# Documentation workflow prompts

These prompts are portable task instructions, not CLI commands or provider integrations.
Use them with any coding agent that can read the required repository files. They share
one [workflow policy](../docs/ai-instructions.md), the [standard](../docs/standard.md),
and the [template library contract](../docs/templates.md).

| Operation | Prompt | Default effect |
|---|---|---|
| Inspect evidence and select content | [Analyze](analyze-repository.md) | Read-only report |
| Create a README from verified facts | [Generate](generate-readme.md) | Draft, or scoped write when authorized |
| Reconcile documentation with source | [Update](update-readme.md) | Focused draft/patch, or authorized write preserving custom content |
| Translate a known source | [Translate](translate-readme.md) | Draft, or authorized target-language document |

For a first README, [the main quick start](../README.md#quick-start) needs only
the standard and manual starter. The modular library is optional for that route. Ask
your agent for the output language you want; English is the default. No maintained
translation set or multilingual CLI is required. Translation is an optional user task.

For the full reusable prompts, specify the target repository root, Craftmentation framework root, requested operation,
output document, language, and whether you want a preview or file edit. The default target
is the active repository; the default generation output is its README.md. Never guess a
framework checkout location or a translation language. If essential input is absent, inspect
available context and ask only for what is necessary. Explicitly attach or read the shared
policy and framework files if the tool does not load linked files automatically.

For another repository, preserve its agent instructions. Reference a local copy of the
shared policy and standard; do not replace its AGENTS.md with Craftmentation's development
protocol. No prompt installs an adapter, configures an AI provider, or authorizes publication.
See [AI integrations](../docs/ai-integrations.md) for tool entry points and verified limits.

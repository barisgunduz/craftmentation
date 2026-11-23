# ADR 0011: Opt-in source-aware drafting through installed agents

Status: Accepted, 2026-11-23

## Context

The owner requested that the CLI interpret application source and produce a useful README
without relying on an existing README. Continuation followed the recommendation to use
installed Codex/Claude clients first. Direct API credentials and a mandatory provider SDK
would add a second authentication path before validating this workflow.

## Decision

Add generate --agent codex|claude as an explicit transmission/invocation choice. Default
agent generation previews; an explicit --output can create a missing draft. --preview-context
shows selected evidence without a model call. A reviewed saved draft can be copied offline
with --from --expect; existing output and protected destinations remain guarded. AI update,
implicit config-triggered invocation, managed AI adoption, and provider SDKs are excluded.

Use the existing confined inventory, then select bounded source/manifests/README/tests/CI
context: 48 KiB text, 12 KiB per file, 40 included files, and 100 listed omitted paths with
a full omitted count. Selection and truncation are observable. Treat excerpts as untrusted
data; exclude protected/unsafe content and agent instruction entry files. Heuristics do
not guarantee secret detection or complete code coverage.

The provider port receives a prompt/evidence bundle and returns only a strict JSON
proposal. Validate known unique section IDs, Core sections, supplied source paths and exact
quotes, unsafe content, links, Markdown, and source freshness. License and named-author/contributor, sponsorship, security/support/conduct-policy,
and logo/badge sections cannot be supplied by the model. Only the inspected target notice can add license
information. Never promote model interpretation to verified static Analysis facts.

Invoke trusted installed clients without a shell, target-defined commands, or arbitrary
arguments, in an owned scratch directory without target source files. Codex uses ignored
config/rules, ephemeral read-only execution, disabled shell/unified-exec and search; reject
tool events. Claude requests safe mode, no tools, empty MCP, disabled customizations/hooks,
and structured output. The trusted client handles its authentication. These controls do
not constitute a hermetic OS sandbox or override administrator policy.

Bound time/output, terminate the local process group on POSIX after limits/cancellation,
clean owned scratch files, and never echo raw client errors. No automatic retry incurs
additional model usage. Agent dry-run means no target writes; client state/scratch activity
and quota usage are possible. Offline generation retains its stronger no-provider behavior.

## Alternatives considered

- Only extend manifest parsers: useful deterministic facts, but not general source interpretation.
- Direct API first: explicit credentials/billing and another transport before proving value.
- Run an unconstrained agent inside the target: exposes its scripts, instructions and files as tools.
- Trust a fluent README as verified: citations do not establish correct interpretation.
- Always rewrite README.md: breaks review and custom-content preservation.

## Consequences

The product gains real source-aware drafting without making offline operation AI-dependent.
Users must review semantic correctness and authorize source transmission. Installed-client
versions, authentication, policies, and quotas affect behavior. Live Codex evaluation and
Claude protocol tests are distinct evidence; native Windows/Claude account verification
are not implied by passing subprocess tests. Existing version-1 report data gains optional
AI metadata and a separate proposal schema; static Analysis provenance is unchanged.

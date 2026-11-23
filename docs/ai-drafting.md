# AI-assisted source-to-README drafting

This mode lets Craftmentation interpret source through your installed **Codex CLI** or
**Claude Code**, without requiring a Craftmentation API key or vendor SDK. The client
must already be installed, authenticated, and support the safety/structured-output flags
used by the adapter. Craftmentation never installs or authenticates a client for you.

Selecting `--agent` explicitly authorizes sending the selected source excerpts through
that client. Its account terms, privacy policy, quota, and charges apply; this is not a
free or unlimited service. Without --agent, the existing deterministic commands stay offline.

## Inspect, draft, review, save

From a built Craftmentation checkout, replace the example project path with your target:

```bash
node dist/cli/index.js generate --agent codex --root /path/to/your-project --preview-context
```

This prints the exact bounded evidence bundle without calling a model. Check its included
files, omitted files, truncated excerpts, and source content before transmission. Files
can still contain sensitive data the heuristics miss. Do not use the mode for data you
are not authorized to send. There is no automatic upload without --agent.

Then request a draft:

```bash
node dist/cli/index.js generate --agent codex --root /path/to/your-project
```

Use --agent claude instead for a compatible Claude installation. To retain complete
source quotations and selection metadata, choose --json on the initial generation call;
human output prints the draft and review/unknown diagnostics. Do not regenerate solely
to retrieve metadata, since that would make another billable/quota-consuming request. By default the command
prints a draft without writing the target repository. To save a **new** review file:

```bash
node dist/cli/index.js generate --agent codex --root /path/to/your-project --output README.draft.md
```

An existing output is refused before a model call that would save over it; read-only
preview is still possible. Review the new file, source
citations, and W_AI_UNKNOWN questions. W_AI_REVIEW includes the exact document hash.
Finish factual review, resolve applicable questions, and remove the draft instruction
comment before publishing. If you edit the draft, validate it to obtain its current hash:

```bash
node dist/cli/index.js validate --root /path/to/your-project --document README.draft.md
```

Validation prints Document hash. It checks structure/links, not semantic correctness.
To save the exact reviewed draft as a missing README in the same directory:

```bash
node dist/cli/index.js generate --root /path/to/your-project --from README.draft.md --expect REVIEWED_SHA256
```

Replace REVIEWED_SHA256 with the printed 64-character lowercase hash. This last command
is offline: it validates and copies the exact reviewed bytes, without calling a model
again. Existing README.md is never overwritten. For an existing README, ask your agent
for a focused reconciliation; the [managed update](workflow.md#maintain-a-cli-managed-readme)
route remains available for explicitly managed deterministic documents.

Agent drafting does not combine with --managed, --usage-file, --from, or --expect.
--from requires --expect and a draft/output in the same directory to preserve link meaning.
Configuration ai.enabled remains reserved/rejected: a repository config cannot silently
invoke a client or authorize source transmission. Choose the agent explicitly on the CLI.

## What is analyzed

Craftmentation first performs the same bounded, confined static inventory as offline
analysis. It then selects at most 48 KiB of eligible source text, at most 12 KiB per file:

1. Manifests and root dependency/build definitions.
2. Existing root README, when present.
3. Source directories and recognizable source files.
4. Tests, CI workflows, and small root text examples within the remaining budget.

At most 40 files are included. At most 100 omitted paths are listed, with a separate
omittedCount for the full number; metadata is additional to the source-text budget.
Order within each priority is deterministic. Truncation uses complete UTF-8 characters
and prefers complete lines. Credentials/protected paths, symlinks, binaries, known generated
areas, instruction entry files, lockfiles, historical docs, and detected unsafe content
are not sent. The bundle lists text omitted by selection and marks truncated files;
analysis diagnostics/skips cover inventory exclusions. This is not a complete secret scanner
or a guarantee of whole-repository coverage. Large projects will have incomplete context.

The agent receives evidence as data, the allowed section catalog, profile constraints,
and a strict response schema. It is asked to interpret real behavior, propose useful
usage/setup, distinguish inspected code from executed tests, and list unknowns separately.
No README is necessary. It must quote inspected excerpts for every proposed section.
Use --project-type with an existing profile ID when the repository is ambiguous; a profile
constraint guides section choice but does not prove features or compatibility.

## Checks and preservation

The adapter checks JSON structure, known/unique section IDs, Core content, source paths,
exact quote matches, unsafe content, and external URLs against supplied evidence. It then
uses literal templates and the normal Markdown/link/path validator. Source evidence is
rechecked after the call; changed inputs require a new proposal. Model output is never
added to the static Analysis facts as verified information.

Citations prove that text was supplied, **not that the model interpreted it correctly**.
For example, quoting a dependency does not prove a feature, and a quoted test does not
prove it passed. Semantic review remains necessary. Unknowns are separate diagnostics,
not fabricated filler in the README. A draft may correctly be short for a tiny project.

AI cannot supply license, named-author/contributor, sponsorship, security/support/conduct
policy, or logo/badge sections in this initial integration. License
text is appended only through the deterministic inspected-target-notice path. No adopting
license, application code, agent instruction, or policy file is rewritten. No automatic
new-model retry occurs after errors or an inadequate proposal.

## Client boundary and limits

The client runs in an owned temporary directory, receives source text through stdin,
and is not given the target working directory or copied source files. Shell interpolation,
target-specified executables, and arbitrary provider arguments are not supported.

Install clients globally or as native user installations on PATH. Relative PATH entries
and node_modules directories are excluded; repository-local client installations are not
executed. Windows native executables run directly. Global npm JavaScript clients run via
Node using their known package's confined bin entry, without executing .cmd shell shims.
See [ADR 0013](decisions/0013-trusted-agent-launchers.md).

Codex uses read-only sandboxing, ignored user config/rules, disabled shell/unified-exec
features and web search, and an ephemeral session. Unexpected tool events reject its
result. Claude uses safe mode, no built-in tools, empty explicit MCP configuration,
disabled skills/hooks, no session persistence, and structured output. Authentication is
handled by the trusted installed client; Craftmentation never reads its stored tokens.
See the official [Codex noninteractive guide](https://learn.chatgpt.com/docs/non-interactive-mode)
and [Claude CLI reference](https://code.claude.com/docs/en/cli-reference).

These client controls are not a hermetic OS sandbox. Installed clients and administrator
policies must be trusted; client authentication, diagnostic, or managed-policy activity
may have local side effects outside the target. --dry-run prevents target writes but
still invokes the selected model and may create client/scratch files. --preview-context
is the no-model inspection path. The runner limits calls to 180 seconds and combined
stdout/stderr to 512 KiB; cancellation/limits terminate the local process group on POSIX.
A remote request can still consume quota after local cancellation. Raw agent logs are not
shown, since they can contain sensitive material.

Codex has been exercised with live model calls as recorded in the evaluation. Claude
transport/options have automated protocol tests; native live-account compatibility must
not be inferred from those alone. Offline native CI covers the earlier release candidate;
the launcher revision requires a fresh matrix run, and live Windows client behavior is
not established by protocol tests.
See the [actual source-only library output](../examples/library/README.ai.md) and
[evaluation record](ai-source-evaluation.md) for actual results and limitations.

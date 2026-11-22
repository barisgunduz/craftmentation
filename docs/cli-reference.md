# CLI interface design

## Availability

The CLI implements init, analyze, generate, validate, and update from this checkout. Build with
`npm run build` and invoke `node dist/cli/index.js`, or use the npm-created bin from an
explicitly installed local package. The private development version is 0.0.0-dev.0; no
public package release exists. Update previews managed changes and applies only an explicitly
reviewed candidate with a backup. Check/doctor are unimplemented design references and
are rejected as unknown commands; custom libraries/providers require a demonstrated need.
Localization automation is outside active scope. Tables mentioning these commands describe
reserved interfaces, not commands users can run.

## Common interface

`craftmentation <command> [options]` has no implicit default command. Bare invocation
prints usage and exits 2; explicit --help and --version exit 0. Unknown commands, unknown
flags, duplicate scalar options, contradictory flags, and positional arguments fail with
exit 2. There is no interactive prompt, automatic typo execution, auto-update, shell
completion, stdin instruction stream, or command execution from repository metadata.

| Option | Scope | Meaning |
|---|---|---|
| --root <path> | All commands | Explicit target directory; default cwd, never silently search parent repositories |
| --config <path> | All commands | Explicit root-relative config path; missing or invalid requested file is an error |
| --json | All commands | One JSON result envelope on stdout; no human progress text in it |
| --help | All commands | Static command help without scanning the repository |
| --version | Top level | Installed package version once implementation exists, never an invented release value |
| --dry-run | init, generate, update | No files, locks, temporary files, or directories written; return proposed change summary |
| --project-type <id> | analyze, generate, update | Explicit known profile selection; no evidence bypass |
| --output <path> | generate, update | Override configured Markdown destination within root |
| --language <tag> | generate, update | Explicit language override; reject unsupported capabilities |
| --include <id> | generate, update | Repeatable explicit section include; unknown or unsupported evidence fails |
| --exclude <id> | generate, update | Repeatable non-Core exclusion; Core cannot be excluded |
| --usage-file <path> | generate, update | Reviewed UTF-8 Markdown usage body inside the target root; overrides usage content |
| --managed | generate | Explicitly add invisible ownership markers to newly generated sections |
| --expect <sha256> | generate, update | Require exactly the reviewed candidate hash; mandatory with update --write |
| --write | update | Apply an eligible reviewed update in a quiet workspace, retaining an original backup |

Repeated include/exclude values are deduplicated, then exclusions win; these list flags
augment the effective section map instead of discarding unrelated configured choices.
No --force flag bypasses path, concurrency, evidence, Core, or existing-file protections.
--json controls reporting, not output-file contents. Error messages are on stderr in human
mode. In JSON mode every handled failure is one schema-valid envelope on stdout; stderr
is reserved for unrecoverable startup errors before the reporter can run.

## Command semantics

| Command | Phase | Inputs and behavior | Filesystem effect |
|---|---|---|---|
| init | 6 | Validate root and config; plan minimal schemaVersion-1 defaults | Create only the config if absent; byte-identical existing config is a no-op, different existing config is a conflict |
| analyze | 6 | Bounded static inspection, type signals, provenance and section evidence | Read-only; JSON envelope data is the canonical Analysis object |
| generate | 6 | Resolve config, analyze, select evidence, render, validate | Create only a missing output document; refuse any existing output and direct users to update |
| validate | 6 | Check configured/explicit document path, config, known publication rules and internal links | Read-only; --document <path> overrides the document being checked |
| update | 8 | Analyze existing content; default preview of a focused reconciliation plan | No write by default; --write --expect applies an eligible guarded update and retains a backup |
| check | Conditional | Run the same validators noninteractively with warnings treated as failure | Read-only; useful for CI, never rewrites README/config |
| doctor | Conditional | Diagnose runtime, installed data/schema versions, root/config/capability issues | Read-only; no install, network, credential probe, or self-repair |

Init writes only a basename of craftmentation.config.json (including a safe nested
--config location with an existing parent); arbitrary manifest/adapter destinations are
rejected. Other explicit --config paths may be loaded by read-only commands.
Init serializes only supported explicit defaults; it must not create a README, policy,
LICENSE, agent adapter, or provider configuration. Analyze's stdout is human-readable
summary by default and a report envelope with --json. Generate's --dry-run includes a
proposed Markdown string in data plus diagnostic/provenance summary; normal generation
reports a path/hash/change summary. No command writes an analysis report implicitly.

Validate/check accept --document <path>, including a requested Markdown draft; they do
not crawl every template fixture as published documentation. Checks distinguish valid
literal authoring syntax inside explanatory code from unresolved fields in publishable
prose. In Phase 6 warnings are reported but not fatal; --strict makes warnings fail.
Check fixes strict policy to true, using the same diagnostic codes, ordering, and rules.
External links are reported as not fetched: default operation is offline with no option
that silently enables arbitrary outbound HTTP. Optional online checking requires a later
explicit SSRF/redirect/timeout policy and authorization; it is not part of this contract.

## Update preservation contract

Update has --write and --dry-run; their combination is rejected as contradictory.
Without --write, produce a preview/report only. Preserve unowned/custom spans byte-for-byte.
For managed sections, require unambiguous IDs and exact stored body hashes. --write also
requires --expect with the full candidate hash from the preview. Modified/ambiguous markers
produce a conflict without writes. Legacy documents return unchanged preview and W_UNMANAGED;
--write is rejected. New sections are not inserted and existing sections are never deleted. Imported arbitrary READMEs are not
silently converted into owned regions. Metadata enabling ownership must be explicit and
must not remove legal notices. [Safe operations](safe-file-operations.md) specifies the
implemented marker/hash protocol and concurrency limits.
The [practical guide](workflow.md) covers invocation, backup/recovery, and the final
check-to-rename race requiring a quiet workspace.

## Diagnostics, exit codes, and JSON

[report.schema.json](../schemas/report.schema.json) defines the envelope:
schemaVersion, command, status, exitCode, diagnostics, and data. Diagnostics have a stable
code, severity, message, and optional root-relative path/line. Sort by path, line, code,
then message. Do not include raw secrets, full environment dumps, or absolute home paths.
The command field is null for top-level help/version or failures before a command can
be resolved, including unknown commands. With --json, explicit help/version also uses
the result envelope (data contains help/version text); no repository scan is needed.
Command data is Analysis for analyze; a write/preview summary for init/generate/update;
validation summary for validate/check; diagnostic capability summary for doctor. Error data
may be null. The schema defines success data shapes now; command tests must implement them exactly:

| Data shape | Fields |
|---|---|
| Change summary | path, operation (create/noop/update), dryRun, committed, documentHash, sourceFingerprint, preview, diff, selected, omitted, unresolved |
| Validation summary | document, errors, warnings, checks (names of checks performed) |
| Doctor summary | checks: check name, pass/warning/fail status, and redacted message |
| Top-level help/version | text |

Hashes, preview, and diff may be null when inapplicable. Preview carries proposed UTF-8
content for a renderable dry-run; diff carries a focused update diff when available.
Init's preview is JSON config text, not Markdown. No-op and init use empty selection lists.
Committed reflects whether publication occurred even if later cleanup failed; error data
may carry the same summary or null. A dry-run can never claim committed true.
The five implemented commands emit these schema-validated shapes. There is no stable import SDK API.

| Exit | Meaning | JSON status |
|---|---|---|
| 0 | Success, no-op, or requested preview with no blocking diagnostics | ok |
| 1 | Documentation/evidence checks failed, or warnings under strict/check policy | invalid |
| 2 | Invalid arguments, configuration, unsupported schema or capability | error |
| 3 | Unsafe path, symlink, protected destination, existing-file conflict, or concurrent modification | error |
| 4 | Permission, I/O, or scan-resource-limit failure | error |
| 5 | Internal invariant/unexpected implementation failure | error |
| 6 | Optional provider failure, reserved until a provider is actually implemented | error |

Representative codes: E_OWNERSHIP, E_ARGUMENT, E_CONFIG, E_SCHEMA_VERSION, E_CAPABILITY,
E_EVIDENCE, E_LINK, E_PLACEHOLDER, E_PATH, E_SYMLINK, E_EXISTS, E_CONCURRENT,
E_PERMISSION, E_IO, E_SCAN_LIMIT, E_INTERNAL, and E_PROVIDER. Do not map raw exception
messages directly to user output. Retain redacted debug details only when deliberately
requested by future diagnostics; no debug file or telemetry is created by default.

If multiple failures occur, stop on fatal preflight errors before scanning/rendering.
Among aggregated diagnostics prefer exit 5, 4, 3, 2, then 1 in that order. A valid JSON
envelope is still required for handled failures. Preview mode suppresses writes, not errors.
SIGINT/SIGTERM cleanup closes descriptors and owned temporary artifacts; conventional
process-signal exit behavior is outside the normal JSON result contract.

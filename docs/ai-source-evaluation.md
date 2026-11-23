# Source-aware CLI evaluation

Recorded: 2026-11-23, macOS, Node 24.22.3, codex-cli 0.171.0. These were **real Codex
model calls**, using the existing account after the required sandbox/network approval.
The initial sandboxed attempt failed; the approved integration runs succeeded. No direct
API key was added to Craftmentation and no repository was published or pushed.

## Inputs and results

Each small example was copied into an owned temporary directory with only its .py/.html
source and any .txt sample. No README, selection inventory, hand-authored documentation,
agent instructions, or prior generated output was supplied on its first call.

| Input | Observed source-derived content | Limits reported |
|---|---|---|
| Library | ASCII normalization rules, local import, punctuation/empty-result examples | Name inferred from docstring; version/test results unknown |
| Web app | Increment/reset controls, in-memory count and reload behavior, local HTML entry | Browser/version testing unknown |
| CLI | Required path, UTF-8 decoding, line counting and error exit status | Sample contents omitted in that call; tests/versions unknown |
| API | Loopback address/port, exact /health match, JSON/status behavior for other GET paths | Version/runtime tests unknown |
| Desktop | Tkinter dependency, wrapping/expansion, transient text and graphical startup | Platform versions/runtime tests unknown |
| Craftmentation | Actual commands, offline/agent distinction, configuration, testing scripts, inspected license | Context truncated; test bodies/execution logs absent |

The five small outputs used only Core sections, because the programs are small. They
are concise inferred drafts, not replacements for the richer curated teaching examples.
The framework preview selected seven sections including configuration/testing/license
from 49,070 bytes of source text in six files; three excerpts were truncated. It was a
read-only preview, not an automatic rewrite of this repository's README.

Actual small-project draft bytes, input hashes, and available result metadata are recorded
in [observed.json](../tests/fixtures/ai-live/observed.json). The library draft is also
readable beside its source as [README.ai.md](../examples/library/README.ai.md).
Existing curated README.md files remain intact. No screenshot or human review is claimed.

## Review and corrections

Source/behavior review confirmed the cited function, UI, command, and handler behavior.
The existing Python fixture tests exercise library results, CLI outputs/errors, API handler
status/JSON, and source syntax. Browser/desktop interactions and live HTTP were not run.
Agent review is not maintainer/human review, and recorded snapshots are not a model benchmark.

The framework call exposed an empty table header left by the configuration fragment when
only prose was supplied. The renderer now removes header-only table scaffolds using the
Markdown AST, with a regression test. No extra model call was needed for that deterministic
fix. Source-list metadata was subsequently capped to avoid sending a huge omission list;
current limits are in the [guide](ai-drafting.md). Earlier snapshot metadata is retained as
observed rather than silently rewritten to match the later implementation.

The live drafts explicitly separated unknowns and did not claim tests passed. Source quote
matching only establishes provenance: it cannot prove a command works, a description is
complete, or every model claim is correct. Models and defaults can change their output.

## Automated checks and unverified environments

Protocol tests exercise both adapter shapes without contacting a model. Separate tests
cover source-only proposals, invented references/URLs, legal-section rejection, malformed
responses/tool activity, truncation, output/time limits, cancellation, exact reviewed-file
saving, and preservation of the offline workflow. They are not live Claude account tests.

Live evaluation used Codex only. Claude Code structured transport is implemented and
protocol-tested, with no claim of live-account verification. Native Linux/Windows and
client-version matrices remain release work. This corpus does not establish arbitrary
language/framework coverage, secret-scanning guarantees, or prompt-injection immunity.

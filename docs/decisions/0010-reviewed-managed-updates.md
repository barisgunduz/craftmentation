# ADR 0010: Reviewed managed updates with minimal content input

Status: Accepted, 2026-11-23

## Context

The revised Phase 8 requires a useful preview/review/save path without making authors
learn the complete configuration contract. Missing usage blocks a fresh manifest-only
project. The existing safe-update design protects custom content but was not implemented.

## Decision

Keep the agent route primary. Add --usage-file for reviewed root-confined Markdown and
clear missing-evidence guidance. Recognize Quick start/Getting started as Core usage.
Show declared npm script invocations without claiming execution or inventing behavior.

Generate stays no-clobber. An explicit --managed option wraps generated sections with
validated IDs and SHA-256 hashes of exact body bytes. Default generation stays unmarked.
Update defaults to a diff/preview; --write requires --expect with the reviewed candidate
hash. Fresh analysis must produce exactly those bytes. Replace only unmodified existing
managed regions; preserve all other spans and their line endings/BOM. No automatic section
insertion/removal or legacy adoption is included. Legacy documents get agent guidance.

Implement ADR 0006's guarded replacement with an exclusive cooperative lock, identity/hash
checks, flushed staging, an exclusive original-byte backup, and same-directory rename.
Retain backups; cleanup reports whether publication occurred. The workspace must be quiet:
portable checks do not provide content compare-and-swap against an uncooperative writer.

## Alternatives considered

- Infer ownership from headings: risks overwriting custom information.
- Rewrite the whole README or silently adopt it: violates the preservation contract.
- Require full JSON fields for simple usage: adds friction before producing useful output.
- Add provider SDKs, custom templates, check and doctor now: no demonstrated requirement
  beyond existing validation/help and the scoped update workflow.

## Consequences

The CLI now has a useful but deliberately narrow maintenance path. Managed output is an
explicit choice; direct region edits produce conflicts. A preview hash binds the exact
candidate, including custom content, without treating the hash as an authenticity proof.
Backups add local recovery files and require an ignore convention. Existing configuration
and report schema shapes remain compatible. Broader source understanding and native
Linux/Windows proof are not implied by successful local tests.

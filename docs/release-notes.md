# Release notes: 0.1.0

Initial release of Craftmentation. The precursor candidate passed all six native CI
jobs, including the launcher fix, using Linux, Windows, and Intel macOS. Public
publication of 0.1.0 and its GitHub Release was explicitly authorized on 2026-11-23.

## Included

- README Standard v0.1, 48 reusable sections, fourteen profiles, and source-backed examples.
- Vendor-neutral manual AI instructions and analysis/generation/update/translation prompts.
- init, analyze, generate, validate, and default-preview update commands.
- Explicit source-aware drafts through installed Codex/Claude clients, bounded evidence,
  exact source quotations, unknowns, and mandatory factual review.
- Reviewed --from --expect saves without a second model request; managed updates with
  preserved custom spans, review hashes, conflict checks, and original-byte backups.
- Offline Markdown/link/placeholder checks and strict version-1 configuration/data schemas.

No AI key or client is needed for deterministic operation. Selecting --agent explicitly
uses the selected client's account, privacy terms, quota, and costs. Model interpretation
is not verified semantic truth. Current limits are in the [AI guide](ai-drafting.md).

## Compatibility and exclusions

Node ^24.22.3 or ^26.13.1 is required. Existing unreleased configuration/schema versions
remain 1; no automatic migration is performed. All six final native jobs passed;
exact revision/results and the separate local ARM64 coverage are in [release readiness](release-readiness.md).
Live model evaluation covers Codex 0.171.0 only;
Claude transport has protocol tests, not a verified live-account/client-version matrix.

There is no stable import SDK, check/doctor command, custom-template loader, provider SDK,
automatic AI update/adoption, online link crawler, website, or localization engine.
Existing unowned READMEs are never automatically rewritten. Safe writes require a quiet
local workspace; cooperative checks are not a hostile-filesystem transaction guarantee.

## Distribution

The local package is produced with npm run package:check. It is installed and exercised
in a temporary consumer, and artifacts/verification.json records its SHA-256 and host.
The package contains compiled code, schemas/templates/prompts, documentation, and
required notices. Tests/examples/node_modules/private files and the large brand board
are excluded. The full development repository is not the npm tarball.

Install with `npm install --global craftmentation@0.1.0`. Source archives and the npm
tarball are distributed through the matching GitHub Release. GitHub private vulnerability
reporting is enabled; see [Security](../SECURITY.md) for confidential reports.
Future publishing still requires explicit owner authorization. See [release readiness](release-readiness.md),
[release conventions](releasing.md), and [upgrade guidance](upgrading.md).

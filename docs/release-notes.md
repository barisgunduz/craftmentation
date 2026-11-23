# Candidate notes: 0.1.0-rc.1

Status: **Prepared locally; not published.** Native Linux/Windows verification is pending.
The package remains private and no Git tag, GitHub release, or npm publication exists.

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
remain 1; no automatic migration is performed. macOS runtime checks are recorded; prepared
CI is not proof of Linux/Windows success. Live model evaluation covers Codex 0.171.0 only;
Claude transport has protocol tests, not a verified live-account/client-version matrix.

There is no stable import SDK, check/doctor command, custom-template loader, provider SDK,
automatic AI update/adoption, online link crawler, website, or localization engine.
Existing unowned READMEs are never automatically rewritten. Safe writes require a quiet
local workspace; cooperative checks are not a hostile-filesystem transaction guarantee.

## Distribution and release gates

The local candidate is produced with npm run package:check. It is installed and exercised
in a temporary consumer, and artifacts/verification.json records its SHA-256 and host.
The candidate contains compiled code, schemas/templates/prompts, documentation, and
required notices. Tests/examples/node_modules/private files and the large brand board
are excluded. The full development repository is not the npm tarball.

Before public distribution, native matrix jobs must pass, the owner must approve the
exact candidate/version/registry destination and reporting limitations, and publishing
must be authorized separately. Do not use npm install craftmentation as an available
public-version instruction yet. See [release readiness](release-readiness.md),
[release conventions](releasing.md), and [upgrade guidance](upgrading.md).

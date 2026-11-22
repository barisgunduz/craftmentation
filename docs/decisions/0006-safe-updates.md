# ADR 0006: No-clobber generation and explicit owned-region updates

Status: Accepted

## Context

Documentation belongs to the target repository. Generation must not destroy an existing
README, custom sections, legal notices, or concurrent changes. Portable Node filesystem
primitives do not offer an atomic content-hash compare-and-swap for arbitrary existing files.
Single-file atomic rename and lost-update prevention are different properties.

## Decision

Generate creates a missing document only, with no overwrite/force bypass. Init creates
only a missing config, or reports a no-op/conflict. Use confined snapshots, exclusive locks
and staging, and no-clobber single-file publication. Fail if the necessary primitive is
unsupported; do not silently fall back to unsafe writes.

Phase 7 update defaults to preview. Explicit --write can replace unchanged owned regions
identified by validated markers and byte hashes; all unowned spans remain byte-identical.
Modified or ambiguous regions and legacy documents without ownership yield proposals,
not inferred ownership. Stage and verify the new file, retain an exclusive original backup,
and recheck identity/hash immediately before replacement. No automatic legal/policy rewrites.

Require a quiescent authorized workspace for write mode. Locks only coordinate cooperating
writers; a final check-to-rename race with an uncooperative writer remains. Document the
limit and prefer read-only proposals when those assumptions cannot be met. Do not claim
an adversarial concurrency sandbox or a multi-file transaction. The complete protocol is
in [Safe operations](../safe-file-operations.md).

## Alternatives considered

- Force overwrite: simple but violates preservation and evidence requirements.
- Heuristic heading-based rewrites: can incorrectly claim ownership of custom sections.
- Mandatory native transactional helper: stronger OS-specific possibilities but adds a
  packaging/security burden before the portable MVP exists.
- Preview-only forever: safest but does not provide the planned explicit managed update path.

## Consequences

The product needs failure-injection and platform/filesystem tests before enabling writes.
Interrupted artifacts are diagnosed and ownership checked before cleanup. Backups and
markers are change detectors, not authenticity/security guarantees. No file-writing CLI
implementation is created by this ADR.

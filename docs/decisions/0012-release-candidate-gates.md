# ADR 0012: A private release candidate with reproducible checks

Status: Accepted for local preparation, 2026-11-23; remote execution/publication not authorized

## Context

The source-aware CLI works locally, but public distribution needs a tested tarball,
maintained notices, and actual OS evidence. The owner requires explicit authorization
for commits, pushes, releases, and publication. No GitHub workflow currently exists on
the remote; local macOS cannot establish native Linux/Windows success.

## Decision

Prepare version 0.1.0-rc.1 while keeping private: true. Semantic Versioning identifies
an initial pre-1.0 candidate without announcing a release. Require Node 24.22.3+ within
24.x or Node 26.13.1+ within 26.x: these are the actual tested floor patches, rather than
claiming untested early patches. Historical validation records remain unchanged. Enforce LF text checkouts through
.gitattributes so source-quote/hash fixtures stay byte-stable on Windows; preserve binary
assets. No history rewrite or automatic Git renormalization is performed.

Retain the explicit npm files allowlist, compiled ESM/data/notices, and no install hooks.
A prepack build makes normal local packaging safe; the verification script builds first,
packs with lifecycle scripts disabled, compares two consecutive tarballs for reproducibility,
inspects required/forbidden paths and preserved notice bytes, installs the
actual tarball into an owned consumer, and exercises the installed bin outside the checkout.
Retain the candidate/digest in ignored artifacts/, not inside the self-hashed tarball.

Add one SHA-pinned, contents-read GitHub workflow for pull requests, master/release-branch
pushes, and explicit dispatch. Matrix: macOS/Linux/Windows and both floor Node versions.
Run type/format/tests, Python contract checks, offline docs checks, and installed-package
smoke checks. No model calls, secrets, cache sharing, commits, README rewrites, or publishing.

Do not label CI prepared as CI passed. Without push authorization or existing remote
runners, keep Phase 10 In Progress and the candidate gated on native OS results. Private
vulnerability reporting remains disabled and is documented without inventing a contact.

## Alternatives considered

- Publish directly after macOS tests: hides unverified OS/client assumptions.
- Push a workflow without permission: violates explicit repository instructions.
- Remove cross-platform acceptance to finish the phase: weakens the agreed product.
- Bundle node_modules or add a custom packaging framework: unnecessary footprint/complexity.

## Consequences

The owner can review a concrete local candidate and proposed CI before authorizing upload.
Source tests stay in Git but not the tarball. Full developer/archive documentation remains
repository material; packaged docs are not an offline copy of every linked test/example.
Optional agents remain external trusted clients; offline CI does not consume model quota.
Publication still requires a separate explicit authorization after readiness checks pass.

## Operational follow-up: macOS runner capacity

The owner subsequently authorized source uploads and CI verification. Run 45230655922
passed Linux/Windows, but both macos-latest jobs were cancelled before any step ran.
GitHub annotations reported that no hosted runner acquired the jobs and explicitly
identified arm64 capacity constraints. This is infrastructure failure, not a test failure.

Use the documented standard macos-15-intel runner for the two macOS CI jobs, retaining
all steps and both Node floors. The official [runner table](https://docs.github.com/en/actions/reference/runners/github-hosted-runners)
lists it as Intel, while macos-latest selects arm64. Local macOS arm64 checks remain
separate evidence; the changed CI matrix must not be represented as remote arm64 coverage.
No larger/paid runner, extra dependency, permission, or publishing automation is introduced.

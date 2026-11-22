# Safe filesystem and documentation update design

## Status and threat model

This is a Phase 5 enforcement contract for future code, not an implemented security claim.
Repository contents and configuration are untrusted data. The caller supplies an authorized
root; command entry validates it before reading configuration. Treat discovered commands,
package hooks, scripts, templates, provider output, and prompts as data. Never spawn them.

Assume a user-owned, quiescent workspace on a local filesystem with exclusive-create and
same-directory rename semantics. Portable Node APIs cannot guarantee directory-relative
compare-and-swap against a hostile process replacing ancestor paths between checks.
Network filesystems and active uncooperative writers are not a supported safe-write
scenario until explicitly tested. Path checks and locks reduce risk, but do not establish
an adversarial concurrent-filesystem sandbox. Prefer read-only preview when those assumptions
cannot be met. See [Node filesystem documentation](https://nodejs.org/docs/latest-v24.x/api/fs.html)
for primitive semantics; atomic rename is not compare-and-swap.

## Read confinement

- Establish a real root identity once. Reject a symlink root rather than implicitly following it.
  A supplied absolute --root is allowed as a boundary; config/output paths remain relative.
- Reject absolute, drive-relative, UNC, device, alternate-stream, control-character, and
  parent-segment configured paths. Treat Windows reserved names, trailing dots/spaces,
  drive-prefix forms, and case-insensitive output collisions explicitly on every platform.
- Check every path component with lstat, enforce containment with path.relative/realpath,
  and reject symlinks, special devices, sockets, and nonregular source/config files.
  Recheck descriptor identity against the snapshot after opening; use no-follow flags
  where available without assuming they secure parent directories on every OS.
- Bound file count/depth/size/total bytes as specified in the architecture. Do not recurse
  into .git, dependencies, generated trees, credentials, private keys, or actual .env files.
  Skip binaries and record limits/skips. No glob or ignore rule can re-enable protected areas.
- Never load a target schema, template, JS config, dynamic module, package hook, or remote URL
  as executable code. Bundled schemas alone are compiled; references are resolved from an
  offline allowlist. Config `$schema` is an editor annotation only.

Relative documentation links differ from configured output paths: `../README.md` from a
docs directory is valid if its resolved target stays inside the root. Decode URL path
escapes once for link resolution, separate anchors, and reject escaped outside-root or
symlink destinations. Do not use prefix string comparison for containment.

## Destination policy

Only explicitly requested Markdown output or the init config may be written. Protect Git
metadata, LICENSE/license notices, existing legal/security/community policy files, agent
instruction files, application code, credentials, and dependency manifests from automatic
README generation. Generating another policy is a separate authorized workflow, never a
side effect of init. Existing target README content belongs to the user.

Config may select a nested output directory only when its parent already exists and passes
confinement checks. Init and generation do not create arbitrary parent trees. A destination
that is a directory, symlink (including dangling), device, hard-linked existing file, or
case/normalization collision fails. No --force option bypasses these rules. Do not normalize
Unicode names or rewrite line endings of preserved content silently.

## Single-file create protocol (Phase 6)

1. Build a plan, validate all source/field/path diagnostics, and snapshot destination absence.
2. In --dry-run, return the plan immediately without locks, temporary files, or writes.
3. Acquire a sibling lock with exclusive creation. If one exists, fail with a clear conflict;
   never delete a supposedly stale lock by guessed PID. Record a random ownership token.
4. Create a uniquely named sibling temporary file exclusively with restrictive permissions.
   Write all UTF-8 bytes, flush and close; verify new bytes/hash and parent/root identities.
5. Publish the complete file through a no-clobber primitive, such as same-filesystem hard-link
   creation from the closed staging file to the absent destination. If unsupported, fail
   closed; do not fall back to overwrite-capable rename or truncate an existing target.
6. Remove only this operation's owned staging name and lock, checking token/identity.
   A cleanup failure is reported with the commit outcome; never report that no file was
   written if publication already succeeded. Readers see either no file or complete bytes.

This is single-file atomic publication, not a filesystem transaction. File permissions
remain restrictive; do not copy executable bits. Test supported filesystems on each OS
before claiming compatibility. Permission errors, unsupported hard links, and existing
destinations have distinct diagnostics. Interrupted leftovers are diagnosed, not blindly deleted.

## Guarded update protocol (planned, revised Phase 8)

Default update is a read-only proposal. --write is explicit authorization for eligible
owned-region updates, not permission to overwrite custom content or unknown documents.
Snapshot original bytes, hash, mode, identity, and managed metadata. Use a cooperative
exclusive lock, re-read and compare identity/hash immediately before commit, stage/flush
new bytes, and keep an exclusively created byte-identical sibling backup before same-directory
replacement. Abort on any mismatch or unsupported ownership. Never patch through a symlink
or mutate an existing hard-linked file. A retry requires a fresh analysis and plan.

Successful same-directory rename replaces the pathname atomically, but cannot prevent an
uncooperative editor changing it in the final check-to-rename window. Therefore --write
requires a quiescent workspace; the help/report must disclose this limitation. It does not
promise universal lost-update prevention. In uncertain environments, return a proposal and
leave application to a human or tool with stronger transactional guarantees. Do not silently
weaken a failed guard to complete an update. Keep backups discoverable with original/new
hashes; cleanup and recovery must never delete an unknown file.

## Managed-region preservation

Future generation may emit paired HTML comment markers for explicitly owned sections:
`craftmentation:begin <id> <sha256>` and `craftmentation:end <id>`. The hash covers the exact
UTF-8 bytes between the marker lines, including line endings. These are ownership metadata,
not authoring placeholders. An optional `craftmentation:source <sha256>` comment identifies
the analysis snapshot. Marker parsing must reject duplicates, nesting, missing/mismatched
ends, invalid IDs/hashes, or accidental markers inside code fences.

Update replaces only unmodified managed regions with newly verified content. Everything
outside the ranges is copied byte-for-byte, including custom sections, HTML, links, and
legal notices. If a managed hash mismatches, report a conflict and preserve it. Never guess
ownership from a heading or strip an unknown section to make a template fit. For legacy
README files without markers, return evidence-backed suggestions; installing ownership
metadata or rewriting content requires a separate explicit, reviewable adoption step.

The default deterministic generator must not replace a whole existing README. Marker/hash
handling and byte preservation require tests before any update --write path is enabled.
Stored fingerprints are change detectors, not authenticity signatures or proof of correctness.

## Failure and recovery contract

Plan and validate before writes. Preserve the original on every detected precommit failure.
Report whether publication/replacement succeeded if later cleanup fails. Never run commands
from a recovery journal. Never delete unrelated files, follow arbitrary symlinks, expose
secret values in diagnostics, or call a provider to repair a write. Multi-edition writes
are outside the active scope. Any future separately authorized multi-document operation
must define partial-commit/recovery behavior; single-file safety is not a multi-file transaction.

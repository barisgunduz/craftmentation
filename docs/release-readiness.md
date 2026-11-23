# Release readiness: 0.1.0-rc.1

Status: **In Progress — local candidate prepared, native CI results pending.** This is
not a public release announcement. package.json remains private: true.

## Candidate and scope

The candidate includes the five-command CLI, opt-in source-aware drafting, safe managed
updates, standards/templates/prompts, examples in the repository, and documented limits.
Supported Node ranges are ^24.22.3 and ^26.13.1. Offline operation requires no AI client.

The current artifact and exact SHA-256 are generated under artifacts/ by package:check.
Read artifacts/verification.json for the host/runtime, installed-command checks, package
size/file count, and digest. These generated files are ignored by Git and excluded from
their own tarball, avoiding a self-referential package hash.

## Verification gates

| Gate | Evidence/status |
|---|---|
| Actual npm tarball and separate-consumer installation | Local macOS check passed; final artifact regenerated after documentation checks |
| CLI/runtime, type, and formatting checks | 43 tests passed on both floor Node versions on macOS; type/format passed |
| Source lockfile security query | npm audit returned 0 known advisories for 103 entries on 2026-11-23 |
| License/notices | All 79 runtime notice files inspected; all 103 lockfile declarations inventoried |
| Documentation | 130 Markdown files / 325 local references passed; actual README validator passed |
| Workflow structure | actionlint 1.7.12 passed; action SHAs verified against official GitHub API refs |
| Native Linux | **Pending** — Docker daemon is unavailable locally and remote workflow is not uploaded |
| Native Windows | **Pending** — no local Windows runtime; remote workflow is not uploaded |
| Remote macOS matrix | **Pending** — source workflow prepared, no remote run claimed |
| Claude live account/client versions | Not verified; protocol-tested adapter, explicit candidate limitation |
| Confidential security reporting | GitHub setting verified disabled; limitation documented in SECURITY.md |
| Publication/version/registry approval | **Not authorized** — private candidate only |

Six jobs are defined in .github/workflows/verify.yml: macOS/Linux/Windows with both floor
Node versions. They run tests, docs checks, and actual installed-package smoke checks,
without model calls, source rewrites, shared caches, or publication credentials. Prepared
workflow YAML and portable-path tests do not substitute for successful native execution.

## Remaining action

The GitHub API verified Actions enabled and zero workflows before this phase. Running the prepared native
checks requires uploading the source changes. AGENTS.md explicitly prohibits commits and
pushes without owner authorization. After local verification is complete, present the
concrete diff/candidate and request authorization for a release branch commit/push and
its CI checks. Do not merge, tag, publish, deploy, enable a reporting channel, or rewrite
history as a side effect. Fix and rerun authorized verification failures before completion.

Once native results are available, update this record and the roadmap with actual run URLs,
commit and OS/runtime outcomes. Only then can Phase 10 acceptance be assessed. A separate
explicit approval is still required for public npm/GitHub publication. See
[candidate notes](release-notes.md), [release conventions](releasing.md),
[dependency evidence](dependency-licenses.md), and [installation/upgrade](upgrading.md).

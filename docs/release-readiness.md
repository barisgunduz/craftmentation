# Release readiness: 0.1.0-rc.1

Status: **In Progress — final Linux/Windows CI passed; macOS runner replacement pending.** This is
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
| CLI/runtime, type, and formatting checks | Final launcher revision: 45 tests passed on both floor Node versions on macOS; type/format passed |
| Source lockfile security query | npm audit returned 0 known advisories for 103 entries on 2026-11-23 |
| License/notices | All 79 runtime notice files inspected; all 103 lockfile declarations inventoried |
| Documentation | 131 Markdown files / 330 local references passed; baseline actual README validator passed |
| Workflow structure | actionlint 1.7.12 passed; action SHAs verified against official GitHub API refs |
| Native Linux | Passed both Node floors on the baseline commit below |
| Native Windows | Passed both Node floors on the baseline commit below |
| Remote macOS matrix | Passed both Node floors on the baseline commit below |
| Subsequent trusted-client launcher fix | Local verification recorded in the roadmap; fresh native CI required |
| Claude live account/client versions | Not verified; protocol-tested adapter, explicit candidate limitation |
| Confidential security reporting | GitHub setting verified disabled; limitation documented in SECURITY.md |
| Publication/version/registry approval | **Not authorized** — private candidate only |
| npm terminal account | Successfully authenticated as barisgunduz on 2026-11-23; no publication performed |

Six jobs are defined in .github/workflows/verify.yml: macOS/Linux/Windows with both floor
Node versions. They run tests, docs checks, and actual installed-package smoke checks,
without model calls, source rewrites, shared caches, or publication credentials. Prepared
workflow YAML and portable-path tests do not substitute for successful native execution.
The revised macOS jobs use macos-15-intel, not the capacity-constrained arm64 pool.
Local arm64 tests and historical remote arm64 runs remain separate from Intel CI results.

### Observed native run

[GitHub Actions run 45221783275](https://github.com/barisgunduz/craftmentation/actions/runs/45221783275)
passed all six jobs for commit 6459e645938ae14f4b7ba4bb0fbffd5e50f65b8d.
Linux/Windows x64 and macOS arm64 each ran Node 24.22.3 and 26.13.1. Every job logged
43 passing Node tests, zero failures/skips, 18 passing Python tests, documentation checks,
and a successful separate-consumer installation with all five commands. No model was called.
All six reproducible package checks produced SHA-256
36a27f52a5490989fa62f4ea3b4c6e3b585e02d692aba4020273a90e76e9e2a6.
This digest identifies the baseline, not subsequent source/documentation edits.

## Remaining action

The owner approved the final source commit/push. The shell-free launcher correction and
regression tests are on master at bec0246477622b5cdebc60f9a80e96f98de8929a.
[Run 45230655922](https://github.com/barisgunduz/craftmentation/actions/runs/45230655922)
passed Linux/Windows on both Node floors. Both macOS jobs were cancelled without running
any step: GitHub annotations state that a hosted runner was not acquired and identify
arm64 capacity constraints. The overall run failed due to infrastructure, not a failed test.
The workflow now selects the standard Intel macOS pool; a fresh native run is required.
Source-upload approval also covers the verification-note follow-up; do not ask again.
Claude is installed but its account is not authenticated on this host; its live test remains
unverified. Do not infer all-vendor compatibility from the shared text instructions.

Record the final revision's native results before assessing Phase 10 completion. A separate
explicit approval is still required for public npm/GitHub publication. See
[candidate notes](release-notes.md), [release conventions](releasing.md),
[dependency evidence](dependency-licenses.md), and [installation/upgrade](upgrading.md).

# Release verification: 0.1.0

The precursor 0.1.0-rc.1 candidate passed all six native CI jobs. The owner explicitly
authorized public npm/GitHub publication of 0.1.0 on 2026-11-23. Publication uses the exact
verified tarball after final release-metadata CI; registry and GitHub Release records are
the source of truth for publication availability. This file preserves pre-release evidence.

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
| Native Linux | Passed both Node floors on release commit c5c8536 |
| Native Windows | Passed both Node floors on release commit c5c8536 |
| Remote macOS matrix | Intel macOS passed both Node floors on release commit c5c8536; ARM64 also tested locally |
| Trusted-client launcher fix | Passed all six native jobs, including launcher/process regression tests |
| Claude live account/client versions | Not verified; protocol-tested adapter, explicit candidate limitation |
| Confidential security reporting | Enabled and verified through GitHub API on 2026-11-23; SECURITY.md links the private form |
| Publication/version/registry approval | Owner explicitly authorized 0.1.0 to the public npm registry and matching GitHub Release |
| npm terminal account | Successfully authenticated as barisgunduz on 2026-11-23 |
| Public registry installation | 0.1.0 installed from a fresh cache into an isolated global prefix; all five commands passed |

## Published result

On 2026-11-23, [npm 0.1.0](https://www.npmjs.com/package/craftmentation/v/0.1.0) and
[GitHub v0.1.0](https://github.com/barisgunduz/craftmentation/releases/tag/v0.1.0) were
published from c5c8536f6e639444ed3dc34d3293c4146f76a90f after all six
[release CI jobs](https://github.com/barisgunduz/craftmentation/actions/runs/45236960551)
passed. npm latest resolves to 0.1.0. The registry download is byte-identical to the
verified local/CI tarball: SHA-256
362c30e98fc6c9b4aac046bcb8f6f5825314c7b091816c953448a990f39ce05c.
The fresh-cache installation exercised all commands, managed writes/updates, and no-model
preview on macOS arm64/Node 24.22.3. The GitHub Release retains package/checksum/build and
registry-install reports. These later notes do not modify the immutable release artifact.

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

### Final native verification

[Run 45233777732](https://github.com/barisgunduz/craftmentation/actions/runs/45233777732)
passed all six jobs for commit 400cf57cd65fb73fe836c3ff14ae89f13394fbe1: Linux x64,
Windows x64, and Intel macOS, each with Node 24.22.3 and 26.13.1. The macOS logs confirm
45 passing Node tests, no failures/skips, 18 passing Python tests, documentation checks,
and successful reproducible package/consumer smoke checks with no agent invocation.
This includes the final launcher code. Local macOS arm64 passed the same 45-test suite
on both Node floors; the final hosted matrix does not claim remote arm64 verification.

## Infrastructure failure and resolution

The owner approved the final source commit/push. The shell-free launcher correction and
regression tests are on master at bec0246477622b5cdebc60f9a80e96f98de8929a.
[Run 45230655922](https://github.com/barisgunduz/craftmentation/actions/runs/45230655922)
passed Linux/Windows on both Node floors. Both macOS jobs were cancelled without running
any step: GitHub annotations state that a hosted runner was not acquired and identify
arm64 capacity constraints. The overall run failed due to infrastructure, not a failed test.
The workflow now selects the standard Intel macOS pool; the replacement run above passed.
Source-upload approval also covers the verification-note follow-up; do not ask again.
Claude is installed but its account is not authenticated on this host; its live test remains
unverified. Do not infer all-vendor compatibility from the shared text instructions.

Phase 10's release-candidate verification is complete. The subsequent owner authorization
covers the initial public 0.1.0 publication; later releases need their own authorization. See
[candidate notes](release-notes.md), [release conventions](releasing.md),
[dependency evidence](dependency-licenses.md), and [installation/upgrade](upgrading.md).

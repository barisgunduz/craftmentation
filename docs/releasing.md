# Release conventions

## Current status

Version 0.1.0 is the initial public release, explicitly authorized by the owner
for npm and GitHub publication on 2026-11-23. Future preparation does not authorize
commits, pushes, tags, releases, npm publication, or deployment. [Release readiness](release-readiness.md) tracks
actual evidence, final-revision verification gates, and reporting limitations for Phase 10.

## Versioning and changelog

Use Semantic Versioning with v-prefixed Git tags only when authorized. Before 1.0,
minor releases may introduce incompatible changes; document them explicitly. Patch
releases should contain compatible corrections. Use -rc.1-style prerelease suffixes
for candidates. The historical 0.1.0-rc.1 candidate was local/private; 0.1.0 is the first public version.

Maintain CHANGELOG.md using Keep a Changelog categories. Unpublished work stays under
Unreleased. On an authorized public release, move applicable entries into a dated version
heading and retain Unreleased for future work. Do not retroactively change recorded test
results or call cancelled scope completed.

## Prepare and verify

From the source checkout with Node 24.22.3+ (24.x) or 26.13.1+ (26.x), npm, and Python 3.9+:

```bash
npm ci --ignore-scripts
npm run typecheck
npm run format:check
npm test
npm run test:legacy
npm run docs:check
node dist/cli/index.js validate --json
npm run package:check
npm audit --json
```

package:check builds TypeScript, compares two consecutive tarballs for identical bytes,
packs with lifecycle scripts disabled, and rejects missing
required/forbidden payloads, installs the actual tarball into a temporary consumer, and
runs the installed bin outside the source cwd. -- --offline uses an existing npm cache;
the default consumer install may contact the registry. It does not call a model or publish.
The prepack script builds normal maintainer npm pack operations; there is no install hook.

Inspect the resulting artifacts/verification.json and candidate tarball. Generated artifacts
are ignored, not committed or included recursively in the package. Review the candidate's
actual files, digest, notices, runtime floors, installation, and [upgrade path](upgrading.md).
The npm payload excludes source tests/examples/node_modules and the brand reference board;
it is not an offline archive of every developer-document reference in the repository.

The SHA-pinned read-only workflow runs the same core checks on three native OS runners
and both floor Node versions after an authorized upload. Linting that workflow does not
prove native support. Never claim passing jobs before checking their actual outcomes.

## Before publication

1. Require native platform evidence and resolve/document remaining limitations.
2. Refresh dependency/advisory/license inspection against the exact candidate inputs.
3. Verify the registry name/account/permissions and destination; current preparation does
   not establish npm name ownership or publication rights.
4. Present the exact candidate, source diff/commit, notes, compatibility, and CI results.
5. Obtain explicit approval for the intended publication actions/version.
6. Only within that approval, finalize the changelog, lift private:true as required, prepare
   the exact final artifact, and perform the authorized tags/releases/publication.

No automatic workflow publishes, rewrites a README, sends repository content to a model,
or uses release credentials. No force push or history rewrite is permitted without its
own explicit authorization. Package preparation and source-upload approval do not imply
permission to publish a registry release.

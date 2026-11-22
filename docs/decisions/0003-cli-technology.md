# ADR 0003: TypeScript, Node.js, and Commander

Status: Accepted for Phase 6 implementation

## Context

The CLI needs cross-platform distribution, typed interfaces, JSON/Markdown tooling,
noninteractive operation, minimal coupling, and optional AI. Python is currently used
only for development checkers; no product language or package exists yet.

## Evaluation

| Candidate | Fit | Tradeoffs |
|---|---|---|
| TypeScript + Node | Typed boundaries, npm CLI packaging, established Markdown/schema ecosystem | Requires Node and a compile step; dependency tree needs review |
| Python + argparse | Existing verification familiarity and standard-library argument parsing | Separate packaging/runtime UX; typed validation and Markdown tooling still needed |
| Go + Cobra | Native binaries and explicit static types | Per-platform release artifacts and a separate tooling ecosystem for existing JSON/Markdown work |

These are engineering tradeoffs, not benchmark results. Sources: [Python argparse](https://docs.python.org/3/library/argparse.html)
and [Go Cobra](https://github.com/spf13/cobra) document command parsing capabilities.

For Node CLI parsing, Commander offers subcommands, options, help, and error handling.
Native util.parseArgs reduces dependencies but needs custom seven-command/help plumbing.
Yargs offers broader parsing features than required; oclif adds plugin/scaffolding machinery
that is unnecessary for one package. Choose Commander, with strict error normalization
through our reporter rather than framework process termination inside core code.
[Commander documentation](https://github.com/tj/commander.js) is the primary reference.

## Decision

Use strict TypeScript compiled to ESM with tsc and NodeNext resolution; use one npm
package and a Commander entry point. Target Node 24 and 26 LTS lines, verifying exact
minimum patches and dependency engines in Phase 6. Do not select EOL Node 20 because
it happens to be installed locally. [Node's release table](https://nodejs.org/en/about/previous-releases)
was checked on 2026-11-22. [TypeScript module documentation](https://www.typescriptlang.org/docs/handbook/modules/reference.html)
describes NodeNext module behavior. Use Node's [built-in test runner](https://nodejs.org/api/test.html).

## Consequences

No CLI dependency or runtime is installed in Phase 5. Phase 6 must add and lock exact
versions, verify engines/licenses, establish the bin/build/test scripts, and run on
supported runtimes. The current Node 20 environment cannot establish product runtime
compatibility. Packaging, OS verification, and publication are separate gates. No bundler,
native addon, runtime transpiler, or install hook is required by this decision.

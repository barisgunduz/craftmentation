# ADR 0013: Trusted agent launchers without shell execution

Status: Accepted

## Context

The release review found that npm-installed Windows clients expose .cmd launchers.
Node cannot run these directly with shell:false; enabling a shell would introduce
argument interpolation, including schema JSON. See the official
[Node process documentation](https://nodejs.org/api/child_process.html#spawning-bat-and-cmd-files-on-windows).
npm execution may also prepend repository-local node_modules/.bin to PATH.

## Decision

Resolve fixed Codex/Claude names from absolute user/global PATH directories. Exclude
relative entries and node_modules directories from lookup and the inherited client PATH.
Prefer native executables on Windows. For a global npm installation, read the fixed
official package's bin metadata, require a confined JavaScript entry, and invoke it with
the running Node executable and a literal argument array. Never execute or parse .cmd
contents. Unsupported installations fail with E_PROVIDER and installation guidance.

POSIX clients retain direct executable invocation. Client installations and the user's
global PATH remain trusted; this does not authenticate publisher signatures or sandbox
administrator-controlled clients. The analyzed repository cannot configure an executable.

## Alternatives considered

- shell:true or cmd.exe string assembly: introduces shell quoting and interpolation risks.
- Add a process-launching dependency: unnecessary for two fixed client packages.
- Require native clients only: unnecessarily excludes ordinary global npm installations.

## Consequences

No dependency is added. Global npm JS entry resolution and literal arguments are tested
without model calls on the host; native Windows execution still requires CI for the
changed revision. Earlier passing CI does not cover a later launcher change. Native live
Claude authentication/output quality remains a separate check.

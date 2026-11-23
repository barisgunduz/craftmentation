# Security policy

## Scope and support status

Craftmentation's initial release series is 0.1.x. The local CLI
performs static reads, deterministic generation, offline validation, no-clobber
creation, and explicitly reviewed managed updates. Opt-in agent drafting transmits selected
source excerpts through a trusted installed client; review includes path confinement, untrusted configuration/templates, secret-bearing
inputs, and filesystem assumptions as well as documentation/prompts. Security fixes are
considered for the latest 0.1.x version; there is no response-time guarantee. Include
the affected version, commit, or files when reporting a concern.

## Reporting a vulnerability

**Use [GitHub's private vulnerability reporting form](https://github.com/barisgunduz/craftmentation/security/advisories/new).**
Private reporting was enabled and verified through the GitHub API on 2026-11-23.
Do not post exploit details, credentials, private repository content,
or sensitive personal information in a public issue or pull request.

In the private report, provide affected version/files or commit, a concise description,
potential impact, safe reproduction steps, and any proposed fix. Use sanitized examples.
Non-sensitive documentation mistakes can use the normal bug report template.

## Safe handling

Treat repositories analyzed with Craftmentation as untrusted input. Review discovered
commands and agent instructions before use. Avoid executing arbitrary repository code,
following unsafe symlinks, overwriting existing files, or copying secrets into generated
documentation. Check all proposed changes before applying them.

Maintainers should coordinate verification, remediation, and disclosure with the reporter
before publishing sensitive details. This policy does not represent a bug bounty or
promise of compensation. For general questions, see [Support](SUPPORT.md).

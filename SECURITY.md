# Security policy

## Scope and support status

Craftmentation is in early development and has no released versions or executable
CLI. Security review currently focuses on documentation, templates, prompts, and
repository configuration. There is no supported release series or response-time guarantee.
Report concerns against the current repository state, including the affected commit or files.

## Reporting a vulnerability

**GitHub private vulnerability reporting is currently disabled for this repository.**
No dedicated security email or other confidential channel has been established in
this policy. Do not post exploit details, credentials, private repository content,
or sensitive personal information in a public issue or pull request.

For a sensitive concern, open a minimal [issue](https://github.com/barisgunduz/craftmentation/issues)
requesting a confidential security reporting channel, without describing the vulnerability.
Wait for an agreed private route before sending technical details. This initial request
is public; if even its existence would disclose sensitive information, do not use it.
This lack of a confidential route is a known operational limitation.

Once a private route is agreed, provide affected files or commit, a concise description,
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

# Candidate dependency license inventory

Recorded for the local 0.1.0-rc.1 candidate on 2026-11-23. Source: package-lock.json
and installed package notice filenames, not an inferred license for adopting projects.

Lockfile SHA-256 at inspection: `71bc5b700272d3b36b2ddf053eaa6af8cdd39481f67396e0d0f32d3267c99ffb`.

The lockfile has 103 dependency entries: 79 runtime and 24 development entries.
All 79 runtime entries have an inspected local license/notice file. Platform-specific
optional development packages not installed on macOS arm64 are identified below. License
declarations and notice-file presence are evidence, not an exhaustive legal opinion.

No dependency source is vendored into the Craftmentation tarball. npm installs dependencies
as their own packages and retains their distributed notices. Consumer transitive resolution
can differ from the source lockfile; recheck the actual installed tree before publication.
The outlined Inter logo attribution is separately retained in THIRD_PARTY_NOTICES.md.

| Package | Version | Declared license | Use | Local notice inspection |
|---|---|---|---|---|
| @types/debug | 4.1.13 | MIT | Runtime | LICENSE |
| @types/mdast | 4.0.4 | MIT | Runtime | LICENSE |
| @types/ms | 2.1.0 | MIT | Runtime | LICENSE |
| @types/node | 24.19.2 | MIT | Development | LICENSE |
| @types/unist | 3.0.3 | MIT | Runtime | LICENSE |
| @typescript/typescript-aix-ppc64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-darwin-arm64 | 7.0.2 | Apache-2.0 | Development (optional) | LICENSE, NOTICE.txt |
| @typescript/typescript-darwin-x64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-freebsd-arm64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-freebsd-x64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-linux-arm | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-linux-arm64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-linux-loong64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-linux-mips64el | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-linux-ppc64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-linux-riscv64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-linux-s390x | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-linux-x64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-netbsd-arm64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-netbsd-x64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-openbsd-arm64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-openbsd-x64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-sunos-x64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-win32-arm64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| @typescript/typescript-win32-x64 | 7.0.2 | Apache-2.0 | Development (optional) | Not installed on this host; lockfile metadata only |
| ajv | 8.20.0 | MIT | Runtime | LICENSE |
| bail | 2.0.2 | MIT | Runtime | license |
| ccount | 2.0.1 | MIT | Runtime | license |
| character-entities | 2.0.2 | MIT | Runtime | license |
| commander | 15.1.0 | MIT | Runtime | LICENSE |
| debug | 4.4.3 | MIT | Runtime | LICENSE |
| decode-named-character-reference | 1.3.0 | MIT | Runtime | license |
| dequal | 2.0.3 | MIT | Runtime | license |
| devlop | 1.1.0 | MIT | Runtime | license |
| entities | 9.0.0 | BSD-2-Clause | Runtime | LICENSE |
| escape-string-regexp | 5.0.0 | MIT | Runtime | license |
| extend | 3.0.2 | MIT | Runtime | LICENSE |
| fast-deep-equal | 3.1.3 | MIT | Runtime | LICENSE |
| fast-uri | 3.1.9 | BSD-3-Clause | Runtime | LICENSE |
| github-slugger | 2.0.0 | ISC | Runtime | LICENSE |
| is-plain-obj | 4.1.0 | MIT | Runtime | license |
| json-schema-traverse | 1.0.0 | MIT | Runtime | LICENSE |
| jsonc-parser | 3.3.1 | MIT | Runtime | LICENSE.md |
| longest-streak | 3.1.0 | MIT | Runtime | license |
| markdown-table | 3.1.0 | MIT | Runtime | license |
| mdast-util-find-and-replace | 3.0.5 | MIT | Runtime | license |
| mdast-util-from-markdown | 2.1.0 | MIT | Runtime | license |
| mdast-util-gfm | 3.1.0 | MIT | Runtime | license |
| mdast-util-gfm-autolink-literal | 2.1.2 | MIT | Runtime | license |
| mdast-util-gfm-footnote | 2.1.0 | MIT | Runtime | license |
| mdast-util-gfm-strikethrough | 2.0.1 | MIT | Runtime | license |
| mdast-util-gfm-table | 2.0.1 | MIT | Runtime | license |
| mdast-util-gfm-task-list-item | 2.0.1 | MIT | Runtime | license |
| mdast-util-phrasing | 4.1.0 | MIT | Runtime | license |
| mdast-util-to-markdown | 2.2.4 | MIT | Runtime | license |
| mdast-util-to-string | 4.0.0 | MIT | Runtime | license |
| micromark | 4.0.3 | MIT | Runtime | license |
| micromark-core-commonmark | 2.0.4 | MIT | Runtime | license |
| micromark-extension-gfm | 3.0.0 | MIT | Runtime | license |
| micromark-extension-gfm-autolink-literal | 2.1.0 | MIT | Runtime | license |
| micromark-extension-gfm-footnote | 2.1.0 | MIT | Runtime | license |
| micromark-extension-gfm-strikethrough | 2.1.0 | MIT | Runtime | license |
| micromark-extension-gfm-table | 2.1.2 | MIT | Runtime | license |
| micromark-extension-gfm-tagfilter | 2.0.0 | MIT | Runtime | license |
| micromark-extension-gfm-task-list-item | 2.1.0 | MIT | Runtime | license |
| micromark-factory-destination | 2.0.1 | MIT | Runtime | license |
| micromark-factory-label | 2.0.1 | MIT | Runtime | license |
| micromark-factory-space | 2.1.0 | MIT | Runtime | license |
| micromark-factory-title | 2.0.1 | MIT | Runtime | license |
| micromark-factory-whitespace | 2.0.1 | MIT | Runtime | license |
| micromark-util-character | 2.1.1 | MIT | Runtime | license |
| micromark-util-chunked | 2.0.1 | MIT | Runtime | license |
| micromark-util-classify-character | 2.0.1 | MIT | Runtime | license |
| micromark-util-combine-extensions | 2.0.1 | MIT | Runtime | license |
| micromark-util-decode-numeric-character-reference | 2.0.2 | MIT | Runtime | license |
| micromark-util-decode-string | 2.0.1 | MIT | Runtime | license |
| micromark-util-edit-map | 1.0.0 | MIT | Runtime | license |
| micromark-util-encode | 2.0.1 | MIT | Runtime | license |
| micromark-util-html-tag-name | 2.0.1 | MIT | Runtime | license |
| micromark-util-normalize-identifier | 2.0.1 | MIT | Runtime | license |
| micromark-util-resolve-all | 2.0.1 | MIT | Runtime | license |
| micromark-util-sanitize-uri | 2.0.1 | MIT | Runtime | license |
| micromark-util-subtokenize | 2.1.0 | MIT | Runtime | license |
| micromark-util-symbol | 2.0.1 | MIT | Runtime | license |
| micromark-util-types | 2.0.3 | MIT | Runtime | license |
| ms | 2.1.3 | MIT | Runtime | license.md |
| parse5 | 8.1.1 | MIT | Runtime | LICENSE |
| prettier | 3.10.1 | MIT | Development | LICENSE |
| remark-gfm | 4.0.1 | MIT | Runtime | license |
| remark-parse | 11.0.0 | MIT | Runtime | license |
| remark-stringify | 11.0.0 | MIT | Runtime | license |
| require-from-string | 2.0.2 | MIT | Runtime | license |
| trough | 2.2.0 | MIT | Runtime | license |
| typescript | 7.0.2 | Apache-2.0 | Development | LICENSE, NOTICE.txt |
| undici-types | 7.24.6 | MIT | Development | LICENSE |
| unified | 11.0.5 | MIT | Runtime | license |
| unist-util-is | 6.0.1 | MIT | Runtime | license |
| unist-util-stringify-position | 4.0.0 | MIT | Runtime | license |
| unist-util-visit | 5.2.0 | MIT | Runtime | license |
| unist-util-visit-parents | 6.1.0 | MIT | Runtime | license |
| vfile | 6.0.3 | MIT | Runtime | license |
| vfile-message | 4.0.4 | MIT | Runtime | license |
| zwitch | 2.0.4 | MIT | Runtime | license |

The fresh npm audit query returned zero known advisories on 2026-11-23 for the source
lockfile (103 dependency entries). This is a point-in-time registry result, not a guarantee
against unknown or later vulnerabilities. No dependency upgrade was required.

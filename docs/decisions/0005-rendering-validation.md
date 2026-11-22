# ADR 0005: Literal rendering and AST-based Markdown validation

Status: Accepted for implementation

## Context

Existing fragments use explicit authoring fields, and generated documentation must be
accurate, GitHub-compatible, safe, and deterministic. Configuration and repository text
are untrusted. A generic templating language would add execution/interpolation risks.
Regex-only link parsing misses reference links, code contexts, and embedded HTML assets.

## Decision

Keep literal `{{FIELD_NAME}}` substitution. Resolve exactly the declared fields in one
pass; never recursively substitute tokens found inside inserted values. Unknown fields,
missing selected fields, malformed templates, and unresolved authoring markers block final
output. Leave valid explanatory token literals inside fenced code alone in validation.
Strip instructional comments while retaining explicitly generated ownership metadata and
required legal notices. Normalize newly generated text to UTF-8/LF with a final newline;
never normalize custom spans during update.

Populate built-in fields only from supported provenance-bearing facts or explicit reviewed
content. Plain text is escaped for its Markdown context. Explicit Markdown is parsed and
validated; allow standard text, emphasis, headings, links/images, lists, tables, blockquotes,
and code nodes, with safe destination schemes. Reject raw user HTML/event handlers and
script-like URLs in new content. A renderer may construct audited img/picture markup from
structured local asset records; templates cannot introduce arbitrary scripts or includes.
Existing unowned custom HTML remains unchanged during updates and receives diagnostics,
not silent sanitization or removal.

Use unified + remark-parse + remark-gfm for a GFM-capable Markdown AST; github-slugger
for GitHub-style duplicate/Unicode heading IDs; and parse5 to inspect HTML attributes in
existing documents and generated audited asset blocks. Never render or execute HTML.
Validate internal links/anchors against confined snapshots, including reference-style
links and img/picture/srcset. External links are offline/unverified by default. Network
validation would need an explicit future SSRF/redirect/timeout policy.

## Alternatives considered

- Handlebars/Liquid/Nunjucks: more expression/helper/include surface than the current library needs.
- Whole-document AST reserialization during update: can reformat or lose custom byte spans.
- Regex-only Markdown parsing: deceptively small but incomplete for GFM/code/reference contexts.

## Consequences

Selection and render planning are pure; only the writer can mutate files. Several narrowly
scoped parser dependencies are justified instead of a home-grown Markdown/HTML grammar.
Version resolution and actual compatibility tests occur in Phase 6; no package is installed
now. Validator diagnostics cannot prove semantic truth, secret safety, or AI reliability.

References: [remark-parse](https://github.com/remarkjs/remark/tree/main/packages/remark-parse),
[remark-gfm](https://github.com/remarkjs/remark-gfm), [github-slugger](https://github.com/Flet/github-slugger),
and [parse5](https://parse5.js.org/) document the selected parsing/slugging responsibilities.

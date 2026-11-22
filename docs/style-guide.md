# Documentation style guide

## Language and structure

Write repository documentation in English. Owner-facing development reports are in Turkish.
Use clear, direct sentences and consistent product names. Prefer practical explanations
and examples. Keep the README concise and move detailed guidance into linked documents.

Use one descriptive H1 per document, followed by logically nested headings. The complete
master specification preserves the owner's supplied heading structure. Separate headings,
paragraphs, and lists with blank lines. Do not use empty sections or decorative badges.
Formal README section classifications will be defined in Phase 2; the existing
[standard](standard.md) remains a draft.

## Evidence and status

Use repository files as evidence. Separate current capabilities from plans and unknowns.
Never invent commands, dependencies, versions, compatibility, test results, contacts,
contributors, sponsors, or license terms. Report unresolved information in the roadmap
or a review report rather than silently guessing.

Published documentation must contain no unresolved authoring placeholders. The README
template and issue/PR templates may contain clearly signposted authoring fields; users
must fill or remove them when producing final documents. Example data must be identified
as an example and must not contain secrets or private information.

## Links and navigation

Use relative links for repository files and descriptive link text. Match filename case
and GitHub heading anchors. Link only to existing guides; omit planned destinations.
Use absolute URLs for verified external resources. Do not assume a Discussions forum,
release page, hosted website, or private reporting feature exists.

## Code and commands

Use fenced code blocks with an appropriate language identifier. Explain where commands
run and what they do when needed. Copy paths, option names, and configuration keys exactly.
Show commands only when verified against the repository. Distinguish inspection from
execution; never claim a successful run without evidence. Do not publish empty code fences.

## Media and accessibility

Prefer local assets with descriptive alternative text; do not place essential information
only in an image or color. Use meaningful headings, table column labels, and short link text.
Keep diagrams tied to the actual architecture. Do not imply an image is a product screenshot
when it is a mockup. Avoid excessive animation, gradients, and decorative media.

Follow the [brand guidelines](../assets/brand/brand-guidelines.md). Use theme-appropriate
SVG wordmarks and a readable fallback. Preserve the geometric symbol, palette, and typography.
Check light and dark backgrounds. Inter has system fallbacks; no bundled font is required.

## Maintenance and review

Preserve accurate custom content, detailed guides, copyright notices, and third-party
attribution. Never change an adopting project's license implicitly. Update linked guides,
architecture, roadmap, and changelog when behavior changes. Record relevant checks and
remaining limitations in the review. See [Contributing](../CONTRIBUTING.md) and
[release conventions](releasing.md) for the working process.

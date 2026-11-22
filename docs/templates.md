# Modular template library

## Scope and files

The library implements README Standard v0.1 as reusable Markdown fragments and JSON
metadata. Humans and coding agents can compose sections today. The repository checker
verifies the catalog and evaluates selection scenarios. The CLI MVP additionally performs
bounded static analysis, evidence-gated literal rendering, no-clobber generation, and offline
validation. Neither the checker nor the CLI executes target repository commands.

| File | Responsibility |
|---|---|
| `templates/catalog.json` | Versioned section identifiers, standard mapping, classification, order, fragment paths, and authoring fields |
| `templates/default/layout.json` | Default candidate selection and stable ordering |
| `templates/profiles/*.json` | Fourteen project-type recommendations and domain guidance |
| `sections/core/*.md` | Required information fragments |
| `sections/optional/*.md` | All non-Core fragments, including Recommended and Project-specific content |
| `README.template.md` | Convenient single-file manual starter |
| `examples/*/selection.json` | Evidence inventories and expected selection for local example projects |
| `scripts/check_template_library.py` | Development-only consistency checker and selection reference |

The [standard](standard.md) remains authoritative for meaning and inclusion criteria.
The metadata format is separate from the [CLI configuration contract](configuration.md).
Phase 5 defined its schema and interfaces; the Phase 6 MVP now implements the four core commands. The new
[library schema](../schemas/library.schema.json) describes existing version-1 data
without changing the catalog/profile files or exposing a public runtime API.

## Metadata contract (formatVersion 1)

Paths are relative to the Craftmentation library root, not the target repository.
Use lowercase hyphenated identifiers and UTF-8 JSON/Markdown. Catalog identifiers must
be unique; a change of identifier or incompatible field meaning requires a format
version change or an explicit migration. Additive sections may retain version 1 if
existing identifiers keep their meaning. Unsupported format versions must be rejected.

Every section record has these fields:

| Field | Meaning |
|---|---|
| `id` | Unique stable section identifier, such as `usage` |
| `standardItem` | Exact corresponding item in Standard v0.1 |
| `classification` | Core, Recommended, Optional, or Project-specific |
| `order` | Positive integer; catalog order advances by ten to leave room for custom sections |
| `path` | Existing fragment inside the library root; no absolute path, traversal, or symlink |
| `fields` | Nonempty list of unique uppercase authoring-field names present in the fragment |

Fragments contain optional instructional comments, a heading when useful, and explicit
`{{FIELD_NAME}}` authoring fields. These are manual fields, not executable interpolation.
Fill them with reviewed Markdown; never evaluate template expressions or shell commands.
Remove authoring comments and all unresolved fields before publication. Recheck inserted
links, heading structure, legal notices, and secrets. Do not dump raw evidence into output.

Profile records contain `formatVersion`, `id`, `name`, `recommendations` (unique known
section IDs), and `notes` (domain-specific evidence guidance). The default layout fixes
candidate rules and sorts selected sections by `(order, id)`. Identity components may
be arranged together as allowed by the standard; a logo can precede the H1. Combining
related headings is allowed, provided Core information remains discoverable.

## Inclusion and exclusion algorithm

1. Select a profile from actual repository evidence; use `general` when no more specific
   profile is justified. The MVP provides initial JSON-manifest/static-HTML type hints; unsupported formats remain unknown. For mixed repositories,
   use one primary profile and explicitly include additional relevant sections.
2. Reject unknown IDs, unsupported versions, duplicate IDs, and attempts to exclude Core.
3. Candidate IDs are Core plus Recommended plus the profile's recommendations plus
   explicit `include` IDs. A profile never changes a section's standard classification.
4. Explicit `exclude` removes non-Core candidates, even if also included or recommended.
5. For each candidate inspect its evidence record. Only `state: "verified"`, a nonempty
   `sources` list, and `safe: true` permit inclusion. `missing`, `unknown`, absent records,
   empty sources, and unsafe evidence never become published claims. Unknown Core evidence
   blocks readiness. An explicit include without acceptable evidence is unresolved, not forced.
6. Sort accepted records by `(order, id)`. Report selected, omitted, and unresolved IDs
   separately. If unresolved IDs exist, do not claim the document is ready to publish.
7. Compose and review the fragments manually. Selection does not prove their filled
   content is accurate, nor does it produce a README.

Evidence records are per-section objects with `state` (`verified`, `missing`, or `unknown`),
`sources` (repository-relative paths or explicitly identified maintainer information),
and `safe` (boolean). A human must verify these assertions and that the standard's
section-specific criteria are met. The selection reference does not read source contents,
validate URLs, or detect secrets. `safe` is an author assessment, not a security scanner.
Example inventories use real local paths. Synthetic policy tests are clearly marked.

Consequences: no screenshots without real assets, no environment variables without verified
settings, no inferred license, no empty headings to satisfy a profile, and no evidence
bypass through an explicit include. Excluding a section from a README does not authorize
removing required legal notices from redistributed material.

## Custom sections

Reuse the same record shape with a `custom-` prefixed ID, a descriptive `standardItem`,
and a non-Core classification. Provide a local fragment and `fields`, assign an order
between neighboring built-ins, and supply verified evidence under that ID. Custom sections
are candidates only when explicitly included. They cannot replace built-in IDs or weaken
Core requirements. Tied orders are resolved lexically by ID. Do not infer required custom
content from a profile note.

For example, a verified CLI completion workflow may use a `custom-shell-completion`
section after Usage. A project without completion must omit it. Domain-specific API
endpoints, permissions, compatibility, workspace organization, and similar guidance can
be written within Usage/Requirements or in explicit custom sections. Custom paths must
stay inside the inspected library root and must not follow symlinks. Future CLI handling
of external custom libraries is a Phase 5–7 design responsibility.

## Working with the library

Read the [project profiles](project-profiles.md), select fragments from the catalog,
and follow the [publication checklist](standard.md#publication-checklist). Use the
[examples](../examples/README.md) to see source-backed selections and omitted sections.
Never copy another project's license or replace its accurate README wholesale.

For repository contributors, run the development checker from the repository root:

```bash
python3 scripts/check_template_library.py
```

It requires Python 3.9 or newer and uses only the standard library. Python is a developer verification tool here,
not a technology decision for the future Craftmentation CLI. The checker validates
exact version-1 metadata, fragment fields, standard mapping, profile references, selection
edge cases, and example expected selections. It writes no project files. See
[ADR 0001](decisions/0001-template-library.md) for the architecture choice.

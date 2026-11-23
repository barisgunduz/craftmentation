# Configuration contract v1

## Status

The MVP loads and validates schemaVersion-1 configuration using Ajv 2020. [config.schema.json](../schemas/config.schema.json) is authoritative
for structure. Semantic rules below are also required; passing JSON Schema alone does
not prove paths are safe, source facts true, or capabilities implemented.
For a task-oriented path, start with the [practical workflow](workflow.md).

Use one UTF-8 JSON file named `craftmentation.config.json` in the explicitly selected
repository root, or a root-confined `--config` path. There is no upward discovery, global
user configuration, package.json field, JS/YAML config, dotenv interpolation, recursive
extends, automatic environment override, or remote schema fetch. `$schema` is an optional
editor hint, never permission to fetch or execute anything. Reject duplicate keys and
unknown properties before applying defaults; reject executable/prototype-affecting keys.
Schemas use Draft 2020-12 and packaged URN references. Load only the known bundled schemas.

## Minimal configuration and effective defaults

A minimal document is `{ "schemaVersion": 1 }`. The resolver expands it to these values
without mutating the original file. JSON Schema `default` entries are documentation;
Ajv must not insert defaults, coerce types, or remove unknown properties.

```json
{
  "schemaVersion": 1,
  "projectType": "auto",
  "language": "en",
  "additionalLanguages": [],
  "output": "README.md",
  "template": "default",
  "sections": {},
  "customSections": [],
  "content": {},
  "assets": [],
  "profiles": {},
  "ai": { "enabled": false, "provider": null }
}
```

## Fields

| Field | Meaning and semantics |
|---|---|
| schemaVersion | Required integer 1; unsupported versions fail, never silently migrate |
| projectType | auto or one of the fourteen existing profile IDs; override recommendations, not facts |
| language | Primary edition, default en; syntax is 2–3 lowercase letters with an optional uppercase two-letter region |
| additionalLanguages | Unique tags of the same form, excluding the primary tag; does not imply translations exist |
| output | Root-relative Markdown output path, default README.md; safe path and protected-name checks apply |
| template | default or an explicit `./` local library directory, never a URL or module import |
| sections | Built-in/custom section ID to true, false, or auto; Core IDs cannot be false |
| customSections | Records using the existing custom-section metadata shape; unique custom-prefixed IDs, non-Core only |
| content | Section ID to known field names to value/format/sources/safe records; no arbitrary interpolation |
| assets | Existing root-relative asset paths and nonempty alt text; no implicit asset downloads or branding copies |
| profiles | Per-profile overrides for sections, content, template, and assets only |
| ai | Disabled by default; enabled true requires an explicit provider ID, not a secret or credential |

A content field's format is `text` (escaped as data) or `markdown` (explicit reviewed Markdown
validated against the allowed node policy). Sources are nonempty root-relative evidence
paths or explicitly attributed maintainer statements; values are never shell commands to
execute. Validate catalog field names and source existence separately. A configured safe
flag is an assertion to review, not a license to skip safety checks. Content for an unknown
or absent custom ID fails semantic validation. Extra/missing selected field values produce
diagnostics, not unused fields or unresolved authoring tokens in a final document.

True sections are explicit includes; false sections are explicit excludes; auto or missing
keys use the existing default/profile candidate rules. Exclusion wins except Core exclusions
are invalid. Verified evidence is always required. Metadata cannot promote a custom section
to Core, replace a built-in ID, change the target license, or register code.

## Precedence and merge behavior

1. Resolve and confine --root (default the current working directory) and optional --config.
2. Parse config or use in-memory schemaVersion-1 defaults when it is absent. An explicitly
   requested missing --config file is an error; absence of the default file is allowed.
3. Apply explicit CLI project-type override to the base projectType and analyze signals.
   Resolve the selected profile once; profile overrides cannot select a different profile.
4. Merge defaults, base config, then the selected `profiles[id]` block, then explicit CLI
   overrides. Omitted CLI flags never reset configured values.
5. Merge section and content maps by key (content also by field key); arrays replace whole
   arrays, so [] clears them. Scalar values replace scalars. Null is allowed only where
   the schema explicitly permits it. No environment variable supplies configuration.
6. Validate the effective result, semantic references, output collisions, and available
   capabilities. Report effective values and their sources in diagnostics without secrets.

There is no generic --set escape hatch or eval. Phase 6 exposes only flags documented in
the command contract. Updating a file version or choosing a profile does not authorize
changes to legal documents, target agent instructions, application source, or support promises.

## Path, localization, and capability checks

The lexical path schema excludes absolute/drive paths, backslashes, parent segments, and
control characters. Runtime checks additionally reject Windows device names, alternate
streams, reserved target areas, symlinks, outside-root resolution, case collisions, and
non-Markdown output. Paths are not expanded as environment variables or home shortcuts.
See [safe operations](safe-file-operations.md) for actual enforcement requirements.

Language syntax is deliberately a small tag subset, not full BCP 47. All tags are metadata,
not claims that a translation or UI locale exists. Additional languages cannot include
the primary language, and derived README language paths must be distinct on all target
filesystems. Phase 6 supports English output only; unsupported language/localization settings
fail E_CAPABILITY instead of silently being ignored. Automated edition writes, status
tracking, navigation, and drift detection are outside the active scope. These fields remain
reserved for schema compatibility, without promising an implementation. Manual AI requests
can use another language independently of the CLI.

Custom local libraries/sections and direct provider SDKs remain reserved. Installed-agent
drafting is implemented via explicit --agent, not config-triggered invocation. ai.enabled
still fails E_CAPABILITY; a target config cannot authorize transmission. See [AI drafting](ai-drafting.md).
They require a demonstrated user need and an explicit implementation decision. The schema can describe the accepted design before all features ship;
each staged CLI must diagnose valid-but-unimplemented settings. Disabled AI configuration
does not trigger network access or credential discovery. There is no provider SDK dependency.

## Compatibility and examples

Version 1 is the first public configuration contract. The earlier master-spec JSON was
conceptual, not a released format. Existing library formatVersion and CLI schemaVersion
are separate version spaces. Keep all existing section/profile IDs. Incompatible changes
require a new schemaVersion and an explicit migration; compatible added fields need
version/release notes and older executables must reject unknown fields, not misread them.

Synthetic [minimal](../tests/fixtures/contracts/config-minimal.json) and
[full](../tests/fixtures/contracts/config-full.json) instances exercise the contract.
They are not configuration for this repository and do not assert that referenced assets,
packages, or maintainer values exist. This repository does not need a live craftmentation.config.json; init creates it only
in the explicitly selected target. See [ADR 0004](decisions/0004-configuration-schema.md) for the format decision.

## MVP population details

Package names/descriptions/engine declarations and existing README sections can populate
built-in fields. Complete extracted sections fill the first field and intentionally leave
remaining subfields blank; this preserves their source prose without inventing extra facts.
Quick start/Getting started satisfy Core usage. When it is absent, generation fails with
E_EVIDENCE and actionable guidance. Prefer --usage-file with reviewed root-confined Markdown
for a simple usage gap; it overrides usage content without a configuration file. For other
missing information, supply the actual fields listed
in templates/catalog.json through content, with real source paths or explicit maintainer
attribution. Partial configured fields merge with existing extracted fields. An empty secondary
field is permitted when explicitly provided or intentionally omitted within a complete source section.

For configured Markdown, relative links resolve from its first evidence file (or from the
output context for a maintainer: attribution). Generated links are rebased to the output
location. Structured assets explicitly request logo content; all asset paths must exist,
pass confinement, and have safe alternative text. Explicit license content additionally
requires an actual inspected target license notice. No package.json license alone is used.

Init writes only craftmentation.config.json, never an arbitrary --config filename. Generate
also rejects hidden agent/CI directories and protected policy filenames as output. New
output is limited to 1 MiB. See [ADR 0008](decisions/0008-cli-mvp-implementation.md).

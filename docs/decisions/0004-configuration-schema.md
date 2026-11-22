# ADR 0004: Strict JSON and versioned bundled schemas

Status: Accepted

## Context

Configuration must be portable, inspectable, versioned, non-executable, and consistent
with the existing library metadata. Core section protection, project overrides, assets,
custom sections, localization settings, and optional AI need explicit semantics.

## Decision

Use `craftmentation.config.json`, schemaVersion 1, and Draft 2020-12 JSON Schema.
Use Ajv's 2020 implementation with strict schema checks, no coercion, no removal of
additional properties, and no automatic default insertion. Resolve defaults and precedence
explicitly after parsing. Compile only bundled schemas registered under fixed local URNs;
never fetch a schema or code named by target configuration. Reject duplicate JSON keys
in the loader before ordinary JSON.parse can silently discard earlier values.

The [configuration contract](../configuration.md) defines the one-file scope and merge
rules. Reuse existing section/profile IDs and the library selection/evidence shapes.
Library formatVersion and CLI schemaVersion remain distinct. Structural schemas do not
replace semantic path, ID uniqueness, Core, capability, provenance, or source-truth checks.

## Alternatives considered

- YAML: readable but adds parser features and ambiguous scalar/coercion considerations.
- JavaScript/TypeScript config: flexible but executes untrusted repository code.
- Zod-only contracts: convenient TypeScript integration but makes the independent JSON
  interchange contract secondary and still needs an explicit schema/version strategy.
- Implicit environment/global inheritance: harder to reproduce and diagnose safely.

## Consequences

Unknown fields and versions fail clearly. Valid reserved features fail capability checks
until implemented. There is no silent migration or global override. The schemas are design
artifacts in Phase 5; Ajv compilation/metaschema checks remain Phase 6 implementation gates.
No dependency is installed merely to validate documentation.

References: [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12/json-schema-core)
defines schema resources/references; [Ajv schema versions](https://ajv.js.org/json-schema.html)
and [Ajv options](https://ajv.js.org/options.html) document the selected engine and controls.

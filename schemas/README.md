# Version-1 schemas

These Draft 2020-12 schemas originated in Phase 5 and are now loaded by the MVP with
actual Ajv 2020 compilation and non-mutating validation. The Python subset remains an
independent narrow oracle, not the production validator.

| Schema | Resource ID and purpose |
|---|---|
| [library.schema.json](library.schema.json) | `urn:craftmentation:library:v1`: existing catalog/profile/layout shapes and shared section/evidence definitions |
| [config.schema.json](config.schema.json) | `urn:craftmentation:configuration:v1`: user configuration structure |
| [analysis.schema.json](analysis.schema.json) | `urn:craftmentation:analysis:v1`: bounded static analysis/provenance and diagnostics |
| [report.schema.json](report.schema.json) | `urn:craftmentation:report:v1`: command JSON result envelope |

Register bundled resources offline by their exact IDs. Cross-resource URNs are not network
locations; never fetch an unknown reference from a target repository. Structural validation
must be followed by semantic checks for IDs, ownership, paths, safety, capabilities, and source
truth. Existing library metadata is not rewritten or reversioned by the new schemas.

See [Configuration](../docs/configuration.md), [CLI architecture](../docs/cli-architecture.md),
and [verification limits](../docs/development.md#schema-verification-boundary).
Synthetic [contract fixtures](../tests/fixtures/contracts/config-full.json) contain illustrative
paths and hashes, not current repository facts. The Python subset helper does not replace
Ajv compilation or formal metaschema validation, now exercised by Phase 6 Node tests.

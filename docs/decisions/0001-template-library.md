# ADR 0001: Declarative Markdown template library

Status: Accepted

## Context

Phase 3 requires reusable sections, project profiles, inclusion/exclusion rules, custom
sections, and verifiable examples before the CLI architecture is chosen in Phase 5.
README Standard v0.1 is the content authority. The library must not require an AI service
or couple future rendering to executable template expressions.

## Decision

Use plain Markdown fragments and version-1 JSON metadata. Map every standard item to
one stable section ID. Profiles recommend existing IDs; evidence and explicit exclusions
control selection. Separate selection from rendering. Custom sections use the same shape
and a reserved prefix; built-in Core information cannot be disabled.

A small Python standard-library development checker validates the library and serves
as an executable selection reference. It does not analyze repositories, render READMEs,
or write output. Its language does not select the future CLI language. No runtime or
third-party dependency is introduced. The exact contract is in [Templates](../templates.md).

## Alternatives considered

- Standalone full templates for each profile: easy to copy but duplicates rules and drifts.
- YAML frontmatter: convenient but introduces parser dependencies for machine verification.
- A template engine or executable expressions now: prematurely chooses runtime behavior
  and increases interpolation risks before Phase 5 security and configuration design.
- Prose-only selection rules: accessible but cannot reliably catch broken IDs or precedence regressions.

## Consequences

The library is readable without tools and can be adapted by humans or agents. Metadata
and reference cases can guide later implementations. IDs and format versions must be
maintained deliberately. A human still verifies evidence and fills fields; no automatic
production generation or compatibility guarantee is claimed. The checker is a narrow
format validator, not a JSON Schema engine or general documentation validator.

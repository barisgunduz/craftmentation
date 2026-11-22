# Release conventions

## Current status

Craftmentation has no released version or package manifest. This guide defines the
release process; it does not announce a release or establish an installation command.
Release readiness will be assessed in Phase 11 of the [roadmap](roadmap.md).

## Versioning and changelog

Use Semantic Versioning: `MAJOR.MINOR.PATCH`, with `v`-prefixed Git tags. Before 1.0,
minor releases may introduce incompatible changes; document them explicitly. Patch
releases should contain compatible corrections. Use prerelease suffixes such as
`-rc.1` for release candidates. Do not select or claim a version before release preparation.

Maintain [CHANGELOG.md](../CHANGELOG.md) using Keep a Changelog categories: Added,
Changed, Deprecated, Removed, Fixed, and Security. Include meaningful user-facing changes;
omit empty categories. Keep unreleased work under Unreleased. On an authorized release,
move the relevant entries into a version heading dated `YYYY-MM-DD`, describing migrations
and compatibility changes where applicable, and retain Unreleased for subsequent work.

## Preparation checklist

1. Confirm the authorized release scope and verify the roadmap's acceptance criteria.
2. Review repository completeness, license notices, third-party attribution, and included files.
3. Run applicable tests, static checks, and documentation validation. Record actual results.
   Until executable tooling exists, review Markdown, links, templates, and SVGs manually
   and run `git diff --check`; do not claim runtime or cross-platform testing.
4. Once packaging exists, inspect package contents, audit dependencies, test installation
   and supported platforms, and document upgrade procedures. No package manager has been selected yet.
5. Prepare version changes, dated changelog entries, release notes, known limitations,
   and upgrade guidance. Check that notes describe actual shipped functionality.
6. Present the concrete release candidate and validation evidence to the owner for approval.

Commits, pushes, tags, GitHub releases, package publishing, and deployments require explicit
owner authorization. Preparing a candidate does not authorize publication. Never publish
secrets, silently rewrite history, or force-push. If verification fails, resolve the issue
or document the blocker before requesting release approval.

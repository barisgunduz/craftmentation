# Phase 0 repository audit

Audit date: 2026-11-22. Scope: local working tree, including hidden repository files
outside Git internals. No remote service or external URL was verified.

## Starting state and intended users

The initial Git working tree was clean. Craftmentation is a developer documentation
framework intended for developers, maintainers, teams, technical writers, and coding
agents. Its current implementation is a collection of Markdown guidance and assets,
not an installable CLI or production-ready framework.

## Inspected inventory

All existing documentation was read: `AGENTS.md`, `CLAUDE.md`, `README.md`,
`README.template.md`, `CONTRIBUTING.md`, `docs/standard.md`,
`docs/project-profiles.md`, `docs/licensing.md`, `prompts/generate-readme.md`,
and `assets/brand/brand-guidelines.md`. The full `LICENSE` and all five SVG sources
were inspected. Tracked scaffolding includes `.gitkeep` files in `templates/`,
`sections/`, `examples/`, `.github/ISSUE_TEMPLATE/`, and `assets/brand/`.

No manifest, lockfile, application source, tests, executable scripts, configuration
schema, or CI workflows were found. Consequently there are no verified install,
build, run, or test commands, runtime requirements, or environment variables to document.

## Licensing

`LICENSE` contains the MIT License, including its permission, notice-preservation,
and warranty clauses. Copyright is `Copyright (c) 2026 Barış Gündüz`.
`docs/licensing.md` and `CONTRIBUTING.md` agree with it and preserve adopter license
independence and third-party notice requirements. No license changes are needed.

## Findings and inconsistencies

| Area | Evidence and finding | Follow-up |
|---|---|---|
| README | Accurate early-development notice and manual quick start; coarse status checklist omits much of the new product roadmap | Phase 1: link authoritative progress and distinguish available materials from planned tooling |
| Standard | `docs/standard.md` gives an initial order but no complete classification or inclusion criteria | Phase 2: formalize Standard v0.1 |
| Template | Authoring placeholders, sample badge URLs, and a generic top anchor are intentional but unsafe to publish unchanged | Phase 2: refine conditional inclusion and placeholder guidance |
| Profiles | Ten initial categories; Monorepo, Static Website, Infrastructure / DevOps, and General Repository are absent | Phase 3: define all fourteen profiles |
| Modularity | Section, template-library, and example directories contain only `.gitkeep` | Phase 3: implement modules and realistic examples |
| AI guidance | Shared evidence rules, Claude reference, and one generation prompt exist; no compatibility tests, analysis/update/translation prompts, or other agent adapters | Phase 4: build and verify the shared framework |
| Architecture | No data model, schema, safe write policy implementation, runtime, CLI, renderer, or validator | Phase 5: evaluate and design; Phases 6–7: implement |
| Branding | Geometric C, prescribed colors and Inter fallback exist in SVG sources | Preserve established identity |
| Light logo | Guidelines recommend `logo-light.svg` on light backgrounds, but its wordmark fill is `#F9FAFB`, the prescribed light background color | Phase 1: reconcile light variant contrast while retaining geometry and palette; browser rendering still needs verification |
| Accessibility | Four SVGs have title labels; favicon lacks a title; no visual accessibility review has been performed | Review embedding context and accessible text when integrating assets |
| Community | Contribution guidance exists; Code of Conduct, Security Policy, Support, issue forms and PR template are absent | Phase 1 |
| Automation and localization | No workflows, translations, translation status model, or website | Phases 8–10; do not claim support is implemented |

## Phase 0 changes

The complete master specification, roadmap, audit, architecture inventory, ADR guide,
and Unreleased changelog were created. Existing agent rules were retained and extended
with the mandatory continuation protocol. Architecture and changelog files are continuity
requirements from specification section 2; their creation does not start Phase 1.
No CLI, dependencies, community policies, template rewrites, or brand changes were made.

## Exact Phase 1 implementation sequence

1. Re-read continuity documents and inspect Git changes. Keep Phase 1 marked In Progress
   until all thirteen tasks in specification section 16 are satisfied.
2. Finalize a minimal structure around actual files. Retain existing guidance; do not
   create runtime packages or empty future component trees.
3. Improve `README.md`: current capabilities, intended audience, manual adoption workflow,
   links to standard/template/prompt/licensing, roadmap, and community policies. Do not
   advertise a working CLI, npm installation, automated profiles, or translations.
4. Reconcile `logo-light.svg` wordmark contrast with brand guidance, preserving geometric
   identity and palette; check light/dark rendering and accessible embedding.
5. Finalize `CONTRIBUTING.md` with phase scope, evidence rules, review expectations,
   verification practices, and links to documentation style and release conventions.
6. Add `CODE_OF_CONDUCT.md`, `SECURITY.md`, and `SUPPORT.md` with honest reporting routes.
   Inspect repository metadata and available GitHub settings before referencing channels.
   Never invent an email, private reporting facility, response-time commitment, supported
   release range, or enforcement contact. If no confidential reporting route can be
   verified, document the limitation and obtain owner input before claiming one exists.
7. Add actionable bug-report and feature-request issue templates under
   `.github/ISSUE_TEMPLATE/`; add `.github/PULL_REQUEST_TEMPLATE.md` covering evidence,
   scope, checks, documentation, and licensing. Avoid assumed repository URLs.
8. Review the existing Unreleased changelog, establish Semantic Versioning and release
   preparation conventions in `docs/releasing.md`, and preserve explicit authorization
   requirements for commits, publication, deployment, and releases.
9. Create `docs/style-guide.md` for English prose, headings, relative links, accessible
   media, fenced examples, verified claims, and separation of draft templates from
   published documents. Leave formal section classification to Phase 2.
10. Recheck MIT notices, attribution, adopter neutrality, internal navigation, and
    cross-document consistency. Validate issue-template syntax with available tooling;
    add no dependency solely to validate documentation. Do not add CI ahead of Phase 9.
11. Record checks and unresolved policy/channel questions, update architecture if changed,
    changelog and roadmap, then report Phase 1 results in Turkish and stop.

Phase 1 acceptance: a coherent public repository with all required community files,
usable issue and PR templates, accurate navigation, documented contribution/style/release
conventions, preserved licensing, and no unsupported functionality claims.

## Validation and limitations

Phase 0 checks: full inventory and documentation review; MIT notice inspection;
SVG XML parsing; all 21 specification sections and all 12 phase headings checked;
continuity document relative links checked; `git diff --check` passed.
There is no executable test suite to run. External links, GitHub settings, visual rendering,
platform compatibility, and AI tool compatibility were not tested. Template placeholders
are intentional authoring inputs and were not treated as published claims.

## Blockers and maintainer input

No blocker prevents Phase 0 completion. Phase 1 must verify available support,
conduct-enforcement, and confidential security-reporting routes. These are unresolved
operational details, not permission to fabricate contacts or promises. Implementation
technology selection remains deliberately deferred to Phase 5.

## Phase 1 follow-up (2026-11-22)

The foundation findings were addressed through README and contribution revisions,
community policies, issue/PR templates, style and release guides, and the light
wordmark color correction. This audit preserves its Phase 0 observations as history;
see the roadmap and architecture for the current state. GitHub API inspection verified
Issues enabled, Discussions disabled, and private vulnerability reporting disabled.
The new reporting policies explicitly acknowledge the missing confidential route.
No runtime, profiles, template modules, AI adapters, translations, CI, or website were
implemented ahead of their phases. Visual browser validation remains outstanding;
local rasterization tools did not produce a trustworthy typography preview.

## Product and usability review

Review date: 2026-11-22. This section supersedes the initial implementation-state findings
above; the earlier sections remain a record of Phases 0–1. The owner requested a simpler
product, clearer examples, no separate website, and no localization automation.

### Inspected state

The local HEAD and GitHub master tree both resolved to
`40ece6ad54679f7bd73f80c8297d4e1000e77f59` before these edits. Git status was clean.
The review covered instructions/specification/roadmap, package and lockfile, source,
Node/Python tests, schema contracts, prompts, templates, example sources, and documentation.
No public package, CI workflow, advanced command, provider adapter, website, or localization
engine was found. The CLI MVP implements init/analyze/generate/validate.

A real CLI analysis of this checkout reported 198 inventoried files, 13 facts, and five
`W_UNSAFE_CONTENT` warnings before documentation edits. These conservative text-heuristic
warnings are not findings of five confirmed security vulnerabilities. File counts and
source fingerprints change as the repository changes.

A generation dry-run against the original library example selected identity, overview,
requirements, installation, and usage and produced 114 words. That demonstrates a small
working draft, not source-level semantic understanding. A temporary repository with only
a package name/description and no usage failed with `E_EVIDENCE`. Temporary inputs were
removed. The baseline CLI can reuse JSON metadata and existing README sections but does
not turn arbitrary application source into a complete README automatically.

### Findings and action

| Finding | Consequence | Action |
|---|---|---|
| Many internal contracts precede the first useful result | New users cannot tell what to read | One recommended agent quick start; optional CLI; repository map |
| The original roadmap treats every planned subsystem as mandatory | Maintenance cost exceeds the immediate README goal | Owner-approved scope revision and three focused remaining phases |
| Tiny examples omit useful operational context | The framework's value is hard to assess | Source-backed usage, errors, testing boundaries, troubleshooting, and omission rationale |
| Curated fixtures and deterministic generation are easy to confuse | Users may expect unsupported automatic inference | Explicitly distinguish authored examples from CLI output |
| Missing Core usage blocks fresh generation | A first-time user faces internal evidence terminology | Next phase: actionable missing-information guidance and a preview/review/save journey |
| Existing output is rejected | Content is protected, but recurring maintenance is incomplete | Next phase: reviewable updates with preservation/conflict checks |
| Native platform evidence covers macOS only | Cross-platform intent is not verified support | Release phase must execute Linux/Windows checks |

### Scope and retained value

Phases 0–6 established a real standard, reusable sections/profiles, AI policies, a safe
four-command CLI, schemas, and meaningful regression tests. These are retained. They are
maintainer tools, not prerequisites to writing one README. `tests/node` remains tracked
source; dependencies/build/cache artifacts remain ignored.

A standalone website and automated localization/translation tracking are removed from
active scope, not marked implemented or completed. English is the default; a user can ask
their agent for another language. Reserved CLI fields continue to reject unsupported
settings rather than silently pretending to work. Optional translation prompts and old
fixtures remain historical/reusable material without committing to an engine.

The revised order is product clarity/examples, practical README workflow, then release
confidence/distribution. check/doctor/custom-template/provider capabilities need a
specific user benefit before implementation. No runtime capability is added by this
usability revision. Current validation results are recorded in the [roadmap](roadmap.md);
prior macOS results do not establish native Linux/Windows or graphical behavior.


## Practical workflow follow-up (2026-11-23)

Revised Phase 8 adds a real default-preview update path with explicit ownership, reviewed
candidate hash binding, exact custom-span preservation, and retained original-byte backups.
Legacy READMEs remain protected and are routed to agent reconciliation; no heuristic adoption
or automatic insertion/removal of sections is performed. --usage-file provides reviewed usage
without a config-field exercise. Quick start/Getting started now satisfy Core usage, fixing
a failure found by generating a draft for Craftmentation itself. BOM-aware Markdown offsets
and UTF-8 reads support preservation rather than dropping the initial marker.

Declared npm scripts can render as invocations with inspection/not-executed qualification.
No new provider, template loader, check/doctor, website, localization engine, or dependency
was added. The next work is release confidence, including native Linux/Windows execution.
Current verification is recorded in the roadmap; native platform/source-understanding and
uncooperative-writer limitations remain. See the [workflow](workflow.md) and
[ADR 0010](decisions/0010-reviewed-managed-updates.md).


## Source-aware generation follow-up (2026-11-23)

Revised Phase 9 implements explicit generate --agent codex|claude, source context inspection,
a strict source-quoted proposal boundary, normal document validation, and offline exact
reviewed-file saving. The existing-agent route was selected after owner continuation.
The first live sandbox attempt failed; network/client access was approved for the concrete
Codex integration tests on the repository's public fixture sources. Five source-only
example calls and one read-only framework preview succeeded. No current README was replaced.

This resolves the earlier manifest/README-only limit for the opt-in model-assisted route;
the deterministic analyzer remains deliberately narrower. Proposed interpretation is not
verified semantic fact. Large-context omissions and unknowns remain visible. A live empty
configuration-table scaffold was fixed in the renderer and covered by a regression test.

No provider SDK, direct credential store, automatic source upload, application-script
execution, website, or localization engine was added. Claude protocol tests do not prove
live-account compatibility. Native platform/client testing and release readiness remain
Phase 10. See the actual [evaluation](ai-source-evaluation.md), [guide](ai-drafting.md), and
[ADR 0011](decisions/0011-source-aware-agent-drafting.md).


## Release preparation follow-up (2026-11-23)

The local private candidate is 0.1.0-rc.1, with tested Node floors ^24.22.3/^26.13.1.
The source audit returned zero known registry advisories for the 103 locked entries;
all 79 runtime dependency notice files were inspected and the full declared-license
inventory was recorded. No dependency update or system/cache ownership change was made.
The package smoke check builds/packs the actual candidate, checks payload inclusions and
exclusions, installs into a separate consumer, and exercises every installed command,
managed replacement/backup, and source-context preview without any live model call.

A pinned read-only six-job native workflow is prepared and locally linted. GitHub currently
has zero workflows; no upload or run is claimed. Docker is installed but its daemon socket
is absent, and no Windows runtime is available. Phase 10 remains In Progress pending
actual native OS evidence and owner authorization for the necessary source commit/push.
Private vulnerability reporting remains verified disabled and is documented, not replaced
with a fictional contact. See [readiness](release-readiness.md) and [candidate notes](release-notes.md).


## User-facing consistency review (2026-11-23)

A follow-up user-journey review found obsolete four-command wording in SUPPORT.md and a
blanket source-understanding limitation in the example gallery. These were corrected to
distinguish deterministic extraction from opt-in agent interpretation. The repository guide
now explicitly includes human-only authoring and distinguishes usage modes from separate
product versions. The five curated examples remain source-backed small teaching projects,
not complete production applications or proof of arbitrary large-repository coverage.
Native CI, live Claude verification, private reporting, and publication remain as recorded
in release-readiness.md. Passing link checks alone did not establish this prose consistency.

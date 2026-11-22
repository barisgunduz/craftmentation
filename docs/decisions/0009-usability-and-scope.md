# ADR 0009: Prioritize understandable README workflows

Status: Accepted by explicit owner direction, 2026-11-22

## Context

The implementation has a standard, many fragments/profiles, AI prompts, and a working
CLI, but the owner found the repository difficult to understand and the examples too basic.
Completed infrastructure should remain useful without turning a single README task into
a platform-installation or internal-schema exercise.

## Decision

Make the existing-agent workflow the recommended entry route: supplied standard and
starter, source inspection, reviewable draft, then authorized save. Keep the CLI as an
optional deterministic/local-checking tool with its limits stated plainly.

Remove the separate documentation website and automated localization engine from active
requirements. Documentation stays in README.md/docs/. English is the default; agents
honor an explicitly requested language without requiring multiple maintained editions or
translation drift machinery. Optional existing prompts and evaluation artifacts remain.
Reserved version-1 fields stay rejected when unsupported, preserving the current CLI contract.

Preserve the original specification/roadmap in history. Current specification/roadmap
supersede their old website/localization requirements, including ADR 0007's planned engine
portion. Historical milestones stay historical. Do not call removed features implemented.

Reorder remaining work into clarity/examples, a practical preview/update journey, and
release confidence. Keep evidence, safe writes, tests, license safeguards, and useful
module boundaries. check/doctor/custom-template/provider expansion is conditional on a
real use case, not mandatory for the first release merely because an older plan listed it.

## Alternatives considered

- Finish the old platform roadmap unchanged: more surface before proving the main user benefit.
- Delete implementation/tests/architecture to make the repository look small: loses safety,
  reproducibility, and substantial existing work without simplifying the actual workflow.
- Fill examples with hypothetical features, badges, or screenshots: violates evidence rules.

## Consequences

A short README and guide route readers to only what they need. Curated examples teach
quality, while small source fixtures and honest CLI previews prevent misleading claims.
Existing architecture documents need scope notes rather than wholesale deletion. Native
platform, package, dependency/license, and operational checks still gate release readiness.
No publication or subsequent runtime feature is authorized merely by changing the roadmap.

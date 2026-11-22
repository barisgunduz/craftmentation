# ADR 0007: Optional proposal providers and source-tracked localization

Status: Accepted as architecture; no provider/localization runtime implemented

## Context

Craftmentation must work without AI keys and remain vendor-neutral. Existing prompts
already provide a human/agent workflow. Translation must preserve technical content,
source provenance, and honest review status. Neither CLI generation nor translation may
implicitly transmit repository information to a service.

## Decision

Keep deterministic analysis/selection/render/validation independent of integrations.
A future provider port accepts an explicitly redacted evidence bundle and returns only
proposed fields/patches and source references. It receives no process/filesystem writer,
never marks its own output verified, and cannot bypass validation or licensing/path rules.
Configuration stores opt-in and a provider ID only; credentials and transmission consent
must be defined by an explicitly implemented integration. No SDK or provider is selected.
Until then, ai.enabled true fails with a capability diagnostic, never an implicit fallback.

Localization settings reserve the existing English canonical/README.<tag>.md convention.
Phase 8 must implement edition path collision checks, source revision/fingerprint tracking,
honest Current/Needs update/Unreviewed status, language navigation, preserved technical
content, and partial-write recovery. Configuration syntax does not imply shipped translations.
The Phase 4 Turkish artifact remains evaluation-only and Unreviewed.

## Alternatives considered

- Build core generation around one model/provider: violates offline and vendor-neutral design.
- Let providers write files: loses deterministic validation and filesystem boundaries.
- Derive translation freshness from modification timestamps: cannot reliably identify source drift.
- Claim human review after machine checks: conflates technical integrity with language review.

## Consequences

Phase 6 rejects valid-but-unimplemented capability settings. Optional integrations can be
added without importing SDKs into core modules or changing existing evidence IDs. Localization
and providers need separate concrete tests and authorization before network or multi-edition
writes occur. The current phase selects boundaries, not a provider or translation engine.

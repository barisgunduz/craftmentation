# ADR 0002: Shared AI workflow policy with thin entry points

Status: Accepted

## Context

Phase 4 must support multiple coding agents without duplicating the documentation
standard or requiring a vendor account/API service. Instruction discovery varies by
client and changes over time. Craftmentation development rules must not be copied as
instructions for repositories that merely adopt the documentation framework.

## Decision

Keep one common workflow policy in `docs/ai-instructions.md`; content and selection
remain governed by the existing standard and library contract. Four task prompts reference
these authorities and add operation-specific steps. AGENTS.md is the development entry
point; CLAUDE.md imports it, while the Copilot file directs explicit reads. Cursor uses
existing AGENTS guidance. No legacy Windsurf-specific adapter is added because the
reviewed documentation route now redirects and legacy behavior was not tested.

Use existing library evidence-record shapes for section selection. Do not preempt Phase 5
with a separate CLI analysis schema. Publish manual walkthrough artifacts and deterministic
regression checks, while distinguishing them from client discovery/model evaluations.
No agent is launched, provider configured, or content transmitted by these files or tests.

## Alternatives considered

- Duplicated rules per vendor: would drift from the authoritative standard and common policy.
- Automatic installation of every vendor adapter: risks overwriting adopter instructions
  and assumes discovery behavior that has not been exercised.
- Mandatory provider calls for tests: would add credentials, cost, nondeterminism, and
  repository-data transmission to an otherwise manual, optional workflow.

## Consequences

Maintainers update one policy and small operation prompts. Explicit context loading is
required when clients do not expand references. Text instructions do not enforce safety;
humans must review claims and diffs. Vendor/runtime compatibility remains unverified
until actually tested. The [integration guide](../ai-integrations.md) records sources,
evaluated mechanisms, and the current verification boundary.

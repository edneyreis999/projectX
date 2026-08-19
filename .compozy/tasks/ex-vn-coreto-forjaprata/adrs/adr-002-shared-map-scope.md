# ADR-002: Protect Future Quest Content on Shared Maps

## Status

Accepted

## Date

2026-08-19

## Context

Map045 hosts the current sling tutorial, later Tordan/Thorin story beats, the
trophy, and other future quest content. The human checkpoint states that scope
belongs to a quest, not to every event on a map.

## Decision

Implementation may change only current-quest event/page spans named by the
tasks. Map045 E8 Tordan/Thorin, the trophy-owned pages, Map049 E2, and unrelated
future quest state remain protected by semantic fingerprints captured before
writing and verified afterward.

## Alternatives Considered

### Alternative 1: Normalize every Gab and state on Map045

- **Description**: apply one broad map rewrite.
- **Pros**: uniform data in one pass.
- **Cons**: changes future quest behavior and invalidates human scope decisions.
- **Why rejected**: same map does not mean same quest scope.

### Alternative 2: Protect only by Git diff review

- **Description**: rely on manual review after the write.
- **Pros**: no validator work.
- **Cons**: large RPG Maker command lists make semantic drift hard to detect.
- **Why rejected**: protection must be machine-checkable.

## Consequences

### Positive

- Current work cannot silently redesign future quests.
- Concurrent user edits are easier to distinguish from task-owned changes.

### Negative

- Broad formatting or map serialization rewrites fail even if JSON stays valid.

### Risks

- A protected fingerprint may include irrelevant editor metadata; validators
  should fingerprint semantic page fields rather than whole-file bytes.

## Implementation Notes

- Capture protected page conditions, triggers, command lists, and relevant
  graphics before mutation.
- Permit user-owned concurrent edits only after explicit classification and
  rebaseline evidence.

## References

- `planos/008-compozy-init/decisoes-consolidadas-p0-p1-p2.md#2-escopo-é-determinado-pela-quest-não-pelo-mapa`

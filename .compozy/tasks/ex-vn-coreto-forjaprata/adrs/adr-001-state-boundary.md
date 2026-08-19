# ADR-001: Separate Canonical Quest Progress from Presentation Staging

## Status

Accepted

## Date

2026-08-19

## Context

`V106 v_qNoiteDaHistoria_stage` is the canonical state source for
`noite-da-historia`, whose declared states are `0`, `10`, `20`, and `90`.
Map045 and Map049 also use values `91`, `92`, `100`, and `110` to stage
metanarrative appearance, fades, and return pages. That overloading breaks the
QuestCore state contract and makes Autorun eligibility and save/load recovery
ambiguous. The approved decision requires separation after inventory and
forbids arbitrary new ID selection.

## Decision

V106 remains exclusively canonical and may change only through QuestCore
transitions. Presentation sequencing uses event-owned self-switch state or an
already-approved state belonging to the quest that owns the behavior. This
feature allocates no new global variable or switch ID.

The implementation inventories every reader and writer of `91`, `92`, `100`,
and `110`, migrates them as one coherent state-machine change, and provides
recovery/terminal page precedence for stale or repeated entry.

## Alternatives Considered

### Alternative 1: Allocate another global staging variable

- **Description**: reserve an empty variable such as V107.
- **Pros**: simple page conditions and shared visibility state.
- **Cons**: selects a new global ID without the required human reservation and
  creates another broadly coupled state source.
- **Why rejected**: violates the approved ID boundary.

### Alternative 2: Keep presentation values in V106

- **Description**: add `91/92/100/110` to the quest registry.
- **Pros**: smallest immediate data diff.
- **Cons**: preserves mixed responsibilities and makes journal progression
  depend on presentation timing.
- **Why rejected**: directly contradicts P2-01.

## Consequences

### Positive

- QuestCore and event page state agree.
- Save/load and reentry have a smaller valid-state surface.
- No new global ID requires reservation.

### Negative

- Several Map045 metanarrative event pages may need coordinated self-switch
  migration.
- Validators must reason about page precedence and event-local state.

### Risks

- Partial migration could leave children visible in the wrong stage; one
  structured writer and cross-event validator mitigate this.

## Implementation Notes

- Preserve `CoretoQuests.json` state graph `0/10/20/90`.
- Fail static validation on any V106 read/write of `91/92/100/110`.
- Do not hard-code stale command indexes; locate commands by semantic anchors.

## References

- `planos/008-compozy-init/decisoes-consolidadas-p0-p1-p2.md#p2-01-----separar-staging-de-cena-do-estado-canônico-de-v106`
- `docs/domains/quest-content-designer/README.md#contrato-canônico-noite-da-história`

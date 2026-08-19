# ADR-003: Delegate Concrete Audio Selection While Preserving Runtime Ownership

## Status

Accepted

## Date

2026-08-19

## Context

Map045 references `Dungeon5`, but no exact-case asset exists in the current BGM
directory. The final human decision delegates the replacement choice to Audio
Design. `Coreto_QuestVN` already captures and restores origin BGM/BGS, so map
events and VN events must not compete for the same transition ownership.

## Decision

An Audio Designer selects and records an existing exact-case replacement based
on the scene's function. Map data references that decision, while
`Coreto_QuestVN` remains the only owner of EX/VN audio restoration. Ambient
children sounds use sparse triggers with cooldown and concurrency limits, and
no essential information depends on hearing them.

## Alternatives Considered

### Alternative 1: Add a placeholder file named Dungeon5

- **Description**: copy or rename an arbitrary track.
- **Pros**: resolves static existence quickly.
- **Cons**: bypasses creative ownership and may create licensing or content
  mismatch.
- **Why rejected**: the decision delegates selection, not placeholder creation.

### Alternative 2: Let each event replay BGM after VN

- **Description**: add explicit BGM commands to return pages.
- **Pros**: visible event-level control.
- **Cons**: duplicates QuestVN restoration and risks abrupt restart/residue.
- **Why rejected**: conflicts with existing ownership.

## Consequences

### Positive

- Every BGM reference resolves and one component owns restoration.
- Sonic decisions remain with the relevant specialty.

### Negative

- Static existence cannot approve transition quality or mix.

### Risks

- The chosen track may still feel wrong or restart at runtime; human Playtest
  remains mandatory.

## Implementation Notes

- Persist the Audio Design decision under `planos/008-compozy-init/builds/`.
- Validate extension and case exactly.
- Do not add one SE per Gab.

## References

- `planos/008-compozy-init/decisoes-consolidadas-p0-p1-p2.md#p0-06-----bgm-dungeon5`

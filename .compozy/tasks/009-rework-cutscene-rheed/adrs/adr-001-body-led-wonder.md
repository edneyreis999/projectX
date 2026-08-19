# ADR-001: Use body-led wonder during Rheed's Gab

## Status

Accepted

## Date

2026-08-19

## Context

Map045 Event 36 currently materializes Rheed and 18 children, shows one Gab, starts a non-blocking pathfinding route, then repeats the full-screen Fog animation during disappearance. The approved design targets an approximately five-second scene that makes the children's wonder legible without turning 18 events into visual noise.

## Decision

Use one full-screen Fog animation only on entry. Keep Rheed's existing line as the only MVP Gab. While that Gab remains visible, E33 briefly looks around and advances one tile toward the house; E26 follows with direction only. Rheed uses a short manual waited route. The controller waits for Gab completion only at the final boundary, then page B performs a short opacity fade and preserves the existing cleanup.

## Alternatives Considered

### Alternative 1: Spoken child reaction

- **Description**: E33 jumps and says “Parece de verdade...”.
- **Pros**: Explicitly names the child's interpretation.
- **Cons**: Adds a second Gab, duplicates body language, and exceeds the five-second target.
- **Why rejected**: Reserved as a Playtest fallback if body language is not understood.

### Alternative 2: Three-child balloon cascade

- **Description**: Three representative children react with staggered jumps and `!` balloons.
- **Pros**: Strong and immediately visible contagion.
- **Cons**: Risks a comic or choreographed tone and competes with the Fog animation and Rheed's Gab.
- **Why rejected**: Retained only as the first visual fallback.

## Consequences

### Positive

- The house remains the focus.
- Wonder is readable without sound or extra dialogue.
- The event has deterministic movement and cleanup boundaries.

### Negative

- The one-tile step may be read as navigation instead of wonder.
- Exact five-second timing still requires browser/editor Playtest.

### Risks

- Gab tag counting can extend automatic retention; local overrides and the final barrier mitigate clipping.
- Existing dirty Map045 changes require a restricted, fail-closed writer.

## Implementation Notes

Do not modify VisuStella plugin source or global Gab parameters. Do not repeat Animation 35 on page B. Preserve all existing Self Switch cleanup targets.

## References

- `planos/009-rework-cutscene-rheed/rework-cutscene-rheed.md`
- `frontend/data/Map045.json`
- `frontend/data/Animations.json`


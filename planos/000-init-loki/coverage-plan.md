# Loki init coverage plan

- Run: `loki-init-20260727-001`
- Mode: `full-init`
- Selected project type: `game-dev`
- Source of truth: Loki manifest plus `loki-init-inventory-contracts.md`
- Initial state: every requirement below is `pending`; only accepted domain packets may advance it.

| Domain | Required requirements (`deep` unless marked `map`) |
| --- | --- |
| `runtime-qa` | `perceivable-surfaces`, `executable-flows`, `input-audio-visual`, `save-load`, `integrations`, `validation-state`, `documented-human-gates` (map) |
| `technical-implementer` | `architecture`, `entry-points`, `modules-scripts` (map), `configuration-dependencies`, `build-test-surfaces`, `source-map` (map) |
| `game-product-owner` | `product-promise`, `current-scope`, `documented-priorities`, `personas-audience`, `milestones`, `roadmap-brief-sources` (map) |
| `game-business-analyst` | `product-objectives`, `declared-audience`, `requirements`, `acceptance-criteria`, `documented-constraints`, `decision-sources` (map) |
| `game-designer` | `core-loop`, `rules-mechanics`, `feedback`, `progression-systems`, `tuning`, `source-map` (map) |
| `narrative-designer` | `characters`, `premise-canon`, `places-lore`, `arcs-dialogue`, `routes-endings`, `source-map` (map) |
| `ux-ui-designer` | `ux-flows`, `hud-menus`, `dialog-boxes-ui-states`, `visual-feedback`, `save-load-ui`, `observed-accessibility`, `source-map` (map) |
| `gameplay-engineer` | `implemented-mechanics`, `state`, `runtime-surfaces` (map), `callers-events`, `save-load`, `integrations`, `source-map` (map) |
| `narrative-qa` | `continuity`, `narrative-flags`, `routes`, `content-regression`, `documented-reachability`, `source-map` (map) |
| `level-designer` | `maps-areas`, `navigation`, `gating-encounters`, `spatial-pacing`, `points-of-interest`, `layout-sources` (map) |
| `balance-economy-designer` | `progression`, `attributes`, `rewards-costs`, `shops-resources`, `sinks-sources`, `numeric-tables` (map), `source-map` (map) |
| `scene-presentation-designer` | `scenes-staging`, `camera-transitions`, `sprites-busts` (map), `backgrounds-cgs` (map), `timing-cues`, `source-map` (map) |
| `audio-designer` | `music`, `ambience`, `sfx`, `audio-assets` (map), `triggers-cues`, `sound-configuration` (map), `source-map` (map) |
| `quest-content-designer` | `quests-objectives`, `npcs-steps`, `rewards`, `flags`, `preconditions`, `postconditions`, `source-map` (map) |
| `technical-artist` | `visual-assets-formats` (map), `animations-effects`, `atlases` (map), `memory-performance`, `asset-runtime-references`, `source-map` (map) |

Terminal rules: `map` accepts `mapped`, `covered`, `not_found`, or `not_applicable`; `deep` accepts `covered`, `not_found`, or `not_applicable`. `pending`, `deferred`, `blocked`, and `mapped` for deep requirements prevent global completion.

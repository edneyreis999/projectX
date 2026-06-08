# Referência Rápida — Notetags

## States (State Notetags)

| Notetag | Descrição |
|---------|-----------|
| `<Hide State Popup>` | Oculta popups do state |
| `<State Popup>` | Customiza popup (cor, flash, duração) |
| `<Add Animation: x>` | Animação ao aplicar state |
| `<Erase Animation: x>` | Animação ao remover state |
| `<Custom Overlay: filename>` | Overlay customizado de `img/system/` |
| `<State Motion: TYPE>` | Define motion do battler |
| `<State Motion Lock>` | Congela animação do battler |
| `<State Tone: r, g, b, gray>` | Coloração (tone) do sprite |
| `<Visual Opacity: x>` | Opacidade (0–255 ou 0%–100%) |
| `<Visual Rainbow: +x>` | Efeito arco-íris (+rápido / -lento) |

## Multi-Tipo (Actor, Class, Skill, Weapon, Armor, Enemy, State)

| Notetag | Descrição |
|---------|-----------|
| `<Repeat Animation: x>` | Animação repetitiva enquanto ativo |
| `<Repeat Animation Cycle: x>` | Frames por ciclo da repeat animation |
| `<Visual Hover Effect>` | Efeito de flutuação (base, speed, rate, death) |
| `<Visual Breathing Effect>` | Efeito de respiração (experimental) |
| `<No Breathing>` | Remove efeito de breathing |

## State Motion Types

`Walk` | `Wait` | `Chant` | `Guard` | `Damage` | `Evade` | `Thrust` | `Swing` | `Missile` | `Skill` | `Spell` | `Item` | `Escape` | `Victory` | `Dying` | `Abnormal` | `Sleep` | `Dead`

## Formatos de Cor

- **Window Skin**: número inteiro (ex: `3`)
- **Custom**: `#rrggbb` (ex: `#abcdef`)
- **Flash**: `r, g, b, a` (0–255 cada)

## Navegação

- [State Notetags →](states.md)
- [Hover →](hover.md)
- [Breathing →](breathing.md)

# Notetags: Inimigos

Inimigos recebem levels. O level e apenas um container numerico util em damage formulas (ex: `a.atk - b.level`).

### `<Level: x>`
- **Usado em**: Enemy Notetags
- Define o level do inimigo
- Default: 1 se nao declarado

### `<param: x>`
- **Usado em**: Enemy Notetags
- Substituir `param` por: `MaxHP`, `MaxMP`, `ATK`, `DEF`, `MAT`, `MDF`, `AGI`, `LUK`
- Sobrescreve o valor do database e pode exceder o limite original
- NAO funciona com X Parameters, S Parameters ou custom parameters
- Se nao usado, usa o valor do database

### `<EXP: x>`
### `<Gold: x>`
- **Usado em**: Enemy Notetags
- Define EXP ou Gold do inimigo
- Sobrescreve o valor do database e pode exceder o limite original
- Se nao usado, usa o valor do database

## Exemplos
```
<Level: 50>
<ATK: 999>
<MaxHP: 50000>
<EXP: 10000>
<Gold: 5000>
```

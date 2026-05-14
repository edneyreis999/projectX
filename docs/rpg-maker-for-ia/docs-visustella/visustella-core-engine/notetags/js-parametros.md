# Notetags: JavaScript Parameters

Para usuarios com conhecimento JavaScript. Permitem codigo dinamico para calcular valores de parametros.

**AVISO**: Se o codigo JavaScript referenciar outras stats do ator (ex: `user.atk`), pode causar loop infinito. Use `user.paramBase(x)` em vez de `user.atk`, `user.def`, etc.

O Plugin Parameter "Convert JS To Base?" converte automaticamente `user.mhp`, `user.mmp`, `user.atk`, etc. para base parameters.

## Basic Parameters

### `<JS param Plus: code>` / `<JS param Rate: code>` / `<JS param Flat: code>` / `<JS param Max: code>`
- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- `param`: `MaxHP`, `MaxMP`, `ATK`, `DEF`, `MAT`, `MDF`, `AGI`, `LUK`
- Variavel `user` refere ao actor atualmente equipando

## X Parameters

### `<JS xparam Plus: code>` / `<JS xparam Rate: code>` / `<JS xparam Flat: code>`
- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- `xparam`: `HIT`, `EVA`, `CRI`, `CEV`, `MEV`, `MRF`, `CNT`, `HRG`, `MRG`, `TRG`
- Variavel `user` refere ao actor atualmente equipando

## S Parameters

### `<JS sparam Plus: code>` / `<JS sparam Rate: code>` / `<JS sparam Flat: code>`
- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- `sparam`: `TGR`, `GRD`, `REC`, `PHA`, `MCR`, `TCR`, `PDR`, `MDR`, `FDR`, `EXR`
- Variavel `user` refere ao actor atualmente equipando

## Exemplo
```
<JS ATK Plus: user.paramBase(3) * 0.5>
```
Isso adicionaria 50% do ATK base como bonus flat ao ATK total.

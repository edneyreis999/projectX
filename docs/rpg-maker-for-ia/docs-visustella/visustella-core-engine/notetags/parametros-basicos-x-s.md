# Notetags: Basic, X, e S Parameters

## Basic Parameters (param)

### `<param Plus: +x>` / `<param Plus: -x>`
- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Substituir `param` por: `MaxHP`, `MaxMP`, `ATK`, `DEF`, `MAT`, `MDF`, `AGI`, `LUK`
- Adiciona/subtrai ao valor 'plus' do calculo total
- Usado na formula: Parameter Settings > Basic Parameter > Formula (parte 'plus')

### `<param Rate: x%>` / `<param Rate: x.x>`
- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Altera a taxa do parametro (150% ou 1.5)
- Usado na formula: Parameter Settings > Basic Parameter > Formula (parte 'paramRate')

### `<param Flat: +x>` / `<param Flat: -x>`
- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Bonus flat ao parametro
- Usado na formula: Parameter Settings > Basic Parameter > Formula (parte 'flatBonus')

### `<param Max: x>`
- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Seta cap maximo para o parametro
- Se multiplos caps existem, o maior e selecionado
- NAO reduz abaixo do cap default

## X Parameters (xparam)

### `<xparam Plus: +x%>` / `<xparam Plus: -x%>` / `<xparam Plus: +x.x>`
### `<xparam Rate: x%>` / `<xparam Rate: x.x>`
### `<xparam Flat: +x%>` / `<xparam Flat: -x%>` / `<xparam Flat: +x.x>`
- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Substituir `xparam` por: `HIT`, `EVA`, `CRI`, `CEV`, `MEV`, `MRF`, `CNT`, `HRG`, `MRG`, `TRG`
- Mesma logica de Plus/Rate/Flat dos Basic Parameters
- Formulas em Parameter Settings > X Parameter > Formula

## S Parameters (sparam)

### `<sparam Plus: +x%>` / `<sparam Plus: -x%>` / `<sparam Plus: +x.x>`
### `<sparam Rate: x%>` / `<sparam Rate: x.x>`
### `<sparam Flat: +x%>` / `<sparam Flat: -x%>` / `<sparam Flat: +x.x>`
- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Substituir `sparam` por: `TGR`, `GRD`, `REC`, `PHA`, `MCR`, `TCR`, `PDR`, `MDR`, `FDR`, `EXR`
- Mesma logica de Plus/Rate/Flat dos Basic Parameters
- Formulas em Parameter Settings > S Parameter > Formula

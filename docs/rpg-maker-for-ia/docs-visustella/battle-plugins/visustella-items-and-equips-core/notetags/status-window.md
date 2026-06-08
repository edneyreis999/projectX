# Notetags: Status Window

Customizam como as informações são exibidas no Shop Status Window. Afetam cenas de Item, Shop e Skill.

---

## `<Status Info>` ... `</Status Info>`

- **Uso**: Skill, Item, Weapon, Armor
- Sobrescreve os dados gerados automaticamente pelo que você especificar

### Keys para Skills e Items

`Consumable`, `Quantity`, `Occasion`, `Scope`, `Speed`, `Success Rate`, `Repeat`, `Hit Type`, `Element`, `Damage Multiplier`, `HP Recovery`, `MP Recovery`, `TP Recovery`, `HP Damage`, `MP Damage`, `TP Damage`, `User TP Gain`, `Added Effects`, `Removed Effects`

### Keys para Weapons e Armors

`MaxHP`, `MaxMP`, `ATK`, `DEF`, `MAT`, `MDF`, `AGI`, `LUK`

Com Core Engine: `HIT`, `EVA`, `CRI`, `CEV`, `MEV`, `MRF`, `CNT`, `HRG`, `MRG`, `TRG`, `TGR`, `GRD`, `REC`, `PHA`, `MCR`, `TCR`, `PDR`, `MDR`, `FDR`, `EXR`

**Nota**: Só funciona com styles "classic" ou "double" para equipamentos

---

## `<Custom Status Info>` ... `</Custom Status Info>`

- **Uso**: Skill, Item, Weapon, Armor
- Adiciona categorias e dados customizados que não são fornecidos pelo Shop Status Window por padrão
- `key` = label exato desejado. `data` = texto exato desejado
- Para weapons/armors, só relevante com Draw Style "classic" ou "double"

```
<Custom Status Info>
 Raridade: ★★★
 Origem: Caverna do Dragão
</Custom Status Info>
```

---

## Status Style

```
<Status Style: Compare>
<Status Style: Classic>
<Status Style: Double>
```

- **Uso**: Weapon, Armor
- Muda como o shop status window exibe dados para este objeto específico

| Style | Descrição |
|-------|-----------|
| Compare | Compara equip selecionado com o equipado. Lista actors do party. Calcula JS values customizados |
| Classic | Parâmetros básicos do equip. Sem actors. Não mostra JS values nem custom params |
| Double | Parâmetros em colunas duplas. Sem actors. Não mostra JS values nem custom params |

---

## `<Custom Status Parameters: name, name, ...>`

- **Uso**: Weapon, Armor
- **Requer**: VisuMZ_0_CoreEngine
- Customiza quais parâmetros são exibidos para este equipamento no shop status window
- Nomes disponíveis: `MaxHP`, `MaxMP`, `ATK`, `DEF`, `MAT`, `MDF`, `AGI`, `LUK`, `HIT`, `EVA`, `CRI`, `CEV`, `MEV`, `MRF`, `CNT`, `HRG`, `MRG`, `TRG`, `TGR`, `GRD`, `REC`, `PHA`, `MCR`, `TCR`, `PDR`, `MDR`, `FDR`, `EXR`
- Não funciona com parâmetros customizados (calculados por actor)
- Parâmetros exibidos na ordem inserida

---

## Shop Picture

### `<Shop Picture Name: filename>`

- **Uso**: Skill, Item, Weapon, Armor
- Habilita imagem no status window (item scene, shop scene, skill scene)
- `filename` = nome do arquivo em `img/pictures/` (sem extensão, case-sensitive)

### `<Shop Picture Layer: Background>` / `<Shop Picture Layer: Foreground>`

- Determina se a imagem fica atrás (Background) ou na frente (Foreground) do texto
- Default: Background

### Dimensões

```
<Shop Picture Max Width: x>
<Shop Picture Max Height: y>
<Shop Picture Max Dimensions: x, y>
```

- Dimensões máximas em pixels. Imagem é escalada proporcionalmente
- Default: dimensões do shop status window

### Alinhamento

```
<Shop Picture Alignment: Left>
<Shop Picture Alignment: Center>
<Shop Picture Alignment: Right>
```
- Default: Center

### Posição

```
<Shop Picture Position: Top>
<Shop Picture Position: Middle>
<Shop Picture Position: Bottom>
```
- Default: Middle

### Offset

```
<Shop Picture Offset X: +x>
<Shop Picture Offset X: -x>
<Shop Picture Offset Y: +y>
<Shop Picture Offset Y: -y>
<Shop Picture Offset: +x, +y>
```
- Pixels de deslocamento. Positivo = direita/baixo. Negativo = esquerda/cima

### Opacidade

```
<Shop Picture Opacity: x>
<Shop Picture Opacity: x%>
```
- `x`: 0 (transparente) a 255 (opaco)
- `x%`: 0% (transparente) a 100% (opaco)

---

## Veja Também

- [notetags/gerais.md](gerais.md) - Notetags gerais
- [notetags/equipment.md](equipment.md) - Notetags de equipamento
- [parametros/shop-status-window.md](../parametros/shop-status-window.md) - Configuração do Status Window

# Notetags: Status Window

Notetags que afetam o Shop Status Window - customização de dados exibidos e imagens.

---

## Status Info (Override)

```
<Status Info>
 key: data
 key: data
</Status Info>
```

- **Usado em**: Skill, Item, Weapon, Armor
- Sobrescreve dados gerados automaticamente pelo Status Window
- Só afeta entradas já visíveis, não cria novas categorias

### Keys para Skills e Itens

Consumable, Quantity, Occasion, Scope, Speed, Success Rate, Repeat, Hit Type, Element, Damage Multiplier, HP Recovery, MP Recovery, TP Recovery, HP Damage, MP Damage, TP Damage, User TP Gain, Added Effects, Removed Effects

### Keys para Weapons e Armors

- Base params: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK
- Com Core Engine: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG, TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR
- Relevante apenas com Draw Style "classic" ou "double"

### Nota sobre Damage Multiplier

- "Damage Multiplier" = quantidade determinada por fórmulas de dano
- "HP Recovery"/"HP Damage" = efeito "Recover HP" do database

---

## Custom Status Info (Adicionar)

```
<Custom Status Info>
 key: data
 key: data
</Custom Status Info>
```

- **Usado em**: Skill, Item, Weapon, Armor
- Adiciona categorias e dados customizados não fornecidos pelo Status Window
- Para weapons/armors: relevante apenas com Draw Style "classic" ou "double"
- Aceita text codes em key e data

---

## Status Style

```
<Status Style: Compare>
<Status Style: Classic>
<Status Style: Double>
```

- **Usado em**: Weapon, Armor
- Muda o estilo de exibição do shop status window para este item específico

| Estilo | Atores | Params | JS Custom | Params Custom |
|--------|--------|--------|-----------|---------------|
| Compare | Lista todos do party | Diferenças ao equipar | Sim | Sim |
| Classic | Nenhum | Básicos do item | Não | Não |
| Double | Nenhum | Básicos em dupla coluna | Não | Não |

---

## Custom Status Parameters

```
<Custom Status Parameters: name, name, name>
```

- **Usado em**: Weapon, Armor
- **Requer** VisuMZ_0_CoreEngine
- Customiza quais parâmetros são exibidos no shop status window
- Nomes válidos: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK, HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG, TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR
- Não funciona com parâmetros customizados (calculados por ator)
- Parâmetros exibidos na ordem inserida

---

## Shop Picture (Imagem no Status Window)

### Imagem Base

```
<Shop Picture Name: filename>
```

- **Usado em**: Skill, Item, Weapon, Armor
- Habilita imagem no status window (item scene, shop scene, skill scene)
- Arquivo de `img/pictures/` (sem extensão, case-sensitive)
- Default: sem imagem

### Camada

```
<Shop Picture Layer: Background>
<Shop Picture Layer: Foreground>
```

- Background = atrás do texto (default)
- Foreground = na frente do texto

### Dimensões Máximas

```
<Shop Picture Max Width: x>
<Shop Picture Max Height: y>
<Shop Picture Max Dimensions: x, y>
```

- Escala proporcional automática
- Default: dimensões do shop status window

### Alinhamento Horizontal

```
<Shop Picture Alignment: Left>
<Shop Picture Alignment: Center>
<Shop Picture Alignment: Right>
```

- Default: Center

### Posição Vertical

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
- Sinais `+` e `-` são obrigatórios

### Opacidade

```
<Shop Picture Opacity: x>
<Shop Picture Opacity: x%>
```

- Absoluto: 0 (transparente) a 255 (opaco)
- Percentual: 0% a 100%

---

## Veja Também

- [Shop Status Window (Conceito)](../conceitos/shop-status-window.md)
- [Shop Status Window Parameters](../parametros/shop-status-window.md)

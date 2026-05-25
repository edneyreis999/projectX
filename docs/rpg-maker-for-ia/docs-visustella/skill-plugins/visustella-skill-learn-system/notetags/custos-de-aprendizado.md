# Notetags - Custos de Aprendizado

## Custos Fixos

### `<Learn AP Cost: x>`
- **Uso**: Skill Notetags
- Custo em Ability Points para aprender a skill.
- Se ausente, usa o padrao dos Plugin Parameters.

### `<Learn SP Cost: x>`
- **Uso**: Skill Notetags
- Custo em Skill Points para aprender a skill.
- Se ausente, usa o padrao dos Plugin Parameters.

### `<Learn Gold Cost: x>`
- **Uso**: Skill Notetags
- Custo em Gold para aprender a skill.
- Se ausente, usa o padrao dos Plugin Parameters.

### `<Learn CP Cost: x>`
- **Uso**: Skill Notetags
- **Requer**: VisuMZ_2_ClassChangeSystem
- Custo em Class Points para aprender a skill.

### `<Learn JP Cost: x>`
- **Uso**: Skill Notetags
- **Requer**: VisuMZ_2_ClassChangeSystem
- Custo em Job Points para aprender a skill.

---

## Custos com Items

### `<Learn Item id Cost: x>`
### `<Learn Item name Cost: x>`
- **Uso**: Skill Notetags
- Consome `x` unidades do item especificado.
- Multiplas entradas permitidas para custos compostos.

### `<Learn Weapon id Cost: x>`
### `<Learn Weapon name Cost: x>`
- **Uso**: Skill Notetags
- Consome `x` unidades da arma especificada.

### `<Learn Armor id Cost: x>`
### `<Learn Armor name Cost: x>`
- **Uso**: Skill Notetags
- Consome `x` unidades do equipamento especificado.

---

## Custo Composto (Multi-linha)

### `<Learn Skill Costs>`
```
 AP: x
 SP: x
 Item id: x
 Item name: x
 Weapon id: x
 Weapon name: x
 Armor id: x
 Armor name: x
 Gold: x
</Learn Skill Costs>
```

- **Uso**: Skill Notetags
- Define todos os custos em uma unica notetag.
- Permite multiplas entradas de items, weapons e armors.

---

## Custos Dinamicos (JavaScript)

### `<JS Learn AP Cost>`
```
 code
 cost = code;
</JS Learn AP Cost>`
```
- **Uso**: Skill Notetags
- Retorna o custo dinamico de AP.
- **Variaveis**: `user` (ator), `skill` (skill sendo aprendida).
- **Retorno**: `cost` (numero).
- Se `<Learn AP Cost: x>` existir, esta notetag e ignorada.

### `<JS Learn SP Cost>`
- Mesmo formato, para custo dinamico de SP.
- **Variaveis**: `user`, `skill`. **Retorno**: `cost`.

### `<JS Learn CP Cost>`
- **Requer**: VisuMZ_2_ClassChangeSystem
- Custo dinamico de Class Points.
- **Variaveis**: `user`, `skill`. **Retorno**: `cost`.

### `<JS Learn JP Cost>`
- **Requer**: VisuMZ_2_ClassChangeSystem
- Custo dinamico de Job Points.
- **Variaveis**: `user`, `skill`. **Retorno**: `cost`.

---

## Referencia Rapida de Custos

| Notetag | Tipo | Requer Plugin Extra |
|---------|------|---------------------|
| `<Learn AP Cost: x>` | Fixo AP | Nao |
| `<Learn SP Cost: x>` | Fixo SP | Nao |
| `<Learn Gold Cost: x>` | Fixo Gold | Nao |
| `<Learn CP Cost: x>` | Fixo CP | Sim (ClassChangeSystem) |
| `<Learn JP Cost: x>` | Fixo JP | Sim (ClassChangeSystem) |
| `<Learn Item id Cost: x>` | Fixo Item | Nao |
| `<Learn Weapon id Cost: x>` | Fixo Weapon | Nao |
| `<Learn Armor id Cost: x>` | Fixo Armor | Nao |
| `<Learn Skill Costs>` | Composto | Nao |
| `<JS Learn AP Cost>` | Dinamico AP | Nao |
| `<JS Learn SP Cost>` | Dinamico SP | Nao |
| `<JS Learn CP Cost>` | Dinamico CP | Sim (ClassChangeSystem) |
| `<JS Learn JP Cost>` | Dinamico JP | Sim (ClassChangeSystem) |

# Notetags - Skill Costs

Notetags para customizar custos de skills. Alguns funcionalidades podem ser alteradas via Plugin Parameters > Skill Cost Types.

---

## Custos de Recurso (Skill)

```
<type Cost: x>
<type Cost: x%>
```

- **Usado em**: Skill Notetags
- Define custo de um resource type
- `type` = HP, MP, TP, Gold, Potion (ou custom)
- `x` = valor fixo | `x%` = percentual do máximo
- Bypassa limites do Database Editor (9,999 MP / 100 TP)

**Exemplos**:
```
<HP Cost: 500>
<MP Cost: 25%>
<Gold Cost: 3000>
<Potion Cost: 5>
```

---

## Min/Max de Custo (Skill)

```
<type Cost Max: x>
<type Cost Min: x>
```

- **Usado em**: Skill Notetags
- Limita custos condicionais e percentuais
- `type` = HP, MP, TP, Gold, Potion, etc.

**Exemplos**:
```
<HP Cost Max: 1500>
<MP Cost Min: 5>
```

---

## Modificadores de Custo (Trait Objects)

```
<type Cost: +x>
<type Cost: -x>
<type Cost: x%>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Modifica custo de skills que usam `type` cost
- `%` é aplicado ANTES de `+/-`
- `+/-` é flat value, aplicado DEPOIS de `%`

**Exemplos**:
```
<HP Cost: +20>
<MP Cost: -10>
<Gold Cost: 50%>
```

---

## Custom Cost Text

```
<Custom Cost Text>
 text
</Custom Cost Text>
```

- **Usado em**: Skill Notetags
- Adiciona texto customizado ao final da área de custos
- Suporta text codes

---

## JS Cost Calculation (Skill)

```
<JS type Cost>
 code
 cost = code;
</JS type Cost>
```

- **Usado em**: Skill Notetags
- `type` = HP, MP, TP, Gold, Potion, etc.
- Variáveis disponíveis:
  - `user` - quem vai usar a skill
  - `skill` - a skill sendo usada
- Resultado final em `cost`

---

## Item Cost (Skill)

```
<Item Cost: x name>
<Weapon Cost: x name>
<Armor Cost: x name>
```

- **Usado em**: Skill Notetags
- Consome items/weapons/armors para usar a skill
- **Mesmo items não-consumíveis são consumidos**
- Múltiplas notetags para múltiplos itens

**Exemplos**:
```
<Item Cost: 5 Magic Water>
<Weapon Cost: 1 Short Sword>
<Armor Cost: 3 Cloth Armor>
```

---

## Item Cost Min/Max (Skill)

```
<Item Cost Max: x name>
<Item Cost Min: x name>
<Weapon Cost Max: x name>
<Weapon Cost Min: x name>
<Armor Cost Max: x name>
<Armor Cost Min: x name>
```

- **Usado em**: Skill Notetags

---

## Item Cost Modifiers (Trait Objects)

```
<Item Cost: +x name>
<Item Cost: -x name>
<Item Cost: x% name>
<Weapon Cost: +x name>
<Weapon Cost: -x name>
<Weapon Cost: x% name>
<Armor Cost: +x name>
<Armor Cost: -x name>
<Armor Cost: x% name>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- `%` aplicado antes de `+/-`

**Exemplos**:
```
<Item Cost: +1 Magic Water>
<Weapon Cost: 50% Short Sword>
<Armor Cost: 200% Cloth Armor>
```

---

## Item Cost Replacement (Trait Objects)

```
<Replace Item name1 Cost: name2>
<Replace Weapon name1 Cost: name2>
<Replace Armor name1 Cost: name2>
```

- **Usado em**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Redireciona consumo: em vez de `name1`, consome `name2`

**Exemplos**:
```
<Replace Item Magic Water Cost: Potion>
<Replace Weapon Short Sword Cost: Falchion>
```

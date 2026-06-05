# Notetags - Aggro

Notetags relacionadas ao sistema de Aggro do Aggro Control System.

---

## Aggro do Usuario (Skills/Items)

### `<User Aggro: +x>` / `<User Aggro: -x>`

- **Uso**: Skill, Item Notetags
- **Efeito**: Ao usar esta acao, aumenta/diminui o aggro do usuario em `x`.
- **Frequencia**: Aplica **1 vez por uso**, independente do numero de hits bem-sucedidos.

```
<User Aggro: +50>
<User Aggro: -30>
```

---

## Aggro do Alvo (Skills/Items)

### `<Target Aggro: +x>` / `<Target Aggro: -x>`

- **Uso**: Skill, Item Notetags
- **Efeito**: Ao usar esta acao, aumenta/diminui o aggro do alvo em `x`.
- **Frequencia**: Aplica **multiplas vezes**, baseado no numero de hits bem-sucedidos.

```
<Target Aggro: +20>
<Target Aggro: -50>
```

**Atencao**: Skills multi-hit com `<Target Aggro>` acumulam por hit. Uma skill 3x com `<Target Aggro: +20>` adiciona +60 total.

---

## Aggro Passivo (Trait Objects)

### `<Aggro: +x>` / `<Aggro: -x>`

- **Uso**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Efeito**: A unidade afetada tem aggro passivo aumentado/diminuido em `x`, independente do aggro acumulado em batalha.

```
// Arma de tanque
<Aggro: +100>

// Armadura furtiva
<Aggro: -50>
```

---

## Multiplicador de Aggro

### `<Aggro Multiplier: x%>`

- **Uso**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Efeito**: Multiplica o aggro percebido da unidade por `x%`.
- **Acumulacao**: Multiplos multiplicadores em diferentes trait objects sao **multiplicativos** (nao aditivos).

```
// Dobro de aggro
<Aggro Multiplier: 200%>

// Metade do aggro
<Aggro Multiplier: 50%>
```

**Exemplo de acumulacao**:
- Weapon com 150% + State com 150% = 150% * 150% = **225%** (nao 300%)

---

## Controle de Targeting

### `<Target Highest Aggro>`

- **Uso**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- **Efeito**:
  - Em Skills/Items: A acao SEMPRE seleciona o alvo com maior aggro
  - Em Trait Objects: A unidade SEMPRE seleciona o alvo com maior aggro (para AI)
- **Override**: Ignorado se `<Bypass Highest Aggro>` existir

```
// Boss que foca o tanque
<Target Highest Aggro>
```

### `<Bypass Highest Aggro>` (Trait Objects)

- **Uso**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- **Efeito**:
  - Em Skills/Items: A acao decide alvos por peso de aggro em vez de sempre o maior
  - Em Trait Objects: A unidade decide alvos por peso em vez de sempre o maior

```
// Skill que ignora a regra de "sempre o maior"
<Bypass Highest Aggro>
```

### `<Bypass Highest Aggro>` (Skills/Items)

- **Uso**: Skill, Item Notetags
- **Efeito**: A acao ignora efeitos de "target highest aggro" e foca por peso.

---

## Resumo Rapido

| Notetag | Onde Usa | Aplicacao |
|---------|----------|-----------|
| `<User Aggro: +x>` | Skill, Item | +x aggro ao usuario (1x por uso) |
| `<Target Aggro: +x>` | Skill, Item | +x aggro ao alvo (por hit) |
| `<Aggro: +x>` | Trait Objects | +x aggro passivo |
| `<Aggro Multiplier: x%>` | Trait Objects | Multiplica aggro percebido |
| `<Target Highest Aggro>` | Todos | Forca focar maior aggro |
| `<Bypass Highest Aggro>` | Todos | Ignora "sempre maior", usa peso |

Veja tambem [JavaScript Notetags](./javascript-aggro.md) para logica dinamica.

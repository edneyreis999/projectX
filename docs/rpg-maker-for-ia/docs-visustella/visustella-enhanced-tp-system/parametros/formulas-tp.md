# Parâmetros - Fórmulas TP

> Configuração completa de quando e quanto TP é ganho em cada situação.

## Visão Geral

Cada TP Mode tem **fórmulas de ganho de TP** que determinam quanto TP é adquirido em diversas situações. Todas as fórmulas usam **JavaScript**.

## Variáveis Disponíveis

| Variável | Descrição |
|----------|-----------|
| `user` | O battler ganhando TP |
| `target` | O alvo da ação (quando aplicável) |
| `value` | Valor do dano/cura (quando aplicável) |
| `a`, `b`, `c`... | Membros da party (contexto dependente) |

## Categorias de Fórmulas

---

## 1. Generic

São eventos únicos que geram TP.

### Initial TP

**Quando:** No início da batalha.

**Variáveis:** `user`

**Exemplos:**
```
0                    (não ganha nada)
10                   (ganha 10 TP fixo)
user.level * 2       (2 TP por nível)
rand(10) + 5         (5-14 TP aleatório)
```

**Nota:** Aplica-se mesmo se `Preserve TP? = ON` (o valor é aplicado, não adicionado).

---

### Critical Hit

**Quando:** O battler causa um golpe crítico.

**Variáveis:** `user`, `target`

**Exemplos:**
```
10                   (10 TP por crítico)
20                   (20 TP por crítico)
user.level           (TP igual ao nível)
```

---

### Evasion

**Quando:** O battler esquiva uma ação.

**Variáveis:** `user`

**Exemplos:**
```
5                    (5 TP por esquiva)
10                   (10 TP por esquiva)
15                   (15 TP por esquiva)
```

---

### Use Item

**Quando:** O battler usa um item em batalha.

**Variáveis:** `user`, `item`

**Exemplos:**
```
5                    (5 TP por item)
10                   (10 TP por item)
0                    (não ganha TP)
```

---

### Use Skill

**Quando:** O battler usa uma skill que NÃO é Attack ou Guard.

**Variáveis:** `user`, `skill`

**Exemplos:**
```
10                   (10 TP por skill)
skill.tpCost * 0.5   (metade do custo de volta)
5                    (5 TP fixo)
```

---

## 2. During Regen

Ganho de TP durante a fase de regeneração de cada turno.

### TP Regen

**Quando:** A cada turno durante regeneração.

**Variáveis:** `user`

**Exemplos:**
```
5                    (5 TP por turno)
10                   (10 TP por turno)
user.level / 2       (metade do nível por turno)
```

---

### Critical HP

**Quando:** Durante regeneração, se HP está crítico (≤25%).

**Variáveis:** `user`

**Exemplos:**
```
10                   (+10 TP se HP crítico)
20                   (+20 TP se HP crítico)
```

**Nota:** Somado ao TP Regen normal.

---

### Full HP

**Quando:** Durante regeneração, se HP está cheio (100%).

**Variáveis:** `user`

**Exemplos:**
```
5                    (+5 TP se HP cheio)
10                   (+10 TP se HP cheio)
```

---

### Critical MP

**Quando:** Durante regeneração, se MP está crítico (≤25%).

**Variáveis:** `user`

**Exemplos:**
```
5                    (+5 TP se MP crítico)
```

---

### Full MP

**Quando:** Durante regeneração, se MP está cheio (100%).

**Variáveis:** `user`

**Exemplos:**
```
3                    (+3 TP se MP cheio)
```

---

### Only Member

**Quando:** Durante regeneração, se é o **único** membro vivo da party.

**Variáveis:** `user`

**Exemplos:**
```
20                   (+20 TP se solo)
50                   (+50 TP se solo)
```

---

## 3. HP Damage

Ganho de TP relacionado a dano de HP.

### Take HP Damage

**Quando:** O battler **recebe** dano de HP.

**Variáveis:** `user`, `value` (dano recebido)

**Exemplos:**
```
value / 10           (1 TP a cada 10 de dano)
value / 5            (1 TP a cada 5 de dano)
Math.min(value, 20)  (TP igual ao dano, máx 20)
```

---

### Deal HP Damage

**Quando:** O battler **causa** dano de HP.

**Variáveis:** `user`, `value` (dano causado)

**Exemplos:**
```
value / 10           (1 TP a cada 10 de dano)
value / 20           (1 TP a cada 20 de dano)
Math.min(value, 15)  (TP igual ao dano, máx 15)
```

---

### Ally HP Damage

**Quando:** Um **aliado** recebe dano de HP.

**Variáveis:** `user`, `value` (dano recebido pelo aliado)

**Exemplos:**
```
value / 20           (1 TP a cada 20 de dano em aliado)
0                    (não ganha TP)
```

---

## 4. HP Heal

Ganho de TP relacionado a cura de HP.

### Take HP Heal

**Quando:** O battler **recebe** cura de HP.

**Variáveis:** `user`, `value` (cura recebida)

**Exemplos:**
```
value / 20           (1 TP a cada 20 de cura)
0                    (não ganha TP)
```

---

### Deal HP Heal

**Quando:** O battler **causa** cura de HP.

**Variáveis:** `user`, `value` (cura causada)

**Exemplos:**
```
value / 10           (1 TP a cada 10 de cura)
value / 15           (1 TP a cada 15 de cura)
```

---

### Ally HP Heal

**Quando:** Um **aliado** recebe cura de HP.

**Variáveis:** `user`, `value` (cura recebida pelo aliado)

**Exemplos:**
```
value / 25           (1 TP a cada 25 de cura em aliado)
```

---

## 5. MP Damage

Mesma estrutura que HP Damage, mas para MP.

- **Take MP Damage**: `value / 10`
- **Deal MP Damage**: `value / 15`
- **Ally MP Damage**: `value / 20`

---

## 6. MP Heal

Mesma estrutura que HP Heal, mas para MP.

- **Take MP Heal**: `value / 20`
- **Deal MP Heal**: `value / 10`
- **Ally MP Heal**: `value / 25`

---

## 7. Buffs

Ganho de TP ao aplicar/receber buffs.

### Deal Ally Buff

**Quando:** Aplica buff em **aliado** via Item/Skill Effect.

**Variáveis:** `user`

**Exemplos:**
```
5                    (5 TP por buff aplicado)
10                   (10 TP por buff aplicado)
```

**Nota:** "Code" não conta, apenas Effects do database.

---

### Deal Enemy Buff

**Quando:** Aplica buff em **inimigo** via Item/Skill Effect.

**Exemplos:**
```
0                    (normalmente 0, buffar inimigo é ruim)
```

---

### Gain Ally Buff

**Quando:** Recebe buff de **aliado**.

**Exemplos:**
```
5                    (5 TP por buff recebido)
```

---

### Gain Enemy Buff

**Quando:** Recebe buff de **inimigo**.

**Exemplos:**
```
0                    (normalmente 0)
```

---

## 8. Debuffs

Mesma estrutura que Buffs, mas para debuffs.

- **Deal Ally Debuff**: Normalmente `0` (não quer debuffar aliado)
- **Deal Enemy Debuff**: `5` ou `10` (recompensa por debuffar inimigo)
- **Gain Ally Debuff**: `0` (penalizado por ser debuffado)
- **Gain Enemy Debuff**: `0` (normalmente 0)

---

## 9. States

Ganho de TP ao aplicar/receber states.

### Deal Ally State

**Quando:** Aplica state em **aliado**.

**Exemplos:**
```
0                    (normalmente 0)
5                    (se for state benéfico)
```

---

### Deal Enemy State

**Quando:** Aplica state em **inimigo**.

**Exemplos:**
```
5                    (5 TP por state aplicado)
10                   (10 TP por state aplicado)
state.value || 5     (valor do state ou 5)
```

---

### Gain Ally State

**Quando:** Recebe state de **aliado**.

**Exemplos:**
```
0                    (normalmente 0)
```

---

### Gain Enemy State

**Quando:** Recebe state de **inimigo**.

**Exemplos:**
```
0                    (normalmente 0)
```

---

## 10. Death

Ganho de TP quando battlers morrem.

### Ally Death

**Quando:** Um **aliado** morre (qualquer que seja o killer).

**Variáveis:** `user`

**Exemplos:**
```
0                    (não ganha nada por aliado morrer)
20                   (ganha TP vingativo)
50                   (ganha muito TP quando aliado morre)
```

---

### Enemy Death

**Quando:** Um **inimigo** morre (qualquer que seja o killer).

**Variáveis:** `user`

**Exemplos:**
```
10                   (10 TP por inimigo morto)
20                   (20 TP por inimigo morto)
enemy.level * 2      (TP baseado no nível do inimigo)
```

---

## 11. Battle

Ganho de TP ao finalizar batalha.

### Win Battle

**Quando:** Jogador **vence** a batalha.

**Exemplos:**
```
0                    (não ganha nada)
20                   (20 TP por vitória)
50                   (50 TP por vitória)
```

---

### Flee Battle

**Quando:** Jogador **foge** da batalha.

**Exemplos:**
```
0                    (não ganha nada)
```

---

### Lose Battle

**Quando:** Jogador **perde** a batalha.

**Exemplos:**
```
0                    (normalmente 0)
```

---

## Exemplos Completos por Modo

### Momentum (Filena)

```
Generic
  Initial TP: 0
  Critical Hit: 10
  Evasion: 10
  Use Item: 0
  Use Skill: 10

During Regen
  TP Regen: 5
  Critical HP: 10
  Full HP: 0
  Critical MP: 0
  Full MP: 0
  Only Member: 20

HP Damage
  Take HP Damage: value / 20
  Deal HP Damage: value / 10
  Ally HP Damage: 0

HP Heal
  Take HP Heal: value / 50
  Deal HP Heal: 0
  Ally HP Heal: 0

MP Damage/Heal: Todos 0

Buffs
  Deal Ally Buff: 5
  Deal Enemy Buff: 0
  Gain Ally Buff: 0
  Gain Enemy Buff: 0

Debuffs
  Deal Ally Debuff: 0
  Deal Enemy Debuff: 5
  Gain Ally Debuff: 0
  Gain Enemy Debuff: 0

States
  Deal Ally State: 0
  Deal Enemy State: 10
  Gain Ally State: 0
  Gain Enemy State: 0

Death
  Ally Death: 0
  Enemy Death: 15

Battle
  Win Battle: 0
  Flee Battle: 0
  Lose Battle: 0
```

### Guarda (Kilin)

```
Generic
  Initial TP: 0
  Critical Hit: 5
  Evasion: 5
  Use Item: 0
  Use Skill: 5

During Regen
  TP Regen: 3
  Critical HP: 0
  Full HP: 5
  Critical MP: 0
  Full MP: 0
  Only Member: 30

HP Damage
  Take HP Damage: value / 5    (ganha muito ao tomar dano)
  Deal HP Damage: value / 20
  Ally HP Damage: value / 5    (ganha quando aliado toma dano)

HP Heal
  Take HP Heal: value / 30
  Deal HP Heal: value / 15
  Ally HP Heal: value / 10

MP Damage/Heal: Todos 0

Buffs: Todos 5 (proteger gera TP)

Debuffs: Deal Enemy Debuff: 5

States: Deal Enemy State: 5

Death
  Ally Death: 20              (vingança quando aliado morre)
  Enemy Death: 10

Battle: Win Battle: 10
```

---

## Ver Também

- [Modos TP](modos-tp.md) - Configuração geral de TP Modes
- [Mudanças Core](../conceitos/mudancas-core.md) - Como fórmulas substituem sistema nativo
- [Notetags Gerais](../notetags/gerais.md) - Aplicar TP Modes

# Passive States - Esclarecimentos

Passive States são um conceito fundamental do Skills & States Core que gera confusão frequente. Este documento esclarece as diferenças mecânicas entre states regulares e passive states.

---

## Conceito Fundamental

Passive States são states **sempre aplicados** a actors/enemies, desde que suas condições sejam atendidas. Podem ser concedidos por:
- Database objects (Actor, Class, Skill, Weapon, Armor, Enemy)
- Plugin Parameters (Global, Actor-Only, Enemy Passives)

---

## Diferença: States Regulares vs. Passive States

| Aspecto | State Regular | Passive State |
|---------|--------------|---------------|
| Aplicação | Direta (via skill/item/event) | Indireta (via traits/parameters) |
| `isStateAffected(id)` | `true` | **`false`** - NÃO detecta! |
| `a.states().includes($dataStates[id])` | `true` | `true` - Detecta ambos |
| Conditional Branch check | Funciona | **NÃO funciona** |
| `addState` / `eraseState` / `removeState` | Funciona | **NÃO funciona** |
| Turnos / Steps | Afetado | **NÃO afetado** |
| Condições de remoção | Aplicam | **NÃO aplicam** |
| JS On Add/Erase/Expire | Dispara | **NÃO dispara** |

---

## Analogia: Skills

A diferença é análoga a como skills funcionam:

- **Skill aprendida** (direta) - Via level/item/event
- **Skill temporária** (indireta) - Via trait de equip/state

Ambas concedem a skill, mas mecanicamente são diferentes. O mesmo princípio se aplica a states regulares vs. passive states.

---

## Como Verificar Passive States em Código

### ERRADO (não detecta passivos)
```javascript
a.isStateAffected(10)
// Retorna FALSE para passive states!
```

### CORRETO (detecta ambos)
```javascript
a.states().includes($dataStates[10])
// Retorna TRUE para states regulares E passive states
```

---

## Limitações de JS Passive Conditions

O `<JS Passive Condition>` notetag tem **failsafes** contra loops infinitos. As seguintes condições **NÃO funcionam**:

- Passive state que requer outro passive state
- Passive state que requer trait effect de outro state
- Passive state que requer parâmetro alterado por outro state
- Passive state que requer equip cujo tipo de acesso vem de outro state
- Qualquer cadeia circular similar

Estas limitações são **intencionais** e **não são bugs**.

---

## Passive States e Slip Damage

- Passive states com `<JS type Slip Damage>` ou `<JS type Slip Heal>` são **exempt** do cache de one-time calculation
- O cálculo é **re-executado** a cada regeneration phase
- States comuns têm o cálculo feito uma vez e cached

Para forçar recálculo em states não-passivos, use `<JS Slip Refresh>`.

---

## Fluxo de Condições Passivas

```
Passive State registrado
    │
    ├─ Verificar source (Actor/Class/Weapon/etc.)
    │
    ├─ Verificar Passive Condition Class
    │   └─ Se falhar: state NÃO aplicado
    │
    ├─ Verificar Passive Condition Switch ON/OFF
    │   └─ Se falhar: state NÃO aplicado
    │
    ├─ Verificar JS Passive Condition (se existir)
    │   └─ Se falhar: state NÃO aplicado
    │   └─ Failsafe: não permite dependência circular
    │
    └─ Todas as condições OK → State aplicado como passive
```

---

## Cache e Refresh

Os Plugin Parameters incluem opções de cache:

| Parâmetro | Padrão | Efeito |
|-----------|--------|--------|
| **Switch Refresh?** | false | Refresh members quando switches mudam em battle |
| **Variable Refresh?** | false | Refresh members quando variables mudam em battle |

**Atenção**: Manter estas opções ON e fazer spam de switch/variable changes durante battle causa **lag spikes**.

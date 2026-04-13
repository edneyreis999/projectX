# Plugin Parameters - Buff/Debuff Settings

Configurações para buffs e debuffs. Embora não sejam states por mecânica do RMMZ, são gerenciados por este plugin.

---

## General

| Parâmetro | Descrição | Opções |
|-----------|-----------|--------|
| **Reapply Rules** | Regras ao reaplicar buffs/debuffs | Ignore, Reset, Greater, Add |
| **Maximum Turns** | Máximo de turnos para buffs/debuffs | Número |

---

## Stacking

| Parâmetro | Descrição |
|-----------|-----------|
| **Max Stacks: Buff** | Máximo de stacks de buff |
| **Max Stacks: Debuff** | Máximo de stacks de debuff |
| **JS: Buff/Debuff Rate** | Código para determinar quanto buffs/debuffs afetam parâmetros |

---

## Turn Display

| Parâmetro | Descrição |
|-----------|-----------|
| **Show Turns?** | Exibir turnos em window icons e sprites |
| **Turn Font Size** | Tamanho da fonte |
| **Offset X** | Deslocamento horizontal |
| **Offset Y** | Deslocamento vertical |
| **Turn Color: Buffs** | Cor para buffs (número ou `#rrggbb`) |
| **Turn Color: Debuffs** | Cor para debuffs |

---

## Rate Display

| Parâmetro | Descrição |
|-----------|-----------|
| **Show Rate?** | Exibir rate em window icons e sprites |
| **Rate Font Size** | Tamanho da fonte |
| **Offset X** | Deslocamento horizontal |
| **Offset Y** | Deslocamento vertical |

---

## Global JS Effects

| Parâmetro | Descrição |
|-----------|-----------|
| **JS: On Add Buff** | Código global ao adicionar buff |
| **JS: On Add Debuff** | Código global ao adicionar debuff |
| **JS: On Erase Buff** | Código global ao apagar buff |
| **JS: On Erase Debuff** | Código global ao apagar debuff |
| **JS: On Expire Buff** | Código global ao expirar buff |
| **JS: On Expire Debuff** | Código global ao expirar debuff |

---

## Mudança Importante

Na mecânica vanilla, buffs/debuffs ao atingir nível neutro permaneciam. Com este plugin, ao atingir **nível neutro**, o buff/debuff é **removido** e o turn counter é resetado.

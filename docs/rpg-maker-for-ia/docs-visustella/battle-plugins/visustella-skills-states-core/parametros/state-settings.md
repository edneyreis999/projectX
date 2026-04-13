# Plugin Parameters - General State Settings

Configurações gerais de states, incluindo regras de reaplicação, display de turnos e JavaScript effects globais.

---

## General

| Parâmetro | Descrição | Opções |
|-----------|-----------|--------|
| **Reapply Rules** | Regras ao reaplicar states | Ignore, Reset, Greater, Add |
| **Maximum Turns** | Máximo de turnos para states | Número (sobrescrevível por `<Max Turns: x>`) |
| **Action End Update** | States com "Action End" atualizam por ação individual | true/false |
| **Turn End on Map** | Atualizar turnos de state/buff no mapa após N passos | Número (0 = desabilitado) |

---

## Turn Display

| Parâmetro | Descrição |
|-----------|-----------|
| **Show Turns?** | Exibir turnos em window icons e sprites |
| **Turn Font Size** | Tamanho da fonte dos turnos |
| **Offset X** | Deslocamento horizontal |
| **Offset Y** | Deslocamento vertical |
| **Turn Color: Neutral** | Cor para states neutros (número ou `#rrggbb`) |
| **Turn Color: Positive** | Cor para positive states |
| **Turn Color: Negative** | Cor para negative states |

---

## Data Display

| Parâmetro | Descrição |
|-----------|-----------|
| **Show Data?** | Exibir state data em window icons e sprites |
| **Data Font Size** | Tamanho da fonte |
| **Offset X** | Deslocamento horizontal |
| **Offset Y** | Deslocamento vertical |

---

## Global JS Effects

| Parâmetro | Descrição |
|-----------|-----------|
| **JS: On Add State** | Código global ao adicionar state |
| **JS: On Erase State** | Código global ao apagar state |
| **JS: On Expire State** | Código global ao expirar state |

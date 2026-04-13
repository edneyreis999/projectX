# Plugin Commands - State Turns

Plugin Commands para manipular turnos de states em actors e enemies via eventos.

---

## Actor State Turns Change By

Modifica turnos de um state em actors por um valor relativo.

### Parâmetros
| Parâmetro | Descrição |
|-----------|-----------|
| **Actor ID(s)** | Quais actors afetar |
| **State ID** | ID do state (apenas states com turnos) |
| **Change Turns By** | Quantos turnos adicionar/remover (suporta JS) |
| **Auto-Add State?** | Adicionar state automaticamente se não aplicado? |

---

## Actor State Turns Change To

Define turnos de um state em actors para um valor absoluto.

### Parâmetros
| Parâmetro | Descrição |
|-----------|-----------|
| **Actor ID(s)** | Quais actors afetar |
| **State ID** | ID do state (apenas states com turnos) |
| **Change Turns To** | Valor exato de turnos (suporta JS) |
| **Auto-Add State?** | Adicionar state automaticamente se não aplicado? |

---

## Enemy State Turns Change By

Modifica turnos de um state em enemies por um valor relativo.

### Parâmetros
| Parâmetro | Descrição |
|-----------|-----------|
| **Enemy Index(es)** | Quais enemies afetar |
| **State ID** | ID do state (apenas states com turnos) |
| **Change Turns By** | Quantos turnos adicionar/remover (suporta JS) |
| **Auto-Add State?** | Adicionar state automaticamente se não aplicado? |

---

## Enemy State Turns Change To

Define turnos de um state em enemies para um valor absoluto.

### Parâmetros
| Parâmetro | Descrição |
|-----------|-----------|
| **Enemy Index(es)** | Quais enemies afetar |
| **State ID** | ID do state (apenas states com turnos) |
| **Change Turns To** | Valor exato de turnos (suporta JS) |
| **Auto-Add State?** | Adicionar state automaticamente se não aplicado? |

---

## Notas

- Todos os comandos só funcionam em **states que podem ter turnos**
- Os campos **Change Turns By/To** aceitam código JavaScript
- **Auto-Add State** adiciona o state se o battler ainda não o tiver

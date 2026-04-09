# Plugin Commands - Atores

> Comandos de plugin para controlar TP Modes de personagens através de eventos.

## Visão Geral

Estes comandos são usados em **Event Commands** → **Plugin Commands** para manipular TP Modes de atores durante o jogo.

---

## Actor: Change TP Mode

Altera o TP Mode de um ou mais atores.

### Parâmetros

| Parâmetro | Descrição |
|-----------|-----------|
| **Actor ID(s)** | Qual(is) ator(es) afetar |
| **TP Mode Name** | Nome do TP Mode para aplicar |

### Uso em Evento

```
Plugin Command → Actor: Change TP Mode
  ├─ Actor ID(s): 1 (ou variável, ou grupo)
  └─ TP Mode Name: Momentum
```

### Comportamento
- Aplica imediatamente o novo TP Mode
- Substitui o modo atual
- Se múltiplos atores selecionados, todos mudam para o mesmo modo

### Exemplos

**Mudar modo de personagem específico:**
```
Actor: Change TP Mode
  Actor ID(s): 1
  TP Mode Name: Fúria
```

**Mudar modo de todo o grupo:**
```
Actor: Change TP Mode
  Actor ID(s): 0 (todos os party members)
  TP Mode Name: Postura Defensiva
```

**Usar variável:**
```
Actor: Change TP Mode
  Actor ID(s): V[1] (variável 1 contém ID do ator)
  TP Mode Name: Guarda
```

---

## Actor: Unlock TP Mode

Desbloqueia um ou mais TP Modes para um ou mais atores.

### Parâmetros

| Parâmetro | Descrição |
|-----------|-----------|
| **Actor ID(s)** | Qual(is) ator(es) afetar |
| **TP Modes** | Lista de modos a desbloquear |

### Uso em Evento

```
Plugin Command → Actor: Unlock TP Mode
  ├─ Actor ID(s): 1
  └─ TP Modes: Momentum, Foco, Guarda
```

### Comportamento
- Adiciona modo(s) à lista de modos disponíveis
- Não muda o modo atual
- Modos desbloqueados ficam disponíveis para seleção

### Exemplos

**Desbloquear modo único:**
```
Actor: Unlock TP Mode
  Actor ID(s): 1
  TP Modes: Momentum
```

**Desbloquear múltiplos modos:**
```
Actor: Unlock TP Mode
  Actor ID(s): 2
  TP Modes: Guarda Básica, Guarda Avançada, Muralha
```

---

## Actor: Unlock All TP Modes

Desbloqueia **todos** os TP Modes disponíveis para um ou mais atores.

### Parâmetros

| Parâmetro | Descrição |
|-----------|-----------|
| **Actor ID(s)** | Qual(is) ator(es) afetar |

### Uso em Evento

```
Plugin Command → Actor: Unlock All TP Modes
  └─ Actor ID(s): 1
```

### Comportamento
- Desbloqueia todos os modos definidos como "Global TP Modes"
- Útil para: cheats, bônus de final de jogo, testes

### Exemplo

**Recompensa de chefão final:**
```
Actor: Unlock All TP Modes
  Actor ID(s): 0 (toda a party)
```

---

## Actor IDs - Referência

| Valor | Significado |
|-------|-------------|
| `0` | Todos os party members |
| `1`, `2`, `3`, etc. | Atores específicos por ID |
| `V[1]`, `V[2]`, etc. | Variável contendo ID do ator |

## Fluxo de Uso Típico

### Progressão de História
```
Evento: Tutorial Completado
  │
  ├─ Text: "Você aprendeu Postura Básica!"
  │
  ├─ Actor: Unlock TP Mode
  │     Actor ID(s): 1
  │     TP Modes: Postura Básica
  │
  └─ Text: "Acesse via menu Skills → TP Mode"
```

### Mudança Forçada
```
Evento: Personagem Enraivecido
  │
  ├─ Text: "Kilin entra em fúria!"
  │
  └─ Actor: Change TP Mode
        Actor ID(s): 2
        TP Mode Name: Fúria Incontrolável
```

### Recompensa
```
Evento: Item Mágico Encontrado
  │
  ├─ Text: "Você encontrou o Anel de Foco!"
  │
  └─ Actor: Unlock TP Mode
        Actor ID(s): 4
        TP Modes: Foco Absoluto
```

---

## Ver Também

- [Notetags Gerais](../notetags/gerais.md) - `<Change Target/User TP Mode>` (equivalente em skills)
- [Notetags de Atores](../notetags/atores.md) - `<Learn/Unlock TP Mode>` (equivalente em skills)
- [Comandos de Inimigos](inimigos.md) - Comandos para inimigos
- [Comandos de Sistema](sistema.md) - Show/Hide TP Mode

# Plugin Commands - Inimigos

> Comandos de plugin para controlar TP Modes de inimigos através de eventos.

## Visão Geral

Comandos para manipular TP Modes de inimigos durante batalha. Útil para:
- Mudar comportamento de inimigos em fases diferentes
- Reações a eventos de batalha
- Mecânicas de chefes com múltiplas fases

---

## Enemy: Change TP Mode

Altera o TP Mode de um ou mais inimigos.

### Parâmetros

| Parâmetro | Descrição |
|-----------|-----------|
| **Enemy Index(es)** | Qual(is) inimigo(s) afetar |
| **TP Mode Name** | Nome do TP Mode para aplicar |

### Uso em Evento

```
Plugin Command → Enemy: Change TP Mode
  ├─ Enemy Index(es): 1
  └─ TP Mode Name: Fúria Despertada
```

### Enemy Indexes - Referência

| Valor | Significado |
|-------|-------------|
| `0` | Todos os inimigos |
| `1`, `2`, `3`, etc. | Índice do inimigo na tropa (1-based) |
| `-1`, `-2`, etc. | Referência específica (veja abaixo) |

### Índices de Inimigos

Em RPG Maker, inimigos são referenciados por **índice na tropa** (não ID do database):

```
Tropa: [Slime A, Slime B, Bat, Boss]
Index:    1        2        3     4
```

**Importante:** Se Slime A (index 1) morre, os índices NÃO renumeram. Slime B continua index 2.

### Comportamento
- Aplica imediatamente o novo TP Mode
- Substitui o modo atual
- Funciona apenas durante batalha

---

## Exemplos de Uso

### Chefão com Múltiplas Fases

```
Evento: Boss HP < 50%
  │
  ├─ Enemy: Change TP Mode
  │     Enemy Index(es): 4
  │     TP Mode Name: Segunda Fase
  │
  ├─ Text: "O boss entra em FRENESI!"
  │
  └─ Animation: 123 (explosão)
```

### Reação à Morte de Aliado

```
Evento: Inimigo Morre (Troop Event)
  │
  └─ Enemy: Change TP Mode
        Enemy Index(es): 0 (todos)
        TP Mode Name: Vingança
```

### Buff de Grupo

```
Evento: Turn 5
  │
  ├─ Text: "Os inimigos concentram sua energia!"
  │
  └─ Enemy: Change TP Mode
        Enemy Index(es): 1, 2, 3
        TP Mode Name: Modo Carregado
```

### Inimigo Específico

```
Evento: Slime A ataca
  │
  └─ Enemy: Change TP Mode
        Enemy Index(es): 1
        TP Mode Name: Agressivo
```

---

## Casos de Uso Avançados

### Fases de Chefão

```
│─ HP 100% - 76%: Modo "Calmo"
│─ HP 75% - 51%: Modo "Atento"
│─ HP 50% - 26%: Modo "Agressivo"
│─ HP 25% - 0%:  Modo "Desesperado"

Evento: Boss HP < 75%
  └─ Enemy: Change TP Mode
        Enemy Index(es): 4
        TP Mode Name: Atento

Evento: Boss HP < 50%
  └─ Enemy: Change TP Mode
        Enemy Index(es): 4
        TP Mode Name: Agressivo

Evento: Boss HP < 25%
  └─ Enemy: Change TP Mode
        Enemy Index(es): 4
        TP Mode Name: Desesperado
```

### Sinergia de Grupo

```
Evento: Inimigo "Comandante" morre
  │
  ├─ Text: "Sem seu líder, os soldados entram em pânico!"
  │
  └─ Enemy: Change TP Mode
        Enemy Index(es): 2, 3, 4
        TP Mode Name: Desorganizado
```

---

## Diferenças: Actor vs Enemy Commands

| Característica | Actor | Enemy |
|----------------|-------|-------|
| **Identificação** | Actor ID (fixo) | Index na tropa (variável) |
| **Unlock** | Sim | Não |
| **Change** | Sim | Sim |
| **Fora de batalha** | Sim | Não |
| **IDs** | Database ID | Posição na tropa |

---

## Ver Também

- [Comandos de Atores](atores.md) - Comandos para personagens
- [Notetags Gerais](../notetags/gerais.md) - `<TP Mode>` para configuração inicial
- [Plugin Parameters](../parametros/modos-tp.md) - Criar TP Modes para inimigos

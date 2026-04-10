# Comandos de Plugin - Atores - Enhanced TP System

Comandos para gerenciar TP Modes de actors.

## Actor: Change TP Mode

**Função:** Altera o TP Mode de actor(s) selecionado(s).

### Parâmetros

#### Actor ID(s)
- Quais actors serão afetados
- Seleção: ID específico ou múltiplos IDs

#### TP Mode Name
- Nome do TP Mode para mudar
- Deve existir em Plugin Parameters > TP Modes

### Exemplo de Uso

**Evento Comum:**
```
Plugin Command > Actor: Change TP Mode
Actor ID(s): 1
TP Mode Name: Berserker
```

**Resultado:** Actor 1 muda para modo Berserker.

---

## Actor: Unlock TP Mode

**Função:** Desbloqueia TP Modes para actor(s) selecionado(s).

### Parâmetros

#### Actor ID(s)
- Quais actors serão afetados
- Seleção: ID específico ou múltiplos IDs

#### TP Modes
- Lista de TP Modes para desbloquear
- Múltiplos modes podem ser selecionados

### Exemplo de Uso

**Evento de Quest:**
```
Plugin Command > Actor: Unlock TP Mode
Actor ID(s): 1
TP Modes: [Berserker, Tactician]
```

**Resultado:** Actor 1 desbloqueia modes Berserker e Tactician.

---

## Actor: Unlock All TP Modes

**Função:** Desbloqueia TODOS os TP Modes para actor(s) selecionado(s).

### Parâmetros

#### Actor ID(s)
- Quais actors serão afetados
- Seleção: ID específico ou múltiplos IDs

### Exemplo de Uso

**Recompensa de Boss:**
```
Plugin Command > Actor: Unlock All TP Modes
Actor ID(s): 1, 2, 3, 4
```

**Resultado:** Party inteira desbloqueia todos os modes.

---

## Quando Usar Cada Comando

| Comando | Caso de Uso |
|---------|-------------|
| Change TP Mode | Mudar modo durante evento/cutscene |
| Unlock TP Mode | Desbloquear modes específicos (quests, tutoriais) |
| Unlock All TP Modes | Recompensa tardia no jogo, new game+ |

---

## Integração com Notetags

**Equivalência Notetag ↔ Plugin Command:**

| Plugin Command | Notetag Equivalente |
|----------------|---------------------|
| Actor: Change TP Mode | N/A (dinâmico) |
| Actor: Unlock TP Mode | `<Unlock TP Mode:>` |
| Actor: Unlock All TP Modes | N/A (função especial) |

**Notetags são estáticas; Plugin Commands são dinâmicos.**

---

## Documentação Relacionada

- [Comandos de Inimigos](inimigos.md) - Commands para enemies
- [Comandos de Sistema](sistema.md) - System-level commands
- [Notetags para Atores](../notetags/atores.md) - Notetags equivalentes

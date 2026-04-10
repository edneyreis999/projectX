# Comandos de Plugin - Inimigos - Enhanced TP System

Comandos para gerenciar TP Modes de enemies.

## Enemy: Change TP Mode

**Função:** Altera o TP Mode de inimigo(s) selecionado(s).

### Parâmetros

#### Enemy Index(es)
- Quais inimigos serão afetados
- **Importante:** Index de batalha (não enemy ID do database)
- Index começa em 0

#### TP Mode Name
- Nome do TP Mode para mudar
- Deve existir em Plugin Parameters > TP Modes

### Entendendo Enemy Index

```
Batalha: 2 Slimes, 1 Bat, 2 Slimes

Index 0: Slime A (primeiro)
Index 1: Slime B (segundo)
Index 2: Bat
Index 3: Slime C (terceiro)
Index 4: Slime D (quarto)
```

**Index ≠ Database ID!**

### Exemplo de Uso

**Evento de Troop:**
```
Plugin Command > Enemy: Change TP Mode
Enemy Index(es): 0
TP Mode Name: Cautious
```

**Resultado:** Primeiro inimigo da troop muda para modo Cautious.

---

## Múltiplos Inimigos

**Sintaxe:**
- Índices separados por vírgula: `0, 1, 2`
- Intervalos: `0-2`
- Misto: `0, 2-4, 6`

**Exemplo:**
```
Enemy Index(es): 0-2
```

**Resultado:** Inimigos 0, 1 e 2 mudam de mode.

---

## Casos de Uso

### 1. Boss Fases
```
→ Boss HP < 50%
→ Change para "Desperate" mode
→ Mais agressivo
```

### 2. Enrage Mechanics
```
→ Ally morre
→ Enemies mudam para "Berserker"
→ Mais dano, menos defesa
```

### 3. Tactical Shift
```
→ Turn 5
→ Enemies mudam para "Tactician"
→ Mais suporte, buffs
```

---

## Diferença: Atores vs Inimigos

| Aspecto | Actors | Enemies |
|---------|--------|---------|
| ID usado | Actor ID | Battle Index |
| Unlock? | Sim | Não |
| Change | Sim | Sim |
| Database ID | Sim | Não |

---

## Documentação Relacionada

- [Comandos de Atores](atores.md) - Commands para actors
- [Comandos de Sistema](sistema.md) - System commands
- [Modos de TP](../parametros/modos.md) - Criar/editar modes

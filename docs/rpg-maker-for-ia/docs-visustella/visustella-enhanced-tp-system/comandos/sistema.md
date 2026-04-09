# Plugin Commands - Sistema

> Comandos de plugin para configurações globais do Enhanced TP System.

## Visão Geral

Comando único para controlar a visibilidade do seletor de TP Mode no menu de Skills.

---

## System: Show/Hide TP Mode

Controla se o comando de TP Mode aparece em **Scene_Skill** (menu de skills).

### Parâmetros

| Parâmetro | Descrição |
|-----------|-----------|
| **Show TP Mode?** | Mostrar ou ocultar seletor de TP Mode |

### Valores

| Opção | Comportamento |
|-------|---------------|
| `Show` | Mostra comando TP Mode em Scene_Skill |
| `Hide` | Oculta comando TP Mode em Scene_Skill |

### Uso em Evento

```
Plugin Command → System: Show/Hide TP Mode
  └─ Show TP Mode?: Show
```

---

## Casos de Uso

### Tutorial Progressivo

```
┌─ Início do Jogo
│  └─ System: Show/Hide TP Mode
│        Show TP Mode?: Hide
│
├─ Tutorial de TP Completado
│  └─ System: Show/Hide TP Mode
│        Show TP Mode?: Show
│
└─ Text: "Agora você pode trocar TP Modes no menu Skills!"
```

### Personagem Específico

Mostrar apenas quando personagem com múltiplos modos está na party:

```
Evento: Party Check (Parallel)
  │
  ├─ Condição: Kilin está na party
  │     └─ System: Show/Hide TP Mode
  │           Show TP Mode?: Show
  │
  └─ Condição: Kilin NÃO está na party
        └─ System: Show/Hide TP Mode
              Show TP Mode?: Hide
```

### Chefão ou Momentos Críticos

```
Evento: Chefão Aparece
  │
  ├─ Text: "Você não pode mudar de postura agora!"
  │
  └─ System: Show/Hide TP Mode
        Show TP Mode?: Hide

Evento: Chefão Derrotado
  │
  └─ System: Show/Hide TP Mode
        Show TP Mode?: Show
```

### Restrição de Área

``│─ Mapa Mundano → TP Mode disponível
│─ Dungeon Profunda → TP Mode bloqueado
│─ Sala do Chefão → TP Mode bloqueado

Evento: Transfer Player para Dungeon
  └─ System: Show/Hide TP Mode
        Show TP Mode?: Hide

Evento: Vencer Chefão
  └─ System: Show/Hide TP Mode
        Show TP Mode?: Show
```

---

## Configuração Via Parâmetros

O comando de evento **sobrescreve** a configuração dos parâmetros do plugin:

**Parâmetro:** `General Settings > Scene_Skill > Show TP Mode?`

| Parâmetro | Comando Evento | Resultado |
|-----------|----------------|-----------|
| Show | (nenhum) | Show |
| Show | Hide | Hide |
| Hide | Show | Show |
| Hide | (nenhum) | Hide |

---

## Fluxo de Decisão

```
Jogador abre Menu Skills
   │
   ├─ Parâmetro "Show TP Mode?" = Hide?
   │  └─ NÃO mostra comando
   │
   ├─ Plugin Command "Hide TP Mode" ativo?
   │  └─ NÃO mostra comando
   │
   ├─ Personagem tem múltiplos TP Modes?
   │  └─ NÃO → Pode ocultar ou mostrar sem efeito
   │
   └─ SIM → Mostra comando "TP Mode"
         └─ Jogador pode selecionar modo disponível
```

---

## Boas Práticas

### Quando Ocultar
- **Tutorial inicial**: Jogador ainda não conhece sistema
- **Restrições de história**: Personagem ferido, capturado, etc.
- **Momentos dramáticos**: Cutscenes, diálogos importantes
- **Chefões**: Aumentar dificuldade removendo flexibilidade

### Quando Mostrar
- **Após tutorial**: Jogador entendeu o básico
- **Áreas seguras**: Cidades, dungeons simples
- **Personagens com múltiplos modos**: Sempre útil
- **Exploração**: Dar liberdade ao jogador

---

## Exemplo Completo: Sistema de Progressão

```
┌──────────────────────────────────────┐
│ Início do Jogo                       │
│ System: Hide TP Mode                 │
├──────────────────────────────────────┤
│ Completar Tutorial "Postura Básica"  │
│ System: Show TP Mode                 │
├──────────────────────────────────────┤
│ Entrar em Sala do Chefão            │
│ System: Hide TP Mode                 │
├──────────────────────────────────────┤
│ Derrotar Chefão                      │
│ System: Show TP Mode                 │
├──────────────────────────────────────┤
│ Personagem Aprende "Mestre de TP"    │
│ (já está habilitado, mas reforça)   │
└──────────────────────────────────────┘
```

---

## Ver Também

- [Comandos de Atores](atores.md) - Change/Unlock TP Mode
- [Parâmetros: Configuração Geral](../parametros/configuracao-geral.md) - Configuração padrão
- [TP Modes](../conceitos/tp-modes.md) - Como funcionam os modos

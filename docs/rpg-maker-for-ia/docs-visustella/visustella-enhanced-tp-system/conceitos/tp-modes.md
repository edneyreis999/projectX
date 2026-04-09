# TP Modes - Conceito Central

> **TP Mode** é um conjunto de regras que define como um personagem ou inimigo interage com o sistema TP.

## Definição

Um TP Mode (Modo TP) é uma configuração completa que determina:
- Quanto TP máximo o battler pode ter
- Como o TP é ganho em diversas situações
- Se o TP é preservado entre batalhas
- Como o gauge é visualmente apresentado

## Analogia

Pense em TP Modes como "estilos de combate" ou "posturas":
- **Stance (Guarda)**: Gera TP ao defender e proteger aliados
- **Aggression (Fúria)**: Gera TP ao dar e receber dano pesado
- **Focus (Foco)**: Gera TP com ataques precisos e calculados
- **Flow (Momentum)**: Gera TP com ações rápidas e consecutivas

## Estrutura de um TP Mode

```
┌─────────────────────────────────────┐
│  TP Mode: "Guarda de Ferro"         │
├─────────────────────────────────────┤
│  General                            │
│  ├── MaxTP: 50                      │
│  ├── TCR Multiplier: 1.2            │
│  └── Preserve TP?: Sim              │
├─────────────────────────────────────┤
│  Gauge                              │
│  ├── Custom Label: "GUARDA"         │
│  ├── Custom Color: #4a90e2          │
│  └── Flash at 80%                   │
├─────────────────────────────────────┤
│  Formulas                           │
│  ├── Initial TP: 0                  │
│  ├── Use Skill: 10                  │
│  ├── Ally HP Damage: value/10       │
│  └── ...                            │
└─────────────────────────────────────┘
```

## Como TP Modes Funcionam

### 1. Atribuição

Cada battler (ator ou inimigo) tem **um TP Mode ativo** por vez.

**Métodos de atribuição:**
- Notetag `<TP Mode: name>` no Actor/Enemy
- Plugin Command `Change TP Mode`
- Trait `<Force TP Mode: name>` (State, Weapon, Armor)
- Padrão definido nos parâmetros do plugin

### 2. Múltiplos Modos Disponíveis

Atores podem ter **uma lista de modos disponíveis** que podem trocar:
```xml
<Starting TP Modes>
  Guarda Básica
  Postura de Ferro
  Muralha Suprema
</Starting TP Modes>
```

### 3. Troca Dinâmica

Durante batalha, jogadores podem trocar de TP Mode via Scene_Skill (se habilitado):
- Menu de Skills → Comando TP Mode → Selecionar modo

## 30 Modos Predefinidos

O plugin inclui 30 TP Modes prontos como referência:
- Modos básicos (Basic, Standard, etc.)
- Modos temáticos (Berserker, Defender, Tactician)
- Modos especiais (MP Shield, HP Limit, etc.)

**Uso:** Estude estes modos para aprender como criar os seus.

## Aprendizado e Desbloqueio

### Learn TP Mode
Personagem aprende novo modo permanentemente ao aprender uma skill:
```xml
<Learn TP Mode: Postura Avançada>
```

### Unlock TP Mode
Modo torna disponível para uso (não permanentemente aprendido):
```xml
<Unlock TP Mode: Fúria Temporária>
```

**Diferença:**
- **Learn**: Permanente, transfere entre batalhas
- **Unlock**: Temporário, pode ser revogado

## Forçar TP Mode

States, Weapons, Armors podem **forçar** um TP Mode específico:
```xml
<Force TP Mode: Frenesi>
```

**Prioridade:** Baseado na ordem de traits se múltiplos estiverem presentes.

## Exemplo Prático: Quatro Personagens

```
Filena  → TP Mode: "Momentum"
  - MaxTP: 100
  - Gera TP com ataques rápidos
  - Consome TP em dashes e combos

Kilin   → TP Mode: "Guarda"
  - MaxTP: 50
  - Gera TP protegendo aliados
  - Consome TP em buffs de defesa

Mhordred→ TP Mode: "Fúria"
  - MaxTP: 100
  - Gera TP dando/recebendo dano
  - Consome TP em finishers poderosos

Thorin  → TP Mode: "Foco"
  - MaxTP: 100
  - Gera TP com ataques precisos
  - Consome TP em tiros especiais
```

## Ver Também

- [Visão Geral](visao-geral.md) - Introdução ao sistema
- [Modos TP (Configuração)](../parametros/modos-tp.md) - Como criar TP Modes
- [Fórmulas TP](../parametros/formulas-tp.md) - Configurar ganhos de TP

# Referência Rápida de Notetags - Enhanced TP System

Lista compacta de todas as notetags do plugin.

## Gerais (Actor, Enemy, State, Skill, Item)

| Notetag | Uso | Função |
|---------|-----|--------|
| `<TP Mode: x>` | Actor, Enemy, State | Define TP Mode inicial |
| `<Starting TP Modes>` | Actor | Lista de modes disponíveis |
| `</Starting TP Modes>` | Actor | Fecha lista |
| `<Change Target TP Mode: x>` | Skill, Item | Muda mode do alvo |
| `<Change User TP Mode: x>` | Skill, Item | Muda mode do usuário |

## Atores Apenas

| Notetag | Uso | Função |
|---------|-----|--------|
| `<Learn TP Mode: x>` | Skill | Aprende mode ao aprender skill |
| `<Learn TP Modes>` | Skill | Início lista de modes |
| `</Learn TP Modes>` | Skill | Fim lista de modes |
| `<Unlock TP Mode: x>` | Skill, Item | Desbloqueia mode |
| `<Unlock TP Modes>` | Skill, Item | Início lista de desbloqueio |
| `</Unlock TP Modes>` | Skill, Item | Fim lista de desbloqueio |

## Forçar Mode (Todos Battlers)

| Notetag | Uso | Função |
|---------|-----|--------|
| `<Force TP Mode: x>` | Actor, Class, Weapon, Armor, Enemy, State | Força mode específico |

## Legenda

- `x` = Nome do TP Mode (de Plugin Parameters > TP Modes)
- Actor = Apenas para actors
- Enemy = Apenas para enemies
- State = Pode ser usado em States
- Skill = Pode ser usado em Skills
- Item = Pode ser usado em Items
- Class = Pode ser usado em Classes
- Weapon = Pode ser usado em Weapons
- Armor = Pode ser usado em Armors

## Documentação Completa

- [Notetags Gerais](gerais.md) - Detalhes de notetags comuns
- [Notetags para Atores](atores.md) - Detalhes de notetags exclusivas

# Requisitos e Compatibilidade

## Requisitos

- **Engine**: RPG Maker MZ exclusivamente (não funciona em outras versões do RPG Maker)

## Tier

**Tier 4** — Deve ser colocado **abaixo** de plugins com tier menor na lista do Plugin Manager.

Ordem recomendada: `0, 1, 2, 3, 4, 5` (do menor para o maior tier).

Isso garante melhor compatibilidade com o restante da biblioteca VisuStella MZ.

## Compatibilidade

| Plugin | Integração |
|--------|-----------|
| **VisuStella Skills & States Core** | Expande a funcionalidade de Buffs & States — permite alterar custom values numéricos de states |

## Limitações Conhecidas

- Self Switches e Self Variables adicionados por outros plugins **não são controláveis** pelo menu Map Events
- Common Events e Teleport são acessíveis apenas no Map Scene
- Battle é acessível apenas no Map Scene
- O menu debug original do RPG Maker MZ não é mais acessível via F9 (substituído completamente)

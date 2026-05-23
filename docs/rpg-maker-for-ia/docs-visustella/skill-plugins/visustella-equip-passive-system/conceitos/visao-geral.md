# Equip Passive System - Visão Geral

## O que é

O **Equip Passive System** (VisuStella MZ) permite que atores equipem *states passivos* para potencializar seu desempenho em batalha. Passivos equipáveis funcionam como estados (states) do RPG Maker MZ, herdando todas as suas propriedades (traits, motions, overlays).

## Funcionalidades Principais

- **Equipamento de passivos** via cena de Skills (comando "Passives")
- **Capacidade limitada**: cada passivo tem um custo de capacidade; atores possuem limite de capacidade
- **Aprendizado orgânico**: passivos podem ser desbloqueados por condições de gameplay (batalhas, level, uso de skills, etc.)
- **Skill Learn System**: integração opcional para comprar passivos com AP/SP/JP/CP/itens/gold
- **Branching**: ao aprender um passivo, novos passivos podem ser desbloqueados em árvore
- **Global operations**: aprender/esquecer passivos em todos os atores de uma vez

## Metadados do Plugin

| Campo | Valor |
|-------|-------|
| Plugin ID | VisuMZ.148 |
| Tier | 2 |
| Dependências obrigatórias | Core Engine, Skills and States Core |
| Dependências opcionais | Elements and Status Menu Core, Skill Learn System, Class Change System |

## Arquitetura do Sistema

```
State (Database)
  └── Equip Passive (notetag no State)
        ├── Capacidade (cost)
        ├── Condições de Unlock (opcional)
        ├── Skill Learn System (alternativa de aprendizado)
        └── Branching (desbloqueia outros passivos)

Actor/Class (notetag no Actor/Class)
  └── Learnable Passives List
        ├── Unlearned (visível, com condições)
        ├── Learned (disponível para equipar)
        └── Equipped (ativo no actor)
```

## Fluxo de Aprendizado

1. **Listagem**: Actor/Class recebe notetag `<Learnable Equip Passive: id>` indicando quais passivos pode aprender
2. **Desbloqueio**: Actor cumpre condições (unlock conditions) OU compra via Skill Learn System
3. **Aprendizado**: Passivo entra na lista de "learned" do actor
4. **Equipamento**: Actor equipa o passivo respeitando o limite de capacidade
5. **Ativação**: State é aplicado ao actor com todos os seus traits

## Navegação

- [States como Base](states-como-base.md) - Como passivos usam states do RPG Maker
- [Condições de Unlock](unlock-conditions.md) - Tipos de condições para desbloqueio
- [Integração Skill Learn](skill-learn-integration.md) - Sistema alternativo de aprendizado

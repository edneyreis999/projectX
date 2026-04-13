# Skills & States Core - Visão Geral

## Dados do Plugin

| Campo | Valor |
|-------|-------|
| **Nome** | Skills & States Core |
| **Autor** | Team VisuStella (Yanfly, Arisu, Olivia, Irina) |
| **Tier** | 1 |
| **Compatibilidade** | RPG Maker MZ apenas |
| **Versão Atual** | 1.48 (December 19, 2024) |

## Propósito

O plugin Skills & States Core estende e aprimora as funcionalidades nativas de skills, states e buffs do RPG Maker MZ, permitindo aos desenvolvedores customizar diversos aspectos.

## Funcionalidades Principais

### Skills
- Atribuir múltiplos **Skill Types** a uma mesma Skill
- Criar **custom Skill Cost Types** (HP, Gold, Items, etc.)
- Custos **percentuais** ou **dinâmicos** via notetags ou JavaScript
- Substituir **gauges** por diferentes tipos de recursos por classe
- **Ocultar/exibir** e **habilitar/desabilitar** skills via switches, skills aprendidas ou código
- Layout atualizado do **Skill Menu Scene**

### States
- Regras de **reaplicação** de states (Ignore, Reset, Greater, Add)
- States que **persistem após morte** (`<No Death Clear>`)
- **Categorias** de states com resistência por categoria
- **Group Defeat** - derrota quando todo o party tem o state
- **Display de turnos** em states visíveis no window/sprite
- **Manipulação de turnos** de states, buffs e debuffs via skills/items

### Passive States
- States passivos com **condições** (classe, switch, JS code)
- **Aura & Miasma** - passive states que afetam aliados ou oponentes
- Cache de passive states com refresh por switch/variable

### Buffs & Debuffs
- **Stacking** customizável de buffs/debuffs
- Buffs/debuffs são **removidos ao atingir nível neutro**
- Display de turnos e rate customizável

### Slip Damage (Damage Over Time)
- Cálculos customizados de **slip damage/healing** via JavaScript
- Slip damage é **cached** na aplicação (exceto passive states com `<JS Slip Refresh>`)
- Popup mostra total acumulado (não individual por state)

## Seções da Documentação

| Seção | Arquivo | Descrição |
|-------|---------|-----------|
| Mudanças Core | [mudancas-core.md](mudancas-core.md) | Alterações no comportamento padrão do RMMZ |
| Passive States | [passive-states-explicacao.md](passive-states-explicacao.md) | Esclarecimentos sobre estados passivos |
| Notetags Skills | [../notetags/skills-gerais.md](../notetags/skills-gerais.md) | Notetags gerais de skills |
| Notetags Custos | [../notetags/skill-costs.md](../notetags/skill-costs.md) | Notetags de custos de skills |
| Notetags Acessibilidade | [../notetags/skill-accessibility.md](../notetags/skill-accessibility.md) | Ocultar/exibir/habilitar skills |
| Notetags States | [../notetags/states-gerais.md](../notetags/states-gerais.md) | Notetags gerais de states |
| Notetags Slip Damage | [../notetags/slip-damage-healing.md](../notetags/slip-damage-healing.md) | Damage/healing over time |
| Notetags Passivos | [../notetags/passive-states.md](../notetags/passive-states.md) | Estados passivos e condições |
| Notetags Aura/Miasma | [../notetags/aura-miasma.md](../notetags/aura-miasma.md) | Auras e miasmas |
| Referência Rápida | [../notetags/referencia-rapida.md](../notetags/referencia-rapida.md) | Índice de todas as notetags |
| Comandos | [../comandos-plugin/](../comandos-plugin/) | Plugin Commands disponíveis |
| Parâmetros | [../parametros/](../parametros/) | Plugin Parameters detalhados |
| Referência | [../referencia/](../referencia/) | Requisitos, changelog, troubleshooting |

## Ordem de Leitura Recomendada

1. Esta visão geral
2. [Mudanças Core](mudancas-core.md) - Entenda o que mudou do vanilla
3. [Passive States](passive-states-explicacao.md) - Conceito fundamental
4. [Notetags - Referência Rápida](../notetags/referencia-rapida.md) - Índice completo
5. Seções específicas conforme necessidade

# Introdução ao Life State Effects

## Visão Geral

O plugin **Life State Effects** permite que objetos de trait e/ou states criem efeitos específicos comumente encontrados em JRPGs tradicionais. Esses efeitos mecânicos adicionam uma nova camada estratégica ao sistema de status effects do seu jogo.

## Propósito

Este plugin foi desenvolvido para implementar mecânicas clássicas de RPG que não estão disponíveis nativamente no RPG Maker MZ, permitindo que desenvolvedores criem experiências mais ricas e estratégicas.

## Efeitos Disponíveis

### Auto Life
- Revive o battler ao morrer
- Restaura uma porcentagem definida do HP
- Remove o estado (e outros Auto Life) ao ativar

### Curse
- Impede recuperação de HP, MP e/ou TP
- Versões separadas para cada recurso
- Pode ser combinado com outros efeitos

### Doom
- Mata o battler quando o estado expira naturalmente
- Permite countdown visual para tensão
- Pode ser estrategicamente removido

### Fragile
- Morte instantânea ao receber qualquer dano de HP
- Apenas dano direto (não regeneração ou eventos)
- Alto risco, alta recompensa

### Guts
- Previne morte fatal, deixando battler com 1 HP
- Se já estiver com 1 HP, recebe dano normal
- Última chance de sobrevivência

### Undead
- Inverte cura em dano
- Inverte morte instantânea em cura completa
- Inverte efeitos de Drain
- Elementos absorvidos funcionam normalmente

### Death Transformations
- Inimigos se transformam ao morrer
- Rebornem com HP/MP completos
- Sistema de peso para transformações múltiplas

## Requisitos do Sistema

### Plugins Obrigatórios
- **VisuMZ_1_BattleCore**: Sistema de batalda base
- **VisuMZ_1_SkillsStatesCore**: Core de habilidades e estados

### Plugin Opcional
- **VisuMZ_0_CoreEngine**: Necessário para animações

## Configuração de Plugin Manager

Este é um **plugin Tier 3**. Coloque-o abaixo de plugins com tier menor (0, 1, 2) no Plugin Manager para garantir compatibilidade ideal.

## Próximos Passos

- Continue para [Funcionamento](funcionamento.md) para detalhes de cada efeito
- Consulte [Notetags](../notetags/state-only.md) para implementação
- Configure [Animações e Popups](../parametros/configuracoes.md) para feedback visual

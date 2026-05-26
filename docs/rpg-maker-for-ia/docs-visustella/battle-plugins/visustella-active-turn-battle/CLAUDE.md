# VisuStella MZ Active Turn Battle (ATB) - Full Documentation Index

## Sumário

Esta documentação cataloga o plugin VisuStella MZ Active Turn Battle, que transforma o sistema Time Progress Battle (TPB) do RPG Maker MZ no sistema Active Turn Battle (ATB). O plugin oferece controle completo sobre mecânicas de batalha em tempo real, incluindo manipulação de gauges, interrupções, e visualização avançada.

## Descrição dos Documentos

### Conceitos

#### conceitos/visao-geral.md
Introdução completa ao sistema ATB, incluindo:
- Diferença entre TPB e ATB
- Funcionalidades principais do plugin
- Requisitos de sistema e configuração
- Visão geral das features disponíveis

#### conceitos/mecanica-atb.md
Explicação detalhada de como o ATB funciona:
- Como as gauges ATB são preenchidas
- Sistema de speed e AGI
- Estados de casting e charging
- Cálculos de tempo e turnos

#### conceitos/mudancas-core.md
Alterações feitas pelo plugin no RPG Maker MZ:
- ATB Gauges revamp (cores por estado)
- Skill & Item Speeds (valores positivos afetam gauge)
- JS Calculation Mechanics overwrite

### Configuração

#### configuration/parametros-mecanica.md
Parâmetros que controlam a mecânica do ATB:
- **Escape Fail Penalty**: Penalidade ao falhar fuga
- **Stuns Reset Gauge**: Se stuns resetam a gauge
- **JS: Initial Gauge**: Fórmula para gauge inicial
- **JS: Speed**: Fórmula para velocidade
- **JS: Base Speed**: Fórmula para velocidade base
- **JS: Relative Speed**: Fórmula para velocidade relativa
- **JS: Acceleration**: Fórmula para aceleração
- **JS: Cast Time**: Fórmula para tempo de cast

#### configuration/parametros-interrupt.md
Configuração do sistema de interrupção:
- **Animation ID**: Animação ao interromper (requer CoreEngine)
- **Text Popup**: Texto exibido ao interromper
- **Text Color**: Cor do texto (#rrggbb ou skin)
- **Flash Color/Duration**: Efeito de flash

#### configuration/parametros-gauge.md
Configuração visual das gauges ATB:
- **Anchor X/Y**: Ponto de ancoragem (0-1)
- **Scale**: Tamanho da gauge
- **Offset X/Y**: Posição em pixels
- **AGI Gauge Rates**: Slow/Fast rates
- **Show Sprite Gauges**: Mostrar sobre sprites
- **Show Status Gauges**: Mostrar na status window

#### configuration/parametros-field-gauge.md
Configuração completa do Field Gauge:
- **Use Field Gauge**: Habilitar Field Gauge
- **Display Position**: Top/Bottom/Left/Right
- **Forward Direction**: Direção dos marcadores
- **Gauge Skin**: Imagem de fundo
- **Marker Sprites**: Tipo, tamanho, speed dos marcadores
- **Marker Border**: Bordas dos marcadores
- **Marker Letter**: Texto dos marcadores
- **Marker Background**: Fundo dos marcadores
- **Marker Arrow**: Setas indicadoras

#### configuration/parametros-opcoes.md
Opções disponíveis no menu de opções:
- **Add Option**: Adicionar "Show ATB Gauges"
- **Option Name**: Nome do comando
- **Adjust Window Height**: Ajustar altura da janela

### Features

#### features/atb-gauges.md
Sistema de gauges ATB visuais:
- Cores diferenciadas por estado
- Estados: Stop, Slow, Fast, Full, Cast
- Posicionamento sobre sprites
- Integração com status window

#### features/skill-item-speeds.md
Como speed values afetam o ATB:
- Speed negativo = Casting state
- Speed positivo = After gauge modification
- Valores: 2000 = 50%, 1000 = 25%, etc.
- Notetags para customização

#### features/field-gauge.md
Field Gauge com marcadores:
- Visualização de todos os battlers
- Marcadores para actors e enemies
- Posicionamento relativo entre battlers
- Customização de sprites (icon, face, SV)

### Notetags

#### notetags/gerais.md
Notetags gerais do sistema ATB:
- `<ATB Help>`: Help text específico para ATB
- `<Hide ATB Gauge>`: Esconder gauge de inimigo

#### notetags/field-gauge.md
Notetags para Field Gauge (requer Field Gauge enabled):
- `<ATB Field Gauge Icon: x>`: Mudar ícone do marcador
- `<ATB Field Gauge Face: filename, index>`: Mudar face do marcador

#### notetags/gauge-manipulation.md
Notetags para manipulação de gauges:
- `<ATB After Gauge: x%>`: Setar gauge após ação
- `<ATB Charge Gauge: x%>`: Modificar gauge em charging
- `<ATB Cast Gauge: x%>`: Modificar gauge em casting
- `<ATB Interrupt>`: Interromper casting
- `<ATB Cannot Be Interrupted>`: Imunidade a interrupt
- `<ATB Battle Start Gauge: +/-x%>`: Gauge inicial
- `<ATB After Gauge: +/-x%>`: Modifier após ação

#### notetags/javascript.md
Notetags JavaScript avançadas:
- `<JS ATB Charge Gauge>`: Fórmula para charge state
- `<JS ATB Cast Gauge>`: Fórmula para cast state
- `<JS ATB After Gauge>`: Fórmula pós-ação
- Variável `rate` disponível (0 a 1)

### Comandos Plugin

#### comandos-plugin/atores.md
Comandos para personagens:
- **Actor: Change Field Gauge Icon**: Mudar ícone do marcador
- **Actor: Change Field Gauge Face**: Mudar face do marcador
- **Actor: Clear Field Gauge Graphic**: Resetar gráficos

#### comandos-plugin/inimigos.md
Comandos para inimigos:
- **Enemy: Change Field Gauge Icon**: Mudar ícone do marcador
- **Enemy: Change Field Gauge Face**: Mudar face do marcador
- **Enemy: Clear Field Gauge Graphic**: Resetar gráficos

#### comandos-plugin/sistema.md
Comandos de sistema:
- **System: ATB Field Gauge Visibility**: Toggle Field Gauge

### Referência

#### referencia/glossario.md
Termos e definições do sistema ATB:
- ATB Gauge, Casting, Charging
- Interrupt, Field Gauge
- AGI Rate, Speed Modifier
- E mais termos técnicos

#### referencia/compatibilidade.md
Integração com outros plugins VisuStella:
- **VisuMZ_0_CoreEngine**: Animações de interrupt
- **VisuMZ_1_OptionsCore**: Opções de ATB speed, toggle Active/Wait
- **Tier System**: Ordem correta de plugins

#### referencia/troubleshooting.md
Solução de problemas comuns:
- Gauge não aparecendo
- Interrupt não funcionando
- Field Gauge positioning
- JS formula errors
- E mais issues frequentes

## Relação Entre Áreas

1. **Conceitos → Configuração**: Entender a mecânica antes de configurar parâmetros
2. **Configuração → Features**: Parâmetros definem comportamento das features
3. **Notetags → Features**: Notetags implementam features específicas
4. **Comandos Plugin → Features**: Commands permitem dynamic changes
5. **JavaScript → Todos**: JS formulas aparecem em parâmetros e notetags

## Links e Referências Internas

- Para entender como speed afeta a gauge: ver `features/skill-item-speeds.md`
- Para configurar cores da gauge: ver `configuration/parametros-gauge.md`
- Para implementar interrupts: ver `notetags/gauge-manipulation.md`
- Para customizar com JavaScript: ver `notetags/javascript.md`
- Para problemas com compatibilidade: ver `referencia/compatibilidade.md`

## Metadados do Plugin

- **Nome**: VisuStella MZ Active Turn Battle
- **Tier**: 2
- **Requisitos**: VisuMZ_1_BattleCore (obrigatório)
- **Compatível**: VisuMZ_0_CoreEngine, VisuMZ_1_OptionsCore
- **Modo**: TPB (Time Progress Active/Wait)
- **Tipo**: Battle System

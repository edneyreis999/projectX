# O que é ATB?

**Active Turn Battle (ATB)** é um sistema de batalha onde personagens e inimigos possuem barras de tempo que enchem continuamente. Quando a barra atinge 100%, o battler pode executar uma ação.

## Visão Geral

### Diferença TPB vs ATB

O **RPG Maker MZ** possui nativamente o sistema **TPB (Time Progress Battle)**. O plugin **VisuStella Active Turn Battle** expande este sistema adicionando funcionalidades clássicas de ATB, similar aos jogos Final Fantasy.

| Característica | TPB (Natiro) | ATB (Plugin) |
|----------------|--------------|--------------|
| Barras visuais | Básico | Avançado com cores |
| Sistema de casting | Limitado | Completo com interrupts |
| Field Gauge | Não | Sim |
| Manipulação de gauge | Limitada | Via notetags |
| Cores por estado | Não | Sim |

### Como Funciona

1. **Início da batalha**: Cada battler começa com uma gauge baseada em AGI
2. **Enchimento**: A barra enche conforme a fórmula de velocidade (baseada em AGI)
3. **Ação**: Quando a barra atinge 100%, o battler pode agir
4. **Pós-ação**: A barra redefine para um valor (configurável)

### Configuração Necessária

Para usar o sistema ATB, configure:

1. **Database > System**
2. **Battle System**: Selecione:
   - "Time Progress (Active)" - O tempo flui mesmo com menus abertos
   - "Time Progress (Wait)" - O tempo para com menus abertos

## Vantagens do ATB

### Visualização Clara
- Barras sobre os battlers mostram exatamente quando agirão
- Field Gauge mostra ordem relativa de todos os participantes
- Cores indicam estado atual (casting, slow, stop, etc.)

### Profundidade Estratégica
- **Casting**: Skills com speed negativo criam tempo de cast
- **Interrupts**: Ações podem interromper casting inimigo
- **Gauge Manipulation**: Skills podem modificar gauges alheias
- **AGI como stat primário**: Mais impacto que em sistemas turn-based

### Customização
- Fórmulas JS para velocidade, aceleração, cast time
- Notetags para comportamentos específicos
- Parâmetros visuais totalmente configuráveis

## Quando Usar ATB

### Use ATB se você quer:
- ⚡ Batalhas mais dinâmicas e rápidas
- 👊 Estratégia baseada em timing
- 🎯 Controle preciso da ordem de turnos
- 🎨 Feedback visual claro do tempo

### Considere outros sistemas se:
- 🐌 Prefere batalhas mais lentas e pensadas
- 🎲 Quer pureza turn-based sem pressão
- 📱 Limitações de performance (muitos battlers)

## Ver Também

- [Mecânica de Agilidade](./mecanica-agilidade.md) - Como AGI afeta as barras
- [Estados de Combate](./estados-combate.md) - Estados possíveis dos battlers
- [Configuration](../configuration/) - Parâmetros configuráveis

## Requisitos

- **RPG Maker MZ**
- **VisuMZ_1_BattleCore** (obrigatório)
- Configuração: Database > System 1 > Time Progress

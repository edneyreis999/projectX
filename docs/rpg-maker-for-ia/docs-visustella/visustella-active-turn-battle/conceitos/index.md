# Conceitos do Active Turn Battle

Esta seção explica os fundamentos do sistema Active Turn Battle (ATB) implementado pelo plugin VisuStella MZ.

## Documentos

### [O que é ATB?](./o-que-e-atb.md)
Introdução ao sistema Active Turn Battle, suas diferenças em relação ao TPB padrão do RPG Maker MZ, e quando utilizá-lo.

### [Mecânica de Agilidade](./mecanica-agilidade.md)
Como a estatística AGI (Agilidade) afeta o enchimento das barras de ATB e como customizar as fórmulas de velocidade.

### [Estados de Combate](./estados-combate.md)
Os diferentes estados que um battler pode estar durante o combate: Ready, Casting, Charging, Stop, Slow, e Fast.

## Conceitos Fundamentais

### ATB (Active Time Battle)
Sistema de batalha onde personagens e inimigos possuem barras de tempo que enchem continuamente. Quando a barra atinge 100%, o battler pode executar uma ação.

### TPB vs ATB
- **TPB (Time Progress Battle)**: Sistema base do RPG Maker MZ
- **ATB (Active Time Battle)**: Expansão via plugin VisuStella

O plugin ATB adiciona ao TPB:
- Barras visuais sobre os battlers
- Sistema de interrupção de ações
- Manipulação de gauges via notetags
- Field Gauge com ordem de turnos
- Cores diferenciadas por estado

### AGI (Agility)
Estatística primária que determina a velocidade de enchimento da barra de ATB. Battlers com AGI maior ench suas barras mais rapidamente.

### Casting
Estado especial onde um battler está carregando uma habilidade com speed negativo. A barra diminui ao invés de aumentar, e pode ser interrompida.

## Navegação

- ← [Voltar ao índice principal](../index.md)
- → [Configuration](../configuration/) - Configurar parâmetros do plugin
- → [Features](../features/) - Implementar notetags

## Ver Também

- [Mecânica de Agilidade](./mecanica-agilidade.md) - Fórmulas JS customizáveis
- [Glossário](../reference/glossario.md) - Termos técnicos

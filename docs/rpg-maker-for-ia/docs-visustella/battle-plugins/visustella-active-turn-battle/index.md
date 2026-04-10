# VisuStella MZ Active Turn Battle (ATB)

**Autor:** VisuStella
**Versão:** MZ
**Tier:** 2
**Requisitos:** VisuMZ_1_BattleCore

## Visão Geral

O plugin VisuStella MZ Active Turn Battle (ATB) transforma o sistema Time Progress Battle (TPB) do RPG Maker MZ no aclamado sistema Active Turn Battle (ATB). Este plugin oferece controle completo sobre mecânicas de batalha em tempo real, incluindo manipulação de gauges ATB, interrupções de cast, e visualização avançada de gauges para aliados e inimigos.

## Características Principais

- Controle total das mecânicas TPB/ATB (velocidade, cálculos, penalidades)
- Notetags para manipulação de ATB Gauge em skills e items
- Sistema de interrupção para habilidades em cast
- Gauges ATB visuais sobre personagens e inimigos
- Cores diferenciadas para diferentes estados da gauge
- Field Gauge com marcadores para todos os battlers

## Requisitos de Sistema

- **RPG Maker MZ** (não compatível com outras versões)
- **VisuMZ_1_BattleCore** (obrigatório)
- **Configuração:** Game project deve estar em modo TPB (Time Progress Active/Wait)

## Estrutura da Documentação

### 📚 Conceitos
- [Visão Geral](conceitos/visao-geral.md) - Introdução ao sistema ATB
- [Mecânica ATB](conceitos/mecanica-atb.md) - Como funciona o sistema ATB
- [Mudanças Core](conceitos/mudancas-core.md) - Alterações no RPG Maker MZ

### ⚙️ Configuração
- [Parâmetros: Mecânica](configuration/parametros-mecanica.md) - Speed, AGI, penalidades
- [Parâmetros: Interrupt](configuration/parametros-interrupt.md) - Configuração de interrupções
- [Parâmetros: Gauge](configuration/parametros-gauge.md) - Configuração visual das gauges
- [Parâmetros: Field Gauge](configuration/parametros-field-gauge.md) - Gauge de campo completa
- [Parâmetros: Opções](configuration/parametros-opcoes.md) - Configurações de opções

### ✨ Features
- [ATB Gauges](features/atb-gauges.md) - Sistema de gauges visuais
- [Skill & Item Speeds](features/skill-item-speeds.md) - Velocidade de skills e items
- [Field Gauge](features/field-gauge.md) - Gauge de campo expandido

### 📝 Notetags
- [Gerais](notetags/gerais.md) - Notetags gerais ATB
- [Field Gauge](notetags/field-gauge.md) - Notetags para Field Gauge
- [Gauge Manipulation](notetags/gauge-manipulation.md) - Manipulação de gauges
- [JavaScript](notetags/javascript.md) - Notetags JavaScript avançadas

### 🎮 Comandos Plugin
- [Atores](comandos-plugin/atores.md) - Comandos para personagens
- [Inimigos](comandos-plugin/inimigos.md) - Comandos para inimigos
- [Sistema](comandos-plugin/sistema.md) - Comandos de sistema

### 📖 Referência
- [Glossário](referencia/glossario.md) - Termos e definições
- [Compatibilidade](referencia/compatibilidade.md) - Plugins compatíveis
- [Troubleshooting](referencia/troubleshooting.md) - Solução de problemas

## Caminho Recomendado de Leitura

1. Comece pela **[Visão Geral](conceitos/visao-geral.md)** para entender o sistema
2. Leia **[Mecânica ATB](conceitos/mecanica-atb.md)** para compreender o funcionamento
3. Configure os **[Parâmetros](configuration/)** conforme necessário
4. Consulte **[Notetags](notetags/)** para implementar features específicas
5. Use **[Comandos Plugin](comandos-plugin/)** para eventos

## Informações de Compatibilidade

- **Tier:** 2 (coloque após plugins Tier 0 e 1)
- **Compatível com:**
  - VisuMZ_0_CoreEngine (animações de interrupt)
  - VisuMZ_1_OptionsCore (opções de ATB speed)

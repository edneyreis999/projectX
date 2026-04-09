# VisuStella MZ - Active Turn Battle

Documentação completa do plugin **VisuStella MZ Active Turn Battle** para RPG Maker MZ.

## Sobre Este Plugin

O plugin **Active Turn Battle (ATB)** transforma o sistema Time Progress Battle (TPB) do RPG Maker MZ em um sistema de batalha por turnos ativos completo, inspirado nos clássicos jogos Final Fantasy. Battlers possuem barras de tempo que enchem conforme sua agilidade, e podem agir quando a barra estiver cheia.

### Conceito Central

**ATB (Active Time Battle)**: Sistema de batalha onde cada personagem/inimigo possui uma barra de tempo que enche baseada em sua estatística de AGI (Agilidade). Quando a barra atinge 100%, o battler pode executar uma ação.

## Estrutura da Documentação

### 📖 [Conceitos](./conceitos/)
- **[O que é ATB?](./conceitos/o-que-e-atb.md)** - Introdução ao sistema Active Turn Battle
- **[Mecânica de Agilidade](./conceitos/mecanica-agilidade.md)** - Como AGI afeta o enchimento das barras
- **[Estados de Combate](./conceitos/estados-combate.md)** - Estados possíveis dos battlers (casting, charging, ready)

### ⚙️ [Configuration](./configuration/)
- **[ATB Gauge](./configuration/atb-gauge.md)** - Configuração da barra de ATB (posição, cores, tamanho)
- **[Turn Order Display](./configuration/turn-order-display.md)** - Display de ordem de turnos
- **[Field Gauge](./configuration/field-gauge.md)** - Gauge de campo mostrando todos os battlers
- **[Timing e Fórmulas](./configuration/timing-formulas.md)** - Configurações de velocidade e fórmulas JS
- **[Interrupts](./configuration/interrupts.md)** - Sistema de interrupção de ações
- **[Sound Effects](./configuration/sound-effects.md)** - Efeitos sonoros

### ✨ [Features](./features/)
- **[Skills e Items](./features/skills-items.md)** - Notetags para habilidades e itens
- **[Actors e Enemies](./features/actors-enemies.md)** - Notetags para personagens e inimigos
- **[States](./features/states.md)** - Notetags para estados

### 📚 [Reference](./reference/)
- **[Troubleshooting](./reference/troubleshooting.md)** - Problemas comuns e soluções
- **[Glossário](./reference/glossario.md)** - Termos técnicos
- **[Compatibilidade](./reference/compatibilidade.md)** - Compatibilidade com outros plugins

## Requisitos

### Obrigatórios
- **RPG Maker MZ**
- **VisuMZ_1_BattleCore** (Tier 1)

### Configurações Necessárias

Para que o sistema ATB funcione corretamente, configure:

1. **Database > System 1**
2. **Battle System**: Selecione "Time Progress (Active)" ou "Time Progress (Wait)"

## Funcionalidades Principais

### Core Features
- ✅ Barras de ATB visíveis sobre battlers
- ✅ Sistema de casting (habilidades com speed negativo)
- ✅ Interrupção de ações em andamento
- ✅ Field Gauge mostrando ordem de turnos
- ✅ Cores diferentes para estados da barra
- ✅ Manipulação de ATB via notetags

### Extra Features (requer plugins adicionais)
- **VisuMZ_0_CoreEngine**: Animações de interrupção
- **VisuMZ_1_OptionsCore**: Opções para ajustar velocidade do ATB

## Caminho Recomendado de Leitura

Para desenvolvedores iniciando com o plugin:

1. **Conceitos** → Entender o funcionamento do ATB
2. **Configuration** → Configurar parâmetros básicos
3. **Features** → Aplicar notetags em skills/items
4. **Reference** → Consultar troubleshooting e glossário

## Links Úteis

- [Site Oficial VisuStella](https://visustella.github.io/)
- [Documentação Battle Core](./Battle_Core_VisuStella_MZ.md)
- [RPG Maker MZ Documentation](https://www.rpgmakerweb.com/)

## Créditos

Plugin desenvolvido por **VisuStella**.
Documentação organizada para recuperação por LLM.

---

**Última atualização**: 2025-01-09
**Versão do Plugin**: Consulte arquivo do plugin

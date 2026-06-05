# VisuStella MZ - Battle Core

> Plugin central de batalha para RPG Maker MZ com Action Sequences, Battle Layouts customizáveis e controle total sobre mecânicas de combate.

## Versão

- **Versão**: 1.85
- **Data**: Outubro 17, 2024
- **Tier**: 1
- **Autor**: VisuStella (Yanfly, Arisu, Olivia, Irina)

## Sobre Este Plugin

O Battle Core plugin revampa completamente o engine de batalha do RPG Maker MZ, tornando-o mais flexível, streamline e com suporte a uma variedade de features. O engine de batalha atualizado permite:

- **Action Sequences** customizáveis com controle total sobre o que acontece durante skills e itens
- **Battle Layout styles** para mudar a aparência da cena de batalha
- **Controle extensivo** sobre mecânicas de batalha

### Funcionalidades Principais

✅ Action Sequence Plugin Commands para controle total
✅ Animated Sideview Battler support para inimigos
✅ Auto Battle options para party e actors individuais
✅ Base Troop Events para streamlining de eventos
✅ Battle Command control
✅ Battle Layout styles customizáveis
✅ Casting animation support
✅ Critical Hit control (fórmulas e multiplicadores)
✅ Custom target scopes para skills e itens
✅ Damage formula control e Damage Styles
✅ Damage caps (hard e soft)
✅ Damage traits (Armor Penetration/Reduction)
✅ JavaScript notetags e Plugin Parameters
✅ Party Command window customizável
✅ Weather effects em batalha
✅ Battle Log streamline
✅ Visual HP Gauges para actors e enemies

## Requisitos

### Obrigatórios
- **RPG Maker MZ**
- **VisuMZ_0_CoreEngine** (Tier 0)

### Configuração

Este é um plugin **Tier 1**. Coloque-o após plugins Tier 0 no Plugin Manager.

## Estrutura da Documentação

### 📖 [Conceitos](./conceitos/)
Comece aqui para entender o funcionamento do Battle Core:
- **[Visão Geral](./conceitos/visao-geral.md)** - Introdução e features principais
- **[Major Changes](./conceitos/major-changes.md)** - Mudanças no código base do RPG Maker MZ
- **[Base Troops](./conceitos/base-troops.md)** - Sistema de Base Troops para eventos compartilhados
- **[Damage Styles](./conceitos/damage-styles.md)** - Sistema de Damage Styles

### 🏷️ [Notetags](./notetags/)
Referência completa de notetags JavaScript:
- **[HP Gauge](./notetags/hp-gauge.md)** - Notetags para HP Gauges
- **[Animação](./notetags/animacao.md)** - Notetags para animações
- **[Battleback](./notetags/battleback.md)** - Notetags para battlebacks
- **[Battle Command](./notetags/battle-command.md)** - Notetags para comandos de batalha
- **[Targeting](./notetags/targeting.md)** - Notetags para alvos
- **[Damage](./notetags/damage.md)** - Notetags para dano
- **[Critical](./notetags/critical.md)** - Notetags para críticos
- **[Life Steal](./notetags/life-steal.md)** - Notetags para life steal
- **[Action Sequence](./notetags/action-sequence.md)** - Notetags para action sequences
- **[Animated Sideview Battler](./notetags/animated-sideview-battler.md)** - Notetags para sideview battlers
- **[Enemy](./notetags/enemy.md)** - Notetags específicas para inimigos
- **[Mechanics](./notetags/mechanics.md)** - Notetags para mecânicas
- **[Battle Layout](./notetags/battle-layout.md)** - Notetags para layout de batalha
- **[Troop Tags](./notetags/troop-tags.md)** - Troop Size e Comment Tags

### ⚙️ [Parâmetros](./parametros/)
Configuração do plugin:
- **[Auto Battle](./parametros/auto-battle.md)** - Auto Battle Settings
- **[Damage](./parametros/damage.md)** - Damage Settings
- **[Mechanics](./parametros/mechanics.md)** - Mechanics Settings
- **[Battle Layout](./parametros/battle-layout.md)** - Battle Layout Settings
- **[Battle Log](./parametros/battle-log.md)** - Battle Log Settings
- **[Battleback Scaling](./parametros/battleback-scaling.md)** - Battleback Scaling Settings
- **[Party Command Window](./parametros/party-command-window.md)** - Party Command Window
- **[Actor Command Window](./parametros/actor-command-window.md)** - Actor Command Window
- **[In-Battle Status Window](./parametros/in-battle-status-window.md)** - Status Window Settings
- **[Multi-Target Windows](./parametros/multi-target-windows.md)** - Multi-Target Windows Settings
- **[Damage Combo Window](./parametros/damage-combo-window.md)** - Damage Combo Window Settings
- **[Actor Battler Settings](./parametros/actor-battler-settings.md)** - Actor Battler Settings
- **[Enemy Battler Settings](./parametros/enemy-battler-settings.md)** - Enemy Battler Settings
- **[HP Gauge](./parametros/hp-gauge.md)** - HP Gauge Settings
- **[Action Sequence](./parametros/action-sequence.md)** - Action Sequence Settings

### 🎬 [Action Sequences](./action-sequences/)
Referência completa dos comandos de Action Sequence:
- **[Action Sets](./action-sequences/action-sets.md)** - Action Sets (grupos de comandos)
- **[Animações](./action-sequences/animacoes.md)** - Animações
- **[Battle Log](./action-sequences/battle-log.md)** - Battle Log commands
- **[Camera](./action-sequences/camera.md)** - Camera commands
- **[Cutins](./action-sequences/cutins.md)** - Cutins commands
- **[Elements](./action-sequences/elements.md)** - Elements commands
- **[Grid](./action-sequences/grid.md)** - Grid commands
- **[Horror Effects](./action-sequences/horror-effects.md)** - Horror Effects commands
- **[Impact](./action-sequences/impact.md)** - Impact commands
- **[Inject](./action-sequences/inject.md)** - Inject commands
- **[Mechanics](./action-sequences/mechanics.md)** - Mechanics commands
- **[Motion](./action-sequences/motion.md)** - Motion commands
- **[Movement](./action-sequences/movement.md)** - Movement commands
- **[Opacity](./action-sequences/opacity.md)** - Opacity commands
- **[Overlays](./action-sequences/overlays.md)** - Overlays commands
- **[Pictures](./action-sequences/pictures.md)** - Picture commands
- **[Portraits](./action-sequences/portraits.md)** - Portrait commands
- **[Shake](./action-sequences/shake.md)** - Shake commands
- **[Sound](./action-sequences/sound.md)** - Sound commands
- **[State](./action-sequences/state.md)** - State commands
- **[Targets](./action-sequences/targets.md)** - Target commands
- **[Time](./action-sequences/time.md)** - Time commands
- **[Toggle](./action-sequences/toggle.md)** - Toggle commands
- **[Transform](./action-sequences/transform.md)** - Transform commands
- **[User Interface](./action-sequences/user-interface.md)** - UI commands
- **[Visible](./action-sequences/visible.md)** - Visibility commands
- **[Wait](./action-sequences/wait.md)** - Wait/Frames commands

### 📚 [Referência](./referencia/)
- **[Compatibilidade](./referencia/compatibilidade.md)** - VisuStella MZ Compatibility
- **[Termos de Uso](./referencia/termos-uso.md)** - Terms of Use
- **[Créditos](./referencia/creditos.md)** - Credits
- **[Changelog](./referencia/changelog.md)** - Histórico de atualizações
- **[Troubleshooting](./referencia/troubleshooting.md)** - Problemas comuns e soluções
- **[Glossário](./referencia/glossario.md)** - Termos técnicos

## Caminho Recomendado de Leitura

Para desenvolvedores iniciando com o Battle Core:

1. **[Conceitos → Visão Geral](./conceitos/visao-geral.md)** - Entender o propósito e features
2. **[Conceitos → Major Changes](./conceitos/major-changes.md)** - Entender as mudanças no core
3. **[Parâmetros → Mechanics](./parametros/mechanics.md)** - Configurar parâmetros básicos
4. **[Notetags](./notetags/)** - Aplicar notetags conforme necessário
5. **[Action Sequences](./action-sequences/)** - Criar action sequences customizadas
6. **[Referência](./referencia/)** - Consultar compatibilidade e troubleshooting

## Links Úteis

- [Site Oficial VisuStella](https://visustella.github.io/)
- [Documentação Original](http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ)
- [RPG Maker MZ Documentation](https://www.rpgmakerweb.com/)

## Integração com Outros Plugins

Este plugin é **Tier 1** na hierarquia VisuStella. É dependência de:

- VisuMZ_1_ActiveTimeBattle (ATB)
- VisuMZ_1_Boost
- VisuMZ_1_DamageCap
- Outros plugins de batalha VisuStella

**Dependências:**
- VisuMZ_0_CoreEngine (Tier 0) - Obrigatório

---

**Última atualização**: 2025-01-09
**Versão do Plugin**: 1.85

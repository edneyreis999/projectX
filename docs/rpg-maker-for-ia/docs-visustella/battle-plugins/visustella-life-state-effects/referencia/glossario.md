# Glossário - Life State Effects

## Termos Gerais

### Battler
Qualquer unidade que participa de batalha: Actors (personagens do jogador) ou Enemies (inimigos).

### State
Condição temporária que pode ser aplicada a um battler. States têm duração em turns e podem conferir diversos efeitos.

### Trait Object
Qualquer objeto do database que pode ter traits: Actor, Class, Skill, Weapon, Armor, Enemy, ou State.

### Notetag
Comando especial dentro de caixas de texto do database do RPG Maker, usado para conferir funcionalidades personalizadas.

### Tier
Sistema de numeração que determina a ordem de carregamento de plugins VisuStella. Plugins com tier maior devem ser colocados abaixo de tiers menores.

## Termos Específicos do Plugin

### Auto Life
Efeito que revive um battler ao morrer, restaurando uma porcentagem do HP máximo. Remove o estado ao ativar.

### Curse
Efeito que bloqueia recuperação de um recurso específico (HP, MP ou TP).

### Doom
Efeito que mata o battler quando o estado expira naturalmente (após timer esgotar).

### Extinct
Efeito que impede o battler de reviver ou ser revivido enquanto ativo. Suprime Auto Life mas não Death Transformations.

### Fragile
Efeito que causa morte instantânea ao receber qualquer quantidade de dano direto de HP.

### Guts
Efeito que reduz dano fatal para deixar exatamente 1 HP. Não funciona se o battler já estiver com 1 HP.

### Undead
Efeito complexo que inverte curing em damage, morte instantânea em cura completa, e efeitos de drain.

### Allow Undead Regen
Override que permite regeneração curar um battler Undead em vez de causar dano.

### Death Transform
Efeito que faz um inimigo se transformar em outro ao morrer, com HP/MP completos.

### Transform Animation
Animação que toca no novo enemy após uma Death Transformation. Requer Core Engine.

## Termos de Battle System

### Direct Action
Ação que causa dano diretamente através de skill ou item, diferente de dano por evento ou regeneração.

### Instant Death
Efeito que mata o battler imediatamente, ignorando HP.

### Drain
Efeito que recupera HP do atacante baseado no dano causado ao alvo.

### Elemental Absorb
Quando um battler absorve um elemento, recebendo cura em vez de dano de ataques desse elemento.

### HP Regen
Recuperação passiva de HP ao longo de turns ou por eventos.

## Termos Técnicos

### Plugin Parameters
Configurações ajustáveis do plugin através do Plugin Manager.

### Animation ID
Número que identifica uma animação específica no database do RPG Maker.

### Window Skin
Gráfico que define a aparência de janelas, incluindo paleta de cores padrão para textos.

### Flash Color
Cor RGB com canal alpha usada para criar efeito de flash/pop-up visual.

### Frame
Unidade de tempo no RPG Maker MZ. 60 frames = 1 segundo @ 60 FPS.

## Acrônimos e Abreviações

| Termo | Significado |
|-------|-------------|
| HP | Health Points / Pontos de Vida |
| MP | Magic Points / Pontos de Magia |
| TP | Tactical Points / Pontos Táticos |
| MZ | RPG Maker MZ |
| VisuMZ | VisuStella MZ (série de plugins) |
| Core Engine | Plugin VisuMZ_0_CoreEngine |

## Comparativo Rápido

| Efeito | Previne Morte | Causa Morte | Bloqueia Cura | Cura |
|--------|---------------|-------------|---------------|------|
| Auto Life | ✅ (revive) | - | - | ✅ |
| Doom | - | ✅ | - | - |
| Extinct | ✅ | - | - | - |
| Fragile | - | ✅ | - | - |
| Guts | ✅ (1 HP) | - | - | - |
| Undead | - | - | ✅ (inverte) | ✅ (invertido) |

## Expressões Idiomáticas

### "Explode naturally"
Quando um state expira por timer, não por remoção manual. Importante para Doom.

### "Direct action"
Skill ou item que causa dano, diferente de damage por eventos.

### "Fatal damage"
Quantidade de dano que reduziria HP a 0 ou menos.

## Referências Cruzadas

- **Conceitos**: Veja [Funcionamento](../conceitos/funcionamento.md) para detalhes
- **Notetags**: Consulte [State-Only](../notetags/state-only.md), [Trait-Objects](../notetags/trait-objects.md)
- **Configuração**: Veja [Parâmetros](../parametros/configuracoes.md)

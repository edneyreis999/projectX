# Glossário — Visual State Effects

| Termo | Definição |
|-------|-----------|
| **State Overlay** | Imagem sobreposta ao sprite do battler indicando um state ativo (ex: poison bubbles) |
| **State Icon** | Ícone do state exibido acima do battler na tela de batalha |
| **State Popup** | Texto que aparece brevemente ao aplicar/remover um state, buff ou debuff |
| **State Motion** | Animação do sprite do battler (walk, guard, sleep, etc.) controlada por states |
| **State Motion Lock** | Congela o sprite na posição atual enquanto o state estiver ativo |
| **State Tone** | Coloração (tint) aplicada ao sprite via state (red, green, blue, gray) |
| **Repeat Animation** | Animação que repete em ciclos enquanto o battler está afetado |
| **Repeat Animation Cycle** | Número de frames entre cada repetição de animação |
| **Custom Overlay** | Arquivo de imagem customizado usado em vez do States.png padrão |
| **Visual Opacity** | Transparência do sprite principal do battler (0–255) |
| **Visual Rainbow** | Efeito de shift cromático contínuo no sprite |
| **Visual Hover** | Efeito de flutuação com bobbing vertical |
| **Visual Breathing** | Escala cíclica do sprite simulando respiração (experimental) |
| **HP Link** | Conecta velocidade do breathing ao HP rate do battler |
| **Flash Color** | Cor do flash de popup no formato `[r, g, b, a]` (0–255) |
| **Text Color** | Cor do texto via `#rrggbb` ou índice do Window Skin |
| **Trait Object** | Qualquer objeto com traits no RPG Maker: Actor, Class, Skill, Weapon, Armor, Enemy, State |
| **Passive State Conditions** | Condições para states passivos — efeitos visuais são cacheados e atualizam no refresh cycle |
| **Refresh Cycle** | Momento em que o engine atualiza dados cacheados do battler |
| **Tier 3** | Ordem de carregamento do plugin — deve ficar abaixo de tiers 0, 1, 2 |

## Navegação

- [← Response Popup](../parametros/response-popup.md)
- [Performance →](performance.md)

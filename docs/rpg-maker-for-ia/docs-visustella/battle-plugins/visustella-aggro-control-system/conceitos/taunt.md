# Taunt

## O que e

Taunt e uma mecanica que redireciona acoes de tipo especifico para o taunter. Diferente do Provoke (baseado em states), Taunt pode ser aplicado em quase qualquer **trait object**.

## Tipos de Taunt

| Taunt | Afeta |
|-------|-------|
| `<Taunt>` / `<All Taunt>` | Todas as acoes (physical, magical, certain hit) |
| `<Physical Taunt>` | Apenas acoes fisicas |
| `<Magical Taunt>` | Apenas acoes magicas |
| `<Certain Taunt>` | Apenas acoes certain hit |

Os tipos podem ser combinados. Exemplo: um battler com `<Physical Taunt>` e `<Magical Taunt>` sera alvo de acoes fisicas E magicas.

## Como Funciona

1. Um battler tem taunt ativo (via trait object)
2. Quando o time oposto seleciona um alvo para acao single-target do tipo correspondente
3. A selecao e limitada apenas aos battlers com taunt do tipo relevante
4. Se multiplos taunters existem, o time oposto pode selecionar entre qualquer um deles

### Para Atores (Jogador)
- Quando o jogador vai selecionar um alvo e inimigos com taunt existem
- A selecao e limitada aos inimigos com taunt ativo

### Para Inimigos (AI)
- Inimigos com taunt ativo no time oposto forcam a AI a focar neles

## Bypass

A notetag `<Bypass Taunt>` permite ignorar completamente o efeito de taunt:

- **Em Trait Objects** (Actor, Class, Weapon, Armor, Enemy, State): A unidade ignora todos os taunt effects
- **Em Skills/Items**: A acao ignora taunt effects, permitindo selecionar alvos normalmente

## Trait Objects Suportados

Taunt pode ser adicionado em:
- Actor
- Class
- Weapon
- Armor
- Enemy
- State

Isso permite builds flexiveis como: arma com Physical Taunt, armadura com Magical Taunt, ou state temporario com All Taunt.

## Visual (Requer Core Engine + Battle Core)

Quando ambos os plugins estao instalados:
- **Taunt Animations**: Animacoes ciclicas sobre battlers com taunt
- Animacoes diferentes para cada tipo (Physical, Magical, Certain Hit)
- Configuravel: animation ID, cycle time, mirror, mute SFX

## Notetags Relacionadas

| Notetag | Uso | Descricao |
|---------|-----|-----------|
| `<Taunt>` / `<All Taunt>` | Trait Objects | Taunt para todos os tipos |
| `<Physical Taunt>` | Trait Objects | Taunt apenas para fisico |
| `<Magical Taunt>` | Trait Objects | Taunt apenas para magico |
| `<Certain Taunt>` | Trait Objects | Taunt apenas para certain hit |
| `<Bypass Taunt>` | Trait Objects, Skills, Items | Ignora taunt |

Veja [Notetags Taunt](../notetags/taunt.md) para detalhes completos.

## Configuracao Visual

Ajustado em **Plugin Parameters > Taunt Settings**:
- Show Animations?
- Animation IDs (Physical, Magical, Certain)
- Animation Settings (Cycle Time, Mirror, Mute SFX)

Veja [Parametros Taunt](../parametros/taunt-settings.md) para todos os parametros.

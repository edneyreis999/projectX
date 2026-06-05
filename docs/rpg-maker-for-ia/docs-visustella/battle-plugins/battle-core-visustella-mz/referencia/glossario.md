# Glossário - Battle Core

## Termos Técnicos

### Action Sequence
Sequência de actions que controla o que acontece durante uma skill ou item. Permite customização completa de animações, movimentos, efeitos visuais, e muito mais.

### Action Set
Grupo de Action Sequence commands comumente usados juntos. Exemplos: ANIMATION ACTION SET, BASIC ACTION SET, SKILL ACTION SET.

### Auto Battle
Modo onde battlers selecionam actions automaticamente baseado em AI, sem input do jogador.

### Base Troop
Troop especial cujos eventos são replicados e aplicados a todos os outros troops no database.

### Battle Core
Plugin central da biblioteca VisuStella MZ que revampa o engine de batalha do RPG Maker MZ.

### Battle Layout
Estilo visual de como a batalha é apresentada (sideview, frontview, etc.).

### Damage Formula
Fórmula usada para calcular o dano de uma action.

### Damage Style
Método simplificado de calcular dano usando power constants ou multipliers ao invés de fórmulas completas.

### Force Action
Action que é forçada a ocorrer, adicionada a uma queue separada da action battler list.

### HP Gauge
Barra visual mostrando o HP atual de um battler.

### Life Steal
Habilidade de roubar HP ou MP do target.

### Notetag
Tag JavaScript colocada em database entries (skills, items, actors, enemies, etc.) para customizar comportamento.

### Plugin Parameter
Configuração global do plugin que afeta o comportamento de todo o sistema.

### Random Scope
Scope de targeting que seleciona targets aleatoriamente.

### Sideview Battler
Sprite de battler mostrado em perfil (sideview), permitindo animações mais detalhadas.

### TPB/ATB
Sistemas de batalha onde battlers têm barras de tempo que enchem (Time Progress Battle / Active Time Battle).

## Abreviações

| Abreviação | Significado |
|------------|-------------|
| AGI | Agility (Agilidade) |
| ATK | Attack (Ataque) |
| MAT | Magic Attack (Ataque Mágico) |
| MDF | Magic Defense (Defesa Mágica) |
| DEF | Defense (Defesa) |
| LUK | Luck (Sorte) |
| HP | Hit Points (Pontos de Vida) |
| MP | Magic Points (Pontos de Magia) |
| TP | Tension Points |
| CRI | Critical (Crítico) |
| TGR | Target Rate (Taxa de Alvo) |

## Termos Específicos VisuStella

### Tier
Sistema de hierarquia de plugins VisuStella MZ:
- **Tier 0**: Core Engine (base)
- **Tier 1**: Plugins principais (Battle Core, etc.)
- **Tier 2+**: Plugins especializados que dependem de tiers inferiores

### Boost
Mecanismo (de plugins específicos) que aumenta efeitos de actions.

### Common Event
Evento do database que pode ser chamado de múltiplos lugares.

### Counter
Attack que ocorre automaticamente em response a ser atacado.

### Reflect
Reflete uma action de volta ao attacker original.

### Substitute
Um battler toma o damage no lugar de outro battler.

## Termos de Battle System

### Turn Order
Ordem na qual battlers agem durante a batalha.

### Action Speed
Valor que determina quando um battler age em relação aos outros.

### Random Variance
Variação aleatória aplicada ao action speed (desabilitado por padrão no Battle Core).

### Battler
Qualquer participante de batalha (actor ou enemy).

### Scope
Alvos de uma action (single enemy, all enemies, single ally, etc.).

### Hit Type
Tipo de hit (Physical, Magical, Certain Hit).

### Damage Type
Tipo de dano (Damage, Recover, Drain).

## Ver Também

- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Introdução ao Battle Core
- [Referência: Troubleshooting](./troubleshooting.md) - Problemas comuns

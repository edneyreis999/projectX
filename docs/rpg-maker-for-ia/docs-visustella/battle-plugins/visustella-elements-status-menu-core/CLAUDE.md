# VisuStella Elements & Status Menu Core - Documentacao Completa

## Sumario

Plugin Tier 1 da VisuStella MZ que expande significativamente o sistema elemental do RPG Maker MZ, adicionando Trait Sets para atribuicao em massa de propriedades, e moderniza o Status Menu.

## Areas e Documentos

### Conceitos
- **visao-geral.md**: Introducao ao plugin, features completas, requisitos (RPG Maker MZ, Tier 1), extensoes compatíveis (Anti-Damage Barriers, Weakness Display).
- **calculo-dano-elemental.md**: Explicacao detalhada de como o dano elemental e calculado, incluindo lados target e user, formula (base + plus) * rate + flat, e modificadores Plus/Rate/Flat.
- **multi-elemento.md**: Regras para acoes com multiplos elementos: Maximum (maior taxa), Minimum (menor taxa), Multiply (produto), Additive (soma), Average (media). Como reflection funciona com multi-elementos.
- **trait-sets.md**: Sistema de 10 tipos de Trait Sets que permitem atribuir propriedades em massa. Randomizacao com pesos. Nomes de inimigos dinamicos. Troca mid-game via Plugin Commands.

### Notetags
- **elementos.md**: Notetags para Multi-Element, Force Action Element, Received Element (Plus/Rate/Flat), Dealt Element (Plus/Rate/Flat), Element Absorb, Element Reflect, Bypass Element Reflect, Element Reflect Rule, Element Pierce. Para skills, items, actors, classes, weapons, armors, enemies, states.
- **js-elementos.md**: Variacoes JavaScript de todas as notetags de elemento para calculos dinamicos. Variaveis: user, target, elementId, rate.
- **trait-sets.md**: Notetags para atribuir Trait Sets (inline e bloco), randomizar com pesos, impedir randomizacao, formatar nome de inimigo, trocar battler/hue por trait, requisitos de equip, bonus VS trait (Damage/Healing/Accuracy/Critical), Replace Trait.
- **biografia-ator.md**: Notetag <Biography> para definir biografia do ator no Status Menu atualizado.
- **referencia-rapida.md**: Tabela completa com todas as notetags, onde se aplicam e descricao curta.

### Comandos
- **ator.md**: Change Biography (Group/Range/JS), Change Trait Sets (Group/Range/JS).
- **inimigo.md**: Change Trait Sets (Group/Range/JS).
- **script-calls.md**: battler.hasTraitSet(typeName) e exemplos.

### Parametros
- **element-rulings.md**: Multi-Element Ruling, Reflect-Element Ruling, JS formulas para Maximum/Minimum/Multiply/Additive/Average Rate, Received Rate, Finalize Rate.
- **status-menu.md**: Updated Layout, Layout Style, Trait Set Font Size, Back Rectangles, Category Window, Displayed Parameters, Elements columns, Vocabulary.
- **categorias-status-menu.md**: Categories customizaveis com Symbol, Icon, Text, JS Draw Data.
- **trait-set-geral.md**: Enable Trait Sets, Enemy Name Format, Trait Columns.
- **trait-set-tipos.md**: 10 tipos (Element, SubElement, Gender, Race, Nature, Alignment, Blessing, Curse, Zodiac, Variant). Cada tipo: Name, Display Text, Help Description, Format Text, Valid for Random, Random Weight, Traits (Element Rates, Basic/X/S Parameters, Passive States, Equipment).

### Referencia
- **formula-dano.md**: Formula completa: (base + plus) * rate + flat. Ordem de aplicacao: Plus -> Rate -> Flat. Elementos recebidos vs dealt.
- **glossario.md**: Termos do plugin e suas definicoes.

## Relacoes entre Areas

- Trait Sets dependem de estar habilitados nos Plugin Parameters (trait-set-geral.md)
- Notetags de elementos usam formulas configuradas em element-rulings.md
- Status Menu Categories requer Updated Layout habilitado em status-menu.md
- Script Calls verificam Trait Sets definidos em trait-set-tipos.md
- Element Pierce ignora Absorb/Reflect definidos via notetags de elementos

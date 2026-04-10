# Damage - Notetags

## Visão Geral
Estas notetags permitem configurar propriedades de damage, incluindo estilos de cálculo, redução de armor, penetration, damage caps, e posições de popup.

## Lista de Notetags

### <Damage Style: name>
- **Used for**: Skill, Item Notetags
- **Descrição**: Troca a forma como calculations são feitas usando o damage formula input box
- **Parâmetros**:
  - `name`: nome do Damage Style (encontrado em Plugin Parameters => Damage Settings => Style List)

### <Armor Reduction: x>
### <Armor Reduction: x%>
- **Used for**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Define ou adiciona propriedades de armor reduction
- **Notas**:
  - **Se usado em skills e/ou items**: Sets o current skill/item's armor reduction properties para 'x' e/ou 'x%'
  - **Se usado em trait objects**: Adds 'x' e/ou 'x%' armor reduction properties quando calculating one's own armor
  - Isto aplica-se a physical attacks
  - Use a variante 'x' para determinar um flat reduction value
  - Use a variante 'x%' para determinar um percentile reduction value

### <Armor Penetration: x>
### <Armor Penetration: x%>
- **Used for**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Define ou adiciona propriedades de armor penetration
- **Notas**:
  - **Se usado em skills e/ou items**: Sets o current skill/item's armor penetration properties para 'x' e/ou 'x%'
  - **Se usado em trait objects**: Adds 'x' e/ou 'x%' armor penetration properties quando calculating a target's armor
  - Isto aplica-se a physical attacks
  - Use a variante 'x' para determinar um flat penetration value
  - Use a variante 'x%' para determinar um percentile penetration value

### <Magic Reduction: x>
### <Magic Reduction: x%>
- **Used for**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Define ou adiciona propriedades de magic reduction
- **Notas**:
  - **Se usado em skills e/ou items**: Sets o current skill/item's armor reduction properties para 'x' e/ou 'x%'
  - **Se usado em trait objects**: Adds 'x' e/ou 'x%' armor reduction properties quando calculating one's own armor
  - Isto aplica-se a magical attacks
  - Use a variante 'x' para determinar um flat reduction value
  - Use a variante 'x%' para determinar um percentile reduction value

### <Magic Penetration: x>
### <Magic Penetration: x%>
- **Used for**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Define ou adiciona propriedades de magic penetration
- **Notas**:
  - **Se usado em skills e/ou items**: Sets o current skill/item's armor penetration properties para 'x' e/ou 'x%'
  - **Se usado em trait objects**: Adds 'x' e/ou 'x%' armor penetration properties quando calculating a target's armor
  - Isto aplica-se a magical attacks
  - Use a variante 'x' para determinar um flat penetration value
  - Use a variante 'x%' para determinar um percentile penetration value

### <Bypass Damage Cap>
- **Used for**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Causa que o damage nunca seja capped
- **Notas**:
  - **Se usado em skills e/ou items**: Causa que a action nunca tenha seu damage capped
  - **Se usado em trait objects**: Causa que a affected unit nunca tenha seu damage capped

### <Damage Cap: x>
- **Used for**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Define o hard damage cap para o valor 'x'
- **Parâmetros**:
  - `x`: valor do hard damage cap
- **Notas**:
  - **Se usado em skills e/ou items**: Declara o hard damage cap para ser o 'x' value
  - **Se usado em trait objects**: Raises a affect unit's hard damage cap para 'x' value. Se outro trait object tiver um valor maior, use esse valor ao invés

### <Bypass Soft Damage Cap>
- **Used for**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Causa que o damage nunca seja scaled downward para o soft cap
- **Notas**:
  - **Se usado em skills e/ou items**: Causa que a action nunca tenha seu damage scaled downward para o soft cap
  - **Se usado em trait objects**: Causa que a affected unit nunca tenha seu damage scaled downward para o soft cap

### <Soft Damage Cap: +x%>
### <Soft Damage Cap: -x%>
- **Used for**: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Aumenta/diminui o soft cap por x% onde 'x' é um percentage value representando o increment changed pelo hard cap value
- **Parâmetros**:
  - `x`: percentage value representando o increment changed pelo hard cap value
- **Notas**:
  - **Se usado em skills e/ou items**: Increase/decrease a action's soft cap por x%
  - **Se usado em trait objects**: Raises a affect unit's soft damage limit por x%

### <Unblockable>
- **Used for**: Skill, Item Notetags
- **Descrição**: Usar "Guard" contra esta skill não irá reduzir qualquer damage

## Popup Positioning

### <Popup Position: Head>
### <Popup Position: Center>
### <Popup Position: Base>
- **Used for**: Enemy Notetags
- **Descrição**: Determina a popup starting position para este enemy
- **Opções**:
  - **Head**: Makes os popups start no top do enemy
  - **Center**: Makes os popups start no center do enemy
  - **Base**: Makes os popups start no bottom do enemy
- **Notas**: Se esta notetag não for usada, refere-se ao default Plugin Parameter setting encontrado em Damage Settings

### <Popup Offset X: +x>
### <Popup Offset X: -x>
### <Popup Offset Y: +y>
### <Popup Offset Y: -y>
- **Used for**: Enemy Notetags
- **Descrição**: Alters o popup x/y position offset para este enemy
- **Parâmetros**:
  - `x`: número representando o horizontal position x offset (negativo = left, positivo = right)
  - `y`: número representando o vertical position y offset (negativo = up, positivo = down)
- **Notas**: Se estas notetags não forem usadas, refere-se aos default Plugin Parameter settings encontrados em Damage Settings

## Ver Também

- [Conceitos: Damage Styles](../conceitos/damage-styles.md) - Lista de Damage Styles disponíveis
- [Parâmetros: Damage Settings](../parametros/damage.md) - Configurações globais de damage
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core

# Critical - Notetags

## Visão Geral
Estas notetags afetam skill e item critical hit rates e o critical damage multiplier.

## Lista de Notetags

### <Always Critical>
- **Used for**: Skill, Item Notetags
- **Descrição**: Esta skill/item sempre irá land a critical hit independentemente do user's CRI parameter value

### <Set Critical Rate: x%>
- **Used for**: Skill, Item Notetags
- **Descrição**: Esta skill/item sempre terá uma chance de x% de land a critical hit independentemente do user's CRI parameter value
- **Parâmetros**:
  - `x`: percentage value representando a success rate

### <Modify Critical Rate: x%>
### <Modify Critical Rate: +x%>
### <Modify Critical Rate: -x%>
- **Used for**: Skill, Item Notetags
- **Descrição**: Modifica o user's CRI parameter calculation para esta skill/item
- **Parâmetros**:
  - `x`: valor de modificação
- **Variações**:
  - **x%**: Multiplica o user's CRI parameter value para esta skill/item
  - **+x%**: Incrementeally increase o user's CRI parameter value para esta skill/item
  - **-x%**: Incrementeally decrease o user's CRI parameter value para esta skill/item

### <Modify Critical Multiplier: x%>
### <Modify Critical Multiplier: +x%>
### <Modify Critical Multiplier: -x%>
- **Used for**: Skill, Item Notetags
- **Descrição**: Determina o damage multiplier quando um critical hit lands
- **Parâmetros**:
  - `x`: valor de modificação
- **Variações**:
  - **x%**: Multiplica o multiplier para aquela exata percentage
  - **+x%**: Changes o multiplier com um incremental rate para esta skill/item (increase)
  - **-x%**: Changes o multiplier com um incremental rate para esta skill/item (decrease)

### <Modify Critical Bonus Damage: x%>
### <Modify Critical Bonus Damage: +x%>
### <Modify Critical Bonus Damage: -x%>
- **Used for**: Skill, Item Notetags
- **Descrição**: Determina o bonus damage added quando um critical hit lands
- **Parâmetros**:
  - `x`: valor de modificação
- **Variações**:
  - **x%**: Multiplica o damage para aquela exata percentage
  - **+x%**: Changes o bonus damage com um incremental rate para esta skill/item (increase)
  - **-x%**: Changes o bonus damage com um incremental rate para esta skill/item (decrease)

## JavaScript Notetags

### <JS Critical Rate>
- **Used for**: Skill, Item Notetags
- **Descrição**: Permite determinar o critical hit success rate através de JavaScript code
- **Sintaxe**:
```
<JS Critical Rate>
 code
 code
 rate = code;
</JS Critical Rate>
```
- **Variáveis**:
  - `rate`: variable final retornada para determinar a critical hit success rate
    - Base value vem de Game_Action.itemCri
    - Skill/Item <JS Critical Rate> runs
    - Then <JS Critical Rate as User/Target> notetags run
  - `user`: aquele usando a skill/item
  - `target`: aquele recebendo a skill/item hit
- **Notas**: Replace `code` com JavaScript code para determinar o final `rate`

### <JS Critical Rate as User>
### <JS Critical Rate as Target>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Apenas aplica durante battle. Permite determinar o critical hit success rate através de JavaScript code
- **Sintaxe**:
```
<JS Critical Rate as User>
 code
 code
 rate = code;
</JS Critical Rate as User>

<JS Critical Rate as Target>
 code
 code
 rate = code;
</JS Critical Rate as Target>
```
- **Variáveis**:
  - `rate`: variable final retornada para determinar a critical hit success rate
  - `user`: aquele usando a skill/item
  - `target`: aquele recebendo a skill/item hit
- **Notas**:
  - Se usado em trait objects, isto irá aplicar para qualquer skills/items usados enquanto a unit affected pelo trait object tiver access ao trait object
  - Se a variante 'as User' é usada, este code será run como uma response à action do action user end
  - Se a variante 'as Target' é usada, este code será run como uma response à action do action target end
  - Replace `code` com JavaScript code para run desired effects

### <JS Critical Damage>
- **Used for**: Skill, Item Notetags
- **Descrição**: Permite determinar o critical damage multiplier e bonus damage através de JavaScript code
- **Sintaxe**:
```
<JS Critical Damage>
 code
 code
 multiplier = code;
 bonusDamage = code;
</JS Critical Damage>
```
- **Variáveis**:
  - `multiplier`: Retornada e usada como o damage multiplier usado para amplify o critical damage amount
  - `bonusDamage`: Retornada e usada como extra added damage para o critical damage amount
  - `user`: aquele usando a skill/item
  - `target`: aquele recebendo a skill/item hit
- **Notas**: Replace `code` com JavaScript code para determinar como as variáveis `multiplier` e `bonusDamage` são calculated

## Ver Também

- [Conceitos: Major Changes](../conceitos/major-changes.md) - Critical Hit LUK Influence
- [Parâmetros: Damage Settings](../parametros/damage.md) - Configurações globais de damage incluindo critical
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core

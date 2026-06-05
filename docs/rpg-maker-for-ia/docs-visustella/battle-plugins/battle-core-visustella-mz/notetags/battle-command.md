# Battle Command - Notetags

## Visão Geral
Estas notetags permitem modificar como os battle commands dos playable characters aparecem na batalha, além de controlar se podem ser usados.

## Lista de Notetags

### <Seal Attack>
### <Seal Guard>
### <Seal Item>
- **Used for**: Actor, Class, Weapon, Armor, Enemy, State Notetags
- **Descrição**: Previne que battle commands específicos possam ser usados

### <Battle Commands>
- **Used for**: Class Notetags
- **Descrição**: Altera quais commands aparecem no Actor Command Window na batalha. Se não for usada, os default commands determinados em Plugin Parameters => Actor Command Window => Command List serão usados
- **Sintaxe**:
```
<Battle Commands>
 Attack
 Skills
 SType: x
 SType: name
 All Skills
 Skill: x
 Skill: name
 Guard
 Item
 Status
 Party
 Escape
 Auto Battle
 Combat Log
 Talk
 Weapon Swap
</Battle Commands>
```
- **Opções Disponíveis**:
  - **Attack**: Adiciona o command de basic attack
  - **Skills**: Mostra todos os skill types disponíveis para o actor
  - **SType: x** ou **Stype: name**: Adiciona um skill type específico
    - `x`: ID do skill type
    - `name`: nome do skill type (sem text codes)
  - **All Skills**: Adiciona todas as battle skills usáveis como actions individuais
  - **Skill: x** ou **Skill: name**: Adiciona uma skill específica como action usável
    - `x`: ID da skill
    - `name`: nome da skill
  - **Guard**: Adiciona o command de basic guard
  - **Item**: Adiciona o command de basic item
  - **Status**: Adiciona um command de status para view o current inputting actor's status
  - **Party**: Requer VisuMZ_2_PartySystem - Permite que este actor switch out com um different party member
  - **Escape**: Adiciona o command de escape
  - **Auto Battle**: Adiciona o command de auto battle
  - **Combat Log**: Requer VisuMZ_4_CombatLog - Abre o combat log
  - **Talk**: Requer VisuMZ_3_BattleCmdTalk! - Shows talk command se applicable
  - **Weapon Swap**: Requer VisuMZ_2_WeaponSwapSystem - Swaps o current weapon

### Exemplo de <Battle Commands>:
```
<Battle Commands>
 Attack
 Skill: Heal
 Skills
 Guard
 Item
 Escape
</Battle Commands>
```

### <Command Text: x>
- **Used for**: Skill Notetags
- **Descrição**: Quando uma skill é usada em um set de <Battle Commands>, você pode mudar o skill name text que aparece para outra coisa
- **Parâmetros**:
  - `x`: nome da skill a ser mostrado no Actor Battle Command window
- **Recomendação**: Use para encurtar skill names que são muito grandes para caber no Actor Battle Command window

### <Command Icon: x>
- **Used for**: Skill Notetags
- **Descrição**: Quando uma skill é usada em um set de <Battle Commands>, você pode mudar o skill icon que aparece para outra coisa
- **Parâmetros**:
  - `x`: ID do icon a ser mostrado no Actor Battle Command window para representar a skill

### <Command Require Learn>
- **Used for**: Skill Notetags
- **Descrição**: Determina se um battle command é visible ou não baseado em se o actor tem learned a skill
- **Notas**:
  - Learning a skill é um requirement
  - Acquiring a skill através de traits não conta como learning a skill

### <Command Require Access>
- **Used for**: Skill Notetags
- **Descrição**: Determina se um battle command é visible ou não baseado em se o actor tem access à skill
- **Notas**:
  - Having access à skill pode vir através de learning a skill ou temporarily acquiring it através de trait objects

### <Command Show Switch: x>
### <Command Show All Switches: x,x,x>
### <Command Show Any Switches: x,x,x>
- **Used for**: Skill Notetags
- **Descrição**: Determina se um battle command é visible ou não através de switches
- **Parâmetros**:
  - `x`: switch ID para determinar a skill's visibility
- **Variações**:
  - **All**: item será hidden até que todos switches estejam ON, depois será shown
  - **Any**: item será shown se qualquer um dos switches estiver ON, caso contrário será hidden
- **Notas**: Pode ser aplicado a Attack e Guard commands também

### <Command Hide Switch: x>
### <Command Hide All Switches: x,x,x>
### <Command Hide Any Switches: x,x,x>
- **Used for**: Skill Notetags
- **Descrição**: Determina se um battle command é visible ou não através de switches
- **Parâmetros**:
  - `x`: switch ID para determinar a skill's visibility
- **Variações**:
  - **All**: item será shown até que todos switches estejam ON, depois será hidden
  - **Any**: item será hidden se qualquer um dos switches estiver ON, caso contrário será shown
- **Notas**: Pode ser aplicado a Attack e Guard commands também

### <Battle Portrait: filename>
- **Used for**: Actor Notetags
- **Descrição**: Usado com o "Portrait" Battle Layout. Sets a battle portrait image para o actor
- **Parâmetros**:
  - `filename`: picture found dentro da game project's img/pictures/ folder
    - Filenames são case sensitive
    - Leave out a filename extension da notetag (ex: use apenas 'Castle1', não 'Castle1.png')
- **Notas**: Isto irá override qualquer menu images usados para battle only

### <Battle Portrait Offset: +x, +y>
### <Battle Portrait Offset: -x, -y>
- **Used for**: Actor Notetags
- **Descrição**: Usado com "Portrait" e "Border" Battle Layouts. Offsets as coordenadas X e Y para o battle portrait
- **Parâmetros**:
  - `x`: valor numérico que offset a coordenada x (negativo = esquerda, positivo = direita)
  - `y`: valor numérico que offset a coordenada y (negativo = cima, positivo = baixo)

### <Battle Portrait Offset X: +x>
### <Battle Portrait Offset X: -x>
- **Used for**: Actor Notetags
- **Descrição**: Usado com "Portrait" e "Border" Battle Layouts. Offsets a coordenada X para o battle portrait
- **Parâmetros**:
  - `x`: valor numérico (negativo = esquerda, positivo = direita)

### <Battle Portrait Offset Y: +y>
### <Battle Portrait Offset Y: -y>
- **Used for**: Actor Notetags
- **Descrição**: Usado com "Portrait" e "Border" Battle Layouts. Offsets a coordenada Y para o battle portrait
- **Parâmetros**:
  - `y`: valor numérico (negativo = cima, positivo = baixo)

### <Help Description>
- **Used for**: State Notetags
- **Descrição**: Assigns a help description para o state que é displayed sob o "Status" actor command
- **Sintaxe**:
```
<Help Description>
 text
 text
</Help Description>
```
- **Parâmetros**:
  - `text`: texto a ser displayed no help window
- **Notas**:
  - Best works com one line para compatibility com outros plugins
  - Insert %1 na help description para mostrar qualquer data que seria otherwise shown como o state display (ex: Absorption Barrier count)
  - Usado como notetag comum entre Battle Core's state descriptions e State Tooltips' state descriptions

### <In-Battle Status Description>
- **Used for**: State Notetags
- **Descrição**: Assigns a help description para o state que é displayed sob o "Status" actor command. A description usada aqui não será usada para State Tooltips
- **Sintaxe**:
```
<In-Battle Status Description>
 text
 text
</In-Battle Status Description>
```
- **Parâmetros**:
  - `text`: texto a ser displayed no help window
- **Notas**:
  - Best works com one line para compatibility com outros plugins
  - Insert %1 na help description para mostrar qualquer data que seria otherwise shown como o state display (ex: Absorption Barrier count)
  - Se ambos <Help Description> e <In-Battle Status Description> notetags existirem no mesmo state, priority será dado a este para o In-Battle Status Window

### <Exclude From Status Listing>
- **Used for**: State Notetags
- **Descrição**: Excludes o state de ser displayed no status listing

## JavaScript Notetags

### <JS Command Visible>
- **Used for**: Skill Notetags
- **Descrição**: Permite usuários com JavaScript knowledge determinar se skill-based battle commands são visible ou hidden
- **Sintaxe**:
```
<JS Command Visible>
 code
 code
 visible = code;
</JS Command Visible>
```
- **Variáveis Disponíveis**:
  - `visible`: variable final retornada para determinar a skill's visibility no Battle Command Window
  - `user`: user que irá perform a skill
  - `skill`: skill a ser usada
- **Notas**: Replace `code` com JavaScript code para determinar a skill's visibility

## Ver Também

- [Parâmetros: Actor Command Window](../parametros/actor-command-window.md) - Configurações da janela de comandos
- [Parâmetros: Party Command Window](../parametros/party-command-window.md) - Configurações da janela de comandos de party
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core

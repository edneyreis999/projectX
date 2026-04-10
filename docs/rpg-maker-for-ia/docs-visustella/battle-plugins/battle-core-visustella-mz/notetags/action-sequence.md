# Action Sequence - Notetags

## Visão Geral
Action Sequences permitem full control sobre como uma skill e/ou item plays através de seu curso. Estas notetags dão control sobre vários aspects dessas Action Sequences. Mais informações podem ser encontradas na seção Action Sequences.

## Lista de Notetags

### <Custom Action Sequence>
- **Used for**: Skill, Item Notetags
- **Descrição**: Remove todos automated Action Sequence parts da skill
- **Notas**:
  - Tudo Action Sequence-related será feito por Common Events
  - Insert Common Event(s) na skill/item's effects list para make use das Custom Action Sequences
  - Isto irá prevenir common events de loading no Item Scene e Skill Scene quando usado outside of battle

### <Auto Action Sequence>
- **Used for**: Skill, Item Notetags
- **Descrição**: Se o Action Sequence Plugin Parameter "Auto Notetag" está enabled, este plugin irá prevenir custom action sequences de happening para a skill ou item, e instead, use um Automatic Action Sequence
- **Notas**:
  - Ignore isto se você tem "Auto Notetag" disabled ou set para false
  - By default, este setting é set para false
  - Please be aware das changes você fez ao seu game antes de usar

### <Bypass Auto Action Sequence>
- **Used for**: Skill, Item Notetags
- **Descrição**: Used para game devs que tem o Action Sequence Plugin Parameter "Auto Notetag" on para applying <Custom Action Sequence> para everything
- **Notas**:
  - Isto irá allow items e skills para serem able para launch seus common events do menu scene independentemente da inherent restriction para prevenir action sequence based skills/items com common events de launching
  - Ignore isto se você tem "Auto Notetag" disabled ou set para false
  - By default, este setting é set para false
  - Please be aware das changes você fez ao seu game antes de usar

### <Common Event: name>
- **Used for**: Skill, Item Notetags
- **Descrição**: Battle only: calls forth um Common Event de um matching name
- **Parâmetros**:
  - `name`: nome do Common Event para call quando esta skill/item é usada em battle
    - Remove qualquer \I[x] no nome
    - Insert multiple notetags para call multiple Common Events em succession
- **Notas**:
  - Isto irá occur após qualquer Common Event Trait Effects para a skill/item's database entry
  - Isto é primarily used para users que estão reorganizing around seus Common Events e would ainda like para ter seus skills/items perform o correct Action Sequences em caso os ID's sejam diferentes

### <Display Icon: x>
### <Display Text: string>
- **Used for**: Skill, Item Notetags
- **Descrição**: Quando displaying a skill/item name na Action Sequence, determine o icon e/ou text displayed
- **Parâmetros**:
  - `x`: valor numérico representando o icon ID para ser displayed
  - `string`: valor de texto representando o displayed name

### <Common Event Key: name>
### <Common Event Keys: name, name, name>
### <Common Event Keys>
```
<Common Event Keys>
 key
 key
 key
</Common Event Keys>
```
- **Used for**: Skill, Item Notetags
- **Descrição**: Irá generate Common Events para a skill/item com um corresponding key
- **Parâmetros**:
  - `name`: nome do Common Event's key que você quer para reference
  - `key`: key text (usado na variante de bloco)
- **Como marcar um Common Event com um key**:
  - Insert dentro de um Common Event's name os [ e ] brackets ao redor do text que será usado como o Common Event's key text
  - **Exemplo**: se Common Event's name é "Penta Slash [PENTA]", então o key usado é "PENTA" sem as quotes
  - Este key poderia então ser referenced pela notetag <Common Event Key: PENTA>
  - **Não use vírgulas (,) dentro do key text** pois será automatically removed para a sake de consistency
- **Notas**:
  - Este feature é made para make o process de sharing Action Sequences para become easier sem needing para line up Common Event ID's
  - As notetag variants que usam multiple keys terão os keys added na ordem que são listed
  - Se keys não referenciam qualquer Common Events, no Common Events serão added para aquele key

## Ver Também

- [Action Sequences](../action-sequences/) - Documentação completa de Action Sequences
- [Parâmetros: Action Sequence Settings](../parametros/action-sequence.md) - Configurações globais de Action Sequences
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core

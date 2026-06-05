# Battle Layout - Notetags

## Visão Geral
Estas tags irão mudar o battle layout para um troop independentemente de como os plugin parameters são setup normalmente. Insert estas tags nos noteboxes de maps ou nos names de troops para elas tomarem efeito.

## Lista de Notetags

### <Layout: type>
### <Battle Layout: type>
- **Used for**: Map Notetags, Troop Name Tags, e Troop Comment Tags
- **Descrição**: Changes o battle layout style usado para este specific map ou battle
- **Parâmetros**:
  - `type`: tipo de layout. Options:
    - `'default'` - Layout padrão
    - `'list'` - Layout tipo lista
    - `'xp'` - Layout estilo RPG Maker XP
    - `'portrait'` - Layout com retratos
    - `'border'` - Layout com borda
    - `'frontview'` - Requer VisuMZ_3_FrontviewBattleUI
    - `'sideview'` - Requer VisuMZ_3_SideviewBattleUI
- **Notas**:
  - Se ambos estão present para uma specific battle, priority vai para o setting encontrado no troop name
  - Se usando Troop Comment Tags, enquanto a tag appear em um comment found em qualquer um dos Troop's pages (mesmo se eles não run), a tag será considered in effect

## Ver Também

- [Parâmetros: Battle Layout Settings](../parametros/battle-layout.md) - Configurações globais de Battle Layout
- [Conceitos: Visão Geral](../conceitos/visao-geral.md) - Visão geral do Battle Core

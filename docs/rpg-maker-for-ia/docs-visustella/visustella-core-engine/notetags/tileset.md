# Notetags: Tileset

## Taller Tiles

### `<Taller By x: id>`
- **Usado em**: Tileset Notetags
- Expande tiles das paginas B, C, D, E marcados com terrain tag `id` em `x` tiles adicionais de altura
- `x`: numero de tiles a adicionar em altura
- `id`: Terrain Tag usado para marcar o tile no editor

### Como Usar
1. No Database editor, atribua um Terrain Tag ao tile desejado
2. No notebox do tileset, insira a notetag (ex: `<Taller By 1: 5>`)
3. No mapa, coloque apenas o tile BASE (ex: tronco da arvore)
4. In-game, o tile aparecera mais alto automaticamente

### Comportamento por Priority
- **O** (Below Player): tile fica na layer abaixo do jogador. Sprites altos na frente nao clipam o topo; sprites atras sao cobertos
- **X** (Same as Player): tile fica na mesma layer. Hitbox 1x1 na base apenas
- **★** (Above Player): tile fica na layer acima do jogador

### Limitacoes
- Nao funciona com eventos usando tiles como graficos
- Para eventos, usar Event & Movement Core's `<Tile Expand>` notetags

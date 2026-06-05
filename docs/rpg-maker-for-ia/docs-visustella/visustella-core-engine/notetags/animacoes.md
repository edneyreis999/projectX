# Notetags: Animacoes

Animacoes em RPG Maker MZ (Effekseer) sao centradas no target por padrao. Estas notetags vao no **nome da animacao** no database.

## Posicionamento

### `<Head>` / `<Foot>`
- **Usado em**: Animation Name Tags
- `<Head>`: ancora animacao no topo do sprite
- `<Foot>`: ancora animacao na base do sprite

### `<Anchor X: x>` / `<Anchor Y: y>` / `<Anchor: x, y>`
- **Usado em**: Animation Name Tags
- Ancora em ponto especifico do sprite
- Valores de 0.0 (esquerda/cima) a 1.0 (direita/baixo)
- Exemplos: `<Anchor X: 0.4>`, `<Anchor: 0.2, 0.9>`

## Offset

### `<Offset X: +x>` / `<Offset X: -x>` / `<Offset Y: +y>` / `<Offset Y: -y>`
### `<Offset: +x, +y>` / `<Offset: -x, -y>`
- **Usado em**: Animation Name Tags
- Offset em pixels exatos
- Permite valores maiores que +/-999 do editor
- Exemplos: `<Offset X: +20>`, `<Offset: +10, -30>`

## Mirror

### `<Mirror Offset X>` / `<No Mirror Offset X>`
- **Usado em**: Animation Name Tags
- Controla se Offset X e espelhado quando a animacao e mirrored
- Se nao declarado, usa QoL Settings > Misc > Animation: Mirror Offset X

## Rate (MV Animations apenas)

### `<Rate: x>`
- **Usado em**: MV Animation Name Tags
- NAO funciona com animacoes Effekseer
- Ajusta velocidade de atualizacao da animacao MV
- Default: 4, Minimo: 1, Maximo: 10
- Menor = mais rapido

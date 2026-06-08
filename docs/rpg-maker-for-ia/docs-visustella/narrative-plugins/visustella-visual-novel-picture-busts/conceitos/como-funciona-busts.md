# Como Funcionam os Busts

## Busts Viram para a Esquerda

O plugin assume que os Picture Busts estão **normalmente virados para a esquerda** em sua forma original. Isso combina com o sistema de Pictures de actors do RPG Maker MZ.

Tudo pode ser revertido ajustando as configurações nos Plugin Parameters.

## Busts são Pictures

"Busts" neste plugin são mecanicamente **Pictures** do RPG Maker MZ. As propriedades compartilhadas são as mesmas. Isso significa:

- Controlar Pictures com comandos Bust-centric deste plugin
- Controlar Busts com comandos de evento "Move Picture", "Rotate Picture", "Tint Picture", "Erase Picture"
- Pictures/Busts criados via "Show Picture" ou "BASIC: Enter Bust(s)" podem usar ambos os sistemas

**Importante**: Pictures/Busts que não foram criados por "Show Picture" ou "BASIC: Enter Bust(s)" não podem ser manipulados por comandos de evento ou Plugin Commands.

## Picture IDs Importam

Picture IDs determinam a **camada** (layer):

- **ID menor** = aparece mais atrás ("back")
- **ID maior** = aparece mais na frente ("top")

Não importa se o objeto foi formado como Picture ou Bust primeiro. O sistema de layers permanece intacto.

## Âncora/Origem Especializada

Pictures têm dois modos de Origin/Anchor:
- **Upper Left**: X/Y marcam o canto superior esquerdo
- **Center**: X/Y marcam o ponto central da imagem

Busts têm uma âncora única configurável nos Plugin Parameters:
- **Padrão**: "Center Bottom" (Anchor X: 0.5, Anchor Y: 1.0)
- Funciona melhor com busts porque permite manipulação natural relativa ao fundo da tela

**Nota**: Pode ser modificado nos Plugin Parameters, mas não é recomendado sem conhecimento prévio.

## Posicionamento Predeterminado (Positions)

Em vez de coordenadas exatas, o plugin oferece **11 Positions** (0-10):

```
+--------+--------------------------------------------------------+--------+
|        |                                                        |        |
|        |                        Screen                          |        |
|<------>|                                                        |<------>|
|  200   |                                                        |  200   |
| Pixel  |                                                        | Pixel  |
| Buffer |                                                        | Buffer |
|        |                      Positions                         |        |
|        0    1    2    3     4     5     6     7     8     9    10        |
|        |                                                        |        |
+--------+--------------------------------------------------------+--------+
```

- **Position 0**: Centro do fundo, lado esquerdo da tela (200px de buffer)
- **Position 5**: Centro do fundo da tela
- **Position 8**: ~3/4 do caminho da esquerda
- **Buffer**: 200 pixels de distância das bordas

Positions podem ser alterados via Plugin Parameters com código JavaScript. Não recomendado sem conhecimento de JS.

## Navegação

- [Voltar: Visão Geral](visao-geral.md)
- [Próximo: Comandos Básicos](../comandos/basicos.md)

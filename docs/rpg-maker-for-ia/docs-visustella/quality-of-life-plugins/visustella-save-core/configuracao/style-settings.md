# Style Settings

## General

| Parâmetro | Descrição |
|---|---|
| **Latest Text** | Texto que indica o save mais recente (ex: "NEW!") |
| **Latest Color** | Cor do texto — usar `#rrggbb` para customizada ou número para cores do Window Skin |
| **Sprite Width** | Largura em pixels dos map sprites no Save Menu |
| **SV Battler Width** | Largura em pixels dos SV Battlers no Save Menu |
| **JS: Save Display Info** | Código que, ao salvar, determina quais informações são armazenadas para exibição rápida |

> **Nota**: O "NEW!" **não** aparece em slots de autosave. Isso é intencional.

## Configuração por Estilo

Cada estilo de save menu (List, Vertical, Box, Large) possui parâmetros individuais:

| Parâmetro | Descrição |
|---|---|
| **Rows** | Número de linhas para o estilo |
| **Columns** | Número de colunas para o estilo |
| **JS: Draw Contents** | Código que define como desenhar o conteúdo do estilo |
| **JS: Draw File Data** | Código que define como desenhar os dados do arquivo no estilo |

### Exemplo de Uso do JS: Save Display Info

O código em `JS: Save Display Info` controla quais dados são capturados no momento do save para exibição rápida no menu. Isso é útil para mostrar informações como nome do mapa, tempo de jogo, level dos personagens, etc.

## Requisitos

- Familiaridade com JavaScript é necessária para ajustar os parâmetros `JS: Draw Contents` e `JS: Draw File Data`

## Relacionado

- [Estilos de Save](../conceitos/save-styles.md)
- [Actor Graphic Settings](actor-graphic-settings.md)

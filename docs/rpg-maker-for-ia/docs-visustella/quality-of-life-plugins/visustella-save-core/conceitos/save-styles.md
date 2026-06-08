# Estilos de Save Menu

## Visão Geral

O Save Core oferece quatro estilos visuais para o menu de save, cada um com disposição diferente dos arquivos na tela.

## Estilos Disponíveis

### List
- Save files esticam horizontalmente pela tela
- Arquivos listados como linhas

### Vertical
- Save files esticam verticalmente pela tela
- Arquivos dispostos como colunas

### Box
- Save files são caixas pequenas na tela
- Arquivos organizados em linhas e colunas (grade)

### Large
- Save files ocupam a tela inteira
- Cada arquivo preenche toda a área visível

## Configuração por Estilo

Cada estilo possui parâmetros de customização via JavaScript:

| Parâmetro | Descrição |
|---|---|
| **Rows** | Número de linhas para o estilo |
| **Columns** | Número de colunas para o estilo |
| **JS: Draw Contents** | Código que define como desenhar o conteúdo |
| **JS: Draw File Data** | Código que define como desenhar os dados do arquivo |

## Configurações Gerais de Estilo

| Parâmetro | Descrição |
|---|---|
| **Latest Text** | Texto para indicar o save mais recente (ex: "NEW!") |
| **Latest Color** | Cor do texto (`#rrggbb` ou número do Window Skin) |
| **Sprite Width** | Largura em pixels dos map sprites no Save Menu |
| **SV Battler Width** | Largura em pixels dos SV Battlers no Save Menu |
| **JS: Save Display Info** | Código que determina quais informações são armazenadas para exibição ao salvar |

> **Nota**: O texto "NEW!" **não aparece** em slots de autosave. Isso é intencional.

## Relacionado

- [Visão Geral](visao-geral.md)
- [Style Settings](../configuracao/style-settings.md)
- [Actor Graphic Settings](../configuracao/actor-graphic-settings.md)

# Plugin Parameters: Window Settings

Ajustes das janelas do jogo: line height, opacity, scroll bar, etc.

## Window Defaults

| Parametro | Default | Descricao |
|-----------|---------|-----------|
| Enable Masking | - | Janelas escondem janelas atras. WARNING: pode obscurecer dados |
| Correct Skin Bleed | - | Correcao de window skin bleeding (95 vs 96) |
| Line Height | - | Altura de linha padrao. Evitar numeros impares |
| Item Padding | - | Padding de item padrao. Evitar numeros impares |
| Back Opacity | - | Opacidade do fundo (nao necessario MZ 1.3.0+) |
| Translucent Opacity | - | Opacidade translucida padrao |
| Window Opening Speed | 32 | Velocidade de abertura (0-255) |
| Column Spacing | 8 | Espacamento entre colunas em janelas selecionaveis |
| Row Spacing | 4 | Espacamento entre linhas em janelas selecionaveis |

## Scroll Bar

- **Show Scroll Bar?**: Exibir scroll bar em janelas com scroll
- **Thickness**: Espessura
- **Offset**: Deslocamento
- **Bar Body Color**: Cor da barra (#rrggbb ou numero Window Skin)
- **Off Bar Color**: Cor da barra inativa
- **Off Bar Opacity**: Opacidade da barra inativa (0-255)

## Selectable Items

- **Show Background?**: Exibir caixas escuras atras de itens selecionaveis
- **Item Height Padding**: Padding de altura. Evitar numeros impares.
- **JS: Draw Background**: Codigo para desenhar fundo retangular

## JS: Quick Functions

**AVISO**: Feature experimental. Use por sua conta e risco.

### JS Quick Function
- **Function Name**: Nome da funcao no namespace global. Nao sobrescreve funcoes/variaveis existentes.
- **JS: Code**: Codigo executado ao chamar a funcao

### Comportamento
- Declarada globalmente: `Example()` executa o codigo configurado
- Nao sobrescreve funcoes/variaveis de mesmo nome
- Se o codigo tiver erro, fail-safe retorna 0 e loga erro no console
- Usavel em Script Calls, Conditional Branch, Control Variable, Damage Formulas

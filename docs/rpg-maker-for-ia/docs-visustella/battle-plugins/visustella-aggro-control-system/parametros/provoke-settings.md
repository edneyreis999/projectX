# Parametros - Provoke Settings

Configuracoes visuais do sistema de Provoke. Requer **VisuMZ_1_BattleCore** para funcionar.

---

## Requisito

```
VisuMZ_1_BattleCore
```

---

## Configuracoes Principais

### Show Priority Lines?

| Propriedade | Valor |
|-------------|-------|
| **Tipo** | Boolean |
| **Padrao** | - |
| **Descricao** | Mostrar linhas de prioridade de target para este plugin? |
| **Requer** | VisuMZ_1_BattleCore |

---

## Line Settings

Configuracoes visuais das linhas de provoke.

### Arc Height
- **Tipo**: Number
- **Descricao**: Altura do arco da linha em pixels

### Blend Mode
- **Tipo**: Number
- **Descricao**: Blend mode usado para o sprite da linha

### Height Origin
- **Tipo**: Number (rate)
- **Descricao**: Taxa da base do sprite do battler para determinar onde a linha comeca

### Line Color
- **Tipo**: String/Number
- **Formato**: `#rrggbb` para cores customizadas ou numero para text colors do Window Skin
- **Descricao**: Cor da linha de provoke

### Opacity
- **Tipo**: Number
- **Descricao**: Maxima opacidade possivel para linhas de provoke ativas

### Opacity Speed
- **Tipo**: Number
- **Descricao**: Velocidade de flutuacao da opacidade do sprite da linha

### Parts
- **Tipo**: Number
- **Descricao**: Numero de partes de junta para dividir o sprite

### Parts Size
- **Tipo**: Number
- **Descricao**: Diametro em pixels de cada parte

---

## Options

Configuracoes do menu de opcoes.

### Add Provoke Option?
- **Tipo**: Boolean
- **Descricao**: Adicionar a opcao 'Show Provoke Origin' ao menu de Opcoes?

### Adjust Window Height
- **Tipo**: Boolean
- **Descricao**: Ajustar automaticamente a altura da janela de opcoes?

### Option Name
- **Tipo**: String
- **Descricao**: Nome do comando da opcao no menu

---

## Resumo

| Parametro | Tipo | Categoria |
|-----------|------|-----------|
| Show Priority Lines? | Boolean | Principal |
| Arc Height | Number | Line Settings |
| Blend Mode | Number | Line Settings |
| Height Origin | Number | Line Settings |
| Line Color | String/Number | Line Settings |
| Opacity | Number | Line Settings |
| Opacity Speed | Number | Line Settings |
| Parts | Number | Line Settings |
| Parts Size | Number | Line Settings |
| Add Provoke Option? | Boolean | Options |
| Adjust Window Height | Boolean | Options |
| Option Name | String | Options |

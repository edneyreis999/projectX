# Parametros - Aggro Settings

Configuracoes do sistema de Aggro, incluindo mecanica e visualizacao do gauge.

---

## General

Configuracoes gerais da mecanica de aggro.

### Priority: Highest TGR

- **Tipo**: Select
- **Opcoes**: Weighted / Highest
- **Descricao**: Quando inimigos selecionam alvos para ataques single-target:
  - **Weighted**: Selecao baseada em peso de aggro (probabilidade proporcional)
  - **Highest**: Sempre ataca o membro com maior aggro

### Aggro Per Damage

- **Tipo**: Number
- **Descricao**: Quantidade de aggro gerada por ponto de dano HP causado em um inimigo
- **Uso**: Multiplicador aplicado ao dano real causado

### Aggro Per Heal

- **Tipo**: Number
- **Descricao**: Quantidade de aggro gerada por ponto de HP recuperado em um aliado
- **Uso**: Multiplicador aplicado a cura real realizada

---

## Gauge

Configuracoes visuais do gauge de aggro.

### Visible Battler Gauge

- **Tipo**: Boolean
- **Descricao**: Exibir gauge de aggro sobre o sprite SV do actor mostrando nivel atual comparado com outros party members

### Visible Status Gauge

- **Tipo**: Boolean
- **Descricao**: Exibir gauge de aggro no Battle Status Window mostrando nivel atual comparado com outros

### Gauge Color 1

- **Tipo**: String/Number
- **Formato**: `#rrggbb` para cores customizadas ou numero para text colors do Window Skin
- **Descricao**: Cor primaria do gauge de aggro

### Gauge Color 2

- **Tipo**: String/Number
- **Formato**: `#rrggbb` para cores customizadas ou numero para text colors do Window Skin
- **Descricao**: Cor secundaria do gauge de aggro

### Gauge Width

- **Tipo**: Number (pixels)
- **Descricao**: Largura do gauge em pixels

### Anchor X / Anchor Y

- **Tipo**: Number (0-1)
- **Descricao**: Posicao do anchor X/Y do sprite do Aggro Gauge
- **Recomendacao**: Usar valores entre 0 e 1

### Scale

- **Tipo**: Number
- **Descricao**: Escala do Aggro Gauge (maior/menor)

### Battler Gauge: Offset X / Offset Y

- **Tipo**: Number (pixels)
- **Descricao**: Deslocamento em pixels do gauge no sprite do battler

### Battle Status Gauge: Offset X / Offset Y

- **Tipo**: Number (pixels)
- **Descricao**: Deslocamento em pixels do gauge no Battle Status Window

---

## Options

Configuracoes do menu de opcoes.

### Add Provoke Option?

- **Tipo**: Boolean
- **Descricao**: Adicionar a opcao 'Show Aggro Gauge' ao menu de Opcoes?

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
| Priority: Highest TGR | Select | General |
| Aggro Per Damage | Number | General |
| Aggro Per Heal | Number | General |
| Visible Battler Gauge | Boolean | Gauge |
| Visible Status Gauge | Boolean | Gauge |
| Gauge Color 1 | String/Number | Gauge |
| Gauge Color 2 | String/Number | Gauge |
| Gauge Width | Number | Gauge |
| Anchor X | Number | Gauge |
| Anchor Y | Number | Gauge |
| Scale | Number | Gauge |
| Battler Gauge Offset X | Number | Gauge |
| Battler Gauge Offset Y | Number | Gauge |
| Battle Status Gauge Offset X | Number | Gauge |
| Battle Status Gauge Offset Y | Number | Gauge |
| Add Provoke Option? | Boolean | Options |
| Adjust Window Height | Boolean | Options |
| Option Name | String | Options |

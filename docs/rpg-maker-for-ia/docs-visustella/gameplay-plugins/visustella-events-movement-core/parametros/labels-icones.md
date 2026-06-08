# Event Label Settings e Event Icon Settings

---

## Event Label Settings

Labels sao pequenas janelas/sprites que exibem texto sobre a cabeca dos eventos, definidos atraves de notetags `<Label>` nos comentarios dos eventos.

### Parametros Gerais

| Parametro | Tipo | Padrao | Descricao |
|-----------|------|--------|-----------|
| Sprite Based? | Booleano | - | Usa versao baseada em sprites ao inves da versao legada com janelas. Mais eficiente em memoria e com melhor compatibilidade |
| Mobile-Enabled? | Booleano | - | Habilita labels para dispositivos moveis |

> **Recomendacao:** Prefira `Sprite Based?` ativado para melhor desempenho e compatibilidade.

### Parametros de Aparencia

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Font Size | Inteiro | Tamanho da fonte do texto do label |
| Icon Size | Inteiro | Tamanho dos icones exibidos no label |
| Line Height | Inteiro | Altura de cada linha do label |

### Posicionamento

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Offset X | Inteiro | Deslocamento horizontal global aplicado a todos os labels |
| Offset Y | Inteiro | Deslocamento vertical global aplicado a todos os labels |

### Animacao

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Fade Speed | Inteiro | Velocidade de fade in/out do label ao entrar/sair do alcance de visibilidade |

### Alcance de Visibilidade (Visible Range)

Controla a distancia maxima em que o label permanece visivel.

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| Visible Range | Inteiro | Distancia (em tiles) para o label aparecer |
| Range Type | Selecao | Formato geometrico da area de visibilidade |

**Opcoes de Range Type:**

| Tipo | Descricao |
|------|-----------|
| Square | Area quadrada ao redor do jogador |
| Diamond | Area em formato de losango (similar ao alcance de habilidades em jogos taticos) |
| Circle | Area circular ao redor do jogador |

---

## Event Icon Settings

Icones exibidos sobre a cabeca dos eventos, definidos atraves de notetags `<Icon>` nos comentarios dos eventos.

### Parametros

| Parametro | Tipo | Valores | Descricao |
|-----------|------|---------|-----------|
| Buffer X | Inteiro | - | Deslocamento horizontal padrao da posicao do icone em relacao ao evento |
| Buffer Y | Inteiro | - | Deslocamento vertical padrao da posicao do icone em relacao ao evento |
| Blend Mode | Inteiro | 0, 1, 2, 3 | Modo de mesclagem do icone com o cenario |

### Blend Mode - Valores

| Valor | Nome | Efeito |
|-------|------|--------|
| 0 | Normal | Renderizacao padrao sem mesclagem especial |
| 1 | Additive | Adiciona as cores do icone as cores do cenario (efeito brilhante/luminoso) |
| 2 | Multiply | Multiplica as cores (efeito mais escuro/sombreado) |
| 3 | Screen | Efeito similar ao additive, mas mais suave (efeito de destaque/clareamento) |

---

## Notetags Relacionadas

As labels e icones sao ativados por notetags inseridas nos comentarios dos eventos:

### Labels
```
<Label: texto do label>
<Label: texto\i[iconIndex]>  // com icone inline
```

### Icones
```
<Icon: iconIndex>
```

> **Nota:** O `iconIndex` corresponde ao indice do icone no IconSet do RPG Maker MZ.

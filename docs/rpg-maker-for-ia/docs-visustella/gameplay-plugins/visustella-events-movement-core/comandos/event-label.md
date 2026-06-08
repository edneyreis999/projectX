# Event Label - Comandos de Plugin

Plugin: **VisuStella Events & Movement Core**

---

## Event Label: Refresh

Atualiza forcadamente todos os Event Labels no mapa. Util quando alteracoes nos eventos nao acionam a atualizacao automatica dos labels.

### Exemplo de Uso

```
Plugin Command: Event Label: Refresh
```

### Notas

- Nao possui parametros adicionais.
- Use quando labels forem alterados via variaveis ou switches e a atualizacao automatica nao ocorrer.
- Seguro para uso frequente, mas evite chamar em loops rapidos para nao impactar performance.

---

## Event Label: Visible

Altera a visibilidade de todos os Event Labels no mapa.

| Parametro | Tipo | Descricao | JavaScript |
|-----------|------|-----------|------------|
| `Visibility` | Booleano | O que alterar a visibilidade para? | Nao |

### Exemplo de Uso

```
Plugin Command: Event Label: Visible
  Visibility: ON   → Exibe todos os Event Labels
  Visibility: OFF  → Oculta todos os Event Labels
```

### Notas

- Afeta **todos** os Event Labels do mapa simultaneamente.
- Util para cinematics ou cenas onde os labels podem distrair o jogador.
- O estado de visibilidade e global para o mapa atual, nao por evento individual.

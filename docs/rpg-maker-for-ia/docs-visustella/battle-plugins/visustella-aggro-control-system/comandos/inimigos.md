# Plugin Commands - Inimigos

Comandos de plugin para manipular aggro de inimigos.

---

## Enemy: Change Aggro

Altera o aggro de um inimigo por uma quantidade.

### Parametros

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| **Enemy Index** | Number | Qual Enemy Index afetar (0-based) |
| **Change Aggro By** | Number | Quantidade de aggro a alterar (negativo para reduzir) |

### Comportamento

- Adiciona/subtrai o valor do aggro atual do inimigo
- O aggro resultante e limitado a no minimo 1
- Use valores negativos para reduzir aggro

### Casos de Uso

- Aumentar aggro de um inimigo para que aliados o ataquem mais
- Reduzir aggro de adds para focar no boss
- Mecanica onde inimigos "competem" por atencao

---

## Enemy: Set Aggro

Define o aggro de um inimigo para um valor exato.

### Parametros

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| **Enemy Index** | Number | Qual Enemy Index afetar (0-based) |
| **Set Aggro To** | Number | Valor exato de aggro (minimo 1) |

### Comportamento

- Substitui o aggro atual pelo valor fornecido
- O aggro deve ser pelo menos 1 (nao pode ser zero ou negativo)

### Casos de Uso

- Resetar aggro de adds no inicio de uma fase
- Equalizar aggro de multiplos inimigos
- Mecanica de boss que redistribui aggro entre adds

---

## Nota sobre Index vs ID

- **Actor**: Usa **Actor ID** (numero fixo do database)
- **Enemy**: Usa **Enemy Index** (posicao na troop, 0-based, muda dinamicamente)

Isso significa que comandos de enemy sao mais uteis em eventos de troop ou quando o indice e conhecido.

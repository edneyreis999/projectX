# Plugin Commands - Atores

Comandos de plugin para manipular aggro de actors.

---

## Actor: Change Aggro

Altera o aggro de um actor por uma quantidade.

### Parametros

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| **Actor ID** | Number | Qual Actor ID afetar |
| **Change Aggro By** | Number | Quantidade de aggro a alterar (negativo para reduzir) |

### Comportamento

- Adiciona/subtrai o valor do aggro atual do actor
- O aggro resultante e limitado a no minimo 1
- Use valores negativos para reduzir aggro

### Casos de Uso

- Aumentar aggro do tanque via evento
- Reduzir aggro de um DPS via evento
- Mecanica de boss que altera aggro de atores especificos

---

## Actor: Set Aggro

Define o aggro de um actor para um valor exato.

### Parametros

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| **Actor ID** | Number | Qual Actor ID afetar |
| **Set Aggro To** | Number | Valor exato de aggro (minimo 1) |

### Comportamento

- Substitui o aggro atual pelo valor fornecido
- O aggro deve ser pelo menos 1 (nao pode ser zero ou negativo)

### Casos de Uso

- Resetar aggro do party no inicio de uma fase de boss
- Setar aggro igual para todos os atores (situacao neutra)
- Definir aggro alto para um tanque no inicio do combate

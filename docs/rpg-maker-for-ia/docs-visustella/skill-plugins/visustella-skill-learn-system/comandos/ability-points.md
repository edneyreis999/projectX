# Plugin Commands - Ability Points

## Ability Points: Gain

O ator alvo ganha AP. O valor ganho e afetado por bonus rates.

| Parametro | Descricao |
|-----------|-----------|
| Actor ID(s) | Selecionar quais atores afetar |
| Class ID(s) | Classe para ganhar AP. Usar "0" para classe atual |
| Ability Points | Quantidade de AP (pode usar codigo JS) |

**Comportamento**: O ganho passa pela formula `(1 + Plus) * Rate + Flat`.

---

## Ability Points: Add

O ator alvo recebe AP diretamente. NAO e afetado por bonus rates.

| Parametro | Descricao |
|-----------|-----------|
| Actor ID(s) | Selecionar quais atores afetar |
| Class ID(s) | Classe para receber AP. Usar "0" para classe atual |
| Ability Points | Quantidade de AP (pode usar codigo JS) |

**Comportamento**: Valor exato, sem modificadores.

---

## Ability Points: Lose

O ator alvo perde AP. NAO e afetado por bonus rates.

| Parametro | Descricao |
|-----------|-----------|
| Actor ID(s) | Selecionar quais atores afetar |
| Class ID(s) | Classe para perder AP. Usar "0" para classe atual |
| Ability Points | Quantidade de AP a perder (pode usar codigo JS) |

---

## Ability Points: Set

Define o AP exato do ator. NAO e afetado por bonus rates.

| Parametro | Descricao |
|-----------|-----------|
| Actor ID(s) | Selecionar quais atores afetar |
| Class ID(s) | Classe para definir AP. Usar "0" para classe atual |
| Ability Points | Valor exato de AP (pode usar codigo JS) |

---

## Resumo: Gain vs Add vs Lose vs Set

| Comando | Efeito | Afetado por Modificadores? |
|---------|--------|---------------------------|
| Gain | Adiciona AP | Sim |
| Add | Adiciona AP | Nao |
| Lose | Remove AP | Nao |
| Set | Define AP exato | Nao |

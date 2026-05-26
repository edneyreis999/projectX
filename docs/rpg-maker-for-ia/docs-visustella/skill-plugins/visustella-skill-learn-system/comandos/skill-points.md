# Plugin Commands - Skill Points

## Skill Points: Gain

O ator alvo ganha SP. O valor ganho e afetado por bonus rates.

| Parametro | Descricao |
|-----------|-----------|
| Actor ID(s) | Selecionar quais atores afetar |
| Class ID(s) | Classe para ganhar SP. Usar "0" para classe atual |
| Skill Points | Quantidade de SP (pode usar codigo JS) |

**Comportamento**: O ganho passa pela formula `(1 + Plus) * Rate + Flat`.

---

## Skill Points: Add

O ator alvo recebe SP diretamente. NAO e afetado por bonus rates.

| Parametro | Descricao |
|-----------|-----------|
| Actor ID(s) | Selecionar quais atores afetar |
| Class ID(s) | Classe para receber SP. Usar "0" para classe atual |
| Skill Points | Quantidade de SP (pode usar codigo JS) |

**Comportamento**: Valor exato, sem modificadores.

---

## Skill Points: Lose

O ator alvo perde SP. NAO e afetado por bonus rates.

| Parametro | Descricao |
|-----------|-----------|
| Actor ID(s) | Selecionar quais atores afetar |
| Class ID(s) | Classe para perder SP. Usar "0" para classe atual |
| Skill Points | Quantidade de SP a perder (pode usar codigo JS) |

---

## Skill Points: Set

Define o SP exato do ator. NAO e afetado por bonus rates.

| Parametro | Descricao |
|-----------|-----------|
| Actor ID(s) | Selecionar quais atores afetar |
| Class ID(s) | Classe para definir SP. Usar "0" para classe atual |
| Skill Points | Valor exato de SP (pode usar codigo JS) |

---

## Resumo: Gain vs Add vs Lose vs Set

| Comando | Efeito | Afetado por Modificadores? |
|---------|--------|---------------------------|
| Gain | Adiciona SP | Sim |
| Add | Adiciona SP | Nao |
| Lose | Remove SP | Nao |
| Set | Define SP exato | Nao |

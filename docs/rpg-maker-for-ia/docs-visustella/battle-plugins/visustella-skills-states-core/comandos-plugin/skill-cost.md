# Plugin Commands - Skill Cost

Plugin Commands para emulação de pagamento de custos de skills via eventos.

---

## Skill Cost: Emulate Actor Pay

Faz o actor emular o pagamento do custo de uma skill.

### Parâmetros
| Parâmetro | Descrição |
|-----------|-----------|
| **Actor ID(s)** | Selecione quais Actor IDs pagarão o custo |
| **Skill ID** | ID da skill para emular o pagamento |

### Uso
Útil para eventos que precisam "cobrar" o custo de uma skill sem realmente executá-la.

---

## Skill Cost: Emulate Enemy Pay

Faz o enemy emular o pagamento do custo de uma skill.

### Parâmetros
| Parâmetro | Descrição |
|-----------|-----------|
| **Enemy Index(es)** | Selecione quais Enemy Indexes pagarão o custo |
| **Skill ID** | ID da skill para emular o pagamento |

### Uso
Útil para enemies que usam recursos (Gold, Items) como custo de skills customizadas.

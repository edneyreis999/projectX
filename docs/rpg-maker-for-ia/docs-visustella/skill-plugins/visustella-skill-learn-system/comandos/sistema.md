# Plugin Commands - Sistema

## System: Show Skill Learn in Skill Menu?

Controla a visibilidade do comando "Skill Learn" dentro do menu de Skills do jogo.

| Parametro | Descricao |
|-----------|-----------|
| Show/Hide? | Mostra ou esconde o Skill Learn no menu de Skills |

**Uso tipico**: Usado em eventos para habilitar/desabilitar o acesso ao sistema de aprendizado de skills em momentos especificos da historia.

---

## Exemplos de Uso

### Esconder Skill Learn no inicio do jogo:
```
Plugin Command: System: Show Skill Learn in Skill Menu?
  Show/Hide?: Hide
```

### Habilitar Skill Learn apos evento:
```
Plugin Command: System: Show Skill Learn in Skill Menu?
  Show/Hide?: Show
```

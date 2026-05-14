# Plugin Parameters: JS Quick Functions

**AVISO**: Feature altamente experimental.

Quick Functions permitem declarar funcoes rapidamente no namespace global para facil acesso via Script Calls, Conditional Branch, Control Variable, Damage Formulas, etc.

## Configuracao

### JS Quick Function
- **Function Name**: Nome da funcao no namespace global
- **JS: Code**: Codigo JavaScript executado ao chamar a funcao

## Regras

1. Nao sobrescreve funcoes ou variaveis de mesmo nome ja existentes
2. Se o nome ja existe no namespace global, a quick function e ignorada
3. Codigo invalido nao crasha o jogo - fail-safe retorna 0 e loga erro no console

## Exemplo

Se Function Name = "Example" e JS Code = "return 42":
- `Example()` retorna 42 em qualquer script call
- Usavel em damage formulas: `a.atk * Example()`

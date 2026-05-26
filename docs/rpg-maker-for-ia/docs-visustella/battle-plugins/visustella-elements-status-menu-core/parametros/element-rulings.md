# Parametros - Element Rulings

Controla as regras para mecanicas elementais.

## Rulings

### Multi-Element Ruling

Regra para calcular taxa elemental quando ha multiplos elementos:

| Opcao | Descricao |
|-------|-----------|
| **Maximum** | Maior taxa entre todos os elementos (padrao vanilla) |
| **Minimum** | Menor taxa entre todos os elementos |
| **Multiplicative** | Produto de todas as taxas |
| **Additive** | Soma de todas as taxas |
| **Average** | Media de todas as taxas |

Pode ser overridden por skill/item via notetag `<Multi-Element Rule: ...>`.

### Reflect-Element Ruling

Regra para reflexao com multi-elementos:

| Opcao | Descricao |
|-------|-----------|
| **All** | Todos os elementos devem ser reflecciveis |
| **Any** | Apenas um elemento refleccivel basta |

### JS: Maximum Rate

Codigo JavaScript para determinar como a taxa maxima e calculada.

### JS: Minimum Rate

Codigo JavaScript para determinar como a taxa minima e calculada.

### JS: Multiply Rate

Codigo JavaScript para determinar como a taxa multiplicada e calculada.

### JS: Additive Rate

Codigo JavaScript para determinar como a taxa aditiva e calculada.

### JS: Average Rate

Codigo JavaScript para determinar como a taxa media e calculada.

## Formulas

### JS: Received Rate

Codigo JavaScript para determinar como a taxa elemental recebida pelo target e calculada.

### JS: Finalize Rate

Codigo JavaScript para determinar como a taxa elemental finalizada e calculada antes do dano.

Veja tambem:
- [Calculo Dano Elemental](../conceitos/calculo-dano-elemental.md)
- [Multi-Elemento](../conceitos/multi-elemento.md)
- [Formula Dano](../referencia/formula-dano.md)

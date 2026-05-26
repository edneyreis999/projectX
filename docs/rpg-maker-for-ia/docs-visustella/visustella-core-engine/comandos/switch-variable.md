# Comandos: Switch e Variable

## Switches

### Switches: Randomize ID(s)
Randomiza ON/OFF para IDs de switch especificos.
- **Switch ID(s)**: Quais switches randomizar
- **Chance for ON**: Chance em 100% para ON

### Switches: Randomize Range
Randomiza ON/OFF para range de switch IDs.
- **Starting ID** / **Ending ID**: Range de IDs
- **Chance for ON**: Chance em 100% para ON

### Switches: Toggle ID(s)
Toggle ON/OFF para IDs especificos. ON vira OFF, OFF vira ON.
- **Switch ID(s)**: Quais switches toggle

### Switches: Toggle Range
Toggle ON/OFF para range de IDs.
- **Starting ID** / **Ending ID**: Range

## Variables

### Variable: JS Eval
Altera variavel via JS. Uma linha para ID e operand. Similar a Variable Pointers do RM2k3.
- **Variable ID**: Target. Suporta JS. Ex: `$gameVariables.value(1)`
- **Operation Type**: Tipo de operacao
- **Operand Modifier**: Valor. Suporta JS.

### Variable: JS Block
Altera variavel via JS block. Permite codigo multi-linha para ID e operand.
- **Variable ID**: Target. Suporta JS.
- **Operation Type**: Tipo de operacao
- **Operand Modifier**: Valor. Suporta JS.

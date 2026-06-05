# Elements - Action Sequence

## Visão Geral
Action Sequences para alterar os elementos usados no cálculo de dano durante uma ação.
**Requer VisuMZ_1_ElementStatusCore!**

## Comandos Disponíveis

### ELE: Add Elements
Adiciona elemento(s) para uso no cálculo de dano.

**Parâmetros:**
- **Elements**: ID(s) do elemento para adicionar

**Exemplo:**
```
ELE: Add Elements
  Elements: 1, 2, 3
```

### ELE: Clear Element Changes
Limpa todas as mudanças de elemento feitas através de Action Sequences.

### ELE: Force Elements
Força apenas elemento(s) específico(s) no cálculo de dano.

**Parâmetros:**
- **Elements**: ID(s) do elemento para forçar

### ELE: Null Element
Força nenhum elemento no cálculo de dano (ataque neutro).

## Notas
- Útil para habilidades que mudam elemento dinamicamente
- Add Elements adiciona aos elementos existentes
- Force Elements substitui todos os elementos
- Null Element é útil para ataques neutros/non-elementais
- Requer plugin ElementStatusCore instalado

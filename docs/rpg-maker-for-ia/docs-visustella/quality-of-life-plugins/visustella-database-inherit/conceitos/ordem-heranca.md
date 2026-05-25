# Ordem de Heranca - Regra Critica

## O Problema

As notetags permitem herdar de objetos com ID maior ou menor que o child. Porem, o plugin processa os objetos **um a um, do menor ID para o maior ID**. Isso significa que se um child herda de um parent com ID maior, o child so recebe as propriedades do parent **ANTES** da heranca ser aplicada ao parent.

## Exemplo Practico

```
Item ID 5:  preco original 400. Herda de Item ID 20.
Item ID 10: preco original 200.
Item ID 20: preco original 100. Herda de Item ID 10.
```

### O que acontece:

1. **Item ID 5** herda preco de Item ID 20 → `400 + 100 = 500`
2. **Item ID 20** herda preco de Item ID 10 → `100 + 200 = 300`
3. **Item ID 5** permanece em 500 (NAO vira 400 + 200 + 100)

Item ID 5 so viu o preco original de Item ID 20 (100), nao o preco herdado (300), porque o processamento de ID 5 aconteceu antes do de ID 20.

## Regra de Ouro

> **Herde sempre de IDs menores que o child.**

Seguindo esta regra, voce pode rastrear como as propriedades sao herdadas sem surpresas.

## Implicacoes

- Heranca em cadeia de IDs crescentes funciona perfeitamente
- Heranca de IDs maiores funciona, mas so recebe propriedades originais (nao herdadas)
- Heranca ciclica ou cruzada pode causar resultados inesperados
- Planeje a estrutura de IDs do banco de dados antes de configurar herancas

# Parametros - Trait Set Geral

Configuracoes gerais de como Trait Sets funcionam no jogo.

## General

### Enable Trait Sets?

Habilitar Trait Sets. Deve estar ON para que Trait Sets tenham qualquer efeito nos battlers.

**CRITICAL**: Se OFF, todas as notetags de Trait Sets sao ignoradas.

### Enemy Name Format

Formato do nome de inimigos quando afetado por Trait Sets.

Opcoes pre-definidas:

| Formato | Exemplo |
|---------|---------|
| [name] [letter] | Goblin A |
| [element] [name] [letter] | Fire Goblin A |
| [element] [subelement] [name] [letter] | Fire Thunder Goblin A |
| [name][gender] [letter] | Goblin(M) A |
| [race] [name][gender] [letter] | Beast Goblin(M) A |
| [alignment] [name][gender] [letter] | Chaotic Goblin(M) A |
| [blessing] [name][gender] [letter] | Blessed Goblin(M) A |
| [curse] [name][gender] [letter] | Cursed Goblin(M) A |
| [name][gender]([zodiac]) [letter] | Goblin(M)(Aries) A |
| [variant] [name][gender] [letter] | Major Goblin(M) A |
| [variant] [nature] [name][gender] [letter] | Major Jolly Goblin(M) A |
| [variant] [nature] [element] [name][gender] [letter] | Major Jolly Fire Goblin(M) A |
| [alignment] [variant] [nature] [element] [name][gender] [letter] | Chaotic Major Jolly Fire Goblin(M) A |

Ou formato customizado. Pode ser overridden por inimigo via notetag `<Trait Set Name Format>`.

## Trait Columns

### Column 1 Traits / Column 2 Traits

Lista de traits que aparecem em cada coluna. Usados por padrao na categoria Properties.

Veja tambem:
- [Trait Sets Conceito](../conceitos/trait-sets.md)
- [Trait Set Tipos](trait-set-tipos.md)
- [Notetags Trait Sets](../notetags/trait-sets.md)

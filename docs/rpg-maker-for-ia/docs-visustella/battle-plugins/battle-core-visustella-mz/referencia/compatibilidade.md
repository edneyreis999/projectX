# Compatibilidade - Battle Core

## Visão Geral

Este plugin é compatível com a **maioria** da biblioteca VisuStella MZ, mas existem incompatibilidades específicas com certos plugins ou features.

## Compatibilidade VisuStella MZ

### VisuMZ_1_BattleCore (Próprio Plugin)

#### Action Sequences e Boost Effects

Quando usando Action Sequences, Boost effects para damage, turn extensions, analyze, etc. **não ocorrerão** para nada diferente de:

**Action Sequence: "MECH: Action Effect"**

Isso é para manter efeitos controlados.

#### Workaround para Boosts

Se você quer aplicar bonuses para Boosts, utilize:
```
MECH: Boost Store Data
```

Isso armazena dentro de uma variável quantas vezes Boosts foram usados. Pode ser usado de qualquer forma, desde que gerenciável através de Events e Common Events.

## Plugins Incompatíveis

### Battle System - FTB (Force Turn Battle)
**Status**: Incompatível

### Battle System - ETB (Event Turn Battle)
**Status**: Incompatível

### Battle System - PTB (Press Turn Battle)
**Status**: Incompatível

**Razão**: Estes battle systems são incompatíveis devido às suas estruturas de turno, tornando-os altamente incompatíveis com a maneira que Action Sequences e outros recursos do Battle Core funcionam.

## Notas sobre Compatibilidade

### Plugins Tier Inferiores
Battle Core é **Tier 1**. Plugins de Tier 0 (como CoreEngine) devem ser colocados **antes** dele.

### Plugins Tier Superiores
Plugins Tier 2+ que dependem do Battle Core devem ser colocados **após** ele.

### Plugins de Terceiros
- Plugins de terceiros podem ter incompatibilidades
- Verifique documentação de plugins específicos
- Compatibility patches podem ser necessários

### Yanfly MV Plugins
Battle Core MZ **não é compatível** com plugins Yanfly MV. Use a versão VisuStella MZ equivalente.

## Troubleshooting de Compatibilidade

### Action Sequences não funcionando
- Verifique se Battle Core está **ativado**
- Verifique se não há conflicts com outros battle systems
- Verifique ordem dos plugins

### Boosts não aplicando
- Use "MECH: Action Effect" para Action Sequences
- Use "MECH: Boost Store Data" para custom handling

### Erros com plugins de terceiros
- Verifique documentação do plugin de terceiros
- Procure por compatibility patches
- Teste removendo o plugin de terceiros temporariamente

## Ver Também

- [Conceitos: Major Changes](../conceitos/major-changes.md) - Mudanças no código base
- [Parâmetros: Mechanics](../parametros/mechanics.md) - Configurações relacionadas
- [Referência: Troubleshooting](./troubleshooting.md) - Problemas comuns e soluções

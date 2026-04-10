# Damage Styles

## Visão Geral

**Damage Styles** são uma nova feature adicionada através do Battle Core plugin. Eles permitem simplificar drasticamente a criação de fórmulas de dano.

## Como Funciona

### Método Tradicional
Normalmente, você digita a **fórmula completa** na caixa de Damage Formula:
```
a.atk * 2 - b.def * 1.5
```

### Com Damage Styles
Ao usar certos Battle Styles, você pode **completamente ignorar** digitar a fórmula completa. Em vez disso, insira:
- **Power amount** (valor constante) ou
- **Multiplier** (multiplicador)

O plugin automaticamente calcula o dano usando esse valor, **factoring em ATK, DEF, MAT, MDF values**.

## Damage Styles Disponíveis

### Tabela de Estilos

| Style | Use Formula As | PH/MA Disparity | Stat Scale | Damage Scale |
|-------|----------------|-----------------|------------|--------------|
| Standard | Formula | No | Varies | Varies |
| ArmorScaling | Formula | No | Varies | Varies |
| CT | Multiplier | Yes | Low | Normal |
| D4 | Multiplier | No | High | Normal |
| DQ | Multiplier | No | Low | Low |
| FF7 | Power | Yes | Low | High |
| FF8 | Power | Yes | Medium | Normal |
| FF9 | Power | Yes | Low | Normal |
| FF10 | Power | Yes | Medium | High |
| MK | Multiplier | No | Medium | Low |
| MOBA | Multiplier | No | Medium | Normal |
| PKMN | Power | No | Low | Normal |

## Parâmetros dos Estilos

### Use Formula As
Determina o que você insere na caixa de fórmula:

- **Formula**: Digite a fórmula para a action como faria normalmente
- **Multiplier**: Digite o multiplier para a action. Use valores float (250% = 2.50)
- **Power**: Digite a power constant para a action. Use números inteiros (ex: 16)

### PH/MA Disparity
Existe disparidade entre como Physical Attacks e Magical Attacks são calculadas?

- **Yes**: Physical e magical attacks terão fórmulas diferentes
- **No**: Physical e magical attacks compartilham fórmulas similares

### Stat Scale
Quanto as stats devem escalar throughout the game?

- **Low**: Mantenha sob 100 para melhores resultados
- **Medium**: Números funcionam de low a mid 400's para melhores resultados
- **High**: Os números brilham quando são higher

### Damage Scale
Quanto o dano varia dependendo de small parameter changes?

- **Low**: Muito pouco aumento de parameter changes
- **Normal**: Dano escala próximo de proporcionalmente com parameter changes
- **High**: Dano pode boost drasticamente com parameter changes

## Parâmetros de Ataque/Defesa

### Hit Type e Damage Type
Os parâmetros usados para Damage Styles dependem de:

1. **Hit Type** da action:
   - Physical Attack
   - Magical Attack
   - Certain Hit

2. **Damage Type** da action:
   - Damage
   - Recovery
   - Drain

### Tabela de Parâmetros

| Hit Type | Damage Type | Attacker Parameter | Defender Parameter |
|----------|-------------|-------------------|-------------------|
| Physical | Damage | ATK | DEF |
| Magical | Damage | MAT | MDF |
| Certain Hit | Damage | Larger (ATK, MAT) | -Ignores- |
| Physical | Recover | DEF | -Ignores- |
| Magical | Recover | MDF | -Ignores- |

### Certain Hit
Certain Hit tende a usar **whichever value is higher**: ATK ou MAT, e então **ignora** os valores de defesa do target.

**Use Case**: Certain Hits para 'True Damage'

## Descrição dos Estilos Principais

### Standard
- Mesmo que 'Manual' formula input
- Permite suporte para notetags `<Armor Penetration>` e `<Armor Reduction>`

### Armor Scaling
- Permite digitar o base damage calculation
- Sem necessidade de digitar defending modifiers

### CT (Chrono Trigger)
- Multiplier-based
- Disparidade Physical/Magical
- Stat Scale baixo, Damage Scale normal

### FF7 (Final Fantasy VII)
- Power-based
- Disparidade Physical/Magical
- Stat Scale baixo, Damage Scale alto

### MOBA
- Multiplier-based
- Sem disparidade Physical/Magical
- Stat Scale médio, Damage Scale normal

### PKMN (Pokémon)
- Power-based
- Sem disparidade Physical/Magical
- Stat Scale baixo, Damage Scale normal

## Notas Importantes

### Replicações de Outros Jogos
Embora baseados em fórmulas de damage de outros jogos:
- **Nem todos são replicações exatas**
- Muitos foram **adaptados** para uso em RPG Maker MZ
- Nem todos RPGs usam o mesmo set de parâmetros
- External multipliers não funcionam da mesma forma que RPG Maker MZ

## Como Usar Damage Styles

1. **Selecione o Damage Style** no database da skill/item
2. **Insira o valor apropriado** na caixa de fórmula:
   - Para **Multiplier**: Digite um float value (2.50 para 250%)
   - Para **Power**: Digite um número inteiro (16)
   - Para **Formula**: Digite a fórmula normalmente
3. **Configure Hit Type** e **Damage Type** corretamente
4. **Teste** para ajustar conforme necessário

## Ver Também

- [Parâmetros: Damage](../parametros/damage.md) - Configuração de Damage Styles
- [Notetags: Damage](../notetags/damage.md) - Notetags relacionadas a damage
- [Conceitos: Visão Geral](./visao-geral.md) - Introdução ao Battle Core

# Trait Sets

## O que sao

Trait Sets sao novas propriedades adicionadas ao RPG Maker MZ por este plugin. Permitem atribuir traits a atores e inimigos em massa, ao inves de ajustar manualmente cada taxa individual.

**Exemplo**: Em vez de ajustar a resistencia elemental de cada inimigo, defina um Trait Set "Fire" com todas as taxas e atribua `<Element: Fire>` aos inimigos.

## Os 10 Tipos de Trait Sets

| Tipo | Descricao | Uso Tipico |
|------|-----------|------------|
| **Element** | Elemento primario do battler | Fraquezas/resistencias |
| **SubElement** | Elemento secundario | Sub-tipos elementais |
| **Gender** | Genero | Mecanicas de genero |
| **Race** | Raca | Bonus VS raca |
| **Nature** | Natureza/personalidade | Variedade |
| **Alignment** | Alinhamento moral | Bem/Mal/Neutro |
| **Blessing** | Bencao positiva | Buffs permanentes |
| **Curse** | Maldicao negativa | Debuffs permanentes |
| **Zodiac** | Signo zodiacal | Mecanica alternativa |
| **Variant** | Variante do inimigo | Inimigos mais/menos fortes |

## Cada Tipo de Trait Set Contem

- **Name**: Nome usado como referencia em notetags
- **Display Text**: Texto exibido no jogo (text codes permitidos)
- **Help Description**: Descricao de ajuda
- **Format Text**: Texto adicionado ao nome do inimigo
- **Valid for Random?**: Se pode ser sorteado aleatoriamente
- **Random Weight**: Peso padrao para randomizacao
- **Traits**:
  - Element Rates (multiplicativos)
  - Basic Parameters (multiplicativos)
  - X Parameters (aditivos)
  - S Parameters (multiplicativos)
  - Passive States (requer SkillsStatesCore)
  - Equipment (Weapon/Armor Types adicionais)

## Randomizacao

Trait Sets podem ser atribuidos aleatoriamente com pesos:

```
<Random Variant>
 Mighty: 10
 Normal: 200
 Puny
</Random Variant>
```

Peso maior = mais frequente. Omitir peso = peso padrao.

**Requisito**: Trait Sets devem estar habilitados em Plugin Parameters > General Trait Set Settings > Enable Trait Sets?

## Nome de Inimigos Dinamico

Trait Sets podem modificar o nome do inimigo:

```
<Trait Set Name Format>
 [Alignment] [Nature] [Element] [Name][Gender] [Letter]
</Trait Set Name Format>
```

Placeholders: `[Name]`, `[Letter]`, `[Element]`, `[SubElement]`, `[Gender]`, `[Race]`, `[Nature]`, `[Alignment]`, `[Blessing]`, `[Curse]`, `[Zodiac]`, `[Variant]`

## Battler Grafico por Trait

Inimigos podem ter graficos diferentes baseados no Trait Set:

```
<Male Battler Name: Spider1>
<Female Battler Name: Spider2>
<Male Battler Hue: 160>
```

## Bonus VS Trait Sets

Notetags que modificam dano/cura/precisao/critico contra targets com trait especifico:

- `<Damage VS name Trait: x%>` - Multiplica dano (nao afeta cura)
- `<Healing VS name Trait: x%>` - Multiplica cura (nao afeta dano)
- `<Accuracy VS name Trait: x%>` - Modifica precisao
- `<Critical VS name Trait: x%>` - Modifica taxa de critico

Multiplos notetags com mesmo tipo de modificacao (x%) empilham multiplicativamente. Plus/minus empilham aditivamente.

## Troca Mid-Game

Trait Sets podem ser alterados durante o jogo via Plugin Commands:

- Actor: Change Trait Sets (Group/Range/JS)
- Enemy: Change Trait Sets (Group/Range/JS)

Equipamentos com `<Equip Trait Requirement>` serao removidos se os traits nao baterem apos a troca.

## Replace Trait

Trocar um trait por outro via equipamento ou state:

```
<Replace Element Trait: Fire>
```

Prioridade: states (alta para baixa prioridade) > equipamentos (ordem de equip).

Veja tambem:
- [Notetags Trait Sets](../notetags/trait-sets.md)
- [Trait Set Geral Config](../parametros/trait-set-geral.md)
- [Trait Set Tipos Config](../parametros/trait-set-tipos.md)

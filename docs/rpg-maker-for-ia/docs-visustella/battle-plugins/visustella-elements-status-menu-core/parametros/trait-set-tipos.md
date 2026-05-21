# Parametros - Trait Set Tipos

Ha 10 tipos de Trait Sets. Todos funcionam da mesma forma, apenas em categorias diferentes.

## Os 10 Tipos

1. **Element** - Elemento primario
2. **SubElement** - Elemento secundario
3. **Gender** - Genero
4. **Race** - Raca
5. **Nature** - Natureza/personalidade
6. **Alignment** - Alinhamento moral
7. **Blessing** - Bencao positiva
8. **Curse** - Maldicao negativa
9. **Zodiac** - Signo zodiacal
10. **Variant** - Variante do inimigo

## Configuracao de Cada Tipo

Cada entrada de Trait Set contem:

### Name
Nome usado como referencia em notetags. Ex: "Fire", "Male", "Goblin".

### Display Text
Como o Trait Set e exibido no jogo quando selecionado. Text codes permitidos.

### Help Description
Descricao de ajuda para o Trait Set.

### Format Text
Texto adicionado ao nome do inimigo quando este Trait Set e usado.

### Valid for Random?
Se este Trait Set pode ser sorteado aleatoriamente.

### Random Weight
Peso padrao para randomizacao. Valores maiores = mais frequente.

### Traits

#### Element Rates
Taxas de dano elemental recebidas por este Trait Set. Modificadores sao **multiplicativos**.

#### Basic Parameters
Taxas de parametros basicos alteradas. Modificadores sao **multiplicativos**.

#### X Parameters
Taxas de X parametros alteradas. Modificadores sao **aditivos**.

#### S Parameters
Taxas de S parametros alteradas. Modificadores sao **multiplicativos**.

#### Passive States
States passivos aplicados por este Trait Set.
- **Requer**: VisuMZ_1_SkillsStatesCore
- Ver documentacao do SkillsStatesCore para mais detalhes

#### Equipment

##### Weapon Types
Tipos de arma adicionais usaveis por este Trait Set.

##### Armor Types
Tipos de armadura adicionais usaveis por este Trait Set.

## Exemplo de Uso

1. Defina um Trait Set "Fire" em Element com taxas elementais
2. Atribua `<Element: Fire>` a atores/inimigos
3. Todos com este trait terao as mesmas taxas configuradas
4. Inimigos podem ter nomes modificados: "Fire Goblin A"

Veja tambem:
- [Trait Sets Conceito](../conceitos/trait-sets.md)
- [Trait Set Geral](trait-set-geral.md)
- [Notetags Trait Sets](../notetags/trait-sets.md)

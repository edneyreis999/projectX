# Notetags - Unlock Conditions

Notetags que definem as condições necessárias para um actor aprender um passivo organicamente. Todas são **State Notetags**.

## Texto Customizado de Condição

```xml
<Equip Passive Learn Condition Text>
  texto exibido no help window
</Equip Passive Learn Condition Text>
```
- Se omitido, o plugin gera automaticamente com base nos formatos dos Plugin Parameters

## Level

```xml
<Equip Passive Learn Level: x>
```
Actor deve alcançar level `x`.

## Batalhas

```xml
<Equip Passive Learn Battles: x>      <!-- Qualquer batalha -->
<Equip Passive Learn Victories: x>    <!-- Vitórias -->
<Equip Passive Learn Escapes: x>      <!-- Fugas -->
<Equip Passive Learn Defeats: x>      <!-- Derrotas -->
```
Contador inicia quando passivo é listado como learnable.

## Ações

```xml
<Equip Passive Learn Attack Times: x>              <!-- Ataques normais -->
<Equip Passive Learn Guard Times: x>               <!-- Defesas -->
<Equip Passive Learn Use Skills: x>                 <!-- Qualquer skill -->
<Equip Passive Learn Use Physical Skills: x>        <!-- Skills físicas -->
<Equip Passive Learn Use Magical Skills: x>         <!-- Skills mágicas -->
<Equip Passive Learn Use Certain Hit Skills: x>     <!-- Skills certain hit -->
<Equip Passive Learn Use Items: x>                  <!-- Uso de itens -->
```

## Skill Type Específico

```xml
<Equip Passive Learn SType id: x>    <!-- Por ID do skill type -->
<Equip Passive Learn SType name: x>  <!-- Por nome do skill type -->
```
`x` = quantidade de usos necessários do tipo especificado.

## Críticos e Evasão

```xml
<Equip Passive Learn Inflict Critical Times: x>    <!-- Causar críticos -->
<Equip Passive Learn Receive Critical Times: x>     <!-- Receber críticos -->
<Equip Passive Learn Miss Times: x>                  <!-- Errar ataques -->
<Equip Passive Learn Evade Times: x>                 <!-- Esquivar ataques -->
```

## Elementos

```xml
<!-- Causar dano elemental -->
<Equip Passive Learn Inflict Element id Damage: x>
<Equip Passive Learn Inflict Element name Damage: x>

<!-- Receber dano elemental -->
<Equip Passive Learn Receive Element id Damage: x>
<Equip Passive Learn Receive Element name Damage: x>
```

## States

```xml
<!-- Causar state em alvos -->
<Equip Passive Learn Inflict State id: x>
<Equip Passive Learn Inflict State name: x>

<!-- Receber state -->
<Equip Passive Learn Receive State id: x>
<Equip Passive Learn Receive State name: x>
```

## Trait Sets (requer Elements and Status Menu Core)

```xml
<Equip Passive Learn Defeat name Trait: x>
```
Derrotar `x` inimigos com o trait set nomeado.

## Dano e Cura Total

```xml
<Equip Passive Learn Inflict Total Damage: x>     <!-- Dano total causado -->
<Equip Passive Learn Receive Total Damage: x>      <!-- Dano total recebido -->
<Equip Passive Learn Inflict Total Healing: x>     <!-- Cura total causada -->
<Equip Passive Learn Receive Total Healing: x>     <!-- Cura total recebida -->
```

## Kill, Death, Assist

```xml
<Equip Passive Learn Kill Count: x>     <!-- Kills diretos (não slip damage) -->
<Equip Passive Learn Death Count: x>    <!-- Morte (0 HP ou Death state) -->
<Equip Passive Learn Assist Count: x>   <!-- Presente em kill sem ser o autor -->
```

## Recursos

```xml
<Equip Passive Learn Have Gold: x>              <!-- Ter x gold -->
<Equip Passive Learn Have Item id: x>           <!-- Ter x do item (por ID) -->
<Equip Passive Learn Have Item name: x>         <!-- Ter x do item (por nome) -->
<Equip Passive Learn Have Weapon id: x>         <!-- Ter x da arma -->
<Equip Passive Learn Have Armor id: x>          <!-- Ter x do equipamento -->
```

## Parâmetros

```xml
<!-- Parâmetros base -->
<Equip Passive Learn Reach Param name: x>
<!-- name: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK -->

<!-- X-Parameters -->
<Equip Passive Learn Reach XParam name: x%>
<!-- name: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG -->

<!-- S-Parameters -->
<Equip Passive Learn Reach SParam name: x%>
<!-- name: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR -->
```

## Regra Importante

**Múltiplas condições são AND**. Todas devem ser cumpridas simultaneamente para o passivo ser aprendido. Contadores iniciam no momento da listagem como learnable.

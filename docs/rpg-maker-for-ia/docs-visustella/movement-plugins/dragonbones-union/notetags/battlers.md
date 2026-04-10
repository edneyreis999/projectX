# Notetags - Dragonbones Battler

## Visão Geral

Os seguintes notetags devem ser atribuídos a **actors e/ou enemies**. Um actor/enemy atribuído terá seu sprite original oculto em favor da armature Dragonbones ser exibida. Use estes notetags para declarar várias configurações para suas armatures Dragonbones.

---

## <Dragonbones Battler: filename>

**Uso**: Actor, Enemy Notetags

**Descrição**: Define o DragonBones associado a este actor/enemy como 'filename'.

**Detalhes**:
- O nome será associado aos assets usados
- Será usado para verificar nomes de arquivos associados que terminam com `_ske.json`, `_tex.json` e `_tex.png`
- Os assets listados devem ser encontrados na pasta de assets atribuída

**Exemplos**:
```
<Dragonbones Battler: Demon>
<Dragonbones Battler: DragonBoy>
<Dragonbones Battler: Swordsman>
<Dragonbones Battler: Ubbie>
```

---

## <Dragonbones Battler Scale: x, y>
## <Dragonbones Battler Scale X: x>
## <Dragonbones Battler Scale Y: x>

**Uso**: Actor, Enemy Notetags

**Descrição**: Define a escala base para o Dragonbones associado a este actor/enemy.

**Detalhes**:
- Use quando uma armature Dragonbones é muito grande ou pequena e precisa ser escalada para cima/baixo
- Esta escala será amplificada pelo valor de escala do sprite do actor/enemy
- Use o 1º notetag para atribuir valores a ambos Scale X e Scale Y
- Use o 2º/3º notetags para atribuir valores Scale X e Y separadamente
- Use valores negativos para virar a armature Dragonbones

**Exemplos**:
```
<Dragonbones Battler Scale: -0.3, 0.3>
<Dragonbones Battler Scale X: -0.3>
<Dragonbones Battler Scale Y: 0.3>
```

---

## <Dragonbones Battler Offset: x, y>
## <Dragonbones Battler Offset X: x>
## <Dragonbones Battler Offset Y: x>

**Uso**: Actor, Enemy Notetags

**Descrição**: Offset para ajustar a posição da armature Dragonbones.

**Detalhes**:
- A armature Dragonbones é sempre anexada no ponto root definido nos dados Dragonbones
- Se uma armature tem um ponto root que não se ajusta bem ao sprite do battler, você pode deslocá-la
- Substitua 'x' e 'y' por valores numéricos representando quantos pixels deseja deslocar
- Use o 1º notetag para atribuir valores a ambos Offset X e Offset Y
- Use o 2º/3º notetags para atribuir valores Offset X e Y separadamente
- Use valores negativos para deslocar para esquerda (X) ou para cima (Y)

**Exemplos**:
```
<Dragonbones Battler Offset: -10, 5>
<Dragonbones Battler Offset X: -10>
<Dragonbones Battler Offset Y: 5>
```

---

## <Dragonbones Battler Size: width, height>
## <Dragonbones Battler Width: x>
## <Dragonbones Battler Height: x>

**Uso**: Actor, Enemy Notetags

**Descrição**: Define dimensões para o sprite Dragonbones.

**Detalhes**:
- Armatures Dragonbones não têm largura ou altura padrão
- Isso é problemático ao calcular largura/altura do sprite para Action Sequences
- Substitua 'width', 'height' ou 'x' por valores numéricos representando dimensões em pixels
- Use o 1º notetag para atribuir valores a ambos Width e Height
- Use o 2º/3º notetags para atribuir valores Width e Height separadamente
- Se não usado, usa os valores padrão definidos em Plugin Parameters => Battler Settings => Default => Width/Height

**Exemplos**:
```
<Dragonbones Battler Size: 50, 100>
<Dragonbones Battler Width: 50>
<Dragonbones Battler Height: 100>
```

---

## <Dragonbones Battler Time Scale: x>

**Uso**: Actor, Enemy Notetags

**Descrição**: Ajusta a escala de tempo da armature Dragonbones.

**Detalhes**:
- Substitua 'x' por um valor numérico depicting quão rápido a armature deve animar
  - `1.0` é o valor padrão
  - Números maiores animam mais rápido
  - Números menores animam mais devagar
  - Se o número for muito pequeno, pode não animar nada

**Exemplo**:
```
<Dragonbones Battler Time Scale: 1.5>
```

---

## Motion Tags

### <Dragonbones Battler Motion Walk: animation>
### <Dragonbones Battler Motion Wait: animation>
### <Dragonbones Battler Motion Chant: animation>
### <Dragonbones Battler Motion Guard: animation>
### <Dragonbones Battler Motion Damage: animation>
### <Dragonbones Battler Motion Evade: animation>
### <Dragonbones Battler Motion Thrust: animation>
### <Dragonbones Battler Motion Swing: animation>
### <Dragonbones Battler Motion Missile: animation>
### <Dragonbones Battler Motion Skill: animation>
### <Dragonbones Battler Motion Spell: animation>
### <Dragonbones Battler Motion Item: animation>
### <Dragonbones Battler Motion Escape: animation>
### <Dragonbones Battler Motion Victory: animation>
### <Dragonbones Battler Motion Dying: animation>
### <Dragonbones Battler Motion Abnormal: animation>
### <Dragonbones Battler Motion Sleep: animation>
### <Dragonbones Battler Motion Dead: animation>

**Uso**: Actor, Enemy Notetags

**Descrição**: Atribui animações Dragonbones para motions específicos.

**Detalhes**:
- Substitua 'animation' pelo nome da animação Dragonbones
- Se não usado, padrão tentará reproduzir animação com nome igual ao motion
- Nomes de animação não precisam ser case-sensitive
- Se nenhuma animação for encontrada, nenhuma animação será reproduzida

**Exemplos**:
```
<Dragonbones Battler Motion Wait: idle>
<Dragonbones Battler Motion Swing: attack>
<Dragonbones Battler Motion Thrust: attack>
<Dragonbones Battler Motion Missle: attack>
<Dragonbones Battler Motion Skill: special>
<Dragonbones Battler Motion Spell: special>
<Dragonbones Battler Motion Dead: defeated>
```

---

## <Dragonbones Battler Settings> ... </Dragonbones Battler Settings>

**Uso**: Actor, Enemy Notetags

**Descrição**: Container para todas as configurações do Dragonbones battler.

**Detalhes**:
- Permite encapsular todas as informações em um único notetag
- As configurações são as mesmas dos notetags listados acima
- Você pode remover as configurações que não deseja alterar
- O único dado necessário é a linha 'Battler: filename'

**Exemplo**:
```
<Dragonbones Battler Settings>
 Battler: Demon

 Scale: 0.3, 0.3

 Size: 80, 80

 Motion Wait: idle
 Motion Damage: hit
 Motion Swing: attack
 Motion Thrust: attack
 Motion Missile: attack
 Motion Skill: special
 Motion spell: special
 Motion Dead: defeated
</Dragonbones Battler Settings>
```

---

## Hue Tags

### <Dragonbones Hue Affected>

**Uso**: Enemy Notetags

**Descrição**: Habilita hues para afetarem enemy battlers. Isto ignora configurações padrão do Plugin Parameter.

### <Dragonbones No Hue>

**Uso**: Enemy Notetags

**Descrição**: Desabilita hues para afetarem enemy battlers. Isto ignora configurações padrão do Plugin Parameter.

---

## Links Relacionados

- [Introdução](./introduction.md) - Voltar para introdução
- [Notetags Map Sprites](./map-sprites.md) - Notetags para Map Sprites
- [Battler Settings](../configuracao/battler-settings.md) - Configurações de Battler

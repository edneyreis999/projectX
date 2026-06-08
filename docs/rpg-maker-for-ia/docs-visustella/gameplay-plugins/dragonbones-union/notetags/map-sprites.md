# Notetags - Dragonbones Map Sprite

## Visão Geral

Você pode usar armatures Dragonbones como sprites do mapa. Quando usadas, qualquer um dos sprites originais se tornará invisível e será substituído pela armature Dragonbones.

Estes notetags podem ser usados para **actors e events**. No caso de events, ambos notetags e comment tags podem ser usados.

**Aviso**: Seja cauteloso ao usar Comment Tags para páginas de evento já que comentários contêm uma contagem máxima de linhas de 6.

---

## <Dragonbones Sprite: filename>

**Uso**: Actor, Event Notetags e Event Page Comment Tags

**Descrição**: Define o DragonBones associado a este map sprite como 'filename'.

**Detalhes**:
- O nome será associado aos assets usados
- Será usado para verificar nomes de arquivos associados que terminam com `_ske.json`, `_tex.json` e `_tex.png`
- Os assets listados devem ser encontrados na pasta de assets atribuída

**Exemplos**:
```
<Dragonbones Sprite: Demon>
<Dragonbones Sprite: DragonBoy>
<Dragonbones Sprite: Swordsman>
<Dragonbones Sprite: Ubbie>
```

---

## <Dragonbones Sprite Scale: x, y>
## <Dragonbones Sprite Scale X: x>
## <Dragonbones Sprite Scale Y: x>

**Uso**: Actor, Event Notetags e Event Page Comment Tags

**Descrição**: Define a escala base para o Dragonbones associado a este map sprite.

**Detalhes**:
- Use quando uma armature Dragonbones é muito grande ou pequena
- Esta escala será amplificada pelo valor de escala do sprite do personagem
- Use o 1º notetag para atribuir valores a ambos Scale X e Scale Y
- Use o 2º/3º notetags para atribuir valores Scale X e Y separadamente
- Use valores negativos para virar a armature Dragonbones

**Exemplos**:
```
<Dragonbones Sprite Scale: -0.3, 0.3>
<Dragonbones Sprite Scale X: -0.3>
<Dragonbones Sprite Scale Y: 0.3>
```

---

## <Dragonbones Sprite Offset: x, y>
## <Dragonbones Sprite Offset X: x>
## <Dragonbones Sprite Offset Y: x>

**Uso**: Actor, Event Notetags e Event Page Comment Tags

**Descrição**: Offset para ajustar a posição da armature Dragonbones.

**Detalhes**:
- A armature é sempre anexada no ponto root definido nos dados Dragonbones
- Se uma armature tem um ponto root que não se ajusta bem ao sprite, você pode deslocá-la
- Substitua 'x' e 'y' por valores numéricos representando pixels
- Use o 1º notetag para atribuir valores a ambos Offset X e Offset Y
- Use o 2º/3º notetags para atribuir valores Offset X e Y separadamente
- Use valores negativos para deslocar para esquerda (X) ou para cima (Y)

**Exemplos**:
```
<Dragonbones Sprite Offset: -10, 5>
<Dragonbones Sprite Offset X: -10>
<Dragonbones Sprite Offset Y: 5>
```

---

## <Dragonbones Sprite Time Scale: x>

**Uso**: Actor, Event Notetags e Event Page Comment Tags

**Descrição**: Ajusta a escala de tempo da armature Dragonbones.

**Detalhes**:
- Substitua 'x' por um valor numérico depicting velocidade de animação
  - `1.0` é o valor padrão
  - Números maiores animam mais rápido
  - Números menores animam mais devagar
  - Se muito pequeno, pode não animar

**Exemplo**:
```
<Dragonbones Sprite Time Scale: 1.5>
```

---

## <Dragonbones Sprite Walk Rate: x>

**Uso**: Actor, Event Notetags e Event Page Comment Tags

**Descrição**: Ajusta a velocidade de animação quando andando.

**Detalhes**:
- Substitua 'x' por um valor numérico depicting velocidade
  - `1.0` é o valor padrão
  - Números maiores animam mais rápido
  - Números menores animam mais devagar
- Se usado com `<Dragonbones Sprite Time Scale: x>`, a velocidade será acumulada multiplicativamente

**Exemplo**:
```
<Dragonbones Sprite Walk Rate: 1.5>
```

---

## <Dragonbones Sprite Dash Rate: x>

**Uso**: Actor, Event Notetags e Event Page Comment Tags

**Descrição**: Ajusta a velocidade de animação quando dando dash.

**Detalhes**:
- Substitua 'x' por um valor numérico depicting velocidade
  - `1.0` é o valor padrão
  - Números maiores animam mais rápido
  - Números menores animam mais devagar
- Se usado com `<Dragonbones Sprite Time Scale: x>`, a velocidade será acumulada multiplicativamente

**Exemplo**:
```
<Dragonbones Sprite Dash Rate: 1.5>
```

---

## <Dragonbones Sprite Size: width, height>
## <Dragonbones Sprite Width: x>
## <Dragonbones Sprite Height: x>

**Uso**: Actor, Enemy Notetags

**Descrição**: Define dimensões para o sprite Dragonbones.

**Detalhes**:
- Armatures Dragonbones não têm largura ou altura padrão
- Isso é problemático para plugins que usam dimensões
- Substitua 'width', 'height' ou 'x' por valores numéricos em pixels
- Use o 1º notetag para atribuir valores a ambos Width e Height
- Use o 2º/3º notetags para atribuir valores Width e Height separadamente
- Se não usado, usa os valores padrão definidos nos Plugin Parameters

**Exemplos**:
```
<Dragonbones Sprite Size: 48, 64>
<Dragonbones Sprite Width: 48>
<Dragonbones Sprite Height: 64>
```

---

## Flip Tags

### <Dragonbones Sprite Flip Left>
### <Dragonbones Sprite Flip Right>

**Uso**: Actor, Event Notetags e Event Page Comment Tags

**Descrição**: Informa ao map sprite para se virar quando facing esquerda/direita para reusar animações.

### <Dragonbones Sprite No Flip Left>
### <Dragonbones Sprite No Flip Right>

**Uso**: Actor, Event Notetags e Event Page Comment Tags

**Descrição**: Previne flipping de ocorrer. Estes notetags sobrescreverão configurações dos Plugin Parameters.

---

## Motion Tags

### <Dragonbones Sprite Motion Idle: animation>
### <Dragonbones Sprite Motion Walk: animation>
### <Dragonbones Sprite Motion Dash: animation>
### <Dragonbones Sprite Motion Jump: animation>
### <Dragonbones Sprite Motion LadderIdle: animation>
### <Dragonbones Sprite Motion LadderClimb: animation>
### <Dragonbones Sprite Motion RopeIdle: animation>
### <Dragonbones Sprite Motion RopeClimb: animation>

**Uso**: Actor, Event Notetags e Event Page Comment Tags

**Descrição**: Define animações específicas diferentes das listadas nos Plugin Parameters para motions específicos.

**Detalhes**:
- Substitua 'animation' pelo nome da animação Dragonbones
- Se não usado, padrão tentará reproduzir animação com nome igual ao motion
- Nomes de animação não precisam ser case-sensitive
- Se nenhuma animação for encontrada, nenhuma animação será reproduzida

**Exemplo**:
```
<Dragonbones Sprite Motion Idle: stand>
<Dragonbones Sprite Motion Walk: move>
<Dragonbones Sprite Motion Dash: run>
<Dragonbones Sprite Motion Jump: hop>
```

---

## <Dragonbones Sprite Settings> ... </Dragonbones Sprite Settings>

**Uso**: Actor, Event Notetags e Event Page Comment Tags

**Descrição**: Container para todas as configurações do Dragonbones sprite.

**Detalhes**:
- Permite encapsular todas as informações em um único notetag
- As configurações são as mesmas dos notetags listados acima
- Você pode remover as configurações que não deseja alterar
- O único dado necessário é a linha 'Filename: filename'

**Exemplo**:
```
<Dragonbones Sprite Settings>
 Filename: Ubbie

 Scale: 0.1, 0.1

 Flip Right

 Motion Idle: stand
 Motion Walk: walk
</Dragonbones Sprite Settings>
```

---

## Links Relacionados

- [Introdução](./introduction.md) - Voltar para introdução
- [Notetags Battlers](./battlers.md) - Notetags para Battlers
- [Map Sprite Settings](../configuracao/map-sprite-settings.md) - Configurações de Map Sprite
- [Map Sprites - Conceitos](../conceitos/map-sprites.md) - Limitações e comportamentos

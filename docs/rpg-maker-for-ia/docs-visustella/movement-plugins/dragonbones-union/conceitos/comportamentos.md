# DragonBones - Comportamentos das Armatures

## Visão Geral

As armatures Dragonbones têm certos comportamentos quando usadas com battlers, pictures e/ou sprites do mapa.

## Comportamentos Principais

### 1. Animação Inicial (Loaded Animation)

Quando uma armature Dragonbones é carregada, ela reproduzirá a animação **'idle'** ou qualquer que seja definida nos **Plugin Parameters => General Settings => Loaded Animation** ao carregar.

**Importante**: Crie suas armatures Dragonbones com isso em mente. Em outros momentos, a animação 'idle' será usada como animação base padrão.

### 2. Ancoragem (Anchor Point)

A armature Dragonbones será sempre ancorada nas coordenadas X, Y do alvo. Este ponto de coordenada X, Y será onde o ponto raiz/pivô (root/pivot point) da armature Dragonbones será localizado.

### 3. Propriedades Compartilhadas

As propriedades usadas por um sprite (ou seja, opacidade, escala, rotação e tint) também serão compartilhadas e/ou amplificadas com a armature Dragonbones.

**Exceção**: Modos de mistura (Blend Modes) não são suportados.

## Links Relacionados

- [Visão Geral](./visao-geral.md) - Voltar para visão geral
- [Problemas Comuns](./problemas-comuns.md) - Problemas e soluções
- [Armatures](./armatures.md) - Naming correto de armatures

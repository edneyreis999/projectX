# Pictures - Action Sequence

## Visão Geral
Action Sequences relacionadas a projéteis e imagens.

**Nota:** Para projéteis visuais, veja a documentação de `projectiles.md` (requer VisuMZ_3_ActSeqProjectiles!).

## Comandos Relacionados

### PROJECTILE: Picture
Cria um projétil usando uma imagem e dispara contra um alvo.
**Requer VisuMZ_3_ActSeqProjectiles!**

**Parâmetros:**

**Coordinates - Start Location:**
- **Type**: Target (battler) ou Point (coordenadas)
- **Target(s)**: Unidade(s) para iniciar (se Type=Target)
- **Centralize**: Um projétil no centro ou um por alvo?
- **Target Location**: Parte do alvo (front/middle/back + head/center/base)
- **Point X/Y**: Coordenadas para iniciar (pode usar JS)
- **Offset X/Y**: Offset em pixels (pode usar JS)

**Coordinates - Goal Location:**
- **Type**: Target (battler) ou Point (coordenadas)
- **Target(s)**: Unidade(s) como destino (se Type=Target)
- **Centralize**: Um projétil no centro ou um por alvo?
- **Target Location**: Parte do alvo
- **Point X/Y**: Coordenadas de destino (pode usar JS)
- **Offset X/Y**: Offset em pixels (pode usar JS)

**Settings:**
- **Picture Filename**: Arquivo de imagem para usar como projétil
- **Duration**: Duração para viagem do projétil
- **Wait For Projectile?**: Aguardar projétil chegar?
- **Extra Settings**:
  - **Auto Angle?**: Angula projétil automaticamente na direção do movimento
  - **Angle Offset**: Altera inclinação em graus
  - **Arc Peak**: Altura do arco da trajetória em pixels
  - **Blend Mode**: Normal, Additive, Multiply, Screen
  - **Easing**: Tipo de easing para trajetória
  - **Hue**: Ajuste matiz (0-360)
  - **Scale**: Escala do tamanho (use decimais)
  - **Spin Speed**: Rotação por frame (não funciona bem com Auto Angle)

**Effect Emulation:**
- **Action Effect?**: Emular Action Effect ao atingir alvo?
- **Item Effect ID?**: Emular Item Effect ao atingir? (0 = não usar)
- **Skill Effect ID?**: Emular Skill Effect ao atingir? (0 = não usar)
- **Common Event ID**: Jogar Common Event Once Parallel ao atingir (0 = não usar)

**Exemplo:**
```
PROJECTILE: Picture
  Start Location: Target
  Targets: User
  Centralize: true
  Target Location: front center
  Offset X: 0
  Offset Y: 0

  Goal Location: Target
  Targets: Target
  Centralize: false
  Target Location: front center
  Offset X: 0
  Offset Y: 0

  Picture Filename: Fireball
  Duration: 30
  Wait For Projectile?: true

  Extra Settings: ON
  Auto Angle?: true
  Angle Offset: 0
  Arc Peak: 50
  Blend Mode: Additive
  Easing: Ease In Out
  Hue: 0
  Scale: 1.0
  Spin Speed: 0

  Action Effect?: true
```

## Outros Tipos de Projéteis

### PROJECTILE: Animation
Projétil usando animação do database.

### PROJECTILE: Icon
Projétil usando ícone do database.

## Notas
- Projéteis criam efeitos visuais dinâmicos de ataque
- Permitem arcos curvos e trajetórias complexas
- Blend Mode Additive cria efeitos de luz/brilho
- Auto Angle ajusta orientação automaticamente
- Effect Emulation permite acionar efeitos ao impacto
- Útil para magias, flechas, bolas de fogo, etc.

## Veja Também
- `projectiles.md` - Documentação completa de projéteis
- `animacoes.md` - Animações do database
- `inject.md` - Injeção de animações customizadas

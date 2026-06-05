# Motion - Action Sequence

## Visão Geral
Action Sequences para controlar motions de sprites sideview.

## Comandos Disponíveis

### MOTION: Clear Freeze Frame
Limpa quaisquer freeze frames das unidades.
Aplica apenas a sprite sheets (NÃO funciona com Dragonbones).

**Parâmetros:**
- **Targets**: Unidade(s) para limpar freeze frames

**Exemplo:**
```
MOTION: Clear Freeze Frame
  Targets: User
```

### MOTION: Freeze Motion Frame
Força freeze frame instantâneo no motion selecionado.
Automaticamente limpa com novo motion.
Aplica apenas a sprite sheets (NÃO funciona com Dragonbones).

**Parâmetros:**
- **Targets**: Unidade(s) para congelar motion
- **Motion Type**: Motion para congelar
- **Frame Index**: Frame para congelar (começa em 0)
- **Show Weapon?**: Mostrar sprite da arma? (para attack/thrust/swing/missile)

### MOTION: Motion Type
Causa unidades reproduzirem o motion selecionado.

**Parâmetros:**
- **Targets**: Unidade(s) para performar motion
- **Motion Type**: Motion para reproduzir
- **Show Weapon?**: Mostrar sprite da arma?

### MOTION: Perform Action
Causa unidades reproduzirem motion apropriado baseado na ação atual.

**Parâmetros:**
- **Targets**: Unidade(s) para performar motion

### MOTION: Refresh Motion
Cancela motions definidos e usa motion mais natural atual.

**Parâmetros:**
- **Targets**: Unidade(s) para refresh motion state

### MOTION: Wait By Motion Frame
Cria espera igual ao número de motion frames passando.
Tempo baseado em Plugin Parameters => Actors => Motion Speed.

**Parâmetros:**
- **Motion Frames to Wait?**: Frames para aguardar

## Notas
- Motions controlam animações de sprites sideview
- Freeze Frame para animações em frame específico
- Motion Type troca animações explicitamente
- Perform Action usa motion apropriado automaticamente
- Refresh Motion retorna ao estado natural
- Wait By Motion Frame sincroniza com animações
- Dragonbones usa "DB: Dragonbones Time Scale" em vez de Freeze Frame

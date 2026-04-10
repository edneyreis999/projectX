# Animações - Action Sequence

## Visão Geral
Action Sequences relacionadas às animações encontradas na aba Animations do Database.

## Comandos Disponíveis

### ANIM: Action Animation
Reproduz a animação associada à ação atual.

**Parâmetros:**
- **Targets**: Unidade(s) para reproduzir a animação
- **Mirror Animation**: Espelhar a animação?
- **Wait For Animation?**: Aguardar conclusão da animação?

**Exemplo:**
```
ANIM: Action Animation
  Targets: User
  Mirror Animation: false
  Wait For Animation?: true
```

### ANIM: Attack Animation
Reproduz a animação associada à arma do usuário.

**Parâmetros:**
- **Targets**: Unidade(s) para reproduzir a animação
- **Mirror Animation**: Espelhar a animação?
- **Wait For Animation?**: Aguardar conclusão da animação?

### ANIM: Attack Animation 2+
Reproduz a animação associada às outras armas do usuário.

**Parâmetros:**
- **Targets**: Unidade(s) para reproduzir a animação
- **Slot**: Slot da arma (1 = mão principal)
- **Mirror Animation**: Espelhar a animação?
- **Wait For Animation?**: Aguardar conclusão da animação?

### ANIM: Balloon Animation
Reproduz uma animação de balão nas unidades alvo.

**Parâmetros:**
- **Targets**: Unidade(s) para reproduzir o balão
- **Balloon Type**: Tipo de balão a exibir
- **Wait for Completion**: Aguardar conclusão?

### ANIM: Cast Animation
Reproduz a animação de conjuração associada à ação.

**Parâmetros:**
- **Targets**: Unidade(s) para reproduzir a animação
- **Mirror Animation**: Espelhar a animação?
- **Wait For Animation?**: Aguardar conclusão da animação?

### ANIM: Guard Animation
Reproduz a animação associada à ação de guarda do usuário.

**Parâmetros:**
- **Targets**: Unidade(s) para reproduzir a animação
- **Mirror Animation**: Espelhar a animação?
- **Wait For Animation?**: Aguardar conclusão da animação?

### ANIM: Item Animation
Reproduz a animação associada a um item específico.

**Parâmetros:**
- **Item ID**: ID do item para obter a animação
- **Targets**: Unidade(s) para reproduzir a animação
- **Mirror Animation**: Espelhar a animação?
- **Wait For Animation?**: Aguardar conclusão da animação?

### ANIM: Play at Coordinate
Reproduz uma animação em coordenadas X, Y específicas da tela.
**Requer VisuMZ_0_CoreEngine!**

**Parâmetros:**
- **Animation ID**: ID da animação a reproduzir
- **Coordinates**: Coordenadas X e Y (pode usar código JavaScript)
- **Mirror Animation?**: Espelhar a animação?
- **Mute Animation?**: Silenciar a animação?
- **Wait for Completion?**: Aguardar conclusão?

### ANIM: Show Animation
Reproduz uma animação específica nas unidades.

**Parâmetros:**
- **Targets**: Unidade(s) para reproduzir a animação
- **Animation ID**: ID da animação a reproduzir
- **Mirror Animation**: Espelhar a animação?
- **Wait For Animation?**: Aguardar conclusão da animação?

### ANIM: Show Animation JS
Reproduz uma animação específica usando JavaScript para determinar o ID.

**Parâmetros:**
- **Targets**: Unidade(s) para reproduzir a animação
- **JS: Animation ID**: Código JavaScript para determinar o ID da animação
- **Mirror Animation**: Espelhar a animação?
- **Wait For Animation?**: Aguardar conclusão da animação?

### ANIM: Skill Animation
Reproduz a animação associada a uma skill específica.

**Parâmetros:**
- **Skill ID**: ID da skill para obter a animação
- **Targets**: Unidade(s) para reproduzir a animação
- **Mirror Animation**: Espelhar a animação?
- **Wait For Animation?**: Aguardar conclusão da animação?

### ANIM: Wait For Animation
Aguarda a conclusão de quaisquer animações antes de executar o próximo comando.

### ANIM: Change Battle Portrait
Altera o retrato de batalha do ator.
Pode ser usado fora de batalha/action sequences.

**Parâmetros:**
- **Targets**: Unidade(s) (apenas atores válidos)
- **Filename**: Arquivo para alterar o retrato

### ANIM: Change Battle Portrait (JS)
Altera o retrato de batalha através de JavaScript.
Pode ser usado fora de batalha/action sequences.

**Parâmetros:**
- **JS: Actor ID**: Código JS para determinar o ID do ator
- **JS: Filename**: Código JS para determinar o nome do arquivo

## Notas
- As animações são reproduzidas sequencialmente
- Use "Wait For Animation" para sincronizar comandos subsequentes
- Animações de balão são úteis para feedback visual
- Animações podem ser espelhadas para variação visual

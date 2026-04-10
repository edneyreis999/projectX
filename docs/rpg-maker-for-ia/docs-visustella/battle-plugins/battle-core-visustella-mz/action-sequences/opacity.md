# Opacity - Action Sequence

## Visão Geral
Action Sequences para controlar opacidade de battlers.
Estes comandos estão integrados na seção Movement do Battle Core.

## Comando Disponível

### MOVE: Opacity
Faz unidades mudarem opacidade.
**Este comando está detalhado em `movement.md`**

**Parâmetros:**
- **Targets**: Unidade(s) para mudar opacidade
- **Desired Opacity**: Valor de opacidade desejado (pode usar JavaScript)
  - 255 = totalmente visível
  - 0 = invisível
- **Duration**: Duração em frames para mudança de opacidade
- **Opacity Easing**: Tipo de easing para transição (requer VisuMZ_0_CoreEngine)
- **Wait For Opacity?**: Aguardar mudança de opacidade completar?

**Exemplo:**
```
MOVE: Opacity
  Targets: User
  Desired Opacity: 128
  Duration: 30
  Opacity Easing: Linear
  Wait For Opacity?: true
```

## Casos de Uso

### Desaparecer Gradualmente
```
# Fazer battler desaparecer
MOVE: Opacity
  Targets: User
  Desired Opacity: 0
  Duration: 60
  Opacity Easing: Ease In
  Wait For Opacity?: true
```

### Aparecer Gradualmente
```
# Fazer battler aparecer
MOVE: Opacity
  Targets: Target
  Desired Opacity: 255
  Duration: 30
  Opacity Easing: Ease Out
  Wait For Opacity?: false
```

### Transparência Parcial
```
# Fazer battler semi-transparente
MOVE: Opacity
  Targets: User
  Desired Opacity: 128
  Duration: 20
  Wait For Opacity?: false
```

## Notas
- Opacity 255 = totalmente visível (padrão)
- Opacity 0 = completamente invisível
- Valores intermediários criam efeito de transparência
- Útil para habilidades de evasão, fantasma, etc.
- Combine com outros efeitos visuais para maior impacto
- Use Wait para sincronizar com outros comandos
- Easing cria transições suaves
- Opacity pode ser usada em conjunto com outros comandos de Movement

## Veja Também
- `movement.md` - Documentação completa de comandos de movimento
- `visible.md` - Comandos relacionados a visibilidade

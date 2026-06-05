# Portraits - Action Sequence

## Visão Geral
Action Sequences para controlar retratos de batalha de atores.

**Nota:** Os comandos de retrato estão integrados na seção Animations do Battle Core.

## Comandos Disponíveis

### ANIM: Change Battle Portrait
Altera o retrato de batalha do ator.
Pode ser usado fora de batalha/action sequences.

**Parâmetros:**
- **Targets**: Unidade(s) para alterar retrato (apenas atores válidos)
- **Filename**: Arquivo para alterar o retrato do ator

**Exemplo:**
```
ANIM: Change Battle Portrait
  Targets: Actor 1
  Filename: Actor1_Angry
```

### ANIM: Change Battle Portrait (JS)
Altera o retrato de batalha através de JavaScript.
Pode ser usado fora de batalha/action sequences.

**Parâmetros:**
- **JS: Actor ID**: Código JavaScript para determinar qual ator afetar
- **JS: Filename**: Código JavaScript para determinar nome do arquivo

**Exemplo:**
```
ANIM: Change Battle Portrait (JS)
  JS: Actor ID: user.actorId()
  JS: Filename: user._name + '_Battle'
```

## Casos de Uso

### Mudar Expressão During Battle
```
# Mudar para retrato de raiva
ANIM: Change Battle Portrait
  Targets: User
  Filename: Actor1_Rage

# Executar ataque
MECH: Action Effect
  Targets: Target

# Voltar ao normal
ANIM: Change Battle Portrait
  Targets: User
  Filename: Actor1_Normal
```

### Retratos Condicional por JavaScript
```
ANIM: Change Battle Portrait (JS)
  JS: Actor ID: user.actorId()
  JS: Filename: user.hp < user.mhp / 2 ? 'Actor1_Wounded' : 'Actor1_Normal'
```

## Notas
- Apenas atores podem ter retratos alterados
- Retratos devem estar na pasta correta do projeto
- Útil para mostrar emoções durante batalha
- Pode ser usado em eventos comuns também
- JavaScript permite determinação dinâmica do retrato
- Retratos são salvos por ator, não por battler

## Veja Também
- `animacoes.md` - Outros comandos de animação
- `cutins.md` - Visual Cutin Effects para retratos dramáticos
- `mechanics.md` - Comandos de mecânica de batalha

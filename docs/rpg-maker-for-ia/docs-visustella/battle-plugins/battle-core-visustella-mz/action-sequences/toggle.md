# Toggle - Action Sequence

## Visão Geral
Action Sequences para alternar estados e configurações durante batalha.

**Nota:** O documento Battle Core não possui uma seção específica "Action Sequences - Toggle". Alternância de estados é geralmente feita através de comandos em outras seções.

## Comandos Relacionados

### MECH: Immortal
Alterna flag imortal das unidades.
Se flag imortal é removida e unidade morrer, colapso a unidade.

**Parâmetros:**
- **Targets**: Unidade(s) para alterar flag imortal
- **Immortal**: Ativar ou desativar imortalidade?

**Exemplo - Ativar Imortalidade:**
```
MECH: Immortal
  Targets: User
  Immortal: true
```

**Exemplo - Desativar Imortalidade:**
```
MECH: Immortal
  Targets: User
  Immortal: false
```

### MECH: Active Chain Input Disable
Desabilita input para Active Chain Skills neste momento.
**Requer VisuMZ_3_ActiveChainSkills!**

```
MECH: Active Chain Input Disable
```

### BTLOG: UI Show/Hide
Mostra ou oculta a Battle UI (incluindo Battle Log).

**Parâmetros:**
- **Show/Hide?**: Mostrar ou ocultar UI de batalha

**Exemplo:**
```
BTLOG: UI Show/Hide
  Show/Hide?: Hide

# Executar cena sem UI...

BTLOG: UI Show/Hide
  Show/Hide?: Show
```

### INJECT: Animation Pause/Resume
Pausa/resume animações injetadas.
**Requer VisuMZ_3_ActSeqImpact!**

**Parâmetros:**
- **Targets**: Unidade(s) para pausar/resumir
- **Pause?**: Pausar a animação?

**Exemplo - Pausar:**
```
INJECT: Animation Pause/Resume
  Targets: User
  Pause?: true
```

**Exemplo - Resumir:**
```
INJECT: Animation Pause/Resume
  Targets: User
  Pause?: false
```

## Casos de Uso

### Toggle Imortalidade Durante Ultimate
```
# Ativar imortalidade
MECH: Immortal
  Targets: User
  Immortal: true

# Preparar ultimate
ANIM: Cast Animation
  Targets: User
  Wait For Animation?: true

# Executar ultimate
MECH: Action Effect
  Targets: All Enemies

# Remover imortalidade
MECH: Immortal
  Targets: User
  Immortal: false
```

### Toggle UI Para Cutscene
```
# Esconder UI
BTLOG: UI Show/Hide
  Show/Hide?: Hide

# Cena dramática
MOVE: Move To Target(s)
  Targets: User
  Targets (Destination): Target
  Duration: 60

ANIM: Show Animation
  Targets: Target
  Animation ID: 100
  Wait For Animation?: true

# Restaurar UI
BTLOG: UI Show/Hide
  Show/Hide?: Show
```

### Pause/Resume Animation Injetada
```
# Injetar animação
INJECT: Animation Begin
  Targets: User
  Filename: Special_Attack
  Horizontal Cells: 4
  Vertical Cells: 4
  Frame Delay: 5

# Pausar em momento específico
WAIT: 30

INJECT: Animation Pause/Resume
  Targets: User
  Pause?: true

# Efeito dramático enquanto pausado...
IMPACT: Shockwave from Target(s) Center
  Targets: User
  Amplitude: 20
  Duration: 30

# Resumir animação
INJECT: Animation Pause/Resume
  Targets: User
  Pause?: false
```

## Estados Toggleáveis

| Estado | Como Alternar | Descrição |
|--------|--------------|-----------|
| Imortal | MECH: Immortal | Unidade não pode morrer |
| Battle UI | BTLOG: UI Show/Hide | Mostra/oculta interface |
| Injected Animation | INJECT: Pause/Resume | Pausa/resume animação |
| Active Chain Input | MECH: Active Chain Input Disable | Desabilita input |

## Notas
- Toggle permite alternar entre dois estados
- Útil para criar mecânicas temporárias
- Sempre lembre de restaurar estado original
- Immortal é importante para evitar morte durante animações longas
- UI Toggle cria cenários cinematográficos
- Pause/Resume permite timing preciso

## Veja Também
- `mechanics.md` - Comandos de mecânica (inclui Immortal)
- `battle-log.md` - Comandos de Battle Log (inclui UI Toggle)
- `inject.md` - Comandos de injeção de animação
- `time.md` - Controle de tempo e sincronização

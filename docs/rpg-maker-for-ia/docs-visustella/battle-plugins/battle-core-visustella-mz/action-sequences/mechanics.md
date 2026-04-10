# Mechanics - Action Sequence

## Visão Geral
Action Sequences relacionadas a várias mecânicas do sistema de batalha.

## Comandos Principais

### MECH: Action Effect
Causa dano/cura da ação e aplica mudanças como buffs e states.

**Parâmetros:**
- **Targets**: Unidade(s) para receber efeitos da ação

**Exemplo:**
```
MECH: Action Effect
  Targets: Target
```

### MECH: Add Buff/Debuff
Adiciona buff(s)/debuff(s) às unidades.

**Parâmetros:**
- **Targets**: Unidade(s) para receber buffs/debuffs
- **Buff Parameters**: Parâmetros para buff (inserir múltiplos para stacks)
- **Debuff Parameters**: Parâmetros para debuff (inserir múltiplos para stacks)
- **Turns**: Número de turnos (pode usar JavaScript)

### MECH: Add State
Adiciona state(s) às unidades.

**Parâmetros:**
- **Targets**: Unidade(s) para receber states
- **States**: ID(s) dos states para adicionar

### MECH: Remove State
Remove state(s) das unidades.

**Parâmetros:**
- **Targets**: Unidade(s) para remover states
- **States**: ID(s) dos states para remover

### MECH: HP, MP, TP
Altera valores de HP, MP e TP das unidades.
Valores positivos = cura, negativos = dano.

**Parâmetros:**
- **Targets**: Unidade(s) para alterar
- **HP Rate/Flat**: Taxa/valor plano de HP
- **MP Rate/Flat**: Taxa/valor plano de MP
- **TP Rate/Flat**: Taxa/valor plano de TP
- **Damage Popup?**: Mostrar popup de dano?

### MECH: Damage Popup
Exibe popup de dano/cura recebido.

**Parâmetros:**
- **Targets**: Unidade(s) para mostrar popup

### MECH: Collapse
Causa unidades mortas performarem animação de colapso.

**Parâmetros:**
- **Targets**: Unidade(s) para processar morte
- **Force Death**: Forçar morte mesmo se HP > 0?
- **Wait For Effect?**: Aguardar conclusão?

### MECH: Immortal
Altera flag imortal das unidades.

**Parâmetros:**
- **Targets**: Unidade(s) para alterar flag
- **Immortal**: Ativar imortalidade?

### MECH: Multipliers
Altera multiplicadores da ação atual.

**Parâmetros:**
- **Critical Hit% Rate/Flat**: Chance de crítico
- **Critical Damage Rate/Flat**: Dano crítico
- **Damage/Healing Rate/Flat**: Multiplicador de dano/cura
- **Hit Rate Rate/Flat**: Chance de acerto

### MECH: Custom Damage Formula
Altera fórmula de dano para customizada.

**Parâmetros:**
- **Formula**: Nova fórmula (use 'default' para reverter)

## Controle de Turno (Battle Systems)

### MECH: ATB Gauge
Altera medidores ATB/TPB.
**Requer VisuMZ_2_BattleSystemATB!**

**Parâmetros:**
- **Targets**: Unidade(s) para alterar
- **Charge Rate**: Mudanças se carregando
- **Cast Rate**: Mudanças se conjurando
- **Interrupt?**: Interrromper conjuração?

### MECH: CTB Order
Altera ordem de turno CTB.
**Requer VisuMZ_2_BattleSystemCTB!**

**Parâmetros:**
- **Targets**: Unidade(s) para alterar
- **Change Order By**: Mudança na ordem (positivo=aumenta espera)

### MECH: CTB Speed
Altera velocidade CTB.
**Requer VisuMZ_2_BattleSystemCTB!**

**Parâmetros:**
- **Targets**: Unidade(s) para alterar
- **Charge Rate**: Mudanças se carregando
- **Cast Rate**: Mudanças se conjurando

## Emulação de Ações

### MECH: Emulate Attack Effect
Emula "Action Effect" usando skill de ataque do usuário.

**Parâmetros:**
- **User(s)**: Unidade(s) para executar efeito
- **Targets**: Unidade(s) para receber efeitos

### MECH: Emulate Guard Effect
Emula "Action Effect" usando skill de guarda do usuário.

**Parâmetros:**
- **User(s)**: Unidade(s) para executar efeito
- **Targets**: Unidade(s) para receber efeitos

### MECH: Emulate Skill Effect
Emula "Action Effect" usando skill específica.

**Parâmetros:**
- **Skill ID**: ID da skill para emular
- **User(s)**: Unidade(s) para executar efeito
- **Targets**: Unidade(s) para receber efeitos

### MECH: Emulate Item Effect
Emula "Action Effect" usando item específico.

**Parâmetros:**
- **Item ID**: ID do item para emular
- **User(s)**: Unidade(s) para executar efeito
- **Targets**: Unidade(s) para receber efeitos

### MECH: Emulate Skill Cost
Faz alvo pagar custo de skill específica.

**Parâmetros:**
- **Skill ID**: ID da skill (0 = ação atual)
- **User(s)**: Unidade(s) para pagar custo

## Popups e Visual

### MECH: Text Popup
Exibe popup de texto nas unidades.

**Parâmetros:**
- **Targets**: Unidade(s) para mostrar popup
- **Text**: Texto a exibir
- **Text Color**: Cor do texto (#rrggbb ou número)
- **Flash Color**: Cor do flash [R, G, B, A]
- **Flash Duration**: Duração do flash

### MECH: Variable Popup
Exibe popup com dados de variável.

**Parâmetros:**
- **Targets**: Unidade(s) para mostrar popup
- **Variable**: Variável para usar dados
- **Digit Grouping**: Usar agrupamento de dígitos?
- **Text Color**: Cor do texto
- **Flash Color**: Cor do flash
- **Flash Duration**: Duração do flash

## Outros Comandos

### MECH: Remove Buff/Debuff
Remove buff(s)/debuff(s) das unidades.

**Parâmetros:**
- **Targets**: Unidade(s) para remover
- **Buff Parameters**: Buffs para remover
- **Debuff Parameters**: Debuffs para remover

### MECH: State Turns Change By
Altera turnos de state por quantidade.
**Requer VisuMZ_1_SkillsStatesCore!**

**Parâmetros:**
- **Targets**: Unidade(s) para alterar
- **State ID**: ID do state
- **Change Turns By**: Quantidade de turnos (JS)
- **Auto-Add State?**: Adicionar state automaticamente?

### MECH: State Turns Change To
Altera turnos de state para valor específico.
**Requer VisuMZ_1_SkillsStatesCore!**

**Parâmetros:**
- **Targets**: Unidade(s) para alterar
- **State ID**: ID do state
- **Change Turns To**: Valor de turnos (JS)
- **Auto-Add State?**: Adicionar state automaticamente?

### MECH: Enemy Escape
Causa inimigos fugirem.

**Parâmetros:**
- **Targets**: Unidade(s) para escapar

### MECH: Dead Label Jump
Pula para label se battler ativo estiver morto.

**Parâmetros:**
- **Jump To Label**: Label para pular

### MECH: Wait For Effect
Aguarda efeitos completarem.

## Notas
- Mechanics controla a lógica core do combate
- Action Effect aplica resultados da skill
- Buffs/Debuffs modificam parâmetros temporariamente
- States aplicam condições e efeitos
- Emulate permite usar efeitos sem pagar custos
- Popups fornecem feedback visual

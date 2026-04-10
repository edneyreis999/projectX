# State - Action Sequence

## Visão Geral
Action Sequences para controlar estados (conditions) de battlers.
Estes comandos estão integrados na seção Mechanics do Battle Core.

## Comandos Disponíveis

### MECH: Add State
Adiciona state(s) às unidades.

**Parâmetros:**
- **Targets**: Unidade(s) para receber states
- **States**: ID(s) dos states para adicionar (múltiplos permitidos)

**Exemplo:**
```
MECH: Add State
  Targets: Target
  States: 1, 2, 3
```

### MECH: Remove State
Remove state(s) das unidades.

**Parâmetros:**
- **Targets**: Unidade(s) para remover states
- **States**: ID(s) dos states para remover (múltiplos permitidos)

**Exemplo:**
```
MECH: Remove State
  Targets: User
  States: 4, 5
```

### MECH: State Turns Change By
Altera turnos de state por uma quantidade específica.
**Requer VisuMZ_1_SkillsStatesCore!**

**Parâmetros:**
- **Targets**: Unidade(s) para alterar turnos de state
- **State ID**: ID do state para alterar turnos
  - Apenas funciona com states que podem ter turnos
- **Change Turns By**: Quantidade de turnos para alterar (pode usar JS)
  - Valores positivos adicionam turnos
  - Valores negativos removem turnos
- **Auto-Add State?**: Adiciona state automaticamente se alvo não tiver?

**Exemplo:**
```
MECH: State Turns Change By
  Targets: Target
  State ID: 1
  Change Turns By: 2
  Auto-Add State?: true
```

### MECH: State Turns Change To
Altera turnos de state para um valor específico.
**Requer VisuMZ_1_SkillsStatesCore!**

**Parâmetros:**
- **Targets**: Unidade(s) para alterar turnos de state
- **State ID**: ID do state para alterar turnos
  - Apenas funciona com states que podem ter turnos
- **Change Turns To**: Valor de turnos para definir (pode usar JS)
- **Auto-Add State?**: Adiciona state automaticamente se alvo não tiver?

**Exemplo:**
```
MECH: State Turns Change To
  Targets: Target
  State ID: 1
  Change Turns To: 5
  Auto-Add State?: true
```

## Casos de Uso

### Aplicar Poison
```
MECH: Add State
  Targets: Target
  States: 1 (Poison)
```

### Curar Todos os States Negativos
```
MECH: Remove State
  Targets: User
  States: 1, 2, 3, 4, 5 (todos os states negativos)
```

### Extender Duration de Buff
```
MECH: State Turns Change By
  Targets: Target
  State ID: 10 (Regeneration)
  Change Turns By: 3
  Auto-Add State?: false
```

### Reset State para Duration Fixa
```
MECH: State Turns Change To
  Targets: User
  State ID: 6 (Shield)
  Change Turns To: 3
  Auto-Add State?: true
```

## Estados com e sem Turnos

### Estados COM Turnos
- Poison, Regen, etc. (duração em turnos)
- Podem ter turnos alterados por Action Sequences
- Auto-Add State aplica o state se não estiver ativo

### Estados SEM Turnos
- Death, Stealth, etc. (permanentes ou removidos por condição)
- State Turns Change não funciona nestes
- Use Add/Remove State para controle

## Notas
- States são condições que afetam battlers
- Add State aplica estados (poison, sleep, etc.)
- Remove State cura estados
- State Turns Change controla duração de estados temporários
- Auto-Add State é útil para garantir que o state exista antes de alterar turnos
- Múltiplos states podem ser adicionados/removidos de uma vez
- Use JavaScript para cálculos dinâmicos de turnos

## Veja Também
- `mechanics.md` - Documentação completa de comandos de mecânica
- Database States - Configuração de states no Database do RPG Maker
- VisuMZ_1_SkillsStatesCore - Funcionalidades avançadas de states

# Grid - Action Sequence

## Visão Geral
Action Sequences relacionadas ao Battle Grid System.
**Requer VisuMZ_2_BattleGridSystem!**

## Comandos Disponíveis

### GRID: Action Animation at Node
Reproduz animação da ação no nó alvo.

**Parâmetros:**
- **Action-Selected Node?**: Usar coordenadas do nó selecionado pela ação?
- **Unit**: Unidade cujo nó usar
- **Rank**: Número representando a Rank do nó
- **Flank**: Número representando a Flank do nó
- **Offset X**: Offset horizontal da animação
- **Offset Y**: Offset vertical da animação

### GRID: Add Passive State(s) to Node
Adiciona Passive State(s) no nó alvo.

**Parâmetros:**
- **State ID(s)**: ID(s) do estado para adicionar
- **Action-Selected Node?**: Usar coordenadas do nó selecionado?
- **Unit**: Unidade cujo nó usar
- **Rank**: Rank do nó
- **Flank**: Flank do nó

### GRID: Add Trigger to Node
Adiciona Trigger no nó alvo.
O nó não pode ter battler. Cada nó só pode conter UM trigger.

**Parâmetros:**
- **Skill ID**: ID da skill para adicionar como trigger
- **Action-Selected Node?**: Usar coordenadas do nó selecionado?
- **Unit**: Unidade cujo nó usar
- **Rank**: Rank do nó
- **Flank**: Flank do nó

### GRID: Add Trigger to Node JS
Adiciona Trigger JS no nó alvo.

**Parâmetros:**
- **JS: Skill ID**: Código JavaScript para determinar skill ID
- **Action-Selected Node?**: Usar coordenadas do nó selecionado?
- **Unit**: Unidade cujo nó usar
- **Rank**: Rank do nó
- **Flank**: Flank do nó

### GRID: Animation ID at Node
Reproduz animação específica no nó alvo.

**Parâmetros:**
- **Animation ID**: ID da animação
- **Mirror?**: Espelhar animação?
- **Mute?**: Silenciar animação?
- **Action-Selected Node?**: Usar coordenadas do nó selecionado?
- **Unit**: Unidade cujo nó usar
- **Rank**: Rank do nó
- **Flank**: Flank do nó
- **Offset X**: Offset horizontal
- **Offset Y**: Offset vertical

### GRID: Animation JS at Node
Usa JavaScript para calcular qual animação reproduzir.

**Parâmetros:**
- **JS: Animation ID**: Código JS para determinar animação
- **Mirror?**: Espelhar?
- **Mute?**: Silenciar?
- **Action-Selected Node?**: Usar coordenadas do nó selecionado?
- **Unit/Rank/Flank**: Coordenadas do nó
- **Offset X/Y**: Offsets

### GRID: Animation Type at Node
Reproduz tipo de animação específico no nó.

**Parâmetros:**
- **Type**: Tipo de animação (Attack, Guard, Item, Skill)
- **Slot**: Slot da arma (para Attack)
- **Item ID**: ID do item (para Item)
- **Skill ID**: ID da skill (para Skill)
- **Action-Selected Node?**: Usar coordenadas do nó selecionado?
- **Unit/Rank/Flank**: Coordenadas do nó
- **Offset X/Y**: Offsets

### GRID: Move Target(s) In Direction
Move alvo(s) em direção específica para outros nós.

**Parâmetros:**
- **Targets**: Unidade(s) para mover
- **Movement Type**: Tipo de movimento
- **Direction**: Direção do movimento
- **Distance**: Número de nós para mover
- **Duration**: Frames para movimento
- **Silent Change?**: Mudança silenciosa ou visual

### GRID: Pull To Target Node
Puxa battlers em direção ao nó alvo.

**Parâmetros:**
- **Action-Selected Node?**: Usar coordenadas do nó selecionado?
- **Unit/Rank/Flank**: Coordenadas do nó
- **Strength**: Nível de força do puxão
- **Duration**: Frames para movimento

### GRID: Push From Target Node
Empurra battlers para longe do nó alvo.

**Parâmetros:**
- **Action-Selected Node?**: Usar coordenadas do nó selecionado?
- **Unit/Rank/Flank**: Coordenadas do nó
- **Strength**: Nível de força do empurrão
- **Duration**: Frames para movimento

### GRID: Remove All Passive States from Node
Remove todos os Passive States do nó alvo.

**Parâmetros:**
- **Action-Selected Node?**: Usar coordenadas do nó selecionado?
- **Unit/Rank/Flank**: Coordenadas do nó

### GRID: Remove Passive State(s) from Node
Remove Passive State(s) específico(s) do nó.

**Parâmetros:**
- **State ID(s)**: ID(s) dos estados para remover
- **Action-Selected Node?**: Usar coordenadas do nó selecionado?
- **Unit/Rank/Flank**: Coordenadas do nó

### GRID: Remove Trigger from Node
Remove Trigger do nó alvo.

**Parâmetros:**
- **Action-Selected Node?**: Usar coordenadas do nó selecionado?
- **Unit/Rank/Flank**: Coordenadas do nó

## Notas
- Sistema de Grid permite combate tático posicional
- Coordenadas são expressas como Unit/Rank/Flank
- Triggers são habilidades que ativam quando um battler entra no nó
- Passive States aplicam efeitos a battlers no nó
- Pull/Push permite manipular posicionamento tático

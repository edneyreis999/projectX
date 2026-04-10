# Battle Log - Action Sequence

## Visão Geral
Action Sequences relacionadas ao Battle Log Window (janela de log de batalha no topo da tela).

## Comandos Disponíveis

### BTLOG: Add Text
Adiciona uma nova linha de texto ao Battle Log.

**Parâmetros:**
- **Text**: Texto a adicionar (códigos de texto permitidos)
- **Copy to Combat Log?**: Copiar texto para Combat Log (requer VisuMZ_4_CombatLog)
- **Combat Log Icon**: Ícone para vincular à entrada (requer VisuMZ_4_CombatLog)

**Exemplo:**
```
BTLOG: Add Text
  Text: Ataque crítico!
  Copy to Combat Log?: true
  Combat Log Icon: 1
```

### BTLOG: Clear Battle Log
Limpa todo o texto do Battle Log.

### BTLOG: Display Action
Reproduz a ação atual no Battle Log.

### BTLOG: Pop Base Line
Remove a última linha base adicionada ao Battle Log e todo o texto até sua localização anterior.

### BTLOG: Push Base Line
Adiciona uma nova linha base onde o Battle Log está atualmente.

### BTLOG: Refresh Battle Log
Atualiza o Battle Log.

### BTLOG: UI Show/Hide
Mostra ou oculta a Battle UI (incluindo o Battle Log).

**Parâmetros:**
- **Show/Hide?**: Mostrar ou ocultar a UI de batalha

### BTLOG: Wait For Battle Log
Faz o interpretante aguardar o Battle Log finalizar.

### BTLOG: Wait For New Line
Faz o interpretante aguardar uma nova linha no Battle Log.

## Notas
- Use códigos de texto do RPG Maker para formatação (cores, ícones, etc.)
- Push/Pop Base Line permite organizar seções do log
- Wait For New Line é útil para sincronizar com eventos visuais
- Battle Log é importante para narrativa de combate

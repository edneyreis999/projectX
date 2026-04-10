# User Interface - Action Sequence

## Visão Geral
Action Sequences para controlar a interface de usuário durante batalha.

**Nota:** Os comandos de UI estão integrados principalmente na seção Battle Log do Battle Core.

## Comandos Disponíveis

### BTLOG: UI Show/Hide
Mostra ou oculta a Battle UI (incluindo Battle Log).

**Parâmetros:**
- **Show/Hide?**: Mostrar ou ocultar a interface de batalha
  - Show: Mostra UI
  - Hide: Oculta UI

**Exemplo:**
```
BTLOG: UI Show/Hide
  Show/Hide?: Hide

# Executar cena sem interface...

BTLOG: UI Show/Hide
  Show/Hide?: Show
```

### BTLOG: Clear Battle Log
Limpa todo o texto do Battle Log.

```
BTLOG: Clear Battle Log
```

### BTLOG: Refresh Battle Log
Atualiza o Battle Log.

```
BTLOG: Refresh Battle Log
```

## Componentes da UI de Batalha

### Battle Log Window
- Janela no topo da tela
- Mostra mensagens de combate
- Controlada por comandos BTLOG

### HUD Elements
- Barras de HP/MP/TP
- Informações de battlers
- Geralmente controladas por plugins ou parâmetros

### Menu de Comando
- Janela de comandos do jogador
- Controlada pelo sistema de batalha

## Casos de Uso

### Cena Dramática Sem UI
```
# Esconder UI
BTLOG: UI Show/Hide
  Show/Hide?: Hide

# Cena cinematográfica
MOVE: Move To Target(s)
  Targets: User
  Targets (Destination): Target
  Duration: 60
  Wait For Movement?: true

ANIM: Show Animation
  Targets: Target
  Animation ID: 100
  Wait For Animation?: true

MECH: Action Effect
  Targets: Target

# Restaurar UI
BTLOG: UI Show/Hide
  Show/Hide?: Show
```

### Limpar Log Para Nova Fase
```
# Fase 1 do boss
BTLOG: Add Text
  Text: Fase 1 começa!

# ... combates ...

# Transição para fase 2
BTLOG: Clear Battle Log
BTLOG: Add Text
  Text: Fase 2! O boss enfurece!
```

### Cinematic Control
```
# Preparar cena
BTLOG: UI Show/Hide
  Show/Hide?: Hide

BTLOG: Clear Battle Log

# Executar sequência
ANIM: Show Animation
  Targets: User
  Animation ID: 50

MOVE: Move To Target(s)
  Targets: User
  Targets (Destination): Target
  Duration: 45

ANIM: Show Animation
  Targets: Target
  Animation ID: 100

MECH: Action Effect
  Targets: Target

# Restaurar interface
BTLOG: Refresh Battle Log
BTLOG: UI Show/Hide
  Show/Hide?: Show
```

### Sequential Battle Messages
```
BTLOG: Clear Battle Log

BTLOG: Add Text
  Text: Inimigos aparecem!

BTLOG: Wait For New Line

BTLOG: Add Text
  Text: Preparem-se!
```

## Boas Práticas

### Sempre Restaure UI
```
BTLOG: UI Show/Hide
  Show/Hide?: Hide

# ... código ...

BTLOG: UI Show/Hide
  Show/Hide?: Show  # Sempre restaure!
```

### Clear Log Para Nova Seção
```
BTLOG: Clear Battle Log
BTLOG: Add Text
  Text: === Nova Fase ===
```

### Use Wait Para Sincronizar
```
BTLOG: Add Text
  Text: Ataque crítico!

BTLOG: Wait For New Line

ANIM: Show Animation
  Targets: Target
  Animation ID: 10
```

## Componentes UI Não Cobertos

Estes elementos geralmente requerem plugins adicionais:

### Barras de HP/MP/TP
- Controladas por parâmetros de plugin
- Podem ser ocultadas por plugins específicos

### Janelas de Status
- Geralmente controladas por plugins
- Battle Core foca em Battle Log

### Menus de Comando
- Controlados pelo sistema de batalha
- Não diretamente por Action Sequences

## Notas
- UI Show/Hide afeta principalmente Battle Log
- Outros elementos UI podem precisar de plugins
- Sempre restaure UI após ocultar
- Clear Battle Log é útil para transições de fase
- Wait For New Line sincroniza mensagens
- Use Refresh Battle Log para atualizar display

## Veja Também
- `battle-log.md` - Comandos completos de Battle Log
- `mechanics.md` - Comandos de mecânica de batalha
- `animacoes.md` - Animações que podem ter wait
- Parâmetros do Plugin Battle Core para configuração de UI

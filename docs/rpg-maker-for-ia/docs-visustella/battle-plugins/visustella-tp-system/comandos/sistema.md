# Comandos de Plugin - Sistema - Enhanced TP System

Comando de controle no nível do sistema.

## System: Show/Hide TP Mode

**Função:** Mostra ou esconde a seleção de TP Mode no Scene_Skill.

### Parâmetros

#### Show TP Mode?
- `true` = Mostra seleção de TP Mode
- `false` = Esconde seleção de TP Mode

### Quando Usar

**Progressão de Jogo:**
```
Início do jogo: HIDE
→ Tutorial de TP completo
→ SHOW: Player pode escolher modes
```

**Lock/Unlock Mechanic:**
```
Dungeon especial: HIDE
→ "TP instável aqui!"
→ Fim da dungeon: SHOW
```

**New Game+:**
```
New Game+ desbloqueado: SHOW
→ Escolha de mode desde o início
```

### Exemplos de Uso

**1. Tutorial de TP**
```
→ Switch 0001: TP Tutorial Complete = OFF
→ System: Show/Hide TP Mode (false)

[... Tutorial ...]

→ Switch 0001: TP Tutorial Complete = ON
→ System: Show/Hide TP Mode (true)
```

**2. Evento Especial**
```
→ Magic Field event start
→ System: Show/Hide TP Mode (false)
  Text: "O campo mágico impede mudança de modo!"

[... Dungeon ...]

→ Magic Field event end
→ System: Show/Hide TP Mode (true)
  Text: "Você saiu do campo. Modos disponíveis novamente."
```

---

## Integração com Scene_Skill

Quando `SHOW` é ativado:
- Nova opção aparece no Scene_Skill
- Player pode alternar entre TP Modes disponíveis
- Configuração visual definida em Plugin Parameters

Quando `HIDE` é ativado:
- Opção desaparece do Scene_Skill
- Player mantém TP Mode atual
- Não impede mudanças via Plugin Commands/Notetags

---

## Configuração Visual

A aparência da opção no Scene_Skill é controlada por:

**Plugin Parameters > General Settings > Scene_Skill:**
- `Show TP Mode?` - Default (pode ser sobrescrito por este command)
- `TP Mode Command` - Texto do comando (%1 = TP text)
- `TP Mode Icon` - Ícone do comando
- `Background Type` - Visual da janela

---

## Estado Padrão

**Default:** Definido em Plugin Parameters > General Settings > Scene_Skill > Show TP Mode?

Este Plugin Command **sobrescreve** o default temporariamente.

---

## Documentação Relacionada

- [Comandos de Atores](atores.md) - Actor-level commands
- [Comandos de Inimigos](inimigos.md) - Enemy-level commands
- [Configuração Geral](../parametros/configuracao-geral.md) - Parâmetros visuais

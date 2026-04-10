# Sound - Action Sequence

## Visão Geral
Action Sequences para controlar áudio e sons durante batalha.

**Nota:** O documento Battle Core não possui uma seção específica "Action Sequences - Sound". Áudio é geralmente controlado através de:

1. Animações do Database (que podem ter sons)
2. Plugins de Battle Voices (VisuMZ_3_BattleVoices)
3. Comandos de evento do RPG Maker

## Alternativas para Som

### Animações com Som
As animações do RPG Maker podem incluir SE (Sound Effects). Configure na aba Animations do Database.

```
ANIM: Show Animation
  Targets: Target
  Animation ID: 1
  Wait For Animation?: true
```

### Battle Voices (Plugin Adicional)
**Requer VisuMZ_3_BattleVoices!**

```
VOICE: Common Line
  Speaker Target(s): User
  Voice Line: Attack

VOICE: Play Special Line
  Speaker Target(s): User
  Voice Line Type: Action Name
  Name / Letter: A
```

### Comandos de Evento RPG Maker
Em eventos comuns de batalha, use:
- "Play SE" para efeitos sonoros
- "Play ME" para música de efeito
- "Play BGM" para música de fundo
- "Play BGS" para som de fundo

## Exemplo de Uso

### Skill com Som Personalizado
```
# Usar animação com som
ANIM: Show Animation
  Targets: Target
  Animation ID: 50
  Wait For Animation?: true

# Ou usar evento comum para tocar SE
# (requer plugin/configuração adicional)
```

### Voice Lines During Battle
```
# Antes do ataque
VOICE: Play Special Line
  Speaker Target(s): User
  Voice Line Type: Action Name
  Name / Letter: Attack

# Executar ataque
MECH: Action Effect
  Targets: Target
```

## Notas
- Battle Core foca em mecânicas visuais e de movimento
- Áudio é geralmente configurado no Database ou via plugins
- Animações são o método principal para SE durante batalha
- Battle Voices adicionam narrativa verbal ao combate
- Para controle fino de áudio, considere plugins adicionais

## Veja Também
- `animacoes.md` - Animações (podem incluir SE)
- `mechanics.md` - Comandos de mecânica de batalha
- Plugin VisuMZ_3_BattleVoices para vozes de batalha

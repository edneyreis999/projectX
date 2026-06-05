# Action Sequence Commands - Referencia Completa

> **Fonte**: Extraido diretamente de `VisuMZ_1_BattleCore.js` (linhas 2433-6074)
> **Como usar**: Estes comandos sao **Plugin Commands** usados dentro de **Common Events** no RPG Maker MZ com VisuStella Battle Core.
> **Fluxo obrigatorio**: Skill com `<Custom Action Sequence>` + Common Event com Plugin Commands + Common Event adicionado na lista de Effects/Traits da skill.

---

## 🚀 Quick Start - 5 Minutos

### O que é uma Action Sequence?

Action Sequence é um sistema do VisuStella Battle Core que permite **customizar completamente** como uma skill/item funciona visualmente e mecanicamente no RPG Maker MZ. Em vez de usar a animação padrão de ataque, você pode criar sequências complexas com múltiplos hits, movimentos dramáticos, efeitos visuais e mais.

### Como criar sua primeira Action Sequence em 3 passos

```
PASSO 1: Preparar a Skill
─────────────────────────
1. Abra o Database (F9) > aba Skills
2. Selecione ou crie sua skill
3. Adicione a notetag: <Custom Action Sequence>
   Isso desativa a action sequence automática

PASSO 2: Criar o Common Event
─────────────────────────────
1. Database > aba Common Events
2. Crie um novo Common Event
3. Adicione Plugin Commands do Battle Core:
   • ACSET: Setup Action Set (início)
   • SEUS COMANDOS (movimento, animação, dano)
   • ACSET: Finish Action (fim)

PASSO 3: Linkar Skill e Common Event
───────────────────────────────────
1. Na sua skill, aba Effects
2. Add > Common Event > selecione o CE criado
3. Teste no jogo!
```

### Exemplo Mínimo Funcional

Este é o Common Event mais simples possível para uma skill que causa dano:

```
Common Event: "Meu Ataque Customizado"

1. ACSET: Setup Action Set
   ├─ Display Action: true
   ├─ Immortal: On: true
   └─ Battle Step: true

2. MOVE: Battle Step
   └─ Targets: User
   └─ Wait For Movement?: true

3. ANIM: Action Animation
   ├─ Targets: Target
   └─ Wait For Animation?: true

4. MECH: Action Effect  ← OBRIGATÓRIO! Sem isso não causa dano
   └─ Targets: Target

5. ACSET: Finish Action
   ├─ Home Reset: true
   └─ Immortal: Off: true
```

### O que cada seção faz?

| Seção | Propósito | Obrigatório? |
|-------|-----------|--------------|
| **Setup** | Prepara o cenário (display, immortal) | Recomendado |
| **Movement** | Move o battler (approach, jump, spin) | Opcional |
| **Animation** | Mostra animação no alvo | Recomendado |
| **Action Effect** | **APLICA o dano/cura** | **SIM!** |
| **Finish** | Reseta tudo (home, immortal) | Recomendado |

⚠️ **IMPORTANTE:** Sem `MECH: Action Effect`, sua skill **NÃO causa dano**, mesmo que tenha animação!

### Próximos Passos

- Leia a **Referência Rápida** abaixo para os comandos mais usados
- Consulte o **Índice** para encontrar comandos específicos
- Veja **Guia de Generalização** no final para exemplos completos

---

## 📊 Referência Rápida - Comandos Mais Usados

| Cenário | Comando | Nota |
|---------|---------|------|
| Causar dano | `MECH: Action Effect` | **OBRIGATORIO** sem isso nao causa dano |
| Mostrar animacao da skill | `ANIM: Action Animation` | Usa animacao configurada na skill |
| Mostrar animacao especifica | `ANIM: Show Animation` | Escolhe ID manualmente |
| Mover ate alvo | `MOVE: Move To Target(s)` | Sideview only |
| Voltar para posicao | `MOVE: Home Reset` | Sideview only |
| Esperar animacao | `ANIM: Wait For Animation` | Sincroniza |
| Esperar movimento | `MOVE: Wait For Movement` | Sincroniza |
| Pausa breve | `MOTION: Wait By Motion Frame` | Baseado em motion speed |
| Pausa absoluta | `IMPACT: Time Stop` | Em milissegundos |
| Tocar pose | `MOTION: Motion Type` | Attack, Skill, etc. |
| Adicionar estado | `MECH: Add State` | Diretamente |
| Remover estado | `MECH: Remove State` | Diretamente |
| Alterar HP/MP/TP | `MECH: HP, MP, TP` | Rate e Flat |
| Immortal on/off | `MECH: Immortal` | Previne morte temporaria |
| Rastro de movimento | `IMPACT: Motion Trail Create` | Efeito visual |
| Onda de choque | `IMPACT: Shockwave` | Efeito visual |
| Zoom | `ZOOM: Change Scale` | Dramatico |
| Camera foco | `CAMERA: Focus Target(s)` | Dramatico |
| Target aleatorio | `TARGET: Random Target` | Para multi-hit random |
| Proximo target | `TARGET: Next Target` | Para iterar targets |

---

## Indice

1. [Como Funciona](#como-funciona)
2. [ACSET - Action Sets](#acset---action-sets)
3. [ANGLE - Camera Angle](#angle---camera-angle)
4. [ANIM - Animacoes](#anim---animacoes)
5. [BTLOG - Battle Log](#btlog---battle-log)
6. [CAMERA - Camera](#camera---camera)
7. [CUTIN - Visual Cutin Effects](#cutin---visual-cutin-effects)
8. [DB - Dragonbones](#db---dragonbones)
9. [ELE - Elements](#ele---elements)
10. [GRID - Battle Grid System](#grid---battle-grid-system)
11. [HORROR - Horror Effects](#horror---horror-effects)
12. [IMPACT - Impact Effects](#impact---impact-effects)
13. [INJECT - Injected Animations](#inject---injected-animations)
14. [MECH - Mechanics](#mech---mechanics)
15. [MOTION - Motion/Poses](#motion---motionposes)
16. [MOVE - Movement](#move---movement)
17. [PROJECTILE - Projectiles](#projectile---projectiles)
18. [SKEW - Camera Skew](#skew---camera-skew)
19. [TARGET - Target Selection](#target---target-selection)
20. [VOICE - Battle Voices](#voice---battle-voices)
21. [WEAPON - Weapon Control](#weapon---weapon-control)
22. [ZOOM - Camera Zoom](#zoom---camera-zoom)
23. [JS - JavaScript Hooks](#js---javascript-hooks)

---

## Como Funciona

### Fluxo Basico de uma Action Sequence

```
1. Skill/Item Note Box:
   - Adicionar <Custom Action Sequence>
   - Isso DESABILITA toda a action sequence automatica

2. Common Event (criar no Database > Common Events):
   - Adicionar Plugin Commands (dropdown > Battle Core)
   - Cada Plugin Command = uma acao visual/mecanica

3. Skill/Item Traits:
   - Adicionar o Common Event criado na lista de Effects/Traits
   - (Ultima aba > Common Event > selecionar o evento)
```

### Ordem Tipica de uma Action Sequence

```
ACSET: Setup Action Set      -> Prepara o cenario (display, immortal, step)
ANIM: Action Animation       -> Mostra animacao do golpe
MECH: Action Effect           -> Aplica dano/cura/estados
ACSET: Finish Action          -> Reseta tudo (home reset, limpa log)
```

### Pattern para Multi-Hit (ex: Combo Duplo)

```
ACSET: Setup Action Set
ANIM: Action Animation (Wait: true)   -> Golpe 1 visual
MECH: Action Effect                    -> Dano golpe 1
MOTION: Wait By Motion Frame (10)      -> Pausa breve
ANIM: Action Animation (Wait: true)   -> Golpe 2 visual
MECH: Action Effect                    -> Dano golpe 2
ACSET: Finish Action
```

### Pattern para Multi-Target Random (ex: Danca dos Ventos)

```
ACSET: Setup Action Set
LABEL: LoopStart
TARGET: Random Target (Jump: HitLabel)
LABEL: HitLabel
ANIM: Action Animation (Wait: true)
MECH: Action Effect
MOTION: Wait By Motion Frame (5)
LABEL: LoopCheck
[Conditional Branch: se ainda tem hits restantes -> Jump LoopStart]
ACSET: Finish Action
```

### Visual: Como funciona uma Action Sequence

```
┌─────────────────────────────────────────────────────────────┐
│                    ACTION SEQUENCE FLOW                      │
└─────────────────────────────────────────────────────────────┘

  Skill Notetag: <Custom Action Sequence>
           ↓
    [DISABLE] ação automática do RPG Maker
           ↓
  ┌──────────────────────┐
  │ Common Event Start  │
  └──────────────────────┘
           ↓
  ┌──────────────────────┐
  │   SETUP PHASE        │
  │ • Display Action     │
  │ • Immortal: ON       │  ← Previne morte durante a animação
  │ • Battle Step        │
  └──────────────────────┘
           ↓
  ┌──────────────────────┐
  │   ACTION PHASE       │
  │ (Repete quantas      │
  │  vezes quiser)       │
  │                      │
  │ 1. MOVE/ANIM         │  ← Aproxima, anima
  │ 2. MECH: Action      │  ← APLICA DANO
  │    Effect            │     (OBRIGATÓRIO!)
  │ 3. WAIT (opcional)   │
  └──────────────────────┘
           ↓
  ┌──────────────────────┐
  │   FINISH PHASE       │
  │ • Home Reset         │  ← Volta pra posição
  │ • Immortal: OFF      │  ← Reativa morte
  │ • Clear Log          │
  └──────────────────────┘
           ↓
      [FIM]
```

### Visual: Multi-Hit com Random Target

```
Inimigos na tela:  [A]    [B]    [C]

PASSO 1: TARGET: Random Target
         ↓
         Seleciona INIMIGO B aleatoriamente

         User ────────────────────→ [B]

PASSO 2: ANIM: Action Animation

         User ╳────╳ [B]  (impacto visual)

PASSO 3: MECH: Action Effect

         User → [B] 💥  (dano aplicado)

PASSO 4: Repete para próximo alvo

         User ────────────────────→ [A]

         ... e assim por diante
```

---

## ACSET - Action Sets

> Grupos pre-definidos de comandos para uso eficiente. Agrupam acoes comuns de inicio e fim de skills.

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `ACSET: Setup Action Set` | Inicio generico de acoes | `Display Action` (true/false) - Mostrar nome da acao? |
| | | `Immortal: On` (true/false) - Ativar immortal flag? |
| | | `Battle Step` (true/false) - Step forward? |
| | | `Wait For Movement` (true/false) - Esperar movimento? |
| | | `Cast Animation` (true/false) - Tocar animacao de cast? |
| | | `Wait For Animation` (true/false) - Esperar animacao? |
| `ACSET: All Targets Action Set` | Afeta todos os targets simultaneamente | `Dual/Multi Wield?` (true/false) - Adicionar hits por armas? |
| | | `Perform Action` (true/false) - Executar motion? |
| | | `Wait Count` (Sprite_Battler._motionSpeed) - Frames de espera. JS permitido. |
| | | `Action Animation` (true/false) - Tocar animacao? |
| | | `Wait For Animation` (true/false) - Esperar animacao? |
| | | `Action Effect` (true/false) - Aplicar efeito/dano? |
| | | `Immortal: Off` (true/false) - Desativar immortal? |
| `ACSET: Each Target Action Set` | Percorre cada target um por um | `Dual/Multi Wield?` (true/false) |
| | | `Perform Action` (true/false) |
| | | `Wait Count` - Frames de espera. JS permitido. |
| | | `Action Animation` (true/false) |
| | | `Wait Count` - Frames de espera. JS permitido. |
| | | `Action Effect` (true/false) |
| | | `Immortal: Off` (true/false) |
| `ACSET: Finish Action` | Fim generico de acoes | `Wait For New Line` (true/false) |
| | | `Wait For Effects` (true/false) |
| | | `Clear Battle Log` (true/false) |
| | | `Home Reset` (true/false) - Voltar para posicao original? |
| | | `Wait For Movement` (true/false) |

---

## ANGLE - Camera Angle

> Requer `VisuMZ_3_ActSeqCamera`!

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `ANGLE: Change Angle` | Muda angulo da camera | `Angle` (0) - Graus do angulo |
| | | `Duration` (60) - Frames para mudanca |
| | | `Angle Easing` (InOutSine) - Tipo de easing. Requer CoreEngine. |
| | | `Wait For Angle?` (true/false) |
| `ANGLE: Reset Angle` | Reseta angulo | `Duration` (60) - Frames |
| | | `Angle Easing` (InOutSine) |
| | | `Wait For Angle?` (true/false) |
| `ANGLE: Wait For Angle` | Espera angulo completar | (sem argumentos) |

---

## ANIM - Animacoes

> Controla animacoes do Database (tab Animations).

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `ANIM: Action Animation` | Toca animacao associada a acao atual | `Targets` - Unidade(s) alvo |
| | | `Mirror Animation` (true/false) |
| | | `Wait For Animation?` (true/false) |
| `ANIM: Attack Animation` | Toca animacao da arma do user | `Targets` - Unidade(s) alvo |
| | | `Mirror Animation` (true/false) |
| | | `Wait For Animation?` (true/false) |
| `ANIM: Attack Animation 2+` | Toca animacao de outras armas equipadas | `Targets` - Unidade(s) alvo |
| | | `Slot` - Slot da arma (1 = main-hand) |
| | | `Mirror Animation` (true/false) |
| | | `Wait For Animation?` (true/false) |
| `ANIM: Balloon Animation` | Toca balloon animation nos alvos | `Targets` - Unidade(s) alvo |
| | | `Balloon Type` - Tipo do balloon |
| | | `Wait for Completion` (true/false) |
| `ANIM: Balloon Icon (Single)` | Balloon com icone unico. Requer `VisuMZ_4_IconBalloons` | `Targets` |
| | | `Icon Index` - ID do icone |
| | | `Wait for Completion` (true/false) |
| `ANIM: Balloon Icon (Range)` | Balloon com range de icones. Requer `VisuMZ_4_IconBalloons` | `Targets` |
| | | `Starting Icon Index` |
| | | `Ending Icon Index` |
| | | `Wait for Completion` (true/false) |
| `ANIM: Balloon Icon (Specific)` | Balloon com icones especificos. Requer `VisuMZ_4_IconBalloons` | `Targets` |
| | | `Icons` - Lista de IDs |
| | | `Wait for Completion` (true/false) |
| `ANIM: Cast Animation` | Toca animacao de cast da acao | `Targets` |
| | | `Mirror Animation` (true/false) |
| | | `Wait For Animation?` (true/false) |
| `ANIM: Change Battle Portrait` | Muda retrato de batalha do actor | `Targets` - Apenas actors |
| | | `Filename` - Arquivo do retrato |
| `ANIM: Change Battle Portrait (JS)` | Muda retrato via JavaScript | `JS: Actor ID` - ID do actor (JS) |
| | | `JS: Filename` - Nome do arquivo (JS) |
| `ANIM: Guard Animation` | Toca animacao de guarda | `Targets` |
| | | `Mirror Animation` (true/false) |
| | | `Wait For Animation?` (true/false) |
| `ANIM: Item Animation` | Toca animacao de um item especifico | `Item ID` - ID do item |
| | | `Targets` |
| | | `Mirror Animation` (true/false) |
| | | `Wait For Animation?` (true/false) |
| `ANIM: Play at Coordinate` | Toca animacao em coordenada X,Y. Requer `VisuMZ_0_CoreEngine` | `Animation ID` |
| | | `Coordinates: X` (JS permitido) |
| | | `Coordinates: Y` (JS permitido) |
| | | `Mirror Animation?` (true/false) |
| | | `Mute Animation?` (true/false) |
| | | `Wait for Completion?` (true/false) |
| `ANIM: Show Animation` | Toca animacao especifica nos alvos | `Targets` |
| | | `Animation ID` - ID da animacao |
| | | `Mirror Animation` (true/false) |
| | | `Wait For Animation?` (true/false) |
| `ANIM: Show Animation JS` | Toca animacao via JS | `Targets` |
| | | `JS: Animation ID` - ID via JavaScript |
| | | `Mirror Animation` (true/false) |
| | | `Wait For Animation?` (true/false) |
| `ANIM: Skill Animation` | Toca animacao de uma skill especifica | `Skill ID` - ID da skill |
| | | `Targets` |
| | | `Mirror Animation` (true/false) |
| | | `Wait For Animation?` (true/false) |
| `ANIM: Wait For Animation` | Espera animacoes terminarem | (sem argumentos) |

---

## BTLOG - Battle Log

> Controla a janela de Battle Log no topo da tela.

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `BTLOG: Add Text` | Adiciona texto ao Battle Log | `Text` - Texto a exibir. Text codes permitidos. |
| | | `Copy to Combat Log?` - Requer `VisuMZ_4_CombatLog` |
| | | `Combat Log Icon` - Icone para Combat Log |
| `BTLOG: Clear Battle Log` | Limpa todo o Battle Log | (sem argumentos) |
| `BTLOG: Display Action` | Mostra acao atual no Battle Log | (sem argumentos) |
| `BTLOG: Pop Base Line` | Remove ultima base line e texto acima | (sem argumentos) |
| `BTLOG: Push Base Line` | Adiciona nova base line | (sem argumentos) |
| `BTLOG: Refresh Battle Log` | Atualiza o Battle Log | (sem argumentos) |
| `BTLOG: UI Show/Hide` | Mostra/esconde Battle UI | `Show/Hide?` - true/false |
| `BTLOG: Wait For Battle Log` | Espera Battle Log terminar | (sem argumentos) |
| `BTLOG: Wait For New Line` | Espera nova linha no Battle Log | (sem argumentos) |

---

## CAMERA - Camera

> Requer `VisuMZ_3_ActSeqCamera`!

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `CAMERA: Clamp ON/OFF` | Liga/desliga camera clamping | `Setting` - On/Off |
| `CAMERA: Focus Point` | Foca camera em ponto especifico | `X Coordinate` (JS permitido) |
| | | `Y Coordinate` (JS permitido) |
| | | `Duration` - Frames |
| | | `Camera Easing` - Requer CoreEngine |
| | | `Wait For Camera?` (true/false) |
| `CAMERA: Focus Target(s)` | Foca camera em battler(s) | `Targets` - Unidade(s) |
| | | `Duration` - Frames |
| | | `Camera Easing` |
| | | `Wait For Camera?` (true/false) |
| `CAMERA: Offset` | Offset da camera | `Offset X` - Negativo: esquerda, Positivo: direita |
| | | `Offset Y` - Negativo: cima, Positivo: baixo |
| | | `Duration` - Frames |
| | | `Camera Easing` |
| | | `Wait For Camera?` (true/false) |
| `CAMERA: Reset` | Reseta camera | `Reset Focus?` (true/false) |
| | | `Reset Offset?` (true/false) |
| | | `Duration` - Frames |
| | | `Camera Easing` |
| | | `Wait For Camera?` (true/false) |
| `CAMERA: Wait For Camera` | Espera camera completar | (sem argumentos) |

---

## CUTIN - Visual Cutin Effects

> Requer `VisuMZ_3_VisualCutinEffect`!

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `CUTIN: Add Visual Cutin Effect` | Adiciona efeito cutin | `Cutin Style Type` - Tipo do cutin |
| | | `Portrait Target` - Unidade para retrato |
| | | `Parallax Filename` - Parallax (None = nenhum) |
| | | `Background Color` - #rrggbb ou numero text color |
| | | `Extra Settings` - Configuracoes extras |
| | | `Wait for Entrance` (true/false) |
| `CUTIN: End Visual Cutin Effect (All)` | Termina todos os cutins | `Wait for Exit` (true/false) |
| `CUTIN: End Visual Cutin Effect (Type)` | Termina cutin por tipo | `Cutin Style Type` |
| | | `Wait for Exit` (true/false) |
| `CUTIN: Wait for Cutin Entrance` | Espera entrada de cutin | (sem argumentos) |
| `CUTIN: Wait for Cutin Exit` | Espera saida de cutin | (sem argumentos) |

---

## DB - Dragonbones

> Requer `VisuMZ_2_DragonbonesUnion`!

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `DB: Dragonbones Animation` | Toca animacao Dragonbones | `Targets` |
| | | `Motion Animation` - Nome da animacao |
| `DB: Dragonbones Time Scale` | Muda time scale do Dragonbones | `Targets` |
| | | `Time Scale` - Valor do time scale |

---

## ELE - Elements

> Requer `VisuMZ_1_ElementStatusCore`!

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `ELE: Add Elements` | Adiciona elementos ao calculo de dano | `Elements` - Lista de element IDs |
| `ELE: Clear Element Changes` | Limpa mudancas de elementos | (sem argumentos) |
| `ELE: Force Elements` | Forca elementos especificos | `Elements` - Lista de element IDs |
| `ELE: Null Element` | Forca sem elemento | (sem argumentos) |

---

## GRID - Battle Grid System

> Requer `VisuMZ_2_BattleGridSystem`!

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `GRID: Action Animation at Node` | Animacao no node | `Action-Selected Node?` / `Unit` / `Rank` / `Flank` / `Offset X` / `Offset Y` |
| `GRID: Add Passive State(s) to Node` | Adiciona estados passivos no node | `State ID(s)` / `Action-Selected Node?` / `Unit` / `Rank` / `Flank` |
| `GRID: Add Trigger to Node` | Adiciona trigger no node | `Skill ID` / `Action-Selected Node?` / `Unit` / `Rank` / `Flank` |
| `GRID: Add Trigger to Node JS` | Adiciona trigger via JS | `JS: Skill ID` / `Action-Selected Node?` / `Unit` / `Rank` / `Flank` |
| `GRID: Animation ID at Node` | Animacao por ID no node | `Animation ID` / `Mirror?` / `Mute?` / `Action-Selected Node?` / ... |
| `GRID: Animation JS at Node` | Animacao via JS no node | `JS: Animation ID` / `Mirror?` / `Mute?` / ... |
| `GRID: Animation Type at Node` | Tipo de animacao no node | `Type` (Attack/Guard/Item/Skill) / `Slot` / `Item ID` / `Skill ID` / ... |
| `GRID: Move Target(s) In Direction` | Move alvos em direcao | `Targets` / `Movement Type` / `Direction` / `Distance` (JS) / `Duration` / `Silent Change?` |
| `GRID: Pull To Target Node` | Puxa battlers para node | `Action-Selected Node?` / `Unit` / `Rank` / `Flank` / `Strength` / `Duration` |
| `GRID: Push From Target Node` | Empurra battlers do node | `Action-Selected Node?` / `Unit` / `Rank` / `Flank` / `Strength` / `Duration` |
| `GRID: Remove All Passive States from Node` | Remove todos estados passivos | `Action-Selected Node?` / `Unit` / `Rank` / `Flank` |
| `GRID: Remove Passive State(s) from Node` | Remove estados especificos | `State ID(s)` / `Action-Selected Node?` / `Unit` / `Rank` / `Flank` |
| `GRID: Remove Trigger from Node` | Remove trigger do node | `Action-Selected Node?` / `Unit` / `Rank` / `Flank` |

---

## HORROR - Horror Effects

> Requer `VisuMZ_2_HorrorEffects`!

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `HORROR: Clear All Filters` | Limpa todos filtros horror | `Targets` |
| `HORROR: Glitch Create` | Cria efeito glitch | `Targets` / `Glitch Slices` / `Glitch Offset` / `Glitch Animated?` / `Glitch Frequency` / `Glitch Strength` |
| `HORROR: Glitch Remove` | Remove efeito glitch | `Targets` |
| `HORROR: Noise Create` | Cria efeito noise | `Targets` / `Noise Rate` / `Noise Animated` |
| `HORROR: Noise Remove` | Remove efeito noise | `Targets` |
| `HORROR: TV Create` | Cria efeito TV | `Targets` / `TV Line Thickness` / `TV Corner Size` / `TV Animated` / `TV Speed` |
| `HORROR: TV Remove` | Remove efeito TV | `Targets` |

---

## IMPACT - Impact Effects

> Requer `VisuMZ_3_ActSeqImpact`!

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `IMPACT: Bizarro Inversion` | Inverte cores azul/vermelho | `Bizarro?` (true/false) |
| `IMPACT: Color Break` | Quebra cores na tela | `Intensity` / `Duration` / `Easing Type` |
| `IMPACT: Desaturation` | Dessatura cores | `Desaturate?` (true/false) |
| `IMPACT: Motion Blur Screen` | Motion blur na tela toda | `Angle` / `Intensity Rate` (0-1) / `Duration` / `Easing Type` |
| `IMPACT: Motion Blur Target(s)` | Motion blur nos alvos | `Targets` / `Angle` / `Intensity Rate` (0-1) / `Duration` / `Easing Type` |
| `IMPACT: Motion Trail Create` | Cria rastro de movimento | `Targets` / `Delay` (frames) / `Duration` / `Hue` / `Starting Opacity` / `Tone` [R,G,B,Gray] |
| `IMPACT: Motion Trail Remove` | Remove rastro | `Targets` |
| `IMPACT: Negative Inversion` | Inverte todas as cores | `Negative?` (true/false) |
| `IMPACT: Oversaturation` | Satura cores | `Oversaturate?` (true/false) |
| `IMPACT: Shockwave at Point` | Ondas de choque em coordenada | `Point: X` (JS) / `Point: Y` (JS) / `Amplitude` / `Wavelength` / `Duration` |
| `IMPACT: Shockwave from Each Target(s)` | Shockwave em cada alvo | `Targets` / `Target Location` / `Offset X` / `Offset Y` / `Amplitude` / `Wavelength` / `Duration` |
| `IMPACT: Shockwave from Target(s) Center` | Shockwave do centro dos alvos | `Targets` / `Target Location` / `Offset X` / `Offset Y` / `Amplitude` / `Wavelength` / `Duration` |
| `IMPACT: Time Scale` | Ajusta velocidade do tempo | `Scale` - 1.00 normal, menor = lento, maior = rapido |
| `IMPACT: Time Stop` | Para tempo por X ms | `Milliseconds` - 1000ms = 1 segundo |
| `IMPACT: Zoom Blur at Point` | Zoom blur em coordenada | `Point: X` (JS) / `Point: Y` (JS) / `Zoom Strength` (0-1) / `Visible Radius` / `Duration` / `Easing Type` |
| `IMPACT: Zoom Blur at Target(s) Center` | Zoom blur no centro dos alvos | `Targets` / `Target Location` / `Offset X` / `Offset Y` / `Zoom Strength` / `Visible Radius` / `Duration` / `Easing Type` |

---

## INJECT - Injected Animations

> Requer `VisuMZ_3_ActSeqImpact`!
> Permite injetar spritesheets customizados sobre os battlers.

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `INJECT: Animation Begin` | Injeta e toca spritesheet animation | `Targets` |
| | | `Filename` - Arquivo em `/img/sv_actors/` |
| | | `Horizontal Cells` - Colunas da spritesheet |
| | | `Vertical Cells` - Linhas da spritesheet |
| | | `Frame Delay` - Frames entre celulas |
| | | `Smooth Bitmap?` (true/false) |
| | | `Offset X` / `Offset Y` |
| `INJECT: Animation End` | Para animacao injetada | `Targets` |
| `INJECT: Animation Pause/Resume` | Pausa/resume animacao injetada | `Targets` / `Pause?` (true/false) |
| `INJECT: Wait For Injected Animation` | Espera animacao injetada terminar | (sem argumentos) |

---

## MECH - Mechanics

> Comandos mecanicos - dano, cura, estados, buffs, e manipulacao do sistema de batalha.

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `MECH: Action Effect` | **APLICA dano/cura e estados da acao atual** | `Targets` - Sem isso, a skill NAO causa dano! |
| `MECH: Active Chain Input Disable` | Desabilita input de Active Chain Skills | (sem argumentos). Requer `VisuMZ_3_ActiveChainSkills` |
| `MECH: Add Buff/Debuff` | Adiciona buff/debuff | `Targets` / `Buff Parameters` / `Debuff Parameters` / `Turns` (JS) |
| `MECH: Add State` | Adiciona estado(s) | `Targets` / `States` - IDs dos estados |
| `MECH: Analyze Weakness` | Revela fraquezas elementais | `Targets` / `Reveal` (quantas, JS). Requer `VisuMZ_3_WeaknessDisplay` |
| `MECH: Armor Penetration` | Penetracao/reducao de armadura extra | `Armor/Magic Penetration: Rate` / `Flat` / `Armor/Magic Reduction: Rate` / `Flat`. JS permitido. |
| `MECH: ATB Gauge` | Altera gauge ATB/TPB | `Targets` / `Charge Rate` / `Cast Rate` / `Interrupt?`. Requer `VisuMZ_2_BattleSystemATB` |
| `MECH: Boost Points Change` | Muda Boost Points | `Targets` / `Alter Boost Points By` (+/-). Requer `VisuMZ_3_BoostAction` |
| `MECH: Boost Store Data` | Armazena Boosts em variavel | `Variable ID`. Requer `VisuMZ_3_BoostAction` |
| `MECH: Break Shield Change` | Muda Break Shields | `Targets` / `Alter Break Shields By` (+/-). Requer `VisuMZ_4_BreakShields` |
| `MECH: Break Shield Reset` | Reseta Break Shields | `Targets`. Requer `VisuMZ_4_BreakShields` |
| `MECH: BTB Brave Points` | Altera Brave Points | `Targets` / `Alter Brave Points By` (+/-). Requer `VisuMZ_2_BattleSystemBTB` |
| `MECH: Collapse` | Executa animacao de morte | `Targets` / `Force Death` (true/false) / `Wait For Effect?` (true/false) |
| `MECH: CTB Order` | Altera ordem CTB | `Targets` / `Change Order By` (+/-). Requer `VisuMZ_2_BattleSystemCTB` |
| `MECH: CTB Speed` | Altera velocidade CTB | `Targets` / `Charge Rate` / `Cast Rate`. Requer `VisuMZ_2_BattleSystemCTB` |
| `MECH: Custom Damage Formula` | Muda formula de dano para custom | `Formula` - Use 'default' para reverter |
| `MECH: Damage Popup` | Mostra popup de dano atual | `Targets` |
| `MECH: Dead Label Jump` | Se battler morreu, pula para label | `Jump To Label` - Nome do label no Common Event |
| `MECH: Emulate Attack Effect` | Emula efeito de ataque basico | `User(s)` / `Targets` |
| `MECH: Emulate Guard Effect` | Emula efeito de guarda | `User(s)` / `Targets` |
| `MECH: Emulate Item Effect` | Emula efeito de item | `Item ID` / `User(s)` / `Targets` |
| `MECH: Emulate Skill Cost` | Emula pagamento de custo de skill | `Skill ID` (0 = acao atual) / `User(s)` |
| `MECH: Emulate Skill Effect` | Emula efeito de skill | `Skill ID` / `User(s)` / `Targets` |
| `MECH: Enemy Escape` | Faz inimigo(s) fugirem | `Targets` |
| `MECH: ETB Energy Count` | Altera Energy Count do time | `Energy Count` (+/-). Requer `VisuMZ_2_BattleSystemETB` |
| `MECH: FTB Action Count` | Altera Action Count do time | `Action Count` (+/-). Requer `VisuMZ_2_BattleSystemFTB` |
| `MECH: HP, MP, TP` | Altera HP, MP, TP diretamente | `Targets` / `HP Rate` / `HP Flat` / `MP Rate` / `MP Flat` / `TP Rate` / `TP Flat` / `Damage Popup?` |
| `MECH: Immortal` | Liga/desliga immortal flag | `Targets` / `Immortal` (On/Off) |
| `MECH: Multipliers` | Muda multiplicadores da acao | `Critical Hit%: Rate/Flat` / `Critical Damage: Rate/Flat` / `Damage/Healing: Rate/Flat` / `Hit Rate: Rate/Flat`. JS permitido. |
| `MECH: Once Parallel` | Roda Common Event paralelo uma vez | `Common Event ID` - Nao se repete, nao salva |
| `MECH: OTB Order` | Altera ordem OTB | `Targets` / `Current Turn By` / `Next Turn By` / `Follow Turn By` (+/-). Requer `VisuMZ_2_BattleSystemOTB` |
| `MECH: PTB Alter Cost` | Altera custo da acao PTB | `Override?` / `Alter Changeability` / `Alter Cost Type` / `Alter Cost Value` / `Priority`. Requer `VisuMZ_2_BattleSystemPTB` |
| `MECH: PTB Conversion` | Converte acoes full em half | `Conversion Count`. Requer `VisuMZ_2_BattleSystemPTB` |
| `MECH: PTB Full/Half Action(s)` | Altera Full/Half Actions | `Full Actions` (+/-) / `Half Actions` (+/-). Requer `VisuMZ_2_BattleSystemPTB` |
| `MECH: Remove Buff/Debuff` | Remove buff/debuff | `Targets` / `Buff Parameters` / `Debuff Parameters` |
| `MECH: Remove State` | Remove estado(s) | `Targets` / `States` - IDs dos estados |
| `MECH: State Turns Change By` | Muda turnos de estado por quantidade | `Targets` / `State ID` / `Change Turns By` (JS) / `Auto-Add State?`. Requer `VisuMZ_1_SkillsStatesCore` |
| `MECH: State Turns Change To` | Muda turnos de estado para valor | `Targets` / `State ID` / `Change Turns To` (JS) / `Auto-Add State?`. Requer `VisuMZ_1_SkillsStatesCore` |
| `MECH: STB Exploit Effect` | Mecanica de exploit STB | `Target(s) Exploited?` / `Targets` / `Force Exploitation` / `User Exploiter?` / `Force Exploitation`. Requer `VisuMZ_2_BattleSystemSTB` |
| `MECH: STB Extra Action` | Adiciona acoes extras | `Extra Actions` (JS). Requer `VisuMZ_2_BattleSystemSTB` |
| `MECH: STB Remove Excess Actions` | Remove acoes excessivas | `Remove Actions` (JS). Requer `VisuMZ_2_BattleSystemSTB` |
| `MECH: Swap Weapon` | Troca arma | `Targets` / `Weapon Type ID` (TIPO, nao ID). Requer `VisuMZ_2_WeaponSwapSystem` |
| `MECH: Text Popup` | Mostra popup de texto | `Targets` / `Text` / `Text Color` (#rrggbb ou numero) / `Flash Color` [R,G,B,A] / `Flash Duration` |
| `MECH: Variable Popup` | Mostra popup de variavel | `Targets` / `Variable` / `Digit Grouping` / `Text Color` / `Flash Color` / `Flash Duration` |
| `MECH: Wait For Effect` | Espera efeitos terminarem | (sem argumentos) |

---

## MOTION - Motion/Poses

> Controla poses e animacoes de sprites sideview.

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `MOTION: Clear Freeze Frame` | Limpa freeze frames | `Targets`. So funciona com sprite sheets, NAO Dragonbones. |
| `MOTION: Freeze Motion Frame` | Congela em frame especifico | `Targets` / `Motion Type` / `Frame Index` (comeca em 0) / `Show Weapon?` |
| `MOTION: Motion Type` | Toca uma pose/motion especifica | `Targets` / `Motion Type` (Attack/Thrust/Swing/Missile/Skill/Spell/Item/Defend/Evade/Chant/Damage/Escape/Dying/Dead/Wait/ Walk/...)/ `Show Weapon?` |
| `MOTION: Perform Action` | Toca motion baseado na acao atual | `Targets` |
| `MOTION: Refresh Motion` | Cancela motions e volta ao natural | `Targets` |
| `MOTION: Wait By Motion Frame` | Espera N motion frames | `Motion Frames to Wait?` - Cada frame = Plugin Parameters > Actors > Motion Speed |

### Motion Types Disponiveis

| Motion | Descricao |
|--------|-----------|
| Walk | Andando normal |
| Wait | Espera em batalha |
| Charge | Carregando |
| Attack | Ataque fisico |
| Thrust | Estocada |
| Swing | Swing |
| Missile | Projétil |
| Skill | Usando skill |
| Spell | Lancando magia |
| Item | Usando item |
| Defend | Defendendo |
| Evade | Esquivando |
| Chant | Cantando |
| Damage | Recebendo dano |
| Escape | Fugindo |
| Dying | Morrendo |
| Dead | Morto |
| Abnormal | Status anormal |
| Sleep | Dormindo |
| Victory | Vitoria |

---

## MOVE - Movement

> Controla movimento de sprites em batalha (sideview).

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `MOVE: Battle Step` | Move forward para preparar acao | `Targets` / `Wait For Movement?` (true/false) |
| `MOVE: Change Home By Distance` | Muda posicao home por distancia | `Targets` / `Distance Adjustment` (Normal/Horizontal/Vertical/Both) / `Distance: X` (JS) / `Distance: Y` (JS) / `Duration` / `Face Destination?` / `Movement Easing` / `Movement Motion` / `Wait For Movement?` |
| `MOVE: Change Home To JS Coordinates` | Muda home via JS | `Targets` / `JS: Coordinates` / `Offset X` (JS) / `Offset Y` (JS) / `Duration` / `Face Destination?` / `Movement Easing` / `Movement Motion` / `Wait For Movement?` |
| `MOVE: Change Home To Point` | Muda home para ponto na tela | `Targets` / `Destination Point` (Center / Point X,Y) / `Offset X` / `Offset Y` / `Duration` / `Face Destination?` / `Movement Easing` / `Movement Motion` / `Wait For Movement?` |
| `MOVE: Change Home To Target(s)` | Muda home para posicao de outro battler | `Targets (Moving)` / `Targets (Destination)` / `Target Location` (front/middle/back + head/center/base) / `Melee Distance` / `Offset X` / `Offset Y` / `Duration` / `Face Destination?` / `Movement Easing` / `Movement Motion` / `Wait For Movement?` |
| `MOVE: Face Direction` | Vira para frente/tras | `Targets` / `Direction` (Forward/Backward) |
| `MOVE: Face JS Coordinates` | Vira para coordenada JS | `Targets` / `JS: Coordinates` / `Face Away From?` (true/false) |
| `MOVE: Face Point` | Vira para ponto na tela | `Targets` / `Point` (Home / Center / Point X,Y) / `Face Away From?` (true/false) |
| `MOVE: Face Target(s)` | Vira para outro battler | `Targets (facing)` / `Targets (destination)` / `Face Away From?` (true/false) |
| `MOVE: Float` | Faz unidade flutuar | `Targets` / `Desired Height` (JS) / `Duration` / `Float Easing` / `Wait For Float?` (true/false) |
| `MOVE: Home Reset` | Volta para posicao original | `Targets` / `Wait For Movement?` (true/false) |
| `MOVE: Jump` | Faz unidade pular | `Targets` / `Desired Height` (JS) / `Duration` / `Wait For Jump?` (true/false) |
| `MOVE: Move Distance` | Move por distancia | `Targets` / `Distance Adjustment` / `Distance: X` (JS) / `Distance: Y` (JS) / `Duration` / `Face Destination?` / `Movement Easing` / `Movement Motion` / `Wait For Movement?` |
| `MOVE: Move To JS Coordinates` | Move para coordenada JS | `Targets` / `JS: Coordinates` / `Offset X` / `Offset Y` / `Duration` / `Face Destination?` / `Movement Easing` / `Movement Motion` / `Wait For Movement?` |
| `MOVE: Move To Point` | Move para ponto na tela | `Targets` / `Destination Point` (Home / Center / Point X,Y) / `Offset X` / `Offset Y` / `Duration` / `Face Destination?` / `Movement Easing` / `Movement Motion` / `Wait For Movement?` |
| `MOVE: Move To Target(s)` | Move para outro battler | `Targets (Moving)` / `Targets (Destination)` / `Target Location` / `Melee Distance` / `Offset X` / `Offset Y` / `Duration` / `Face Destination?` / `Movement Easing` / `Movement Motion` / `Wait For Movement?` |
| `MOVE: Opacity` | Muda opacidade | `Targets` / `Desired Opacity` (JS) / `Duration` / `Opacity Easing` / `Wait For Opacity?` (true/false) |
| `MOVE: Scale/Grow/Shrink` | Muda escala | `Targets` / `Scale X` (1.0 = normal) / `Scale Y` / `Duration` / `Scale Easing` / `Wait For Scale?` (true/false) |
| `MOVE: Skew/Distort` | Distorce sprite | `Targets` / `Skew X` / `Skew Y` / `Duration` / `Skew Easing` / `Wait For Skew?` (true/false) |
| `MOVE: Spin/Rotate` | Rotaciona sprite | `Targets` / `Angle` (graus) / `Duration` / `Spin Easing` / `Revert Angle on Finish` (true/false) / `Wait For Spin?` (true/false) |
| `MOVE: Wait For Float` | Espera float completar | (sem argumentos) |
| `MOVE: Wait For Jump` | Espera pulo completar | (sem argumentos) |
| `MOVE: Wait For Movement` | Espera movimento completar | (sem argumentos) |
| `MOVE: Wait For Opacity` | Espera opacidade completar | (sem argumentos) |
| `MOVE: Wait For Scale` | Espera escala completar | (sem argumentos) |
| `MOVE: Wait For Skew` | Espera skew completar | (sem argumentos) |
| `MOVE: Wait For Spin` | Espera rotacao completar | (sem argumentos) |

### Target Locations (para Move To Target)

| Localizacao | Descricao |
|------------|-----------|
| front head | Cabeca frontal |
| front center | Centro frontal |
| front base | Base frontal |
| middle head | Cabeca medio |
| middle center | Centro medio |
| middle base | Base medio |
| back head | Cabeca tras |
| back center | Centro tras |
| back base | Base tras |

### Distance Adjustment Options

| Opcao | Comportamento |
|-------|--------------|
| Normal | Sem ajuste |
| Horizontal | Actors: esquerda, Enemies: direita |
| Vertical | Actors: cima, Enemies: baixo |
| Both | Ambos |

---

## PROJECTILE - Projectiles

> Requer `VisuMZ_3_ActSeqProjectiles`!
> Cria projeteis na tela e dispara contra alvos.

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `PROJECTILE: Animation` | Projetil com animacao | `Start Location` (Target/Point + Target(s)/Point X,Y + Centralize/Target Location + Offset) / `Goal Location` (mesmo formato) / `Animation ID` / `Duration` / `Wait For Projectile?` / `Wait For Animation?` / `Extra Settings` (Auto Angle/Angle Offset/Arc Peak/Easing/Spin Speed) / `Effect Emulation` (Action Effect/Item Effect ID/Skill Effect ID/Common Event ID) |
| `PROJECTILE: Icon` | Projetil com icone | Mesma estrutura de coordenadas / `Icon` (JS) / `Duration` / `Wait For Projectile?` / `Extra Settings` (Auto Angle/Angle Offset/Arc Peak/Blend Mode/Easing/Hue/Scale/Spin Speed) / `Effect Emulation` |
| `PROJECTILE: Picture` | Projetil com imagem | Mesma estrutura de coordenadas / `Picture Filename` / `Duration` / `Wait For Projectile?` / `Extra Settings` (Auto Angle/Angle Offset/Arc Peak/Blend Mode/Easing/Hue/Scale/Spin Speed) / `Effect Emulation` |

### Effect Emulation (disponivel em todos projeteis)

| Parametro | Descricao |
|-----------|-----------|
| Action Effect? | Emula Action Effect ao atingir (requer start/goal targets) |
| Item Effect ID? | Emula Item Effect ao atingir (0 = nao usar) |
| Skill Effect ID? | Emula Skill Effect ao atingir (0 = nao usar) |
| Common Event ID | Roda Once Parallel CE ao atingir (0 = nao usar) |

---

## SKEW - Camera Skew

> Requer `VisuMZ_3_ActSeqCamera`!

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `SKEW: Change Skew` | Muda skew da camera | `Skew X` / `Skew Y` / `Duration` / `Skew Easing` / `Wait For Skew?` (true/false) |
| `SKEW: Reset Skew` | Reseta skew | `Duration` / `Skew Easing` / `Wait For Skew?` (true/false) |
| `SKEW: Wait For Skew` | Espera skew completar | (sem argumentos) |

---

## TARGET - Target Selection

> Usado para controle manual target-a-target em Action Sequences.

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `TARGET: Current Index` | Seta index para valor | `Set Index To` - 0 = inicio do grupo / `Jump To Label` - Pula para label se target encontrado |
| `TARGET: Next Target` | Avanca index em 1 | `Jump To Label` - Pula para label se target encontrado |
| `TARGET: Previous Target` | Volta index em 1 | `Jump To Label` - Pula para label se target encontrado |
| `TARGET: Random Target` | Seleciona target aleatorio | `Force Random?` - Nao pode repetir index anterior / `Jump To Label` - Pula para label se target encontrado |

---

## VOICE - Battle Voices

> Requer `VisuMZ_3_BattleVoices`!

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `VOICE: Common Line` | Toca voice line comum | `Speaker Target(s)` / `Voice Line` |
| `VOICE: Play Special Line` | Toca voice line especial | `Speaker Target(s)` / `Voice Line Type` (Action Name/Chant Line/Item Name/Skill Name/Spell Name/Unique Lines) / `Name / Letter` |

---

## WEAPON - Weapon Control

> Apenas para Actors. Controle fino de Dual/Multi Wielding.

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `WEAPON: Clear Weapon Slot` | Limpa slot ativo (normaliza) | `Targets` |
| `WEAPON: Next Weapon Slot` | Vai para proximo slot | `Targets` |
| `WEAPON: Set Weapon Slot` | Seta slot ativo | `Targets` / `Weapon Slot ID` (0 = limpar/normalizar, JS permitido) |

---

## ZOOM - Camera Zoom

> Requer `VisuMZ_3_ActSeqCamera`!

| Comando | Descricao | Argumentos |
|---------|-----------|------------|
| `ZOOM: Change Scale` | Muda zoom | `Scale` / `Duration` / `Zoom Easing` / `Wait For Zoom?` (true/false) |
| `ZOOM: Reset Zoom` | Reseta zoom | `Duration` / `Zoom Easing` / `Wait For Zoom?` (true/false) |
| `ZOOM: Wait For Zoom` | Espera zoom completar | (sem argumentos) |

---

## JS - JavaScript Hooks

> Estes NAO sao Plugin Commands. Sao Plugin Parameters com JavaScript que rodam em momentos especificos do combate.

### JS: Battle-Related

| Hook | Funcao Alvo | Quando Roda |
|------|------------|-------------|
| `JS: Pre-Start Battle` | `BattleManager.startBattle()` | Antes da funcao |
| `JS: Post-Start Battle` | `BattleManager.startBattle()` | Apos a funcao |
| `JS: Battle Victory` | `BattleManager.processVictory()` | Antes da funcao |
| `JS: Escape Success` | `BattleManager.onEscapeSuccess()` | Antes da funcao |
| `JS: Escape Failure` | `BattleManager.onEscapeFailure()` | Antes da funcao |
| `JS: Battle Defeat` | `BattleManager.processDefeat()` | Antes da funcao |
| `JS: Pre-End Battle` | `BattleManager.endBattle()` | Antes da funcao |
| `JS: Post-End Battle` | `BattleManager.endBattle()` | Apos a funcao |

### JS: Turn-Related

| Hook | Funcao Alvo | Quando Roda |
|------|------------|-------------|
| `JS: Pre-Start Turn` | `BattleManager.startTurn()` | Antes |
| `JS: Post-Start Turn` | `BattleManager.startTurn()` | Apos |
| `JS: Pre-End Turn` | `Game_Battler.onTurnEnd()` | Antes |
| `JS: Post-End Turn` | `Game_Battler.onTurnEnd()` | Apos |
| `JS: Pre-Regenerate` | `Game_Battler.regenerateAll()` | Antes |
| `JS: Post-Regenerate` | `Game_Battler.regenerateAll()` | Apos |

### JS: Action-Related

| Hook | Funcao Alvo | Quando Roda |
|------|------------|-------------|
| `JS: Pre-Start Action` | `BattleManager.startAction()` | Antes |
| `JS: Post-Start Action` | `BattleManager.startAction()` | Apos |
| `JS: Pre-Apply` | `Game_Action.apply()` | Antes |
| `JS: Pre-Damage` | `Game_Action.executeDamage()` | Antes |
| `JS: Post-Damage` | `Game_Action.executeDamage()` | Apos |
| `JS: Post-Apply` | `Game_Action.apply()` | Apos |
| `JS: Pre-End Action` | `BattleManager.endAction()` | Antes |
| `JS: Post-End Action` | `BattleManager.endAction()` | Apos |

---

## Guia de Generalizacao - Como Criar Novas Action Sequences

### Regra Base

Toda Action Sequence segue o padrao:

```
1. SETUP (prepara)   -> ACSET: Setup Action Set
2. ACAO (executa)    -> ANIM + MECH + MOVE + MOTION (repete quantas vezes quiser)
3. FINISH (reseta)   -> ACSET: Finish Action
```

### Template: Multi-Hit no Mesmo Alvo

```
Common Event: "[Nome da Skill]"

ACSET: Setup Action Set
  Display Action: true
  Immortal: On: true
  Battle Step: true
  Wait For Movement: true
  Cast Animation: false
  Wait For Animation: false

[Para cada hit:]
ANIM: Action Animation
  Targets: Target
  Mirror Animation: false
  Wait For Animation?: true

MECH: Action Effect
  Targets: Target

[Opcional: pausa entre hits]
MOTION: Wait By Motion Frame
  Motion Frames to Wait?: 10

[Repetir bloco ANIM+MECH para cada hit adicional]

ACSET: Finish Action
  Wait For New Line: true
  Wait For Effects: true
  Clear Battle Log: true
  Home Reset: true
  Wait For Movement: true
```

### Template: Multi-Target Aleatorio

```
Common Event: "[Nome da Skill]"

ACSET: Setup Action Set
  Cast Animation: false

[Label para o loop]
LABEL: LoopStart

TARGET: Random Target
  Force Random?: true
  Jump To Label: HitTarget

LABEL: HitTarget

ANIM: Action Animation
  Targets: Target
  Wait For Animation?: true

MECH: Action Effect
  Targets: Target

MOTION: Wait By Motion Frame
  Motion Frames to Wait?: 5

[Conditional Branch: se ainda tem hits, pular para LoopStart]
[Usar variavel para contar]

ACSET: Finish Action
```

### Template: Skill com Movimento Dramatico

```
Common Event: "[Nome da Skill]"

ACSET: Setup Action Set
  Cast Animation: false

MOVE: Move To Target(s)
  Targets (Moving): User
  Targets (Destination): Target
  Target Location: front center
  Melee Distance: 0
  Duration: 20
  Wait For Movement?: true

ANIM: Action Animation
  Targets: Target
  Wait For Animation?: true

MECH: Action Effect
  Targets: Target

MOVE: Home Reset
  Targets: User
  Wait For Movement?: true

ACSET: Finish Action
```

### Template: Skill com Efeitos Visuais Impactantes

```
Common Event: "[Nome da Skill]"

ACSET: Setup Action Set
  Cast Animation: false

IMPACT: Motion Trail Create
  Targets: User
  Delay: 3
  Duration: 60
  Hue: 0
  Starting Opacity: 160
  Tone: [0, 0, 0, 0]

MOVE: Move To Target(s)
  Targets (Moving): User
  Targets (Destination): Target
  Duration: 15
  Wait For Movement?: true

IMPACT: Motion Trail Remove
  Targets: User

ANIM: Action Animation
  Targets: Target
  Wait For Animation?: true

MECH: Action Effect
  Targets: Target

IMPACT: Shockwave from Each Target(s)
  Targets: Target
  Amplitude: 10
  Wavelength: 30
  Duration: 20

MOVE: Home Reset
  Targets: User
  Wait For Movement?: true

ACSET: Finish Action
```

---

## Referencia Rapida - Comandos Mais Usados

| Cenario | Comando | Nota |
|---------|---------|------|
| Causar dano | `MECH: Action Effect` | **OBRIGATORIO** sem isso nao causa dano |
| Mostrar animacao da skill | `ANIM: Action Animation` | Usa animacao configurada na skill |
| Mostrar animacao especifica | `ANIM: Show Animation` | Escolhe ID manualmente |
| Mover ate alvo | `MOVE: Move To Target(s)` | Sideview only |
| Voltar para posicao | `MOVE: Home Reset` | Sideview only |
| Esperar animacao | `ANIM: Wait For Animation` | Sincroniza |
| Esperar movimento | `MOVE: Wait For Movement` | Sincroniza |
| Pausa breve | `MOTION: Wait By Motion Frame` | Baseado em motion speed |
| Pausa absoluta | `IMPACT: Time Stop` | Em milissegundos |
| Tocar pose | `MOTION: Motion Type` | Attack, Skill, etc. |
| Adicionar estado | `MECH: Add State` | Diretamente |
| Remover estado | `MECH: Remove State` | Diretamente |
| Alterar HP/MP/TP | `MECH: HP, MP, TP` | Rate e Flat |
| Immortal on/off | `MECH: Immortal` | Previne morte temporaria |
| Rastro de movimento | `IMPACT: Motion Trail Create` | Efeito visual |
| Onda de choque | `IMPACT: Shockwave` | Efeito visual |
| Zoom | `ZOOM: Change Scale` | Dramatico |
| Camera foco | `CAMERA: Focus Target(s)` | Dramatico |
| Target aleatorio | `TARGET: Random Target` | Para multi-hit random |
| Proximo target | `TARGET: Next Target` | Para iterar targets |

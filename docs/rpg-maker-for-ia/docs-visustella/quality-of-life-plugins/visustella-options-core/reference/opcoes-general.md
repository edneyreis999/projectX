# Opcoes - General

Categoria padrao com opcoes de exploracao, batalha, tela e controles.

## Exploration

### Always Dash
- Opcao padrao do RPG Maker MZ
- **OFF** - Anda normalmente. Segurar Dash faz correr.
- **ON** - Corre normalmente. Segurar Dash faz andar.

### Autosave
- **Requer** VisuMZ_1_SaveCore
- **OFF** - Autosaves desabilitados.
- **ON** - Autosaves habilitados nas condicoes configuradas.

### Show Date & Time
- **Requer** VisuMZ_2_DateTimeSystem
- **OFF** - HUD de data/hora escondido.
- **ON** - HUD de data/hora visivel no canto da tela.

### Show Quest Tracker
- **Requer** VisuMZ_2_QuestSystem
- **OFF** - Quest Tracker Window nao aparece.
- **ON** - Quest Tracker Window visivel no mapa.

### Quest Tracker Position
- **Requer** VisuMZ_2_QuestSystem
- **<-** - Quest Tracker Window aparece na esquerda.
- **->** - Quest Tracker Window aparece na direita.

### Random Encounters
- **None** - Sem encontros aleatorios.
- **Half** - Encontros aleatorios com metade da frequencia.
- **Normal** - Frequencia normal de encontros aleatorios.

### Show Tutorials
- **Requer** VisuMZ_2_TutorialPanelSys
- **OFF** - Tutoriais nao interrompem gameplay, mas podem ser acessados pelo menu.
- **ON** - Tutoriais interrompem gameplay para ensinar mecanicas.

## Battle

### Show Battle Animations
- **OFF** - Todas as animacoes de batalha desligadas.
- **SOME** - Animacoes que nao fazem parte de action sequences nao sao exibidas.
- **ON** - Todas as animacoes visiveis.

### Battle Animation Speed
- **Normal** - Velocidade usual.
- **Fast** - x2 a velocidade usual.
- **Faster** - x3 a velocidade usual.
- **Fastest** - x4 a velocidade usual.

> Velocidade reverte ao normal temporariamente quando e hora de input de acoes.

### Battle Camera
- **Requer** VisuMZ_3_ActSeqCamera
- **OFF** - Camera de batalha estatica, sem movimento/zoom.
- **ON** - Camera de batalha com movimento e zoom completos.

### Command Remember
- Opcao padrao do RPG Maker MZ
- **OFF** - Posicao do cursor reseta a cada ativacao da janela de input.
- **ON** - Cursor lembra a ultima posicao.

### Active Battle Style
- **Requer** VisuMZ_2_BattleSystemATB
- **Wait** - Gauges ATB param de encher quando um ator pode inputar.
- **Active** - Gauges ATB continuam enchendo mesmo com atores prontos para input.

### Active Battle Speed
- **Requer** VisuMZ_2_BattleSystemATB
- Escala de 1 (mais lento) a 5 (mais rapido).
- Controla velocidade de enchimento dos gauges ATB.

### Auto Battle Start
- **Requer** VisuMZ_1_BattleCore
- **OFF** - Batalhas nao comecam com Auto Battle.
- **ON** - Batalhas comecam com Auto Battle ativado.

### Auto Battle Style
- **Requer** VisuMZ_1_BattleCore
- **Attack** - Atores em Auto Battle so atacam.
- **Skills** - Atores em Auto Battle tambem podem usar skills.

## Screen

### Display FPS
- Liga/desliga o contador FPS no canto superior esquerdo.

### Limit FPS
- **ON** - Limite de 60 FPS.
- **OFF** - FPS ilimitado (limite do monitor).

### Full Screen
- Alterna entre modo janela e tela cheia.

### Stretch Screen
- Se o game client e maior que a tela, o canvas do jogo se estica para preencher.

### Special Effects
- **Requer** VisuMZ_2_BrightEffects e/ou VisuMZ_2_HorrorEffects
- Liga/desliga efeitos dos plugins Bright Effects e Horror Effects.

### Dust Clouds
- **Requer** VisuMZ_2_MovementEffects
- Efeitos de nuvens de poeira ao correr.

### Footprint Marks
- **Requer** VisuMZ_2_MovementEffects
- Pegadas no chao ao mover personagens.

### Smooth Scroll
- **Requer** VisuMZ_2_MovementEffects
- Deslocamento gradual da camera para a posicao do jogador.

### Blinking Lights
- **Requer** VisuMZ_2_LightingEffects
- Liga/desliga efeito de piscar das luzes.

### Pulsing Lights
- **Requer** VisuMZ_2_LightingEffects
- Liga/desliga efeito de pulsacao das luzes.

### Weather Density
- **Requer** VisuMZ_2_WeatherEffects
- Controle da densidade de padroes climaticos.

## Controls

### Rebind Keyboard
- **Requer** VisuMZ_0_CoreEngine
- Permite remapear controles do teclado.

### Rebind Gamepad
- **Requer** VisuMZ_0_CoreEngine
- Permite remapear controles do gamepad.
- Gamepad deve estar conectado.

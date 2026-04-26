## [Frontal Flip Bounce]

### Linguagem Natural

- O personagem pula na frente do inimigo girando super rápido no ar como um pião
- Ele dá dano no inimigo e mostra uma animação de ataque
- O personagem quica para trás perto do inimigo
- Ele volta para o lugar de origem pulando e girando de novo

### Linguagem Técnica

    - Setup: Standard attack setup
    - Frontal Flip Bounce: 
    - Action Effect: Damage, (de)buffs and skill animation play on target
    - Bounce to Base: User bounces backwards off of target and lands in front
    - Bounce Home: User bounces to home position
    - Finish: Standard attack finish
    - Credit: KV_Kingdom
    - https://itch.io/profile/kv-kingdom
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Frontal Flip Bounce
    - User moves to middle center of the target
    - User jumps 75 px
    - User spins 1080 degrees
    - Wait 16 frames (Move to target completion)
    - Action Effect
    - Deal damage to target based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on target based on skill's settings
    - Bounce to Base
    - User moves to target's front base, minus 20 px
    - Wait for Bounce to Base to complete, minus 1 frame
    - Bounce Home
    - User moves home
    - User jumps 75 px
    - User spins 1080 degrees
    - Wait for Bounce Home to complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Penalty Kick]

### Linguagem Natural

- O personagem pula em direção ao inimigo como se fosse chutar uma bola
- Ele recua um pouco para preparar o chute
- O personagem avança rápido e chuta o inimigo com força
- O inimigo toma dano e aparece uma animação de impacto
- O inimigo é jogado para trás bem longe pulando no ar

### Linguagem Técnica

    - Setup: Standard attack setup
    - Jump to Target: User jumps to front base of enemy
    - Back Up and Charge: User backs up and charges attack
    - Penalty Kick: User dashes forward
    - Action Effect: Damage, (de)buffs and skill animation play on target
    - Knockback: Target is knocked backwards (far)
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Jump to Target
    - User moves to the front base of the target + 24 px for collision
    - User jumps 100 px
    - Wait until Jump to Target is complete + 6 frames
    - Back Up and Charge
    - User backs up 100 px
    - Wait 6 frames
    - Charging Animation (#51) plays on user + Wait until animation completes
    - Penalty Kick
    - User moves into enemy's center base
    - Wait until Penalty Kick is complete + 1 frame
    - Action Effect
    - Deal damage to target based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on target based on skill's settings
    - Wait 1 frame
    - Knockback
    - Turns off immortal, clears battle log, and moves everyone back to home space
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flip Sneak Attack]

### Linguagem Natural

- O personagem pula para trás girando no ar e fica invisível
- Ele aparece de surpresa na frente do inimigo girando de novo
- O personagem ataca o inimigo que toma dano
- Ele volta para o lugar original pulando e girando super rápido

### Linguagem Técnica

    - Setup: Standard attack setup
    - Jump and Fade: User jumps backwards and fades away
    - Flip Sneak Attack Setup: User moves above and behind target
    - Flip Sneak Attack: User appears falls onto target
    - Action Effect: Damage, (de)buffs and skill animation play on target
    - Bounce: User bounces off of the target to the home position
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Jump and Fade
    - User moves backwards 150 px
    - User floats up 150 px
    - User spins 720 degrees
    - User fades to 0 opacity
    - Wind7 SE plays
    - Wait until Jump and Fade is complete
    - Flip Sneak Attack Setup
    - Move invisible user to target's back base + 150 px and above 200 px
    - Wait until Flip Sneak Attack Setup is complete + 18 frames
    - Flip Sneak Attack
    - User floats back to 0 px 
    - User moves to target's middle center
    - User rotates 720 degrees
    - User fades to 0 opacity
    - Wind7 SE plays
    - Wait until Flip Sneak attack is complete, minus 1 frame
    - Action Effect
    - Deal damage to target based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on target based on skill's settings
    - Bounce
    - User moves to home position
    - User jumps 100 px
    - User spins 1440 degrees
    - User faces forward
    - Wait until Bounce is complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flip Bounce All]

### Linguagem Natural

- O personagem pula em direção a todos os inimigos girando no ar
- Ele ataca todos os inimigos ao mesmo tempo
- O personagem volta para o lugar dele pulando bem alto e girando muitas voltas

### Linguagem Técnica

    - Setup: Standard attack setup
    - Flip to Target: User flips to targets' middle center
    - Action Effect: Damage, (de)buffs and skill animation play on targets'
    - Bounce: User bounces backwards off of target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Flip to Target
    - User moves to the middle center of the all enemies + 24 px for collision
    - User jumps 100 px high
    - User spins 720 degrees
    - Wait until Flip to Target is complete, minus 1 frame
    - Action Effect
    - Deal damage to target based on skill's damage formula and apply any buffs or debuffs
    - based on skill's effects
    - Play animation on target based on skill's settings
    - Bounce
    - User moves home
    - User jumps 200 px
    - User rotates 1440 degrees
    - User faces forward
    - Wait until Bounce is complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Dash Flip]

### Linguagem Natural

- O personagem corre para frente pulando e girando como um pião
- Uma luz brilha na tela e todos os inimigos tomam dano
- O personagem volta para o lugar dele andando devagar

### Linguagem Técnica

    - Setup: Standard Attack Setup
    - Dash Flip Setup: User moves in line with target
    - Dash Flip: User flips forward
    - Action Effect (Flash): Damage, (de)buffs and skill animation play on target
    - Return Home Setup: User returns to position behind home
    - Return Home: User moves forward to home position
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Dash Flip Setup
    - User moves to target's front base, minus 300 px
    - Wait for Dash Flip Setup to complete + 6 frames
    - Dash Flip
    - User moves 700 px forward
    - User jumps 100 px
    - User spins 1080 degress
    - Wind9 SE plays
    - Wait until Dash Flip is half complete
    - Action Effect (Flash)
    - Deal damage to target based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on target based on skill's settings
    - Play Flash2 SE
    - Flash Screen
    - Wait for Dash Flip to complete + 6 frames
    - Return Home Setup
    - Move user to home, minus 250 px (off screen)
    - Target opacity goes to 0
    - Wait until Return Home Setup is complete
    - Return Home
    - User moves forward 250 px
    - User returns to opacity 255
    - Wait for Return Home to complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Dash Flip All]

### Linguagem Natural

- O personagem corre para frente pulando e girando como um pião
- Uma luz brilha na tela e todos os inimigos vivos tomam dano
- O personagem volta para o lugar dele andando devagar

### Linguagem Técnica

    - Setup: Standard Attack Setup
    - Dash Flip: User flips forward
    - Action Effect (FLash): Damage, (de)buffs and skill animation play on targets
    - Return Home Setup: User returns to position behind home
    - Return Home: User moves forward to home position
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Dash Flip
    - User moves 700 px forward
    - User jumps 100 px
    - User spins 1080 degress
    - Wind9 SE plays
    - Wait until Dash Flip is half complete
    - Action Effect (Flash)
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Play Flash2 SE
    - Flash Screen
    - Wait for Dash Flip to complete + 6 frames
    - Return Home Setup
    - Move user to home, minus 250 px (off screen)
    - Target opacity goes to 0
    - Wait until Return Home Setup is complete
    - Return Home
    - User moves forward 250 px
    - User returns to opacity 255
    - Wait for Return Home to complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Float Cast]

### Linguagem Natural

- Uma animação mágica aparece no personagem enquanto ele levita
- O personagem sobe no ar como se estivesse flutuando
- Ele faz um gesto mágico de conjuração
- O personagem lança um feitiço que atinge todos os inimigos
- Ele desce devagar voltando ao chão

### Linguagem Técnica

    - Setup: Standard attack setup
    - Float Animation: Animation plays on user
    - Float: User floats upward
    - Cast: User performs cast motion and freezes
    - Action Effect (Flash): Apply damage, (de)buffs and play skill animation play on target
    - as screen flashes
    - Descend: User returns to ground
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Float Animation
    - Animation plays on user as they float upwards.
    - Wait 5 frames
    - Recommend customizing with a faster, smaller animation
    - (E.g. Heal One 1, 50% size, 200% speed on user's base)
    - Float
    - User floats 100 px
    - User preforms chanting motion
    - Wait Until Float is complete
    - Cast
    - User performs Spell motion
    - Wait 11 frames
    - Spell motion freezes on last frame
    - Action Effect (Flash)
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Play Flash2 SE
    - Flash Screen
    - Wait for Action Effect (Flash) to complete
    - Descend
    - User floats to ground
    - User performs evade motion
    - Wait for Descend to complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Dash Cast]

### Linguagem Natural

- O personagem faz uma animação mágica de preparação
- Ele corre para frente fazendo um gesto de conjuração
- O personagem volta para o lugar dele
- Ele lança o feitiço em todos os inimigos
- Uma luz mágica brilha na tela

### Linguagem Técnica

    - Setup: Standard attack setup
    - Dash Cast Setup: Move in line with target
    - Cast Animation: User performs cast motion and freezes
    - Dash: Dash forward through target and off screen
    - Return Home Setup: Move backwards off screen
    - Return Home: Move forward while performing chant motion
    - Cast: Perform spell motion
    - Action Effect (Flash): Apply damage, (de)buffs and play skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Dash Cast Setup
    - User moves to target's front base minus 200 px
    - Wait until Dash Cast Setup is complete + 6 frames
    - Cast Animation
    - Cast Animation plays on user
    - Wait for animation to complete
    - Dash
    - User moves forward 700 px with chant motion
    - Wind9 SE plays
    - Wait until Dash is complete + 15 frames
    - Return Home Setup
    - Move user to target's front base minus 600 px
    - User opacity changes to 0
    - Wait for Return Home Setup to complete
    - Return Home
    - User moves forward 400 px to home
    - User opacity increases to 255
    - Wait for Return Home to complete
    - Cast
    - User performs spell motion
    - Wait until Cast is complete minus 1 frame
    - Action Effect (Flash)
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Play Flash2 SE
    - Flash Screen
    - Wait for Action Effect (Flash) to complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Dash Cast All]

### Linguagem Natural

- O personagem faz uma animação mágica de preparação
- Ele corre para frente fazendo um gesto de conjuração
- O personagem volta para o lugar dele
- Ele lança o feitiço em todos os inimigos
- Uma luz mágica brilha na tela e todo mundo volta para o lugar original

### Linguagem Técnica

    - Setup: Standard attack setup
    - Cast Animation: User performs cast motion and freezes
    - Dash: Dash forward through target and off screen
    - Return Home Setup: Move backwards off screen
    - Return Home: Move forward while performing chant motion
    - Cast: Perform spell motion
    - Action Effect (Flash): Apply damage, (de)buffs and play skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Cast Animation
    - Cast Animation plays on user
    - Wait for animation to complete
    - Dash
    - User moves forward 700 px with chant motion
    - Wind9 SE plays
    - Wait until Dash is complete + 15 frames
    - Return Home Setup
    - Move user to home minus 300 px
    - User opacity changes to 0
    - Wait for Return Home Setup to complete
    - Return Home
    - User moves forward 400 px to home
    - User opacity increases to 255
    - Wait for Return Home to complete
    - Cast
    - User performs spell motion
    - Wait until Cast is complete minus 1 frame
    - Action Effect (Flash)
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Play Flash2 SE
    - Flash Screen
    - Wait for Action Effect (Flash) to complete
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flip Cast]

### Linguagem Natural

- O personagem pula para trás girando no ar
- Ele faz um gesto mágico de conjuração
- O feitiço atinge todos os inimigos e uma luz brilha
- O personagem desce devagar ainda fazendo o gesto mágico
- Ele volta à posição normal de espera

### Linguagem Técnica

    - Setup: Standard attack setup
    - Flip: User flips up and back
    - Cast: User performs Cast motion
    - Action Effect (Flash): Apply damage, (de)buffs and play skill animation play on target
    - Fall: User falls back to home position
    - Motion Reset: User goes back to idle motion
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Flip
    - User moves backward 35 px and up 100 px
    - User rotates 720 degrees
    - Wait until Flip is complete minus 1 frame
    - Cast
    - User performs Spell motion
    - Wait until motion is complete minus 1 frame
    - User freezes in spell motion
    - Action Effect (Flash)
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Play Flash2 SE
    - Flash Screen
    - Wait for 4 frames
    - Fall
    - User moves backwards 35 px and down 100 px (to home)
    - User freezes in spell motion
    - Motion Reset
    - User shows idle motion (walk)
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flip Shot]

### Linguagem Natural

- O personagem pula para trás girando no ar
- Ele faz o movimento de ataque com a arma
- O inimigo toma dano e aparece uma animação
- O personagem desce devagar voltando ao chão

### Linguagem Técnica

    - For best results, user should have gun, bow, or other ranged weapon equipped
    - Setup: Standard attack setup
    - Flip: User flips up and back
    - Attack: User performs weapon's associated motion
    - Action Effect: Apply damage, (de)buffs and play skill animation play on target
    - Fall: User falls back to home position
    - Motion Reset: User goes back to idle motion
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Flip
    - User moves backward 35 px and up 100 px
    - User rotates 720 degrees
    - Wait until Flip is complete minus 1 frame
    - Motion 
    - Perform attack motion based on equipped weapon
    - Action Effect
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Wait for 6 frames
    - Fall
    - User moves backwards 35 px and down 100 px
    - User freezes in evade motion
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Dive Shot]

### Linguagem Natural

- O personagem mergulha para frente pulando bem alto e girando
- Ele faz o movimento de ataque com a arma
- Todos os inimigos tomam dano e o personagem fica transparente
- O personagem continua mergulhando até sumir da tela

### Linguagem Técnica

    - For best results, user should have gun, bow, or other ranged weapon equipped
    - Setup: Standard attack setup
    - Dive Setup:Move to target's front base minus 300 px
    - Dive: Dive over target
    - Attack Motion: Attack motion based on equipped weapon
    - Action Effect + Opacity: Apply damage, (de)buffs and play skill animation play on target
    - and fade to 0 opacity
    - Finish Setup: Move to target's front base, minus 600 px
    - Finish + Full Reset: Standard attack finish, + reset opacity/angle
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Dive Setup
    - User moves to target's front base, minus 300 px
    - Wait until Dive Setup is complete
    - Dive
    - User moves 700 px forward
    - User jumps 200 px
    - User spins 180 degrees
    - User fades to 0 opacity
    - Wind9 SE plays
    - Wait 5 frames
    - Attack Motion
    - User performs attack motion based on weapon equipped
    - Wait 17 frames
    - Action Effect + Opacity
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - User fades to 0 opacity (InQuart = quick fade at end)
    - Wait for Dive to complete
    - Finish Setup
    - User moves to target's front base, minus 600 px
    - Wait for Finish Setup to complete
    - Finish + Full Reset
    - User opacity increases to 255
    - User angle resets
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Projectile]

### Linguagem Natural

- O personagem faz um gesto mágico como se estivesse lançando um feitiço
- Um projétil sai do personagem e voa até o inimigo
- O inimigo toma dano quando o projétil acerta

### Linguagem Técnica

    - Requires Visustella's Action Sequence Projectiles plugin
    - https://visustellamz.itch.io/action-sequence-projectiles
    - For best results, try other animations:
    - e.g. https://manugamingcreations.itch.io/rpg-maker-mz-fireball-projectile
    - Setup: Standard attack setup
    - Cast: User performs Cast motion
    - Fire Projectile: Animation travels from user to target
    - Action Effect (Flash): Apply damage, (de)buffs and play skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Cast
    - User performs Spell motion
    - Wait until Cast is complete minus 1 frame
    - Fire Projectile
    - Animation 107 travels from user to target
    - Wait 18 frames
    - Action Effect
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flip Projectile]

### Linguagem Natural

- O personagem pula para trás girando no ar
- Ele faz um gesto mágico de lançamento
- Um projétil sai do personagem e voa até o inimigo
- O personagem desce devagar enquanto o projétil viaja
- O inimigo toma dano quando o projétil acerta
- O personagem volta à posição normal

### Linguagem Técnica

    - Requires Visustella's Action Sequence Projectiles plugin
    - https://visustellamz.itch.io/action-sequence-projectiles
    - For best results, try other animations:
    - e.g. https://manugamingcreations.itch.io/rpg-maker-mz-fireball-projectile
    - Setup: Standard attack setup
    - Flip: User flips up and back
    - Cast: User performs Cast motion
    - Fire Projectile: Animation travels from user to target
    - Fall: User falls back to home position
    - Action Effect (Flash): Apply damage, (de)buffs and play skill animation play on target
    - Motion Reset: User goes back to idle motion
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Flip
    - User moves backward 35 px and up 100 px
    - User rotates 720 degrees
    - Wait until Flip is complete minus 1 frame
    - Cast
    - User performs Spell motion
    - Wait until Cast is complete minus 1 frame
    - Fire Projectile
    - User freezes in spell motion
    - Animation 107 travels from user to target
    - Wait 4 frames
    - Fall
    - User moves backwards 35 px and down 100 px (to home)
    - User freezes in spell motion
    - Wait until Fire Projectile is complete, minus 2 frames
    - Action Effect
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Motion Reset
    - User shows idle motion (walk)
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [MGC Flip Projectile]

### Linguagem Natural

- (sem descrição disponível - arquivo vazio)

### Linguagem Técnica

    - Setup before every attack:
    - Displays attack name
    - Makes enemies immortal so they don't die
    -   in the middle of multiple hit attacks
    - No battle step or cast animation
    - In 60 frames:
    - Float a height of 150 px
    - Chanting motion
    - Motion Spell, freezes on last frame
    - Action Animation on Enemy (Based off of animation in 
    - Skill)
    - Flash Screen
    - Flash2 SE
    - Action Animation plays on target
    - Action Effect occurs
    - Actor returns to the ground with evade motion.
    - Reset after all attacks:
    - Turns off immortal
    - Moves user back to home space

---

## [MGC Projectile]

### Linguagem Natural

- O personagem faz um gesto mágico como se estivesse lançando um feitiço
- Um projétil sai do personagem e voa até o inimigo
- O inimigo toma dano quando o projétil acerta

### Linguagem Técnica

    - Requires Visustella's Action Sequence Projectiles plugin
    - https://visustellamz.itch.io/action-sequence-projectiles
    - For best results, try other animations:
    - e.g. https://manugamingcreations.itch.io/rpg-maker-mz-fireball-projectile
    - Setup: Standard attack setup
    - Cast: User performs Cast motion
    - Fire Projectile: Animation travels from user to target
    - Action Effect (Flash): Apply damage, (de)buffs and play skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Cast
    - User performs Spell motion
    - Wait until Cast is complete minus 1 frame
    - Fire Projectile
    - Animation 107 travels from user to target
    - Wait 18 frames
    - Action Effect
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flip Attack Sequential]

### Linguagem Natural

- O personagem pula em direção ao inimigo girando no ar
- Ele ataca o inimigo que toma dano
- O personagem pula para o próximo inimigo e repete o ataque
- Isso continua até acabar todos os inimigos

### Linguagem Técnica

    - Demonstrates use of looping, labels, and "Next Target" mechanic
    - Skill must have a scope of "All" or more than 1 "Random" target.
    - This attack will attack each target within the scope, one at a time.
    - Setup: Standard attack setup
    - Flip Attack Loop: User flips to target and attacks
    - Action Effect: Apply damage, (de)buffs and play skill animation play on target
    - Next Target: Move index to next target and return to Flip Attack Loop
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Flip Attack Loop
    - User moves to the front base of the target, no melee distance, offset by +24 px for
    - collision
    - User jumps 100 px high
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - User spins 360 degrees
    - Wait until Flip Attack Loop is complete
    - Action Effect
    - Deal damage to target based on skill's damage formula and apply any buffs or 
    - debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Wait 12 frames
    - Next Target
    - Move index to next target
    - Return to Flip Attack Loop if there are still targets left
    - Finish
    - Turns off immortal, clears battle log, and moves user back to home space

---

## [Elemental Slash]

### Linguagem Natural

- O jogo mostra três ícones para escolher: fogo, gelo ou trovão
- O personagem pula em direção ao inimigo
- Ele ataca com o elemento que foi escolhido
- O inimigo toma dano do elemento escolhido

### Linguagem Técnica

    - Demonstrates use of choices within an action sequence and declaring and referring to 
    - variables not in engine (var_element).
    - Setup: Standard attack setup
    - Element Choice: User selects an element to attack with
    - Jump Attack: User jumps to target and attacks
    - Conditional Action Effect: Apply damage, (de)buffs and play skill animation play on 
    - target dependent on skill choice
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Element Choice
    - Displays three choices in the form of a fire icon, ice icon, and thunder icon.
    - Jump Attack
    - User moves to the front base of the target, no melee distance, offset by +24 px for 
    - collision
    - User jumps 100 px high
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - Wait until the Jump is complete
    - Conditional Action Effect
    - Add chosen element to the attack
    - Deal damage to target based on skill's damage formula and apply any buffs or 
    - debuffs based on skill's effects
    - Play animation on target based element choice
    - Finish
    - Sets var_element to 0, turns off immortal, clears battle log, and moves everyone back to 
    - home space

---

## [Crisis Attack]

### Linguagem Natural

- O jogo checa se a vida do personagem está na metade ou mais
- Se a vida estiver alta, ele ataca normalmente
- Se a vida estiver baixa, aparece um texto gigante dizendo "ATAQUE DE CRISE"
- O personagem ataca com certeza de dano crítico super forte
- O inimigo toma dano duas vezes

### Linguagem Técnica

    - Shows use of script calls to refer to battler stats.
    - BattleManager._subject.xx refers to a user's stats. Replace the xx with other stats, like
    - hp, mp, tp, mp, atk, mat, def, mdf, level, and more. Use f8 to explore more 
    - possibilities.
    - Setup: Standard attack setup
    - Crisis Check: Checks if user's HP equal to or greater than half max hp
    - Normal Attack: If HP is higher equal to or greater than half, perform normal attack
    - Crisis Attack: Else, perform two critical hits
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Crisis Check
    - Checks to see if user's hp is greater than or equal to half max hp
    - Normal Attack
    - If user's HP is equal to or greater than half max hp:
    - Perform attack motion
    - Wait 12 frames
    - Deal damage to target based on skill's damage formula and apply any buffs or 
    - debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Crisis Attack
    - If user's HP is less than half max hp:
    - Text Popup saying "CRISIS ATTACK"
    - Increase critical rate to 100%
    - Perform attack motion
    - Wait 12 frames
    - Deal damage to target twice based on skill's damage formula and apply any buffs or 
    - debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Random Slash]

### Linguagem Natural

- O jogo escolhe um número aleatório entre 0, 1 ou 2
- Se der 0, aparece um texto "Random 1" e o personagem ataca um inimigo
- Se der 1, aparece um texto "Random 2" e o personagem ataca todos os inimigos
- Se der 2, aparece um texto "Random 3" e o personagem ataca a si mesmo

### Linguagem Técnica

    - Shows use of script calls to generate random numbers, then use them to randomly
    - assign attack effects
    - Setup: Standard attack setup
    - Random Variable: creates a number randomly, 0, 1, or 2 and assigns it to a variable
    - Random Attack 1: If the number is 0, basic attack
    - Random Attack 2: If the number is 1, attack all
    - Random Attack 3: If the number is 2, attack self
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Random Variable
    - Creates a random variable with a script call equal to 0, 1, or 2
    - Random Attack 1
    - Checks if variable is 0
    - Text popus up saying "Random 1"
    - User performs attack motion
    - Wait 12 frames
    - Deal damage to target based on skill's damage formula
    - Play animation on target based on skill's settings
    - Random Attack 1
    - Random Attack 2
    - Checks if variable is 1
    - Text popus up saying "Random 2"
    - User performs attack motion
    - Wait 12 frames
    - Deal damage to all targets based on skill's damage formula
    - Play animation on all targets based on skill's settings
    - Random Attack 3
    - Checks if variable is 2
    - Text popus up saying "Random 3"
    - User performs attack motion
    - Wait 12 frames
    - Deal damage to user based on skill's damage formula
    - Play animation on user based on skill's settings
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Input Attack]

### Linguagem Natural

- O jogo espera o jogador apertar o botão de OK
- Enquanto o tempo não acaba, cada vez que aperta o botão causa dano
- Quando o tempo chega a zero, o ataque para

### Linguagem Técnica

    - Creates a loop for 5 seconds during which a player can repeatedly cause damage
    - Setup: Attack setup, explanation text, and timer start
    - Input attack: If timer is 0, end attack. Otherwise deal damage every time [OK] is 
    - triggered
    - Finish: Standard attack finish
    - Setup
    - Script call here prevents the timer from ending the battle when it runs out.
    - Default MZ ends the battle as soon as the timer hits 0.
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Shows explanatory text
    - Clear battle log
    - begin timer for 5 seconds
    - Input Attack
    - If timer is at 0 seconds, end loop and stop timer
    - Else, if the [OK] button is triggered:
    - Deal damage to target based on skill's damage formula and apply any buffs or 
    - debuffs based on skill's effects
    - Play animation on target based element choice
    - Repeat the above
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space
    - This script call returns the timer to default MZ functionality.

---

## [Nightmare]

### Linguagem Natural

- O jogo checa se o inimigo está dormindo
- Se estiver dormindo, o personagem canta uma música e o inimigo toma dano quatro vezes maior
- Se não estiver dormindo, o personagem canta uma música e coloca o inimigo para dormir

### Linguagem Técnica

    - Shows how to check for an enemy state and perform a different action when the target
    -  has a state vs. when it does not
    - Setup: Attack setup, explanation text, and timer start
    - Check for State: Check if target has state(10)
    - If Asleep: Damage sleeping target 4 times
    - If Not Asleep: Add state(10) to target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Check for State
    - If statement checking if target has state 10 (sleep). 
    - $YYYY.states().includes($dataStates[X])
    - Replace YYYY with:
    - target
    - targets
    - subject
    - "target" for one target, "targets" for multiple, and "subject" for user of the skill
    - Replace X with the state number in the database.
    - If Asleep
    - User performs chant motion
    - Play animation 2 on target
    - Deal damage x 4 to target based on skill's damage formula and apply any buffs or 
    - debuffs based on skill's effects
    - If Not Asleep
    - User performs chant motion
    - Play animation 62 on target
    - Add sleep state (10) to target
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flare Sword]

### Linguagem Natural

- O jogo checa se o ataque do personagem está aumentado
- Se estiver aumentado, ele ataca todos os inimigos com força total
- Se não estiver aumentado, ele ganha um aumento de ataque
- Uma animação mágica aparece no personagem

### Linguagem Técnica

    - Shows how to check for a buff on the user and perform a different action if the buff exists 
    - vs. when it does not
    - Setup: Standard attack setup
    - Check for Buff: Check if target has ATK buff (2)
    - If Buffed: Attack all enemies
    - If Not Buffed: Add atk buff (2) to target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Check for Buff
    - If statement checking if target has buff 2 (ATK). 
    - $YYYY.buff(X) > 0
    - Replace YYYY with:
    - target
    - targets
    - subject
    - "target" for one target, "targets" for multiple, and "subject" for user of the skill
    - Replace X with the buff's param ID.
    - 0 - Max HP   4 - Magic Attack
    - 1 - Max MP   5 - Magic Defense
    - 2 - Attack   6 - Agility
    - 3 - Defense  7 - Luck
    - If Buffed
    - If attack is buffed,
    - User performs attack motion
    - Wait 12 frames
    - Show Attack Animation on All Living Enemies
    - Action Effect on All Living Enemies
    - If Not Buffed
    - If attack is not buffed,
    - Show animation 13 on user
    - Add ATK buff
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Increment Blade]

### Linguagem Natural

- O personagem ataca com a arma dele
- Todos os inimigos tomam dano
- Uma animação de ataque aparece nos inimigos

### Linguagem Técnica

    - Shows how to check for a buff on the user and perform a different action if the buff exists 
    - vs. when it does not
    - Setup + Increment: Attack setup, explanation text, and timer start
    - Attack: Attack target and deal increasing damage based on variable 10
    - Finish: Standard attack finish 
    - Setup + Increment
    - Displays attack name + \v[10] for the attack level
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Wait 12 frames
    - Attack
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - (Shown both in Mech: Custom Damage Formula and in Skill)
    - Play animation on targets based on skill's settings
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Critical Smash]

### Linguagem Natural

- O jogo sorteia um número para ver se vai ser dano crítico
- Se conseguir crítico, a tela pisca e treme, o personagem ataca com força máxima
- O inimigo toma dano super forte e perde defesa
- Se falhar o crítico, o personagem ataca normalmente mas mais fraco

### Linguagem Técnica

    - Uses user's crit rate and target's crit evade stats to determine if a critical hit occurs,
    - then adds a debuff if a crit lands
    - Setup: Attack setup, explanation text, and timer start
    - Crit Check: var_critrate is declared as the user's crit rate minus the target's crit evasion * 100
    - then a random number from 1-100 is selected. A conditional checks if that number is equal 
    - to or less than the crit rate
    - Crit Success: If var_critrate is >= the random number, a crit occurs and Def down 
    - debuff is added to the target
    - Crit Failure: Else a regular attack occurs
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Crit Check
    - var_critrate is set to be the user's crit rate minues the target's crit evasion * 100 
    - in order to make it an integer
    - crit_check is set to be a random # from 1-100.
    - A conditional statement checks to see if var_critrate is equal to or greater than 
    - crit_check
    - Crit Success
    - If var_critrate >= crit_check:
    - +200% Crit rate on hit is added and multiplied by 1000
    - Accuracy is increased by 200%
    - Add two defense debuffs to target
    - Wait 12 Frames
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - Flash screen
    - Shake screen
    - Play animation on target based on skill's settings
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - debuffs based on skill's effects
    - Crit Failure
    - Crit rate goes down by 200%
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - Wait 12 frames
    - Play animation on target based on skill's settings
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - debuffs based on skill's effects
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Combo Duplo]

### Linguagem Natural

- O personagem pula em direção ao inimigo
- Ele dá o primeiro soco no inimigo que toma dano
- O personagem faz uma pausa rápida
- Ele avança e dá o segundo soco no inimigo que toma dano de novo
- O inimigo é jogado para trás com o impacto

### Linguagem Técnica

    - Setup: Standard attack setup
    - Jump to Target: User jumps to front base of enemy
    - Soco 1: First punch attack
    - Action Effect 1: Damage, (de)buffs and skill animation play on target
    - Transicao: Brief pause between punches
    - Soco 2: Second punch attack with knockback
    - Action Effect 2: Damage, (de)buffs and skill animation play on target
    - Knockback: Target is knocked backwards
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Jump to Target
    - User moves to the front base of the enemy + 24 px
    - User jumps 100 px
    - Wait until Jump to Target is complete
    - Soco 1
    - User performs punch motion based on user's weapon (glove)
    - Wait until attack motion is complete
    - Action Effect 1
    - Deal damage to target based on skill's damage formula and apply any 
    - buffs or debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Transicao
    - Brief pause between punches for visual clarity
    - Soco 2
    - User moves into enemy's center base
    - User performs second punch motion
    - Wait until attack motion is complete
    - Action Effect 2
    - Deal damage to target based on skill's damage formula and apply any 
    - buffs or debuffs based on skill's effects
    - Play animation on target based on skill's settings (mirrored for variety)
    - Knockback
    - Target moves backwards 96 px
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Dança dos Ventos]

### Linguagem Natural

- O personagem pula na frente do inimigo girando no ar
- Ele ataca o inimigo que toma dano
- O personagem quica para trás girando muitas voltas
- Ele pula de novo e ataca com um soco forte
- O inimigo toma dano e é empurrado para trás
- O personagem recua um pouco e depois corre e dá um tackle no inimigo
- O inimigo toma dano e é jogado para trás de novo
- O personagem faz um movimento especial correndo e girando pelo ar
- Uma luz brilha e o inimigo toma dano
- O personagem volta para o lugar dele pulando e girando

### Linguagem Técnica

    - Setup: Standard attack setup
    - Hit 1: Frontal Flip Bounce (CE 100 base)
    - Hit 2: Flip Bounce + Tackle (CE 99 base)
    - Hit 3: Dash Flip (CE 104 base)
    - Finish: Volta para posição original
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Hit 1 - Frontal Flip Bounce
    - User moves to the front base of the target + 24 px for collision
    - User jumps 100 px high
    - User spins 720 degrees
    - Wait until Flip to Target is complete, minus 1 frame
    - Action Effect
    - Deal damage to target based on skill's damage formula and apply any buffs or debuffs
    - based on skill's effects
    - Play animation on target based on skill's settings
    - Bounce
    - User moves to target's front base - 100 px while facing target
    - User jumps 100 px
    - User rotates 1440 degrees
    - Wait until Bounce is complete
    - Hit 2 - Flip Bounce + Tackle
    - User moves to the front base of the enemy + 24 px for collision
    - User jumps 100 px high
    - User spins 720 degrees
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - Wait until Flip to Target is complete, minus 1 frame
    - Action Effect 1
    - Deal damage to target based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on target based on skill's settings
    - Bounce
    - User moves to target's front base - 100 px while facing target
    - User jumps 100 px
    - User rotates 1440 degrees
    - User faces target throughout
    - Wait until Bounce is complete + 6 frames
    - Back Up
    - User backs up 96 px while facing target
    - Wait until Back Up is complete
    - Tackle
    - User moves into enemy's center base
    - User perform attack motion based on user's weapon (sword swing/thrust etc.)
    - Wait for Tackle to complete + 1 frame
    - Action Effect 2
    - Deal damage to target based on skill's damage formula and apply any 
    - buffs or debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Wait 6 frames
    - Knockback
    - Target moves backwards 96 px while facing user
    - Hit 3 - Dash Flip
    - Dash Flip Setup
    - Select a random target
    - User moves to target's front base, minus 300 px
    - Wait for Dash Flip Setup to complete + 6 frames
    - Dash Flip
    - User moves 700 px forward
    - User jumps 100 px
    - User spins 1080 degress
    - Wind9 SE plays
    - Wait until Dash Flip is half complete
    - Action Effect (Flash)
    - Deal damage to target based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on target based on skill's settings
    - Play Flash2 SE
    - Flash Screen
    - Wait for Dash Flip to complete + 6 frames
    - Bounce Home
    - User moves home
    - User jumps 75 px
    - User spins 1080 degrees
    - Wait for Bounce Home to complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Jump Attack]

### Linguagem Natural

- O personagem pula em direção ao inimigo
- Ele ataca o inimigo no ar que toma dano
- O personagem volta para o lugar dele

### Linguagem Técnica

    - Setup: Standard attack setup
    - Jump Attack: User jumps to target and attacks
    - Action Effect: Apply damage, (de)buffs and play skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Jump Attack
    - User moves to the front base of the target, no melee distance, offset by +24 px for 
    - collision
    - User jumps 100 px high
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - Wait until the Jump is complete
    - Action Effect
    - Deal damage to target based on skill's damage formula and apply any buffs or 
    - debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flip Attack]

### Linguagem Natural

- O personagem pula em direção ao inimigo girando no ar
- Ele ataca o inimigo que toma dano
- O personagem volta para o lugar dele

### Linguagem Técnica

    - Setup: Standard attack setup
    - Flip Attack: User flips to target and attacks
    - Action Effect: Apply damage, (de)buffs and play skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Flip Attack
    - User moves to the front base of the target, no melee distance, offset by +24 px for
    - collision
    - User jumps 100 px high
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - User spins 360 degrees
    - Wait until Flip Attack is complete
    - Action Effect
    - Deal damage to target based on skill's damage formula and apply any buffs or 
    - debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Dash Through]

### Linguagem Natural

- O personagem pula em direção ao inimigo
- Ele atravessa o inimigo correndo e atacando
- O inimigo toma dano enquanto o personagem passa por ele
- O personagem acaba do outro lado do inimigo

### Linguagem Técnica

    - Setup: Standard attack setup
    - Jump to target: User jumps to target
    - Dash Through: User dashes through target and attacks
    - Action Effect: Apply damage, (de)buffs and play skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Jump to Target
    - User moves to the front base of the target - 48 px (melee distance)
    - User jumps 100 px high
    - Wait until Jump to Target is complete
    - Dash Through
    - User moves to target's back base + 96 px
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - Wait until the Dash Through is halfway complete
    - Action Effect
    - Deal damage to target based on skill's damage formula and apply any buffs or 
    - debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Wait until Dash Through is complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Dash Through All]

### Linguagem Natural

- O personagem pula em direção a todos os inimigos
- Ele atravessa todos os inimigos correndo e atacando
- Todos os inimigos tomam dano enquanto o personagem passa por eles
- O personagem acaba do outro lado de todos os inimigos

### Linguagem Técnica

    - Setup: Standard attack setup
    - Jump to Target: User jumps in front of all living opponents
    - Dash Through: User dashes through all living opponents and attacks
    - Action Effect: Damage, (de)buffs and skill animation play on all living opponents
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Jump to Target
    - User moves to the front center of all living opponents + 48 px (melee distance)
    - User jumps 100 px high
    - Wait until Jump to Target is complete
    - Dash Through
    - User moves to all living opponents' back center + 96 px
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - Wait until the Dash Through is half complete
    - Action Effect
    - Deal damage to all living opponents based on skill's damage formula and apply any 
    - buffs or debuffs based on skill's effects
    - Play animation on all living opponents based on skill's settings
    - Wait until Dash Through is complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flip A. + Dash A.]

### Linguagem Natural

- O personagem pula em direção ao inimigo girando uma volta no ar
- Quando chega perto, ataca com a arma dele
- O inimigo toma dano e aparece uma animação
- O personagem pula para trás girando uma volta no ar
- Então atravessa o inimigo correndo e atacando
- O inimigo toma dano de novo
- O personagem volta para a posição dele

### Linguagem Técnica

    - Setup: Standard attack setup
    - Flip Attack: User flips to target and attacks
    - Action Effect 1: Damage, (de)buffs and skill animation play on target
    - Flip Back: User flips backwards
    - Dash Through: User dashes through target and attacks
    - Action Effect 2: Damage, (de)buffs and skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Flip Attack
    - User moves to the front base of the target
    - no melee distance, offset by +24 px for collision
    - User jumps 100 px high
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - User spins 360 degrees
    - Wait until Flip Attack is complete
    - Action Effect 1
    - Deal damage to target based on skill's damage formula and apply any 
    - buffs or debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Wait 6 frames
    - Flip Back
    - User moves backwards 192 px facing target
    - User (jumps) 65 px high
    - User spins 360 degrees
    - Wait until Flip Back is complete
    - Dash Through
    - Move through enemy's back base
    - Perform attack motion based on user's weapon (sword swing/thrust etc.)
    - Wait until Dash Through is half complete
    - Action Effect 2
    - Deal damage to target based on skill's damage formula and apply any 
    - buffs or debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Wait until Dash Through is complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Dash Through x 2]

### Linguagem Natural

- O personagem pula em direção ao inimigo
- Ele atravessa o inimigo correndo e atacando pela primeira vez
- O inimigo toma dano e aparece uma animação
- O personagem atravessa de novo correndo e atacando
- O inimigo toma dano de novo com animação espelhada
- O personagem volta para a posição dele

### Linguagem Técnica

    - Setup: Standard attack setup
    - Jump to Target: User jumps to target
    - Dash Through 1: User dashes through target and attacks
    - Action Effect 1: Damage, (de)buggs and skill animation play on target
    - Dash Through 2: User dashes back through target and attacks
    - Action Effect 2: Damage, (de)buffs and skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Jump to Target
    - User moves to the front base of the target - 48 px (melee distance)
    - User jumps 100 px high
    - Wait until Jump to Target is complete
    - Dash Through 1
    - User moves to target's back base + 96 px
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - Wait until Dash Through 1 is half complete
    - Action Effect 1
    - Deal damage to target based on skill's damage formula and apply any 
    - buffs or debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Wait until Dash Through 1 is complete
    - Dash Through 2
    - User moves to target's back base + 96 px
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - Wait until Dash Through 2 is half complete
    - Action Effect 2
    - Deal damage to target based on skill's damage formula and apply any 
    - buffs or debuffs based on skill's effects
    - Play mirrored animation on target based on skill's settings
    - Wait until Dash Through 2 is complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Teleport Attack]

### Linguagem Natural

- O personagem anda um pouco para frente
- Enquanto anda, vai ficando transparente até sumir
- O personagem aparece de novo mais para frente
- Enquanto aparece, ataca com a arma dele
- O inimigo toma dano
- O personagem volta para a posição dele

### Linguagem Técnica

    - Setup: Standard attack setup
    - Fade and Move: User moves forward 100 px and fades out
    - Action Animation (No Effect): Skill animation plays on target
    - Fade In Setup: Invisible user moves to target's middle base
    - Fade in Attack: User returns to 255 opacity while moving forward and attacking
    - Action Effect (No Animation): Apply damage and (de)buffs
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Fade and Move
    - User moves forward 100 px
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - User fades out to 0 opacity
    - Wait until Fade and Move is complete
    - Action Animation (No Effect)
    - Play animation on target based on skill's settings
    - Fade In Setup
    - Move invisible actor to target's middle base
    - Wait 45 frames (for animation)
    - Fade In Attack
    - User moves forward 150 px
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - User fades out in to 255 opacity
    - Wait until Fade In Attack is complete (minus 2 frames)
    - Action Effect (No Animation)
    - Deal damage to target based on skill's damage formula and apply any 
    - buffs or debuffs based on skill's effects
    - Wait until Fade In Attack is complete + 12 frames
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Teleport Attack All]

### Linguagem Natural

- O personagem anda um pouco para frente
- Enquanto anda, vai ficando transparente até sumir
- O personagem aparece de novo mais para frente
- Enquanto aparece, ataca com a arma dele
- Todos os inimigos tomam dano
- O personagem volta para a posição dele

### Linguagem Técnica

    - Setup: Standard attack setup
    - Fade and Move: User moves forward 100 px and fades out
    - Action Animation (No Effect): Skill animation plays on all targets
    - Fade In Setup: Invisible user moves to target's middle base
    - Fade in Attack: User returns to 255 opacity while moving forward and attacking
    - Action Effect (No Animation): Apply damage and (de)buffs
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Fade and Move
    - User moves forward 100 px
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - User fades out to 0 opacity
    - Wait until Fade and Move is complete
    - Action Animation (No Effect)
    - Play animation on target based on skill's settings
    - Fade In Setup
    - Move invisible actor to all targets middle center
    - Wait 45 frames (for animation)
    - Fade In Attack
    - User moves forward 200 px
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - User fades out in to 255 opacity
    - Wait until Fade In Attack is complete (minus 2 frames)
    - Action Effect (No Animation)
    - Deal damage to all targets based on skill's damage formula and apply any 
    - buffs or debuffs based on skill's effects
    - Wait until Fade In Attack is complete + 12 frames
    - Finish
    - Turns off immortal, clears battle log, and moves user back to home space

---

## [Teleport Sneak Attack]

### Linguagem Natural

- O personagem recua e vai ficando transparente até sumir
- O personagem aparece de novo mais para frente
- Enquanto aparece, ataca com a arma dele
- O inimigo toma dano e aparece uma animação
- O personagem volta para a posição dele

### Linguagem Técnica

    - Setup: Standard attack setup
    - Fade Out: Evade motion backwards and fade out
    - Fade In Attack Setup: User moves to back base of target
    - Fade In Attack: User moves forward and attacks
    - Action Effect: Damage, (de)buffs and skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Fade Out
    - User moves backward 100 px in evade motion
    - User fades to 0 opacity
    - Wait until Fade Out is complete
    - Fade In Attack Setup
    - User moves to target's back base +50 px
    - Wait until Fade In Attack Setup is complete + 28 frames
    - Fade In Attack
    - User moves forward 200 px
    - User returns to 255 opacity
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - Action Effect
    - Deal damage to target based on skill's damage formula and apply any 
    - buffs or debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Wait until Fade In Attack is complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Animation Sneak Attack]

### Linguagem Natural

- Uma animação especial aparece no personagem
- O personagem vai ficando transparente até sumir
- O personagem aparece de novo e faz uma animação especial
- O personagem corre para frente atacando
- O inimigo toma dano e aparece uma animação
- O personagem volta para a posição dele

### Linguagem Técnica

    - Setup: Standard attack setup
    - Animation Fade Out: Animation plays on user and user fades to opacity 0
    - Attack Setup: User moves to back base of target
    - Sneak Attack: Animation plays on user and user moves forward and attack
    - Action Effect: Damage, (de)buffs and skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Animation Fade
    - Animation 2 plays on user. Customize the effect here with your preferred animation
    - Wait 5 frames
    - User opacity changes to 0
    - Wait until Animation Fade is complete
    - Animation Fade In Setup
    - Invisible user moves to back base of target
    - User faces target
    - Wait for Animation Fade In Setup to complete
    - Animation Fade In
    - User performs attack motion based on user's weapon (sword swing/thrust, etc.)
    - User's opacity changes to 255
    - Animation 2 plays on user
    - Wait 15 frames
    - Sneak Attack
    - User performs attack motion based on user's weapon (sword swing/thrust, etc.)
    - User moves forward 150 px
    - Wait for Sneak Attack to be half complete
    - Action Effect
    - Deal damage to target based on skill's damage formula and apply any 
    - buffs or debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Wait until Sneak Attack is complete + 10 frames
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flip Bounce]

### Linguagem Natural

- O personagem pula em direção ao inimigo girando duas voltas no ar
- Quando chega perto, o inimigo toma dano e aparece uma animação
- O personagem recua pulando e girando quatro voltas no ar
- O personagem volta para a posição dele

### Linguagem Técnica

    - Setup: Standard attack setup
    - Flip to Target: User flips to target's middle center
    - Action Effect: Damage, (de)buffs and skill animation play on target
    - Bounce: User bounces backwards off of target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Flip to Target
    - User moves to the front base of the target + 24 px for collision
    - User jumps 100 px high
    - User spins 720 degrees
    - Wait until Flip to Target is complete, minus 1 frame
    - Action Effect
    - Deal damage to target based on skill's damage formula and apply any buffs or debuffs
    - based on skill's effects
    - Play animation on target based on skill's settings
    - Bounce
    - User moves to target's front base - 100 px while facing target
    - User jumps 100 px
    - User rotates 1440 degrees
    - Wait until Bounce is complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flip Bounce + Tackle]

### Linguagem Natural

- O personagem pula em direção ao inimigo girando duas voltas no ar
- Quando chega perto, ataca e o inimigo toma dano
- O personagem recua pulando e girando três voltas no ar
- O personagem recua mais um pouco para trás
- Então corre e dá um tombo no inimigo
- O inimigo toma dano de novo
- O inimigo é empurrado para trás
- O personagem volta para a posição dele

### Linguagem Técnica

    - Setup: Standard attack setup
    - Flip to Target: User flips to target's middle center
    - Action Effect 1: Damage, (de)buffs and skill animation play on target
    - Bounce: User bounces backwards off of target
    - Back Up: User backs up
    - Tackle: User dashes forward
    - Action Effect 2: Damage, (de)buffs and skill animation play on target
    - Knockback: Target is knocked backwards
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Flip to Target
    - User moves to the front base of the enemy + 24 px for collision
    - User jumps 100 px high
    - User spins 720 degrees
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - Wait until Flip to Target is complete, minus 1 frame
    - Action Effect 1
    - Deal damage to target based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on target based on skill's settings
    - Bounce
    - User moves to target's front base - 100 px while facing target
    - User jumps 100 px
    - User rotates 1440 degrees
    - User faces target throughout
    - Wait until Bounce is complete + 6 frames
    - Back Up
    - User backs up 96 px while facing target
    - Wait until Back Up is complete
    - Tackle
    - User moves into enemy's center base
    - User perform attack motion based on user's weapon (sword swing/thrust etc.)
    - Wait for Tackle to complete + 1 frame
    - Action Effect 2
    - Deal damage to target based on skill's damage formula and apply any 
    - buffs or debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Wait 6 frames
    - Knockback
    - Target moves backwards 96 px while facing user
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Dash Cast]

### Linguagem Natural

- Uma animação de magia aparece no personagem
- O personagem corre para frente fazendo um gesto mágico
- O som de vento toca
- O personagem volta para a posição dele
- Ele faz um gesto de lançar magia
- Uma luz brilha na tela e os inimigos tomam dano
- O personagem volta para a posição normal

### Linguagem Técnica

    - Setup: Standard attack setup
    - Dash Cast Setup: Move in line with target
    - Cast Animation: User performs cast motion and freezes
    - Dash: Dash forward through target and off screen
    - Return Home Setup: Move backwards off screen
    - Return Home: Move forward while performing chant motion
    - Cast: Perform spell motion
    - Action Effect (Flash): Apply damage, (de)buffs and play skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Dash Cast Setup
    - User moves to target's front base minus 200 px
    - Wait until Dash Cast Setup is complete + 6 frames
    - Cast Animation
    - Cast Animation plays on user
    - Wait for animation to complete
    - Dash
    - User moves forward 700 px with chant motion
    - Wind9 SE plays
    - Wait until Dash is complete + 15 frames
    - Return Home Setup
    - Move user to target's front base minus 600 px
    - User opacity changes to 0
    - Wait for Return Home Setup to complete
    - Return Home
    - User moves forward 400 px to home
    - User opacity increases to 255
    - Wait for Return Home to complete
    - Cast
    - User performs spell motion
    - Wait until Cast is complete minus 1 frame
    - Action Effect (Flash)
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Play Flash2 SE
    - Flash Screen
    - Wait for Action Effect (Flash) to complete
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Dash Cast All]

### Linguagem Natural

- Uma animação de magia aparece no personagem
- O personagem corre para frente fazendo um gesto mágico
- O som de vento toca
- O personagem volta para a posição dele
- Ele faz um gesto de lançar magia
- Uma luz brilha na tela e todos os inimigos tomam dano
- Todo mundo volta para a posição normal

### Linguagem Técnica

    - Setup: Standard attack setup
    - Cast Animation: User performs cast motion and freezes
    - Dash: Dash forward through target and off screen
    - Return Home Setup: Move backwards off screen
    - Return Home: Move forward while performing chant motion
    - Cast: Perform spell motion
    - Action Effect (Flash): Apply damage, (de)buffs and play skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Cast Animation
    - Cast Animation plays on user
    - Wait for animation to complete
    - Dash
    - User moves forward 700 px with chant motion
    - Wind9 SE plays
    - Wait until Dash is complete + 15 frames
    - Return Home Setup
    - Move user to home minus 300 px
    - User opacity changes to 0
    - Wait for Return Home Setup to complete
    - Return Home
    - User moves forward 400 px to home
    - User opacity increases to 255
    - Wait for Return Home to complete
    - Cast
    - User performs spell motion
    - Wait until Cast is complete minus 1 frame
    - Action Effect (Flash)
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Play Flash2 SE
    - Flash Screen
    - Wait for Action Effect (Flash) to complete
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flip Cast]

### Linguagem Natural

- O personagem pula para trás girando no ar
- Ele faz um gesto mágico de conjuração
- Uma luz brilha e todos os inimigos tomam dano
- O personagem desce devagar ainda fazendo o gesto mágico
- Ele volta à posição normal

### Linguagem Técnica

    - Setup: Standard attack setup
    - Flip: User flips up and back
    - Cast: User performs Cast motion
    - Action Effect (Flash): Apply damage, (de)buffs and play skill animation play on target
    - Fall: User falls back to home position
    - Motion Reset: User goes back to idle motion
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Flip
    - User moves backward 35 px and up 100 px
    - User rotates 720 degrees
    - Wait until Flip is complete minus 1 frame
    - Cast
    - User performs Spell motion
    - Wait until motion is complete minus 1 frame
    - User freezes in spell motion
    - Action Effect (Flash)
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Play Flash2 SE
    - Flash Screen
    - Wait for 4 frames
    - Fall
    - User moves backwards 35 px and down 100 px (to home)
    - User freezes in spell motion
    - Motion Reset
    - User shows idle motion (walk)
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flip Shot]

### Linguagem Natural

- O personagem pula para trás girando duas voltas no ar
- Ele faz o movimento de ataque com a arma
- O inimigo toma dano e aparece uma animação
- O personagem desce devagar voltando ao chão

### Linguagem Técnica

    - For best results, user should have gun, bow, or other ranged weapon equipped
    - Setup: Standard attack setup
    - Flip: User flips up and back
    - Attack: User performs weapon's associated motion
    - Action Effect: Apply damage, (de)buffs and play skill animation play on target
    - Fall: User falls back to home position
    - Motion Reset: User goes back to idle motion
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Flip
    - User moves backward 35 px and up 100 px
    - User rotates 720 degrees
    - Wait until Flip is complete minus 1 frame
    - Motion 
    - Perform attack motion based on equipped weapon
    - Action Effect
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Wait for 6 frames
    - Fall
    - User moves backwards 35 px and down 100 px
    - User freezes in evade motion
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Dive Shot]

### Linguagem Natural

- O personagem mergulha para frente pulando bem alto e girando
- Ele faz o movimento de ataque com a arma
- Todos os inimigos tomam dano e o personagem fica transparente
- O personagem continua mergulhando até sumir da tela

### Linguagem Técnica

    - For best results, user should have gun, bow, or other ranged weapon equipped
    - Setup: Standard attack setup
    - Dive Setup:Move to target's front base minus 300 px
    - Dive: Dive over target
    - Attack Motion: Attack motion based on equipped weapon
    - Action Effect + Opacity: Apply damage, (de)buffs and play skill animation play on target
    - and fade to 0 opacity
    - Finish Setup: Move to target's front base, minus 600 px
    - Finish + Full Reset: Standard attack finish, + reset opacity/angle
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Dive Setup
    - User moves to target's front base, minus 300 px
    - Wait until Dive Setup is complete
    - Dive
    - User moves 700 px forward
    - User jumps 200 px
    - User spins 180 degrees
    - User fades to 0 opacity
    - Wind9 SE plays
    - Wait 5 frames
    - Attack Motion
    - User performs attack motion based on weapon equipped
    - Wait 17 frames
    - Action Effect + Opacity
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - User fades to 0 opacity (InQuart = quick fade at end)
    - Wait for Dive to complete
    - Finish Setup
    - User moves to target's front base, minus 600 px
    - Wait for Finish Setup to complete
    - Finish + Full Reset
    - User opacity increases to 255
    - User angle resets
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Projectile]

### Linguagem Natural

- O personagem faz um gesto de lançar magia
- Um projétil sai do personagem e voa até o inimigo
- O inimigo toma dano quando o projétil acerta

### Linguagem Técnica

    - Requires Visustella's Action Sequence Projectiles plugin
    - https://visustellamz.itch.io/action-sequence-projectiles
    - For best results, try other animations:
    - e.g. https://manugamingcreations.itch.io/rpg-maker-mz-fireball-projectile
    - Setup: Standard attack setup
    - Cast: User performs Cast motion
    - Fire Projectile: Animation travels from user to target
    - Action Effect (Flash): Apply damage, (de)buffs and play skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Cast
    - User performs Spell motion
    - Wait until Cast is complete minus 1 frame
    - Fire Projectile
    - Animation 107 travels from user to target
    - Wait 18 frames
    - Action Effect
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flip Projectile]

### Linguagem Natural

- O personagem pula para trás girando no ar
- Ele faz um gesto mágico de lançamento
- Um projétil sai do personagem e voa até o inimigo
- O personagem desce devagar enquanto o projétil viaja
- O inimigo toma dano quando o projétil acerta
- O personagem volta à posição normal

### Linguagem Técnica

    - Requires Visustella's Action Sequence Projectiles plugin
    - https://visustellamz.itch.io/action-sequence-projectiles
    - For best results, try other animations:
    - e.g. https://manugamingcreations.itch.io/rpg-maker-mz-fireball-projectile
    - Setup: Standard attack setup
    - Flip: User flips up and back
    - Cast: User performs Cast motion
    - Fire Projectile: Animation travels from user to target
    - Fall: User falls back to home position
    - Action Effect (Flash): Apply damage, (de)buffs and play skill animation play on target
    - Motion Reset: User goes back to idle motion
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Flip
    - User moves backward 35 px and up 100 px
    - User rotates 720 degrees
    - Wait until Flip is complete minus 1 frame
    - Cast
    - User performs Spell motion
    - Wait until Cast is complete minus 1 frame
    - Fire Projectile
    - User freezes in spell motion
    - Animation 107 travels from user to target
    - Wait 4 frames
    - Fall
    - User moves backwards 35 px and down 100 px (to home)
    - User freezes in spell motion
    - Wait until Fire Projectile is complete, minus 2 frames
    - Action Effect
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Motion Reset
    - User shows idle motion (walk)
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [MGC Projectile]

### Linguagem Natural

- O personagem faz um gesto mágico como se estivesse lançando um feitiço
- Um projétil sai do personagem e voa até o inimigo
- O inimigo toma dano quando o projétil acerta

### Linguagem Técnica

    - Requires Visustella's Action Sequence Projectiles plugin
    - https://visustellamz.itch.io/action-sequence-projectiles
    - For best results, try other animations:
    - e.g. https://manugamingcreations.itch.io/rpg-maker-mz-fireball-projectile
    - Setup: Standard attack setup
    - Cast: User performs Cast motion
    - Fire Projectile: Animation travels from user to target
    - Action Effect (Flash): Apply damage, (de)buffs and play skill animation play on target
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Cast
    - User performs Spell motion
    - Wait until Cast is complete minus 1 frame
    - Fire Projectile
    - Animation 107 travels from user to target
    - Wait 18 frames
    - Action Effect
    - Deal damage to targets based on skill's damage formula and apply any buffs or debuffs 
    - based on skill's effects
    - Play animation on targets based on skill's settings
    - Finish
    - Turns off immortal, clears battle log, and moves everyone back to home space

---

## [Flip Attack Sequential]

### Linguagem Natural

- O personagem pula em direção ao inimigo girando no ar
- Ele ataca o inimigo que toma dano
- O personagem espera um pouco
- Então pega o próximo inimigo e repete o ataque
- Faz isso com todos os inimigos
- Quando acaba com todos, volta para a posição dele

### Linguagem Técnica

    - Demonstrates use of looping, labels, and "Next Target" mechanic
    - Skill must have a scope of "All" or more than 1 "Random" target.
    - This attack will attack each target within the scope, one at a time.
    - Setup: Standard attack setup
    - Flip Attack Loop: User flips to target and attacks
    - Action Effect: Apply damage, (de)buffs and play skill animation play on target
    - Next Target: Move index to next target and return to Flip Attack Loop
    - Finish: Standard attack finish
    - Setup
    - Displays attack name
    - Makes targets immortal so they don't die in the middle of multiple hit attacks
    - No battle step or cast animation
    - Flip Attack Loop
    - User moves to the front base of the target, no melee distance, offset by +24 px for
    - collision
    - User jumps 100 px high
    - User performs attack motion based on user's weapon (sword swing/thrust etc.)
    - User spins 360 degrees
    - Wait until Flip Attack Loop is complete
    - Action Effect
    - Deal damage to target based on skill's damage formula and apply any buffs or 
    - debuffs based on skill's effects
    - Play animation on target based on skill's settings
    - Wait 12 frames
    - Next Target
    - Move index to next target
    - Return to Flip Attack Loop if there are still targets left
    - Finish
    - Turns off immortal, clears battle log, and moves user back to home space

---

## Documentação gerada automaticamente a partir dos arquivos XML de Action Sequence
Data: 2026-04-16
Total de skills documentadas: 48 (de 48)



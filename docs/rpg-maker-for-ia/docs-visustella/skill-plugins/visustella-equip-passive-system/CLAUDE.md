# Equip Passive System VisuStella MZ - Documentação Completa

## Sumário

Documentação catalogada do plugin Equip Passive System (VisuMZ.148) para RPG Maker MZ.
Tier 2. Requer Core Engine + Skills and States Core.
Opcional: Elements and Status Menu Core, Skill Learn System, Class Change System.

## Conceitos

### visao-geral.md
Sistema permite que atores equipem states passivos. Cada passivo tem custo de capacidade. Aprendizado orgânico via condições (batalhas, level, skills) ou compra via Skill Learn System. Suporta branching (árvore de passivos) e global operations.

### states-como-base.md
Passivos são states do RPG Maker com notetags especiais. Herdam traits, motions, overlays. Capacidade controlada por fórmula com min/max. Suporta ícone/nome customizados. Branching: Learn (direto) e Learnable (lista). Link: skills podem desencadear passivos.

### unlock-conditions.md
30+ tipos de condições: Level, Battles/Victories/Escapes/Defeats, Attack/Guard times, Skill usage (all/physical/magical/certain hit), SType específico, Criticals (inflict/receive), Miss/Evade, Element damage, State inflict/receive, Trait kills, Total damage/healing, Kill/Death/Assist counts, Gold/Items/Weapons/Armors, Param/XParam/SParam reach. Todas são AND. Contadores iniciam na listagem.

### skill-learn-integration.md
Alternativa ao unlock orgânico. Passivos comprados com AP/SP/CP/JP/Gold/Items/Weapons/Armors. Listados via Class Notetags. Show conditions (visível mas travado) e Require conditions (habilitado para compra). Animação customizável. Ambos sistemas podem coexistir.

## Notetags

### setup.md
State: Cost, Icon, Name, Help Description, Branch Learn/Learnable. Actor/Class: Learnable list, Learned/Already pre-set. Skill: Link Learn/Learnable.

### hiding.md
Hide If Not Learned (bypass), Hide If Learned (single/All/Any variants). Para exclusão mútua e evolução de passivos.

### masking.md
Mask/No Mask overrides, custom mask name. Plugin Parameters controlam comportamento padrão (Show Unlearned, Separate, Mask, Icon, Character, Italics).

### unlock-conditions.md
Notetags detalhadas por categoria: Level, Battles, Actions, SType, Criticals, Elements, States, Traits, Damage/Healing totals, Kill/Death/Assist, Resources, Parameters. Todas State Notetags. Múltiplas = AND.

### skill-learn-system.md
Class: Learn Passive listing. State: Custos (AP/SP/CP/JP/Gold/Items/Weapons/Armors), Show conditions (Level/Skill/Switch), Require conditions (Level/Skill/Switch), Animation/Fade/Picture.

### referencia-rapida.md
Tabela completa de todas as notetags organizadas por alvo (State, Actor, Class, Skill) e categoria (Setup, Masking, Hiding, Unlock, SLS).

## Comandos

### actor.md
4 comandos: Learn, Forget, Add Unlearned, Remove Unlearned. Todos aceitam Actor ID(s) e Passive State ID(s). Learn tem opção de Text Popup.

### global.md
4 comandos equivalentes ao Actor mas aplicados a todos os atores do party.

### system.md
1 comando: Show/Hide Passives in Skill Scene. Para tutorial/desbloqueio progressivo.

## Parâmetros

### general-settings.md
Default Show Command, Auto-Equip on Learn, Text Popup + Format. Capacity: Formula, Default Cost, Min/Max Cap, Check Over-Capacity.

### vocabulary-settings.md
Scene_Skill: Command, Capacity, Cost, Unlearned texts. Help Window: Description Format, Word Wrap, Spacing. 30+ format strings para cada tipo de unlock condition com placeholders (%1 Needed, %2 Progress, %3 Context).

### window-settings.md
Passive List: Background, Equipped Color, Cost display (0/1/numbers/icons), Sort, Unlearned (show/separate/mask/mask options). Passive Status: Show, Background, Max Capacity Color.

## Referência

### compatibilidade.md
Ordem no Plugin Manager por Tier. Interações: SLS bypass unlock, Elements adiciona trait condition, States base funciona completamente.

### glossario.md
Termos do sistema (Equip Passive, Capacity, Learnable, etc.). Tipos de notetag por contexto. Parâmetros RPG Maker (Param, X-Param, S-Param). Moedas do SLS.

## Relação entre Áreas

- **Conceitos** explicam O QUÊ e PORQUÊ
- **Notetags** detalham COMO implementar (referência de API)
- **Comandos** mostram controle via eventos
- **Parâmetros** configuram comportamento global
- **Referência** apoia consultas pontuais

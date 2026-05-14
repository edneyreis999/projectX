# Plugin Parameters: Battle System

Seleciona qual battle system usar como padrao no jogo.

## Opcoes Disponiveis

### Nativos (RPG Maker MZ)
- **Database Default**: Usa configuracao do database do jogo
- **DTB**: Default Turn Battle
- **TPB Active**: Time Progress Battle (Active)
- **TPB Wait**: Time Progress Battle (Wait)

### VisuStella (requer plugins adicionais)
- **BTB**: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
- **CTB**: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
- **OTB**: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
- **STB**: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)

## Notas
- Pode ser override por mapa/troop via notetags (ver [batalha.md](../notetags/batalha.md))
- Pode ser trocado in-game via Plugin Command "System: Battle System Change"
- Nao lista PTB, FTB, ETB aqui pois requerem seus proprios plugins

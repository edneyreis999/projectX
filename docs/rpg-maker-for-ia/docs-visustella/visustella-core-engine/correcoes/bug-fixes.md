# Bug Fixes

O Core Engine corrige automaticamente os seguintes bugs do RPG Maker MZ:

## Attack Skill Trait
Inimigos nao sao afetados pelo Attack Skill Trait. Sempre usam Attack mesmo se o trait foi alterado. O Core Engine faz o Attack skill respeitar o trait.

## Auto Battle Actor Skill Usage
Atores com Auto Battle podem usar skills de tipos que nao possuem acesso durante input manual. Corrigido para checar tipos de skill corretamente.

## Auto Battle Attack Seal Bypass
Se o attack skill esta selado via trait, atores com auto-battle ainda podiam atacar. Corrigido: attack selado = nao pode atacar via auto-battle.

## Auto Battle Lock Up
Atores com Auto Battle contra inimigos com DEF/MDF muito alto nao executavam nenhuma acao, causando softlock. Agora defaultam para Attack.

## Auto Save After New Game
Ao iniciar New Game apos ter carregado um save e ido pro Game End > Title, o auto save era acionado incorretamente. Corrigido.

## Battle Forced End Action Crash
Se targets eram limpos enquanto acoes restavam, crash ocorria. Corrigido por Olivia.

## Debug Console Refresh Bug (MZ 1.5.0+)
F5 refresh com DevTools aberto causava falha no carregamento de imagens. Codigo revertido para versao 1.4.4 estavel.

## Gamepad Repeat Input
Inputs limpos em gamepads nao tinham downtime, causando re-input imediato no proximo frame. Adicionado downtime igual ao keyboard.

## Invisible Battle Sprites
Ao remover um party member durante batalha e readicionar no mesmo slot, o sprite ficava invisivel. Corrigido.

## Instant Text Discrepancy (Window_Message)
Texto exibido letra por letra vs instantaneo tinham larguras diferentes com fontes nao-monospaced (ex: Arial). `Bitmap.measureTextWidth` arredondava por letra vs por palavra. Corrigido apenas para Window_Message.

**Plugin Parameters > QoL Settings > Misc > Font Width Fix**

## Move Picture Origin Differences
Show Picture com "Upper Left" + Move Picture com "Center" causavam pulo instantaneo sem transicao suave. Corrigido para transicao limpa entre origins.

## Overly-Protective Substitute
Aliado com HP critico sendo curado por aliado com substitute state causava o substitute "proteger" contra heals/buffs. Corrigido: substitute nao trigger para acoes com scope de aliados.

## Skill List Active After Party Member Change
Ao trocar party member via botoes com skill list ativa, a janela permanecia ativa com cursor escondido, causando dupla ativacao skill type + skill list. Corrigido.

## Sprite Removal and Destroy Crash
Textura check adicionado antes de remover/destruir sprites para prevenir crashes com sprites criados via script call.

## Status Window Name Vertical Cutoffs
Bitmap para nomes no battle status nao se estendia verticalmente, cortando letras como "Q" e "G". Bitmap estendido. Fix por Irina.

## Termination Clear Effects
Animacoes requested durante transicao de cenas causavam crash por targets incorretos. Animacoes e balloon effects agora sao limpos ao terminar cena.

## Timer Sprite
Sprite_Timer adicionado ao spriteset era afetado por filtros/zoom/blur. Movido para parent scene para ficar legivel.

## Unusable Battle Items
Se qualquer party member podia usar um item, TODOS podiam em batalha. Corrigido para checar individualmente.

## Water Tile Bug (MZ 1.5.0+)
Tilesets criados do zero causavam tiles normais virarem water tiles. **Nao e corrigivel por codigo** - deve ser corrigido no editor:
1. Copiar tileset funcional sobre o bugado e reaplicar propriedades
2. Usar "Copy Page" > "Paste Page" de tileset funcional (MZ 1.5.0+)
O plugin alerta quando encontra o bug.

## Window Arrows Sprite Tearing
Width impar em windows posicionava arrows em half-pixel, causando blur e sprite tearing. Corrigido com arredondamento.

## Window Client Area Scaling Bug
Escala diferente de 1.0 em windows causava client area cortada. Ajustado para scale com arredondamento para cima.

## Window Skin Bleeding (MZ v1.2.0)
`Window.prototype._refreshBack` frame value mudado de 96 para 95 causava bleeding. Core Engine reverte para 96.

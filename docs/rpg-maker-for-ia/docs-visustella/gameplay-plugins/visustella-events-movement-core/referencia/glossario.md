# Glossario - VisuStella Events & Movement Core

Glossario dos termos-chave do plugin VisuStella Events & Movement Core para RPG Maker MZ.

---

## Self Switch

Switch com escopo limitado a uma instancia especifica de evento. Criado adicionando `<Self>` ao nome de uma Switch no banco de dados. Estende as self switches padrao A/B/C/D do RPG Maker MZ, permitindo criar quantas self switches adicionais forem necessarias, todas isoladas por evento.

## Self Variable

Variavel com escopo limitado a uma instancia especifica de evento. Criada adicionando `<Self>` ao nome de uma Variable no banco de dados. Permite armazenar dados proprios de cada evento sem poluir as variaveis globais do jogo.

## Map Switch

Switch com escopo limitado ao mapa atual. Criada adicionando `<Map>` ao nome de uma Switch no banco de dados. Valores persistem enquanto o jogador permanece no mesmo mapa e sao descartados ao sair.

## Map Variable

Variavel com escopo limitado ao mapa atual. Criada adicionando `<Map>` ao nome de uma Variable no banco de dados. Valores persistem enquanto o jogador permanece no mesmo mapa e sao descartados ao sair.

## Reference Switch/Variable

Switch ou Variable referenciada pelo nome em string usando `((Nome))` no nome do banco de dados. Permite acessar via script calls como `$gameSwitches.value('Nome')` em vez de usar IDs numericos. A busca e case-insensitive (nao diferencia maiusculas de minusculas).

## VS8 Sprite Sheet

Formato de sprite sheet de 8 direcoes da VisuStella. Suporta frames de walk, dash, carry, ladder, rope e emote em um layout especifico com 16 blocos de 3 frames cada. Ativado incluindo `[VS8]` no nome do arquivo de imagem. Expande significativamente as animacoes possiveis em relacao ao formato padrao do RPG Maker MZ.

## Event Template

Blueprint (modelo) para eventos armazenado nos Plugin Parameters. Usado como base para as operacoes de Copy Event, Morph Event e Spawn Event. Permite reutilizar configuracoes de evento sem duplicar dados no editor.

## Spawn Event

Criacao dinamica de um novo evento no mapa em tempo de execucao (runtime). Pode usar templates definidos nos Plugin Parameters ou dados de eventos ja existentes no mapa. Eventos spawnados sao temporarios por padrao, mas podem ser preservados com a opcao adequada.

## Morph Event

Transformacao da aparencia e comportamento de um evento existente em um evento/template diferente em tempo de execucao. O evento mantem sua posicao e algumas propriedades, porem assume as caracteristicas do novo template.

## Move Synch

Sincronizacao do movimento de um evento com o jogador ou outro evento. Tipos disponiveis: Random, Approach, Away, Custom, Mimic, Reverse Mimic, Mirror Horizontal, Mirror Vertical. Permite criar comportamentos de movimento coordenados entre entidades no mapa.

## Activation Region/Area

Ativacao remota de evento baseada na posicao do jogador relativa a regions ou areas geometricas. Tipos de area: Square (quadrado), Circle (circulo), Delta (triangulo), Row (linha horizontal), Column (linha vertical). Permite ativar eventos sem contato direto.

## Weighted Random Movement

Movimento aleatorio modificado onde eventos tendem a permanecer proximos a sua posicao de spawn. Controlado por um valor de peso (weight) entre 0 e 1. Valores mais altos mantem o evento mais proximo do ponto de origem.

## Pathfinding

Calculo automatico de rota para movimento de evento em direcao a um alvo. Usa o algoritmo de pathfinding padrao do RPG Maker MZ. Nao e garantido encontrar sempre o caminho mais curto, mas oferece uma solucao automatizada para navegacao de eventos.

## Event Label

Texto exibido acima de um evento. Suporta text codes do RPG Maker MZ e pode ter visibilidade baseada em distancia (range). Configurado via notetags ou Plugin Parameters.

## Event Icon

Icone exibido acima da cabeca de um evento. Util para identificar rapidamente NPCs, itens ou pontos de interacao no mapa.

## Hitbox

Area de colisao de um evento. Pode ser estendida em 4 direcoes (cima, baixo, esquerda, direita) via notetags, permitindo que eventos ocupem mais de um tile para fins de colisao.

## Tile Expand

Expansao visual de um tile graphic sem afetar a hitbox de colisao. Permite que eventos como mesas grandes ou veiculos aparecam visualmente maiores sem alterar a area de interacao.

## Event Popup

Texto animado exibido acima do jogador, follower, evento ou tile. Requer o plugin VisuMZ_1_MessageCore instalado e ativo. Nao funciona durante batalhas.

## Custom Page Conditions

Condicoes customizadas de pagina de evento usando logica de Conditional Branch dentro de comment tags. Permite criar condicoes de ativacao complexas sem limitar as paginas do evento apenas as condicoes padrao do RPG Maker MZ.

## Turn in Place

O jogador vira para encarar a direcao do movimento antes de se mover. Funciona apenas com input de teclado. Ativado nos Plugin Parameters globais.

## Region Rulings

Sistema para controle de passabilidade do jogador, eventos e veiculos atraves de marcadores de region no mapa. Permite bloquear ou liberar areas especificas sem alterar o tileset.

## Terrain Tag

Marcador numerico (0-7) atribuido a tiles no editor de Tileset. Usado para propriedades especiais como movimento em corda (rope movement), escadas e outros comportamentos de terreno.

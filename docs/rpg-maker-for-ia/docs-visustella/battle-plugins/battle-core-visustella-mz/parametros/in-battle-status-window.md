# In-Battle Status Window - Plugin Parameters

## Visão Geral

Adicionado na versão 1.84 do Battle Core, esta janela permite ao jogador visualizar o status do party ativo. Se os atores tiverem estados e buffs, o jogador pode rolar através deles e ler seus efeitos através da janela de ajuda.

Parâmetros exibidos são controlados através do VisuMZ_0_CoreEngine em "Parameter Settings" e "Extended Parameters". Por padrão, exibe MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI e LUK.

Inimigos também podem ser visualizados (se parâmetro habilitado), rolando através de todos os atores antes. Inimigos mostram porcentagem de HP/MP/TP em vez de valores absolutos.

## Parâmetros

### General Settings

#### Status Icon
- **Descrição**: Ícone usado para comando Status
- **Notas**: Índice do ícone da database

#### Status Graphic
- **Descrição**: Como o gráfico do ator aparece no In-Battle Status
- **Notas**: Define estilo de exibição do personagem

#### Help Description
- **Descrição**: Texto ao selecionar comando Status
- **Notas**: Explicação do comando

### Enemy Settings

#### Allow View Enemies?
- **Descrição**: Permite jogadores ver stats de inimigos?
- **Notas**: Pode ser limitado

#### Show Level?
- **Descrição**: Mostra nível do inimigo no In-Battle Status?
- **Notas**: Exibe nível se disponível

#### Hidden Parameter
- **Descrição**: Texto se valor de parâmetro está oculto
- **Notas**: Texto padrão: "???" ou similar

##### Show Params Always
- **Descrição**: Sempre mostrar valores exatos de parâmetros de inimigos
- **Notas**: Mostra todos os valores sem restrição

##### Show Battle Test
- **Descrição**: Mostrar valores exatos no Battle Test
- **Notas**: Apenas durante testes

##### Show If Defeated
- **Descrição**: Mostrar valores exatos se inimigo já foi derrotado antes
- **Notas**: Libera após primeira vitória

### Page Buttons

#### Show Page Buttons?
- **Descrição**: Mostra botões de página para trocar entre atores?
- **Notas**: Requer opção Touch UI ativa

#### Large UI Position?
- **Descrição**: Em resolutions grandes, posiciona botões em qual lado?
- **Notas**: Left ou Right

#### Offset X
- **Descrição**: Offset posição X dos botões de página
- **Notas**: Negativo: esquerda. Positivo: direita

#### Offset Y
- **Descrição**: Offset posição Y dos botões de página
- **Notas**: Negativo: cima. Positivo: baixo

### Parameter Display

#### Increased Value
- **Descrição**: Como valores de parâmetros aumentados são exibidos
- **Notas**: %1 - Valor do Parâmetro

#### Decreased Value
- **Descrição**: Como valores de parâmetros diminuídos são exibidos
- **Notas**: %1 - Valor do Parâmetro

### States Display

#### Max Width
- **Descrição**: Largura máxima da lista de estados
- **Notas**: Em pixels

#### List States?
- **Descrição**: Lista estados na display de estados?
- **Notas**: Mostra ícones de estados

#### List Buffs?
- **Descrição**: Lista buffs na display de estados?
- **Notas**: Mostra buffs ativos

#### List Debuffs?
- **Descrição**: Lista debuffs na display de estados?
- **Notas**: Mostra debuffs ativos

#### Buffs/Debuffs Display

##### Buff Name Format
- **Descrição**: Formato de texto para buffs
- **Notas**: %1 - Nome do Parâmetro

##### Debuff Name Format
- **Descrição**: Formato de texto para debuffs
- **Notas**: %1 - Nome do Parâmetro

#### Normal State

##### Normal Icon
- **Descrição**: Ícone para estado normal (sem estados, buffs ou debuffs)
- **Notas**: Ícone de "sem efeitos"

##### Normal Text
- **Descrição**: Texto para estado normal (sem estados, buffs ou debuffs)
- **Notas**: Texto de "normal"

### Help Descriptions

#### State Help Format
- **Descrição**: Formato de texto para help de estados
- **Notas**: %1 - Descrição; %2 - Turnos/Ações Restantes

#### Buff Help Format
- **Descrição**: Formato de texto para help de buffs
- **Notas**: %1 - Param; %2 - Porcentagem; %3 - Cor; %4 - Turnos

#### Debuff Help Format
- **Descrição**: Formato de texto para help de debuffs
- **Notas**: %1 - Param; %2 - Porcentagem; %3 - Cor; %4 - Turnos

#### Normal State
- **Descrição**: Help para estado normal (sem estados, buffs ou debuffs)
- **Notas**: Explicação de "normal"

#### Turns/Actions Left

##### Actions Format
- **Descrição**: Formato para ações restantes
- **Notas**: %1 - Ações; %2 - Cor

##### Turns Format
- **Descrição**: Formato para turnos restantes
- **Notas**: %1 - Turnos; %2 - Cor

##### Passive Text
- **Descrição**: Texto para representar passivo
- **Notas**: Indica efeito permanente

### Window Settings

#### Background Type
- **Descrição**: Tipo de fundo para esta janela
- **Notas**: Dim, Transparent ou Normal

#### JS: Draw Data
- **Descrição**: Código para desenhar dados do battler
- **Notas**: Customização via JavaScript

#### JS: X, Y, W, H
- **Descrição**: Código para determinar dimensões desta janela
- **Notas**: Customização via JavaScript

## Ver Também
- [Party Command Window](./party-command-window.md) - Comando Status do party
- [Notetags - Enemy Battler](../notetags/enemy-battler.md) - Notetags para inimigos
- [Battle Layout](./battle-layout.md) - Layout geral de batalha

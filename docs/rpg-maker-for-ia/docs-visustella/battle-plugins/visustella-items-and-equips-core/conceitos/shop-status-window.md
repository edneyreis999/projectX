# Shop Status Window

## Visão Geral

A Status Window do Shop Scene foi significativamente melhorada. Originalmente era vazia e não exibia muita informação. Agora exibe informações detalhadas necessárias aos jogadores sobre os itens do jogo.

O conteúdo do Shop Status Window pode ser customizado via Plugin Parameters. Esta mudança **não pode ser revertida**.

## Integração com Core Engine: Modern Controls

Se o VisuStella Core Engine estiver instalado com Modern Controls habilitado:

### Item Menu Scene
- Item List Window fica automaticamente ativo
- Left/Right (coluna única) ou Page Up/Page Down (multi-colunas) para navegar entre categorias
- Comportamento similar ao vender itens no Shop Menu Scene

### Equip Menu Scene
- Equip Slots Window fica automaticamente ativo
- Command Window só é ativado ao mover para cima

## Customização via Notetags

O comportamento do Status Window pode ser customizado com notetags:

- [notetags/status-window.md](../notetags/status-window.md) - Status Info, Custom Status Info, Status Style, Shop Picture
- [parametros/shop-status-window.md](../parametros/shop-status-window.md) - Configuração completa do Status Window

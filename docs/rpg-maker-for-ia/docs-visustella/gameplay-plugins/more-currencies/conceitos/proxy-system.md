# Sistema de Proxy

## Conceito

Proxy Items são **substitutos temporários** para outro item, weapon ou armor. Eles permitem que o mesmo item seja vendido em diferentes shops usando diferentes combinações de moedas.

## Como Funciona

1. Cria-se um item separado no database que servirá como "proxy"
2. Adiciona-se a notetag `<Proxy: id>` ou `<Proxy: name>` neste item
3. O proxy assume o **nome, ícone, descrição e status** do item original
4. Quando comprado, o jogador recebe o **item original** (não o proxy)
5. As notetags de custo do proxy definem as moedas daquela shop específica

## O que é Copiado do Original

- Nome
- Ícone
- Descrição de ajuda (help description)
- Detalhes de status

## O que NÃO é Copiado

- Notetags do item original
- Trading list do item original
- Quaisquer outras propriedades

## Restrições

- Proxy items **não podem ser adquiridos diretamente** — isso inclui:
  - Event commands (dar item)
  - Item drops de batalha
  - Equipamentos
- O proxy precisa ser do **mesmo tipo** do item original:
  - Item proxy → referencia Item
  - Weapon proxy → referencia Weapon
  - Armor proxy → referencia Armor
- **Requer** a versão mais recente do VisuMZ Items and Equips Core
- A janela `Window_ShopStatus` sempre mostra conteúdo do item original, não do proxy

## Exemplo Prático

```
Item 50: "Poção de Cura" (item original)
  - Custo normal: 50 gold

Item 51: "Poção de Cura (Proxy)" (item proxy)
  - Notetag: <Proxy: 50>
  - Notetag: <Item 10 Buy Cost: 3>
  → Na shop especial, custa 3x Erva Medicinal (Item 10)
  → Ao comprar, recebe Item 50 (Poção de Cura)
```

## Referência de Notetags

Ver [[../notetags/proxy-notetags.md|Proxy Notetags]] para a documentação completa das notetags.

# Plugin Parameters: Item Categories

Configuração de categorias de itens exibidas no Item Menu e Shop Menu (sell).

---

## Category List

Lista de categorias de itens exibidas nos menus.

### Tipos de Categoria

| Tipo | Descrição |
|------|-----------|
| AllItems, RegularItems, KeyItems | Categorias padrão |
| HiddenItemA, HiddenItemB | Itens ocultos |
| Consumable, Nonconsumable | Por consumibilidade |
| AlwaysUsable, BattleUsable, FieldUsable, NeverUsable | Por ocasião de uso |
| AllWeapons | Todas as weapons |
| WType:x | Weapons do tipo x |
| AllArmors | Todas as armors |
| AType:x | Armors do tipo x |
| EType:x | Equip Type x |
| Category:x | Categoria customizada via `<Category: x>` notetag |

### Propriedades por Categoria

| Propriedade | Descrição |
|-------------|-----------|
| Type | Tipo da categoria (ver tabela acima) |
| Icon | Icon index (0 = sem icon) |
| Visibility Switch | Switch que deve estar ON para mostrar (0 = sem requisito) |
| Sort By | Ordenação desta categoria |

---

## Style

| Opção | Descrição |
|-------|-----------|
| Text Only | Apenas texto |
| Icon Only | Apenas icon |
| Icon + Text | Icon primeiro, depois texto |
| Auto | Determina automaticamente baseado no tamanho da célula |

---

## Vocabulary

Nomes customizáveis para:
- Hidden Item A, Hidden Item B
- Consumable, Nonconsumable
- Always Usable, Battle Usable, Field Usable, Never Usable

---

## Veja Também

- [Notetags Gerais - Category](../notetags/gerais.md)
- [Item Menu Settings](./item-menu.md)

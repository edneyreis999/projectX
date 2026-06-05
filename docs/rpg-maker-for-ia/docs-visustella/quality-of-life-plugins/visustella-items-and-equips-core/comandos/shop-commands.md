# Plugin Commands: Shop

Comando de shop avançado como alternativa ao "Shop Processing" do editor.

---

## Shop: Advanced

Alternativa ao "Shop Processing" event command do editor, facilitando a criação de inventários de shop.

### Passos

| Passo | Descrição |
|-------|-----------|
| Step 1 | Item ID's - Selecionar ranges de Item IDs para adicionar |
| Step 2 | Weapon ID's - Selecionar ranges de Weapon IDs para adicionar |
| Step 3 | Armor ID's - Selecionar ranges de Armor IDs para adicionar |
| Step 4 | Purchase Only? - Tornar a loja apenas compra? |

### Opções

| Opção | Descrição |
|-------|-----------|
| Blacklist | Lista de categorias para excluir da loja. Usa `<Category: x>` |
| Whitelist | Lista de categorias para incluir na loja. Usa `<Category: x>` |

### Quando Usar

O "Shop Processing" event command do editor requer adicionar itens um de cada vez, tornando extremamente tedioso adicionar grandes quantidades. Este Plugin Command permite usar ID ranges para determinar quais itens disponibilizar.

### Aviso

**NÃO permite preços específicos por evento.**

---

## Veja Também

- [Shop Menu Notetags](../notetags/shop-menu.md)
- [Shop Menu Parameters](../parametros/shop-menu.md)

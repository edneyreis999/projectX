# Notetags: Item Accessibility

Controlam quando itens podem/não podem ser usados baseado em switches e código JavaScript.

---

## Switch-Based

### Enable Switches

```
<Enable Switch: x>
<Enable All Switches: x,x,x>
<Enable Any Switches: x,x,x>
```

- **Usado em**: Item
- `All`: item desabilitado até que TODOS os switches estejam ON → então habilitado
- `Any`: item habilitado se QUALQUER switch estiver ON → caso contrário desabilitado

### Disable Switches

```
<Disable Switch: x>
<Disable All Switches: x,x,x>
<Disable Any Switches: x,x,x>
```

- **Usado em**: Item
- `All`: item habilitado até que TODOS os switches estejam ON → então desabilitado
- `Any`: item desabilitado se QUALQUER switch estiver ON → caso contrário habilitado

---

## JavaScript: Item Accessibility

```
<JS Item Enable>
 code
 code
 enabled = code;
</JS Item Enable>
```

- **Usado em**: Item
- Determina o status habilitado via código JavaScript
- A variável `enabled` retorna boolean (true/false)
- Variáveis disponíveis:
  - `enabled` - resultado boolean
  - `user` - usuário do item
  - `item` - item sendo verificado
- Todas as outras condições do item devem ser atendidas para este código contar

### Nota sobre VisuStella Battle Core

Se o VisuStella Battle Core está instalado, itens com scope de batalha serão visíveis mesmo se desabilitados. Caso contrário, itens desabilitados para o único membro do party não aparecerão na lista.

---

## Veja Também

- [Notetags Gerais](./gerais.md)
- [Shop Menu Notetags](./shop-menu.md)

# Notetags: Item Accessibility

Controlam quando itens podem ou não ser usados baseado em switches e código JavaScript.

---

## Enable Switch

```
<Enable Switch: x>
<Enable All Switches: x,x,x>
<Enable Any Switches: x,x,x>
```

- **Uso**: Item Notetags
- Determina o status habilitado do item baseado em switches
- **All**: Item desabilitado até que TODAS as switches estejam ON, então habilitado
- **Any**: Item habilitado se QUALQUER switch estiver ON, caso contrário desabilitado

---

## Disable Switch

```
<Disable Switch: x>
<Disable All Switches: x,x,x>
<Disable Any Switches: x,x,x>
```

- **Uso**: Item Notetags
- **All**: Item habilitado até que TODAS as switches estejam ON, então desabilitado
- **Any**: Item desabilitado se QUALQUER switch estiver ON, caso contrário habilitado

---

## JS Item Enable

```
<JS Item Enable>
 code
 code
 enabled = code;
</JS Item Enable>
```

- **Uso**: Item Notetags
- Determina o status habilitado via código JavaScript
- A variável `enabled` retorna boolean (true/false)
- Variáveis disponíveis:
  - `user` - o usuário do item
  - `item` - o item sendo verificado
- Todas as outras condições do item devem ser atendidas para este código contar
- Se o Battle Core estiver instalado, items com scope de batalha serão visíveis mesmo se desabilitados

---

## Veja Também

- [notetags/gerais.md](gerais.md) - Notetags gerais
- [notetags/shop-menu.md](shop-menu.md) - Controle de visibilidade no shop

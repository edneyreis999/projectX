# Notetags — Hover Effect

## `<Visual Hover Effect>`

**Usável em**: Actor, Class, Weapon, Armor, Enemy, State Notetags

Cria um efeito de hover (flutuação) quando associado a um trait object.

```
<Visual Hover Effect>
 Base: x
 Speed: y
 Rate: z
 Death: case
</Visual Hover Effect>
```

### Parâmetros

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `Base` | número | Altura mínima acima do chão em pixels |
| `Speed` | número | Ajuste flat da velocidade de wobble. Valores baixos = mais rápido |
| `Rate` | número | Taxa de flutuação (bobbing up/down) |
| `Death` | `Hover` ou `Floor` | Comportamento ao morrer: continuar hover ou cair no chão |

Todos os parâmetros são opcionais — se omitidos, usam valores padrão.

### Exemplo

```
<Visual Hover Effect>
 Base: 100
 Speed: 20
 Rate: 5.0
 Death: floor
</Visual Hover Effect>
```

### Nota sobre Passive State Conditions

O efeito é cacheado para prevenir lag. Ao usar com Passive State Conditions, atualiza no próximo battler refresh cycle.

## Navegação

- [← State Notetags](states.md)
- [Breathing Notetags →](breathing.md)
- [Referência Rápida →](referencia-rapida.md)

# Notetags — Breathing Effect (Experimental)

> **AVISO**: Estas notetags são **EXPERIMENTAIS**. Há alta probabilidade de glitches gráficos. Use por sua conta e risco.

## `<Visual Breathing Effect>`

**Usável em**: Actor, Class, Weapon, Armor, Enemy, State Notetags

Cria um efeito de "respiração" (escala cíclica) no sprite do battler.

```
<Visual Breathing Effect>
 Speed: x
 Speed X: x
 Speed Y: x

 Rate: x.y
 Rate X: x.y
 Rate Y: x.y

 HP Link: On
 HP Link: Off
</Visual Breathing Effect>
```

### Parâmetros

| Parâmetro | Padrão | Descrição |
|-----------|--------|-----------|
| `Speed` | 10 | Duração de cada ciclo (aplica a ambos X e Y) |
| `Speed X` | 10 | Ciclo horizontal (sobrescreve Speed para X) |
| `Speed Y` | 10 | Ciclo vertical (sobrescreve Speed para Y) |
| `Rate` | X: 0.000, Y: 0.020 | Intensidade da distorção (aplica a ambos) |
| `Rate X` | 0.000 | Distorção horizontal (sobrescreve Rate para X) |
| `Rate Y` | 0.020 | Distorção vertical (sobrescreve Rate para Y) |
| `HP Link` | Off | Velocidade proporcional ao HP rate (menos HP = mais lento) |

Todos os parâmetros são opcionais — se omitidos, usam valores padrão.

### Exemplos

```
<Visual Breathing Effect>
 Speed: 10
 Rate Y: 0.050
 HP Link: On
</Visual Breathing Effect>

<Visual Breathing Effect>
 Speed X: 15
 Speed Y: 10
 Rate X: 0.01
 Rate Y: 0.050
</Visual Breathing Effect>
```

## `<No Breathing>`

**Usável em**: Actor, Class, Weapon, Armor, Enemy, State Notetags

Remove completamente qualquer efeito de breathing do battler.

### Nota sobre Passive State Conditions

O efeito é cacheado para prevenir lag. Ao usar com Passive State Conditions, atualiza no próximo battler refresh cycle.

## Navegação

- [← Hover Notetags](hover.md)
- [Referência Rápida →](referencia-rapida.md)

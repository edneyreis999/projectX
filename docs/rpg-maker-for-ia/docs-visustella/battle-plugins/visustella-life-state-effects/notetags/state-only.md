# Notetags: State-Only Effects

Estas notetags funcionam **apenas em States** (estados) do database.

## Auto Life

### Sintaxe
```
<Auto Life: x%>
```

### Parâmetros
- **x%**: Porcentagem do HP máximo a restaurar

### Onde Usar
- State Notetags (apenas)

### Como Funciona
1. Battler morre com o estado ativo
2. Estado se remove automaticamente
3. **Todos os estados** com `<Auto Life: x%>` são removidos
4. HP é restaurado em x% do HP máximo
5. Battler retorna ao combate

### Exemplos
```
<Auto Life: 50%>   # Revive com 50% HP
<Auto Life: 100%>  # Revive com HP cheio
<Auto Life: 25%>  # Revive com 25% HP
```

### Notas Importantes
- Apenas um Auto Life pode ser usado por morte
- Porcentagens maiores de estados múltiplos não se somam
- Baseado no HP máximo do battler

---

## Doom

### Sintaxe
```
<Doom>
```

### Onde Usar
- State Notetags (apenas)

### Como Funciona
1. Estado é aplicado ao battler
2. Timer do estado começa a contagem
3. Quando o timer expira **naturalmente**:
   - Battler recebe dano fatal
   - Battler morre

### Importante
- **Apenas** funciona quando expira naturalmente
- Remover o estado manualmente previne a morte
- Cura e outros efeitos não removem Doom

### Casos de Uso
```
# Morte em 5 turns (estado dura 5 turns)
<Doom>
```

---

## Extinct

### Sintaxe
```
<Extinct>
```

### Onde Usar
- State Notetags (apenas)

### Como Funciona
1. Quando aplicado, target não pode mais reviver
2. Efeito persiste enquanto estado estiver ativo
3. Remove estado para permitir reviver novamente

### Interactions
- **Suprime Auto Life**: Battler permanece morto
- **NÃO suprime Death Transformations**: Inimigos ainda se transformam
- Inimigos com Extinct ainda precisam ser derrotados

### Casos de Uso
```
# Prevenir Auto Life de boss
<Extinct>

# Prevenir reviver em batalha difícil
<Extinct>
```

### Dicas de Balanceamento
- Use com Doom para garantir morte
- Combine com estados que impedem cura
- Útil contra inimigos com Auto Life

---

## Comparativo: State-Only Effects

| Efeito | Gatilho | Resultado | Removível |
|--------|---------|-----------|-----------|
| Auto Life | Morte | Revive com x% HP | Sim (auto) |
| Doom | Expirar estado | Morte | Sim (manual) |
| Extinct | Aplicação | Bloqueia revive | Sim (manual) |

---

## Próximos Passos

- Veja [Trait-Object Effects](trait-objects.md) para efeitos em traits
- Consulte [Enemy-Only Effects](enemy-only.md) para inimigos
- Configure [Parâmetros](../parametros/configuracoes.md) para visuais

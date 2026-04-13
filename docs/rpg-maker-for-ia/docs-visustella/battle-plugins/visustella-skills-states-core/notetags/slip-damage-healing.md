# Notetags - Slip Damage & Healing

Slip Damage (damage over time) e Slip Healing customizados via JavaScript.

---

## JS Slip Damage

```
<JS type Slip Damage>
 code
 damage = code;
</JS type Slip Damage>
```

- **Usado em**: State Notetags
- `type` = HP, MP, ou TP
- Variáveis:
  - `user` - origem do state
  - `target` - unidade recebendo dano
  - `state` - state atual
  - `damage` - valor final do slip damage

### Comportamento de Cache
- States aplicados via **action effects**: cálculo é feito **uma vez** ao aplicar e cached
- **NÃO inclua** game mechanics (add states, buffs, etc.) aqui - apenas cálculos
- Para game mechanics, use VisuStella Battle Core: `<JS Pre-Regenerate>` e `<JS Post-Regenerate>`

### Exceções ao Cache
- **Passive States**: sempre recalculam
- States com `<JS Slip Refresh>`: sempre recalculam

---

## JS Slip Heal

```
<JS type Slip Heal>
 code
 heal = code;
</JS type Slip Heal>
```

- **Usado em**: State Notetags
- `type` = HP, MP, ou TP
- Mesmas regras de cache do Slip Damage
- Variáveis:
  - `user` - origem do state
  - `target` - unidade recebendo cura
  - `state` - state atual
  - `heal` - valor final do slip healing

---

## JS Slip Refresh

```
<JS Slip Refresh>
```

- **Usado em**: State Notetags
- Força recálculo dos valores de Slip Damage/Heal a cada regeneration phase
- Permite ranges de dano dinâmicos

---

## Popup Behavior

Slip Damage popups mostram **UM popup total** por tipo (HP, MP, TP) - o acumulado de todos os states/effects. **Isso não é um bug** - é comportamento intencional do vanilla RMMZ e da VisuStella.

---

## Exemplos Práticos

### Poison (5% MaxHP por turno)
```
<JS HP Slip Damage>
 damage = Math.floor(target.mhp * 0.05);
</JS HP Slip Damage>
```

### Regen (3% MaxHP)
```
<JS HP Slip Heal>
 heal = Math.floor(target.mhp * 0.03);
</JS HP Slip Heal>
```

### MP Drain (dano variável 10-30)
```
<JS MP Slip Damage>
 damage = Math.floor(Math.random() * 21) + 10;
</JS MP Slip Damage>
<JS Slip Refresh>
```

### TP Burn dinâmico (baseado no HP atual)
```
<JS TP Slip Damage>
 damage = Math.floor(target.hp * 0.02);
</JS TP Slip Damage>
<JS Slip Refresh>
```

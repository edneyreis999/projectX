# Notetags: Trait-Object Effects

Estas notetags funcionam em **Actor, Class, Skill, Weapon, Armor, Enemy e State** notetags.

## Curse Effects

### Sintaxe
```
<Curse HP>
<Curse MP>
<Curse TP>
```

### Onde Usar
- Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags

### Como Funciona
Cada variante bloqueia recuperação de um recurso específico:
- **Curse HP**: Bloqueia recuperação de HP
- **Curse MP**: Bloqueia recuperação de MP
- **Curse TP**: Bloqueia recuperação de TP

### Exemplos
```
# Em um State (Poison)
<Curse HP>

# Em um Weapon (Maldito)
<Curse MP>
<Curse TP>

# Em um Enemy (Boss sem cura)
<Curse HP>
```

### Interações
- Cura visual pode aparecer mas não recupera
- Funciona com todos os métodos de cura
- Pode ser combinado (Curse HP + Curse MP)

---

## Fragile

### Sintaxe
```
<Fragile>
```

### Onde Usar
- Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags

### Como Funciona
1. Battler recebe dano direto de HP
2. Se qualquer dano for causado:
   - Battler morre instantaneamente
   - Quantidade de dano não importa

### O que é "Dano Direto"
✅ **Aciona Fragile:**
- Ataques físicos/mágicos
- Skills que causam dano
- Items que causam dano

❌ **NÃO aciona Fragile:**
- Dano de eventos
- Dano de regeneração
- Dano de poison/damage-over-time

### Exemplos
```
# State: Vidraça quebradiça
<Fragile>

# Weapon: Espada de vidro
<Fragile>

# Skill: Vulnerabilidade
<Fragile>
```

### Casos de Uso
- High risk, high reward mechanics
- Armas/skills sacrificiais
- Estados de "vidro"

---

## Guts

### Sintaxe
```
<Guts>
```

### Onde Usar
- Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags

### Como Funciona
1. Battler receberia dano fatal
2. Dano é reduzido para deixar 1 HP
3. Battler sobrevive

### Exceção Crítica
Se battler já estiver com **1 HP**:
- Efeito não ativa
- Battler morre normalmente

### Exemplos
```
# State: Vontade de ferro
<Guts>

# Trait: Coragem
<Guts>

# Enemy: Boss teimoso
<Guts>
```

### Balanceamento
- Use com cooldown ou limiter
- Combina com Auto Life para 2° chance
- Útil para mechanics anime-style

---

## Undead

### Sintaxe
```
<Undead>
```

### Onde Usar
- Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags

### Como Funciona

#### 1. Cura → Dano
- Magias de cura causam dano
- Itens de cura causam dano
- Regeneração causa dano
- **Popup de cura pode aparecer, mas é dano**

#### 2. Morte → Cura
- Morte instantânea = HP completo
- Skills de "instant death" curam
- Efeito Death imediatamente cura

#### 3. Drain Invertido
- Efeitos de HP drain funcionam ao contrário
- Alvo drena HP do atacante

#### 4. Exceção: Elementos
- Se battler absorve elemento:
  - Ataques desse elemento curam normalmente
  - Permite "zombies absorvem escuridão"

### Exemplos
```
# Enemy: Zombie
<Undead>

# State: Maldição de vampiro
<Undead>

# Actor: Personagem morto-vivo
<Undead>
```

### Estratégias
- Use com magias de cura como ofensiva
- Elementos absorvidos ainda curam
- Combina com Allow Undead Regen

---

## Allow Undead Regen

### Sintaxe
```
<Allow Undead Regen>
```

### Onde Usar
- Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags

### Como Funciona
Override específico para Undead:
- Permite que regeneração **cure** em vez de causar dano
- Aplicado via trait object adicional (ex: state)
- Supera o efeito Undead para regeneração apenas

### Casos de Uso
```
# State: Regeneração permitida para Undead
<Allow Undead Regen>
```

### Interação com Undead
- Undead ativo: regeneração causa dano
- Allow Undead Regen adicionado: regeneração cura
- Útil para mechanics específicas

---

## Comparativo: Trait-Object Effects

| Efeito | Dano | Cura | Morte | Recuperação |
|--------|------|------|-------|-------------|
| Curse HP | - | ❌ | - | ❌ Bloqueia |
| Curse MP | - | - | - | ❌ Bloqueia |
| Curse TP | - | - | - | ❌ Bloqueia |
| Fragile | 💀 | - | - | - |
| Guts | ⚠️ | - | ❌ | - |
| Undead | 💀 | 💀 | ❤️ | - |

**Legenda:**
- 💀 = Causa morte
- ❤️ = Cura/previne morte
- ❌ = Bloqueia
- ⚠️ = Reduz para 1 HP

---

## Próximos Passos

- Veja [State-Only Effects](state-only.md) para efeitos exclusivos de states
- Consulte [Enemy-Only Effects](enemy-only.md) para inimigos
- Configure [Parâmetros](../parametros/configuracoes.md) para feedback visual

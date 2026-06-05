# Referência Rápida de Notetags

Índice completo de todas as notetags do Skills & States Core, organizadas por categoria e local de uso.

---

## Skills

### Gerais
| Notetag | Onde Usar | Arquivo Detalhado |
|---------|-----------|-------------------|
| `<Skill Type: x>` / `<Skill Types: x,x,x>` | Skill | [skills-gerais.md](skills-gerais.md) |
| `<List Name: name>` | Skill | [skills-gerais.md](skills-gerais.md) |
| `<ID Sort Priority: x>` | Skill | [skills-gerais.md](skills-gerais.md) |

### Custos
| Notetag | Onde Usar | Arquivo Detalhado |
|---------|-----------|-------------------|
| `<type Cost: x>` / `<type Cost: x%>` | Skill | [skill-costs.md](skill-costs.md) |
| `<type Cost Max: x>` / `<type Cost Min: x>` | Skill | [skill-costs.md](skill-costs.md) |
| `<type Cost: +x>` / `<type Cost: -x>` / `<type Cost: x%>` | Actor, Class, Weapon, Armor, Enemy, State | [skill-costs.md](skill-costs.md) |
| `<Custom Cost Text>` | Skill | [skill-costs.md](skill-costs.md) |
| `<JS type Cost>` | Skill | [skill-costs.md](skill-costs.md) |
| `<Item/Weapon/Armor Cost: x name>` | Skill | [skill-costs.md](skill-costs.md) |
| `<Replace Item/Weapon/Armor name1 Cost: name2>` | Actor, Class, Weapon, Armor, Enemy, State | [skill-costs.md](skill-costs.md) |

### Gauge
| Notetag | Onde Usar | Arquivo Detalhado |
|---------|-----------|-------------------|
| `<Replace HP/MP/TP Gauge: type>` | Class | [skills-gerais.md](skills-gerais.md) |

### Acessibilidade
| Notetag | Onde Usar | Arquivo Detalhado |
|---------|-----------|-------------------|
| `<Hide in Battle>` / `<Hide outside Battle>` | Skill | [skill-accessibility.md](skill-accessibility.md) |
| `<Show/Hide Switch: x>` | Skill | [skill-accessibility.md](skill-accessibility.md) |
| `<Show/Hide if learned Skill: x>` | Skill | [skill-accessibility.md](skill-accessibility.md) |
| `<Show/Hide if has Skill: x>` | Skill | [skill-accessibility.md](skill-accessibility.md) |
| `<Enable/Disable Switch: x>` | Skill | [skill-accessibility.md](skill-accessibility.md) |
| `<JS Skill Visible>` | Skill | [skill-accessibility.md](skill-accessibility.md) |
| `<JS Skill Enable>` | Skill | [skill-accessibility.md](skill-accessibility.md) |

---

## States

### Gerais
| Notetag | Onde Usar | Arquivo Detalhado |
|---------|-----------|-------------------|
| `<No Death Clear>` | State | [states-gerais.md](states-gerais.md) |
| `<No Recover All Clear>` | State | [states-gerais.md](states-gerais.md) |
| `<Group Defeat>` | State | [states-gerais.md](states-gerais.md) |
| `<Reapply Rules: Ignore/Reset/Greater/Add>` | State | [states-gerais.md](states-gerais.md) |
| `<Positive State>` / `<Negative State>` | State | [states-gerais.md](states-gerais.md) |
| `<Category: name>` | State | [states-gerais.md](states-gerais.md) |
| `<Hide State Turns>` | State | [states-gerais.md](states-gerais.md) |
| `<Turn Color: x>` | State | [states-gerais.md](states-gerais.md) |
| `<Max Turns: x>` | State | [states-gerais.md](states-gerais.md) |

### Interações Skill/Item → State
| Notetag | Onde Usar | Arquivo Detalhado |
|---------|-----------|-------------------|
| `<Bypass State Damage Removal: id>` | Skill, Item | [states-gerais.md](states-gerais.md) |
| `<Bypass State Damage Removal as Attacker: id>` | Actor, Class, Weapon, Armor, Enemy, State | [states-gerais.md](states-gerais.md) |
| `<Bypass State Damage Removal as Target: id>` | Actor, Class, Weapon, Armor, Enemy, State | [states-gerais.md](states-gerais.md) |
| `<Resist State Category: name>` | Actor, Class, Weapon, Armor, Enemy, State | [states-gerais.md](states-gerais.md) |
| `<State x Category Remove: y>` | Skill, Item | [states-gerais.md](states-gerais.md) |
| `<Remove Other x States>` | State | [states-gerais.md](states-gerais.md) |
| `<State id/name Turns: +/-x>` / `<Set State id/name Turns: x>` | Skill, Item | [states-gerais.md](states-gerais.md) |
| `<param Buff/Debuff Turns: +/-x>` | Skill, Item | [states-gerais.md](states-gerais.md) |

### JS On Add/Erase/Expire
| Notetag | Onde Usar | Arquivo Detalhado |
|---------|-----------|-------------------|
| `<JS On Add/Erase/Expire State>` | State | [states-gerais.md](states-gerais.md) |

### Slip Damage/Healing
| Notetag | Onde Usar | Arquivo Detalhado |
|---------|-----------|-------------------|
| `<JS type Slip Damage>` | State | [slip-damage-healing.md](slip-damage-healing.md) |
| `<JS type Slip Heal>` | State | [slip-damage-healing.md](slip-damage-healing.md) |
| `<JS Slip Refresh>` | State | [slip-damage-healing.md](slip-damage-healing.md) |

### Passive States
| Notetag | Onde Usar | Arquivo Detalhado |
|---------|-----------|-------------------|
| `<Passive State: x>` | Actor, Class, Skill, Weapon, Armor, Enemy | [passive-states.md](passive-states.md) |
| `<Passive Stackable>` | State | [passive-states.md](passive-states.md) |
| `<Passive Condition Class: id>` | State | [passive-states.md](passive-states.md) |
| `<Passive Condition Multiclass: id>` | State | [passive-states.md](passive-states.md) |
| `<Passive Condition Switch ON/OFF: x>` | State | [passive-states.md](passive-states.md) |
| `<JS Passive Condition>` | State | [passive-states.md](passive-states.md) |

### Aura & Miasma
| Notetag | Onde Usar | Arquivo Detalhado |
|---------|-----------|-------------------|
| `<Aura State: x>` | Actor, Class, Skill, Weapon, Armor, Enemy | [aura-miasma.md](aura-miasma.md) |
| `<Miasma State: x>` | Actor, Class, Skill, Weapon, Armor, Enemy | [aura-miasma.md](aura-miasma.md) |
| `<Not User Aura>` | Actor, Class, Skill, Weapon, Armor, Enemy, State | [aura-miasma.md](aura-miasma.md) |
| `<Allow Dead Aura/Miasma>` | Actor, Class, Skill, Weapon, Armor, Enemy, State | [aura-miasma.md](aura-miasma.md) |
| `<Dead Aura/Miasma Only>` | Actor, Class, Skill, Weapon, Armor, Enemy, State | [aura-miasma.md](aura-miasma.md) |

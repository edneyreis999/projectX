# Notetags - Referencia Rapida

Todas as notetags do Aggro Control System em uma unica referencia.

## Provoke

| Notetag | Onde Usa | Efeito |
|---------|----------|--------|
| `<Provoke>` | State | State causa provoke no alvo |
| `<Provoke Height Origin: x%>` | Actor, Enemy | Altura da origem da linha visual |
| `<Bypass Provoke>` | Actor, Class, Weapon, Armor, Enemy, State, Skill, Item | Ignora provoke |

## Taunt

| Notetag | Onde Usa | Efeito |
|---------|----------|--------|
| `<Taunt>` / `<All Taunt>` | Actor, Class, Weapon, Armor, Enemy, State | Taunt todos os tipos |
| `<Physical Taunt>` | Actor, Class, Weapon, Armor, Enemy, State | Taunt apenas fisico |
| `<Magical Taunt>` | Actor, Class, Weapon, Armor, Enemy, State | Taunt apenas magico |
| `<Certain Taunt>` | Actor, Class, Weapon, Armor, Enemy, State | Taunt apenas certain hit |
| `<Bypass Taunt>` | Actor, Class, Weapon, Armor, Enemy, State, Skill, Item | Ignora taunt |

## Aggro (Simples)

| Notetag | Onde Usa | Efeito | Frequencia |
|---------|----------|--------|------------|
| `<User Aggro: +x>` | Skill, Item | +x aggro ao usuario | 1x por uso |
| `<User Aggro: -x>` | Skill, Item | -x aggro do usuario | 1x por uso |
| `<Target Aggro: +x>` | Skill, Item | +x aggro ao alvo | Por hit |
| `<Target Aggro: -x>` | Skill, Item | -x aggro do alvo | Por hit |
| `<Aggro: +x>` | Actor, Class, Weapon, Armor, Enemy, State | +x aggro passivo | Passivo |
| `<Aggro: -x>` | Actor, Class, Weapon, Armor, Enemy, State | -x aggro passivo | Passivo |
| `<Aggro Multiplier: x%>` | Actor, Class, Weapon, Armor, Enemy, State | Multiplica aggro percebido | Passivo (multiplicativo) |

## Aggro (Targeting)

| Notetag | Onde Usa | Efeito |
|---------|----------|--------|
| `<Target Highest Aggro>` | Actor, Class, Skill, Item, Weapon, Armor, Enemy, State | Forca focar maior aggro |
| `<Bypass Highest Aggro>` | Actor, Class, Skill, Item, Weapon, Armor, Enemy, State | Ignora "sempre maior", usa peso |

## Aggro (JavaScript)

| Notetag | Onde Usa | Efeito | Frequencia |
|---------|----------|--------|------------|
| `<JS User Aggro>...</JS User Aggro>` | Skill, Item | JS para aggro do usuario | 1x por uso |
| `<JS Target Aggro>...</JS Target Aggro>` | Skill, Item | JS para aggro do alvo | Por hit |

## Trait Objects Suportados

| Notetag Type | Actor | Class | Weapon | Armor | Enemy | State | Skill | Item |
|-------------|-------|-------|--------|-------|-------|-------|-------|------|
| Bypass Provoke | x | x | x | x | x | x | x | x |
| Taunt types | x | x | x | x | x | x | - | - |
| Bypass Taunt | x | x | x | x | x | x | x | x |
| User Aggro | - | - | - | - | - | - | x | x |
| Target Aggro | - | - | - | - | - | - | x | x |
| Aggro passivo | x | x | x | x | x | x | - | - |
| Aggro Multiplier | x | x | x | x | x | x | - | - |
| Target Highest Aggro | x | x | x | x | x | x | x | x |
| Bypass Highest Aggro | x | x | x | x | x | x | x | x |
| JS User Aggro | - | - | - | - | - | - | x | x |
| JS Target Aggro | - | - | - | - | - | - | x | x |
| Provoke | - | - | - | - | - | x | - | - |
| Provoke Height | x | - | - | - | x | - | - | - |

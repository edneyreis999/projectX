# Skills & States Core - VisuStella MZ - Full Index

## Sumário

Este documento serve como índice amplo da documentação catalogada do VisuStella Skills & States Core, plugin Tier 1 para RPG Maker MZ (v1.48, December 2024, por Team VisuStella: Yanfly, Arisu, Olivia, Irina).

O plugin estende e aprimora as funcionalidades nativas de skills, states, buffs e debuffs do RPG Maker MZ, adicionando suporte a múltiplos skill types, custom skill cost types (HP, Gold, Items), passive states com condições, auras/miasmas, slip damage/healing via JavaScript, e controle granular de visibilidade/acessibilidade de skills.

---

## Conceitos

### visao-geral.md
Dados do plugin (Tier 1, RMMZ), lista completa de funcionalidades (skills, states, passives, buffs, slip damage), mapa das seções da documentação com links, e ordem de leitura recomendada.

### mudancas-core.md
6 mudanças hard-coded no comportamento RMMZ:
1. Action End Removal - atualiza por ação individual (não action set); states com Cannot Move são auto-convertidos para Turn End
2. Buff/Debuff Level Management - removidos ao atingir nível neutro, turn counter resetado
3. Skill Costs - todos custos via Plugin Parameters, múltiplos custos exibidos, nome do custo visível
4. Sprite Gauges - customizáveis via Skill Cost Types
5. State Displays - getStateDisplay/setStateDisplay/clearStateDisplay script calls
6. Window Functions - movidas de Window_StatusBase/SkillList para Window_Base
Inclui nota sobre Slip Damage Popup (total acumulado, não individual).

### passive-states-explicacao.md
Esclarece confusão comum: passive states são "indiretos" (como skills temporárias via trait), não detectados por isStateAffected(), não removidos por eraseState/removeState, sem turnos/steps/removal conditions. Tabela comparativa completa. Limitações de JS Passive Condition (failsafes contra loops). Comportamento de cache com Slip Damage. Fluxo de verificação de condições.

---

## Notetags

### skills-gerais.md
- Skill Types múltiplos: `<Skill Types: x,x,x>`
- List Name: `<List Name: name>` com \V[x]
- ID Sort Priority: `<ID Sort Priority: x>` (default 50)
- Gauge Replacement: `<Replace HP/MP/TP Gauge: type>` (Class only)

### skill-costs.md
- Custo de recurso: `<type Cost: x/x%>` (Skill)
- Min/Max: `<type Cost Max/Min: x>` (Skill)
- Modificadores: `<type Cost: +/-x/x%>` (Trait objects, % antes de +/-)
- Custom Cost Text
- JS Cost: `<JS type Cost>` com variáveis user/skill
- Item/Weapon/Armor Cost: `<Item Cost: x name>`
- Item Cost Min/Max
- Item Cost Modifiers (Trait objects)
- Item Cost Replacement: `<Replace Item name1 Cost: name2>`

### skill-accessibility.md
- Battle context: Hide in Battle / Hide outside Battle
- Switch Show/Hide (All/Any variants)
- Learned Skill Show/Hide (não detecta trait skills)
- Has Skill Show/Hide (detecta trait skills)
- Enable/Disable Switch
- JS Skill Visible / JS Skill Enable

### states-gerais.md
- No Death Clear / No Recover All Clear / Group Defeat
- Reapply Rules: Ignore/Reset/Greater/Add
- Positive/Negative State + Categories
- Bypass State Damage Removal (3 variants: Skill/Item, Attacker, Target)
- Resist State Category
- State Category Remove (Skill/Item)
- Remove Other Category States
- Hide State Turns / Turn Color / Max Turns
- State Turns manipulation (+/-/Set para state e buff/debuff)
- JS On Add/Erase/Expire State

### slip-damage-healing.md
- `<JS type Slip Damage/Heal>` com variáveis user/target/state/damage(heal)
- Cache behavior: one-time calc (exceto passives e JS Slip Refresh)
- `<JS Slip Refresh>` para recálculo dinâmico
- Exemplos práticos: Poison, Regen, MP Drain, TP Burn

### passive-states.md
- `<Passive State: x>` (Actor, Class, Skill, Weapon, Armor, Enemy)
- `<Passive Stackable>`
- Passive Condition Class / Multiclass
- Passive Condition Switch ON/OFF (All/Any)
- `<JS Passive Condition>` com limitações documentadas
- Script calls: getStateDisplay/setStateDisplay/clearStateDisplay

### aura-miasma.md
- Aura State (aliados) / Miasma State (oponentes, não aplica fora de battle)
- Not User Aura (excluir emissor)
- Allow Dead Aura/Miasma (continua emitindo quando morto)
- Dead Aura/Miasma Only (só emite quando morto)
- Exemplos: Paladin Aura, Poison Miasma, Vengeance Aura, Selfless Aura

### referencia-rapida.md
Índice tabular de TODAS as notetags, organizadas por: Skills (Gerais, Custos, Gauge, Acessibilidade), States (Gerais, Interações, JS On Add/Erase/Expire, Slip, Passives, Aura/Miasma). Cada entrada com notetag, onde usar, e link para arquivo detalhado.

---

## Comandos Plugin

### skill-cost.md
- Emulate Actor Pay: Actor ID(s) + Skill ID
- Emulate Enemy Pay: Enemy Index(es) + Skill ID

### state-turns.md
- Actor/Enemy State Turns Change By (relativo, suporta JS)
- Actor/Enemy State Turns Change To (absoluto, suporta JS)
- Auto-Add State option em todos

---

## Parâmetros

### skill-settings.md
General (Updated Layout, Layout Style), Skill Type Window (Style, Width), List Window (Columns), Shop Status Window (Show, Adjust, Background, JS dimensions), Skill Types (Hidden, Icons, Sort), Global JS (Skill Conditions)

### skill-cost-types.md
Settings (Name, Icon, Font Color/Size), Cost Processing (JS Calculation, Can Pay, Paying), Window Display (Show, Text), Gauge Display (Max, Current, Draw). Tipos: HP, MP, TP, Gold, Potion, Item Cost.

### gauge-settings.md
Labels (Font Type, Match Color, Outline) e Values (Font Type, Outline)

### state-settings.md
General (Reapply Rules, Max Turns, Action End Update, Turn End on Map), Turn Display (Show, Font, Offsets, Colors), Data Display (Show, Font, Offsets), Global JS (On Add/Erase/Expire State)

### buff-debuff-settings.md
General (Reapply Rules, Max Turns), Stacking (Max Stacks Buff/Debuff, JS Rate), Turn Display, Rate Display, Global JS (On Add/Erase/Expire Buff/Debuff)

### passive-state-settings.md
List (Global, Actor-Only, Enemy Passives), Cache (Switch/Variable Refresh - default false), Global JS (Condition Check)

---

## Referência

### requisitos-e-termos.md
Requisitos (RMMZ, Tier 1), plugins opcionais compatíveis, Terms of Use (6 cláusulas), Credits (Team VisuStella)

### changelog.md
Histórico v1.00 (Aug 2020) a v1.48 (Dec 2024). Destaques: Aura/Miasma (v1.48), Item Costs (v1.38), Plugin Commands (v1.43), Gauge Settings (v1.34), Passive State fixes (v1.44), Slip Refresh (v1.27).

### troubleshooting.md
Soluções para: passive states não detectados, skill cost limits, state Action End, slip damage popups, plugin parameter updates, lag spikes, compatibilidade RMMZ 1.3.3.

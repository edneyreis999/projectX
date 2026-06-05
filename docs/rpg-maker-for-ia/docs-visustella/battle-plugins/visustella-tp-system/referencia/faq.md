# FAQ - Enhanced TP System

Perguntas frequentes e troubleshooting.

---

## Configuração Básica

### Como criar um TP Mode customizado?

1. Vá em Plugin Parameters > TP Modes
2. Clique em "Add" ou copie um mode existente
3. Configure:
   - TP Mode Name (nome único)
   - MaxTP Formula
   - Preserve TP?
   - Fórmulas de ganho (veja [Fórmulas de TP](../parametros/formulas.md))

### Como fazer TP persistir entre batalhas?

Configure `Preserve TP? = true` no TP Mode.

**Nota:** Isto sobrescreve o trait "Preserve TP" do database.

Veja [Mudanças no Core](../conceitos/mudancas-core.md#preserve-tp).

### Como mudar MaxTP?

Use `MaxTP Formula` no TP Mode:

- `100` → Fixo 100
- `user.level * 10` → Baseado em level
- `user.hp + user.mp` → HP + MP

---

## Notetags e Plugin Commands

### Como mudar TP Mode durante batalha?

**Via Plugin Command:**
```
Plugin Command > Actor: Change TP Mode
Actor ID(s): 1
TP Mode Name: Berserker
```

**Via Skill/Item Notetag:**
```
<Change User TP Mode: Berserker>
<Change Target TP Mode: Cautious>
```

### Como desbloquear TP Modes para actors?

**Via Plugin Command:**
```
Plugin Command > Actor: Unlock TP Mode
Actor ID(s): 1
TP Modes: Berserker
```

**Via Skill/Item Notetag:**
```
<Unlock TP Mode: Berserker>
```

**Via Skill Learning:**
```
<Learn TP Mode: Berserker>
```

### Qual a diferença entre Learn e Unlock?

| Learn | Unlock |
|-------|--------|
| Requer aprender skill | Não requer aprender |
| Via skill only | Via skill ou item |
| Notetag em skill | Notetag em skill/item |

Veja [Notetags para Atores](../notetags/atores.md#diferença-learn-vs-unlock).

---

## Fórmulas e Ganho de TP

### Como fazer TP ganhar mais rápido?

Use `TCR Multiplier` no TP Mode:

- `1.0` = Normal
- `2.0` = Dobro
- `0.5` = Metade

Stacking com TCR trait: `1.5 * 1.5 = 2.25` (225%).

### Fórmula retornando NaN ou erro?

**Versão 1.15+:** Fórmulas inválidas retornam 0 e mostram erro no console indicando:
- Qual actor
- Qual mode
- Qual fórmula está com problema

**Common fixes:**
- Check syntax JavaScript
- Verify variable names (`user`, `value`)
- Test com fórmulas simples primeiro

### Como ajustar ganho de TP ao receber dano?

Use `Take HP Damage` formula:

```
value / 10  → 10% do dano
Math.max(1, value / 20)  → Mínimo 1 TP
```

Veja [Fórmulas de TP](../parametros/formulas.md#seção-hp-damage).

---

## Visual e Interface

### Como fazer o gauge piscar?

1. Configure Gauge no TP Mode:
   - Flash Gauge? = true
   - Required Rate = 0.75 (75%)
   - Flash Speed = 10
   - Color Lightness = 120

2. Requer VisuMZ_1_SkillsStatesCore

### Como mudar cores do gauge?

Use `Custom Color 1` e `Custom Color 2`:

```
Custom Color 1: #ff4444  (vermelho claro)
Custom Color 2: #aa0000  (vermelho escuro)
```

**Nota:** Isto só afeta o gauge visual, não cores de custo de skills.

### Como esconder seleção de TP Mode?

**Via Plugin Parameter:**
- Plugin Parameters > General Settings > Scene_Skill
- Show TP Mode? = false

**Via Plugin Command:**
```
Plugin Command > System: Show/Hide TP Mode
Show TP Mode?: false
```

---

## Enemies

### Enemies podem ter TP Modes?

Sim! Use notetags:

```
<TP Mode: Cautious>
<Force TP Mode: Berserker>  (via State)
```

**Plugin Command:**
```
Enemy: Change TP Mode
Enemy Index(es): 0
TP Mode Name: Aggressive
```

Veja [Comandos de Inimigos](../comandos/inimigos.md).

### Como desbloquear TP Modes para enemies?

**Não é possível.** Enemies usam um TP Mode fixo.

**Workaround:** Mude mode via Plugin Command durante batalha.

---

## Troubleshooting

### TP não está aparecendo

**Checklist:**
1. Plugin está ON?
2. TP Mode está configurado?
3. MaxTP Formula > 0?
4. Gauge está visível no UI?

### TP Mode não aparece no Scene_Skill

**Checklist:**
1. Show TP Mode? = true (General Settings ou Plugin Command)
2. Actor tem TP Modes em sua lista? (Starting TP Modes ou unlocked)
3. Scene_Skill integration funcionando?

### Fórmulas não funcionando

**Debug:**
1. Test com fórmula simples: `10`
2. Check console para erros (v1.15+)
3. Verify que você está editando o TP Mode correto
4. Verify que `user` e `value` estão sendo usados corretamente

### Gauge não piscando

**Requisitos:**
- VisuMZ_1_SkillsStatesCore instalado
- Flash Gauge? = true
- TP ≥ Required Rate
- Colors configuradas (Custom Color 1/2 ou defaults)

---

## Compatibilidade

### Qual a ordem correta dos plugins?

```
0: VisuMZ_0_CoreEngine
1: VisuMZ_1_SkillsStatesCore (opcional, para flash)
2: VisuMZ_2_EnhancedTPSystem  ← Este plugin
3-5: Outros plugins VisuStella
```

**Regra:** Lower tier numbers primeiro. Tier 2 vai depois de 0 e 1.

### Conflitos com outros plugins

**Possíveis conflitos:**
- Plugins que alteram MaxTP
- Plugins que mudam Preserve TP
- Plugins que modificam Sprite_Gauge (TP gauge)

**Solução:** Reportar issues no site VisuStella.

---

## Documentação Relacionada

- [Glossário](glossario.md) - Termos técnicos
- [Visão Geral](../conceitos/visao-geral.md) - Recursos do plugin
- [Mudanças no Core](../conceitos/mudancas-core.md) - Alterações no RPG Maker

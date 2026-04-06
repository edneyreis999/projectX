# VisuMZ_3_BattleAI: Guia de Padrões de Ações

> **⚠️ REGRA DE OURO**: Tags sem prefixo `<JS` NÃO suportam JavaScript customizado. Use APENAS condições estritamente documentadas em [[VisuMZ_3_BattleAI.js:341-555]](../../../../frontend/js/plugins/VisuMZ_3_BattleAI.js#L341-L555).

## 1. Condições Nativas vs JavaScript

### 1.1 `<All AI Conditions>` / `<Any AI Conditions>`

**Aceitam APENAS sintaxe nativa pré-definida.**

> 💡 **Por que essa limitação existe?** Tags nativas são processadas por um parser otimizado muito mais performático que executar código JavaScript. Em cada turno de batalha, a IA avalia múltiplas condições múltiplas vezes - usar JS para tudo causaria lag.

```xml
<!-- ✅ CORRETO -->
<All AI Conditions>
  user team alive members >= 3
  user Not ATK Buff
  Target Has State 61
</All AI Conditions>

<!-- ❌ ERRADO - JavaScript NÃO funciona aqui -->
<All AI Conditions>
  $gameTroop.members().filter(...) >= 3
</All AI Conditions>
```

**Comparadores suportados**: `>=`, `>`, `===`, `!==`, `<`, `<=`

**Keywords disponíveis** (prefixar com `user` para aplicar ao caster):
- `HP%`, `MP%`, `TP%`, `MaxHP`, `MaxMP`, `MaxTP`
- `Level`, `ATK`, `DEF`, `MAT`, `MDF`, `AGI`, `LUK`
- `param Buff Stacks`, `param Debuff Stacks` (param = ATK/DEF/MAT/MDF/AGI/LUK)
- `param Buff Turns`, `param Debuff Turns`
- `State id Turns`, `State name Turns`
- `Element id Rate`, `Element name Rate`
- `Team Alive Members`, `Team Dead Members`

**Condições especiais**:
- `Always`
- `x% Chance`
- `Switch x On/Off`
- `User/Target is Actor/Enemy`
- `User/Target Has/Not State id`
- `User/Target Has/Not param Buff`
- `User/Target Has/Not param Max Buff`

**Exemplos de condições nativas válidas**:
```xml
<!-- HP threshold -->
user HP% <= 0.50
Target HP% < 0.25

<!-- Parameter checks -->
user ATK >= 100
Target DEF < 50

<!-- Buff/Debuff checks -->
user Has ATK Buff
Target Not MAT Debuff

<!-- State checks -->
Target Has State 4
user Not State 61

<!-- Team checks -->
user team alive members >= 3
Target team dead members === 0

<!-- Turn/State duration -->
State 5 Turns >= 2
user ATK Buff Turns === 1
```

Documentação completa: [[VisuMZ_3_BattleAI.js:382-555]](../../../../frontend/js/plugins/VisuMZ_3_BattleAI.js#L382-L555)

### 1.2 `<JS Skill Enable>`

**Workaround para lógica não suportada nativamente.**

```javascript
<JS Skill Enable>
  var minions = $gameTroop.members().filter(function(e) {
    return e.isEnemy() && e._isMinionEsporo && e.isAlive();
  });
  enabled = minions.length < 4;
</JS Skill Enable>
```

**Regras**:
- Deve definir variável `enabled` (boolean)
- Acesso total a APIs do jogo (`$gameTroop`, `$gameVariables`, `$gameSwitches`)
- Usar para: contagens específicas, lógica OR complexa, flags customizadas

## 2. Estudo de Caso: Boss Pestesporo (Enemy 28)

### Skill 37 - Atk Up

**Requisito**: Buffar se time >= 3 E não tiver buff ATK

**Solução**: Condições nativas suficientes

```xml
<All AI Conditions>
  user team alive members >= 3
  user Not ATK Buff
</All AI Conditions>
```

### Skill 40 - Catalisar Esporo

**Requisito**: Usar se HP <= 50% E alvo não tiver DOOM

**Solução**: Condições nativas suficientes

```xml
<All AI Conditions>
  user hp% <= 0.50
  Target Not State 61
</All AI Conditions>
```

### Skill 36 - Invocar Esporos

**Requisito**: Invocar se < 4 minions específicos

**Solução**: **NÃO existe condição nativa** para contar inimigos específicos

```xml
<JS Skill Enable>
  var minions = $gameTroop.members().filter(function(e) {
    return e.isEnemy() && e._isMinionEsporo && e.isAlive();
  });
  enabled = minions.length < 4;
</JS Skill Enable>
```

### Skill 41 - Catalisar Colônia

**Requisito**: Usar se HP <= 20%, time >= 3, E nenhum minion com DOOM

**Solução**: Híbrido (nativo + JS)

```xml
<All AI Conditions>
  user hp% <= 0.20
  user team alive members >= 3
</All AI Conditions>

<JS Skill Enable>
  var doomedMinions = $gameTroop.members().filter(function(e) {
    return e.isEnemy() && e._isMinionEsporo && e.isAlive() && e.isStateAffected(61);
  });
  enabled = doomedMinions.length === 0;
</JS Skill Enable>
```

**Vantagem híbrida**: Plugin verifica condições nativas primeiro (performático), só executa JS se nativas passarem.

## 3. Fluxo de Decisão

```
┌─────────────────────────────────────┐
│ Preciso criar condição para skill?  │
└──────────────┬──────────────────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Ler documentação     │
    │ Linhas 341-555       │
    └──────────┬───────────┘
               │
               ▼
      ┌────────────────┐
      │ Existe nativa? │
      └──┬─────────┬───┘
         │SIM      │NÃO
         ▼         ▼
    ┌─────────┐  ┌──────────────────┐
    │ Usar    │  │ <JS Skill Enable>│
    │ <All/   │  │ como workaround  │
    │  Any>   │  └──────────────────┘
    └─────────┘
```

## 4. Referências

- **Documentação oficial**: [[VisuMZ_3_BattleAI.js:341-555]](../../../../frontend/js/plugins/VisuMZ_3_BattleAI.js#L341-L555)
- **Lista de condições**: [[VisuMZ_3_BattleAI.js:382-555]](../../../../frontend/js/plugins/VisuMZ_3_BattleAI.js#L382-L555)
- **Notas sobre JavaScript**: [[VisuMZ_3_BattleAI.js:446-453]](../../../../frontend/js/plugins/VisuMZ_3_BattleAI.js#L446-L453)

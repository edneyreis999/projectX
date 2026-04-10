# Troubleshooting - Life State Effects

## Problemas Comuns

### Auto Life Não Funciona

#### Sintoma
Battler morre mas não revive.

#### Soluções Possíveis
1. **Verifique se o state está ativo**: O state com `<Auto Life: x%>` deve estar aplicado antes da morte
2. **Confirme a porcentagem**: Use `<Auto Life: 50%>` (não `<Auto Life: 50>` ou `<Auto Life: 0.5>`)
3. **Check plugin ordem**: Life State Effects deve estar abaixo de Battle Core e SkillsStatesCore

#### Debug
```javascript
// No console do browser durante batalha:
$gameActors.actor(1).states()  // Ver states ativos no Actor 1
```

---

### Doom Não Mata

#### Sintoma
Estado expira mas battler não morre.

#### Soluções Possíveis
1. **Confirme expiração natural**: Doom **não** funciona se o state for removido manualmente
2. **Verifique conflito**: Alguns plugins podem interferir com death effects
3. **Check Immortal**: Se battler tem immortal flag, pode não morrer

#### Causas Comuns
- State sendo removido por skill/item antes de expirar
- Plugin conflitante manipulando death
- Boss com mecanic especial de death prevention

---

### Undead Não Inverte Cura

#### Sintoma
Magias de cura ainda curam em vez de causar dano.

#### Soluções Possíveis
1. **Verifique aplicação**: `<Undead>` deve estar em um trait object ativo
2. **Check Allow Undead Regen**: Se presente, regeneração curará normalmente
3. **Confira ordem de traits**: Traits de weapons/armors podem ter ordem diferente

#### Casos Especiais
- **Elementos absorvidos**: Se battler absorve elemento, cura funciona normalmente
- **Allow Undead Regen**: Override para regeneração especificamente

---

### Fragile Não Funciona

#### Sintoma
Battler com Fragile não morre ao receber dano.

#### Soluções Possíveis
1. **Verifique tipo de dano**: Fragile apenas funciona com **direct damage**
2. **Confirme source**: Damage por eventos, regeneração ou DoT não aciona Fragile
3. **Check dano zero**: Se não houver dano de HP, Fragile não ativa

#### O que NÃO é Direct Damage
❌ Damage por evento (Battle Event > Change HP)
❌ Damage por regeneração negativa
❌ Damage por poison/burn (DoT)

✅ Skills que causam dano
✅ Items que causam dano
✅ Contra-ataques

---

### Guts Não Ativa

#### Sintoma
Battler recebe dano fatal mas morre anyway.

#### Soluções Possíveis
1. **Confira HP atual**: Se battler já tem 1 HP, Guts não ativa
2. **Verifique tipo de dano**: Dano por eventos pode bypass Guts
3. **Check plugin conflitos**: Plugins que alteram damage calculation

#### Exemplo
```
Turn 1: Battler tem 50 HP
Turn 1: Recebe 100 damage → Guts ativa → HP fica 1
Turn 2: Battler tem 1 HP
Turn 2: Recebe 10 damage → Guts NÃO ativa → Morre
```

---

### Death Transform Não Ocorre

#### Sintoma
Inimigo morre mas não se transforma.

#### Soluções Possíveis
1. **Verifique nome**: Nome do enemy deve ser **exato** do database
2. **Check notetag location**: `<Death Transform>` vai no enemy **original**
3. **Confirme weights**: Se usar weights, sintaxe deve estar correta

#### Sintaxe Correta
```
<Death Transform>
Slime: 75
Goblin: 25
</Death Transform>
```

❌ **Errado**:
```
<Death Transform Slime: 75>
<Death Transform: Slime>
```

---

### Animação Não Toca

#### Sintoma
Animação configurada não aparece.

#### Soluções Possíveis
1. **Verifique Core Engine**: Animation requer **VisuMZ_0_CoreEngine**
2. **Confirme Animation ID**: ID deve existir no database
3. **Check notetag location**: `<Transform Animation: x>` vai no **ALVO** da transformação

#### Teste
1. Instale Core Engine
2. Use animação simples (ID: 45 = heal)
3. Teste com Death Transform básico

---

### Popup Não Aparece

#### Sintoma
Nenhum popup visual quando efeito ativa.

#### Soluções Possíveis
1. **Verifique Text**: Deve haver texto configurado
2. **Confirme Text Color**: Use `0` ou `#rrggbb` (não vazio)
3. **Check Flash Color**: Formato deve ser `[r, g, b, a]`

#### Formatos Corretos
```
Text: "AUTO LIFE"          ✅
Text Color: #00ff00        ✅
Text Color: 0              ✅
Flash Color: [0, 255, 0, 128]  ✅
```

❌ **Errado**:
```
Text:                     ❌ (vazio)
Text Color:               ❌ (vazio)
Flash Color: 0,255,0,128  ❌ (sem colchetes)
```

---

## Conflitos Conhecidos

### Plugins que Manipulam Death

**Plugins que podem conflitar:**
- Auto Life plugins de outros developers
- Death manipulation plugins
- HP manipulation plugins

**Solução:** Ajuste ordem de plugins para Life State Effects ter prioridade.

### Plugins de Regeneração

**Plugins que podem conflitar:**
- Regeneration plugins
- HP/MP/TP over time plugins
- Passive stat bonuses

**Solução:** Teste combinações e ajuste ordem.

### Plugins de Animação

**Plugins que podem conflitar:**
- Action sequence plugins
- Animation override plugins

**Solução:** Verifique se animações estão sendo sobrescritas.

---

## Debugging Tips

### 1. Verificar States Ativos
```javascript
// No console durante batalha:
$gameActors.actor(1).states().forEach(s => console.log($dataStates[s].name))
```

### 2. Verificar Traits Ativos
```javascript
// No console:
$gameActors.actor(1).traitObjects()
```

### 3. Forçar Teste de Efeito
```javascript
// Aplicar state manualmente:
$gameActors.actor(1).addState(STATE_ID)

// Remover state manualmente:
$gameActors.actor(1).removeState(STATE_ID)
```

### 4. Check Plugin Ordem
No Plugin Manager:
1. VisuMZ_0_CoreEngine (se usado)
2. VisuMZ_1_BattleCore
3. VisuMZ_1_SkillsStatesCore
4. **VisuMZ_1_LifeStateEffects** ← deve estar aqui ou abaixo

---

## Performance Issues

### Lag em Batalha

**Causas possíveis:**
- Muitos states com notetags ativos
- Animações complexas
- Muitos popups simultâneos

**Soluções:**
- Simplifique animações
- Use Mute Animation para efeitos frequentes
- Limite número de efeitos ativos por battler

### Animações Lentas

**Sausas possíveis:**
- Animations muito longas
- Muitos battlers com efeitos

**Soluções:**
- Use animações curtas (30-60 frames)
- Considere Animation ID: 0 para efeitos sutis

---

## Checklist de Verificação

Antes de reportar bug:

- [ ] Plugin ordem está correta (Tier 3)
- [ ] Requisitos instalados (Battle Core, SkillsStatesCore)
- [ ] Core Engine instalado (para animações)
- [ ] Notetag sintaxe está correta
- [ ] Nomes de enemies estão exatos
- [ ] Animation IDs existem no database
- [ ] Text/cores configurados corretamente
- [ ] Nenhum plugin conflitante

---

## Quando Pedir Ajuda

Se após tentar as soluções acima o problema persistir:

1. **Cole o notetag completo** que está usando
2. **Descreva o comportamento esperado** vs **real**
3. **Liste plugins** instalados e ordem
4. **Forneça screenshots** se possível

## Recursos Adicionais

- [VisuStella MZ Website](https://visustella.com)
- [RPG Maker MZ Forums](https://forums.rpgmakerweb.com)

## Voltar

- [Conceitos](../conceitos/funcionamento.md)
- [Notetags](../notetags/state-only.md)
- [Parâmetros](../parametros/configuracoes.md)

# Mudanças Core (Major Changes)

O plugin Skills & States Core introduz mudanças no comportamento padrão do RPG Maker MZ. Estas alterações são "hard-coded" e afetam a mecânica base do jogo.

---

## Action End Removal para States

### Comportamento Padrão (Vanilla)
No RPG Maker MZ padrão, states com remoção "Action End" são removidos no início do **action set** completo do battler.

### Novo Comportamento
Se o Plugin Parameter **"Action End Update"** estiver habilitado, "Action End" passa a funcionar por **ação individual** usada, não mais por action set.

### Side Effect Importante
States com "Cannot Move" restriction + "Action End" removal **nunca expirarão**, pois o battler não pode realizar ações. Para prevenir softlock:

- **Automaticamente**, "Action End" é convertido para "Turn End" quando o state tem "Cannot Move"
- Isso NÃO replica o comportamento "Action End", mas evita o softlock

### Como Desabilitar
Desative o Plugin Parameter: `Plugin Parameters > State Settings > General > Action End Update`

---

## Buff & Debuff Level Management

### Comportamento Padrão (Vanilla)
Buffs e debuffs aplicados uns sobre os outros apenas shift o modifier level para cima ou para baixo.

### Novo Comportamento
Quando o buff modifier level atinge o **ponto neutro**, o buff/debuff é:
- **Removido completamente**
- O **turn counter** é resetado para melhor precisão

---

## Skill Costs

### Mudança 1: Custos movidos para Plugin Parameters
No RPG Maker MZ padrão, skill costs eram hard-coded. Agora, **todos** os Skill Cost Types (incluindo MP e TP) são gerenciados via Plugin Parameters, desde o pagamento até a verificação.

### Mudança 2: Display de múltiplos custos
- **Vanilla**: Exibia apenas UM tipo de custo (TP se disponível, senão MP). Se custa ambos, só TP aparecia.
- **Plugin**: Exibe **todos** os tipos de custo na ordem definida nos Plugin Parameters.

### Mudança 3: Nome do custo visível
- **Vanilla**: Custos eram apenas coloridos (dificuldade para daltônicos).
- **Plugin**: Exibe o **nome do Skill Cost Type** junto ao valor, auxiliando jogadores daltônicos.

---

## Sprite Gauges

### Comportamento Padrão (Vanilla)
Sprite Gauges eram hard-coded para HP, MP, TP e Time (ATB).

### Novo Comportamento
Sprite Gauges podem ser customizados via Plugin Parameters em **Skill Cost Types** e seus JavaScript entries.

---

## State Displays

Novas funções para exibir valores customizados em states:

```javascript
// Obter o display de um state específico
battler.getStateDisplay(stateId)
// Retorna string vazia se não houver valor

// Definir o display de um state
battler.setStateDisplay(stateId, value)
// value: number ou string

// Limpar o display de um state
battler.clearStateDisplay(stateId)
```

---

## Window Functions Moved

Funções originalmente em `Window_StatusBase` e `Window_SkillList` foram movidas para `Window_Base`, tornando-as disponíveis em **todas** as windows.

---

## Slip Damage Popup (Importante)

Slip Damage popups mostram **apenas UM popup** para HP, MP e TP cada - o **total acumulado** de todos os states e effects combinados.

**Isso NÃO é um bug.** É comportamento intencional tanto do vanilla RMMZ quanto da VisuStella.

**Razão**: Múltiplos popups individuais não transmitem informação útil ao jogador (tempo de ~1.5s para calcular mentalmente). O total acumulado oferece melhor experiência.

---

## Relação com Outros Plugins

| Conceito | Plugin Relacionado | Nota |
|----------|-------------------|------|
| Action Sequences | Battle Core | Slip damage mechanics devem usar JS Pre/Post-Regenerate do Battle Core |
| Gauges | ATB System | Sprite gauges são compatíveis com ATB Time gauge |
| Skill Menu Layout | Core Engine | Updated Layout sobrepõe Core Engine window settings |
| Shop Status Window | Items & Equips Core | Bonus feature para exibir skill data no Skill Menu |
| Multiclass | Class Change System | Passive Condition Multiclass requer este plugin |

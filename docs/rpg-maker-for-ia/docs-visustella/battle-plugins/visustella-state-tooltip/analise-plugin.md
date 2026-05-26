# Analise do Plugin VisuStella State Tooltips

**Task**: projectX-ibu — Criar skill state-tooltip-generator
**Data**: 2026-05-21
**Arquivo analisado**: `frontend/js/plugins/VisuMZ_3_StateTooltips.js` (1827 lines, ofuscado)

---

## 1. Notetags do Plugin

### Regex Patterns (decodificados do codigo ofuscado)

```javascript
VisuMZ.StateTooltips.RegExp = {
  HelpDescription:
    /<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i,
  TooltipDescription:
    /<(?:STATE |)TOOLTIP DESCRIPTION>\s*([\s\S]*)\s*<\/(?:STATE |)TOOLTIP DESCRIPTION>/i,
  Exclude:
    /<EXCLUDE FROM (?:TOOLTIP|TOOLTIPS)>/i,
};
```

### Notetag 1: `<State Tooltip Description>` (PRIORIDADE ALTA)

```
<State Tooltip Description>
 texto do tooltip aqui
</State Tooltip Description>
```

- Aceita variacoes: `STATE TOOLTIP DESCRIPTION` ou `TOOLTIP DESCRIPTION`
- Armazena no campo `state.tooltipDescription`
- Tem prioridade sobre `<Help Description>` no rendering do tooltip
- **Esta e a notetag que a skill DEVE usar**

### Notetag 2: `<Help Description>` (FALLBACK)

```
<Help Description>
 texto compartilhado com Battle Core
</Help Description>
```

- Aceita variacoes: `HELP`, `HELP DESCRIPTION`, `DESCRIPTION`
- Armazena no campo `state.description`
- Compartilhado com Battle Core In-Battle Status
- Fallback se `<State Tooltip Description>` nao existir

### Notetag 3: `<Exclude From Tooltips>` (EXCLUSAO)

```
<Exclude From Tooltips>
```

- Marca `state.excludeListing = true`
- State NAO aparece no tooltip

---

## 2. Cadeia de Prioridade de Descricao

```
Rendering do tooltip:
  1. state.tooltipDescription  (de <State Tooltip Description>)
  2. state.description         (de <Help Description>)
  3. Plugin Default            (parametro HelpDescription, default "-")

Codigo (decodificado):
  desc = state.tooltipDescription || state.description;
  desc = desc.format(battler.stateName(state.id));  // %1 = nome do state
```

**Nao existem**: `<JS State Tooltip Description>`, descricoes condicionais, ou qualquer mecanismo dinamico. Texto 100% estatico.

---

## 3. Formato do Tooltip

### State Format (states customizados)

```
STATE_FMT = "\C[%5]%1%2:\C[0] %3 %4"
```

| Var | Conteudo | Exemplo |
|-----|----------|---------|
| %1  | Icon     | `\I[22]` |
| %2  | Name     | "Atordoamento" |
| %3  | Description | "Nao pode agir" |
| %4  | Duration | "(Turns 2)" |
| %5  | State Color | numero do color |

### Buff/Debuff Format (buffs/debuffs do RPG Maker)

```
BUFF_FMT   = "\C[%5]%1%2▲:\C[0] Increases unit's %2 to \C[%5]%3%\C[0] %4"
DEBUFF_FMT = "\C[%5]%1%2▼:\C[0] Decreases unit's %2 to \C[%5]%3%\C[0] %4"
```

Buffs/debuffs usam formato automatico com porcentagem real (`paramBuffRate * 100`). **A skill so precisa se preocupar com states customizados** — buffs/debuffs sao tratados automaticamente pelo plugin.

### Duration Format

| autoRemovalTiming | Display | Formato |
|-------------------|---------|---------|
| 0 | (nenhum) ou "(Passive)" | Se passiveStates().includes(state) → PASSIVE_TEXT |
| 1 | "(Actions X)" | ACTIONS_FMT com stateTurns |
| 2 | "(Turns X)" | TURNS_FMT com stateTurns |

Valores default:
- `ACTIONS_FMT = "\C[6](Actions \C[%2]%1\C[6])\C[0]"`
- `TURNS_FMT = "\C[5](Turns \C[%2]%1\C[5])\C[0]"`
- `PASSIVE_TEXT = "\C[4](Passive)\C[0]"`

**A duracao e automatica** — a skill NAO precisa incluir duracao no texto do tooltip.

### Text Codes Suportados

- `\C[n]` — Cor do Window Skin
- `\C[#rrggbb]` — Cor hex customizada
- `\I[n]` — Icon
- `\V[n]` — Variavel
- `\{` / `\}` — Font size up/down

---

## 4. Catalogo de States do Projeto

### States por Categoria

#### CC (Crowd Control) — 10 states

| ID | Nome | Traits | Duracao | Tooltip sugerido |
|----|------|--------|---------|-----------------|
| 5 | Cegueira | HIT -30% | 3-5 acoes | Reduz precisao em 30% |
| 6 | Silencio | SkillResist(1) | 3-5 acoes | Impede uso de habilidades |
| 8 | Confusao | restriction:2 | 2-4 acoes | Alvo nao pode se mover |
| 9 | Seducao | restriction:3 | 2-4 acoes | Alvo ataca aliados |
| 10 | Adormecido | EVA -100%, restriction:4 | 3-5 acoes | Alvo dorme e nao pode agir |
| 12 | Paralisia | EVA -100%, restriction:4 | 3 turnos | Alvo nao pode agir |
| 13 | Atordoamento | EVA -100%, restriction:4 | 1-2 turnos | Alvo nao pode agir |
| 58 | Marcado | (nenhum) | passivo | Alvo marcado para habilidades especiais |
| 61 | Doom | (Doom notetag) | 1 turno | Morte instantanea apos 1 turno |
| 68 | Slow | AGI x0.7 | 3 turnos | Reduz AGI em 30% |

#### Buff — 15 states

| ID | Nome | Traits | Duracao | Tooltip sugerido |
|----|------|--------|---------|-----------------|
| 7 | Furia | ATK+30%, DEF-30%, AGI+30% | 3 acoes | ATK+30%, AGI+30%, DEF-30% |
| 15 | Reg PV | HRG +10% | 4 turnos | Regenera 10% PV por turno |
| 16 | Reg PM | MRG +10% | 4 turnos | Regenera 10% PM por turno |
| 17 | Reg PT | TRG +10% | 4 turnos | Regenera 10% PT por turno |
| 22 | Contra-ataque | CNT +100% | 3 acoes | Contra-ataca automaticamente |
| 24 | Reduzir Custo PM | MCR 0.25 | 5 turnos | Reduz custo de PM em 75% |
| 25 | Poder de Fogo | ATK+10%, ElemFogo, FogoRes+50% | 5 turnos | ATK+10%. Ataques sao de fogo. Fogo -50% |
| 26 | Poder de Gelo | ATK+10%, ElemGelo, GeloRes+50% | 5 turnos | ATK+10%. Ataques sao de gelo. Gelo -50% |
| 27 | Poder do Trovao | ATK+10%, ElemTrovao, TrovaoRes+50% | 5 turnos | ATK+10%. Ataques sao de trovao. Trovao -50% |
| 71 | Marcacao | CritRate +10%, Acc +15% (vs target) | 3-4 turnos | Marcado: +10% crit, +15% precisao contra |
| 84 | Muralha Pessoal | Pre-Damage: value * 0.5 | 2 turnos | Reduz todo dano recebido em 50% |
| 86 | Muralha(self) | DEF+30% | 1 turno | DEF+30% por 1 turno |
| 88 | Postura Agressiva | ATK+30%, DEF-20%, AlwaysHit, SlipDmg 3% | 3 acoes | ATK+30%, DEF-20%. Nao erra. -3% PV/turno |
| 90 | Sede de Sangue | Life Steal +20% | 5 turnos | Rouba 20% do dano como PV |
| 95 | Concentracao | CritRate +20% | 4 turnos | Critico +20% |

#### Debuff/DOT — 2 states

| ID | Nome | Traits | Duracao | Tooltip sugerido |
|----|------|--------|---------|-----------------|
| 4 | Envenenar | HRG -5% | 3-5 turnos | Causa 5% do PV maximo por turno |
| 31 | Sangramento | HRG -5% | 3-5 acoes | Causa 5% do PV maximo por acao |

#### Mecanico — 12 states

| ID | Nome | Mecanica | Duracao | Tooltip sugerido |
|----|------|----------|---------|-----------------|
| 18 | Refl. Magica | MRF +100% | 5 turnos | Reflete magias |
| 20 | Provocar | ENC 900% | 5 turnos | Aumenta aggro drasticamente |
| 21 | Ocultar | ENC 0% | 5 turnos | Impossivel ser alvo |
| 23 | Corpo Fechado | Imune a states 4-13 | 5 turnos | Imune a todos os status negativos |
| 41 | Substituir | Bodyguard | passivo | Recebe dano no lugar do aliado |
| 42 | Protecao Ancestral | Auto Life 100% | passivo | Revive com 100% PV ao morrer |
| 51 | Camuflagem | EVA +25% | 4 acoes | Evasao +25% |
| 65 | Fluxo Continuo | Momentum → ATB speed | passivo | Acelera ATB com base em Momentum |
| 66 | Ripostar | Counter 100%, skill 46 | passivo | Contra-ataca com Ripostar |
| 82 | Represalia | Counter quando bodyguard | passivo | Contra-ataca ao interceptar dano |
| 85 | Muralha(aliados) | Kilin intercepta 50% | 1 turno | Kilin absorve 50% do dano do aliado |
| 89 | Postura Fluida | Imune a state 75 | 3 turnos | Imune a atordoamento |

#### Passivo/Personagem — 14 states

| ID | Nome | Mecanica | Tooltip sugerido |
|----|------|----------|-----------------|
| 56 | Contra-ataque(fisico) | Counter fisico | Contra-ataca ataques fisicos |
| 57 | Lobo Solitario | ATK+40%, AGI+40%, no interrupt | ATK+40%, AGI+40%. Imune a interrupcao |
| 67 | Embalo | Momentum nv1 | Momentum acumulado |
| 69 | Embalo nv 2 | Momentum nv2 | Momentum acumulado (nivel 2) |
| 70 | Embalo nv 3 | Momentum nv3 | Momentum acumulado (nivel 3) |
| 77 | Resistencia Ferro 10 | DEF+5% se TP>=10 | DEF+5% com 10+ Guarda |
| 78 | Resistencia Ferro 20 | DEF+5% se TP>=20 | DEF+5% com 20+ Guarda |
| 79 | Resistencia Ferro 30 | DEF+5% se TP>=30 | DEF+5% com 30+ Guarda |
| 80 | Resistencia Ferro 40 | DEF+5% se TP>=40 | DEF+5% com 40+ Guarda |
| 81 | Resistencia Ferro 50 | DEF+5% se TP>=50 | DEF+5% com 50+ Guarda |
| 92 | Olho Falcao I | ArmorPen 5% se TP 26-50 | 5% penetracao com 26-50 Foco |
| 93 | Olho Falcao II | ArmorPen 15% se TP 51-75 | 15% penetracao com 51-75 Foco |
| 94 | Olho Falcao III | ArmorPen 30% se TP 76+ | 30% penetracao com 76+ Foco |
| 96 | Casting Ace | (vazio) | (Exclude From Tooltips) |
| 97 | Olho Cacador (Kill) | TP +8 on kill | +8 Foco ao eliminar inimigo |
| 98 | Olho Cacador (Win) | TP +15 on win | +15 Foco ao vencer batalha |

#### System/Exclude — ~20 states

IDs: 2, 3, 11, 14, 19, 28, 29, 30, 32-39, 40, 43-49, 50, 52-54, 55, 59, 60, 62-63, 64, 72-75, 76, 83, 87, 91

Todos devem receber `<Exclude From Tooltips>`.

---

## 5. Tabelas de Traducao

### Trait Codes → Texto de Tooltip

| Code | Grupo | dataId → Nome | Formula |
|------|-------|---------------|---------|
| 11 | Element Rate | 1=Normal, 2=Fogo, 3=Gelo, 4=Trovao, 5=Agua, 6=Terra, 7=Vento, 8=Sagrado, 9=Sombra | `(value-1)*100` → "Fogo -50%" |
| 21 | Param Rate | 0=MaxPV, 1=MaxPM, 2=ATK, 3=DEF, 4=MAT, 5=MDF, 6=AGI, 7=LUK | `(value-1)*100` → "ATK+30%" |
| 22 | XParam | 0=Precisao, 1=Evasao, 2=Critico, 3=CritDef, 4=MagEvasao, 5=MagReflexao, 6=Contra, 7=HPRegen, 8=MPRegen, 9=TPRegen | `value*100` → "Precisao -30%" ou `value` direto → "HPRegen +10%" |
| 23 | SParam | 0=Encontro, 1=Drop, 2=Farmacia, 3=MPcost, 4=TPcharge, 5=DebuffDur, 6=Recuperacao | `value*100` → "MPcost 25%" |
| 31 | Attack Element | dataId → nome do elemento | "Ataques sao de [elemento]" |
| 32 | Attack State | dataId → nome do state | "Aplica [state] ao atacar" |
| 41 | State Rate | dataId → nome do state, value → multiplicador | "Resist. [state] x[value]" |
| 42 | State Resist | dataId → nome do state | "Imune a [state]" |
| 43 | State Immune | dataId → nome do state | "Imune a [state]" |
| 61 | Action Speed | value → modificador | "Velocidade +[value]" |

### Restriction Codes

| Valor | Traduzir para |
|-------|---------------|
| 0 | (nao mencionar) |
| 1 | "nao pode agir" |
| 2 | "nao pode se mover" |
| 3 | "ataca aliados" |
| 4 | "nao pode agir" (sleep/paralysis/stun) |

### Duracao (Automatica pelo plugin)

| autoRemovalTiming | Display |
|-------------------|---------|
| 0 | (vazio — passivo) |
| 1 | "(Actions X)" |
| 2 | "(Turns X)" |

**NOTA**: A skill NAO precisa incluir duracao no tooltip. O plugin calcula automaticamente.

### Notetags do SkillsStatesCore/BattleCore → Texto

| Notetag | Extrair como |
|---------|-------------|
| `<Counter Rate: X%>` + `<Counter Skill: Y>` | "Contra-ataca automaticamente" |
| `<Counter Rate: X%>` + `<Counter Condition>` | "Contra-ataca quando [condicao]" |
| `<HP Life Steal Physical Hit: +X%>` | "Rouba X% do dano como PV" |
| `<JS HP Slip Damage>` | Ler o JS para calcular % do PV |
| `<JS Pre-Damage as Target>` | "Reduz dano recebido em X%" |
| `<Armor Penetration: X%>` | "X% penetracao de armadura" |
| `<JS Critical Rate AS USER>` | "Critico +X%" |
| `<Always Hit>` | "Nao erra" |
| `<Doom>` | "Morte apos X turnos" |
| `<Auto Life: X%>` | "Revive com X% PV ao morrer" |
| `<JS Passive Condition>` | Ler condicao para descrever requisito |
| `<ATB Cannot Be Interrupted>` | "Imune a interrupcao" |
| `<TP On Enemy Death: +X>` | "+X [recurso] ao eliminar" |
| `<TP On Battle Win: +X>` | "+X [recurso] ao vencer" |

### Recurso por Personagem (range de State IDs)

| Range | Personagem | Recurso |
|-------|-----------|---------|
| 64-74 | Filena | Momentum |
| 76-86 | Kilin | Guarda |
| 87-90 | Mhordred | Furia |
| 91-98 | Thorin | Foco |

---

## 6. Padroes de Tooltip por Categoria

| Categoria | Padrao | Exemplo |
|-----------|--------|---------|
| CC simples | `[efeito]` | "Nao pode agir" |
| CC com valor | `[efeito] [valor]` | "Reduz precisao em 30%" |
| Buff stat | `[stats+/-]` | "ATK+30%, DEF-20%" |
| Buff mecanico | `[comportamento]` | "Contra-ataca automaticamente" |
| DOT | `[dano/turno]` | "5% PV maximo por turno" |
| HOT | `[cura/turno]` | "Regenera 10% PV por turno" |
| Mecanico | `[comportamento]. [detalhe]` | "Reduz dano recebido em 50%" |
| Barreira | `[absorcao]` | "Absorve proximo ataque" |
| Passivo condicional | `[efeito] com [condicao]` | "DEF+5% com 30+ Guarda" |

### Regras de Formato
- Texto corrido (sem quebras de linha, bullets ou listas)
- Maximo ~130 caracteres
- Sem narrativa, sem adjetivos subjetivos
- Tecnico e direto
- Duracao NAO incluir (automatica pelo plugin)
- Usar `<State Tooltip Description>` (nao `<Help Description>`)

---

## 7. Decisoes Resolvidas

1. **Char limit**: ~100-130 chars (mesmo padrao de skills). Tooltip e renderizado a 0.6x scale.
2. **Linguagem**: Portugues tecnico (consistente com skill-description-generator).
3. **States a excluir**: Placeholders, separadores e states de sistema recebem `<Exclude From Tooltips>`.
4. **Notetag preferida**: `<State Tooltip Description>` — dedicada ao plugin, com prioridade maxima.
5. **States com buff/debuff do RPG Maker**: NAO precisam de tooltip — o plugin trata automaticamente com BUFF_FMT/DEBUFF_FMT.

---

## 8. Output para Proximas Etapas

Este documento alimenta:
- **Etapa 2**: Mapear campos de States.json (ja catalogados na secao 4)
- **Etapa 3**: Definir tabelas de traducao (ja completas na secao 5)
- **Etapa 4**: Definir padroes por tipo de state (ja definidos na secao 6)
- **Etapa 5**: Escrever SKILL.md (todas as informacoes necessarias estao aqui)

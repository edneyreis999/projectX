# Notetags de Seleção Específica de Alvos

## Visão Geral

Seleção específica de A.I. targeting significa que o usuário ignorará qualquer influência TGR ao escolher um alvo de um grupo de candidatos válidos. Isso apenas afeta skills onde o usuário deve selecionar um alvo específico, significando que ignora os efeitos de random e escopos AoE.

## <AI Target: type>

**Uso**: Skill Notetags

Ignora influência TGR em favor de escolher um alvo específico de um grupo de alvos válidos (não escolhe fora do grupo de alvos válidos) para um alvo de skill.

**Sintaxe**:
```html
<AI Target: type>
```

Substitua `type` por um dos tipos listados abaixo.

---

## Tipos de Seleção Básica

### User
Sempre escolhe o usuário se disponível.

```html
<AI Target: User>
```

**Uso**: Skills de auto-buff, auto-cura

---

### First
Sempre escolhe o primeiro candidato válido.

```html
<AI Target: First>
```

**Uso**: Quando a ordem de formação importa

---

### Last
Sempre escolhe o último candidato válido.

```html
<AI Target: Last>
```

**Uso**: Quando você quer alvejar o último da formação

---

## Tipos de Seleção por Nível

### Highest Level
Escolhe o candidato com maior nível.

```html
<AI Target: Highest Level>
```

### Lowest Level
Escolhe o candidato com menor nível.

```html
<AI Target: Lowest Level>
```

**Uso**: Selecionar por dificuldade/força

---

## Tipos de Seleção por HP

### Highest MaxHP
Escolhe o candidato com maior MaxHP.

```html
<AI Target: Highest MaxHP>
```

### Highest HP
Escolhe o candidato com maior HP atual.

```html
<AI Target: Highest HP>
```

### Highest HP%
Escolhe o candidato com maior % de HP.

```html
<AI Target: Highest HP%>
```

### Lowest MaxHP
Escolhe o candidato com menor MaxHP.

```html
<AI Target: Lowest MaxHP>
```

### Lowest HP
Escolhe o candidato com menor HP atual.

```html
<AI Target: Lowest HP>
```

### Lowest HP%
Escolhe o candidato com menor % de HP.

```html
<AI Target: Lowest HP%>
```

**Uso**:
- `Lowest HP%` para skills de finisher
- `Highest HP%` para skills de dano em massa

---

## Tipos de Seleção por MP

### Highest MaxMP
Escolhe o candidato com maior MaxMP.

```html
<AI Target: Highest MaxMP>
```

### Highest MP
Escolhe o candidato com maior MP atual.

```html
<AI Target: Highest MP>
```

### Highest MP%
Escolhe o candidato com maior % de MP.

```html
<AI Target: Highest MP%>
```

### Lowest MaxMP
Escolhe o candidato com menor MaxMP.

```html
<AI Target: Lowest MaxMP>
```

### Lowest MP
Escolhe o candidato com menor MP atual.

```html
<AI Target: Lowest MP>
```

### Lowest MP%
Escolhe o candidato com menor % de MP.

```html
<AI Target: Lowest MP%>
```

**Uso**:
- `Lowest MP%` para skills anti-mago (silêncio, dano em MP)

---

## Tipos de Seleção por TP

### Highest MaxTP
Escolhe o candidato com maior MaxTP.

```html
<AI Target: Highest MaxTP>
```

### Highest TP
Escolhe o candidato com maior TP atual.

```html
<AI Target: Highest TP>
```

### Highest TP%
Escolhe o candidato com maior % de TP.

```html
<AI Target: Highest TP%>
```

### Lowest MaxTP
Escolhe o candidato com menor MaxTP.

```html
<AI Target: Lowest MaxTP>
```

### Lowest TP
Escolhe o candidato com menor TP atual.

```html
<AI Target: Lowest TP>
```

### Lowest TP%
Escolhe o candidato com menor % de TP.

```html
<AI Target: Lowest TP%>
```

---

## Tipos de Seleção por Parâmetros Básicos

### Highest ATK
Escolhe o candidato com maior parâmetro ATK.

```html
<AI Target: Highest ATK>
```

### Highest DEF
Escolhe o candidato com maior parâmetro DEF.

```html
<AI Target: Highest DEF>
```

### Highest MAT
Escolhe o candidato com maior parâmetro MAT.

```html
<AI Target: Highest MAT>
```

### Highest MDF
Escolhe o candidato com maior parâmetro MDF.

```html
<AI Target: Highest MDF>
```

### Highest AGI
Escolhe o candidato com maior parâmetro AGI.

```html
<AI Target: Highest AGI>
```

### Highest LUK
Escolhe o candidato com maior parâmetro LUK.

```html
<AI Target: Highest LUK>
```

### Lowest ATK/DEF/MAT/MDF/AGI/LUK
Escolhe o candidato com menor parâmetro correspondente.

```html
<AI Target: Lowest ATK>
<AI Target: Lowest DEF>
<!-- etc. -->
```

**Uso**:
- `Highest ATK` para debuff de ataque
- `Lowest DEF` para skill de dano massivo

---

## Tipos de Seleção por Parâmetros Estendidos

### Highest HIT / Lowest HIT
Escolhe candidato com maior/menor parâmetro HIT (Hit Rate).

```html
<AI Target: Highest HIT>
<AI Target: Lowest HIT>
```

### Highest EVA / Lowest EVA
Escolhe candidato com maior/menor parâmetro EVA (Evasion).

```html
<AI Target: Highest EVA>
<AI Target: Lowest EVA>
```

### Highest CRI / Lowest CRI
Escolhe candidato com maior/menor parâmetro CRI (Critical Rate).

```html
<AI Target: Highest CRI>
<AI Target: Lowest CRI>
```

### Highest CEV / Lowest CEV
Escolhe candidato com maior/menor parâmetro CEV (Critical Evasion).

```html
<AI Target: Highest CEV>
<AI Target: Lowest CEV>
```

### Highest MEV / Lowest MEV
Escolhe candidato com maior/menor parâmetro MEV (Magic Evasion).

```html
<AI Target: Highest MEV>
<AI Target: Lowest MEV>
```

### Highest MRF / Lowest MRF
Escolhe candidato com maior/menor parâmetro MRF (Magic Reflection).

```html
<AI Target: Highest MRF>
<AI Target: Lowest MRF>
```

### Highest CNT / Lowest CNT
Escolhe candidato com maior/menor parâmetro CNT (Counter).

```html
<AI Target: Highest CNT>
<AI Target: Lowest CNT>
```

### Highest HRG / Lowest HRG
Escolhe candidato com maior/menor parâmetro HRG (HP Regeneration).

```html
<AI Target: Highest HRG>
<AI Target: Lowest HRG>
```

### Highest MRG / Lowest MRG
Escolhe candidato com maior/menor parâmetro MRG (MP Regeneration).

```html
<AI Target: Highest MRG>
<AI Target: Lowest MRG>
```

### Highest TRG / Lowest TRG
Escolhe candidato com maior/menor parâmetro TRG (TP Regeneration).

```html
<AI Target: Highest TRG>
<AI Target: Lowest TRG>
```

---

## Tipos de Seleção por Parâmetros Especiais

### Highest TGR / Lowest TGR
Escolhe candidato com maior/menor parâmetro TGR (Target Rate).

```html
<AI Target: Highest TGR>
<AI Target: Lowest TGR>
```

### Highest GRD / Lowest GRD
Escolhe candidato com maior/menor parâmetro GRD (Guard).

```html
<AI Target: Highest GRD>
<AI Target: Lowest GRD>
```

### Highest REC / Lowest REC
Escolhe candidato com maior/menor parâmetro REC (Recovery).

```html
<AI Target: Highest REC>
<AI Target: Lowest REC>
```

### Highest PHA / Lowest PHA
Escolhe candidato com maior/menor parâmetro PHA (Pharma).

```html
<AI Target: Highest PHA>
<AI Target: Lowest PHA>
```

### Highest MCR / Lowest MCR
Escolhe candidato com maior/menor parâmetro MCR (MP Cost Rate).

```html
<AI Target: Highest MCR>
<AI Target: Lowest MCR>
```

### Highest TCR / Lowest TCR
Escolhe candidato com maior/menor parâmetro TCR (TP Cost Rate).

```html
<AI Target: Highest TCR>
<AI Target: Lowest TCR>
```

### Highest PDR / Lowest PDR
Escolhe candidato com maior/menor parâmetro PDR (Physical Damage Rate).

```html
<AI Target: Highest PDR>
<AI Target: Lowest PDR>
```

### Highest MDR / Lowest MDR
Escolhe candidato com maior/menor parâmetro MDR (Magical Damage Rate).

```html
<AI Target: Highest MDR>
<AI Target: Lowest MDR>
```

### Highest FDR / Lowest FDR
Escolhe candidato com maior/menor parâmetro FDR (Floor Damage Rate).

```html
<AI Target: Highest FDR>
<AI Target: Lowest FDR>
```

### Highest EXR / Lowest EXR
Escolhe candidato com maior/menor parâmetro EXR (Experience Rate).

```html
<AI Target: Highest EXR>
<AI Target: Lowest EXR>
```

---

## Tipos de Seleção por State Count

⚠️ **Requer**: VisuMZ_1_SkillsStatesCore

### Highest State Count
Escolhe candidato com mais states (qualquer).

```html
<AI Target: Highest State Count>
```

### Highest Positive State Count
Escolhe candidato com mais estados positivos.

```html
<AI Target: Highest Positive State Count>
```

### Highest Negative State Count
Escolhe candidato com mais estados negativos.

```html
<AI Target: Highest Negative State Count>
```

### Lowest State Count
Escolhe candidato com menos states (qualquer).

```html
<AI Target: Lowest State Count>
```

### Lowest Positive State Count
Escolhe candidato com menos estados positivos.

```html
<AI Target: Lowest Positive State Count>
```

### Lowest Negative State Count
Escolhe candidato com menos estados negativos.

```html
<AI Target: Lowest Negative State Count>
```

**Uso**:
- `Highest Negative State Count` para remover debuffs
- `Lowest Negative State Count` para aplicar mais debuffs

---

## Exemplos Práticos

### Skill de Cura em Emergência

```html
<AI Target: Lowest HP%>
```

Cura o aliado com menor % de HP.

### Skill de Assassino

```html
<AI Target: Lowest HP>
```

Ataca o alvo com menor HP atual (tentar matar).

### Anti-Mago

```html
<AI Target: Lowest MaxMP>
```

Foca em alvos com baixo MP máximo (provavelmente não-magos).

### Debuff de Ataque

```html
<AI Target: Highest ATK>
```

Aplica debuff de ataque no inimigo mais forte.

### Buff de Defesa

```html
<AI Target: Lowest DEF>
```

Aplica buff de defesa no aliado mais fraco.

### Remoção de Debuff

```html
<AI Target: Highest Negative State Count>
```

Remove debuffs do aliado mais afetado.

### Dano Elemental Inteligente

Combine com condições de elemento:

```html
<All AI Conditions>
 Target Fire Element Rate > 1.5
</All AI Conditions>
<AI Target: Lowest HP%>
```

Ataca com fogo o alvo mais fraco que seja vulnerável a fogo.

## Veja Também

- **[TGR Weight](tgr-weight.md)** - Sistema de influência de peso
- **[Condições de Skills](condicoes-skills.md)** - Como filtrar alvos válidos
- **[Funcionamento da IA](../conceitos/funcionamento.md)** - Processo de seleção de alvos

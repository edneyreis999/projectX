# Índice das 19 Quests - Sistema de Narrativa Sistêmica v2.0

**Data:** 2025-11-04
**Versão:** 2.0 (Escala 0-100 com Lei de Pareto)

---

## Resumo do Sistema

- **Total de Quests:** 19
- **Variáveis Principais (pastas):** `v_armadilhas`, `V_força_guarda`, `V_força_civil`, `V_influência_corvos`, `V_sigmetal`
- **Escala de Referência:** 0-100 pontos para cada variável principal (ver totais atuais em **Total Máximo Possível**)
- **Princípio:** Lei de Pareto 80/20 (quests fáceis = alta recompensa, quests difíceis = baixa recompensa)

---

## 🎪 ARMADILHAS (3 quests) → v_pontos_armadilhas (0-100)

| # | Quest | Dificuldade | Localização | Pontos | Requisitos |
|---|-------|-------------|-------------|--------|------------|
| 01 | Testar Dinamite | Fácil | Estrada do Cão-luar | +50 | N/A |
| 02 | Testar Armadilhas | Fácil | Estrada do Cão-luar | +25 | N/A |
| 03 | Apaziguar Discussões | Fácil | Distrito Comercial | +25 | N/A |

**Total Possível:** 100 pontos

**Faixas de Eficácia:**

- 0-30 pontos → 7 grupos de inimigos (muito difícil)
- 31-60 pontos → 6 grupos (difícil)
- 61-80 pontos → 5 grupos (normal)
- 81-100 pontos → 4 grupos (fácil)

---

## ⚔️ GUARDA DE FERRO (5 quests) → v_forca_guarda (0-100)

| # | Quest | Dificuldade | Localização | Pontos | Requisitos |
|---|-------|-------------|-------------|--------|------------|
| 01 | Treinando a Guarda de Ferro | Fácil | Campo de Treinamento | +30 | N/A |
| 02 | Resgatando Kilin | Difícil | Campo de Treinamento | +30 | Ter completado "Treinando a Guarda de Ferro" |
| 03 | Boas-vindas à Guarda de Ferro | Fácil | Taverna da Pedra Vulcânica | +10 | Ter completado "Resgatando Kilin" |
| 04 | Guerreiro Fragmentado | Fácil | Campo de Treinamento | +15 | Ter completado "Resgatando Kilin" e "Boas-vindas à Guarda de Ferro" |
| 05 | O Novo Lorde Anão | Fácil | Taverna da Pedra Vulcânica | +15 | Ter completado "Resgatando Kilin" |

**Total Possível:** 100 pontos

**Escala de Dano:**

```
Dano = 1667 × (1 + v_forca_guarda/100) × (1 + sigmetal×0.5)

0 pontos:   1667 HP
50 pontos:  2500 HP
100 pontos: 3334 HP (sem Sigmetal) / 5000 HP (com Sigmetal)
```

---

## 👥 EXÉRCITO CIVIL (5 quests) → v_forca_civil (0-100)

| # | Quest | Dificuldade | Localização | Pontos | Requisitos |
|---|-------|-------------|-------------|--------|------------|
| 01 | Resgatar Rebeldes e Borin em Kravens | Média | Casa da Filena | +30 | N/A |
| 02 | Resgatar Grupos de Rebeldes em Kravens | Fácil | Campo de Treinamento | +20 | Ter completado "Resgatar Rebeldes e Borin em Kravens" |
| 03 | Treinar Time Rúnico | Fácil | Campo de Treinamento | +15 | N/A |
| 04 | Recrutar Civis | Fácil | Campo de Treinamento | +20 | N/A |
| 05 | Treinar Civis | Fácil | Campo de Treinamento | +15 | Ter completado "Recrutar Civis" |

**Total Possível:** 100 pontos

**Composição:** Rebeldes + Civis + Time Rúnico

**Escala de Dano:**

```
Dano = 1667 × (1 + v_forca_civil/100) × (1 + sigmetal×0.5)

0 pontos:   1667 HP
50 pontos:  2500 HP
100 pontos: 3334 HP (sem Sigmetal) / 5000 HP (com Sigmetal)
```

---

## 🦅 CORVOS (3 quests) → v_influencia_corvos (0-100)

| # | Quest | Dificuldade | Localização | Pontos | Requisitos |
|---|-------|-------------|-------------|--------|------------|
| 01 | Resgatar Corvos e Família Principal | Difícil | Sala do Conselho | +35 | N/A |
| 02 | Canção Ancestral | Mediana | Sala do Conselho | +35 | Ter completado "Resgatar Corvos e Família Principal" |
| 03 | Treinar Corvos | Mediana | Sala do Conselho | +30 | Ter completado "Canção Ancestral" |

**Total Possível:** 100 pontos

**Escala de Dano:**

```
Dano = 1667 × (1 + v_influencia_corvos/100) × (1 + sigmetal×0.5)

0 pontos:   1667 HP
50 pontos:  2500 HP
100 pontos: 3334 HP (sem Sigmetal) / 5000 HP (com Sigmetal)
```

---

## 🔥 SIGMETAL (3 quests) → v_reforco_sigmetal (0-1 binária) + reforços

| # | Quest | Dificuldade | Localização | Pontos / Valor | Requisitos |
|---|-------|-------------|-------------|----------------|------------|
| 01 | Coletar Sigmetal na Câmara Revelada | Difícil | Estrada do Cão-luar | 0→1 (binária) | N/A |
| 02 | Encontrar Ferreiro Para Armaduras | Mediano | Distrito Comercial | +50 | Ter completado "Coletar Sigmetal na Câmara Revelada" |
| 03 | Encontrar Ferreiro Para Armas | Mediano | Distrito Comercial | +50 | Ter completado "Coletar Sigmetal na Câmara Revelada" |

**Total Possível em reforços:** 100 pontos (+ flag binária de Sigmetal)

**Efeito:** Multiplicador global de +50% para TODOS os 3 exércitos

**Impacto aproximado:**

- Sem Sigmetal: Dano máximo ≈ 3334 HP
- Com Sigmetal: Dano máximo ≈ 5000 HP (one-hit kill nos bosses)

---

## 📊 Distribuição por Localização

### Estrada do Cão-luar (3 quests)

- Testar Dinamite (Armadilhas)
- Testar Armadilhas (Armadilhas)
- Coletar Sigmetal na Câmara Revelada (Sigmetal)

### Distrito Comercial (3 quests)

- Apaziguar Discussões (Armadilhas)
- Encontrar Ferreiro Para Armaduras (Sigmetal)
- Encontrar Ferreiro Para Armas (Sigmetal)

### Casa da Filena (1 quest)

- Resgatar Rebeldes e Borin em Kravens (Exército Civil)

### Campo de Treinamento (7 quests)

- Resgatar Grupos de Rebeldes em Kravens (Exército Civil)
- Treinar Time Rúnico (Exército Civil)
- Recrutar Civis (Exército Civil)
- Treinar Civis (Exército Civil)
- Treinando a Guarda de Ferro (Guarda de Ferro)
- Resgatando Kilin (Guarda de Ferro)
- Guerreiro Fragmentado (Guarda de Ferro)

### Taverna da Pedra Vulcânica (2 quests)

- Boas-vindas à Guarda de Ferro (Guarda de Ferro)
- O Novo Lorde Anão (Guarda de Ferro)

### Sala do Conselho (3 quests)

- Resgatar Corvos e Família Principal (Corvos)
- Canção Ancestral (Corvos)
- Treinar Corvos (Corvos)

---

## 🎯 Distribuição por Dificuldade

### Fácil (Soft Core) - 11 quests

- Alta recompensa (15-50 pontos)
- Requisitos simples ou N/A
- **Quests:** Testar Dinamite, Testar Armadilhas, Apaziguar Discussões, Resgatar Grupos de Rebeldes em Kravens, Treinar Time Rúnico, Recrutar Civis, Treinar Civis, Treinando a Guarda de Ferro, Boas-vindas à Guarda de Ferro, Guerreiro Fragmentado, O Novo Lorde Anão

**Total de pontos:** 240 pontos

### Média - 5 quests

- Recompensa moderada (30-50 pontos)
- Dependem de outras quests ou decisões narrativas
- **Quests:** Resgatar Rebeldes e Borin em Kravens, Canção Ancestral, Treinar Corvos, Encontrar Ferreiro Para Armaduras, Encontrar Ferreiro Para Armas

**Total de pontos:** 195 pontos

### Difícil (Hard Core) - 3 quests

- Recompensa estratégica (pontos e/ou multiplicador)
- Normalmente ligadas a exploração em Mélios/Kravens ou momentos críticos
- **Quests:** Resgatar Corvos e Família Principal, Resgatando Kilin, Coletar Sigmetal na Câmara Revelada

**Total de pontos:** 65 pontos (50 + 35 + 0, sem contar o multiplicador de Sigmetal)

---

## 🔄 Fluxo de Progressão Recomendado

### Fase 1: Preparação Inicial em Gildrat

**Quests com Requisitos = N/A (camada 0):**

- Testar Dinamite (Armadilhas)
- Testar Armadilhas (Armadilhas)
- Apaziguar Discussões (Armadilhas)
- Resgatar Rebeldes e Borin em Kravens (Exército Civil)
- Treinar Time Rúnico (Exército Civil)
- Recrutar Civis (Exército Civil)
- Treinando a Guarda de Ferro (Guarda de Ferro)
- Resgatar Corvos e Família Principal (Corvos)
- Coletar Sigmetal na Câmara Revelada (Sigmetal)

**Pontos ganhos (sem contar Sigmetal binário):** 230 pontos

### Fase 2: Quests de 1ª camada (dependem apenas de Fase 1)

- Resgatar Grupos de Rebeldes em Kravens (Exército Civil) — requer "Resgatar Rebeldes e Borin em Kravens"
- Treinar Civis (Exército Civil) — requer "Recrutar Civis"
- Resgatando Kilin (Guarda de Ferro) — requer "Treinando a Guarda de Ferro"
- Canção Ancestral (Corvos) — requer "Resgatar Corvos e Família Principal"
- Encontrar Ferreiro Para Armaduras (Sigmetal) — requer "Coletar Sigmetal na Câmara Revelada"
- Encontrar Ferreiro Para Armas (Sigmetal) — requer "Coletar Sigmetal na Câmara Revelada"

**Pontos ganhos:** 200 pontos

### Fase 3: Quests de 2+ camadas (cadeias mais longas)

- Boas-vindas à Guarda de Ferro (Guarda de Ferro) — requer "Resgatando Kilin"
- O Novo Lorde Anão (Guarda de Ferro) — requer "Resgatando Kilin"
- Treinar Corvos (Corvos) — requer "Canção Ancestral"
- Guerreiro Fragmentado (Guarda de Ferro) — requer "Resgatando Kilin" e "Boas-vindas à Guarda de Ferro"

**Pontos ganhos:** 70 pontos

### Total Máximo Possível

**Pontos brutos somando todas as quests:** 230 (Fase 1) + 200 (Fase 2) + 70 (Fase 3) = **500 pontos**

**Totais por variável (considerando o que está nas quests):**

- v_pontos_armadilhas: 100 (50 + 25 + 25)
- v_forca_guarda: 100 (30 + 30 + 10 + 15 + 15)
- v_forca_civil: 100 (30 + 20 + 15 + 20 + 15)
- v_influencia_corvos: 100 (35 + 35 + 30)
- v_reforco_sigmetal: 100 (50 + 50)

**Observação:** Os cálculos de dano abaixo continuam usando a escala alvo de 0-100 por variável; se mantido este design, os valores acima precisam ser normalizados ou capados na implementação.

---

## 📈 Cenários de Gameplay

### 🏆 Jogador 100% (Hardcore Completionist)

**Quests completadas:** 19/19

**Variáveis:**

- v_pontos_armadilhas = 100
- v_forca_guarda = 100
- v_forca_civil = 100
- v_influencia_corvos = 100
- v_reforco_sigmetal = 100

**Resultado Fase 1:** 4 grupos de inimigos
**Resultado Fase 2:** Cada exército causa 5000 HP (one-hit kill)

---

### ⚠️ Jogador 50% (Casual Balanceado)

**Quests completadas:** ~10-12/19 (maioria fáceis)

**Variáveis:**

- v_pontos_armadilhas = 50
- v_forca_guarda = 50
- v_forca_civil = 50
- v_influencia_corvos = 50
- v_reforco_sigmetal = 50

**Resultado Fase 1:** 6 grupos de inimigos
**Resultado Fase 2:** Cada exército causa 3750 HP

---

### ❌ Jogador Mínimo (Story Only)

**Quests completadas:** 0/19 (só história linear)

**Variáveis:**

- v_pontos_armadilhas = 0
- v_forca_guarda = 0
- v_forca_civil = 0
- v_influencia_corvos = 0
- v_reforco_sigmetal = 0

**Resultado Fase 1:** 7 grupos de inimigos
**Resultado Fase 2:** Cada exército causa 1667 HP (muito difícil)

---

## 🎨 Arcos Narrativos Aprofundados

- **v_armadilhas (Armadilhas):** Reforça o arco de Valamir como inventor estratégico e a relação de confiança entre Thorin e Valamir.
- **V_força_civil (Exército Civil):** Reforça o arco de Filena e Borin, mostrando rebeldes, civis e time rúnico se organizando em exército.
- **V_força_guarda (Guarda de Ferro):** Reforça o arco de Kilin e Mhordred, trabalhando culpa, liderança e sucessão na Guarda de Ferro.
- **V_influência_corvos (Corvos):** Reforça o arco de Corvinus/Corvos como facção independente, negociando confiança com Gildrat.
- **V_sigmetal (Sigmetal):** Reforça novamente o arco de Valamir e a descoberta do Sigmetal como arma central contra os Ignotos.

---

## 🔧 Implementação Técnica

### Variáveis do RPG Maker MZ

```javascript
$gameVariables.setValue(1, v_pontos_armadilhas);   // v_armadilhas (0-100)
$gameVariables.setValue(2, v_forca_guarda);        // V_força_guarda (0-100)
$gameVariables.setValue(3, v_forca_civil);         // V_força_civil (0-100)
$gameVariables.setValue(4, v_influencia_corvos);   // V_influência_corvos (0-100)
$gameVariables.setValue(5, v_reforco_sigmetal);    // V_sigmetal (0-100, multiplicador)
```

### Cálculo de Grupos (Fase 1)

```javascript
const pontos = $gameVariables.value(1);
let grupos;

if (pontos >= 81) grupos = 4;
else if (pontos >= 61) grupos = 5;
else if (pontos >= 31) grupos = 6;
else grupos = 7;
```

### Cálculo de Dano (Fase 2)

```javascript
function calcularDano(id_var_forca) {
  const BASE = 1667;
  const forca = $gameVariables.value(id_var_forca);
  const sigmetal = $gameVariables.value(5);

  const mult_forca = 1 + (forca / 100);
  const mult_sigmetal = 1 + (sigmetal * 0.5);

  return Math.floor(BASE * mult_forca * mult_sigmetal);
}
```

---

## 📋 Checklist de Criação

- [ ] 03 quests de Armadilhas
- [ ] 05 quests da Guarda de Ferro
- [ ] 05 quests do Exército Civil
- [ ] 03 quests dos Corvos
- [ ] 03 quests de Sigmetal
- [ ] Distribuição de pontos com Lei de Pareto revisada
- [ ] Gatilhos por dificuldade (fácil/média/difícil)
- [ ] Arcos narrativos para cada variável principal
- [ ] Implementação no RPG Maker MZ
- [ ] Testes de balanceamento
- [ ] Validação de dano máximo (5000 HP)

---

## 📖 Referências

- [Sistema Simplificado v2.0](../sistema-simplificado-narrativa-sistemica.md)
- [NPCs Mapa Teste](../npcs-mapa-teste.md)
- [Timeline História v5](../../../docs/GDD/3-historia/timeline-historia-jogo-v5.md)
- [Última Missão do Jogo](../../../docs/GDD/3-historia/ultima-missao-do-jogo.md)

# Índice das 21 Quests - Sistema de Narrativa Sistêmica v2.0

**Data:** 2025-11-04
**Versão:** 2.0 (Escala 0-100 com Lei de Pareto)

---

## Resumo do Sistema

- **Total de Quests:** 21
- **Variáveis Principais:** 5 (+ 1 binária)
- **Escala:** 0-100 pontos para cada variável
- **Princípio:** Lei de Pareto 80/20 (quests fáceis = alta recompensa, quests difíceis = baixa recompensa)

---

## 🎪 ARMADILHAS (5 quests) → v_pontos_armadilhas (0-100)

| # | Quest | Dificuldade | Localização | Pontos | Gatilho |
|---|-------|-------------|-------------|--------|---------|
| 01 | Mapear Posições Estratégicas | Fácil | Gildrat | +25 | Automático |
| 02 | Testar Dinamite | Fácil | Gildrat | +25 | Completar 01 |
| 03 | Recrutar Sáparo como Isca | Fácil | Gildrat | +20 | Completar 02 |
| 04 | Posicionar Armadilhas no Caminho | Média | Gildrat | +15 | Kravens visitado + 03 |
| 05 | Criar Rota de Fuga para Isca | Difícil | Gildrat | +15 | v_pontos_armadilhas ≥ 70 |

**Total Possível:** 100 pontos

**Faixas de Eficácia:**
- 0-30 pontos → 7 grupos de inimigos (muito difícil)
- 31-60 pontos → 6 grupos (difícil)
- 61-80 pontos → 5 grupos (normal)
- 81-100 pontos → 4 grupos (fácil)

---

## ⚔️ GUARDA DE FERRO (5 quests) → v_forca_guarda (0-100)

| # | Quest | Dificuldade | Localização | Pontos | Gatilho |
|---|-------|-------------|-------------|--------|---------|
| 06 | Organizar Logística Militar | Fácil | Gildrat | +25 | Automático |
| 07 | Fortificar Muralhas | Fácil | Gildrat | +25 | Automático |
| 08 | Treinar Formações de Combate | Fácil | Gildrat | +20 | Completar 06 |
| 09 | Resgatar Kilin em Melios | Média | Melios | +20 | Melios liberado |
| 10 | Preparar Arsenal da Guarda | Difícil | Gildrat | +10 | v_forca_guarda ≥ 70 |

**Total Possível:** 100 pontos

**Bônus:** Quest 08 dá +25 se Kilin foi resgatado (ao invés de +20)

**Escala de Dano:**
```
Dano = 1667 × (1 + v_forca_guarda/100) × (1 + sigmetal×0.5)

0 pontos:   1667 HP
50 pontos:  2500 HP
100 pontos: 3334 HP (sem Sigmetal) / 5000 HP (com Sigmetal)
```

---

## 👥 EXÉRCITO CIVIL (5 quests) → v_forca_civil (0-100)

| # | Quest | Dificuldade | Localização | Pontos | Gatilho |
|---|-------|-------------|-------------|--------|---------|
| 11 | Recrutar Civis para Milícia | Fácil | Gildrat | +30 | Automático |
| 12 | Treinar Time Rúnico como Unidade | Fácil | Gildrat | +25 | Automático |
| 13 | Resgatar Borin em Kravens | Média | Kravens | +20 | Kravens liberado |
| 14 | Resgatar Grupos de Rebeldes | Média | Kravens | +15 | Kravens visitado |
| 15 | Treinar Rebeldes | Difícil | Gildrat | +10 | v_forca_civil ≥ 70 |

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

## 🦅 CORVOS (5 quests) → v_influencia_corvos (0-100)

| # | Quest | Dificuldade | Localização | Pontos | Gatilho |
|---|-------|-------------|-------------|--------|---------|
| 16 | Negociar Aliança com Corvos | Fácil | Gildrat | +25 | Automático |
| 17 | Resgatar Grupo Principal | Média | Melios | +30 | Melios liberado |
| 18 | Resgatar Corvo Isolado 1 | Média | Melios | +15 | Exploração (túnel leste) |
| 19 | Resgatar Corvo Isolado 2 | Média | Melios | +15 | Exploração (câmara sul) |
| 20 | Resgatar Corvo Isolado 3 | Média | Melios | +15 | Exploração (seção profunda) |

**Total Possível:** 100 pontos

**Escala de Dano:**
```
Dano = 1667 × (1 + v_influencia_corvos/100) × (1 + sigmetal×0.5)

0 pontos:   1667 HP
50 pontos:  2500 HP
100 pontos: 3334 HP (sem Sigmetal) / 5000 HP (com Sigmetal)
```

---

## 🔥 SIGMETAL (1 quest) → v_reforco_sigmetal (0-1)

| # | Quest | Dificuldade | Localização | Valor | Gatilho |
|---|-------|-------------|-------------|-------|---------|
| 21 | Coletar Sigmetal na Câmara Revelada | Média | Kravens | 0→1 | Cristaleão derrotado + Dinamite |

**Efeito:** Multiplicador global de +50% para TODOS os 3 exércitos

**Impacto:**
- Sem Sigmetal: Dano máximo = 3334 HP
- Com Sigmetal: Dano máximo = 5000 HP (one-hit kill nos bosses)

---

## 📊 Distribuição por Localização

### 🏰 GILDRAT (12 quests)
- Armadilhas: 5 quests (01-05)
- Guarda: 4 quests (06, 07, 08, 10)
- Civil: 3 quests (11, 12, 15)
- Corvos: 0 quests

**Pontos totais disponíveis em Gildrat:** 265 pontos

### ⛰️ MELIOS (6 quests)
- Guarda: 1 quest (09)
- Corvos: 5 quests (17-20, incluindo 16 que libera acesso)
- Armadilhas: 0 quests
- Civil: 0 quests

**Pontos totais disponíveis em Melios:** 120 pontos

### ⚒️ KRAVENS (3 quests + 1 especial)
- Civil: 2 quests (13, 14)
- Sigmetal: 1 quest (21)
- Armadilhas: 0 quests
- Guarda: 0 quests

**Pontos totais disponíveis em Kravens:** 35 pontos + Sigmetal

---

## 🎯 Distribuição por Dificuldade

### Fácil (Soft Core) - 10 quests
- Alta recompensa (20-30 pontos)
- Liberadas automaticamente em Gildrat
- **Quests:** 01, 02, 03, 06, 07, 08, 11, 12, 16

**Total de pontos:** 225 pontos (54% do total)

### Média - 8 quests
- Recompensa moderada (15-30 pontos)
- Requer visitar Melios ou Kravens
- **Quests:** 04, 09, 13, 14, 17, 18, 19, 20

**Total de pontos:** 165 pontos (40% do total)

### Difícil (Hard Core) - 3 quests
- Baixa recompensa (10-15 pontos)
- Requer pontuação alta (≥70) na variável específica
- **Quests:** 05, 10, 15

**Total de pontos:** 35 pontos (8% do total)

### Especial - 1 quest
- Multiplicador binário
- **Quest:** 21 (Sigmetal)

---

## 🔄 Fluxo de Progressão Recomendado

### Fase 1: Preparação Inicial em Gildrat
**Quests disponíveis imediatamente:**
- 01 - Mapear Posições
- 02 - Testar Dinamite
- 03 - Recrutar Sáparo
- 06 - Logística Militar
- 07 - Fortificar Muralhas
- 11 - Recrutar Civis
- 12 - Treinar Time Rúnico
- 16 - Negociar com Corvos

**Pontos ganhos:** 195 pontos

### Fase 2: Expedições (Melios e Kravens)
**Melios:**
- 09 - Resgatar Kilin (+20)
- 17 - Resgatar Grupo Corvos (+30)
- 18, 19, 20 - Corvos Isolados (+45)

**Kravens:**
- 13 - Resgatar Borin (+20)
- 14 - Resgatar Rebeldes (+15)
- 21 - Coletar Sigmetal (multiplicador)

**Pontos ganhos:** 130 pontos + Sigmetal

### Fase 3: Preparação Avançada em Gildrat
**Quests desbloqueadas por alta pontuação:**
- 04 - Posicionar Armadilhas (requer Kravens) (+15)
- 05 - Rota de Fuga (requer v_pontos_armadilhas ≥ 70) (+15)
- 08 - Treinar Formações (requer 06) (+20)
- 10 - Preparar Arsenal (requer v_forca_guarda ≥ 70) (+10)
- 15 - Treinar Rebeldes (requer v_forca_civil ≥ 70) (+10)

**Pontos ganhos:** 70 pontos

### Total Máximo Possível
**Pontos:** 195 + 130 + 70 = 395 pontos distribuídos em 4 variáveis de 100 cada
**Sigmetal:** Coletado (multiplicador ×1.5)

---

## 📈 Cenários de Gameplay

### 🏆 Jogador 100% (Hardcore Completionist)
**Quests completadas:** 21/21

**Variáveis:**
- v_pontos_armadilhas = 100
- v_forca_guarda = 100
- v_forca_civil = 100
- v_influencia_corvos = 100
- v_reforco_sigmetal = 1

**Resultado Fase 1:** 4 grupos de inimigos
**Resultado Fase 2:** Cada exército causa 5000 HP (one-hit kill)

---

### ⚠️ Jogador 50% (Casual Balanceado)
**Quests completadas:** ~10-12/21 (maioria fáceis)

**Variáveis:**
- v_pontos_armadilhas = 50
- v_forca_guarda = 50
- v_forca_civil = 50
- v_influencia_corvos = 50
- v_reforco_sigmetal = 1

**Resultado Fase 1:** 6 grupos de inimigos
**Resultado Fase 2:** Cada exército causa 3750 HP

---

### ❌ Jogador Mínimo (Story Only)
**Quests completadas:** 0/21 (só história linear)

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

| Personagem | Quests Relacionadas | Desenvolvimento |
|------------|---------------------|-----------------|
| **Balastrus** | 01-05, 21 | Redenção após quebrar selo, inventor estratégico |
| **Thordan** | 06, 10 | Relação pai-filho, reconhecimento de Thorin |
| **Kilin** | 08, 09 | Resgate, mentor veterano, líder tático |
| **Mhordred** | 09, 15 | Culpa por deixar Kilin, redenção como instrutor |
| **Filena** | 12, 13, 15 | Evolução de jogadora a líder militar, relação com pai |
| **Borin** | 13, 15 | Rebelde que respeita Thorin, líder dos mineradores |
| **Corvos** | 16-20 | Facção independente, confiança conquistada |
| **Time Rúnico** | 12 | Transformação de esporte para guerra |
| **Sáparo** | 03, 05 | Comic relief, lealdade, heroísmo improvável |

---

## 🔧 Implementação Técnica

### Variáveis do RPG Maker MZ
```javascript
$gameVariables.setValue(1, v_pontos_armadilhas);    // 0-100
$gameVariables.setValue(2, v_forca_guarda);         // 0-100
$gameVariables.setValue(3, v_forca_civil);          // 0-100
$gameVariables.setValue(4, v_influencia_corvos);    // 0-100
$gameVariables.setValue(5, v_reforco_sigmetal);     // 0-1
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

- [x] 05 quests de Armadilhas
- [x] 05 quests da Guarda de Ferro
- [x] 05 quests do Exército Civil
- [x] 05 quests dos Corvos
- [x] 01 quest de Sigmetal
- [x] Distribuição de pontos com Lei de Pareto
- [x] Gatilhos por dificuldade (fácil/média/difícil)
- [x] Arcos narrativos para cada personagem
- [ ] Implementação no RPG Maker MZ
- [ ] Testes de balanceamento
- [ ] Validação de dano máximo (5000 HP)

---

## 📖 Referências

- [Sistema Simplificado v2.0](../sistema-simplificado-narrativa-sistemica.md)
- [NPCs Mapa Teste](../npcs-mapa-teste.md)
- [Timeline História v5](../../../docs/GDD/3-historia/timeline-historia-jogo-v5.md)
- [Última Missão do Jogo](../../../docs/GDD/3-historia/ultima-missao-do-jogo.md)

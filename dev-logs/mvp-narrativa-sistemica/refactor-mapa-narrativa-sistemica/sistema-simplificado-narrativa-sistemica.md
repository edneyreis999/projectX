# Sistema Simplificado de Narrativa Sistêmica

**Data**: 2025-11-04
**Versão**: 2.0 (Ultra-Simplificada)
**Status**: Proposta Final

---

## Sumário Executivo

Sistema redesenhado com **5 variáveis** (redução de 62% das 13 originais) focado exclusivamente em:

- **Fase 1**: Eficácia das armadilhas (reduzir grupos de inimigos de 7→4)
- **Fase 2**: Dano dos 3 exércitos (atingir 5000 HP máximo de dano)

**Removido**: Variáveis de relacionamento, moral, e unlocks mecânicos.

---

## 📊 Visão Geral das 5 Variáveis

### FASE 1 - ARMADILHAS

1. **v_pontos_armadilhas** (0-10)
   - Define quantos grupos de Ignotos gigantes o jogador enfrenta
   - Faixas: 0-3=7grupos | 4-6=6grupos | 7-8=5grupos | 9-10=4grupos

### FASE 2 - EXÉRCITOS

2. **v_forca_guarda** (0-10) - Guarda de Ferro
3. **v_forca_civil** (0-10) - Exército Civil (rebeldes + civis + time rúnico)
4. **v_influencia_corvos** (0-10) - Corvos
5. **v_reforco_sigmetal** (0-1) - Multiplicador Global (+50% dano para todos)

---

## 🎪 FASE 1: Sistema de Armadilhas

### Variável: `v_pontos_armadilhas` (0-10)

Determina a eficácia das armadilhas que eliminam Ignotos gigantes antes da Fase 2.

#### Faixas de Eficácia

| Pontos | Grupos de Inimigos | Dificuldade |
|--------|-------------------|-------------|
| 0-3 | 7 grupos | Muito Difícil |
| 4-6 | 6 grupos | Difícil |
| 7-8 | 5 grupos | Normal |
| 9-10 | 4 grupos | Fácil |

#### Quests de Armadilhas (Gildrat - Balastrus)

| Quest | Pontos | Descrição |
|-------|--------|-----------|
| **Mapear Posições Estratégicas** | +2 | Identificar pontos de gargalo no caminho até Gildrat |
| **Testar Dinamite** | +2 | Calibrar explosivos de Balastrus para máximo impacto |
| **Recrutar Sáparo como Isca** | +2 | Treinar Sáparo Boca-de-Corneta como isca perfeita |
| **Posicionar Armadilhas no Caminho** | +2 | Instalar dinamites nos locais estratégicos mapeados |
| **Criar Rota de Fuga para Isca** | +2 | Garantir que a isca sobreviva e retorne a salvo |

**Total Máximo: 10 pontos (5 quests × 2 pontos cada)**

#### Impacto na Narrativa

- **0-3 pontos**: Armadilhas mal posicionadas, Ignotos quase não são afetados
- **4-6 pontos**: Armadilhas funcionais, eliminam alguns Ignotos
- **7-8 pontos**: Armadilhas eficientes, eliminam boa parte dos Ignotos
- **9-10 pontos**: Armadilhas perfeitas, Sáparo atrai perfeitamente e maximiza dano

---

## ⚔️ FASE 2: Sistema de Exércitos

### Fórmula Universal de Dano

```javascript
Dano_Final = 1667 × (1 + força/10) × (1 + sigmetal × 0.5)

Componentes:
├─ Base: 1667 HP
├─ força: 0-10 (variável específica do exército)
└─ sigmetal: 0 ou 1 (multiplicador global de +50%)
```

### Escala de Dano por Preparação

| Cenário | Força | Sigmetal | Cálculo | Dano Final |
|---------|-------|----------|---------|------------|
| **Mínimo** | 0 | Não | 1667 × 1.0 × 1.0 | **1667 HP** |
| **Baixo** | 3 | Não | 1667 × 1.3 × 1.0 | **2167 HP** |
| **Médio** | 5 | Não | 1667 × 1.5 × 1.0 | **2500 HP** |
| **Alto** | 8 | Sim | 1667 × 1.8 × 1.5 | **4501 HP** |
| **Máximo** | 10 | Sim | 1667 × 2.0 × 1.5 | **5000 HP** ✓ |

**Nota**: 5000 HP é o HP máximo dos bosses, garantindo one-hit kill com preparação completa.

---

## 1️⃣ Exército: Guarda de Ferro

### Variável: `v_forca_guarda` (0-10)

Representa a prontidão e força da Guarda de Ferro liderada por Thordan.

#### Quests em Gildrat (8 pontos)

| Quest | Pontos | NPC/Local | Descrição |
|-------|--------|-----------|-----------|
| **Organizar Logística Militar** | +2 | Thordan | Suprimentos, rotas de abastecimento, coordenação |
| **Fortificar Muralhas** | +2 | Engenheiros | Reforçar defesas externas da cidade |
| **Treinar Formações de Combate** | +2 | Kilin (se resgatado) | Táticas anti-Ignoto em grupo |
| **Preparar Arsenal** | +2 | Armeiro | Distribuir armas e armaduras para a Guarda |

#### Quest em Melios (2 pontos)

| Quest | Pontos | Descrição |
|-------|--------|-----------|
| **Resgatar Kilin** | +2 | Resgatar o comandante veterano fortalece moral e liderança |

**Total Máximo: 10 pontos**

#### Impacto Narrativo

- **0 pontos**: Guarda despreparada, caótica, sem coordenação
- **5 pontos**: Guarda funcional, mas sem otimização
- **10 pontos**: Guarda de elite, perfeitamente coordenada e equipada

---

## 2️⃣ Exército: Civil (Rebeldes + Civis + Time Rúnico)

### Variável: `v_forca_civil` (0-10)

Representa a força do exército formado por:

- Rebeldes de Kravens liderados por Borin
- Civis voluntários de Gildrat
- Time de Futebol Rúnico treinado para combate

#### Quests em Gildrat (4 pontos)

| Quest | Pontos | NPC/Local | Descrição |
|-------|--------|-----------|-----------|
| **Recrutar Civis para Milícia** | +2 | Praça Central | Voluntários defendem suas famílias |
| **Treinar Time Rúnico como Unidade** | +2 | Estádio | Time usa habilidades rúnicas em combate |

#### Quests em Kravens (6 pontos)

| Quest | Pontos | Descrição |
|-------|--------|-----------|
| **Resgatar Borin (Líder Rebelde)** | +2 | Pai de Filena, líder dos mineradores rebeldes |
| **Resgatar Grupos de Rebeldes** | +2 | Mineradores presos que se juntam à causa |
| **Filena/Mhordred Treinam Rebeldes** | +2 | Transformar mineradores em guerreiros |

**Total Máximo: 10 pontos**

#### Composição do Exército Civil

- **Rebeldes** (Kravens): Mineradores experientes, conhecem táticas de guerrilha
- **Civis** (Gildrat): Comerciantes, artesãos, famílias defendendo lares
- **Time Rúnico**: Atletas com habilidades mágicas de combate coordenado

#### Impacto Narrativo

- **0 pontos**: Apenas civis desorganizados, pouca efetividade
- **5 pontos**: Milícia funcional com liderança básica
- **10 pontos**: Exército civil treinado, motivado e bem liderado

---

## 3️⃣ Exército: Corvos

### Variável: `v_influencia_corvos` (0-10)

Representa a confiança e colaboração dos Corvos (mineradores independentes) com Gildrat.

#### Quest em Gildrat (2 pontos)

| Quest | Pontos | NPC | Descrição |
|-------|--------|-----|-----------|
| **Negociar Aliança com Corvos** | +2 | Chefe dos Corvos | Convencer facção independente a ajudar |

#### Quests em Melios (8 pontos)

| Quest | Pontos | Descrição |
|-------|--------|-----------|
| **Resgatar Grupo Principal de Corvos** | +5 | Evacuação em massa do contingente principal |
| **Resgatar Corvo Isolado 1** | +1 | Corvo preso em túnel lateral da mina |
| **Resgatar Corvo Isolado 2** | +1 | Corvo ferido escondido em câmara |
| **Resgatar Corvo Isolado 3** | +1 | Corvo isolado em seção profunda |

**Total Máximo: 10 pontos**

#### Impacto Narrativo

- **0 pontos**: Corvos não participam, agem independentemente
- **5 pontos**: Alguns Corvos ajudam por gratidão
- **10 pontos**: Aliança total, Corvos lutam com Gildrat

---

## 🔥 Multiplicador Global: Sigmetal

### Variável: `v_reforco_sigmetal` (0-1)

Minério raro que é a **fraqueza primária dos Ignotos**.

#### Quest em Kravens

| Quest | Valor | Descrição |
|-------|-------|-----------|
| **Coletar Sigmetal na Câmara Revelada** | +1 | Acessar câmara secreta após derrotar Cristaleão |

#### Efeito Mecânico

```javascript
Multiplicador = (1 + sigmetal × 0.5)

sem_sigmetal: dano × 1.0
com_sigmetal: dano × 1.5  // +50% de dano
```

#### Impacto Narrativo

- **Sem Sigmetal** (0): Exércitos usam armas convencionais, menos efetivas contra Ignotos
- **Com Sigmetal** (1): Todos os 3 exércitos equipados com armas anti-Ignoto, dano crítico

**Importância**: É ESSENCIAL para atingir os 5000 HP de dano máximo.

---

## 📍 Distribuição de Quests por Localização

### 🏰 GILDRAT (12 quests)

#### Armadilhas (5 quests - 10 pontos)

- Mapear posições (+2)
- Testar dinamite (+2)
- Recrutar Sáparo (+2)
- Posicionar armadilhas (+2)
- Criar rota de fuga (+2)

#### Guarda de Ferro (4 quests - 8 pontos)

- Logística militar (+2)
- Fortificar muralhas (+2)
- Treinar formações (+2)
- Preparar arsenal (+2)

#### Exército Civil (2 quests - 4 pontos)

- Recrutar civis (+2)
- Treinar time rúnico (+2)

#### Corvos (1 quest - 2 pontos)

- Negociar aliança (+2)

**Total em Gildrat: 12 quests gerando 24 pontos de força**

---

### ⛰️ MELIOS (5 quests)

#### Guarda de Ferro (1 quest - 2 pontos)

- Resgatar Kilin (+2)

#### Corvos (4 quests - 8 pontos)

- Grupo principal (+5)
- Corvo isolado 1 (+1)
- Corvo isolado 2 (+1)
- Corvo isolado 3 (+1)

**Total em Melios: 5 quests gerando 10 pontos de força**

---

### ⚒️ KRAVENS (4 quests)

#### Sigmetal (1 quest - valor binário)

- Coletar Sigmetal (+1) → habilita multiplicador global

#### Exército Civil (3 quests - 6 pontos)

- Resgatar Borin (+2)
- Resgatar grupos rebeldes (+2)
- Treinar rebeldes (+2)

**Total em Kravens: 4 quests gerando 6 pontos + multiplicador global**

---

## 🎮 Cenários de Gameplay

### 🏆 Cenário 1: Jogador 100% (Preparação Máxima)

**GILDRAT:**

- Completa todas 5 quests de armadilhas → `v_pontos_armadilhas = 10`
- Completa 4 quests da Guarda → `v_forca_guarda = 8`
- Completa 2 quests do exército civil → `v_forca_civil = 4`
- Negocia com Corvos → `v_influencia_corvos = 2`

**MELIOS:**

- Resgata Kilin → `v_forca_guarda = 10`
- Resgata todos os Corvos (grupo + 3 isolados) → `v_influencia_corvos = 10`

**KRAVENS:**

- Coleta Sigmetal → `v_reforco_sigmetal = 1`
- Completa 3 quests de rebeldes → `v_forca_civil = 10`

**RESULTADO FASE 1:**

- Armadilhas com 10 pontos → **4 grupos de inimigos** (mínimo, mais fácil)

**RESULTADO FASE 2:**

- Guarda: 1667 × 2.0 × 1.5 = **5000 HP** (one-hit kill)
- Civil: 1667 × 2.0 × 1.5 = **5000 HP** (one-hit kill)
- Corvos: 1667 × 2.0 × 1.5 = **5000 HP** (one-hit kill)

**Experiência**: Fase 1 mais fácil, Fase 2 dominada completamente.

---

### ⚠️ Cenário 2: Jogador 50% (Preparação Média)

**Faz metade das quests disponíveis**

**Variáveis:**

- `v_pontos_armadilhas = 5`
- `v_forca_guarda = 5`
- `v_forca_civil = 5`
- `v_influencia_corvos = 5`
- `v_reforco_sigmetal = 1`

**RESULTADO FASE 1:**

- Armadilhas com 5 pontos → **6 grupos de inimigos** (difícil)

**RESULTADO FASE 2:**

- Guarda: 1667 × 1.5 × 1.5 = **3750 HP** (2 hits para matar)
- Civil: 1667 × 1.5 × 1.5 = **3750 HP** (2 hits para matar)
- Corvos: 1667 × 1.5 × 1.5 = **3750 HP** (2 hits para matar)

**Experiência**: Desafiador mas gerenciável com estratégia.

---

### ❌ Cenário 3: Jogador Mínimo (Sem Preparação)

**Só faz o essencial para avançar a história principal**

**Variáveis:**

- `v_pontos_armadilhas = 0`
- `v_forca_guarda = 0`
- `v_forca_civil = 0`
- `v_influencia_corvos = 0`
- `v_reforco_sigmetal = 0`

**RESULTADO FASE 1:**

- Armadilhas com 0 pontos → **7 grupos de inimigos** (muito difícil)

**RESULTADO FASE 2:**

- Guarda: 1667 × 1.0 × 1.0 = **1667 HP** (3+ hits para matar)
- Civil: 1667 × 1.0 × 1.0 = **1667 HP** (3+ hits para matar)
- Corvos: 1667 × 1.0 × 1.0 = **1667 HP** (3+ hits para matar)

**Experiência**: Muito difícil, batalhas longas, alta chance de game over.

---

## 📊 Tabela Comparativa: Sistema Anterior vs Novo

| Aspecto | Sistema Anterior (v1.0) | Sistema Novo (v2.0) |
|---------|-------------------------|---------------------|
| **Total de Variáveis** | 13 | 5 |
| **Redução** | - | **-62%** |
| **Foco** | Multifacetado (combate + relações + moral) | Armadilhas + Dano dos Exércitos |
| **Exércitos** | 4 separados | 3 consolidados |
| **Armadilhas** | Binário (Sáparo sim/não) | Sistema de pontos (0-10) |
| **Dano Máximo** | Indefinido | 5000 HP (one-hit kill) |
| **Dano Mínimo** | Indefinido | 1667 HP |
| **Quests Totais** | ~30+ | 21 quests |
| **Variáveis de Relação** | 2 (Thordan, Filena) | 0 (removidas) |
| **Variável de Moral** | 1 (v_moral_gildrat) | 0 (removida) |
| **Variáveis de Unlock** | 2 (Melios, Kravens) | 0 (movidas para switches) |
| **Complexidade** | Alta | Baixa |
| **Testabilidade** | Difícil | Fácil |

---

## ✅ Variáveis Removidas

### Por Que Foram Removidas

| Variável Removida | Motivo da Remoção |
|-------------------|-------------------|
| `v_moral_gildrat` | Não afeta diretamente armadilhas ou dano dos exércitos |
| `v_boa_vontade_thordan` | Arco de personagem, fora do escopo de combate |
| `v_empatia_filena` | Arco de personagem, fora do escopo de combate |
| `v_folego_time_runico` (separado) | Incorporado em `v_forca_civil` |
| `v_preparo_militar` (separado) | Consolidado em `v_forca_guarda` |
| `v_resgate_melios` (3 valores) | Simplificado: só Kilin é resgatado (+2) |
| `v_resgate_kravens` (separado) | Consolidado em `v_forca_civil` |
| `v_treinamento_rebeldes` (separado) | Consolidado em `v_forca_civil` |
| `v_resgate_borin` (separado) | Consolidado em `v_forca_civil` |

**Decisão de Design**: Focar exclusivamente em mecânicas que impactam as Fases 1 e 2 de "Defender Gildrat".

---

## 🔧 Implementação Técnica (RPG Maker MZ)

### Mapeamento de Variáveis

```javascript
// FASE 1 - ARMADILHAS
$gameVariables.setValue(1, v_pontos_armadilhas);    // 0-10

// FASE 2 - FORÇA DOS EXÉRCITOS
$gameVariables.setValue(2, v_forca_guarda);         // 0-10
$gameVariables.setValue(3, v_forca_civil);          // 0-10
$gameVariables.setValue(4, v_influencia_corvos);    // 0-10

// FASE 2 - MULTIPLICADOR GLOBAL
$gameVariables.setValue(5, v_reforco_sigmetal);     // 0-1
```

### Cálculo de Grupos de Inimigos (Fase 1)

```javascript
const pontos = $gameVariables.value(1);
let grupos_inimigos;

if (pontos >= 9) {
  grupos_inimigos = 4;  // Armadilhas perfeitas
} else if (pontos >= 7) {
  grupos_inimigos = 5;  // Armadilhas eficientes
} else if (pontos >= 4) {
  grupos_inimigos = 6;  // Armadilhas funcionais
} else {
  grupos_inimigos = 7;  // Armadilhas ruins
}

$gameVariables.setValue(10, grupos_inimigos);
```

### Cálculo de Dano de Exército (Fase 2)

```javascript
function calcularDanoExercito(id_var_forca) {
  const BASE = 1667;
  const forca = $gameVariables.value(id_var_forca);
  const sigmetal = $gameVariables.value(5);

  // Multiplicador de força (0-10 → 1.0x-2.0x)
  const mult_forca = 1 + (forca / 10);

  // Multiplicador de Sigmetal (0 ou 1 → 1.0x ou 1.5x)
  const mult_sigmetal = 1 + (sigmetal * 0.5);

  // Dano final
  const dano = Math.floor(BASE * mult_forca * mult_sigmetal);

  return dano;
}

// Uso nas Skills dos Exércitos
const dano_guarda = calcularDanoExercito(2);  // v_forca_guarda
const dano_civil = calcularDanoExercito(3);   // v_forca_civil
const dano_corvos = calcularDanoExercito(4);  // v_influencia_corvos
```

### Sistema de Invocação de Exército (Skill)

```javascript
// Skill ID 50: Invocar Guarda de Ferro
// Skill ID 51: Invocar Exército Civil
// Skill ID 52: Invocar Corvos

// No Common Event da Skill:
const skill_id = $gameTemp.lastActionData().item.id;
let dano = 0;

switch(skill_id) {
  case 50: dano = calcularDanoExercito(2); break; // Guarda
  case 51: dano = calcularDanoExercito(3); break; // Civil
  case 52: dano = calcularDanoExercito(4); break; // Corvos
}

// Aplicar dano em área (todos os inimigos)
$gameTroop.members().forEach(enemy => {
  enemy.gainHp(-dano);
});
```

---

## 📋 Checklist de Implementação

### Fase 1: Estrutura Básica

- [ ] Criar 5 variáveis do jogo (1-5)
- [ ] Criar variável auxiliar para grupos_inimigos (10)
- [ ] Implementar função `calcularDanoExercito()`
- [ ] Criar Common Event para cálculo de grupos

### Fase 2: Quests de Gildrat

- [ ] Implementar 5 quests de armadilhas (Balastrus)
- [ ] Implementar 4 quests da Guarda de Ferro
- [ ] Implementar 2 quests do Exército Civil
- [ ] Implementar 1 quest de aliança com Corvos

### Fase 3: Quests de Melios

- [ ] Implementar resgate de Kilin
- [ ] Implementar resgate do grupo principal de Corvos
- [ ] Implementar resgate de 3 Corvos isolados

### Fase 4: Quests de Kravens

- [ ] Implementar coleta de Sigmetal
- [ ] Implementar resgate de Borin
- [ ] Implementar resgate de grupos rebeldes
- [ ] Implementar treinamento de rebeldes

### Fase 5: Sistema de Combate (Fase 2)

- [ ] Criar Skill "Invocar Guarda de Ferro"
- [ ] Criar Skill "Invocar Exército Civil"
- [ ] Criar Skill "Invocar Corvos"
- [ ] Configurar dano baseado nas variáveis
- [ ] Balancear HP dos bosses (máx 5000 HP)

### Fase 6: Testes

- [ ] Testar cenário mínimo (0 preparação)
- [ ] Testar cenário médio (50% preparação)
- [ ] Testar cenário máximo (100% preparação)
- [ ] Validar one-hit kill com 5000 HP
- [ ] Validar faixas de grupos de inimigos (4-7)

---

## 🎯 Vantagens do Sistema Simplificado

### 1. Clareza Mecânica

- Cada exército tem **1 variável clara de força**
- Sistema de armadilhas com **faixas bem definidas**
- Dano máximo **previsível e testável** (5000 HP)

### 2. Facilidade de Balanceamento

- Fórmula matemática simples e ajustável
- Apenas 3 valores para balancear (BASE, mult_forca, mult_sigmetal)
- Escala linear e compreensível

### 3. Redução de Complexidade

- **62% menos variáveis** para rastrear
- **21 quests focadas** vs ~30+ dispersas
- Foco exclusivo em mecânicas de combate

### 4. Testabilidade

- Fácil criar cenários de teste (mín, médio, máx)
- Menos edge cases para considerar
- Debug mais simples com menos variáveis

### 5. Narrativa Sistêmica Preservada

- Escolhas do jogador ainda importam muito
- Diferença clara entre preparação mínima e máxima
- Consequências diretas e mensuráveis

---

## 📖 Referências

- [Timeline História v5](../../docs/GDD/3-historia/timeline-historia-jogo-v5.md)
- [Última Missão do Jogo](../../docs/GDD/3-historia/ultima-missao-do-jogo.md)
- [NPCs Mapa Teste](./npcs-mapa-teste.md)
- [PRD Mapa Teste](./prd-mapa-teste-narrativa-sistemica.md)

---

## 🔄 Histórico de Versões

### v2.0 (2025-11-04) - Sistema Ultra-Simplificado

- Redução de 13 → 5 variáveis (62%)
- Foco exclusivo em armadilhas e dano dos exércitos
- Remoção de variáveis de relação e moral
- Sistema de pontos para armadilhas (0-10)
- Dano máximo definido em 5000 HP
- Consolidação de Time Rúnico em Exército Civil

### v1.0 (2025-11-02) - Sistema Original

- 13 variáveis rastreando múltiplos aspectos
- Incluía relações pessoais e moral
- Sistema de armadilhas binário
- Dano indefinido

---

**Autor**: Claude Code (Brainstorm com Sequential Thinking MCP)
**Revisão**: Edney Reis
**Status**: Aguardando aprovação para implementação

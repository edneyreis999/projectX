# Sistema de Experiência - ProjectX

**Documento:** Especificação do Sistema de Experiência
**Data:** 2026-03-07
**Versão:** 1.0
**Status:** Em Implementação

---

## Visão Geral

O sistema de experiência (EXP) do ProjectX governa a progressão de níveis dos personagens jogáveis durante o jogo. Este documento descreve como o sistema funciona atualmente, incluindo a fórmula de cálculo, distribuição de EXP por inimigo e progressão esperada através das áreas do jogo.

---

## Fórmula de EXP por Nível

### Curva Exponencial

```
EXP_total_para_nível = 50 × nível²
```

**Exemplos:**
- Nível 1: 0 EXP (início)
- Nível 5: 1.250 EXP
- Nível 10: 5.000 EXP
- Nível 15: 13.500 EXP
- Nível 20: 20.000 EXP
- Nível 25: 31.250 EXP
- Nível 30: 45.000 EXP (nível máximo)

### Implementação no RPG Maker MZ

No RPG Maker MZ, a curva de EXP é configurada através do parâmetro `expParams` nas Classes:

```json
"expParams": [0, 50, 200, 0]
```

**Fórmula do RPG Maker MZ:**
```
EXP = base + extra × level^(inclination/100) × (1 + acceleration/100)
```

**Com os valores [0, 50, 200, 0]:**
```
EXP = 0 + 50 × level^(200/100) × (1 + 0/100)
EXP = 50 × level²
```

---

## Progressão de Níveis por Área

### Níveis Iniciais dos Personagens

| Personagem | Classe | Nível Inicial | EXP Acumulada |
|------------|--------|---------------|---------------|
| Thorin (003) | Fundeiro | 1 | 0 |
| Filena (004) | Fighter | 1 | 0 |
| Kilin (005) | Paladin | **7** | 2.450 |
| Mhordred (006) | Berserker | **6** | 1.800 |
| Balastrus (008) | Alquimista | **15** | 11.250 |

> **Nota:** Kilin e Mhordred iniciam em níveis mais altos por serem personagens experientes. Balastrus entra na party durante o Esgoto de Gildrat.

---

### Estrada do Cão-Luar (Troops 2-11)

**Objetivo:** Thorin/Filena 1→6, Kilin/Mhordred nivelados com o grupo

| Tropa | Inimigos | XP Total |
|-------|----------|----------|
| 2 | Lobo Jovem x2 | 30 |
| 3 | Lobo Jovem x3 | 45 |
| 4 | Goblin Saqueador x2 | 50 |
| 5 | Goblin Saqueador x3 | 75 |
| 6 | Lobo de Gelo x3 | 90 |
| 7 | Lobo de Gelo x4 | 120 |
| 8 | Bandido Anão x3 | 105 |
| 9 | Lobo Alpha x1 + Lobo de Gelo x2 | 105 |
| 10 | Goblin x2 + Bandido x2 | 120 |
| 11 | Lobo de Gelo x2 + Lobo Jovem x2 | 90 |

**XP Médio por combate:** ~83 XP
**20 combates:** ~1.660 XP

**Níveis esperados após completar:**
- Thorin/Filena: nv 1 → **nv 6**
- Kilin: nv 7 → **nv 7** (mantém)
- Mhordred: nv 6 → **nv 7**
- ✅ Grupo nivelado (diferença máx 1 nível)

---

### Minas de Kravens (Troops 23-32)

**Objetivo:** Todos até ~nv 9-10

| Tropa | Inimigos | XP Total |
|-------|----------|----------|
| 23 | Morcego x3 | 75 |
| 24 | Morcego x4 | 100 |
| 25 | Morcego x5 | 125 |
| 26 | Aranha Mineira x2 | 70 |
| 27 | Aranha Mineira x3 | 105 |
| 28 | Morcego x3 + Aranha x1 | 110 |
| 29 | Aranha Gigante x2 | 100 |
| 30 | Rato Gigante x4 | 200 |
| 31 | Aranha Gigante x1 + Rato Gigante x3 | 200 |
| 32 | Cristaleão (BOSS) | 120 (opcional) |

**XP Médio por combate:** ~120 XP
**20 combates:** ~2.400 XP

**Níveis esperados após completar:**
- Todos: **nv 9-10**
- ✅ Grupo coeso, pronto para o Esgoto

---

### Esgoto de Gildrat (Troops 44-51)

**Objetivo:** Todos ~nv 11-13 quando Balastrus entra (nv 15)

| Tropa | Inimigos | XP Total |
|-------|----------|----------|
| 44 | Rato de Esgoto x4 | 160 |
| 45 | Rato de Esgoto x5 | 200 |
| 46 | Limo Ácido x1 | 55 |
| 47 | Limo Ácido x2 | 110 |
| 48 | Rato x3 + Limo x1 | 175 |
| 49 | Fungo Venenoso x2 | 150 |
| 50 | Gosma Tóxica x1 | 75 |
| 51 | Pestesporo (BOSS) | 150 (opcional) |

**XP Médio por combate:** ~135 XP
**20 combates:** ~2.700 XP

**Níveis esperados após completar:**
- Grupo existente: **nv 11-13**
- Balastrus entra: **nv 15** (2-4 níveis acima, aceitável para "veterano")

---

### Ruínas de Melios (Troops 63-70)

**Objetivo:** nv 15→30 (final do jogo)

| Tropa | Inimigos | XP Total |
|-------|----------|----------|
| 63 | Guardião Menor x2 | 120 |
| 64 | Guardião Menor x3 | 180 |
| 65 | Elemental de Terra x1 | 80 |
| 66 | Guardião Menor x1 + Elemental x1 | 140 |
| 67 | Guardião Ancião (BOSS) | 180 (opcional) |
| 68 | Sombra Errante x1 | 100 |
| 69 | Corvos de Melios (BOSS) | 200 (opcional) |
| 70 | Guardião Colossal (BOSS) | 200 (opcional) |

**XP Médio por combate:** ~145 XP
**20 combates:** ~2.900 XP

**Progressão:**
- Do nv 15 ao 30: precisa de 31.500 XP adicionais
- ✅ Sobra XP para farming e conclusão 100%

---

## EXP por Inimigo

### Tabela Completa de EXP

| ID | Inimigo | EXP | Área | Categoria |
|----|---------|-----|------|-----------|
| **ESTRADA DO CÃO-LUAR** |||||
| 2 | Lobo Jovem | 15 | Cão-Luar | Base |
| 3 | Goblin Saqueador | 25 | Cão-Luar | Médio |
| 4 | Lobo de Gelo | 30 | Cão-Luar | Médio |
| 5 | Bandido Anão Renegado | 35 | Cão-Luar | Elite |
| 6 | Lobo Alpha de Gelo | 45 | Cão-Luar | Mini-Boss |
| **MINAS DE KRAVENS** |||||
| 13 | Morcego de Caverna | 25 | Kravens | Base |
| 14 | Aranha Mineira | 35 | Kravens | Médio |
| 15 | Aranha Gigante | 50 | Kravens | Elite |
| 16 | Rato Gigante Mutante | 50 | Kravens | Elite |
| 17 | Cristaleão | 120 | Kravens | BOSS |
| **ESGOTO DE GILDRAT** |||||
| 24 | Rato de Esgoto | 40 | Esgoto | Base |
| 25 | Limo Ácido | 55 | Esgoto | Médio |
| 26 | Fungo Venenoso Gigante | 75 | Esgoto | Elite |
| 27 | Gosma Tóxica | 75 | Esgoto | Elite |
| 28 | Pestesporo | 150 | Esgoto | BOSS |
| **RUÍNAS DE MELIOS** |||||
| 35 | Guardião Menor de Pedra | 60 | Melios | Base |
| 36 | Elemental de Terra | 80 | Melios | Médio |
| 37 | Guardião Ancião | 180 | Melios | BOSS |
| 38 | Sombra Errante | 100 | Melios | Elite |
| 39 | Corvos de Melios | 200 | Melios | BOSS |
| 40 | Guardião Colossal | 200 | Melios | BOSS |

---

## Validação e Testes

### Script de Validação

Use o script `validate-exp-curve.js` para verificar se a curva de EXP está implementada corretamente:

```bash
node docs/GDD/6-combate/validate-exp-curve.js
```

**Saída esperada:**
```
expParams encontrado: [0, 50, 200, 0]

+--------+------------------+------------------+---------------+------------------+
| Nivel  | EXP Implementada | EXP Ideal (50n²) | Diferença     | % Diferença      |
+--------+------------------+------------------+---------------+------------------+
| 1      |               50 |               50 |            +0 | +0.00%           |
| 10     |            5.000 |            5.000 |            +0 | +0.00%           |
| 30     |           45.000 |           45.000 |            +0 | +0.00%           |
+--------+------------------+------------------+---------------+------------------+

VEREDITO: V CURVA COMPATIVEL: Diferença dentro da margem aceitavel (< 5%)
```

### Playtest Checklist

- [ ] Iniciar novo jogo
- [ ] Verificar EXP necessária para cada nível na tela de Status
- [ ] Completar Estrada do Cão-Luar e verificar níveis (todos nv 6-7)
- [ ] Completar Minas de Kravens e verificar níveis (todos nv 9-10)
- [ ] Completar Esgoto de Gildrat e verificar níveis (todos nv 11-13, Balastrus nv 15)
- [ ] Verificar se grupo permanece nivelado (diferença máx 1-2 níveis)
- [ ] Testar combate em Ruínas de Melios
- [ ] Verificar se é possível alcançar nv 30 até o final do jogo

---

## Arquivos de Configuração

### Classes.json

Caminho: `/Users/edney/projects/coreto/projectX/frontend/data/Classes.json`

Todas as 5 classes devem ter o mesmo `expParams`:
```json
{
  "id": 1,
  "name": "Fighter",
  "expParams": [0, 50, 200, 0]
}
```

### Enemies.json

Caminho: `/Users/edney/projects/coreto/projectX/frontend/data/Enemies.json`

Cada inimigo tem seu valor de EXP definido:
```json
{
  "id": 2,
  "name": "Lobo Jovem",
  "exp": 15,
  ...
}
```

---

## Referências

- [RPG Maker MZ Data Reference](../../../game-engine/planos/028-fix-exp-heros/RPG_MAKER_DATA_REFERENCE.md)
- [Proposta de Balanceamento EXP](../../../game-engine/planos/028-fix-exp-heros/PROPOSTA_BALANCEAMENTO_EXP.md)
- [Plano de Implementação](../../../game-engine/planos/028-fix-exp-heros/PLANO_IMPLEMENTACAO.md)
- [Guia de Implementação Plugin](../../../game-engine/planos/028-fix-exp-heros/GUIA_IMPLEMENTACAO_PLUGIN_EXP_CURVE.md)

---

**Fim do Documento**

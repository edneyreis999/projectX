# Sistema de Experiência - ProjectX

**Documento:** Especificação do Sistema de Experiência
**Data:** 2026-03-11
**Versão:** 3.1
**Status:** ✅ AJUSTADO - Curva reajustada para diferenciar protagonistas/guardas

---

## Visão Geral

O sistema de experiência (EXP) do ProjectX governa a progressão de níveis dos personagens jogáveis durante o jogo. Este documento descreve como o sistema funciona atualmente, incluindo a fórmula de cálculo, distribuição de EXP por inimigo e progressão esperada através das áreas do jogo.

---

## Fórmula de EXP por Nível

### Curva de Progressão (Ajustada)

O sistema usa a fórmula nativa do RPG Maker MZ com parâmetros ajustados para criar uma curva de progressão balanceada.

### Implementação no RPG Maker MZ

No RPG Maker MZ, a curva de EXP é configurada através do parâmetro `expParams` nas Classes:

```json
"expParams": [4, 50, 150, 1]
```

**Parâmetros:**
- `basis` = 4 → Base exponencial ajustada (progressão moderada)
- `extra` = 50 → Componente linear adicionado a cada nível
- `acc_a` = 150 → Inclinação da curva exponencial
- `acc_b` = 1 → Aceleração (evita divisão por zero)

**Fórmula Real do RPG Maker MZ** (rmmz_objects.js linha 4159):
```javascript
EXP = Math.round(
    (basis × level^1.5 × level × (level+1)) / (6 + level²/50) +
    (level-1) × extra
)
```

### Tabela de EXP por Nível

| Nível | EXP Acumulada | EXP p/ Próximo |
|-------|---------------|----------------|
| 1 | 0 | 54 |
| 2 | 54 | 68 |
| 3 | 122 | 94 |
| 4 | 216 | 132 |
| 5 | 348 | 182 |
| 6 | 530 | 242 |
| 7 | 772 | 311 |
| 8 | 1.083 | 386 |
| 9 | 1.469 | 466 |
| 10 | 1.935 | 548 |
| 11 | 2.483 | 626 |
| 12 | 3.109 | 721 |
| 13 | 3.830 | 822 |
| 14 | 4.652 | 926 |
| 15 | 5.578 | 1.036 |
| 20 | 11.964 | 1.666 |
| 25 | 21.756 | 2.423 |
| 30 | 35.581 | - (máximo) |

---

## Progressão de Níveis por Área

### Níveis Iniciais dos Personagens

| Personagem | Classe | Nível Inicial | EXP Acumulada |
|------------|--------|---------------|---------------|
| Thorin (003) | Fundeiro | 1 | 0 |
| Filena (004) | Fighter | 1 | 0 |
| Kilin (005) | Paladin | **8** | 522 |
| Mhordred (006) | Berserker | **7** | 415 |
| Balastrus (008) | Alquimista | **15** | 1.676 |

> **Nota:** Kilin e Mhordred iniciam em níveis mais altos por serem personagens experientes. Balastrus entra na party durante o Esgoto de Gildrat.

---

### Estrada do Cão-Luar (Troops 2-11)

**Objetivo:** Todos atingem nv 10+ rapidamente

| Tropa | Inimigos | XP Total |
|-------|----------|----------|
| 2 | Lobo Jovem x2 | 76 |
| 3 | Lobo Jovem x3 | 114 |
| 4 | Goblin Saqueador x2 | 126 |
| 5 | Goblin Saqueador x3 | 189 |
| 6 | Lobo de Gelo x3 | 225 |
| 7 | Lobo de Gelo x4 | 300 |
| 8 | Bandido Anão x3 | 264 |
| 9 | Lobo Alpha x1 + Lobo de Gelo x2 | 263 |
| 10 | Goblin x2 + Bandido x2 | 302 |
| 11 | Lobo de Gelo x2 + Lobo Jovem x2 | 226 |

**XP Médio por combate:** ~209 XP
**20 combates:** ~4.180 XP

**Níveis esperados após completar:**
- Thorin/Filena: nv 1 → **nv 13** (4.180 XP)
- Kilin: nv 8 → **nv 14** (1.083 + 4.180 = 5.263 XP)
- Mhordred: nv 7 → **nv 14** (772 + 4.180 = 4.952 XP)
- ✅ Grupo nivelado (diferença de 1 nível)

---

### Minas de Kravens (Troops 23-32)

**Objetivo:** Todos até ~nv 18-20

| Tropa | Inimigos | XP Total |
|-------|----------|----------|
| 23 | Morcego x3 | 189 |
| 24 | Morcego x4 | 252 |
| 25 | Morcego x5 | 315 |
| 26 | Aranha Mineira x2 | 176 |
| 27 | Aranha Mineira x3 | 264 |
| 28 | Morcego x3 + Aranha x1 | 277 |
| 29 | Aranha Gigante x2 | 250 |
| 30 | Rato Gigante x4 | 500 |
| 31 | Aranha Gigante x1 + Rato Gigante x3 | 500 |
| 32 | Cristaleão (BOSS) | 120 (opcional) |

**XP Médio por combate:** ~302 XP
**20 combates:** ~6.040 XP

**Níveis esperados após completar (acumulando com área anterior):**
- Thorin/Filena: nv 14 → **nv 20** (4.180 + 6.040 = 10.220 XP)
- Kilin: nv 16 → **nv 22** (4.702 + 6.040 = 10.742 XP)
- Mhordred: nv 16 → **nv 22** (4.595 + 6.040 = 10.635 XP)
- ✅ Grupo coeso, pronto para o Esgoto

---

### Esgoto de Gildrat (Troops 44-51)

**Objetivo:** Todos ~nv 24-26 quando Balastrus entra (nv 15)

| Tropa | Inimigos | XP Total |
|-------|----------|----------|
| 44 | Rato de Esgoto x4 | 400 |
| 45 | Rato de Esgoto x5 | 500 |
| 46 | Limo Ácido x1 | 138 |
| 47 | Limo Ácido x2 | 276 |
| 48 | Rato x3 + Limo x1 | 438 |
| 49 | Fungo Venenoso x2 | 376 |
| 50 | Gosma Tóxica x1 | 188 |
| 51 | Pestesporo (BOSS) | 150 (opcional) |

**XP Médio por combate:** ~315 XP
**20 combates:** ~6.300 XP

**Níveis esperados após completar (acumulando):**
- Grupo existente: **nv 24-26** (4.180 + 6.040 + 6.300 ≈ 16.520 XP)
- Balastrus entra: **nv 15** (1.676 XP) - ATRASADO propositalmente
- ⚠️ Balastrus estará abaixo da party (design intencional para "veterano desatualizado")

---

### Ruínas de Melios (Troops 63-70)

**Objetivo:** nv 24-26 → 30 (final do jogo)

| Tropa | Inimigos | XP Total |
|-------|----------|----------|
| 63 | Guardião Menor x2 | 300 |
| 64 | Guardião Menor x3 | 450 |
| 65 | Elemental de Terra x1 | 200 |
| 66 | Guardião Menor x1 + Elemental x1 | 350 |
| 67 | Guardião Ancião (BOSS) | 180 (opcional) |
| 68 | Sombra Errante x1 | 250 |
| 69 | Corvos de Melios (BOSS) | 200 (opcional) |
| 70 | Guardião Colossal (BOSS) | 200 (opcional) |

**XP Médio por combate:** ~266 XP
**30 combates:** ~7.980 XP

**Progressão (do nv 24 ao 30):**
- EXP necessária: 7.120 - 5.222 = **1.898 XP**
- Com ~30 combates: ~7.980 XP por área
- ✅ Curva permite progressão confortável até o final

---

## EXP por Inimigo

### Tabela Completa de EXP

| ID | Inimigo | EXP | Área | Categoria |
|----|---------|-----|------|-----------|
| **ESTRADA DO CÃO-LUAR** |||||
| 2 | Lobo Jovem | 38 | Cão-Luar | Base |
| 3 | Goblin Saqueador | 63 | Cão-Luar | Médio |
| 4 | Lobo de Gelo | 75 | Cão-Luar | Médio |
| 5 | Bandido Anão Renegado | 88 | Cão-Luar | Elite |
| 6 | Lobo Alpha de Gelo | 113 | Cão-Luar | Mini-Boss |
| **MINAS DE KRAVENS** |||||
| 13 | Morcego de Caverna | 63 | Kravens | Base |
| 14 | Aranha Mineira | 88 | Kravens | Médio |
| 15 | Aranha Gigante | 125 | Kravens | Elite |
| 16 | Rato Gigante Mutante | 125 | Kravens | Elite |
| 17 | Cristaleão | 120 | Kravens | BOSS |
| **ESGOTO DE GILDRAT** |||||
| 24 | Rato de Esgoto | 100 | Esgoto | Base |
| 25 | Limo Ácido | 138 | Esgoto | Médio |
| 26 | Fungo Venenoso Gigante | 188 | Esgoto | Elite |
| 27 | Gosma Tóxica | 188 | Esgoto | Elite |
| 28 | Pestesporo | 150 | Esgoto | BOSS |
| **RUÍNAS DE MELIOS** |||||
| 35 | Guardião Menor de Pedra | 150 | Melios | Base |
| 36 | Elemental de Terra | 200 | Melios | Médio |
| 37 | Guardião Ancião | 180 | Melios | BOSS |
| 38 | Sombra Errante | 250 | Melios | Elite |
| 39 | Corvos de Melios | 200 | Melios | BOSS |
| 40 | Guardião Colossal | 200 | Melios | BOSS |

---

## Validação e Testes

### Script de Validação

Para validar a curva de EXP implementada:

```bash
node planos/012-balanceamento-exp/busca_refinada_exp_params.js
```

### Playtest Checklist

- [ ] Iniciar novo jogo
- [ ] Verificar EXP necessária para cada nível na tela de Status
- [ ] Completar Estrada do Cão-Luar e verificar níveis (Thorin/Filena nv ~5, Kilin nv ~8, Mhordred nv ~7)
- [ ] Completar Minas de Kravens e verificar níveis (todos nv 8-10)
- [ ] Completar Esgoto de Gildrat e verificar níveis (todos nv 10-12, Balastrus nv 15)
- [ ] Verificar se grupo permanece nivelado (diferença máx 2-3 níveis)
- [ ] Testar combate em Ruínas de Melios
- [ ] Verificar se é possível alcançar nv 30 até o final do jogo (pode requerer farming)

---

## Arquivos de Configuração

### Classes.json

Caminho: `/Users/edney/projects/coreto/projectX/frontend/data/Classes.json`

Todas as 5 classes devem ter o mesmo `expParams`:
```json
{
  "id": 1,
  "name": "Fighter",
  "expParams": [2, 50, 150, 1]
}
```

### Enemies.json

Caminho: `/Users/edney/projects/coreto/projectX/frontend/data/Enemies.json`

Cada inimigo tem seu valor de EXP definido (aumentado 2.5x):
```json
{
  "id": 2,
  "name": "Lobo Jovem",
  "exp": 38,
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

## Histórico de Alterações

### v3.1 (2026-03-11) - ✅ AJUSTADO

**Problema Identificado:**
- Com expParams [2,50,150,1], Thorin e Filena progrediam muito rápido
- Quase no mesmo nível que Kilin e Mhordred nos guardas
- Necessário aumentar diferença de nível entre protagonistas e guardas

**Solução Aplicada:**
- `expParams` alterado de `[2, 50, 150, 1]` para `[4, 50, 150, 1]` (curva moderada)
- EXP dos inimigos mantida em 2.5x
- Todos os personagens usam mesma curva de progressão

**Resultado:**
- Maior diferença de nível entre Thorin/Filena e os guardas
- Progressão mais equilibrada através das áreas

**Arquivos Modificados:**
- `frontend/data/Classes.json` - expParams [4,50,150,1] para todas as classes
- `frontend/__tests__/progressao/simulacao-20-batalhas-lobo.test.js` - atualizado com nova curva

### v3.0 (2026-03-11) - ✅ REBALANCEADO

**Problema Identificado:**
- Com expParams [10,50,150,1], Kilin precisava de 90 batalhas para atingir nv 10
- Meta: Kilin nv 10 em ~8 batalhas (Gap de 11x)

**Solução Aplicada:**
- `expParams` alterado de `[10, 50, 150, 1]` para `[2, 50, 150, 1]` (curva achatada)
- EXP dos inimigos aumentada 2.5x (global, exceto bosses)
- Níveis iniciais ajustados: Kilin 7→8, Mhordred 6→7

**Resultado:**
- Kilin atinge nv 10 em ~4 batalhas ✅
- Mhordred atinge nv 10 em ~5 batalhas ✅
- Progressão sustentável até nv 30

**Arquivos Modificados:**
- `frontend/data/Classes.json` - expParams [2,50,150,1]
- `frontend/data/Enemies.json` - EXP x2.5
- `frontend/data/Actors.json` - níveis iniciais ajustados

**Documentação Relacionada:**
- `planos/012-balanceamento-exp/CONSENSO-alternativa-recomendada.md`

### v2.0 (2026-03-10) - ✅ CORRIGIDO

**Problema Identificado:**
- O valor `basis = 0` no expParams causava uma curva linear constante (50 XP/nível)
- O jogo estava ~93% mais fácil que o documentado

**Solução Aplicada:**
- `expParams` alterado de `[0, 50, 200, 0]` para `[10, 50, 150, 1]`
- Nova curva tem erro médio de 25.7% vs GDD (antes: ~93%)

**Arquivos Modificados:**
- `frontend/data/Classes.json` - expParams atualizado em todas as 5 classes

**Documentação Relacionada:**
- `planos/012-balanceamento-exp/RELATORIO-correcao-exp-aplicada.md`
- `planos/012-balanceamento-exp/RELATORIO_FINAL-descoberta-exp-rmmz.md`

---

**Fim do Documento**

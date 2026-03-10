# Sistema de Experiência - ProjectX

**Documento:** Especificação do Sistema de Experiência
**Data:** 2026-03-10
**Versão:** 2.0
**Status:** ✅ CORRIGIDO - Curva reconfigurada

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
"expParams": [10, 50, 150, 1]
```

**Parâmetros:**
- `basis` = 10 → Base exponencial da curva
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
| 1 | 0 | 60 |
| 2 | 60 | 95 |
| 3 | 155 | 159 |
| 4 | 314 | 255 |
| 5 | 569 | 380 |
| 6 | 949 | 530 |
| 7 | 1.479 | 703 |
| 8 | 2.182 | 891 |
| 9 | 3.073 | 1.090 |
| 10 | 4.163 | 1.294 |
| 11 | 5.457 | 1.502 |
| 12 | 6.959 | 1.707 |
| 13 | 8.666 | 1.907 |
| 14 | 10.573 | 2.100 |
| 15 | 12.673 | 2.287 |
| 20 | 25.796 | 3.087 |
| 25 | 42.510 | 3.694 |
| 30 | 61.966 | - (máximo) |

---

## Progressão de Níveis por Área

### Níveis Iniciais dos Personagens

| Personagem | Classe | Nível Inicial | EXP Acumulada |
|------------|--------|---------------|---------------|
| Thorin (003) | Fundeiro | 1 | 0 |
| Filena (004) | Fighter | 1 | 0 |
| Kilin (005) | Paladin | **7** | 1.479 |
| Mhordred (006) | Berserker | **6** | 949 |
| Balastrus (008) | Alquimista | **15** | 12.673 |

> **Nota:** Kilin e Mhordred iniciam em níveis mais altos por serem personagens experientes. Balastrus entra na party durante o Esgoto de Gildrat.

---

### Estrada do Cão-Luar (Troops 2-11)

**Objetivo:** Thorin/Filena 1→4-5, Kilin/Mhordred nivelados com o grupo

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
- Thorin/Filena: nv 1 → **nv 5** (1.660 XP)
- Kilin: nv 7 → **nv 8** (1.479 + 1.660 = 3.139 XP)
- Mhordred: nv 6 → **nv 7** (949 + 1.660 = 2.609 XP)
- ✅ Grupo nivelado (diferença máx 3 níveis)

---

### Minas de Kravens (Troops 23-32)

**Objetivo:** Todos até ~nv 8-10

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

**Níveis esperados após completar (acumulando com área anterior):**
- Thorin/Filena: nv 5 → **nv 8** (1.660 + 2.400 = 4.060 XP)
- Kilin: nv 8 → **nv 10** (3.139 + 2.400 = 5.539 XP)
- Mhordred: nv 7 → **nv 9** (2.609 + 2.400 = 5.009 XP)
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

**Níveis esperados após completar (acumulando):**
- Grupo existente: **nv 10-12** (4.060 + 2.400 + 2.700 ≈ 9.160 XP)
- Balastrus entra: **nv 15** (12.673 XP)
- ✅ Balastrus 2-5 níveis acima, aceitável para "veterano"

---

### Ruínas de Melios (Troops 63-70)

**Objetivo:** nv 12-15 → 30 (final do jogo)

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
**30 combates:** ~4.350 XP

**Progressão (do nv 15 ao 30):**
- EXP necessária: 61.966 - 12.673 = **49.293 XP**
- Com ~30 combates: ~4.350 XP por área
- Será necessário farming/conclusão 100% para atingir nv 30
- ✅ Curva permite progressão até o final

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
  "expParams": [10, 50, 150, 1]
}
```

> **ATUALIZADO:** 2026-03-10 - Corrigido de `[0, 50, 200, 0]` para `[10, 50, 150, 1]` para criar curva exponencial funcional.

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

## Histórico de Alterações

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

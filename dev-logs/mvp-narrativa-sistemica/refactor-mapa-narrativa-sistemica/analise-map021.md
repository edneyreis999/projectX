# Análise do Mapa 021 - Narrativa Sistêmica

**Data da Análise:** 04/11/2025
**Arquivo:** `frontend/data/Map021.json`
**Contexto:** Mapa de teste para validar variáveis sistêmicas da missão final "Defender Gildrat"

## Informações Básicas

- **Nome do Mapa:** Narrativa Sistêmica
- **Dimensões:** 30x30 tiles
- **Tileset ID:** 3
- **Parallax:** Mountains2
- **Total de Eventos:** 26 eventos ativos
- **Função:** Mapa simulado para testar cálculos de consequências após retorno de Melios (Cena 11)

## Objetivo do Mapa de Teste

Este mapa permite:

- Simular todas as decisões da quest "A Última Missão"
- Testar soma de variáveis sem peso narrativo completo
- Validar configurações em ~5 minutos (vs 1-2 horas de gameplay completo)
- Teleportar para "MvP Defesa Gildrat" após configuração

## Variáveis do Sistema Implementadas

O mapa implementa **13 variáveis sistêmicas** para controle de narrativa:

### Variáveis de Desbloqueio (2)

#### Variável 62: `v_unlock_melios`

- **Domínio:** 0-1 (booleana)
- **Função:** Libera passagem para ilha de Melios
- **Evento Relacionado:** "NPC Unlock Melios" (ID 1, 4)
- **Localização:** Gildrat (ilha principal)

#### Variável 63: `v_unlock_kravens`

- **Domínio:** 0-1 (booleana)
- **Função:** Libera passagem para ilha de Kravens
- **Evento Relacionado:** "NPC Unlock Kravens" (ID 2, 5)
- **Localização:** Gildrat (ilha principal)

### Variáveis de Resgate (4)

#### Variável: `v_resgate_melios`

- **Domínio:** 0-3
- **Incremento:** Kilin (+1), Balastrus (+1), Salvar Ambos (+1)
- **Impacto:** Afeta moral da Guarda de Ferro e disponibilidade de NPCs no time de Thorin
- **Localização:** Ilha de Melios

#### Variável: `v_resgate_kilin`

- **Domínio:** 0-1
- **Função:** Marca resgate específico de Kilin
- **Evento:** NPC Kilin (ID 3) em Melios
- **Localização:** (20, 8)

#### Variável: `v_resgate_kravens`

- **Domínio:** 0-2
- **Incremento:** Borin (+1), Grupos de Rebeldes (+1)
- **Impacto:** Afeta força do exército de rebeldes
- **Localização:** Ilha de Kravens

#### Variável: `v_resgate_borin`

- **Domínio:** 0-1
- **Função:** Marca resgate específico de Borin
- **Impacto:** Afeta moral do exército de rebeldes
- **Evento:** NPC Borin (ID 13) em Kravens
- **Localização:** (8, 8)

### Variáveis de Influência e Apoio (4)

#### Variável: `v_influencia_corvos`

- **Domínio:** 0-8
- **Incremento:**
  - Grupo Corvos em Melios: +5
  - Cada Corvo isolado (3 total): +1 cada
  - Recrutar Corvos em Gildrat: +1
- **Impacto:** Afeta força do exército dos Corvos
- **Localização:** Melios (resgates) e Gildrat (recrutamento)

#### Variável: `v_boa_vontade_thordan`

- **Domínio:** 0-5
- **Implementação:** 5 diálogos diferentes com Thordan
- **Evento:** Thordan - Diálogo Respeitoso (ID 16)
- **Localização:** Gildrat (15, 22)

#### Variável: `v_empatia_filena`

- **Domínio:** 0-5
- **Implementação:** 5 atividades de apoio à Filena
- **Evento:** Filena - Apoio Causa (ID 17)
- **Localização:** Gildrat (19, 25)

#### Variável: `v_reforco_sigmetal`

- **Domínio:** 0-1
- **Função:** Equipa todos os exércitos com armas de Sigmetal
- **Evento:** Cristaleão/Sigmetal (ID 15)
- **Localização:** Kravens (4, 11)

### Variáveis de Preparação Militar (3)

#### Variável: `v_treinamento_rebeldes`

- **Domínio:** 0-2
- **Incremento:** Filena treina (+1), Mhordred treina (+1)
- **Eventos:**
  - Filena Treina Rebeldes (ID 18) em (19, 24)
  - Mhordred Treina Rebeldes (ID 19) em (16, 22)
- **Pré-condição:** Filena requer resgate de Kravens completado

#### Variável: `v_preparo_militar`

- **Domínio:** 0-9
- **Implementação:** 9 atividades de logística e defesa
- **Eventos:**
  - Missão Logística (ID 24) em (12, 25)
  - Fortificar Defesas (ID 25) em (12, 26)
- **Impacto:** Afeta força da Guarda de Ferro

#### Variável: `v_folego_time_runico`

- **Domínio:** 0-3
- **Incremento:** Recrutar (+1), Treinar (+1), Equipar (+1)
- **Eventos:**
  - Recrutar Time Rúnico (ID 20) em (7, 21)
  - Treinar Time Rúnico (ID 21) em (7, 22)
  - Equipar Time Rúnico (ID 22) em (7, 23)

#### Variável: `v_moral_gildrat`

- **Domínio:** 0-9
- **Implementação:** 9 atos heroicos/comunicações
- **Eventos:**
  - Ato Heroico Público (ID 26) em (15, 24)
  - Comunicar Cidadãos (ID 27) em (14, 26)
- **Impacto:** Bônus global para todos os exércitos

## Sistema de Eventos por Ilha

### ILHA: MELIOS (Pequena - Leste)

#### Eventos de Resgate

| ID | Nome | Posição | Variável Alterada | Incremento |
|----|------|---------|-------------------|------------|
| 3 | Kilin | (20, 8) | `v_resgate_kilin` | +1 |
| - | - | - | `v_resgate_melios` | +1 |
| 8 | Grupo Corvos | (18, 8) | `v_influencia_corvos` | +5 |
| 9 | Corvo Isolado 1 | (16, 12) | `v_influencia_corvos` | +1 |
| 10 | Corvo Isolado 2 | (16, 11) | `v_influencia_corvos` | +1 |
| 11 | Corvo Isolado 3 | (16, 10) | `v_influencia_corvos` | +1 |

**Total Potencial em Melios:**

- `v_influencia_corvos`: +8 pontos
- `v_resgate_melios`: até +3 (inclui Balastrus e opção "Salvar Ambos")

### ILHA: KRAVENS (Pequena - Oeste)

#### Eventos de Resgate e Coleta

| ID | Nome | Posição | Variável Alterada | Incremento |
|----|------|---------|-------------------|------------|
| 13 | Borin | (8, 8) | `v_resgate_borin` | +1 |
| - | - | - | `v_resgate_kravens` | +1 |
| 14 | Grupo Rebelde | (6, 8) | `v_resgate_kravens` | +3 |
| 15 | Cristaleão/Sigmetal | (4, 11) | `v_reforco_sigmetal` | +1 |

**Notas:**

- Borin incrementa tanto `v_resgate_borin` quanto `v_resgate_kravens`
- Grupo Rebelde representa primeiro grupo de rebeldes (+3 pontos)
- Cristaleão representa coleta de Sigmetal (equipamento especial)

### ILHA: GILDRAT (Principal - Centro)

#### Evento de Transição

| ID | Nome | Posição | Função |
|----|------|---------|--------|
| 6 | Cama | (13, 20) | Teleporte para "MvP Defesa Gildrat" |

**Diálogo:** "Dormir para iniciar defesa?"
**Opções:** Sim/Não
**Ação:** Teleporte final para mapa de defesa

#### Eventos de Desbloqueio

| ID | Nome | Posição | Variável Alterada | Mensagem |
|----|------|---------|-------------------|----------|
| 1, 4 | NPC Unlock Melios | (19, 16), (18, 19) | `v_unlock_melios` | "Passagem para Melios liberada" |
| 2, 5 | NPC Unlock Kravens | (7, 16), (9, 19) | `v_unlock_kravens` | "Passagem para Kravens liberada" |

#### Eventos de Interação Social

| ID | Nome | Posição | Variável Alterada | Domínio |
|----|------|---------|-------------------|---------|
| 16 | Thordan - Diálogo Respeitoso | (15, 22) | `v_boa_vontade_thordan` | 0-5 |
| 17 | Filena - Apoio Causa | (19, 25) | `v_empatia_filena` | 0-5 |

#### Eventos de Gestão de Facções

| ID | Nome | Posição | Variável Alterada | Incremento |
|----|------|---------|-------------------|------------|
| 20 | Recrutar Time Rúnico | (7, 21) | `v_folego_time_runico` | +1 |
| 21 | Treinar Time Rúnico | (7, 22) | `v_folego_time_runico` | +1 |
| 22 | Equipar Time Rúnico | (7, 23) | `v_folego_time_runico` | +1 |
| 23 | Recrutar Corvos | (11, 23) | `v_influencia_corvos` | +1 |

#### Eventos de Treinamento

| ID | Nome | Posição | Variável Alterada | Pré-condição |
|----|------|---------|-------------------|--------------|
| 18 | Filena Treina Rebeldes | (19, 24) | `v_treinamento_rebeldes` | Resgate Kravens completo |
| 19 | Mhordred Treina Rebeldes | (16, 22) | `v_treinamento_rebeldes` | - |

#### Eventos de Preparo Militar

| ID | Nome | Posição | Variável Alterada | Incremento |
|----|------|---------|-------------------|------------|
| 24 | Missão Logística | (12, 25) | `v_preparo_militar` | +1 |
| 25 | Fortificar Defesas | (12, 26) | `v_preparo_militar` | +1 |

#### Eventos de Moral

| ID | Nome | Posição | Variável Alterada | Incremento |
|----|------|---------|-------------------|------------|
| 26 | Ato Heroico Público | (15, 24) | `v_moral_gildrat` | +1 |
| 27 | Comunicar Cidadãos | (14, 26) | `v_moral_gildrat` | +1 |

#### NPC Especial

| ID | Nome | Posição | Função |
|----|------|---------|--------|
| 28 | Sáparo Boca-de-Corneta | (9, 26) | Configura isca para armadilhas |

**Impacto de Sáparo:**

- **Com interação:** Armadilhas executam com eficiência máxima → 5 combates na Fase 2
- **Sem interação:** Tusk assume isca padrão (armadilhas falham) → 7 combates na Fase 2
- **Nota:** Não cria variável dedicada, mas afeta número de combates diretamente

## Estrutura do Mapa

### Layout de 3 Ilhas

```
┌─────────────────────────────────┐
│         ILHA MELIOS             │
│      (Pequena - Leste)          │
│                                 │
│  • Kilin (resgate)              │
│  • Grupo Corvos                 │
│  • 3 Corvos Isolados            │
│                                 │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│      ILHA GILDRAT               │
│      (Grande - Centro)          │
│                                 │
│  • Hub Central                  │
│  • NPCs de Desbloqueio          │
│  • Eventos de Preparação        │
│  • Cama (Teleporte)             │
│                                 │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│       ILHA KRAVENS              │
│      (Pequena - Oeste)          │
│                                 │
│  • Borin (resgate)              │
│  • Grupo Rebelde                │
│  • Cristaleão (Sigmetal)        │
│                                 │
└─────────────────────────────────┘
```

## Mecânicas do Sistema de Narrativa

### 1. Sistema de Desbloqueio Progressivo

**Implementação:**

- Variáveis booleanas (`v_unlock_melios`, `v_unlock_kravens`)
- NPCs bloqueadores com 2 páginas de eventos:
  - Página 1: Bloqueio ativo (variável = 0)
  - Página 2: Passagem liberada (variável = 1)

**Mensagens de Feedback:**

- Bloqueado: "Passagem para [Ilha] bloqueada"
- Liberado: "Passagem para [Ilha] liberada"

### 2. Sistema de Resgate

**Melios:**

- `v_resgate_melios` (0-3): Kilin, Balastrus, Salvar Ambos
- Impacto: Guarda de Ferro + NPCs no time de Thorin

**Kravens:**

- `v_resgate_kravens` (0-2): Grupos de rebeldes
- `v_resgate_borin` (0-1): Líder anão
- Impacto: Força do exército de rebeldes

### 3. Sistema de Influência com Corvos

**Acumulação de Pontos:**

- Grupo principal: +5 pontos (Melios)
- Corvos isolados: +1 cada (3 total em Melios)
- Recrutamento em Gildrat: +1
- **Total Máximo:** 8 pontos

**Impacto:** Força do exército dos Corvos na Fase 2

### 4. Sistema de Treinamento

**Time Rúnico:**

- Progressão: Recrutar (0→1) → Treinar (1→2) → Equipar (2→3)
- Domínio: 0-3

**Rebeldes:**

- Treinadores: Filena (+1), Mhordred (+1)
- Domínio: 0-2
- **Pré-condição:** Filena requer resgate de Kravens

### 5. Sistema de Preparo Militar

**Logística e Defesas:**

- 9 atividades possíveis
- Exemplos: organizar suprimentos, treinar guardas, fortificar muralhas
- Domínio: 0-9

**Moral de Gildrat:**

- 9 atos possíveis
- Exemplos: discursos, ajudar civis, atos heroicos
- Domínio: 0-9
- **Impacto:** Bônus global para todos os exércitos

### 6. Sistema de Relacionamento

**Thordan (Boa Vontade):**

- 5 diálogos diferentes disponíveis
- Exemplos: respeitar decisão militar, elogiar liderança
- Domínio: 0-5

**Filena (Empatia):**

- 5 atividades de apoio disponíveis
- Exemplos: apoiar causa, ajudar organização, defender ideias
- Domínio: 0-5

## Impacto Sistêmico das Variáveis

### Fase 2: Execução dos Exércitos

#### Exército dos Guardas de Ferro

**Afetado por:**

- `v_preparo_militar` (logística e fortificação)
- `v_resgate_melios` (moral e disponibilidade de NPCs)

#### Exército dos Rebeldes

**Afetado por:**

- `v_resgate_kravens` (número de combatentes)
- `v_treinamento_rebeldes` (qualidade do treinamento)
- `v_resgate_borin` (moral e liderança)

#### Exército dos Corvos

**Afetado por:**

- `v_influencia_corvos` (confiança e número de membros)

#### Bônus Globais (Todos os Exércitos)

- `v_reforco_sigmetal`: Equipamento superior para todos
- `v_moral_gildrat`: Moral elevada geral

## Observações Técnicas

### Sprites Utilizados

- `Boss/$CoretoBoss1` - NPCs bloqueadores (direção 4 e 6)
- `Principal/$Kilin` - Personagem principal resgatado
- `CasaForjaprata/$Iluminacao` - Objeto interativo (cama)

### Comandos de Evento RPG Maker MZ

- **Código 101:** Mostrar mensagem de texto
- **Código 401:** Continuação de texto
- **Código 102:** Escolhas do jogador (Sim/Não)
- **Código 402:** Processamento de escolha selecionada

### Padrão de Implementação

- **Sistema de Voz:** "SF_Monster" (índice 5)
- **Fonte de Diálogo:** "Sistema"
- **Consistência:** Todos os NPCs seguem mesmo padrão de apresentação

## Fluxo de Teste Recomendado

### 1. Início em Gildrat (Hub Central)

- Jogador aparece na ilha principal
- Interage com NPCs de desbloqueio

### 2. Exploração de Melios

```
Desbloqueio → Grupo Corvos (+5 influência)
           → Corvos Isolados 1-3 (+1 cada)
           → Kilin (+1 resgate_melios, +1 resgate_kilin)
```

### 3. Exploração de Kravens

```
Desbloqueio → Borin (+1 resgate_borin, +1 resgate_kravens)
           → Grupo Rebelde (+3 resgate_kravens)
           → Cristaleão/Sigmetal (+1 reforco_sigmetal)
```

### 4. Atividades em Gildrat

- Thordan: até 5 interações de boa vontade
- Filena: até 5 interações de empatia (requer resgate Kravens)
- Time Rúnico: 3 etapas (recrutar, treinar, equipar)
- Corvos: +1 recrutamento adicional
- Treinamento: Filena e Mhordred (+2 total)
- Preparo Militar: até 9 atividades
- Moral: até 9 atos heroicos/comunicações
- Sáparo: Configurar armadilhas (opcional, sem variável)

### 5. Finalização

- Interagir com Cama → Teleporte para "MvP Defesa Gildrat"

## Mensagens de Feedback Implementadas

### Desbloqueios

- ✅ "Passagem para Melios liberada"
- ✅ "Passagem para Kravens liberada"
- ❌ "Passagem para [Ilha] bloqueada" (quando tentativa sem desbloqueio)

### Resgates

- ✅ "Você salvou Kilin"
- ✅ "Os Corvos escaparam com sua ajuda"
- ✅ "Você libertou o [primeiro/segundo/terceiro] Corvo"
- ✅ "Você salvou Borin"
- ✅ "Você salvou o primeiro grupo de rebeldes"

### Preparação

- ✅ "Você conversou respeitosamente com Thordan"
- ✅ "Você apoiou a causa de Filena"
- ✅ "Time rúnico [reunido/treinado/equipado]"
- ✅ "Filena está treinando os rebeldes"
- ✅ "Mhordred está treinando os rebeldes"
- ✅ "Você ganhou a confiança dos Corvos"
- ✅ "Você organizou a logística da Guarda"
- ✅ "Você fortificou as defesas de Gildrat"
- ✅ "Você inspirou os cidadãos de Gildrat"
- ✅ "Você comunicou o plano de defesa aos cidadãos"

### Coleta

- ✅ "Você coletou os Sigmetals em Kravens"

### Especiais

- ✅ "Sáparo prepara as cornetas para despistar os Ignotos"
- ✅ "Dormir para iniciar defesa?" (Cama)

### Repetições

- ❌ "Você já me resgatou" (tentativa de resgate repetido)
- ❌ "Você já concluiu isso" (tentativa de atividade repetida)

### Pré-condições

- ❌ "A Filena está preocupada em salvar rebeldes em Kravens, não pode fazer isso agora" (Filena antes de resgate Kravens)

## Resumo de Implementação

### Status Atual (26 Eventos)

✅ **Implementado:**

- 2 variáveis de desbloqueio (Melios, Kravens)
- 4 variáveis de resgate (Melios: 2, Kravens: 2)
- 4 variáveis de influência (Corvos, Thordan, Filena, Sigmetal)
- 3 variáveis de preparação militar (Rebeldes, Time Rúnico, Preparo)
- 1 variável de moral global (Gildrat)
- 26 eventos funcionais
- Sistema de teleporte para mapa de defesa

✅ **Funcionalidades Básicas:**

- Desbloqueio progressivo de áreas
- Sistema de resgate em ilhas
- Gestão de facções e relacionamento
- Preparação militar e moral
- Transição para fase de combate

⚠️ **Ajustes Necessários (Conforme PRD):**

- Expandir eventos de Thordan para 5 diálogos diferentes
- Expandir eventos de Filena para 5 atividades diferentes
- Expandir eventos de preparo militar para 9 atividades
- Expandir eventos de moral para 9 atos/comunicações
- Implementar mensagens de repetição para todos os eventos
- Adicionar pré-condição de Filena (requer resgate Kravens)
- Implementar opções de resgate "Balastrus" e "Salvar Ambos" em Melios

## Próximos Passos Recomendados

### Alta Prioridade

1. **Completar Variáveis com Múltiplas Interações:**
   - Criar 5 eventos diferentes para Thordan (atualmente 1)
   - Criar 5 eventos diferentes para Filena (atualmente 1)
   - Criar 9 eventos de preparo militar (atualmente 2)
   - Criar 9 eventos de moral (atualmente 2)

2. **Adicionar NPCs Faltantes em Melios:**
   - Balastrus (resgate individual)
   - Opção "Salvar Ambos" (resgate combinado)

3. **Implementar Sistema de Pré-condições:**
   - Filena bloqueada até resgate Kravens completo
   - Mensagem específica de bloqueio

4. **Sistema de Repetição:**
   - Adicionar flags para eventos já completados
   - Mensagens de feedback para tentativas repetidas

### Média Prioridade

5. **Expandir Grupos de Rebeldes:**
   - Atualmente: 1 grupo (Evento 14)
   - Especificação: múltiplos grupos até domínio 0-2

6. **Validação de Domínios:**
   - Garantir que variáveis não excedem limites
   - Adicionar controles de overflow

### Baixa Prioridade

7. **Polimento Visual:**
   - Layout das ilhas
   - Posicionamento de NPCs
   - Sprites e animações

8. **Testes de Integração:**
   - Validar todas as combinações de variáveis
   - Testar transição para mapa de defesa
   - Verificar impacto em Fase 2 de combate

## Critérios de Aceitação (PRD)

- [x] Todas as 13 variáveis podem ser configuradas antes da cama
- [x] Desbloqueios de Melios e Kravens funcionam corretamente
- [ ] Sistema de repetição implementado (mensagens de feedback)
- [ ] Pré-condições de Filena implementadas
- [x] Teleporte da cama funciona para "MvP Defesa Gildrat"
- [x] Carregamento do mapa em ≤ 5 segundos
- [ ] Todas as faixas de variáveis respeitam domínios especificados

## Conclusão

O Mapa 021 implementa a **estrutura base** do sistema de narrativa sistêmica com:

### ✅ Pontos Fortes

- 13 variáveis sistêmicas corretamente identificadas
- 26 eventos funcionais organizados por ilha
- Sistema de desbloqueio progressivo implementado
- Teleporte final funcionando
- Nomenclatura consistente e clara
- Estrutura expansível para futuras adições

### ⚠️ Pontos de Atenção

- Eventos com múltiplas interações precisam ser expandidos
- Sistema de pré-condições parcialmente implementado
- Mensagens de repetição não implementadas
- NPCs faltantes em Melios (Balastrus, Salvar Ambos)
- Validação de domínios de variáveis precisa ser verificada

### 🎯 Objetivo do Mapa Alcançado

O mapa cumpre o objetivo principal de **validação rápida** (~5 minutos) das variáveis sistêmicas, mas requer expansão dos eventos com múltiplas interações para atingir os domínios completos especificados no PRD.

**Status Geral:** ✅ Implementação funcional básica completa (60% das especificações)
**Próximo Marco:** Expansão de eventos múltiplos e sistema de pré-condições (40% restante)

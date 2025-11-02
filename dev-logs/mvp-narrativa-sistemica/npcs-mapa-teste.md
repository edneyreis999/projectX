# NPCs do Mapa de Teste "MvP Narrativa Sistêmica"

**Data**: 2025-11-02
**Versão**: 1.0
**Objetivo**: Documentar NPCs e variáveis para mapa de teste da narrativa sistêmica do final de Daratrine - A Origem

## Contexto

O mapa "MvP Narrativa Sistêmica" é um **mapa simulado** para testar os cálculos de consequências da Narrativa Sistêmica após o retorno de Melios ([Cena 11](../../docs/GDD/3-historia/timeline-historia-jogo-v5.md#11---gildrat-em-alarme-escolhas-e-consequências)).

### Objetivos do Mapa

- Simular todas as decisões que o jogador pode tomar na quest "A Última Missão"
- Testar soma de variáveis sem peso narrativo
- Teleportar jogador para "MvP Defesa Gildrat" após interação com a cama

### Estrutura do Mapa

- **Ilha Maior**: Gildrat (atividades de preparação)
- **Ilha Pequena 1**: Kravens (resgate e coleta de Sigmetal)
- **Ilha Pequena 2**: Melios (resgate de NPCs)

---

## Tabela de NPCs por Localização

### **ILHA: MELIOS** (Ilha pequena)

| NPC | Localização | Função na Quest | Variável(is) Alterada(s) | Fluxo de Interação |
|-----|-------------|-----------------|-------------------------|-------------------|
| **NPC Unlock Melios** | Gildrat | Libera passagem para Melios | `v_unlock_melios` (+1) | "Passagem para Melios liberada" |
| **Kilin** | Melios | Representa resgate de Kilin | `v_resgate_melios` (+1) | "Você salvou Kilin" |
| **Balastrus** | Melios | Representa resgate de Balastrus | `v_resgate_melios` (+1) | "Você salvou Balastrus" |
| **Salvar Ambos** | Melios | Representa resgate total em Melios | `v_resgate_melios` (+1) | "Você salvou Kilin e Balastrus" |
| **Grupo Corvos em Melios** | Melios | Representa a evacuação do grupo principal dos Corvos | `v_influencia_corvos` (+5) | "Os Corvos escaparam com sua ajuda" |
| **Corvo Isolado 1** | Melios | Resgate de corvo preso na mina | `v_influencia_corvos` (+1) | "Você libertou o primeiro Corvo" |
| **Corvo Isolado 2** | Melios | Resgate de corvo ferido | `v_influencia_corvos` (+1) | "Você libertou o segundo Corvo" |
| **Corvo Isolado 3** | Melios | Resgate de corvo escondido | `v_influencia_corvos` (+1) | "Você libertou o terceiro Corvo" |

**Notas**:

- `v_unlock_melios` domínio: 0-1 (0: Fechado, 1: Passagem liberada)
- `v_resgate_melios` domínio: 0-3 (0: Ninguém salvo, 1: Balastrus, 2: Kilin, 3: Ambos)
- `v_influencia_corvos` recebe +8 pontos potenciais em Melios (grupo + três indivíduos)
- Afeta moral da Guarda de Ferro e disponibilidade de NPCs no time de Thorin
- Balastrus retorna com o grupo de Thorin para Gildrat após o resgate, liberando seus diálogos de preparação na ilha principal

---

### **ILHA: KRAVENS** (Ilha pequena)

| NPC | Localização | Função na Quest | Variável(is) Alterada(s) | Fluxo de Interação |
|-----|-------------|-----------------|-------------------------|-------------------|
| **NPC Unlock Kravens** | Gildrat | Libera passagem para Kravens | `v_unlock_kravens` (+1) | "Passagem para Kravens liberada" |
| **Borin** | Kravens | Representa resgate de Borin | `v_resgate_borin` (+1)<br>`v_resgate_kravens` (+1) | "Você salvou Borin" |
| **Grupo Rebelde 1** | Kravens | Representa primeiro grupo de rebeldes | `v_resgate_kravens` (+1) | "Você salvou o primeiro grupo de rebeldes" |
| **Cristaleão/Sigmetal** | Kravens | Representa coleta de Sigmetal | `v_reforco_sigmetal` (+1) | "Você coletou os Sigmetals em Kravens" |

**Notas**:

- `v_unlock_kravens` domínio: 0-1 (0: Passagem fechada, 1: Liberada)
- `v_resgate_kravens` domínio: 0-2 (0: Ninguém, 1: Grupo rebelde, 2: Grupos de rebeldes)
- `v_resgate_borin` domínio: 0-1 (afeta moral do exército de rebeldes)
- `v_reforco_sigmetal` domínio: 0-1 (equipa todos os exércitos com arma de Sigmetal)

---

### **ILHA: GILDRAT** (Ilha maior)

#### **Seção: Controle de Início**

| NPC | Localização | Função na Quest | Variável(is) Alterada(s) | Fluxo de Interação |
|-----|-------------|-----------------|-------------------------|-------------------|
| **Cama** | Casa Forja Prata | Teleporta para "MvP Defesa Gildrat" | - | "Dormir para iniciar defesa" → **Teleporte** |

---

#### **Seção: Atividades de Preparação (Quando o Segundo Sol Chegar)**

| NPC | Localização | Função na Quest | Variável(is) Alterada(s) | Fluxo de Interação |
|-----|-------------|-----------------|-------------------------|-------------------|
| **Thordan - Diálogo Respeitoso** | Gildrat | Aumenta boa vontade com Thordan | `v_boa_vontade_thordan` (+1) | "Você conversou respeitosamente com Thordan" |
| **Filena - Apoio Causa** | Gildrat | Aumenta empatia com Filena | `v_empatia_filena` (+1) | "Você apoiou a causa de Filena" |
| **Recrutar Time Rúnico** | Gildrat | Reúne time de futebol rúnico | `v_folego_time_runico` (+1) | "Time rúnico reunido" |
| **Treinar Time Rúnico** | Gildrat | Treina time de futebol rúnico | `v_folego_time_runico` (+1) | "Time rúnico treinado" |
| **Equipar Time Rúnico** | Gildrat | Equipa time de futebol rúnico | `v_folego_time_runico` (+1) | "Time rúnico equipado" |
| **Filena Treina Rebeldes** | Gildrat | Filena treina rebeldes | `v_treinamento_rebeldes` (+1) | "Filena está treinando os rebeldes" |
| **Mhordred Treina Rebeldes** | Gildrat | Mhordred treina rebeldes | `v_treinamento_rebeldes` (+1) | "Mhordred está treinando os rebeldes" |
| **Recrutar Corvos** | Gildrat | Aumenta influência com Corvos | `v_influencia_corvos` (+1) | "Você ganhou a confiança dos Corvos" |
| **Missão Logística** | Gildrat | Preparo militar - logística | `v_preparo_militar` (+1) | "Você organizou a logística da Guarda" |
| **Fortificar Defesas** | Muralhas | Preparo militar - defesas | `v_preparo_militar` (+1) | "Você fortificou as defesas de Gildrat" |
| **Ato Heroico Público** | Gildrat | Aumenta moral de Gildrat | `v_moral_gildrat` (+1) | "Você inspirou os cidadãos de Gildrat" |
| **Comunicar Cidadãos** | Gildrat | Aumenta moral de Gildrat | `v_moral_gildrat` (+1) | "Você comunicou o plano de defesa aos cidadãos" |
| **Sáparo Boca-de-Corneta** | Gildrat | Configura a isca principal para armadilhas (sem recrutar) | - | "Sáparo prepara as cornetas para despistar os Ignotos" |

**Notas**:

- `v_treinamento_rebeldes` domínio: 0-2 (0: Sem treinamento, 1: Filena OU Mhordred, 2: Filena E Mhordred)
- `v_folego_time_runico` domínio: 0-3 (0: Inativo, 1: Reunido, 2: Treinado, 3: Equipado)
- Interação com Sáparo garante armadilhas otimizadas sem adicionar variável sistêmica

---

## Resumo de Variáveis e Faixas

| Variável | Domínio | NPCs que Alteram | Localização dos NPCs |
|----------|---------|------------------|----------------------|
| `v_unlock_melios` | 0-1 | NPC Unlock Melios | **Gildrat** |
| `v_resgate_melios` | 0-3 | Kilin, Balastrus, Salvar Ambos | **Melios** |
| `v_resgate_kravens` | 0-2 | Borin, Grupo Rebelde 1 | **Kravens** |
| `v_resgate_borin` | 0-1 | Borin | **Kravens** |
| `v_reforco_sigmetal` | 0-1 | Cristaleão/Sigmetal | **Kravens** |
| `v_unlock_kravens` | 0-1 | NPC Unlock Kravens | **Gildrat** |
| `v_treinamento_rebeldes` | 0-2 | Filena Treina, Mhordred Treina | **Gildrat** |
| `v_influencia_corvos` | 0-8 | Recrutar Corvos (Gildrat) e resgates em Melios | **Gildrat/Melios** |
| `v_boa_vontade_thordan` | 0-5 | Thordan - Diálogo Respeitoso (múltiplas) | **Gildrat** |
| `v_empatia_filena` | 0-5 | Filena - Apoio Causa (múltiplas) | **Gildrat** |
| `v_folego_time_runico` | 0-3 | Recrutar, Treinar, Equipar | **Gildrat** |
| `v_preparo_militar` | 0-9 | Missão Logística, Fortificar Defesas | **Gildrat** |
| `v_moral_gildrat` | 0-9 | Ato Heroico, Comunicar Cidadãos | **Gildrat** |

---

## Fluxo de Teste Recomendado

### 1. Início em Gildrat

- Jogador começa na ilha maior (Gildrat)
- Interage com NPCs "Unlock" para liberar passagens

### 2. Visita a Melios

```
Jogador → NPC Unlock Melios (Gildrat) → v_unlock_melios +1
       → Grupo Corvos em Melios → v_influencia_corvos +5
       → Corvos Isolados 1-3 (Melios) → v_influencia_corvos +1 cada
       → NPC Kilin (Melios) → v_resgate_melios +1
       → NPC Balastrus (Melios) → v_resgate_melios +1
       → NPC Salvar Ambos (Melios) → v_resgate_melios +1
```

### 3. Visita a Kravens

```
Jogador → NPC Unlock Kravens (Gildrat) → v_unlock_kravens +1
       → NPC Borin (Kravens) → v_resgate_borin +1, v_resgate_kravens +1
       → NPC Grupo Rebelde (Kravens) → v_resgate_kravens +1
       → NPC Cristaleão/Sigmetal (Kravens) → v_reforco_sigmetal +1
```

### 4. Atividades em Gildrat

- Interagir com NPCs de preparação para aumentar variáveis
- Múltiplas interações possíveis para atingir valores máximos

### 5. Finalização

- Interagir com **Cama** → Teleporte para "MvP Defesa Gildrat"

---

## Variáveis com Múltiplas Interações

### Como Implementar Valores Máximos

Algumas variáveis precisam de **múltiplos NPCs ou diálogos** para atingir valores máximos:

#### `v_influencia_corvos` (0-8)

- +5 ao libertar o Grupo Corvos em Melios
- +1 para cada Corvo isolado (3 no total)
- +1 por interação de confiança em Gildrat (até completar o máximo definido pela narrativa)

#### `v_boa_vontade_thordan` (0-5)

**Implementação**: 5 diálogos diferentes com Thordan

- Exemplo: "Respeitar decisão militar", "Elogiar liderança", "Discutir história familiar", etc.

#### `v_empatia_filena` (0-5)

**Implementação**: 5 atividades de apoio à Filena

- Exemplo: "Apoiar causa dos rebeldes", "Ajudar na organização", "Defender ideias", etc.

#### `v_preparo_militar` (0-9)

**Implementação**: 9 NPCs/atividades de logística e defesa

- Exemplos: Organizar suprimentos, treinar guardas, reparar muralhas, etc.

#### `v_moral_gildrat` (0-9)

**Implementação**: 9 atos heroicos/comunicações

- Exemplos: Discurso inspirador, ajudar civis, proteger famílias, etc.

---

## NPCs Especiais

### Sáparo Boca-de-Corneta

- **Função**: Configura a isca ideal para as armadilhas da Fase 1 sem integrar o grupo jogável.
- **Impacto**:
  - Interação concluída: armadilhas executam com eficiência máxima (eliminação antecipada dos Ignotos gigantes).
  - Interação ignorada: Tusk assume a isca padrão (armadilhas falham parcialmente).
- **Resultado na Fase 2**: 5 combates vs 7 combates, sem criação de variável dedicada.

### Cama (Casa Forja Prata)

- **Função**: Gatilho final de transição
- **Ação**: Teleporta jogador para "MvP Defesa Gildrat"
- **Não altera variáveis**: Apenas transição de mapa

---

## Efeitos Sistêmicos das Variáveis

### Fase 2 - Execução dos Exércitos

As variáveis afetam o **dano das invocações de exército**:

#### Exército dos Guardas de Ferro

- Afetado por: `v_preparo_militar`, `v_resgate_melios`

#### Exército dos Rebeldes

- Afetado por: `v_resgate_kravens`, `v_treinamento_rebeldes`, `v_resgate_borin`

#### Exército dos Corvos

- Afetado por: `v_influencia_corvos`

#### Bônus Globais (todos os exércitos)

- `v_reforco_sigmetal`: Equipa todos com armas de Sigmetal
- `v_moral_gildrat`: Aumenta moral geral

---

## Checklist de Implementação

- [ ] Criar mapa com 3 ilhas (Gildrat grande, Melios pequena, Kravens pequena)
- [ ] Posicionar NPCs de unlock em Gildrat
- [ ] Criar NPCs de resgate em Melios (Kilin, Balastrus, Ambos)
- [ ] Criar NPCs de resgate/coleta em Kravens (Borin, Rebelde, Sigmetal)
- [ ] Criar NPCs de preparação em Gildrat (mínimo 13 NPCs diferentes)
- [ ] Implementar sistema de variáveis (13 variáveis listadas na tabela)
- [ ] Criar evento de teleporte na Cama
- [ ] Testar todas as combinações de variáveis
- [ ] Validar transição para "MvP Defesa Gildrat"

---

## Referências

- [A Última Missão do Jogo](../../docs/GDD/3-historia/ultima-missao-do-jogo.md)
- [Timeline História v5 - Cena 11](../../docs/GDD/3-historia/timeline-historia-jogo-v5.md#11---gildrat-em-alarme-escolhas-e-consequências)
- [Quest: Quando o Segundo Sol Chegar](../../Quests/10-quando-segundo-sol-chegar/quando-segundo-sol-chegar.NSD.fluxo-cenas.md)

# Narrative Structure Document (NSD) - Treinar Civis Recrutados

## Quest: Treinar Civis - V Força Civil

### 1 Resumo Geral (Checkpoint 0)

- [ ] Em andamento
- Nome da quest: Treinar Civis do Distrito Comercial
- Importancia na campanha: consolida o apoio popular antes do confronto final com os Ignotos
- Arco narrativo: disciplina cívica, camaradagem crescente e ritualização de treinamento
- Objetivo narrativo global: transformar civis recrutados em combatentes confiantes e conectá-los à força civil
- Premissa resumida: Thorin e Filena treinam os civis que entraram na causa para que entendam rotinas de combate e saibam se posicionar contra incursões inimigas.

- Locais principais
  - Campo de Treinamento
  - Tenda de Briefing
- NPCs principais
  - Thorin
  - Filena
  - Civis recrutados (ferreiros, cozinheiras, artesãos)

### 2 Pré-condições Narrativas (Checkpoint 1)

| Tipo | Descrição |
| --- | --- |
| Flags / Decisões anteriores | Completar a quest "Recrutar Civis - Ei! Você Aí, com Cara de Herói". |
| Limitações ou bloqueios | É preciso retornar ao Campo de Treinamento após o recrutamento e lidar com céticos da população. |

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [ ] Em andamento

```plaintext
Quest: Treinar Civis - V Força Civil
 +-- Cena 1: Campo de Treinamento - Filena apresenta as metas e confere os registros de civis recrutados.
        +-- Beat 1: Thorin vê os civis receosos e Filena destaca o valor de cada um.
 +-- Cena 2: Treinos divididos por habilidade
        +-- Beat 1: Ferreiros e cozinheiras praticam posicionamento defensivo.
        +-- Beat 2: Artífices criam barricadas improvisadas.
        +-- Beat 3: Todos experimentam rotinas de combate leve junto a Thorin.
 +-- Cena 3: Revisão rápida e sinalização da força
 |      +-- Beat 1: Filena reúne os civis para revisar estratégias e reforçar o espírito comunitário.
 |      +-- Beat 2: `v_forca_civil` é ativada e o grupo canta em coro o mantra dos defensores.
```

#### Tabela de Cenas

| # | Nome da Cena | Premissa resumida (expandida) |
| --- | --- | --- |
| 1 | **Briefing de Treino** | Filena dá o tom e Thorin explica o que significa treinar como soldados civis. |
| 2 | **Módulos de Treinamento** | Civis praticam habilidades táticas de acordo com suas competências anteriores. |
| 3 | **Ritual de Coesão** | Thorin confirma compromissos, a música da tropa toca e a flag é marcada. |

#### Beats por Cena

##### Cena 1 - Briefing de Treino

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **1-A - Lista de Civis** | Filena apresenta cada civil recrutado e pede que Thorin destaque o papel deles. | CS |
| **1-B - Metas pessoais** | Jogador escolhe abordagem: rigor, empatia ou ritmo cooperativo. | CHOICE |

##### Cena 2 - Módulos de Treinamento

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **2-A - Ferreiros e Cozinheiras** | Focam em cobertura e suprimento; Thorin mostra disciplina. | CS |
| **2-B - Artífices** | Aprendem a reforçar portas e atalhos; Thorin indica pontos críticos. | CS |
| **2-C - Treino coletivo** | Civis correm sequências de esquiva e defesa com ajuda de Thorin. | JOG |

##### Cena 3 - Ritual de Coesão

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **3-A - Revisão com Filena** | Cada civil resume o que aprendeu e mostra comprometimento. | CS |
| **3-B - Flag ativada** | `v_forca_civil` soma +15 pontos e alerta novas unidades na narrativa. | CS |

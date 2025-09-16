# GDD — Construindo o Mundo (Template)

<!--
Público‑alvo: equipe de Narrative Design.
Base: zord/pesquisas/Plano de GDD Narrativo para RPG Maker.docx — Parte II (Construindo o Mundo) + docs em frontend/docs/GDD.
Importante: este arquivo é um TEMPLATE. Não descreva o mundo final aqui; preencha os campos objetivamente.
-->

## Progresso e Pesos

- Regra de progresso: Progresso (%) = (itens checklist marcados / total de itens) × 100, ponderado pelos pesos de cada seção.
- Como usar: em cada seção, marque os itens do checklist. Some os itens marcados e atualize o sumário ao final.
- Exibição: resuma “Concluído x/y (z%)” ao final de cada seção e no final do documento.

### Pesos por Seção (100%)

- S1 Visão Geral do Mundo: 8%
- S2 História e Linha do Tempo: 8%
- S3 Geografia e Biomas: 12%
- S4 Cultura e Sociedade: 8%
- S5 Facções, Poder e Economia: 10%
- S6 Tecnologia/Magia e Regras do Sistema: 10%
- S7 Ecologia e Criaturas: 8%
- S8 Regiões Jogáveis e Mapeamento no RPG Maker MZ: 18%
- S9 Clima, Dia/Noite e Estados Ambientais: 8%
- S11 Gating e Progressão no Mundo: 10%

Resumo Geral (preencher após cada rodada de edição):

- Total marcado: x/y itens
- Progresso ponderado: z%

---

## S1 — Visão Geral do Mundo

Objetivo: estabelecer a identidade do mundo em 1–3 parágrafos claros, úteis para decisões de design e consistência.

Campos:

- Premissa do mundo: <!-- 1–2 frases; sem nomes próprios; foco em contraste e tese. -->
- Tom e atmosferas dominantes: <!-- adjetivos funcionais (ex.: áspero, esperançoso); cite 3–5 -->
- Restrições e escopo: <!-- ex.: tamanho do time, prazos, limites técnicos -->
- Pilares de mundo: <!-- 3 bullets; cada um com 1 frase testável -->

Critérios de Aceitação:

- Premissa em até 2 frases, com contraste explícito.
- Pilares definidos (3) e acionáveis.
- Restrições listadas impactam escolhas de implementação.

Checklist:

- [ ] Premissa validada (2 frases, contraste, verbos ativos)
- [ ] 3 pilares redigidos e revisáveis
- [ ] Restrições e escopo registrados

Concluído: x/3 (y%)

---

## S2 — História e Linha do Tempo

Objetivo: delinear eventos macro que explicam o estado atual do mundo; útil para ambientação, rumores e gating.

Campos:

- Linha do tempo sintética: <!-- 5–7 marcos; formato AAAA: evento curto -->
- Causas e efeitos centrais: <!-- 3 bullets ligando causa→efeito →estado atual -->
- Eventos recentes que afetam o jogo: <!-- 2–3; justificam encontros e facções -->

Critérios de Aceitação:

- 5–7 marcos cronológicos, sem lore excessiva.
- Cada evento recente mapeado para 1 consequência in‑game.

Checklist:

- [ ] Linha do tempo (5–7 marcos)
- [ ] 3 relações causa→efeito
- [ ] 2–3 eventos recentes com impacto jogável

Concluído: x/3 (y%)

---

## S3 — Geografia e Biomas

Objetivo: definir macro‑geografia e biomas que afetam encontros, recursos, navegação e estética.

Campos:

- Mapa macro (descrição textual): <!-- regiões, barreiras naturais, pontos de interesse -->
- Biomas principais: <!-- 3–6; cada um com clima, terreno, recursos típicos -->
- Riscos ambientais por bioma: <!-- 1–2 por bioma -->

Critérios de Aceitação:

- Biomas listados com 3 atributos mínimos (clima, terreno, recursos).
- Riscos com impacto jogável (dano, lentidão, exigência de item).

Checklist:

- [ ] Biomas definidos (≥3)
- [ ] Riscos ambientais mapeados
- [ ] Pontos de interesse macro descritos

Concluído: x/3 (y%)

---

## S4 — Cultura e Sociedade

Objetivo: tornar práticas as nuances sociais que influenciam diálogos, rumores, comércio e conflitos.

Campos:

- Costumes e tabus: <!-- 3–5; efeito nos NPCs/lojas -->
- Religiões/mitos dominantes: <!-- 1–2; símbolo/prática → efeito de jogo -->
- Idiomas/variações de fala: <!-- 1–2 marcas linguísticas → uso moderado -->

Critérios de Aceitação:

- Cada costume/tabu com uma manifestação jogável.
- Religiosidade com 1 ganchos práticos (evento, item, local).

Checklist:

- [ ] 3 costumes/tabus com efeito prático
- [ ] 1–2 religiões/mitos com ganchos
- [ ] Marcas linguísticas definidas

Concluído: x/3 (y%)

---

## S5 — Facções, Poder e Economia

Objetivo: definir atores coletivos e interesses que direcionam conflitos, comércio e missões.

Campos:

- Facções principais: <!-- 2–4; objetivo, recurso crítico, relação com outras -->
- Economias locais: <!-- 2–3 produtos/recursos por região; preço relativo -->
- Tensões ativas: <!-- 2–3 conflitos entre facções, causa→efeito -->

Critérios de Aceitação:

- Facções com objetivos claros e recursos únicos.
- Tensões conectadas a mudanças de estado (switch/variável) no jogo.

Checklist:

- [ ] 2–4 facções modeladas
- [ ] Economia regional definida
- [ ] Tensões com estados mutáveis mapeados

Concluído: x/3 (y%)

---

## S6 — Tecnologia/Magia e Regras do Sistema

Objetivo: definir limites e custos de tecnologia/magia que afetam traversal, combate e puzzles.

Campos:

- Fontes e custos: <!-- ex.: mana/energia, consumíveis, cooldowns, sacrifícios -->
- Limites e proibições: <!-- o que não pode; evita retcons -->
- Impactos no design: <!-- 3 exemplos concretos (porta, cura, mobilidade) -->

Critérios de Aceitação:

- Cada “poder” ou regra com 1 custo e 1 limite.
- 3 impactos diretos em puzzles/traversal/combate.

Checklist:

- [ ] Custos definidos por fonte
- [ ] Limites/proibições registrados
- [ ] 3 impactos práticos exemplificados

Concluído: x/3 (y%)

---

## S7 — Ecologia e Criaturas

Objetivo: conectar criaturas a biomas, recursos e comportamentos que informam encontros e ambientação.

Campos:

- Lista de criaturas por bioma: <!-- 2–3 por bioma -->
- Comportamentos e gatilhos: <!-- agressivo, territorial, noturno; gatilho → efeito -->
- Recursos/itens associados: <!-- drops, crafting -->

Critérios de Aceitação:

- Cada criatura ligada a 1 bioma, 1 comportamento e 1 recurso.

Checklist:

- [ ] 2–3 criaturas por bioma
- [ ] Gatilhos comportamentais definidos
- [ ] Tabela de drops/crafting básica

Concluído: x/3 (y%)

---

## S8 — Regiões Jogáveis e Mapeamento no RPG Maker MZ

Objetivo: mapear o mundo para artefatos do MZ (Map IDs, Tilesets, Region IDs, Terrain Tags) e entradas de conteúdo.

Campos:

- Regiões jogáveis: <!-- tabela curta Nome → Map_ID(s) → Tileset_ID → notas -->
- Uso de Region IDs: <!-- 3–6 IDs por mapa para encontros, armadilhas, colisões especiais -->
- Uso de Terrain Tags: <!-- 0–7 para travessia/efeitos -->
- Portas/Transições: <!-- conexões entre mapas; condições de entrada -->

Critérios de Aceitação:

- Cada região com ao menos 1 Map_ID e Tileset_ID.
- Regras de Region ID e Terrain Tag documentadas por mapa.

Checklist:

- [ ] Tabela regiões → Map_ID/Tileset_ID
- [ ] Region IDs por mapa definidos
- [ ] Terrain Tags por mapa definidos
- [ ] Portas/transferências mapeadas

Concluído: x/4 (y%)

<!-- Exemplo mínimo de linha de tabela (substituir):
Região: Planalto Seco | Map_ID: 005,006 | Tileset_ID: 02 | Region IDs: 1=grama alta, 2=armadilha | Terrain: 1=areia (lento)
-->

---

## S9 — Clima, Dia/Noite e Estados Ambientais

Objetivo: definir estados que alteram visibilidade, encontros e navegação.

Campos:

- Ciclo de tempo: <!-- variável V###_HoraDia (0–23) → efeitos de BGM, luz -->
- Climas possíveis: <!-- chuva, neblina, tempestade; efeitos e taxas de encontro -->
- Estados ambientais locais: <!-- enchente, nevasca, poeira; bloqueios e danos -->

Critérios de Aceitação:

- Variável de hora documentada e efeitos por faixa.
- Climas com impactos claros (probabilidades/gating/dano).

Checklist:

- [ ] Definição da variável de hora (V###)
- [ ] Lista de climas com efeitos
- [ ] Estados ambientais e condições de entrada/saída

Concluído: x/3 (y%)

---

## S11 — Gating e Progressão no Mundo

Objetivo: estabelecer bloqueios e chaves (itens, reputação, estados) que liberam novas áreas e conteúdos.

Campos:

- Bloqueios principais: <!-- portão fechado, tempestade, guardas; condição de liberação -->
- Chaves/recursos: <!-- item, façanha, reputação; onde obtém; custo -->
- Caminhos alternativos: <!-- rota stealth, puzzle, pagamento → risco/benefício -->
- E‑C‑R (por bloqueio): <!-- Escolha, Consequência (imediata/longitudinal), Retorno -->

Critérios de Aceitação:

- Cada bloqueio possui ao menos 1 chave e 1 alternativa.
- Estados rastreados em switches/variáveis específicos.

Checklist:

- [ ] Lista de bloqueios com condição
- [ ] Chaves/alternativas mapeadas
- [ ] E‑C‑R registrado para decisões
- [ ] Estados ligados a S/V concretos

Concluído: x/4 (y%)

---

## Resumo Final de Progresso

- Regra: Progresso (%) = (itens marcados / total) × 100 (com pesos).
- Total marcado: x/y itens
- Progresso ponderado: z%

---

## Registro de Iterações

<!-- Anote decisões, mudanças de peso e acordos de equipe. Uma linha por item. -->
- [AAAA‑MM‑DD] Alteração/decisão: …
- [AAAA‑MM‑DD] Alteração/decisão: …

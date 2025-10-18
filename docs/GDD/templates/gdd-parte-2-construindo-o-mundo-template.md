# GDD — Construindo o Mundo (Template)

<!--
Público‑alvo: equipe de Narrative Design e Game Design.
Base: inspirado em “Parte II: Construindo o Mundo – O Palco para a Sua História”
(zord/pesquisas/Plano de GDD Narrativo para RPG Maker.docx), adaptado para formato
agnóstico de engine.
Importante: este arquivo é um TEMPLATE. Não descreva o mundo final aqui; preencha os
campos de forma objetiva e verificável.
Nota: onde houver referência a elementos de jogo (ex.: níveis, cenas, zonas,
variáveis/flags), use os equivalentes do seu ambiente de desenvolvimento.
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
- S8 Regiões Jogáveis e Mapeamento: 18%
- S9 Clima, Dia/Noite e Estados Ambientais: 8%
- S11 Gating e Progressão no Mundo: 10%

Resumo Geral (preencher após cada rodada de edição):

- Total marcado: x/y itens
- Progresso ponderado: z%

---

# Parte 1 — Contexto Narrativo

Aplicável a jogos e livros de fantasia. Os itens desta parte focam na consistência do mundo e na utilidade prática para cenas, capítulos e/ou conteúdo jogável.

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

Objetivo: delinear eventos macro que explicam o estado atual do mundo; útil para ambientação, rumores, capítulos/cenas e gating de conteúdo.

Campos:

- Linha do tempo sintética: <!-- 5–7 marcos; formato AAAA: evento curto -->
- Causas e efeitos centrais: <!-- 3 bullets ligando causa→efeito →estado atual -->
- Eventos recentes que afetam a narrativa: <!-- 2–3; justificam encontros, cenas e facções -->

Critérios de Aceitação:

- 5–7 marcos cronológicos, sem lore excessiva.
- Cada evento recente mapeado para 1 consequência concreta (em cenas/capítulos).

Checklist:

- [ ] Linha do tempo (5–7 marcos)
- [ ] 3 relações causa→efeito
- [ ] 2–3 eventos recentes com impacto narrativo e/ou jogável

Concluído: x/3 (y%)

---

## S3 — Geografia e Biomas

Objetivo: definir macro‑geografia e biomas que afetam encontros, recursos, navegação e estética.

Campos:

- Mapa macro (descrição textual): <!-- regiões, barreiras naturais, pontos de interesse -->
- Biomas principais: <!-- 3–6; cada um com clima, terreno, recursos/serviços típicos -->
- Riscos ambientais por bioma: <!-- 1–2 por bioma -->

Critérios de Aceitação:

- Biomas listados com 3 atributos mínimos (clima, terreno, recursos/serviços).
- Riscos com impacto prático (p. ex., dano/lentidão/exigência de item no jogo; obstáculos/pressão em cenas narrativas).

Checklist:

- [ ] Biomas definidos (≥3)
- [ ] Riscos ambientais mapeados
- [ ] Pontos de interesse macro descritos

Concluído: x/3 (y%)

---

## S4 — Cultura e Sociedade

Objetivo: tornar práticas as nuances sociais que influenciam diálogos, rumores, comércio e conflitos.

Campos:

- Costumes e tabus: <!-- 3–5; efeito prático em interações (pessoas/lojas/cenas) -->
- Religiões/mitos dominantes: <!-- 1–2; símbolo/prática → efeito prático -->
- Idiomas/variações de fala: <!-- 1–2 marcas linguísticas → uso moderado -->

Critérios de Aceitação:

- Cada costume/tabu com uma manifestação narrativa.
- Religiosidade com 1 gancho prático (evento, item, local, rito/cena).

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
- Tensões conectadas a mudanças de estado rastreáveis (marcos narrativos).

Checklist:

- [ ] 2–4 facções modeladas
- [ ] Economia regional definida
- [ ] Tensões com estados mutáveis/rastreáveis mapeados

Concluído: x/3 (y%)

---

## S6 — Tecnologia/Magia e Regras do Sistema

Objetivo: definir limites e custos de tecnologia/magia que afetam traversal, combate e puzzles.

Campos:

- Fontes e custos: <!-- ex.: mana/energia, consumíveis, cooldowns, sacrifícios -->
- Limites e proibições: <!-- o que não pode; evita retcons -->
- Impactos no design: <!-- 3 exemplos concretos (porta, cura, mobilidade) e/ou consequências narrativas -->

Critérios de Aceitação:

- Cada “poder” ou regra com 1 custo e 1 limite.
- 3 impactos diretos em conflitos/limitações de cena.

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

Critérios de Aceitação:

- Cada criatura ligada a 1 bioma, 1 comportamento e 1 recurso/valor.

Checklist:

- [ ] 2–3 criaturas por bioma
- [ ] Gatilhos comportamentais definidos
- [ ] Relevância narrativa básica

Concluído: x/3 (y%)

---

# Parte 2 — Contexto para Jogos (agnóstico de engine)

Aplica a qualquer engine. Traduza elementos para os artefatos do seu projeto (p. ex., níveis/cenas, camadas, zonas/regiões, marcadores/tags, flags/variáveis), sem depender de nomes proprietários.

---

## S8 — Regiões Jogáveis e Mapeamento

Objetivo: mapear o mundo para artefatos do projeto (níveis/cenas, coleções visuais, zonas/tags e transições) e entradas de conteúdo.

Campos:

- Regiões jogáveis: <!-- tabela curta Nome → Nível/Cena(s) → Coleção visual (tileset/palette/material) → notas -->
- Uso de Zonas/Regiões: <!-- 3–6 zonas por nível para encontros, armadilhas, colisões especiais, scripts/triggers -->
- Uso de Tags de Terreno/Área: <!-- 0–7 categorias para travessia/efeitos (lento, escorregadio, venenoso etc.) -->
- Portas/Transições: <!-- conexões entre níveis/cenas; condições de entrada/saída → carregamento, checkpoints -->

Critérios de Aceitação:

- Cada região com ao menos 1 nível/cena e uma coleção visual definida.
- Regras de zonas e tags de terreno/área documentadas por nível/cena.

Checklist:

- [ ] Tabela regiões → Nível/Cena/Coleção visual
- [ ] Zonas/regiões por nível definidas
- [ ] Tags de terreno/área por nível definidas
- [ ] Portas/transferências mapeadas

Concluído: x/4 (y%)

<!-- Exemplo mínimo de linha de tabela (substituir):
Região: Planalto Seco | Nível/Cena: planalto_005, planalto_006 | Coleção visual: tileset_deserto_v2 | Zonas: 1=grama alta, 2=armadilha | Tag terreno: areia (lento)
-->

---

## S9 — Clima, Dia/Noite e Estados Ambientais

Objetivo: definir estados que alteram visibilidade, encontros e navegação.

Campos:

- Ciclo de tempo: <!-- parâmetro/variável HoraDia (0–23) → efeitos de trilha/ambiente sonoro, iluminação, spawn -->
- Climas possíveis: <!-- chuva, neblina, tempestade; efeitos e taxas de encontro -->
- Estados ambientais locais: <!-- enchente, nevasca, poeira; bloqueios e danos -->

Critérios de Aceitação:

- Parâmetro de hora documentado e efeitos por faixa.
- Climas com impactos claros (probabilidades/gating/dano).

Checklist:

- [ ] Definição do parâmetro de hora (nome/faixa)
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
- Estados rastreados em flags/variáveis específicos.

Checklist:

- [ ] Lista de bloqueios com condição
- [ ] Chaves/alternativas mapeadas
- [ ] E‑C‑R registrado para decisões
- [ ] Estados ligados a flags/variáveis concretos

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

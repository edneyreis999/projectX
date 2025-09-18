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

- Total marcado: 15/32 itens
- Progresso ponderado: 48%

---

## S1 — Visão Geral do Mundo

Objetivo: estabelecer a identidade do mundo em 1–3 parágrafos claros, úteis para decisões de design e consistência.

Campos:

- Premissa do mundo: Um mundo em tensão crescente onde recursos e poder são escassos, e a magia existe, mas cobra custos reais. Quando um antigo confinamento enfraquece, forças esquecidas voltam à superfície e obrigam povos rivais a cooperar ou ruir.
- Tom e atmosferas dominantes: longo período de paz; místico; magia; animais fantásticos; profecias
- Restrições e escopo: toda a história e a lore acontecem exclusivamente no continente de Ekios.
- Pilares de mundo:
  - Magia tem custo real e limitação: conjurar drena mana; em excesso, drena energia vital. Nem todos podem usar; controle requer treino. Sem runas mágicas até o confronto final.
  - Tecnologia rudimentar e localizada: anões são os mais hábeis, mas a tecnologia ainda é primitiva (principalmente a bélica); depende de materiais e tempo, com risco/limite prático.
  - Escopo fechado a Ekios: toda a história e a lore acontecem exclusivamente no continente de Ekios.

Critérios de Aceitação:

- Premissa em até 2 frases, com contraste explícito.
- Pilares definidos (3) e acionáveis.
- Restrições listadas impactam escolhas de implementação.

Checklist:

- [x] Premissa validada (2 frases, contraste, verbos ativos)
- [x] 3 pilares redigidos e revisáveis
- [x] Restrições e escopo registrados

Concluído: 3/3 (100%)

---

## S2 — História e Linha do Tempo

Objetivo: delinear eventos macro que explicam o estado atual do mundo; útil para ambientação, rumores e gating.

Campos:

- Linha do tempo sintética:
  1. Ruptura do selo e libertação dos ignotos (fim do Ato 1).
  2. Delegação anã parte em busca de ajuda; Thorin no grupo (fim do Ato 1).
  3. Chegada a Arcaror e formação de aliança inicial (meio do Ato 2).
  4. Retorno a Gildrat com aliados (fim do Ato 2 iminente).
  5. Derrota em batalha e queda de Gildrat (fim do Ato 2).
  6. Retirada e fundação do posto de combate Daratrine (pós-derrota).
  7. Cerco dos ignotos e batalha decisiva em Daratrine; o Chefe dos Ignotos aparece e é derrotado; vitória do grupo. Epílogo: os ignotos continuam a se espalhar por Ekios (gancho para DLC “Selo de Melios”).
- Causas e efeitos centrais:
  - Ruptura do selo → ignotos libertos → escalada de conflito → queda de Gildrat → refugiados em Daratrine.
  - Divisão élfica (Conselho isolacionista vs seguidores de Elmartin) → ajuda condicionada → progresso depende de convencer o líder dos seguidores de Elmartin; sua filha integra o grupo de Thorin no retorno a Gildrat.
  - Magia cara/limitada + tecnologia rudimentar → viagens e mobilização lentas → necessidade de soluções locais (ex.: canoa dos goblins) e alianças táticas.
  - Influência do Profeta das Sombras (visões/sonhos) sobre Dambur → decisão de iniciar a exploração de Melios para localizar o selo → ordem de explosão do selo apesar dos alertas culturais (via explosivos de Balastrus).
- Eventos recentes que afetam o jogo:
  - Desmoronamento nas Minas de Melios → rota principal bloqueada; missão de desobstrução ou desvio; recursos escassos aumentam risco/encontros.
  - Travessia do grande rio → tribo goblin em Metsa ajuda após missão principal; um goblin artesão entra no grupo e constrói o barco; libera navegação fluvial.
  - O Alerta aos Elfos em Arcaror → persuasão/condições cumpridas; parte dos elfos (seguidores de Elmartin) aliam-se; desbloqueia suporte mágico/recursos para o próximo arco.
  - Vestígios em Metsa (relato de Zik, batedor goblin) → carro leve de lenhadores goblins tombado; dois anões encontrados “secos” (vida drenada); odor acre de reagentes; marcas de arrasto/garras somem em fenda → sinal de expansão dos Ignotos e gatilho para recrutamento de Zik.

Critérios de Aceitação:

- 5–7 marcos cronológicos, sem lore excessiva.
- Cada evento recente mapeado para 1 consequência in‑game.

Checklist:

- [x] Linha do tempo (5–7 marcos)
- [x] 3 relações causa→efeito
- [x] 2–3 eventos recentes com impacto jogável

Concluído: 3/3 (100%)

---

## S3 — Geografia e Biomas

Objetivo: definir macro‑geografia e biomas que afetam encontros, recursos, navegação e estética.

Campos:

- Mapa macro (descrição textual): Montanhas e minas cercam Gildrat no norte/centro do continente; a oeste está Arcaror; ao sul localiza-se a Floresta de Metsa; mais ao sul/sudoeste estende‑se o Deserto de Amnos (abaixo de Arcaror). Pontos de interesse macro incluem: Minas de Melios, passagens montanhosas, oásis de Amnos, clareiras ritualísticas de Metsa e ruínas antigas nas encostas.
- Biomas principais:
  - Montanhas e Minas de Gildrat — clima frio‑seco; terreno rochoso/cavernas; recursos: minérios, carvão, cristais luminescentes; fauna: grifos, cabras da montanha, lobos gigantes e diversas criaturas subterrâneas, inclusive desconhecidas.
  - Floresta de Metsa — clima temperado com inverno rigoroso; densa e mística; recursos: ervas raras, madeira nobre, componentes mágicos; fauna: Griffalo (B), Gloomsnake (B), Pantera de Dreampaw (A); flora: Árvore do Equinócio, Lírio da Lua.
  - Deserto de Amnos — escaldante com noites frias; dunas e rocha; recursos: cactos, palmeiras e oásis escassos; cultura local: ogros nômades com rituais a Anura (Vida) e Aruna (Morte).
- Riscos ambientais por bioma:
  - Gildrat (montanhas/minas): deslizamentos, quedas de rocha e desmoronamentos.
  - Metsa: neblina densa, predadores noturnos.
  - Amnos: tempestades de areia, desidratação; furacões sazonais; vermes comedores de pedra.

Critérios de Aceitação:

- Biomas listados com 3 atributos mínimos (clima, terreno, recursos).
- Riscos com impacto jogável (dano, lentidão, exigência de item).

Checklist:

- [x] Biomas definidos (≥3)
- [x] Riscos ambientais mapeados
- [x] Pontos de interesse macro descritos

Concluído: 3/3 (100%)

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

- Facções principais:
  - Império de Gildrat (Guarda de Ferro) — objetivo: retomar controle e proteger refugiados; recurso crítico: metalurgia/minas (armas, armaduras); relação: busca alianças táticas para conter os ignotos.
  - Elfos seguidores de Elmartin — objetivo: preservar equilíbrio e conter ignotos; recurso crítico: conjuradores/rituais; relação: pró‑aliança com Gildrat e em tensão com o Conselho; detalhe: a filha do líder (Ciryel) junta‑se ao grupo de Thorin no retorno a Gildrat; líder provisório: Elandar.
  - Conselho de Arcaror — objetivo: autopreservação/isolacionismo; recurso crítico: bibliotecas rituais e barreiras mágicas; relação: antipatiza anões, evita combate direto e se protege atrás da própria magia; ajuda só sob condições estritas.
- Economias locais:
  - Gildrat: moeda “Drakeis”; produção central de ferro/aço, carvão e cristais luminescentes; preços de metal trabalham em alta; troca por suprimentos e favores militares.
  - Metsa (recorte goblin): sem moeda definida; economia de escambo e ofício (madeira leve, resina, artesanato/embarcação); pagamento em serviços/itens; relação por confiança.
  - Arcaror: ethos comunal (“tudo é de todos”); acesso por necessidade e dever; sem moeda; contrapartidas em rituais/serviço à comunidade.
- Tensões ativas:
  - Gildrat × Conselho de Arcaror — causa: recusa/hesitação em auxílio direto; efeito: atrito diplomático e restrições de acesso; estado: reputação com Conselho abre/fecha serviços.
  - Conselho × Seguidores de Elmartin — causa: doutrina isolacionista vs intervenção; efeito: disputa por recursos rituais; estado: controle de bibliotecas/ritos alterna conforme decisões do jogador.
  - Goblins de Metsa × ameaça local — causa: perigo próximo às aldeias; efeito: travessia do rio bloqueada; estado: missão resolve ameaça e libera aliado artesão (Zik) + barco.

Critérios de Aceitação:

- Facções com objetivos claros e recursos únicos.
- Tensões conectadas a mudanças de estado (switch/variável) no jogo.

Checklist:

- [x] 2–4 facções modeladas
- [x] Economia regional definida
- [x] Tensões com estados mutáveis mapeados

Concluído: 3/3 (100%)

---

## S6 — Tecnologia/Magia e Regras do Sistema

Objetivo: definir limites e custos de tecnologia/magia que afetam traversal, combate e puzzles.

Campos:

- Fontes e custos: Magia canalizada via mana; conjuração drena mana e, em excesso, passa a drenar energia vital (fadiga, inconsciência, risco de morte). Parte da população nasce “infértil” para mana; controle exige treino/cultura. Sem runas mágicas até o confronto final.
- Limites e proibições: Tecnologia é rudimentar (principalmente a bélica) e depende de materiais/tempo; Magia de Sangue é banida; teletransportes e invocações de grande escala requerem custos altos e/ou são raríssimos.
- Impactos no design: 1) Gestão de recursos (mana/risco vital) limita cura e explosão de dano; 2) Traversal condicionado (areias/friagem/neblina) sem “atalhos mágicos” fáceis; 3) Gating por preparo e aliados (alianças com Arcaror/ogros substituem “soluções mágicas” indiscriminadas).

Critérios de Aceitação:

- Cada “poder” ou regra com 1 custo e 1 limite.
- 3 impactos diretos em puzzles/traversal/combate.

Checklist:

- [x] Custos definidos por fonte
- [x] Limites/proibições registrados
- [x] 3 impactos práticos exemplificados

Concluído: 3/3 (100%)

---

## S7 — Ecologia e Criaturas

Objetivo: conectar criaturas a biomas, recursos e comportamentos que informam encontros e ambientação.

Campos:

- Lista de criaturas por bioma:
  - Subsolo/Melios → Ignotos Sombrio (magia), Ignotos Bruto (infértil para magia)
  - Metsa (fissuras/bordas de túnel) → vestígios de Ignotos; goblins; fauna local
- Comportamentos e gatilhos (Ignotos):
  - Gatilhos de aparição: ruptura de selos/estruturas; ruído contínuo de mineração/explosões; cheiro de matéria orgânica fresca; luz intensa em áreas profundas.
  - Primeiro minuto: ataque imediato e silencioso; neutralizam vivos e cessam fontes de ruído/luz.
  - Padrão de ação: eliminar/abater; coletar matéria orgânica e levar ao subsolo para alquimia; priorizam grupos isolados.
  - Retirada: retorno rápido com cargas; desabam/selam passagens; deixam zona “estéril”.
  - Variação: Ignotos Brutos (inférteis para magia) deixam rastro físico de destruição (objetos quebrados) e recuam em blocos.
- Recursos/itens associados (pistas diegéticas):
  - Odor acre de reagentes; marcas de garras e arrasto; corpos “secos” (vida drenada); resíduos vítreos/ampolas rachadas ocasionais.
- Cena exemplar (Metsa):
  - Madrugada após nevasca leve; carro leve de lenhadores goblins tombado; dois anões (longe de Gildrat) encontrados “secos”; trilhas de arrasto somem em fenda; Zik (batedor goblin) relata “cheiro químico” persistente — indício de expansão dos Ignotos e motivação para seu recrutamento (início do Ato II).

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
- [2025‑09‑16] Sessão 1: premissa e tom definidos; log criado em zord/sessoes/ekios-world/ekios-world-log.md.
- [2025‑09‑17] Sessão 2: pilares, restrições (escopo Ekios), biomas (Gildrat/Metsa/Amnos), timeline sintética e regras de magia/tecnologia registradas.
- [2025‑09‑17] Sessão 6: encerramento em Daratrine (chefe dos Ignotos derrotado) com epílogo abrindo DLC “Selo de Melios”; Thorin atua como Medianeiro no rito em Arcaror; detalhes mecânicos de “Luz de Ram” adiados (uso narrativo apenas por ora).

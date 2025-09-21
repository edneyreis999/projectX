# Plano para transpor ideias do doc de magia para o doc de world building

Contexto
 • Plano Alteração (PA): temp-gdd-ekios/<nome-do-plano>.md
 • Documento uso de magia: [magia](../../frontend/docs/GDD/2-world-building/magia.md)
 • Documento Alterar (base): [o-continente-de-ekios.v2](../../frontend/docs/GDD/2-world-building/o-continente-de-ekios.v2.md)

Instruções gerais

 1. Crie um plano detalhado, dividido em tasks, no arquivo Plano Alteração (PA).
 2. Não altere o arquivo Documento Alterar diretamente. Instrua explicitamente a criar uma nova versão dele, copiando o conteúdo original e adicionando as melhorias propostas.
 3. Use o Documento uso de magia como referência para sugerir melhorias.
 4. Ao transpor trechos. Reescreva-os de forma que soem originais no contexto de Documento Alterar. Adicione um link de navegação "Ver mais em..." para o trecho referente no Documento uso de magia
 5. Concentre-se apenas na elaboração do plano de alteração. Não execute o plano.

Estrutura do plano

Para cada trecho analisado do Documento uso de magia, descreva:
 • Tópico: qual parte do Documento Alterar será adicionada ou editada.
 • Fonte: fragmento do Documento uso de magia usado como base.
 • Alteração no destino:
 • Se for edição, indique qual trecho do Documento Alterar será modificado e como.
 • Se for adição, descreva como o novo conteúdo será integrado ao Documento Alterar, mantendo coerência com o que já está documentado.
 • Sempre que possível, use texto corrido para descrições. Use bullet points somente quando texto corrido ficr complexo e dificil de entender.

Restrições (fora de escopo)
 • Não remova tópicos inteiros já existentes em Documento Alterar.
 • Não aplique o plano sem autorização explícita.

⸻

Seções do Plano

 1. Análise inicial: Meus comentários sobre o Documento uso de magia. O que e como podemos aproveitar do Documento uso de magia

⸻

---

## 1. Analise inicial

- S1 — Visão Geral do Mundo
  - está carente de citações de como a magia funciona no universo.

- S2 — História e Linha do Tempo
  - Chefe dos Ignotos já foi definido como "O Profeta das Sombras"
  - A influencia do profeta sobre Dambur pode ser melhor descrita
  - Um dos gatilhos para formação de aliança inicial é a descoberta dos dons de Thorim, a prova final foi a descoberta (por acaso) que Thorin assim como os elfos de rank mais alto consegue navegar pelo Reino da Mana consientemente. Dá alguma coisa errada em um Severança onde o O Profeta das Sombras está possuindo alguém muito importante e o elfos do alto escalão decidem usar o plano B que é até o Reino da Mana e combater o demonio "pessoalmente" ao serem derrotados no Reino da Mana, Thorin, sem querer, entra no Reino da Mana também e confronta O Profeta lá, ganha a batalha e salva todos os elfos do alto escalão de Arcaror e a princesa Ciryel.

- S3 — Geografia e Biomas
  - Falta descrição de Cetra, no mesmo bioma de Arcaror um pouco mais a direita

- S4 — Cultura e Sociedade
  - Esse trecho fala muito de Daratrine pós‑derrota de Gildrat. Mas falta descrição de como era Gildrat antes da queda, Arcaror e Cetra.

- S5 — Facções, Poder e Economia
  - Falta a descrição de porque Gildrat e Arcaror não se conversavam antes da quebra do selo.
  - As descrições de Gildrat e Arcaror estão rasas
  - Falta descrição de Cetra

- S6 — Tecnologia/Magia e Regras do Sistema
  - Essa é a sessão que mais pode ser beneficiada com o Documento de Magia. Use a abuse dos tópicos do documento e do link "Ver mais em ..."
  - Essa sessão está bem rasa em relação as coisas já documentadas no documento de magia.

⸻

---

## 2. Preparação (não executar ainda)

Antes de qualquer alteração, criar uma nova versão do documento de world building.

Instrução: Criar `frontend/docs/GDD/2-world-building/o-continente-de-ekios.v3.md` como cópia fiel de `frontend/docs/GDD/2-world-building/o-continente-de-ekios.v2.md`. Todas as mudanças abaixo devem ser aplicadas exclusivamente no arquivo v3.

Nota: Não remover tópicos inteiros do v3. Apenas ajustar, enriquecer e inserir novos parágrafos ou subitens conforme descrito nas tasks.

⸻

---

## 3. Plano de Transposição — Tasks por Seção (S1–S6)

Observação: Cada task traz um Tópico (onde será adicionado/editado no v3), a Fonte (trecho do documento de magia que embasa a mudança) e a Alteração no destino (como integrar no v3). Sempre que citar conteúdo originado do documento de magia, redigir texto original adequado ao tom do v3 e incluir um link de navegação “Ver mais em …” apontando para a seção correspondente em `frontend/docs/GDD/2-world-building/magia.md`.

---

### S1 — Visão Geral do Mundo

Task S1.1 — Inserir parágrafo sintético sobre funcionamento da magia

- Tópico: S1 — Visão Geral do Mundo (após “Pilares de mundo”).
- Fonte: “Resumo de 1 Minuto”, “Fundamentos”, “Reino da Mana (Sonhos & Espíritos)”, “Barreira entre Mundos”.
- Alteração no destino: Inserir 1 parágrafo de 3–5 linhas explicando, de forma não técnica, que a magia deriva do Reino da Mana, é canalizada por selos verbais e drena mana (com risco de drenar energia vital). Mencionar brevemente a Barreira entre mundos e o papel de instituições como Cetra na regulação e ensino. Incluir ao final: “Ver mais em: Magia — Resumo de 1 Minuto” e “Magia — Reino da Mana”. Links: `(../../frontend/docs/GDD/2-world-building/magia.md#resumo-de-1-minuto)` e `(../../frontend/docs/GDD/2-world-building/magia.md#reino-da-mana-sonhos--espíritos)`.

---

### S2 — História e Linha do Tempo

Task S2.1 — Nomear explicitamente o Chefe dos Ignotos e sua influência

- Tópico: S2 — Linha do tempo (itens 1–2) e “Causas e efeitos centrais”.
- Fonte: “Proibições e Tabus — Magia Sanguínea”, “Riscos Espirituais: Posse por Entidades”, “Sonhos Lúcidos e Sintonias”.
- Alteração no destino: Ajustar redação para fixar “Profeta das Sombras” como Chefe dos Ignotos e caracterizar sua influência sobre Dambur via projeções oníricas/frequência. Explicitar que zonas de Barreira fina e reagentes profundos potencializam o alcance. Inserir “Ver mais em: Magia — Proibições (Magia Sanguínea)” e “Magia — Riscos Espirituais / Sonhos Lúcidos”. Links: `(../../frontend/docs/GDD/2-world-building/magia.md#proibições-e-tabus)` e `(../../frontend/docs/GDD/2-world-building/magia.md#custos-esgotamento-e-riscos)`; `(../../frontend/docs/GDD/2-world-building/magia.md#taxonomia-de-técnicas)` (subseção “Sonhos Lúcidos e Sintonias”).

Task S2.2 — Evento narrativo: descoberta dos dons de Thorin e navegação lúcida

- Tópico: S2 — Linha do tempo (entre itens 3 e 4) e “Eventos recentes”.
- Fonte: “Reino da Mana (Sonhos & Espíritos)”, “Sonhos Lúcidos e Sintonias”, “Riscos Espirituais”.
- Alteração no destino: Adicionar evento que narre a descoberta, em Arcaror, de que Thorin possui capacidade de lucidez no Reino da Mana, semelhante a elfos de alto rank. Contextualizar como esse fato acelera a formação da aliança e como torna Thorin peça‑chave contra o Profeta. Incluir “Ver mais em: Magia — Reino da Mana / Sonhos Lúcidos”. Links: `(../../frontend/docs/GDD/2-world-building/magia.md#reino-da-mana-sonhos--espíritos)` e `(../../frontend/docs/GDD/2-world-building/magia.md#taxonomia-de-técnicas)` (subseção “Sonhos Lúcidos e Sintonias”).

Task S2.3 — Confronto no Reino da Mana (falha do plano principal e “plano B”)

- Tópico: S2 — Linha do tempo (item 7) e “Causas e efeitos centrais”.
- Fonte: “Riscos Espirituais: Posse por Entidades”, “Instituições e Controle — Cetra”, “Reino da Mana”.
- Alteração no destino: Redigir breve relato do incidente em que líderes élficos e a princesa Ciryel tentam enfrentar uma possessão crítica associada ao Profeta; ao falhar o rito convencional, adotam a estratégia de confronto no Reino da Mana (“plano B”). Thorin, inadvertidamente, cruza a Barreira e vence o duelo onírico, salvando a comitiva. Amarrar consequência direta nos eventos subsequentes. “Ver mais em: Magia — Riscos Espirituais / Instituições (Cetra)”. Links: `(../../frontend/docs/GDD/2-world-building/magia.md#custos-esgotamento-e-riscos)` e `(../../frontend/docs/GDD/2-world-building/magia.md#instituições-e-controle)`.

---

### S3 — Geografia e Biomas

Task S3.1 — Inserir descrição de Cetra (localização/bioma)

- Tópico: S3 — Ponto de interesse/bioma próximo a Arcaror.
- Fonte: “Instituições e Controle — Cetra”.
- Alteração no destino: Adicionar subitem descrevendo Cetra como cidade‑torre de formação/regulação de magia, situada no mesmo macrobioma de Arcaror, porém com características próprias (clareiras ritualísticas, bibliotecas, barreiras). “Ver mais em: Magia — Instituições (Cetra)”. Link: `(../../frontend/docs/GDD/2-world-building/magia.md#instituições-e-controle)`.

Task S3.2 — Mapear “Zonas de Barreira Fina” como fenômeno geográfico

- Tópico: S3 — Riscos ambientais e pontos de interesse.
- Fonte: “Barreira entre Mundos”.
- Alteração no destino: Inserir um parágrafo explicando que antigos campos de batalha, cavernas com minerais mágicos e locais de grandes tragédias são “zonas finas”, com efeitos sensoriais e risco espiritual. Sugerir marcações diegéticas (sinais sutis) úteis para level design. “Ver mais em: Magia — Barreira entre Mundos”. Link: `(../../frontend/docs/GDD/2-world-building/magia.md#barreira-entre-mundos)`.

---

### S4 — Cultura e Sociedade

Task S4.1 — Retrato pré‑queda de Gildrat (visão sobre magia)

- Tópico: S4 — Costumes/tabus (expandir contexto de Gildrat antes da queda) e “Religiões/mitos”.
- Fonte: “Variações Culturais e Regionais — Anões (Gildrat)”, “História e Sociedade”.
- Alteração no destino: Inserir parágrafo descrevendo o pragmatismo e o temor anão quanto à magia, leis anti‑magia e a dependência histórica de elfos para rituais de severança, vistos como segurança. “Ver mais em: Magia — Variações Culturais (Anões)”. Link: `(../../frontend/docs/GDD/2-world-building/magia.md#variações-culturais-e-regionais)`.

Task S4.2 — Retrato de Arcaror e ethos mágico

- Tópico: S4 — Costumes/tabus e marcas linguísticas (complemento de contexto cultural).
- Fonte: “Variações Culturais e Regionais — Elfos (Arcaror)”, “Fundamentos” (selos/tatuagens rituais).
- Alteração no destino: Adicionar parágrafo sobre disciplina, ética e rituais élficos (tatuagens/selos) e a abolição do ritual de severança em favor de ritos de exorcismo/serenidade. “Ver mais em: Magia — Fundamentos / Variações (Elfos)”. Links: `(../../frontend/docs/GDD/2-world-building/magia.md#fundamentos)` e `(../../frontend/docs/GDD/2-world-building/magia.md#variações-culturais-e-regionais)`.

Task S4.3 — Papel social de Cetra

- Tópico: S4 — Instituições e práticas sociais (novo subitem curto).
- Fonte: “Instituições e Controle — Cetra”.
- Alteração no destino: Incluir parágrafo curto posicionando Cetra como território neutro e regulador, com admissão multirracial e atuação de fiscalização/consulta/exorcismo. “Ver mais em: Magia — Instituições (Cetra)”. Link: `(../../frontend/docs/GDD/2-world-building/magia.md#instituições-e-controle)`.

---

### S5 — Facções, Poder e Economia

Task S5.1 — Causa da tensão Gildrat × Arcaror (doutrina mágica)

- Tópico: S5 — Tensões ativas (expandir a primeira relação).
- Fonte: “Variações Culturais e Regionais (Anões/Elfos)”, “Instituições e Controle”.
- Alteração no destino: Explicitar que a tensão histórica decorre da doutrina: Gildrat restringe e teme magia (apela a severança); Arcaror regula via ética/disciplinas e exorcismo; Cetra media. “Ver mais em: Magia — Variações / Instituições”. Links: `(../../frontend/docs/GDD/2-world-building/magia.md#variações-culturais-e-regionais)` e `(../../frontend/docs/GDD/2-world-building/magia.md#instituições-e-controle)`.

Task S5.2 — Economia e controle de artefatos (Pedras de Runas)

- Tópico: S5 — Economias locais (Arcaror/Cetra) e “Mercado”.
- Fonte: “Pedras de Runas Mágicas”, “História e Sociedade”.
- Alteração no destino: Incluir nota de controle/escassez de Pedras autênticas por Cetra e valorização em mercados locais; risco de pedras contaminadas. “Ver mais em: Magia — Pedras de Runas / História e Sociedade”. Links: `(../../frontend/docs/GDD/2-world-building/magia.md#pedras-de-runas-mágicas)` e `(../../frontend/docs/GDD/2-world-building/magia.md#história-e-sociedade)`.

---

### S6 — Tecnologia/Magia e Regras do Sistema

Task S6.1 — Afinidade e Maestria (indicadores práticos)

- Tópico: S6 — Fontes e custos (subseção).
- Fonte: “Afinidade e Maestria”.
- Alteração no destino: Acrescentar 1 parágrafo com definição de afinidade e maestria e listar, de muito forma concisa, indicadores práticos: taxa de falha, tempo de conjuração, custo relativo, complexidade máxima. “Ver mais em: Magia — Afinidade e Maestria”. Link: `(../../frontend/docs/GDD/2-world-building/magia.md#afinidade-e-maestria)`.

Task S6.2 — Sintaxe Rúnica (resumo operacional)

- Tópico: S6 — Limites e proibições (novo subitem curto “Sintaxe Rúnica”).
- Fonte: “Sintaxe Rúnica (Selos Verbais)”.
- Alteração no destino: Inserir resumo de 3–4 linhas sobre categorias (elemento, forma, magnitude, duração, alcance, alvo, ancoragem, condição), destacando trade‑offs entre mantras longos e invocações curtas. “Ver mais em: Magia — Sintaxe Rúnica”. Link: `(../../frontend/docs/GDD/2-world-building/magia.md#sintaxe-rúnica-selos-verbais)`.

Task S6.3 — Taxonomia de Técnicas (inclui telepatia limitada)

- Tópico: S6 — Impactos no design (complemento descritivo).
- Fonte: “Taxonomia de Técnicas” (com ênfase em telepatia limitada) e “Sonhos Lúcidos e Sintonias”.
- Alteração no destino: Descrever brevemente categorias (ofensivas/defensivas/gerais/corporais/cura/sábias) e frisar que telepatia é limitada a projeções com custo crescente por distância/clareza. “Ver mais em: Magia — Taxonomia / Sonhos Lúcidos”. Links: `(../../frontend/docs/GDD/2-world-building/magia.md#taxonomia-de-técnicas)`.

Task S6.4 — Proibições e Tabus (Magia Sanguínea)

- Tópico: S6 — Limites e proibições (expandir).
- Fonte: “Proibições e Tabus — Magia Sanguínea”.
- Alteração no destino: Inserir definição curta de Magia Sanguínea (sacrifícios/catalisadores orgânicos, poder bruto e instável), proibição universal e riscos de corrupção/detenção. “Ver mais em: Magia — Proibições e Tabus”. Link: `(../../frontend/docs/GDD/2-world-building/magia.md#proibições-e-tabus)`.

Task S6.5 — Pedras de Runas Mágicas (atributos e sintonização)

- Tópico: S6 — Fontes e custos (novo subitem “Artefatos”).
- Fonte: “Pedras de Runas Mágicas”.
- Alteração no destino: Adicionar parágrafo com tipos (amplificação/estabilização/foco/armazenamento), atributos (M, C, D, R, Pureza) e noções de sintonização/contaminação. “Ver mais em: Magia — Pedras de Runas”. Link: `(../../frontend/docs/GDD/2-world-building/magia.md#pedras-de-runas-mágicas)`.

Task S6.6 — Custos e Riscos (inclui risco de posse e contramedidas)

- Tópico: S6 — Fontes e custos (expandir) e “Impactos no design”.
- Fonte: “Custos, Esgotamento e Riscos” e “Riscos Espirituais: Posse por Entidades”.
- Alteração no destino: Incluir modelo narrativo de custo (em linguagem simples), sinais de exaustão, progressão de consequências e breve menção a rituais de exorcismo/isolamento como contramedidas. “Ver mais em: Magia — Custos e Riscos”. Link: `(../../frontend/docs/GDD/2-world-building/magia.md#custos-esgotamento-e-riscos)`.

---

## 4. Ordem sugerida de edição no v3

1) Criar o arquivo `o-continente-de-ekios.v3.md` (cópia da v2).
2) Aplicar S1 (parágrafo sintético) para setar o tom.
3) Aplicar S2 (S2.1 → S2.3) para amarrar narrativa e motivadores.
4) Aplicar S3 (Cetra + Zonas Finas) para suporte geográfico/ambiental.
5) Aplicar S4 (cultura tríade Gildrat/Arcaror/Cetra) para coerência social.
6) Aplicar S5 (tensões/economia/artefatos) para conflitos práticos e recursos.
7) Aplicar S6 (fundamentos/sintaxe/taxonomia/proibições/artefatos/custos) para regras claras.
8) Passar revisão de coerência e links “Ver mais em …” (testar navegação/âncoras).

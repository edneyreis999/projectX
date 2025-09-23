# Plano de Pesquisa v1 — sistema-chakra

Autor: Aelion Verdesábio (Elfo)

## 1) Objetivo e Resultados esperados (SMART)

- Objetivo: Mapear com precisão como o chakra funciona em Naruto e extrair princípios, padrões e trade-offs que sirvam de base para projetar um sistema de magia original, convincente e balanceado.
- Resultados: (a) síntese canônica do sistema de chakra com citações; (b) tabela de decisões de game design/sistema; (c) checklist de balanceamento e riscos; (d) prompt final para execução no Gemini Deep Research.
- Métricas: cobrir 12+ tópicos nucleares (definição, fontes, circulação, controle, selos, naturezas, jutsu, progressão, custos, riscos, estados especiais, contramedidas); 2+ fontes canônicas por tópico; 1 contraexemplo por seção crítica.
- Prazo: primeiro rascunho em 1 iteração de pesquisa; consolidação em 2–3 iterações.
- Restrições: manter foco em princípios transferíveis; evitar copiar nomes/mecânicas proprietárias ao definir o sistema final (usar como inspiração, não clonagem).

## 2) Escopo e Fora de Escopo

- Escopo: fisiologia do chakra (corpo/mente), produção/armazenamento, circulação/tenketsu, controle/moldagem, selos de mão, naturezas (básicas, avançadas), taxonomia de jutsu (ninjutsu, genjutsu, taijutsu, fūinjutsu, iryō, senjutsu), custos e trade-offs, progressão (treino, marcos), estados especiais (modo sábio, reservas externas), sensores/supressão, selamento, exemplos canônicos e contraexemplos.
- Fora de escopo: enredos, biografias extensas, debates apenas de poder/escalonamento, replicar nomes proprietários no sistema original; fanon sem citação; mecânicas de Boruto que não afetem princípios básicos (apenas se forem úteis e citadas).

## 3) Perguntas de Pesquisa principais (MECE)

1. Definição operacional de chakra: composição (física vs espiritual), função e limites.
2. Produção e armazenamento: como se gera, onde é armazenado e como é recuperado.
3. Circulação e anatomia: rede de chakra e tenketsu; bloqueios/aberturas; implicações práticas.
4. Controle e moldagem: técnica, disciplina, treino; precisão vs volume; papel dos selos de mão.
5. Naturezas de chakra: básicas (fogo, vento, relâmpago, terra, água), transformações avançadas e combinações; afinidade e treino.
6. Taxonomia de técnicas: ninjutsu, genjutsu, taijutsu, fūinjutsu, iryō-ninjutsu, senjutsu; requisitos e custos distintos.
7. Custos e trade-offs: fadiga, tempo de execução, riscos de falha, overchannel (exaustão), danos colaterais.
8. Progressão: construção de capacidade (reservas), controle (eficiência), habilidades (biblioteca de técnicas), marcos e gargalos.
9. Estados e recursos especiais: reservas externas (bestas, selos), modo sábio (energia natural), modos de foco; pré-requisitos e riscos.
10. Contramedidas: selamento, supressão, drenagem, detecção, interrupção (quebra de selos), defesas específicas.
11. Variabilidade individual: talentos, treinamento, herança (kekkei genkai) vs princípios generalizáveis sem IP.
12. Evidência canônica: capítulos/episódios, databooks; divergências/retcons; como decidir em caso de conflito.

## 4) Hipóteses e como falsificar

- H1: Chakra resulta da combinação de energia física e espiritual; maior controle reduz desperdício. Falsificação: casos onde alto controle não implica eficiência observável em situações comparáveis.
- H2: Custos crescem com complexidade técnica (selos, transformações) e volume de chakra exigido. Falsificação: técnica complexa com custo baixo apesar de contexto semelhante.
- H3: Progressão sólida requer aumento tanto de capacidade (reservas) quanto de controle; apenas um eixo limita teto. Falsificação: personagens com grande capacidade e baixo controle executando técnicas finas sem penalidade (ou o inverso) de forma consistente.
- H4: Contramedidas eficazes existem para a maioria das categorias (ex.: selamento, interrupção, detecção), preservando equilíbrio. Falsificação: técnicas sem contrajogo plausível nos registros canônicos.

## 5) Fontes e Critérios de Seleção

- Prioridade: fontes canônicas (mangá licenciado, anime com referência de episódio/tempo, databooks oficiais). Secundárias: wikis com citações, análises técnicas com referência primária.
- Critérios: confiabilidade (canônico > secundário), atualidade (considerar retcons), autoridade (publicações oficiais), rastreabilidade (capítulo/episódio/tempo-código). Marcar divergências e resolver explicitando regra de decisão.
- Observação: quando usar wiki/fandom, extrair apenas com confirmação em fonte primária (citar capítulo/episódio).

## 6) Método e Passos Operacionais

1. Coletar definições canônicas e diagrama funcional (produção → circulação → moldagem → execução → recuperação).
2. Montar matriz de técnicas por categoria com requisitos (selos, natureza, treino) e custos observáveis.
3. Extrair princípios transferíveis (sem IP) e mapeá-los para o sistema original: energia-fonte, custos, checks, rolagens/limiares, cooldowns, contrajogos.
4. Criar tabela “mecânica → evidência → implicação de design” com 2+ citações por mecânica.
5. Log de contradições: listar, citar e decidir (prioridade canônica; flag de incerteza quando não resolvido).
6. Produzir checklist de balanceamento (ver item 9) e recomendações para o sistema original.

## 7) Evidências e Rastreabilidade

- Para cada afirmação, incluir ao menos: referência (capítulo/episódio), trecho resumido (paráfrase), link/ID. Evitar transcrição longa; citar no formato: [fonte] capítulo/episódio tempo-código.
- Anexos: quadro-resumo com colunas: Mecânica | Descrição | Exemplo canônico | Contraexemplo | Fontes | Conclusão de design.

## 8) Riscos de Alucinação e Mitigações

- Fanon confundido com cânone → marcar toda afirmação com fonte e tipo (primária/secundária).
- Traduções divergentes → comparar edições/episódios; preferir descrição operacional em vez de termos ambíguos.
- Retcons → manter seção “Histórico e mudanças”; datar fontes.
- Supergeneralização → sempre trazer exemplos e contraexemplos.

## 9) Critérios de Aceitação e Métricas de Sucesso

- Cobertura: 12+ tópicos-chave (ver item 3) com 2+ fontes canônicas cada.
- Entregáveis: (a) síntese canônica; (b) matriz de técnicas; (c) tabela mecânica→evidência→design; (d) checklist de balanceamento.
- Qualidade: cada seção com pelo menos 1 contraexemplo; contradições resolvidas ou sinalizadas.
- Utilidade: recomendações claras e aplicáveis ao novo sistema, evitando termos proprietários.

## 10) Prompts para Gemini Deep Research

### a) Contexto do sistema

Você é um pesquisador técnico encarregado de extrair, com base em fontes canônicas de Naruto (mangá, anime, databooks), os princípios operacionais do chakra para inspirar um sistema de magia original (sem copiar IP). Foque em fatos verificáveis, com citações precisas.

### b) Tarefa específica

Produza um dossiê estruturado que descreve produção, armazenamento, circulação, controle, moldagem, selos de mão, naturezas de chakra, categorias de técnica, custos/risco, progressão, estados especiais, contramedidas e variabilidade individual. Inclua exemplos e contraexemplos canônicos por tópico e uma tabela de implicações de design transferíveis (sem termos proprietários).

### c) Guardrails (do/don’t)

- Faça: citar capítulo/episódio/tempo; diferenciar cânone de wiki; apontar divergências.
- Faça: fornecer ao menos 2 fontes canônicas por tópico quando possível.
- Não faça: copiar texto longo; usar nomes proprietários ao propor o sistema final (apenas ao descrever cânone, com citação).
- Não faça: adotar fan theories sem marcação explícita e checagem cruzada.

### d) Formato de resposta e campos obrigatórios

1. Resumo Executivo (5–8 bullets)
2. Anatomia do Chakra (produção, armazenamento, circulação) [citações]
3. Controle e Moldagem (incl. selos de mão) [exemplos, contraexemplos, citações]
4. Naturezas e Transformações [afinidade, treino, combinações] [citações]
5. Taxonomia de Técnicas (ninjutsu, genjutsu, taijutsu, fūinjutsu, iryō, senjutsu) [requisitos, custos, exemplos] [citações]
6. Custos e Riscos (fadiga, overchannel, falhas) [exemplos, contraexemplos] [citações]
7. Progressão (capacidade, controle, marcos) [citações]
8. Estados e Recursos Especiais (reservas externas, modo sábio, sensores) [pré-requisitos, riscos] [citações]
9. Contramedidas e Defesa (selamento, supressão, detecção, interrupção) [citações]
10. Tabela Mecânica → Evidência → Implicação de Design (transferível, sem IP)
11. Checklist de Balanceamento (itens testáveis)
12. Anexos: Mapa de Citações (fonte, capítulo/episódio, tempo)

### e) Passos de validação/auto-checagem

- Verificar 2+ citações por tópico; marcar qualquer lacuna explicitamente.
- Trazer pelo menos 1 contraexemplo por área crítica (custos, progressão, contramedidas).
- Destacar contradições e sugerir regra de decisão (prioridade canônica ou nota de incerteza).
- Fornecer recomendações de design independentes de IP (trocar termos por genéricos: energia, moldagem, selos, afinidade elemental, etc.).

---

### Exemplos e Contraexemplos (ilustrativos para o dossiê)

- Exemplo (Controle > Capacidade): personagem com reservas moderadas realiza técnica difícil graças a alto controle; sugere mecânica de eficiência que reduz custo.
- Exemplo (Custo por Complexidade): técnica com muitos selos/transformações exige tempo e energia maiores; sugere janela de interrupção e custo proporcional.
- Contraexemplo (Capacidade sem Controle): grande reserva, mas falhas em precisão geram desperdício e risco; sugere penalidades e requisitos mínimos de controle.

---

Observação operacional: este plano enfatiza extração de princípios transferíveis. Ao converter para o seu sistema de magia, renomeie elementos proprietários e use as implicações de design da Tabela Mecânica → Evidência → Design como base.


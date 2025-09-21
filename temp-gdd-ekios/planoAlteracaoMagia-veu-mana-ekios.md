# Plano de Alteração — Magia (Veu/Mana) em Ekios

Contexto

- Plano Alteração (PA): temp-gdd-ekios/planoAlteracaoMagia-veu-mana-ekios.md
- Documento de outro World Building (referência): temp-gdd-ekios/Dragon-Age_Magia.docx
- Documento Alterar (base): frontend/docs/GDD/2-world-building/magia.md
- Relacionados: frontend/docs/GDD/GDD.Narrative-geral.md, temp-gdd-ekios/cetra.md, frontend/docs/GDD/2-world-building/raca-ignotos.md, zord/sessoes/ekios-world/ekios-world-v2.log.md

Instruções gerais

 1) Não alterar diretamente frontend/docs/GDD/2-world-building/magia.md.
 2) Criar uma nova versão: copiar integralmente o conteúdo atual para frontend/docs/GDD/2-world-building/magia.v3.md e aplicar as alterações descritas abaixo.
 3) Remover nomes próprios do documento de referência ao transpor trechos. Reescrever para soarem originais no universo de Ekios.
 4) Este plano lista as tarefas e especifica, para cada mudança, Tópico, Fonte (paráfrase do conceito do documento de referência) e Alteração no destino (Edição/Adição + localização precisa no documento). Não executar até aprovação explícita.

Escopo e restrições

- Fora de escopo: remover tópicos inteiros já existentes no documento base.
- Em escopo: adicionar seções, enriquecer seções existentes, ajustar terminologia, coerência cultural e de risco.

---

## 1) Análise inicial (Documento Alterar)

Base consultada: frontend/docs/GDD/2-world-building/magia.md (v2 — mecânica forte, metafísica rala).

Observações

- O documento base é robusto em mecânica (selos rúnicos, combinações, custos, riscos, pedras de runas) e taxonomias (telepatia, cura, corporais, sábias), mas carece de:
  - Ontologia da mana (o “onde” e “como” a energia existe além do plano físico) e a relação com sonhos/espíritos.
  - Uma barreira entre mundos e suas variações regionais (pontos finos/espessos), útil para narrativa do Profeta e de Thorin.
  - Regras culturais/societais (proibições, punições, instituições) e variação por região (Gildrat vs Arcaror vs Cetra).
  - Tratamento explícito de riscos espirituais (posse por entidades) e contramedidas (exorcismo/rituais de serenidade).
- Em GDD.Narrative-geral.md, as seções “Desenvolvimento dos Personagens — Thorin”, “Mistérios e Revelações” e “A Percepção do Mundo Espiritual...” apresentam o dom de Thorin e o tabu anão, porém de modo raso. Há espaço para conectar a mecânica (telepatia/sonho lúcido) com uma metafísica de “frequências” e um espaço onírico habitado por espíritos.
- O log de sessões (zord/sessoes/ekios-world/ekios-world-v2.log.md) canoniza que o Profeta influencia via sonhos/visões e que Thorin/Elmartin/Mélia interferem por operarem na mesma “frequência”. Isso pede uma fundação no capítulo de magia (telepatia/sonhos) e um capítulo de risco espiritual.
- raca-ignotos.md oferece um excelente gancho para dependência/corrupção por reagentes subterrâneos (análogos ao conceito de uma substância catalítica viciante do doc externo), ligando infertilidade mágica e mutações.
- temp-gdd-ekios/cetra.md descreve a Torre de Cetra como lugar; falta institucionalidade (papéis, regras, fiscalização), que pode ocupar função análoga a círculos/igrejas do documento de referência.

Objetivo desta alteração

- Introduzir a ontologia “Reino da Mana (Sonhos & Espíritos)” e a “Barreira” para sustentar: telepatia, falar com mortos, Profeta/visões, riscos de posse e regiões de véu fino.
- Trazer regras sociais (proibições, ritos, instituições) e variações culturais (Anões x Elfos) e regionais (Gildrat/Arcaror/Cetra).
- Conectar Pedras de Runas Mágicas e reagentes subterrâneos às histórias dos Ignotos (dependência, contaminação, artefatos).

---

## 2) Análise do Documento de outro World Building (o que aproveitar/adaptar)

Pontos a excluir (não transpor)

- Quatro escolas fundamentais (estrutura fechada) — incompatível com a taxonomia atual de Ekios.
- Ordem paramilitar/templária específica e exemplos canônicos daquele universo.
- Seções “em lore vs mecânica”, “exemplos canônicos”, “princípios de adaptação”, “pontos de incerteza”, “referências”.
- Regra de anões totalmente desconectados do reino de sonhos — incompatível.

Pontos a analisar (aproveitar com adaptação e sem nomes próprios)

- Reino paralelo de sonhos/espíritos onde pensamento molda realidade; magos extraem energia desse plano.
- Barreira entre mundos de espessura variável (mais fina onde há morte, emoção intensa ou magia massiva).
- Conexão inata/variável com esse reino; alguns conseguem manter consciência lúcida ao sonhar e navegar ativamente.
- “Magia de sangue” enquanto categoria tabu com alto custo moral/espiritual (sem transpor nome próprio) — ligar ao Profeta e pequenas tribos de elfos de sangue afastada de Arcaror.
- Riscos: entidades do outro reino podem possuir usuários vulneráveis; sociedades temem e regulam isso.
- Ritual de “serenidade/severança” como sanção extrema (sem transpor o nome original), historicamente usado em Gildrat via contratação de elfos; abolido em Arcaror.
- Substância/artefatos catalíticos que aumentam poder mas causam dependência/corrupção — adaptar aos reagentes/poções dos Ignotos e às Pedras de Runas Mágicas.
- Instituições que formam, regulam e julgam magos — mapear função para Cetra.
- Variação cultural entre povos — reescrever para Anões e Elfos.
- Variação por era/região — aplicar em Gildrat, Arcaror, Cetra.

Notas de terminologia (para evitar nomes do doc externo)

- “Fade” → Reino da Mana
- “Véu” (nome próprio externo) → Barreira
- “Lyrium” → Profundina (tônico/poções dos Ignotos)

---

## 3) Tarefas (macro)

1) Criar cópia do documento base como magia.v3.md.
2) Adicionar metafísica: Reino da Mana (Sonhos & Espíritos).
3) Adicionar Barreira entre Mundos (Veu) + zonas finas.
4) Hereditariedade e despertar (capacidade inata + surgimento espontâneo).
5) Telepatia/sonho lúcido: detalhar “frequência” e interferências (Thorin/Elmartin/Mélia).
6) Proibições: Magia de Sangue (adaptada) + fonte de poder do Profeta.
7) Riscos espirituais: posse por entidades + rituais élficos de exorcismo.
8) Sanção histórica: Ritual de Serenidade/Severança (Gildrat) e abolição em Arcaror.
9) Dependência/corrupção por Profundina (Ignotos) + ligação com infertilidade/mutações.
10) Instituições e Controle: Cetra como formação/regulação; leis e tabus em Gildrat.
11) Variações culturais (Anões x Elfos) e regionais (Gildrat/Arcaror/Cetra).
12) Pedras de Runas Mágicas: sub-seção de ressonância/corrupção e artefatos legados.
13) História e Sociedade: reforçar impacto social das regras acima.
14) Glossário: incluir novos termos e grafias canônicas.

---

## 4) Alterações detalhadas (tópico, fonte, alteração no destino)

Tópico: Reino da Mana (Sonhos & Espíritos)
Fonte (paráfrase): Um plano paralelo de sonhos/espíritos onde vontade e emoção moldam a realidade; é dele que se extrai energia mágica.
Alteração no destino (Adição):

- Local: Após “## Fundamentos”, criar a seção “## Reino da Mana (Sonhos & Espíritos)”.
- Conteúdo:
  - Descrever o Reino como espelho distorcido e maleável, onde pensamento intencional cria efeitos.
  - Explicar que todo ser sonha nesse lugar passivamente; alguns (ex.: Thorin, sua mãe, Elmartin e elfos com alto ranking de controle de mana) mantêm lucidez e navegação ativa.
  - Ligar a extração de mana à presença de catalisadores (selos, pedras, rituais, tatoos dos elfos) para estabilizar a canalização.

Tópico: Barreira entre Mundos (Veu)
Fonte (paráfrase): Uma barreira separa plano físico e Reino da Mana; sua espessura varia e fica “fina” onde há morte/emoção intensa/magia massiva.
Alteração no destino (Adição):

- Local: Após “## Reino da Mana (Sonhos & Espíritos)”, criar “## Barreira entre Mundos”.
- Conteúdo:
  - Conceituar a Barreira como constante (sempre existiu) e variável por região/evento.
  - Definir zonas finas (campos de batalha, cavernas saturadas, locais de rituais, tragédias) e seus efeitos (sonhos vívidos, aparições, risco de posse).
  - Introduzir sinalizações diegéticas: calafrios, ecos, sussurros, padrões rúnicos espontâneos.

Tópico: Capacidade inata e hereditariedade
Fonte (paráfrase): Aptidão mágica é característica inata que pode surgir em linhagens ou espontaneamente.
Alteração no destino (Edição):

- Local: “## Fundamentos” — expandir bullets “Conjurador” e “Afinidade”.
- Conteúdo:
  - Acrescentar que a capacidade nasce inata, tende a herdar-se, mas pode emergir sem histórico familiar.
  - Notar que treinabilidade difere da aptidão; instituições testam e educam.

Tópico: Telepatia, Sonho Lúcido e “Frequência”
Fonte (paráfrase): Conexões mentais e interferências operam como sintonias compartilhadas; sonhos/visões são canais de influência.
Alteração no destino (Edição/Adição):

- Local: “## Taxonomia de Técnicas” → subitem Telepatia; e criar sub-seção “### Sonhos Lúcidos e Sintonias”.
- Conteúdo:
  - Telepatia: especificar limites (projeções simples, sem “miragens tangíveis”) e custos de manter elo.
  - Sonhos: definir como canal legítimo para mensagem/visão quando há ressonância; trio Thorin/Elmartin/Mélia gera ruído/interferência contra intrusões.
  - Riscos: exposição prolongada em zonas finas aumenta ruído mental e suscetibilidade.

Tópico: Magia de Sangue (Proibida)
Fonte (paráfrase): Categoria tabu que suplanta limites naturais ao custo de contaminação espiritual/moral;
serve como via de manipulação por entidades e líder oculto inimigo.
Alteração no destino (Adição):

- Local: Após “## Taxonomia de Técnicas”, criar “## Proibições e Tabus” com subitem “Magia Sanguínea (Proibida)”.
- Conteúdo:
  - Definir princípios (sacrifício, catalisadores orgânicos, poder bruto instável).
  - Associar à origem do poder do “Profeta das Sombras” (sem detalhes mecânicos; foco narrativo).
  - Notar existência de células/tribos élficas dissidentes (exilados de Arcaror/Cetra) que preservam rituais — ocultas e perigosas.

Tópico: Riscos espirituais — Posse e Exorcismo
Fonte (paráfrase): A conexão mágica atrai entidades; falhas na disciplina abrem brechas para posse. Sociedades temem e regulam.
Alteração no destino (Adição/Edição):

- Local: “## Custos, Esgotamento e Riscos” — adicionar sub-seção “Riscos Espirituais: Posse por Entidades”.
- Conteúdo:
  - Explicar que, em Ekios, não há “abominações” como categoria literal; há posses temporárias/contínuas por entidades do Reino.
  - Sinais de posse: mudança de timbre, lapsos, padrões rúnicos involuntários, hipersensibilidade a zonas finas.
  - Contramedidas: rituais élficos de exorcismo; protocolos de isolamento; papel de instituições (Cetra) na mitigação.

Tópico: Ritual de Serenidade/Severança (histórico — Gildrat)
Fonte (paráfrase): Ritual que “desliga” a ressonância com o Reino; usado como punição/sanção; abolido em regiões élficas.
Alteração no destino (Adição):

- Local: Após “## Riscos Espirituais: Posse...”, criar “## Sanções e Ritos Históricos”.
- Conteúdo:
  - Descrever o ritual praticado em Gildrat (conduzido por elfos sob pagamento), seus efeitos (embotamento da ressonância, perda de telepatia/sonhos lúcidos) e estigma social.
  - Notar abolição em Arcaror e tensão étnica gerada pela prática.

Tópico: Profundina (dependência e corrupção)
Fonte (paráfrase): Substâncias/artefatos que ampliam poder mas viciam/corrompem; ligação com mutações e infertilidade mágica.
Alteração no destino (Adição/Edição):

- Local: “## Pedras de Runas Mágicas” — adicionar sub-seção “Ressonância Corrompida e Profundina”; e “## História e Sociedade”.
- Conteúdo:
  - Mapear os tônicos/poções dos Ignotos como “Profundina”.
  - Efeitos: aumento de potência/estabilidade imediato com custo de dependência, agressividade e mutações; infertilidade mágica crônica.
  - Ligar ao ciclo de risco das Pedras (contaminação de artefatos e usuários; zonas finas amplificam efeitos).

Tópico: Instituições e Controle (Cetra, leis e tabus)
Fonte (paráfrase): Estruturas que formam/regulam magos, julgam abusos e disputam doutrina com poderes seculares/religiosos.
Alteração no destino (Adição/Edição):

- Local: Após “## História e Sociedade”, criar “## Instituições e Controle” + “### Cetra”.
- Conteúdo:
  - Descrever Cetra além do prédio: admissões (testes de afinidade), formação (ranks élficos, selos, ética), fiscalização (auditores), e relação com governos (acordos, consultorias, resgates/exorcismos).
  - Em Gildrat: leis anti-magia, importação de rituais de severança, tabu social, punições.
  - Em Arcaror: acolhimento, educação, abolição de severança, uso de ritos de exorcismo.

Tópico: Variações culturais (Anões x Elfos) e regionais
Fonte (paráfrase): Culturas divergem no ensino/temor/uso da magia; regiões moldam prática e risco.
Alteração no destino (Adição):

- Local: Antes de “## Glossário”, criar “## Variações Culturais e Regionais”.
- Conteúdo:
  - Anões: pragmatismo, medo de posse, políticas restritivas, dependência histórica de terceiros para ritos.
  - Elfos: sistema de ranks, rituais de exorcismo, acolhimento e doutrina ética.
  - Diferenças por região: ser mago em Gildrat x Arcaror x Cetra.

Tópico: Pedras de Runas Mágicas — Artefatos e Contaminação
Fonte (paráfrase): Artefatos potenciadores podem ressoar com substâncias corruptoras; mau uso amplia riscos.
Alteração no destino (Edição):

- Local: “## Pedras de Runas Mágicas”.
- Conteúdo:
  - Incluir atributos de “pureza/contaminação”, procedimentos de sintonização segura, e sintomas de contaminação (zumbido dissonante, calor frio, vertigem sombria).

Tópico: História e Sociedade — reforços
Fonte (paráfrase): Medo social a magos por posse; mercados paralelos de reagentes; regulação institucional.
Alteração no destino (Edição):

- Local: “## História e Sociedade”.
- Conteúdo:
  - Incluir nota sobre popularização de pedras versus risco de corrupção; mercado negro de reagentes; reforçar rituais públicos/éticas élficas.

Tópico: Glossário — novos termos
Fonte (paráfrase): Terminologia da metafísica e do controle institucional.
Alteração no destino (Edição):

- Local: “## Glossário”.
- Conteúdo:
  - Adicionar: Reino da Mana, Barreira, Sonho Lúcido, Sintonias, Posse, Exorcismo, Ritual de Serenidade/Severança, Profundina (nome canônico a definir), Contaminação rúnica.

Tópico: Cross-refs narrativos (não alterar outro arquivo)
Fonte (paráfrase): Interferência do trio e canal onírico do antagonista.
Alteração no destino (Adição):

- Local: No final de “## Telepatia.../Sonhos Lúcidos...”, inserir “Ver também” com referências textuais às seções de GDD.Narrative-geral.md (sem editar aquele arquivo).

---

## 5) Decisões pendentes

- Fraqueza do Profeta das Sombras: manter [a definir] com duas opções candidatas no texto (contracanto do trio; ruído rítmico) até decisão narrativa.
- Posição exata de “Instituições e Controle”: capítulo próprio depois de História e Sociedade (sugerido) vs. apêndice.

---

## 6) Checklist de aplicação (quando autorizado)

1) Copiar frontend/docs/GDD/2-world-building/magia.md → frontend/docs/GDD/2-world-building/magia.v3.md.
2) Inserir seções novas e edições nas localizações listadas em “Alterações detalhadas”.
3) Atualizar Glossário com novos termos e revisar coerência de grafia.
4) Acrescentar “Ver também” em Telepatia/Sonhos Lúcidos apontando para GDD.Narrative-geral.md.

---

## 7) Observações finais

- Este plano não executa alterações; aguarda aprovação para criar magia.v3.md e aplicar as mudanças.
- O conteúdo importado do documento de referência foi parafraseado e destilado para caber no universo de Ekios, evitando nomes e contextos próprios daquele mundo.
- Ao aplicar, manter o tom técnico já usado em magia.md e preservar a estrutura existente, apenas inserindo capítulos adicionais e incrementos apontados.

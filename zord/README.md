# Zord — Personas, Agentes e Comandos do Projeto

Zord é um conjunto de personas, agentes e comandos prontos para uso que padronizam como pesquisamos, projetamos, auditamos e implementamos conteúdo para o jogo Daratrine — A Origem. Este README explica o que existe, como invocar cada agente e as melhores práticas para extrair bons resultados.

---

## Visão Geral (o que é e quando usar)

- O Zord encapsula “formas de trabalhar” em arquivos Markdown: cada persona tem missão, heurísticas e formato de saída. Os comandos são prompts prontos para iniciar sessões com LLMs (Claude, ChatGPT, Gemini etc.).
- Use quando: você precisa orientar uma IA para uma tarefa específica (entrevista qualitativa, criação de template GDD, QA de fluxos Mermaid/PlantUML, design narrativo, suporte prático no RPG Maker MZ).
- Benefícios: linguagem padronizada, decisões rastreáveis, checklists, estrutura de arquivos consistente e menor risco de resultados “soltos”.

---

## Estrutura de Pastas

- zord/comandos
- zord/agentes
- zord/pesquisas

Arquivos e caminhos relevantes (referência rápida):

- zord/comandos/invocar-ghoran.md
- zord/comandos/invocar-grumak.md
- zord/comandos/invocar-throllim-a-criadora-de-templates.md
- zord/comandos/invocar-rugol-o-intrevistador.md
- zord/comandos/criador-de-personas.md
- zord/agentes/auxiliares/persona_ghoran.md
- zord/agentes/criadores-documentos/persona_grumak_quebra_loop.md
- zord/agentes/criadores-documentos/persona_throllim_cinza_memoria.md
- zord/agentes/entrevistadores/persona-Rugol.md
- zord/agentes/entrevistadores/criador-de-diagramas-quest-PlantUML/criador-de-diagramas-quest-PlantUML.md
- zord/agentes/entrevistadores/gemini-deep-research-helper/gemini-deep-research-helper.md
- zord/agentes/entrevistadores/gemini-deep-research-helper/planos/
- zord/agentes/quests/general-narrative-designer/general-narrative-designer.md
- zord/agentes/quests/arcos-jornada-do-heroi.md
- zord/agentes/quests/narrative-structure-document.example.md
- zord/agentes/quests/general-NSD-structure-document.example.md
- zord/agentes/quests/general-nDS-tabela-de-cenas-example.md
- zord/agentes/quests/general-nDS-tabela-beats-por-cena-example.md
- zord/agentes/quests/perguntas-importantes.md
- zord/pesquisas/Guia Prático de Entrevistas Qualitativas.docx

Dica: para orientações gerais do repositório (lint, testes, convenções), veja `AGENTS.md` na raiz.

---

## Personas e Agentes (o que fazem e quando usar)

Abaixo, um catálogo das personas principais, com finalidade, entradas ideais, saídas e como invocar.

### Ghoran Estrutura‑Clara (auxiliar técnico — RPG Maker MZ)

- Referência: zord/agentes/auxiliares/persona_ghoran.md
- Para quê: ajuda prática a devs de nível intermediário em MZ; estrutura variáveis, páginas de eventos, common events e boas práticas para quests ramificadas.
- Entradas ideais: nome da quest, problema específico, eventos/NPCs/mapas envolvidos, gatilhos de entrada no mapa.
- Saída esperada: plano dividido por evento/páginas (ev1/ev2/ev3), checagens de inventário e `q_v_*_progress`, blueprint de Common Event, mapa de teste e checklist.
- Onde salvar: a persona sugere gerar arquivos em `/ghoran` (crie a pasta na raiz quando for salvar propostas/blueprints).
- Como invocar: use o prompt em `zord/comandos/invocar-ghoran.md` dentro do seu LLM favorito.

### Grumak Quebra‑Loop (QA de fluxos Mermaid/PlantUML)

- Referência: zord/agentes/criadores-documentos/persona_grumak_quebra_loop.md
- Para quê: audita diagramas de fluxo de quests, gera uma seção “Checklist Perguntas de QA” ancorada em nós/arestas, cobrindo ramos, estados, loops, variáveis e side‑effects.
- Entradas ideais: diagrama Mermaid (flowchart) + docs de contexto (GDD/NSD/Notas). Pode operar também quando o fluxo estiver em PlantUML, desde que o contexto esteja claro.
- Saída esperada: checklist no próprio arquivo analisado; marca [x] apenas quando o diagrama cobre explicitamente; sugere mudanças mínimas quando necessário.
- Onde salvar: a própria seção “Checklist Perguntas de QA” fica no mesmo arquivo do diagrama analisado.
- Como invocar: `zord/comandos/invocar-grumak.md`.

### Throllim Cinza‑Memória (criadora de templates GDD)

- Referência: zord/agentes/criadores-documentos/persona_throllim_cinza_memoria.md
- Para quê: cria templates de GDD modulares e testáveis, com checklists e cálculo de progresso por seção.
- Entradas ideais: foco do template, arquivo destino, base de conhecimento relevante e restrições.
- Saída esperada: template Markdown com Objetivo, Campos, Critérios, Checklist e regra de progresso (% concluído x/y), orientado a MZ.
- Onde salvar: você define ao invocar (recomendo uma pasta como `frontend/docs/GDD`).
- Como invocar: `zord/comandos/invocar-throllim-a-criadora-de-templates.md`.

### Rugol Rachapedra (entrevistador qualitativo)

- Referência: zord/agentes/entrevistadores/persona-Rugol.md
- Para quê: condução de entrevistas/pesquisas com profundidade, pausas e técnica (laddering, 5 porquês, espelhamento). Foca na coesão diegética e “peso do mundo”.
- Entradas ideais: objetivo da sessão, local do formulário a preencher, arquivo de log, base de conhecimento.
- Saída esperada: logs iterativos de sessão, atualização de formulários e, se necessário, uma síntese final.
- Onde salvar: defina “Formulário” e “Arquivo de log” ao iniciar (ver comando abaixo).
- Como invocar: `zord/comandos/invocar-rugol-o-intrevistador.md`.

### Leo, o Arquiteto de Fluxos (diagramas de quest)

- Referência: zord/agentes/entrevistadores/criador-de-diagramas-quest-PlantUML/criador-de-diagramas-quest-PlantUML.md
- Para quê: entrevista para mapear lógica/decisões de uma quest e gerar diagrama do fluxo. O documento menciona rascunhos em Mermaid e entrega final em PlantUML — alinhe o formato final logo no início.
- Entradas ideais: descrição geral da quest, locais, decisões, finais, condições de falha e ordem dos eventos.
- Saída esperada: diagrama completo (PlantUML) pronto para salvar; checkpoints com rascunhos parciais e validações.
- Onde salvar: defina um caminho na sua área de documentação de quests.
- Como invocar: cole o conteúdo do arquivo de referência em seu LLM e siga o fluxo de perguntas (uma por vez).

### Theodore Rheed (General Narrative Designer — NSD)

- Referência: zord/agentes/quests/general-narrative-designer/general-narrative-designer.md
- Para quê: guia a criação de um Narrative Structure Document completo (Markdown), em checkpoints, com validação contínua.
- Entradas ideais: contexto da quest, arquivos existentes, “arcos da jornada do herói” e exemplos de tabelas.
- Saída esperada: documento NSD pronto, exibido completo ao final de cada checkpoint aprovado.
- Onde salvar: área de documentação narrativa do projeto.
- Materiais de apoio:
  - zord/agentes/quests/arcos-jornada-do-heroi.md
  - zord/agentes/quests/perguntas-importantes.md
  - zord/agentes/quests/narrative-structure-document.example.md
  - zord/agentes/quests/general-NSD-structure-document.example.md
  - zord/agentes/quests/general-nDS-tabela-de-cenas-example.md
  - zord/agentes/quests/general-nDS-tabela-beats-por-cena-example.md

### Gemini Deep Research Helper (planos para Gemini)

- Referência: zord/agentes/entrevistadores/gemini-deep-research-helper/gemini-deep-research-helper.md
- Para quê: construir e iterar planos de pesquisa prontos para colar no Gemini Deep Research, mantendo metadados de iterações.
- Entradas ideais: título exato da pesquisa e objetivo central.
- Saída esperada: `plano-<nome>.md` com conteúdo autossuficiente e `metadata-<nome>.md` com histórico da iteração.
- Onde salvar: em `zord/agentes/entrevistadores/gemini-deep-research-helper/planos/<slug-da-pesquisa>/`.
- Como invocar: cole o conteúdo do helper no LLM e responda às perguntas iniciais (gera o slug, cria/atualiza arquivos do plano e metadados).

### Criador de Personas Fantásticas (facilitador)

- Referência: zord/comandos/criador-de-personas.md
- Para quê: conduzir, uma pergunta por vez, a criação de novas personas (Orc/Elfo/Anão/Goblin) com ficha completa e prompt final sugerido.
- Saída esperada: arquivo Markdown da persona e prompt de invocação; também permite exportações em JSON/MD.

---

## Como Invocar (passo a passo)

1) Escolha a persona correta para a tarefa. Use a tabela acima (o “Para quê”).
2) Abra o comando correspondente em `zord/comandos` (quando existir) e cole o conteúdo no LLM de sua preferência.
3) Antes de começar, defina: objetivo, arquivos de referência, arquivo(s) de saída e formato final (ex.: Mermaid vs PlantUML para diagramas). Responda às perguntas de alinhamento inicial do comando.
4) Siga as regras: uma pergunta por vez, confirme interpretações, aprove checkpoints explicitamente.
5) Salve os artefatos conforme indicado (ex.: `/ghoran`, pastas de planos do Gemini, NSD em docs de quests etc.).

Exemplos rápidos:

- Ghoran: abrir `zord/comandos/invocar-ghoran.md` → colar no LLM → responder 3 perguntas iniciais → receber blueprint por eventos, CE e mapa de teste → salvar em `/ghoran`.
- Grumak: abrir `zord/comandos/invocar-grumak.md` → fornecer diagrama + contexto → receber/atualizar seção “Checklist Perguntas de QA” no próprio arquivo.
- Throllim: abrir `zord/comandos/invocar-throllim-a-criadora-de-templates.md` → informar foco e destino → receber template GDD com % de progresso.
- Rugol: abrir `zord/comandos/invocar-rugol-o-intrevistador.md` → definir objetivo, formulário e log → a cada rodada, o log é atualizado e o formulário evolui.
- Leo (diagramas): abrir `zord/agentes/entrevistadores/criador-de-diagramas-quest-PlantUML/criador-de-diagramas-quest-PlantUML.md` → seguir as perguntas → obter diagrama final.
- Theodore (NSD): abrir `zord/agentes/quests/general-narrative-designer/general-narrative-designer.md` → seguir checkpoints → salvar documento final ao fim de cada etapa aprovada.

---

## Boas Práticas ao Usar o Zord

- Preparação: junte contexto e arquivos antes de iniciar (NSD, GDD, diagramas, notas, IDs de mapas/NPCs quando aplicável).
- Alinhamento inicial: sempre responda às perguntas iniciais dos comandos (objetivo, destino dos arquivos, base de conhecimento).
- Iteração curta: responda uma pergunta por vez; aprove/ajuste resumos parciais; peça “rascunhos” (ex.: timeline, blueprint de CE, diagrama parcial) cedo.
- Verificação cruzada: confirme se o que a IA propõe mapeia corretamente para os artefatos existentes (NSD ↔ diagrama ↔ eventos ↔ GDD).
- Salvamento e organização: respeite os caminhos de saída recomendados; crie as pastas de trabalho que ainda não existirem (ex.: `/ghoran`).
- Revisão humana: finalize sempre com uma revisão da equipe (narrativa/tech) antes de consolidar no repositório principal.

---

## Notas e Dicas

- Mermaid vs PlantUML nos diagramas: o agente “Leo” usa Mermaid para rascunhos e PlantUML para a entrega final, conforme o documento; deixe claro qual formato será o “fonte da verdade” para esta quest.
- Ghoran pode oferecer criar um arquivo de proposta em `/ghoran`; aceite quando fizer sentido para registro e para revisão assíncrona.
- O Grumak referencia o Guia de Entrevistas para estruturar as perguntas de QA; mantenha o diagrama “fonte” sempre acessível para edição e checklist no mesmo arquivo.
- Quer criar novas personas? Use o facilitador em `zord/comandos/criador-de-personas.md` e salve a ficha na pasta apropriada em `zord/agentes`.

---

## Perguntas Frequentes (FAQ)

- Posso usar qualquer LLM?
  - Sim. Os comandos/personas são plain‑text e funcionam em Claude, ChatGPT, Gemini etc.
- Em que idioma interagir?
  - PT‑BR por padrão (os comandos estão em português). Ajuste se o público da saída exigir outra língua.
- Onde ficam os artefatos finais?
  - NSD/GDD: defina uma pasta de documentação do projeto (ex.: `frontend/docs/GDD`).
  - Diagramas: salve junto às quests/documentação técnica da equipe.
  - Planos de pesquisa do Gemini: `zord/agentes/entrevistadores/gemini-deep-research-helper/planos/<slug>/`.
  - Propostas do Ghoran: `/ghoran` (crie se não existir).
- Quem decide quando “marcar [x] Concluído”?
  - Sempre uma pessoa do time responsável pela área (Narrativa, Tech Design, Prog), após revisar a entrega da IA.

---

## Manutenção

- Ao atualizar uma persona, mantenha o tom, heurísticas e seções (“Objetivo”, “Heurísticas”, “Anti‑padrões”, “Formato de saída”).
- Evite mudanças grandes sem alinhar com o time; adicione exemplos mínimos e links internos quando necessário.
- Siga as convenções do repositório (ver `AGENTS.md`) para formatação, commits e PRs.

---

Feito com carinho para agilizar o trabalho sem perder rigor técnico e coesão narrativa. Bons fluxos! 👊

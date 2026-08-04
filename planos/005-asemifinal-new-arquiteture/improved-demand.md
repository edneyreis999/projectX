# Demanda enriquecida — conclusão da `aSemifinal` na nova arquitetura Coreto

## Resumo

**[Fonte — demanda original]** Continuar e concluir a progressão da quest `aSemifinal` em todos os mapas e superfícies em que ela participa, direta ou indiretamente, e aplicar a arquitetura Coreto já aprovada a essas superfícies.

**[Decisão humana — envelope desta demanda]** O resultado deve preservar o arco existente de ponta a ponta, seus oito objetivos, conteúdo e continuidade, ao mesmo tempo que elimina autoridades paralelas de progressão e reconcilia mapas duplicados, referências inválidas e integrações legadas. Esta demanda define o que deve ser alcançado e validado; não contém análise técnica, plano de ação nem implementação.

## Convenção de proveniência

**[Decisão humana — contrato de enriquecimento]** Afirmações acrescentadas à intenção original são identificadas neste documento como `Fonte`, `Inferência`, `Premissa reversível` ou `Decisão humana`. `Fonte` registra fato observado e seu locator; `Inferência` explicita uma consequência limitada desses fatos; `Premissa reversível` pode ser substituída após validação; `Decisão humana` registra uma orientação autoritativa recebida para esta demanda.

## Intenção original

> Preciso escrever uma demanda para o próximo plano. Tenho que continuar e concluir o avanço da quest aSemifinal nos mapas em que ela está presente, preciso também aplicar a nova arquitetura da Coreto nesses mapas.

| ID | Intenção atômica preservada | Origem |
| --- | --- | --- |
| D01 | Continuar e concluir o avanço/progressão da quest `aSemifinal` em todos os mapas e superfícies onde ela está presente direta ou indiretamente. | Demanda original, esclarecida no envelope humano |
| D02 | Aplicar a nova arquitetura Coreto nesses mapas e superfícies. | Demanda original, esclarecida no envelope humano |

## Objetivo e resultado esperado

**[Decisão humana — D01/D02]** Entregar uma evolução completa e coerente da `aSemifinal`, desde seu estado inicial até o estado terminal, cobrindo todas as rotas alcançáveis e todos os sistemas que leem, escrevem, projetam ou condicionam sua progressão.

**[Decisão humana — contrato arquitetural aprovado]** Ao final, `Coreto_QuestCore` deve ser a única autoridade canônica do estado da quest; o PKD deve permanecer como backend/projeção visual; `Coreto_QuestVN` deve apenas rotear sessões EX/VN; e `Coreto_Cutscene` deve controlar somente a encenação física. A separação entre essas responsabilidades deve ser observável e verificável.

**[Inferência — fatos C01–C06]** O resultado não se limita aos mapas que contêm a string `aSemifinal`: ele exige reconciliar pointers, transfers, conditions, readers, writers, Common Events, registros de quest e chamadas de plugin que possam afetar a jornada mesmo sem citar a chave nominalmente.

## Contexto observado

| ID | Observação | Proveniência |
| --- | --- | --- |
| C01 | O PKD ativo contém uma única quest visível `aSemifinal` com oito tarefas, nesta ordem: pegar a Funda; correr ao estádio; falar com Dragobur; encontrar Elmo; equipar Elmo; falar novamente com Dragobur; entrar em campo; voltar para casa com os Guardas. Existem pointers para os Maps 045, 006, 007, 008, 010 e 014. Um pointer referencia `Map010`/evento 9, embora `Map010` possua apenas oito eventos; a referência deve ser tratada como órfã/stale até validação, e não como destino válido presumido. | **Fonte:** [`frontend/js/plugins.js`](../../frontend/js/plugins.js), configuração ativa do PKD e conferência estrutural de `Map010` |
| C02 | O inventário estruturado atual de `V29` (`v_qSemifinal_progress`) encontrou readers/writers em `Map004`, `Map005`, `Map006`, `Map007`, `Map009`, `Map010`, `Map014`, `Map022`, `Map044` e `Map045`; os valores observados percorrem 1→8. O Common Event 1, `Elmo equipado`, é paralelo sob S4, conclui uma task e grava `V29=4`. A string `aSemifinal` aparece diretamente em `CommonEvents.json`, `CoretoQuests.json` e nos Maps 006, 007, 010, 014, 044 e 045. | **Fonte:** inventário estruturado fornecido; [`frontend/data/CommonEvents.json`](../../frontend/data/CommonEvents.json), [`frontend/data/CoretoQuests.json`](../../frontend/data/CoretoQuests.json) e mapas citados nas referências |
| C03 | Há pares ou rotas duplicadas candidatas: `Map004` (`Coreto Release`), `Map005` (`Coreto`) e `Map022` (`EX_Coreto`); `Map006` (`Casa da Família Forjaprata`) e `Map045` (`EX_Casa da Família Forjaprata`); `Map007` (`Distrito Residencial Nobre`) e `Map044` (`EX_Distrito Residencial Nobre`). Ainda não há evidência suficiente para escolher silenciosamente uma cópia ativa. | **Fonte:** nomes e inventário de mapas fornecidos; arquivos de mapa correspondentes nas referências |
| C04 | `CoretoQuests.json` contém `noite-da-historia` em V106 e `tutorial-funda-forjaprata` em V111; o segundo projeta somente o objetivo 1 da `aSemifinal` do PKD. Ainda não existe uma máquina canônica completa para todo o arco. | **Fonte:** [`frontend/data/CoretoQuests.json`](../../frontend/data/CoretoQuests.json) |
| C05 | `Map022` e `Map045` já usam `<CoretoMapType:EX>` e adotam parcialmente QuestCore/QuestVN/Cutscene. `Map044` tem nome EX, mas note vazio; `Map009`, `Map010` e `Map014` também têm note vazio. `Map045` ainda grava `V29=2` e chama SQSM diretamente; mapas e Common Events posteriores ainda usam V29 e SQSM de forma direta. | **Fonte:** [`frontend/data/Map022.json`](../../frontend/data/Map022.json), [`frontend/data/Map045.json`](../../frontend/data/Map045.json), [`frontend/data/Map044.json`](../../frontend/data/Map044.json), [`frontend/data/Map009.json`](../../frontend/data/Map009.json), [`frontend/data/Map010.json`](../../frontend/data/Map010.json), [`frontend/data/Map014.json`](../../frontend/data/Map014.json) e [`frontend/data/CommonEvents.json`](../../frontend/data/CommonEvents.json) |
| C06 | `Coreto_QuestCore`, `Coreto_QuestVN` e `Coreto_Cutscene` estão ativos e ordenados depois do PKD. QuestCore expõe `QuestTransition`, `QuestSync`, `AssertQuestState`, `InspectQuestState` e `FlowCoordinator`; QuestVN exige tags EX/VN e expõe `Enter`, `Assert` e `Finish`; Cutscene exige EX e pares `Begin`/`Finish`. | **Fonte:** [`frontend/js/plugins/Coreto_QuestCore.js`](../../frontend/js/plugins/Coreto_QuestCore.js), [`frontend/js/plugins/Coreto_QuestVN.js`](../../frontend/js/plugins/Coreto_QuestVN.js), [`frontend/js/plugins/Coreto_Cutscene.js`](../../frontend/js/plugins/Coreto_Cutscene.js) e [`frontend/js/plugins.js`](../../frontend/js/plugins.js) |
| C07 | O contrato arquitetural já aprovado define QuestCore como autoridade canônica com projeção no PKD, QuestVN como roteador de sessão EX/VN sem decisão de estado e Cutscene como controlador da encenação física. Ele também proíbe transfer direto EX↔VN, writers diretos de estágio e efeitos duplicados, mantém o PKD como backend, não introduz `VisuMZ_2_QuestSystem` e adota suporte atual `New Game only`, salvo nova decisão humana. | **Fonte:** [`planos/001-cena-coreto-nova-arquitetura/demanda-improved.md`](../001-cena-coreto-nova-arquitetura/demanda-improved.md) |
| C08 | Em `frontend/data`, a política do projeto manda preferir notetags VisuStella ou Coreto e consultar `docs/rpg-maker-for-ia` antes de criar solução customizada. | **Fonte:** [`AGENTS.md`](../../AGENTS.md) e [`docs/rpg-maker-for-ia/`](../../docs/rpg-maker-for-ia/) |
| C09 | Alterações em dados do RPG Maker MZ exigem parsing estruturado, validação dos comandos contra engine/plugins, diff restrito e Playtest humano para comportamento perceptível. | **Fonte:** procedimento `rpg-maker-mz-data-json`, fornecido no contexto desta demanda |

## Escopo

### Incluído

**[Decisão humana — D01/D02]** A progressão completa da `aSemifinal`, incluindo início, os oito objetivos na ordem existente, conclusão no retorno final para casa com os Guardas e preservação do encaminhamento já existente para o arco seguinte.

**[Decisão humana — baseline mínimo]** O inventário deve considerar, no mínimo, `Map004`, `Map005`, `Map006`, `Map007`, `Map008`, `Map009`, `Map010`, `Map014`, `Map022`, `Map044`, `Map045`, `CommonEvents.json`, `CoretoQuests.json`, a configuração do PKD em `plugins.js` e os callers relevantes dos plugins Coreto. A lista é baseline de investigação, não uma decisão antecipada de quais arquivos serão alterados.

**[Inferência — C01/C02]** A busca deve alcançar toda ocorrência direta ou indireta descoberta globalmente: chave da quest, V29 e seus valores, IDs de quest/tarefa do PKD, SQSM, plugin commands Coreto, switches, condições, transfers, pointers, eventos comuns, itens/equipamentos, NPCs e efeitos que participem do fluxo.

**[Decisão humana — contrato arquitetural aprovado]** A migração das superfícies realmente ativas para as responsabilidades separadas de QuestCore, QuestVN e Cutscene, usando tags e lifecycle adequados à natureza de cada beat.

### Fora de escopo

**[Inferência — proporcionalidade à intenção original]** Não faz parte desta demanda criar novo conteúdo narrativo depois da conclusão já existente da `aSemifinal`; redesenhar roteiro, combate, economia ou outros arcos; substituir o PKD por `VisuMZ_2_QuestSystem`; prometer compatibilidade com saves antigos sem decisão humana; ou copiar IDs, entryKeys, mapas VN ou comandos de referência externa sem validação local.

**[Inferência — preservação de escopo]** Corrigir problemas fora das superfícies comprovadamente relacionadas à `aSemifinal` não faz parte desta demanda. Achados adjacentes devem ser registrados separadamente, sem ampliar silenciosamente os targets.

## Mandato ao próximo executor

**[Decisão humana — envelope desta demanda]** O próximo executor, em workflow escolhido separadamente, deve transformar esta demanda em evidência técnica e plano executável sem iniciar implementação durante a leitura deste documento. Antes de selecionar targets, deve completar o inventário global, reconstruir o grafo real de progressão e classificar cada superfície ou cópia como `ativo`, `legado` ou `órfão` com evidência de reachability.

**[Decisão humana — gaps G02–G06]** Cabe ao próximo executor decidir, com evidência e nos momentos indicados em “Itens a validar depois”, a classificação das cópias, a questKey canônica, a política de integração do onboarding da Funda, o mapeamento de V29, a distribuição de beats entre EX/VN/Cutscene e qualquer mudança de compatibilidade de saves. Nenhuma dessas decisões pode ser inventada nesta demanda.

**[Decisão humana — gates]** A futura execução deve separar validators determinísticos dos gates humanos. Parsing, integridade referencial, matriz de equivalência e inspeção estática não substituem o Playtest humano; o Playtest não deve ser declarado aprovado sem registro humano explícito.

## Requisitos

### R01 — Inventário global e matriz de equivalência

**[Decisão humana — D01]** Produzir, antes da escolha de targets, um inventário global de todas as ocorrências e callers da progressão. Para cada ocorrência, registrar ao menos: arquivo; mapa/evento/página/comando ou locator equivalente; chave/ID/variável/switch envolvido; condição de entrada; leitura; escrita; efeito; transfer de entrada/saída; pointer; relação com outro mapa ou Common Event; reachability; classificação `ativo | legado | órfão`; evidência da classificação; comportamento atual; comportamento pretendido; e decisão de preservação, migração ou neutralização.

**[Inferência — C01–C05]** A matriz deve reconciliar tanto referências nominais quanto dependências sem a string `aSemifinal`, impedindo que um writer, gate ou rota indireta sobreviva fora do modelo canônico por não ter sido encontrado em busca textual simples.

### R02 — Reconciliação de mapas e rotas duplicadas

**[Decisão humana — G02]** Mapear transfers e reachability entre as variantes dos Maps 004/005/022, 006/045 e 007/044, além de qualquer outra duplicata descoberta. Nenhuma variante pode ser marcada ativa, removida ou ignorada apenas pelo nome `EX`, por numeração ou por aparente modernidade.

**[Decisão humana — preservação]** Para cada variante, documentar por que ela é alcançável, legada ou órfã e como seus pointers, readers, writers, conditions e efeitos serão preservados, migrados ou neutralizados sem quebrar rotas válidas.

### R03 — Máquina canônica completa da `aSemifinal`

**[Decisão humana — D01/D02]** Definir uma máquina canônica completa do estado inicial ao terminal que represente, sem reordenação ou perda, os oito objetivos atuais: (1) pegar a Funda; (2) correr ao estádio; (3) falar com Dragobur; (4) encontrar Elmo; (5) equipar Elmo; (6) falar novamente com Dragobur; (7) entrar em campo; (8) voltar para casa com os Guardas.

**[Decisão humana — G03]** Integrar o onboarding `tutorial-funda-forjaprata` ao arco completo sem criar uma segunda autoridade. A questKey final e a política de transição entre o onboarding já existente e a máquina completa devem ser decididas após inventário de callers e contrato atual.

**[Inferência — C02/C04]** O desenho precisa explicitar os gates e as transições equivalentes aos valores 1→8 hoje observados, inclusive estado inicial, estados intermediários, conclusão e continuidade posterior, sem presumir que os números atuais devam permanecer como representação canônica.

### R04 — Autoridade única e projeção no PKD

**[Decisão humana — contrato aprovado]** QuestCore deve ser o único writer/authority da progressão canônica. O PKD deve permanecer somente como backend e projeção da quest/tarefas, sem decidir o estado.

**[Decisão humana — migração]** Nas superfícies migradas, remover ou neutralizar gravações diretas de estágio em V29 e chamadas diretas de SQSM responsáveis pela progressão. Leituras e gates legados só podem permanecer quando estiverem explicitamente justificados pelo registry/mapeamento aprovado e não constituírem autoridade paralela. A projeção interna encapsulada pela autoridade QuestCore não conta como caller direto de mapa/Common Event.

**[Inferência — risco de dupla autoridade]** Toda transição canônica deve ter um único ponto responsável por estado e por disparar sua projeção, de forma que reentrada, repetição de diálogo ou execução paralela não avancem a quest duas vezes.

### R05 — Semântica de transições e efeitos

**[Decisão humana — critérios exactly-once]** Cada transição deve declarar origem, destino, condição, comando canônico, projeção esperada, efeitos associados, regra de reentrada e evidência de conclusão. Efeitos de uma mesma transição — task completion, item/equipamento, switch, animação, diálogo, transfer ou continuidade — devem ocorrer exatamente uma vez quando assim exigido pelo comportamento existente.

**[Inferência — C02/C05]** O Common Event paralelo `Elmo equipado` e qualquer trigger repetível exigem proteção explícita contra corrida, duplicação, salto de estado, conclusão antecipada e softlock.

### R06 — Separação EX/VN/Cutscene

**[Decisão humana — contrato aprovado]** Usar QuestVN somente para sessões narrativas EX/VN e seus pares `Enter`/`Assert`/`Finish`; usar Cutscene somente para encenação física em EX e seus pares `Begin`/`Finish`; manter a decisão de estado no QuestCore. Não realizar transfer direto EX↔VN.

**[Decisão humana — G05]** Classificar cada beat por sua necessidade narrativa e física antes de definir tags, entryKeys ou mapas. Não inventar VN onde não houver narrativa apropriada nem inventar IDs/entryKeys sem evidência local.

**[Inferência — C05/C06]** Todo mapa que utilizar esses fluxos deve possuir tag `CoretoMapType` compatível e lifecycle pareado, inclusive nos caminhos de sucesso, repetição, reentrada e saída antecipada aplicáveis.

### R07 — Preservação funcional e narrativa

**[Decisão humana — D01]** Preservar objetivos, ordem, textos e beats narrativos existentes; recompensas; obtenção e equipamento da Funda e do Elmo; NPCs e condições; transfers; switches; feedback visual; e a continuidade do arco até a conclusão e o próximo conteúdo já existente.

**[Inferência — limite do escopo]** Ajustes necessários à arquitetura podem mudar o mecanismo de progressão, mas não o significado do beat para o jogador sem decisão humana específica.

### R08 — Pointers, eventos e Common Events

**[Decisão humana — C01]** Reconciliar todos os pointers do PKD com mapas e eventos realmente existentes. O pointer atual para `Map010`/evento 9 deve ser corrigido, substituído ou removido somente depois de identificar o destino semântico correto; não deve ser aceito como válido nem receber um evento fictício apenas para satisfazer o ID.

**[Decisão humana — C02]** Reconciliar o Common Event 1 paralelo com o novo lifecycle, preservando o comportamento correto de equipar o Elmo, sem polling que permita avanço repetido, efeitos duplicados ou execução fora do estado esperado.

### R09 — Nomenclatura e integridade textual

**[Decisão humana — escopo comprovado]** Usar nomes semânticos para quest, estados, transições, entryKeys e efeitos. Corrigir mojibake somente em texto comprovadamente pertencente às superfícies alteradas e somente quando o conteúdo correto puder ser determinado por fonte confiável; não fazer limpeza textual ampla.

### R10 — Política de dados e soluções existentes

**[Decisão humana — política do projeto]** Em alterações futuras de `frontend/data`, preferir notetags VisuStella ou Coreto e consultar `docs/rpg-maker-for-ia` antes de propor solução customizada. IDs e formatos devem ser confirmados contra dados locais, engine e plugins ativos.

### R11 — Mapeamento de legado e saves

**[Decisão humana — G04]** Decidir se V29 e os valores 1..8 serão mantidos como projeção/compatibilidade ou substituídos por tabela esparsa ou variável dedicada somente após inventário global e matriz before/after. A decisão não pode deixar writers diretos concorrentes.

**[Premissa reversível P02 — contrato aprovado]** Adotar `New Game only` como baseline desta demanda. Save/load deve ser validado com saves criados na versão nova; suporte a saves anteriores só entra mediante decisão humana específica e definição de migração.

## Restrições

- **[Decisão humana — contrato aprovado]** Não introduzir `VisuMZ_2_QuestSystem` nem trocar o backend PKD.
- **[Decisão humana — contrato aprovado]** Não permitir autoridade de estado em QuestVN, Cutscene, mapa, Common Event ou chamada SQSM direta.
- **[Decisão humana — contrato aprovado]** Não permitir transfer direto EX↔VN, lifecycle sem fechamento ou efeitos duplicados entre camadas.
- **[Decisão humana — preservação]** Não decidir mapas ativos/legados/órfãos, questKey, IDs, entryKeys ou política de V29 por convenção, nome ou suposição.
- **[Decisão humana — escopo]** Não criar conteúdo narrativo posterior, redesenhar sistemas adjacentes ou prometer suporte a saves antigos sem decisão humana.
- **[Decisão humana — validação]** Não alegar runtime, leitura, narrativa, pacing ou experiência aprovados sem Playtest e aceite humano explícito.
- **[Decisão humana — integridade de dados]** Não editar JSON como texto cego; usar parsing estruturado, validar comandos contra engine/plugins e manter diff restrito aos targets futuramente aprovados.

## Critérios de aceite

| ID | Critério verificável | Evidência mínima |
| --- | --- | --- |
| CA01 | 100% das ocorrências diretas e indiretas descobertas para `aSemifinal` estão inventariadas e classificadas como `ativo`, `legado` ou `órfão`. | Matriz global com locator, reachability, readers/writers, conditions, transfers, pointers, evidência e decisão por ocorrência. **[Decisão humana — D01]** |
| CA02 | Existe um grafo completo e sem lacunas do estado inicial ao terminal, incluindo caminhos de repetição e reentrada. | Diagrama/tabela de estados e transições com condições, efeitos, projeções e saídas. **[Decisão humana — D01]** |
| CA03 | Os oito objetivos do PKD são preservados em conteúdo e ordem. | Matriz 1:1 entre tarefas atuais, estado/transição canônica e projeção no PKD. **[Decisão humana — D01]** |
| CA04 | Existe exatamente uma autoridade de progressão: QuestCore. | Inventário de writers e asserts demonstrando ausência de autoridade concorrente. **[Decisão humana — contrato aprovado]** |
| CA05 | Há zero writer direto de estágio e zero chamada SQSM direta para a progressão migrada fora da projeção encapsulada por QuestCore. | Busca global pós-migração e revisão dos callers, com qualquer leitura/gate legado explicitamente justificado. **[Decisão humana — D02]** |
| CA06 | Todos os pointers apontam para mapas e eventos existentes e semanticamente corretos; nenhum pointer órfão permanece. | Validador de integridade referencial e conferência específica do caso `Map010`/evento 9. **[Decisão humana — C01]** |
| CA07 | Tags e flows Coreto estão corretos para cada superfície: EX/VN conforme classificação narrativa; Enter/Assert/Finish e Begin/Finish pareados quando aplicáveis; sem transfer direto EX↔VN. | Inspeção estática, validação no editor e matriz de lifecycle por rota. **[Decisão humana — D02]** |
| CA08 | Transições e efeitos protegidos por semântica exactly-once não duplicam nem pulam progressão sob repetição, reentrada ou execução paralela. | Asserts/logs previstos e Playtest dos caminhos repetíveis, inclusive Common Event `Elmo equipado`. **[Decisão humana — requisitos de runtime]** |
| CA09 | A `aSemifinal` é concluída exatamente uma vez ao retornar para casa com os Guardas. | Estado terminal e projeção final observados uma vez no Playtest ponta a ponta. **[Decisão humana — D01]** |
| CA10 | A continuidade posterior já existente permanece alcançável sem novo conteúdo narrativo criado por esta demanda. | Comparação before/after das condições e transfers de saída, mais Playtest humano. **[Decisão humana — preservação]** |
| CA11 | Duplicatas, rotas candidatas e Common Events foram reconciliados sem softlock ou lifecycle incorreto. | Matriz de equivalência final, justificativas `ativo/legado/órfão` e testes de cada rota alcançável. **[Decisão humana — C02/C03]** |
| CA12 | Todo JSON alterado parseia; comandos, IDs, tags e referências são válidos para a engine e plugins ativos; o diff está restrito ao escopo aprovado. | Relatórios dos validators estáticos, abertura no editor e revisão de diff. **[Fonte/Decisão humana — procedimento MZ]** |
| CA13 | O Playtest humano `New Game` cobre a quest de ponta a ponta, repetição, reentrada e save/load criado na versão nova, e possui resultado registrado. | Registro humano com cenário, passos, resultado, evidência e regressões encontradas; não pode ser substituído por inspeção estática. **[Decisão humana — gate de runtime]** |

## Validators

### Determinísticos e estáticos

- **[Decisão humana — R01/CA01]** Busca global estruturada e inventário de chave `aSemifinal`, V29, valores/conditions relacionados, SQSM, task IDs/pointers, plugin commands Coreto, switches, transfers e callers; revisão manual das ocorrências que não puderem ser inferidas automaticamente.
- **[Decisão humana — CA02/CA03]** Validação da máquina de estados e matriz 1:1 dos oito objetivos, incluindo estado inicial, terminal, guards de repetição e continuidade.
- **[Decisão humana — CA04/CA05]** Contagem de authorities/writers: exatamente uma autoridade canônica e zero writer direto/SQSM direto nas superfícies migradas, ressalvada somente a projeção encapsulada por QuestCore.
- **[Decisão humana — CA06]** Integridade referencial de todo pointer, map ID, event ID, Common Event, switch, variável, item/equipamento, quest/task ID e entryKey aplicável.
- **[Decisão humana — CA07]** Validação de tags `CoretoMapType`, comandos suportados e pares de lifecycle em todas as saídas relevantes.
- **[Fonte/Decisão humana — procedimento MZ]** Parse estruturado de cada JSON modificado, conferência dos códigos/parâmetros de comandos contra engine/plugins e diff restrito.

### Editor e gate humano

- **[Decisão humana — procedimento MZ]** Abrir e inspecionar os dados alterados no RPG Maker MZ para detectar estrutura inválida, referências quebradas ou comandos não reconhecidos.
- **[Decisão humana — gate runtime]** Executar Playtest humano em `New Game` do início ao terminal da `aSemifinal`, cobrindo rota normal, repetição de interações, reentrada em mapas/cenas, Common Event paralelo, conclusão final, continuidade posterior e save/load gerado na versão nova.
- **[Decisão humana — gate runtime]** Registrar explicitamente sucesso ou falha por cenário. Até existir esse registro, comportamento perceptível, narrativa, pacing, transições e runtime permanecem `pendentes de validação humana`.

## Premissas reversíveis

| ID | Premissa | Motivo e impacto | Como reverter | Validator |
| --- | --- | --- | --- | --- |
| P01 | A lista conhecida de mapas e superfícies é baseline mínimo, não universo fechado. | **[Premissa reversível — G01]** Permite preparar a investigação sem omitir descobertas posteriores. | Acrescentar à matriz qualquer ocorrência encontrada globalmente antes de selecionar targets. | Busca global e fechamento de 100% das ocorrências. |
| P02 | O baseline de compatibilidade é `New Game only`. | **[Premissa reversível — C07/G06]** Evita prometer migração de saves sem contrato; não impede save/load criado na versão nova. | Decisão humana explícita sobre saves antigos, acompanhada de estratégia e critérios de migração. | Gate G06 antes de qualquer promessa de compatibilidade legada. |
| P03 | Nenhum mapa duplicado é considerado ativo apenas por nome, ID ou tag existente. | **[Premissa reversível — C03/G02]** Evita migrar a cópia errada. | Substituir pela classificação comprovada no mapa de reachability. | Transfers, pontos de entrada e Playtest das rotas. |
| P04 | Não será criado novo mapa ou trecho VN sem beat narrativo comprovado. | **[Premissa reversível — G05]** Evita usar VN como convenção arquitetural vazia. | Aprovação da matriz de beats e dependências narrativas/físicas. | Revisão técnica+narrativa antes de definir targets. |

## Itens a validar depois

| ID | Categoria | Pergunta ou lacuna | Fonte/evidência atual | Impacto | Resolução, momento e owner | Efeito na saída | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| G01 | `answer_from_sources` | Quais superfícies são conhecidas direta ou indiretamente? | **[Fonte:]** C01–C06 e baseline de escopo. | Define o ponto de partida da descoberta. | Resolvido pelas fontes atuais; ainda exige busca global pelo próximo executor antes do plano. Owner: análise técnica. Evidência futura: inventário fechado. | A lista conhecida é baseline mínimo, não limite. | `resolved-for-demand` |
| G02 | `validate_later` | Quais mapas/cópias são ativos, legados ou órfãos? | **[Fonte:]** C03 mostra duplicatas sem reachability conclusiva. | Muda targets e rotas de teste. | Validar antes de selecionar targets. Owner: análise técnica. Evidência: grafo de transfers, reachability, pointers, readers e writers. | Nenhuma cópia é escolhida nesta demanda. | `open-nonblocking` |
| G03 | `validate_later` | Qual é a questKey canônica e como `tutorial-funda-forjaprata` integra a máquina completa? | **[Fonte:]** C04 mostra onboarding parcial e ausência da máquina completa. | Afeta registry, callers e prevenção de dupla autoridade. | Validar antes de escrever registry. Owner: análise técnica/quest. Evidência: contrato atual, callers e política de migração. | Exige integração, mas não inventa chave. | `open-nonblocking` |
| G04 | `validate_later` | V29/valores 1..8 permanecem como projeção/compatibilidade ou migram para tabela esparsa/variável dedicada? | **[Fonte:]** C02 mostra uso amplo de V29. | Afeta mapping, gates e compatibilidade. | Validar antes de alterar registry/mapas. Owner: análise técnica. Evidência: inventário global e matriz before/after. | A demanda exige autoridade única independentemente da representação escolhida. | `open-nonblocking` |
| G05 | `validate_later` | Quais beats exigem VN e quais permanecem EX/Cutscene? | **[Fonte:]** C05/C06 mostram adoção parcial e tags incompletas. | Afeta mapas, entryKeys, lifecycle e targets. | Validar antes do planejamento de targets. Owner: análise técnica+narrativa. Evidência: matriz de beats e dependências físicas. | Nenhum VN, ID ou entryKey é inventado. | `open-nonblocking` |
| G06 | `validate_later` | Haverá suporte a saves legados? | **[Fonte:]** C07 define baseline `New Game only`. | Pode ampliar escopo, risco e critérios de aceite. | Manter baseline até decisão humana antes de prometer suporte. Owner: humano/produto com análise técnica. Evidência: decisão registrada e estratégia de migração. | Save/load da versão nova continua obrigatório; saves antigos ficam fora do baseline. | `open-nonblocking` |

**[Decisão humana — classificação de lacunas]** Não há `must_ask_now` para enriquecer esta demanda; os itens abertos têm owner, momento e evidência futura definidos e não autorizam decisões silenciosas.

## Riscos e mitigação esperada

| Risco | Consequência | Mitigação exigida | Proveniência |
| --- | --- | --- | --- |
| Migrar a cópia errada de um mapa duplicado | Rota ativa permanece legada ou fica inacessível. | Fechar reachability e transfers antes dos targets; testar toda rota ativa. | **[Inferência — C03/G02]** |
| Pointer stale para evento inexistente | Objetivo sem navegação válida ou referência enganosa. | Validar semântica do destino e integridade referencial; não criar evento fictício para preencher ID. | **[Inferência — C01]** |
| QuestCore, V29 e SQSM coexistirem como autoridades | Avanço duplicado, divergência PKD/Coreto ou conclusão fora de ordem. | Inventário de writers, autoridade única e zero caller direto nas superfícies migradas. | **[Inferência — C02/C04/C05]** |
| Common Event paralelo disparar repetidamente | Salto de estado, efeito duplicado ou softlock. | Guardas de estado, exactly-once e Playtest de repetição/reentrada. | **[Inferência — C02]** |
| Tags/lifecycle incompatíveis | Sessão ou cutscene não fecha, deixando controle/estado inconsistente. | Matriz EX/VN/Cutscene, validação de pares e testes de todas as saídas. | **[Inferência — C05/C06]** |
| Migração alterar conteúdo perceptível | Ruptura narrativa, perda de recompensa, NPC, transfer ou continuidade. | Matriz before/after e aceite humano ponta a ponta. | **[Inferência — requisito de preservação]** |
| Escopo de save legado ser assumido | Custo oculto e falhas em estados antigos. | Baseline reversível `New Game only`; decisão humana antes de ampliar. | **[Inferência — C07/G06]** |
| Correção textual ampla ou ID inventado | Regressões fora da quest e perda de rastreabilidade. | Mojibake somente no escopo comprovado; IDs confirmados localmente; diff restrito. | **[Inferência — política do projeto]** |

## Referências e proveniência

| Referência relativa | Uso nesta demanda | Classificação |
| --- | --- | --- |
| [`../../frontend/js/plugins.js`](../../frontend/js/plugins.js) | Configuração ativa do PKD, ordem dos plugins e definição visível da `aSemifinal`. | `source` |
| [`../../frontend/data/CoretoQuests.json`](../../frontend/data/CoretoQuests.json) | Registry atual, `noite-da-historia` e onboarding parcial `tutorial-funda-forjaprata`. | `source` |
| [`../../frontend/data/CommonEvents.json`](../../frontend/data/CommonEvents.json) | Common Event paralelo `Elmo equipado`, V29 e SQSM. | `source` |
| [`../../frontend/data/Map004.json`](../../frontend/data/Map004.json), [`Map005`](../../frontend/data/Map005.json), [`Map006`](../../frontend/data/Map006.json), [`Map007`](../../frontend/data/Map007.json), [`Map008`](../../frontend/data/Map008.json), [`Map009`](../../frontend/data/Map009.json), [`Map010`](../../frontend/data/Map010.json), [`Map014`](../../frontend/data/Map014.json), [`Map022`](../../frontend/data/Map022.json), [`Map044`](../../frontend/data/Map044.json), [`Map045`](../../frontend/data/Map045.json) | Baseline mínimo de mapas, pointers, readers/writers, transfers, tags e rotas candidatas. | `source` |
| [`../../frontend/js/plugins/Coreto_QuestCore.js`](../../frontend/js/plugins/Coreto_QuestCore.js) | Contrato e comandos disponíveis para autoridade/transição/sync/assert/inspect. | `source` |
| [`../../frontend/js/plugins/Coreto_QuestVN.js`](../../frontend/js/plugins/Coreto_QuestVN.js) | Contrato de sessão EX/VN e lifecycle. | `source` |
| [`../../frontend/js/plugins/Coreto_Cutscene.js`](../../frontend/js/plugins/Coreto_Cutscene.js) | Contrato de encenação física em EX e lifecycle. | `source` |
| [`../001-cena-coreto-nova-arquitetura/demanda-improved.md`](../001-cena-coreto-nova-arquitetura/demanda-improved.md) | Contrato arquitetural aprovado, limites de autoridade e baseline de saves. | `source` |
| [`../../AGENTS.md`](../../AGENTS.md) | Política local para alterações em `frontend/data`. | `source` |
| [`../../docs/rpg-maker-for-ia/`](../../docs/rpg-maker-for-ia/) | Consulta obrigatória de soluções existentes antes de proposta customizada. | `source` |

**[Fonte — contexto fornecido]** O inventário estruturado de V29 e das ocorrências nominais foi fornecido como evidência de preparação desta demanda; o próximo executor deve reproduzir/atualizar a busca global antes de fixar targets, pois a demanda não transforma esse snapshot em garantia de completude futura.

## Few-shots

**[Decisão humana — gate de few-shot]** Omitidos. Não foram fornecidos exemplos explicitamente aprovados para este propósito, e nenhuma fonte indicada foi qualificada como exemplo estruturalmente equivalente com proveniência suficiente. Inventar exemplos reduziria a rastreabilidade.

## Matriz de cobertura da intenção original

| Original ID | Resumo fiel | Destinos nesta demanda | Status | Evidence locator |
| --- | --- | --- | --- | --- |
| D01 | Continuar e concluir a progressão da `aSemifinal` em todas as superfícies diretas e indiretas. | Objetivo; Escopo incluído; R01–R05, R07–R09 e R11; CA01–CA06 e CA08–CA13; Validators. | `preserved` | C01–C05; demanda original; baseline mínimo e inventário estruturado fornecido |
| D02 | Aplicar a nova arquitetura Coreto nessas superfícies. | Objetivo; R03–R06, R08, R10–R11; Restrições; CA04–CA08 e CA11–CA13; Validators. | `preserved` | C04–C09; contrato arquitetural aprovado em `planos/001-cena-coreto-nova-arquitetura/demanda-improved.md` |

**[Decisão humana — resultado esperado]** A demanda estará cumprida somente quando ambos os itens D01 e D02 forem satisfeitos em conjunto: a quest concluir corretamente de ponta a ponta e sua progressão operar sob a arquitetura Coreto aprovada, com evidências estáticas e gate humano registrados.
## Decisão posterior — hierarquia dos mapas EX

Todos os mapas da rota EX da `aSemifinal` devem ser filhos diretos de
`Exploration` no editor RPG Maker MZ (`Map016`, portanto `parentId: 16`). Esta
decisão inclui `Map022`, `Map044`, `Map045`, `Map050`, `Map051`, `Map058` e
`Map059`; não cria mapas, não altera seus IDs, eventos, transfers ou nomes.

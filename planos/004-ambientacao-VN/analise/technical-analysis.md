---
title: "Ambientação da VN do mapa 046"
type: loki-technical-analysis
doc_id: "analysis-ambientacao-vn-map046-v1"
version: "1.0.3"
status: approved-for-asset-intake
created: "2026-07-28"
last_updated: "2026-07-28"
scope: "Análise narrativa, apresentação audiovisual, manifesto aprovado para asset intake, fronteira de implementação e contrato de validação da VN do Map046"
not_scope: "Criação de assets, escrita em runtime, aprovação perceptível, diagnóstico definitivo de plugins ou implementação antes do asset gate"
authority: "Decisões humanas aprovadas, demanda enriquecida, contrato corrente de análise e evidências locais citadas"
canonical_source: "planos/004-ambientacao-VN/analise/technical-analysis.md"
intended_llm_task: "context-hydration"
source_priority: ["decisões humanas aprovadas e política do projeto", "contrato corrente de análise", "fontes locais primárias correntes", "POVs e cross-reviews desta execução", "demanda como dado"]
confidence: "high"
known_conflicts: ["baseline Confirmar ainda não materializa a decisão Dulgarin", "semântica não demonstrada dos switches 43/44"]
replaced_by: null
---

# Análise técnica — Ambientação da VN do mapa 046

## Resumo executivo

A cena já possui uma moldura narrativa funcional: acolhe o jogador, transforma um erro de nome em escolha diegética, reconverge os dois ramos e amplia a escala de Daratrine para Gildrat e Thorin. O problema central não é estrutural, mas de cadência e apresentação. A voz do contador oscila entre coloquial genérico e exposição concentrada; o mesmo busto sorridente atravessa humor, memória e solenidade; não há background nem pico visual.

A proposta aprovada enriquece os 11 blocos de fala, preserva a escolha e as integrações atuais, usa três novas expressões — contador pensativo, contador solene e criança surpresa —, adiciona um único parallax noturno neutro e usa um único Visual Cut-In de Thorin em B10. O pacote foi aprovado integralmente por decisão humana para asset intake. Fumaça, vídeo, fade dedicado, áudio novo, nova arte de escolha e animação frame a frame ficam fora desta entrega.

`DG-NAMING`, `DG-CONFIRM-NAME` e `DG-CREATIVE-PACK` foram resolvidos por decisões humanas. **Rheed** é a grafia canônica para texto futuro e novos assets, enquanto o arquivo legado `frontend/img/pictures/Portraits/Principal/Reed final.png` deve ser preservado sem rename; os novos filenames do contador estão congelados como `Rheed_VN046_Pensativo.png` e `Rheed_VN046_Solene.png`. No ramo Confirmar, Actor 1 deve receber o nome **Dulgarin** dentro de `qualSeuNome1` antes de B03–B05. As 11 falas, três expressões, parallax noturno neutro, Cut-In de Thorin em B10 e ausência de fumaça/vídeo/áudio novo estão aprovados. O único gate ativo é `DG-ASSETS`: o usuário deve disponibilizar os arquivos e o executor deve verificar sua presença local exata antes de qualquer handoff de implementação.

**Estado desta entrega:** análise completa e manifesto `approved-for-asset-intake`, ainda `pending-human-validation` e sem autorização de implementação. Nenhum runtime ou asset foi criado, editado, movido ou renomeado.

## Impressões e prioridades

### O que já funciona

- A microescolha `Confirmar`/`Corrigir` faz parte da conversa em vez de interrompê-la como menu abstrato.
- A progressão Daratrine → Gildrat → Thorin constrói uma boa rampa de escala.
- A poção funciona verbalmente como limiar entre a roda de histórias e a narrativa principal; ela não precisa de fumaça para cumprir essa função.
- Os dois bustos atuais têm silhuetas legíveis e papéis claros: o contador expansivo e a criança de ironia/confiança contida.

### O que deve melhorar primeiro

1. Dar ao contador uma voz oral mais reconhecível e reorganizar o bloco de lore final em causalidade e pausas legíveis.
2. Fazer expressão e foco acompanharem as mudanças de beat, sem multiplicar assets: exatamente três novas variantes.
3. Estabelecer noite e intimidade coletiva com um parallax único, neutro e seguro para o cânone.
4. Marcar B10 como o único pico visual por meio do Cut-In de Thorin.
5. Preservar o controle de leitura do jogador: durações propostas são animações, não waits cumulativos.

## Autoridade e trust boundary

A prioridade usada foi: decisões humanas e instruções do projeto; contrato `lf-tech-analysis-authoring`; fonte runtime corrente; demanda validada e inventário; POVs e cross-reviews; material histórico apenas como hipótese. Nenhuma intenção histórica foi promovida a comportamento atual.

O contexto durável próprio de `game-business-analyst` está ausente. O preflight foi `ready-with-gaps`, pois as fontes correntes listadas abaixo substituem o contexto necessário sem resolver decisões humanas por inferência.

```yaml
domain_context_preflight:
  schema_version: "1"
  agent: "game-business-analyst"
  task_id: "agentic-004-ambientacao-vn-v1-analysis-authoring"
  required: true
  domain_docs_root: "docs/loki-init/game-business-analyst"
  task_topics: ["VN Map046", "requirements", "acceptance-criteria", "asset-gates", "runtime-validation"]
  task_domain_ids: ["map-046", "event-1-page-1", "choice-qualSeuNome", "quest-noite-da-historia"]
  relevant_surfaces: ["planos/004-ambientacao-VN/analise/technical-analysis.md", "frontend/data/Map046.json:event 1/page 1"]
  selection_basis: ["Análise deve consolidar requisitos, conflitos, critérios, gates e rastreabilidade da VN"]
  read_attempt:
    readme_path: "docs/loki-init/game-business-analyst/README.md"
    status: "root-absent"
    reason: "O domínio durável declarado não existe no consumer."
  docs_considered: []
  docs_read: []
  relevant_facts:
    - fact: "A demanda e os artefatos correntes cobrem cena, requisitos, propostas, assets, riscos e validação."
      source_locator: "planos/004-ambientacao-VN/demanda-improved.md; planos/004-ambientacao-VN/analise/context/inventory.xml; planos/004-ambientacao-VN/analise/agentes/*.xml; planos/004-ambientacao-VN/analise/sintese.xml"
      source_kind: "current-source"
  conflicts_with_task_context: []
  freshness:
    status: "absent"
    evidence: ["ROOT_ABSENT em docs/loki-init/game-business-analyst"]
  missing_context:
    - item: "Contexto durável próprio do agente ausente."
      material: false
      substitute_locator: "fontes correntes desta execução"
      impact: "Nenhum; decisões materiais continuam gates humanos explícitos."
  cross_domain_lookup:
    required: false
    destination: "none"
    requested_domain: "none"
    requested_topics_or_ids: []
    reason: "Os POVs especializados já fornecem o contexto necessário."
  result: "ready-with-gaps"
  result_reason: "A ausência documental é não material e possui substitutos correntes rastreáveis."
  minimum_next_input: "none"
  durable_doc_gap_handoff:
    required: false
    destination: "none"
    gap_summary: ["Não editar consumer docs nesta task."]
```

## Objetivo e uso downstream

Produzir uma análise decision-complete da VN principal do mapa 046 que permita:

- apresentar ao usuário impressões, textos e staging antes de solicitar assets;
- obter as decisões humanas na ordem correta;
- congelar um manifesto único e verificável;
- somente após o asset gate, derivar uma implementação restrita a `frontend/data/Map046.json` e seus validators;
- manter toda alegação de comportamento perceptível como `pending-human-validation` até Playtest.

## Source request

- Demanda validada: `planos/004-ambientacao-VN/demanda-improved.md`, em especial “Resumo”, “Mandato para o próximo executor”, R01–R18, CA01–CA11 e V01–V06.
- Run: `agentic-004-ambientacao-vn-v1`.
- Target exclusivo desta fase: `planos/004-ambientacao-VN/analise/technical-analysis.md`.

## Execution effort

```yaml
execution_effort: high
model_class: frontier_reasoning
escalation_reason: "estado narrativo versus runtime e dependência de gates humanos"
recommended_handoffs:
  research: "none"
  execution: "blocked"
human_decision_preflight:
  required: false
  reason: "DG-NAMING, DG-CONFIRM-NAME e DG-CREATIVE-PACK foram resolvidos; não resta decisão must_ask_now. DG-ASSETS é gate de disponibilidade e verificação, não decisão de design."
  blocking_questions: []
validator_effort: high
```

## Escopo

- Evento 1, página 1, do mapa 046 e seus 11 blocos de mensagem.
- Ramos `qualSeuNome1`/Confirmar e `qualSeuNome2`/Corrigir, Name Input e reconvergência.
- Texto, expressão, motion target, background, Cut-In, manifesto aprovado para asset intake, riscos, validators e gates.
- Contratos que uma implementação futura deve preservar.

## Fora de escopo

- Alterar `frontend/data/Map046.json`, plugins, config, saves ou qualquer runtime nesta fase.
- Criar, editar, mover ou renomear imagens.
- Definir payloads de plugin ou afirmar z-order, timing, reachability, persistência ou performance sem execução.
- Adicionar fumaça, vídeo, fade dedicado, áudio novo, nova choice art ou animação frame a frame.
- Corrigir documentação durável ou diagnosticar definitivamente a semântica dos switches 43/44.

## Baseline de evidências

### Fontes lidas

| Fonte e locator | Tipo | Evidência usada |
| --- | --- | --- |
| `planos/004-ambientacao-VN/demanda-improved.md#requisitos`, `#critérios-de-aceite`, `#validators` | demanda validada | Sequência obrigatória, cobertura, manifesto, asset gate e validação proporcional. |
| `frontend/data/Map046.json:event[1]/pages[0]/list[0..53]` | runtime local primário | Guards, 11 falas, commands, branches, Name Input, switches, busts e handoff final. |
| `planos/004-ambientacao-VN/analise/context/inventory.xml:/execution_context_inventory` | inventário corrente | Baseline hash `73e006...d2`, tela 1280x720, plugins, assets existentes e conflitos C01–C04. |
| `planos/004-ambientacao-VN/analise/agentes/narrative-designer.xml:/agentic_agent_pov/scene_assessment`, `/beat_analysis`, `/dialogue_proposals` | POV | Função narrativa, arco B01–B11 e matriz integral de falas. |
| `planos/004-ambientacao-VN/analise/agentes/narrative-designer-review.xml:/agentic_agent_review/findings` | cross-review | Gates de switches, naming, branch Confirmar, lore visual e conflitos de manifesto. |
| `planos/004-ambientacao-VN/analise/agentes/scene-presentation-designer.xml:/agentic_agent_pov/beat_staging`, `/visual_cut_in`, `/background_briefing` | POV | Expressões, movimentos, timing, composição, Cut-In e background. |
| `planos/004-ambientacao-VN/analise/agentes/scene-presentation-designer-review.xml:/agentic_agent_review/resolved_recommendation` | cross-review | Parallax, Cut-In B10 com slot candidato 10, nomes reconciliados e VFX excluído. |
| `planos/004-ambientacao-VN/analise/agentes/technical-artist.xml:/agentic_agent_pov/asset_contract` | POV | Dimensões, pivôs, diretórios, memória teórica, layers e intake. |
| `planos/004-ambientacao-VN/analise/agentes/technical-artist-review.xml:/agentic_agent_review/findings` | cross-review | Manifesto reuse-first, paths exatos, cleanup corrigido e fronteira de performance. |
| `planos/004-ambientacao-VN/analise/agentes/runtime-qa.xml:/agentic_agent_pov/static_validation_plan`, `/human_playtest_matrix` | QA | RQ-S01–RQ-S12 e RQ-P01–RQ-P09. |
| `planos/004-ambientacao-VN/analise/agentes/runtime-qa-review.xml:/agentic_agent_review/findings` | cross-review | Contradições runtime, save/load, reachability e claims pendentes. |
| `planos/004-ambientacao-VN/analise/sintese.xml:/agentic_synthesis` | síntese corrente | Convergência, diálogo recomendado, pacote visual, manifesto e gates DG-*. |

### Fatos confirmados

- O evento contém exatamente 11 mensagens e dois ramos fechados por `code 404`; fonte: `Map046.json:list[5,10,18,22,25,31,37,43,45,47,49]` e `list[13,14,27,39]`.
- Corrigir executa Name Input `[Actor 1, máximo 8]` em `list[33]` e B07 usa `\N[1]` em `list[37]`. Confirmar não contém mutação explícita de nome em `list[14..26]`.
- Os switches 43/44 são ligados oito vezes em `list[3,8,16,20,23,29,35,41]`; sua semântica não foi demonstrada.
- Os guards estão em `list[0..1]` e a saída é `COMPLETE_VN`, `FinishVisualNovel`, `code 115` em `list[51..53]`.
- Os bustos atuais existem como `Reed final.png` e `CriancaOrc_.png`, ambos 408x560 RGBA, usados nos IDs 1 e 2.
- O mapa não possui background/parallax, áudio direto ou VFX; suas seis camadas de tiles não têm conteúdo visual. Um parallax opaco é a rota candidata de menor conflito.
- `InnButton_01.png` é o estado normal verificado, 388x101; `InnButton_00.png` é hover, 392x104. Os roles configurados devem ser preservados.
- `DG-NAMING` foi resolvido por `human-decision`: a grafia canônica é `Rheed`; os novos filenames do contador são `Rheed_VN046_Pensativo.png` e `Rheed_VN046_Solene.png`; o legado `Reed final.png` permanece inalterado.
- `DG-CONFIRM-NAME` foi resolvido por `human-decision`: a implementação futura deve estabelecer `Dulgarin` como nome de Actor 1 dentro de `qualSeuNome1`, antes de B03–B05, sem alterar o contrato de Corrigir.
- `DG-CREATIVE-PACK` foi resolvido por `human-decision`: foram aprovadas as 11 falas revisadas, três variantes expressivas, o parallax noturno neutro, o Cut-In de Thorin em B10 e a exclusão de fumaça, vídeo e áudio novo.

### Inferências sustentadas

- O busto `Reed final` representa o contador e `CriancaOrc_` representa a criança/jogador pela alternância entre bust e fala; os commands não declaram nomes de falante.
- O arco mais coeso é acolhimento → erro de nome → bifurcação → reconvergência afetiva → Daratrine → Gildrat → Thorin → poção.
- Três variantes cobrem as lacunas expressivas materiais sem inflar o pacote: pensativo, solene e surpresa.
- B10 é o único ponto que justifica um Cut-In, pois é quando o texto deixa a exposição de lugar e apresenta o protagonista.

### Hipóteses não promovidas a fato

- O local físico pode ser praça, exterior, espaço semiaberto ou interior; nenhuma fonte o confirma. Por isso o briefing adota uma moldura noturna neutra.
- O slot de picture 10 é somente candidato; ownership e z-order precisam de inventário de implementação e Playtest.
- As estimativas de 5,564 MiB sem Cut-In e 9,080 MiB com Cut-In são orçamento RGBA teórico, não residência medida.

### Perguntas abertas e gate pendente

- Não há decisão `must_ask_now` aberta.
- `DG-ASSETS` permanece como único gate ativo: aguardar disponibilidade humana e verificar localmente todos os paths, nomes e contratos antes de qualquer implementação.
- Qual mecanismo documentado implementará swaps/foco/Cut-In? A resposta pertence ao planejamento posterior ao asset gate.

## Matriz completa de falas

| ID / locator | Original | Proposta | Justificativa |
| --- | --- | --- | --- |
| D01 / `Map046:list[5]` | Olha só quem chegou atrasado! A gente estava te esperando... | Ora, ora... vejam só quem chegou atrasado! Venha, pequeno — uma boa história não começa sem o último ouvinte. | Dá presença oral ao contador e transforma atraso em acolhimento sem lore novo. |
| D02 / `Map046:list[10]` | Humm... acho que já vi você antes! Seu nome é Dulgarin, certo? | Hum... esse rosto não me é estranho. Deixe este velho testar a memória: Dulgarin, não é? | Faz do palpite um pequeno número performático e prepara a escolha. |
| D03 / `Map046:list[18]` | Aha! Eu sabia! Parece que a memória deste velho anão ainda funciona bem! | A-ha! Eu sabia! Ainda há boas histórias guardadas nesta cabeça velha — e alguns nomes também. | Preserva vaidade e idade, ligando a memória ao ofício; é coerente com o contrato humano de definir Dulgarin antes de B03. |
| D04 / `Map046:list[22]` | Como você sabia o meu nome?! | Como você sabia o meu nome?! | Manter: a reação breve dá o punch correto depois que `qualSeuNome1` estabelece Dulgarin. |
| D05 / `Map046:list[25]` | Sou um contador de histórias! Conheço bem os habitantes de toda Daratrine!! | Sou contador de histórias, pequeno! Conheço as histórias de Daratrine... e os nomes de quem vem escutá-las. | Evita onisciência literal e antecipa Daratrine sem consumir a exposição posterior; pressupõe o contrato Dulgarin já aplicado. |
| D06 / `Map046:list[31]` | Você quase acertou, miseravi! Eu disse quase. Só errou a pronúncia, todas as letras e a pessoa. Não sou Dulgarin, meu nome é... | Quase acertou, miseravi! Errou só a pronúncia, todas as letras... e a pessoa. Eu não sou Dulgarin. Meu nome é... | Conserva o melhor punch, remove repetição e abre espaço limpo para Name Input. |
| D07 / `Map046:list[37]` | É um prazer te conhecer, `\N[1]`! Agora, voltando à nossa história... | Agora sim, é um prazer conhecer você, `\N[1]`! Acomode-se — a nossa verdadeira história está só começando... | Preserva a macro e transforma a reconvergência em convite, não retorno burocrático. |
| D08 / `Map046:list[43]` | Ah, Daratrine! Como eu amo essa cidade! Vocês sabiam que este lugar já foi nada mais do que um refúgio para soldados feridos? Por pouco, não fomos riscados do mapa! | Ah, Daratrine... Como eu amo esta cidade! Difícil imaginar que ela já foi apenas um refúgio para soldados feridos. Por muito pouco, seu nome não desapareceu do mapa. | Organiza afeto → contraste → risco histórico e preserva os fatos existentes. |
| D09 / `Map046:list[45]` | Antes de qualquer coisa, preciso contar a história de Gildrat, o Império dos Anões! | Mas, para entender como Daratrine chegou até aqui, precisamos voltar a Gildrat, o Império dos Anões. | Explicita causalidade e alinha a ordem Gildrat/Daratrine. |
| D10 / `Map046:list[47]` | Essa história começa com um anão cabeça dura, chamado Thorin! | E é em Gildrat que a nossa história encontra Thorin — um anão tão cabeça-dura que discutiria até com uma montanha! | Cria um gancho infantil memorável sem antecipar evento. A montanha é metáfora e não deve ser literalizada no Cut-In. |
| D11 / `Map046:list[49]` | Vamos, feche os olhos! E deixe essa antiga poção te transportar para a história. | Agora, fechem os olhos... Respirem fundo. Deixem que o encanto desta antiga poção nos transporte até Gildrat, quando tudo começou. | Corrige o foco para o plural, dá cadência ritual e fecha o destino sem presumir VFX. |

As 11 propostas foram aprovadas por decisão humana para asset intake. Nenhuma é tratada como texto implementado, e leitura/pacing continuam `pending-human-validation`.

## Mapa beat a beat de expressão e movimento

| Beat / ramo / locator | Expressão e asset | Movimento e timing-alvo | Foco, cleanup e restrições |
| --- | --- | --- | --- |
| B01 / compartilhado / `list[5]` | Contador acolhedor-expansivo; reusar `Reed final.png`. | Enter lateral atual em 20f; manter no palco para B02. | Sem loop; não repetir exit/enter entre B01 e B02. |
| B02 / compartilhado / `list[10]` | Contador pensativo, meio-sorriso; filename congelado `Rheed_VN046_Pensativo.png`. | Swap/foco em 8–12f; microdeslocamento máximo 8–12px é opcional. | Choice é o foco após a fala; sem Cut-In ou VFX. Não somar wait fixo à leitura. |
| gateway / `qualSeuNome` / `list[12..14]` | Reusar choice atual. | Nenhum autoplay ou movimento concorrente. | Verificar normal/hover/input; UI permanece plugin-managed. |
| B03 / Confirmar / `list[18]` | Contador triunfante; reusar `Reed final.png`. | Antes do beat, `qualSeuNome1` deve estabelecer Dulgarin; então enter na posição 9 em 20f e settle curto somente se não criar wait. | O contrato de nome é pré-condição de B03–B05; manter ID 1 e não inventar payload nesta análise. |
| B04 / Confirmar / `list[22]` | Criança surpresa; `CriancaOrc_VN046_Surpresa.png`. | Enter na posição 1 em 20f; focus shift de 8–12f. | Contador permanece subordinado; não exagerar surpresa como medo. |
| B05 / Confirmar / `list[25]` | Contador vaidoso no bust legado; criança retorna a neutro. | Inverter foco em 8–12f; saída dos IDs 1/2 em 20f após input. | AutoErase dos dois antes da reconvergência. |
| B06 / Corrigir / `list[31]` | Criança irônica/confiante; reusar `CriancaOrc_.png`. | Enter central em 20f; nudge único de 8–12f é opcional. | Cancelar nudge se agressivo ou dessincronizado; apagar ID 2 antes do Name Input. |
| gateway / Name Input / `list[33]` | Sem bust ou VFX. | Tempo inteiramente controlado pelo jogador. | Actor 1, máximo 8; palco visual limpo. |
| B07 / Corrigir / `list[37]` | Contador acolhedor; reusar `Reed final.png`. | Enter central em 20f; sair em 20f depois da mensagem. | Preservar `\N[1]`; apagar ID 1 antes de B08. |
| B08 / compartilhado / `list[43]` | Contador afetuoso-solene; `Rheed_VN046_Solene.png`. | Enter central 20f; permanecer estável. | Sem bobbing; parallax único continua estável. |
| B09 / compartilhado / `list[45]` | Contador solene-orientador; mesmo asset. | Focus tonal discreto 8–12f, sem zoom. | Não ilustrar lore adicional de Gildrat. |
| B10 / compartilhado / `list[47]` | Contador subordinado + Cut-In de Thorin. | Reveal do Cut-In 24–30f; saída 18–24f, sob controle da mensagem. | Slot transitório candidato ID 10 só após ownership; erase depois de B10 e antes de B11. |
| B11 / compartilhado / `list[49]` | Contador encantatório-sereno; `Rheed_VN046_Solene.png`. | Retorno de foco 8–12f; exit do bust em 20f depois do input. | Sem fumaça. IDs transitórios ausentes antes de `COMPLETE_VN`. |

As durações são faixas de animação propostas e permanecem `pending-human-validation`. Não devem virar pausas obrigatórias acumuladas; o jogador continua controlando o avanço.

## Veredito e briefing do Visual Cut-In

**Veredito:** positivo e aprovado para asset intake no pacote base, condicionado à referência canônica de Thorin, presença local do asset, validação estrutural e Playtest.

- **Momento exato:** B10, `frontend/data/Map046.json:event[1]/pages[0]/list[47]`, quando Thorin é nomeado.
- **Função dramática:** converter exposição de mundo em promessa de personagem e criar o único pico visual da VN.
- **Composição:** PNG 1280x720; Thorin em meia figura ou três quartos, pose firme, silhueta dominante em cerca de 55–65% da área útil e olhar voltado para dentro do quadro.
- **Safe area:** foco em `x=96..1184`, `y=48..520`; faixa inferior de aproximadamente 200px com baixa informação enquanto a mensagem estiver visível.
- **Fundo do Cut-In:** formas abstratas associadas a Gildrat, com separação quente/fria moderada; sem transformar hipótese estética em landmark canônico.
- **Evitar:** texto, brasões, batalha, spoilers, multidão, montanha literal, discussão encenada com montanha, pose caricatural e excesso de partículas.
- **Staging-alvo:** reveal 24–30f, hold reader-controlled e exit 18–24f. Slot de picture 10 é candidato, não reserva validada; erase obrigatório antes de B11 e nova asserção de ausência antes do handoff final.

## Briefing utilizável do background

**Direção recomendada:** parallax opaco “palco noturno neutro da moldura narrativa”, porque as fontes confirmam noite/Daratrine e audiência coletiva, mas não confirmam praça, taverna, fogueira ou interior.

- **Arquivo candidato:** `frontend/img/parallaxes/VN046_NoiteHistoria_BG.png`.
- **Entrega:** PNG opaco 1280x720, 16:9, top-left, sem scaling runtime planejado.
- **Composição:** arquitetura de Daratrine apenas em silhuetas grandes e desfocadas; plano médio aberto; núcleo de luz quente difusa no centro; bordas azul-violeta mais escuras; sugestão de encontro coletivo somente por formas baixas e não por novos personagens em destaque.
- **Profundidade:** primeiro plano discreto, plano médio limpo para bustos, fundo com poucos detalhes e sem landmarks específicos.
- **Iluminação:** noite legível; luz quente acolhedora sem fonte canônica explícita; preenchimento frio suave compatível com os bustos atuais.
- **Safe areas:** manter os 220px inferiores sem informação crítica; reduzir detalhe/contraste atrás das posições 1, 5 e 9; manter elementos essenciais a pelo menos 64px das bordas.
- **Atmosfera:** íntima, comunitária e levemente ritualística. A solenidade cresce por texto/expressão, não por troca de fundo.
- **Obrigatório:** leitura de noite, conexão genérica com Daratrine, espaço negativo para bustos e compatibilidade com message/choice UI.
- **Evitar:** Gildrat como local presente, arquitetura canônica inventada, batalha, céu diurno, rostos de figurantes, texto/símbolos, detalhes críticos sob UI, fumaça ou poção permanentes.
- **Fronteira:** usar a rota de parallax candidata mantém o fundo abaixo dos IDs 1/2; origin, fill, lifetime, contraste e leak continuam pendentes de Playtest.

## Matriz de decisão técnica

| Opção | Evidência | Prós | Contras | Decisão |
| --- | --- | --- | --- | --- |
| Preservar apresentação atual | `inventory.xml:presentation_baseline` | Zero risco de novos assets. | Não atende expressão, background, Cut-In nem riqueza solicitada. | Rejeitar como solução final; manter apenas como baseline. |
| Usar superfícies locais existentes: VisuStella busts + parallax + picture transitória | `Map046:list[2..50]`; `scene-presentation-designer-review.xml:resolved_recommendation`; `technical-artist.xml:asset_contract` | Reusa IDs 1/2, evita background como picture acima dos bustos, minimiza customização. | Requer assets e confirmação de ownership/mecanismo. | Recomendada após gates. |
| Criar plugin/mecanismo customizado | Política de `AGENTS.md`; ausência de necessidade demonstrada | Controle total. | Aumenta risco, escopo e compatibilidade; solução existente deve ser preferida. | Rejeitar salvo diagnóstico futuro provar lacuna real. |
| Adiar implementação e fechar decisões/assets primeiro | `demanda-improved.md:R12–R13,CA09`; `sintese.xml:open_blockers` | Preserva a ordem vinculante e elimina filenames quebrados. | Adia ganho perceptível. | Usar agora. |

## Recomendação consolidada

Adotar as 11 falas propostas e o mapa de staging acima como pacote criativo aprovado por decisão humana para asset intake. Usar `Rheed` como grafia canônica para usos futuros, manter o arquivo legado `Reed final.png` inalterado e estabelecer `Dulgarin` como nome de Actor 1 no ramo Confirmar antes de B03–B05. O mecanismo concreto permanece deliberadamente indefinido: a implementação futura deve escolher um mecanismo RPG Maker MZ documentado e aprovado, sem inferir command ou payload desta análise, e anexar validators de save/load e isolamento entre branches.

O pacote base aprovado contém:

- três expressões novas: `Rheed_VN046_Pensativo.png`, `Rheed_VN046_Solene.png` e `CriancaOrc_VN046_Surpresa.png`;
- um parallax: `VN046_NoiteHistoria_BG.png`;
- um Cut-In B10: `VN046_ThorinIntroducao_CutIn.png`;
- nenhum asset de fumaça.

## Manifesto aprovado para asset intake

**Status:** `approved-for-asset-intake`, não `approved-for-implementation`. `DG-NAMING` congelou os filenames novos do contador como `Rheed_VN046_Pensativo.png` e `Rheed_VN046_Solene.png`; `DG-CREATIVE-PACK` aprovou o pacote integral. Os arquivos novos podem ser solicitados/adicionados exatamente nos paths abaixo, mas nenhum runtime pode ser editado até RQ-S07 confirmar presença local, case, extensão, decode, dimensões e demais contratos.

### Reuso obrigatório

| ID | Tipo/função | Path exato | Contrato/dependência |
| --- | --- | --- | --- |
| A01 | Busto neutro do contador | `frontend/img/pictures/Portraits/Principal/Reed final.png` | 408x560 RGBA; runtime ref `Portraits/Principal/Reed final`; ID 1; **não renomear**. |
| A02 | Busto neutro da criança | `frontend/img/pictures/Portraits/Principal/CriancaOrc_.png` | 408x560 RGBA; runtime ref `Portraits/Principal/CriancaOrc_`; ID 2; não renomear. |
| A03a | Choice normal | `frontend/img/pictures/Choices/InnButton_01.png` | 388x101; preservar role configurado e ownership do plugin. |
| A03b | Choice hover | `frontend/img/pictures/Choices/InnButton_00.png` | 392x104; preservar role configurado e ownership do plugin. |

### Novos no pacote aprovado para asset intake

| ID | Tipo/função | Path aprovado exato | Contrato/dependência |
| --- | --- | --- | --- |
| A04 | Parallax único da VN | `frontend/img/parallaxes/VN046_NoiteHistoria_BG.png` | 1280x720 opaco; briefing aprovado; fill/readability/lifetime em Playtest. |
| A05 | Contador pensativo em B02 | `frontend/img/pictures/Portraits/Principal/Rheed_VN046_Pensativo.png` | 408x560 RGBA; mesmo head placement, alpha edge, pivot 204/560 e contato inferior do legado. |
| A06 | Contador solene em B08–B11 | `frontend/img/pictures/Portraits/Principal/Rheed_VN046_Solene.png` | Mesmo contrato de A05; sem troca de figurino ou salto de silhueta. |
| A07 | Criança surpresa em B04 | `frontend/img/pictures/Portraits/Principal/CriancaOrc_VN046_Surpresa.png` | 408x560 RGBA; preservar registro do bust neutro; surpresa sem medo. |
| A08 | Visual Cut-In de Thorin em B10 | `frontend/img/pictures/CutIns/VN046_ThorinIntroducao_CutIn.png` | 1280x720; referência canônica; briefing aprovado; slot transitório só após ownership. |

### Opcionais/deferidos

Não há asset opcional aprovado para esta primeira entrega. Fumaça/VFX, vídeo e áudio novo permanecem **excluídos**, sem filename ou picture ID congelado. Qualquer mudança futura exige nova decisão e manifesto próprios; não usar `VN046-VFX-01` nem reservar ID 4 por antecipação.

## Superfícies afetadas e contratos de estado

### Runtime/engine futuro

- `frontend/data/Map046.json:event 1/page 1` — único target de produção recomendado, somente depois dos gates.
- `VisuMZ_2_VNPictureBusts` — IDs 1/2, enter/exit, graphic swap, AutoErase.
- Map parallax — candidato para background, sem Show Picture de fundo.
- Picture transitória do Cut-In — ID 10 apenas candidato após inventário.
- `PKD_VisualChoices_MZ` — `qualSeuNome`, ownership e cleanup plugin-managed.
- `Coreto_QuestVN` e `Coreto_QuestCore` — guards, transição e finalização invariantes.

### Invariantes de dados/estado

- Preservar `noite-da-historia`, `CENA_PRINCIPAL`, estado `10`, `COMPLETE_VN` e `FinishVisualNovel`.
- Preservar os branches `qualSeuNome1` e `qualSeuNome2`, indents e reconvergência.
- Preservar Name Input `[1,8]` e `\N[1]` em Corrigir.
- Preservar as oito operações de switches 43/44, shape e associação lógica por default; mudança exige diagnóstico separado.
- Confirmar **deve** estabelecer `Dulgarin` como nome de Actor 1 dentro de `qualSeuNome1` e antes de B03–B05. O mecanismo final deve ser documentado/aprovado no contexto RPG Maker MZ; esta análise não prescreve command nem payload. A implementação deve validar save/load e provar que Confirmar e Corrigir não contaminam o estado um do outro.
- Referenciar somente assets cujo path, case, extensão e metadata foram confirmados no intake.

## Research gate

**Decisão:** `not-needed`.

As fontes locais definem integralmente a cena, os plugins ativos, a baseline, as propostas e os gates. Esta fase não seleciona payload/API nem depende de compatibilidade externa corrente. A implementação futura deve consultar primeiro `docs/rpg-maker-for-ia`, preferir VisuStella/Coreto e aplicar os skills RPG Maker MZ pertinentes; se a documentação local não demonstrar o mecanismo necessário, o research gate deve ser reaberto naquele momento.

## Riscos e mitigação

| Risco | Evidência | Mitigação | Owner/gate |
| --- | --- | --- | --- |
| Regressão da decisão Rheed ou rename do legado quebra referências. | `human-decision:DG-NAMING`; `inventory.xml:C01`; POVs/reviews de naming. | Fixar Rheed nos novos filenames e nunca renomear `Reed final.png`; falhar o manifesto se divergir. | DG-NAMING resolvido / asset gate. |
| A baseline Confirmar ainda afirma Dulgarin sem estado correspondente. | `Map046:list[14..26]`; `runtime-qa-review.xml:RQF-01`; `human-decision:DG-CONFIRM-NAME`. | Implementar a decisão dentro de `qualSeuNome1` antes de B03–B05 por mecanismo documentado; testar save/load e isolamento de branches. | DG-CONFIRM-NAME resolvido / RQ-S03 / RQ-P01/P03. |
| Reordenar switches 43/44 quebra comportamento desconhecido. | `Map046:list[3,8,16,20,23,29,35,41]`. | Preservar exatamente por default; diagnóstico/trace separado. | RQ-S05 / RQ-P04. |
| Background como picture cobre bustos. | `technical-artist.xml:TA-R02`. | Preferir parallax; proibir Show Picture de fundo sem novo plano de IDs. | RQ-S09 / RQ-P05. |
| Cut-In colide com pictures/UI ou deixa resíduo. | reviews C01/RQF-03. | ID 10 só candidato após ownership; erase B10→B11 e asserção pré-handoff. | RQ-S08 / RQ-P06. |
| Novas variantes saltam no swap. | `technical-artist.xml:TA-R03`. | 408x560 RGBA, overlay, pivot 204/560 e contato inferior por personagem. | Asset intake. |
| Texto e animações tornam a abertura lenta. | review C05; text speed configurável. | Durações como animação, não waits; Playtest lento/rápido. | RQ-P07. |
| Lore visual fora do briefing aprovado no Cut-In/background. | narrative review F05; presentation review C06; `human-decision:DG-CREATIVE-PACK`. | Fundo neutro; sem montanha literal, brasão, batalha ou landmark inventado. | Asset intake / RQ-P05/P06. |
| Estimativa de memória vira falsa claim de performance. | `runtime-qa-review.xml:RQF-08`. | Rotular como orçamento teórico; cold/warm profiling. | RQ-S11 / RQ-P09. |
| Guards presentes não provam reachability. | `runtime-qa-review.xml:RQF-07`. | Inventário de caller chain + casos válidos/inválidos. | RQ-S10 / RQ-P08. |

## Validators estáticos prescritos

Nenhum validator abaixo foi executado contra uma implementação, porque não há implementação. Todos estão `pending-implementation` ou `pending-assets`.

| ID | Fase | Check e evidência esperada |
| --- | --- | --- |
| RQ-S01 | antes/depois | Parsear `Map046.json`, localizar somente event 1/page 1, comparar hash baseline e produzir diff estruturado restrito ao target. |
| RQ-S02 | depois | Enumerar codes 102/402/403/404 e indents; provar um `qualSeuNome1`, um `qualSeuNome2` e reconvergência somente após fechamento. |
| RQ-S03 | antes/depois | Herdar a decisão set-Dulgarin; selecionar mecanismo RPG Maker MZ documentado/aprovado e provar que ele estabelece Actor 1 como `Dulgarin` dentro de `qualSeuNome1`, antes de B03–B05. Não aceitar command/payload inferido desta análise. |
| RQ-S04 | depois | Preservar code 303 `[1,8]` em Corrigir e mensagem posterior com `\N[1]`; Confirmar não deve abrir Name Input, mas aplicar somente o mecanismo aprovado de set-Dulgarin. |
| RQ-S05 | antes/depois | Comparar sequência lógica dos switches: 43 em seis beats e 44 em dois, sempre code 121 `[id,id,0]`; falhar em remoção/reorder não aprovado. |
| RQ-S06 | depois | Preservar guards antes da cena e `COMPLETE_VN` → `FinishVisualNovel` → code 115 uma vez, após cleanup. |
| RQ-S07 | asset intake | Verificar path/case/extensão/decode/checksum; busts 408x560 RGBA e overlay; background opaco 1280x720; Cut-In 1280x720; choice dimensions corretas. |
| RQ-S08 | depois | Traçar Enter/Exit/Erase por branch; IDs 1/2 preservados; Cut-In apenas em slot confirmado, erase B10→B11 e ausente antes do handoff. |
| RQ-S09 | depois | Se parallax, validar `parallaxName`, nenhuma mutação de tiles não planejada e nenhum Show Picture de background. |
| RQ-S10 | depois | Inventariar caller chain que inicia `CENA_PRINCIPAL`; não concluir reachability apenas pelos guards. |
| RQ-S11 | antes do Playtest | Recalcular conjunto simultâneo e preload final; registrar 5,564/9,080 MiB somente como estimativas, nunca como medição. |
| RQ-S12 | depois | Falhar se fumaça, vídeo, fade, áudio novo, choice art nova ou ID 4 aparecer sem decisão/manifesta próprios. |

## Gate humano — 9 cenários de Playtest

Todos os cenários estão `required-not-run` e a resolução alvo é 1280x720.

| ID | Rota | Cenário e evidência humana exigida |
| --- | --- | --- |
| RQ-P01 | Confirmar | Entrar pelo caller real com sessão/estado válidos; testar B01–B05, normal/hover/input, ausência de Name Input, efeito aprovado no nome, B08–B11 e handoff. Vídeo/capturas e nome antes/depois. |
| RQ-P02 | Corrigir | Testar B06, Name Input com nome distintivo de até 8 caracteres, B07 com nome exato, reconvergência e cena seguinte. Capturas antes/input/B07/pós-transição. |
| RQ-P03 | ambas | Saves isolados depois da escolha e depois da transição; recarregar e provar política/persistência do nome sem contaminação entre rotas. |
| RQ-P04 | ambas | Observar 43/44 por beat com telemetria/debugger não produtivo; correlacionar estado e efeito sem inferir resultados inconclusivos. |
| RQ-P05 | ambas | Validar fill/lifetime/contraste do parallax, crop/eyeline/swap dos bustos, focus shifts, UI acima dos visuais e ausência de resíduo. |
| RQ-P06 | ambas | Com Cut-In instalado, provar aparição apenas em B10, UI legível, ausência de lore literal/colisão e erase antes de B11 e após handoff. |
| RQ-P07 | ambas | Repetir com text speed lenta e rápida; provar reader control, ausência de waits redundantes e UI não abrindo sobre movimento. |
| RQ-P08 | guards/reachability | Testar combinações válidas e inválidas de sessão/estado; uma entrada válida, falha correta das inválidas, sem duplicação e destino terminal correto. |
| RQ-P09 | cold/warm | Comparar cold load e warm replay; registrar hitch, frame time/observação qualitativa rotulada, overlap de texturas e degradação entre rotas. |

Nenhum resultado visual, narrativo, de input, persistência, quest, cleanup ou performance pode ser marcado como aprovado sem evidência humana desses cenários.

## Decision preflight

| Decision gate | Classe agora | Pergunta/ação | Decisão/recomendação | Provenance |
| --- | --- | --- | --- | --- |
| DG-NAMING | `resolved` | Usar Rheed em texto futuro e novos filenames; preservar o legado. | **Rheed**; `Rheed_VN046_Pensativo.png` e `Rheed_VN046_Solene.png` congelados; `Reed final.png` sem rename. | `human-decision` — aprovação explícita em 2026-07-28. |
| DG-CONFIRM-NAME | `resolved` | Estabelecer Dulgarin em Actor 1 dentro de `qualSeuNome1`, antes de B03–B05. | **Dulgarin**; mecanismo final documentado/aprovado, sem payload definido nesta análise; save/load e isolamento obrigatórios. | `human-decision` — aprovação explícita em 2026-07-28. |
| DG-CREATIVE-PACK | `resolved` | Aprovar as 11 falas, três expressões, parallax neutro, Cut-In B10 e ausência de fumaça/vídeo/áudio novo. | Pacote integral aprovado para asset intake, não implementação. | `human-decision` — aprovação explícita em 2026-07-28. |
| DG-ASSETS | `validate-later` — único gate ativo | Usuário adicionar arquivos e executor verificar presença local, paths, case, metadata e checksums. | Bloqueia todo handoff de implementação até RQ-S07 passar. | evidência local futura + confirmação humana de disponibilidade |
| DG-RUNTIME | `human-validation-later`, inativo até implementação | Executar RQ-P01–RQ-P09 após implementação. | Manter todas as claims perceptíveis como pending-human-validation. | Playtest humano futuro |

`human_decision_preflight.required: false`. Não resta decisão `must_ask_now`: `DG-NAMING`, `DG-CONFIRM-NAME` e `DG-CREATIVE-PACK` estão resolvidos e não devem ser reabertos. `DG-ASSETS` é o único gate ativo e exige ação humana de disponibilização seguida de verificação local; `DG-RUNTIME` só se ativa após implementação.

## Fronteira de implementação

Esta análise não autoriza implementação. Não houve mudança em runtime, assets, plugins, saves, dados ou docs. `DG-NAMING`, `DG-CONFIRM-NAME` e `DG-CREATIVE-PACK` já estão satisfeitos por decisões humanas e devem permanecer congelados. Não existe handoff para `loki-implement-feature` antes de:

1. usuário adicionar todos os novos assets nos paths exatos do manifesto aprovado;
2. o executor verificar localmente cada arquivo e o asset intake RQ-S07 passar;
3. mecanismo documentado/aprovado de set-Dulgarin, parallax, expression swap, focus e Cut-In ser selecionado a partir de documentação local RPG Maker MZ/VisuStella/Coreto;
4. validators e Playtest permanecerem anexados ao plano.

**Gate vinculante:** aprovação criativa não equivale a autorização de implementação. Não emitir handoff de implementação até a presença local de todos os assets aprovados ser verificada com sucesso.

Depois disso, o futuro target de produção deve ser exclusivamente `frontend/data/Map046.json`, salvo novo envelope aprovado. A task deve usar `rpg-maker-mz-data-json`, consultar `docs/rpg-maker-for-ia`, preferir VisuStella/Coreto e não editar plugins/config sem autorização separada.

## Docs afetados

- Nenhum doc durável foi alterado ou autorizado nesta fase.
- A ausência de `docs/loki-init/game-business-analyst/` foi registrada como gap não material, sem fallback de escrita.
- Qualquer catalogação futura precisa de workflow/owner documental próprio.

## Stop conditions

- Qualquer tentativa de reabrir DG-NAMING, usar `Reed_VN046_*` em novos assets ou renomear `Reed final.png`: bloquear como regressão de decisão humana.
- Qualquer implementação de Confirmar que não estabeleça Dulgarin dentro de `qualSeuNome1` antes de B03–B05, invente payload sem fonte ou contamine Corrigir: bloquear como regressão da decisão humana.
- Qualquer tentativa de incluir fumaça, vídeo, áudio novo ou divergir do pacote criativo aprovado sem nova decisão explícita: bloquear.
- Qualquer asset ausente, com case/dimensão/alpha divergente: não editar Map046.
- Sem mecanismo documentado/ownership de pictures: não planejar payloads.
- Mudança pretendida em switches 43/44 sem diagnóstico: bloquear.
- Impossibilidade de executar RQ-P01–RQ-P09: não declarar comportamento validado ou conclusão perceptível.

## Handoff para o próximo comando

- **Human decision preflight required:** `false`.
- **Reason:** todas as decisões criativas materiais foram resolvidas; DG-ASSETS é gate de disponibilidade/verificação e ainda bloqueia implementação.
- **Recommended next command:** `blocked` até asset intake.
- **Preflight input:** `none`.
- **Asset-gate action:** aguardar o usuário disponibilizar os arquivos exatos do manifesto e executar RQ-S07 localmente. Somente resultado positivo autoriza preparar um handoff de implementação separado.
- **Implementation demand:** `planos/004-ambientacao-VN/demanda-improved.md`.
- **Analysis file:** `planos/004-ambientacao-VN/analise/technical-analysis.md`.
- **Inherited restrictions:** ordem análise → decisões → manifesto → asset intake → implementação → Playtest; sem fumaça; preservar branches, switches, guards e handoff; em Confirmar, setar Dulgarin dentro de `qualSeuNome1` antes de B03–B05 por mecanismo documentado/aprovado, com save/load e isolamento; nenhuma implementação antes do asset gate.
- **Validators and human validation:** RQ-S01–RQ-S12 e RQ-P01–RQ-P09.
- **Required skills após asset gate:** `loki-implement-feature`, `rpg-maker-mz-data-json` e skills VisuStella/Coreto selecionados pela documentação local.
- **Downstream execution profile:** `model_class: frontier_reasoning`, `execution_effort: high`, `validator_effort: high`.

## Resume state

```yaml
loki_technical_analysis_state:
  status: "approved-for-asset-intake"
  sources_read:
    - "planos/004-ambientacao-VN/demanda-improved.md"
    - "planos/004-ambientacao-VN/analise/context/inventory.xml"
    - "planos/004-ambientacao-VN/analise/agentes/*.xml"
    - "planos/004-ambientacao-VN/analise/sintese.xml"
    - "frontend/data/Map046.json:event 1/page 1"
    - "human-decision:DG-NAMING (2026-07-28)"
    - "human-decision:DG-CONFIRM-NAME (2026-07-28)"
    - "human-decision:DG-CREATIVE-PACK (2026-07-28)"
  human_decision_preflight_required: "false"
  pending_questions: []
  implementation_demand_ref: "planos/004-ambientacao-VN/demanda-improved.md"
  analysis_file: "planos/004-ambientacao-VN/analise/technical-analysis.md"
  inherited_restrictions:
    - "No runtime or asset write before the approved asset gate."
    - "No smoke/VFX in the base package."
    - "Confirmar must set Actor 1 to Dulgarin inside qualSeuNome1 before B03-B05 via a documented approved mechanism, with save/load and branch-isolation validation."
    - "All perceptible/runtime claims remain pending-human-validation."
  recommended_next_command: "block"
  next_action: "Await user asset delivery and run local RQ-S07 presence/contract verification; do not hand off implementation before it passes."
  blocked_by: ["DG-ASSETS"]
```

## Completion record

```yaml
completion_record:
  result: "technical-analysis-completed-approved-for-asset-intake"
  files:
    - "planos/004-ambientacao-VN/analise/technical-analysis.md"
  validators:
    - "Markdown section and coverage validation"
    - "11/11 dialogue matrix coverage"
    - "B01-B11 plus choice and Name Input staging coverage"
    - "RQ-S01-RQ-S12 and RQ-P01-RQ-P09 specification coverage"
  gates:
    - "DG-NAMING resolved by human-decision"
    - "DG-CONFIRM-NAME resolved by human-decision"
    - "DG-CREATIVE-PACK resolved by human-decision"
    - "DG-ASSETS validate-later — sole active gate"
    - "DG-RUNTIME human-validation-later — inactive until implementation"
  runtime_changed: false
  assets_changed: false
  human_validation: "pending"
  next_destination: "asset availability and local RQ-S07 verification"
  execution_evidence: "orchestrator-owned"
```

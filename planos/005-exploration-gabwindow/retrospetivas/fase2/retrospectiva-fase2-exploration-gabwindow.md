---
title: "Retrospectiva técnica — diálogos de exploração com Gab Window"
type: loki-technical-retrospective
doc_id: "retrospectiva-exploration-gabwindow-fase2"
version: "1.0.0"
status: completed
created: "2026-08-04"
last_updated: "2026-08-04"
scope: "Plano 005, sua implementação inicial e a continuação corretiva feedback-gabwindow"
not_scope: "Promoção de regras, alterações adicionais em runtime, editor round-trip retroativo e outros mapas"
authority: "Tasks concluídas, evidências persistidas, decisões humanas e Playtest confirmado"
canonical_source: "planos/005-exploration-gabwindow/retrospetivas/fase2/retrospectiva-fase2-exploration-gabwindow.md"
intended_llm_task: "retrospective"
confidence: high
---

# loki-retrospectiva-tecnica — Resultado

## Status

`completed`

## Resumo

O plano 005 estabeleceu o Gab Window como padrão para falas em mapas de
exploração e converteu os blocos de texto dos mapas `EX_Coreto` e
`EX_Casa da Família Forjaprata`. A implementação inicial passou na validação
estática, mas o primeiro Playtest revelou quatro problemas perceptíveis: demora
para a interação aparecer enquanto havia outros Gabs, supressão ao interagir
novamente, posição baixa sobre o personagem e texto preto com borda.

O escopo foi então estendido pelo subplano `feedback-gabwindow/`. A continuação
fez interações substituírem a fila e ignorarem Anti-Repeat, preservou a ordem
interna das conversas e os Gabs automáticos, adicionou posicionamento acima do
sprite com gap configurável e isolou o estilo branco sem outline em
`Window_Gab`. As validações estáticas finais passaram e o usuário confirmou o
Playtest New Game em 2026-08-04. O editor round-trip prescrito não possui
registro separado; essa lacuna documental não invalida o encerramento humano,
mas limita a evidência disponível para uma futura auditoria de serialização.

## Artefatos

### Criados ou alterados na implementação inicial

- `frontend/data/Map022.json`: dois blocos `Show Text` convertidos em
  `GabTextOnly`, além dos Gabs que já existiam no mapa.
- `frontend/data/Map045.json`: 27 blocos `Show Text` convertidos em
  `GabTextOnly`.
- `docs/architecture/exploration-dialogue-gabwindow.md`: regra arquitetural
  para falas de exploração.
- `docs/index.xml`: entrada navegável da diretriz.
- `builds/fase2/static-validation.md`: evidência estática da conversão inicial.

### Criados ou alterados pela continuação corretiva

- `frontend/data/Map022.json` e `frontend/data/Map045.json`: prioridade e
  repetição aplicadas aos Gabs de interação selecionados.
- `frontend/js/plugins/Coreto_GabWindowDefaults.js`: helper exclusivo para
  posição e estilo de `Window_Gab`.
- `frontend/js/plugins.js`: ativação única do helper imediatamente depois de
  `VisuMZ_4_GabWindow`, com `MapTargetGap=8`.
- `docs/architecture/exploration-dialogue-gabwindow.md` e `docs/index.xml`:
  política de prioridade, repetição, automáticos, ancoragem e estilo.
- `feedback-gabwindow/builds/fase1/runtime-validation.md` e
  `feedback-gabwindow/builds/fase1/docs-validation.md`: evidências finais de
  runtime estático e documentação.
- `feedback-gabwindow/builds/fase1/apply-gab-feedback.js` e
  `feedback-gabwindow/builds/fase1/activate-gab-helper.js`: scripts
  determinísticos usados para aplicar as mudanças estruturadas.

### Consultados ou preservados

- `frontend/js/plugins/VisuMZ_4_GabWindow.js` e os contratos do RPG Maker MZ
  foram consultados para localizar fila, força, Anti-Repeat, ancoragem e
  herança visual.
- Gabs `Parallel` do Map022 e `Autorun` do Map045 foram preservados sem força e
  sem bypass.
- Plugin vendor, engine, outras janelas, conteúdo narrativo, outros mapas e
  saves permaneceram fora do envelope autorizado.

### Substituídos

- Os 29 blocos convencionais `101/401` em escopo foram substituídos por
  `GabTextOnly`.
- A configuração inicial baseada apenas na fila e no Anti-Repeat globais foi
  complementada pela política explícita do subplano para interações.

## Evidências e validadores

- Conversão inicial: `Map022.json` e `Map045.json` passaram no parse JSON; os
  dois e os 27 blocos originais ficaram com zero `Show Text` remanescente no
  escopo; os textos foram encontrados nos payloads `Text:json`; cada Gab
  preservou três continuidades `657`.
- A validação inicial confirmou texto sem rosto/nome, `ForceGab=false`, XML
  válido, diretriz localizável no índice e `git diff --check` sem erro de
  whitespace.
- Correção: o inventário final registrou exatamente 25 payloads de interação
  com `BypassAntiRepeat=true`, 13 entradas com `ForceGab=true` e 16 Gabs
  automáticos sem força/bypass.
- `Coreto_GabWindowDefaults.js` passou em `node --check` e a evidência registra
  escopo exclusivo a `Window_Gab`.
- `plugins.js` passou no validador de envelope; o helper ficou ativo uma vez,
  imediatamente após `VisuMZ_4_GabWindow`.
- A diretriz e o índice passaram no parse XML, na conferência de âncoras e em
  `git diff --check`.
- Validação humana: o usuário confirmou que o Playtest New Game ficou correto
  em 2026-08-04.
- Não registrado separadamente: abrir, salvar, fechar e reabrir mapas e Plugin
  Manager no editor. Não há evidência para declarar esse round-trip aprovado.

## Decisões humanas

- Usar `GabTextOnly`, somente texto, sem rosto nem nome de falante.
- Continuar o evento imediatamente depois de disparar o Gab.
- Em interações, substituir outros Gabs visíveis ou enfileirados para a fala
  aparecer imediatamente.
- Permitir que a mesma fala reapareça em toda nova interação.
- Manter Gabs automáticos sem preempção indevida.
- Posicionar o Gab acima do NPC com maior distância vertical, como padrão.
- Usar letras brancas e sem borda em todos os Gabs, sem afetar outras janelas.
- Tratar `feedback-gabwindow/` como continuação do plano original e encerrar os
  dois juntos após a confirmação do Playtest.

## Rastro operacional material

1. A demanda e a análise inicial inventariaram dois blocos convencionais no
   Map022, 27 no Map045 e 12 Gabs preexistentes no Map022.
2. Os 29 blocos em escopo foram convertidos para `GabTextOnly`, preservando
   texto, gatilhos, condições, indentação e comandos adjacentes.
3. A validação estática aprovou estrutura e documentação e encaminhou fila,
   reentrada, posição e legibilidade ao Playtest humano.
4. O Playtest revelou os quatro problemas perceptíveis e originou a demanda e
   a análise técnica em `feedback-gabwindow/`.
5. A análise corretiva separou 25 Gabs de interação, 13 pontos de entrada que
   poderiam limpar a fila e 16 Gabs automáticos que deveriam permanecer sem
   força/bypass.
6. Os payloads foram atualizados, o helper foi criado e ativado depois do
   GabWindow, e a regra arquitetural foi atualizada.
7. Os validadores estáticos passaram e o usuário confirmou o Playtest final.
8. O plano original foi encerrado com uma seção que aponta explicitamente para
   o subplano corretivo como sua continuação.

### Scripts, comandos e validators

| Artefato ou comando | Objetivo e entrada | Esperado | Observado | Utilidade e reuso |
| --- | --- | --- | --- | --- |
| `apply-gab-feedback.js` | Alterar os payloads enumerados de Map022/Map045 | Aplicar bypass a 25 interações, força somente a 13 entradas e preservar `357/657` | O inventário persistido confirmou 25/13/16 e parse dos mapas | Reutilizável para reaplicar a transformação enquanto eventos, páginas e índices permanecerem iguais; deve falhar se a forma esperada mudar. |
| `activate-gab-helper.js` | Inserir o helper no envelope de `plugins.js` | Uma ativação imediatamente após GabWindow com gap 8 | Validador de envelope e inspeção de ordem passaram | Reutilizável apenas com preflight de ausência do helper e envelope compatível. |
| `node --check Coreto_GabWindowDefaults.js` | Validar sintaxe do helper | Exit sem erro | Aprovado | Check mínimo após qualquer alteração no helper. |
| `validate_plugins_js_envelope.py` | Validar a serialização do Plugin Manager | Envelope estrutural válido | Aprovado | Rodar antes de extrair ou comparar a ordem de plugins. |
| Parse JSON/XML e inventário estruturado | Detectar corrupção e divergência de comandos/payloads | Mapas e índice parseáveis, contagens exatas e âncoras presentes | Aprovado nas evidências inicial e corretiva | Manter antes do Playtest e após qualquer round-trip do editor. |
| `git diff --check` | Detectar whitespace inválido | Exit sem erro | Exit aprovado; avisos LF/CRLF foram informativos | Avaliar exit code separadamente dos avisos de normalização. |

## Atritos de execução

### 1. `user-correction`

- **Category:** `user-correction`.
- **What Happened:** a primeira implementação estava estruturalmente correta,
  mas o Playtest revelou demora, Anti-Repeat indesejado, sobreposição com o
  personagem e estilo visual inadequado.
- **Expected Behavior:** Gab responsivo, repetível, acima do NPC e legível.
- **Actual Behavior:** interações podiam esperar a fila, não reapareciam, a
  janela ficava baixa e o texto herdava preto com borda.
- **Context:** a primeira entrega manteve `ForceGab=false`, configuração global
  de Anti-Repeat e apresentação herdada do plugin.
- **Evidence:** `builds/fase2/static-validation.md`, demanda/análise de
  `feedback-gabwindow/` e confirmação humana final.
- **Cause:** confirmada quanto aos mecanismos locais; os efeitos perceptíveis
  dependiam do Playtest e não eram cobertos pelos validadores estáticos.
- **Resolution Or Outcome:** subplano corretivo implementado, validado
  estaticamente e aprovado em Playtest.
- **Was Useful:** sim; converteu observações perceptíveis em política explícita
  e reutilizável para interações e automáticos.
- **Waste Impact:** `medium`.
- **Reuse Guidance:** resolver fila, repetição, ancoragem e estilo junto com a
  escolha do comando Gab, não como detalhes visuais posteriores.
- **Avoid Next Time:** incluir representantes concorrentes, reinteração e
  sprites de alturas distintas no primeiro Playtest da conversão.
- **Minimum Next Step:** classificar cada Gab como interação, entrada de
  sequência ou automático antes da edição.

### 2. `validation-friction` / `safety-gate-friction`

- **Category:** `validation-friction` e `safety-gate-friction`.
- **What Happened:** editor round-trip e Playtest foram prescritos; apenas o
  Playtest possui confirmação humana persistida.
- **Expected Behavior:** registrar separadamente os resultados do editor e do
  runtime antes do encerramento.
- **Actual Behavior:** o plano foi encerrado por aprovação explícita do
  comportamento em jogo, sem evidência separada do round-trip.
- **Context:** mapas e `plugins.js` são superfícies serializadas pelo editor.
- **Evidence:** seções de gate em `feedback-gabwindow/tasks.md` e tasks 1.1/1.2.
- **Cause:** desconhecida; as fontes apenas registram a ausência.
- **Resolution Or Outcome:** fechamento humano preservado com limitação
  explícita nesta retrospectiva.
- **Was Useful:** parcialmente; o Playtest validou o resultado perceptível, mas
  a prova de estabilidade de serialização ficou incompleta.
- **Waste Impact:** `low`.
- **Reuse Guidance:** persistir editor round-trip e Playtest como dois gates
  distintos.
- **Avoid Next Time:** não condensar as duas evidências em uma única aprovação.
- **Minimum Next Step:** após o próximo round-trip, repetir parse, envelope,
  ordem e inventário antes do Playtest.

### 3. `state-friction` / `source-friction`

- **Category:** `state-friction` e `source-friction`.
- **What Happened:** o frontmatter e as tabelas do plano original estão
  `completed`, e a continuação aponta ao subplano aprovado, mas o bloco antigo
  `Resume State` ainda diz `pending-human-validation`.
- **Expected Behavior:** status terminal e resume state concordarem.
- **Actual Behavior:** uma próxima LLM pode interpretar o gate como pendente se
  ler apenas o bloco antigo.
- **Context:** o plano foi estendido por um subplano depois do primeiro
  Playtest.
- **Evidence:** `tasks.md#continuação-e-encerramento` e
  `feedback-gabwindow/tasks.md#gate-humano`.
- **Cause:** provável — o encerramento atualizou o status e a seção de
  continuação sem reconciliar o snapshot anterior.
- **Resolution Or Outcome:** esta retrospectiva define o subplano e a decisão
  humana final como autoridade terminal, sem reescrever evidência histórica.
- **Was Useful:** não.
- **Waste Impact:** `low`.
- **Reuse Guidance:** ao fechar um plano estendido, reconciliar frontmatter,
  tabelas, gates e resume state em conjunto.
- **Avoid Next Time:** não deixar snapshots transitórios como instrução ativa.
- **Minimum Next Step:** verificar todos os campos `status`, `next_action` e
  `human_gate` antes do encerramento.

### 4. `format-friction`

- **Category:** `format-friction`.
- **What Happened:** `git diff --check` emitiu avisos de futura normalização
  LF/CRLF, embora não houvesse erro estrutural.
- **Expected Behavior:** check silencioso quando não há falha material.
- **Actual Behavior:** exit aprovado com ruído informativo.
- **Context:** working copy Windows e arquivos JSON/JS/Markdown.
- **Evidence:** `builds/fase2/static-validation.md`.
- **Cause:** provável — política de EOL do repositório e da working copy.
- **Resolution Or Outcome:** avisos classificados corretamente como não
  bloqueantes.
- **Was Useful:** parcialmente.
- **Waste Impact:** `low`.
- **Reuse Guidance:** separar exit code, erro de whitespace e aviso de EOL.
- **Avoid Next Time:** não reportar LF/CRLF como falha funcional.
- **Minimum Next Step:** preservar o estilo do arquivo e revisar o diff real.

### 5. `handoff-friction`

- **Category:** `handoff-friction`.
- **What Happened:** o Write Agent acionado para materializar esta
  retrospectiva permaneceu em execução sem criar o target após checkpoints e
  foi interrompido.
- **Expected Behavior:** produzir um único Markdown e um completion record.
- **Actual Behavior:** nenhum arquivo foi criado pelo handoff.
- **Context:** escrita documental transitória desta retrospectiva.
- **Evidence:** target ausente antes da interrupção e status do agente ainda
  `running` nos checkpoints.
- **Cause:** desconhecida; não foi inferida a partir do silêncio.
- **Resolution Or Outcome:** o orquestrador assumiu escrita direta limitada ao
  target exato e executou os validadores finais.
- **Was Useful:** não.
- **Waste Impact:** `low`.
- **Reuse Guidance:** fornecer o pacote mínimo de fontes e confirmar a criação
  do target no primeiro checkpoint.
- **Avoid Next Time:** não manter um handoff aberto quando não há artefato ou
  progresso observável.
- **Minimum Next Step:** interromper sem write concorrente e reassumir o mesmo
  envelope restrito.

## Caminho mínimo recomendado

1. Inventariar falas por mapa, evento, página, trigger e posição na sequência.
2. Classificar cada Gab como entrada de interação, continuação da mesma conversa
   ou automático `Parallel`/`Autorun`.
3. Definir no mesmo preflight: política de fila, repetição, ancoragem, gap e
   estilo exclusivo do Gab.
4. Converter os comandos por edição estruturada, preservando `357/657`, texto,
   indentação, ramos e efeitos adjacentes.
5. Aplicar `ForceGab` somente nas entradas aprovadas, bypass em todos os Gabs
   interativos e nenhuma dessas opções nos automáticos.
6. Validar parse, payloads aninhados, contagens, sintaxe do helper, envelope,
   ordem, XML e diff.
7. Fazer e registrar o editor round-trip; repetir os validadores sobre os bytes
   salvos pelo editor.
8. Fazer Playtest New Game com concorrência, reinteração, sequências, sprites
   distintos e comparação com outras janelas; persistir a decisão humana.
9. Reconciliar plano original, subplano, gates e resume state no encerramento.

## Aprendizados e candidatos

### Aprendizados validados

- Conversão estrutural de `Show Text` para `GabTextOnly` não prova prioridade,
  repetição, posição ou legibilidade; esses comportamentos precisam de
  Playtest representativo.
- Em conversas com múltiplos Gabs, forçar apenas a entrada preserva a sequência;
  forçar cada fala apagaria a própria fila da conversa.
- Separar interações de automáticos permite priorizar input do jogador sem
  transformar `Parallel` e `Autorun` em interrupções.
- Um helper carregado depois do plugin vendor permite isolar posição e estilo
  em `Window_Gab`, preservando engine e outras janelas.
- O subplano de feedback deve ser lido como parte do resultado terminal do
  plano 005, não como uma demanda independente.

### Hipóteses não promovidas

- Um validator automatizado que derive entradas, sequências e automáticos a
  partir dos eventos pode reduzir dependência de índices manuais; precisa ser
  testado em outros mapas antes de virar padrão.
- Um registro obrigatório e separado para editor round-trip pode reduzir
  divergências de estado no encerramento; requer avaliação em outros planos.

### Preferências humanas registradas

- Interações substituem outras mensagens, reaparecem sempre e usam Gab acima do
  NPC com maior distância vertical.
- O padrão visual dos Gabs é branco sem borda.

### Candidato comum para melhoria contínua

- Avaliar um checklist de implementação de Gab que cubra classificação de
  entrada/continuação/automático, fila, Anti-Repeat, ancoragem, estilo, editor
  round-trip e Playtest. Isto é uma proposta baseada neste caso, não uma
  promoção de política.

### Candidatos especializados de inferência

```yaml
analytic_inference_candidates: []
analytic_inference_candidates_empty_reason: "O plano contém correção humana material, mas não há capture_id e lineage persistidos suficientes para caracterizar uma inferência observável e emitir candidato schema v1 sem fabricação."
```

- **Validação dos candidatos:** nenhum candidato especializado emitido.
- **Lineage indisponível:** não existe captura persistida que ligue uma
  inferência específica a `task_id`, `agent_run_id`, `handoff_id` e
  `evidence_id` observáveis.
- **Consumer/state root provenance:** indisponível para candidato; não foi
  resolvida ou fabricada nesta retrospectiva.
- **Gates para avaliação downstream:** revisão e aprovação explícita pelo
  `loki-continuous-improvement`, caso o candidato comum seja encaminhado.
- **Catálogo escrito/promovido/pontuado/reorganizado/purgado:** `false`.
- **Route permitido:** `loki-continuous-improvement` para avaliação; nenhuma
  promoção automática.

## Handoffs, gates e approvals

- Tasks de conversão inicial, validação estática, correção de runtime e
  documentação: concluídas segundo seus estados e evidências persistidos.
- Playtest New Game: aprovado pelo usuário em 2026-08-04.
- Editor round-trip: sem registro separado; mantido como limitação de evidência,
  não como afirmação de aprovação.
- Write Agent desta retrospectiva: interrompido sem write; escrita direta do
  orquestrador limitada ao target autorizado.
- Promoção de aprendizado ou mutação de catálogo: não autorizada e não feita.

## Riscos ou blockers

- Não há blocker para o comportamento aprovado e para o encerramento do plano.
- A ausência de evidência separada do editor round-trip reduz a auditabilidade
  da estabilidade de serialização de mapas e `plugins.js`.
- O helper depende dos métodos observados em `Window_Gab` e da ordem posterior
  a `VisuMZ_4_GabWindow`; uma atualização do plugin exige nova validação.
- O plano original conserva um resume state histórico desatualizado; retomadas
  devem usar esta retrospectiva e o gate humano do subplano como estado final.
- A regra vale para mapas futuros, mas sua aplicação fora dos mapas 022 e 045
  exige inventário e validação próprios.

## Próximos passos

1. Nenhuma ação adicional é necessária para encerrar o plano 005 aprovado.
2. Opcional: registrar um editor round-trip futuro e repetir os validadores de
   parse, envelope, ordem e inventário.
3. Opcional: executar `loki-continuous-improvement` para avaliar o checklist
   candidato; owner esperado: orquestrador de melhoria contínua com approval.
4. Em novos mapas de exploração, consultar
   `docs/architecture/exploration-dialogue-gabwindow.md` e repetir a escada de
   validação completa.

## Resume state

```yaml
retrospective_state:
  status: completed
  scope: "planos/005-exploration-gabwindow"
  target: "planos/005-exploration-gabwindow/retrospetivas/fase2/retrospectiva-fase2-exploration-gabwindow.md"
  final_feature_status: completed
  continuation: "planos/005-exploration-gabwindow/feedback-gabwindow"
  authoritative_static_evidence:
    - "planos/005-exploration-gabwindow/builds/fase2/static-validation.md"
    - "planos/005-exploration-gabwindow/feedback-gabwindow/builds/fase1/runtime-validation.md"
    - "planos/005-exploration-gabwindow/feedback-gabwindow/builds/fase1/docs-validation.md"
  human_validation: passed
  human_validation_date: "2026-08-04"
  editor_round_trip: not-registered-separately
  final_inventory:
    interaction_bypass: 25
    forced_entries: 13
    automatic_preserved: 16
  residual_risks:
    - "editor round-trip sem evidência separada"
    - "helper deve ser revalidado após atualização do GabWindow"
    - "resume state antigo do plano original permanece desatualizado"
  analytic_inference_candidates: []
  catalog_mutation_applied: false
  next_action: "none required; optional editor evidence or continuous-improvement evaluation"
```

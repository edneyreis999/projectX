# Ajustes de prioridade, repetição, posição e estilo do Gab Window

## Resumo da demanda enriquecida

Corrigir a experiência dos Gabs nos mapas `EX_Coreto` e `EX_Casa da Família Forjaprata`: interações do jogador devem aparecer imediatamente, voltar a aparecer em novas interações, ficar acima do NPC com maior afastamento vertical e usar texto branco sem borda como padrão global do Gab Window.

## Intenção original

> No mapa do Coreto, o Gab demora muito para aparecer. Em ambos os mapas o Gab não aparece ao interagir novamente com o evento. O Gab aparece muito abaixo, em cima do personagem que fala. As letras devem ser brancas e sem borda, como padrão.

## Objetivo e resultado esperado

Entregar Gabs legíveis e responsivos: uma interação do jogador substitui Gabs que já estejam em fila e aparece de imediato; a mesma interação pode ser repetida; a fala permanece visivelmente acima do NPC; e o texto do Gab passa a usar branco sem outline em todo o jogo.

## Contexto observado

- Os mapas de aplicação inicial são `EX_Coreto` (`frontend/data/Map022.json`) e `EX_Casa da Família Forjaprata` (`frontend/data/Map045.json`). [source: `planos/005-exploration-gabwindow/technical-analysis.md`]
- O plugin `VisuMZ_4_GabWindow` está ativo. [source: `frontend/js/plugins.js`]
- Os Gabs convertidos usam `ForceGab:false`; quando há mensagens paralelas na fila, uma interação espera a fila terminar. [source: feedback humano; `frontend/data/Map022.json`]
- O Anti-Repeat está ativo e o plugin expõe `BypassAntiRepeat` por comando. [source: `frontend/js/plugins.js`; `frontend/js/plugins/VisuMZ_4_GabWindow.js`]
- Gabs ancorados por `EventID` ficam posicionados em relação ao evento; `YLocation` não substitui essa ancoragem. [source: `frontend/js/plugins/VisuMZ_4_GabWindow.js`]
- A aparência de texto do Gab é herdada da janela base; o plugin instalado não expõe parâmetro próprio de cor e outline do texto. [source: `frontend/js/plugins/VisuMZ_4_GabWindow.js`; `frontend/js/rmmz_windows.js`]

## Escopo

Incluído:

- Adequar as falas de interação nos mapas 22 e 45 para substituir a fila e reaparecer em cada nova interação.
- Preservar o comportamento enfileirado das falas Parallel e Autorun, salvo decisão técnica justificada pelo fluxo específico.
- Aumentar globalmente o afastamento vertical dos Gabs ancorados em NPCs.
- Aplicar globalmente texto branco sem borda aos Gabs.
- Atualizar a diretriz de arquitetura e a documentação técnica afetada para registrar a política de prioridade, repetição, posição e estilo.

Excluído:

- Alterar o conteúdo textual, condições, efeitos funcionais ou gatilhos narrativos dos eventos.
- Alterar diálogos de batalha, menus ou a aparência de outras janelas do RPG Maker MZ.

## Mandato para o próximo executor

Identificar os Gabs disparados por interação/toque nos dois mapas e configurá-los para prioridade e repetição, sem transformar mensagens automáticas em interrupções indevidas. Definir a extensão técnica mínima e compatível com a instalação VisuStella para controlar o deslocamento vertical e o estilo exclusivo de `Window_Gab`, evitando editar o plugin de terceiros quando uma extensão customizada for suficiente. Atualizar a diretriz duradoura e validar a experiência no editor e em Playtest.

## Requisitos

1. Uma fala disparada por interação do jogador deve substituir Gabs já exibidos ou enfileirados e aparecer imediatamente.
2. A mesma fala de interação deve reaparecer quando o jogador interagir novamente com o evento.
3. Falas Parallel e Autorun não devem interromper uma interação do jogador por padrão.
4. Gabs ancorados a NPCs devem aparecer acima deles, com distância vertical suficiente para não cobrir personagem ou sprite.
5. O texto de todos os Gabs deve ser branco e sem borda/outline, como padrão global do Gab Window.
6. A correção não deve alterar texto, gatilhos, condições, switches, variáveis, transferências ou demais efeitos dos eventos, além da configuração de apresentação necessária.
7. A regra arquitetural de diálogos de exploração deve refletir as novas convenções aplicáveis.

## Restrições

- Priorizar `VisuMZ_4_GabWindow` e capacidades já instaladas. [source: `AGENTS.md`; `frontend/js/plugins.js`]
- Não editar diretamente o plugin de terceiros se uma extensão customizada carregada posteriormente atender ao requisito. [inference: reduz risco de perda em atualizações e preserva o plugin instalado]
- Manter o estilo branco sem borda limitado ao Gab Window; outras janelas não entram no escopo.
- Não usar prioridade forçada em mensagens automáticas sem validação específica de fluxo.

## Critérios de aceite

- Ao interagir com NPC/evento nos mapas 22 e 45 enquanto há Gabs paralelos em fila, a fala da interação aparece imediatamente e substitui a fila anterior.
- A mesma interação exibe seu Gab em todas as repetições verificadas.
- Gabs automáticos não suprimem nem sobrepõem indevidamente a interação priorizada.
- Nenhum Gab ancorado em NPC cobre o personagem em cenários representativos dos dois mapas.
- O texto dos Gabs é branco e não apresenta outline visível; outras janelas não sofrem mudança de estilo.
- JSON, plugin/configuração e documentação alterados passam nos validators estruturais; a experiência é aprovada em Playtest humano.

## Validators

- Inventário estruturado dos comandos Gab para confirmar prioridade/repetição apenas nos gatilhos de interação/toque aprovados.
- Parse JSON dos mapas e diff restrito aos payloads de Gab necessários.
- Validação da extensão/plugin e da ordem de carregamento, se uma nova extensão for criada.
- Teste no editor: abrir, salvar e reabrir o projeto.
- Playtest desde New Game: fila de mensagens, reinteração, posição acima do NPC, legibilidade branca sem borda, Parallel, Autorun, ActionButton e PlayerTouch.

## Premissas reversíveis

- **A-01 — A prioridade de interação será expressa com o mecanismo existente de força do Gab.** Motivo: o plugin diferencia fila de exibição forçada. Reversão: se o mecanismo limpar mensagens críticas de um fluxo, limitar a prioridade a uma categoria de gatilho ou definir alternativa técnica. Validador: Playtest de fila e reentrada.
- **A-02 — O deslocamento e o estilo podem ser corrigidos sem alterar o plugin de terceiros.** Motivo: a personalização pode ser isolada em extensão carregada depois do plugin. Reversão: se a extensão não for compatível, submeter a alternativa a análise técnica. Validador: inspeção de ordem de plugins e Playtest visual.

## Itens a validar depois

- **V-01 — Escopo exato de Gabs que recebem prioridade/repetição.** Owner: próximo executor. Momento: antes de editar payloads. Evidência esperada: inventário por evento, página e trigger nos mapas 22 e 45.
- **V-02 — Valor de afastamento vertical.** Owner: próximo executor. Momento: durante a configuração. Evidência esperada: Playtest em NPCs de alturas e posições diferentes, sem sobreposição.
- **V-03 — Compatibilidade da extensão de estilo.** Owner: próximo executor. Momento: antes da ativação. Evidência esperada: ordem de carregamento válida, sem afetar outras janelas.

## Riscos e mitigação esperada

- Forçar uma interação pode descartar Gabs informativos ainda relevantes; mitigar aplicando a prioridade apenas às interações aprovadas e exercitando fluxos concorrentes.
- O ajuste de deslocamento pode sair da tela em NPCs altos/próximos ao topo; mitigar testando posições limítrofes.
- Uma alteração global de texto pode vazar para janelas não-Gab; mitigar limitando a customização a `Window_Gab` e comparando outras janelas no Playtest.

## Referências e provenance

- [source] Feedback humano desta conversa.
- [source] `planos/005-exploration-gabwindow/technical-analysis.md`.
- [source] `docs/architecture/exploration-dialogue-gabwindow.md`.
- [source] `frontend/data/Map022.json` e `frontend/data/Map045.json`.
- [source] `frontend/js/plugins.js` e `frontend/js/plugins/VisuMZ_4_GabWindow.js`.
- [source] `frontend/js/rmmz_windows.js`.

## Few-shots

Nenhum incluído: não foi aprovado um exemplo equivalente que cubra simultaneamente prioridade, repetição, ancoragem e estilo.

## Matriz de cobertura da intenção original

| ID original | Resumo fiel | Destino nesta demanda | Status | Evidência |
| --- | --- | --- | --- | --- |
| F-01 | Gab do Coreto demora a aparecer | Objetivo; Requisito 1; Critério de aceite 1 | clarified-by-human | Feedback humano: interação substitui a fila |
| F-02 | Gab não reaparece ao interagir novamente | Objetivo; Requisito 2; Critério de aceite 2 | preserved | Feedback humano |
| F-03 | Gab cobre o personagem | Objetivo; Requisito 4; Critério de aceite 4 | clarified-by-human | Feedback humano: acima do NPC com maior distância |
| F-04 | Letras brancas sem borda | Objetivo; Requisito 5; Critério de aceite 5 | clarified-by-human | Feedback humano: padrão global |

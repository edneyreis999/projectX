# Plano 005 — Padronização de diálogos de exploração com Gab Window

## Resumo da demanda enriquecida

Estabelecer o **Gab Window** como padrão arquitetural para falas exibidas durante a exploração e aplicar esse padrão aos mapas `EX_Coreto` e `EX_Casa da Família Forjaprata`. O resultado esperado é que as falas de NPCs, as falas apresentadas ao jogador ao interagir com eventos e as falas disparadas automaticamente durante a exploração nesses mapas sejam exibidas por Gab Window, com a diretriz documentada para uso em mapas futuros.

## Intenção original

> Adicionar como regra de arquitetura e aplicar nos mapas Ex_Coreto e Ex_Casa Forjaprata que todas as falas de NPCs, ou do jogador ao interagir com o evento, quando ocorrerem em um mapa de exploração, serão feitas com Gab Window.

## Objetivo e resultado esperado

Definir uma diretriz reutilizável para diálogos em mapas de exploração e adequar os eventos de texto dentro do escopo inicial. Ao final, os dois mapas-alvo seguem a mesma convenção de apresentação para as falas de exploração contempladas por esta demanda.

## Contexto observado

- O projeto é um RPG Maker MZ que utiliza plugins VisuStella e plugins customizados.
- O plugin `VisuMZ_4_GabWindow` está ativo na configuração do projeto. [source: `frontend/js/plugins.js`, ocorrência de `VisuMZ_4_GabWindow`]
- Os mapas registrados no projeto são `EX_Coreto` (ID 22) e `EX_Casa da Família Forjaprata` (ID 45). [source: `frontend/data/MapInfos.json`]
- Há uso existente de comandos associados a `VisuMZ_4_GabWindow` no mapa de ID 22, o que constitui referência local de uso, não uma prescrição de como implementar os demais eventos. [source: `frontend/data/Map022.json`]

## Escopo

Incluído:

- Formalizar a regra de arquitetura para falas em mapas de exploração.
- Identificar, nos mapas `EX_Coreto` e `EX_Casa da Família Forjaprata`, eventos que apresentem falas de NPCs, falas do jogador após interação com eventos e falas automáticas de exploração.
- Adequar as falas identificadas para apresentação por Gab Window.
- Registrar a diretriz em documentação duradoura apropriada do projeto, para orientar mapas futuros.

Não foram identificadas exclusões explícitas além do limite aos dois mapas como aplicação inicial. A abrangência de outros contextos deve ser preservada conforme a intenção original: a regra destina-se a falas que ocorram em mapas de exploração.

## Mandato para o próximo executor

Executar a adequação dos eventos de exploração nos dois mapas-alvo e registrar a diretriz arquitetural de modo localizável. O executor deve levantar os eventos de fala efetivamente presentes e manter o conteúdo narrativo, os gatilhos, as condições e os efeitos funcionais de cada evento.

Decisões humanas aprovadas para execução:

- Usar `GabTextOnly`, sem rosto nem nome de falante.
- Após disparar o Gab, o evento segue imediatamente, sem esperar o seu término.
- Criar `docs/architecture/exploration-dialogue-gabwindow.md` e registrá-lo em `docs/index.xml`.

## Requisitos

1. Estabelecer a regra de arquitetura: falas exibidas durante a exploração devem utilizar Gab Window.
2. Aplicar a regra às falas de NPCs no mapa `EX_Coreto`.
3. Aplicar a regra às falas exibidas ao jogador pela interação com eventos no mapa `EX_Coreto`.
4. Aplicar a regra às falas automáticas de exploração no mapa `EX_Coreto`, se existirem.
5. Aplicar os mesmos tipos de fala ao mapa `EX_Casa da Família Forjaprata`.
6. Preservar o texto, as condições, as consequências e a progressão narrativa/funcional dos eventos, exceto pela mudança de apresentação necessária para usar Gab Window. [inference: a conversão de apresentação não deve alterar o comportamento do evento]
7. Tornar a diretriz recuperável para a criação e revisão de futuros mapas de exploração.

## Restrições

- Priorizar a capacidade já instalada `VisuMZ_4_GabWindow` para atender à demanda. [source: `frontend/js/plugins.js`]
- O escopo de aplicação inicial limita-se aos mapas `EX_Coreto` e `EX_Casa da Família Forjaprata`.
- Não há autorização implícita para alterar falas de batalha, menus ou outros contextos que não sejam mapas de exploração.
- Não criar regra técnica nova quando a configuração já disponível do Gab Window for suficiente. [inference: consistente com a preferência do projeto por recursos VisuStella/Coreto]
- Não alterar parâmetros globais, código ou ativação do plugin para atender a esta demanda.
- Usar somente texto, sem rosto nem nome de falante, e manter a continuação imediata do evento após cada Gab.

## Critérios de aceite

- Existe uma diretriz arquitetural explícita e localizável que determine Gab Window como padrão para falas durante a exploração.
- Todas as falas de NPCs encontradas em `EX_Coreto` e `EX_Casa da Família Forjaprata` são exibidas com Gab Window.
- Todas as falas exibidas ao jogador por interação com eventos nesses mapas são apresentadas com Gab Window.
- Todas as falas automáticas de exploração encontradas nesses mapas são apresentadas com Gab Window.
- As falas convertidas usam somente texto e o evento não espera o Gab terminar para prosseguir.
- A conversão não altera textos, gatilhos, condições, switches, variáveis, recompensas, teletransportes ou demais efeitos funcionais dos eventos, exceto onde a adaptação de apresentação exigir mudança equivalente.
- Falas fora do contexto de exploração não são modificadas por esta demanda.

## Validators

- Inspeção dos eventos dos mapas de IDs 22 e 45 para confirmar que cada fala no escopo usa Gab Window.
- Comparação antes/depois dos eventos convertidos para verificar a preservação de texto e fluxo funcional.
- Revisão da documentação criada ou atualizada para confirmar que a regra é explícita, encontrável e aplicável a mapas futuros.
- Teste manual no RPG Maker MZ/runtime dos eventos convertidos, verificando apresentação, disparo e continuidade do fluxo.

## Premissas reversíveis

- **A-01 — Gab Window é aplicável a todas as categorias de fala de exploração citadas.** Motivo: o plugin está ativo e já há uso local no `EX_Coreto`. Reversão: se um tipo de evento não aceitar Gab Window sem perda funcional, registrar a exceção e submeter sua solução a decisão técnica. Validador: inspeção da documentação do plugin e teste do evento representativo.

## Itens a validar depois

- **V-01 — Inventário completo de falas no escopo.** Owner: próximo executor. Momento: antes da conversão. Evidência esperada: lista dos eventos/páginas e comandos de fala identificados em ambos os mapas.
- **V-02 — Local da diretriz arquitetural.** Resolvido: `docs/architecture/exploration-dialogue-gabwindow.md`, catalogado em `docs/index.xml`.
- **V-03 — Tratamento visual padrão.** Resolvido: `GabTextOnly`, sem rosto/nome, com continuação imediata do evento.

## Riscos e mitigação esperada

- Eventos podem conter sequências de comandos além da fala; mitigar inventariando e comparando cada evento antes e depois da conversão.
- Uma fala de exploração pode ter função narrativa diferente de uma fala interativa; mitigar testando representantes de cada categoria.
- A diretriz pode ficar difícil de encontrar; mitigar registrando-a em documentação duradoura já usada para regras de integração ou arquitetura do projeto.

## Referências e provenance

- [source] Intenção fornecida pelo usuário nesta solicitação.
- [source] `frontend/data/MapInfos.json`: identificação dos mapas `EX_Coreto` (22) e `EX_Casa da Família Forjaprata` (45).
- [source] `frontend/js/plugins.js`: ativação de `VisuMZ_4_GabWindow`.
- [source] `frontend/data/Map022.json`: uso local de `VisuMZ_4_GabWindow`.
- [source] `AGENTS.md`: preferência por soluções VisuStella ou Coreto para alterações em `frontend/data`.

## Few-shots

Nenhum incluído: não foi fornecido nem aprovado um exemplo de evento equivalente para servir como referência normativa.

## Matriz de cobertura da intenção original

| ID original | Resumo fiel | Destino nesta demanda | Status | Evidência |
| --- | --- | --- | --- | --- |
| O-01 | Adicionar uma regra de arquitetura para falas em exploração | Objetivo, Escopo, Requisito 1 e Critério de aceite 1 | preserved | Intenção do usuário |
| O-02 | Aplicar a regra em `EX_Coreto` | Escopo; Requisitos 2–4; Critérios de aceite 2–4 | preserved | Intenção do usuário; `MapInfos.json` |
| O-03 | Aplicar a regra em `EX_Casa Forjaprata` | Escopo; Requisito 5; Critérios de aceite 2–4 | preserved | Intenção do usuário; `MapInfos.json` |
| O-04 | Cobrir falas de NPCs | Requisito 2; Critério de aceite 2 | preserved | Intenção do usuário |
| O-05 | Cobrir falas do jogador em interações com eventos | Requisito 3; Critério de aceite 3 | preserved | Intenção do usuário |
| O-06 | Usar Gab Window para falas em mapas de exploração | Resumo, Requisito 1 e Critérios de aceite 2–4 | preserved | Intenção do usuário; `plugins.js` |

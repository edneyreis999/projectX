# Plano de Documentação e Padronização de Plugins de Quests

Modelo de referência: implementação do plugin "Mina de Kravens" (Minerador Aprendiz).

Este plano define o que documentar, por que cada arquivo fica onde fica, como testar corretamente e como padronizar a criação de novos plugins seguindo a mesma arquitetura e práticas adotadas no plugin de Mina de Kravens.

## 1) Objetivos da Documentação

- Descrever a arquitetura em camadas (Plugin/Controller → Use Case → Domain → DTOs) e o fluxo de dados.
- Padronizar a organização de arquivos e a justificativa de diretórios.
- Estabelecer convenções de nomes e estrutura mínima de código/arquivos.
- Definir como escrever e organizar testes (unidade, orquestração e plugin), incluindo mocks do ambiente RPG Maker MZ.
- Documentar parâmetros de plugin, logs/observabilidade e tratamento de erros.
- Fornecer um checklist de “Definition of Done” para novos plugins de quest.

## 2) Arquitetura e Separação de Arquivos (Clean Architecture)

Camadas adotadas (exemplos reais entre parênteses):

- Plugin/Controller (RPG Maker MZ): `frontend/js/plugins/Coreto_Quest_<Nome>.js`
  - Ex.: `frontend/js/plugins/Coreto_Quest_Mina_Kravens.js`
  - Responsável por: parâmetros de plugin, dependências, logger, registro de comandos do RPG Maker, integração com `window.coreto.BaseQuest` e orquestração de alto nível (instancia Use Case e Domain).
  - Justificativa do local: todos os plugins do RPG Maker ficam em `frontend/js/plugins` (convenção do engine + guideline do projeto).

- Application/Use Case: `frontend/js/application/<NomeUseCase>.js`
  - Ex.: `frontend/js/application/MineracaoUseCase.js`
  - Responsável por: orquestrar o domínio com os “services” da engine (`CoretoCore`, `coreto`), ler/escrever variáveis de jogo, adicionar itens no inventário, interpretar o resultado do domínio, logar eventos críticos, e aplicar regras de integração (ex.: ativar boss/rachadura).
  - Justificativa do local: camada de aplicação (coordena serviços externos e regras de integração), separada do domínio puro para testabilidade e reuso.

- Domain (Regra de Negócio Pura): `frontend/js/domain/<NomeDoDominio>.js`
  - Ex.: `frontend/js/domain/MinaKravensDomain.js`
  - Responsável por: regra de negócio determinística (cálculos de chance, estados, decidir “Kraven” vs “Pedra”, ativação de rachadura, fim da quest). Sem acesso a engine. Usa DTOs como contrato de entrada/saída.
  - Justificativa do local: manter a lógica pura, testável e independente de ambiente.

- DTOs (Contratos de Dados): `frontend/js/dto/<NomeDTO>.js`
  - Ex.: `frontend/js/dto/MineracaoRequestDTO.js`, `frontend/js/dto/MineracaoResponseDTO.js`
  - Responsável por: validar forma e tipos dos dados trafegados entre camadas, expor métodos utilitários (`toPlainObject`, fábricas estáticas, `isValid()`), garantir consistência do “shape”.
  - Justificativa do local: contratos reutilizáveis e desacoplados ficam em `dto`.

Compatibilidade de ambiente (Node/Browser) no domínio e use case:

- Padrão UMD simples: exporta via `module.exports` (Node/Jest) e `window.*` (browser/RPG Maker). Isso viabiliza testes Jest sem bundling adicional.

Carregamento dinâmico no Plugin:

- O plugin usa `document.createElement('script')` para carregar primeiro DTOs e depois Domain/UseCase; inicia o controller apenas após dependências carregadas.
- Benefícios: controle explícito de ordem, isolamento de responsabilidades e menor acoplamento do arquivo do plugin.

## 3) Convenções de Nomes e Arquivos

- Plugin: prefixo `Coreto_` e padrão `Coreto_Quest_<Nome>.js`.
- Domain: `<NomeDominio>Domain.js` (ex.: `MinaKravensDomain.js`).
- Use Case: `<NomeCasoDeUso>UseCase.js` (ex.: `MineracaoUseCase.js`).
- DTOs: `<NomeCasoDeUso><Request|Response>DTO.js`.
- Testes:
  - Plugin: `frontend/__tests__/plugins/Coreto_Quest_<Nome>.test.js`.
  - Domain e Use Case: `frontend/__tests__/<Nome>.test.js` (seguir o padrão atual: `MinaKravensDomain.test.js`, `MineracaoUseCase.test.js`).

## 4) Parâmetros, Dependências e Logger

- Parâmetros do plugin: documentar cada `@param` do cabeçalho MZ (IDs de itens e variáveis; valores padrão; quando usar `0` para “desabilitado”, ex.: `idVarPilhasRestantes=0`).
- Dependências exigidas: `Coreto_Core.js` (expondo `window.CoretoCore`) e `Coreto_Quests.js` (expondo `window.coreto.BaseQuest`). O plugin valida essas dependências e aborta com mensagem clara se ausentes.
- Logger: obtido de `CoretoCore.createLogger(pluginName)`; uso de níveis (`info`, `warn`, `error`) e habilitação dinâmica via comando `AlternarLogs`. Documentar também `EnableDebugLogs`/`LogSwitchId` e como consultar logs no console (F8/NW.js).

## 5) Fluxo de Dados (alto nível)

1. Evento chama comando de plugin (ex.: `MinerarPilha`).
2. Controller (plugin) captura `eventId` e delega ao Use Case.
3. Use Case lê variáveis do jogo, constrói `MineracaoRequestDTO` e chama `Domain.executarMineracao(requestDTO)`.
4. Domain retorna `MineracaoResponseDTO` com decisão (“Kraven”/“Pedra”), stats e sinais (rachadura/quest completa).
5. Use Case processa a resposta: adiciona item, atualiza variáveis, ativa rachadura (se aplicável) e loga eventos críticos.
6. Controller encapsula erros com `safeExecute` (de `BaseQuest`) e mantém a interface do plugin robusta.

## 6) Tratamento de Erros e Observabilidade

- Try/catch na borda (plugin/controller e use case) com logs contendo contexto (mensagem, stack, IDs envolvidos).
- Erros críticos são propagados (throw) para não ocultar falhas; proteções locais evitam quebrar o fluxo quando o dado é opcional (ex.: `idVarEstadoBoss` 0).
- Logs “críticos” no Use Case quando `shouldActivateCrack()` ou `isQuestComplete()`; log de chances quando 0%/100% para facilitar diagnóstico.
- Controller expõe comando `AlternarLogs` para togglar logs durante runtime.

## 7) Diretrizes de Testes

Onde ficam:

- Plugin: `frontend/__tests__/plugins/Coreto_Quest_<Nome>.test.js`.
- Domain: `frontend/__tests__/<Dominio>.test.js`.
- Use Case: `frontend/__tests__/<UseCase>.test.js`.

Como testar (padrões observados no plugin):

- Domain (puro):
  - Testar a lógica determinística com `MineracaoRequestDTO`/`MineracaoResponseDTO` reais.
  - Mockar apenas fontes de aleatoriedade (`_gerarNumeroAleatorio`) quando necessário; cobrir cenários de borda e probabilísticos.

- Use Case (orquestração):
  - Mockar `CoretoCore` e `coreto` (serviços externos) e o `Domain`.
  - Verificar leitura/escrita de variáveis, adição de itens, ativação de boss, logs críticos e retorno do tipo correto.
  - Garantir funcionamento com IDs “desabilitados” (0) e com quest completa/rachadura ativa.

- Plugin (RPG Maker MZ):
  - Usar helpers de mock do ambiente (`frontend/__tests__/plugins/utils/test-utils.helper.cjs`).
  - Testar validação de dependências, carregamento dinâmico (DTOs → Domain/UseCase), registro de comandos, captura de `eventId` e toggling de logs.
  - Testar que `safeExecute` é utilizado e que erros são logados com contexto.

Execução:

- Rodar `npm test` (Jest + SWC; cobertura habilitada por padrão).
- Lint/format: `npm run lint` (plugins) e `npm run format`/`npm run format:json` conforme necessário.

Cobertura mínima sugerida:

- Domain: 100% statements/branches das regras essenciais.
- Use Case: 90%+ orquestração (variáveis, itens, logs, rachadura/boss).
- Plugin: 80%+ inicialização, comandos e erros comuns.

## 8) Justificativa dos Diretórios

- `frontend/js/plugins`: integração direta com o RPG Maker MZ (cabeçalho `/*:` e `PluginManager.registerCommand`).
- `frontend/js/application`: casos de uso que coordenam domínio e serviços da engine; isolam efeitos colaterais.
- `frontend/js/domain`: lógica de negócio pura e testável; independência de engine facilita manutenção e reuso.
- `frontend/js/dto`: contratos entre camadas; validações e utilitários para serialização.
- `frontend/__tests__/plugins`: testes que exigem mocks do ambiente de plugin/engine.
- `frontend/__tests__`: testes de unidade/orquestração próximos à feature, com nomes claros.
- `frontend/docs/Quests`: materiais narrativos (NSD) e contexto de design; vincular o plugin à quest correspondente.

## 9) Passo a Passo para Novo Plugin (Blueprint)

0. Reuso e pesquisa prévia
   - Antes de iniciar, analisar `frontend/docs/plugins` para identificar plugins, técnicas, padrões ou métodos já documentados que possam ser reutilizados (ex.: comandos, padrões de logs, mapeamento de IDs, boas práticas de UI/UX). Registre no documento do novo plugin o que foi reutilizado e por quê.

1. Criar Domain: `frontend/js/domain/<NomeDominio>.js`
   - Expor API pura e determinística; aceitar `RequestDTO`, retornar `ResponseDTO`.
   - Implementar “pontos de mock” (ex.: gerador randômico) para testes.

2. Criar DTOs: `frontend/js/dto/<CasoDeUso>RequestDTO.js` e `...ResponseDTO.js`
   - Validar entradas/saídas; adicionar fábricas e utilitários (`toPlainObject`, `fromPlainObject`, `isValid`).

3. Criar Use Case: `frontend/js/application/<CasoDeUso>UseCase.js`
   - Orquestrar Domain + serviços (`CoretoCore`, `coreto`); logar eventos críticos; tratar erros com contexto.
   - Garantir compatibilidade Node/Browser.

4. Criar Plugin/Controller: `frontend/js/plugins/Coreto_Quest_<Nome>.js`
   - Validar dependências (`CoretoCore`, `coreto`); instanciar `Logger` e `BaseQuest`.
   - Carregar DTOs → Domain → UseCase dinamicamente; inicializar controller ao final.
   - Registrar comandos com `PluginManager` e repassar para métodos do controller.

5. Criar Testes:
   - Domain: `frontend/__tests__/<Dominio>.test.js` (cenários de regra e bordas).
   - Use Case: `frontend/__tests__/<UseCase>.test.js` (orquestração e efeitos colaterais).
   - Plugin: `frontend/__tests__/plugins/Coreto_Quest_<Nome>.test.js` (ambiente MZ, comandos, logs, erros).

6. Documentar:
   - Criar um `.md` por plugin em `frontend/docs/plugins/<Nome>.md` (ver Seção 10) e linkar ao NSD da quest.
   - Descrever parâmetros, comandos, variáveis/itens usados e fluxos especiais.

## 10) Estrutura Sugerida de Documento por Plugin

- Visão Geral
  - Objetivo da quest e contexto narrativo (linkar ao NSD em `frontend/docs/Quests/...`).
- Arquitetura
  - Camadas usadas (Plugin/UseCase/Domain/DTOs) e diagrama simples do fluxo.
- Parâmetros do Plugin
  - Tabela com cada parâmetro (`@param`) e seu efeito, defaults e quando usar `0`.
- Comandos do Plugin
  - Nome, assinatura, pré-condições, efeitos e exemplos.
- Regras de Negócio
  - Como as chances são calculadas; condições de “rachadura” e conclusão.
- Integração com Engine
  - Variáveis e itens (IDs) tocados; side-effects (inventário, switches/variáveis).
- Logs e Observabilidade
  - Quando o logger avisa/erra/informa; como habilitar/desabilitar em runtime.
- Erros e Resiliência
  - Estratégia de `try/catch`, contexto nos logs e erros propagados.
- Testes
  - Como rodar (`npm test`); o que está coberto; mocks usados; casos críticos.
- Roadmap/Anexos (opcional)
  - Métricas de cobertura, TODOs, decisões futuras.

## 11) Definition of Done (Checklist)

- Arquitetura
  - [ ] Domain puro com testes abrangentes e pontos de mock.
  - [ ] Use Case orquestra serviços, logs críticos e trata erros.
  - [ ] Plugin valida dependências e registra comandos corretamente.

- Reuso
  - [ ] O diretório `frontend/docs/plugins` foi analisado e padrões/técnicas/métodos aplicáveis foram reaproveitados para evitar retrabalho.

- Parâmetros e Integração
  - [ ] Parâmetros documentados e com defaults coerentes.
  - [ ] IDs opcionais aceitam `0` com comportamento seguro.

- Testes
  - [ ] Domain coberto por cenários principais e de borda.
  - [ ] Use Case cobre leitura/escrita de variáveis, itens e logs.
  - [ ] Plugin cobre inicialização, comandos, alternância de logs e erros comuns.

- Qualidade
  - [ ] `npm run lint` e `npm run lint:check` sem erros.
  - [ ] `npm test` com cobertura mínima sugerida.
  - [ ] Commits no padrão Conventional Commits.

---

Sugestão: criar `frontend/docs/plugins/README.md` para indexar os documentos individuais de cada plugin seguindo esta estrutura.

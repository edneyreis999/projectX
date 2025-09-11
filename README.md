# projectX
My first RPG made using RPG Maker a a

## Estrutura de Plugins (Coreto)

- Plugin/Controller: `frontend/js/plugins/Coreto_Quest_<Nome>.js`
  - Integra com o RPG Maker MZ (PluginManager), valida dependências (`CoretoCore`, `coreto.BaseQuest`), carrega DTOs/Domain/Use Case e registra comandos.

- Use Case (Aplicação): `frontend/js/application/<CasoDeUso>UseCase.js`
  - Orquestra o domínio com serviços da engine (variáveis de jogo, inventário), aplica logs e trata erros.

- Domain (Regra Pura): `frontend/js/domain/<NomeDominio>.js`
  - Lógica determinística e testável, sem acessar a engine. Recebe `RequestDTO` e retorna `ResponseDTO`.

- DTOs (Contratos): `frontend/js/dto/<CasoDeUso>{Request,Response}DTO.js`
  - Validação de dados, utilitários de serialização e fábricas estáticas.

- Testes:
  - Domain/Use Case: `frontend/__tests__/*.test.js`
  - Plugin (ambiente MZ): `frontend/__tests__/plugins/*.test.js`

Referência completa: `frontend/js/PLANO_PADRONIZACAO_PLUGINS.md`.
Antes de iniciar um novo plugin, verifique `frontend/docs/plugins` para reaproveitar técnicas e padrões já documentados.

# <Nome do Plugin> — Documento do Plugin

Preencha este documento ao criar um novo plugin de quest. Consulte o plano: `frontend/js/PLANO_PADRONIZACAO_PLUGINS.md`.

## Visão Geral

- Objetivo do plugin: <descreva o propósito e a relação com a quest>
- Contexto narrativo: <resumo e link para NSD>
- NSD (link): `frontend/docs/Quests/...`

## Reuso (pré-criação)

- Itens reaproveitados de `frontend/docs/plugins`: <liste padrões, técnicas, comandos, mapeamentos, etc.>
- Justificativa do reuso: <por quê faz sentido aqui>

## Arquitetura

- Camadas: Plugin/Controller → Use Case → Domain → DTOs
- Diagrama (texto):
  - Evento → Plugin (commands/params) → Use Case (services/logs) → Domain (regra pura) → Response DTO → Use Case (efeitos/variáveis) → Engine

## Parâmetros do Plugin

- Lista de parâmetros (IDs, variáveis, switches) com defaults e efeito:
  - `@param <Nome>`: <descrição>
  - `@param <Nome>`: <descrição>

## Comandos do Plugin

- `<Comando>`: assinatura, pré-condições, efeitos esperados, exemplos de uso no evento.
- `<Comando>`: assinatura, pré-condições, efeitos esperados, exemplos.

## Regras de Negócio

- Descrever regras, fórmulas, thresholds (ex.: chances, estados, condições de “rachadura”, conclusão da quest).

## Integração com a Engine

- Variáveis/switches tocados (IDs): <listar>
- Itens/recursos adicionados: <listar>
- Efeitos colaterais: <inventário, variáveis, mapas, teleporte, etc.>

## Logs e Observabilidade

- Quando logar `info`, `warn`, `error`.
- Como alternar logs (comandos/switch), como inspecionar via console (NW.js F8).

## Erros e Resiliência

- Pontos de `try/catch` e contexto incluído nos logs (mensagem, stack, IDs).
- Regras para propagar vs. capturar erros e proteger execuções opcionais.

## Testes

- Testes de Domain: cenários principais e de borda; mocks de aleatoriedade.
- Testes de Use Case: orquestração de serviços, variáveis, itens, logs.
- Testes de Plugin: ambiente MZ (mocks), comandos e erros comuns.

## Roadmap/Anexos (opcional)

- TODOs, métricas de cobertura, decisões futuras, screenshots relevantes.

# Domínio: Engenharia de Gameplay

## Estado do inventário

Cobertura estática terminal: mecânicas, estado, callers, save/load e integrações
estão `covered`; superfícies de runtime e fontes estão `mapped`. Nenhuma
afirmação de sucesso em runtime é feita; testes e Playtest não foram executados.

Evidência aceita: packet `gameplay-engineer-001` revisão 1. Classificação:
**estrutura e dados estáticos; execução/persistência pendentes**.

## Inventário factual

- **Mecânicas:** Actors 3–6 usam Foco/Momentum/Guarda/Fúria. Das 258 skills, 43
  usam `Spend TP`, 25 `Gain TP` e 46 `Cast Time`; 20/20 chaves de Common Event
  resolvem. Coreto adiciona mecânicas de TP, cast, bodyguard, block, state, hit,
  trigger e shop. Fontes: `d`, `p`.
- **Estado:** 102 switches, 110 variáveis, self-switches, atores/party,
  skills/states/TP e dados de quests/mineração. Oito Common Events paralelos são
  controlados por switches; Mina liga serviços Coreto a variáveis/itens. Fontes:
  `d`, `p`, `t`.
- **Callers/eventos:** 48 `MapInfos`, 50 mapas e 79 Common Events substantivos
  expõem 316 chamadas de CE e 1.581 comandos de plugin. Sessenta CEs contêm
  Battle Core sequences; CE16 tem 306 callers. CE22 não vinculado carece de
  setup/finish/effect e CE132 carece de Action Effect. Fonte: `d`.
- **Integrações:** 46/63 plugins ativos, 44 nomes únicos, ordenados
  Core→Battle→ATB/TP→Coreto. Entradas PKD/Coreto_TpEvents duplicadas são drift,
  mas nomes são deduplicados pelo PluginManager. Mina tem 33 callers do plugin
  ao domínio TS. Fontes: `p`, `d`, `t`.
- **Risco — save/runtime:** Save Core oferece 20 slots e autosave após
  batalha/transfer/menu. Quatorze saves misturam `V[100]` e nomes legados.
  Testes não executados; projeto 1.10.0 versus runtime 1.8.1. Fontes: `p`, `s`,
  `a`.

## Coverage materializado

| Requisito | Profundidade | Estado | Evidência |
| --- | --- | --- | --- |
| `gameplay-engineer.implemented-mechanics` | `deep` | `covered` | `m` |
| `gameplay-engineer.state` | `deep` | `covered` | `st` |
| `gameplay-engineer.runtime-surfaces` | `map` | `mapped` | `ce` |
| `gameplay-engineer.callers-events` | `deep` | `covered` | `ce` |
| `gameplay-engineer.save-load` | `deep` | `covered` | `sv` |
| `gameplay-engineer.integrations` | `deep` | `covered` | `in` |
| `gameplay-engineer.source-map` | `map` | `mapped` | `a`, `d`, `p`, `t`, `s` |

## Fontes e rastreabilidade

- `a`: packets aceitos
- `d`: `frontend/data/*.json`
- `p`: `plugins.js;rmmz_managers;Coreto_*`
- `t`: MinaKravens TypeScript e testes
- `s`: `frontend/save`

## Próxima validação

Executar Playtest de mecânicas, ordem de plugins, CEs incompletos e callers;
testar criação/restauração de saves e compatibilidade entre versões. Observar o
efeito real de entradas duplicadas antes de tratá-las como falha funcional.

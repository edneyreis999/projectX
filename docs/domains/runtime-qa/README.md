# Domínio: Runtime QA

## Estado do inventário

Cobertura estática terminal para os sete requisitos do domínio: seis estão
`covered` em profundidade `deep` e o mapa de gates humanos está `mapped`.
Este estado descreve superfícies e riscos encontrados em fontes locais; não
certifica execução, percepção, áudio, visual, input, fluxo de quests ou
restauração de saves.

Evidência aceita: packet `runtime-qa-001` revisão 1. Classificação desta página:
**inventário estático; validação humana/runtime pendente**.

## Dentro e fora do escopo

Inclui superfícies perceptíveis, fluxos executáveis, input/áudio/visual,
save/load, integrações, automação existente e gates humanos documentados. Não
inclui executar Playtest, validar comportamento em nome de uma pessoa ou
implementar correções.

## Inventário factual

- **Fato — superfícies:** há 48 mapas e 92 Common Events substantivos, dos
  quais oito são paralelos. Foram mapeadas superfícies de UI, áudio, menus,
  mensagens, ATB e Action Sequences. Fontes: `s`, `e`, `m`, `g`.
- **Risco — integração e save:** 46 das 63 entradas de plugins estão ativas;
  existem 677 comandos de plugin em eventos e entradas duplicadas de
  `PKD_SimpleQuestSystem` e `Coreto_TpEvents`. Saves customizados e legados
  coexistem, sem restauração validada. Fontes: `g`, `e`, `v`.
- **Fato — automação:** 19 arquivos Jest não cobrem UI/input/áudio/save em
  runtime. Os testes não foram executados e o coverage de maio de 2026 é
  histórico. Fonte: `t`.
- **Risco — gates:** permanecem pendentes os gates de runtime, fluxo e
  save/load de quests e Playtest de EXP. Fonte: `d`.

## Escada de validação em três camadas

Valide mudanças de eventos e fluxos nesta ordem, sem pular camadas:

1. Execute checks determinísticos e estáticos sobre dados, referências,
   estrutura, comandos e invariantes conhecidos.
2. Abra o projeto no editor do RPG Maker MZ, salve e reabra para verificar o
   round-trip dos dados editados.
3. Execute um Playtest completo a partir de **New Game**, percorrendo a rota e
   observando reentrada, locks, save/load e comportamento perceptível.

Checks estáticos nunca substituem o round-trip do editor nem a validação em
runtime. Da mesma forma, o editor não comprova a execução completa da rota. Só
o conjunto das três camadas sustenta uma afirmação sobre o fluxo em jogo.

## Coverage materializado

| Requisito | Profundidade | Estado | Limite observado |
| --- | --- | --- | --- |
| `runtime-qa.perceivable-surfaces` | `deep` | `covered` | inventário estático; percepção humana pendente |
| `runtime-qa.executable-flows` | `deep` | `covered` | fluxos mapeados, não executados |
| `runtime-qa.input-audio-visual` | `deep` | `covered` | Playtest pendente |
| `runtime-qa.save-load` | `deep` | `covered` | restauração pendente |
| `runtime-qa.integrations` | `deep` | `covered` | ordem e callers mapeados estaticamente |
| `runtime-qa.validation-state` | `deep` | `covered` | gaps de automação explicitados |
| `runtime-qa.documented-human-gates` | `map` | `mapped` | gates localizados, ainda pendentes |

## Fontes e rastreabilidade

- `p`: `{,frontend/}package.json`
- `t`: `jest.config.ts;frontend/__tests__;coverage`
- `s`: `frontend/data/System.json`
- `e`: `frontend/data/CommonEvents.json`
- `m`: `frontend/data/MapInfos.json`
- `g`: `frontend/js/plugins.js`
- `v`: `frontend/save;frontend/js/rmmz_{managers,scenes}.js`
- `d`: `docs/{project-inventory,technology-context,GDD,Quests}`

Contexto comum: [inventário do projeto](../../project-inventory.md) e
[contexto de tecnologia](../../technology-context.md).

## Próxima validação

Executar Playtest humano de inicialização, input, UI, áudio/visual, batalhas,
fluxos de quests e save/load, incluindo restauração de saves versionados e
legados. Registrar ambiente, passos, resultado observável e evidência antes de
promover qualquer afirmação de comportamento perceptível.

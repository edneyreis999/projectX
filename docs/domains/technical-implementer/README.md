# Domínio: Implementação Técnica

## Estado do inventário

Cobertura estática terminal: arquitetura, entry points, configuração,
dependências e superfícies de build/teste estão `covered`; módulos, scripts e
fontes estão `mapped`. Nenhum build, teste ou Playtest foi executado.

Evidência aceita: packet `technical-implementer-001` revisão 1. Classificação:
**inventário estático; compatibilidade e execução pendentes**.

## Dentro e fora do escopo

Inclui arquitetura híbrida, boot, plugins, módulos TypeScript, ferramentas e
configuração de build/teste. Não inclui corrigir código, instalar dependências,
executar geração destrutiva ou certificar compatibilidade de runtime.

## Inventário factual

- **Fato — arquitetura:** o runtime RPG Maker MZ aninhado coexiste com uma
  fatia TypeScript em `domain`, `application` e `dto`, compilada como módulos ES
  e declarações sob `frontend/js`. Fontes: `e`, `t`.
- **Fato — boot:** NW.js abre `index.html`; `main.js` carrega módulos locais da
  engine e `plugins.js`; depois o `PluginManager` carrega plugins ativos únicos
  antes de `Scene_Boot`. Fontes: `e`, `p`.
- **Risco — plugins:** 63 entradas contêm 46 ativas, mas 44 nomes únicos;
  `PKD_SimpleQuestSystem` e `Coreto_TpEvents` aparecem duplicados e são
  deduplicados. `Coreto_SQS_menu_patch` consulta nome de parâmetro divergente.
  Fontes: `p`, `e`.
- **Fato — toolchain:** TypeScript, Jest/SWC, ESLint, Prettier e workflows NW.js
  estão configurados. Dezenove arquivos de teste cobrem módulos, plugins,
  dados, geradores, assets e progressão, mas não foram executados. Fontes: `b`,
  `x`.
- **Fato — scripts:** ferramentas de mapas e IDs livres são read-only;
  geradores XML/troop escrevem saídas; unused-assets é dry-run por padrão, com
  modos de relatório e movimentação confirmada. Fonte: `s`.
- **Risco — drift:** `game.rmmzproject` marca 1.10.0 e arquivos locais de
  runtime marcam 1.8.1; compatibilidade não validada. Fonte: `e`.

## Coverage materializado

| Requisito | Profundidade | Estado | Evidência |
| --- | --- | --- | --- |
| `technical-implementer.architecture` | `deep` | `covered` | `arch` |
| `technical-implementer.entry-points` | `deep` | `covered` | `entry` |
| `technical-implementer.modules-scripts` | `map` | `mapped` | `arch`, `scripts` |
| `technical-implementer.configuration-dependencies` | `deep` | `covered` | `plugins`, `build`, `drift` |
| `technical-implementer.build-test-surfaces` | `deep` | `covered` | `build`, `scripts` |
| `technical-implementer.source-map` | `map` | `mapped` | `e`, `p`, `t`, `b`, `x`, `s` |

## Fontes e rastreabilidade

- `e`: `frontend/{package.json,index.html,game.rmmzproject,js/main.js,js/rmmz_managers.js}`
- `p`: `frontend/js/plugins.js;frontend/js/plugins/Coreto_*.js`
- `t`: `tsconfig*.json;frontend/{typescript,js/{domain,application,dto}}/**`
- `b`: `package*.json;jest.config.ts;.eslintrc.cjs`
- `x`: `frontend/__tests__/**`
- `s`: `{scripts,frontend/scripts}/**`
- `g`: `AGENTS.md;CLAUDE.md;docs/{project-inventory,technology-context}.md`

## Próxima validação

Executar build e testes em ambiente controlado e Playtest do boot/plugins,
registrando a versão efetiva da engine. Confirmar o parâmetro do patch SQS e o
efeito real das entradas duplicadas antes de classificá-los como defeitos.

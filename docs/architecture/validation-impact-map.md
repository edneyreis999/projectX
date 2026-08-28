---
title: 'Gate de integridade autoral'
type: architecture-guide
status: active
created: '2026-08-27'
last_updated: '2026-08-28'
scope: 'Seleção e execução reproduzível de checks a partir de arquivos alterados'
not_scope: 'Playtest, qualidade perceptiva, aceite humano ou prontidão de release'
---

# Gate de integridade autoral

## Propósito

O gate relaciona cada target protegido aos checks que conseguem verificar sua integridade autoral. A mesma interface é usada por agentes, humanos e CI. O GitHub Actions apenas prepara o checkout e
invoca o comando local.

Um resultado verde declara somente `authoring_integrity`: parsers, writers e checks determinísticos convergiram para o snapshot observado. Ele não declara qualidade visual, narrativa, sonora,
espacial, comportamento no runtime, aceite humano ou prontidão de release.

## Fontes declarativas

`config/validation-impact-map.json` contém checks e regras compartilhados, superfícies protegidas e a raiz de descoberta dos manifestos de quest. A cobertura possui duas camadas:

- superfícies amplas só são protegidas quando existe um check geral e determinístico, como parse e estrutura mínima de `frontend/data/*.json`;
- fontes, materializações e assets de uma quest são protegidos pelos caminhos exatos declarados no respectivo manifesto.

Um diretório não se torna protegido apenas por ser importante. Sem um oráculo determinístico, o gate não deve inventar uma aprovação nem bloquear trabalho válido; a cobertura deve ser adicionada junto
com o sensor que a sustenta.

Cada `docs/Quests/<ordem>-<slug>/quest-tooling.json` declara, para sua quest:

- fontes e direção de autoridade;
- materializações e o writer responsável por cada uma;
- checks locais;
- regras que relacionam targets e checks;
- manifesto de assets, quando houver.

Uma materialização sem writer declarado bloqueia o carregamento com `unverifiable_materialization`. Um target protegido sem regra aplicável bloqueia o plano com `unmapped_target`. Checks repetidos
executam uma única vez, na ordem declarada. O plano também retorna a quest, o modelo de autoridade, o owner e o writer aplicáveis a cada arquivo descoberto.

## Interfaces públicas

Validar os manifestos sem executar checks:

```sh
npm run validation:impact -- --check
```

Planejar checks para arquivos explícitos:

```sh
npm run validation:impact -- --files docs/Quests/2-semifinal/semifinal.dialogos.md
```

Validar exatamente o conteúdo do índice Git:

```sh
npm run validate:staged
```

Validar o diff de uma branch em checkout limpo:

```sh
npm run validate:branch -- --base origin/develop
```

`validate:staged` materializa o índice em um diretório temporário; alterações unstaged não participam. `validate:branch` bloqueia com `dirty_worktree` antes de executar checks. Ambos retornam JSON e
código diferente de zero para bloqueios ou falhas.

As suítes públicas de quest continuam disponíveis para diagnóstico focado:

```sh
npm run test:noite-da-historia
npm run test:semifinal
npm run test:quests
```

Dados autorais do RPG Maker possuem um check estrutural independente:

```sh
npm run test:rpg-maker-data
```

Ele prova parseabilidade, IDs indexados e a forma mínima dos mapas. Contratos semânticos permanecem nas suítes donas do domínio; por exemplo, os níveis iniciais dos protagonistas e as entradas da
Semifinal são regressões explícitas, não inferências do validador estrutural.

## Execução read-only

O executor chama cada comando sem shell implícito e interrompe no primeiro check vermelho. Se um check alterar o checkout, o resultado é `gate_mutated_worktree`. O gate aponta a divergência; ele não
aplica writers, regenera derivados nem corrige conteúdo.

Estados principais:

| Estado/código                  | Significado                                  | Ação                                             |
| ------------------------------ | -------------------------------------------- | ------------------------------------------------ |
| `converged`                    | O writer não planejou escrita                | Nenhuma                                          |
| `materialization_drift`        | A materialização difere do writer            | Reconciliar contrato, writer e runtime           |
| `unmapped_target`              | Target protegido não possui regra            | Declarar ownership e checks no manifesto correto |
| `unverifiable_materialization` | Materialização não possui writer verificável | Implementar a prova ou remover a alegação        |
| `no_checks`                    | Nenhuma regra se aplica ao diff              | Não interpretar como aprovação ampla             |

## GitHub Actions e branch protection

`.github/workflows/authoring-integrity.yml` executa o gate em todo pull request, sem filtro de paths e sem secrets. O workflow usa a versão de Node fixada em `.nvmrc`; as actions externas são fixadas
por SHA.

Na proteção das branches de destino, configure o status `Authoring integrity` como required check. Essa configuração é externa ao arquivo YAML: sem ela, o workflow detecta falhas, mas não impede
merge.

## Como ampliar a cobertura

1. Identifique a fonte autoritativa e o consumidor real.
2. Registre o target no manifesto da quest ou no manifesto compartilhado.
3. Reuse uma suíte existente que possua o invariante.
4. Adicione casos positivos e negativos ao teste do resolver.
5. Execute o gate no snapshot que será entregue.
6. Mantenha sensores de runtime e julgamento humano separados quando o critério não for determinístico.

Não adicione um glob amplo a `protectedTargets` sem uma regra geral que consiga verificar todos os arquivos alcançados. Dívida histórica descoberta por um novo sensor deve ser tratada por baseline ou
por uma tarefa própria, não convertida incidentalmente em bloqueio da branch atual.

## Fontes consultadas e conflitos

- [Autoridade de autoria e materialização](../project-conventions/authoring-materialization-authority.md): contratos aprovados e writers autorizados governam o runtime materializado.
- [Lifecycle de evidência](../project-conventions/validation-evidence-lifecycle.md): resultados persistidos não podem representar outro checkout; o gate recalcula em vez de versionar prova.
- [Lifecycle de eventos RPG Maker](../project-conventions/rpg-maker-event-lifecycle.md): verificação estática não substitui runtime ou julgamento humano.
- [Demanda do gate](../../planos/013-github-actions-authoring-integrity/demanda.md): dívida histórica fora do escopo não deve virar bloqueio incidental.

Não há conflito entre as fontes consultadas. Havia conflito entre essa orientação e a configuração anterior: globs amplos protegiam quests, plugins, scripts e assets sem uma regra capaz de verificá-los.
A configuração foi estreitada para que `unmapped_target` continue fail-closed apenas nas superfícies declaradas, enquanto dados gerais passam por um check estrutural real. O limite
`authoring_integrity` preserva a separação entre automação mecânica e critérios que exigem outro sensor.

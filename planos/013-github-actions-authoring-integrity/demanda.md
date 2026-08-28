# Demanda 013 — gate de integridade autoral no GitHub Actions

## Contexto

O projeto é produzido principalmente por agentes de IA, mas parte do conteúdo é ajustada manualmente no RPG Maker MZ. Falas, imagens, cutscenes, mapas, plugins, contratos e fixtures podem mudar por
caminhos diferentes.

Hoje existem writers, validadores, evidências e um mapa de impacto, porém nenhum gate obrigatório no servidor impede o merge quando essas superfícies divergem. Instruções em `AGENTS.md`, templates de
PR, skills e hooks locais ajudam, mas podem ser ignorados ou contornados.

O projeto adota este princípio:

> Para uma IA, tooling stale é pior do que ausência de tooling: ele produz confiança falsa com aparência de rigor.

Uma mudança não pode receber sinal verde quando contrato, writer, runtime materializado, fixture, manifesto ou evidência estiverem divergentes.

## Resultado esperado

Adicionar um workflow obrigatório de GitHub Actions que execute o mesmo gate disponível localmente e bloqueie o merge quando houver:

- target protegido sem owner ou check declarado;
- materialização diferente do resultado calculado pelo writer autorizado;
- fixture, inventário ou manifesto derivado desatualizado;
- check aplicável com falha;
- alteração produzida pelo próprio gate;
- target declarado como materialização sem writer ou checker determinístico capaz de sustentá-lo.

O workflow deve funcionar para alterações feitas por IA e para edições manuais realizadas no RPG Maker MZ.

## Regra de arquitetura

O GitHub Actions não será a fonte das regras de validação. O workflow deverá invocar um comando local versionado, executável da mesma forma por humanos, agentes, hooks e CI.

```text
diff do PR
    -> descoberta de impacto
    -> resolução de autoridade
    -> writers em modo check
    -> validações aplicáveis
    -> relatório estruturado
    -> status obrigatório do PR
```

Não duplicar no YAML listas de mapas, quests, assets, contratos ou testes. Essas relações devem vir de manifestos versionados e testados no repositório.

## Fontes consultadas e decisões herdadas

- `docs/architecture/validation-impact-map.md`: o repositório já possui descoberta de impacto local; a demanda deve evoluir essa interface, não criar uma segunda lista no workflow.
- `docs/project-conventions/authoring-materialization-authority.md`: contratos aprovados e writers autorizados governam as materializações; uma edição no RPG Maker não promove o runtime a fonte
  automaticamente.
- `docs/project-conventions/validation-evidence-lifecycle.md`: alerta que resultados de revisões ou inputs anteriores não podem sustentar o estado atual; esta demanda evita o problema recalculando o
  gate no checkout do PR, sem reutilizar evidência versionada.
- `docs/project-conventions/rpg-maker-event-lifecycle.md`: testes estáticos não substituem os sensores de runtime e julgamento humano atribuídos ao lifecycle do engine.
- `planos/012-add-harness/`: registra os writers, fixtures, validador e lacunas que motivam o gate obrigatório.

Não foi identificado conflito entre essas fontes. Existe uma lacuna de enforcement: os contratos definem autoridade e freshness, mas hoje o merge não depende de um status obrigatório que os aplique.

## Escopo

### Gate local compartilhado

- Criar um comando de branch, por exemplo `npm run validate:branch -- --base <ref> --head <sha>`.
- Criar um modo para o snapshot staged, por exemplo `npm run validate:staged`, para uso em hooks locais.
- Fazer o gate operar sobre o snapshot exato validado, sem incorporar alterações unstaged por acidente.
- Retornar saída JSON estruturada e código de saída diferente de zero para qualquer bloqueio.
- Tratar `materialization_drift` e `unmapped_target` como falhas bloqueantes.
- Tratar materialização sem verificação determinística como `unverifiable_materialization`; o gate não pode substituir essa lacuna por checklist ou declaração manual.
- Distinguir `converged` de `ready_to_apply`; writer que planeja escrita não está convergente.
- Executar em modo read-only. O gate não pode corrigir, aplicar writers, reformatar ou regenerar arquivos silenciosamente.
- Verificar ao final que o worktree do runner permanece limpo.

### Descoberta de impacto

- Cobrir contratos, tooling, dados do RPG Maker, plugins, scripts geradores, imagens, áudio e demais superfícies declaradas por cada quest ou sistema.
- Bloquear qualquer arquivo protegido que não possua regra aplicável.
- Permitir que uma alteração ative mais de uma quest ou sistema compartilhado.
- Manter as relações específicas de quest junto ao pacote durável da própria quest.
- Usar uma única fonte declarativa para sources, materialized targets, owners, writers e checks; não manter listas paralelas no workflow e no tooling.
- Não versionar inventários de hashes que possam ser calculados durante o gate. Um derivado persistido só é permitido quando possui consumidor real além do próprio gerador e de seus testes.

### Remoção de sinais falsos atuais

- Remover `scripts/quests/semifinal/fixtures/narrative/source-inventory.json`; o gate deve ler e verificar diretamente as fontes declaradas no manifesto.
- Remover `scripts/quests/semifinal/apply-narrative.mjs`; ele apenas atualiza o inventário derivado e não materializa narrativa no runtime.
- Preservar as validações determinísticas de contratos narrativos em um módulo nomeado como validator, sem apresentá-lo como writer.
- Simplificar o validador da Semifinal para produzir resultado read-only na saída padrão, sem `--human-evidence`, `human_accepted` ou `release_ready`.
- Remover o helper, CLI, testes e regras de `validation-evidence` se, depois dessa simplificação, restarem apenas consumidores autorreferentes. Não manter uma biblioteca compartilhada sem uso de
  produto.
- Substituir snapshots de hashes usados como contrato por invariantes estruturais ou semânticas. Hash opaco não pode ser atualizado como rubber stamp de uma mudança legítima.

### GitHub Actions

- Executar em todo pull request destinado às branches protegidas do projeto.
- Fazer checkout com histórico suficiente para calcular a base real do PR.
- Fixar e documentar a versão de Node usada pelo projeto antes de executar `npm ci`.
- Usar permissões mínimas, sem secrets para validar pull requests.
- Fixar actions de terceiros conforme a política de supply chain aprovada pelo projeto.
- Cancelar execuções antigas do mesmo PR quando um commit mais novo chegar.
- Publicar um resumo legível e o relatório JSON da execução atual, sem versioná-lo no repositório.
- Não usar `continue-on-error` em gates obrigatórios.
- Não usar filtros de paths que permitam ao workflow deixar de iniciar; a decisão `no_checks` deve ser produzida pelo gate versionado.
- Configurar o status do workflow como required check na proteção da branch. Criar o arquivo YAML sem tornar o status obrigatório não conclui esta demanda.

### Fluxo de autoria manual

Uma edição direta no RPG Maker MZ é uma alteração da materialização. Ela não muda automaticamente a fonte autoritativa.

Quando o runtime divergir, o gate deve bloquear e apontar uma destas resoluções:

1. atualizar o contrato aprovado e o writer porque a intenção mudou;
2. atualizar o writer porque a implementação mudou sem alterar a intenção;
3. reaplicar a materialização autorizada porque a edição foi acidental.

O gate não poderá promover runtime para contrato nem reescrever documentação automaticamente.

### Integração com agentes e PRs

- Atualizar `AGENTS.md` somente depois que os comandos canônicos existirem.
- Instruir agentes a executar o gate versionado antes de declarar uma alteração concluída.
- Atualizar somente as skills de inventário e verificação final: a primeira descobre manifestos; a segunda executa a interface pública do gate. Não copiar o comando para todas as skills de mutação.

### Descoberta por IA com contexto vazio

- Expor os comandos públicos no `package.json`; uma IA não deve precisar conhecer imports internos de `scripts/lib/` para validar o projeto.
- Criar um manifesto canônico e machine-readable por quest ou sistema, contendo autoridade, sources, materialized targets, writers e checks.
- Fazer a skill de inventário localizar esses manifestos antes de concluir ownership ou write targets.
- Fazer a skill de verificação final invocar a interface pública do gate quando o repositório a expuser.
- Não espalhar nomes de helpers de `scripts/lib/` por várias skills. Helpers compartilhados devem ser descobertos a partir do comando, manifesto, testes e documentação canônica que os possuem.
- Testar deterministicamente que o resolver, partindo dos manifestos descobertos no repositório, encontra o owner, o writer e os checks de cada target protegido.

### Limite do claim

O gate pode declarar somente `authoring_integrity` para propriedades verificadas por writers, parsers e checks determinísticos. Ele não declara qualidade visual, narrativa, sonora, espacial, sensação
de jogo, aceite humano nem prontidão de release.

Critérios humanos podem continuar nos contratos e planos de QA, mas ficam fora do harness e do workflow desta demanda. Ausência de prova humana deve permanecer `not_verified`; nunca deve ser
convertida em sucesso por campos preenchidos em um arquivo.

## Cenários obrigatórios de aceite

### AC-01 — edição manual de diálogo

Dado que uma pessoa altera uma fala diretamente no evento da Semifinal pelo RPG Maker MZ, sem atualizar a fonte autoritativa, o workflow deve falhar com `materialization_drift` e identificar a quest e
a superfície divergente. Enquanto não existir writer ou checker determinístico para essa relação, o resultado correto é `unverifiable_materialization`, nunca sucesso.

### AC-02 — mudança reconciliada

Dado que contrato, writer e runtime são atualizados na direção de autoridade aprovada, o writer deve retornar `converged` e os checks aplicáveis devem passar.

### AC-03 — target sem mapeamento

Dado que um novo mapa, asset, plugin ou contrato protegido é alterado sem owner/check declarado, o workflow deve falhar com `unmapped_target`.

### AC-04 — derivado stale

Dado que uma fonte muda sem regenerar uma fixture ou materialização que possua consumidor real, o workflow deve falhar mesmo que testes não relacionados estejam verdes.

### AC-05 — resultado sempre recalculado

Dado um novo commit no PR, o workflow deve recalcular o gate no novo checkout e não reutilizar resultado versionado ou cacheado de outra revisão como prova de sucesso.

### AC-06 — bypass local

Dado que o commit foi criado com hooks desabilitados, o GitHub Actions deve executar o mesmo gate e bloquear o merge.

### AC-07 — gate read-only

Dado qualquer PR, a execução não pode deixar arquivos modificados. Se um writer, formatter ou teste alterar o runner, o workflow deve falhar e listar os arquivos.

### AC-08 — mudança sem checks específicos

Dado um diff sem targets protegidos e sem checks aplicáveis, o workflow deve executar e registrar `no_checks`; ele não pode deixar de iniciar por filtro de path.

### AC-09 — PR externo

Dado um pull request originado de fork, o gate deve executar sem depender de secrets ou permissões de escrita.

### AC-10 — proteção da branch

Dado que o workflow falhou ou não concluiu, o GitHub deve impedir o merge na branch protegida.

### AC-11 — descoberta por agente sem contexto

Dado o target de uma quest, o resolver deve localizar o manifesto correspondente, identificar a direção de autoridade e selecionar o writer e os checks sem receber previamente o caminho de um helper
em `scripts/lib/`.

### AC-12 — materialização sem prova

Dado um target classificado como materialização que não possua writer ou checker determinístico, o workflow deve falhar com `unverifiable_materialization`; um checklist ou campo de PR não pode liberar
o merge.

## Entregáveis

- workflow versionado em `.github/workflows/`;
- versão de Node fixada e documentada;
- comandos locais `validate:staged` e `validate:branch`;
- manifesto de impacto capaz de representar ownership e materializações de quests;
- testes positivos e negativos do planejador e do executor;
- relatório JSON e resumo do job, ambos produzidos pela execução atual;
- configuração documentada de branch protection e required check;
- atualização enxuta de `AGENTS.md` e das skills `rpg-maker-mz-project-inventory` e `rpg-maker-mz-final-verify`;
- documentação de diagnóstico para `materialization_drift`, `unmapped_target` e `unverifiable_materialization`.

## Fora de escopo

- executar ou aprovar critérios perceptivos no lugar de playtest humano;
- coletar, interpretar ou promover checklist de evidência humana;
- declarar `human_accepted` ou `release_ready`;
- versionar ou reutilizar relatórios de validação como prova de um checkout futuro;
- aplicar writers ou corrigir arquivos automaticamente no CI;
- publicar saves pessoais, secrets, logs privados ou raciocínio de agentes;
- fazer deploy ou gerar release do jogo;
- transformar todo warning histórico do repositório em bloqueio sem baseline aprovado;
- codificar regras específicas da Semifinal diretamente no YAML do workflow.

## Critério de conclusão

A demanda termina quando um PR não puder ser mergeado com o status obrigatório ausente ou vermelho, e os cenários AC-01 a AC-12 tiverem testes ou evidência reproduzível. O comando executado no GitHub
deve ser o mesmo disponível localmente. Nenhuma interface poderá declarar sucesso quando houver escrita planejada, target protegido sem cobertura, materialização sem prova ou resultado reutilizado de
outra revisão.

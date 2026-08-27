---
title: 'Mapa de impacto entre targets e checks'
type: architecture-guide
status: active
created: '2026-08-27'
last_updated: '2026-08-27'
scope: 'Seleção reproduzível de validações a partir de arquivos alterados'
not_scope: 'Substituição de testes, playtest ou revisão humana'
---

# Mapa de impacto entre targets e checks

## Propósito

Este guia descreve como declarar que uma mudança em determinado target exige checks específicos. O objetivo é impedir que arquivos percebidos como “somente documentação” ignorem writers, testes ou
validadores que os consomem.

A política de freshness resultante é definida na [ADR de lifecycle de evidência](../project-conventions/validation-evidence-lifecycle.md).

## Fonte declarativa

O manifesto versionado fica em `config/validation-impact-map.json`. Ele contém:

- `checks`: comandos identificados, sem shell implícito;
- `rules`: padrões de targets e os checks exigidos;
- `protectedTargets`: superfícies que não podem ficar sem regra.

Um target pode ativar várias regras. Checks repetidos são executados uma única vez, na ordem declarada no manifesto.

## Comandos

Validar o manifesto:

```sh
npm run validation:impact -- --check
```

Planejar checks para arquivos explícitos:

```sh
npm run validation:impact -- --files docs/Quests/2-semifinal/semifinal.dialogos.md
```

Planejar a partir do diff de uma branch:

```sh
npm run validation:impact -- --base develop
```

Executar o plano:

```sh
npm run validation:impact -- --base develop --run
```

Verificar a freshness de uma evidência persistida:

```sh
npm run validation:evidence -- --evidence path/to/evidence.json
```

As suítes de quest possuem nomes estáveis pelo conteúdo que validam:

```sh
npm run test:noite-da-historia
npm run test:semifinal
npm run test:quests
```

`test:quests` agrega todas as quests que possuem uma suíte pública no estado atual do projeto. Slugs de task ou fase, como `remediation`, não fazem parte da interface pública porque deixam de
representar a cobertura quando o trabalho é incorporado à quest.

O modo `--run` usa executável e argumentos separados. O manifesto não aceita pipeline, redirecionamento ou fragmento de shell.

## Política fail-closed

Quando um arquivo casa com `protectedTargets`, mas nenhuma regra o cobre, o planejamento termina com `unmapped_target`. Isso obriga a atualizar o mapa no mesmo patch que cria uma nova superfície
crítica.

Um arquivo fora das superfícies protegidas pode resultar em `no_checks`. Esse estado significa apenas que o manifesto atual não exige comando automatizado; não significa que a mudança está aprovada.

## Como adicionar uma regra

1. Identifique o consumidor real do target.
2. Prefira uma suíte compartilhada existente.
3. Declare um check novo somente quando a validação tiver contrato próprio.
4. Acrescente casos positivo e negativo ao teste do mapa de impacto.
5. Execute `--check` e planeje um arquivo representativo com `--files`.
6. Se a mudança afetar runtime ou percepção, preserve os gates adicionais; o mapa não os converte em aprovação estática.

## Relação com agentes

Antes de concluir uma mudança, um agente pode fornecer os arquivos alterados ao planejador e obter a menor lista declarada de checks. A lista é reproduzível por outra sessão porque não depende da
memória do agente nem do tipo aparente do arquivo.

O mapa não decide autoridade de conteúdo. Contratos continuam governados pela [ADR contract-first](../project-conventions/authoring-materialization-authority.md), e critérios humanos continuam sob
seus owners.

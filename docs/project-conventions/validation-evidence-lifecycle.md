---
title: "ADR — Lifecycle de evidência e estados de aceite"
type: architecture-decision-record
status: accepted
date: "2026-08-27"
decision_scope: "Proveniência, freshness, estados de validação e vínculo entre automação, runtime e aceite humano"
---

# ADR — Lifecycle de evidência e estados de aceite

## Status

Aceita em 2026-08-27.

## Contexto

Um arquivo de evidência pode continuar declarando `pass` depois que o commit,
os contratos, o runtime, os testes ou o build que ele validou mudaram. Sem
identidade de revisão e fingerprints dos inputs, esse resultado funciona como
um cache sem política de invalidação.

Também existe uma ambiguidade de estado: `completed` pode significar que o
código foi escrito, que checks estáticos passaram, que o runtime foi exercido
ou que uma pessoa aceitou a experiência. Essas afirmações possuem autoridades
e oráculos diferentes.

## Decisão

### 1. Evidência é vinculada à revisão e aos inputs

Todo artefato de validação persistido deve registrar:

- versão do schema;
- subject ou feature validada;
- SHA completo do HEAD;
- SHA completo da base quando houver comparação de branch;
- estado do worktree usado;
- lista ordenada dos inputs cobertos;
- hash SHA-256 de cada arquivo ou agregado de diretório;
- comandos executados, argumentos e resultado;
- versões relevantes do engine e das ferramentas;
- horário em UTC;
- resultado e falhas estruturadas.

Um `pass` de release só pode ser produzido a partir de commit identificável e
worktree limpo para os inputs cobertos. Uma execução local com mudanças não
commitadas pode produzir diagnóstico, mas deve declarar
`revisionState: working_tree` e não satisfaz `release_ready`.

### 2. Freshness é verificada antes do resultado

Antes de apresentar ou consumir um resultado persistido, o harness compara:

1. HEAD observado com `headSha`;
2. base observada com `baseSha`, quando aplicável;
3. existência, tipo e hash de todos os inputs registrados;
4. versão do schema e do gerador.

Qualquer diferença retorna `stale_evidence` com motivos estruturados. O
resultado anterior permanece disponível para auditoria, mas não pode ser
apresentado como `pass` atual.

Regenerar o arquivo sem executar os comandos registrados é proibido. Timestamp
novo não torna evidência antiga fresca.

### 3. Estados de conclusão são independentes

Uma feature mantém pelo menos estas dimensões:

| Dimensão | Significado | Autoridade típica |
| --- | --- | --- |
| `implemented` | Targets previstos foram materializados | disciplina implementadora |
| `static_verified` | Parsers, referências, testes e invariantes passaram | harness automatizado |
| `runtime_verified` | Comportamento funcional foi executado no runtime | QA técnico |
| `human_accepted` | Critérios perceptivos foram observados e aceitos | pessoa/owner designado |
| `release_ready` | Todos os gates obrigatórios estão frescos | workflow de release |

Uma dimensão não promove automaticamente outra. `not_executed`, `fail`,
`blocked` e `remediated_pending_retest` permanecem explícitos. `waived` exige
owner nomeado, justificativa, escopo e data.

### 4. Evidência humana usa o mesmo fingerprint

Editor, playtest e avaliação perceptiva devem registrar:

- `headSha` e build fingerprint;
- estado/save inicial;
- rota ou cenário;
- tester e data;
- observação livre;
- resultado por caso;
- caminho da captura ou outro artefato verificável.

Uma correção muda o caso para `remediated_pending_retest`; não para `pass`.
Mudança em input coberto torna a observação anterior stale para os casos
afetados. O mapa de impacto pode restringir o reteste quando a dependência for
demonstrável.

### 5. Evidência preserva fatos, não raciocínio privado

Logs e pacotes persistidos devem ser sanitizados. Eles registram inputs,
decisões aprovadas, comandos, resultados, falhas e timestamps necessários para
reprodução. Não devem armazenar segredos, credenciais, dados pessoais
desnecessários nem raciocínio privado de agentes.

## Schema mínimo

```json
{
  "subject": "feature-or-check-id",
  "provenance": {
    "schemaVersion": "validation-evidence/v1",
    "generator": { "name": "validator-name", "version": "1.0.0" },
    "revision": {
      "headSha": "<SHA_COMPLETO>",
      "baseSha": "<SHA_COMPLETO_OU_NULL>",
      "revisionState": "committed",
      "untrackedInputs": []
    },
    "inputs": [
      {
        "path": "path/to/input",
        "kind": "file",
        "executable": false,
        "sha256": "<SHA256>"
      }
    ],
    "generatedAt": "<ISO-8601 UTC>"
  },
  "commands": [
    { "command": "npm", "args": ["run", "test:feature"], "exitCode": 0 }
  ],
  "dimensions": {
    "implemented": "pass",
    "static_verified": "pass",
    "runtime_verified": "not_executed",
    "human_accepted": "not_executed",
    "release_ready": "blocked"
  }
}
```

Schemas específicos podem acrescentar detalhes, mas não podem remover
proveniência, inputs, comandos ou dimensões obrigatórias.

## Consequências

### Benefícios

- agentes conseguem distinguir resultado atual de cache obsoleto;
- merge e release deixam de depender de timestamps ou nomes de arquivo;
- o mesmo modelo cobre validação estática e evidência humana sem misturá-las;
- retestes podem ser proporcionais ao impacto demonstrado;
- retrospectivas ganham uma linha do tempo reproduzível.

### Custos e restrições

- geradores de evidência existentes precisam migrar de schema;
- diretórios e assets cobertos aumentam o custo de hashing;
- evidência gerada em worktree sujo não libera release;
- mudança de gerador invalida resultados anteriores mesmo sem mudança de
  runtime.

## Adoção

- O projeto não mantém atualmente um helper compartilhado nem evidência de
  validação versionada. Checks recalculam o estado do checkout e publicam o
  resultado da execução atual.
- Uma feature só deve persistir evidência quando existir um consumidor real
  além do próprio gerador e de seus testes; nesse caso, este ADR volta a reger
  schema e freshness.
- O mapa de impacto em `config/validation-impact-map.json` seleciona os checks
  que precisam ser recalculados depois de uma mudança.

## Fora de escopo

Esta ADR não escolhe a plataforma de CI, não versiona automaticamente pacotes
ignorados e não concede autoridade de waiver a um agente.

## Fontes consultadas e conflitos promovidos

- [ADR de autoridade entre contratos e runtime](./authoring-materialization-authority.md):
  classifica evidência como derivada, nunca como fonte de intenção.
- [ADR de máquinas de estado canônicas](./quest-state-machines.md): separa
  validação automatizada de playtest.
- [`FRAMEWORK-GAPS.md`](../../planos/012-add-harness/FRAMEWORK-GAPS.md): registra
  ausência de content addressing, DoD multidimensional e status de reteste.
- [`POST-MORTEM.md`](../../planos/012-add-harness/POST-MORTEM.md): demonstra um
  `pass` anterior aos commits que modificaram seus inputs.

O validador anterior da semifinal misturava estados estáticos e humanos sem
vínculo suficiente ao checkout. O gate atual limita sua alegação a
`authoring_integrity`; runtime, aceite humano e release permanecem estados
separados e não verificados por ele.

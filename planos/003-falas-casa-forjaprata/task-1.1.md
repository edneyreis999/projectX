---
title: "task-1.1 - Reparar encoding do Map045"
type: loki-task
doc_id: "map045-dialogue-encoding-repair-task-1-1"
version: "1.0.0"
status: passed
phase: "fase1"
task_id: "task-1.1"
last_updated: "2026-07-31"
canonical_source: "planos/003-falas-casa-forjaprata/task-1.1.md"
---

# task-1.1 - Reparar encoding do Map045

## Objective

Recuperar as 30 folhas textuais allowlisted por Windows-1252 para UTF-8, sem nova redacao e sem modificar qualquer outra folha ou estrutura do mapa.

## Execution Profile

- Writer: `technical-implementer` com identidade `agent:technical-implementer-map045`.
- Modo: `task_scoped_writer`; owner serializado de todos os targets abaixo.
- Primary route: validator Node deterministico materializado sob `builds/fase1/`.
- Human gate final: Playtest das paginas afetadas.

## Requirements

- Revalidar hash e valores-fonte imediatamente antes do save.
- Preservar estilo, newline, comandos, indents, flags, assets e payloads de plugins.
- Gerar manifest, preview e relatorio de validacao reproduziveis.
- Falhar sem salvar em qualquer drift, ambiguidade ou diferenca fora da allowlist.

## Out Of Scope

- Map006, reescrita narrativa, bust vazio de E11/P1/L106, plugins, Common Events e assets.

## Validators

- `node planos/003-falas-casa-forjaprata/builds/fase1/validate-map045-encoding.mjs`
- JSON parse, 30 diffs exatos, deep equality mascarada, contagens/branches, zero `U+FFFD`, zero mojibake nos alvos e diff restrito.

## Human Loop

- Playtest final aprovado e persistido em `planos/003-falas-casa-forjaprata/interaction/fase1/playtest-result-v1.json`.

```json
{
  "task_contract": {
    "audit_checkpoint_refs": [
      "planos/003-falas-casa-forjaprata/builds/audits/phase/boundary-9782193a9be6e59f37a5084515e823b0/checkpoint-v1-2.json"
    ],
    "dependencies": [],
    "gate_refs": [
      "planos/003-falas-casa-forjaprata/builds/fase1/playtest-gate-v1.json"
    ],
    "handoff_refs": [
      "planos/003-falas-casa-forjaprata/builds/fase1/writer-handoff-v3.json"
    ],
    "phase": "fase1",
    "schema_version": 1,
    "status": "passed",
    "target_files": [
      "frontend/data/Map045.json",
      "planos/003-falas-casa-forjaprata/builds/fase1/map045-repair-manifest.json",
      "planos/003-falas-casa-forjaprata/builds/fase1/map045-preview.json",
      "planos/003-falas-casa-forjaprata/builds/fase1/map045-validation-report.json",
      "planos/003-falas-casa-forjaprata/builds/fase1/repair-map045-encoding.mjs",
      "planos/003-falas-casa-forjaprata/builds/fase1/validate-map045-encoding.mjs"
    ],
    "task_id": "task-1.1",
    "task_validation": {
      "acceptance_criteria": [
        {
          "id": "AC-MAP045-01",
          "required": true,
          "statement": "Exactly 30 allowlisted string leaves are repaired to their frozen expected Unicode values."
        },
        {
          "id": "AC-MAP045-02",
          "required": true,
          "statement": "All non-allowlisted Map045 data, event structure, command order, indents, flags and plugin payloads remain equal."
        },
        {
          "id": "AC-MAP045-03",
          "required": true,
          "statement": "The persisted Map045 parses as UTF-8 JSON and every repaired value has no U+FFFD or residual mojibake signature."
        },
        {
          "id": "AC-MAP045-04",
          "required": true,
          "statement": "Map006 and every production file outside frontend/data/Map045.json remain outside this implementation write scope."
        }
      ],
      "evidence_refs": [
        "planos/003-falas-casa-forjaprata/builds/fase1/map045-validation-report.json",
        "planos/003-falas-casa-forjaprata/builds/fase1/map045-preview.json",
        "planos/003-falas-casa-forjaprata/builds/fase1/validation-cycles/cycle-1/severity-finding-v2.json",
        "planos/003-falas-casa-forjaprata/builds/fase1/validation-cycles/cycle-1/failed-validation-report-sha256-9e52adaca905664890e916fc398ae150510bd37dc9d1ccb15caccf14bd229195.json"
      ],
      "primary_route": {
        "type": "deterministic",
        "validator_ref": "planos/003-falas-casa-forjaprata/builds/fase1/validator-record-v3.json"
      },
      "schema_version": 1,
      "status": "passed"
    },
    "writer_identity": "agent:technical-implementer-map045"
  }
}
```

---
title: "Validação documental - convenção do Gab"
type: implementation-evidence
status: passed
created: "2026-08-04"
---

# Validação documental - convenção do Gab

## Resultado

`AC-1` passou. A diretriz arquitetural e sua entrada em `docs/index.xml` registram, de forma navegável, a prioridade da interação, repetição, sequência interna, proteção dos automáticos, ancoragem pela altura do sprite com gap configurável e estilo exclusivo de `Window_Gab`.

## Verificações executadas

- `docs/index.xml` foi analisado como XML válido e a entrada `architecture-exploration-dialogue-gabwindow` aponta para `docs/architecture/exploration-dialogue-gabwindow.md`.
- As quatro âncoras catalogadas existem no Markdown: `regra`, `prioridade-e-repetição-em-interações`, `posição-e-estilo-padrão` e `implementação-e-validação`.
- A entrada de catálogo descreve escopo, exclusões, palavras-chave e cenários de uso sem depender de identificadores transitórios do plano.
- `git diff --check` não reportou erro de whitespace nos arquivos documentais alterados.

## Gates pendentes

Esta evidência valida apenas a documentação. Editor round-trip e Playtest desde New Game continuam obrigatórios para validar o comportamento perceptível em runtime.

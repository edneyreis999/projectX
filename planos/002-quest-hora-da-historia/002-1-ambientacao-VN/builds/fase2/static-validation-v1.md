---
schema_version: 1
status: passed
scope: "Validação estrutural da Fase 2; não substitui Playtest"
---

# Fase 2 — validação estática

- `node planos/004-ambientacao-VN/builds/fase2/validate-vn-ambientacao.mjs`: passou.
- `git diff --check`: passou.
- Parse JSON: coberto pelo validator para `Map022.json` e `Map046.json`.
- Diff de runtime da demanda: somente `frontend/data/Map022.json` e `frontend/data/Map046.json`; `Map004.json` não tem diff.
- Auditoria independente: passou após confirmar `code 121 [44,44,0]` entre o Enter da criança e sua fala pré-escolhas.
- Revisão posterior de feedback: no ramo `qualSeuNome2`, Rheed não sai mais antes do `Choice End` e não existe novo `Basic_EnterBust` compartilhado após ele. A entrada de Rheed necessária à rota `qualSeuNome1` agora fica dentro desse ramo, depois do cleanup próprio.

## Cobertura observada

- Map022: a mensagem alvo é seguida imediatamente por Script; ele aciona self switch A do evento 31, apaga o controlador e remove seletivamente o balão ativo do evento 30. A página 2 usa self switch A sem variável de progresso.
- Map046: Rheed entra na posição 9 com `Auto`; a criança entra na posição 1 com `Auto`, aciona switch 44 e fala antes das escolhas. A estrutura e os efeitos das duas escolhas, incluindo `Dulgarin`, Name Input e QuestTransition, foram checados.

## Gate pendente

Playtest humano obrigatório: Map022 com balão já ativo; Map046 nas rotas `qualSeuNome1`, `qualSeuNome2` e Cancel. Na segunda rota, confirmar especificamente que Rheed permanece visível e não há flicker/corte entre a fala de apresentação do nome e a narração compartilhada.

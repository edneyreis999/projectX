# Tarefa 1.1 — Reparentear os mapas EX

## Decisão de target

| Target | Origem | Justificativa | Validador |
| --- | --- | --- | --- |
| `frontend/data/MapInfos.json` | decisão humana explícita | contém a hierarquia do editor dos sete mapas EX | parse JSON + comparação estrutural dos registros |

## Envelope de escrita

Somente os campos `parentId` dos IDs `22`, `44`, `45`, `50`, `51`, `58` e `59`
podem mudar, todos para `16`.

## Aceite

1. Cada ID-alvo aparece uma única vez com `parentId: 16`.
2. Todos os demais registros e campos preservam o valor anterior.
3. O arquivo continua JSON válido.
4. O gate humano no RPG Maker MZ permanece pendente.

## Evidência de validação

- 2026-08-04: `ConvertFrom-Json` processou `MapInfos.json` sem erro.
- 2026-08-04: os IDs 22, 44, 45, 50, 51, 58 e 59 foram encontrados uma vez
  cada e todos retornaram `parentId: 16`.
- 2026-08-04: `git diff --check -- frontend/data/MapInfos.json` não reportou
  erro de whitespace.

## Resultado

Implementação estática concluída; aguarda somente a confirmação no editor.

# Validação estática — Plano 005

Data: 2026-08-04

## Resultado

- `frontend/data/Map022.json`: parse JSON aprovado; 2 blocos `Show Text` originais, 0 remanescente e 14 `GabTextOnly` no total (12 preexistentes + 2 convertidos).
- `frontend/data/Map045.json`: parse JSON aprovado; 27 blocos `Show Text` originais, 0 remanescente e 27 `GabTextOnly`.
- Todos os textos originalmente em `401` foram encontrados no campo `Text:json` de um Gab após a conversão.
- Cada `GabTextOnly` possui três continuidades `657` adjacentes de metadados do editor.
- Todos os Gabs usam `ForceGab:false`; nenhum payload convertido contém rosto ou nome de falante.
- `docs/index.xml` passou no parse XML e cataloga `docs/architecture/exploration-dialogue-gabwindow.md`.
- `git diff --check` não encontrou erro de whitespace; os avisos de LF/CRLF são de Git e não representam falha estrutural.

## Limite

Esta evidência é estática. Round-trip no editor e Playtest desde New Game continuam obrigatórios para validar legibilidade, fila, reentrada e continuidade imediata.

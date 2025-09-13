# Plano de Correção — Identificadores Duplicados na Application (Use Case)

Problema: ao rodar `npm run debug:ts`, ocorre `SyntaxError: Identifier 'MineracaoRequestDTORef' has already been declared`.

Causa raiz: os arquivos compilados de Domain e Application declaram variáveis globais `let MineracaoRequestDTORef`/`let MineracaoResponseDTORef`. Em ambiente Browser (NW.js) com `<script>`, `let` no topo cria bindings globais não re-declaráveis, causando conflito quando dois arquivos usam o mesmo nome.

## Objetivo

- Remover conflitos de nomes globais na camada Application sem alterar o comportamento, mantendo testes verdes e runtime no NW.js.

## Passos (imperativo)

1) Encapsular em IIFE para escopo local

- Em `frontend/js/application/MineracaoUseCase.ts`:
  - Envolver todo o conteúdo em `(function () { 'use strict'; /* ... */ })();`.
  - Manter a exposição no final do arquivo (Node: `module.exports = MineracaoUseCase`; Browser: `globalThis.MineracaoUseCase = MineracaoUseCase`).
  - Remover `let` globais para refs de DTO e criar resolutor local:
    - Criar `function resolveUseCaseDTOs() { /* detecta Node (require) ou Browser (globalThis), cache local (closure) e retorna as refs */ }`.
    - Usar `resolveUseCaseDTOs()` dentro de `executarMineracao` (ou `ensureUseCaseDTOsLoaded()`) para obter as referências, sem variáveis globais.

- Em `frontend/js/domain/MinaKravensDomain.ts`
  - Repetir o padrão (IIFE + `resolveDomainDTOs()` interno) para evitar quaisquer `let` globais de refs de DTO.

1) Recompilar e validar

- Executar `npm run build:app-types`.
- Rodar `npm run debug:ts` e verificar que o erro de identificador duplicado não ocorre.
- Observação: o aviso do NW.js sobre `app.nw` em modo unpacked é esperado e pode ser ignorado.

3) Garantir testes

- Executar `npm test` e confirmar 0 falhas.

4) Alternativa (se necessário)

- Como último recurso, trocar `let` por `var` apenas para os identificadores de referência (aceita re‑declaração). Preferir sempre IIFE + resolução local.

## Critérios de aceite

- `npm run debug:ts` executa sem `Identifier has already been declared`.
- `npm test` passa com 0 falhas.

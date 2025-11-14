# Especificação Técnica — Mapa de Teste da Narrativa Sistêmica

## Contexto

- Baseado no PRD `dev-logs/mvp-narrativa-sistemica/prd-mapa-teste-narrativa-sistemica.md`.
- Objetivo: concluir o mapa de teste em `frontend/data/Map021.json` e garantir o controle das variáveis em `frontend/data/System.json` para validar rapidamente as combinações da narrativa sistêmica.

## Arquivos afetados

- `frontend/data/Map021.json`
  - Já contém exemplos de eventos; seguir mesma estrutura.
  - Pode ser formatado com ESLint/Prettier (JSON multilinha).
- `frontend/data/System.json`
  - Contém as variáveis utilizadas pelos eventos.
  - **Não formatar**: arquivo deve permanecer em uma única linha (minificado).
- `dev-logs/mvp-narrativa-sistemica/troubleshot.md`
  - Registrar problemas encontrados e soluções adotadas durante a implementação/testes.

## Regras de implementação

- Cada NPC/evento deve refletir as variáveis e fluxos descritos em `dev-logs/mvp-narrativa-sistemica/npcs-mapa-teste.md`.
- Usar Playwright via MCP com o fluxo “Novo Jogo” para validar como QA (simular interações principais).
- Criar script automatizado que valide a estrutura JSON dos arquivos editados (lint/check).
- Respeitar domínios e nomes das variáveis definidos no PRD e nos diffs atuais de `System.json`.
- Mensagens de feedback devem permanecer genéricas conforme o mapa existente.
- Garantir que a cama sempre teleporte para “MvP Defesa Gildrat”.

## Estratégia de testes

- Execução do script de validação dos arquivos JSON.
- Playtest manual/automação MPC-Playwright navegando pelas principais interações (desbloqueios, resgates, Filena, cama).
- Registrar cada problema identificado e sua resolução em `troubleshot.md`.

## Observações

- Manter cópias incrementais locais (`Map021-atual.json`, `System-atual.json`) antes de mudanças grandes.
- Não introduzir alterações em outros arquivos fora do escopo sem alinhamento.

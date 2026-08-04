# Plano 006 — EX em Exploration

## Escopo aprovado

- Produção: `frontend/data/MapInfos.json`.
- Mapas: 22, 44, 45, 50, 51, 58 e 59.
- Mudança: definir `parentId: 16` para cada um.

## Restrições

Preservar IDs, ordem, nomes, arquivos de mapa, eventos e transfers. `Map050`
é `EX_Estádio`; `Map014` permanece fora da rota EX. Não alterar qualquer outro
registro de `MapInfos.json`.

## Tarefa 1.1 — Reparentear os mapas EX

- Dependências: nenhuma.
- Dono: orquestrador.
- Arquivo autorizado: `frontend/data/MapInfos.json`.
- Critério de aceite: os sete IDs aparecem exatamente uma vez e têm
  `parentId: 16`; nenhum outro campo ou registro muda.
- Validação: parse JSON e comparação estrutural limitada aos sete `parentId`.
- Gate humano pendente: abrir, salvar e reabrir o projeto no RPG Maker MZ e
  confirmar os sete mapas diretamente sob `Exploration`.

## Evidências

- Demanda: `planos/005-asemifinal-new-arquiteture/improved-demand.md`.
- Análise: `planos/005-asemifinal-new-arquiteture/technical-analysis.md`,
  seção “Revisão aprovada — hierarquia EX em Exploration (2026-08-04)”.

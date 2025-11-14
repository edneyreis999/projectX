## markdown

## status: pending # Opções: pending, in-progress, completed, excluded

<task_context>
<domain>engine/infra/gameplay</domain>
<type>testing</type>
<scope>core_feature</scope>
<complexity>medium</complexity>
<dependencies>temporal</dependencies>
<prd_ref>../prd-mapa-teste-narrativa-sistemica.md</prd_ref>
<techspec_ref>../techspec-mapa-teste-narrativa-sistemica.md</techspec_ref>
</task_context>

# Tarefa 3.0: Validar qualidade (script JSON, Playwright e troubleshooting)

## Referências de Origem

- PRD: [prd-mapa-teste-narrativa-sistemica.md](../prd-mapa-teste-narrativa-sistemica.md)
- Tech Spec: [techspec-mapa-teste-narrativa-sistemica.md](../techspec-mapa-teste-narrativa-sistemica.md)

## Visão Geral

Automatizar verificações básicas dos arquivos JSON e validar o fluxo do mapa via Playwright (MCP), documentando problemas e correções no `troubleshot.md`.

<requirements>
- Disponibilizar script que valide a estrutura de `System.json` (minificado) e `Map021.json` antes de commit.
- Executar cenário Playwright “Novo Jogo” para garantir que desbloqueios, eventos e teleporte operem conforme esperado.
- Registrar problemas e respectivas soluções em `dev-logs/mvp-narrativa-sistemica/troubleshot.md`.
</requirements>

## Subtarefas

- [ ] 3.1 Criar/atualizar script de validação de JSON (executável via npm script ou comando equivalente) cobrindo formato minificado de `System.json`.
- [ ] 3.2 Rodar a validação automatizada e corrigir quaisquer falhas apontadas.
- [ ] 3.3 Executar o fluxo Playwright pelo MCP (“Novo Jogo”), cobrindo interações principais do mapa.
- [ ] 3.4 Documentar no `troubleshot.md` problemas encontrados e resoluções após correção.

## Detalhes de Implementação

- Script pode utilizar Node.js (ex.: `node -e "..."`) ou ferramenta similar que interrompa em caso de JSON inválido ou formatação indevida.
- Para Playwright, seguir orientação da Tech Spec (interagir com MCP Playwright) e anexar evidências se necessário.

## Critérios de Sucesso

- Execução do script falha quando JSON está inválido ou quando `System.json` perde formatação minificada.
- Relatório de execução do Playwright confirma cenários principais sem bloqueios.
- `troubleshot.md` lista incidentes e estado final resolvido.

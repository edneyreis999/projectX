## markdown

## status: pending # Opções: pending, in-progress, completed, excluded

<task_context>
<domain>engine/infra/gameplay</domain>
<type>implementation</type>
<scope>core_feature</scope>
<complexity>high</complexity>
<dependencies>temporal</dependencies>
<prd_ref>../prd-mapa-teste-narrativa-sistemica.md</prd_ref>
<techspec_ref>../techspec-mapa-teste-narrativa-sistemica.md</techspec_ref>
</task_context>

# Tarefa 2.0: Completar eventos e fluxos do mapa de teste (Map021.json)

## Referências de Origem

- PRD: [prd-mapa-teste-narrativa-sistemica.md](../prd-mapa-teste-narrativa-sistemica.md)
- Tech Spec: [techspec-mapa-teste-narrativa-sistemica.md](../techspec-mapa-teste-narrativa-sistemica.md)

## Visão Geral

Construir e ajustar todos os NPCs e eventos necessários em `frontend/data/Map021.json`, garantindo que cada interação configure corretamente as variáveis descritas e forneça feedback apropriado ao tester.

<requirements>
- Reproduzir integralmente os fluxos listados em `dev-logs/mvp-narrativa-sistemica/npcs-mapa-teste.md`.
- Assegurar que desbloqueios, resgates, interações de preparação e teleporte funcionem em qualquer ordem após cumprir pré-condições.
- Mensagens genéricas de repetição/bloqueio devem seguir o padrão existente.
</requirements>

## Subtarefas

- [ ] 2.1 Implementar NPCs de desbloqueio de Melios e Kravens com feedback de bloqueio/liberação e remoção dos obstáculos.
- [ ] 2.2 Configurar eventos de Melios e Kravens (resgates, grupo rebelde, sigmetal, corvos) com controle de variáveis e mensagens de repetição.
- [ ] 2.3 Finalizar interações de Gildrat (Thordan, Filena, time rúnico, moral, logística, Sáparo) incluindo pré-condições e limites.
- [ ] 2.4 Garantir que a cama execute o teleporte para “MvP Defesa Gildrat” independentemente do estado das variáveis.
- [ ] 2.5 Validar o mapa no editor ou via Playwright para assegurar que nenhuma passagem fique bloqueada indevidamente.

## Detalhes de Implementação

- Reutilizar o padrão de eventos já presente em `Map021.json` para consistência.
- Armazenar valores utilizando as IDs definidas no `System.json`, com verificações por `Self Switch` ou condicionais de variáveis conforme necessário.
- Manter o arquivo formatado conforme ESLint/Prettier (JSON multilinha legível).

## Critérios de Sucesso

- Cada interação descrita no documento de NPCs está presente e opera dentro dos domínios previstos.
- Fluxos alternativos (tentativas repetidas, pré-condições da Filena, bloqueios de passagem) fornecem o feedback correto.
- Teleporte final sempre leva ao mapa “MvP Defesa Gildrat”.
- Playtest/validação confirma que todas as sequências de decisões são possíveis sem erros.

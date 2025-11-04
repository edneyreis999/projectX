## markdown

## status: pending # Opções: pending, in-progress, completed, excluded

<task_context>
<domain>engine/infra/gameplay</domain>
<type>implementation</type>
<scope>core_feature</scope>
<complexity>medium</complexity>
<dependencies>temporal</dependencies>
<prd_ref>../prd-mapa-teste-narrativa-sistemica.md</prd_ref>
<techspec_ref>../techspec-mapa-teste-narrativa-sistemica.md</techspec_ref>
</task_context>

# Tarefa 1.0: Consolidar variáveis sistêmicas no System.json

## Referências de Origem

- PRD: [prd-mapa-teste-narrativa-sistemica.md](../prd-mapa-teste-narrativa-sistemica.md)
- Tech Spec: [techspec-mapa-teste-narrativa-sistemica.md](../techspec-mapa-teste-narrativa-sistemica.md)

## Visão Geral

Garantir que todas as variáveis e switches necessários para o mapa de teste estejam definidos em `frontend/data/System.json`, alinhados às faixas e nomenclaturas descritas no PRD e no documento de NPCs.

<requirements>
- Manter o arquivo `System.json` em formato minificado (uma linha).
- Confirmar IDs corretos para cada variável/switch e evitar regressões em definições existentes.
- Atualizar documentação de apoio, se novas variáveis forem adicionadas, refletindo-as na Tech Spec se necessário.
</requirements>

## Subtarefas

- [ ] 1.1 Mapear variáveis existentes comparando `System.json` com `dev-logs/mvp-narrativa-sistemica/npcs-mapa-teste.md`.
- [ ] 1.2 Inserir ou ajustar entradas de variáveis/switches respeitando os domínios definidos (minificados, sem reformatar o arquivo).
- [ ] 1.3 Registrar no `troubleshot.md` qualquer problema encontrado e respectiva solução.

## Detalhes de Implementação

- Utilizar o diff atual como referência para localizar novas variáveis (`git diff -- frontend/data/System.json`).
- Inserir variáveis adicionais seguindo a ordenação esperada pelo RPG Maker, evitando colisões de ID.

## Critérios de Sucesso

- Todas as variáveis e switches necessários estão presentes e com domínios corretos.
- O arquivo `System.json` permanece válido e minificado (passa na validação do script JSON).
- Problemas encontrados e resolvidos estão registrados em `dev-logs/mvp-narrativa-sistemica/troubleshot.md`.

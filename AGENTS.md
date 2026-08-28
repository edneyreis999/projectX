# Decisões do projeto

- Consulte `docs/architecture/` e `docs/project-conventions/` antes de decidir arquitetura ou padrões do projeto.
- Consulte as fontes relevantes em `docs/` antes de propor game design ou direção criativa; para combate, leia `docs/GDD/06_Combat/FUNDAMENTOS-COMBAT-SYSTEM.md`, `DIRETRIZES-DESIGN-COMBAT-SYSTEM.md` e
  `CLASSIFICACAO-MODIFICADORES.md`.
- Registre as fontes consultadas e explicite conflitos com a documentação antes de promover uma decisão de design.
- Consulte os contratos em `docs/Quests/<ordem>-<slug-da-quest>/` antes de implementar uma quest; encaminhe conflitos à disciplina autora ou a uma decisão aprovada.
- Ao receber feedback de melhoria sobre uma implementação, avalie se a continuidade exige um handoff para outro LLM e, nesse caso, oriente o usuário a invocar a skill `to-prompt`.

# Entregas

- Antes de declarar uma entrega concluída, execute o gate canônico sobre o snapshot entregue: `npm run validate:staged` para o índice ou `npm run validate:branch -- --base <ref>` em checkout limpo.
- Delegue a skill `deslop` como última revisão de toda tarefa de codificação a um agente com o mínimo de contexto necessário.
- Siga `.gitmessage` ao preparar mensagens de commit, inclusive com `git commit -m`.
- Siga `.github/pull_request_template.md` ao preparar pull requests.

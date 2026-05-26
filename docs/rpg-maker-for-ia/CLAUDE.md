# Sobre a Pasta

Documentacao tecnica de plugins VisuStella e RPG Maker MZ organizada para consumo por IAs. Cada plugin possui CLAUDE.md e index.md proprios com detalhes internos. Use este arquivo para identificar qual plugin consultar.

# Estrutura

## projectX/docs/rpg-maker-for-ia/docs-visustella

Plugins VisuStella organizados por categoria funcional. Detalhes no CLAUDE.md de cada plugin.

### battle-plugins/ — Plugins de combate

- `/docs/rpg-maker-for-ia/docs-visustella/battle-plugins/battle-core-visustella-mz/` — Core de batalha com Action Sequences para customizar animacoes e mecanicas de skills, estilos de dano (MOBA), multiplos hits, critico configuravel e Base Troops para reutilizar eventos. Consulte para personalizacao visual ou mecanica de combate
- `/docs/rpg-maker-for-ia/docs-visustella/battle-plugins/visustella-active-turn-battle/` — Transforma TPB em sistema ATB com gauge visual em tempo real, formulas de velocidade (sqrt(agi)+1), cast time, mecanicas de interrupt e stun que resetam o gauge. Consulte para timed battles ou mecanicas de interrupcao
- `/docs/rpg-maker-for-ia/docs-visustella/battle-plugins/visustella-skills-states-core/` — Sistema expandido de skills e states com custos multi-recurso (HP, Gold, Items), states passivos condicionais, buffs/debuffs (max 2 stacks, 25% cada), slip damage via JS e multiplos tipos de skill. Consulte para design de skills complexas ou estados condicionais
- `/docs/rpg-maker-for-ia/docs-visustella/battle-plugins/visustella-tp-system/` — Sistema de TP expandido com 30+ modos pre-definidos, formulas customizaveis de ganho, regen de TP, TCR (TP Charge Rate), persistencia entre batalhas e cores de gauge. Cada personagem pode ter um TP Mode distinto. Consulte para sistemas de recurso tactical
- `/docs/rpg-maker-for-ia/docs-visustella/battle-plugins/visustella-battle-ai/` — IA de combate com 4 estilos (Classic, Gambit, Casual, Random), skills condicionais (ALL/ANY), targeting por prioridade, sistema de conhecimento e pesos TGR. Gambit permite condicoes If/Then encadeadas. Consulte para comportamento inteligente de inimigos
- `/docs/rpg-maker-for-ia/docs-visustella/battle-plugins/visustella-aggro-control-system/` — Sistema de ameaca em 3 niveis: Provoke (via state), Taunt (via trait) e Aggro (numerico acumulativo). Inclui gauge visual de threat e controle de quem os inimigos atacam. Consulte para mecanicas de tanking ou controle de targeting
- `/docs/rpg-maker-for-ia/docs-visustella/battle-plugins/visustella-elements-status-menu-core/` — Sistema de elementos com Trait Sets para atribuicao em lote, formula de dano elemental (base+plus)*rate+flat, regras multi-elemento e menu de status modernizado com categorias customizaveis. Consulte para interacoes elementais ou interface de status
- `/docs/rpg-maker-for-ia/docs-visustella/battle-plugins/visustella-life-state-effects/` — States de vida inspirados em JRPGs classicos: Auto Life (ressurreicao automatica), Curse (penalizacao ao curar), Doom (morte em N turnos), Death Transform (transforma ao morrer) e Undundead (inverte cura/dano). Consulte para mecanicas dramaticas de vida/morte
- `/docs/rpg-maker-for-ia/docs-visustella/battle-plugins/auto-skill-trigger/` — Sistema com 60+ tipos de trigger automatico que ativam skills em resposta a eventos de batalha, acoes do usuario ou reacoes do alvo. Suporta chance de ativacao, limite de turnos e condicoes customizadas. Consulte para counter-attacks ou skills reativas

### skill-plugins/ — Plugins de skills

- `/docs/rpg-maker-for-ia/docs-visustella/skill-plugins/visustella-skill-learn-system/` — Aprendizado de skills via menu dedicado gastando AP, SP, Gold ou Items com pipeline Show/Require/Cost/Confirm. Requisitos de classe, nivel, skill previa ou switch. Consulte para progressao de skills fora do level padrao
- `/docs/rpg-maker-for-ia/docs-visustella/skill-plugins/visustella-skill-shop/` — Loja de skills onde jogadores compram skills com Gold ou moedas extendidas. Suporta custos customizados, requisitos de classe/nivel/skill/switch, multiplos tipos de loja e sistema de desconto. Consulte para progressao alternativa via compra
- `/docs/rpg-maker-for-ia/docs-visustella/skill-plugins/visustella-equip-passive-system/` — Skills passivas equipaveis com arvores branching, 30+ condicoes de desbloqueio (nivel, batalhas, skills), sistema de capacidade e integracao com Skill Learn. Consulte para builds customizaveis via passives equipaveis

### movement-plugins/ — Plugins de movimento

- `/docs/rpg-maker-for-ia/docs-visustella/movement-plugins/dragonbones-union/` — Animacao esqueletal via DragonBones v5.7 para battlers, pictures e sprites de mapa. Controle de armatures, motion behaviors, time scale e offsets. Consulte para animacoes fluidas alem do sistema padrao do RPG Maker

### quality-of-life-plugins/ — Plugins utilitarios

- `/docs/rpg-maker-for-ia/docs-visustella/quality-of-life-plugins/visustella-database-inherit/` — Heranca de propriedades entre objetos do database via notetags com processo de 7 etapas, 64 notetags em 8 categorias e controle granular de extend/overwrite. Elimina duplicacao de dados. Consulte para reutilizacao modular
- `/docs/rpg-maker-for-ia/docs-visustella/quality-of-life-plugins/visustella-items-and-equips-core/` — Cenas de item/equip/shop aprimoradas com categorias customizadas, tipos de equipamento adicionais, janela de status na loja, controle de visibilidade e precos dinamicos. Consulte para organizacao de inventario ou lojas

### visustella-core-engine/ — Core Engine (Tier 0)

- `/docs/rpg-maker-for-ia/docs-visustella/visustella-core-engine/` — Plugin base (Tier 0) do qual todos dependem. Corrige 17+ bugs do RPG Maker MZ, parametros alem dos limites do engine, notetags de animacao, controle de sistema de batalha, preload de imagens e customizacao de UI. Consulte primeiro para questoes fundamentais

## projectX/docs/rpg-maker-for-ia/battle-core-action-sequence

Documentacao de Action Sequence commands para customizar skills via Plugin Commands em Common Events: setup, movimento, animacao, mecanica (dano/cura) e finish. 41 exemplos XML incluidos. Consulte para criar sequencias de acao customizadas.

- `/docs/rpg-maker-for-ia/battle-core-action-sequence/exemplos-action-sequence/` — 41 exemplos XML de Common Events para Action Sequences

## projectX/docs/rpg-maker-for-ia/catalogado

Documentacao catalogada com indices para navegacao. Atualmente vazio, reservado para indexacao futura.

# Documentacao de Referencia

- `docs/rpg-maker-for-ia/battle-core-action-sequence/action-sequence-commands.md` — Comandos de Action Sequence
- `docs/rpg-maker-for-ia/battle-core-action-sequence/skills-documentacao.md` — Documentacao de skills e Action Sequences
- `docs/rpg-maker-for-ia/docs-visustella/visustella-core-engine/CLAUDE.md` — Core Engine: base para todos os outros plugins

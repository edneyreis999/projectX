# Invocador do Serel — Orquestração e Configuração

Assuma a orquestração do agente definido em `zord/agentes/artistas/serel-lumeclaro.md`.
Objetivo: preparar insumos, conduzir entrevista e solicitar a entrega final no formato padronizado. Serel NÃO escreve prompts do Midjourney — apenas descrição de mapas.

## Configuração inicial

- Caminho de saída: `frontend/docs/GDD/2-world-building/locais/<nome-do-mapa>.md`.
- Não incluir clima/iluminação/relevo.
- Manter circulação mínima de 1 tile e portas desobstruídas.
- Linguagem: PT‑BR, listas e frases curtas.

## Fontes de informação (coleta pelo invocador)

- `frontend/docs/Quests` — buscar tudo relacionado ao mapa informado (NPCs, estados de progresso, eventos, props mencionados).
- `frontend/docs/GDD` — visão geral, regras de mundo, elementos canônicos (com ênfase em `frontend/docs/GDD/2-world-building`).
- referências visuais do projeto em `frontend/img/parallaxes/!*` (para reforçar estilo).

## Sequência de perguntas iniciais (uma por vez)

1) Nome do usuário.  
2) Qual mapa deseja detalhar?  

## Passos de orquestração

1) Coleta e síntese: a partir do nome do mapa, vasculhe as fontes e produza um briefing objetivo para o Serel contendo: áreas/cômodos, restrições canônicas, NPCs/itens relevantes e requisitos de jogabilidade/tema.
2) Rascunho inicial (Serel): envie o briefing ao Serel e peça o documento no “Formato de saída” definido no agente.
3) Entrevista iterativa: conduza perguntas objetivas e também inferenciais “fora da caixa” seguindo `zord/agentes/regras/regras-entrevistas-qualitativas.md`. Após cada resposta do usuário, peça ao Serel para atualizar o rascunho e mostrar apenas o trecho alterado (ou um breve resumo das mudanças).
4) Coerência canônica: confronte o rascunho com `frontend/docs/GDD/2-world-building` e ajuste onde houver conflito.
5) Validação final: verifique circulação ≥ 1 tile, portas livres, alinhamento à grade e coerência por cômodo.
6) Entrega: salve o documento final em `frontend/docs/GDD/2-world-building/locais/<nome-do-mapa>.md`.

## Diretrizes de perguntas “fora da caixa” (para a entrevista)

- “Se Thorin é filho de Thordan (general) e moram juntos, deseja insígnias militares e móveis de alto padrão?”
- “Se Thorin conversa com a mãe em sonho, incluir objetos dela no quarto/santuário? Há relíquias?”
- “Se a quest exige treino marcial, prefere suporte de armadura na sala ou espaço de treino dedicado?”
- “Se um NPC é mestre cervejeiro, a cozinha/dispensa deve refletir barris, prateleiras e utilitários específicos?”

## Preferências de saída (contrato com o Serel)

- Usar exatamente o formato definido em `zord/agentes/artistas/serel-lumeclaro.md` (Sumário, Lista de Cômodos, Tabela de Substituições, Checklist).
- Não gerar prompts; apenas a descrição do mapa.
- Ao atualizar versões durante a entrevista, mostrar trecho alterado ou resumo das mudanças.

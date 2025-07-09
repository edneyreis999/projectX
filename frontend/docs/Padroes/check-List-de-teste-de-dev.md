# Checklist de Teste — Implementação de Narrative Structure Document (RPG Maker)

## Fluxo geral

[ ] Cada *story beat* deve ser retomável e consistente ao alterar manualmente o estado global da quest.  
[ ] As decisões de diálogo devem estar implementadas no formato *Visual Choice*.  
[ ] A quest deve ser concluída de forma completa e natural, sem necessidade de usar o atalho de desenvolvedor (CTRL) para pular eventos.  
[ ] Não há soft locks (situações onde o jogador fica preso sem poder progredir ou resetar) (ex. eu entrei em um mapa/local que não está previsto na quest, tem teleporte para voltar?)
[ ] Os *NPCs principais* da quest devem ter falas diferentes e contextualizadas para cada estado global da quest, enquanto forem relevantes no enredo.  
[ ] Ao iniciar uma conversa, os NPCs devem virar para o jogador corretamente antes de exibir o diálogo.  

## Coerência narrativa

[ ] As variáveis de progresso (por exemplo, v_q_<nome>_progress) são atualizadas corretamente em cada etapa prevista no Narrative Structure Document.  
[ ] O tecnical document está atualizado com o que foi implementado no jogo? (ex. foi adicionado mais estados do que o previsto no documento? Precisou adicionar mais variaveis do que foi previsto no documento? essas alterações estão refletidas no documento oficial?)

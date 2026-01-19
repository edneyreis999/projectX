# Saida entrevistador v2

## Contexto
- **Mapa:** 44 (cutscene autorun no centro da vila, trilha de terra).
- **Personagens:** Lucas (cabelo azul, descontraido) e Maria (cabelo castanho, confiante).
- **Funcao narrativa:** mostrar o encontro casual, estabelecer a quimica comica e demonstrar os poderes magicos de Lucas para selar a parceria.
- **Objetivo do jogador:** observar o dialogo, a demonstracao e a formacao imediata da party.
- **Resultado:** Maria entra para a party e ambos seguem rumo à saida superior, mantendo o tom leve e com ritmo comico magico.

## Algoritmo narrativo sugerido

| Passo | Ator/Alvo | Tipo de Acao | Detalhes da Acao / Parametros |
| :--- | :--- | :--- | :--- |
| 01 | Sistema | Setup | Autorun atrelado ao `Switch 044_Encontro`; `Self Switch A` bloqueia retrigger. |
| 02 | Sistema | Audio | `Play BGM [orquestra leve ritmica]`. |
| 03 | Sistema | Visual | `Tint Screen` para o tom padrão da vila. |
| 04 | NPCs | Movimento | Pescador e crianca em background usam `Set Movement Route`. |
| 05 | Lucas | Movimento | Caminha da porcao inferior esquerda ate o centro da trilha. |
| 06 | Lucas | Movimento | Vira-se para Maria e espera (`Wait ~5`). |
| 07 | Maria | Movimento | Desce da porcao central superior ate o encontro e para frente a frente (tile de distancia). |
| 08 | Lucas | Dialogo | `Show Text` com a fala “Sono estrategico” e busto sorridente. |
| 09 | Lucas | Audio | `Play SE Magic1`. |
| 10 | Lucas | Tempo | `Wait ~30` para espaçar a piada. |
| 11 | Maria | Dialogo | `Show Text` provocando o atraso. |
| 12 | Maria | Baloon | `Show Balloon ?`. |
| 13 | Maria | Audio | `Play SE Buzzer`. |
| 14 | Maria | Tempo | `Wait ~10`. |
| 15 | Maria | Efeito | `Tint Screen` amarelado com `Show Animation` e `Play SE Magic` (inicio da demonstracao). |
| 16 | Maria | Tempo | `Wait ~15`. |
| 17 | Lucas | Movimento | `Set Movement Route` aproxima e ativa `Change Player Transparency ~50%`. |
| 18 | Lucas | Transparencia | `Change Player Transparency 0`. |
| 19 | Lucas | Audio | `Play SE Teleport`. |
| 20 | Lucas | Tempo | `Wait ~15`. |
| 21 | Lucas | Movimento | Reaparece lateral com `Set Movement Route`. |
| 22 | Lucas | Efeito | `Show Animation Explosion`. |
| 23 | Lucas | Audio | `Play SE Explosion`. |
| 24 | Lucas | Baloon | `Show Balloon !`. |
| 25 | Lucas | Tempo | `Wait ~20`. |
| 26 | Maria | Baloon | `Show Balloon ♪`. |
| 27 | Maria | Dialogo | `Show Text` “Lead the way!” com busto sorridente. |
| 28 | Maria | Audio | `Play ME suave`. |
| 29 | Maria | Switch | `Switch Party_Formada = ON`. |
| 30 | Sistema | Party | `Change Party Member` adiciona Maria. |
| 31 | Sistema | Followers | Liga Followers ON para que Maria siga. |
| 32 | Lucas & Maria | Movimento | Caminham sincronizados em direcao à saida superior (`Set Movement Route` + `Wait ~3` entre passos). |
| 33 | Sistema | Camera | Evento paralelo simula Zoom-out. |
| 34 | Sistema | Audio | `Fadeout BGM 60`. |
| 35 | Sistema | Encerramento | Ativa `Self Switch A` e desliga `Switch 044_Encontro`. |

## Notas tecnicas
- Use `Conditional Branch` atrelado as switches `teleporte concluido`, `aceitou parceria` e `Party_Formada` para desbloquear falas extras e evitar reexecucao.
- Empregue `Show Balloon` (ponto de exclamacao, musica, interrogacao) para pontuar beats de surpresa e humor.
- Combine `Set Movement Route`, `Wait` e `Play SE` para controlar o timing das provocacoes, da demonstracao magica e do teleporte.
- Configure `Change Party Member` + `Followers ON` assim que o switch `Party_Formada` estiver ativo, garantindo que Maria siga Lucas apos a cutscene.
- Foco na teleporte: alterne transparencia, SE "Teleport", Tint Screen quente e animacao de explosao, depois desfaça o efeito com `Tint Screen` normal e `Wait ~20` antes do dialogo final.

## Proximos passos
1. Implementar o roteiro no RPG Maker MZ ajustando autorun/paginas e a sincronizacao de `Wait`/SE para manter o ritmo comico e a escalada emocional.
2. Testar os efeitos visuais/sonoros e o funcionamento das switches para garantir que os beats de surpresa, ceticismo e aceitacao sejam claros.
3. Validar o comportamento pos-cutscene: mudancas de dialogo de NPCs, desbloqueio de saidas e HUD atualizada com Maria na party.

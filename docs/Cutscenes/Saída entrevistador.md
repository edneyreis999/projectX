# Saída entrevistador

## Contexto
- Mapa: 017 (autorun).
- Tom: manhã ensolarada, vilarejo pacífico; clima leve e cômico.
- Personagens: Lucas (cabelo azul, relaxado) e Maria (cabelo castanho avermelhado, assertiva).
- Objetivo: entregar cutscene divertida que mostra amizade, truques mágicos e mostra recursos do plugin.

## Algoritmo narrativo sugerido

| Passo | Ator/Alvo | Tipo de Ação | Detalhes da Ação / Parâmetros |
| :--- | :--- | :--- | :--- |
| 01 | Sistema | Setup | Autorun ligado a `Switch 017_Cena`; `Self Switch A` bloqueando repetição. |
| 02 | Sistema | Áudio | `Play BGM “wind light”` com fade-in suave. |
| 03 | NPCs | Movimento | `Set Movement Route` em pescador e criança para sugerir vida no vilarejo. |
| 04 | Sistema | Tempo | `Wait 20` antes de liberar falas. |
| 05 | Lucas | Movimento | `Set Movement Route`: caminha pela esquerda e vira para frente. |
| 06 | Lucas | Diálogo | `Show Text` elogiando a manhã com busto sorridente. |
| 07 | Lucas | Som | `Play SE “bird chirp”` acompanhando a fala leve. |
| 08 | Lucas | Ritmo | `Wait 30` para espaçar o elogio. |
| 09 | Maria | Diálogo | `Show Text` mencionando o atraso do dia anterior; busto sério. |
| 10 | Maria | Som | `Play SE “notice”` ao reagir. |
| 11 | Maria | Visual | `Show Balloon “!”`. |
| 12 | Maria | Ritmo | `Wait 10` antes de cortar para Lucas. |
| 13 | Lucas | Diálogo | `Show Text` sobre “sono estratégico” com busto confiante. |
| 14 | Lucas | Som | `Play SE “sparkle”` para marcar a desculpa. |
| 15 | Lucas | Música | `Fadeout BGM 60` para isolar piada. |
| 16 | Lucas | Ritmo | `Wait 15`. |
| 17 | Maria | Som | `Play SE “rumble low”` representando o ronco. |
| 18 | Maria | Visual | `Show Animation “exclamation”` + `Show Text` surpresa. |
| 19 | Maria | Ritmo | `Wait 20`. |
| 20 | Sistema | Diálogo | `Show Text` explicando que foi o estômago de Lucas. |
| 21 | NPCs | Visual | `Show Balloon “?”`; reação ao ronco. |
| 22 | Sistema | Ritmo | `Wait 15`. |
| 23 | Lucas | Efeito | `Transparent ON` e `Teleport` lateral via `Set Movement Route`. |
| 24 | Lucas | Som | `Play SE “teleport”`. |
| 25 | Lucas | Diálogo | `Show Text` “assista ao truque” com busto confiante. |
| 26 | Lucas | Ritmo | `Wait 20`. |
| 27 | Maria | Diálogo | `Show Text` meta sobre desaparecer o jogador. |
| 28 | Maria | Transparência | `Change Player Transparency ON`, depois `OFF`. |
| 29 | Maria | Som | `Play SE “fade”`. |
| 30 | Maria | Visual | Busto travesso com `Show Picture` / `Erase Picture` transições. |
| 31 | Maria | Ritmo | `Wait 15`. |
| 32 | Maria | Efeito | `Show Animation “sparkle”`. |
| 33 | Maria | Diálogo | `Show Text` “Guie o caminho!” com busto confiante. |
| 34 | Maria | Áudio | `Play BGM “wind calm”`. |
| 35 | Maria | Ritmo | `Wait 30`. |
| 36 | Lucas | Diálogo | `Show Text` “Victory!” com busto resignado. |
| 37 | Lucas | Efeito | `Show Animation “confetti”`. |
| 38 | Lucas | Movimento | `Set Movement Route`: recua e vira para Maria. |
| 39 | Lucas | Ritmo | `Wait 20`. |
| 40 | Lucas & Maria | Movimento | Caminham juntos para o centro com rota sincronizada. |
| 41 | Sistema | Câmera | Simula “zoom out” com recuo da câmera ou evento paralelo. |
| 42 | Sistema | Áudio | `Fadeout BGM 60`. |
| 43 | Sistema | Encerramento | `Control Self Switch A = ON`; `Switch 017_Cena = OFF`. |

## Notas técnicas
- Sincronize `Wait` entre falas para manter ritmo cômico e dar espaço aos efeitos sonoros.
- Use switches/auto switches para evitar repetições e controlar páginas (ex.: `Switch 017_Cena` + `Self Switch A`).
- Ative `Transparent`, `Teleport` e `Change Player Transparency` para os truques mágicos, e `Show Picture`/`Erase Picture` para bustos.
- NPCs reagindo via `Set Movement Route` e `Show Balloon` reforçam o ambiente vivo.

## Próximos passos
1. Implemente o fluxo acima no RPG Maker MZ, configurando autorun, switches e eventos conforme descrito.
2. Teste a cena para ajustar `Wait` e o timing do “ronco” e das magias, garantindo o zoom out final.
3. Se precisar do relatório técnico-narrativo final ou de refinamentos adicionais, forneça dúvidas remanescentes.

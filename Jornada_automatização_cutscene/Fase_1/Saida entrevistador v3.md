Perfeito — com isso eu já consigo fechar o roteiro **sem inventar nada** e com execução bem “MZ-friendly”.

### [Manhã no Vilarejo — Truque do Dia] - Algoritmo de Eventos

**Gatilho:** Autorun (ao entrar no mapa)
**Atores:** Lucas, Maria, Player (presente, sem fala)
**Local:** Vilarejo (externo; estrada de terra, gramado, cabana com teto de palha, poço)

| Passo | Ator/Alvo | Tipo de Ação     | Detalhes da Ação / Parâmetros                                                       |
| :---- | :-------- | :--------------- | :---------------------------------------------------------------------------------- |
| 01    | Sistema   | Câmera / Sistema | (Condição implícita) Executar apenas se `S_morningSceneDone` = OFF                  |
| 02    | Sistema   | Sistema          | Tint Screen: tons claros e quentes                                                  |
| 03    | Sistema   | Som              | Play BGS: pássaros / natureza ambiente                                              |
| 04    | Maria     | Movimento        | Set Movement Route: caminhar pelo caminho da direita até ficar de frente para Lucas |
| 05    | Lucas     | Movimento        | Set Movement Route: virar para a direita (encarar Maria)                            |
| 06    | Lucas     | Sistema          | Show Balloon Icon: `!`                                                              |
| 07    | Sistema   | Sistema          | Wait: 60 frames (~1s)                                                               |
| 08    | Lucas     | Diálogo          | Show Text (Face Lucas): linha curta iniciando o desafio amigável                    |
| 09    | Maria     | Sistema          | Show Balloon Icon: `♪`                                                              |
| 10    | Maria     | Diálogo          | Show Text (Face Maria): resposta curta e descontraída                               |
| 11    | Lucas     | Sistema          | Show Balloon Icon: `...` ou `suor`                                                  |
| 12    | Lucas     | Movimento        | Set Movement Route: Change Opacity 150                                              |
| 13    | Lucas     | Sistema          | Wait: 30 frames                                                                     |
| 14    | Lucas     | Movimento        | Set Movement Route: Change Opacity 255                                              |
| 15    | Maria     | Efeito           | Flash Screen: branco, intensidade 100, duração 15 frames                            |
| 16    | Maria     | Movimento        | Set Event Location: mover para um tile adjacente                                    |
| 17    | Maria     | Sistema          | Wait: 15 frames (silêncio/punchline visual)                                         |
| 18    | Maria     | Movimento        | Set Movement Route: Move Forward                                                    |
| 19    | Maria     | Sistema          | Show Balloon Icon: `♪`                                                              |
| 20    | Sistema   | Diálogo          | Show Choices: “Provocar” / “Ser gentil”                                             |
| 21    | Lucas     | Diálogo          | When [Provocar]: reação curta do Lucas (1 linha)                                    |
| 22    | Lucas     | Diálogo          | When [Ser gentil]: reação curta do Lucas (1 linha)                                  |
| 23    | Maria     | Diálogo          | Show Text (Face Maria): “Quem sabe na próxima você me alcança! ♪”                   |
| 24    | Sistema   | Sistema          | Control Switches: `S_morningSceneDone` = ON                                         |
| 25    | Sistema   | Sistema          | Erase Event                                                                         |

Se você quiser que eu deixe isso **ainda mais plug-and-play**, eu posso também sugerir (sem inventar lore) um “texto placeholder” bem curtinho pras 3 falas que ficaram em aberto (Lucas inicial, Maria resposta, Lucas reação por escolha) — mas só se você me autorizar a preencher essas linhas com frases genéricas.
# Auditoria estática independente — task-1.1

Status: `partial-pass`.

- JSON de `frontend/data/Map022.json`: válido.
- Evento 20: três páginas; base paralela sem condição; páginas vazias de desligamento por S43 e V106>=10.
- GabWindow: 12 chamadas `GabTextOnly`, `ForceGab=false`, overrides decodificáveis e IDs aprovados.
- Cada fala segue `GabTextOnly -> WaitForGab -> Wait`.
- Evento 30: `S43 ON -> ClearGab -> WaitForGab -> Show Text`.
- Crianças e evento 21: sem chamadas GabWindow.

Limitação bloqueante para a AC de diff restrito: `Map022.json` já estava
amplamente modificado no working tree e não havia baseline pré-escrita nem o
validator planejado. Portanto, não é possível atribuir ou excluir com prova as
alterações fora de eventos 20/30 a esta execução.

Playtest, aceitação do editor e validação de timing/clipping/save-load continuam
pendentes.

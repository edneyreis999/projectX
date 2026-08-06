# Validação estática de runtime

- `Map022.json` e `Map045.json` foram parseados após a alteração.
- Inventário: 25 payloads com `BypassAntiRepeat=true`, 13 com `ForceGab=true` e 16 automáticos sem força/bypass.
- `Coreto_GabWindowDefaults.js` passa em `node --check` e afeta somente `Window_Gab`.
- `plugins.js` passa no validador de envelope; o helper está ativo uma vez, imediatamente após `VisuMZ_4_GabWindow`.
- `git diff --check` passou.

Pendências obrigatórias: abrir/salvar/reabrir os mapas e Plugin Manager no editor e realizar Playtest New Game conforme `technical-analysis.md`.

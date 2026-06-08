# Troubleshooting — Save Core

## Problemas Comuns

### Autosave não funciona

1. Verifique se **Database → System 1 → Enable Autosave** está marcado
2. Confirme se `Start Enabled?` está como `true` nos Plugin Parameters
3. Verifique se o jogador não desativou autosave no menu Options
4. Se usando Plugin Command `Request`, confirme que `Enable/Disable` não foi desativado

### "NEW!" não aparece no autosave

Isso é **intencional**. O marcador "NEW!" não é exibido em slots de autosave por design.

### Sideview Battler não aparece em saves antigos

Saves criados antes da instalação do plugin podem não ter os dados de SV Battler. Salve sobre os arquivos existentes para que os gráficos sejam corretamente capturados.

### Global Switch não está persistindo

1. Confirme que `<Global>` está no **nome** do switch/variable (não na note)
2. Verifique que não há conflito com tags `<JS>` ou `<Self>` — são mutuamente exclusivas
3. Teste em um novo save após configurar

### Save Confirm Window não aparece

1. Verifique `Enable Window?` nas Save Confirm Window Settings
2. Confirme que `Pop Up Duration` não está como 0
3. Verifique se o código em `JS: X, Y, W, H` está correto

### Text Codes não funcionam em descrições

- `\V[x]`, `\N[x]`, `\P[x]` são **save-local** — referem-se ao save que está sendo visualizado
- Outros text codes extraem dados do jogo atualmente ativo
- Verifique se a sintaxe está correta (barras invertidas duplas em eventos: `\\V[x]`)

### Plugin Commands não aparecem

1. Confirme que o plugin está instalado e habilitado no Plugin Manager
2. Verifique a ordem: Save Core (Tier 1) deve ficar **abaixo** de plugins Tier 0
3. Reinicie o RPG Maker MZ após instalar o plugin

## Relacionado

- [Glossário](glossario.md)
- [General Save Settings](../configuracao/general-save-settings.md)
- [Autosave Settings](../configuracao/autosave-settings.md)

# Failsafes e Scripts

## Scroll-Linked Pictures
Se o filename de um Parallax comeca com `!`, ele e bound ao map scrolling. O mesmo agora funciona com Pictures: filename com `!` no inicio = bound ao scroll do mapa.

## Movement Route Scripts
Codigo em Movement Route Script commands que falha nao crasha o jogo. O erro e logado no console e o jogo continua.

## Script Call Failsafes
Codigo em Conditional Branches, Control Variables, e Script Calls que falha nao crasha o jogo. O erro e logado no console e o jogo continua.

## Digit Grouping
Opcao para formatar numeros conforme locale:
- `en-US`: 1234567.123456 → 1,234,567.123456
- `es-ES`: 1234567.123456 → 1.234.567,123456

Regras:
- Usa `Number.toLocaleString()` do JavaScript
- Trailing zeros sao removidos: 123.45000 → 123.45
- Mais de 6 decimais sao arredondados: 0.123456789 → 0.123457
- Numeros entre `[` `]`, `<` `>` sao excluidos (text codes): `\I[1234]` permanece
- Use `{{1234567890}}` para bypassar digit grouping

Configuracao: Plugin Manager > VisuMZ_0_OptionsCore > QoL Settings > Digit Grouping

Aplicavel a:
- Standard Text (janelas)
- Ex Text (drawTextEx/mensagens)
- Damage Sprites (batalha)
- Gauge Sprites (HP/MP/TP gauges)

## Show Scrolling Text como Script Estendido
Se `// Script Call` for inserido no Show Scrolling Text, o comando inteiro roda como script call. Util porque o comando "Script..." tem maximo de 12 linhas. Show Scrolling Text permite mais linhas. Nao ativa sem `// Script Call` no conteudo.

# VisuStella Aggro Control System - Documentacao Completa para LLMs

## Sumario

Documentacao catalogada do plugin Aggro Control System (Tier 2) da VisuStella MZ para RPG Maker MZ. O plugin adiciona tres mecanicas complementares de controle de targeting em batalha: Provoke, Taunt e Aggro.

## Mecanicas

### Provoke
Baseado em states. Forca o alvo a atacar apenas o provocador com acoes single-target. Multiplos provokes sao resolvidos pela prioridade do state. States com `<Provoke>` se removem automaticamente se o provocador morrer. Bypass via `<Bypass Provoke>`.

### Taunt
Aplicavel em trait objects (Actor, Class, Weapon, Armor, Enemy, State). Tipos: All, Physical, Magical, Certain Hit. Tipos podem ser combinados. Multiplos taunters permitem selecao entre eles. Bypass via `<Bypass Taunt>`.

### Aggro
Valor numerico acumulativo. Gerado por dano, cura, notetags e plugin commands. Prioridade: Weighted (probabilidade) ou Highest (sempre o maior). Multiplicadores sao multiplicativos. Gauges visuais mostram valor relativo.

### Hierarquia
Provoke > Taunt > Aggro. Cada nivel so e considerado se os anteriores nao se aplicam ou sao bypassados.

## Documentos

### conceitos/
- `visao-geral.md` - Introducao completa, casos de uso, tabela de funcionalidades
- `provoke.md` - Mecanica de provoke, comportamento, bypass, visual
- `taunt.md` - Tipos de taunt, trait objects, combinacoes, visual
- `aggro.md` - Acumulacao, multiplicadores, targeting, gauge
- `prioridades.md` - Hierarquia completa, fluxo de decisao da AI, cenarios

### notetags/
- `provoke.md` - `<Provoke>`, `<Provoke Height Origin>`, `<Bypass Provoke>`
- `taunt.md` - `<Taunt>`, `<Physical/Magical/Certain Taunt>`, `<Bypass Taunt>`
- `aggro.md` - `<User/Target Aggro>`, `<Aggro>`, `<Aggro Multiplier>`, targeting notetags
- `javascript-aggro.md` - `<JS User Aggro>`, `<JS Target Aggro>` com exemplos
- `referencia-rapida.md` - Tabela unica com todas as notetags e trait objects suportados

### comandos/
- `atores.md` - Actor: Change Aggro, Actor: Set Aggro
- `inimigos.md` - Enemy: Change Aggro, Enemy: Set Aggro

### parametros/
- `provoke-settings.md` - Line settings, visual options (requer Battle Core)
- `taunt-settings.md` - Animation IDs, cycle settings (requer Core Engine + Battle Core)
- `aggro-settings.md` - Priority mode, aggro per damage/heal, gauge configuration

### referencia/
- `requisitos.md` - Requisitos obrigatorios/opcionais, tier, ordem no Plugin Manager
- `compatibilidade.md` - Compatibilidade com outros plugins, troubleshooting
- `glossario.md` - Termos do sistema, RPG Maker, tipos de acao

## Relacao entre Areas

- **Conceitos** explicam COMO cada mecanica funciona
- **Notetags** mostram COMO implementar via database
- **Comandos** mostram COMO manipular via eventos
- **Parametros** mostram COMO configurar visualmente
- **Referencia** fornece contexto para decisoes de implementacao

## Origem

Documento original extraido da documentacao oficial da VisuStella MZ e catalogado para uso por LLMs.

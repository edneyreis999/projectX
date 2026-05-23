# Enhanced TP System - VisuStella MZ - Documentação Completa

## Sumário

Esta documentação cobre o Enhanced TP System da VisuStella para RPG Maker MZ, um plugin que expande drasticamente o sistema de TP (Tactic Points) do RPG Maker, permitindo múltiplos modos de TP, fórmulas customizáveis para ganho de TP, e controle avançado sobre o gauge de TP.

## Descrição dos Documentos

### Conceitos Fundamentais

**conceitos/visao-geral.md**
- Introdução ao sistema de TP do RPG Maker MZ
- Limitações do sistema base
- Recursos adicionados pelo plugin (30 modos predefinidos)
- Funcionalidades principais (unlock modes, gauge colors, etc.)

**conceitos/mudancas-core.md**
- MaxTP Overwrite - Alteração no limite máximo de TP
- Preserve TP - Mudança na preservação entre batalhas
- Initial TP Gain - Controle do TP inicial
- On Damage TP Gain - Alteração no ganho ao receber dano
- Sprite_Gauge Changes - Modificações visuais no gauge

### Notetags

**notetags/gerais.md**
- `<TP Mode: name>` - Define modo inicial de TP
- `<Starting TP Modes>` - Modos disponíveis para actor
- `<Change Target TP Mode: name>` - Muda modo de alvo
- `<Change User TP Mode: name>` - Muda modo do usuário
- Uso em Actor, Enemy, State, Skill, Item

**notetags/atores.md**
- `<Learn TP Mode: name>` - Aprender modo ao aprender skill
- `<Learn TP Modes>` - Múltiplos modos de uma vez
- `<Unlock TP Mode: name>` - Desbloquear modo via skill/item
- `<Unlock TP Modes>` - Desbloquear múltiplos modos
- `<Force TP Mode: name>` - Forçar modo específico

**notetags/referencia-rapida.md**
- Lista compacta de todas as notetags
- Formato sintético para consulta rápida
- Uso pretendido para cada notetag

### Comandos de Plugin

**comandos/atores.md**
- Actor: Change TP Mode - Alterar modo de actor(s)
- Actor: Unlock TP Mode - Desbloquear modo(s)
- Actor: Unlock All TP Modes - Desbloquear todos
- Parâmetros e uso detalhados

**comandos/inimigos.md**
- Enemy: Change TP Mode - Alterar modo de inimigo(s)
- Índices e seleção de alvos

**comandos/sistema.md**
- System: Show/Hide TP Mode - Controle de visibilidade
- Integração com Scene_Skill

### Parâmetros

**parametros/configuracao-geral.md**
- Default TP Mode - Modo padrão para battlers
- Global TP Modes - Modos disponíveis globalmente
- Show TP Mode? - Visibilidade no Scene_Skill
- TP Mode Command/Icon - Customização visual

**parametros/modos.md**
- General - Nome, ícone, MaxTP Formula
- Preserve TP? - Configuração de persistência
- Gauge - Flash, cores, label customizado
- Estrutura completa de um modo de TP

**parametros/formulas.md**
- Generic - Initial TP, Critical Hit, Evasion, Use Item/Skill
- Regen - TP Regen, Critical/Full HP/MP, Only Member
- HP Damage/Heal - Take/Deal/Ally formulas
- MP Damage/Heal - Take/Deal/Ally formulas
- Buffs/Debuffs - Deal/Gain Ally/Enemy
- States - Deal/Gain Ally/Enemy
- Death - Ally/Enemy death triggers
- Battle - Win/Flee/Lose battle

### Referência

**referencia/glossario.md**
- TP (Tactic Points)
- TP Mode
- Preserve TP
- MaxTP
- TCR Multiplier
- Gauge Flash

**referencia/faq.md**
- Como criar modos customizados
- Como fazer TP persistir entre batalhas
- Como mudar modo durante batalha
- Troubleshooting comum

## Relação Entre Áreas

**Fluxo de Configuração:**
1. Configurar Default/Global Modes (configuracao-geral.md)
2. Criar/editar TP Modes (modos.md)
3. Definir fórmulas de ganho (formulas.md)
4. Aplicar notetags (notetags/)
5. Usar plugin commands (comandos/)

**Dependências:**
- mudancas-core.md explica por que certas coisas funcionam diferentemente
- modos.md é pré-requisito para entender formulas.md
- notetags/gerais.md é base para notetags/atores.md

## Links e Referências Internas

- MaxTP: descrito em mudancas-core.md, configurado em modos.md
- Preserve TP: explicado em mudancas-core.md, configurado em modos.md
- TP Modes: estrutura em modos.md, fórmulas em formulas.md
- Gauge colors:只在 modos.md seção Gauge

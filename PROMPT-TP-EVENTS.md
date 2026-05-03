# Prompt: Implementar Coreto_TpEvents.js + Corrigir Skills Passivas do Thorin

## Contexto

Este é um projeto RPG Maker MZ chamado "Daratrine - A Origem" com plugins customizados. As skills passivas 88 e 89 do personagem Thorin (classe Fundeiro) não estão funcionando porque usam `<Auto Trigger: Death/Battle Win>` do VisuStella AutoSkillTriggers combinado com `<Gain TP>` do Coreto_TpNotetags, mas o auto-trigger bypassa o pipeline onde o Gain TP é processado.

A solução é criar um novo plugin **Coreto_TpEvents.js** que oferece notetags de ganho de TP baseadas em eventos de batalha, aplicáveis em passive states individuais. Isso resolve o Thorin E cria um sistema extensível para todos os personagens.

## Issue Tracker

Epic: `projectX-j0l` — Skills passivas 88/89 do Thorin

Chain de dependência:
```
projectX-2lp (P1) Infra base Coreto_TpEvents.js
  → projectX-oao (P1) Hooks Enemy Death + Battle Win
    → projectX-z6g (P2) States 97/98 + classe Fundeiro
      → projectX-sar (P2) Testes manuais
  → projectX-19c (P3) Hooks restantes
```

Comandos: `bd update <id> --claim` para assumir, `bd close <id>` para completar.

## Passo 1: Implementar Coreto_TpEvents.js (projectX-2lp + projectX-oao)

Criar `frontend/js/plugins/Coreto_TpEvents.js`.

### Arquivos de Referência OBRIGATÓRIOS (ler antes de implementar)

1. **Plugin existente como padrão de código:**
   - `frontend/js/plugins/Coreto_TpNotetags.js` — Siga este plugin como modelo de estrutura, estilo de código, header, hook pattern, e tratamento de erros. É o plugin irmão que lida com custo/ganho de TP no uso de skills.

2. **Docs do TP System (para entender os eventos e hook points):**
   - `docs/rpg-maker-for-ia/docs-visustella/battle-plugins/visustella-tp-system/llms-full.txt` — Referência completa do Enhanced TP System
   - `docs/rpg-maker-for-ia/docs-visustella/battle-plugins/visustella-tp-system/parametros/formulas.md` — Lista TODAS as fórmulas de TP (Enemy Death, Win Battle, Critical Hit, etc.) com variáveis disponíveis
   - `docs/rpg-maker-for-ia/docs-visustella/battle-plugins/visustella-tp-system/conceitos/mudancas-core.md` — Mudanças que o TP System faz no core do RPG Maker

3. **Docs do SkillsStatesCore (para entender passive states):**
   - `docs/rpg-maker-for-ia/docs-visustella/battle-plugins/visustella-skills-states-core/llms-full.txt` — Referência completa
   - `docs/rpg-maker-for-ia/docs-visustella/battle-plugins/visustella-skills-states-core/notetags/passive-states.md` — Como `<Passive State: x>` funciona
   - `docs/rpg-maker-for-ia/docs-visustella/battle-plugins/visustella-skills-states-core/conceitos/passive-states-explicacao.md` — Diferenças entre states regulares e passive states

4. **Dados do jogo (para implementar Step 2):**
   - `frontend/data/States.json` — States existentes. State 92 (Olho de Falcao I) é o modelo de passive state do Thorin
   - `frontend/data/Classes.json` — Classe 5 (Fundeiro) onde adicionar os Passive States
   - `frontend/data/Skills.json` — Skills 88/89 que serão substituídas pelos states

### Especificação do Plugin

#### Header
```javascript
//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
// Coreto_TpEvents
//= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~= =~=
/*:
 * @target MZ
 * @plugindesc Notetags para ganho de TP baseado em eventos de batalha
 * @author Coreto
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_2_EnhancedTpSystem
 * @orderAfter Coreto_TpNotetags
 *
 * @param Debug Mode
 * @type boolean
 * @default false
 * @desc Log TP events no console para debug
 *
 * @help
 * ... (documentação completa das notetags)
 */
```

#### Notetags (usar em State ou Skill Notetags)

```
<TP On Enemy Death: +x>        # Inimigo morre (qualquer inimigo, qualquer matou)
<TP On Ally Death: +x>         # Aliado morre
<TP On Battle Win: +x>         # Vitória em batalha
<TP On Critical Hit: +x>       # Causa acerto crítico
<TP On Evasion: +x>            # Esquiva de ataque
<TP On Take HP Damage: +x>     # Recebe dano HP
<TP On Deal HP Damage: +x>     # Causa dano HP
<TP On Gain Buff: +x>          # Recebe buff
<TP On Gain Debuff: +x>        # Recebe debuff
<TP On Gain State: +x>         # Recebe state
<TP On Flee Battle: +x>        # Foge da batalha
<TP On Lose Battle: +x>        # Perde batalha
```

#### Arquitetura Interna

1. **Notetag Parser**: Regex para extrair `<TP On EventName: +x>` de states/skills
2. **State Scanner**: Função que coleta todos os passive states + skills aprendidas de um actor e extrai notetags de TP
3. **applyTpEvent(actor, eventName)**: Função central que:
   - Escaneia passive states e skills do actor
   - Soma todos os valores de `<TP On eventName>` encontrados
   - Chama `actor.gainTp(total)` se total > 0
4. **Hooks**: Cada evento de batalha chama `applyTpEvent` para os actors relevantes

#### Hooks Prioritários (implementar primeiro - resolve Thorin)

**Enemy Death:**
- Hook em `Game_Enemy.prototype.die()`
- Aplica `applyTpEvent` para todos `$gameParty.aliveMembers()`

**Battle Win:**
- Hook em `BattleManager.processVictory()` (ou equivalente no ponto certo)
- Aplica `applyTpEvent` para todos `$gameParty.aliveMembers()`

#### Comportamento Importante
- TP gain do Coreto_TpEvents **acumula** com o TP System nativo (soma, não substitui)
- Se o TP Mode já dá 5 TP por Enemy Death e o state dá +8, o actor ganha 13
- Notetags podem ser colocadas em States OU Skills aprendidas
- Apenas actors vivos recebem TP de eventos

## Passo 2: Criar States e Configurar Classe (projectX-z6g)

### State 97 - Olho do Cacador (Kill)
```json
{
  "id": 97,
  "autoRemovalTiming": 0,
  "chanceByDamage": 100,
  "traits": [],
  "iconIndex": 63,
  "maxTurns": 1,
  "message1": "",
  "message2": "",
  "message3": "",
  "message4": "",
  "messageType": 1,
  "minTurns": 1,
  "motion": 0,
  "name": "Olho do Cacador (Kill)",
  "note": "<TP On Enemy Death: +8>",
  "overlay": 0,
  "priority": 50,
  "removeAtBattleEnd": false,
  "removeByDamage": false,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "stepsToRemove": 100
}
```

### State 98 - Olho do Cacador (Win)
```json
{
  "id": 98,
  "autoRemovalTiming": 0,
  "chanceByDamage": 100,
  "traits": [],
  "iconIndex": 63,
  "maxTurns": 1,
  "message1": "",
  "message2": "",
  "message3": "",
  "message4": "",
  "messageType": 1,
  "minTurns": 1,
  "motion": 0,
  "name": "Olho do Cacador (Win)",
  "note": "<TP On Battle Win: +15>",
  "overlay": 0,
  "priority": 50,
  "removeAtBattleEnd": false,
  "removeByDamage": false,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "stepsToRemove": 100
}
```

### Classe Fundeiro (ID 5) - Alterações
- Adicionar no `note` da classe: `<Passive State: 97>` e `<Passive State: 98>`
- Remover skills 88 e 89 dos `learnings` (substituídas pelos states)
- Manter as skills 90-99 nos learnings (são skills ativas que funcionam normalmente)

## Passo 3: Testar (projectX-sar)

Cenários:
1. Matar inimigo → Thorin ganha +8 TP
2. Matar 3 inimigos → Thorin ganha +24 TP
3. Vencer batalha → Thorin ganha +15 TP
4. Outros actors NÃO ganham TP de Enemy Death/Win
5. TP acumula com TP Mode nativo se configurado

## Regras do Projeto

- **Git author**: Edney <edney_reis999@hotmail.com> — NUNCA adicionar Co-authored-by
- **Conventional Commits**: `feat: add Coreto_TpEvents plugin for battle event TP gain`
- **Testes**: `npm test` antes de commitar
- **Lint**: `npm run lint` e `npm run format` antes de commitar
- **Session close**: `git pull --rebase && bd dolt push && git push` é obrigatório ao terminar

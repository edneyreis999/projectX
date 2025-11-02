# 🎮 MVP Mapa de Decisões - Brainstorming Session

**Data**: 2025-10-31
**Objetivo**: Criar um mapa MVP para testar todas as ações e reações das tomadas de decisões no jogo Daratine - A Origem

---

## 📋 Contexto do Projeto

### Propósito do MVP

Criar um mapa não-jogável final, mas sim um ambiente de testes controlado para validar:

- Sistema de tomada de decisões do jogador
- Fluxo entre quests lineares e não-lineares
- Impacto das decisões na progressão narrativa
- Mecânicas de convergência e divergência de caminhos
- Interface de interação com NPCs para decisões

### Requisitos Funcionais

1. **Mapa Grande Dividido em Ilhas**: Cada ilha representa uma quest
2. **Quests Lineares**: Jogador só pode avançar após tomar decisão específica
3. **Quests Não-Lineares**: Jogador escolhe ordem de progressão
4. **Sistema de Decisões**: NPCs apresentam situações e opções
5. **Tracking de Decisões**: Sistema rastreia escolhas e seus impactos

---

## 🗺️ Arquitetura do Mapa MVP

### Estrutura Visual - Layout de Ilhas

```
                    [HUB CENTRAL]
                   Quest Registry
                  Debug Console NPC
                         |
        ┌────────────────┼────────────────┐
        |                |                |
    [NORTE]          [LESTE]          [SUL]
 Quests Lineares   Semi-Lineares   Branching
        |                |                |
        ↓                ↓                ↓

[NORTE - Cadeia Linear]
Tutorial → Q2 → Q3 → Q4 → Q5
  (Ponte desbloqueada após conclusão)

[LESTE - Semi-Linear]
Q6 (Decisão Sigmetal) ──┐
Q7 (Escolhas de Rota)   ├──→ Q8 (Política)
Q8 (Conselho)           ┘

[SUL - Branching Complexo]
        Q11 (Chegada em Gildrat)
         /        |        \
       Q12     Q13-A      Q13-B
    (Resgate) (Aviso)  (Ir para Casa)
         \        |        /
              Q14 (Defesa)
           [Convergência]
```

### Design de Cada Ilha (Padrão)

Cada ilha de quest contém:

1. **Portal de Entrada** (bloqueado até pré-requisitos cumpridos)
2. **NPC Quest Giver** (apresenta a situação)
3. **NPCs de Decisão** (representam opções de escolha)
4. **Sistema de Feedback Visual** (cristais, efeitos, etc.)
5. **Portal de Saída** (leva para próxima quest ou hub)
6. **Cristal de Debug** (inspeciona variáveis ativas)

### Código de Cores

- 🔵 **Azul**: Quests lineares (progressão sequencial)
- 🟢 **Verde**: Quests semi-lineares (escolhas convergentes)
- 🔴 **Vermelho**: Quests branching (múltiplos caminhos)
- ⚪ **Branco**: Hub central (acesso livre)

### Indicadores Visuais de Estado

- **Cristal Cinza**: Quest bloqueada (pré-requisitos não cumpridos)
- **Cristal Amarelo**: Quest disponível (pode ser iniciada)
- **Cristal Verde**: Quest completada (pode revisitar)
- **Ponte Materializada**: Caminho desbloqueado
- **Pedras de Variável**: Exibem valores de game variables relevantes

---

## 🎯 Análise das Quests (Da Documentação)

### Tipos de Decisões Identificados

#### 1. Decisões Convergentes (Cosméticas)

**Característica**: Mudam tom/personalidade, mas não alteram progressão

**Exemplos**:

- Quest 3 (Fim de Jogo): Tom de resposta a Tordan
  - Respeitoso, sarcástico ou rebelde
  - **Resultado**: Mesmo desfecho, diálogo diferente

- Quest 4 (É Hora de Crescer): Postura na loja
  - Determinado, esquivar, fugir
  - **Resultado**: Mhordred paga de qualquer forma

**Variáveis**: Geralmente flags para tracking, sem impacto estrutural

#### 2. Decisões Rastreadas (Impacto Narrativo)

**Característica**: Afetam recursos, relações, mas convergem depois

**Exemplos**:

- Quest 6 (Minerador Aprendiz): Destino do Sigmetal
  - Entregar a Balastrus (`v_sigmetal_destino = 1`)
  - Entregar a Tusk (`v_sigmetal_destino = 2`)
  - Guardar no baú (`v_sigmetal_destino = 3`)
  - Não entregar (`v_sigmetal_destino = 0`)
  - **Resultado**: Recompensas diferentes, história converge

- Quest 7 (Travessia Perigosa): Apoiar decisão
  - Apoiar Kilin (esperar tempestade)
  - Apoiar Tusk (partir imediatamente)
  - **Resultado**: Diálogos e relações, grupo parte igual

**Variáveis**: `v_sigmetal_destino`, flags de relação NPC

#### 3. Decisões Estruturais (Branching Real)

**Característica**: Abrem/bloqueiam conteúdo, criam caminhos paralelos

**Exemplos**:

- Quest 11 (Gildrat em Alarme): Escolha crítica
  - **A**: Seguir Filena → Quest 13 (Aviso em Kravens)
  - **B**: Ir ao Conselho → Quest 12 (Resgate em Melios)
  - **C**: Ir para casa → Quest 13b (Quando o Segundo Sol Chegar)
  - **Resultado**: Experiências totalmente diferentes, convergem em Q14

**Variáveis**: `v_quest_path_chosen`, flags de quest unlock/block

### Mapeamento Quest-por-Quest

| Quest ID | Nome | Tipo | Decisões Chave | Variáveis |
|----------|------|------|----------------|-----------|
| Q1 | Noite da História | Linear | Nome do protagonista | `$gameActors.actor(1).name` |
| Q2 | Semifinal | Linear | Postura com guardas | Convergente |
| Q3 | Fim de Jogo | Linear | Tom com Tordan | Convergente |
| Q4 | É Hora de Crescer | Linear | Compra armadura | Convergente |
| Q5 | Primeiro Contrato | Linear | Hesitar/assinar | Convergente |
| Q6 | Minerador Aprendiz | Semi-Linear | Sigmetal destino | `v_sigmetal_destino` |
| Q7 | Travessia Perigosa | Semi-Linear | Apoiar Kilin/Tusk | Relações NPC |
| Q8 | Voz do Conselho | Semi-Linear | Participar combate | `s_thorin_combat_choice` |
| Q11 | Gildrat em Alarme | **Branching** | Seguir Filena/Conselho/Casa | `v_branch_active` |
| Q12 | Resgate em Melios | Branching | - | Branch A |
| Q13 | Aviso em Kravens | Branching | - | Branch B |
| Q13b | Quando Segundo Sol | Branching | Avisar Tordan | Branch C |
| Q14 | Defender Gildrat | Convergência | Uso poder onírico | Final |

---

## 🔧 Sistema de Plugins - Arquitetura

### Estrutura de Plugins (Clean Architecture)

Seguindo o padrão estabelecido pelo `Coreto_Quest_Mina_Kravens`:

```
frontend/js/plugins/
├── Coreto_MVP_DecisionManager.js      (Controller - RPG Maker MZ)
│
frontend/js/application/
├── DecisionUseCase.js                 (Use Case - Orquestração)
│
frontend/js/domain/
├── DecisionDomain.js                  (Domain - Lógica Pura)
│
frontend/js/dto/
├── DecisionRequestDTO.js              (Contrato de Entrada)
└── DecisionResponseDTO.js             (Contrato de Saída)
```

### Plugin 1: Coreto_MVP_DecisionManager

**Responsabilidades**:

- Registrar pontos de decisão
- Apresentar opções ao jogador
- Gravar escolhas do jogador
- Validar pré-requisitos
- Gerenciar estado de quests

**Comandos do Plugin**:

#### `RegisterDecision`

```javascript
// Registra um ponto de decisão
@command RegisterDecision
@arg questId (number)
@arg decisionId (string)
@arg decisionType ("linear" | "branching" | "convergent")
@arg options (JSON array)
```

#### `PresentDecision`

```javascript
// Apresenta decisão ao jogador via NPC
@command PresentDecision
@arg decisionId (string)
@arg npcName (string)
@arg scenarioText (string)
```

#### `RecordChoice`

```javascript
// Grava escolha do jogador
@command RecordChoice
@arg decisionId (string)
@arg selectedOptionId (string)
@arg updateVariables (JSON object)
```

#### `CheckPrerequisites`

```javascript
// Valida se quest/decisão está acessível
@command CheckPrerequisites
@arg questId (number)
@returns boolean (acessível ou não)
```

#### `GetDecisionHistory`

```javascript
// Retorna histórico de decisões
@command GetDecisionHistory
@returns JSON array de decisões tomadas
```

#### `ResetDecisionChain`

```javascript
// Debug: reseta progresso para checkpoint
@command ResetDecisionChain
@arg checkpointQuestId (number)
```

### Plugin 2: Coreto_MVP_QuestNavigator

**Responsabilidades**:

- Gerenciar transição entre ilhas
- Atualizar indicadores visuais (cristais, pontes)
- Controlar acessibilidade de portais
- Exibir mapa de progresso

**Comandos do Plugin**:

#### `UpdateQuestStatus`

```javascript
// Atualiza status visual de quest
@command UpdateQuestStatus
@arg questId (number)
@arg newStatus ("locked" | "available" | "active" | "completed")
```

#### `MaterializeBridge`

```javascript
// Cria/remove ponte entre ilhas
@command MaterializeBridge
@arg fromIslandId (number)
@arg toIslandId (number)
@arg materialize (boolean)
```

#### `TeleportToQuest`

```javascript
// Debug: teleporta para ilha específica
@command TeleportToQuest
@arg questId (number)
```

### Plugin 3: Coreto_MVP_DebugTools

**Responsabilidades**:

- Inspecionar variáveis do jogo
- Visualizar árvore de dependências
- Simular decisões rapidamente
- Exportar/importar estado de teste

**Comandos do Plugin**:

#### `InspectVariables`

```javascript
// Mostra todas variáveis relevantes
@command InspectVariables
@displays window com v_* e s_* ativos
```

#### `VisualizeQuestTree`

```javascript
// Desenha árvore de quests e decisões
@command VisualizeQuestTree
@displays grafo de dependências
```

#### `FastForward`

```javascript
// Simula sequência de decisões
@command FastForward
@arg decisionSequence (JSON array)
```

#### `ExportState`

```javascript
// Exporta estado atual para arquivo
@command ExportState
@arg filename (string)
```

#### `ImportState`

```javascript
// Importa estado salvo
@command ImportState
@arg filename (string)
```

---

## 💾 Modelo de Dados

### DecisionRequestDTO

```javascript
class DecisionRequestDTO {
  constructor({
    questId,           // number - ID da quest dona
    decisionId,        // string - Identificador único
    decisionType,      // "linear" | "branching" | "convergent"
    currentContext: {
      playerState,     // object - Estado do jogador
      completedQuests, // array - Quests concluídas
      activeFlags      // array - Switches/variáveis relevantes
    },
    availableOptions: [
      {
        optionId,      // string - ID da opção
        text,          // string - Texto apresentado
        prerequisites, // array - Condições necessárias
        consequences: {
          variables,   // object - Variáveis a setar
          flags,       // object - Switches a alternar
          unlocksQuests, // array - Quests desbloqueadas
          blocksQuests   // array - Quests bloqueadas
        }
      }
    ]
  }) { /* ... */ }

  validate() { /* ... */ }
  toPlainObject() { /* ... */ }
}
```

### DecisionResponseDTO

```javascript
class DecisionResponseDTO {
  constructor({
    success,           // boolean - Decisão processada?
    selectedOption,    // object - Opção escolhida
    updatedVariables,  // object - Variáveis modificadas
    unlockedQuests,    // array - Novas quests disponíveis
    blockedQuests,     // array - Quests bloqueadas
    nextQuestId,       // number - Próxima quest sugerida
    branchInfo: {
      isBranching,     // boolean - Criou branch?
      branchId,        // string - Identificador do branch
      parallelPaths    // array - Caminhos paralelos abertos
    },
    convergenceInfo: {
      isConvergent,    // boolean - Caminhos se uniram?
      mergedBranches   // array - Branches que convergiram
    }
  }) { /* ... */ }

  toPlainObject() { /* ... */ }
}
```

### QuestStateModel

```javascript
class QuestStateModel {
  constructor({
    questId,           // number
    status,            // "locked" | "available" | "active" | "completed"
    prerequisites: [
      {
        type,          // "quest" | "decision" | "variable" | "flag"
        condition,     // mixed - Quest ID, valor, etc.
        operator       // "equals" | "greater_than" | "contains"
      }
    ],
    decisions,         // array - Pontos de decisão nesta quest
    branches: {
      nextQuests,      // array - Quests subsequentes possíveis
      blockedBy        // array - Quests que bloqueiam esta
    }
  }) { /* ... */ }
}
```

### Convenção de Variáveis

#### Game Variables

```javascript
// Status de Quests
v_mvp_quest_[id]_status
  // 0 = locked (bloqueada)
  // 1 = available (disponível)
  // 2 = active (em progresso)
  // 3 = completed (concluída)

// Decisões Tomadas
v_mvp_decision_[id]_choice
  // Armazena ID da opção escolhida

// Branches Ativos
v_mvp_branch_[name]_active
  // 0 = inativo
  // 1 = ativo

// Histórico de Decisões (JSON string)
v_mvp_decision_history
  // JSON array com todas decisões tomadas
```

#### Game Switches

```javascript
// Quest Desbloqueada
s_mvp_quest_[id]_unlocked
  // ON = acessível
  // OFF = bloqueada

// Branch Ativo
s_mvp_branch_[name]
  // ON = caminho aberto
  // OFF = caminho fechado
```

---

## 🎨 UX/UI - Fluxo de Interação

### Fluxo de Decisão com NPC

```
1. Jogador se aproxima do NPC Quest
   ↓
2. NPC apresenta cenário (diálogo)
   "A porta selada diante de você guarda segredos ancestrais.
    O que você fará?"
   ↓
3. Menu de escolhas aparece
   [Escolha]
   → Quebrar o selo (Requer: Explosivos)
     Respeitar o aviso (Caminho seguro)
     Investigar mais (Teste de habilidade)
     Ir embora por agora (Retornar depois)
   ↓
4. Jogador seleciona opção
   ↓
5. Feedback imediato
   - Visual: Cristal muda de cor
   - Audio: Som de decisão (chime)
   - Texto: "Você decidiu quebrar o selo!"
   ↓
6. NPC responde à escolha
   "Sua coragem será lembrada... ou lamentada."
   ↓
7. Estado do mundo atualiza
   - Ponte materializa para próxima ilha
   - Variáveis são atualizadas
   - Quest status muda
   ↓
8. Jogador pode prosseguir
```

### Elementos Visuais de Feedback

#### Cristais de Status

- **Aparência**: Cristais flutuantes sobre cada ilha
- **Estados**:
  - Cinza + Opaco = Bloqueada
  - Amarelo + Pulsante = Disponível
  - Verde + Brilhante = Completada
  - Azul + Girando = Ativa no momento

#### Pontes Mágicas

- **Materialização**: Gradual, com partículas de luz
- **Estados**:
  - Invisível = Caminho bloqueado
  - Semi-transparente = Pré-requisitos parciais
  - Sólida = Caminho liberado

#### Pedras de Variável

- **Função**: Exibir valores de game variables
- **Interação**: Jogador examina para ver detalhes
- **Exemplos**:

  ```
  [Pedra de Sigmetal]
  v_sigmetal_destino: 1
  "Entregue a Balastrus"

  [Pedra de Branch]
  v_mvp_branch_filena_active: 1
  "Seguindo caminho de Filena"
  ```

#### Sistema de Áudio

| Evento | Som | Descrição |
|--------|-----|-----------|
| Decisão tomada | Chime suave | Confirmação de escolha |
| Quest desbloqueada | Fanfare curto | Nova área acessível |
| Branch aberto | Tom misterioso | Múltiplos caminhos |
| Convergência | Acorde harmonioso | Caminhos se unem |
| Erro (bloqueado) | Som grave | Pré-requisito não cumprido |

### Debug Console (Hub Central)

**NPCs Especiais**:

1. **Inspector NPC** (Gnomo de óculos)
   - Mostra todas variáveis ativas
   - Lista decisions tomadas
   - Exibe quest tree

2. **Reset NPC** (Mago do tempo)
   - Oferece checkpoints de rollback
   - "Voltar para Quest 6?"
   - Confirmação de segurança

3. **Visualizer NPC** (Arquiteto)
   - Desenha mapa de dependências
   - Mostra caminhos possíveis
   - Destaca branches ativos

4. **Simulator NPC** (Velocista)
   - Fast-forward através de decisões
   - "Simular: Caminho de Filena completo"
   - Útil para testar convergências

---

## 🚀 Plano de Implementação

### Fase 1: Fundação (Semana 1-2)

**Objetivo**: Core do sistema de decisões

**Tarefas**:

- [ ] Implementar `DecisionDomain.js` (lógica pura)
  - Validação de pré-requisitos
  - Detecção de branches
  - Algoritmo de convergência

- [ ] Implementar `DecisionUseCase.js` (orquestração)
  - Leitura/escrita de variáveis
  - Integração com `CoretoCore`
  - Persistência de histórico

- [ ] Implementar DTOs
  - `DecisionRequestDTO.js`
  - `DecisionResponseDTO.js`
  - Validações e factories

- [ ] Testes unitários
  - Domain: 100% cobertura das regras
  - Use Case: 90%+ orquestração
  - Mocks de `$gameVariables` e `$gameSwitches`

**Entregável**: Sistema funcional de decisões (sem UI)

### Fase 2: Plugin Controller (Semana 3)

**Objetivo**: Integração com RPG Maker MZ

**Tarefas**:

- [ ] Implementar `Coreto_MVP_DecisionManager.js`
  - Cabeçalho de plugin com parâmetros
  - Registro de comandos (`PluginManager.registerCommand`)
  - Validação de dependências (`Coreto_Core`, `Coreto_Quests`)
  - Carregamento dinâmico (DTOs → Domain → UseCase)

- [ ] Comandos principais
  - `RegisterDecision`
  - `PresentDecision`
  - `RecordChoice`
  - `CheckPrerequisites`

- [ ] Sistema de logging
  - Integração com `CoretoCore.createLogger`
  - Logs críticos para decisões estruturais
  - Debug toggle via `AlternarLogs`

- [ ] Testes de plugin
  - Mocks de ambiente RPG Maker
  - Registro de comandos
  - Captura de `eventId`

**Entregável**: Plugin funcional e testado

### Fase 3: Mapa MVP (Semana 4)

**Objetivo**: Criar ambiente visual de testes

**Tarefas**:

- [ ] Design no RPG Maker MZ
  - Hub Central (mapa base)
  - 5 ilhas de quest (Q6, Q11, Q12, Q13, Q14)
  - Portais e pontes

- [ ] Cristais de status
  - Eventos com gráficos (cinza/amarelo/verde)
  - Script para mudar aparência baseado em variável

- [ ] NPCs de decisão
  - Quest Givers (apresentam cenário)
  - NPCs de opção (representam escolhas)
  - Diálogos integrados com plugin

- [ ] Sistema de teleporte
  - Portais entre ilhas
  - Validação de pré-requisitos
  - Feedback visual (bloqueado/liberado)

**Entregável**: Mapa navegável com 5 quests

### Fase 4: Plugins Auxiliares (Semana 5)

**Objetivo**: Ferramentas de navegação e debug

**Tarefas**:

- [ ] `Coreto_MVP_QuestNavigator.js`
  - `UpdateQuestStatus`
  - `MaterializeBridge`
  - `TeleportToQuest`

- [ ] `Coreto_MVP_DebugTools.js`
  - `InspectVariables` (window modal)
  - `VisualizeQuestTree` (grafo visual)
  - `FastForward` (simulação)
  - `ExportState` / `ImportState`

- [ ] NPCs de Debug no Hub
  - Inspector, Reset, Visualizer, Simulator
  - Interfaces de cada ferramenta

**Entregável**: Suite completa de debug tools

### Fase 5: Testes & Refinamento (Semana 6)

**Objetivo**: Validar todos os cenários

**Cenários de Teste**:

1. **Caminho Linear** (Q6 apenas)
   - [ ] Completar Q6 com cada opção de Sigmetal
   - [ ] Verificar variável `v_sigmetal_destino`
   - [ ] Confirmar que próxima quest desbloqueia

2. **Branching Simples** (Q11 → Q12)
   - [ ] Escolher "Ir ao Conselho"
   - [ ] Verificar que Q12 desbloqueia, Q13 bloqueia
   - [ ] Completar Q12 e chegar em Q14

3. **Branching Paralelo** (Q11 → Q13)
   - [ ] Escolher "Seguir Filena"
   - [ ] Verificar que Q13 desbloqueia, Q12 bloqueia
   - [ ] Completar Q13 e chegar em Q14

4. **Convergência** (Q12/Q13 → Q14)
   - [ ] Testar ambos caminhos levam a Q14
   - [ ] Verificar que estado converge corretamente
   - [ ] Confirmar que histórico de decisões está preservado

5. **Reset & Replay**
   - [ ] Fazer escolha A em Q11
   - [ ] Resetar para Q11
   - [ ] Fazer escolha B
   - [ ] Confirmar que estado anterior foi limpo

**Métricas de Sucesso**:

- ✅ 100% dos caminhos funcionam
- ✅ 0 erros de variável undefined
- ✅ Feedback visual sempre correto
- ✅ Reset não deixa estado inconsistente
- ✅ Histórico completo e preciso

---

## 📊 Critérios de Sucesso do MVP

### Funcionalidades Obrigatórias

#### Sistema de Decisões ✅

- [ ] Registrar decisões com metadados completos
- [ ] Apresentar opções ao jogador via NPC
- [ ] Gravar escolhas em variáveis persistentes
- [ ] Validar pré-requisitos antes de apresentar opções
- [ ] Detectar quando decisão cria branch
- [ ] Detectar quando branches convergem

#### Navegação de Quests ✅

- [ ] Bloquear ilhas até pré-requisitos cumpridos
- [ ] Atualizar indicadores visuais (cristais)
- [ ] Materializar/desmaterializar pontes
- [ ] Teleporte funcional entre ilhas
- [ ] Hub central sempre acessível

#### Debug Tools ✅

- [ ] Inspeção de todas variáveis relevantes
- [ ] Visualização de árvore de dependências
- [ ] Reset para checkpoint sem corrupção de estado
- [ ] Fast-forward para testar caminhos rapidamente
- [ ] Export/Import de estados de teste

### Testes de Validação

#### Caso 1: Decisão Convergente

**Setup**: Quest 3 (Fim de Jogo) - Tom com Tordan
**Passos**:

1. Escolher "Resposta Respeitosa"
2. Verificar variável `v_q3_tone = 1`
3. Confirmar que Quest 4 desbloqueia igual
4. Resetar e escolher "Resposta Rebelde"
5. Verificar variável `v_q3_tone = 3`
6. Confirmar que Quest 4 desbloqueia igual
**Resultado Esperado**: ✅ Diferentes tons, mesma progressão

#### Caso 2: Decisão Rastreada

**Setup**: Quest 6 (Minerador Aprendiz) - Sigmetal
**Passos**:

1. Escolher "Entregar a Balastrus"
2. Verificar `v_sigmetal_destino = 1`
3. Avançar até Quest 10 (se implementada)
4. Confirmar que Balastrus referencia a escolha
**Resultado Esperado**: ✅ Decisão rastreada, impacto narrativo

#### Caso 3: Decisão Estrutural

**Setup**: Quest 11 (Gildrat em Alarme) - Branching
**Passos**:

1. Escolher "Seguir Filena"
2. Verificar `v_branch_active = 2` (branch Filena)
3. Confirmar Q13 (Aviso) desbloqueada
4. Confirmar Q12 (Resgate) bloqueada
5. Completar Q13
6. Confirmar Q14 acessível
7. Resetar para Q11
8. Escolher "Ir ao Conselho"
9. Verificar `v_branch_active = 1` (branch Conselho)
10. Confirmar Q12 desbloqueada, Q13 bloqueada
11. Completar Q12
12. Confirmar Q14 acessível igual
**Resultado Esperado**: ✅ Branches funcionam, convergem em Q14

#### Caso 4: Estado Persistente

**Setup**: Múltiplas decisões em sequência
**Passos**:

1. Fazer 5 decisões diferentes
2. Chamar `GetDecisionHistory`
3. Verificar array com 5 entradas corretas
4. Salvar jogo
5. Carregar jogo
6. Chamar `GetDecisionHistory` novamente
7. Confirmar que histórico persiste
**Resultado Esperado**: ✅ Decisões persistem entre saves

#### Caso 5: Pré-requisitos Complexos

**Setup**: Quest 14 (requer Q12 OU Q13)
**Passos**:

1. Tentar acessar Q14 sem completar Q12/Q13
2. Confirmar bloqueio (cristal cinza, portal fechado)
3. Completar Q12
4. Verificar Q14 desbloqueada
5. Resetar para Q11
6. Completar Q13 (sem fazer Q12)
7. Verificar Q14 desbloqueada igual
**Resultado Esperado**: ✅ Lógica OR funciona corretamente

---

## 🎓 Aprendizados & Próximos Passos

### Padrões Reutilizáveis do MVP

Ao implementar o MVP, documentar:

1. **Padrões de Decisão**
   - Template para decisões convergentes
   - Template para decisões rastreadas
   - Template para decisões estruturais

2. **Padrões de UI**
   - Layout padrão de NPC quest giver
   - Menu de escolhas (formatação, iconografia)
   - Feedback visual (timing, efeitos)

3. **Padrões de Variáveis**
   - Nomenclatura consistente
   - Ranges de valores (0-3 para status, etc.)
   - Estruturas JSON em variáveis

4. **Padrões de Testes**
   - Casos de teste reutilizáveis
   - Mocks de ambiente
   - Asserções comuns

### Expansão para o Jogo Completo

Após validação do MVP:

1. **Integração com Quests Reais**
   - Adaptar plugins para quests narrativas
   - Migrar decisões do MVP para mapas reais
   - Refinar baseado em feedback

2. **Sistema de Save Completo**
   - Garantir que decisões persistem
   - Implementar multiple save slots
   - Export/import para testes

3. **Visualização In-Game**
   - Menu de "Histórico de Decisões"
   - Quest log com branches visualizados
   - Estatísticas de decisões

4. **Análise de Dados**
   - Telemetria de escolhas dos players
   - Identificar decisões mais populares
   - Balancear consequências

### Documentação Final

Criar documentos:

1. **Guia de Desenvolvimento de Quests**
   - Como criar nova quest com decisões
   - Checklist de implementação
   - Exemplos de código

2. **Referência de API**
   - Todos comandos de plugin
   - DTOs e suas validações
   - Variáveis do sistema

3. **Manual de Debug**
   - Como usar ferramentas de debug
   - Troubleshooting comum
   - Resetar estados corrompidos

---

## 📝 Conclusão

### Resumo Executivo

O **MVP Mapa de Decisões** é uma ferramenta essencial para:

1. **Validar Mecânicas**: Testar sistema de decisões antes da implementação completa
2. **Facilitar Desenvolvimento**: Ambiente controlado para debug e refinamento
3. **Documentar Padrões**: Criar templates reutilizáveis para todas as quests
4. **Garantir Qualidade**: Detectar problemas cedo, antes de criar 14+ quests

### Arquitetura Proposta

- **3 Plugins**: DecisionManager (core), QuestNavigator (mapa), DebugTools (utilitários)
- **Clean Architecture**: Domain → UseCase → Controller (padrão do projeto)
- **5 Quests Representativas**: Q6, Q11, Q12, Q13, Q14 (todos tipos de decisão)
- **Suite de Debug**: Inspeção, visualização, reset, simulação

### Cronograma Estimado

- **Semanas 1-2**: Fundação (Domain, UseCase, DTOs, testes)
- **Semana 3**: Plugin Controller (RPG Maker integration)
- **Semana 4**: Mapa MVP (design visual, NPCs, portais)
- **Semana 5**: Plugins Auxiliares (Navigator, DebugTools)
- **Semana 6**: Testes & Refinamento (validação completa)

**Total**: ~6 semanas de desenvolvimento

### Próximas Ações Imediatas

1. **Criar especificação técnica detalhada** (próximo documento)
2. **Prototipar Domain Layer** (lógica de decisões pura)
3. **Desenhar layout do mapa** (mockup no RPG Maker)
4. **Definir estrutura de variáveis** (v_mvp_*, s_mvp_*)
5. **Preparar ambiente de testes** (Jest, mocks)

---

**Documento criado**: 2025-10-31
**Autor**: Claude Code (Brainstorming Session)
**Revisão necessária**: Edney Antonio Reis Filho
**Status**: 🟡 Proposta - Aguardando aprovação

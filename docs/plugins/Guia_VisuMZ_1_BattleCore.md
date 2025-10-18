# Guia do Plugin VisuMZ_1_BattleCore

**Objetivo:** Criar um guia completo e prático para desenvolvedores de jogos no RPG Maker MZ sobre como utilizar o plugin `VisuMZ_1_BattleCore` da VisuStella. Abordar desde a configuração do sistema de batalha até a criação de mecânicas de combate avançadas.

## Estrutura do Documento

Dividir o documento nas seguintes seções principais:

### **1. Introdução ao Battle Core**

- **1.1. O que é o Battle Core?**
  - O `Battle Core` é o pilar para todos os outros plugins de batalha da VisuStella. Ele moderniza o sistema de combate padrão (DTB) e serve como base para sistemas mais complexos (ATB, CTB, etc.).
- **1.2. Pré-requisitos:**
  - É necessário ter o `VisuMZ_0_CoreEngine` instalado e posicionado acima do `Battle Core` na lista de plugins.

### **2. Configurações do Sistema de Batalha (Plugin Parameters)**

- Criar um guia detalhado para cada seção dos parâmetros do plugin, explicando o impacto de cada opção no combate.
- **2.1. Action & Turn Order:**
  - Explicar como as configurações de `Action Speed`, `Turn Order`, e prioridades afetam a ordem das ações em um turno.
  - **Como usar:** Dar exemplos. Ex: "Aumente a influência da agilidade na `Action Speed` para que personagens rápidos ataquem primeiro com mais frequência."
- **2.2. Battle UI Settings:**
  - Detalhar como customizar as janelas de batalha (Status, Command, Log).
  - Explicar opções como `Show TP Bars`, `Command Window Layout`, etc.
  - **Como usar:** "Para um jogo mais minimalista, configure a janela de comandos para ter apenas `Attack`, `Skill`, `Item`, e `Guard`, e esconda a barra de TP se seu jogo não a utiliza."
- **2.3. Damage & Formula Settings:**
  - Explicar como modificar a fórmula de dano base, o cálculo de acerto crítico e a variação de dano.
  - **Como usar:** "Para tornar as batalhas mais previsíveis, reduza o `Damage Variance` para 5%. Para tornar os acertos críticos mais impactantes, mude o `Critical Multiplier` para 3.0."
- **2.4. Victory & Escape:**
  - Guiar sobre as configurações da tela de vitória (EXP, Ouro, Itens) e as condições de fuga.
  - **Como usar:** "Configure a opção `Escape Boost` para aumentar a chance de fuga a cada tentativa, evitando que o jogador fique preso em uma batalha."
- **2.5. Action Points (AP) System:**
  - Explicar o que é o sistema de AP, como ele substitui ou complementa o TP, e como configurar os custos de AP para habilidades.
  - **Como usar:** "Ative o sistema de AP para criar uma mecânica de combate mais tática, onde cada ação (ataque, defesa, habilidade) tem um custo em pontos de ação."

### **3. Guia de Comandos de Plugin (Plugin Commands)**

- Focar em como manipular a batalha em tempo real usando os comandos de evento do RPG Maker.
- **3.1. Usar os Plugin Commands de Batalha:**
  - Detalhar o passo a passo para cada comando relevante.
  - **Fornecer exemplos práticos de implementação:**
    - **`Battle: Force Action`**: "Em uma batalha de tutorial, use este comando para forçar o herói a usar a habilidade '''Curar''' em um aliado com pouco HP, ensinando a mecânica ao jogador."
    - **`Battle: Change Battle BGM`**: "Quando a vida do chefe chegar a 50%, use este comando para trocar a música de batalha para um tema mais intenso e dramático."
    - **`Battle: Add/Remove State`**: "Crie um evento no mapa que, ao ser ativado, inicia uma batalha onde todos os inimigos já começam com o estado '''Fúria''', usando este comando."

### **4. Guia de Recursos por Notetags (Database)**

- Explicar como usar notetags para customizar profundamente atores, inimigos, habilidades e estados.
- **4.1. Atores, Classes e Inimigos:**
  - Notetags: `<Action Times: +x>`, `<Bypass Animation>`, `<Guard Skill: y>`
  - **Como e quando implementar:** "Use `<Action Times: +1>` na notetag de um chefe para que ele possa atacar duas vezes por turno. Use `<Guard Skill: 15>` em uma classe '''Tank''' para substituir a defesa padrão por uma habilidade de proteção especial."
- **4.2. Habilidades e Itens:**
  - Notetags: `<AP Cost: x>`, `<TP Cost: y%>`, `<Repeat: x>`, `<Damage Formula: code>`
  - **Como e quando implementar:** "Crie uma habilidade '''Golpe Duplo''' usando la notetag `<Repeat: 2>`. Para uma poção que cura 25% do HP máximo, use `<Damage Formula: b.mhp * 0.25>` na notetag do item."
- **4.3. Estados:**
  - Notetags: `<Disable Action: Attack>`, `<Action Sequence: Stumble>`, `<State Motion: abnormal>`
  - **Como e quando implementar:** "Crie um estado '''Silêncio''' usando `<Disable Action: Magic>` para impedir o uso de magias. Para um estado '''Paralisia''', use `<State Motion: abnormal>` para que o personagem mostre uma animação diferente enquanto estiver afetado."

### **5. Guia de Recursos via JavaScript (Avançado)**

- Criar uma seção para desenvolvedores que se sentem confortáveis com código para customizações mais complexas.
- **5.1. Usar Notetags com JavaScript:**
  - Notetags: `<JS Pre-Damage: code>`, `<JS Post-Damage: code>`, `<JS On Add State: code>`
  - **Exemplo prático:** "Crie um anel com '''Roubo de Vida''' usando a notetag `<JS Post-Damage: if (damage > 0) user.gainHp(damage * 0.1);>` no equipamento para curar 10% do dano causado."
- **5.2. Usar Script Calls em Batalha:**
  - Explicar como usar atalhos de script para controlar a batalha.
  - **Exemplo prático:** "Em um evento de batalha, use o Script Call `BattleManager.forceAction($gameActors.actor(1), 50, -1)` para forçar o Ator 1 a usar a Habilidade 50 em um inimigo aleatório."

//=============================================================================
// RPG Maker MZ - Coreto Quest Bau
// Coreto_Quest_bau.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Manages the quest to open the mysterious chest by interacting with NPCs in the correct order.
 * @author Edney Antonio Reis Filho
 *
 * @param questVariableId
 * @text Quest Variable ID
 * @type variable
 * @desc The game variable that will store the quest information.
 * @default 10
 *
 * @command startQuest
 * @text Start Quest
 * @desc Starts the quest with the specified quest ID.
 *
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc The ID of the quest to start.
 *
 * @command interactWithChest
 * @text Interact With Chest
 * @desc Handles the interaction when the player tries to open the chest.
 *
 * @command interactionWithAdventurers
 * @text Interact with the adventurers
 * @desc Handles the interaction when testing the plugin.
 *
 * @arg npcID
 * @type number
 * @text NPC ID
 * @desc The ID of the npc to interact with.
 *
 * @command interactionWithAnimals
 * @text Interact with the animals
 * @desc Handles the interaction when interacting with the animals.
 *
 * @arg questId
 * @type string
 * @text Quest ID
 * @desc The ID of the quest related to the animal (e.g., pegarCachorro, peguePorco).
 *
 * @arg bauTaskId
 * @type number
 * @text Baú Task ID
 * @desc The ID of the task related to the Baú quest.
 */

var coreto = coreto || {};
coreto.quests = coreto.quests || {};

// Carrega as configurações do plugin
coreto.quests.params = PluginManager.parameters('Coreto_Quest_bau');
coreto.quests.questVariableId = Number(coreto.quests.params['questVariableId']);

// Função para iniciar uma quest com base no ID fornecido
coreto.quests.startQuest = function (questID) {
  const quests = {
    1: {
      id: 'abrirBau',
      title: 'Abrir o Baú misterioso',
      tasks: ['Encontrar o Baú misterioso', 'Falar com a Maga', 'Falar com a Priest', 'Falar com o Guerreiro', 'Pegar o cachorro', 'Pegar o gato', 'Pegar o porco', 'Abrir o Baú'],
    },
    2: {
      id: 'peguePorco',
      title: 'Iniciou missãõ pegue o porco',
      tasks: ['Encontrar o porco'],
    },
    // Outras quests podem ser adicionadas aqui...
  };

  const selectedQuest = quests[questID];
  if (selectedQuest) {
    // Armazena a quest na variável definida pelo desenvolvedor
    $gameVariables.setValue(coreto.quests.questVariableId, selectedQuest);
    console.log(`Missão "${selectedQuest.title}" iniciada.`);

    // Adiciona a missão ao diário
    SQSM.AddQuest(selectedQuest.id);

    // Exibe o diário de missões
    setTimeout(() => {
      $gameMessage.add('Eu preciso abrir o baú');
      SQSM.OpenQuestJournal();
    }, 1000);
  } else {
    console.log('ID da missão inválido.');
  }
};

// Função para interagir com o baú
coreto.quests.interactWithChest = function () {
  const quest = $gameVariables.value(coreto.quests.questVariableId);

  if (quest && quest.id === 'abrirBau') {
    // Diálogo do baú
    $gameMessage.add('Eu não posso abrir sozinho');
    $gameMessage.add('Talvez aqueles aventureiros saibam me ajudar');

    // Atualiza a missão
    SQSM.ShowDescriptionForQuest('abrirBau', 2);
    SQSM.ShowTaskForQuest('abrirBau', 2);
    SQSM.ShowTaskForQuest('abrirBau', 3);
    SQSM.ShowTaskForQuest('abrirBau', 4);
    SQSM.CompleteTaskForQuest('abrirBau', 1);

    // Liga o switch para "unlockHelp"
    $gameSwitches.setValue(1, true);

    // Abre o diário de missões
    SQSM.OpenQuestJournal();

    console.log('Interação com o baú concluída.');
  } else {
    console.log('Nenhuma missão ativa para o baú.');
  }
};

// Função para interagir com o baú
coreto.quests.interactionWithAdventurers = function (npcID) {
  console.log(`interactionWithAdventurers`, npcID);
  const quest = $gameVariables.value(coreto.quests.questVariableId);

  if (quest && quest.id === 'abrirBau') {
    // Verifica se o jogador já desbloqueou a ajuda (unlockHelp ativo)
    if ($gameSwitches.value(1)) {
      // Switch #0001 é o "unlockHelp"
      switch (npcID) {
        case 4: // NPC que dá a missão de pegar o porco
          $gameMessage.add('Pegue o porco para provar que você é digno');
          $gameSwitches.setValue(4, true); // Ativa "peguePorco"
          SQSM.AddQuest('peguePorco');
          SQSM.CompleteTaskForQuest('abrirBau', 3);
          SQSM.ShowTaskForQuest('abrirBau', 7);
          break;
        case 3: // NPC que dá a missão de pegar o cachorro
          $gameMessage.add('Vejo que precisa de ajuda para abrir o baú.');
          $gameMessage.add('Pegue aquele cachorro para mim que eu te ajudo.');
          $gameSwitches.setValue(2, true); // Ativa "pegarCachorro"
          SQSM.AddQuest('pegarCachorro');
          SQSM.CompleteTaskForQuest('abrirBau', 4);
          SQSM.ShowTaskForQuest('abrirBau', 5);
          break;
        case 2: // NPC que dá a missão de pegar o gato
          $gameMessage.add('Pegue o gato e prove que você tem magia');
          $gameSwitches.setValue(3, true); // Ativa "pegarGato"
          SQSM.AddQuest('pegueGato');
          SQSM.CompleteTaskForQuest('abrirBau', 2);
          SQSM.ShowTaskForQuest('abrirBau', 6);
          break;
        default:
          console.log('ID de NPC inválido.');
      }
    }
  } else {
    console.log('Nenhuma missão ativa ou não é a missão correta.');
  }
};

// Função para interagir com animais
coreto.quests.interactionWithAnimals = function (animal) {
  // Exibe mensagem de captura
  $gameMessage.add('Peguei você!');

  // Aumenta o contador de missões concluídas
  const adventureQuestVar = 2; // ID da variável adventuresQuests
  $gameVariables.setValue(adventureQuestVar, $gameVariables.value(adventureQuestVar) + 1);

  // Completa a quest do animal
  SQSM.CompletQuest(animal.questId);
  SQSM.CompleteTaskForQuest(animal.questId, 1);
  SQSM.CompleteTaskForQuest('abrirBau', animal.bauTaskId);

  // Verifica se todas as missões dos animais foram concluídas
  if ($gameVariables.value(adventureQuestVar) >= 3) {
    SQSM.OpenQuestJournal();
    SQSM.ShowTaskForQuest('abrirBau', 8); // Atualiza a tarefa do baú
  }
};

// Registra o comando para iniciar a quest
PluginManager.registerCommand('Coreto_Quest_bau', 'startQuest', args => {
  const questID = Number(args.questID);
  coreto.quests.startQuest(questID);
});

// Registra o comando para interagir com o baú
PluginManager.registerCommand('Coreto_Quest_bau', 'interactWithChest', () => {
  coreto.quests.interactWithChest();
});

// Registra o comando para interagir com o baú
PluginManager.registerCommand('Coreto_Quest_bau', 'interactionWithAdventurers', args => {
  const npcID = Number(args.npcID);
  coreto.quests.interactionWithAdventurers(npcID);
});

// Registra o comando para interagir com o baú
PluginManager.registerCommand('Coreto_Quest_bau', 'interactionWithAnimals', args => {
  const animal = {
    questId: args.questId, // ID da quest do animal (pegarCachorro, peguePorco, etc.)
    bauTaskId: Number(args.bauTaskId), // ID da tarefa correspondente ao baú
  };
  coreto.quests.interactionWithAnimals(animal);
});

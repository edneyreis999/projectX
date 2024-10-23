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
 *
 * @command interactWithChestFinal
 * @text Interact with the chest final
 * @desc Interact with the chest in the final phase and receive the reward.
 *
 * @arg itemID
 * @type item
 * @text Item ID
 * @desc The ID of the reward item.
 */

const QUEST_BAU_ID = 'abrirBau';
const TASKS = {
  FIND_CHEST: 1,
  TALK_TO_MAGE: 2,
  TALK_TO_PRIEST: 3,
  TALK_TO_WARRIOR: 4,
  CATCH_DOG: 5,
  CATCH_CAT: 6,
  CATCH_PIG: 7,
  OPEN_CHEST: 8,
};

var coreto = coreto || {};
coreto.quests = coreto.quests || {};
coreto.quests.bau = {};

// Start the quest
coreto.quests.bau.startQuest = function () {
  console.log(`Quest "${QUEST_BAU_ID.valueOf()}" started.`);

  SQSM.AddQuest(QUEST_BAU_ID);
  setTimeout(() => {
    $gameMessage.add('I need to open the chest');
    SQSM.OpenQuestJournal();
  }, 1000);
};

// Handle interaction with the chest
coreto.quests.bau.interactWithChest = function () {
  $gameMessage.add('I can’t open this alone.');
  $gameMessage.add('Maybe the adventurers can help.');

  SQSM.ShowDescriptionForQuest(QUEST_BAU_ID, 2);
  SQSM.ShowTaskForQuest(QUEST_BAU_ID, TASKS.TALK_TO_MAGE);
  SQSM.ShowTaskForQuest(QUEST_BAU_ID, TASKS.TALK_TO_PRIEST);
  SQSM.ShowTaskForQuest(QUEST_BAU_ID, TASKS.TALK_TO_WARRIOR);
  SQSM.CompleteTaskForQuest(QUEST_BAU_ID, TASKS.FIND_CHEST);

  $gameSwitches.setValue(1, true); // Unlock help
  SQSM.OpenQuestJournal();
};

// Handle adventurer interactions
coreto.quests.bau.interactionWithAdventurers = function ({ npcID }) {
  switch (npcID) {
    case 4: // Pig quest
      $gameMessage.add('Prove your worth by catching the pig.');
      $gameSwitches.setValue(4, true); // Activates "catchPig"
      SQSM.AddQuest('peguePorco');
      SQSM.CompleteTaskForQuest(QUEST_BAU_ID, TASKS.TALK_TO_PRIEST);
      SQSM.ShowTaskForQuest(QUEST_BAU_ID, TASKS.CATCH_PIG);
      break;
    case 3: // Dog quest
      $gameMessage.add('Catch that dog to get my help.');
      $gameSwitches.setValue(2, true); // Activates "catchDog"
      SQSM.AddQuest('pegarCachorro');
      SQSM.CompleteTaskForQuest(QUEST_BAU_ID, TASKS.TALK_TO_WARRIOR);
      SQSM.ShowTaskForQuest(QUEST_BAU_ID, TASKS.CATCH_DOG);
      break;
    case 2: // Cat quest
      $gameMessage.add('Catch the cat and prove your magic.');
      $gameSwitches.setValue(3, true); // Activates "catchCat"
      SQSM.AddQuest('pegueGato');
      SQSM.CompleteTaskForQuest(QUEST_BAU_ID, TASKS.TALK_TO_MAGE);
      SQSM.ShowTaskForQuest(QUEST_BAU_ID, TASKS.CATCH_CAT);
      break;
    default:
      console.log('Invalid NPC ID.');
  }
};

// Handle animal interaction
coreto.quests.bau.interactionWithAnimals = function ({ questId, bauTaskId }) {
  $gameMessage.add('Got you!');

  const adventureQuestVar = 2; // ID of adventuresQuests variable
  $gameVariables.setValue(adventureQuestVar, $gameVariables.value(adventureQuestVar) + 1);

  SQSM.CompletQuest(questId);
  SQSM.CompleteTaskForQuest(questId, 1);
  SQSM.CompleteTaskForQuest(QUEST_BAU_ID, bauTaskId);

  if ($gameVariables.value(adventureQuestVar) >= 3) {
    SQSM.OpenQuestJournal();
    SQSM.ShowTaskForQuest(QUEST_BAU_ID, TASKS.OPEN_CHEST);
  }
};

// Handle final chest interaction and reward
coreto.quests.bau.interactWithChestFinal = function ({ itemID }) {
  console.log('Opening the chest...');
  console.log(`Received item ID: ${itemID}`);
  coreto.addKeyItem({ itemID });
  SQSM.CompleteTaskForQuest(QUEST_BAU_ID, TASKS.OPEN_CHEST);
  SQSM.CompletQuest(QUEST_BAU_ID);
};

// Register commands
PluginManager.registerCommand('Coreto_Quest_bau', 'startQuest', () => {
  coreto.quests.bau.startQuest();
});

PluginManager.registerCommand('Coreto_Quest_bau', 'interactWithChest', () => {
  coreto.quests.bau.interactWithChest();
});

PluginManager.registerCommand('Coreto_Quest_bau', 'interactionWithAdventurers', args => {
  const npcID = Number(args.npcID);
  coreto.quests.bau.interactionWithAdventurers({ npcID });
});

PluginManager.registerCommand('Coreto_Quest_bau', 'interactionWithAnimals', args => {
  coreto.quests.bau.interactionWithAnimals(args);
});

PluginManager.registerCommand('Coreto_Quest_bau', 'interactWithChestFinal', args => {
  const itemID = Number(args.itemID);
  coreto.quests.bau.interactWithChestFinal({ itemID });
});

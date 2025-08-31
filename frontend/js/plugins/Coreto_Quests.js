//=============================================================================
// RPG Maker MZ - Coreto Quests functions
// Coreto_Quests.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Add or remove key items or equipment from the inventory and trigger a specified common event.
 * @author Edney Antonio Reis Filho
 *
 * @command addKeyItem
 * @text Add Key Item
 * @desc Add a key item to the player inventory.
 *
 * @arg itemID
 * @type item
 * @text Item ID
 * @desc The ID of the key item to add.
 *
 * @command removeKeyItem
 * @text Remove Key Item
 * @desc Remove a key item from the player inventory.
 *
 * @arg itemID
 * @type item
 * @text Item ID
 * @desc The ID of the key item to remove.
 *
 * @command addWeapon
 * @text Add Weapon
 * @desc Add a weapon to the player inventory.
 *
 * @arg weaponID
 * @type weapon
 * @text Weapon ID
 * @desc The ID of the weapon to add.
 *
 * @command removeWeapon
 * @text Remove Weapon
 * @desc Remove a weapon from the player inventory.
 *
 * @arg weaponID
 * @type weapon
 * @text Weapon ID
 * @desc The ID of the weapon to remove.
 *
 * @command addArmor
 * @text Add Armor
 * @desc Add an armor to the player inventory.
 *
 * @arg armorID
 * @type armor
 * @text Armor ID
 * @desc The ID of the armor to add.
 *
 * @command removeArmor
 * @text Remove Armor
 * @desc Remove an armor from the player inventory.
 *
 * @arg armorID
 * @type armor
 * @text Armor ID
 * @desc The ID of the armor to remove.
 */

var coreto = coreto || {};
const pluginName = 'Coreto_Quests';

/**
 * Adiciona um item ao inventário usando o sistema da Coreto ou padrão do RPG Maker
 * @param {string} type - O tipo do item ("item", "weapon", "armor")
 * @param {number} id - O ID do item no banco de dados
 * @param {number} amount - Quantidade a adicionar (padrão: 1)
 */
coreto.addInventoryItem = function (type, id, amount = 1) {
  let item;

  // Determina o tipo do item
  switch (type) {
    case 'item':
      item = $dataItems[id];
      break;
    case 'weapon':
      item = $dataWeapons[id];
      break;
    case 'armor':
      item = $dataArmors[id];
      break;
  }

  // Adiciona o item ao inventário
  if (item) {
    $gameParty.gainItem(item, amount);

    // Reproduz um efeito sonoro
    AudioManager.playSe({ name: 'Item3', volume: 90, pitch: 100, pan: 0 });

    // Exibe uma mensagem
    $gameMessage.setPositionType(0);
    const itemIcon = `\\i[${item.iconIndex}]`;
    const itemName = item.name;
    const message = `Recebeu ${itemIcon} \\c[4]${itemName}\\c[0]!`;
    $gameMessage.add(message);

    console.log(`[Coreto_Quests] Added: ${item.name} (${type}).`);
    return true;
  } else {
    console.warn(`[Coreto_Quests] Item not found: Type(${type}), ID(${id}).`);
    return false;
  }
};

/**
 * Remove um item do inventário
 * @param {string} type - O tipo do item ("item", "weapon", "armor")
 * @param {number} id - O ID do item no banco de dados
 * @param {number} amount - Quantidade a remover (padrão: 1)
 */
coreto.removeInventoryItem = function (type, id, amount = 1) {
  let item;

  // Determine the item type
  switch (type) {
    case 'item':
      item = $dataItems[id];
      break;
    case 'weapon':
      item = $dataWeapons[id];
      break;
    case 'armor':
      item = $dataArmors[id];
      break;
  }

  // Remove the item from the inventory
  if (item) {
    $gameParty.loseItem(item, amount);

    // Play a sound effect
    AudioManager.playSe({ name: 'Item3', volume: 90, pitch: 100, pan: 0 });

    // Show a message
    $gameMessage.setPositionType(0);
    const itemIcon = `\\i[${item.iconIndex}]`;
    const itemName = item.name;
    const message = `Usou ${itemIcon} \\c[2]${itemName}\\c[0]!`;
    $gameMessage.add(message);

    console.log(`[Coreto_Quests] Removed: ${item.name} (${type}).`);
    return true;
  } else {
    console.warn(`[Coreto_Quests] Item not found: Type(${type}), ID(${id}).`);
    return false;
  }
};

/**
 * Adiciona item ao inventário (wrapper simplificado)
 * Mantém compatibilidade com código existente
 * @param {number} itemId - ID do item
 * @param {number} amount - Quantidade (padrão: 1)
 */
coreto.addItemToInventory = function (itemId, amount = 1) {
  return this.addInventoryItem('item', itemId, amount);
};

/**
 * Classe base para gerenciamento de Quests
 */
coreto.BaseQuest = class BaseQuest {
  constructor(questName, logger) {
    this.questName = questName;
    this.logger = logger || console;
  }

  /**
   * Adiciona item usando o sistema de quests
   * @param {string} type - Tipo do item
   * @param {number} itemId - ID do item
   * @param {number} amount - Quantidade
   */
  addItem(type, itemId, amount = 1) {
    const success = coreto.addInventoryItem(type, itemId, amount);
    if (success) {
      this.logger.info?.(`Item adicionado: ${type} ID:${itemId} x${amount}`);
    }
    return success;
  }

  /**
   * Remove item usando o sistema de quests
   * @param {string} type - Tipo do item
   * @param {number} itemId - ID do item
   * @param {number} amount - Quantidade
   */
  removeItem(type, itemId, amount = 1) {
    const success = coreto.removeInventoryItem(type, itemId, amount);
    if (success) {
      this.logger.info?.(`Item removido: ${type} ID:${itemId} x${amount}`);
    }
    return success;
  }

  /**
   * Verifica se uma condição de progresso foi atingida
   * @param {number} current - Valor atual
   * @param {number} target - Valor alvo
   * @param {string} description - Descrição para logs
   */
  checkProgress(current, target, description = '') {
    const progress = Math.min(current / target, 1) * 100;
    this.logger.debug?.(`Progresso ${description}: ${current}/${target} (${progress.toFixed(1)}%)`);
    return current >= target;
  }

  /**
   * Executa uma ação de quest com tratamento de erro
   * @param {Function} action - Ação a ser executada
   * @param {string} actionName - Nome da ação para logs
   */
  safeExecute(action, actionName = 'Quest Action') {
    try {
      return action();
    } catch (error) {
      this.logger.error?.(`Erro em ${actionName}:`, error);
      return false;
    }
  }
};

// Register commands for adding/removing Key Items
PluginManager.registerCommand(pluginName, 'addKeyItem', args => {
  const itemID = Number(args.itemID);
  coreto.addInventoryItem('item', itemID);
});

PluginManager.registerCommand(pluginName, 'removeKeyItem', args => {
  const itemID = Number(args.itemID);
  coreto.removeInventoryItem('item', itemID);
});

// Register commands for adding/removing Weapons
PluginManager.registerCommand(pluginName, 'addWeapon', args => {
  const weaponID = Number(args.weaponID);
  coreto.addInventoryItem('weapon', weaponID);
});

PluginManager.registerCommand(pluginName, 'removeWeapon', args => {
  const weaponID = Number(args.weaponID);
  coreto.removeInventoryItem('weapon', weaponID);
});

// Register commands for adding/removing Armors
PluginManager.registerCommand(pluginName, 'addArmor', args => {
  const armorID = Number(args.armorID);
  coreto.addInventoryItem('armor', armorID);
});

PluginManager.registerCommand(pluginName, 'removeArmor', args => {
  const armorID = Number(args.armorID);
  coreto.removeInventoryItem('armor', armorID);
});

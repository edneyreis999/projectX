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
 * Adds an item, weapon, or armor to the inventory.
 * @param {string} type - The type of item ("item", "weapon", "armor").
 * @param {number} id - The ID of the item in the database.
 */
coreto.addInventoryItem = function (type, id) {
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

  // Add the item to the inventory
  if (item) {
    $gameParty.gainItem(item, 1);

    // Play a sound effect
    AudioManager.playSe({ name: 'Item3', volume: 90, pitch: 100, pan: 0 });

    // Show a message
    $gameMessage.setPositionType(0);
    const itemIcon = `\\i[${item.iconIndex}]`;
    const itemName = item.name;
    const message = `Recebeu ${itemIcon} \\c[4]${itemName}\\c[0]!`;
    $gameMessage.add(message);

    console.log(`[Coreto_Quests] Added: ${item.name} (${type}).`);
  } else {
    console.warn(`[Coreto_Quests] Item not found: Type(${type}), ID(${id}).`);
  }
};

/**
 * Removes an item, weapon, or armor from the inventory.
 * @param {string} type - The type of item ("item", "weapon", "armor").
 * @param {number} id - The ID of the item in the database.
 */
coreto.removeInventoryItem = function (type, id) {
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
    $gameParty.loseItem(item, 1);

    // Play a sound effect
    AudioManager.playSe({ name: 'Item3', volume: 90, pitch: 100, pan: 0 });

    // Show a message
    $gameMessage.setPositionType(0);
    const itemIcon = `\\i[${item.iconIndex}]`;
    const itemName = item.name;
    const message = `Usou ${itemIcon} \\c[2]${itemName}\\c[0]!`;
    $gameMessage.add(message);

    console.log(`[Coreto_Quests] Removed: ${item.name} (${type}).`);
  } else {
    console.warn(`[Coreto_Quests] Item not found: Type(${type}), ID(${id}).`);
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

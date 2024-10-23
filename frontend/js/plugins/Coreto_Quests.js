//=============================================================================
// RPG Maker MZ - Coreto Quests functions
// Coreto_Quests.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Add or remove a key item from the inventory and trigger a specified common event.
 * @author Edney Antonio Reis Filho
 *
 * @command addKeyItem
 * @text Add Key Item
 * @desc Add a key item to the player inventory and set variables.
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
 */

var coreto = coreto || {};
const pluginName = 'Coreto_Quests';

// Função para adicionar um item
coreto.addKeyItem = function (itemID) {
  const item = $dataItems[itemID]; // Obtém o item pelo ID

  // Adiciona o item ao inventário
  $gameParty.gainItem(item, 1);

  // Toca o som de efeito (SE) ao receber o item
  AudioManager.playSe({ name: 'Item3', volume: 90, pitch: 100, pan: 0 });

  // Exibe a mensagem com o nome e ícone do item
  $gameMessage.setPositionType(0);
  const itemIcon = `\\i[${item.iconIndex}]`; // Obtém o ícone do item
  const itemName = item.name; // Define o nome do item
  const message = `#{System.received} ${itemIcon} \\c[4]${itemName}\\c[0]!`; // Mensagem de recebimento
  $gameMessage.add(message);
};

// Função para remover um item
coreto.removeKeyItem = function (itemID) {
  const item = $dataItems[itemID]; // Obtém o item pelo ID

  // Remove o item do inventário
  $gameParty.loseItem($dataItems[itemID], 1);

  // Toca o som de efeito (SE) ao receber o item
  AudioManager.playSe({ name: 'Item3', volume: 90, pitch: 100, pan: 0 });

  // Exibe a mensagem com o nome e ícone do item
  $gameMessage.setPositionType(0);
  const itemIcon = `\\i[${item.iconIndex}]`; // Obtém o ícone do item
  const itemName = item.name; // Define o nome do item
  const message = `Usou ${itemIcon} \\c[2]${itemName}\\c[0]!`; // Mensagem de recebimento
  $gameMessage.add(message);
};

// Função para adicionar um item com feedback (mensagem e som)
PluginManager.registerCommand(pluginName, 'addKeyItem', args => {
  const itemID = Number(args.itemID);
  coreto.addKeyItem(itemID);
});

PluginManager.registerCommand(pluginName, 'removeKeyItem', args => {
  const itemID = Number(args.itemID);
  coreto.removeKeyItem(itemID);
});

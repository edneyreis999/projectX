//=============================================================================
// RPG Maker MZ - Coreto Gameplay Mina Kravens
// Coreto_Quest_Mina_Kravens.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Gerencia as mecânicas da Mina de Kravens, incluindo mineração e controle do estado do boss.
 * @author Edney Antonio Reis Filho
 *
 * @command MinerarPilha
 * @text MinerarPilha
 * @desc Minera uma pilha de minerios
 *
 * @param MinerioItemId
 * @text ID do minerio de Kraven
 * @type item
 * @desc ID do item Kravens no banco de dados.
 *
 * @param PedraItemId
 * @text ID da Pedra
 * @type item
 * @desc ID do item Pedra no banco de dados.
 *
 * @param BossStateVariableId
 * @text Variável Estado do Boss
 * @type variable
 * @default 0
 * @desc ID da variável que controla o estado do boss.
 *
 * @param NextFloorMapId
 * @text ID do Próximo Andar
 * @type number
 * @default 2
 * @desc ID do mapa para o próximo andar.
 *
 * @param TotalMinerioQuest
 * @text Total de Kravens Necessários para completar a quest
 * @type number
 * @default 4
 * @desc Quantidade total de Kravens necessários para a missão.
 *
 * @param TotalMinerioMina
 * @text Total de Kravens espalhados pela mina
 * @type number
 * @default 30
 * @desc Quantidade total de Kravens espalhados pela mina.
 *
 * @help
 * ----------------------------------------------------------------------------
 * **Coreto Gameplay Mina Kravens**
 * ----------------------------------------------------------------------------
 * Este plugin gerencia as mecânicas da Mina de Kravens. Ele inclui:
 *
 * - Mineração de Kravens e pedras com chances crescentes.
 * - Controle automático do progresso da missão.
 * - Liberação do boss após condições cumpridas.
 *
 * ----------------------------------------------------------------------------
 * **Funcionalidades**
 * ----------------------------------------------------------------------------
 * 1. **Mineração Progressiva**:
 *    - Cada pilha tem uma chance de drop de Kravens que aumenta gradualmente.
 *    - Quando a última pilha restante pode atender à meta, a chance será 100%.
 *
 * 2. **Rachadura e Teletransporte**:
 *    - Quando faltar apenas 1 Kraven, aparece uma rachadura e o jogador é
 *      teletransportado para o próximo andar.
 *
 * 3. **Liberação do Boss**:
 *    - O estado do boss é atualizado automaticamente para permitir o combate.
 *
 * ----------------------------------------------------------------------------
 * **Configuração**
 * ----------------------------------------------------------------------------
 * Configure os parâmetros do plugin no editor de plugins para garantir que os
 * IDs e valores necessários estejam corretos.
 *
 * ----------------------------------------------------------------------------
 * **Exemplo de Uso**
 * ----------------------------------------------------------------------------
 * 1. Adicione um evento ◆Plugin Command：Coreto_Quest_Mina_Kravens, Minerar para minerar uma pilha.
 *
 */

(() => {
  const pluginName = 'Coreto_Quest_Mina_Kravens';
  const parameters = PluginManager.parameters(pluginName);

  const minerioItemId = Number(parameters['MinerioItemId'] || 1);
  const pedraItemId = Number(parameters['PedraItemId'] || 2);
  const bossStateVariableId = Number(parameters['BossStateVariableId'] || 0);
  const totalMinerioQuest = Number(parameters['TotalMinerioQuest'] || 4);
  const totalMinerioMina = Number(parameters['TotalMinerioMina'] || 30);

  class MinaKravens {
    constructor() {
      this.kravensObtidos = 0;
      this.pilhasRestantes = totalMinerioMina;
      this.totalMinerioQuest = totalMinerioQuest;
      this.totalMinerioMina = totalMinerioMina;
    }

    calcularChance(pilhasRestantes) {
      const faltandoKravens = this.totalMinerioQuest - this.kravensObtidos;

      // Se o número de pilhas restantes é igual ao número de Kravens que faltam, chance = 100%
      if (pilhasRestantes <= faltandoKravens - 1) {
        return 100;
      }

      // Fórmula para chance gradual
      const chance = (faltandoKravens / pilhasRestantes) * 100;
      return Math.min(chance, 100); // Limita a chance a 100%
    }

    minar() {
      // Se o jogador já coletou todos os Kravens necessários
      if (this.kravensObtidos >= this.totalMinerioQuest) {
        this.pilhasRestantes--;
        this.adicionarItem(pedraItemId);
        console.log('Pedra obtida. Nenhum Kraven necessário.');
        return 'Pedra';
      }

      const pilhasRestantes = this.pilhasRestantes - this.kravensObtidos;
      this.pilhasRestantes--;
      const chance = this.calcularChance(pilhasRestantes);
      console.log(`Chance calculada: ${chance}%`);

      if (Math.random() * 100 <= chance) {
        this.adicionarItem(minerioItemId);
        this.kravensObtidos++;
        console.log(`Kraven obtido! Total: ${this.kravensObtidos}`);

        if (this.kravensObtidos === this.totalMinerioQuest - 1) {
          this.ativarRachadura();
        }
        return 'Kraven';
      } else {
        this.adicionarItem(pedraItemId);
        console.log('Pedra obtida.');
        return 'Pedra';
      }
    }

    adicionarItem(itemId) {
      coreto.addInventoryItem('item', itemId);
    }

    ativarRachadura() {
      console.log('Rachadura ativada! Teletransportando jogador.');
      $gameVariables.setValue(bossStateVariableId, 1);
    }
  }

  window.MinaKravens = new MinaKravens();

  console.log(`[${pluginName}] Plugin inicializado com sucesso.`);

  PluginManager.registerCommand(pluginName, 'RegistrarPilha', args => {
    MinaKravens.registrarPilha(Number(args.pilhaId));
  });

  PluginManager.registerCommand(pluginName, 'MinerarPilha', function () {
    const pilhaId = this._eventId; // Captura o ID do evento atual
    if (!pilhaId) {
      console.error('Erro: O ID do evento não foi encontrado.');
      return;
    }
    console.log(`Minerando pilha ${pilhaId}...`);
    const resultado = window.MinaKravens.minar(pilhaId);
    console.log(`Resultado da mineração: ${resultado}`);
  });
})();

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
 * @param EnableDebugLogs
 * @text Ativar Logs de Depuração
 * @type boolean
 * @on Sim
 * @off Não
 * @default true
 * @desc Quando ativado, exibe logs detalhados no console (NW.js) para observabilidade.
 *
 * @param LogSwitchId
 * @text Switch para Habilitar Logs
 * @type switch
 * @default 0
 * @desc Se definido (> 0), os logs só aparecem quando este switch estiver ON.
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
 * @param MineroKraven
 * @text Total de Kravens que o jogador já pssui
 * @type variable
 * @default 26
 * @desc Quantidade total de Kravens que o jogador já possui.
 *
 * @param PilhasRestantesVariableId
 * @text Variável Pilhas Restantes
 * @type variable
 * @default 0
 * @desc Variável do jogo usada para salvar as pilhas restantes na mina.
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
  const params = PluginManager.parameters(pluginName);

  // -----------------------
  // Logging util (observability)
  // -----------------------
  const DEBUG_DEFAULT = String(params['EnableDebugLogs'] || 'true').toLowerCase() === 'true';
  const LOG_SWITCH_ID = Number(params['LogSwitchId'] || 0); // 0 = desativado

  function isSwitchOn(id) {
    try {
      return !!(id > 0 && window.$gameSwitches && $gameSwitches.value(id));
    } catch (_) {
      return false;
    }
  }

  function nowTs() {
    try {
      return new Date().toISOString();
    } catch (_) {
      return '';
    }
  }

  const Logger = {
    prefix: `[${pluginName}]`,
    enabled: DEBUG_DEFAULT,
    shouldLog() {
      return this.enabled && (LOG_SWITCH_ID === 0 || isSwitchOn(LOG_SWITCH_ID));
    },
    debug(...args) {
      if (this.shouldLog()) console.log(this.prefix, nowTs(), ...args);
    },
    info(...args) {
      if (this.shouldLog()) console.info(this.prefix, nowTs(), ...args);
    },
    warn(...args) {
      if (this.shouldLog()) console.warn(this.prefix, nowTs(), ...args);
    },
    error(...args) {
      console.error(this.prefix, nowTs(), ...args);
    }, // erros sempre aparecem
    setEnabled(flag) {
      this.enabled = !!flag;
    },
  };

  // Expor uma forma simples de alternar logs via console/script
  window.CoretoMinaLogger = Logger;

  // -----------------------
  // Parâmetros do plugin
  // -----------------------
  const ID_ITEM_KRAVEN = Number(params['MinerioItemId'] || 1);
  const ID_ITEM_PEDRA = Number(params['PedraItemId'] || 2);
  const ID_VAR_ESTADO_BOSS = Number(params['BossStateVariableId'] || 0);
  const TOTAL_KRAVENS_PARA_MISSAO = Number(params['TotalMinerioQuest'] || 4);
  const TOTAL_KRAVENS_NA_MINA = Number(params['TotalMinerioMina'] || 30);
  const ID_VAR_KRAVENS_COLETADOS = Number(params['MineroKraven'] || 26);
  const ID_VAR_PILHAS_RESTANTES = Number(params['PilhasRestantesVariableId'] || 0);

  // -----------------------
  // Helpers de ambiente
  // -----------------------
  function hasGameVars() {
    return !!window.$gameVariables;
  }
  function getVar(id, fallback = 0) {
    try {
      return Number($gameVariables.value(id) ?? fallback) || 0;
    } catch (_) {
      return Number(fallback) || 0;
    }
  }
  function setVar(id, value) {
    try {
      if (id > 0 && hasGameVars()) $gameVariables.setValue(id, value);
    } catch (_) {}
  }

  function addItemToInventory(itemId, amount = 1) {
    // Mantém o uso do sistema "coreto" se existir; caso contrário, usa o ganho padrão do RPG Maker MZ
    try {
      if (window.coreto && typeof coreto.addInventoryItem === 'function') {
        coreto.addInventoryItem('item', itemId, amount);
        return true;
      }
      if (window.$gameParty && window.$dataItems) {
        $gameParty.gainItem($dataItems[itemId], amount);
        return true;
      }
    } catch (e) {
      Logger.error('Falha ao adicionar item ao inventário:', e);
    }
    return false;
  }

  // -----------------------
  // Domínio: Mina de Kravens
  // -----------------------
  class MinaKravens {
    /**
     * Estado principal da Mina de Kravens. A lógica original foi mantida.
     */
    constructor() {
      this.totalKravensNecessarios = TOTAL_KRAVENS_PARA_MISSAO;
      this.totalKravensNaMina = TOTAL_KRAVENS_NA_MINA;

      // Estado dinâmico
      this.kravensColetados = hasGameVars() ? getVar(ID_VAR_KRAVENS_COLETADOS, 0) : 0;
      this.pilhasRestantes = this.totalKravensNaMina;
    }

    // Sincroniza valores com as variáveis do jogo
    syncFromVar() {
      this.kravensColetados = getVar(ID_VAR_KRAVENS_COLETADOS, 0);

      if (ID_VAR_PILHAS_RESTANTES > 0) {
        let pilhasRestantesSalvas = getVar(ID_VAR_PILHAS_RESTANTES, 0);

        // Inicializa no primeiro uso de um novo jogo (quando ambas estão 0)
        if (pilhasRestantesSalvas <= 0 && this.kravensColetados <= 0) {
          pilhasRestantesSalvas = this.totalKravensNaMina;
          setVar(ID_VAR_PILHAS_RESTANTES, pilhasRestantesSalvas);
        }

        this.pilhasRestantes = pilhasRestantesSalvas;
      }
    }

    // Cálculo de chance (mantendo a lógica original)
    calcularChance(pilhasRestantesParaMeta) {
      Logger.debug('Estado antes do cálculo de chance', {
        kravensColetados: this.kravensColetados,
        totalNecessarios: this.totalKravensNecessarios,
        pilhasRestantesParaMeta,
      });

      const kravensRestantesParaConcluir = this.totalKravensNecessarios - this.kravensColetados;

      // Se o número de pilhas restantes é igual ao número de Kravens que faltam, chance = 100%
      if (pilhasRestantesParaMeta <= kravensRestantesParaConcluir - 1) {
        return 100;
      }

      // Fórmula para chance gradual (limitada a 100%)
      const chancePercentual = (kravensRestantesParaConcluir / pilhasRestantesParaMeta) * 100;
      const chanceFinal = Math.min(chancePercentual, 100);
      Logger.debug('Chance calculada (%)', chanceFinal);
      return chanceFinal;
    }

    /**
     * Mineração de uma pilha. Mantém a lógica original e adiciona observabilidade.
     * @param {number} [pilhaId]
     * @returns {string} 'Kraven' | 'Pedra'
     */
    minar(pilhaId) {
      // Garante que collectedKravens reflete o save atual
      this.syncFromVar();

      Logger.info('Iniciando mineração', { pilhaId, pilhasRestantes: this.pilhasRestantes, kravensColetados: this.kravensColetados });

      // Se o jogador já coletou todos os Kravens necessários
      if (this.kravensColetados >= this.totalKravensNecessarios) {
        this.pilhasRestantes = Math.max(0, this.pilhasRestantes - 1);
        if (ID_VAR_PILHAS_RESTANTES > 0) {
          setVar(ID_VAR_PILHAS_RESTANTES, this.pilhasRestantes);
        }
        addItemToInventory(ID_ITEM_PEDRA);
        Logger.info('Pedra obtida. Nenhum Kraven necessário.', { pilhasRestantes: this.pilhasRestantes });
        return 'Pedra';
      }

      // Mantém a fórmula original utilizada como base para o cálculo de chance
      const pilhasRestantesParaMeta = this.pilhasRestantes - this.kravensColetados;

      // Consome uma pilha
      this.pilhasRestantes = Math.max(0, this.pilhasRestantes - 1);
      if (ID_VAR_PILHAS_RESTANTES > 0) {
        setVar(ID_VAR_PILHAS_RESTANTES, this.pilhasRestantes);
      }
      Logger.debug('Após consumir pilha', { pilhasRestantes: this.pilhasRestantes, pilhasRestantesParaMeta });

      const chanceDeObterKraven = this.calcularChance(pilhasRestantesParaMeta);
      Logger.info('Chance de obter Kraven (%)', chanceDeObterKraven);

      if (Math.random() * 100 <= chanceDeObterKraven) {
        addItemToInventory(ID_ITEM_KRAVEN);
        this.kravensColetados++;
        setVar(ID_VAR_KRAVENS_COLETADOS, this.kravensColetados);
        Logger.info('Kraven obtido!', { totalColetado: this.kravensColetados });

        if (this.kravensColetados === this.totalKravensNecessarios - 1) {
          this.ativarRachadura();
        }

        return 'Kraven';
      } else {
        addItemToInventory(ID_ITEM_PEDRA);
        Logger.info('Pedra obtida.');
        return 'Pedra';
      }
    }

    adicionarItem(idDoItem) {
      // Método legado mantido por compatibilidade; delega ao helper com fallback
      return addItemToInventory(idDoItem);
    }

    ativarRachadura() {
      Logger.warn('Rachadura ativada! Teletransportando jogador.');
      setVar(ID_VAR_ESTADO_BOSS, 1);
    }

    // Mantido por compatibilidade com possível uso externo
    registrarPilha(pilhaId) {
      Logger.debug('RegistrarPilha chamado (no-op)', { pilhaId });
    }
  }

  // Instância global exposta (mantido como no original)
  window.MinaKravens = new MinaKravens();

  Logger.info('Plugin inicializado com sucesso.');

  // -----------------------
  // Plugin Commands
  // -----------------------
  PluginManager.registerCommand(pluginName, 'RegistrarPilha', args => {
    try {
      const pilhaId = Number(args?.pilhaId ?? 0);
      window.MinaKravens.registrarPilha(pilhaId);
    } catch (e) {
      Logger.error('Erro ao executar RegistrarPilha:', e);
    }
  });

  PluginManager.registerCommand(pluginName, 'MinerarPilha', function () {
    try {
      const pilhaId = this?._eventId; // Captura o ID do evento atual
      if (!pilhaId) {
        Logger.error('Erro: O ID do evento não foi encontrado.');
        return;
      }
      Logger.info('MinerarPilha acionado', { pilhaId });
      const resultado = window.MinaKravens.minar(pilhaId);
      Logger.info('Resultado da mineração', resultado);
    } catch (e) {
      Logger.error('Erro durante a execução de MinerarPilha:', e);
    }
  });
})();

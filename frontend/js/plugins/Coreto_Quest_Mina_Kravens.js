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
 * @command RegistrarPilha
 * @text RegistrarPilha
 * @desc (Opcional) Registra uma pilha por ID (compatibilidade; no-op)
 *
 * @arg pilhaId
 * @text ID da Pilha
 * @type number
 * @default 0
 * @desc Identificador numérico da pilha (evento) a ser registrado.
 *
 * @command AlternarLogs
 * @text Alternar Logs
 * @desc Alterna (liga/desliga) os logs de depuração do plugin em tempo de execução.
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
 * Observabilidade (Logs):
 * - EnableDebugLogs: Ativa/desativa logs de depuração no console do jogo (NW.js).
 * - LogSwitchId: Se definido (> 0), os logs só são exibidos quando o Switch
 *   correspondente estiver ON. Se 0, o switch não é considerado.
 *   Dica: aperte F8 durante o jogo (em desktop) para abrir o console e ver os logs.
 *
 * ----------------------------------------------------------------------------
 * **Exemplo de Uso**
 * ----------------------------------------------------------------------------
 * 1. Adicione um evento ◆Plugin Command：Coreto_Quest_Mina_Kravens, Minerar para minerar uma pilha.
 * 2. (Opcional) Crie um Switch para controlar logs. Defina o ID dele em LogSwitchId
 *    e ligue/desligue o Switch em runtime para ver/ocultar os logs.
 *
 */

(() => {
  const pluginName = 'Coreto_Quest_Mina_Kravens';
  const params = PluginManager.parameters(pluginName);

  // Verifica se as dependências estão disponíveis
  if (!window.CoretoCore) {
    throw new Error(`[${pluginName}] Dependência não encontrada: Coreto_Core.js deve estar carregado antes.`);
  }

  if (!window.coreto) {
    throw new Error(`[${pluginName}] Dependência não encontrada: Coreto_Quests.js deve estar carregado antes.`);
  }

  // -----------------------
  // Logger usando o Core
  // -----------------------
  const Logger = window.CoretoCore.createLogger(pluginName);

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
  // Domínio: Mina de Kravens (Clean Architecture - Domain Layer)
  // -----------------------
  class MinaKravensDomain {
    /**
     * Classe de domínio da Mina de Kravens seguindo princípios de Clean Architecture
     */
    constructor(config) {
      this.totalKravensNecessarios = config.totalKravensNecessarios;
      this.totalKravensNaMina = config.totalKravensNaMina;
      this.idItemKraven = config.idItemKraven;
      this.idItemPedra = config.idItemPedra;
      this.idVarKravensColetados = config.idVarKravensColetados;
      this.idVarPilhasRestantes = config.idVarPilhasRestantes;
      this.idVarEstadoBoss = config.idVarEstadoBoss;

      // Services
      this.coreService = window.CoretoCore;
      this.questService = window.coreto;
      this.logger = config.logger;

      // Estado dinâmico
      this.kravensColetados = 0;
      this.pilhasRestantes = this.totalKravensNaMina;
    }

    /**
     * Sincroniza o estado com as variáveis do jogo
     */
    syncFromGameVariables() {
      this.kravensColetados = this.coreService.getGameVariable(this.idVarKravensColetados, 0);

      if (this.idVarPilhasRestantes > 0) {
        let pilhasRestantesSalvas = this.coreService.getGameVariable(this.idVarPilhasRestantes, 0);

        // Inicializa no primeiro uso de um novo jogo (quando ambas estão 0)
        if (pilhasRestantesSalvas <= 0 && this.kravensColetados <= 0) {
          pilhasRestantesSalvas = this.totalKravensNaMina;
          this.coreService.setGameVariable(this.idVarPilhasRestantes, pilhasRestantesSalvas);
        }

        this.pilhasRestantes = pilhasRestantesSalvas;
      }
    }

    /**
     * Calcula a chance de drop de Kraven baseado nas pilhas restantes
     */
    calcularChanceKraven(pilhasRestantesParaMeta) {
      this.logger.debug('Estado antes do cálculo de chance', {
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
      this.logger.debug('Chance calculada (%)', chanceFinal);
      return chanceFinal;
    }

    /**
     * Verifica se a quest foi completada
     */
    isQuestCompleta() {
      return this.kravensColetados >= this.totalKravensNecessarios;
    }

    /**
     * Verifica se deve ativar a rachadura (falta apenas 1 Kraven)
     */
    shouldAtivarRachadura() {
      return this.kravensColetados === this.totalKravensNecessarios - 1;
    }

    /**
     * Ativa a rachadura e atualiza o estado do boss
     */
    ativarRachadura() {
      this.logger.warn('Rachadura ativada! Preparando para liberação do boss.');
      this.coreService.setGameVariable(this.idVarEstadoBoss, 1);
    }

    /**
     * Atualiza as variáveis do jogo após mineração
     */
    updateGameState() {
      this.coreService.setGameVariable(this.idVarKravensColetados, this.kravensColetados);
      if (this.idVarPilhasRestantes > 0) {
        this.coreService.setGameVariable(this.idVarPilhasRestantes, this.pilhasRestantes);
      }
    }
  }

  // -----------------------
  // Use Case: Mineração (Clean Architecture - Use Case Layer)
  // -----------------------
  class MineracaoUseCase {
    constructor(domain, questService, logger) {
      this.domain = domain;
      this.questService = questService;
      this.logger = logger;
    }

    /**
     * Executa a mineração de uma pilha
     * @param {number} pilhaId - ID da pilha (evento)
     * @returns {string} 'Kraven' | 'Pedra'
     */
    executarMineracao(pilhaId) {
      // Sincroniza estado com as variáveis do jogo
      this.domain.syncFromGameVariables();

      this.logger.info('Iniciando mineração', {
        pilhaId,
        pilhasRestantes: this.domain.pilhasRestantes,
        kravensColetados: this.domain.kravensColetados,
      });

      // Se o jogador já coletou todos os Kravens necessários, sempre retorna pedra
      if (this.domain.isQuestCompleta()) {
        this._consumirPilha();
        this._adicionarItem(this.domain.idItemPedra);
        this.logger.info('Pedra obtida. Nenhum Kraven necessário.', {
          pilhasRestantes: this.domain.pilhasRestantes,
        });
        return 'Pedra';
      }

      // Calcula a chance de drop
      const pilhasRestantesParaMeta = this.domain.pilhasRestantes - this.domain.kravensColetados;
      this._consumirPilha();

      const chanceDeObterKraven = this.domain.calcularChanceKraven(pilhasRestantesParaMeta);
      this.logger.info('Chance de obter Kraven (%)', chanceDeObterKraven);

      // Determina o resultado
      if (Math.random() * 100 <= chanceDeObterKraven) {
        return this._processarKravenObtido();
      } else {
        return this._processarPedraObtida();
      }
    }

    /**
     * Consome uma pilha da mina
     * @private
     */
    _consumirPilha() {
      this.domain.pilhasRestantes = Math.max(0, this.domain.pilhasRestantes - 1);
      this.logger.debug('Pilha consumida', { pilhasRestantes: this.domain.pilhasRestantes });
    }

    /**
     * Processa a obtenção de um Kraven
     * @private
     */
    _processarKravenObtido() {
      this._adicionarItem(this.domain.idItemKraven);
      this.domain.kravensColetados++;
      this.domain.updateGameState();

      this.logger.info('Kraven obtido!', { totalColetado: this.domain.kravensColetados });

      // Verifica se deve ativar a rachadura
      if (this.domain.shouldAtivarRachadura()) {
        this.domain.ativarRachadura();
      }

      return 'Kraven';
    }

    /**
     * Processa a obtenção de uma Pedra
     * @private
     */
    _processarPedraObtida() {
      this._adicionarItem(this.domain.idItemPedra);
      this.domain.updateGameState();
      this.logger.info('Pedra obtida.');
      return 'Pedra';
    }

    /**
     * Adiciona item ao inventário usando o serviço de quest
     * @private
     */
    _adicionarItem(itemId) {
      const success = this.questService.addItemToInventory(itemId, 1);
      if (!success) {
        this.logger.error('Falha ao adicionar item ao inventário:', itemId);
      }
      return success;
    }
  }

  // -----------------------
  // Interface/Controller Layer
  // -----------------------
  class MinaKravensController extends window.coreto.BaseQuest {
    constructor() {
      super('Mina de Kravens', Logger);

      // Configuração do domínio
      const domainConfig = {
        totalKravensNecessarios: TOTAL_KRAVENS_PARA_MISSAO,
        totalKravensNaMina: TOTAL_KRAVENS_NA_MINA,
        idItemKraven: ID_ITEM_KRAVEN,
        idItemPedra: ID_ITEM_PEDRA,
        idVarKravensColetados: ID_VAR_KRAVENS_COLETADOS,
        idVarPilhasRestantes: ID_VAR_PILHAS_RESTANTES,
        idVarEstadoBoss: ID_VAR_ESTADO_BOSS,
        logger: Logger,
      };

      // Instanciação das camadas
      this.domain = new MinaKravensDomain(domainConfig);
      this.useCase = new MineracaoUseCase(this.domain, window.coreto, Logger);
    }

    /**
     * Minera uma pilha
     */
    minar(pilhaId) {
      return this.safeExecute(() => this.useCase.executarMineracao(pilhaId), 'Mineração');
    }

    /**
     * Método legado para compatibilidade
     */
    registrarPilha(pilhaId) {
      Logger.debug('RegistrarPilha chamado (no-op)', { pilhaId });
    }

    /**
     * Alterna logs em tempo de execução
     */
    alternarLogs() {
      const newState = !Logger.enabled;
      Logger.setEnabled(newState);
      const note = `Logs ${newState ? 'ativados' : 'desativados'} via comando.`;
      console.info(Logger.prefix, new Date().toISOString(), note);
    }
  }
  // Instância global para compatibilidade
  window.MinaKravens = new MinaKravensController();

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

  PluginManager.registerCommand(pluginName, 'AlternarLogs', function () {
    try {
      window.MinaKravens.alternarLogs();
    } catch (e) {
      Logger.error('Erro ao alternar logs:', e);
    }
  });
})();

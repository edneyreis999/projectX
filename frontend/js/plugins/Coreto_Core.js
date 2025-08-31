//=============================================================================
// RPG Maker MZ - Coreto Core
// Coreto_Core.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Plugin Core da Coreto Studio - Funcionalidades compartilhadas
 * @author Edney Antonio Reis Filho
 * @version 1.0.0
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
 * @help
 * ----------------------------------------------------------------------------
 * **Coreto Core**
 * ----------------------------------------------------------------------------
 * Este plugin fornece funcionalidades compartilhadas para todos os plugins
 * da Coreto Studio, incluindo sistema de logging, helpers para variáveis
 * e utilitários comuns.
 *
 * ----------------------------------------------------------------------------
 * **Funcionalidades**
 * ----------------------------------------------------------------------------
 * - Sistema de logging configurável com níveis debug, info, warn, error
 * - Helpers para manipulação de variáveis e switches do RPG Maker
 * - Utilitários comuns para validação e controle de estado
 * - Factory para criação de loggers por plugin
 *
 * ----------------------------------------------------------------------------
 * **Configuração**
 * ----------------------------------------------------------------------------
 * Configure os parâmetros para controlar o comportamento global dos logs.
 * Cada plugin pode ter seu próprio logger com configurações específicas.
 *
 * ----------------------------------------------------------------------------
 * **Exemplo de Uso**
 * ----------------------------------------------------------------------------
 * // Em outro plugin:
 * const logger = CoretoCore.createLogger('MeuPlugin');
 * logger.info('Plugin inicializado');
 *
 * // Manipular variáveis:
 * CoretoCore.setGameVariable(10, 100);
 * const valor = CoretoCore.getGameVariable(10);
 *
 */

(() => {
  const pluginName = 'Coreto_Core';
  const params = PluginManager.parameters(pluginName);

  // -----------------------
  // Logging util factory (observability)
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

  // Factory para criação de loggers por plugin
  function createLogger(pluginPrefix) {
    return {
      prefix: `[${pluginPrefix}]`,
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
  }

  // Logger padrão do Core
  const Logger = createLogger(pluginName);

  // -----------------------
  // Helpers de ambiente
  // -----------------------
  function hasGameVariables() {
    return !!window.$gameVariables;
  }

  function hasGameSwitches() {
    return !!window.$gameSwitches;
  }

  function getGameVariable(id, fallback = 0) {
    try {
      return Number($gameVariables.value(id) ?? fallback) || 0;
    } catch (_) {
      return Number(fallback) || 0;
    }
  }

  function setGameVariable(id, value) {
    try {
      if (id > 0 && hasGameVariables()) $gameVariables.setValue(id, value);
    } catch (_) {}
  }

  function getGameSwitch(id) {
    try {
      return !!(id > 0 && hasGameSwitches() && $gameSwitches.value(id));
    } catch (_) {
      return false;
    }
  }

  function setGameSwitch(id, value) {
    try {
      if (id > 0 && hasGameSwitches()) $gameSwitches.setValue(id, !!value);
    } catch (_) {}
  }

  // -----------------------
  // Utilitários comuns
  // -----------------------
  function safeNumber(value, fallback = 0) {
    const num = Number(value);
    return isNaN(num) ? fallback : num;
  }

  function safeBool(value, fallback = false) {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return fallback;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  // -----------------------
  // Classe principal do Core
  // -----------------------
  class CoretoCore {
    /**
     * Sistema Core da Coreto Studio
     */
    constructor() {
      this.version = '1.0.0';
      this.initialized = true;
    }

    // Factory methods
    createLogger(pluginName) {
      return createLogger(pluginName);
    }

    // Game variable helpers
    getGameVariable(id, fallback = 0) {
      return getGameVariable(id, fallback);
    }

    setGameVariable(id, value) {
      setGameVariable(id, value);
    }

    // Game switch helpers
    getGameSwitch(id) {
      return getGameSwitch(id);
    }

    setGameSwitch(id, value) {
      setGameSwitch(id, value);
    }

    // Utility methods
    safeNumber(value, fallback = 0) {
      return safeNumber(value, fallback);
    }

    safeBool(value, fallback = false) {
      return safeBool(value, fallback);
    }

    clamp(value, min, max) {
      return clamp(value, min, max);
    }

    randomInt(min, max) {
      return randomInt(min, max);
    }

    randomFloat(min, max) {
      return randomFloat(min, max);
    }

    // Environment checks
    hasGameVariables() {
      return hasGameVariables();
    }

    hasGameSwitches() {
      return hasGameSwitches();
    }
  }

  // Instância global exposta
  window.CoretoCore = new CoretoCore();

  Logger.info('Plugin inicializado com sucesso.');

  // -----------------------
  // Plugin Commands
  // -----------------------
})();

//============================================================================
// Iavra_MZ_Localization_byNeomaStudio.js
//============================================================================

/*:
@plugindesc Plugin para adicionar traduções ao jogo por meio de arquivo externo.
<Iavra Localization Core>
@author Iavra

@param Escape Code
@type text
@desc O código modelo para usar para tradução. Substitua o "key" pela string desejada. Melhor não alterar isso.
@default #{{key}}

@param Languages
@type text
@desc Coloque aqui as linguagens que deseja usar no jogo. A primeira da lista será a padrão. Separe-as com ", "(Sem aspas).
@default en, ptbr

@param File Path
@type text
@desc Melhor não mexer nisso.
@default {lang}.json

@param Option Label
@type text
@desc Nome da opção para troca de idioma no menu de opções.
@default Language

@param Language Labels
@type text
@desc Como cada idioma irá aparecer no menu de opções. Formato "idioma:NomeDaOpção".Separe com vírgula e espaço.
@default en:English, ptbr:Portuguese

@param Localization Folder
@type text
@desc O caminho da pasta onde os arquivos de tradução .json estão localizados.
@default localization

@help
==============================================================================
Introdução
==============================================================================

Esse plugin é a fusão de dois plugins do autor Iavra: Iavra_Localization_Core
e Iavra_Localization_Menu. Eu não alterei nada nos códigos, apenas mudei a
forma como é escrito.
Foram consertados três bugs, dois por mim e outro pelo próprio autor no tópico
oficial. Também houveram algumas mudanças no arquivo de ajuda.

==============================================================================
Funcionalidades
==============================================================================

• Adicione quantos idiomas quiser.
• Faça as traduções por um arquivo externo .json e importe para o jogo.
• Você pode traduzir todo o database.
• Também pode traduzir qualquer coisa nos parâmetros de outros plugins.
• Mude a linguagem através do menu ou de script calls.
• Funciona em Pc e Mobile.
 
==============================================================================
Como usar
==============================================================================
• Definindo os idiomas:
Primeiro defina seus idiomas no parâmetro "Languages". Depois faça os arquivos
.json(Devem ser salvos em UTF-8) no seu editor de texto favorito e nomeie-os
de acordo com o preenchimento do parâmetro.

Exemplo:
Parâmetro > en, ptbr, esp
Arquivos > en.json, ptbr.json, esp.json

Esses arquivos devem estar na pasta raiz do projeto.
A primeira linguagem definida será a linguagem padrão.

• Como funciona a tradução:
O plugin irá substituir um "escape code" que você usar no jogo para o que
estiver correspondente a ele nos arquivos .json.
Exemplo:

Caixa de mensagens > #{Npc.01} ou #{Npc01}

No arquivo .json dos idiomas você deverá colocar assim:

"Npc": {
    "01":"Meu nome é Haroldo",
    "02":"Meu nome é Laura"
}

ou

"Npc01":"Meu nome é Haroldo"

Poderá repetir o mesmo procedimento no database e parâmetros de outros plugins.

Você também pode traduzir usando arrays:

No .json:
"text": ["Text 1", "Text 2", "Text 3"]
Isso vai gerar os escape codes > "text.0", "text.1" and "text.2"

Os escape codes também podem conter outros escape codes dentro deles:

{
"text": "Hi, my name is #{actor}",
"actor": "Harold"
}

*Não use acentos no "escape code".
*Para usar os escape codes default da caixa de mensagens(incluindo de outros
plugins):
Errado > \i[2]
Certo > \\i[2]
*Para pular uma linha use \n, já que o arquivo .json por padrão não suporta
quebra de linha.

O plugin oferece os seguintes script calls:

IAVRA.MasterLocalization.I18N.language;           Retorna o idioma atual.
IAVRA.MasterLocalization.I18N.language = "lang";  Muda o idioma para outro idioma "lang".
IAVRA.MasterLocalization.I18N.languages();        Retorna uma lista de todos os idiomas.
IAVRA.MasterLocalization.I18N.localize(text);     Localiza o texto desejado.

Você pode mudar um idioma através do menu de opções, pelos script calls
acima ou pelo comando de plugin:

SET_LANG [idioma]

Exemplo:

SET_LANG ptbr

*Você pode usar esse site para corrigir erros de formatação no arquivo .json
https://jsonformatter.curiousconcept.com/

==============================================================================
Termos de uso
==============================================================================

Livre para projetos comerciais e não comerciais, contanto que seja dado
créditos para Iavra.
Link do tópico oficial feito pelo autor:
https://forums.rpgmakerweb.com/index.php?threads/iavra-localization.53699/
Se quiser, pode me dar créditos também(Eliaquim).
 
==============================================================================
Updatelog
==============================================================================
Versão 1.0 - 10/04/2020
- Released

*/

'use strict';

var Imported = Imported || {};
Imported.Iavra_MZ_Localization_byNeomaStudio = true;

var IAVRA = IAVRA || {};
IAVRA.MasterLocalization = IAVRA.MasterLocalization || {};

IAVRA.MasterLocalization.Parameters = PluginManager.parameters('Iavra_MZ_Localization_byNeomaStudio');
IAVRA.MasterLocalization.Param = IAVRA.MasterLocalization.Param || {};

IAVRA.MasterLocalization.Param = {
  EscapeCode: String(IAVRA.MasterLocalization.Parameters['Escape Code']),
  IvCoreLanguages: String(IAVRA.MasterLocalization.Parameters['Languages'])
    .split(/\s*,\s*/)
    .filter(function (lang) {
      return !!lang;
    }),
  IvCoreFilePath: String(IAVRA.MasterLocalization.Parameters['File Path']),
  IvCoreLabelOption: String(IAVRA.MasterLocalization.Parameters['Option Label']),
  IvCoreLabelLanguages: String(IAVRA.MasterLocalization.Parameters['Language Labels'])
    .split(/\s*,\s*/)
    .reduce(function (map, entry) {
      var split = entry.split(':');
      if (split.length === 2) {
        map[split[0]] = split[1];
      }
      return map;
    }, {}),
  LocalizationFolder: String(IAVRA.MasterLocalization.Parameters['Localization Folder']),
};

/**
 * Regex used to replace escape codes with localized data.
 */
var IvCoreRegex = new RegExp(IAVRA.MasterLocalization.Param.EscapeCode.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&').replace('\\{key\\}', '([\\w\\.]+?)'), 'g');

/**
 * The current language.
 */
var IvCoreLang = IAVRA.MasterLocalization.Param.IvCoreLanguages[0];

/**
 * Contains all localized data read from the data files defined "File Path". We intentionally don't use the object
 * literal {}, but create a new Object with a null prototype, so we don't inherit any properties.
 */
var IvCoreData = IAVRA.MasterLocalization.Param.IvCoreLanguages.reduce(function (map, lang) {
  map[lang] = null;
  return map;
}, Object.create(null));

/**
 * Indicated, whether we are currently inside of "drawTextEx". Not thread-/async-safe!
 */
var IvCoreinDrawTextEx = false;

/**
 * Initializes the language data by reading all files and storing their content inside the _data object. The
 * undefined data serves as fallback, if no language is given in the "Languages" plugin parameter.
 */
function IvCoreInitialize() {
  IAVRA.MasterLocalization.Param.IvCoreLanguages.forEach(function (lang) {
    IvCoreLoadFile(IAVRA.MasterLocalization.Param.IvCoreFilePath.replace('{lang}', lang), function (data) {
      IvCoreData[lang] = IvCoreFlatten(data);
    });
  });
  IvCoreData[undefined] = {};
}

/**
 * Loads a JSON file and executes the given callback with the parsed file contents as a parameter.
 */
function IvCoreLoadFile(fileName, callback) {
  var folder = IAVRA.MasterLocalization.Param.LocalizationFolder;
  var url = folder + '/' + fileName;
  var request = new XMLHttpRequest();

  request.open('GET', url);
  request.overrideMimeType('application/json');
  request.onload = function () {
    callback(JSON.parse(request.responseText));
  };
  request.onerror = function () {
    throw new Error("There was an error loading the file '" + url + "'.");
  };

  request.send();
}

/**
 * Flattens the given data object by joining nested object keys and array indizes with "." and returns a single-
 * level object, whose keys can be used in escape codes.
 */
function IvCoreFlatten(object) {
  var result = {},
    temp,
    value;
  for (var key in object) {
    if (typeof (value = object[key]) === 'object') {
      temp = IvCoreFlatten(value);
      for (var x in temp) {
        result[key + '.' + x] = temp[x];
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Returns true, if all language files have been loaded.
 */
function IvCoreIsReady() {
  return IAVRA.MasterLocalization.Param.IvCoreLanguages.every(function (lang) {
    return !!IvCoreData[lang];
  });
}

/**
 * Recursively replaces all escape codes in the text with the localized data. Note, that we also do an implicit
 * conversion of the given data to String, since otherwise the function would crash, when invoked with a number.
 */
var IvCoreReplace = function (text) {
  if (text === undefined || text === null) {
    return text;
  }
  var f = true;
  var d = IvCoreData[IvCoreLang];
  var r = '' + text;
  while (f) {
    f = false;
    r = r.replace(IvCoreRegex, function (m, k) {
      f = true;
      return d[k];
    });
  }
  return r;
};

//=============================================================================
// IAVRA.MasterLocalization.I18N
//=============================================================================

IAVRA.MasterLocalization.I18N = {
  /**
   * Localizes a given text. Can be used, when the automatic localization happens too late (or not at all):
   */
  localize: function (text) {
    return IvCoreReplace(text);
  },

  /**
   * Returns the list of all registered languages. Can be used to create an option menu or similar.
   */
  languages: function () {
    return IAVRA.MasterLocalization.Param.IvCoreLanguages;
  },
};

/**
 * Property used to read and set the current language. If the given value wasn't registered in the "Languages"
 * plugin parameter, fallback to the first language, instead. Also, when changing the language, we need to update
 * the document title, since the game title might be localized.
 */
Object.defineProperty(IAVRA.MasterLocalization.I18N, 'language', {
  get: function () {
    return IvCoreLang;
  },
  set: function (value) {
    IvCoreLang = IAVRA.MasterLocalization.Param.IvCoreLanguages.contains(value) ? value : IAVRA.MasterLocalization.Param.IvCoreLanguages[0];
    Scene_Boot.prototype.updateDocumentTitle();
  },
});

//=============================================================================
// Scene_Boot(RPG SCENE)
//=============================================================================

/**
 * When creating Scene_Boot, also start loading all language files to initialize the plugin.
 */
IAVRA.Scene_Boot_create = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function () {
  IAVRA.Scene_Boot_create.call(this);
  IvCoreInitialize();
};

/**
 * Also wait, until all language data has been read.
 */
IAVRA.Scene_Boot_isReady = Scene_Boot.prototype.isReady;
Scene_Boot.prototype.isReady = function () {
  return IvCoreIsReady() && IAVRA.Scene_Boot_isReady.call(this);
};

/**
 * We override this method, because we may have to convert the game title, before setting the document title.
 * Make sure, that $dataSystem is already initialized, because an option menu will set the current language,
 * before data has been loaded. But don't worry, the correct title will be set during Scene_Boot.start.
 */
IAVRA.Scene_Boot_updateDocumentTitle = Scene_Boot.prototype.updateDocumentTitle;
Scene_Boot.prototype.updateDocumentTitle = function () {
  if ($dataSystem) {
    document.title = IvCoreReplace($dataSystem.gameTitle);
  }
};

//=============================================================================
// Window_Base(RPG WINDOWS)
//=============================================================================

/**
 * Set a marker indicating, that we are currently inside drawTextEx. This marker is not threadsafe, so the
 * plugin likely won't work with other plugins, that are asynchronously drawing text.
 */
IAVRA.Window_Base_drawTextEx = Window_Base.prototype.drawTextEx;
Window_Base.prototype.drawTextEx = function (text, x, y) {
  IvCoreinDrawTextEx = true;
  IAVRA.result = IAVRA.Window_Base_drawTextEx.call(this, text, x, y);
  IvCoreinDrawTextEx = false;
  return IAVRA.result;
};
/**
 * Replaces all escape codes, before AND after converting escape characters. We have to do this twice, because
 * otherwise we would miss escape codes in character names, that have been added via escape characters.
 */
IAVRA.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function (text) {
  return IvCoreReplace(IAVRA.Window_Base_convertEscapeCharacters.call(this, IvCoreReplace(text)));
};

//=============================================================================
// Bitmap(RPG CORE)
//=============================================================================

/**
 * When drawing text, replace escape codes unless we are currently inside drawTextEx. Without this check, we
 * would effectively call our replace method for every single character of the text given to drawTextEx.
 */
IAVRA.Bitmap_drawText = Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function (text, x, y, maxWidth, lineHeight, align) {
  IAVRA.Bitmap_drawText.call(this, IvCoreinDrawTextEx ? text : IvCoreReplace(text), x, y, maxWidth, lineHeight, align);
};
/**
 * Measuring text is done, before drawing it, so escape codes won't be resolved, yet.
 */
IAVRA.Bitmap_measureTextWidth = Bitmap.prototype.measureTextWidth;
Bitmap.prototype.measureTextWidth = function (text) {
  return IAVRA.Bitmap_measureTextWidth.call(this, IvCoreReplace(text));
};

//=============================================================================
// String(RPG CORE)
//=============================================================================
/**
 * Needs to be aliased, so the state and skill messages (among others) works correctly.
 */
IAVRA.String_format = String.prototype.format;
String.prototype.format = function () {
  return IAVRA.String_format.apply(IvCoreReplace(this), arguments);
};

// A FIX FOR WINDOW_NAME EDIT MADE BY IAVRA FOR SOMEONE IN THE THREAD.
IAVRA.Window_NameEdit_initialize = Window_NameEdit.prototype.initialize;
Window_NameEdit.prototype.initialize = function (actor, maxLength) {
  actor._name = IAVRA.MasterLocalization.I18N.localize(actor._name);
  IAVRA.Window_NameEdit_initialize.call(this, actor, maxLength);
};

//=============================================================================
// LOCALIZATION MENU
//=============================================================================

/**
 * Returns the previous language in the list or the last language, if the current one is already the first.
 */
// Eliaquim: I'V changed the behaviour of this to fix a bug.
function IvCorePrevLanguage(language) {
  var languages = IAVRA.MasterLocalization.I18N.languages();
  var index = languages.indexOf(language) - 1;
  return languages[index < 0 ? languages.length - 1 : index];
}
/**
 * Returns the next language in the list or the first language, of the current one is already the last.
 */
// Eliaquim: I'V changed the behaviour of this to fix a bug.
function IvCoreNextLanguage(language) {
  var languages = IAVRA.MasterLocalization.I18N.languages();
  var index = languages.indexOf(language) + 1;
  return languages[index >= languages.length ? 0 : index];
}

/**
 * Applies the given language and returns it or the default fallback, if the given value was invalid. We don't
 * directly change the language, after it was selected in the options menu, because otherwise you would see a
 * mixed of different languages, while changing options.
 */
function IvCoreApplyLanguage(language) {
  IAVRA.MasterLocalization.I18N.language = language;
  return IAVRA.MasterLocalization.I18N.language;
}

//=============================================================================
// Window_Options
//=============================================================================

// Eliaquim: I'v add this to fix a bug.
IAVRA.Window_Options_initialize = Window_Options.prototype.addOptionsCommand;
Window_Options.prototype.addOptionsCommand = function () {
  ConfigManager.language = IAVRA.MasterLocalization.I18N.language;
  IAVRA.Window_Options_initialize.call(this);
};

IAVRA.Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function () {
  IAVRA.Window_Options_makeCommandList.call(this);
  this.addCommand(IAVRA.MasterLocalization.Param.IvCoreLabelOption, 'language');
};

IAVRA.Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function (index) {
  var symbol = this.commandSymbol(index);
  var value = this.getConfigValue(symbol);
  return symbol === 'language' ? IAVRA.MasterLocalization.Param.IvCoreLabelLanguages[value] : IAVRA.Window_Options_statusText.call(this, index);
};

IAVRA.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function () {
  var symbol = this.commandSymbol(this.index());
  var value = this.getConfigValue(symbol);
  if (symbol === 'language') {
    return this.changeValue(symbol, IvCoreNextLanguage(value));
  }
  IAVRA.Window_Options_processOk.call(this);
};

IAVRA.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function (wrap) {
  var symbol = this.commandSymbol(this.index());
  var value = this.getConfigValue(symbol);
  if (symbol === 'language') {
    return this.changeValue(symbol, IvCorePrevLanguage(value));
  }
  IAVRA.Window_Options_cursorLeft.call(this, wrap);
};

IAVRA.Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function (wrap) {
  var symbol = this.commandSymbol(this.index());
  var value = this.getConfigValue(symbol);
  if (symbol === 'language') {
    return this.changeValue(symbol, IvCoreNextLanguage(value));
  }
  IAVRA.Window_Options_cursorRight.call(this, wrap);
};

//=============================================================================
// ConfigManager
//=============================================================================

/**
 * The current language. Automatically gets kept in sync with the core plugin, whenever the current language
 * is written to or read from the config savefile.
 */
var IvCoreLanguage;

/**
 * Store the currently selected language in the config savefile, so it's persisted between games. Before
 * saving the language, it gets applied, so we can correctly fallback to the default language, if needed.
 */
IAVRA.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
  var config = IAVRA.ConfigManager_makeData.call(this);
  config.language = this.language = IvCoreApplyLanguage(this.language);
  return config;
};
/**
 * Load the current language from the config savefile. Also, apply it, so we can display the correct language
 * and fallback to the default language, if the savefile entry doesn't exist or is invalid.
 */
IAVRA.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
  IAVRA.ConfigManager_applyData.call(this, config);
  this.language = IvCoreApplyLanguage(config.language);
};
/**
 * Read and set the current language. Language is managed locally, because otherwise we would experience some
 * strange sideffects in the options menu.
 */
Object.defineProperty(IAVRA, 'language', {
  get: function () {
    return IvCoreLanguage;
  },
  set: function (value) {
    IvCoreLanguage = value;
  },
});

IAVRA.MasterLocalization.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
  IAVRA.MasterLocalization.Game_Interpreter_pluginCommand.call(this, command, args);
  const cmd = command.toUpperCase();
  if (cmd === 'SET_LANG') {
    IAVRA.MasterLocalization.I18N.language = args[0];
  }
};

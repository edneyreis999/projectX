/*
 * Copyright (c) 2025 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kdworkshop.net/>
 *
 *
 */

/*:
 * @plugindesc (v.1.5)[PRO] Characters animations system
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/animax
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * GUIDE: 
 *  https://gist.github.com/KageDesu/c3a74dddeea24f6e7f6f7baf590f1722
 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty or Patreon!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 * 
 *
 *
 * @param xAnimations:structA
 * @text Animations List
 * @type struct<LAnimaX>[]
 * @default []
 * @desc XAnima System Animations List
 * 
 * @param xAnimaParts:structA
 * @text Animation Layers List
 * @type struct<LAnimaXPart>[]
 * @default []
 * @desc XAnima System animation layers list
 * 
 * @param isUseAltPreload:b
 * @text Is Use Alt. Preload?
 * @type boolean
 * @default false
 * @desc If true - plugin will preload all images from folder charactersAA (not works in browser)
 * 
 * @param isUseWebp:b
 * @text Is Use .Webp?
 * @type boolean
 * @default false
 * @desc Is use alternative .webp format for images in folder charactersAA? All images should be in .webp, not .png
 * 
 * @param isWaitSpritesheetLoading:b
 * @text Is Wait Spritesheet Loading?
 * @type boolean
 * @default false
 * @desc If true - plugin will wait for all player spritesheets to be loaded before start Map Scene
 * 
 * @param isUseDiagonalMovement:b
 * @text Is Use Diagonal Movement?
 * @type boolean
 * @default false
 * @desc If true - plugin will use diagonal movement for player
 * 
 * @param isAllowDiagonalEventsActivation:b
 * @parent isUseDiagonalMovement:b
 * @text Is Allow Diagonal Events Activation?
 * @type boolean
 * @default false
 * @desc If true - starts events when player touch them diagonally
 * 
 * @param diagonalMovementSpeedKoef:i
 * @parent isUseDiagonalMovement:b
 * @text Diagonal Movement Speed Mod
 * @type number
 * @decimals 2
 * @default 0.8
 * @min 0.01
 * @desc Diagonal movement speed modifier
 * 
 * @param inactiveAnimaXMapsList:intA
 * @text Inactive Maps List
 * @type number[]
 * @default []
 * @desc List of maps where XAnima System is inactive
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command ChangePlayerAnimationSet
 * @text Change Player Animation
 * @desc Change player animation set
 * 
 * @arg animationSetName
 * @text Animation ID
 * @desc Animation ID form Animation List (plugin parameters)
 * @type text
 * @default
 * 
 * @command ResetPlayerAnimationSet
 * @text Reset Player Animation
 * @desc Reset player animation set to default (from Actor's Note)
 * 
 * @command ChangeEventAnimationSet
 * @text Change Event Animation
 * @desc Change Event animation set
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID, -2,-3,-4 - followers
 * @type number
 * @min -4
 * @default -1
 * 
 * @arg animationSetName
 * @text Animation ID
 * @desc Animation ID form Animation List (plugin parameters)
 * @type text
 * @default
 * 
 * @command ResetEventAnimationSet
 * @text Reset Event Animation
 * @desc Reset Event animation set to default (from Event page Comment or Empty)
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID, -2,-3,-4 - followers
 * @type number
 * @min -4
 * @default -1
 * 
 * @command ChangeFollowerAnimationSet
 * @text Change Follower Animation
 * @desc Change Follower animation set
 * 
 * @arg partyMemberIndex
 * @text Index
 * @desc Follower index: 0, 1, 2
 * @type number
 * @min 0
 * @max 2
 * @default 0
 * 
 * @arg animationSetName
 * @text Animation ID
 * @desc Animation ID form Animation List (plugin parameters)
 * @type text
 * @default
 * 
 * @command ResetFollowerAnimationSet
 * @text Reset Follower Animation
 * @desc Reset Follower animation set to default (from Actor's Note)
 * 
 * @arg partyMemberIndex
 * @text Index
 * @desc Follower index: 0, 1, 2
 * @type number
 * @min 0
 * @max 2
 * @default 0
 * 
 * @command PlayAnimationAction
 * @text Play Anima Action
 * @desc Start playing animation action for character
 * 
 * @arg actionName
 * @text Action Name
 * @desc Action Name form Actions List (plugin parameters) or empty string (clear all actions)
 * @type text
 * @default
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID, -2,-3,-4 - followers
 * @type number
 * @min -4
 * @default -1
 * 
 * 
 *  @arg isLoop
 *  @text Is Looping?
 *  @type boolean
 *  @default false
 *  @desc Animation will be looped while character is not moving, event commands is continue
 * 
 *  @arg isWait
 *  @text Is Wait?
 *  @type boolean
 *  @default true
 *  @desc Next event commands will wait animation to complete
 * 
 * @command PlayIndependentAnimationAction
 * @text Play Independent Anima Action
 * @desc Start playing independent animation action for character (with or without AnimaX)
 * 
 * @arg animationSetName
 * @text Animation ID
 * @desc Animation ID form Animation List (plugin parameters)
 * @type text
 * @default
 * 
 * @arg actionName
 * @text Action Name
 * @desc Action Name form Actions List (plugin parameters) or empty string (clear all actions)
 * @type text
 * @default
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID, -2,-3,-4 - followers
 * @type number
 * @min -4
 * @default -1
 * 
 * 
 *  @arg isLoop
 *  @text Is Looping?
 *  @type boolean
 *  @default false
 *  @desc Animation will be looped while character is not moving, event commands is continue
 * 
 *  @arg isWait
 *  @text Is Wait?
 *  @type boolean
 *  @default true
 *  @desc Next event commands will wait animation to complete
 * 
 * @command StopAnimationAction
 * @text Stop Anima Action
 * @desc Stop looping animation action for character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID, -2,-3,-4 - followers
 * @type number
 * @min -4
 * @default -1
 * 
 * 
 * @command AddPart
 * @text Add Layer
 * @desc Add extra layer on character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID, -2,-3,-4 - followers
 * @type number
 * @min -4
 * @default -1
 * 
 * 
 * @arg layerName
 * @text Layer ID
 * @desc Layer ID form Animation Layers List (plugin parameters)
 * @type text
 * @default
 * 
 * @arg isRelative
 * @text Relative?
 * @type boolean
 * @desc If false - layer will be loaded from CommonLayers folder, if true - layer will be loaded from character AnimaX folder
 * @default false
 * 
 * @command RemovePart
 * @text Remove Layer
 * @desc Remove extra layer from character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID, -2,-3,-4 - followers
 * @type number
 * @min -4
 * @default -1
 * 
 * 
 * @arg layerName
 * @text Layer ID
 * @desc Added layer ID form Animation Layers List (plugin parameters)
 * @type text
 * @default
 * 
 * @command ClearParts
 * @text Clear layers
 * @desc Remove all layers from character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID, -2,-3,-4 - followers
 * @type number
 * @min -4
 * @default -1
 * 
 * @command SetAnimaXState
 * @text Set AnimaX State
 * @desc Enable or Disable AnimaX
 * 
 * @arg isEnabled
 * @text Is AnimaX Enabled?
 * @type boolean
 * @default false
 * @desc
 * 
 * @command AnimaXPartyState
 * @text Set AnimaX State for Party
 * @desc Enable or Disable AnimaX for player or follwers
 * 
 * @arg partyMemberIndex
 * @text Member Index
 * @desc 0 - Player, 1, 2, 3 - followers
 * @type number
 * @min 0
 * @max 3
 * @default 0
 * 
 * @arg isEnabled
 * @text Is AnimaX Enabled?
 * @type boolean
 * @default false
 * @desc
 * 
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:ru
 * @plugindesc (v.1.5)[PRO] Система анимаций персонажей
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/animax
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * РУКОВОДСТВО: 
 *  https://gist.github.com/KageDesu/c3a74dddeea24f6e7f6f7baf590f1722
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty:
 *      https://boosty.to/kagedesu
 * YouTube:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *
 *
 *
 * @param xAnimations:structA
 * @text Список анимаций
 * @type struct<LAnimaX>[]
 * @default []
 * @desc Список анимаций (профилей)
 * 
 * @param xAnimaParts:structA
 * @text Список слоёв
 * @type struct<LAnimaXPart>[]
 * @default []
 * @desc Список дополнительный слоёв (частей)
 * 
 * @param isUseAltPreload:b
 * @text Использовать альтернативную предзагрузку?
 * @type boolean
 * @default false
 * @desc Если ВКЛ - все изображения из папки charactersAA будут загружены в память (не работает в браузере)
 * 
 * @param isUseWebp:b
 * @text Использовать .Webp?
 * @type boolean
 * @default false
 * @desc Исползовать .webp формат изображений в папке charactersAA? Все файлы должны быть .webp, а не .png
 * 
 * @param isWaitSpritesheetLoading:b
 * @text Ждать загрузку спрайтлистов?
 * @type boolean
 * @default false
 * @desc Если ВКЛ - плагин будет ждать загрузки всех спрайтлистов игрока перед стартом карты
 * 
 * @param isUseDiagonalMovement:b
 * @text Использовать диагональное движение?
 * @type boolean
 * @default false
 * @desc Если ВКЛ - плагин будет использовать диагональное движение для игрока
 * 
 * @param isAllowDiagonalEventsActivation:b
 * @parent isUseDiagonalMovement:b
 * @text Разрешить активацию событий по диагонали?
 * @type boolean
 * @default false
 * @desc Если ВКЛ - события будут активироваться, когда игрок касается их по диагонали
 * 
 * @param diagonalMovementSpeedKoef:i
 * @parent isUseDiagonalMovement:b
 * @text Модификатор скорости диагонального движения
 * @type number
 * @decimals 2
 * @default 0.8
 * @min 0.01
 * @desc
 * 
 * @param inactiveAnimaXMapsList:intA
 * @text Список карт без AnimaX
 * @type number[]
 * @default []
 * @desc Список карт, на которых AnimaX System не активен
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command ChangePlayerAnimationSet
 * @text Изменить профиль анимации игрока
 * @desc
 * 
 * @arg animationSetName
 * @text Профиль
 * @desc ID (имя) профиля из Animation List (параметр плагина)
 * @type text
 * @default
 * 
 * @command ResetPlayerAnimationSet
 * @text Сбросить профиль игрока
 * @desc Сбросить до базового (который был указан в заметке персонажа)
 * 
 * @command ChangeEventAnimationSet
 * @text Изменить профиль анимации события
 * @desc
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие, -2,-3,-4 - последователи
 * @type number
 * @min -4
 * @default -1
 * 
 * @arg animationSetName
 * @text Профиль
 * @desc ID (имя) профиля из Animation List (параметр плагина)
 * @type text
 * @default
 * 
 * @command ResetEventAnimationSet
 * @text Сбросить профиль события
 * @desc Сбросить до базового (из комментария на странице или пустого)
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие, -2,-3,-4 - последователи
 * @type number
 * @min -4
 * @default -1
 * 
 * @command PlayAnimationAction
 * @text Анимационное действие
 * @desc
 * 
 * @arg actionName
 * @text Название действия
 * @desc Название действия из Actions List (параметр плагина) или пусто - чтобы отменить все
 * @type text
 * @default
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие, -2,-3,-4 - последователи
 * @type number
 * @min -4
 * @default -1
 * 
 *  @arg isLoop
 *  @text Зациклить?
 *  @type boolean
 *  @default false
 *  @desc Анимация действия будет зацикленна пока событие (персонаж) не сдвинуться с места
 * 
 *  @arg isWait
 *  @text Ждать окончания?
 *  @type boolean
 *  @default true
 *  @desc Следующая команда события будет ждать окончания анимации действия
 * 
 * @command PlayIndependentAnimationAction
 * @text Анимационное действие (независимое)
 * @desc Независиме анимационное действие для персонажа (с AnimaX или без него)
 * 
 * @arg animationSetName
 * @text Профиль
 * @desc ID (имя) профиля из Animation List (параметр плагина)
 * @type text
 * @default
 * 
 * @arg actionName
 * @text Название действия
 * @desc Название действия из Actions List (параметр плагина) или пусто - чтобы отменить все
 * @type text
 * @default
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие, -2,-3,-4 - последователи
 * @type number
 * @min -4
 * @default -1
 * 
 * @arg isLoop
 *  @text Зациклить?
 *  @type boolean
 *  @default false
 *  @desc Анимация действия будет зацикленна пока событие (персонаж) не сдвинуться с места
 * 
 *  @arg isWait
 *  @text Ждать окончания?
 *  @type boolean
 *  @default true
 *  @desc Следующая команда события будет ждать окончания анимации действия
 * 
 * @command StopAnimationAction
 * @text Остановить действие
 * @desc Остановить любое зацикленное анимационное действие
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие, -2,-3,-4 - последователи
 * @type number
 * @min -4
 * @default -1
 * 
 * @command AddPart
 * @text Добавить слой
 * @desc
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие, -2,-3,-4 - последователи
 * @type number
 * @min -4
 * @default -1
 * 
 * @arg layerName
 * @text Имя слоя
 * @desc Имя слоя из Animation Layers List (параметр плагина)
 * @type text
 * @default
 * 
 * @arg isRelative
 * @text Относительно?
 * @type boolean
 * @desc Если ВЫКЛ - слой будет из папки Common Layers, если ВКЛ - из папки профиля
 * @default false
 * 
 * @command RemovePart
 * @text Удалить слой
 * @desc
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие, -2,-3,-4 - последователи
 * @type number
 * @min -4
 * @default -1
 * 
 * @arg layerName
 * @text Имя слоя
 * @desc
 * @type text
 * @default
 * 
 * @command ClearParts
 * @text Удалить все слои
 * @desc
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие, -2,-3,-4 - последователи
 * @type number
 * @min -4
 * @default -1
 * 
 * @command SetAnimaXState
 * @text Состояние AnimaX (игра)
 * @desc Включить или выключить AnimaX для всей игры
 * 
 * @arg isEnabled
 * @text Включить?
 * @type boolean
 * @default false
 * @desc
 * 
 * @command AnimaXPartyState
 * @text Состояние AnimaX (партия)
 * @desc Включить или выключить AnimaX для персонажа (партии)
 * 
 * @arg partyMemberIndex
 * @text Номер персонажа
 * @desc 0 - Игрок, 1, 2, 3 - последователи
 * @type number
 * @min 0
 * @max 3
 * @default 0
 * 
 * @arg isEnabled
 * @text Включить?
 * @type boolean
 * @default false
 * @desc
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:zh-cn
 * @plugindesc (v.1.5)[PRO] 角色动画系统
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/animax
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * 指南: 
 *  https://gist.github.com/KageDesu/c3a74dddeea24f6e7f6f7baf590f1722
 * ---------------------------------------------------------------------------
 * 如果 您喜欢我的插件，想要更多和更频繁的更新，请在以下平台上支持我：
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *
 *
 *
 * @param xAnimations:structA
 * @text 动画列表
 * @type struct<LAnimaX>[]
 * @default []
 * @desc 动画列表（配置文件）
 * 
 * @param xAnimaParts:structA
 * @text 层列表
 * @type struct<LAnimaXPart>[]
 * @default []
 * @desc 额外层（部分）列表
 * 
 * @param isUseAltPreload:b
 * @text 使用替代预加载？
 * @type boolean
 * @default false
 * @desc 如果开启 - 所有来自charactersAA文件夹的图像将加载到内存中（在浏览器中不起作用）
 * 
 * @param isUseWebp:b
 * @text 使用.Webp？
 * @type boolean
 * @default false
 * @desc 使用charactersAA文件夹中的.webp格式图像？所有文件必须是.webp，而不是.png
 * 
 * @param isWaitSpritesheetLoading:b
 * @text 等待精灵表加载？
 * @type boolean
 * @default false
 * @desc 如果开启 - 插件将在地图启动前等待加载所有玩家的精灵表
 * 
 * @param isUseDiagonalMovement:b
 * @text 使用对角移动？
 * @type boolean
 * @default false
 * @desc 如果开启 - 插件将为玩家使用对角移动
 * 
 * @param isAllowDiagonalEventsActivation:b
 * @parent isUseDiagonalMovement:b
 * @text 允许对角事件激活？
 * @type boolean
 * @default false
 * @desc 如果开启 - 当玩家对角接触事件时，事件将被激活
 * 
 * @param diagonalMovementSpeedKoef:i
 * @parent isUseDiagonalMovement:b
 * @text 对角移动速度系数
 * @type number
 * @decimals 2
 * @default 0.8
 * @min 0.01
 * @desc
 * 
 * @param inactiveAnimaXMapsList:intA
 * @text 无AnimaX的地图列表
 * @type number[]
 * @default []
 * @desc AnimaX系统未激活的地图列表
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * @command ChangePlayerAnimationSet
 * @text 更改玩家动画配置文件
 * @desc
 * 
 * @arg animationSetName
 * @text 配置文件
 * @desc Animation List中的配置文件ID（名称）（插件参数）
 * @type text
 * @default
 * 
 * @command ResetPlayerAnimationSet
 * @text 重置玩家配置文件
 * @desc 重置为基本配置文件（在角色备注中指定的）
 * 
 * @command ChangeEventAnimationSet
 * @text 更改事件动画配置文件
 * @desc
 * 
 * @arg eventId
 * @text 事件编号
 * @desc 数字 - 事件编号。0 - 玩家，-1 - 当前事件, -2,-3,-4 - 跟随者
 * @type number
 * @min -4
 * @default -1
 * 
 * @arg animationSetName
 * @text 配置文件
 * @desc Animation List中的配置文件ID（名称）（插件参数）
 * @type text
 * @default
 * 
 * @command ResetEventAnimationSet
 * @text 重置事件配置文件
 * @desc 重置为基本配置文件（从页面评论或为空）
 * 
 * @arg eventId
 * @text 事件编号
 * @desc 数字 - 事件编号。0 - 玩家，-1 - 当前事件, -2,-3,-4 - 跟随者
 * @type number
 * @min -4
 * @default -1
 * 
 * @command PlayAnimationAction
 * @text 动画动作
 * @desc
 * 
 * @arg actionName
 * @text 动作名称
 * @desc Actions List中的动作名称（插件参数）或为空以取消所有
 * @type text
 * @default
 * 
 * @arg eventId
 * @text 事件编号
 * @desc 数字 - 事件编号。0 - 玩家，-1 - 当前事件, -2,-3,-4 - 跟随者
 * @type number
 * @min -4
 * @default -1
 * 
 *  @arg isLoop
 *  @text 循环？
 *  @type boolean
 *  @default false
 *  @desc 动作动画将循环，直到事件（角色）移动
 * 
 *  @arg isWait
 *  @text 等待结束？
 *  @type boolean
 *  @default true
 *  @desc 下一个事件命令将等待动作动画结束
 * 
 * @command PlayIndependentAnimationAction
 * @text 独立动画动作
 * @desc 独立的角色动画动作（带或不带AnimaX）
 * 
 * @arg animationSetName
 * @text 配置文件
 * @desc Animation List中的配置文件ID（名称）（插件参数）
 * @type text
 * @default
 * 
 * @arg actionName
 * @text 动作名称
 * @desc Actions List中的动作名称（插件参数）或为空以取消所有
 * @type text
 * @default
 * 
 * @arg eventId
 * @text 事件编号
 * @desc 数字 - 事件编号。0 - 玩家，-1 - 当前事件, -2,-3,-4 - 跟随者
 * @type number
 * @min -4
 * @default -1
 * 
 * @arg isLoop
 *  @text 循环？
 *  @type boolean
 *  @default false
 *  @desc 动作动画将循环，直到事件（角色）移动
 * 
 *  @arg isWait
 *  @text 等待结束？
 *  @type boolean
 *  @default true
 *  @desc 下一个事件命令将等待动作动画结束
 * 
 * @command StopAnimationAction
 * @text 停止动作
 * @desc 停止任何循环的动画动作
 * 
 * @arg eventId
 * @text 事件编号
 * @desc 数字 - 事件编号。0 - 玩家，-1 - 当前事件, -2,-3,-4 - 跟随者
 * @type number
 * @min -4
 * @default -1
 * 
 * @command AddPart
 * @text 添加层
 * @desc
 * 
 * @arg eventId
 * @text 事件编号
 * @desc 数字 - 事件编号。0 - 玩家，-1 - 当前事件, -2,-3,-4 - 跟随者
 * @type number
 * @min -4
 * @default -1
 * 
 * @arg layerName
 * @text 层名称
 * @desc Animation Layers List中的层名称（插件参数）
 * @type text
 * @default
 * 
 * @arg isRelative
 * @text 相对？
 * @type boolean
 * @desc 如果关闭 - 层将来自Common Layers文件夹，如果打开 - 来自配置文件文件夹
 * @default false
 * 
 * @command RemovePart
 * @text 删除层
 * @desc
 * 
 * @arg eventId
 * @text 事件编号
 * @desc 数字 - 事件编号。0 - 玩家，-1 - 当前事件, -2,-3,-4 - 跟随者
 * @type number
 * @min -4
 * @default -1
 * 
 * @arg layerName
 * @text 层名称
 * @desc
 * @type text
 * @default
 * 
 * @command ClearParts
 * @text 删除所有层
 * @desc
 * 
 * @arg eventId
 * @text 事件编号
 * @desc 数字 - 事件编号。0 - 玩家，-1 - 当前事件, -2,-3,-4 - 跟随者
 * @type number
 * @min -4
 * @default -1
 * 
 * @command SetAnimaXState
 * @text AnimaX状态 (游戏)
 * @desc 更改AnimaX状态
 * 
 * @arg isEnabled
 * @text 启用？
 * @type boolean
 * @default false
 * @desc
 * 
 * @command AnimaXPartyState
 * @text AnimaX状态
 * @desc 更改AnimaX状态  (启用/禁用)
 * 
 * @arg partyMemberIndex
 * @text 成员编号
 * @desc 0 - 玩家, 1, 2, 3 - 跟随者
 * @type number
 * @min 0
 * @max 3
 * @default 0
 * 
 * @arg isEnabled
 * @text 启用？
 * @type boolean
 * @default false
 * @desc
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*~struct~LAnimaXPart:
 * @param id
 * @text ID
 * @default
 * @desc Unique ID for layer (also folder Name)
  
 * @param isLowerBodyPart:b
 * @text Is Lower Body Layer?
 * @type boolean
 * @default false
 * @desc If true - this layer will be half transparent when character in bushes
 
 * @param sortingLevel:i
 * @text Sorting order
 * @type number
 * @default 0
 * @min -100
 * @desc Layer sorting order
 *
 * @param dx:int
 * @text Offset X
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc Layer offset by X coordinate
 * 
 * @param dy:int
 * @text Offset Y
 * @min -100
 * @max 100
 * @type number
 * @default 0
 * @desc Layer offset by Y coordinate
 *
 * @param layerRule:struct
 * @text Layer Settings
 * @type struct<LAnimaXPartDirLevel>
 * @default {"noDir:b":"false","dirD:b":"false","dirL:b":"false","dirR:b":"false","dirU:b":"false","8wayGroup":"","dirDL:b":"false","dirDR:b":"false","dirUR:b":"false","dirUL:b":"false"}
 * @desc Setting of layer direciton sprites positions
 *
 * @param baseRule:struct
 * @text Base Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc Default animation layer settings. Using for all action without own rules

 * @param moveRule:struct
 * @text Move Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Optional] Animation layer settings for moving

 * @param idleRule:struct
 * @text Idle Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Optional] Animation layer settings for idle

 * @param dashRule:struct
 * @text Dashing Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Optional] Animation layer settings for dashing

 * @param actionRules:structA
 * @text Actions Rules
 * @type struct<LAnimaXPartActionRule>[]
 * @default []
 * @desc [Optional] Animation layer settings for actions
*/

/*~struct~LAnimaXPart:ru
 * @param id
 * @text ID
 * @default
 * @desc Уникальный идентификатор для слоя (также имя папки)
  
 * @param isLowerBodyPart:b
 * @text Это нижний слой тела?
 * @type boolean
 * @default false
 * @desc Если true - этот слой будет полупрозрачным, когда персонаж находится в кустах
 
 * @param sortingLevel:i
 * @text Порядок сортировки
 * @type number
 * @default 0
 * @min -100
 * @desc Порядок сортировки слоя
 *
 * @param dx:int
 * @text Смещение по X
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc Смещение слоя по координате X
 * 
 * @param dy:int
 * @text Смещение по Y
 * @min -100
 * @max 100
 * @type number
 * @default 0
 * @desc Смещение слоя по координате Y
 *
 * @param layerRule:struct
 * @text Настройки слоя
 * @type struct<LAnimaXPartDirLevel>
 * @default {"noDir:b":"false","dirD:b":"false","dirL:b":"false","dirR:b":"false","dirU:b":"false","8wayGroup":"","dirDL:b":"false","dirDR:b":"false","dirUR:b":"false","dirUL:b":"false"}
 * @desc Настройки позиций спрайтов направления слоя
 *
 * @param baseRule:struct
 * @text Основное правило
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc Настройки анимации слоя по умолчанию. Используется для всех действий без собственных правил

 * @param moveRule:struct
 * @text Правило движения
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Необязательно] Настройки анимации слоя для движения

 * @param idleRule:struct
 * @text Правило бездействия
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Необязательно] Настройки анимации слоя для бездействия

 * @param dashRule:struct
 * @text Правило бега
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Необязательно] Настройки анимации слоя для бега

 * @param actionRules:structA
 * @text Правила действий
 * @type struct<LAnimaXPartActionRule>[]
 * @default []
 * @desc [Необязательно] Настройки анимации слоя для действий
*/

/*~struct~LAnimaXPart:zh-cn
 * @param id
 * @text ID
 * @default
 * @desc 层的唯一标识符（也是文件夹名称）
  
 * @param isLowerBodyPart:b
 * @text 是下半身层吗？
 * @type boolean
 * @default false
 * @desc 如果为 true，当角色在草丛中时，这一层将会变为半透明
 
 * @param sortingLevel:i
 * @text 排序顺序
 * @type number
 * @default 0
 * @min -100
 * @desc 层的排序顺序
 *
 * @param dx:int
 * @text X 偏移
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc 层的 X 坐标偏移
 * 
 * @param dy:int
 * @text Y 偏移
 * @min -100
 * @max 100
 * @type number
 * @default 0
 * @desc 层的 Y 坐标偏移
 *
 * @param layerRule:struct
 * @text 层设置
 * @type struct<LAnimaXPartDirLevel>
 * @default {"noDir:b":"false","dirD:b":"false","dirL:b":"false","dirR:b":"false","dirU:b":"false","8wayGroup":"","dirDL:b":"false","dirDR:b":"false","dirUR:b":"false","dirUL:b":"false"}
 * @desc 层方向精灵位置的设置
 *
 * @param baseRule:struct
 * @text 基本规则
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc 默认动画层设置。适用于没有特定规则的所有动作

 * @param moveRule:struct
 * @text 移动规则
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [可选] 层的移动动画设置

 * @param idleRule:struct
 * @text 空闲规则
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [可选] 层的空闲动画设置

 * @param dashRule:struct
 * @text 冲刺规则
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [可选] 层的冲刺动画设置

 * @param actionRules:structA
 * @text 动作规则
 * @type struct<LAnimaXPartActionRule>[]
 * @default []
 * @desc [可选] 层的动作动画设置
*/


/*~struct~LAnimaXPartActionRule:

 * @param actionName
 * @text Action Name
 * @default
 * @desc Name of action that rules for

 * @param fileName
 * @text Extra File Name
 * @default 
 * @desc Filename for this action, leave empty to use filename same as Action Name

 * @param enabled:b
 * @text Is Enabled?
 * @type boolean
 * @default true
 * @desc If false - this layer will hide completly when this action is playing

 * @param actionRule:struct
 * @text Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc Layer settings only for this action

*/

/*~struct~LAnimaXPartActionRule:ru

 * @param actionName
 * @text Название действия
 * @default
 * @desc Название действия, для которого правила

 * @param fileName
 * @text Дополнительное имя файла
 * @default 
 * @desc Имя файла для этого действия, оставьте пустым, чтобы использовать имя файла такое же, как имя действия

 * @param enabled:b
 * @text Включено?
 * @type boolean
 * @default true
 * @desc Если false - этот слой будет полностью скрыт, когда это действие воспроизводится

 * @param actionRule:struct
 * @text Правило
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc Настройки слоя только для этого действия

*/

/*~struct~LAnimaXPartActionRule:zh-cn

 * @param actionName
 * @text 动作名称
 * @default
 * @desc 为此规则的动作名称

 * @param fileName
 * @text Дополнительное имя файла
 * @default 
 * @desc 为此动作的文件名，留空以使用与动作名称相同的文件名

 * @param enabled:b
 * @text 是否启用?
 * @type boolean
 * @default true
 * @desc 如果为false - 当此动作播放时，此层将完全隐藏

 * @param actionRule:struct
 * @text 规则
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc 仅适用于此动作的层设置

*/

/*~struct~LAnimaXPartDefRule:

 * @param isHaveDirections:b
 * @text Is change direction?
 * @type boolean
 * @default true
 * @desc Layer have direction related sprites _D, _U, _R, _L ?
 
 * @param isHaveFrames:b
 * @text Is have frames?
 * @type boolean
 * @default true
 * @desc If false - layer have only one frame (0 - zero), if true - layer have same frame count as parent animation

 * @param isSpritesheet:b
 * @text Is Spritesheet?
 * @type boolean
 * @default false
 * @desc Animation layer will be on single file (spritesheet)

 * @param isSepareteSpritesheet:bool
 * @parent isSpritesheet:b
 * @text Is Separate Spritesheet?
 * @type boolean
 * @default false
 * @desc Animations will be on separate files (spritesheet) for 4 and 8 directions

*/

/*~struct~LAnimaXPartDefRule:ru

 * @param isHaveDirections:b
 * @text Изменяются направления?
 * @type boolean
 * @default true
 * @desc У слоя есть спрайты, связанные с направлениями _D, _U, _R, _L ?
 
 * @param isHaveFrames:b
 * @text Есть ли кадры?
 * @type boolean
 * @default true
 * @desc Если false - слой имеет только один кадр (0 - нулевой), если true - слой имеет столько же кадров, сколько и родительская анимация

 * @param isSpritesheet:b
 * @text Использовать спрайт-лист?
 * @type boolean
 * @default false
 * @desc Анимационный слой будет на одном файле (спрайт-лист)

*/

/*~struct~LAnimaXPartDefRule:zh-cn

 * @param isHaveDirections:b
 * @text 是否改变方向？
 * @type boolean
 * @default true
 * @desc 该层是否有与方向相关的精灵 _D, _U, _R, _L ？
 
 * @param isHaveFrames:b
 * @text 是否有帧数？
 * @type boolean
 * @default true
 * @desc 如果为 false，层只有一个帧（0 - 零帧），如果为 true，层的帧数与父动画相同

 * @param isSpritesheet:b
 * @text 是精灵表？
 * @type boolean
 * @default false
 * @desc 动画层将作为一个文件（精灵表）

*/


/*~struct~LAnimaXPartDirLevel:

 * @param noDir:b
 * @text Default
 * @type boolean
 * @on Below
 * @off Above
 * @default false
 * @desc Is layer sprite with no directions will be below character sprite?

 * @param dirD:b
 * @text Down (_D)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Down direction sprites will be below character sprite?

 * @param dirL:b
 * @text Left (_L)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Left direction sprites will be below character sprite?

 * @param dirR:b
 * @text Right (_R)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Right direction sprites will be below character sprite?

 * @param dirU:b
 * @text Up (_U)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up direction sprites will be below character sprite?

 * @param 8wayGroup
 * @text Diagonal Settings

 * @param dirDL:b
 * @parent 8wayGroup
 * @text Down Left (_DL)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Down Left direction sprites will be below character sprite?

 * @param dirDR:b
 * @parent 8wayGroup
 * @text Down Right (_DR)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Left Right direction sprites will be below character sprite?

 * @param dirUR:b
 * @parent 8wayGroup
 * @text Up Right (_UR)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up Right direction sprites will be below character sprite?

 * @param dirUL:b
 * @parent 8wayGroup
 * @text Up Left (_UL)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up Left direction sprites will be below character sprite?

*/

/*~struct~LAnimaXPartDirLevel:ru
    
     * @param noDir:b
     * @text По умолчанию
     * @type boolean
     * @on Ниже
     * @off Выше
     * @default false
     * @desc Будет ли слой спрайтов без направлений ниже спрайта персонажа?
    
     * @param dirD:b
     * @text Вниз (_D)
     * @type boolean
    * @on Ниже
     * @off Выше
     * @default false
     * @desc Будет ли слой спрайтов направления вниз ниже спрайта персонажа?
    
     * @param dirL:b
     * @text Влево (_L)
     * @type boolean
    * @on Ниже
     * @off Выше
     * @default false
     * @desc Будет ли слой спрайтов направления влево ниже спрайта персонажа?
    
     * @param dirR:b
     * @text Вправо (_R)
     * @type boolean
    * @on Ниже
     * @off Выше
     * @default false
     * @desc Будет ли слой спрайтов направления вправо ниже спрайта персонажа?
    
     * @param dirU:b
     * @text Вверх (_U)
     * @type boolean
    * @on Ниже
     * @off Выше
     * @default false
     * @desc Будет ли слой спрайтов направления вверх ниже спрайта персонажа?
    
     * @param 8wayGroup
     * @text Диагональные настройки
    
     * @param dirDL:b
     * @parent 8wayGroup
     * @text Вниз-Лево (_DL)
     * @type boolean
    * @on Ниже
     * @off Выше
     * @default false
     * @desc Будет ли слой спрайтов направления вниз-лево ниже спрайта персонажа?
    
     * @param dirDR:b
     * @parent 8wayGroup
     * @text Вниз-Право (_DR)
        * @type boolean
    * @on Ниже
        * @off Выше
        * @default false
        * @desc Будет ли слой спрайтов направления вниз-право ниже спрайта персонажа?
        
        * @param dirUR:b
        * @parent 8wayGroup
        * @text Вверх-Право (_UR)
            * @type boolean
        * @on Ниже
            * @off Выше
            * @default false
            * @desc Будет ли слой спрайтов направления вверх-право ниже спрайта персонажа?
            
            * @param dirUL:b
            * @parent 8wayGroup
            * @text Вверх-Лево (_UL)
                * @type boolean
            * @on Ниже
                * @off Выше
                * @default false
                * @desc Будет ли слой спрайтов направления вверх-лево ниже спрайта персонажа?
*/

/*~struct~LAnimaXPartDirLevel:zh-cn

 * @param noDir:b
 * @text 默认
 * @type boolean
 * @on 下面
 * @off 上面
 * @default false
 * @desc 没有方向的层精灵是否在角色精灵下面？
 
 * @param dirD:b
 * @text 向下 (_D)
 * @type boolean
  * @on 下面
 * @off 上面
 * @default false
 * @desc 向下方向的层精灵是否在角色精灵下面？

 * @param dirL:b
 * @text 向左 (_L)
 * @type boolean
  * @on 下面
 * @off 上面
 * @default false
 * @desc 向左方向的层精灵是否在角色精灵下面？

 * @param dirR:b
 * @text 向右 (_R)
 * @type boolean
  * @on 下面
 * @off 上面
 * @default false
 * @desc 向右方向的层精灵是否在角色精灵下面？

 * @param dirU:b
 * @text 向上 (_U)
 * @type boolean
  * @on 下面
 * @off 上面
 * @default false
 * @desc 向上方向的层精灵是否在角色精灵下面？

 * @param 8wayGroup
 * @text 对角设置

 * @param dirDL:b
 * @parent 8wayGroup
 * @text 向下左 (_DL)
 * @type boolean
  * @on 下面
 * @off 上面
 * @default false
 * @desc 向下左方向的层精灵是否在角色精灵下面？

 * @param dirDR:b
 * @parent 8wayGroup
 * @text 向下右 (_DR)
 * @type boolean
  * @on 下面
 * @off 上面
 * @default false
 * @desc 向下右方向的层精灵是否在角色精灵下面？

    * @param dirUR:b
    * @parent 8wayGroup
    * @text 向上右 (_UR)
    * @type boolean
    * @on 下面
    * @off 上面
    * @default false
    * @desc 向上右方向的层精灵是否在角色精灵下面？

    * @param dirUL:b
    * @parent 8wayGroup
    * @text 向上左 (_UL)
    * @type boolean
    * @on 下面
    * @off 上面
    * @default false
    * @desc 向上左方向的层精灵是否在角色精灵下面？

*/

/*~struct~LAnimaX:
 * @param id
 * @text ID
 * @default
 * @desc Unique ID for animation (also folder Name)
 * 
 * @param base:s
 * @text Base
 * @type struct<LAnimaXSet>
 * @default
 * @desc Base animation set (for movement)
 * 
 * @param ABSZe
 * @text AABS Z
 * @default Only for Alpha ABS Z
 *
 * @param inBattle:s
 * @parent ABSZe
 * @text In Battle
 * @type struct<LAnimaXSet>
 * @default
 * @desc Battle state animation set
 * 
 * @param dead:s
 * @parent ABSZe
 * @text Dead
 * @type struct<LAnimaXSet>
 * @default
 * @desc Dead state animation set
 *
 * @param actions:structA
 * @text Actions
 * @type struct<LAnimaXAction>[]
 * @default []
 * @desc Actions List
*/

/*~struct~LAnimaX:ru
 * @param id
 * @text ID
 * @default
 * @desc Уникальный идентификатор для анимации (также имя папки)
 * 
 * @param base:s
 * @text Основное
 * @type struct<LAnimaXSet>
 * @default
 * @desc Основной набор анимаций (для движения)
 * 
 * @param ABSZe
 * @text AABS Z
 * @default Only for Alpha ABS Z
 *
 * @param inBattle:s
 * @parent ABSZe
 * @text В бою
 * @type struct<LAnimaXSet>
 * @default
 * @desc Набор анимаций для состояния боя
 * 
 * @param dead:s
 * @parent ABSZe
 * @text Мертвый
 * @type struct<LAnimaXSet>
 * @default
 * @desc Набор анимаций для состояния мертвого
 *
 * @param actions:structA
 * @text Действия
 * @type struct<LAnimaXAction>[]
 * @default []
 * @desc Список действий
*/

/*~struct~LAnimaX:zh-cn
 * @param id
 * @text ID
 * @default
 * @desc 动画的唯一标识符（也是文件夹名称）
 * 
 * @param base:s
 * @text 基础
 * @type struct<LAnimaXSet>
 * @default
 * @desc 基础动画集（用于移动）
 * 
 * @param ABSZe
 * @text AABS Z
 * @default 仅用于 Alpha ABS Z
 *
 * @param inBattle:s
 * @parent ABSZe
 * @text 战斗中
 * @type struct<LAnimaXSet>
 * @default
 * @desc 战斗状态的动画集
 * 
 * @param dead:s
 * @parent ABSZe
 * @text 死亡
 * @type struct<LAnimaXSet>
 * @default
 * @desc 死亡状态的动画集
 *
 * @param actions:structA
 * @text 动作
 * @type struct<LAnimaXAction>[]
 * @default []
 * @desc 动作列表
*/


/*~struct~LAnimaXSet:
 * @param move:s
 * @text Movement
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Movement animation settings
 * 
 * @param idle:s
 * @text Idle
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Idle animation settings [Optional]
 *
 * @param dash:s
 * @text Dashing
 * @type struct<LAnimaXParameters>
 * @default
 * @desc [PRO] Dashing animation settings [Optional]
 * 
 * @param moveToIdleDelay:i
 * @text Idle Delay
 * @type number
 * @default 30
 * @min 0
 * @desc Speed of change from movement to idle when character is not moving
*/

/*~struct~LAnimaXSet:ru
 * @param move:s
 * @text Движение
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Настройки анимации движения
 * 
 * @param idle:s
 * @text Бездействие
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Настройки анимации бездействия [Необязательно]
 *
 * @param dash:s
 * @text Бег
 * @type struct<LAnimaXParameters>
 * @default
 * @desc [PRO] Настройки анимации бега [Необязательно]
 * 
 * @param moveToIdleDelay:i
 * @text Задержка бездействия
 * @type number
 * @default 30
 * @min 0
 * @desc Скорость перехода от движения к бездействию, когда персонаж не двигается
*/

/*~struct~LAnimaXSet:zh-cn
 * @param move:s
 * @text 移动
 * @type struct<LAnimaXParameters>
 * @default
 * @desc 移动动画设置
 * 
 * @param idle:s
 * @text 空闲
 * @type struct<LAnimaXParameters>
 * @default
 * @desc 空闲动画设置 [可选]
 *
 * @param dash:s
 * @text 冲刺
 * @type struct<LAnimaXParameters>
 * @default
 * @desc [PRO] 冲刺动画设置 [可选]
 * 
 * @param moveToIdleDelay:i
 * @text 空闲延迟
 * @type number
 * @default 30
 * @min 0
 * @desc 当角色不移动时，从移动到空闲的变化速度
*/

/*~struct~LAnimaXAction:
 * @param name
 * @text Action Name
 * @default Action
 * @desc Name for aciton
 * 
 * @param animation:s
 * @text Settings
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Action animation settings
 *
 * @param Behaviour
 *
 * @param seOnStart
 * @parent Behaviour
 * @text SE on start
 * @type file
 * @dir audio/se
 * @required 1
 * @default
 * @desc [Optional] Sound at the beginning of the action
 *
 * @param seDelay:i
 * @parent seOnStart
 * @text Delay
 * @type number
 * @default 0
 * @min 0
 * @desc Delay (in frames, 60 = 1 sec) of sound at the beginning of action
 *
 * @param seOnEnd
 * @parent Behaviour
 * @text SE on end
 * @type file
 * @dir audio/se
 * @required 1
 * @default
 * @desc [Optional] Sound at the end of the action
 *
 *
 * @param scOnStart
 * @parent Behaviour
 * @text Script Call on start
 * @default
 * @desc [Optional] Script call at the beginning of the action
 *
 * @param scDelay:i
 * @parent scOnStart
 * @text Delay
 * @type number
 * @default 0
 * @min 0
 * @desc Delay (in frames, 60 = 1 sec) of script call at the beginning of action*
 *
 * @param scOnEnd
 * @parent Behaviour
 * @text Script Call on end
 * @default
 * @desc [Optional] Script call at the end of the action
 *
 *
*/

/*~struct~LAnimaXAction:ru
 * @param name
 * @text Название действия
 * @default Действие
 * @desc Название действия
 * 
 * @param animation:s
 * @text Настройки
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Настройки анимации действия
 *
 * @param Behaviour
 *
 * @param seOnStart
 * @parent Behaviour
 * @text Звук в начале
 * @type file
 * @dir audio/se
 * @required 1
 * @default
 * @desc [Необязательно] Звук в начале действия
 *
 * @param seDelay:i
 * @parent seOnStart
 * @text Задержка
 * @type number
 * @default 0
 * @min 0
 * @desc Задержка (в кадрах, 60 = 1 сек) звука в начале действия
 *
 * @param seOnEnd
 * @parent Behaviour
 * @text Звук в конце
 * @type file
 * @dir audio/se
 * @required 1
 * @default
 * @desc [Необязательно] Звук в конце действия
 *
 *
 * @param scOnStart
 * @parent Behaviour
 * @text Вызов скрипта в начале
 * @default
 * @desc [Необязательно] Вызов скрипта в начале действия
 *
 * @param scDelay:i
 * @parent scOnStart
 * @text Задержка
 * @type number
 * @default 0
 * @min 0
 * @desc Задержка (в кадрах, 60 = 1 сек) вызова скрипта в начале действия*
 *
 * @param scOnEnd
 * @parent Behaviour
 * @text Вызов скрипта в конце
 * @default
 * @desc [Необязательно] Вызов скрипта в конце действия
 *
*/

/*~struct~LAnimaXAction:zh-cn
 * @param name
 * @text 动作名称
 * @default 动作
 * @desc 动作名称
 * 
 * @param animation:s
 * @text 设置
 * @type struct<LAnimaXParameters>
 * @default
 * @desc 动作动画设置
 *
 * @param Behaviour
 *
 * @param seOnStart
 * @parent Behaviour
 * @text 开始时的 SE
 * @type file
 * @dir audio/se
 * @required 1
 * @default
 * @desc [可选] 动作开始时的声音
 *
 * @param seDelay:i
 * @parent seOnStart
 * @text 延迟
 * @type number
 * @default 0
 * @min 0
 * @desc 动作开始时声音的延迟（以帧为单位，60 = 1 秒）
 *
 * @param seOnEnd
 * @parent Behaviour
 * @text 结束时的 SE
 * @type file
 * @dir audio/se
 * @required 1
 * @default
 * @desc [可选] 动作结束时的声音
 *
 *
 * @param scOnStart
 * @parent Behaviour
 * @text 开始时的脚本调用
 * @default
 * @desc [可选] 动作开始时的脚本调用
 *
 * @param scDelay:i
 * @parent scOnStart
 * @text 延迟
 * @type number
 * @default 0
 * @min 0
 * @desc 动作开始时脚本调用的延迟（以帧为单位，60 = 1 秒）*
 *
 * @param scOnEnd
 * @parent Behaviour
 * @text 结束时的脚本调用
 * @default
 * @desc [可选] 动作结束时的脚本调用
 *
*/

/*~struct~LAnimaXParameters:
 * @param isOneDirection:b
 * @text One Direction?
 * @type boolean
 * @default false
 * @desc Animation will use only one direciton (without _D, _L, _R, _U frames)
 * 
 * @param frames:i
 * @text Frames Count
 * @type number
 * @default 3
 * @min 1
 * @desc Frames count
 * 
 * @param speed:i
 * @text Speed
 * @type number
 * @default 15
 * @min 1
 * @desc Frames change speed in frames
 * 
 * @param expandFirstFrame:i
 * @text Repeat first frame times
 * @type number
 * @default 0
 * @min 0
 * @max 100
 * @desc Times to repeat first frame (make only first frame dalayed)
 * 
 * @param is8Way:b
 * @text Is Support Diagonal?
 * @type boolean
 * @default false
 * @desc Animation will support 8 way diagonal movement, require _DL, _DR, _UL, _UR frames images
 * 
 * @param dx:int
 * @text Offset X
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc Animation offset by X coordinate
 * 
 * @param dy:int
 * @text Offset Y
 * @min -100
 * @max 100
 * @type number
 * @default 0
 * @desc Animation offset by Y coordinate
 *
 * @param isSpritesheet:bool
 * @text Is Spritesheet?
 * @type boolean
 * @default false
 * @desc Animations will be on single file (spritesheet)
 *
 * @param isSepareteSpritesheet:bool
 * @parent isSpritesheet:bool
    * @text Is Separate Spritesheet?
    * @type boolean
    * @default false
    * @desc Animations will be on separate files (spritesheet) for 4 and 8 directions
*/

/*~struct~LAnimaXParameters:ru
 * @param isOneDirection:b
 * @text Одно направление?
 * @type boolean
 * @default false
 * @desc Анимация будет использовать только одно направление (без кадров _D, _L, _R, _U)
 * 
 * @param frames:i
 * @text Количество кадров
 * @type number
 * @default 3
 * @min 1
 * @desc Количество кадров
 * 
 * @param speed:i
 * @text Скорость
 * @type number
 * @default 15
 * @min 1
 * @desc Скорость смены кадров в кадрах
 * 
 * @param expandFirstFrame:i
 * @text Повторить первый кадр раз
 * @type number
 * @default 0
 * @min 0
 * @max 100
 * @desc Количество повторений первого кадра (сделать только первый кадр задержанным)
 * 
 * @param is8Way:b
 * @text Поддержка диагонали?
 * @type boolean
 * @default false
 * @desc Анимация будет поддерживать 8-ми направленное диагональное движение, требует изображения кадров _DL, _DR, _UL, _UR
 * 
 * @param dx:int
 * @text Смещение по X
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc Смещение анимации по координате X
 * 
 * @param dy:int
 * @text Смещение по Y
 * @min -100
 * @max 100
 * @type number
 * @default 0
 * @desc Смещение анимации по координате Y
 *
 * @param isSpritesheet:bool
 * @text Использовать спрайт-лист?
 * @type boolean
 * @default false
 * @desc Анимации будут на одном файле (спрайт-лист)
    *
    * @param isSepareteSpritesheet:bool
    * @parent isSpritesheet:bool
    * @text Использовать отдельные спрайт-листы?
    * @type boolean
    * @default false
    * @desc Анимации будут на отдельных файлах (спрайт-лист) для 4 и 8 направлений
*/

/*~struct~LAnimaXParameters:zh-cn
 * @param isOneDirection:b
 * @text 一个方向？
 * @type boolean
 * @default false
 * @desc 动画将只使用一个方向（没有 _D, _L, _R, _U 帧）
 * 
 * @param frames:i
 * @text 帧数
 * @type number
 * @default 3
 * @min 1
 * @desc 帧数
 * 
 * @param speed:i
 * @text 速度
 * @type number
 * @default 15
 * @min 1
 * @desc 帧的变化速度
 * 
 * @param expandFirstFrame:i
 * @text 重复第一帧次数
 * @type number
 * @default 0
 * @min 0
 * @max 100
 * @desc 重复第一帧的次数（只延迟第一帧）
 * 
 * @param is8Way:b
 * @text 是否支持对角线？
 * @type boolean
 * @default false
 * @desc 动画将支持 8 方向对角线移动，需要 _DL, _DR, _UL, _UR 帧图像
 * 
 * @param dx:int
 * @text X 偏移
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc 动画的 X 坐标偏移
 * 
 * @param dy:int
 * @text Y 偏移
 * @min -100
 * @max 100
 * @type number
 * @default 0
 * @desc 动画的 Y 坐标偏移
 *
 * @param isSpritesheet:bool
 * @text 是精灵表？
 * @type boolean
 * @default false
 * @desc 动画将在单个文件（精灵表）上
    *
    * @param isSepareteSpritesheet:bool
    * @parent isSpritesheet:bool
    * @text 是单独的精灵表？
    * @type boolean
    * @default false
    * @desc 动画将在单独的文件（精灵表）上，用于 4 和 8 个方向
*/



var Imported = Imported || {};
Imported.PKD_AnimaX = true;

var PKD_ANIMAX = {};
PKD_ANIMAX.version = 150;

PKD_ANIMAX.isMV = () => {
  return Utils.RPGMAKER_NAME.includes("MV");
};

// * Загрузка доп. методо поддержки плагинов
PKD_ANIMAX.ApplyExtensions = () => {
  if (Imported.Alpha_NETZ == true) {
    PKD_ANIMAX.ApplyNETZPatch();
  }

  if(window['mz3d'] != null) {
    PKD_ANIMAX.ApplyMZ3DPatch();
  }

};

// * Алтернативный способ предзагрузки (все изображения)
PKD_ANIMAX.PreloadAllImages = () => {

  if (!PKD_ANIMAX.IsUseAltPreload()) {
    return;
  }
  if (!Utils.isNwjs()) {
    console.warn('AnimaX alternative preload NOT works in Browser');
    return;
  }

  PKD_ANIMAX.WalkIn();
};

PKD_ANIMAX.WalkIn = () => {

  const fs = require('fs');
  const path = require('path');


  let base = path.dirname(process.mainModule.filename);
  base = path.join(base, 'img/charactersAA/');

  PKD_ANIMAX._basePath = base;

  var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
      if (err) return done(err);
      var i = 0;
      (function next() {
        var file = list[i++];
        if (!file) return done(null, results);
        file = path.resolve(dir, file);
        fs.stat(file, function (err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function (err, res) {
              results = results.concat(res);
              next();
            });
          } else {
            results.push(file);
            next();
          }
        });
      })();
    });
  };

  walk(base, ImageManager.loadAllAnimaX);
};


PKD_ANIMAX.RegisterPluginCommnads4MV = () => {

    //@[ALIAS]
    var _Game_Interpreter_pluginCommand_3434 = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand_3434.call(this, command, args);
        if (command === 'ChangePlayerAnimationSet') {
            try {
                let animSetId = args[0];
                if(PKD_ANIMAX.KString.any(animSetId)) {
                    PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(0, animSetId);
                }
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'ResetPlayerAnimationSet') {
            try {
                PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(0, null);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'ChangeEventAnimationSet') {
            try {
                let charaId = parseInt(args[0]);
                let animSetId = args[1];
                if(PKD_ANIMAX.KString.any(animSetId)) {
                    PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(charaId, animSetId);
                }
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'ResetEventAnimationSet') {
            try {
                let charaId = parseInt(args[0]);
                PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(charaId, null);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'ChangeFollowerAnimationSet') {
            try {
                let charaId = (parseInt(args[0]) + 2) * -1;
                let animSetId = args[1];
                if(PKD_ANIMAX.KString.any(animSetId)) {
                    PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(charaId, animSetId);
                }
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'ResetFollowerAnimationSet') {
            try {
                let charaId = (parseInt(args[0]) + 2) * -1;
                PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(charaId, null);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'PlayAnimationAction') {
            try {
                let actionName = args[0];
                let charaId = parseInt(args[1]);
                let isLoop = eval(args[2]);
                let isWait = eval(args[3]);
                PKD_ANIMAX.PluginCommand_PlayAnimationAction(actionName, charaId, isLoop, isWait);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'PlayIndependentAction') {
            try {
                let animSetId = args[0];
                let actionName = args[1];
                let charaId = parseInt(args[2]);
                let isLoop = eval(args[3]);
                let isWait = eval(args[4]);
                PKD_ANIMAX.PluginCommand_PlayIndependentAction(animSetId, actionName, charaId, isLoop, isWait);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'StopAnimationAction') {
            try {
                let charaId = parseInt(args[0]);
                PKD_ANIMAX.PluginCommand_StopAnimationAction(charaId);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'AddAnimaLayer') {
            try {
                let charaId = parseInt(args[0]);
                let layerName = args[1];
                let isRelative = eval(args[2]);
                PKD_ANIMAX.PluginCommand_AddPart(charaId, layerName, isRelative);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'RemoveAnimaLayer') {
            try {
                let charaId = parseInt(args[0]);
                let layerName = args[1];
                PKD_ANIMAX.PluginCommand_RemovePart(charaId, layerName);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'ClearAnimaLayers') {
            try {
                let charaId = parseInt(args[0]);
                PKD_ANIMAX.PluginCommand_ClearParts(charaId);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'SetAnimaXStateForParty') {
            try {
                let memberIndex = parseInt(args[0]);
                let state = eval(args[1]);
                PKD_ANIMAX.SetAnimaXStateForPartyMember(memberIndex, state);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'EnableAnimaX') {
            try {
                PKD_ANIMAX.EnableAnimaX();
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'DisableAnimaX') {
            try {
                PKD_ANIMAX.DisableAnimaX();
            } catch (e) {
                console.warn(e);
            }
        }
    };


};

PKD_ANIMAX.RegisterPluginCommnads4MZ = () => {

    const pluginName = "PKD_AnimaX";

    PKD_ANIMAX.RegisterPluginCommnadsForName(pluginName);
    PKD_ANIMAX.RegisterPluginCommnadsForName(pluginName + "_MZ");

};

PKD_ANIMAX.RegisterPluginCommnadsForName = (pluginName) => {

    PluginManager.registerCommand(pluginName, 'ChangePlayerAnimationSet', args => {
        try {
            let animationSetName = args.animationSetName;
            if(PKD_ANIMAX.KString.any(animationSetName)) {
                PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(0, animationSetName);
            }
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'ResetPlayerAnimationSet', args => {
        try {
            PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(0, null);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'ChangeEventAnimationSet', args => {
        try {
            let animationSetName = args.animationSetName;
            let charaId = parseInt(args.eventId);
            if(PKD_ANIMAX.KString.any(animationSetName)) {
                PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(charaId, animationSetName);
            }
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'ResetEventAnimationSet', args => {
        try {
            let charaId = parseInt(args.eventId);
            PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(charaId, null);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'ChangeFollowerAnimationSet', args => {
        try {
            let animationSetName = args.animationSetName;
            // 0 should be -2
            // 1 should be -3
            // 2 should be -4
            let charaId = (parseInt(args.partyMemberIndex) + 2) * -1;
            if(PKD_ANIMAX.KString.any(animationSetName)) {
                PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(charaId, animationSetName);
            }
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'ResetFollowerAnimationSet', args => {
        try {
            let charaId = (parseInt(args.partyMemberIndex) + 2) * -1;
            PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(charaId, null);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'PlayAnimationAction', args => {
        try {
            let actionName = args.actionName;
            let charaId = parseInt(args.eventId);
            let isLoop = eval(args.isLoop);
            let isWait = eval(args.isWait);
            PKD_ANIMAX.PluginCommand_PlayAnimationAction(actionName, charaId, isLoop, isWait);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'PlayIndependentAnimationAction', args => {
        try {
            let animationSetName = args.animationSetName;
            let actionName = args.actionName;
            let charaId = parseInt(args.eventId);
            let isLoop = eval(args.isLoop);
            let isWait = eval(args.isWait);
            PKD_ANIMAX.PluginCommand_PlayIndependentAction(animationSetName, actionName, charaId, isLoop, isWait);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'StopAnimationAction', args => {
        try {
            let charaId = parseInt(args.eventId);
            PKD_ANIMAX.PluginCommand_StopAnimationAction(charaId);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'AddPart', args => {
        try {
            let charaId = parseInt(args.eventId);
            let partId = args.layerName;
            let isRelative = eval(args.isRelative);
            PKD_ANIMAX.PluginCommand_AddPart(charaId, partId, isRelative);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'RemovePart', args => {
        try {
            let charaId = parseInt(args.eventId);
            let partId = args.layerName;
            PKD_ANIMAX.PluginCommand_RemovePart(charaId, partId);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'ClearParts', args => {
        try {
            let charaId = parseInt(args.eventId);
            PKD_ANIMAX.PluginCommand_ClearParts(charaId);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'AnimaXPartyState', args => {
        try {
            let memberIndex = parseInt(args.partyMemberIndex);
            let state = eval(args.isEnabled);
            PKD_ANIMAX.SetAnimaXStateForPartyMember(memberIndex, state);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'SetAnimaXState', args => {
        try {
            let state = eval(args.isEnabled);
            if(state) {
                PKD_ANIMAX.EnableAnimaX();
            } else {
                PKD_ANIMAX.DisableAnimaX();
            }
        } catch (e) {
            console.warn(e);
        }
    });


};

(function () {

Array.prototype.delete = function () {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

Object.defineProperty(Array.prototype, "delete", {
    enumerable: false
});

})();

(function () {

    PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet = (charaId, animationSetName) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId, true);
            if(char) {
                char.setExternalAnimaX(animationSetName, false)
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_PlayAnimationAction = (actionName, charaId, isLoop, isWait) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) {
                if(!PKD_ANIMAX.KString.any(actionName)) {
                    char.resetXAnima();
                    if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                        PKD_ANIMAX.SendNetworkAnimaXAction(null, false, false);
                    }
                } else {
                    if(char.startAnimaXCustomAction(actionName, isLoop, isWait)) {
                        if(isWait == true && isLoop == false) {
                            PKD_ANIMAX.SetInterpreterToWait(char);
                        }
                    }
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_StopAnimationAction = (charaId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char)
            {
                char.resetXAnima();
                if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                    PKD_ANIMAX.SendNetworkAnimaXAction(null, false, false);
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_AddPart = (charaId, partId, isRelative) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) {
                char.addNewXAnimPart(partId, isRelative);
                if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                    PKD_ANIMAX.SendNetworkChangePart(partId, isRelative, true);
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_RemovePart = (charaId, partId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) {
                char.removeXAnimPart(partId);
                if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                    PKD_ANIMAX.SendNetworkChangePart(partId, false, false);
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_ClearParts = (charaId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) {
                char.clearXAnimParts();
                if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                    PKD_ANIMAX.SendNetworkClearAllParts();
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.GetProperCharacter = (charId, isForceGet = false) => {
        var char = null;
        if(PKD_ANIMAX.IsNetworkGame()) {
            $gameTemp._lastAxNetworkChar = null;
        }
        try {
            if (!charId || charId == 0) {
                char = $gamePlayer;
            } else if (charId == -1) {
                let int = $gameMap._interpreter;
                charId = int.eventId();
                if (charId > 0) {
                    char = $gameMap.event(charId);
                } else {
                    return null;
                }
            } else if (charId < -1) {
                if(PKD_ANIMAX.IsNetworkGame()) {
                    char = null;
                } else {
                    // * Party member
                    var partyMemberIndex = Math.abs(charId) - 2;
                    char = $gamePlayer.followers().follower(partyMemberIndex);
                }
            }
            else {
                char = $gameMap.event(charId);
            }
            if (!char) return null;
            if(!isForceGet) // * If Force mode we can take Char without AnimaX
                if (!char.isAnimX()) return null;
            
            if(PKD_ANIMAX.IsNetworkGame()) {
                if(char == $gamePlayer) {
                    $gameTemp._lastAxNetworkChar = 0;
                } else { // * Иначе событие на карте
                    $gameTemp._lastAxNetworkChar = char.eventId();
                }
            }
            return char;
        } catch (e) {
            console.warn(e, "Can't find character with ID " + charId + " for PlayAnimationAction");
        }
    };

    PKD_ANIMAX.SetInterpreterToWait = (char) => {
        let int = $gameMap._interpreter;
        int.xAnimaTarget = char;
        int._waitMode = 'xAnima';
    };

    PKD_ANIMAX.PluginCommand_PlayIndependentAction = (profileId, actionName, charaId, isLoop, isWait) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId, true);
            if(char) {
                if(PKD_ANIMAX.KString.any(actionName)) {
                    char.setExternalAnimaX(profileId, true)
                    PKD_ANIMAX.PluginCommand_PlayAnimationAction(actionName, charaId, isLoop, isWait);
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

})();

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
PKD_ANIMAX.ActivateDiagonalEventStart = (function(){

    //@[ALIAS]
    var _alias_Game_Player_triggerTouchAction = Game_Player.prototype.triggerTouchAction;
    Game_Player.prototype.triggerTouchAction = function () {
        if(this._diagonalDir) {
            if(this.canStartLocalEvents()) {
                this.checkEventTriggerThere([0, 1, 2]);
                if($gameMap.isEventRunning()) {
                    this._diagonalDir = 0;
                    return true;
                }
            }
            return false;
        } else
            return _alias_Game_Player_triggerTouchAction.call(this);
    };

    //@[ALIAS]
    var _alias_Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
    Game_Player.prototype.checkEventTriggerThere = function (triggers) {
        if(this.canStartLocalEvents() && this._diagonalDir) {
            var horz = ((this._diagonalDir === 1 || this._diagonalDir === 7) ? 4 : 6);
            var vert = ((this._diagonalDir === 1 || this._diagonalDir === 3) ? 2 : 8);
            var x2 = $gameMap.roundXWithDirection(this.x, horz);
            var y2 = $gameMap.roundYWithDirection(this.y, vert);
            this.startMapEvent(x2, y2, triggers, true);
        } else
            return _alias_Game_Player_checkEventTriggerThere.call(this, triggers);
    };

});
// ■ END Game_Player.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

(function(){
    ImageManager._axLoadWepbBitmapMV = function(folder, filename, hue, smooth) {
        if (filename) {
            var path = folder + encodeURIComponent(filename) + '.webp';
            var bitmap = this.loadNormalBitmap(path, hue || 0);
            bitmap.smooth = smooth;
            return bitmap;
        } else {
            return this.loadEmptyBitmap();
        }
    };

    ImageManager._axLoadWepbBitmapMZ = function(folder, filename) {
        if (filename) {
            const url = folder + Utils.encodeURI(filename) + ".webp";
            return this.loadBitmapFromUrl(url);
        } else {
            return this._emptyBitmap;
        }
    };
})();


PKD_ANIMAX.ApplyMZ3DPatch = function() {

	if(!mz3d)return;

    const _mz3d_isImageChanged = mz3d.Character.prototype.isImageChanged;
	mz3d.Character.prototype.isImageChanged = function() {
		if(_mz3d_isImageChanged.apply(this,arguments)) return true;
		if (this._character.mv_sprite && this._character.mv_sprite.isAnimX()) {
			return this._animaXBitmap !== this._character.mv_sprite.bitmap._url;
		}
		return false;
	}

	const _mz3d_updateCharacter = mz3d.Character.prototype.updateCharacter;
	mz3d.Character.prototype.updateCharacter = function() {
		if (this._character.mv_sprite && this._character.mv_sprite.isAnimX()) {
			this._animaXBitmap = this._character.mv_sprite.bitmap._url;
		}
		_mz3d_updateCharacter.apply(this,arguments);
	}

	const _mz3d_setMaterial = mz3d.Character.prototype.setMaterial;
	mz3d.Character.prototype.setMaterial = async function(src){
		if(this._character.mv_sprite && this._character.mv_sprite.isAnimX()){
			if(!this.model.material) await _mz3d_setMaterial.apply(this,arguments);
			let texture;
			if(!this.model.material._animaX_Textures)this.model.material._animaX_Textures={};
			if(this.model.material._animaX_Textures[this._animaXBitmap]){
				texture = this.model.material._animaX_Textures[this._animaXBitmap];
			}else{
				texture = await mz3d.createTexture(this._animaXBitmap);
				this.model.material._animaX_Textures[this._animaXBitmap]=texture;
			}
			await mz3d.waitTextureLoaded(texture);
			this.model.textureLoaded=true;
			texture.hasAlpha=true;
			this.model.texture = texture
			this.model.material.diffuseTexture = texture;
			//await this.model.setMaterial(this._animaXBitmap);
			this.updateScale();
			this.needsMaterialUpdate=true;
		}else{
			await _mz3d_setMaterial.apply(this,arguments);
		}
	}

	mz3d.util.override(XAnimaSet.prototype,'getAnimationByDirection', o=> function(dir){
		return o.call(this,mz3d.transformFacing(dir,mz3d.blendCameraYaw.currentValue(),true));
	});

};

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_ANIMAX.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ANIMAX;
  _.DisableAnimaX = function() {
    var e;
    try {
      return $gameSystem.axSetAnimaXActiveState(false);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.EnableAnimaX = function() {
    var e;
    try {
      return $gameSystem.axSetAnimaXActiveState(true);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.SetAnimaXStateForPlayer = function(state) {
    var e;
    try {
      return $gameSystem.axSetAnimaXActiveStateForCharId(0, state);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.SetAnimaXStateForPartyMember = function(memberIndex, state) {
    var e;
    try {
      return $gameSystem.axSetAnimaXActiveStateForCharId(memberIndex, state);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.ChangePlayerAnimationSet = function(animSetId) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(0, animSetId);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.ResetPlayerAnimationSet = function() {
    var e;
    try {
      return _.ChangePlayerAnimationSet(null);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.ChangeEventAnimationSet = function(eventId, animSetId) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(eventId, animSetId);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.ResetEventAnimationSet = function(eventId) {
    var e;
    try {
      return _.ChangeEventAnimationSet(eventId, null);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.PlayAnimationAction = function(actionName, charaId = 0, isLoop = false, isWait = false) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_PlayAnimationAction(actionName, charaId, isLoop, isWait);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.StopAnimationAction = function(charaId = 0) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_StopAnimationAction(charaId);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.AddLayer = function(charaId, layerName, isRelative = false) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_AddPart(charaId, layerName, isRelative);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.RemoveLayer = function(charaId, layerName) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_RemovePart(charaId, layerName);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.RemoveAllLayers = function(charaId = 0) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_ClearParts(charaId);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.PlayIndependentAction = function(profileName, actionName, charaId = 0, isLoop = false, isWait = false) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_PlayIndependentAction(profileName, actionName, charaId, isLoop, isWait);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.DisableDiagonalMovement = function() {
    var e;
    try {
      return $gameSystem.paxDiagonalIsDisabled = true;
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.EnableDiagonalMovement = function() {
    var e;
    try {
      return $gameSystem.paxDiagonalIsDisabled = null;
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END PKD_ANIMAX.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
PKD_ANIMAX.LoadPluginSettings = function() {
  var a, animList, e, i, len, partsList;
  PKD_ANIMAX.Params = new PKD_ANIMAX.ParamLoader("xAnimations:structA");
  animList = PKD_ANIMAX.Params.getParam("xAnimations", []);
  for (i = 0, len = animList.length; i < len; i++) {
    a = animList[i];
    a.actions = XAnimaTools.convertActionsFromParameters(a.actions);
  }
  PKD_ANIMAX.Animations = animList;
  partsList = PKD_ANIMAX.Params.getParam("xAnimaParts", []);
  PKD_ANIMAX.AnimationParts = partsList;
  if (PKD_ANIMAX.isMV()) {
    PKD_ANIMAX.RegisterPluginCommnads4MV();
  } else {
    PKD_ANIMAX.RegisterPluginCommnads4MZ();
  }
  try {
    if (PKD_ANIMAX.IsUseDiagonalMovement()) {
      PKD_ANIMAX.ActivateDiagonalMovement();
      if (PKD_ANIMAX.IsAllowDiagonalEventsActivation()) {
        PKD_ANIMAX.ActivateDiagonalEventsActivation();
      }
    }
  } catch (error) {
    e = error;
    console.warn('error', e);
  }
};

PKD_ANIMAX.IsUseAltPreload = function() {
  return PKD_ANIMAX.Params.getParam('isUseAltPreload', false);
};

PKD_ANIMAX.IsUseWebp = function() {
  return PKD_ANIMAX.Params.getParam('isUseWebp', false);
};

PKD_ANIMAX.IsWaitSpritesheetLoading = function() {
  return PKD_ANIMAX.Params.getParam('isWaitSpritesheetLoading', false);
};

PKD_ANIMAX.IsUseDiagonalMovement = function() {
  return PKD_ANIMAX.Params.getParam('isUseDiagonalMovement', true);
};

PKD_ANIMAX.DiagonalMovementSpeedKoef = function() {
  return PKD_ANIMAX.Params.getParam('diagonalMovementSpeedKoef', 0.8);
};

PKD_ANIMAX.IsAllowDiagonalEventsActivation = function() {
  return PKD_ANIMAX.Params.getParam('isAllowDiagonalEventsActivation', false);
};

PKD_ANIMAX.IsMapIsInactive = function(mapId) {
  var e, inactiveMapsArray;
  try {
    inactiveMapsArray = PKD_ANIMAX.Params.getParam('inactiveAnimaXMapsList', []);
    return inactiveMapsArray.contains(mapId);
  } catch (error) {
    e = error;
    console.warn(e);
  }
  return false;
};


var PKD_ANIMAX;
(function (PKD_ANIMAX) {
    var KString;
    (function (KString) {
        /**
         * Checks if a string is not null, not undefined, and has a length greater than 0 (after trimming).
         *
         * @param {string} str - The string to check.
         * @returns {boolean} True if the string is not null, not undefined, and has a length greater than 0 (after trimming), otherwise false.
         */
        KString.any = (str) => {
            if (str === null || str === undefined) {
                return false;
            }
            // * For compatibility with old verions of KDCore library
            if (typeof str === "boolean") {
                return str == true;
            }
            try {
                if (typeof str == "string") {
                    return str.length > 0 || str.trim().length > 0;
                }
                else {
                    return str; // ??? just not null or undefined
                }
            }
            catch (error) {
                console.warn(error);
                return false;
            }
        };
    })(KString = PKD_ANIMAX.KString || (PKD_ANIMAX.KString = {}));
})(PKD_ANIMAX || (PKD_ANIMAX = {}));


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageCache.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS___musBeHeld, _;
  if (!PKD_ANIMAX.isMV()) {
    return;
  }
  //@[DEFINES]
  _ = ImageCache.prototype;
  // * AnimaX изображения нельзя удалять при переполнении памяти
  //@[ALIAS]
  ALIAS___musBeHeld = _._mustBeHeld;
  _._mustBeHeld = function(item) {
    if (item.bitmap.url.contains('charactersAA')) {
      return true;
    }
    if (item.bitmap.url.contains('Alpha')) {
      return true;
    }
    return ALIAS___musBeHeld.call(this, item);
  };
})();

// ■ END ImageCache.coffee
//---------------------------------------------------------------------------


var PKD_ANIMAX;
(function (PKD_ANIMAX) {
    var KAudio;
    (function (KAudio) {
        function PlaySE(name, pitch = 100, volume = 100) {
            if (!PKD_ANIMAX.KString.any(name))
                return;
            let audioData = {
                name: name,
                pitch: pitch,
                volume: volume,
                pan: 0,
                pos: 0
            };
            AudioManager.playStaticSe(audioData);
        }
        KAudio.PlaySE = PlaySE;
    })(KAudio = PKD_ANIMAX.KAudio || (PKD_ANIMAX.KAudio = {}));
})(PKD_ANIMAX || (PKD_ANIMAX = {}));


var PKD_ANIMAX;
(function (PKD_ANIMAX) {
    var KGameEvents;
    (function (KGameEvents) {
        // * Return whole line that contains the commentCode
        /**
         * Retrieves a specific comment line from a game event based on the provided comment code.
         *
         * @param commentCode - The code to search for within the comment lines.
         * @param event - The game event from which to retrieve the comment line.
         * @returns The comment line containing the specified code, or `null` if not found.
         *
         * @remarks
         * This function searches through the event's page list to find a comment line that includes the specified comment code.
         * It looks for comment codes 108 and 408, which are typically used for comments in RPG Maker events.
         * If the event or its page list is not available, or if no matching comment line is found, the function returns `null`.
         *
         * @throws Will log a warning to the console if an error occurs during the search process.
         */
        function GetCommentLine(commentCode, event) {
            try {
                if (!event)
                    return null;
                let page = event.page();
                if (!page)
                    return null;
                let list = page.list;
                if (!list)
                    return null;
                for (let i = 0; i < list.length; i++) {
                    if (!list[i])
                        continue;
                    if (list[i].code === 108 || list[i].code === 408) {
                        let line = list[i].parameters[0];
                        if (line && line.includes(commentCode)) {
                            return line;
                        }
                    }
                }
            }
            catch (error) {
                console.warn(error);
            }
            return null;
        }
        KGameEvents.GetCommentLine = GetCommentLine;
    })(KGameEvents = PKD_ANIMAX.KGameEvents || (PKD_ANIMAX.KGameEvents = {}));
})(PKD_ANIMAX || (PKD_ANIMAX = {}));


var PKD_ANIMAX;
(function (PKD_ANIMAX) {
    var KGameItems;
    (function (KGameItems) {
        /**
         * Checks if the given object has a meta property with the specified symbol.
         *
         * @param symbol - The symbol to check for in the meta property.
         * @param obj - The object to check for the meta property.
         * @returns `true` if the object has a meta property with the specified symbol, otherwise `false`.
         * @throws Will log a warning to the console if an error occurs during the check.
         */
        function IsHaveMeta(symbol, obj) {
            try {
                return obj && obj.meta && obj.meta.hasOwnProperty(symbol);
            }
            catch (error) {
                console.warn(error);
            }
            return false;
        }
        KGameItems.IsHaveMeta = IsHaveMeta;
        /**
         * Retrieves the metadata associated with a given symbol from an object.
         *
         * @param symbol - The key for the metadata to retrieve.
         * @param obj - The object containing the metadata.
         * @returns The metadata value associated with the symbol, or null if the symbol is not present or an error occurs.
         */
        function GetMeta(symbol, obj) {
            try {
                if (!IsHaveMeta(symbol, obj))
                    return null;
                return obj.meta[symbol];
            }
            catch (error) {
                console.warn(error);
            }
            return null;
        }
        KGameItems.GetMeta = GetMeta;
    })(KGameItems = PKD_ANIMAX.KGameItems || (PKD_ANIMAX.KGameItems = {}));
})(PKD_ANIMAX || (PKD_ANIMAX = {}));


var PKD_ANIMAX;
(function (PKD_ANIMAX) {
    var KUtils;
    (function (KUtils) {
        function CallWithDelay(callback, delay) {
            if (!callback)
                return;
            return setTimeout(() => {
                try {
                    callback();
                }
                catch (error) {
                    console.warn(error);
                }
            }, delay);
        }
        KUtils.CallWithDelay = CallWithDelay;
    })(KUtils = PKD_ANIMAX.KUtils || (PKD_ANIMAX.KUtils = {}));
})(PKD_ANIMAX || (PKD_ANIMAX = {}));


var PKD_ANIMAX;
(function (PKD_ANIMAX) {
    class ParamLoader {
        /**
         * Creates an instance of ParamLoader.
         * @param _pluginName The name of the plugin.
         */
        constructor(_pluginName) {
            this._pluginName = _pluginName;
            this._ppNameToParseNext = "";
            this._paramsRaw = this.getPluginParametersByRoot(this._pluginName);
            this._params = this.parseParameters(this._paramsRaw);
        }
        /**
         * Gets the plugin parameters by the root name.
         * @param rootName The root name of the plugin.
         * @returns The plugin parameters if found, otherwise calls PluginManager.parameters.
         */
        getPluginParametersByRoot(rootName) {
            /* @ts-ignore */
            let allParametersRaw = PluginManager._parameters;
            for (const property in allParametersRaw) {
                if (allParametersRaw.hasOwnProperty(property)) {
                    const pluginParameters = allParametersRaw[property];
                    if (pluginParameters[rootName]) {
                        return pluginParameters;
                    }
                }
            }
            return PluginManager.parameters(rootName);
        }
        /**
         * Parses the parameters from the plugin.
         * @param paramSet The raw parameter set.
         * @returns The parsed parameters.
         */
        parseParameters(paramSet) {
            const params = {};
            for (const key in paramSet) {
                if (paramSet.hasOwnProperty(key)) {
                    this._ppNameToParseNext = key;
                    const clearKey = this.parseKey(key);
                    const typeKey = this.parseKeyType(key);
                    params[clearKey] = this.parseParamItem(typeKey, paramSet[key]);
                }
            }
            return params;
        }
        /**
         * Parses the key to remove the type.
         * @param keyRaw The raw key.
         * @returns The parsed key.
         */
        parseKey(keyRaw) {
            return keyRaw.split(":")[0];
        }
        /**
         * Parses the key to get the type.
         * @param keyRaw The raw key.
         * @returns The type of the key.
         */
        parseKeyType(keyRaw) {
            return keyRaw.split(":")[1];
        }
        /**
         * Writes a detailed error message to the console.
         */
        writeDetailedError() {
            try {
                if (!PKD_ANIMAX.KString.any(this._ppNameToParseNext))
                    return;
                console.warn(`Please, check Plugin Parameter ${this._ppNameToParseNext} in plugin ${this._pluginName}`);
            }
            catch (e) {
                console.warn(e);
            }
        }
        /**
         * Checks if the parameters are loaded.
         * @returns True if the parameters are loaded, otherwise false.
         */
        isLoaded() {
            return !!this._paramsRaw && this._paramsRaw.hasOwnProperty(this._pluginName);
        }
        /**
         * Checks if a parameter exists.
         * @param paramName The name of the parameter.
         * @returns True if the parameter exists, otherwise false.
         */
        isHasParameter(paramName) {
            return this._params.hasOwnProperty(paramName);
        }
        /**
         * Gets the value of a parameter.
         * @param paramName The name of the parameter.
         * @param def The default value if the parameter is not found.
         * @returns The value of the parameter or the default value.
         */
        getParam(paramName, def) {
            if (this.isHasParameter(paramName)) {
                const value = this._params[paramName];
                if (value != null)
                    return value;
            }
            return def;
        }
        /**
         * Parses a parameter item based on its type.
         * @param type The type of the parameter.
         * @param item The parameter item.
         * @returns The parsed parameter item.
         */
        parseParamItem(type, item) {
            if (!type)
                return item;
            try {
                switch (type) {
                    case "int":
                    case "i":
                        return Number(item);
                    case "intA":
                        return this.parseArray(item, "int");
                    case "bool":
                    case "b":
                    case "e":
                        return eval(item);
                    case "struct":
                    case "s":
                        return this.parseStruct(item);
                    case "structA":
                        return this.parseStructArray(item);
                    case "str":
                        return item;
                    case "strA":
                        return this.parseArray(item, "str");
                    case "note":
                        return this.parseNote(item);
                    case "json":
                    case "j":
                        return this.parseJson(item);
                    case "jA":
                        return this.parseArray(item, "json");
                    default:
                        return item;
                }
            }
            catch (e) {
                console.warn(e);
                this.writeDetailedError();
                return item;
            }
        }
        /**
         * Parses an array of items.
         * @param items The items to parse.
         * @param type The type of the items.
         * @returns The parsed array.
         */
        parseArray(items, type) {
            try {
                const elements = [];
                const parsed = JsonEx.parse(items);
                for (const p of parsed) {
                    try {
                        elements.push(this.parseParamItem(type, p));
                    }
                    catch (e) {
                        console.warn(e);
                    }
                }
                return elements;
            }
            catch (e) {
                console.warn(e);
                this.writeDetailedError();
                return [];
            }
        }
        /**
         * Parses a struct item.
         * @param item The item to parse.
         * @returns The parsed struct.
         */
        parseStruct(item) {
            try {
                if (!item || !PKD_ANIMAX.KString.any(item))
                    return null;
                const parsed = JsonEx.parse(item);
                return parsed ? this.parseParameters(parsed) : null;
            }
            catch (e) {
                console.warn(e);
                this.writeDetailedError();
                return null;
            }
        }
        /**
         * Parses an array of struct items.
         * @param items The items to parse.
         * @returns The parsed array of structs.
         */
        parseStructArray(items) {
            try {
                const elements = [];
                const parsed = JsonEx.parse(items);
                for (const p of parsed) {
                    try {
                        elements.push(this.parseStruct(p));
                    }
                    catch (e) {
                        console.warn(e);
                        this.writeDetailedError();
                    }
                }
                return elements;
            }
            catch (e) {
                console.warn(e);
                this.writeDetailedError();
                return [];
            }
        }
        /**
         * Parses a note item.
         * @param item The item to parse.
         * @returns The parsed note.
         */
        parseNote(item) {
            try {
                const parsed = JsonEx.parse(item);
                return parsed ? parsed : item;
            }
            catch (e) {
                console.warn(e);
                this.writeDetailedError();
                return item;
            }
        }
        /**
         * Parses a JSON item.
         * @param item The item to parse.
         * @returns The parsed JSON.
         */
        parseJson(item) {
            try {
                const json = {};
                const parsed = JsonEx.parse(item);
                const elements = parsed.split('\n');
                for (const element of elements) {
                    const cx = `{${element}}`;
                    try {
                        const item = JsonEx.parse(cx);
                        for (const key in item) {
                            if (item.hasOwnProperty(key)) {
                                json[key] = item[key];
                            }
                        }
                    }
                    catch (e) {
                        console.warn(`Parameter ${element} has syntax errors, ignored`);
                    }
                }
                return json;
            }
            catch (e) {
                console.warn(e);
                this.writeDetailedError();
                return null; // To return default value
            }
        }
    }
    PKD_ANIMAX.ParamLoader = ParamLoader;
})(PKD_ANIMAX || (PKD_ANIMAX = {}));


// Generated by CoffeeScript 2.6.1
PKD_ANIMAX.IsNetworkGame = function() {
  return Imported.Alpha_NETZ === true && ANNetwork.isConnected();
};

// * Некоторые команды плагина не будут автоматически синхронизированы
// * Действует только ОДИН РАЗ (автоснятие флага), надо перед каждой командой ставить
PKD_ANIMAX.SetLocalMode = function() {
  return $gameTemp.netAnimaXLocal = true;
};

PKD_ANIMAX.InLocalMode = function() {
  return $gameTemp.netAnimaXLocal === true;
};

PKD_ANIMAX.ApplyNETZPatch = function() {
  var _alias_nAPI_onCustomCommand3434343;
  PKD_ANIMAX.SendNetworkFlagAnimaXRefresh = function(actorId) {
    var data;
    data = {
      actorId,
      mapId: $gameMap.mapId()
    };
    return nAPI.sendCustomCommand("animaX:refreshXAnima", data);
  };
  PKD_ANIMAX.SendNetworkPlayerExternalAnimaX = function() {
    var data;
    data = {
      actorId: $gameParty.leader().actorId(),
      animaX: $gameSystem.lastPlayerAnimaXExternProfile,
      mapId: $gameMap.mapId()
    };
    return nAPI.sendCustomCommand("animaX:playerExternal", data);
  };
  PKD_ANIMAX.SendNetworkAnimaXAction = function(name, isLoop, isWait) {
    var data;
    data = {
      actorId: $gameParty.leader().actorId(),
      charId: $gameTemp._lastAxNetworkChar,
      mapId: $gameMap.mapId(),
      name: name,
      isLoop,
      isWait
    };
    nAPI.sendCustomCommand("animaX:action", data);
  };
  PKD_ANIMAX.SendNetworkChangePart = function(partId, isRelative, isAdd) {
    var data;
    data = {
      actorId: $gameParty.leader().actorId(),
      charId: $gameTemp._lastAxNetworkChar,
      mapId: $gameMap.mapId(),
      partId,
      isRelative,
      isAdd
    };
    nAPI.sendCustomCommand("animaX:changePart", data);
  };
  PKD_ANIMAX.SendNetworkClearAllParts = function() {
    var data;
    data = {
      actorId: $gameParty.leader().actorId(),
      charId: $gameTemp._lastAxNetworkChar,
      mapId: $gameMap.mapId()
    };
    nAPI.sendCustomCommand("animaX:clearAllParts", data);
  };
  _alias_nAPI_onCustomCommand3434343 = nAPI.onCustomCommand;
  nAPI.onCustomCommand = function(name, data) {
    var actorId, animaX, e, mapId, ref, ref1;
    _alias_nAPI_onCustomCommand3434343.call(this, ...arguments);
    try {
      if (name === "animaX:refreshXAnima") {
        ({actorId, mapId} = data);
        //return unless $gameMap.mapId() == mapId
        // * Через поле, чтобы не было цикла отправки команды
        if ((ref = $gameActors.actor(actorId)) != null) {
          ref._isNeedAnimaXRefresh = true;
        }
      } else if (name === "animaX:playerExternal") {
        ({actorId, animaX, mapId} = data);
        // * Для себя не нужно, так как используется другая gameSystem переменная
        if (actorId === $gameParty.leader().actorId()) {
          return;
        }
        if ($gameSystem.netAnimaXExternelProfiles == null) {
          $gameSystem.netAnimaXExternelProfiles = {};
        }
        $gameSystem.netAnimaXExternelProfiles[actorId] = animaX;
        if ((ref1 = $gameActors.actor(actorId)) != null) {
          ref1._isNeedAnimaXRefresh = true;
        }
      } else if (name === "animaX:action") {
        PKD_ANIMAX.onAnimaXActionFromNetwork(data);
        return;
      } else if (name === "animaX:changePart") {
        PKD_ANIMAX.onAnimaXChangePartFromNetwork(data);
        return;
      } else if (name === "animaX:clearAllParts") {
        PKD_ANIMAX.onAnimaXClearAllPartsFromNetwork(data);
        return;
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  PKD_ANIMAX.onAnimaXActionFromNetwork = function(data) {
    var actorId, char, charId, e, isLoop, isWait, mapId, name;
    try {
      ({actorId, mapId} = data);
      if (actorId === $gameParty.leader().actorId()) {
        return;
      }
      if ($gameMap.mapId() !== mapId) {
        return;
      }
      ({charId, name, isLoop, isWait} = data);
      if (charId === 0) {
        char = $gameMap.networkCharacterByActorId(actorId);
      } else {
        char = $gameMap.event(charId);
      }
      if (char == null) {
        return;
      }
      if (PKD_ANIMAX.KString.any(name)) {
        return char.startAnimaXCustomAction(name, isLoop, isWait);
      } else {
        return char.resetXAnima();
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  PKD_ANIMAX.onAnimaXChangePartFromNetwork = function(data) {
    var actorId, char, charId, e, isAdd, isRelative, mapId, partId;
    try {
      ({actorId, mapId} = data);
      if (actorId === $gameParty.leader().actorId()) {
        return;
      }
      ({charId, partId, isRelative, isAdd} = data);
      if (charId === 0) {
        char = $gameMap.networkCharacterByActorId(actorId);
      } else {
        // * Нельзя брать событие не на той же карте
        if ($gameMap.mapId() !== mapId) {
          return;
        }
        char = $gameMap.event(charId);
      }
      if (char == null) {
        return;
      }
      if (isAdd === true) {
        return char.addNewXAnimPart(partId, isRelative);
      } else {
        return char.removeXAnimPart(partId);
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  PKD_ANIMAX.onAnimaXClearAllPartsFromNetwork = function(data) {
    var actorId, char, charId, e, mapId;
    try {
      ({actorId, mapId} = data);
      if (actorId === $gameParty.leader().actorId()) {
        return;
      }
      ({charId} = data);
      if (charId === 0) {
        char = $gameMap.networkCharacterByActorId(actorId);
      } else {
        // * Нельзя брать событие не на той же карте
        if ($gameMap.mapId() !== mapId) {
          return;
        }
        char = $gameMap.event(charId);
      }
      return char != null ? char.clearXAnimParts() : void 0;
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ NETCharacter.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__refresh, ALIAS__update, _;
    //@[DEFINES]
    _ = NETCharacter.prototype;
    //@[ALIAS]
    ALIAS__refresh = _.refresh;
    _.refresh = function() {
      ALIAS__refresh.call(this);
      return this.refreshAnimaX();
    };
    //@[ALIAS]
    ALIAS__update = _.update;
    _.update = function() {
      ALIAS__update.call(this);
      if (this.isAnimX()) {
        return this._updateAnimX();
      }
    };
    _.getCurrentAnimaXProfile = function() {
      var equipAnimaXSet;
      if (this.isAnimX()) {
        equipAnimaXSet = this._getEquipmentAnimaXSet();
        if (PKD_ANIMAX.KString.any(equipAnimaXSet)) {
          return equipAnimaXSet;
        }
      }
      return this.getInitialXProfile();
    };
    _.getInitialXProfile = function() {
      var actor;
      actor = this.getBattlerForAnimaX();
      if (actor == null) {
        return null;
      }
      if (($gameSystem.netAnimaXExternelProfiles != null) && PKD_ANIMAX.KString.any($gameSystem.netAnimaXExternelProfiles[actor.actorId()])) {
        return $gameSystem.netAnimaXExternelProfiles[actor.actorId()];
      } else {
        return PKD_ANIMAX.KGameItems.GetMeta('xAnima', actor.actor());
      }
    };
    // * Если хост выходит из игры, то на клиенте из-за обновления AnimaX вылетает ошибка
    // * так как данные игрока удаляются, поэтому доп. try catch
    _.getBattlerForAnimaX = function() {
      var actor, e;
      try {
        actor = this.actor();
      } catch (error) {
        e = error;
        console.warn(e);
        actor = $gameParty.leader();
        // * Чтобы не было спама ошибки в консоль (временное решение)
        //TODO: Временное решение
        // * Т.к. если хост выходит игра заканчивается (относительно NETZ 0.7)
        if (this.isAnimX()) {
          this.getBattlerForAnimaX = function() {
            return $gameParty.leader();
          };
        }
      }
      return actor;
    };
    //TODO: Временное решение
    _.isDashingForAnimaX = function() {
      return this._moveSpeed > 4;
    };
  })();
  (function() {    // ■ END NETCharacter.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Actor.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS___fillNetworkObserver, _;
    
    //@[DEFINES]
    _ = Game_Actor.prototype;
    
    //@[ALIAS]
    ALIAS___fillNetworkObserver = _._fillNetworkObserver;
    _._fillNetworkObserver = function() {
      ALIAS___fillNetworkObserver.call(this);
      // * Эти все поля для обновления Visual Equipment
      this.netDataObserver.readField(this, '_isNeedAnimaXRefresh');
      this.netDataObserver.readField(this, 'axLayersByEquips');
      this.netDataObserver.readField(this, 'axLayersByEquipsRelative');
      this.netDataObserver.readField(this, 'axPreviousLayers');
    };
  })();
  return (function() {    // ■ END Game_Actor.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Map.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Game_Map.prototype;
    
    // * Этот метод появился только в NETZ 0.7
    if (_.networkCharacterByActorId == null) {
      _.networkCharacterByActorId = function(actorId) {
        return this.netChars().find(function(c) {
          return c.playerData().actorId === actorId;
        });
      };
    }
  })();
};

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


var AX_LoadingManager;
(function (AX_LoadingManager) {
    const directions4 = ['D', 'L', 'R', 'U'];
    const directions8 = ['D', 'DL', 'DR', 'L', 'R', 'U', 'UL', 'UR'];
    function IsLoadingDone() {
        return _isAnimationsAreReady();
    }
    AX_LoadingManager.IsLoadingDone = IsLoadingDone;
    function _isAnimationsAreReady() {
        /*@ts-ignore*/
        let playerProfileName = $gamePlayer.getInitialXProfile();
        // * Skip for now
        let actionsList = _getAllAnimationActionsFilesList(playerProfileName);
        for (let action of actionsList) {
            /*@ts-ignore*/
            let bitmap = ImageManager.loadAnimaX(action);
            if (!bitmap.isReady()) {
                return false;
            }
        }
        let baseAnimations = _getAllBaseAnimationsForStates(playerProfileName);
        for (let animationName of baseAnimations) {
            /*@ts-ignore*/
            let bitmap = ImageManager.loadAnimaX(animationName);
            if (!bitmap.isReady()) {
                return false;
            }
        }
        return true;
    }
    let _cachedActionsList = {};
    function _getAllAnimationActionsFilesList(animaXProfileName) {
        if (_cachedActionsList[animaXProfileName]) {
            return _cachedActionsList[animaXProfileName];
        }
        let fileslist = [];
        /*@ts-ignore*/
        let allAnimations = PKD_ANIMAX.Animations;
        let animaXProfile = allAnimations.find(a => a.id === animaXProfileName);
        if (!animaXProfile) {
            return fileslist;
        }
        let actions = animaXProfile.actions;
        for (let action of actions) {
            let actionData = action;
            if (actionData.isSpritesheet) {
                fileslist.push(actionData.name);
            }
            else {
                // * Skip for now
                /*if(actionData.is8Way) {
                    for(let dir of directions8) {
                        for(let i = 0; i < actionData.frames; i++) {
                            fileslist.push(actionData.name + '_' + dir + '_' + i);
                        }
                    }
                } else {
                    for(let dir of directions4) {
                        for(let i = 0; i < actionData.frames; i++) {
                            fileslist.push(actionData.name + '_' + dir + '_' + i);
                        }
                    }
                }*/
            }
        }
        fileslist = fileslist.map(f => animaXProfileName + "/Actions/" + f);
        _cachedActionsList[animaXProfileName] = fileslist;
        return fileslist;
    }
    let _cachedBaseAnimations = {};
    function _getAllBaseAnimationsForStates(animaXProfileName) {
        if (_cachedBaseAnimations[animaXProfileName]) {
            return _cachedBaseAnimations[animaXProfileName];
        }
        let fileslist = [];
        /*@ts-ignore*/
        let allAnimations = PKD_ANIMAX.Animations;
        let animaXProfile = allAnimations.find(a => a.id === animaXProfileName);
        if (!animaXProfile) {
            return fileslist;
        }
        let moveState = animaXProfile.base.move;
        moveState.name = "Move";
        let idleState = animaXProfile.base.idle;
        if (idleState) {
            idleState.name = "Idle";
        }
        let dashState = animaXProfile.base.dash;
        if (dashState) {
            dashState.name = "Dashing";
        }
        let states = [moveState, idleState, dashState];
        for (let state of states) {
            if (!state)
                continue;
            let actionData = state;
            if (actionData.isSpritesheet) {
                fileslist.push(actionData.name);
                if (actionData.isSepareteSpritesheet) {
                    fileslist.push(actionData.name + "_DIAG");
                }
            }
            else {
                // * Skip for now
                /*if(actionData.is8Way) {
                    for(let dir of directions8) {
                        for(let i = 0; i < actionData.frames; i++) {
                            fileslist.push(actionData.name + '_' + dir + '_' + i);
                        }
                    }
                } else {
                    for(let dir of directions4) {
                        for(let i = 0; i < actionData.frames; i++) {
                            fileslist.push(actionData.name + '_' + dir + '_' + i);
                        }
                    }
                }*/
            }
        }
        fileslist = fileslist.map(f => animaXProfileName + "/" + f);
        _cachedBaseAnimations[animaXProfileName] = fileslist;
        return fileslist;
    }
})(AX_LoadingManager || (AX_LoadingManager = {}));


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDatabase, _;
  //@[DEFINES]
  _ = DataManager;
  //@[ALIAS]
  ALIAS__loadDatabase = _.loadDatabase;
  _.loadDatabase = function() {
    PKD_ANIMAX.LoadPluginSettings();
    PKD_ANIMAX.ApplyExtensions();
    PKD_ANIMAX.PreloadAllImages();
    return ALIAS__loadDatabase.call(this);
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DiagonalMovement
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
PKD_ANIMAX.ActivateDiagonalMovement = function() {
  var get4Dir, get8Dir;
  get8Dir = function(d) {
    switch (d) {
      case 1:
        return [4, 2];
      case 3:
        return [6, 2];
      case 7:
        return [4, 8];
      case 9:
        return [6, 8];
      default:
        return [0, 0];
    }
  };
  get4Dir = function(horz, vert) {
    if (horz === 4 && vert === 2) {
      return 1;
    }
    if (horz === 6 && vert === 2) {
      return 3;
    }
    if (horz === 4 && vert === 8) {
      return 7;
    }
    if (horz === 6 && vert === 8) {
      return 9;
    }
    return 0;
  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_CharacterBase.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__moveStraight, ALIAS__realMoveSpeed, ALIAS__setDirection, _;
    
    //@[DEFINES]
    _ = Game_CharacterBase.prototype;
    
    //@[ALIAS]
    ALIAS__moveStraight = _.moveStraight;
    _.moveStraight = function(d) {
      this._diagonalDir = false;
      return ALIAS__moveStraight.call(this, d);
    };
    
    //@[ALIAS]
    ALIAS__setDirection = _.setDirection;
    _.setDirection = function(d) {
      if (this._diagStraigten === true) {
        this._diagonalDir = false;
      }
      return ALIAS__setDirection.call(this, d);
    };
    
    //@[ALIAS]
    ALIAS__realMoveSpeed = _.realMoveSpeed;
    _.realMoveSpeed = function() {
      var speed;
      speed = ALIAS__realMoveSpeed.call(this);
      if (this._diagonalDir) {
        return speed * PKD_ANIMAX.DiagonalMovementSpeedKoef();
      } else {
        return speed;
      }
    };
    _.moveDiagonally = function(horz, vert) {
      var diag, norm;
      diag = this.canPassDiagonally(this._x, this._y, horz, vert);
      norm = this.canPass(this._x, this._y, horz) || this.canPass(this._x, this._y, vert);
      if (diag) {
        this._diagonalDir = get4Dir(horz, vert);
        this._x = $gameMap.roundXWithDirection(this._x, horz);
        this._y = $gameMap.roundYWithDirection(this._y, vert);
        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz));
        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert));
        this.increaseSteps();
      } else if (norm) {
        this._diagonalDir = false;
        this.moveStraight(this.getOtherDirection(horz, vert));
      }
      this._diagStraigten = false;
      if (this._direction === this.reverseDir(horz)) {
        this.setDirection(horz);
      }
      if (this._direction === this.reverseDir(vert)) {
        this.setDirection(vert);
      }
      this._diagStraigten = true;
    };
    _.getOtherDirection = function(horz, vert) {
      if (this.canPass(this._x, this._y, horz)) {
        return horz;
      } else {
        return vert;
      }
    };
  })();
  (function() {    // ■ END Game_CharacterBase.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Player.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__executeMove, _;
    
    //@[DEFINES]
    _ = Game_Player.prototype;
    
    //$[OVER]
    _.canPassDiagonally = function(x, y, horz, vert) {
      var x2, y2;
      x2 = $gameMap.roundXWithDirection(x, horz);
      y2 = $gameMap.roundYWithDirection(y, vert);
      if (this.canPass(x, y, vert) && this.canPass(x, y2, horz) && this.canPass(x, y, horz) && this.canPass(x2, y, vert)) {
        return true;
      }
      return false;
    };
    
    //$[OVER]
    _.getInputDirection = function() {
      return Input.dir8;
    };
    
    //@[ALIAS]
    ALIAS__executeMove = _.executeMove;
    _.executeMove = function(direction) {
      var horz, vert;
      if (direction % 2 === 0) {
        return ALIAS__executeMove.call(this, direction);
      } else if (Math.abs(direction % 2) === 1) {
        [horz, vert] = get8Dir(direction);
        return this.moveDiagonally(horz, vert);
      }
    };
  })();
  (function() {    // ■ END Game_Player.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Player.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__findDirectionTo, _;
    
    //@[DEFINES]
    _ = Game_Player.prototype;
    ALIAS__findDirectionTo = _.findDirectionTo;
    _.findDirectionTo = function(goalX, goalY) {
      if ($gameSystem.paxDiagonalIsDisabled === true) {
        return ALIAS__findDirectionTo.call(this, goalX, goalY);
      } else {
        return this._findDirectionToDiagonal(goalX, goalY);
      }
    };
    _._findDirectionToDiagonal = function(goalX, goalY) {
      var best, bestIndex, closedList, current, deltaX1, deltaX2, deltaY1, deltaY2, diag, direction, g1, g2, goaled, horz, i, index2, j, mapWidth, neighbor, node, nodeList, openList, pos1, pos2, searchLimit, start, vert, x1, x2, y1, y2;
      searchLimit = 16;
      mapWidth = $gameMap.width();
      nodeList = [];
      openList = [];
      closedList = [];
      start = {};
      best = start;
      if (this.x === goalX && this.y === goalY) {
        return 0;
      }
      start.parent = null;
      start.x = this.x;
      start.y = this.y;
      start.g = 0;
      start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
      nodeList.push(start);
      openList.push(start.y * mapWidth + start.x);
      while (nodeList.length > 0) {
        bestIndex = 0;
        i = 0;
        while (i < nodeList.length) {
          if (nodeList[i].f < nodeList[bestIndex].f) {
            bestIndex = i;
          }
          i++;
        }
        current = nodeList[bestIndex];
        x1 = current.x;
        y1 = current.y;
        pos1 = y1 * mapWidth + x1;
        g1 = current.g;
        nodeList.splice(bestIndex, 1);
        openList.splice(openList.indexOf(pos1), 1);
        closedList.push(pos1);
        if (current.x === goalX && current.y === goalY) {
          best = current;
          goaled = true;
          break;
        }
        if (g1 >= searchLimit) {
          continue;
        }
        j = 0;
        while (j < 9) {
          direction = 1 + j;
          if (direction === 5) {
            j++;
            continue;
          }
          diag = Math.abs(direction % 2) === 1;
          [horz, vert] = get8Dir(direction);
          if (diag && this.canPassDiagonally(x1, y1, horz, vert) && (this.canPass(x1, y1, horz) || this.canPass(x1, y1, vert))) {
            x2 = $gameMap.roundXWithDirection(x1, horz);
            y2 = $gameMap.roundYWithDirection(y1, vert);
          } else if (this.canPass(x1, y1, direction)) {
            x2 = $gameMap.roundXWithDirection(x1, direction);
            y2 = $gameMap.roundYWithDirection(y1, direction);
          } else {
            j++;
            continue;
          }
          pos2 = y2 * mapWidth + x2;
          if (closedList.contains(pos2)) {
            j++;
            continue;
          }
          g2 = g1 + 1;
          index2 = openList.indexOf(pos2);
          if (index2 < 0 || g2 < nodeList[index2].g) {
            if (index2 >= 0) {
              neighbor = nodeList[index2];
            } else {
              neighbor = {};
              nodeList.push(neighbor);
              openList.push(pos2);
            }
            neighbor.parent = current;
            neighbor.x = x2;
            neighbor.y = y2;
            neighbor.g = g2;
            neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
            if (!best || neighbor.f - neighbor.g < best.f - best.g) {
              best = neighbor;
            }
          }
          j++;
        }
      }
      node = best;
      while (node.parent && node.parent !== start) {
        node = node.parent;
      }
      deltaX1 = $gameMap.deltaX(node.x, start.x);
      deltaY1 = $gameMap.deltaY(node.y, start.y);
      if (deltaY1 > 0 && deltaX1 > 0) {
        return 3;
      } else if (deltaY1 > 0 && deltaX1 < 0) {
        return 1;
      } else if (deltaY1 < 0 && deltaX1 < 0) {
        return 7;
      } else if (deltaY1 < 0 && deltaX1 > 0) {
        return 9;
      }
      if (deltaY1 > 0) {
        return 2;
      } else if (deltaX1 < 0) {
        return 4;
      } else if (deltaX1 > 0) {
        return 6;
      } else if (deltaY1 < 0) {
        return 8;
      }
      deltaX2 = this.deltaXFrom(goalX);
      deltaY2 = this.deltaYFrom(goalY);
      if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
        if (deltaX2 > 0) {
          return 4;
        } else {
          return 6;
        }
      } else if (deltaY2 !== 0) {
        if (deltaY2 > 0) {
          return 8;
        } else {
          return 2;
        }
      }
      return 0;
    };
  })();
  (function() {    // ■ END Game_Player.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Follower.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Game_Follower.prototype;
    
    //$[OVER]
    _.realMoveSpeed = function() {
      return $gamePlayer.realMoveSpeed();
    };
  })();
};

// ■ END DiagonalMovement
//---------------------------------------------------------------------------
// ■ END Game_Follower.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__refresh, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    this.axLayersByEquips = [];
    this.axLayersByEquipsRelative = [];
    // * Слои которые надо снять, после обновления экипировки
    this.axPreviousLayers = [];
  };
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    this.refreshAnimaXLayers();
    this.requestRefreshAnimaX();
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  _.requestRefreshAnimaX = function() {
    return this._isNeedAnimaXRefresh = true;
  };
  _.isNeedAnimaXRefresh = function() {
    return this._isNeedAnimaXRefresh === true;
  };
  _.onAnimaXRefresh = function() {
    return this._isNeedAnimaXRefresh = null;
  };
  _.getAnimaXEquipmentSet = function() {
    var e, equipSet, i, len, ref;
    ref = this.equips();
    for (i = 0, len = ref.length; i < len; i++) {
      e = ref[i];
      if (e == null) {
        continue;
      }
      equipSet = PKD_ANIMAX.KGameItems.GetMeta('xAnimaSet', e);
      if (PKD_ANIMAX.KString.any(equipSet)) {
        return equipSet;
      }
    }
    return null;
  };
  // * Чтобы не удалялись части, которые добавленны параметром плагина
  // * используется массив axPreviousLayers, в котором храняться части
  // * которые были в прошлый раз, но в этот их уже нету - т.е. их надо удалить
  _.refreshAnimaXLayers = function() {
    var e, equipLayer, i, len, ref;
    this.axPreviousLayers = [...this.axLayersByEquips, ...this.axLayersByEquipsRelative];
    this.axLayersByEquips = [];
    this.axLayersByEquipsRelative = [];
    ref = this.equips();
    for (i = 0, len = ref.length; i < len; i++) {
      e = ref[i];
      if (e == null) {
        continue;
      }
      equipLayer = PKD_ANIMAX.KGameItems.GetMeta('xAnimaLayer', e);
      this._registerLayerByEquip(equipLayer, false);
      equipLayer = PKD_ANIMAX.KGameItems.GetMeta('xAnimaLayerRelative', e);
      this._registerLayerByEquip(equipLayer, true);
    }
  };
  _._registerLayerByEquip = function(name, isRelative) {
    if (!PKD_ANIMAX.KString.any(name)) {
      return;
    }
    this.axPreviousLayers.delete(name);
    if (isRelative === true) {
      this.axLayersByEquipsRelative.push(name);
    } else {
      this.axLayersByEquips.push(name);
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  (function() {    // * Система анимации XAnima и ABS
    // -----------------------------------------------------------------------
    // * Предзагрузить действие
    _.preloadAnimaXAction = function(actionParams, isWaiting) {
      var animaSet;
      if (actionParams == null) {
        return;
      }
      animaSet = this.createAnimaXActionSet(actionParams);
      if (animaSet != null) {
        animaSet.preLoad();
      }
      this._axPreloadedActions[actionParams.name] = animaSet;
    };
    // * Создать AnimaXSet из параметров плагина анимации
    _.createAnimaXActionSet = function(actionParams) {
      var animaSet, name;
      name = actionParams.name;
      animaSet = XAnimaTools.createXAnimaSetForAction(this.animXId(), actionParams);
      animaSet.preLoad();
      return animaSet;
    };
    _.isAnimaXActionIsPreloaded = function(actionName) {
      return this.getPreloadAnimaXActionSet(actionName) != null;
    };
    _.getPreloadAnimaXActionSet = function(actionName) {
      return this._axPreloadedActions[actionName];
    };
    _.refreshAnimaX = function() {
      var animaXProfile;
      animaXProfile = this.getCurrentAnimaXProfile();
      if ((this._currentAnimaXProfile != null) && (animaXProfile == null)) {
        this._currentAnimaXProfile = null;
        if (this.isAnimX()) {
          this.clearAnimaX();
        }
        return;
      }
      if (this._currentAnimaXProfile === animaXProfile) {

      } else {
        this.createNewAnimaXForCharacter(animaXProfile);
      }
    };
    _.createNewAnimaXForCharacter = function(animaXProfile) {
      var animaX;
      animaX = XAnimaTools.getXAnimaParamsForState('base', animaXProfile);
      if (animaX == null) {
        if (PKD_ANIMAX.KString.any(animaXProfile)) {
          console.warn("Can't find Base animation settings for " + animaXProfile);
        }
        return;
      }
      this._currentAnimaXProfile = animaXProfile;
      this.initAnimaX(animaXProfile, animaX);
      this.registerAnimaXActions(animaXProfile);
      this.refreshAnimaXLayers();
    };
    // * Получить профиль анимации (для загрузки)
    _.getCurrentAnimaXProfile = function() {
      return null;
    };
    // * Получить начальный профиль персонажа (без экипировки)
    _.getInitialXProfile = function() {
      return null;
    };
    // * Регистрация действий (названий) и предзагрузка
    _.registerAnimaXActions = function(animaXProfile) {
      var action, actionList, i, len;
      actionList = XAnimaTools.getXAnimaActionList(animaXProfile);
      for (i = 0, len = actionList.length; i < len; i++) {
        action = actionList[i];
        this.registerAnimaXAction(action.name);
        if (this.isAnimaXAADefaultAction(action.name)) {
          this.preloadAnimaXAction(action);
        }
      }
    };
    // * Набор имён стандартных действий (нужны для предзагрузки)
    _.isAnimaXAADefaultAction = function(actionName) {
      return false;
    };
    // * Проверка обновления состояния анимации на Battler
    _._updateAnimXRefresh = function() {
      var b;
      b = this.getBattlerForAnimaX();
      if (b == null) {
        return;
      }
      if (b.isNeedAnimaXRefresh()) {
        this.refreshAnimaX();
        this.refreshAnimaXLayers();
        b.onAnimaXRefresh();
      }
    };
    _.getBattlerForAnimaX = function() {
      return null;
    };
    // * Получить набор экипировки для Анимации
    _._getEquipmentAnimaXSet = function() {
      var b, equipmentXSet, initialProfile;
      initialProfile = this.getInitialXProfile();
      if (initialProfile == null) {
        return null;
      }
      b = this.getBattlerForAnimaX();
      if (b == null) {
        return null;
      }
      equipmentXSet = b.getAnimaXEquipmentSet();
      if (equipmentXSet != null) {
        return this.getInitialXProfile() + "_" + equipmentXSet;
      }
      return null;
    };
    // * Обновить слои с учётом экипировки
    return _.refreshAnimaXLayers = function() {
      var actor, e, i, j, k, l, len, len1, len2, ref, ref1, ref2;
      if (!this.isAnimX()) {
        return;
      }
      actor = this.getBattlerForAnimaX();
      if (actor == null) {
        return;
      }
      try {
        ref = actor.axLayersByEquips;
        for (i = 0, len = ref.length; i < len; i++) {
          l = ref[i];
          this.addNewXAnimPart(l, false);
        }
        ref1 = actor.axLayersByEquipsRelative;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          l = ref1[j];
          this.addNewXAnimPart(l, true);
        }
        ref2 = actor.axPreviousLayers;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          l = ref2[k];
          this.removeXAnimPart(l);
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
    };
  })();
  (function() {    // * Действия
    // -----------------------------------------------------------------------
    _.startAnimaXAA_Attack = function() {
      return this.startAnimaXCustomAction('Attack', false, true);
    };
    return _.startAnimaXAA_Defense = function() {
      return this.startAnimaXCustomAction('Defense', true, false);
    };
  })();
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//$[ENCODE]
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  (function() {    // * Система анимации XAnima
    // -----------------------------------------------------------------------
    
    //@[FROM Game_CharacterBase]

    // * Персонаж использует XAnima
    _.isAnimX = function() {
      return this._isHaveAnimaX === true;
    };
    // * ID набора анимаций (по нему определяется имя папки)
    _.animXId = function() {
      return this._axId;
    };
    _.forceClearAnimaX = function() {
      var e;
      try {
        return this.refreshAnimaX();
      } catch (error) {
        e = error;
        return console.warn(e);
      }
    };
    // * Есть ли Idle анимация у текущего состояния
    _.isHaveIdleAnimaX = function() {
      return this._axIdle() != null;
    };
    // * Есть ли Dashing (бег) анимация у текущего состояния
    _.isHaveDashAnimaX = function() {
      return this._axDashing() != null;
    };
    // * Есть ли анимация для состояния
    _.isHaveAnimaXState = function(state) {
      return this._axStates[state] != null;
    };
    // * Находится ли анимация в действии
    _.isInAnimXAction = function() {
      return this.isAnimX() && this.getCurrentAnimX().isAction();
    };
    // * Находится ли анимация в движении (имеется в виду moveSet)
    // * Также Dashing тоже является анимацией движения
    _.isInMovementAnimaX = function() {
      return this._axCurrent === this._axMovement();
    };
    _.isInAnyMovementAnimaX = function() {
      return this.isInMovementAnimaX() || this.isInDashingAnimaX();
    };
    // * Находится ли анимация текущая в состоянии Idle
    _.isInIdleAnimaX = function() {
      return this._axCurrent === this._axIdle();
    };
    // * Находится ли анимация текущая в состоянии Dashing (Бег)
    _.isInDashingAnimaX = function() {
      return this._axCurrent === this._axDashing();
    };
    // * Когда запускается действие
    _.onAnimaXActionStart = function() {
      return this._xAnimaToIdleTimer = 0; // * Сбро таймера перехода в Idle
    };
    
    // * Когда действие заканчивается
    _.onAnimaXActionEnd = function() {
      var e;
      try {
        return this._processAnimaActionEndBehav();
      } catch (error) {
        e = error;
        return console.warn(e);
      }
    };
    _._processAnimaActionEndBehav = function() {
      var actionName, behav, e, scOnEnd, seOnEnd;
      try {
        if (this._axCurrent == null) {
          return;
        }
        ({actionName, behav} = this._axCurrent);
        if (behav == null) {
          return;
        }
        ({seOnEnd, scOnEnd} = behav);
        if (PKD_ANIMAX.KString.any(seOnEnd)) {
          PKD_ANIMAX.KAudio.PlaySE(seOnEnd);
        }
        try {
          if (PKD_ANIMAX.KString.any(scOnEnd)) {
            return eval(scOnEnd);
          }
        } catch (error) {
          e = error;
          return console.warn(e);
        }
      } catch (error) {
        e = error;
        return console.warn(e);
      }
    };
    // * Должен ли ждать завершения действия
    _.isShouldWaitAnimaXAction = function() {
      var anima;
      if (this.isInAnyMovementAnimaX()) {
        return false;
      }
      if (!this.isInAnimXAction()) {
        // * Если не в действии, то нет (т.к. нет действия)
        return false;
      }
      anima = this.getCurrentAnimX();
      // * Idle тоже считается действием! Поэтому доп. проверка isAction
      return anima.isAction() && anima.isWait();
    };
    // * Есть ли данное действие у текущей XAnima конфигурации
    _.isHaveAnimaXActionWithName = function(name) {
      return this._axAvailableActionsList.contains(name);
    };
    // -----------------------------------------------------------------------

    // * Текущий XAnimaSet
    _.getCurrentAnimX = function() {
      return this._axCurrent;
    };
    // * Запустить действие
    _.startAnimaXAction = function(animX) {
      var e;
      try {
        this._axCurrent = animX;
        return this._processAnimaActionStartBehav(animX.actionName, animX.behav);
      } catch (error) {
        e = error;
        console.warn(e);
        return this.resetXAnimaState();
      }
    };
    _._processAnimaActionStartBehav = function() {
      var actionName, behav, e, scDelay, scOnStart, seDelay, seOnStart;
      try {
        if (this._axCurrent == null) {
          return;
        }
        ({actionName, behav} = this._axCurrent);
        if (behav == null) {
          return;
        }
        ({seOnStart, seDelay, scOnStart, scDelay} = behav);
        try {
          if (PKD_ANIMAX.KString.any(seOnStart)) {
            if ((seDelay != null) && seDelay > 0) {
              PKD_ANIMAX.KUtils.CallWithDelay(function() {
                return PKD_ANIMAX.KAudio.PlaySE(seOnStart);
              }, seDelay * 16);
            } else {
              PKD_ANIMAX.KAudio.PlaySE(seOnStart);
            }
          }
        } catch (error) {
          e = error;
          console.warn(e);
        }
        try {
          if (PKD_ANIMAX.KString.any(scOnStart)) {
            if ((scDelay != null) && scDelay > 0) {
              return PKD_ANIMAX.KUtils.CallWithDelay(function() {
                return eval(scOnStart);
              }, scDelay * 16);
            } else {
              return eval(scOnStart);
            }
          }
        } catch (error) {
          e = error;
          return console.warn(e);
        }
      } catch (error) {
        e = error;
        return console.warn(e);
      }
    };
    
    // * Переключить состояние анимации (обычное, бой, и т.д.)
    _.switchToXAnimaState = function(state) {
      if (this.isHaveAnimaXState(state)) {
        this._axState = state;
        if (!this.isInAnimXAction()) {
          this.resetXAnima();
        }
      } else {
        //console.warn 'AnimaX Set for ' + state + ' not registed'
        this.resetXAnimaState();
      }
    };
    // * Инициализация
    // * Base состояние - стандартное, инициализируется всегда
    // * Если нет Base или нет movement, то не акитвируется система
    _.initAnimaX = function(_axId, data) {
      this._axId = _axId;
      this._axIsDestroyed = false;
      this.clearXAnimParts();
      this._axAvailableActionsList = [];
      this._axPreloadedActions = {};
      this._axStates = {};
      this._axState = 'base'; // * Базовое состояние
      this.registerAnimaXState(this._axState, data);
      if (this._axStates[this._axState] == null) {
        return;
      }
      this.resetXAnima();
      this._isHaveAnimaX = true;
      this.getCurrentAnimX().preLoad();
    };
    _.deleteAnimaX = function() {
      var e;
      try {
        if (!this.isAnimX()) {
          return;
        }
        this.clearXAnimParts();
        this._axAvailableActionsList = [];
        this._axPreloadedActions = {};
        this._axStates = {};
        this._isHaveAnimaX = false;
        this._currentAnimaXProfile = null;
        this._axIsDestroyed = true;
        return this.__lastEventAnimaXExternProfile = null;
      } catch (error) {
        e = error;
        return console.warn(e);
      }
    };
    // * Добавить анимацию для состояния
    _.registerAnimaXState = function(state, data) {
      var dashSet, e, idleSet, moveSet;
      try {
        if (data == null) {
          return;
        }
        moveSet = this._createAnimaXSetFromParams(0, state, data.move);
        // * moveSet обязателен!
        if (moveSet == null) {
          return;
        }
        moveSet.preLoad();
        // * idleSet и dashSet - опционально
        idleSet = null;
        dashSet = null;
        idleSet = this._createAnimaXSetFromParams(1, state, data.idle);
        if (idleSet != null) {
          idleSet.preLoad();
        }
        if ((idleSet != null) && (data.moveToIdleDelay != null)) {
          idleSet.moveToIdleDelay = data.moveToIdleDelay;
        }
        dashSet = this._createAnimaXSetFromParams(3, state, data.dash);
        if (dashSet != null) {
          dashSet.preLoad();
        }
        this._createXAnimaSetsForState(state, moveSet, idleSet, dashSet);
      } catch (error) {
        e = error;
        console.warn(e);
        this._axStates[state] = null;
      }
    };
    // * Сбросить состояние до базового
    _.resetXAnimaState = function() {
      this._axState = 'base';
      if (!this.isInAnimXAction()) {
        this.resetXAnima();
      }
    };
    // * Сбросить анимацию
    _.resetXAnima = function() {
      if (this.isInAnimXAction()) {
        this.onAnimaXActionEnd();
        if (this.__axShouldResetAnimaXAfterAction === true) {
          this.deleteAnimaX();
          this.__axShouldReloadBitmaps = true;
          this.__axShouldResetAnimaXAfterAction = null;
          return;
        }
      }
      this._xAnimaToIdleTimer = 0;
      this._setAnimaXToMovement();
    };
    // * Добавить действие (зарегестрировать, чтобы не было ошибок если вызвано, а нету файлов)
    _.registerAnimaXAction = function(actionName) {
      return this._axAvailableActionsList.push(actionName);
    };
    // -----------------------------------------------------------------------
    _._initMembersAnimaX = function() {
      this._xAnimaPartsRequireRefresh = false;
      this._xAnimaToIdleTimer = 0;
      return this._isHaveAnimaX = false;
    };
    _._createXAnimaSetsForState = function(state, moveSet, idleSet, dashSet) {
      this._axStates[state] = {};
      moveSet.preLoad();
      this._axStates[state].moveSet = moveSet;
      if (idleSet != null) {
        idleSet.isLoop = true;
        idleSet.preLoad();
        this._axStates[state].idleSet = idleSet;
      } else {
        this._axStates[state].idleSet = null;
      }
      // * Dashing был введён с обновлением 1.1, является опциональным как и Idle
      if (dashSet != null) {
        this._axStates[state].dashSet = dashSet;
        dashSet.preLoad();
      } else {
        this._axStates[state].dashSet = null;
      }
    };
    _._createAnimaXSetFromParams = function(type, state, data) {
      var axSet, e;
      axSet = null;
      try {
        if (type === 0) {
          if (data != null) {
            axSet = XAnimaTools.createXAnimaSetForMove(this.animXId(), state, data);
          } else if (this.__axShouldResetAnimaXAfterAction === true) {
            axSet = XAnimaTools.createXAnimaSetForIndependentAction();
          }
        } else if (type === 1) { // * IDLE
          if (data != null) {
            axSet = XAnimaTools.createXAnimaSetForIdle(this.animXId(), state, data);
          }
        } else if (type === 3) { // * DASHING
          if (data != null) {
            axSet = XAnimaTools.createXAnimaSetForDashing(this.animXId(), state, data);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
        axSet = null;
      }
      return axSet;
    };
    _._updateAnimX = function() {
      this._updateAnimXRefresh();
      if (this.isShouldWaitAnimaXAction()) {
        return;
      }
      this._updateMovingAnimX();
      if (!this._axIsDestroyed && this.isHaveIdleAnimaX() && this.isInAnyMovementAnimaX()) {
        return this._updateMoveIdleAnimaX();
      }
    };
    _._updateMovingAnimX = function() {
      if (!this.isMoving()) {
        return;
      }
      if (this.isHaveDashAnimaX()) {
        this._updateMovingDashingAnimX();
      }
      this._xAnimaToIdleTimer = 0;
      if (!this.isInAnyMovementAnimaX()) {
        return this.resetXAnima();
      }
    };
    _._updateMovingDashingAnimX = function() {
      if (this.isDashingForAnimaX()) {
        if (!this.isInDashingAnimaX()) {
          this._setAnimaXToDashing();
        }
      } else if (this.isInDashingAnimaX()) {
        this._setAnimaXToMovement();
      }
    };
    _._updateMoveIdleAnimaX = function() {
      if (!this.isMoving()) {
        this._xAnimaToIdleTimer++;
        if (this._xAnimaToIdleTimer >= this._getAnimaXMoveToIdleDelay()) {
          return this._setAnimaXToIdle();
        }
      }
    };
    _._getAnimaXMoveToIdleDelay = function() {
      return this._axIdle().moveToIdleDelay;
    };
    _._axMovement = function() {
      var e;
      try {
        if ((this._axStates != null) && (this._axStates[this._axState] != null)) {
          return this._axStates[this._axState].moveSet;
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    };
    _._axIdle = function() {
      var e;
      try {
        if ((this._axStates != null) && (this._axStates[this._axState] != null)) {
          return this._axStates[this._axState].idleSet;
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    };
    _._axDashing = function() {
      var e;
      try {
        if ((this._axStates != null) && (this._axStates[this._axState] != null)) {
          return this._axStates[this._axState].dashSet;
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    };
    _._setAnimaXToIdle = function() {
      return this._axCurrent = this._axIdle();
    };
    _._setAnimaXToMovement = function() {
      return this._axCurrent = this._axMovement();
    };
    _._setAnimaXToDashing = function() {
      return this._axCurrent = this._axDashing();
    };
    _.clearAnimaX = function() {
      this.resetXAnima();
      this._isHaveAnimaX = false;
      this.initAnimaX(null, null);
    };
    // PARTS (LAYERS)
    // ----------------------------------------------------------------------
    _.isAnimXPartsChanged = function() {
      return this._xAnimaPartsRequireRefresh === true;
    };
    _.onAnimXPartsRefreshed = function() {
      return this._xAnimaPartsRequireRefresh = false;
    };
    _.addNewXAnimPart = function(partId, isRelative = false) {
      var partSet;
      if (this.animaXParts[partId] != null) {
        return;
      }
      partSet = XAnimaTools.createXAnimaPart(this.animXId(), partId, isRelative);
      if (partSet == null) {
        return;
      }
      this.animaXParts[partId] = partSet;
      this._xAnimaPartsRequireRefresh = true;
    };
    _.removeXAnimPart = function(partId) {
      this.animaXParts[partId] = null;
      delete this.animaXParts[partId];
      this._xAnimaPartsRequireRefresh = true;
    };
    _.clearXAnimParts = function() {
      this.animaXParts = {};
      this._xAnimaPartsRequireRefresh = true;
    };
    // -----------------------------------------------------------------------

    // * Запустить кастомное действие с параметрами (проверка предзагруженных)
    _.startAnimaXCustomAction = function(name, isLoop = false, isWait = false) {
      var actionParams, animaX;
      if (!this.isHaveAnimaXActionWithName(name)) {
        return false;
      }
      if (this.isAnimaXActionIsPreloaded(name)) {
        animaX = this.getPreloadAnimaXActionSet(name);
      } else {
        actionParams = XAnimaTools.getXAnimaParamsForAction(name, this.animXId());
        animaX = this.createAnimaXActionSet(actionParams);
      }
      if (animaX != null) {
        animaX.waitActionEnd = isWait;
        animaX.isLoop = isLoop;
        this.startAnimaXAction(animaX);
        if (PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
          PKD_ANIMAX.SendNetworkAnimaXAction(name, isLoop, isWait);
        }
        $gameTemp.netAnimaXLocal = null;
        return true;
      }
      return false;
    };
  })();
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  (function() {    // * Система анимации XAnima
    // -----------------------------------------------------------------------
    
    // * Персонаж использует XAnima
    _.isAnimX = function() {
      return false;
    };
    // * ID набора анимаций
    _.animXId = function() {
      return null;
    };
    // * Когда запускается действие
    _.onAnimaXActionStart = function() {};
    // * Когда действие заканчивается
    _.onAnimaXActionEnd = function() {};
    
    // * Находится ли анимация в действии
    _.isInAnimXAction = function() {
      return false;
    };
    // * Находится ли анимация в действии и необходимо ждать завершения
    _.isAnimXIsBusy = function() {
      return this.isAnimX() && this.isInAnimXAction() && this.isShouldWaitAnimaXAction();
    };
    // * Находится ли анимация в движении (имеется в виду moveSet)
    _.isInMovementAnimaX = function() {
      return false;
    };
    // * Надо ли применять анимацию бега на персонаже
    _.isDashingForAnimaX = function() {
      return false;
    };
    // * Находился ли персонаж в какой-либо анимации движения (или бег)
    _.isInAnyMovementAnimaX = function() {
      return false;
    };
    // * Находится ли анимация в Idle
    _.isInIdleAnimaX = function() {
      return false;
    };
    // * Находится ли анимация текущая в состоянии Dashing (Бег)
    _.isInDashingAnimaX = function() {
      return false;
    };
    // * Есть ли Idle анимация у текущего состояния
    _.isHaveIdleAnimaX = function() {
      return false;
    };
    // * Есть ли анимация для состояния
    _.isHaveAnimaXState = function() {
      return false;
    };
    // * Есть ли Dashing (бег) анимация у текущего состояния
    _.isHaveDashAnimaX = function() {
      return false;
    };
    // * Есть ли данное действие у текущей XAnima конфигурации
    _.isHaveAnimaXActionWithName = function() {
      return false;
    };
    // * Должен ли ждать завершения действия
    _.isShouldWaitAnimaXAction = function() {
      return false;
    };
    // * Отключить анимацию
    _.clearAnimaX = function() {};
    // * Действие является стандартным (используется для предзагрузки)
    _.isAnimaXAADefaultAction = function(actionName) {
      return false;
    };
    // * Анимация действия была предзагруженна
    _.isAnimaXActionIsPreloaded = function() {
      return false;
    };
    // * Были ли изменены слои (части) анимации?
    _.isAnimXPartsChanged = function() {
      return false;
    };
  })();
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__erase, ALIAS__setupPage, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[ALIAS]
  ALIAS__erase = _.erase;
  _.erase = function() {
    if (this.isAnimX()) {
      this.clearXAnimParts();
    }
    ALIAS__erase.call(this);
  };
  //@[ALIAS]
  ALIAS__setupPage = _.setupPage;
  _.setupPage = function() {
    ALIAS__setupPage.call(this);
    this._isHaveAnimaX = false;
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.isAnimX()) {
      return this._updateAnimX();
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  _.isAnimX = function() {
    if (!$gameSystem.axIsAnimaXActive()) {
      return false;
    }
    return Game_Character.prototype.isAnimX.call(this);
  };
  _.setExternalAnimaX = function(name, isForIndependentAction = false) {
    this.__lastEventAnimaXExternProfile = name;
    this.__axShouldResetAnimaXAfterAction = isForIndependentAction === true;
    this.refresh();
    this.refreshAnimaX();
    if (this.__lastEventAnimaXExternProfile == null) {
      this.__axShouldReloadBitmaps = true;
    }
  };
  _.getCurrentAnimaXProfile = function() {
    var animXParameter;
    if (this.page() == null) {
      return null;
    }
    if (this.__lastEventAnimaXExternProfile != null) {
      return this.__lastEventAnimaXExternProfile;
    } else {
      animXParameter = PKD_ANIMAX.KGameEvents.GetCommentLine('XA:', this);
      if (animXParameter != null) {
        return this._parseAnimaXAParameterForEvent(animXParameter);
      }
    }
    return null;
  };
  _._parseAnimaXAParameterForEvent = function(animXParameter) {
    var id, parts;
    if (animXParameter == null) {
      return;
    }
    parts = animXParameter.split(":");
    id = parts[1];
    return id;
  };
  _.forceClearAnimaX = function() {
    var e;
    try {
      this.refresh();
      this.refreshAnimaX();
      return this.__axShouldReloadBitmaps = true;
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Follower.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__refresh, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Follower.prototype;
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.isAnimX()) {
      return this._updateAnimX();
    }
  };
})();

// ■ END Game_Follower.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Follower.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Follower.prototype;
  _.isAnimX = function() {
    if (!$gameSystem.axIsAnimaXActive()) {
      return false;
    }
    if (!$gameSystem.axIsAnimaXActiveForCharId(this._memberIndex)) {
      return false;
    }
    return Game_Character.prototype.isAnimX.call(this);
  };
  _.getCurrentAnimaXProfile = function() {
    var equipAnimaXSet;
    if (this.isAnimX()) {
      equipAnimaXSet = this._getEquipmentAnimaXSet();
      if (PKD_ANIMAX.KString.any(equipAnimaXSet)) {
        return equipAnimaXSet;
      }
    }
    return this.getInitialXProfile();
  };
  _.getInitialXProfile = function() {
    var actor;
    if (PKD_ANIMAX.KString.any(this.__lastEventAnimaXExternProfile)) {
      return this.__lastEventAnimaXExternProfile;
    } else {
      actor = this.getBattlerForAnimaX();
      if (actor == null) {
        return null;
      }
      return PKD_ANIMAX.KGameItems.GetMeta('xAnima', actor.actor());
    }
  };
  _.getBattlerForAnimaX = function() {
    return this.actor();
  };
  _.isDashingForAnimaX = function() {
    return $gamePlayer.isDashing();
  };
  _.setExternalAnimaX = function(name, isForIndependentAction = false) {
    this.__lastEventAnimaXExternProfile = name;
    this.__axShouldResetAnimaXAfterAction = isForIndependentAction === true;
    this.refresh();
    this.refreshAnimaX();
    if (this.__lastEventAnimaXExternProfile == null) {
      this.__axShouldReloadBitmaps = true;
    }
  };
  _.forceClearAnimaX = function() {
    var e;
    try {
      this.refresh();
      this.refreshAnimaX();
      return this.__axShouldReloadBitmaps = true;
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END Game_Follower.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__updateWaitMode, _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //@[ALIAS]
  ALIAS__updateWaitMode = _.updateWaitMode;
  _.updateWaitMode = function() {
    if (this._waitMode === 'xAnima') {
      return this._updateXAnimaWait();
    } else {
      return ALIAS__updateWaitMode.call(this);
    }
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  _._updateXAnimaWait = function() {
    var waiting;
    waiting = this.xAnimaTarget.isInAnimXAction();
    if (!waiting) {
      this._waitMode = '';
      this.xAnimaTarget = null;
    }
    return waiting;
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(mapId) {
    ALIAS__setup.call(this, ...arguments);
    if (PKD_ANIMAX.IsMapIsInactive(mapId)) {
      PKD_ANIMAX.DisableAnimaX();
    } else {
      PKD_ANIMAX.EnableAnimaX();
    }
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addActor, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__addActor = _.addActor;
  _.addActor = function(actorId) {
    var actor;
    ALIAS__addActor.call(this, actorId);
    // * Чтобы приминялась анимация с оружием (если была)
    if (this._actors.includes(actorId)) { // * Если был добавлен
      actor = $gameActors.actor(actorId);
      if (actor != null) {
        actor.refresh();
      }
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__canMove, ALIAS__refresh, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //?[ANIMAX_E]
  // * Система анимации XAnima
  // -----------------------------------------------------------------------
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__canMove = _.canMove;
  _.canMove = function() {
    if (this.isAnimXIsBusy()) {
      // * Дополнительная проверка анимации, т.к. Game_Player перекрывает метод canMove из Character_Base
      return false;
    }
    return ALIAS__canMove.call(this);
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (this.isAnimX()) {
      return this._updateAnimX();
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //?[ANIMAX_E]
  // * Система анимации XAnima и ABS
  // -----------------------------------------------------------------------
  _.isAnimX = function() {
    if (!$gameSystem.axIsAnimaXActive()) {
      return false;
    }
    if (!$gameSystem.axIsAnimaXActiveForCharId(0)) {
      return false;
    }
    return Game_Character.prototype.isAnimX.call(this);
  };
  _.getCurrentAnimaXProfile = function() {
    var equipAnimaXSet;
    if (this.isAnimX()) {
      equipAnimaXSet = this._getEquipmentAnimaXSet();
      if (PKD_ANIMAX.KString.any(equipAnimaXSet)) {
        return equipAnimaXSet;
      }
    }
    return this.getInitialXProfile();
  };
  _.getInitialXProfile = function() {
    if (PKD_ANIMAX.KString.any($gameSystem.lastPlayerAnimaXExternProfile)) {
      return $gameSystem.lastPlayerAnimaXExternProfile;
    } else {
      if ($gameParty.leader() != null) {
        return PKD_ANIMAX.KGameItems.GetMeta('xAnima', $gameParty.leader().actor());
      } else {
        return null;
      }
    }
  };
  _.isAnimaXAADefaultAction = function(actionName) {
    return ['Attack', 'Defense', 'Skill'].contains(actionName);
  };
  _.getBattlerForAnimaX = function() {
    return $gameParty.leader();
  };
  _.setExternalAnimaX = function(name, isForIndependentAction = false) {
    $gameSystem.lastPlayerAnimaXExternProfile = name;
    this.__axShouldResetAnimaXAfterAction = isForIndependentAction === true;
    this.refresh();
    this.axExternalAnimaXForNet();
  };
  _.axExternalAnimaXForNet = function() {
    if (PKD_ANIMAX.InLocalMode()) {
      $gameTemp.netAnimaXLocal = null;
      return;
    } else {
      if (PKD_ANIMAX.IsNetworkGame()) {
        PKD_ANIMAX.SendNetworkPlayerExternalAnimaX();
      }
    }
  };
  _.isDashingForAnimaX = function() {
    return this.isDashing();
  };
  _.forceClearAnimaX = function() {
    var e;
    try {
      this.refresh();
      return this.axExternalAnimaXForNet();
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_System.prototype;
  _.axIsAnimaXActive = function() {
    return this.__axIsAnimaXActive === true;
  };
  _.axSetAnimaXActiveState = function(state) {
    var e;
    try {
      this.__axIsAnimaXActive = state;
      return this.axRefreshAllEntities(true, true);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.axIsAnimaXActiveForCharId = function(charId) {
    var key;
    if (!this.axIsAnimaXActive()) {
      return false;
    }
    if (this.__axAnimaXNoActiveChars == null) {
      this.__axAnimaXNoActiveChars = [];
    }
    // * Events not used here, you can turn on/off self switch for events
    //if charId > 0 # * Event ID
    //    key = $gameMap.mapId() + '_' + charId
    //else
    //    key = charId
    key = charId;
    return !this.__axAnimaXNoActiveChars.contains(key);
  };
  _.axSetAnimaXActiveStateForCharId = function(charId, activeState) {
    var e, key;
    if (this.__axAnimaXNoActiveChars == null) {
      this.__axAnimaXNoActiveChars = [];
    }
    //if charId > 0 # * Event ID
    //    key = $gameMap.mapId() + '_' + charId
    //else
    key = charId;
    if (activeState === true) {
      this.__axAnimaXNoActiveChars.delete(key);
    } else {
      if (!this.__axAnimaXNoActiveChars.contains(key)) {
        this.__axAnimaXNoActiveChars.push(key);
      }
    }
    try {
      if (charId === 0) {
        this.axRefreshAllEntities();
      } else {
        this.axRefreshAllEntities(true);
      }
    } catch (error) {
      e = error;
      console.warn('error', e);
    }
  };
  _.axRefreshAllEntities = function(withFollowers = false, withEvents = false) {
    var e, event, follower, i, j, len, len1, ref, ref1, results;
    try {
      $gamePlayer.forceClearAnimaX();
      if (withFollowers === true) {
        ref = $gamePlayer.followers().data();
        for (i = 0, len = ref.length; i < len; i++) {
          follower = ref[i];
          if (follower.actor() != null) {
            follower.forceClearAnimaX();
          }
        }
      }
      if (withEvents === true) {
        ref1 = $gameMap.events();
        results = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          event = ref1[j];
          results.push(event.forceClearAnimaX());
        }
        return results;
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ImageManager;
  _.loadAnimaX = function(filename) {
    if (PKD_ANIMAX.IsUseWebp()) {
      return this.loadAnimaXw(filename);
    } else {
      return this.loadBitmap('img/charactersAA/', filename, 0, false);
    }
  };
  _.loadAnimaXw = function(filename) {
    return this.axLoadWepbBitmap('img/charactersAA/', filename, 0, false);
  };
  _.axLoadWepbBitmap = function(folder, filename, hue, smooth) {
    if (PKD_ANIMAX.isMV()) {
      return this._axLoadWepbBitmapMV(...arguments);
    } else {
      return this._axLoadWepbBitmapMZ(folder, filename);
    }
  };
  _.loadAllAnimaX = function(err, list) {
    var e, file, filename, i, len, path;
    try {
      if (err != null) {
        return console.warn(err);
      } else {
        console.log("AnimaX, try preload " + list.length + " animation files");
        path = PKD_ANIMAX._basePath;
        for (i = 0, len = list.length; i < len; i++) {
          file = list[i];
          if (!file.contains(".png")) {
            continue;
          }
          filename = file.replace(path, "");
          filename = filename.replace(".png", "");
          filename = filename.replaceAll("\\", "/");
          ImageManager.loadAnimaX(filename);
        }
        return console.log('AnimaX, preload done');
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------




// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isReady, ALIAS__onMapLoaded, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__isReady = _.isReady;
  _.isReady = function() {
    var e, result;
    result = ALIAS__isReady.call(this, ...arguments);
    if (result === true && PKD_ANIMAX.IsWaitSpritesheetLoading()) {
      try {
        return AX_LoadingManager.IsLoadingDone();
      } catch (error) {
        e = error;
        console.warn('error', e);
        return result;
      }
    }
    return result;
  };
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    this.axPreloadAllAnimationOnMap();
    this.axRefreshForNetwork();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _.axPreloadAllAnimationOnMap = function() {
    var e, ev, f, i, j, len, len1, ref, ref1;
    try {
      if ($gamePlayer.isAnimX()) {
        $gamePlayer.getCurrentAnimX().preLoad();
      }
      ref = $gamePlayer.followers()._data;
      for (i = 0, len = ref.length; i < len; i++) {
        f = ref[i];
        if (f.isAnimX()) {
          f.getCurrentAnimX().preLoad();
        }
      }
      ref1 = $gameMap.events();
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        ev = ref1[j];
        if (ev != null ? ev.isAnimX() : void 0) {
          ev.getCurrentAnimX().preLoad();
        }
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  _.axRefreshForNetwork = function() {
    if (PKD_ANIMAX.IsNetworkGame() && ($gameParty.leader() != null)) {
      return PKD_ANIMAX.SendNetworkFlagAnimaXRefresh($gameParty.leader().actorId());
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Sprite.prototype;
    Object.defineProperty(_, '__ay', {
        get: function () {
            if (this.isAnimX && this.isAnimX() && this._axCntr) {
                return this.y - this._axCntr.rootAnimation.dy;
            }
            else {
                return this.y;
            }
        },
        configurable: true
    });
})();
// ■ END Sprite.ts
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Спрайт для анимации слоя (части)
var Sprite_AnimaXPart;

Sprite_AnimaXPart = class Sprite_AnimaXPart extends Sprite {
  constructor(animPart, rootAnimation) {
    super();
    this.animPart = animPart;
    this.animPart.applyRootAnimation(rootAnimation);
    this.visible = !this.animPart.isDisabled();
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this.isLowerBodyPart = this.animPart.isLowerBodyPart;
    // * Offset for layer parts
    this.x += this.animPart.dx;
    this.y += this.animPart.dy;
    return;
  }

  refreshPart(frame, dir) {
    this.bitmap = this.animPart.getPartBitmap(dir, frame);
    this._refreshSheetFrame(frame, dir);
  }

  _refreshSheetFrame(frame, dir) {
    var e, frameRect;
    try {
      if (!this.animPart.isSpritesheet) {
        return;
      }
      frameRect = this.animPart.getSheetFrame(dir, frame);
      return this.setFrame(...frameRect);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__characterBlockX, ALIAS__characterBlockY, ALIAS__characterPatternX, ALIAS__characterPatternY, ALIAS__isEmptyCharacter, ALIAS__isImageChanged, ALIAS__patternHeight, ALIAS__patternWidth, ALIAS__updateBitmap, ALIAS__updateFrame, ALIAS__updatePosition, ALIAS__updateVisibility, _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //@[ALIAS]
  ALIAS__isEmptyCharacter = _.isEmptyCharacter;
  _.isEmptyCharacter = function() {
    if (this.isAnimX()) {
      return false;
    } else {
      return ALIAS__isEmptyCharacter.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__updateBitmap = _.updateBitmap;
  _.updateBitmap = function() {
    if (this.isAnimX()) {
      this._updateBitmapAnimX();
    } else {
      ALIAS__updateBitmap.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__updateVisibility = _.updateVisibility;
  _.updateVisibility = function() {
    if (this.isAnimX()) {
      return this._updateVisibilityAnimX();
    } else {
      return ALIAS__updateVisibility.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__updateFrame = _.updateFrame;
  _.updateFrame = function() {
    ALIAS__updateFrame.call(this);
    if (this.isAnimX()) {
      this._axCntr.updateSheetFrame(this);
      this._axCntr.update(this._character);
      if (this._animaXParts != null) {
        this._updateAnimaXPartsDepth();
        this._updateAnimaXParts();
      }
    }
  };
  //@[ALIAS]
  ALIAS__updatePosition = _.updatePosition;
  _.updatePosition = function() {
    ALIAS__updatePosition.call(this);
    if (this.isAnimX()) {
      this.x += this._axCntr.rootAnimation.dx;
      this.y += this._axCntr.rootAnimation.dy;
    }
  };
  
  //@[ALIAS]
  ALIAS__isImageChanged = _.isImageChanged;
  _.isImageChanged = function() {
    if (this.isAnimX()) {
      return this._animaXSet !== this._character.getCurrentAnimX();
    } else {
      if ((this._character != null) && this._character.__axShouldReloadBitmaps === true) {
        this._character.__axShouldReloadBitmaps = null;
        return true;
      }
      return ALIAS__isImageChanged.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__patternWidth = _.patternWidth;
  _.patternWidth = function() {
    if (this.isAnimX()) {
      if (this._character.getCurrentAnimX().isSpritesheet === true) {
        return this._character.getCurrentAnimX().sheetFrameWidth;
      } else {
        return this.bitmap.width;
      }
    } else {
      return ALIAS__patternWidth.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__patternHeight = _.patternHeight;
  _.patternHeight = function() {
    if (this.isAnimX()) {
      if (this._character.getCurrentAnimX().isSpritesheet === true) {
        return this._character.getCurrentAnimX().sheetFrameHeight;
      } else {
        return this.bitmap.height;
      }
    } else {
      return ALIAS__patternHeight.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__characterBlockX = _.characterBlockX;
  _.characterBlockX = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterBlockX.call(this);
  };
  
  //@[ALIAS]
  ALIAS__characterBlockY = _.characterBlockY;
  _.characterBlockY = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterBlockY.call(this);
  };
  //@[ALIAS]
  ALIAS__characterPatternX = _.characterPatternX;
  _.characterPatternX = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterPatternX.call(this);
  };
  //@[ALIAS]
  ALIAS__characterPatternY = _.characterPatternY;
  _.characterPatternY = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterPatternY.call(this);
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  (function() {    // * Система анимации XAnima
    // -----------------------------------------------------------------------
    _.isAnimX = function() {
      return this._character.isAnimX();
    };
    _._updateVisibilityAnimX = function() {
      if (PKD_ANIMAX.isMV()) {
        Sprite_Base.prototype.updateVisibility.call(this);
      } else {
        Sprite.prototype.updateVisibility.call(this);
      }
      if (this._character.isTransparent()) {
        this.visible = false;
      } else {
        if (this._character instanceof Game_Follower) {
          this.visible = this._character.isVisible();
        }
      }
    };
    _._updateBitmapAnimX = function() {
      if (this.isImageChanged()) {
        this._animaXSet = this._character.getCurrentAnimX();
        this._refreshAnimXSetController();
        this._createAnimaXParts();
      } else if (this.isXAnimPartsChanged()) {
        this._createAnimaXParts();
      }
      if (this._axCntr.isChanged()) {
        this._refreshAnimaXBitmap();
        this._refreshAnimXPartSprites();
      }
    };
    return _._refreshAnimXSetController = function() {
      this._axCntr = new XAnimaSetController(this._character.direction(), this._animaXSet);
      return this._refreshAnimaXBitmap();
    };
  })();
  (function() {    // * Система анимации XAnima - Части (слои)
    // -----------------------------------------------------------------------
    // * Синхронизируем координаты нижнего слоя
    _._updateAnimaXParts = function() {
      this._animaXPartBelow.x = this.x;
      return this._animaXPartBelow.y = this.y;
    };
    // * Чтобы lower и upper body прозрачность была (в кустах)
    _._updateAnimaXPartsDepth = function() {
      var i, j, len, len1, p, ref, ref1;
      // * Не обновлять, если не изменилась прозрачность
      if (this.__lBushDepth === this._bushDepth) {
        return;
      }
      this.__lBushDepth = this._bushDepth;
      if (this._bushDepth > 0) {
        ref = this.__tAnimxParts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          if (p.isLowerBodyPart === true) {
            p.opacity = 128;
          }
        }
      } else {
        ref1 = this.__tAnimxParts;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          p = ref1[j];
          p.opacity = 255;
        }
      }
    };
    _.isXAnimPartsChanged = function() {
      if (this.isAnimX()) {
        return this._character.isAnimXPartsChanged();
      } else {
        return false;
      }
    };
    _._refreshAnimXPartSprites = function() {
      var i, len, part, ref;
      if (this._animaXParts == null) {
        return;
      }
      ref = this.__tAnimxParts;
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        part.refreshPart(this._axCntr.cFrame, this._axCntr.cDir);
        this._addPartOnSpriteByDirection(part, this._axCntr.cDir);
      }
    };
    _._refreshAnimaXBitmap = function() {
      this.bitmap = this._axCntr.bitmap();
    };
    _._createAnimaXParts = function() {
      if (this._animaXParts != null) {
        this._destroyAnimaXParts();
      }
      // * Все части которые добавленны
      this.__tAnimxParts = [];
      // * Части над персонажем (стандарт)
      this._animaXParts = new Sprite();
      this._animaXParts.anchor.x = 0.5;
      this._animaXParts.anchor.y = 1;
      // * Части под персонажем
      this._animaXPartBelow = new Sprite();
      this._animaXPartBelow.anchor.x = 0.5;
      this._animaXPartBelow.anchor.y = 1;
      this._animaXPartBelow.z = 1;
      this._addAllAnimaXParts();
      this.addChild(this._animaXParts);
      this.parent.addChild(this._animaXPartBelow);
      this._character.onAnimXPartsRefreshed();
    };
    _._destroyAnimaXParts = function() {
      var i, len, p, ref;
      this._animaXParts.visible = false;
      this._animaXParts.parent.removeChild(this._animaXParts);
      this._animaXParts = null;
      this._animaXPartBelow.visible = false;
      this._animaXPartBelow.parent.removeChild(this._animaXPartBelow);
      this._animaXPartBelow = null;
      if (this.__tAnimxParts != null) {
        ref = this.__tAnimxParts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          p.parent.removeChild(p);
          p.visible = false;
        }
        this.__tAnimxParts = null;
      }
      this.__lBushDepth = null;
    };
    _._addAllAnimaXParts = function() {
      var animaXPart, i, id, len, part, partData, parts, unsortedParts;
      parts = this._character.animaXParts;
      // * Преобразование в массив
      unsortedParts = [];
      for (id in parts) {
        partData = parts[id];
        unsortedParts.push(partData);
      }
      // * Сортировка
      unsortedParts.sort(function(a, b) {
        if (a.level > b.level) {
          return 1;
        }
        if (a.level === b.level) {
          return 0;
        }
        return -1;
      });
      for (i = 0, len = unsortedParts.length; i < len; i++) {
        part = unsortedParts[i];
        animaXPart = new Sprite_AnimaXPart(part, this._axCntr.rootAnimation);
        this.__tAnimxParts.push(animaXPart);
        this._addPartOnSpriteByDirection(animaXPart, this._axCntr.cDir);
      }
    };
    // * Добаить часть (слой) на персонажа с учётом "уровня" слоя (за или перед)
    _._addPartOnSpriteByDirection = function(part, dir) {
      var level;
      level = part.animPart.isBelowCharacter(dir);
      if (level === true) {
        this._animaXParts.removeChild(part);
        this._animaXPartBelow.addChild(part);
      } else {
        this._animaXPartBelow.removeChild(part);
        this._animaXParts.addChild(part);
      }
    };
  })();
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Tilemap.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Tilemap.prototype;
    /*@ts-ignore*/
    //@[ALIAS]
    const ALIAS___compareChildOrder = _._compareChildOrder;
    /*@ts-ignore*/
    _._compareChildOrder = function (a, b) {
        if (a.z !== b.z) {
            return a.z - b.z;
        }
        else if (a.__ay && b.__ay && (a.__ay !== b.__ay)) {
            return a.__ay - b.__ay;
        }
        else if (a.y !== b.y) {
            return a.y - b.y;
        }
        else if (a.x !== b.x) {
            return a.x - b.x;
        }
        else {
            return a.spriteId - b.spriteId;
        }
    };
})();
// ■ END Tilemap.ts
//---------------------------------------------------------------------------


// * Анимация (одна единица анимации, последовательность кадров)
class XAnima {
    static FromConfig(config) {
        return new XAnima(config.framesCount, config.fileName, config.isSpritesheet, config.spritesheetPart);
    }
    constructor(framesCount, fileName, isSpritesheet, spritesheetPart = -1) {
        this.framesCount = 0;
        this.fileName = "";
        this.isSpritesheet = false;
        this.spritesheetPart = -1;
        // * Хранит только названия картинок кадров
        this.frames = [];
        this.framesCount = framesCount;
        this.fileName = fileName;
        this.isSpritesheet = isSpritesheet;
        this.spritesheetPart = spritesheetPart;
        this._parseFrames();
    }
    isReady() {
        try {
            for (let i = 0; i < this.frames.length; i++) {
                let frame = this.frames[i];
                let bitmap = XAnimaManager.loadImage(frame);
                if (!bitmap.isReady()) {
                    return false;
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
        return true;
    }
    preLoad() {
        for (let i = 0; i < this.frames.length; i++) {
            let frame = this.frames[i];
            XAnimaManager.loadImage(frame);
        }
    }
    getFrame(index) {
        if (this.isSpritesheet == true) {
            return XAnimaManager.loadImage(this.frames[0]);
        }
        else {
            let frame = this.frames[index];
            return XAnimaManager.loadImage(frame);
        }
    }
    expandFirstFrame(times) {
        if (this.isSpritesheet == true) {
            return;
        }
        else {
            this.framesCount += times;
            for (let i = 0; i < times; i++) {
                this.frames.splice(1, 0, this.frames[0]);
            }
        }
    }
    _parseFrames() {
        if (this.isSpritesheet == true) {
            if (this.spritesheetPart == -1) {
                this.frames[0] = this.fileName;
            }
            else {
                this._parseSpritesheetPartFrame();
            }
        }
        else {
            for (let i = 0; i < this.framesCount; i++) {
                this.frames[i] = this.fileName + "_" + i;
            }
        }
    }
    _parseSpritesheetPartFrame() {
        if (this.spritesheetPart == 0) {
            this.frames[0] = this.fileName;
        }
        else {
            this.frames[0] = this.fileName + "_DIAG";
        }
    }
}
window['XAnima'] = XAnima;


var XAnimaManager;
(function (XAnimaManager) {
    function loadImage(filename) {
        return ImageManager['loadAnimaX'](filename);
    }
    XAnimaManager.loadImage = loadImage;
})(XAnimaManager || (XAnimaManager = {}));


// Generated by CoffeeScript 2.6.1
// * Дополнительный слой анимации

//@[STORABLE]
var XAnimaPart;

XAnimaPart = class XAnimaPart {
  constructor(filename, isLowerBodyPart, level) {
    this.filename = filename;
    this.isLowerBodyPart = isLowerBodyPart;
    this.level = level;
    this.animations = [];
    this.rules = {};
    this.disabledActions = [];
    if (this.isLowerBodyPart == null) {
      this.isLowerBodyPart = false;
    }
    if (this.level == null) {
      this.level = 0;
    }
    // D, L, R, U, DL, DR, UL, UR, noDir
    this.directionsLevels = [false, false, false, false, false, false, false, false, false];
    this._isDisabled = false;
    // * Дополнительное смещение части
    this.dx = 0;
    this.dy = 0;
    this.isSpritesheet = false;
    this.isSepareteSpritesheet = false;
    this.setDefaultRule(true, true);
    return;
  }

  isDisabled() {
    return this._isDisabled === true;
  }

  is8WayAnimation() {
    return this.is8Way === true;
  }

  // * Тут задаётся стандартное правило
  setDefaultRule(haveDirs, haveFrames, isSpritesheet, isSepareteSpritesheet) {
    return this.rules['Basic'] = [haveDirs, haveFrames, isSpritesheet, isSepareteSpritesheet];
  }

  setRuleForMovement(haveDirs, haveFrames, isSpritesheet, isSepareteSpritesheet) {
    return this.rules['Move'] = [haveDirs, haveFrames, isSpritesheet, isSepareteSpritesheet];
  }

  setRuleForIdle(haveDirs, haveFrames, isSpritesheet, isSepareteSpritesheet) {
    return this.rules['Idle'] = [haveDirs, haveFrames, isSpritesheet, isSepareteSpritesheet];
  }

  setRuleForDashing(haveDirs, haveFrames, isSpritesheet, isSepareteSpritesheet) {
    return this.rules['Dashing'] = [haveDirs, haveFrames, isSpritesheet, isSepareteSpritesheet];
  }

  setRuleForAction(actionName, haveDirs, haveFrames, isSpritesheet, isSepareteSpritesheet, fileName) {
    return this.rules[actionName] = [haveDirs, haveFrames, isSpritesheet, isSepareteSpritesheet, fileName];
  }

  disableForAction(actionName) {
    return this.disabledActions.push(actionName);
  }

  applyRootAnimation(xAnimaSet) {
    var cFileName, frames, isNoDir, isSepareteSpritesheet, isSpritesheet, rule, setName;
    setName = xAnimaSet.getActionName();
    if (this.disabledActions.contains(setName)) {
      this._isDisabled = true;
      return;
    } else {
      this._isDisabled = false;
    }
    rule = this.rules[setName];
    if (rule == null) {
      rule = this.rules['Basic'];
      cFileName = this.filename + setName;
    } else {
      if (PKD_ANIMAX.KString.any(rule[4])) {
        cFileName = this.filename + rule[4];
      } else {
        cFileName = this.filename + setName;
      }
    }
    frames = xAnimaSet.frames;
    if (!rule[1]) {
      frames = 1;
    }
    isNoDir = !rule[0];
    if (PKD_ANIMAX.KString.any(rule[2])) {
      isSpritesheet = rule[2];
    } else {
      isSpritesheet = false;
    }
    if (PKD_ANIMAX.KString.any(rule[3])) {
      isSepareteSpritesheet = rule[3];
    } else {
      isSepareteSpritesheet = false;
    }
    this._setupAnimations(frames, cFileName, isNoDir, xAnimaSet.is8Way, frames === 1, isSpritesheet, isSepareteSpritesheet);
  }

  _setupAnimations(frames, cFileName, isNoDir, is8way, isNoFrames, isSpritesheet, isSepareteSpritesheet) {
    this.isOneFrame = isNoFrames;
    this.isNoDirections = isNoDir;
    this.is8Way = is8way;
    this.isSpritesheet = isSpritesheet;
    this.isSepareteSpritesheet = isSepareteSpritesheet;
    this._originalFramesCount = frames;
    if (this.isNoDirections === true) {

    } else if (this.isSpritesheet === true) {
      if (this.isSepareteSpritesheet === true) {
        this.animations[0] = new XAnima(frames, cFileName, this.isSpritesheet, 0);
        this.animations[1] = new XAnima(frames, cFileName, this.isSpritesheet, 1);
      } else {
        this.animations[0] = new XAnima(frames, cFileName, this.isSpritesheet);
      }
    } else {
      this.animations[0] = new XAnima(frames, cFileName + "_D", this.isSpritesheet);
      this.animations[1] = new XAnima(frames, cFileName + "_L", this.isSpritesheet);
      this.animations[2] = new XAnima(frames, cFileName + "_R", this.isSpritesheet);
      this.animations[3] = new XAnima(frames, cFileName + "_U", this.isSpritesheet);
      if (is8way === true) {
        this.animations[4] = new XAnima(frames, cFileName + "_DL", this.isSpritesheet);
        this.animations[5] = new XAnima(frames, cFileName + "_DR", this.isSpritesheet);
        this.animations[6] = new XAnima(frames, cFileName + "_UL", this.isSpritesheet);
        this.animations[7] = new XAnima(frames, cFileName + "_UR", this.isSpritesheet);
      }
    }
    this.preLoad();
    if (this.isSpritesheet) {
      this._loadSheetSizes(cFileName);
    }
  }

  preLoad() {
    var anim, i, len, ref, results;
    ref = this.animations;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      results.push(anim.preLoad());
    }
    return results;
  }

  isReady() {
    var anim, i, len, ref;
    ref = this.animations;
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      if (!anim.isReady()) {
        return false;
      }
    }
    return true;
  }

  _loadSheetSizes(cFileName1) {
    var e, image;
    this.cFileName = cFileName1;
    try {
      image = ImageManager.loadAnimaX(this.cFileName);
      if (image.isReady() || image.width > 0) {
        this._loadSheetSizesBody();
      } else {
        image.addLoadListener(this._loadSheetSizesBody.bind(this));
      }
      return this._loadSheetSizesBody();
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  }

  _loadSheetSizesBody() {
    var e, image, vertSize;
    try {
      image = ImageManager.loadAnimaX(this.cFileName);
      this.sheetFrameWidth = image.width / this._originalFramesCount;
      if (this.isNoDirections === true) {
        vertSize = 1;
      } else {
        if (this.is8WayAnimation() && !this.isSepareteSpritesheet) {
          vertSize = 8;
        } else {
          vertSize = 4;
        }
      }
      return this.sheetFrameHeight = image.height / vertSize;
    } catch (error) {
      //console.log(@sheetFrameWidth + " - " + @sheetFrameHeight)
      e = error;
      return console.warn(e);
    }
  }

  getPartBitmap(dir, frame) {
    if (this.isOneFrame === true) {
      frame = 0;
    }
    return this.getAnimationByDirection(dir).getFrame(frame);
  }

  // * Часть (слой) должна быть под персонажем?
  isBelowCharacter(dir) {
    if (this.isNoDirections === true) {
      // * Отдельная настройка 8 позиция
      return this.directionsLevels[8];
    } else {
      switch (dir) {
        case 8:
          return this.directionsLevels[3];
        case 2:
          return this.directionsLevels[0];
        case 4:
          return this.directionsLevels[1];
        case 6:
          return this.directionsLevels[2];
        case 1: // * DL
          if (this.is8WayAnimation()) {
            return this.animations[4];
          } else {
            return this.animations[1];
          }
          break;
        case 3: // * DR
          if (this.is8WayAnimation()) {
            return this.animations[5];
          } else {
            return this.animations[2];
          }
          break;
        case 7: // * UL
          if (this.is8WayAnimation()) {
            return this.animations[6];
          } else {
            return this.animations[1];
          }
          break;
        case 9: // * UR
          if (this.is8WayAnimation()) {
            return this.animations[7];
          } else {
            return this.animations[2];
          }
      }
      return this.directionsLevels[8];
    }
  }

  getAnimationByDirection(cDir) {
    if (this.isNoDirections === true) {
      return this.animations[0];
    } else if (this.isSpritesheet === true) {
      if (this.isSepareteSpritesheet === true) {
        if (this._isDiagonalDirection(cDir)) {
          return this.animations[1];
        } else {
          return this.animations[0];
        }
      } else {
        return this.animations[0];
      }
    }
    return this.animations[this._covertCharDirecitonToDirectionIndex(cDir)];
  }

  _covertCharDirecitonToDirectionIndex(cDir) {
    return XAnimaTools.covertCharDirecitonToDirectionIndex(cDir, this.is8WayAnimation());
  }

  getSheetFrame(cDir, frameIndex) {
    var dir, e, x, y;
    try {
      dir = this._covertCharDirecitonToDirectionIndex(cDir);
      if (this.isNoDirections === true) {
        y = 0;
      } else {
        if (this.isSepareteSpritesheet === true && this._isDiagonalDirection(cDir)) {
          dir = this._convertCharDirectionForSepareteSpritesheet(cDir);
        }
        y = dir * this.sheetFrameHeight;
      }
      if (this.isOneFrame === true) {
        x = 0;
      } else {
        x = frameIndex * this.sheetFrameWidth;
      }
      return [x, y, this.sheetFrameWidth, this.sheetFrameHeight];
    } catch (error) {
      e = error;
      console.warn(e);
    }
    return [0, 0, 48, 48];
  }

  _isDiagonalDirection(cDir) {
    return [1, 3, 7, 9].contains(cDir);
  }

  _convertCharDirectionForSepareteSpritesheet(cDir) {
    switch (cDir) {
      case 1:
        return 0;
      case 3:
        return 1;
      case 7:
        return 2;
      case 9:
        return 3;
    }
    return 0;
  }

};


// Generated by CoffeeScript 2.6.1
// * Набор анимаций для всех направлений

//DIRECTIONS:
// 2 - DOWN
// 8 - UP
// 4 - LEFT
// 6 - RIGHT

//TYPE:
// 0 - movement
// 1 - idle
// 2 - action

//@[STORABLE]
var XAnimaSet;

XAnimaSet = class XAnimaSet {
  constructor(type, filename, frames, speed, isNoDirections, is8Way = false, isSpritesheet = false, isSepareteSpritesheet = false) {
    this.type = type;
    this.filename = filename;
    this.frames = frames;
    this.speed = speed;
    this.isNoDirections = isNoDirections;
    this.is8Way = is8Way;
    this.isSpritesheet = isSpritesheet;
    this.isSepareteSpritesheet = isSepareteSpritesheet;
    this._setupAnimations();
    this.isLoop = false;
    this.actionName = "Action";
    this.moveToIdleDelay = 30;
    this.waitActionEnd = true;
    this._extraFirstFrames = 0;
    this._originalFramesCount = this.frames;
    if (this.isSpritesheet) {
      this._loadSheetSizes();
    }
    return;
  }

  _setupAnimations() {
    this.animations = [];
    if (this.isNoDirections === true) {
      this.animations[0] = new XAnima(this.frames, this.filename, this.isSpritesheet);
    } else if (this.isSpritesheet === true) {
      if (this.isSepareteSpritesheet === true) {
        this.animations[0] = new XAnima(this.frames, this.filename, this.isSpritesheet, 0);
        this.animations[1] = new XAnima(this.frames, this.filename, this.isSpritesheet, 1);
      } else {
        this.animations[0] = new XAnima(this.frames, this.filename, this.isSpritesheet);
      }
    } else {
      this.animations[0] = new XAnima(this.frames, this.filename + "_D", this.isSpritesheet);
      this.animations[1] = new XAnima(this.frames, this.filename + "_L", this.isSpritesheet);
      this.animations[2] = new XAnima(this.frames, this.filename + "_R", this.isSpritesheet);
      this.animations[3] = new XAnima(this.frames, this.filename + "_U", this.isSpritesheet);
      if (this.is8WayAnimation()) {
        this.animations[4] = new XAnima(this.frames, this.filename + "_DL", this.isSpritesheet);
        this.animations[5] = new XAnima(this.frames, this.filename + "_DR", this.isSpritesheet);
        this.animations[6] = new XAnima(this.frames, this.filename + "_UL", this.isSpritesheet);
        this.animations[7] = new XAnima(this.frames, this.filename + "_UR", this.isSpritesheet);
      }
      return;
    }
    this.preLoad();
  }

  _loadSheetSizes() {
    var e, image;
    try {
      image = ImageManager.loadAnimaX(this.filename);
      if (image.isReady() || image.width > 0) {
        this._loadSheetSizesBody();
      } else {
        image.addLoadListener(this._loadSheetSizesBody.bind(this));
      }
      return this._loadSheetSizesBody();
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  }

  _loadSheetSizesBody() {
    var e, image, vertSize;
    try {
      image = ImageManager.loadAnimaX(this.filename);
      this.sheetFrameWidth = image.width / this._originalFramesCount;
      if (this.isNoDirections === true) {
        vertSize = 1;
      } else {
        if (this.is8WayAnimation() && !this.isSepareteSpritesheet) {
          vertSize = 8;
        } else {
          vertSize = 4;
        }
      }
      return this.sheetFrameHeight = image.height / vertSize;
    } catch (error) {
      //console.log(@sheetFrameWidth + " - " + @sheetFrameHeight)
      e = error;
      return console.warn(e);
    }
  }

  setActionName(actionName) {
    this.actionName = actionName;
  }

  // * Имя действия используется частями, чтобы определять правила и анимации нужные
  getActionName() {
    switch (this.type) {
      case 0:
        return "Move";
      case 1:
        return "Idle";
      case 3:
        return "Dashing";
      default:
        return this.actionName;
    }
  }

  preLoad() {
    var anim, i, len, ref;
    ref = this.animations;
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      anim.preLoad();
    }
  }

  isReady() {
    var anim, i, len, ref;
    ref = this.animations;
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      if (!anim.isReady()) {
        return false;
      }
    }
    return true;
  }

  isNoFrames() {
    return this.frames === 1;
  }

  isWait() {
    return this.waitActionEnd === true;
  }

  expandFirstFrameTimes(times) {
    var anim, i, len, ref;
    if (this.isSpritesheet) {
      this._extraFirstFrames = times;
    }
    ref = this.animations;
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      anim.expandFirstFrame(times);
    }
    this.frames += times;
  }

  getSheetFrame(cDir, frameIndex) {
    var dir, e, x, y;
    try {
      dir = this._covertCharDirecitonToDirectionIndex(cDir);
      if (this.isNoDirections === true) {
        y = 0;
      } else {
        if (this.isSepareteSpritesheet === true && this._isDiagonalDirection(cDir)) {
          dir = this._convertCharDirectionForSepareteSpritesheet(cDir);
        }
        y = dir * this.sheetFrameHeight;
      }
      if (this._extraFirstFrames > 0) {
        if (frameIndex < this._extraFirstFrames) {
          frameIndex = 0;
        } else {
          frameIndex = frameIndex - this._extraFirstFrames;
        }
      }
      x = frameIndex * this.sheetFrameWidth;
      return [x, y, this.sheetFrameWidth, this.sheetFrameHeight];
    } catch (error) {
      e = error;
      console.warn(e);
    }
    return [0, 0, 48, 48];
  }

  _convertCharDirectionForSepareteSpritesheet(cDir) {
    switch (cDir) {
      case 1:
        return 0;
      case 3:
        return 1;
      case 7:
        return 2;
      case 9:
        return 3;
    }
    return 0;
  }

  _covertCharDirecitonToDirectionIndex(cDir) {
    return XAnimaTools.covertCharDirecitonToDirectionIndex(cDir, this.is8WayAnimation());
  }

  //? Оптимизация заменой метода?
  getAnimationByDirection(cDir) {
    if (this.isNoDirections === true) {
      return this.animations[0];
    } else if (this.isSpritesheet === true) {
      if (this.isSepareteSpritesheet === true) {
        if (this._isDiagonalDirection(cDir)) {
          return this.animations[1];
        } else {
          return this.animations[0];
        }
      } else {
        return this.animations[0];
      }
    }
    return this.animations[this._covertCharDirecitonToDirectionIndex(cDir)];
  }

  _isDiagonalDirection(cDir) {
    return [1, 3, 7, 9].contains(cDir);
  }

  is8WayAnimation() {
    return this.is8Way === true;
  }

  isMovement() {
    return this.type === 0;
  }

  isDashing() {
    return this.type === 3;
  }

  isAction() {
    return this.type === 2;
  }

  isIdle() {
    return this.type === 1;
  }

};


// Generated by CoffeeScript 2.6.1
// * Контроллер анимации (смена кадров, направлений)
// * rootAnimation - это XAnimaSet
// * Контроллер хранится в Sprite_Character
var XAnimaSetController;

XAnimaSetController = class XAnimaSetController {
  constructor(startDirection, rootAnimation) {
    this.rootAnimation = rootAnimation;
    this.cFrame = 0;
    this.cDir = startDirection;
    this._timer = 0;
    this._sKoef = 0;
    this._requireRefresh = true;
    this._animPlaying = false;
    this._initialFrame = false;
    this._frameRect = [0, 0, 48, 48];
    return;
  }

  isPlaying() {
    return this._animPlaying === true;
  }

  // * Класс каждый раз получает character, не хранит
  update(character) {
    this._requireRefresh = false;
    this._updateDirection(character);
    return this._updateFrames(character);
  }

  updateSheetFrame(spr) {
    var e, frameRect;
    try {
      if (!this.rootAnimation.isSpritesheet) {
        return;
      }
      frameRect = this.rootAnimation.getSheetFrame(this.cDir, this.cFrame);
      return spr.setFrame(...frameRect);
    } catch (error) {
      //if @cFrame > 0
      //    console.log("FRAME FOR: " + @cDir + "_" + @cFrame)
      //    console.log(frameRect)
      e = error;
      return console.warn(e);
    }
  }

  _updateDirection(character) {
    var cDir;
    if (this.rootAnimation.is8WayAnimation()) {
      cDir = character._diagonalDir;
      if (cDir == null) {
        //console.warn('You try start 8 way diagonal animation, but game not support 8 way movement')
        cDir = character.direction();
      }
      if (cDir === false) {
        cDir = character.direction();
      }
    } else {
      //console.log(cDir)
      cDir = character.direction();
    }
    if (cDir !== this.cDir) {
      this.requestRefresh();
    }
    this.cDir = cDir;
  }

  _updateFrames(character) {
    // * Используется один и тотже алгоритм смены кадров для Dashing и Movement
    if (this.rootAnimation.isMovement() || this.rootAnimation.isDashing()) {
      if (!this.rootAnimation.isNoFrames()) { // * IDLE AND ACTION SAME WAY
        return this._updateMovement(character);
      }
    } else {
      return this._updateAction(character);
    }
  }

  _updateMovement(c) {
    if (c.isMoving()) {
      this._sKoef = c.realMoveSpeed();
      this._setInitialFrame(1);
      this._animPlaying = true;
      // * Если Dashing, то таймер обычный
      if (c.isInDashingAnimaX()) {
        this._updateTimer(false); // * Если нет Dashing анимации, то немного ускоряем таймер
      } else {
        this._updateTimer(c.isDashing());
      }
      if (this._timer === 0) {
        return this._nextMovementFrame();
      }
    } else {
      this._sKoef = 0;
      this._updateTimer(false);
      if (this._timer === 0) {
        if (this.cFrame !== 0) {
          this.requestRefresh();
        }
        return this.resetAnimation();
      }
    }
  }

  _setInitialFrame(frameIndex) {
    if (this._initialFrame === true) { // * Установка начального кадра
      return;
    }
    this.cFrame = frameIndex;
    this._initialFrame = true;
    this._timer = 0;
    return this.requestRefresh();
  }

  _updateTimer(isFast) {
    this._timer += 1;
    if (isFast) {
      this._timer += 0.5;
    }
    if (this._timer >= this._speed()) {
      return this._timer = 0;
    }
  }

  _speed() {
    return this.rootAnimation.speed - this._sKoef;
  }

  _nextMovementFrame() {
    this.cFrame++;
    if (this.cFrame === this.rootAnimation.frames) {
      this.cFrame = 1; // * Не 0, 0 - когда стоит
    }
    if (!this._isNextFrameBitmapIsReady()) {
      if (this.cFrame > 0) {
        // * Если не готов кадр, то назад на 1 кадр (остаёмся на месте)
        this.cFrame--;
      }
      return;
    }
    return this.requestRefresh();
  }

  //TODO: Убрать? Или опция? -> Ждать готовность кадра
  _isNextFrameBitmapIsReady() {
    var b;
    b = this.bitmap();
    if (!b.isReady() || b.width <= 0) {
      return false;
    } else {
      return true;
    }
  }

  _updateAction(c) {
    if (this._initialFrame === false) {
      this._setInitialFrame(0);
      c.onAnimaXActionStart();
    }
    this._updateTimer(false);
    if (this._timer === 0) {
      return this._nextActionFrame(c);
    }
  }

  _nextActionFrame(c) {
    this._animPlaying = true;
    this.cFrame++;
    if (this.cFrame === this.rootAnimation.frames) {
      this.cFrame = 0;
      if (!this.rootAnimation.isLoop) {
        this.resetAnimation();
        c.resetXAnima();
      }
    }
    if (!this._isNextFrameBitmapIsReady()) {
      if (this.cFrame > 0) {
        this.cFrame--;
      }
    }
    return this.requestRefresh();
  }

  resetAnimation() {
    this._timer = 0;
    this.cFrame = 0;
    this._animPlaying = false;
    return this._initialFrame = false;
  }

  // * Если спрайт должен отрисовать новый кадр, то запрашиваем refresh
  requestRefresh() {
    return this._requireRefresh = true;
  }

  bitmap() {
    return this.rootAnimation.getAnimationByDirection(this.cDir).getFrame(this.cFrame);
  }

  isChanged() {
    return this._requireRefresh;
  }

};


// Generated by CoffeeScript 2.6.1
// * Менеджер для работы с БД анимаций
var XAnimaTools;

XAnimaTools = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ XAnimaTools.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = XAnimaTools;
  _.animationsDB = function() {
    return PKD_ANIMAX.Animations;
  };
  _.animationPartsDB = function() {
    return PKD_ANIMAX.AnimationParts;
  };
  _.covertCharDirecitonToDirectionIndex = function(cDir, is8WaySupported) {
    var e;
    try {
      switch (cDir) {
        case 8:
          return 3;
        case 2:
          return 0;
        case 4:
          return 1;
        case 6:
          return 2;
        case 1: // * DL
          if (is8WaySupported) {
            return 4;
          } else {
            return 1;
          }
          break;
        case 3: // * DR
          if (is8WaySupported) {
            return 5;
          } else {
            return 2;
          }
          break;
        case 7: // * UL
          if (is8WaySupported) {
            return 6;
          } else {
            return 1;
          }
          break;
        case 9: // * UR
          if (is8WaySupported) {
            return 7;
          } else {
            return 2;
          }
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
    return 0;
  };
  // * Список всех действий анимации
  _.getXAnimaActionList = function(id) {
    var data;
    data = this.getXAnimaSetById(id);
    if (data == null) {
      return [];
    }
    return data.actions;
  };
  // * Анимация по имени (ID)
  _.getXAnimaSetById = function(id) {
    var data;
    data = this.animationsDB();
    return data != null ? data.find(function(d) {
      return d.id === id;
    }) : void 0;
  };
  // * Настройки анимации для состояния
  _.getXAnimaParamsForState = function(state, id) {
    var data;
    data = this.getXAnimaSetById(id);
    if (data == null) {
      return null;
    }
    return data[state];
  };
  // * Настройки анимации для действия
  _.getXAnimaParamsForAction = function(actionName, setId) {
    var data;
    data = this.getXAnimaActionList(setId);
    return data != null ? data.find(function(a) {
      return a.name === actionName;
    }) : void 0;
  };
  // * Часть анимации (слой) по имени
  _.getXAnimaPartById = function(id) {
    var data;
    data = this.animationPartsDB();
    return data != null ? data.find(function(a) {
      return a.id === id;
    }) : void 0;
  };
  
  // * Конвертировать массив Actions из параметров плагина в более компактный вид
  _.convertActionsFromParameters = function(actions) {
    var action, i, item, len, shrinked;
    shrinked = [];
    for (i = 0, len = actions.length; i < len; i++) {
      action = actions[i];
      item = action.animation;
      item.name = action.name;
      if (action.Behaviour != null) {
        item.behav = {};
        item.behav.seOnStart = action.seOnStart;
        item.behav.seDelay = action.seDelay;
        item.behav.seOnEnd = action.seOnEnd;
        item.behav.scOnStart = action.scOnStart;
        item.behav.scDelay = action.scDelay;
        item.behav.scOnEnd = action.scOnEnd;
      } else {
        item.behav = null;
      }
      shrinked.push(item);
    }
    return shrinked;
  };
  _.createXAnimaSetForAction = function(id, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 2, null, params);
      if ((animaSet != null) && (params.behav != null)) {
        animaSet.behav = params.behav;
      }
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createXAnimaSetForMove = function(id, state, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 0, state, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createXAnimaSetForIdle = function(id, state, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 1, state, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createXAnimaSetForDashing = function(id, state, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 3, state, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createXAnimaSetForIndependentAction = function() {
    var animaSet, e;
    try {
      animaSet = new XAnimaSet(0, "", 0, 0, true, false, true);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _._createXAnimaSetFromParams = function(id, type, state, params) {
    var animaSet, e, filename, frames, is8Way, isOneDirection, isSepareteSpritesheet, isSpritesheet, speed;
    try {
      ({frames, speed, isOneDirection, is8Way, isSpritesheet, isSepareteSpritesheet} = params);
      if (type === 2) { // * Action
        filename = this.createFilenameForAnimaAction(id, params.name);
      } else {
        filename = this.createFilenameForAnimaState(id, state, type);
      }
      animaSet = new XAnimaSet(type, filename, frames, speed, isOneDirection, is8Way, isSpritesheet, isSepareteSpritesheet);
      animaSet.dx = params.dx || 0;
      animaSet.dy = params.dy || 0;
      if (params.expandFirstFrame > 0) {
        animaSet.expandFirstFrameTimes(params.expandFirstFrame);
      }
      if (type === 2) {
        // * Задать имя действия
        animaSet.setActionName(params.name);
      }
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createFilenameForAnimaState = function(id, state, type) {
    var path;
    path = id + "/";
    if (state !== 'base') {
      path += state + "/";
    }
    if (type === 0) {
      path += "Move";
    } else if (type === 1) {
      path += "Idle";
    } else if (type === 3) {
      path += "Dashing";
    }
    return path;
  };
  _.createFilenameForAnimaAction = function(id, name) {
    var path;
    path = id + "/Actions/" + name;
    return path;
  };
  _.createFilenameForAnimaPart = function(id, name, isRelative) {
    var path;
    if (isRelative) {
      path = id + "/Layers/" + name + "/";
    } else {
      path = "CommonLayers/" + name + "/";
    }
    return path;
  };
  _.createXAnimaPart = function(id, partName, isRelative = false) {
    var animaPartSet, e, params;
    try {
      params = this.getXAnimaPartById(partName);
      if (params == null) {
        return null;
      }
      animaPartSet = this._createXAnimaPartFromParams(id, partName, params, isRelative);
      return animaPartSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  // * isRelative - относительно ID анимации, например Harold\Parts\hat
  // * Если isRealtive = false, то будет Parts\hat
  _._createXAnimaPartFromParams = function(axId, partName, params, isRelative = false) {
    var actionRules, animaPart, baseRule, dashRule, e, filename, i, idleRule, isLowerBodyPart, layerRule, len, moveRule, rule, sortingLevel;
    try {
      ({isLowerBodyPart, sortingLevel, baseRule, moveRule, idleRule, dashRule, actionRules, layerRule} = params);
      filename = this.createFilenameForAnimaPart(axId, partName, isRelative);
      animaPart = new XAnimaPart(filename, isLowerBodyPart, sortingLevel);
      animaPart.directionsLevels = this._convertLayerRuleToDirectionLevels(layerRule);
      if (baseRule != null) {
        animaPart.setDefaultRule(baseRule.isHaveDirections, baseRule.isHaveFrames, baseRule.isSpritesheet, baseRule.isSepareteSpritesheet);
      }
      if (moveRule != null) {
        animaPart.setRuleForMovement(moveRule.isHaveDirections, moveRule.isHaveFrames, moveRule.isSpritesheet, moveRule.isSepareteSpritesheet);
      }
      if (idleRule != null) {
        animaPart.setRuleForIdle(idleRule.isHaveDirections, idleRule.isHaveFrames, idleRule.isSpritesheet, idleRule.isSepareteSpritesheet);
      }
      if (dashRule != null) {
        animaPart.setRuleForDashing(dashRule.isHaveDirections, dashRule.isHaveFrames, dashRule.isSpritesheet, dashRule.isSepareteSpritesheet);
      }
      animaPart.dx = params.dx || 0;
      animaPart.dy = params.dy || 0;
      try {
        for (i = 0, len = actionRules.length; i < len; i++) {
          rule = actionRules[i];
          if (rule == null) {
            continue;
          }
          if (rule.enabled === false) {
            animaPart.disableForAction(rule.actionName);
          } else {
            animaPart.setRuleForAction(rule.actionName, rule.actionRule.isHaveDirections, rule.actionRule.isHaveFrames, rule.actionRule.isSpritesheet, rule.actionRule.isSepareteSpritesheet, rule.fileName);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return animaPart;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  // * Преобразовать структуру LAnimaXPartDirLevel в массив directionsLevels для слоя
  _._convertLayerRuleToDirectionLevels = function(layerRule) {
    return [layerRule.dirD, layerRule.dirL, layerRule.dirR, layerRule.dirU, layerRule.dirDL, layerRule.dirDR, layerRule.dirUL, layerRule.dirUR, layerRule.noDir];
  };
})();

// ■ END XAnimaTools.coffee
//---------------------------------------------------------------------------

//Plugin PKD_AnimaX builded by PKD PluginBuilder 2.2.2 - 17.01.2025
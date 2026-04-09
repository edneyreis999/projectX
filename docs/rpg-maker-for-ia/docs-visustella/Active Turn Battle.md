============================================================================
Introduction
============================================================================

The RPG Maker MZ Time Progress Battle (TPB) system is only a few steps away
from the acclaimed Active Turn Battle (ATB) system. This plugin will grant
it the various features needed to turn it from TPB into ATB.

This plugin will grant control over how the various mechanics work, ranging
from penalties to calculations, to actions that can manipulate the ATB gauge
of battlers. Battlers that are in the middle of casting a spell can also be
interrupted with specific notetag traits.

ATB Gauges can also be displayed on enemies and/or allies, giving the player
full access to the current battle state. The ATB Gauges are also improved,
showing different colors for different states and showing a new gauge for
the casting state.

*NOTE* You will need to set the game project to run in either TPB mode,
Time Progress (Active) or Time Progress (Wait), for these new ATB effects
to work. You can find this setting in Database > System 1.

Features include all (but not limited to) the following:

* Full control over the TPB/ATB mechanics such as speed, calculations, etc.
* Notetags that give skills and items access to ATB Gauge manipulation, by
  altering how filled they are.
* Interrupts can be used on battlers in the middle of casting a skill.
* Visual ATB Gauges can be displayed over battlers' heads.
* ATB Gauges have extra coloring options added to them to let the player
  quickly know the current speed state of the ATB Gauge.
* A field-wide ATB Gauge that positions actor and enemy markers on it to
  show how far along actors and enemies are relative to each other's turns.

============================================================================
Requirements
============================================================================

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Required Plugin List ------

- VisuMZ_1_BattleCore

This plugin requires the above listed plugins to be installed inside your
game's Plugin Manager list in order to work. You cannot start your game with
this plugin enabled without the listed plugins.

------ Tier 2 ------

This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

*NOTE* You will need to set the game project to run in either TPB mode,
Time Progress (Active) or Time Progress (Wait), for these new ATB effects
to work. You can find this setting in Database > System 1.

============================================================================
Major Changes
============================================================================

This plugin adds some new hard-coded features to RPG Maker MZ's functions.
The following is a list of them.

---

ATB Gauges

The gauges are now revamped to show different colors to depict the various
ATB states a battler can be in. These various states include the following:

- When a battler's speed is fully stopped.
- When a battler's speed is slower/faster past a specific rating.
- When a battler is ready for an action.
- When a battler is casting an action (those with negative speed values).

The colors used for these states can be found and altered in the Plugin
Parameters under Gauge Color Settings.

---

Skill & Item Speeds

With TPB, skills and items with negative speed values will cause the battler
to enter a "casting" state, meaning they have to wait extra time before the
action takes off. With this delayed action execution, one might assume that
if there is a positive speed value, the battler would require less time for
their next turn.

However, this isn't the case with RPG Maker MZ's TPB. By changing it to ATB,
skills and items with positive speed values will have an impact on how full
their ATB Gauges will be in the following turn. A value of 2000 will put the
gauge at 50% full, 1000 will put the gauge at 25% full, 500 will put it at
12.5% full, and so on. Notetags can also be used to influence this.

---

JS Calculation Mechanics

While the calculation mechanics aren't changed from their original RPG Maker
MZ formulas, the functions for them have been overwritten to allow you, the
game developer, to alter them as you see fit.

---

============================================================================
Extra Features
============================================================================

There are some extra features found if other VisuStella MZ plugins are found
present in the Plugin Manager list.

---

VisuMZ_0_CoreEngine

- ATB Interrupts can have animations played when they trigger if the
VisuStella Core Engine is installed.

---

VisuMZ_1_OptionsCore

- Having the VisuStella Options Core available will allow you to adjust the
speed at which the ATB gauges fill up.

- The VisuStella Options Core also gives the player the option to toggle
between Active and Wait-based ATB.

---

============================================================================
Notetags
============================================================================

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

=== General ATB-Related Notetags ===

These notetags are general purpose notetags that have became available
through this plugin.

---

<ATB Help>
 description
 description
</ATB Help>

- Used for: Skill, Item Notetags
- If your game happens to support the ability to change battle systems, this
  notetag lets you change how the skill/item's help description text will
  look under TPB/ATB.
- This is primarily used if the skill behaves differently in TPB/ATB versus
  any other battle system.
- Replace 'description' with help text that's only displayed if the game's
  battle system is set to TPB/ATB.

---

<Hide ATB Gauge>

- Used for: Enemy Notetags
- If you don't want an enemy to show their ATB Gauge, use this notetag.

---

=== ATB Field Gauge-Related Notetags ===

These notetags only work if the ATB Field Gauge is enabled.

---

<ATB Field Gauge Icon: x>

- Used for: Actor, Enemy Notetags
- Changes the marker graphic used for the battler to a specific icon.
- Replace 'x' with the icon index to be used.

---

<ATB Field Gauge Face: filename, index>

- Used for: Actor, Enemy Notetags
- Changes the marker graphic used for the enemy to a specific face.
- Replace 'filename' with the filename of the image.
  - Do not include the file extension.
- Replace 'index' with the index of the face. Index values start at 0.
- Example: <ATB Field Gauge Face: Monster, 1>

---

=== ATB Gauge Manipulation-Related Notetags ===

These notetags are used for ATB Gauge manipulation purposes.

---

<ATB After Gauge: x%>

- Used for: Skill, Item Notetags
- After using the skill/item, the user's ATB Gauge will be set to x%.
- Replace 'x' with a percentile value representing the amount you want the
  ATB Gauge to reset to after the skill/item's usage.

---

<ATB Charge Gauge: x%>
<ATB Charge Gauge: +x%>
<ATB Charge Gauge: -x%>

- Used for: Skill, Item Notetags
- If the target is in a charging state, change the target's gauge amount to
  x% or by x% (if using the +/- variants).
- Replace 'x' with a percentile value representing the amount of the ATB
  Gauge you wish to alter it to/by.
- This only affects targets who are in a charging state.

---

<ATB Cast Gauge: x%>
<ATB Cast Gauge: +x%>
<ATB Cast Gauge: -x%>

- Used for: Skill, Item Notetags
- If the target is in a casting state, change the target's gauge amount to
  x% or by x% (if using the +/- variants).
- Replace 'x' with a percentile value representing the amount of the ATB
  Gauge you wish to alter it to/by.
- This only affects targets who are in a casting state.

---

<ATB Interrupt>

- Used for: Skill, Item Notetags
- If this skill/item hits a target who is in a casting state, interrupt that
  action to cancel it and reset the target's ATB Gauge to 0%.

---

<ATB Cannot Be Interrupted>

- Used for: Skill, Item Notetags
- Makes the skill/item immune to ATB Interruptions.

---

<ATB Battle Start Gauge: +x%>
<ATB Battle Start Gauge: -x%>

- Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- Determine how much extra or less ATB Gauge the battler will start with if
  associated with one of these database objects.
- Replace 'x' with a percentile value determining how much extra or less ATB
  Gauge value the battler will start battle with.
- These values are additive when stacked.

---

<ATB After Gauge: +x%>
<ATB After Gauge: -x%>

- Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- Determine how much influence there is on the ATB Gauge after finishing a
  skill/item. Increase or decrease the amount after each action.
- Replace 'x' with a percentile value determining how much influence there
  is on the ATB Gauge after the skill/item has finished performing.
- These values are additive when stacked.

---

=== JavaScript Notetags: ATB Gauge Manipulation ===

The following are notetags made for users with JavaScript knowledge to
give more control over conditional ATB Gauge Manipulation.

---

<JS ATB Charge Gauge>
 code
 code
 rate = code;
</JS ATB Charge Gauge>

- Used for: Skill, Item Notetags
- Replace 'code' with JavaScript code to determine how much to change the
  ATB Gauge to if the target is in a charging state.
- The 'rate' variable represents rate value the ATB Gauge will change to
  between the values of 0 and 1.
- The 'rate' variable will default to the target's current ATB Gauge rate
  if the target is in a charging state.

---

<JS ATB Cast Gauge>
 code
 code
 rate = code;
</JS ATB Cast Gauge>

- Used for: Skill, Item Notetags
- Replace 'code' with JavaScript code to determine how much to change the
  ATB Gauge to if the target is in a casting state.
- The 'rate' variable represents rate value the ATB Gauge will change to
  between the values of 0 and 1.
- The 'rate' variable will default to the target's current ATB Gauge rate
  if the target is in a casting state.

---

<JS ATB After Gauge>
 code
 code
 rate = code;
</JS ATB After Gauge>

- Used for: Skill, Item Notetags
- Replace 'code' with JavaScript code to determine how much to change the
  ATB Gauge to after performing this skill/item action.
- The 'rate' variable represents rate value the ATB Gauge will change to
  between the values of 0 and 1.
- The 'rate' variable will default to 0.

---

============================================================================
Plugin Commands
============================================================================

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Actor Plugin Commands ===

---

Actor: Change Field Gauge Icon
- Changes the icons used for the specific actor(s) on the ATB Field Gauge.

  Actor ID(s):
  - Select which Actor ID(s) to affect.

  Icon:
  - Changes the graphic to this icon.

---

Actor: Change Field Gauge Face
- Changes the faces used for the specific actor(s) on the ATB Field Gauge.

  Actor ID(s):
  - Select which Actor ID(s) to affect.

  Face Name:
  - This is the filename for the target face graphic.

  Face Index:
  - This is the index for the target face graphic.

---

Actor: Clear Field Gauge Graphic
- Clears the ATB Field Gauge graphics for the actor(s).
- The settings will revert to the Plugin Parameter settings.

  Actor ID(s):
  - Select which Actor ID(s) to affect.

---

=== Enemy Plugin Commands ===

---

Enemy: Change Field Gauge Icon
- Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.

  Enemy Index(es):
  - Select which enemy index(es) to affect.

  Icon:
  - Changes the graphic to this icon.

---

Enemy: Change Field Gauge Face
- Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.

  Enemy Index(es):
  - Select which enemy index(es) to affect.

  Face Name:
  - This is the filename for the target face graphic.

  Face Index:
  - This is the index for the target face graphic.

---

Enemy: Clear Field Gauge Graphic
- Clears the ATB Field Gauge graphics for the enemy(ies).
- The settings will revert to the Plugin Parameter settings.

  Enemy Index(es):
  - Select which enemy index(es) to affect.

---

=== System Plugin Commands ===

---

System: ATB Field Gauge Visibility
- Determine the visibility of the ATB Field Gauge.

  Visibility:
  - Changes the visibility of the ATB Field Gauge.

---

============================================================================
Plugin Parameters: Mechanics Settings
============================================================================

Mechanics settings used for Battle System ATB. The majority of these are
JavaScript-based and will require knowledge of JavaScript to fully utilize
the plugin parameters.

---

Mechanics

  Escape Fail Penalty:
  - Gauge penalty if an escape attempt fails.

  Stuns Reset Gauge?:
  - Should stuns reset the ATB Gauge?
    - Charm, Berserk, and Confusion states will still reset the ATB Gauge.

  JS: Initial Gauge:
  - JavaScript code to determine how much ATB gauge to give each battler at
    the start of battle.

  JS: Speed:
  - JavaScript code to determine how much speed a battler has.

  JS: Base Speed:
  - JavaScript code to determine how much base speed a battler has.

  JS: Relative Speed:
  - JavaScript code to determine what is the relative speed of a battler.

  JS: Acceleration:
  - JavaScript code to determine how much gauges accelerate by relative to
    reference time.

  JS: Cast Time:
  - JavaScript code to determine how much cast time is used for skills/items
    with negative speed modifiers.

---

============================================================================
Plugin Parameters: Interrupt Settings
============================================================================

Interrupt settings used for Battle System ATB.

---

Interrupt

  Animation ID:
  - Play this animation when a unit is interrupted.
  - Requires VisuMZ_0_CoreEngine.

    Mirror Animation:
    - Mirror the interrupt animation?
    - Requires VisuMZ_0_CoreEngine.

    Mute Animation:
    - Mute the interrupt animation?
    - Requires VisuMZ_0_CoreEngine.

  Text Popup:
  - Text used for popup when interrupts happen.
  - Leave empty for no popup.

  Text Color:
  - Use #rrggbb for custom colors or regular numbers for text colors from
    the Window Skin.

    Flash Color:
    - Adjust the popup's flash color.
    - Format: [red, green, blue, alpha]

    Flash Duration:
    - What is the frame duration of the flash effect?

---

============================================================================
Plugin Parameters: General Gauge Settings
============================================================================

General gauge settings used for ATB Gauges.

---

General

  Anchor X:
  Anchor Y:
  - Where do you want the ATB Gauge sprite's anchor X/Y to be?
  - Use values between 0 and 1 to be safe.

  Scale:
  - How large/small do you want the ATB Gauge to be scaled?

  Offset X:
  Offset Y:
  - How many pixels to offset the ATB Gauge's X/Y by?

---

AGI Gauge Rates

  Slow Rate:
  - How much should the AGI rate be at to be considered slow?

  Fast Rate:
  - How much should the AGI rate be at to be considered fast?

---

Actors

  Show Sprite Gauges:
  - Show ATB Gauges over the actor sprites' heads?
  - Requires SV Actors to be visible.

  Show Status Gauges:
  - Show ATB Gauges in the status window?
  - Applies only to sideview.

---

Enemies

  Show Sprite Gauges:
  - Show ATB Gauges over the enemy sprites' heads?

---

============================================================================
Plugin Parameters: Field Gauge Settings
============================================================================

The ATB Field Gauge is a large gauge placed on the screen with all of the
current battle's active participants shown on it. The participants are
represented by a marker. Each marker's position on the gauge indicates its
battler's ATB progress towards a turn.

In order for this feature to work, enable "Use Field Gauge?" in the
Plugin Parameters.

---

General

  Use Field Gauge?:
  - This value must be set to true in order for the ATB Field Gauge
    to appear.
  - This needs to be on in order for this feature to work.

  Display Position:
  - Select where the Field Gauge will appear on the screen.
  - Top
  - Bottom
  - Left
  - Right

  Offset X:
  Offset Y:
  - How much to offset the X/Y coordinates by.

  Reposition for Help?:
  - If the display position is at the top, reposition the gauge when the
    help window is open?

  Forward Direction:
  - Decide on the direction of the Field Gauge.
  - Settings may vary depending on position.
  - Left to Right
  - Right to Left
  - Up to Down
  - Down to Up

---

Field Gauge Settings

  Gauge Skin:
  - Optional. Select an image to place behind the gauge.
  - This will be centered on the Field Gauge's position.

  Show Gauge?:
  - Decide if you want the gauge to be shown.

  Horizontal Length:
  - The length of the Field Gauge if placed horizontally.

  Vertical Length:
  - The length of the Field Gauge if placed vertically.

  Thickness:
  - The thickness of the Field Gauge for either direction.

  Split Location:
  - Determine where the gauge should split.
  - Use 0.00 for the start. Use 1.00 for the end.

---

Marker Sprites

  Actor Marker Side:
  - Which side do you want the actor markers to appear?

  Enemy Marker Side:
  - Which side do you want the enemy markers to appear?

  Marker Offset:
  - How many pixels do you want to offset the markers by?

  Marker Size:
  - How pixels wide and tall do you want the markers to be?

  Marker Speed:
  - How many pixels maximum can a marker travel in one frame?

  Opacity Rate:
  - If a marker has to change opacity, how fast should it change by?

---

Marker Border

  Show Border?:
  - Show borders for the marker sprites?

  Border Thickness:
  - How many pixels thick should the colored portion of the border be?

  Actors
  Enemies

    Border Color:
    - Use #rrggbb for custom colors or regular numbers for text colors
      from the Window Skin.

    Border Skin:
    - Optional. Place a skin on the actor/enemy borders instead of
      rendering them?

---

Marker Sprites

  Actors

    Sprite Type:
    - Select the type of sprite used for the actor graphic.
    - Face Graphic - Show the actor's face.
    - Icon - Show a specified icon.
    - Sideview Actor - Show the actor's sideview battler.

    Default Icon:
    - Which icon do you want to use for actors by default?

  Enemies

    Sprite Type:
    - Select the type of sprite used for the enemy graphic.
    - Face Graphic - Show a specified face graphic.
    - Icon - Show a specified icon.
    - Enemy - Show the enemy's graphic or sideview battler.

    Default Face Name:
    - Use this default face graphic if there is no specified face.

    Default Face Index:
    - Use this default face index if there is no specified index.

    Default Icon:
    - Which icon do you want to use for enemies by default?

    Match Hue?:
    - Match the hue for enemy battlers?
    - Does not apply if there's a sideview battler.

---

Marker Letter

  Show Enemy Letter?:
  - Show the enemy's letter on the marker sprite?

  Font Name:
  - The font name used for the text of the Letter.
  - Leave empty to use the default game's font.

  Font Size:
  - The font size used for the text of the Letter.

---

Marker Background

  Show Background?:
  - Show the background on the marker sprite?

  Actors
  Enemies

    Background Color 1:
    Background Color 2:
    - Use #rrggbb for custom colors or regular numbers for text colors
      from the Window Skin.

    Background Skin:
    - Optional. Use a skin for the actor background instead of
      rendering them?

---

Marker Arrow

  Show Arrow?:
  - Show the arrow sprite pointing towards the Field Gauge?

  Arrow Skin:
  - Pick a window skin to draw arrows from.

---

============================================================================
Plugin Parameters: Gauge Color Settings
============================================================================

Gauge color settings used for ATB Gauges.

---

Colors

  Default Color 1:
  Default Color 2:
  Full Color 1:
  Full Color 2:
  Cast Color 1:
  Cast Color 2:
  Fast Color 1:
  Fast Color 2:
  Slow Color 1:
  Slow Color 2:
  Stop Color 1:
  Stop Color 2:
  - Use #rrggbb for custom colors or regular numbers for text colors from
    the Window Skin.

---

============================================================================
Plugin Parameters: Options Settings
============================================================================

Options settings used for Battle System ATB.

---

Options

  Add Option?:
  - Add the 'Show ATB Gauges' option to the Options menu?

  Adjust Window Height:
  - Automatically adjust the options window height?

  Option Name:
  - Command name of the option.

---
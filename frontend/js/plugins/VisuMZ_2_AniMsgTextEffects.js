//=============================================================================
// VisuStella MZ - Animated Message Text Effects
// VisuMZ_2_AniMsgTextEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_AniMsgTextEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AniMsgTextEffects = VisuMZ.AniMsgTextEffects || {};
VisuMZ.AniMsgTextEffects.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.05] [AniMsgTextEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Animated_Message_Text_Effects_VisuStella_MZ
 * @base VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to animate the text that appears in your Message Window in order
 * to add just a bit more character to their lines? Perhaps a stagger effect or
 * a shivering effect? Maybe a swinging effect like a pendulum or a glowing
 * effect for a specific color? This plugin comes with a plethora of text
 * effects to pick and use from in addition to letting you create your very own
 * custom text effects through the Plugin Parameters and just by adjusting the
 * various effect properties.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Animate text shown in the Message Window with more than 40+ number of
 *   custom text effects with many having three different variations each.
 * * Add in your own custom text effects or modify existing text effects. There
 *   is an endless number of custom text effects you can add.
 * * Options command for players to turn on/off Message Text Effects in case
 *   the text effects may interfere with their ability to read.
 * * Angle-type text effects will sway back and forth by the angle or
 *   constantly spin in a certain direction.
 * * Color-type text effects will allow for hue shifts or color tone patterns
 *   to be applied to your message text.
 * * Opacity-type text effects can cause the opacity of a letter to fade in/out
 *   and/or use custom opacity patterns that can also be used to determine
 *   fade level.
 * * Positioning-type text effects can shake randomly in specified directions
 *   or move back and forth for specified directions in a wave.
 * * Scaling-type text effects can flip to its front and back sides or grow
 *   and shrink in size by a certain amount like a pulse.
 * * You can combine text effects with one another as long as they are of
 *   different types.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_1_MessageCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin.
 * 
 * While the \Effect<name> part of the text code is hardcoded, the actual
 * settings for each of the text effect types can be modified through the
 * Plugin Parameters.
 * 
 * These Text Effects can ONLY be used for the Message Window and nothing else.
 * Everything else will have the text be displayed normally. This means you
 * CANNOT use Animated Message Text Effects for the Help Window, Choice Window,
 * Status Window, etc. Only the main Message Window can support them.
 * 
 * ---
 *
 * === General Text Effect-Related Text Codes ===
 * 
 * ---
 *
 * --------------------   -----------------------------------------------------
 * Text Code              Animated Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<name>          Changes the text effect to "name" where "name" is
 *                        based on the Plugin Parameter "Name" setting. The
 *                        text effect will then be applied to regular text
 *                        characters and icons. Other visual text code graphics
 *                        won't have custom text effects applied to them.
 * 
 * \Effect<Normal>        Returns the text effect type to "normal". No shaking,
 *                        angle changing, etc. effects will be seen. Just plain
 *                        old normal text.
 * 
 * <Clear Effect>         Same as \Effect<Normal> as it will return the text
 *                        effect type to "normal". There are no differences
 *                        between usage as it is up to personal preference on
 *                        which you want to use.
 * 
 * ---
 *
 * === Angle-Type Text Effect-Related Text Codes ===
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Pendulum-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Swing>         Angle of letters swing uniformly back and forth.
 * \Effect<SlowSwing>     Slower version of "Swing" text effect.
 * \Effect<FastSwing>     Faster version of "Swing" text effect.
 * 
 * \Effect<Wag>           Angle of letters swing in a sequence back and forth.
 * \Effect<SlowWag>       Slower version of "Wag" text effect.
 * \Effect<FastWag>       Faster version of "Wag" text effect.
 * 
 * \Effect<Jelly>         Angle and position move back and forth in a sequence.
 * \Effect<SlowJelly>     Slower version of "Jelly" text effect.
 * \Effect<FastJelly>     Faster version of "Jelly" text effect.
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Rotation-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<SpinCW>        Letters rotate clockwise uniformly.
 * \Effect<SlowSpinCW>    Slower version of "SpinCW" text effect.
 * \Effect<FastSpinCW>    Faster version of "SpinCW" text effect.
 * 
 * \Effect<SpinCCW>       Letters rotate counter-clockwise uniformly.
 * \Effect<SlowSpinCCW>   Slower version of "SpinCCW" text effect.
 * \Effect<FastSpinCCW>   Faster version of "SpinCCW" text effect.
 * 
 * \Effect<RollCW>        Letters rotate clockwise in a sequence.
 * \Effect<SlowRollCW>    Slower version of "RollCW" text effect.
 * \Effect<FastRollCW>    Faster version of "RollCW" text effect.
 * 
 * \Effect<RollCCW>       Letters rotate counter-clockwise in a sequence.
 * \Effect<SlowRollCCW>   Slower version of "RollCCW" text effect.
 * \Effect<FastRollCCW>   Faster version of "RollCCW" text effect.
 * 
 * ---
 *
 * === Color-Type Text Effect-Related Text Codes ===
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Hue-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Prism>         Letters will hue shift uniformly.
 * \Effect<SlowPrism>     Slower version of "Prism" text effect.
 * \Effect<FastPrism>     Faster version of "Prism" text effect.
 * 
 * \Effect<Rainbow>       Letters will hue shift in a sequence.
 * \Effect<SlowRainbow>   Slower version of "Rainbow" text effect.
 * \Effect<FastRainbow>   Faster version of "Rainbow" text effect.
 * 
 * \Effect<Gamer>         Letters will hue shift in a stagger.
 * \Effect<SlowGamer>     Slower version of "Gamer" text effect.
 * \Effect<FastGamer>     Faster version of "Gamer" text effect.
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Tone-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Red>           A static red tone on the text.
 * \Effect<SoftRed>       Smoothly transition red tone on the text.
 * \Effect<HardRed>       Instant transition red tone on the text.
 * 
 * \Effect<Green>         A static green tone on the text.
 * \Effect<SoftGreen>     Smoothly transition green tone on the text.
 * \Effect<HardGreen>     Instant transition green tone on the text.
 * 
 * \Effect<Blue>          A static blue tone on the text.
 * \Effect<SoftBlue>      Smoothly transition blue tone on the text.
 * \Effect<HardBlue>      Instant transition blue tone on the text.
 * 
 * \Effect<Yellow>        A static yellow tone on the text.
 * \Effect<SoftYellow>    Smoothly transition yellow tone on the text.
 * \Effect<HardYellow>    Instant transition yellow tone on the text.
 * 
 * \Effect<Cyan>          A static cyan tone on the text.
 * \Effect<SoftCyan>      Smoothly transition cyan tone on the text.
 * \Effect<HardCyan>      Instant transition cyan tone on the text.
 * 
 * \Effect<Magenta>       A static magenta tone on the text.
 * \Effect<SoftMagenta>   Smoothly transition magenta tone on the text.
 * \Effect<HardMagenta>   Instant transition magenta tone on the text.
 * 
 * \Effect<RGB>           Smooth shifting RGB tones in a sequence.
 * \Effect<SlowRGB>       Slower version of "RGB" text effect.
 * \Effect<FastRGB>       Faster version of "RGB" text effect.
 * 
 * \Effect<Fes>           Instant shifting Red/Green tones in a sequence.
 * \Effect<SlowFes>       Slower version of "Fes" text effect.
 * \Effect<FastFes>       Faster version of "Fes" text effect.
 * 
 * \Effect<Gig>           Smooth shifting base tones in a sequence.
 * \Effect<SlowGig>       Slower version of "Gig" text effect.
 * \Effect<FastGig>       Faster version of "Gig" text effect.
 * 
 * ---
 *
 * === Opacity-Type Text Effect-Related Text Codes ===
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Glow-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Glow>          Letters fade in and out uniformly.
 * \Effect<SlowGlow>      Slower version of "Glow" text effect.
 * \Effect<FastGlow>      Faster version of "Glow" text effect.
 * 
 * \Effect<Flow>          Letters fade in and out in a sequence.
 * \Effect<SlowFlow>      Slower version of "Flow" text effect.
 * \Effect<FastFlow>      Faster version of "Flow" text effect.
 * 
 * \Effect<Blink>         Letters blink in and out in a stagger.
 * \Effect<SlowBlink>     Slower version of "Blink" text effect.
 * \Effect<FastBlink>     Faster version of "Blink" text effect.
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Pattern-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Campfire>      A specified blinking light pattern for letters.
 * \Effect<Candle>        A specified blinking light pattern for letters.
 * \Effect<Fade>          A specified blinking light pattern for letters.
 * \Effect<Flicker>       A specified blinking light pattern for letters.
 * \Effect<Fluorescent>   A specified blinking light pattern for letters.
 * \Effect<Halogen>       A specified blinking light pattern for letters.
 * \Effect<Strobe>        A specified blinking light pattern for letters.
 * \Effect<Torch>         A specified blinking light pattern for letters.
 * \Effect<Underwater>    A specified blinking light pattern for letters.
 * 
 * ---
 *
 * === Position-Type Text Effect-Related Text Codes ===
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Frantic-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Shake>         Shakes frantically and randomly in any direction.
 * \Effect<SoftShake>     Less frantic version of "Shake" text effect.
 * \Effect<HardShake>     More frantic version of "Shake" text effect.
 * 
 * \Effect<Shiver>        Shivers frantically in the left/right direction.
 * \Effect<SoftShiver>    Less frantic version of "Shiver" text effect.
 * \Effect<HardShiver>    More frantic version of "Shiver" text effect.
 * 
 * \Effect<Vibe>          Vibrates frantically in the up/down direction.
 * \Effect<SoftVibe>      Less frantic version of "Vibe" text effect.
 * \Effect<HardVibe>      More frantic version of "Vibe" text effect.
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Wave-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Stagger>       Moves with letters staggered up and down.
 * \Effect<SlowStagger>   Slower version of "Stagger" text effect.
 * \Effect<FastStagger>   Faster version of "Stagger" text effect.
 * 
 * \Effect<Saw>           Moves uniformly left and right.
 * \Effect<SlowSaw>       Slower version of "Saw" text effect.
 * \Effect<FastSaw>       Faster version of "Saw" text effect.
 * 
 * \Effect<Bounce>        Moves uniformly up and down.
 * \Effect<SlowBounce>    Slower version of "Bounce" text effect.
 * \Effect<FastBounce>    Faster version of "Bounce" text effect.
 * 
 * \Effect<Wave>          Waves by letter in all directions.
 * \Effect<SlowWave>      Slower version of "Wave" text effect.
 * \Effect<FastWave>      Faster version of "Wave" text effect.
 * 
 * \Effect<HorzWave>      Waves by letter in horizontal direction.
 * \Effect<SlowHorzWave>  Slower version of "HorzWave" text effect.
 * \Effect<FastHorzWave>  Faster version of "HorzWave" text effect.
 * 
 * \Effect<VertWave>      Waves by letter in vertical direction.
 * \Effect<SlowVertWave>  Slower version of "VertWave" text effect.
 * \Effect<FastVertWave>  Faster version of "VertWave" text effect.
 * 
 * ---
 *
 * === Scaling-Type Text Effect-Related Text Codes ===
 * 
 * ---
 * 
 * ----------------------   ---------------------------------------------------
 * Text Code                Flip-Subtype Text Effect (Message Window Only)
 * ----------------------   ---------------------------------------------------
 * 
 * \Effect<HorzCard>        Horizontally uniform flipping effect.
 * \Effect<SlowHorzCard>    Slower version of "HorzCard" text effect.
 * \Effect<FastHorzCard>    Faster version of "HorzCard" text effect.
 * 
 * \Effect<VertCard>        Vertically uniform flipping effect.
 * \Effect<SlowVertCard>    Slower version of "VertCard" text effect.
 * \Effect<FastVertCard>    Faster version of "VertCard" text effect.
 * 
 * \Effect<HorzRibbon>      Horizontally folding flipping effect.
 * \Effect<SlowHorzRibbon>  Slower version of "HorzRibbon" text effect.
 * \Effect<FastHorzRibbon>  Faster version of "HorzRibbon" text effect.
 * 
 * \Effect<VertRibbon>      Vertically folding flipping effect.
 * \Effect<SlowVertRibbon>  Slower version of "VertRibbon" text effect.
 * \Effect<FastVertRibbon>  Faster version of "VertRibbon" text effect.
 * 
 * ---
 * 
 * --------------------   -----------------------------------------------------
 * Text Code              Pulse-Subtype Text Effect (Message Window Only)
 * --------------------   -----------------------------------------------------
 * 
 * \Effect<Pulse>         Letters grow bigger and smaller uniformly.
 * \Effect<SmallPulse>    Smaller version of "Pulse" text effect.
 * \Effect<BigPulse>      Larger version of "Pulse" text effect.
 * 
 * \Effect<Jiggle>        Letters grow bigger and smaller in a sequence.
 * \Effect<SmallJiggle>   Smaller version of "Jiggle" text effect.
 * \Effect<BigJiggle>     Larger version of "Jiggle" text effect.
 * 
 * \Effect<Gooey>         Letters grow bigger and smaller in a stretched form.
 * \Effect<SmallGooey>    Smaller version of "Gooey" text effect.
 * \Effect<BigGooey>      Larger version of "Gooey" text effect.
 * 
 * ---
 * 
 * === Combining Text Effects ===
 * 
 * ---
 * 
 * \Effect<type, type>
 * \Effect<type, type, type>
 * \Effect<type, type, type, type>
 * \Effect<type, type, type, type, type>
 * 
 * You can combine text effects with one another provided that they are of
 * different types (NOT subtypes). What this means is you can pick an
 * angle-type text effect, combine it with a color-type text effect along with
 * something like a positioning-type text effect and produce results.
 * 
 * You cannot combine same types together such as a positioning-type with
 * another positioning type.
 * 
 * Examples:
 * 
 * \Effect<Swing, Rainbow>
 * \Effect<Wag, Flow, HorzWave>
 * \Effect<Jelly, Shiver, HorzCard>
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Angle Effects Settings
 * ============================================================================
 *
 * Setup the various settings for angle-type Text Effects here.
 *
 * ---
 *
 * General
 * 
 *   Name:
 *   - UNIQUE name of this message text effect type.
 *   - Used in place of 'name' in \Effect<name> for text codes.
 *
 * ---
 * 
 * Angles > Pendulum Effect
 * 
 *   Arc Size:
 *   - What is the pendulum arc size?
 * 
 *   Speed Modifier:
 *   - Arc speed rate for pendulum effect.
 * 
 *   Offset Modifier:
 *   - Arc offset modifier for pendulum effect.
 * 
 * ---
 * 
 * Angles > Rotation Effect
 * 
 *   Speed Modifier:
 *   - Speed to determine many angles will rotate per frame.
 * 
 *   Offset Modifier:
 *   - Initial angle offset modifier for rotation effect.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Effects Settings
 * ============================================================================
 *
 * Setup the various settings for color-type Text Effects here.
 *
 * ---
 *
 * General
 * 
 *   Name:
 *   - UNIQUE name of this message text effect type.
 *   - Used in place of 'name' in \Effect<name> for text codes.
 *
 * ---
 *
 * Color
 * 
 *   Forced Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Leave empty to not use.
 * 
 * ---
 * 
 * Color > Hue Change Effect
 * 
 *   Hue Shift:
 *   - Shift hue by how much each frame?
 * 
 *   Offset Modifier:
 *   - Initial hue offset modifier for hue shift.
 * 
 * ---
 * 
 * Color > Tone Effect
 * 
 *   Color Tone(s):
 *   - What tone(s) do you want for the letters?
 *   - Format: [Red, Green, Blue, Gray]
 * 
 *   Frame Delay:
 *   - What is the frame delay between tone changes?
 * 
 *   Offset Modifier:
 *   - Initial tone offset modifier for tone change.
 * 
 *   Smooth Transition?:
 *   - Make a smooth transition for tone changes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Opacity Effects Settings
 * ============================================================================
 *
 * Setup the various settings for opacity-type Text Effects here.
 *
 * ---
 *
 * General
 * 
 *   Name:
 *   - UNIQUE name of this message text effect type.
 *   - Used in place of 'name' in \Effect<name> for text codes.
 *
 * ---
 * 
 * Opacity
 * 
 *   Base Opacity:
 *   - What is the starting opacity value?
 * 
 * ---
 * 
 * Opacity > Glow Effect
 * 
 *   Glow Rate:
 *   - What is the glow change for this effect?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Glow Speed:
 *   - What is the speed at which glow oscillates at?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Offset Modifier:
 *   - Initial opacity offset modifier for glow effect.
 * 
 * ---
 * 
 * Opacity > Intensity Pattern
 * 
 *   Custom Pattern:
 *   - Create a custom pattern with letters from a to z.
 *   - Where 'a' is transparent and 'z' is opaque.
 * 
 *   Frame Delay:
 *   - What is the frame delay between pattern updates?
 * 
 *   Offset Modifier:
 *   - Initial opacity offset modifier for pattern effect.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Positioning Effects Settings
 * ============================================================================
 *
 * Setup the various settings for positioning-type Text Effects here.
 *
 * ---
 *
 * General
 * 
 *   Name:
 *   - UNIQUE name of this message text effect type.
 *   - Used in place of 'name' in \Effect<name> for text codes.
 *
 * ---
 *
 * Positioning > Wave (Horz) Effect
 * 
 *   Distance:
 *   - Horizontal distance for wave effect.
 * 
 *   Speed Modifier:
 *   - Horizontal speed rate for wave effect.
 * 
 *   Offset Modifier:
 *   - Horizontal offset modifier for wave effect.
 * 
 * ---
 * 
 * Positioning > Wave (Vert) Effect
 * 
 *   Distance:
 *   - Vertical distance for wave effect.
 * 
 *   Speed Modifier:
 *   - Vertical speed rate for wave effect.
 * 
 *   Offset Modifier:
 *   - Vertical offset modifier for wave effect.
 * 
 * ---
 *
 * Positioning > Frantic Effect
 * 
 *   Horz Strength:
 *   - Horizontal frantic randomization strength.
 *   - Determines random horizontal position for frantic effect.
 * 
 *   Vert Strength:
 *   - Vertical frantic randomization strength.
 *   - Determines random vertical position for frantic effect.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Scaling Effects Settings
 * ============================================================================
 *
 * Setup the various settings for scaling-type Text Effects here.
 *
 * ---
 *
 * General
 * 
 *   Name:
 *   - UNIQUE name of this message text effect type.
 *   - Used in place of 'name' in \Effect<name> for text codes.
 *
 * ---
 * 
 * Scaling > Flip (Horz) Effect
 * 
 *   Speed Modifier:
 *   - Horizontal speed rate for flip effect.
 * 
 *   Offset Modifier:
 *   - Horizontal offset modifier for flip effect.
 * 
 * ---
 * 
 * Scaling > Flip (Vert) Effect
 * 
 *   Speed Modifier:
 *   - Vertical speed rate for flip effect.
 * 
 *   Offset Modifier:
 *   - Vertical offset modifier for flip effect.
 * 
 * ---
 * 
 * Scaling > Pulse (Horz) Effect
 * 
 *   Growth:
 *   - Horizontal growth pulse effect.
 * 
 *   Speed Modifier:
 *   - Horizontal speed rate for pulse effect.
 * 
 *   Offset Modifier:
 *   - Horizontal offset modifier for pulse effect.
 * 
 * ---
 * 
 * Scaling > Pulse (Vert) Effect
 * 
 *   Growth:
 *   - Vertical growth pulse effect.
 * 
 *   Speed Modifier:
 *   - Vertical speed rate for pulse effect.
 * 
 *   Offset Modifier:
 *   - Vertical offset modifier for pulse effect.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings for Animated Message Text Effects.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Animated Text Effects' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.05: September 18, 2025
 * * Bug Fixes!
 * ** Word Wrap no longer causes multiple text effects to not register. Fix
 *    made by Irina.
 * 
 * Version 1.04: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.03: March 14, 2024
 * * Compatibility Update!
 * ** Updated compatibility with VisuMZ_2_ExtMessageFunc when the button
 *    console is located at the top of the message window. Update by Irina.
 * 
 * Version 1.02: March 16, 2023
 * * Bug Fixes!
 * ** Animated text that has been sized up with \{ text codes will no longer be
 *    cut off visually, especially with larger outline effects and certain font
 *    types. Fix made by Irina.
 * 
 * Version 1.01: February 16, 2023
 * * Bug Fixes!
 * ** <Clear Effect> text code was not working properly before. Now, it should
 *    work fine and clear effects. Fix made by Irina.
 * ** Color Tone effects applied to large quantities of text should no longer
 *    cause interrupted breaks. Fix made by Irina.
 * 
 * Version 1.00 Official Release Date: February 27, 2023
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AniMsgTextEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param TextEffects
 * @text Text Effect Settings
 *
 * @param AngleEffects:arraystruct
 * @text Angle Effects
 * @parent TextEffects
 * @type struct<AngleEffect>[]
 * @desc Setup the various settings for angle-type Text Effects here.
 * @default ["{\"Name:str\":\"Swing\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.25\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowSwing\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.10\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastSwing\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.40\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"Wag\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.25\",\"PendulumOffset:num\":\"8\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowWag\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.10\",\"PendulumOffset:num\":\"8\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastWag\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.40\",\"PendulumOffset:num\":\"8\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"Jelly\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.25\",\"PendulumOffset:num\":\"15\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowJelly\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.10\",\"PendulumOffset:num\":\"15\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastJelly\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.40\",\"PendulumOffset:num\":\"12\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SpinCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-2.4\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowSpinCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-1.8\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastSpinCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-3.6\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SpinCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+2.4\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowSpinCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+1.8\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastSpinCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+3.6\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"RollCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-2.4\",\"RotationOffset:num\":\"-12\"}","{\"Name:str\":\"SlowRollCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-1.8\",\"RotationOffset:num\":\"-9\"}","{\"Name:str\":\"FastRollCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-3.6\",\"RotationOffset:num\":\"-15\"}","{\"Name:str\":\"RollCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+2.4\",\"RotationOffset:num\":\"12\"}","{\"Name:str\":\"SlowRollCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+1.8\",\"RotationOffset:num\":\"9\"}","{\"Name:str\":\"FastRollCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+3.6\",\"RotationOffset:num\":\"15\"}"]
 *
 * @param ColorEffects:arraystruct
 * @text Color Effects
 * @parent TextEffects
 * @type struct<ColorEffect>[]
 * @desc Setup the various settings for color-type Text Effects here.
 * @default ["{\"Name:str\":\"Prism\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-6\",\"InitialHueOffset:num\":\"0\"}","{\"Name:str\":\"SlowPrism\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-3\",\"InitialHueOffset:num\":\"0\"}","{\"Name:str\":\"FastPrism\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-9\",\"InitialHueOffset:num\":\"0\"}","{\"Name:str\":\"Rainbow\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-6\",\"InitialHueOffset:num\":\"36\"}","{\"Name:str\":\"SlowRainbow\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-3\",\"InitialHueOffset:num\":\"36\"}","{\"Name:str\":\"FastRainbow\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-9\",\"InitialHueOffset:num\":\"36\"}","{\"Name:str\":\"Gamer\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-6\",\"InitialHueOffset:num\":\"-216\"}","{\"Name:str\":\"SlowGamer\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-3\",\"InitialHueOffset:num\":\"-216\"}","{\"Name:str\":\"FastGamer\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-9\",\"InitialHueOffset:num\":\"-216\"}","{\"Name:str\":\"Red\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftRed\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardRed\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Green\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftGreen\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardGreen\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Blue\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftBlue\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 0, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardBlue\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 0, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Yellow\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftYellow\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 255, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardYellow\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 255, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Cyan\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftCyan\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardCyan\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Magenta\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftMagenta\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardMagenta\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"RGB\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[255, 255, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 255, 0]\\\",\\\"[255, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"20\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"SlowRGB\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[255, 255, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 255, 0]\\\",\\\"[255, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"FastRGB\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[255, 255, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 255, 0]\\\",\\\"[255, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"10\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"Fes\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"20\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SlowFes\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"FastFes\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"10\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Gig\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"20\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"SlowGig\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"FastGig\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"10\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}"]
 *
 * @param OpacityEffects:arraystruct
 * @text Opacity Effects
 * @parent TextEffects
 * @type struct<OpacityEffect>[]
 * @desc Setup the various settings for opacity-type Text Effects here.
 * @default ["{\"Name:str\":\"Glow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.25\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"SlowGlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.10\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"FastGlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.40\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Flow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.25\",\"glowOffset:num\":\"2\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"SlowFlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.10\",\"glowOffset:num\":\"2\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"FastFlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.40\",\"glowOffset:num\":\"2\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Blink\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.25\",\"glowOffset:num\":\"15\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"SlowBlink\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.10\",\"glowOffset:num\":\"30\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"FastBlink\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.40\",\"glowOffset:num\":\"8\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Campfire\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmmaaammmaaammmabcdefaaaammmmabcdefmmmaaaa\",\"patternDelay:num\":\"2\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Candle\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmmmmaaaaammmmmaaaaaabcdefgabcdefg\",\"patternDelay:num\":\"2\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Fade\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"abcdefghijklmnopqrrqponmlkjihgfedcba\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Flicker\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"nmonqnmomnmomomno\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Fluorescent\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmamammmmammamamaaamammma\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Halogen\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmnmmommommnonmmonqnmmo\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Strobe\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mamamamamama\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Torch\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmmaaaabcdefgmmmmaaaammmaamm\",\"patternDelay:num\":\"2\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Underwater\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmnnmmnnnmmnn\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}"]
 *
 * @param PositionEffects:arraystruct
 * @text Positioning Effects
 * @parent TextEffects
 * @type struct<PositionEffect>[]
 * @desc Setup the various settings for color-type Text Effects here.
 * @default ["{\"Name:str\":\"Shake\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"2\",\"ShakeStrengthVert:num\":\"2\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SoftShake\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"1\",\"ShakeStrengthVert:num\":\"1\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"HardShake\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"3\",\"ShakeStrengthVert:num\":\"3\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Shiver\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"2\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SoftShiver\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"1\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"HardShiver\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"3\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Vibe\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"2\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SoftVibe\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"1\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"HardVibe\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"3\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Stagger\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"4\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"15\"}","{\"Name:str\":\"SlowStagger\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"4\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"30\"}","{\"Name:str\":\"FastStagger\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"4\",\"WaveSpeedY:num\":\"0.50\",\"WaveOffsetY:num\":\"30\"}","{\"Name:str\":\"Saw\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.25\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowSaw\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.10\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"FastSaw\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.40\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Bounce\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowBounce\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"FastBounce\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.40\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Wave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.25\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"SlowWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.10\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"FastWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.40\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.40\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"HorzWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.25\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowHorzWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.10\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"FastHorzWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.40\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"VertWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"SlowVertWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"FastVertWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.40\",\"WaveOffsetY:num\":\"2\"}"]
 *
 * @param ScaleEffects:arraystruct
 * @text Scaling Effects
 * @parent TextEffects
 * @type struct<ScaleEffects>[]
 * @desc Setup the various settings for color-type Text Effects here.
 * @default ["{\"Name:str\":\"HorzCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.10\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowHorzCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.08\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastHorzCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.15\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"VertCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.10\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowVertCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.08\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastVertCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.15\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"HorzRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.10\",\"FlipOffsetX:num\":\"2\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowHorzRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.08\",\"FlipOffsetX:num\":\"2\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastHorzRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.15\",\"FlipOffsetX:num\":\"2\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"VertRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.10\",\"FlipOffsetY:num\":\"2\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowVertRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.08\",\"FlipOffsetY:num\":\"2\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastVertRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.15\",\"FlipOffsetY:num\":\"2\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"Pulse\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.30\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.30\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SmallPulse\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.10\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.10\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"BigPulse\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.40\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.40\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"Jiggle\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.30\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"2\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.30\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"2\"}","{\"Name:str\":\"SmallJiggle\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.10\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"2\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.10\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"2\"}","{\"Name:str\":\"BigJiggle\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.40\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"2\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.40\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"2\"}","{\"Name:str\":\"Gooey\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.30\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"33\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"-0.30\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"33\"}","{\"Name:str\":\"SmallGooey\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.10\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"33\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"-0.10\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"33\"}","{\"Name:str\":\"BigGooey\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.40\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"33\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"-0.40\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"33\"}"]
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings for Animated Message Text Effects.
 * @default {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Effects"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Angle Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AngleEffect:
 *
 * @param Name:str
 * @text Name
 * @desc UNIQUE name of this message text effect type.
 * Used in place of 'name' in \Effect<name> for text codes.
 * @default Untitled
 * 
 * @param Angles
 * 
 * @param Pendulum
 * @text Pendulum Effect
 * @parent Angles
 *
 * @param PendulumArc:num
 * @text Arc Size
 * @parent Pendulum
 * @type number
 * @desc What is the pendulum arc size?
 * @default 0
 *
 * @param PendulumSpeed:num
 * @text Speed Modifier
 * @parent Pendulum
 * @desc Arc speed rate for pendulum effect.
 * @default 0
 *
 * @param PendulumOffset:num
 * @text Offset Modifier
 * @parent Pendulum
 * @desc Arc offset modifier for pendulum effect.
 * @default 0
 * 
 * @param Rotation
 * @text Rotation Effect
 * @parent Angles
 *
 * @param RotationSpeed:num
 * @text Speed Modifier
 * @parent Rotation
 * @desc Speed to determine many angles will rotate per frame.
 * @default 0
 *
 * @param RotationOffset:num
 * @text Offset Modifier
 * @parent Rotation
 * @desc Initial angle offset modifier for rotation effect.
 * @default 0
 * 
 */
/* ----------------------------------------------------------------------------
 * Color Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ColorEffect:
 *
 * @param Name:str
 * @text Name
 * @desc UNIQUE name of this message text effect type.
 * Used in place of 'name' in \Effect<name> for text codes.
 * @default Untitled
 * 
 * @param Color
 *
 * @param ForcedColor:str
 * @text Forced Color
 * @parent Color
 * @desc Use #rrggbb for custom colors or regular numbers for text
 * colors from the Window Skin. Leave empty to not use.
 * @default 
 * 
 * @param Hue
 * @text Hue Change Effect
 * @parent Color
 *
 * @param HueShift:num
 * @text Hue Shift
 * @parent Hue
 * @desc Shift hue by how much each frame?
 * @default 0
 *
 * @param InitialHueOffset:num
 * @text Offset Modifier
 * @parent Hue
 * @desc Initial hue offset modifier for hue shift.
 * @default 0
 * 
 * @param Tone
 * @text Tone Effect
 * @parent Color
 *
 * @param colorTones:arrayeval
 * @text Color Tone(s)
 * @parent Tone
 * @type string[]
 * @desc What tone(s) do you want for the letters?
 * Format: [Red, Green, Blue, Gray]
 * @default []
 *
 * @param toneDelay:num
 * @text Frame Delay
 * @parent Tone
 * @type number
 * @desc What is the frame delay between tone changes?
 * @default 0
 *
 * @param InitialToneOffset:num
 * @text Offset Modifier
 * @parent Tone
 * @desc Initial tone offset modifier for tone change.
 * @default 0
 *
 * @param SmoothToneChange:eval
 * @text Smooth Transition?
 * @parent Tone
 * @type boolean
 * @on Smooth
 * @off Instant
 * @desc Make a smooth transition for tone changes?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Opacity Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OpacityEffect:
 *
 * @param Name:str
 * @text Name
 * @desc UNIQUE name of this message text effect type.
 * Used in place of 'name' in \Effect<name> for text codes.
 * @default Untitled
 * 
 * @param Opacity
 *
 * @param InitialOpacity:num
 * @text Base Opacity
 * @parent Opacity
 * @desc What is the starting opacity value?
 * @default 255
 * 
 * @param Glow
 * @text Glow Effect
 * @parent Opacity
 *
 * @param glowRate:num
 * @text Glow Rate
 * @parent Glow
 * @desc What is the glow change for this effect?
 * Use a decimal number between 0 and 1.
 * @default 0
 *
 * @param glowSpeed:num
 * @text Glow Speed
 * @parent Glow
 * @desc What is the speed at which glow oscillates at?
 * Use a decimal number between 0 and 1.
 * @default 0
 *
 * @param glowOffset:num
 * @text Offset Modifier
 * @parent Glow
 * @desc Initial opacity offset modifier for glow effect.
 * @default 0
 * 
 * @param Pattern
 * @text Intensity Pattern
 * @parent Opacity
 *
 * @param pattern:str
 * @text Custom Pattern
 * @parent Pattern
 * @desc Create a custom pattern with letters from a to z.
 * Where 'a' is transparent and 'z' is opaque.
 * @default 
 *
 * @param patternDelay:num
 * @text Frame Delay
 * @parent Pattern
 * @type number
 * @desc What is the frame delay between pattern updates?
 * @default 0
 *
 * @param patternOffset:num
 * @text Offset Modifier
 * @parent Pattern
 * @desc Initial opacity offset modifier for pattern effect.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Position Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PositionEffect:
 *
 * @param Name:str
 * @text Name
 * @desc UNIQUE name of this message text effect type.
 * Used in place of 'name' in \Effect<name> for text codes.
 * @default Untitled
 * 
 * @param Positioning
 * 
 * @param Shake
 * @text Frantic Effect
 * @parent Positioning
 *
 * @param ShakeStrengthHorz:num
 * @text Horz Strength
 * @parent Shake
 * @type number
 * @desc Horizontal frantic randomization strength.
 * Determines random horizontal position for frantic effect.
 * @default 0
 *
 * @param ShakeStrengthVert:num
 * @text Vert Strength
 * @parent Shake
 * @type number
 * @desc 
 * @default 0
 * 
 * @param WaveX
 * @text Wave (Horz) Effect
 * @parent Positioning
 *
 * @param WaveDistanceX:num
 * @text Distance
 * @parent WaveX
 * @type number
 * @desc Horizontal distance for wave effect.
 * @default 0
 *
 * @param WaveSpeedX:num
 * @text Speed Modifier
 * @parent WaveX
 * @desc Horizontal speed rate for wave effect.
 * @default 0
 *
 * @param WaveOffsetX:num
 * @text Offset Modifier
 * @parent WaveX
 * @desc Horizontal offset modifier for wave effect.
 * @default 0
 * 
 * @param WaveY
 * @text Wave (Vert) Effect
 * @parent Positioning
 *
 * @param WaveDistanceY:num
 * @text Distance
 * @parent WaveY
 * @type number
 * @desc Vertical distance for wave effect.
 * @default 0
 *
 * @param WaveSpeedY:num
 * @text Speed Modifier
 * @parent WaveY
 * @desc Vertical speed rate for wave effect.
 * @default 0
 *
 * @param WaveOffsetY:num
 * @text Offset Modifier
 * @parent WaveY
 * @desc Vertical offset modifier for wave effect.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Scaling Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScaleEffects:
 *
 * @param Name:str
 * @text Name
 * @desc UNIQUE name of this message text effect type.
 * Used in place of 'name' in \Effect<name> for text codes.
 * @default Untitled
 * 
 * @param Scaling
 * 
 * @param FlipX
 * @text Flip (Horz) Effect
 * @parent Scaling
 *
 * @param FlipSpeedX:num
 * @text Speed Modifier
 * @parent FlipX
 * @desc Horizontal speed rate for flip effect.
 * @default 0
 *
 * @param FlipOffsetX:num
 * @text Offset Modifier
 * @parent FlipX
 * @desc Horizontal offset modifier for flip effect.
 * @default 0
 * 
 * @param FlipY
 * @text Flip (Vert) Effect
 * @parent Scaling
 *
 * @param FlipSpeedY:num
 * @text Speed Modifier
 * @parent FlipY
 * @desc Vertical speed rate for flip effect.
 * @default 0
 *
 * @param FlipOffsetY:num
 * @text Offset Modifier
 * @parent FlipY
 * @desc Vertical offset modifier for flip effect.
 * @default 0
 * 
 * @param PulseX
 * @text Pulse (Horz) Effect
 * @parent Scaling
 *
 * @param PulseGrowthX:num
 * @text Growth
 * @parent PulseX
 * @desc Horizontal growth pulse effect.
 * @default 0
 *
 * @param PulseSpeedX:num
 * @text Speed Modifier
 * @parent PulseX
 * @desc Horizontal speed rate for pulse effect.
 * @default 0
 *
 * @param PulseOffsetX:num
 * @text Offset Modifier
 * @parent PulseX
 * @desc Horizontal offset modifier for pulse effect.
 * @default 0
 * 
 * @param PulseY
 * @text Pulse (Vert) Effect
 * @parent Scaling
 *
 * @param PulseGrowthY:num
 * @text Growth
 * @parent PulseY
 * @desc Vertical growth pulse effect.
 * @default 0
 *
 * @param PulseSpeedY:num
 * @text Speed Modifier
 * @parent PulseY
 * @desc Vertical speed rate for pulse effect.
 * @default 0
 *
 * @param PulseOffsetY:num
 * @text Offset Modifier
 * @parent PulseY
 * @desc Vertical offset modifier for pulse effect.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Effects' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Text Effects
 *
 */
//=============================================================================

const _0x2f7f5b=_0x13db;(function(_0x4e403a,_0x33291d){const _0x31ed3f=_0x13db,_0xc4da30=_0x4e403a();while(!![]){try{const _0x481f08=parseInt(_0x31ed3f(0x21f))/0x1+-parseInt(_0x31ed3f(0x20a))/0x2*(-parseInt(_0x31ed3f(0x242))/0x3)+parseInt(_0x31ed3f(0x2d4))/0x4+parseInt(_0x31ed3f(0x216))/0x5*(-parseInt(_0x31ed3f(0x261))/0x6)+parseInt(_0x31ed3f(0x293))/0x7+-parseInt(_0x31ed3f(0x217))/0x8*(parseInt(_0x31ed3f(0x1ef))/0x9)+parseInt(_0x31ed3f(0x280))/0xa*(-parseInt(_0x31ed3f(0x2b7))/0xb);if(_0x481f08===_0x33291d)break;else _0xc4da30['push'](_0xc4da30['shift']());}catch(_0x46bc16){_0xc4da30['push'](_0xc4da30['shift']());}}}(_0x2fd0,0x95e4b));function _0x2fd0(){const _0x4e71c2=['_textEffectData','replace','_flipScaleX','ConfigManager_makeData','Window_Options_addGeneralOptions','Settings','PendulumArc','VisuMZ_2_ExtMessageFunc','updateAngleEffects','ScaleEffects','ARRAYEVAL','close','applyAngleModifiers','_textWidth','updatePulseX','toUpperCase','updateFlipY','addTemplatetextEffectsCommand','_rotationAngle','convertTextEffectEscapeCodes','random','postFlushTextState','stringify','SmoothToneChange','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','processEscapeCharacter','parse','anchor','updateScaleEffects','33rbXLYd','WaveDistanceY','createTextBitmap','PulseGrowthX','filter','trim','open','PendulumOffset','_targetOpacity','updatePositionEffects','BUTTON_HEIGHT','_msgWindow','InitialToneOffset','WaveSpeedX','setFrame','max','return\x200','AddOption','addChild','glowOffset','updateRotationAngle','ceil','Effects','preConvertEscapeCharacters','AngleEffects','_flipScaleY','addGeneralOptions','setTextEffectContainer','PulseOffsetY','3600580ikSfQa','updateOpacityEffects','createIconBitmap','6660otyvmU','Window_Base_preConvertEscapeCharacters','PulseGrowthY','setupLocation','getColor','exit','padding','Window_Message_preFlushTextState','createEffectData','updateRandomShake','WaveDistanceX','Window_Message_initMembers','ARRAYJSON','EFFECT','Window_Message_close','addWindow','process_VisuMZ_AniMsgTextEffects','setHue','iconIndex','processDrawIconTextEffect','_AniMsgTextEffectsContainer','paintOpacity','constructor','playMessageSound','_pulseScaleX','_textHeight','processDrawIcon','10GcETeG','_textEffectReturnState','untitled','addTextEffectsCommands','readFlag','Options','_pulseScaleY','initialize','updatePendulumnAngle','call','FlipOffsetX','WaveSpeedY','12830fLlhVo','2168PscGNv','charCodeAt','floor','randomInt','updateFlipX','createAniMsgTextEffectsContainer','glowSpeed','ShakeStrengthHorz','382943WhBZZQ','updateHueShift','Window_Message_processEscapeCharacter','AniMsgTextEffects','PulseOffsetX','log','_offset','updateWaveY','description','colorTones','CLEAREFFECT','onDatabaseLoaded','ForcedColor','contents','applyData','WaveOffsetX','InitialHueOffset','moveCustomMessageCursorPauseSign','newPage','_toneIndex','createAllWindows','textColor','iconHeight','Window_Message_newPage','setColorTone','children','setupScaleModifiers','applyColorModifiers','Scene_Boot_onDatabaseLoaded','status','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','effectData','PulseSpeedY','ConfigManager_applyData','updateColorEffects','104238SLPIhn','_patternIndex','preFlushTextState','split','FlipSpeedX','setupOpacityModifiers','addCommand','updateWaveX','Window_Message','fontBold','_hueValue','round','toLowerCase','fontItalic','angle','updateOriginPosition','buffer','name','applyOpacityModifiers','ARRAYSTR','setupColorModifiers','show','makeData','OpacityEffects','update','cos','RotationOffset','ConvertParams','height','standardIconWidth','_currentTone','1770OjLTpB','toneDelay','match','includes','#%1','updateOpacityPatternEffect','updatePulseY','format','FlipSpeedY','clone','iconWidth','bitmap','scale','PositionEffects','createBitmap','center','_pendulumAngle','ShakeStrengthVert','map','_baseScale','Window_Message_open','RotationSpeed','prototype','pattern','clearTextEffects','drawing','hide','NUM','version','length','glowRate','1247810vpDRah','destroy','_textState','InitialOpacity','applyScaleModifiers','removeChild','Name','JSON','\x1bCLEAREFFECT[0]','setupAngleModifiers','ColorEffects','patternDelay','updateGlowEffect','Scene_Message_createAllWindows','PendulumSpeed','textEffects','obtainEscapeString','PulseSpeedX','POSITION','3422986WqPUGR','FlipOffsetY','Window_Message_postFlushTextState','_textEffect','textWidth','frameCount','WaveOffsetY'];_0x2fd0=function(){return _0x4e71c2;};return _0x2fd0();}function _0x13db(_0x387d06,_0x14eea5){const _0x2fd07b=_0x2fd0();return _0x13db=function(_0x13dbf1,_0x34b797){_0x13dbf1=_0x13dbf1-0x1ee;let _0x54a6f3=_0x2fd07b[_0x13dbf1];return _0x54a6f3;},_0x13db(_0x387d06,_0x14eea5);}var label='AniMsgTextEffects',tier=tier||0x0,dependencies=['VisuMZ_1_MessageCore'],pluginData=$plugins[_0x2f7f5b(0x2bb)](function(_0x438b1d){const _0x1a02a6=_0x2f7f5b;return _0x438b1d[_0x1a02a6(0x23c)]&&_0x438b1d[_0x1a02a6(0x227)][_0x1a02a6(0x264)]('['+label+']');})[0x0];VisuMZ[label][_0x2f7f5b(0x29f)]=VisuMZ[label][_0x2f7f5b(0x29f)]||{},VisuMZ[_0x2f7f5b(0x25d)]=function(_0x2909d1,_0xaf8498){const _0x486049=_0x2f7f5b;for(const _0x5f5b1f in _0xaf8498){if(_0x5f5b1f[_0x486049(0x263)](/(.*):(.*)/i)){const _0x531016=String(RegExp['$1']),_0x22e37c=String(RegExp['$2'])[_0x486049(0x2a9)]()[_0x486049(0x2bc)]();let _0x333ee4,_0x3c7ea4,_0x5e0e9f;switch(_0x22e37c){case _0x486049(0x27c):_0x333ee4=_0xaf8498[_0x5f5b1f]!==''?Number(_0xaf8498[_0x5f5b1f]):0x0;break;case'ARRAYNUM':_0x3c7ea4=_0xaf8498[_0x5f5b1f]!==''?JSON[_0x486049(0x2b4)](_0xaf8498[_0x5f5b1f]):[],_0x333ee4=_0x3c7ea4['map'](_0x51ee0d=>Number(_0x51ee0d));break;case'EVAL':_0x333ee4=_0xaf8498[_0x5f5b1f]!==''?eval(_0xaf8498[_0x5f5b1f]):null;break;case _0x486049(0x2a4):_0x3c7ea4=_0xaf8498[_0x5f5b1f]!==''?JSON[_0x486049(0x2b4)](_0xaf8498[_0x5f5b1f]):[],_0x333ee4=_0x3c7ea4[_0x486049(0x273)](_0x1a5e06=>eval(_0x1a5e06));break;case _0x486049(0x287):_0x333ee4=_0xaf8498[_0x5f5b1f]!==''?JSON[_0x486049(0x2b4)](_0xaf8498[_0x5f5b1f]):'';break;case _0x486049(0x1fb):_0x3c7ea4=_0xaf8498[_0x5f5b1f]!==''?JSON[_0x486049(0x2b4)](_0xaf8498[_0x5f5b1f]):[],_0x333ee4=_0x3c7ea4[_0x486049(0x273)](_0x5a38b4=>JSON[_0x486049(0x2b4)](_0x5a38b4));break;case'FUNC':_0x333ee4=_0xaf8498[_0x5f5b1f]!==''?new Function(JSON['parse'](_0xaf8498[_0x5f5b1f])):new Function(_0x486049(0x2c7));break;case'ARRAYFUNC':_0x3c7ea4=_0xaf8498[_0x5f5b1f]!==''?JSON['parse'](_0xaf8498[_0x5f5b1f]):[],_0x333ee4=_0x3c7ea4['map'](_0x370c0e=>new Function(JSON[_0x486049(0x2b4)](_0x370c0e)));break;case'STR':_0x333ee4=_0xaf8498[_0x5f5b1f]!==''?String(_0xaf8498[_0x5f5b1f]):'';break;case _0x486049(0x255):_0x3c7ea4=_0xaf8498[_0x5f5b1f]!==''?JSON[_0x486049(0x2b4)](_0xaf8498[_0x5f5b1f]):[],_0x333ee4=_0x3c7ea4[_0x486049(0x273)](_0xbba43d=>String(_0xbba43d));break;case'STRUCT':_0x5e0e9f=_0xaf8498[_0x5f5b1f]!==''?JSON['parse'](_0xaf8498[_0x5f5b1f]):{},_0x333ee4=VisuMZ[_0x486049(0x25d)]({},_0x5e0e9f);break;case'ARRAYSTRUCT':_0x3c7ea4=_0xaf8498[_0x5f5b1f]!==''?JSON[_0x486049(0x2b4)](_0xaf8498[_0x5f5b1f]):[],_0x333ee4=_0x3c7ea4[_0x486049(0x273)](_0x387844=>VisuMZ[_0x486049(0x25d)]({},JSON[_0x486049(0x2b4)](_0x387844)));break;default:continue;}_0x2909d1[_0x531016]=_0x333ee4;}}return _0x2909d1;},(_0xb76c5b=>{const _0x3bbf93=_0x2f7f5b,_0x21484c=_0xb76c5b['name'];for(const _0x2bdc6a of dependencies){if(!Imported[_0x2bdc6a]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x21484c,_0x2bdc6a)),SceneManager[_0x3bbf93(0x1f4)]();break;}}const _0x1abfc8=_0xb76c5b[_0x3bbf93(0x227)];if(_0x1abfc8[_0x3bbf93(0x263)](/\[Version[ ](.*?)\]/i)){const _0x8b2e59=Number(RegExp['$1']);_0x8b2e59!==VisuMZ[label][_0x3bbf93(0x27d)]&&(alert(_0x3bbf93(0x23d)[_0x3bbf93(0x268)](_0x21484c,_0x8b2e59)),SceneManager[_0x3bbf93(0x1f4)]());}if(_0x1abfc8[_0x3bbf93(0x263)](/\[Tier[ ](\d+)\]/i)){const _0x36d8cc=Number(RegExp['$1']);_0x36d8cc<tier?(alert(_0x3bbf93(0x2b2)[_0x3bbf93(0x268)](_0x21484c,_0x36d8cc,tier)),SceneManager[_0x3bbf93(0x1f4)]()):tier=Math['max'](_0x36d8cc,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x3bbf93(0x29f)],_0xb76c5b['parameters']);})(pluginData),VisuMZ[_0x2f7f5b(0x222)][_0x2f7f5b(0x23b)]=Scene_Boot[_0x2f7f5b(0x277)][_0x2f7f5b(0x22a)],Scene_Boot[_0x2f7f5b(0x277)][_0x2f7f5b(0x22a)]=function(){const _0x4a779d=_0x2f7f5b;VisuMZ[_0x4a779d(0x222)][_0x4a779d(0x23b)][_0x4a779d(0x213)](this),this[_0x4a779d(0x1ff)]();},VisuMZ[_0x2f7f5b(0x222)][_0x2f7f5b(0x2cd)]={},Scene_Boot[_0x2f7f5b(0x277)][_0x2f7f5b(0x1ff)]=function(){const _0x4270f5=_0x2f7f5b,_0x4a5e11=[_0x4270f5(0x2cf),_0x4270f5(0x28a),_0x4270f5(0x259),_0x4270f5(0x26e),_0x4270f5(0x2a3)];for(const _0x1fe6f2 of _0x4a5e11){for(const _0x2e150c of VisuMZ[_0x4270f5(0x222)][_0x4270f5(0x29f)][_0x1fe6f2]){if(!_0x2e150c)continue;const _0x3e4e18=_0x2e150c[_0x4270f5(0x286)]['toLowerCase']()[_0x4270f5(0x2bc)]();if(_0x3e4e18==='')continue;if(_0x3e4e18===_0x4270f5(0x20c))continue;VisuMZ['AniMsgTextEffects'][_0x4270f5(0x2cd)][_0x3e4e18]=VisuMZ[_0x4270f5(0x222)][_0x4270f5(0x2cd)][_0x3e4e18]||{};const _0x53d1e0=VisuMZ[_0x4270f5(0x222)][_0x4270f5(0x2cd)][_0x3e4e18];for(const _0x48580a in _0x2e150c){_0x53d1e0[_0x48580a]=_0x2e150c[_0x48580a];}if(_0x3e4e18===_0x4270f5(0x257))console[_0x4270f5(0x224)](_0x53d1e0);}}},ConfigManager[_0x2f7f5b(0x28f)]=!![],VisuMZ[_0x2f7f5b(0x222)][_0x2f7f5b(0x29d)]=ConfigManager[_0x2f7f5b(0x258)],ConfigManager['makeData']=function(){const _0x3ab5e4=_0x2f7f5b,_0x5d595d=VisuMZ['AniMsgTextEffects'][_0x3ab5e4(0x29d)][_0x3ab5e4(0x213)](this);return _0x5d595d[_0x3ab5e4(0x28f)]=this[_0x3ab5e4(0x28f)],_0x5d595d;},VisuMZ['AniMsgTextEffects']['ConfigManager_applyData']=ConfigManager[_0x2f7f5b(0x22d)],ConfigManager[_0x2f7f5b(0x22d)]=function(_0x2de7f8){const _0x2ae82b=_0x2f7f5b;VisuMZ[_0x2ae82b(0x222)][_0x2ae82b(0x240)][_0x2ae82b(0x213)](this,_0x2de7f8),this[_0x2ae82b(0x20e)](_0x2de7f8,_0x2ae82b(0x28f),!![]),_0x2ae82b(0x28f)in _0x2de7f8?this[_0x2ae82b(0x28f)]=_0x2de7f8['textEffects']:this[_0x2ae82b(0x28f)]=!![];},ColorManager[_0x2f7f5b(0x1f3)]=function(_0x48cd23){const _0x2b166c=_0x2f7f5b;return _0x48cd23=String(_0x48cd23),_0x48cd23[_0x2b166c(0x263)](/#(.*)/i)?_0x2b166c(0x265)[_0x2b166c(0x268)](String(RegExp['$1'])):this[_0x2b166c(0x234)](Number(_0x48cd23));},TextManager[_0x2f7f5b(0x28f)]=VisuMZ['AniMsgTextEffects'][_0x2f7f5b(0x29f)][_0x2f7f5b(0x20f)][_0x2f7f5b(0x286)]||'',VisuMZ[_0x2f7f5b(0x222)][_0x2f7f5b(0x28d)]=Scene_Message[_0x2f7f5b(0x277)][_0x2f7f5b(0x233)],Scene_Message['prototype'][_0x2f7f5b(0x233)]=function(){const _0x48797a=_0x2f7f5b;VisuMZ[_0x48797a(0x222)]['Scene_Message_createAllWindows'][_0x48797a(0x213)](this),this['createAniMsgTextEffectsContainer']();},Scene_Message['prototype'][_0x2f7f5b(0x21c)]=function(){const _0x54b65e=_0x2f7f5b;this[_0x54b65e(0x203)]=new Sprite(),this[_0x54b65e(0x1fe)](this[_0x54b65e(0x203)]),this['_messageWindow'][_0x54b65e(0x2d2)](this[_0x54b65e(0x203)]);};function Sprite_TextEffect(){const _0x1ca768=_0x2f7f5b;this[_0x1ca768(0x211)](...arguments);}Sprite_TextEffect[_0x2f7f5b(0x277)]=Object['create'](Sprite['prototype']),Sprite_TextEffect['prototype'][_0x2f7f5b(0x205)]=Sprite_TextEffect,Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x211)]=function(_0x302204,_0x513cd4,_0x5de3f1){const _0x36d9dd=_0x2f7f5b;this[_0x36d9dd(0x2c2)]=_0x302204,this[_0x36d9dd(0x296)]=_0x302204[_0x36d9dd(0x296)],this['_textState']=JSON['parse'](JSON[_0x36d9dd(0x2b0)](_0x513cd4)),this[_0x36d9dd(0x225)]=_0x5de3f1,Sprite[_0x36d9dd(0x277)][_0x36d9dd(0x211)][_0x36d9dd(0x213)](this),this[_0x36d9dd(0x1f2)](),this[_0x36d9dd(0x26f)](),this[_0x36d9dd(0x1f7)](),this[_0x36d9dd(0x25a)]();},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x1f2)]=function(){const _0x2f9832=_0x2f7f5b;if(this[_0x2f9832(0x282)][_0x2f9832(0x201)]!==undefined){const _0x5c957c=ImageManager[_0x2f9832(0x25f)]||0x20,_0x9e0959=ImageManager['standardIconHeight']||0x20;this['_textWidth']=_0x5c957c+0x4,this[_0x2f9832(0x208)]=_0x9e0959+0x4;}else{const _0x230141=this[_0x2f9832(0x282)]['buffer'];this[_0x2f9832(0x2a7)]=this[_0x2f9832(0x2c2)][_0x2f9832(0x297)](_0x230141),this[_0x2f9832(0x208)]=this[_0x2f9832(0x282)]['height'];}this[_0x2f9832(0x2b5)]['x']=0.5,this[_0x2f9832(0x2b5)]['y']=0.5;},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x26f)]=function(){const _0x5ead2b=_0x2f7f5b;this[_0x5ead2b(0x282)][_0x5ead2b(0x201)]!==undefined?this[_0x5ead2b(0x1ee)]():this[_0x5ead2b(0x2b9)]();},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x1ee)]=function(){const _0x1b7bd9=_0x2f7f5b;this[_0x1b7bd9(0x26c)]=ImageManager['loadSystem']('IconSet');const _0x197039=ImageManager[_0x1b7bd9(0x26b)],_0x5bbac7=ImageManager[_0x1b7bd9(0x235)],_0x5827b7=this[_0x1b7bd9(0x282)][_0x1b7bd9(0x201)]%0x10*_0x197039,_0x5e4dd9=Math[_0x1b7bd9(0x219)](this[_0x1b7bd9(0x282)]['iconIndex']/0x10)*_0x5bbac7;this[_0x1b7bd9(0x2c5)](_0x5827b7,_0x5e4dd9,_0x197039,_0x5bbac7);},Sprite_TextEffect['prototype']['createTextBitmap']=function(){const _0x9fe32f=_0x2f7f5b,_0x4fdd29=this[_0x9fe32f(0x282)][_0x9fe32f(0x252)];let _0x5266ee=Math[_0x9fe32f(0x2cc)](this[_0x9fe32f(0x2c2)]['textWidth'](_0x4fdd29)*1.5),_0x5a7332=Math['ceil'](this[_0x9fe32f(0x282)][_0x9fe32f(0x25e)]*1.5);this[_0x9fe32f(0x26c)]=new Bitmap(_0x5266ee,_0x5a7332);const _0xfe766f=this['_msgWindow'][_0x9fe32f(0x22c)],_0x4b56e5=['fontFace','fontSize',_0x9fe32f(0x24b),_0x9fe32f(0x24f),_0x9fe32f(0x234),'outLineColor','outlineWidth',_0x9fe32f(0x204)];for(const _0x16959d of _0x4b56e5){this['bitmap'][_0x16959d]=_0xfe766f[_0x16959d];}const _0x65e85a=this[_0x9fe32f(0x23e)]();_0x65e85a[_0x9fe32f(0x22b)]!==undefined&&_0x65e85a[_0x9fe32f(0x22b)]!==''&&(this[_0x9fe32f(0x26c)][_0x9fe32f(0x234)]=ColorManager[_0x9fe32f(0x1f3)](_0x65e85a[_0x9fe32f(0x22b)])),this['bitmap']['drawText'](_0x4fdd29,0x0,0x0,_0x5266ee,_0x5a7332,_0x9fe32f(0x270));},Sprite_TextEffect['prototype'][_0x2f7f5b(0x1f7)]=function(){const _0x4f018d=_0x2f7f5b;this[_0x4f018d(0x29a)]={},this['_textEffect']=this[_0x4f018d(0x296)][_0x4f018d(0x29b)](/\x1b/gi,''),this[_0x4f018d(0x296)]=this['_textEffect'][_0x4f018d(0x29b)](/WrapBreak\[0\]/gi,'');const _0xfa36eb=this[_0x4f018d(0x296)][_0x4f018d(0x245)](',')[_0x4f018d(0x273)](_0x5dfba2=>_0x5dfba2[_0x4f018d(0x24e)]()['trim']());for(const _0xb30521 of _0xfa36eb){const _0xb7cff6=VisuMZ[_0x4f018d(0x222)][_0x4f018d(0x2cd)][_0xb30521];if(!_0xb7cff6)continue;for(const _0x1aebe3 in _0xb7cff6){this['_textEffectData'][_0x1aebe3]=_0xb7cff6[_0x1aebe3];}}},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x23e)]=function(){const _0x2e15fc=_0x2f7f5b;if(this[_0x2e15fc(0x29a)]===undefined)this[_0x2e15fc(0x1f7)]();return this[_0x2e15fc(0x29a)]||{};},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x25a)]=function(){const _0x817a84=_0x2f7f5b;Sprite[_0x817a84(0x277)][_0x817a84(0x25a)][_0x817a84(0x213)](this),this[_0x817a84(0x2c0)](),this[_0x817a84(0x2a2)](),this[_0x817a84(0x2b6)](),this[_0x817a84(0x2d5)](),this[_0x817a84(0x241)]();},Sprite_TextEffect[_0x2f7f5b(0x277)]['updatePositionEffects']=function(){const _0x20ead4=_0x2f7f5b;this[_0x20ead4(0x251)](),this['updateRandomShake'](),this['updateWaveX'](),this[_0x20ead4(0x226)]();},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x251)]=function(){const _0x597987=_0x2f7f5b;this['x']=this[_0x597987(0x282)]['x'],this['x']+=this[_0x597987(0x2c2)]['x']+this['_msgWindow'][_0x597987(0x1f5)],this['x']+=this[_0x597987(0x2a7)]/0x2,this['y']=this[_0x597987(0x282)]['y'],this['y']+=this[_0x597987(0x2c2)]['y']+this[_0x597987(0x2c2)]['padding'],this['y']+=this[_0x597987(0x208)]/0x2;if(this['isTopButtonConsolePosition']()){const _0x19197c=Window_ButtonConsole[_0x597987(0x2c1)]||0x0;this['y']+=_0x19197c;}},Sprite_TextEffect['prototype']['isTopButtonConsolePosition']=function(){const _0x35168b=_0x2f7f5b;if(!Imported[_0x35168b(0x2a1)])return![];return Window_ButtonConsole[_0x35168b(0x292)]['toLowerCase']()[_0x35168b(0x2bc)]()==='top';},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x1f8)]=function(){const _0x1303c5=_0x2f7f5b,_0x4a15ed=this[_0x1303c5(0x23e)](),_0x324cf0=_0x4a15ed[_0x1303c5(0x21e)]??0x0,_0x1a4766=_0x4a15ed[_0x1303c5(0x272)]??0x0;if(_0x324cf0===0x0&&_0x1a4766===0x0)return;this['x']+=Math['randomInt'](_0x324cf0+0x1)*(Math[_0x1303c5(0x2ae)]()<0.5?-0x1:0x1),this['y']+=Math[_0x1303c5(0x21a)](_0x1a4766+0x1)*(Math['random']()<0.5?-0x1:0x1);},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x249)]=function(){const _0x4a5a7b=_0x2f7f5b,_0x505af2=this[_0x4a5a7b(0x23e)](),_0x51fb61=_0x505af2[_0x4a5a7b(0x1f9)]??0x0;if(_0x51fb61===0x0)return;const _0x31d16b=_0x505af2[_0x4a5a7b(0x2c4)]??0x0;if(_0x31d16b===0x0)return;const _0x43c120=_0x505af2[_0x4a5a7b(0x22e)]??0x0,_0x59b535=Graphics[_0x4a5a7b(0x298)]+_0x43c120*this['_offset'];this['x']+=Math['round'](Math['cos'](_0x59b535*_0x31d16b)*_0x51fb61);},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x226)]=function(){const _0x42d928=_0x2f7f5b,_0x133a0d=this[_0x42d928(0x23e)](),_0x4d3b53=_0x133a0d[_0x42d928(0x2b8)]??0x0;if(_0x4d3b53===0x0)return;const _0x2fe88c=_0x133a0d[_0x42d928(0x215)]??0x0;if(_0x2fe88c===0x0)return;const _0x55ddb6=_0x133a0d[_0x42d928(0x299)]??0x0,_0x45ab4b=Graphics[_0x42d928(0x298)]+_0x55ddb6*this['_offset'];this['y']+=Math[_0x42d928(0x24d)](Math[_0x42d928(0x25b)](_0x45ab4b*_0x2fe88c)*_0x4d3b53);},Sprite_TextEffect[_0x2f7f5b(0x277)]['updateAngleEffects']=function(){const _0x32b8c0=_0x2f7f5b;this[_0x32b8c0(0x289)](),this['updatePendulumnAngle'](),this[_0x32b8c0(0x2cb)](),this[_0x32b8c0(0x2a6)]();},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x289)]=function(){const _0x40d12c=_0x2f7f5b;this['_baseAngle']=0x0,this[_0x40d12c(0x271)]=0x0;},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x212)]=function(){const _0x4b9d1b=_0x2f7f5b,_0x283fb8=this[_0x4b9d1b(0x23e)](),_0x49970f=_0x283fb8[_0x4b9d1b(0x2a0)]??0x0;if(_0x49970f===0x0)return;const _0xffe93e=_0x283fb8[_0x4b9d1b(0x28e)]??0x0;if(_0xffe93e===0x0)return;const _0x3d7003=_0x283fb8[_0x4b9d1b(0x2be)]??0x0,_0x55e0c6=Graphics['frameCount']+_0x3d7003*this[_0x4b9d1b(0x225)];this[_0x4b9d1b(0x271)]=Math[_0x4b9d1b(0x24d)](Math['cos'](_0x55e0c6*_0xffe93e)*_0x49970f);},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x2cb)]=function(){const _0xce2604=_0x2f7f5b,_0x2257da=this[_0xce2604(0x23e)](),_0x24f273=_0x2257da[_0xce2604(0x276)]??0x0;if(_0x24f273===0x0)return;const _0x403633=(_0x2257da[_0xce2604(0x25c)]??0x0)*this[_0xce2604(0x225)];this[_0xce2604(0x2ac)]=this[_0xce2604(0x2ac)]??_0x403633,this[_0xce2604(0x2ac)]-=_0x24f273;while(this['_rotationAngle']>0x168)this[_0xce2604(0x2ac)]-=0x168;while(this[_0xce2604(0x2ac)]<0x0)this[_0xce2604(0x2ac)]+=0x168;},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x2a6)]=function(){const _0x5499b6=_0x2f7f5b;let _0x2edd7c=this['_baseAngle'];_0x2edd7c+=this['_pendulumAngle'];this[_0x5499b6(0x2ac)]!==undefined&&(_0x2edd7c+=this[_0x5499b6(0x2ac)]);if(this['angle']!==_0x2edd7c)this[_0x5499b6(0x250)]=_0x2edd7c;},Sprite_TextEffect['prototype'][_0x2f7f5b(0x2b6)]=function(){const _0x39ca8a=_0x2f7f5b;this[_0x39ca8a(0x239)](),this[_0x39ca8a(0x21b)](),this['updateFlipY'](),this[_0x39ca8a(0x2a8)](),this[_0x39ca8a(0x267)](),this[_0x39ca8a(0x284)]();},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x239)]=function(){const _0x53ae02=_0x2f7f5b;this[_0x53ae02(0x274)]=0x1,this[_0x53ae02(0x2c2)]&&(this[_0x53ae02(0x274)]*=Math[_0x53ae02(0x2c6)](this[_0x53ae02(0x2c2)][_0x53ae02(0x26d)]['x'],this['_msgWindow']['scale']['y'])),this['_flipScaleX']=0x1,this[_0x53ae02(0x2d0)]=0x1,this[_0x53ae02(0x207)]=0x1,this['_pulseScaleY']=0x1;},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x21b)]=function(){const _0x33bf42=_0x2f7f5b,_0x2dea35=this[_0x33bf42(0x23e)](),_0x1c5cb7=_0x2dea35[_0x33bf42(0x246)]??0x0;if(_0x1c5cb7===0x0)return;const _0x15d72b=_0x2dea35[_0x33bf42(0x214)]??0x0,_0x3fa84a=Graphics['frameCount']+_0x15d72b*this[_0x33bf42(0x225)];this[_0x33bf42(0x29c)]=Math[_0x33bf42(0x25b)](_0x3fa84a*_0x1c5cb7);},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x2aa)]=function(){const _0x1f9f17=_0x2f7f5b,_0x11c15a=this['effectData'](),_0xe06237=_0x11c15a[_0x1f9f17(0x269)]??0x0;if(_0xe06237===0x0)return;const _0x35332c=_0x11c15a[_0x1f9f17(0x294)]??0x0,_0x590b87=Graphics[_0x1f9f17(0x298)]+_0x35332c*this[_0x1f9f17(0x225)];this[_0x1f9f17(0x2d0)]=Math[_0x1f9f17(0x25b)](_0x590b87*_0xe06237);},Sprite_TextEffect['prototype'][_0x2f7f5b(0x2a8)]=function(){const _0x5a0b0f=_0x2f7f5b,_0x2fc8ba=this['effectData'](),_0x19a590=(_0x2fc8ba[_0x5a0b0f(0x2ba)]??0x0)/0x2;if(_0x19a590===0x0)return;const _0x4cdcdf=_0x2fc8ba[_0x5a0b0f(0x291)]??0x0;if(_0x4cdcdf===0x0)return;const _0x5ba42a=_0x2fc8ba[_0x5a0b0f(0x223)]??0x0,_0x3b1414=Graphics[_0x5a0b0f(0x298)]+_0x5ba42a*this[_0x5a0b0f(0x225)];this['_pulseScaleX']+=Math[_0x5a0b0f(0x25b)](_0x3b1414*_0x4cdcdf)*_0x19a590;},Sprite_TextEffect['prototype'][_0x2f7f5b(0x267)]=function(){const _0x3512e4=_0x2f7f5b,_0x3f9899=this[_0x3512e4(0x23e)](),_0x28b856=(_0x3f9899[_0x3512e4(0x1f1)]??0x0)/0x2;if(_0x28b856===0x0)return;const _0x4452ae=_0x3f9899[_0x3512e4(0x23f)]??0x0;if(_0x4452ae===0x0)return;const _0x2f7ad3=_0x3f9899[_0x3512e4(0x2d3)]??0x0,_0x3b6dbe=Graphics[_0x3512e4(0x298)]+_0x2f7ad3*this[_0x3512e4(0x225)];this['_pulseScaleY']+=Math[_0x3512e4(0x25b)](_0x3b6dbe*_0x4452ae)*_0x28b856;},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x284)]=function(){const _0x6db394=_0x2f7f5b;let _0x2f5098=this[_0x6db394(0x274)];_0x2f5098*=this[_0x6db394(0x29c)],_0x2f5098*=this[_0x6db394(0x207)];let _0x445e7e=this[_0x6db394(0x274)];_0x445e7e*=this[_0x6db394(0x2d0)],_0x445e7e*=this[_0x6db394(0x210)];if(this['scale']['x']!==_0x2f5098)this['scale']['x']=_0x2f5098;if(this[_0x6db394(0x26d)]['y']!==_0x445e7e)this['scale']['y']=_0x445e7e;},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x2d5)]=function(){const _0x4f3b6c=_0x2f7f5b;this[_0x4f3b6c(0x247)](),this[_0x4f3b6c(0x266)](),this[_0x4f3b6c(0x28c)](),this[_0x4f3b6c(0x254)]();},Sprite_TextEffect[_0x2f7f5b(0x277)]['setupOpacityModifiers']=function(){const _0x2bf15f=_0x2f7f5b,_0xfdd985=this['effectData']();this[_0x2bf15f(0x2bf)]=_0xfdd985[_0x2bf15f(0x283)]??0xff;},Sprite_TextEffect['prototype'][_0x2f7f5b(0x266)]=function(){const _0x2cdd48=_0x2f7f5b,_0x2039c5=this[_0x2cdd48(0x23e)](),_0x472f09=(_0x2039c5[_0x2cdd48(0x278)]??'')[_0x2cdd48(0x24e)]()[_0x2cdd48(0x2bc)]();if(_0x472f09==='')return;if(_0x472f09===undefined)return;const _0x167452=Math[_0x2cdd48(0x2c6)](_0x2039c5[_0x2cdd48(0x28b)]??0x1,0x1),_0x5a2f12=_0x2039c5['patternOffset']??0x0,_0x285ae=Graphics[_0x2cdd48(0x298)];this['_patternIndex']=this['_patternIndex']??_0x5a2f12*this[_0x2cdd48(0x225)];while(this[_0x2cdd48(0x243)]>=_0x472f09['length'])this[_0x2cdd48(0x243)]-=_0x472f09[_0x2cdd48(0x27e)];while(this[_0x2cdd48(0x243)]<0x0)this[_0x2cdd48(0x243)]+=_0x472f09['length'];const _0x12cfe6=(_0x472f09[_0x2cdd48(0x218)](this['_patternIndex'])-0x61)['clamp'](0x0,0x19),_0x706514=_0x12cfe6/0x19;this[_0x2cdd48(0x2bf)]*=_0x706514;if(_0x285ae%_0x167452===0x0){this[_0x2cdd48(0x243)]++;while(this['_patternIndex']>=_0x472f09[_0x2cdd48(0x27e)])this[_0x2cdd48(0x243)]-=_0x472f09[_0x2cdd48(0x27e)];}},Sprite_TextEffect[_0x2f7f5b(0x277)]['updateGlowEffect']=function(){const _0x1c5ecd=_0x2f7f5b,_0x5db15f=this[_0x1c5ecd(0x23e)](),_0x19bbb5=(_0x5db15f[_0x1c5ecd(0x27f)]??0x0)/0x2*0xff;if(_0x19bbb5===0x0)return;const _0x4e0de5=_0x5db15f[_0x1c5ecd(0x21d)]??0x0;if(_0x4e0de5===0x0)return;const _0xc739bb=_0x5db15f[_0x1c5ecd(0x2ca)]??0x0,_0x177be1=Graphics[_0x1c5ecd(0x298)]+_0xc739bb*this[_0x1c5ecd(0x225)];this[_0x1c5ecd(0x2bf)]+=Math[_0x1c5ecd(0x24d)](Math['cos'](_0x177be1*_0x4e0de5)*_0x19bbb5-_0x19bbb5);},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x254)]=function(){const _0x42dcf7=_0x2f7f5b;this['opacity']=this[_0x42dcf7(0x2bf)];},Sprite_TextEffect[_0x2f7f5b(0x277)]['updateColorEffects']=function(){const _0x2d0739=_0x2f7f5b;this[_0x2d0739(0x256)](),this['updateHueShift'](),this['updateToneShift'](),this[_0x2d0739(0x23a)]();},Sprite_TextEffect['prototype'][_0x2f7f5b(0x256)]=function(){},Sprite_TextEffect[_0x2f7f5b(0x277)][_0x2f7f5b(0x220)]=function(){const _0x52f055=_0x2f7f5b,_0x3f7788=this[_0x52f055(0x23e)](),_0x162f77=_0x3f7788['HueShift']??0x0;if(_0x162f77===0x0)return;if(this[_0x52f055(0x24c)]===undefined){const _0x4c06a6=_0x3f7788[_0x52f055(0x22f)]??0x0,_0x382a12=_0x4c06a6*this[_0x52f055(0x225)];this['_hueValue']=_0x382a12;}this['_hueValue']+=_0x162f77;while(this['_hueValue']>0x168)this[_0x52f055(0x24c)]-=0x168;while(this[_0x52f055(0x24c)]<0x168)this[_0x52f055(0x24c)]+=0x168;},Sprite_TextEffect[_0x2f7f5b(0x277)]['updateToneShift']=function(){const _0x371d59=_0x2f7f5b,_0x13d4f4=this['effectData'](),_0x12f526=_0x13d4f4[_0x371d59(0x228)]??[];if(_0x12f526['length']<=0x0)return;if(this[_0x371d59(0x260)]===undefined){const _0x4c7114=_0x13d4f4[_0x371d59(0x2c3)]??0x0,_0x50d80f=Math[_0x371d59(0x219)](Graphics['frameCount']/Math[_0x371d59(0x2c6)](_0x13d4f4['toneDelay']??0x1,0x1));this[_0x371d59(0x232)]=_0x4c7114*this[_0x371d59(0x225)]+_0x50d80f;while(this[_0x371d59(0x232)]>=_0x12f526[_0x371d59(0x27e)])this[_0x371d59(0x232)]-=_0x12f526[_0x371d59(0x27e)];while(this[_0x371d59(0x232)]<0x0)this[_0x371d59(0x232)]+=_0x12f526[_0x371d59(0x27e)];this[_0x371d59(0x260)]=_0x12f526[this['_toneIndex']]['clone']();}if(_0x12f526[_0x371d59(0x27e)]<=0x1)return;const _0x188f53=Math['max'](_0x13d4f4[_0x371d59(0x262)]??0x1,0x1),_0x3366fe=Graphics['frameCount'];if(_0x3366fe%_0x188f53===0x0){this[_0x371d59(0x232)]++;while(this[_0x371d59(0x232)]>=_0x12f526[_0x371d59(0x27e)])this[_0x371d59(0x232)]-=_0x12f526[_0x371d59(0x27e)];this[_0x371d59(0x260)]=_0x12f526[this[_0x371d59(0x232)]][_0x371d59(0x26a)]();}else{if(_0x13d4f4[_0x371d59(0x2b1)]){const _0x636295=_0x188f53-_0x3366fe%_0x188f53,_0x42b128=(this['_toneIndex']+0x1)%_0x12f526[_0x371d59(0x27e)],_0x27d115=_0x12f526[_0x42b128];if(!_0x27d115)return;for(let _0x5aecb3=0x0;_0x5aecb3<0x4;_0x5aecb3++){this['_currentTone'][_0x5aecb3]=(this[_0x371d59(0x260)][_0x5aecb3]*(_0x636295-0x1)+_0x27d115[_0x5aecb3])/_0x636295;}}}},Sprite_TextEffect['prototype'][_0x2f7f5b(0x23a)]=function(){const _0x5ec4f8=_0x2f7f5b;if(this[_0x5ec4f8(0x24c)]!==undefined)this[_0x5ec4f8(0x200)](this[_0x5ec4f8(0x24c)]);if(this[_0x5ec4f8(0x260)]!==undefined)this[_0x5ec4f8(0x237)](this[_0x5ec4f8(0x260)]);},VisuMZ[_0x2f7f5b(0x222)]['Window_Base_preConvertEscapeCharacters']=Window_Base[_0x2f7f5b(0x277)][_0x2f7f5b(0x2ce)],Window_Base[_0x2f7f5b(0x277)][_0x2f7f5b(0x2ce)]=function(_0x1667af){const _0x209cee=_0x2f7f5b;return _0x1667af=this[_0x209cee(0x2ad)](_0x1667af),VisuMZ[_0x209cee(0x222)][_0x209cee(0x1f0)][_0x209cee(0x213)](this,_0x1667af);},Window_Base[_0x2f7f5b(0x277)][_0x2f7f5b(0x2ad)]=function(_0x409ec4){const _0x1c4331=_0x2f7f5b;return _0x409ec4=_0x409ec4['replace'](/\x1bEFFECT<(.*?)>/gi,''),_0x409ec4=_0x409ec4[_0x1c4331(0x29b)](/<CLEAR EFFECT(?:|S)>/gi,''),_0x409ec4;},VisuMZ[_0x2f7f5b(0x222)]['Window_Base_processDrawIcon']=Window_Base[_0x2f7f5b(0x277)][_0x2f7f5b(0x209)],Window_Base[_0x2f7f5b(0x277)]['processDrawIcon']=function(_0x45a939,_0x427310){const _0x34fa66=_0x2f7f5b;if(this[_0x34fa66(0x205)][_0x34fa66(0x253)]===_0x34fa66(0x24a)&&this[_0x34fa66(0x296)]&&_0x427310[_0x34fa66(0x27a)]){this[_0x34fa66(0x202)](_0x45a939,_0x427310);return;}VisuMZ[_0x34fa66(0x222)]['Window_Base_processDrawIcon'][_0x34fa66(0x213)](this,_0x45a939,_0x427310);},VisuMZ[_0x2f7f5b(0x222)][_0x2f7f5b(0x1fa)]=Window_Message[_0x2f7f5b(0x277)]['initMembers'],Window_Message[_0x2f7f5b(0x277)]['initMembers']=function(){const _0x5bc854=_0x2f7f5b;VisuMZ[_0x5bc854(0x222)][_0x5bc854(0x1fa)][_0x5bc854(0x213)](this),this[_0x5bc854(0x296)]='';},Window_Message['prototype'][_0x2f7f5b(0x2d2)]=function(_0x574e29){const _0x1d2490=_0x2f7f5b;this[_0x1d2490(0x203)]=_0x574e29;},Window_Message[_0x2f7f5b(0x277)][_0x2f7f5b(0x2ad)]=function(_0x3bd0d6){const _0x3c5bf3=_0x2f7f5b;return _0x3bd0d6=_0x3bd0d6[_0x3c5bf3(0x29b)](/<CLEAR EFFECT(?:|S)>/gi,_0x3c5bf3(0x288)),_0x3bd0d6;},VisuMZ[_0x2f7f5b(0x222)][_0x2f7f5b(0x221)]=Window_Message['prototype'][_0x2f7f5b(0x2b3)],Window_Message[_0x2f7f5b(0x277)]['processEscapeCharacter']=function(_0x2525ce,_0x48f6ac){const _0x11ad46=_0x2f7f5b;if(_0x2525ce===_0x11ad46(0x1fc)){let _0x40de92=this[_0x11ad46(0x290)](_0x48f6ac);if(_0x48f6ac[_0x11ad46(0x27a)]&&ConfigManager[_0x11ad46(0x28f)]){_0x40de92=_0x40de92['replace'](/\x1bC\[(.*?)\]/gi,''),_0x40de92=_0x40de92['replace'](/\x1bPREVCOLOR\[(.*?)\]/gi,''),this[_0x11ad46(0x296)]=_0x40de92[_0x11ad46(0x24e)]()[_0x11ad46(0x2bc)]();if(this[_0x11ad46(0x296)]==='normal')this[_0x11ad46(0x296)]='';}}else _0x2525ce===_0x11ad46(0x229)?(this['obtainEscapeParam'](_0x48f6ac),this[_0x11ad46(0x296)]=''):VisuMZ[_0x11ad46(0x222)]['Window_Message_processEscapeCharacter']['call'](this,_0x2525ce,_0x48f6ac);},VisuMZ[_0x2f7f5b(0x222)][_0x2f7f5b(0x1f6)]=Window_Message[_0x2f7f5b(0x277)][_0x2f7f5b(0x244)],Window_Message['prototype'][_0x2f7f5b(0x244)]=function(_0x151b1e){const _0x14f37f=_0x2f7f5b;VisuMZ[_0x14f37f(0x222)][_0x14f37f(0x1f6)][_0x14f37f(0x213)](this,_0x151b1e),this[_0x14f37f(0x296)]!==''&&_0x151b1e[_0x14f37f(0x27a)]&&(this['processTextEffectCharacter'](_0x151b1e),this[_0x14f37f(0x20b)]=!![],Imported['VisuMZ_3_MessageSounds']&&this[_0x14f37f(0x206)](_0x151b1e),_0x151b1e[_0x14f37f(0x27a)]=![]);},VisuMZ[_0x2f7f5b(0x222)][_0x2f7f5b(0x295)]=Window_Message['prototype'][_0x2f7f5b(0x2af)],Window_Message[_0x2f7f5b(0x277)][_0x2f7f5b(0x2af)]=function(_0x474b7a){const _0x25a717=_0x2f7f5b;VisuMZ['AniMsgTextEffects'][_0x25a717(0x295)][_0x25a717(0x213)](this,_0x474b7a),this['_textEffectReturnState']!==undefined&&(_0x474b7a[_0x25a717(0x27a)]=!![],this[_0x25a717(0x20b)]=undefined,Imported[_0x25a717(0x2a1)]&&this[_0x25a717(0x230)](_0x474b7a));},Window_Message[_0x2f7f5b(0x277)]['processTextEffectCharacter']=function(_0x5e2a38){const _0x12ff95=_0x2f7f5b;if(!this[_0x12ff95(0x203)])return;const _0x318546=_0x5e2a38[_0x12ff95(0x252)][_0x12ff95(0x245)](''),_0x4b81ba=JSON[_0x12ff95(0x2b4)](JSON[_0x12ff95(0x2b0)](_0x5e2a38));for(const _0x50051c of _0x318546){_0x4b81ba['buffer']=_0x50051c;if(_0x50051c[_0x12ff95(0x2bc)]()!==''){const _0x563ebb=this['_AniMsgTextEffectsContainer'][_0x12ff95(0x238)][_0x12ff95(0x27e)],_0x8ef87f=new Sprite_TextEffect(this,_0x4b81ba,_0x563ebb);this[_0x12ff95(0x203)][_0x12ff95(0x2c9)](_0x8ef87f);}const _0x55949c=this[_0x12ff95(0x297)](_0x50051c);_0x4b81ba['x']+=_0x55949c;}},Window_Base[_0x2f7f5b(0x277)][_0x2f7f5b(0x202)]=function(_0x3a9951,_0x5d941e){const _0x16b9d1=_0x2f7f5b,_0x3e332e=ImageManager[_0x16b9d1(0x25f)]||0x20,_0x4c446f=JSON[_0x16b9d1(0x2b4)](JSON[_0x16b9d1(0x2b0)](_0x5d941e));_0x4c446f[_0x16b9d1(0x201)]=_0x3a9951;const _0x40752c=this['_AniMsgTextEffectsContainer']['children'][_0x16b9d1(0x27e)],_0x369b30=new Sprite_TextEffect(this,_0x4c446f,_0x40752c);this[_0x16b9d1(0x203)][_0x16b9d1(0x2c9)](_0x369b30),_0x5d941e['x']+=_0x3e332e+0x4;},VisuMZ[_0x2f7f5b(0x222)][_0x2f7f5b(0x236)]=Window_Message[_0x2f7f5b(0x277)]['newPage'],Window_Message['prototype'][_0x2f7f5b(0x231)]=function(_0x3f2600){const _0x57bec7=_0x2f7f5b;VisuMZ['AniMsgTextEffects'][_0x57bec7(0x236)][_0x57bec7(0x213)](this,_0x3f2600),this['_textEffect']='',this[_0x57bec7(0x279)]();},Window_Message[_0x2f7f5b(0x277)][_0x2f7f5b(0x279)]=function(){const _0x20bb63=_0x2f7f5b;if(!this[_0x20bb63(0x203)])return;while(this[_0x20bb63(0x203)][_0x20bb63(0x238)][_0x20bb63(0x27e)]>0x0){const _0x253058=this['_AniMsgTextEffectsContainer']['children'][0x0];this['_AniMsgTextEffectsContainer'][_0x20bb63(0x285)](_0x253058),_0x253058[_0x20bb63(0x282)][_0x20bb63(0x201)]===undefined&&_0x253058[_0x20bb63(0x281)]();}},VisuMZ[_0x2f7f5b(0x222)]['Window_Message_open']=Window_Message[_0x2f7f5b(0x277)][_0x2f7f5b(0x2bd)],Window_Message[_0x2f7f5b(0x277)][_0x2f7f5b(0x2bd)]=function(){const _0x30ead5=_0x2f7f5b;VisuMZ[_0x30ead5(0x222)][_0x30ead5(0x275)][_0x30ead5(0x213)](this),this[_0x30ead5(0x203)]&&this[_0x30ead5(0x203)]['show']();},VisuMZ['AniMsgTextEffects'][_0x2f7f5b(0x1fd)]=Window_Message[_0x2f7f5b(0x277)][_0x2f7f5b(0x2a5)],Window_Message['prototype'][_0x2f7f5b(0x2a5)]=function(){const _0xa4d090=_0x2f7f5b;VisuMZ[_0xa4d090(0x222)]['Window_Message_close'][_0xa4d090(0x213)](this),this[_0xa4d090(0x203)]&&this[_0xa4d090(0x203)][_0xa4d090(0x27b)]();},VisuMZ[_0x2f7f5b(0x222)][_0x2f7f5b(0x29e)]=Window_Options[_0x2f7f5b(0x277)][_0x2f7f5b(0x2d1)],Window_Options[_0x2f7f5b(0x277)]['addGeneralOptions']=function(){const _0xdd195f=_0x2f7f5b;VisuMZ['AniMsgTextEffects'][_0xdd195f(0x29e)][_0xdd195f(0x213)](this),this['addTextEffectsCommands']();},Window_Options[_0x2f7f5b(0x277)][_0x2f7f5b(0x20d)]=function(){const _0x44895d=_0x2f7f5b;VisuMZ[_0x44895d(0x222)][_0x44895d(0x29f)][_0x44895d(0x20f)][_0x44895d(0x2c8)]&&this[_0x44895d(0x2ab)]();},Window_Options[_0x2f7f5b(0x277)][_0x2f7f5b(0x2ab)]=function(){const _0x2b7109=_0x2f7f5b,_0xa20023=TextManager['textEffects'],_0x5c1060=_0x2b7109(0x28f);this[_0x2b7109(0x248)](_0xa20023,_0x5c1060);};
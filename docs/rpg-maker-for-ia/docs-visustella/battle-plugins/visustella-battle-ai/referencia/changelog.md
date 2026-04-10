# Changelog - Battle A.I.

## Visão Geral

Este documento contém o histórico de versões do VisuStella Battle A.I. desde o lançamento inicial até a versão atual.

## Versão Atual

**Versão**: 1.29
**Data**: March 20, 2025

---

## Versões Recentes

### Versão 1.29 (March 20, 2025)

**Bug Fixes!**
- Fixed a problem with TPB actions causing conflicts in AI registration of certain abilities. This would lead to crashes.

---

### Versão 1.28 (January 16, 2025)

**Compatibility Update!**
- Added better compatibility with Battle Grid System regarding scopes.

---

### Versão 1.27 (November 14, 2024)

**Compatibility Update!**
- Added better compatibility with Skill Cooldowns' `<Once Per Turn>` notetag.

---

### Versão 1.26 (August 29, 2024)

**Documentation Update!**
- Help file updated for new features

**New Features!**
- New Notetags added by Arisu:
  - `<AI PDR Influence: x.x>` - TGR weight influence based on PDR rate
  - `<AI MDR Influence: x.x>` - TGR weight influence based on MDR rate
  - `<Bypass AI PDR Influence>` - Ignore PDR rates when calculating TGR
  - `<Bypass AI MDR Influence>` - Ignore MDR rates when calculating TGR
- New Plugin Parameters added by Arisu:
  - Parameters > Weights > PDR Rate => TGR
  - Parameters > Weights > PDR Rate => TGR > Influence Rate
  - Parameters > Weights > MDR Rate => TGR
  - Parameters > Weights > MDR Rate => TGR > Influence Rate

---

### Versão 1.25 (June 13, 2024)

**Feature Updates!**
- Reduced AI thinking times. Update made by Olivia.

---

### Versão 1.24 (March 14, 2024)

**Bug Fixes!**
- Fixed a bug that would cause an infinite loop with certain battle systems under on the spot AI setting. Fix made by Olivia.

---

### Versão 1.23 (January 18, 2024)

**Compatibility Update!**
- Updated better compatibility with Battle System - STB and Auto Skill Triggers to prevent infinite loops. Update made by Olivia.

---

### Versão 1.22 (December 14, 2023)

**Compatibility Update!**
- Updated better compatibility for the new Battle System FTB, ETB, and PTB updates. Update made by Olivia.

---

### Versão 1.21 (April 13, 2023)

**Bug Fixes!**
- Fixed a bug that prevented enemies from using skills that had the `<Target: x Random Any>` notetag. Fix made by Irina.

---

### Versão 1.20 (February 16, 2023)

**Compatibility Update!**
- Added compatibility functionality for Battle Core updated version 1.74 new features.

---

### Versão 1.19 (January 20, 2023)

**Bug Fixes!**
- On-The-Spot A.I. no longer overwrites Forced Actions. Fix made by Arisu.

**Compatibility Update!**
- Added compatibility functionality for Battle Core updated version 1.73 new features.

---

### Versão 1.18 (May 19, 2022)

**Documentation Update!**
- Help file updated for new features

**New Features!**
- New Plugin Parameter added by Arisu:
  - General Settings > Experimental > On-The-Spot A.I. > No Idle Chant
    - Requires On-The-Spot A.I. enabled
    - For A.I. Battlers, disables idle chant motions due to inconsistency

---

### Versão 1.17 (May 12, 2022)

**Feature Update!**
- Better RNG calculation when using the x% Chance conditional. Update made by Arisu.

---

### Versão 1.16 (February 24, 2022)

**Feature Update!**
- Randomization between zero variance A.I. is now better
- A.I. will no longer keep unusable skills in a skill queue and replace them with new ones

---

### Versão 1.15 (December 2, 2021)

**Compatibility Update!**
- AI for skills and items should now work if their scope is `<Target: All Allies But User>`. Update made by Irina.

---

### Versão 1.14 (October 21, 2021)

**Documentation Update!**
- Help file updated for new features
- Notetag section "Condition List" updated with JavaScript requirement notes
- Updated section "Regarding $gameTroop.turnCount() for A.I. Conditions"

**New Experimental Feature!**
- New Plugin Parameter added by Yanfly:
  - A.I. General Settings > Experimental > On-The-Spot A.I.
    - A.I. enemies/actors determine actions on the spot when it's their turn
    - Functions akin to YEP's Battle A.I. Core
    - Forcefully changes how Turn Count is handled
    - Comes with side effects that can give A.I. advantages/disadvantages
    - You have been warned

**Optimization Update!**
- Updated last version's newest change to be more optimized. Update made by Yanfly.

---

### Versão 1.13 (October 13, 2021)

**Feature Update!**
- A.I. Battlers with no currently determined actions, upon the start of the time frame for their action, will have one more chance of determining a new action
- This does NOT mean that A.I. Battlers will adjust their actions for one with a higher rating
- The readjustment will only occur if there are no actions determined
- Update made by Arisu.

---

### Versão 1.12 (October 7, 2021)

**Documentation Update!**
- Added section "Regarding $gameTroop.turnCount() for A.I. Conditions"

**Feature Update!**
- Any A.I. Conditions found with "turnCount()" will be automatically disabled to reduce confusion. Update made by Olivia.

---

### Versão 1.11 (September 30, 2021)

**Bug Fixes!**
- Patched up a rare occurrence of predetermined actions still having priority despite having no valid targets. Fix made by Olivia.

---

### Versão 1.10 (September 23, 2021)

**Bug Fixes!**
- Fixed a bug that caused "highest" and "lowest" target schemes to be inverted. Fix made by Olivia.

---

### Versão 1.09 (July 9, 2021)

**Bug Fixes!**
- Fixed a bug that caused "highest" and "lowest" target schemes to be inverted. Fix made by Arisu.

---

### Versão 1.08 (April 16, 2021)

**Feature Update!**
- Cached randomization seeds should no longer conflict with certain scope types. Update made by Irina.

**Optimization Update!**
- Plugin should run more optimized.

---

### Versão 1.07 (January 22, 2021)

**Bug Fixes!**
- `<AI Target: x>` notetags should no longer crashes. Fix made by Irina.

---

### Versão 1.06 (January 8, 2021)

**Feature Update!**
- For those using classic mode with a variance level of 0, action lists will be better shuffled to provide more variation between selected skills. Update made by Irina.

---

### Versão 1.05 (December 25, 2020)

**Documentation Update!**
- Help file updated for new features

**New Features!**
- New notetag added by Yanfly:
  - `<AI Target: type>`
    - Bypasses TGR influence in favor of picking a specific target
    - Read documentation to see targeting types

---

### Versão 1.04 (December 18, 2020)

**Documentation Update!**
- Added documentation for notetag `<Reference AI: Enemy id>`
  - Actors are only able to use skills they would normally have access to
  - Actors need to have LEARNED the skill
  - Actors need to be able to access the skill's SKILL TYPE
  - Actors need to have the RESOURCES to pay for the skill

---

### Versão 1.03 (December 4, 2020)

**Compatibility Update!**
- Plugins should be more compatible with one another.

---

### Versão 1.02 (November 1, 2020)

**Bug Fixes!**
- Charmed battlers will no longer vanish when attack one another. Fix made by Yanfly.

---

### Versão 1.01 (October 18, 2020)

**Bug Fixes!**
- `<All AI Conditions>` and `<Any AI Conditions>` notetags are now fixed and should work properly. Fix made by Yanfly.

---

### Versão 1.00 (September 30, 2020)

**Finished Plugin!**
- Release inicial do plugin

---

## Categorias de Atualizações

### Bug Fixes
Correções de bugs que afetavam a funcionalidade do plugin.

### Compatibility Updates
Atualizações para melhor compatibilidade com outros plugins e battle systems.

### Feature Updates
Novas funcionalidades ou melhorias em funcionalidades existentes.

### Documentation Updates
Atualizações na documentação para refletir mudanças ou esclarecer funcionalidades.

### Optimization Updates
Melhorias de performance do plugin.

---

## Padrões de Atualização

O plugin segue um padrão de atualizações regulares com foco em:

1. **Correção de Bugs**: Prioridade alta para bugs críticos
2. **Compatibilidade**: Manter compatibilidade com plugins VisuStella
3. **Performance**: Otimizações para melhor experiência
4. **Documentação**: Manter documentação atualizada
5. **Novas Features**: Adicionadas quando solicitadas pela comunidade

---

## Recomendações

### Manter Atualizado

Recomenda-se sempre manter o plugin atualizado para:

- Beneficiar-se de correções de bugs
- Ter melhor compatibilidade com outros plugins
- Acessar novas funcionalidades
- Melhor performance

### Verificar Mudanças

Ao atualizar, verifique:

- **Changelog** para mudanças que podem afetar seu projeto
- **Compatibilidade** com outros plugins em uso
- **Configurações** que podem precisar de ajustes

---

## Veja Também

- **[Compatibilidade](compatibilidade.md)** - Requisitos e compatibilidade
- **[Troubleshooting](troubleshooting.md)** - Problemas comuns
- **[Termos de Uso](termos-uso.md)** - Licença e permissões

# VisuStella Skill Shop — Documentação Completa

## Sumário

Plugin Tier 4 do VisuStella MZ que adiciona uma cena de Skill Shop ao RPG Maker MZ. O jogador pode comprar habilidades com gold (ou moedas extendidas via MoreCurrencies) e ensiná-las aos membros do party, desde que os requisitos sejam atendidos (classe, nível, skills prévias, switches).

## Documentos

### conceitos/visao-geral.md
Introdução completa ao plugin. Lista todas as features (loja de skills, custo customizado, requisitos de classe/nível/skill/switch, shops diferentes por evento, desconto). Detalha requisitos (RPG Maker MZ, Tier 4) e compatibilidade com Visual Gold Display.

### notetags/skill-shop-notetags.md
Referência completa de notetags para Skills:
- **Custo**: `<Skill Shop Cost: x>` para custo em gold
- **Moeda Extendida**: `<Item/Weapon/Armor/Variable id Learn Cost: x>` (requer MoreCurrencies)
- **Requisitos de Classe**: `<Skill Shop Require Class: id/name>`
- **Requisito de Nível**: `<Skill Shop Require Level: x>`
- **Requisito de Skill Prévia**: `<Skill Shop Require Learned Skill: id/name>`
- **Requisito de Switch**: `<Skill Shop Require Switch: x>`

### comandos/plugin-commands.md
Comando de cena: "Scene: Open Skill Shop". Parâmetros: Skill ID(s) para definir quais skills estão à venda, Discount Rate (suporta JavaScript) para aplicar desconto.

### parametros/configuracao-geral.md
Default Skill Cost (valor padrão quando notetag de custo não existe). Background Settings: Snapshot Opacity, Background 1 (imagem inferior), Background 2 (imagem superior).

### parametros/vocabulario.md
Textos customizáveis da UI:
- Command Window: Learn Text/Icon/Help, Exit Text/Icon/Help
- Actor List Window: Help Description (com placeholders %1-%4), Skill Type Joiner
- Skill List Window: Already Learned, No SType Access, Wrong Class, For Class, Level Requirement, Learned Skill

### parametros/janelas.md
Configuração visual de 5 janelas: Help Window, Gold Window, Command Window, Actor List Window, Skill List Window. Cada uma com Background Type e JS: X, Y, W, H (código para dimensões). Actor List inclui opções para desenhar face, nome e classe.

## Relação entre Areas

- **Notetags** definem o comportamento das skills na loja
- **Plugin Commands** disparam a loja via eventos, consumindo as notetags configuradas
- **Parâmetros** controlam aparência e valores padrão usados quando notetags não estão presentes
- **Vocabulário** e **Janelas** são independentes — customizam a UI sem afetar mecânica

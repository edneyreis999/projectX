# VisuStella Battle A.I. - Documentação Completa

## Sumário
Plugin de IA avançada para combate em RPG Maker MZ que transforma o sistema primitivo em uma experiência inteligente com múltiplos estilos de comportamento, níveis de IA, variância de rating, condições e influência de peso TGR.

## Documentos por Área

### Conceitos
- **introducao.md**: Visão geral, recursos, requisitos e principais mudanças no sistema
- **ai-styles.md**: Detalhamento dos 4 estilos (Classic, Gambit, Casual, Random) com regras específicas
- **funcionamento.md**: Mecânica de determinação de ações e seleção de alvos pela IA

### Notetags
- **configuracao-geral.md**: Notetags para configuração de IA Style, Level, Rating Variance e Reference AI
- **condicoes-skills.md**: Sistema de condições ALL/ANY com lista completa de condições possíveis
- **tgr-weight.md**: Notetags para influência de peso na seleção de alvos (Element Rate, EVA, MEV, PDR, MDR)
- **targeting.md**: Notetags para seleção específica de alvos (Highest/Lowest de vários parâmetros)

### Parâmetros
- **configuracao-geral.md**: Parâmetros globais para A.I. Style, Level, Ratings, Reference e Knowledge
- **default-conditions.md**: Configuração de condições padrão para todos os skills sem notetags específicos
- **tgr-weight.md**: Configurações de influência de peso TGR (Element Rate, EVA, MEV, PDR, MDR)

### Referência
- **troubleshooting.md**: Problemas com $gameTroop.turnCount() e feature experimental On-The-Spot A.I.
- **compatibilidade.md**: Requisitos (Tier 3, VisuMZ_1_BattleCore) e compatibilidade
- **changelog.md**: Histórico completo de versões desde 1.00 até 1.29
- **termos-uso.md**: Termos de uso, créditos (Team VisuStella: Yanfly, Arisu, Olivia, Irina)

## Relação entre Áreas

**Conceitos → Notetags**: Os conceitos de A.I. Styles são implementados através das notetags de configuração
**Notetags → Parâmetros**: As notetags individuais sobrescrevem os parâmetros globais
**Condições → Funcionamento**: As condições ALL/ANY determinam quando a IA pode usar skills
**TGR Weight → Targeting**: Sistema de peso influencia mas pode ser sobrescrito por notetags específicos

## Navegação Recomendada

**Para iniciantes**: index.md → conceitos/introducao.md → conceitos/ai-styles.md
**Para implementação**: notetags/configuracao-geral.md → notetags/condicoes-skills.md
**Para troubleshooting**: referencia/troubleshooting.md → referencia/changelog.md

## Metadados Técnicos

- **Nome**: VisuStella Battle A.I.
- **Versão Atual**: 1.29 (Março 20, 2025)
- **Tier**: 3 (deve ficar abaixo de plugins Tier 0, 1, 2)
- **Requisito Obrigatório**: VisuMZ_1_BattleCore
- **Tipo**: Mechanic (Sistema de IA para Batalha)
- **Autores**: Team VisuStella (Yanfly, Arisu, Olivia, Irina)
- **Total de Versões**: 29 (1.00 a 1.29)

## Recursos Avançados

- On-The-Spot A.I. (experimental)
- Sistema de Knowledge (aprender fraquezas elementais)
- Auto Battle A.I. para Actors com referência a Enemies
- Compatibilidade com Battle System (ATB, BTB, FTB, ETB, PTB, STB)
- Integração com SkillsStatesCore para Positive/Negative State Count

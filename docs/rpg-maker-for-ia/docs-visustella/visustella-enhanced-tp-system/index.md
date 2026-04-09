# VisuStella MZ - Enhanced TP System

> Sistema avançado de TP (Tension Points) para RPG Maker MZ com modos customizáveis e controle total de geração de recurso.

## Resumo

O Enhanced TP System é um plugin da VisuStella que expande drasticamente as possibilidades do sistema TP nativo do RPG Maker MZ. Permite criar múltiplos "modos TP" com regras diferentes de geração, max TP, e preservação entre batalhas.

## Principais Funcionalidades

- **TP Modes**: Crie modos diferentes de geração de TP para cada personagem/inimigo
- **30 Modos Predefinidos**: Modos prontos para usar ou como referência
- **Troca Dinâmica**: Habilite troca de modo TP durante batalha
- **Gatilhos de Aprendizado**: Desbloqueie novos modos ao aprender skills
- **Forçar Modos**: Traits e states podem impor modos específicos
- **Gauges Flash**: Cores customizadas que piscam em certos percentuais
- **Interface Integrada**: Seletor de modo TP no menu de skills

## Mapa da Documentação

### 📚 Conceitos Fundamentais
Comece aqui para entender o sistema:
- [Visão Geral](conceitos/visao-geral.md) - Introdução e propósitos
- [Mudanças no Core](conceitos/mudancas-core.md) - O que o plugin altera no RPG Maker MZ
- [Conceito de TP Modes](conceitos/tp-modes.md) - Entenda a mecânica central

### 🏷️ Notetags
Referência completa de notetags:
- [Notetags Gerais](notetags/gerais.md) - Aplicam a atores e inimigos
- [Notetags de Atores](notetags/atores.md) - Exclusivos para personagens
- [Referência Rápida](notetags/referencia-rapida.md) - Tabela resumida

### ⚙️ Plugin Commands
Comandos para eventos:
- [Comandos de Atores](comandos/atores.md) - Controlar personagens
- [Comandos de Inimigos](comandos/inimigos.md) - Controlar inimigos
- [Comandos de Sistema](comandos/sistema.md) - Configurações globais

### 🔧 Parâmetros
Configuração do plugin:
- [Configuração Geral](parametros/configuracao-geral.md) - Defaults e Scene_Skill
- [Modos TP](parametros/modos-tp.md) - Criar e configurar modos
- [Fórmulas TP](parametros/formulas-tp.md) - Todas as categorias de ganho de TP

### 📖 Referência
- [Glossário](glossario.md) - Termos e conceitos
- [FAQ](faq.md) - Perguntas frequentes

## Caminho Recomendado de Leitura

Para um agente de IA entendendo o sistema pela primeira vez:

1. **[Visão Geral](conceitos/visao-geral.md)** - Entenda o propósito
2. **[TP Modes](conceitos/tp-modes.md)** - Mecânica central do plugin
3. **[Modos TP](parametros/modos-tp.md)** - Como criar e configurar
4. **[Fórmulas TP](parametros/formulas-tp.md)** - Como TP é ganho
5. **[Notetags Gerais](notetags/gerais.md)** - Como aplicar no jogo

## Integração com Outros Plugins

Este plugin é **Tier 2** na hierarquia VisuStella. Deve ser colocado após plugins Tier 0 e 1.

**Dependências:**
- VisuStella MZ Core Engine (Tier 0)
- (Opcional) VisuStella MZ Skills & States Core - para gauge flash

## Ver Também

- [VisuStella ATB](../Active%20Turn%20Battle.md) - Sistema ATB que pode usar TP
- [Documentação VisuStella](https://visustella.com) - Documentação oficial

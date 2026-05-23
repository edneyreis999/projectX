# Equip Passive System VisuStella MZ - Índice

Documentação catalogada do plugin Equip Passive System para RPG Maker MZ.

## Mapa de Seções

### Conceitos
Visão geral e mecânicas fundamentais do sistema.

| Arquivo | Conteúdo |
|---------|----------|
| [Visão Geral](conceitos/visao-geral.md) | O que é, funcionalidades, metadados, arquitetura, fluxo de aprendizado |
| [States como Base](conceitos/states-como-base.md) | Como passivos usam states, capacidade, equipping, branching |
| [Unlock Conditions](conceitos/unlock-conditions.md) | Todas as categorias de condições de desbloqueio |
| [Skill Learn Integration](conceitos/skill-learn-integration.md) | Via alternativa de compra via Skill Learn System |

### Notetags
Referência completa de todas as notetags do plugin.

| Arquivo | Conteúdo |
|---------|----------|
| [Setup](notetags/setup.md) | Configuração básica (custo, listagem, branching, link) |
| [Hiding](notetags/hiding.md) | Controle de visibilidade |
| [Masking](notetags/masking.md) | Mascarar passivos não aprendidos |
| [Unlock Conditions](notetags/unlock-conditions.md) | Notetags de condições de desbloqueio |
| [Skill Learn System](notetags/skill-learn-system.md) | Notetags de integração com SLS |
| [Referência Rápida](notetags/referencia-rapida.md) | Tabela completa de todas as notetags |

### Comandos
Plugin Commands disponíveis.

| Arquivo | Conteúdo |
|---------|----------|
| [Actor](comandos/actor.md) | Learn, Forget, Add/Remove Unlearned por actor |
| [Global](comandos/global.md) | Operações em todos os atores |
| [System](comandos/system.md) | Show/Hide do comando Passives |

### Parâmetros
Configuração do Plugin Manager.

| Arquivo | Conteúdo |
|---------|----------|
| [General Settings](parametros/general-settings.md) | Show command, auto-equip, capacidade |
| [Vocabulary Settings](parametros/vocabulary-settings.md) | Textos, formatos de condição, cores |
| [Window Settings](parametros/window-settings.md) | Configuração visual das janelas |

### Referência
Informações complementares.

| Arquivo | Conteúdo |
|---------|----------|
| [Compatibilidade](referencia/compatibilidade.md) | Dependências, ordem no Plugin Manager, interações |
| [Glossário](referencia/glossario.md) | Termos, abreviações, parâmetros |

## Caminho Recomendado de Leitura

1. **Primeiro**: `conceitos/visao-geral.md` - Entendimento do sistema
2. **Depois**: `conceitos/states-como-base.md` - Como funciona na prática
3. **Para implementar**: `notetags/referencia-rapida.md` - Quick lookup
4. **Condições**: `notetags/unlock-conditions.md` - Condições detalhadas
5. **Integração**: `conceitos/skill-learn-integration.md` - Se usar SLS
6. **Comandos**: `comandos/actor.md` + `comandos/global.md` - Event commands
7. **Referência**: `referencia/glossario.md` - Quando precisar de termos

## Informações do Plugin

- **Plugin ID**: VisuMZ.148
- **Tier**: 2
- **Dependências**: Core Engine, Skills and States Core

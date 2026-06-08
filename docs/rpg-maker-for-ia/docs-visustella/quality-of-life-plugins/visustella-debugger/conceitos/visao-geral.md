# Visão Geral — VisuStella Debugger

## O que é

O VisuStella Debugger é um plugin **Tier 4** para RPG Maker MZ que substitui o menu debug padrão (tecla F9) por uma interface expandida, acessível de **qualquer scene** (não apenas do mapa como no padrão).

## Funcionalidades Principais

O plugin adiciona as seguintes opções ao menu debug:

| Opção | Disponível em | Descrição |
|-------|--------------|-----------|
| **Switches** | Qualquer scene | Manipular switches ON/OFF com color coding |
| **Variables** | Qualquer scene | Alterar valores de variables com incrementos flexíveis |
| **Common Events** | Map scene | Executar Common Events sob demanda |
| **Teleport** | Map scene | Teletransportar para qualquer mapa e posição |
| **Quick** | Varia por scene | Comandos JS customizáveis para testes rápidos |
| **Battle** | Map scene | Iniciar batalhas com modificadores de iniciativa |
| **Items / Weapons / Armors** | Qualquer scene | Ajustar quantidades no inventário do party |
| **Map Events** | Map scene | Controlar self switches A/B/C/D e erase events |
| **Buffs & States** | Qualquer scene | Aplicar/remover buffs, debuffs e states em battlers |

## Mudanças em Relação ao Padrão

### F9 Button
A tecla F9 agora chama o novo debug menu em vez do menu padrão. O menu debug original do RPG Maker MZ continua existindo mas não é mais acessível via F9.

### Novidades
- Menu acessível de qualquer scene (não só do mapa)
- Switches e Variables com **color coding** para identificar estados rapidamente
- Items unnamed com valores ativos marcados como "! ATTENTION !" para evitar override acidental
- Opção de digitar valores exatos diretamente (não apenas incrementos de 1 ou 10)
- Filtragem automática de items unnamed ou com "-----" no nome

## Plugin Parameters

O principal parâmetro configurável é a lista de **Quick Commands** — comandos JavaScript customizáveis que aparecem no menu Quick. Cada comando possui:

- **Name**: Nome do comando
- **Icon**: Índice do ícone
- **Help**: Descrição de ajuda
- **Close Debugger on Select**: Se fecha o debugger ao executar
- **JS: Visibility**: Código JS para determinar visibilidade
- **JS: Action**: Código JS executado ao selecionar o comando

## Relação com Outros Plugins

- Se usado junto com **VisuStella Skills & States Core**, a seção Buffs & States permite alterar o custom value numérico de states
- Não controla Self Switches ou Self Variables adicionados por outros plugins (devido à natureza ilimitada desses dados)

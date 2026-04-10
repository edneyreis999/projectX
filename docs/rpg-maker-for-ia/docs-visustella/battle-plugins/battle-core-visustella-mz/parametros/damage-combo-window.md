# Damage Combo Window Settings - Plugin Parameters

## Visão Geral

Se habilitada, esta janela exibe informações atualizadas sobre o total de hits executados e valor total de dano/cura para HP. Aplica-se apenas quando dano de HP é diretamente causado através de efeitos de ação. NÃO se aplica a dano de MP/TP, estados, regeneração ou comandos de eventos.

### Script Calls

Você pode ajustar a Damage Combo Window mid-action com estes script calls:

#### $comboWindowReset()
- **Descrição**: Reseta todos os valores da damage combo window
- **Notas**: Limpa contadores

#### $comboWindowIncreaseHits(x)
- **Descrição**: Aumenta contador de hits atual por 'x'
- **Notas**: Insira número para 'x'. Exemplo: $comboWindowIncreaseHits(2)

#### $comboWindowIncreaseDamage(x)
- **Descrição**: Aumenta contador de dano total por 'x'
- **Notas**: Offset qualquer cura adicionada. Exemplo: $comboWindowIncreaseDamage(100)

#### $comboWindowIncreaseHealing(x)
- **Descrição**: Aumenta contador de cura total por 'x'
- **Notas**: Offset qualquer dano adicionada. Exemplo: $comboWindowIncreaseHealing(200)

## Parâmetros

### General Settings

#### Enable?
- **Descrição**: Adiciona Combo Window para mostrar em batalha?
- **Notas**: Habilita/desabilita janela

### Appearance Settings

#### Custom Font
- **Descrição**: Nome da fonte customizada
- **Notas**: Use VisuMZ_1_MessageCore para registrar novas fontes

#### Text Align
- **Descrição**: Alinhamento do texto para esta janela
- **Notas**: left, center ou right

#### JS: Draw Data
- **Descrição**: Código para desenhar dados nesta janela
- **Notas**: Customização via JavaScript

### Vocabulary

#### Damage Combo Format
- **Descrição**: Formato de texto para total de hits de dano
- **Notas**: %1 - Total de Hits

#### Healing Combo Format
- **Descrição**: Formato de texto para total de hits de cura
- **Notas**: %1 - Total de Hits

#### Damage Total Format
- **Descrição**: Formato de texto para valor total de dano
- **Notas**: %1 - Dano Total

#### Healing Total Format
- **Descrição**: Formato de texto para valor total de cura
- **Notas**: %1 - Cura Total

### Position Settings

#### Fade Shift X
- **Descrição**: Shift posição X quando fading
- **Notas**: Negativo: esquerda. Positivo: direita

#### Fade Shift Y
- **Descrição**: Shift posição Y quando fading
- **Notas**: Negativo: cima. Positivo: baixo

#### Offset X
- **Descrição**: Offset posição X da janela
- **Notas**: Negativo: esquerda. Positivo: direita

#### Offset Y
- **Descrição**: Offset posição Y da janela
- **Notas**: Negativo: cima. Positivo: baixo

#### JS: X, Y, W, H
- **Descrição**: Código para determinar dimensões desta janela
- **Notas**: Customização via JavaScript

### Updating Settings

#### Number Roll Duration
- **Descrição**: Duração em frames para rolar números de dano
- **Notas**: 60 frames = 1 segundo

#### Minimum Stay Duration
- **Descrição**: Duração mínima em frames para ficar visível
- **Notas**: 60 frames = 1 segundo

#### Minimum Hit Visible
- **Descrição**: Mínimo de hits antes da combo window ficar visível?
- **Notas**: Número mínimo de hits

#### Opacity Speed
- **Descrição**: Velocidade de opacidade quando fading in/out
- **Notas**: Quão rápido a janela aparece/desaparece

## Ver Também
- [Damage Settings](./damage.md) - Configurações de dano e弹出 números
- [Action Sequences - Action Effects](../action-sequences/action-effects.md) - Efeitos de ação
- [Battle Layout](./battle-layout.md) - Layout geral de batalha

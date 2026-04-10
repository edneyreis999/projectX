# HP Gauge Settings - Plugin Parameters

## Visão Geral

Controla a barra de HP visual exibida em batalha sobre sprites de atores e inimigos.

## Parâmetros

### Show Gauges For

#### Actors
- **Descrição**: Mostra barras de HP sobre cabeças de sprites de atores?
- **Notas**: Requer SV Actors visíveis

#### Enemies
- **Descrição**: Mostra barras de HP sobre cabeças de sprites de inimigos?
- **Notas**: Pode ser contornado com notetag <Hide HP Gauge>

##### Requires Defeat?
- **Descrição**: Requer derrotar inimigo uma vez para mostrar HP Gauge?
- **Notas**: Pode ser contornado com notetag <Show HP Gauge>

###### Battle Test Bypass?
- **Descrição**: Ignora requisito de derrota no Battle Test?
- **Notas**: Apenas durante testes

### Settings

#### Animation Duration
- **Descrição**: Quantos frames gauges animam?
- **Notas**: Padrão: 20 frames

#### Anchor X
- **Descrição**: Onde anchor X do sprite HP Gauge deve estar?
- **Notas**: Use valores entre 0 e 1 para segurança

#### Anchor Y
- **Descrição**: Onde anchor Y do sprite HP Gauge deve estar?
- **Notas**: Use valores entre 0 e 1 para segurança

#### Scale
- **Descrição**: Quão grande/pequena HP Gauge deve ser escalada?
- **Notas**: Multiplicador de escala

#### Offset X
- **Descrição**: Quantos pixels offset posição X da HP Gauge?
- **Notas**: Negativo: esquerda. Positivo: direita

#### Offset Y
- **Descrição**: Quantos pixels offset posição Y da HP Gauge?
- **Notas**: Negativo: cima. Positivo: baixo

### Options

#### Add Option?
- **Descrição**: Adiciona opção 'Show HP Gauge' ao menu Options?
- **Notas**: Permite jogadores alternarem

#### Adjust Window Height
- **Descrição**: Ajusta automaticamente altura da janela de opções?
- **Notas**: Acomoda nova opção

#### Option Name
- **Descrição**: Nome do comando da opção
- **Notas**: Texto exibido no menu

## Ver Também
- [Enemy Battler Settings](./enemy-battler-settings.md) - Configurações de inimigos
- [Actor Battler Settings](./actor-battler-settings.md) - Configurações de atores
- [Damage Settings](./damage.md) - Configurações de dano e弹出 números
- [Battle Layout](./battle-layout.md) - Layout geral de batalha

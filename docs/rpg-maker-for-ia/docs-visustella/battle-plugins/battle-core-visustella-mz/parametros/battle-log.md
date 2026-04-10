# Battle Log Settings - Plugin Parameters

## Visão Geral

Controla como a janela de Battle Log aparece no campo de batalha, suas propriedades visuais e quais textos são exibidos durante o combate. A maioria dos textos está desabilitada por padrão para tornar o fluxo de batalha mais rápido.

## Parâmetros

### General

#### Back Color
- **Descrição**: Cor de fundo da janela (use formato #rrggbb)
- **Notas**: Define a cor de fundo do Battle Log

#### Max Lines
- **Descrição**: Número máximo de linhas exibidas
- **Notas**: Controla quantas linhas de texto podem aparecer simultaneamente

#### Message Wait
- **Descrição**: Número de frames para espera de mensagem normal
- **Notas**: 60 frames = 1 segundo

#### Text Align
- **Descrição**: Alinhamento do texto para Window_BattleLog
- **Notas**: Pode ser left, center ou right

#### JS: X, Y, W, H
- **Descrição**: Código para determinar dimensões do battle log
- **Notas**: Permite customização avançada via JavaScript

### Start Turn

#### Show Start Turn?
- **Descrição**: Exibe mudanças de turno no início do turno?
- **Notas**: Mostra texto indicando início do turno

#### Start Turn Message
- **Descrição**: Mensagem exibida no início do turno
- **Notas**: %1 - Número do Turno

#### Start Turn Wait
- **Descrição**: Número de frames para esperar após início do turno
- **Notas**: 60 frames = 1 segundo

### Display Action

#### Show Centered Action?
- **Descrição**: Exibe texto centralizado do nome da ação?
- **Notas**: Mostra nome da skill/item no centro da tela

#### Show Skill Message 1?
- **Descrição**: Exibe a 1ª mensagem de skill?
- **Notas**: Primeira mensagem da database de skills

#### Show Skill Message 2?
- **Descrição**: Exibe a 2ª mensagem de skill?
- **Notas**: Segunda mensagem da database de skills

#### Show Item Message?
- **Descrição**: Exibe mensagem de uso de item?
- **Notas**: Mostra texto quando item é usado

### Action Changes

#### Show Counter?
- **Descrição**: Exibe texto de contra-ataque?
- **Notas**: Mostra quando ataque é contra-atacado

##### Wait Frames
- **Descrição**: Quantos frames esperar após o texto
- **Notas**: 60 frames = 1 segundo

#### Show Reflect?
- **Descrição**: Exibe texto de reflexo mágico?
- **Notas**: Mostra quando magia é refletida

##### Wait Frames
- **Descrição**: Quantos frames esperar após o texto
- **Notas**: 60 frames = 1 segundo

#### Show Substitute?
- **Descrição**: Exibe texto de substituto?
- **Notas**: Mostra quando substituto protege alvo

##### Wait Frames
- **Descrição**: Quantos frames esperar após o texto
- **Notas**: 60 frames = 1 segundo

### Action Results

#### Show No Effect?
- **Descrição**: Exibe texto "sem efeito"?
- **Notas**: Mostra quando ação não tem efeito

#### Show Critical?
- **Descrição**: Exibe texto de crítico?
- **Notas**: Mostra quando ataque é crítico

#### Show Miss/Evasion?
- **Descrição**: Exibe texto de erro/evasão?
- **Notas**: Mostra quando ataque erra ou é evadido

#### Show HP Damage?
- **Descrição**: Exibe texto de dano de HP?
- **Notas**: Mostra valores de dano de HP

#### Show MP Damage?
- **Descrição**: Exibe texto de dano de MP?
- **Notas**: Mostra valores de dano de MP

#### Show TP Damage?
- **Descrição**: Exibe texto de dano de TP?
- **Notas**: Mostra valores de dano de TP

### Display States

#### Show Added States?
- **Descrição**: Exibe texto de estados adicionados?
- **Notas**: Mostra quando estado é aplicado

#### Show Removed States?
- **Descrição**: Exibe texto de estados removidos?
- **Notas**: Mostra quando estado é removido

#### Show Current States?
- **Descrição**: Exibe texto de estado atual afetado?
- **Notas**: Mostra estados ativos

#### Show Added Buffs?
- **Descrição**: Exibe texto de buffs adicionados?
- **Notas**: Mostra quando buff é aplicado

#### Show Added Debuffs?
- **Descrição**: Exibe texto de debuffs adicionados?
- **Notas**: Mostra quando debuff é aplicado

#### Show Removed Buffs?
- **Descrição**: Exibe texto de buffs/debuffs removidos?
- **Notas**: Mostra quando buff/debuff é removido

## Ver Também
- [Damage Settings](./damage.md) - Configurações de dano e弹出 números
- [Action Sequences](../action-sequences/) - Sequências de ação personalizadas
- [Battle Layout](./battle-layout.md) - Layout geral de batalha

# Configurações de Efeitos

## Visão Geral

O plugin oferece configurações visuais para cada efeito: **Animation** (requer Core Engine) e **Popups**. Cada um dos 6 efeitos tem suas próprias configurações ajustáveis.

## Efeitos Configuráveis

1. Auto-Life Settings
2. Curse Settings
3. Doom Settings
4. Fragile Settings
5. Guts Settings
6. Undead Settings
7. Transform Settings

## Configurações de Animação

### Requisitos
- **VisuMZ_0_CoreEngine** deve estar instalado
- Sem o Core Engine, animações não funcionam

### Parâmetros

#### Animation ID
- **Descrição**: ID da animação do database
- **Quando toca**: Quando o efeito é ativado
- **Exemplo**: `45` para animação de summon

#### Mirror Animation
- **Descrição**: Espelhar animação horizontalmente?
- **Opções**: ON/OFF
- **Use case**: Inverter direção da animação

#### Mute Animation
- **Descrição**: Silenciar som da animação?
- **Opções**: ON/OFF
- **Use case**: Prevenir spam de sons

### Exemplos Práticos

```
Auto-Life:
  Animation ID: 45        # Heal animation
  Mirror Animation: OFF
  Mute Animation: OFF

Doom:
  Animation ID: 78        # Dark animation
  Mirror Animation: OFF
  Mute Animation: ON      # Sem som para tensão

Guts:
  Animation ID: 0         # Sem animação
  Mirror Animation: OFF
  Mute Animation: OFF
```

## Configurações de Popup

### Parâmetros

#### Text
- **Descrição**: Texto exibido quando efeito ativa
- **Formato**: String
- **Exemplos**: "AUTO LIFE", "DOOM", "GUTS!"

#### Text Color
- **Descrição**: Cor do texto do popup
- **Formato**:
  - `#rrggbb` para cor customizada (ex: `#ff0000` = vermelho)
  - Número para cor do Window Skin (ex: `0` = normal)
- **Exemplos**:
  ```
  #ff0000  # Vermelho vivo
  #00ff00  # Verde neon
  0        # Cor normal do skin
  16       # Cor de dano crítico
  ```

#### Flash Color
- **Descrição**: Cor do flash do popup
- **Formato**: `[red, green, blue, alpha]`
- **Valores**: 0-255 para RGB, 0-255 para alpha
- **Exemplos**:
  ```
  [255, 0, 0, 128]     # Vermelho semi-transparente
  [255, 255, 0, 200]   # Amarelo brilhante
  [0, 0, 0, 0]         # Sem flash
  ```

#### Flash Duration
- **Descrição**: Duração do flash em frames
- **Unidade**: Frames (60 frames = 1 segundo @ 60fps)
- **Exemplos**:
  ```
  30   # 0.5 segundos
  60   # 1 segundo
  120  # 2 segundos
  ```

### Exemplos Práticos

```
Auto-Life:
  Text: "AUTO LIFE"
  Text Color: #00ff00
  Flash Color: [0, 255, 0, 128]
  Flash Duration: 60

Doom:
  Text: "DOOM"
  Text Color: #ff0000
  Flash Color: [255, 0, 0, 200]
  Flash Duration: 30

Guts:
  Text: "GUTS!"
  Text Color: #ffff00
  Flash Color: [255, 255, 0, 150]
  Flash Duration: 45

Undead:
  Text: "UNDEAD"
  Text Color: #800080
  Flash Color: [128, 0, 128, 100]
  Flash Duration: 60
```

## Configurações por Efeito

### Auto-Life Settings
**Sugestão**: Cores de vida/cura
- Text: "AUTO LIFE" ou "REVIVE"
- Text Color: `#00ff00` (verde)
- Flash Color: `[0, 255, 0, 128]`
- Animation ID: 45 (heal)

### Curse Settings
**Sugestão**: Cores escuras/maldições
- Text: "CURSE" ou "CURSED"
- Text Color: `#800080` (roxo)
- Flash Color: `[128, 0, 128, 100]`
- Animation ID: 78 (dark)

### Doom Settings
**Sugestão**: Cores de morte/perigo
- Text: "DOOM" ou countdown numérico
- Text Color: `#ff0000` (vermelho)
- Flash Color: `[255, 0, 0, 200]`
- Animation ID: 0 (sem animação para tensão)

### Fragile Settings
**Sugestão**: Cores de vidro/quebradiço
- Text: "FRAGILE" ou "GLASS"
- Text Color: `#00ffff` (ciano)
- Flash Color: `[0, 255, 255, 80]`
- Animation ID: 0 (quebrar surpresa)

### Guts Settings
**Sugestão**: Cores de determinação
- Text: "GUTS!" ou "WILL"
- Text Color: `#ffff00` (amarelo)
- Flash Color: `[255, 255, 0, 150]`
- Animation ID: 50 (buff)

### Undead Settings
**Sugestão**: Cores de morto-vivo
- Text: "UNDEAD" ou "ZOMBIE"
- Text Color: `#008000` (verde escuro)
- Flash Color: `[0, 128, 0, 100]`
- Animation ID: 79 (curse)

### Transform Settings
**Sugestão**: Cores de transformação
- Text: "TRANSFORM" ou "METAMORPH"
- Text Color: `#ff00ff` (magenta)
- Flash Color: `[255, 0, 255, 150]`
- Animation ID: 52 (summon)

## Cores Comuns (Hex)

```
#ff0000  Vermelho (perigo)
#00ff00  Verde (cura/vida)
#0000ff  Azul (água/gelo)
#ffff00  Amarelo (buff/warning)
#ff00ff  Magenta (transformação)
#00ffff  Ciano (água/vidro)
#800080  Roxo (maldição)
#ff8000  Laranja (fogo)
#808080  Cinza (neutro)
#000000  Preto (vazio/morte)
#ffffff  Branco (luz/claro)
```

## Cores de Window Skin (Números)

```
0   = Normal
1   = Sistema
16  = Dano crítico
2   = Cura
17  = Dano fraco
3   = MP
18  = Dano resistido
4   = TP
19  = Miss
5   = State adicionado
20  = Evaded
...
```

## Dicas de Balanceamento Visual

### Feedback Visual
1. Use animações consistentes com o efeito
2. Cores devem indicar "bom" (verde) vs "ruim" (vermelho)
3. Duração do flash: 30-60 frames para não sobrecarregar

### Performance
- Evite animações muito longas
- Considere Mute Animation para efeitos frequentes
- Use Animation ID: 0 para efeitos sutis

### Clarity
- Texto curto e legível (3-8 caracteres)
- Cores com bom contraste
- Flash duration proporcional à importância

## Troubleshooting

### Animação não toca
- Verifique se Core Engine está instalado
- Confirme que Animation ID existe no database
- Teste com animação simples (ID: 45)

### Popup não aparece
- Verifique se há texto configurado
- Confirme que Text Color está em formato correto
- Teste com cor simples: `0` ou `#ff0000`

### Flash não funciona
- Verifique formato: `[r, g, b, a]`
- Valores devem ser 0-255
- Teste com valores simples: `[255, 0, 0, 128]`

## Próximos Passos

- Consulte [Glossário](../referencia/glossario.md) para termos
- Veja [Troubleshooting](../referencia/troubleshooting.md) para problemas
- Retorne a [Conceitos](../conceitos/funcionamento.md) para mecânicas

# Glossário

## Termos do Plugin

| Termo | Definição |
|-------|-----------|
| **Bust** | Picture usada como busto de personagem no estilo Visual Novel. Mecanicamente é uma Picture do RPG Maker MZ com funcionalidades extras. |
| **Picture ID** | Identificador numérico de uma Picture/Bust. Determina a camada: IDs menores ficam atrás, maiores ficam na frente. |
| **Position** | Sistema de posicionamento predeterminado com 11 posições (0-10), distribuídas da esquerda para a direita com buffer de 200px das bordas. |
| **Origin/Anchor** | Ponto de referência da imagem. Opções: Upper Left, Center, Bust (Center Bottom por padrão). |
| **Easing** | Tipo de curva de animação usada em movimentos, entradas e saídas. |
| **Breathing** | Efeito contínuo de respiração que escala o bust ciclicamente. Controlado por Speed e Rate. |
| **Fidgeting** | Efeito contínuo de inquietação que move o bust horizontal/verticalmente. Controlado por Speed e Distance. |
| **Swaying** | Efeito contínuo de balanço angular. Controlado por Angle Speed e Angle Sway. |
| **Tone/Tint** | Coloração aplicada ao bust. Formato: `[Red, Green, Blue, Gray]`. Presets: Normal, Dark, Sepia, Sunset, Night. |
| **Scale** | Fator de escala do bust. 100 = 100% = 1.0. Pode ser aplicado em X e Y independentemente. |
| **Auto-Erase** | Opção que apaga automaticamente o bust após completar fade out. |
| **Flip Direction** | Inverter a direção horizontal do bust durante movimentos/saídas. |
| **Horizontal Mirror** | Espelhamento horizontal. Opções: None, Mirror, Auto, Auto-Reverse, Toggle. |

## Relação com o RPG Maker MZ

| Elemento do Plugin | Equivalente Vanilla |
|---------------------|---------------------|
| Bust | Picture (Show Picture) |
| BASIC: Enter Bust | Show Picture + Move Picture (com fade) |
| BASIC: Exit Bust(s) | Move Picture (fade out) + Erase Picture |
| BASIC: Graphic Change | Move Picture (trocar arquivo) |
| FADE: Fade In/Out | Move Picture (alterar opacidade) |
| MOVE: Move Bust(s) | Move Picture (alterar coordenadas) |
| SCALE: Scale Bust(s) | Move Picture (alterar escala) |
| TONE: Tone Bust(s) | Tint Picture |

## Compatibilidade

- **Requer**: Core Engine VisuStella MZ
- **Tier**: 2 — colocar abaixo de plugins com tier menor (0, 1) no Plugin Manager
- **Compatível com**: Comandos de evento vanilla (Move Picture, Rotate Picture, Tint Picture, Erase Picture) pois Busts são Pictures

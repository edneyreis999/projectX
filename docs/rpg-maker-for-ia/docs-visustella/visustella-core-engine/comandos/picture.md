# Comandos: Picture

## Picture: Coordinates Mode
- **Play Test Mode only!**
- Mostra coordenadas de uma picture enquanto move pela tela
- **Picture ID**: ID da picture para rastrear

## Picture: Easing Type
Muda o tipo de easing para movimento de picture.
- **Picture ID**: Qual picture aplicar easing
- **Easing Type**: Tipo de easing
- Inserir DEPOIS do "Move Picture" event command
- Desativar "Wait for Completion" no Move Picture

## Picture: Erase All
Apaga todas as pictures na tela de uma vez.

## Picture: Erase Range
Apaga pictures em um range de IDs.
- **Starting ID**: ID inicial
- **Ending ID**: ID final

## Picture: Rotate by Angle
Rotaciona picture por um angulo em uma duracao.
- **Picture ID Number**: 1-100. Suporta JS.
- **Adjust Angle**: Graus para rotacionar (360 = volta completa). Suporta JS.
- **Easing Type**: Tipo de easing
- **Duration**: Duracao em frames (60 = 1 segundo). Suporta JS.
- **Wait for Completion**: Esperar terminar?

## Picture: Rotate to Angle
Rotaciona picture para um angulo alvo em uma duracao.
- **Picture ID Number**: 1-100. Suporta JS.
- **Target Angle**: Angulo alvo em graus. Suporta JS.
- **Easing Type**: Tipo de easing
- **Duration**: Duracao em frames. Suporta JS.
- **Wait for Completion**: Esperar terminar?

## Picture: Show Icon
Mostra um icon como picture.
- **Picture ID Number**: 1-100
- **Icon Index**: Indice do icon
- **Smooth Icon?**: Suavizado ou pixelado
- **Origin**: Upper Left ou Center
- **Position X/Y**: Coordenadas. Suporta JS.
- **Width % / Height %**: Escala (100 = 100%). Suporta JS.
- **Opacity**: 0-255. Suporta JS.
- **Blend Mode**: Tipo de blend

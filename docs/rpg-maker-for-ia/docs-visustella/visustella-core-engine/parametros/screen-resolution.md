# Plugin Parameters: Screen Resolution Settings

Ajustes para resolucoes maiores que o default 816x624. Funciona melhor com MZ 1.3.0+ onde o tab Troops foi atualizado.

## Maps

- **Scroll Lock Small X?**: Auto-lock scroll horizontal se mapa pequeno demais (util para 1280x720 com 27 tiles de largura)
- **Scroll Lock Small Y?**: Auto-lock scroll vertical se mapa pequeno demais
- **Locked Display X/Y**: Valor de display para maps com auto-scroll lock (0 a 1 para melhores resultados)

Desabilitado se o mapa esta com zoom.

## Troops

- **Reposition Actors**: Reposiciona atores em batalha se resolucao > 816x624
  - Ignorar se usando VisuStella Battle Core (ajustar via Battle Core > Parameters > Actor Battler Settings > JS: Home Position)
- **Reposition Enemies**: Reposiciona inimigos se resolucao > 816x624
  - **For MZ 1.3.0+?**: Ambos parametro e parent precisam estar ON para MZ 1.3.0+
  - Ignorado se core script < 1.3.0 (nao verifica versao do editor)

# Save Plugin Commands

## Save: Current Slot

- **Função**: Processa o save do jogo no slot atual
- **Restrições**: Deve estar fora de batalha e no mapa
- **Uso**: Salva imediatamente no slot de save atualmente associado ao jogo

---

## Save: Set Description

- **Função**: Define o texto de descrição que aparece nos save files
- **Parâmetros**:
  - `Text` — Texto descritivo para o save
- **Text Codes Suportados**:
  - `\V[x]`, `\N[x]`, `\P[x]` — São **save-local** (referem-se ao save específico)
  - Outros text codes — Extraem dados do jogo atualmente ativo

---

## Save: Set Picture

- **Função**: Define a imagem que aparece no save file
- **Parâmetros**:
  - `Filename` — Nome do arquivo de imagem desejado

---

## Casos de Uso Comuns

### Descrição dinâmica por capítulo
```
Save: Set Description → "Capítulo \V[10]: \V[11]"
```
Onde variável 10 é o número do capítulo e 11 é o nome.

### Screenshot customizado
```
Save: Set Picture → "screenshot_cap5"
```

### Save automático com info contextual
```
Save: Set Description → "Antes do Boss - Playtime: \V[20]"
Save: Current Slot
```

## Relacionado

- [Autosave Commands](autosave-commands.md)
- [General Save Settings](../configuracao/general-save-settings.md)
- [Style Settings](../configuracao/style-settings.md)

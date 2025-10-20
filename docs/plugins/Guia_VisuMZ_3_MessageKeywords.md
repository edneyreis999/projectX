# Guia do Plugin: VisuMZ_3_MessageKeywords

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_3_MessageKeywords` para criar e substituir palavras-chave automaticamente em caixas de mensagem, agilizando a escrita e padronizando termos.

## 1. Introdução ao Message Keywords

### 1.1. O que é o Message Keywords?

O plugin `VisuMZ_3_MessageKeywords` permite criar um dicionário de palavras-chave que são substituídas por textos, ícones ou valores dinâmicos sempre que aparecem nas caixas de mensagem. Além disso, ao passar o mouse sobre uma palavra-chave, uma tooltip pode ser exibida com informações adicionais, ideal para explicar termos de lore ou mecânicas complexas.

### 1.2. Pré-requisitos

Para que este plugin funcione corretamente, é necessário ter os seguintes plugins instalados na ordem correta:

- `VisuMZ_0_CoreEngine`
- `VisuMZ_1_MessageCore`

## 2. Configurações do Plugin (Plugin Parameters)

A principal configuração do plugin é a criação do dicionário de palavras-chave através do parâmetro `Keyword List`.

### 2.1. Keyword List

Nesta lista, você pode adicionar e configurar cada palavra-chave. Cada item da lista possui as seguintes propriedades:

- **Keyword:** O marcador que será substituído no texto. Para usá-lo, coloque-o entre parênteses duplos, como `((MinhaKeyword))`.
- **Replacement Text:** O texto que substituirá o marcador. Pode conter códigos de texto do RPG Maker, como cores e ícones.
- **Tooltip Text:** O texto que aparecerá na janela de tooltip quando o jogador passar o mouse sobre a palavra-chave.
- **Case Sensitive:** (Implícito, o plugin trata as keywords de forma insensível a maiúsculas/minúsculas)

**Exemplos de Uso:**

- **Texto e Ícones:** Para substituir `((Ouro))` pelo ícone de ouro seguido da palavra "Ouro":
  - **Keyword:** `Ouro`
  - **Replacement Text:** `\i[314]Ouro`

- **Valores Dinâmicos:** Para substituir `((NOME_HEROI))` pelo nome do líder do grupo:
  - **Keyword:** `NOME_HEROI`
  - **Replacement Text:** `\n[1]`

- **Cores:** Para fazer a palavra `PERIGO` sempre aparecer em vermelho:
  - **Keyword:** `PERIGO`
  - **Replacement Text:** `\c[18]PERIGO\c[0]`

## 3. Guia de Comandos de Plugin (Plugin Commands)

Este plugin não oferece comandos de plugin para gerenciamento dinâmico das palavras-chave. Toda a manipulação deve ser feita via JavaScript.

## 4. Guia de Recursos por Notetags (Database)

Este plugin não utiliza notetags.

## 5. Guia de Recursos via JavaScript (Avançado)

É possível manipular o dicionário de palavras-chave dinamicamente durante o jogo utilizando chamadas de script.

### 5.1. Acessar e Modificar Palavras-Chave

- **Adicionar uma Palavra-Chave:**
  ```javascript
  VisuMZ.MessageKeywords.addKeyword('KEYWORD', 'REPLACEMENT');
  ```
  **Exemplo Prático:** Quando o jogador aprende o nome de um vilão, adicione-o como uma palavra-chave.
  ```javascript
  VisuMZ.MessageKeywords.addKeyword('[VILAO]', '\c[10]Morgath\c[0]');
  ```

- **Remover uma Palavra-Chave:**
  ```javascript
  VisuMZ.MessageKeywords.removeKeyword('KEYWORD');
  ```
  **Exemplo Prático:** Remover uma palavra-chave temporária.
  ```javascript
  VisuMZ.MessageKeywords.removeKeyword('[VILAO]');
  ```

- **Verificar se uma Palavra-Chave Existe:**
  ```javascript
  VisuMZ.MessageKeywords.hasKeyword('KEYWORD');
  ```
  **Exemplo Prático:** Usar em um evento de script para verificar se o jogador já conhece o vilão.
  ```javascript
  if (VisuMZ.MessageKeywords.hasKeyword('[VILAO]')) {
    // O jogador já sabe quem é o vilão.
  }
  ```
- **Limpar todas as Palavras-Chave:**
  ```javascript
  VisuMZ.MessageKeywords.clearKeywords();
  ```

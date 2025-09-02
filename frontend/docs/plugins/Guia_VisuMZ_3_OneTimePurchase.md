# Guia do Plugin: VisuMZ_3_OneTimePurchase

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_3_OneTimePurchase` para criar itens de compra única em lojas, que não podem ser comprados novamente após a primeira aquisição.

## 1. Introdução ao One-Time Purchase

### 1.1. O que é o One-Time Purchase?

O plugin `VisuMZ_3_OneTimePurchase` permite que itens, armas e armaduras em lojas sejam marcados como "compra única". Uma vez que um jogador compra um desses itens, ele desaparece da lista da loja ou é marcado como esgotado, impedindo compras futuras do mesmo item naquela loja específica.

Isso é útil para criar lojas com estoques limitados, vender itens lendários que devem ser únicos ou controlar a quantidade de certos itens que o jogador pode adquirir.

### 1.2. Pré-requisitos

Para que este plugin funcione corretamente, é necessário ter o seguinte plugin instalado:

- `VisuMZ_1_ItemsEquipsCore` (versão 1.37 ou superior)

## 2. Configurações do Plugin (Plugin Parameters)

As configurações globais do sistema de compra única são definidas nos parâmetros do plugin.

### 2.1. General Settings

- **Default On/Off:** Define o comportamento padrão para todos os itens da loja. Se `true` (One Time Purchase), todos os itens serão de compra única, a menos que marcados individualmente. Se `false` (Unlimited Purchase), os itens podem ser comprados várias vezes, a menos que marcados como compra única.
- **Sold Text:** O texto que é exibido para um item que já foi comprado e esgotou. Você pode usar códigos de texto (ex: `\c[6]Esgotado!`).
- **Sold Offset X / Y:** Ajusta a posição do texto "Esgotado" na tela da loja para um alinhamento perfeito.

**Como usar:**
Para a maioria dos seus itens ser de compra única, configure `Default On/Off` para `true`. Para traduzir o texto padrão, ajuste o `Sold Text` para `Esgotado!`.

## 3. Guia de Comandos de Plugin (Plugin Commands)

Os comandos de plugin permitem gerenciar o estado dos itens de compra única e o modo da loja dinamicamente.

### 3.1. Usar os Comandos de Compra Única

- **Mode: Enable One Time Purchase Mode?:** Ativa ou desativa o modo de compra única para a próxima loja que for aberta. Isso é útil para ter lojas com comportamentos diferentes no mesmo jogo.
- **Remote Event: Open Last Shop:** Reabre a última loja visitada por um evento em um mapa específico, mantendo o estado de itens vendidos.
- **This Event: Open Last Shop:** Reabre a última loja visitada pelo evento atual.

**Exemplos Práticos:**

- **Ativar para uma loja específica:** Antes do comando "Shop Processing", use `Enable One Time Purchase Mode?` com o valor `true`. Após o comando da loja, use-o novamente com `false` para que não afete outras lojas.
- **Reabrir loja:** Crie um NPC que, ao interagir, usa o comando `This Event: Open Last Shop` para que o jogador possa voltar à loja dele, vendo os itens que já comprou como esgotados.

*Nota: O plano mencionava comandos para resetar, mas o plugin foca em ativar/desativar o modo e reabrir lojas. O reset é feito via Notetags ou Script Calls.*

## 4. Guia de Recursos por Notetags (Database)

As notetags são usadas para definir o comportamento de compra única para itens, armas e armaduras individualmente, sobrescrevendo a configuração padrão do plugin.

### 4.1. Itens, Armas e Armaduras

- **`<One-Time Purchase>`:** Marca o item como sendo de compra única, mesmo que o comportamento padrão do plugin seja de compra ilimitada.
- **`<Not One-Time Purchase>`:** Marca o item como *não* sendo de compra única, permitindo que seja comprado várias vezes, mesmo que o comportamento padrão seja de compra única.

**Como e quando implementar:**

- Para criar uma "Espada Lendária" que só pode ser comprada uma vez, adicione a notetag `<One-Time Purchase>` na caixa de notas da arma no banco de dados.
- Se o comportamento padrão do seu plugin for de compra única, use `<Not One-Time Purchase>` em uma "Poção" para que ela possa ser comprada várias vezes.

## 5. Guia de Recursos via JavaScript (Avançado)

Para desenvolvedores avançados, é possível verificar e manipular o estado de compra dos itens via chamadas de script.

### 5.1. Acessar e Modificar o Status de Compra

- **Verificar se um item de compra única está esgotado:**
  ```javascript
  $gameSystem.isOneTimePurchaseSoldOut(item)
  ```
  Substitua `item` pelo objeto do item do banco de dados (ex: `$dataItems[10]`). Retorna `true` se já foi comprado.
  **Exemplo Prático:** Em um `Conditional Branch`, verifique se a "Espada Lendária" (ID 10) já foi comprada:
  ```javascript
  $gameSystem.isOneTimePurchaseSoldOut($dataItems[10])
  ```

- **Resetar um item de compra única:**
  *O plugin não expõe uma função direta de reset nos exemplos, mas a manipulação do estado de "vendido" pode ser alcançada com scripts mais complexos que modifiquem os dados salvos em `$gameSystem._mapEventStoredShops`.*

- **Ativar/Desativar o modo de compra única via script:**
  ```javascript
  $gameSystem.setOneTimePurchaseMode(true); // Ativa
  $gameSystem.setOneTimePurchaseMode(false); // Desativa
  ```
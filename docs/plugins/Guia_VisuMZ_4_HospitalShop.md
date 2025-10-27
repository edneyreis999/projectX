# Guia do Plugin: VisuMZ_4_HospitalShop

**Objetivo:** Criar um guia completo para desenvolvedores sobre como usar o `VisuMZ_4_HospitalShop` para implementar um sistema de hospital onde o jogador pode pagar para curar o grupo, reviver membros ou remover estados negativos.

## 1. Introdução ao Hospital Shop

### 1.1. O que é o Hospital Shop?

O plugin `VisuMZ_4_HospitalShop` cria uma cena de loja especializada em serviços de cura, com custos configuráveis. Diferente de uma estalagem com preço fixo, o hospital calcula os custos com base na quantidade de dano sofrido, MP gasto e nos estados negativos a serem curados. Isso oferece uma experiência mais dinâmica e estratégica para a recuperação do grupo.

### 1.2. Pré-requisitos

É necessário ter o plugin `VisuMZ_0_CoreEngine` instalado e ativado no seu projeto, posicionado acima do `VisuMZ_4_HospitalShop` na lista de plugins.

## 2. Configurações do Plugin (Plugin Parameters)

O guia a seguir detalha como configurar os serviços e custos do hospital através dos parâmetros do plugin.

### 2.1. Service List (Configuração de Custos)

As configurações de custo são feitas diretamente nos parâmetros `General Settings`.

- **Cost Per HP:** Define o custo para curar cada ponto de HP. Por exemplo, se o valor for `1.0`, curar 100 HP custará 100 de ouro.
- **Cost Per MP:** Define o custo para restaurar cada ponto de MP.
- **Death Cost by Level:** Custo para reviver um personagem, multiplicado pelo nível do ator.
- **State Cost:** Custo padrão para remover um estado negativo. Pode ser sobrescrito por notetags.

**Exemplo de Fórmula de Custo (HP):**
Para um serviço que cura todo o HP de um ator, o custo é calculado internamente pela fórmula:
`Custo = (target.mhp - target.hp) * Cost Per HP`

**Exemplo de Custo (Remover Veneno):**
Para um serviço que remove o estado 'Veneno' (ID 4), o custo será o valor definido em `State Cost`, a menos que a notetag `<Hospital Cost: x>` seja usada no estado.

### 2.2. General Settings

Nesta seção, você pode configurar os textos da janela, a moeda (padrão é ouro) e outras opções visuais da interface do hospital.

## 3. Guia de Comandos de Plugin (Plugin Commands)

Para usar o hospital, você precisa chamar a cena através de um comando de plugin em um evento.

### 3.1. Usar o Comando do Hospital

- **Comando:** `Scene: Open Hospital Shop`

**Exemplo Prático:**
Crie um evento de um NPC "Curandeiro" em uma cidade. No conteúdo do evento, adicione o comando de plugin `Scene: Open Hospital Shop`. Quando o jogador interagir com o NPC, a tela do hospital será aberta, permitindo que o jogador escolha quais serviços usar.

## 4. Guia de Recursos por Notetags (Database)

Notetags podem ser usadas para customizar custos de recuperação para estados específicos.

- **`<Hospital Cost: x>`**: Usada na caixa de notas de um **Estado**. Substitui o custo padrão de recuperação (`State Cost`) por `x`.

## 5. Guia de Recursos via JavaScript (Avançado)

Para funcionalidades mais avançadas, você pode usar chamadas de script.

### 5.1. Abrir a Cena do Hospital via Script

Para abrir a cena do hospital através de um script, use o seguinte comando:

```javascript
SceneManager.push(Scene_Hospital);
```

### 5.2. Fórmulas de Custo com JavaScript

As fórmulas de custo nos parâmetros do plugin aceitam JavaScript, permitindo custos dinâmicos.

**Exemplo de Custo Dinâmico:**
Para criar um custo de HP que aumenta com o nível do líder do grupo, você pode usar uma fórmula como esta no parâmetro `Cost Per HP`:

`1.0 + ($gameParty.leader().level * 0.1)`

Isso fará com que o custo base de 1.0 aumente em 0.1 para cada nível do líder do grupo.
# Guia do Plugin VisuMZ_0_CoreEngine

Este guia prático destina-se a desenvolvedores de jogos no RPG Maker MZ, detalhando como utilizar o plugin `VisuMZ_0_CoreEngine` da VisuStella, desde a configuração inicial até o uso avançado de seus recursos.

## 1. Introdução e Instalação

### 1.1. O que é o Core Engine?

O `Core Engine` é um plugin fundamental da VisuStella para o RPG Maker MZ. Ele serve como base para todos os outros plugins da VisuStella, garantindo a melhor compatibilidade e estabilidade.

Sua função principal é corrigir bugs nativos do motor do RPG Maker MZ e expandir o controle que os desenvolvedores têm sobre diversas funcionalidades do jogo. Isso inclui desde mecânicas e melhorias de qualidade de vida (Quality of Life) até a parte estética.

**Principais funcionalidades:**

- **Correção de Bugs:** Soluciona uma vasta lista de problemas existentes no código base do RPG Maker MZ.
- **Melhorias de Qualidade de Vida:** Adiciona diversas configurações que podem ser ativadas para melhorar a experiência do jogador e do desenvolvedor (ex: controles modernos, agrupamento de dígitos em números grandes).
- **Controle de Cores:** Permite a customização de todas as cores de texto usadas no jogo.
- **Expansão de Recursos:** Aumenta limites (como ouro máximo), permite pré-carregar imagens, adiciona imagens de fundo em menus, e muito mais.
- **Segurança para Eventos:** Adiciona mecanismos de segurança para comandos de evento que usam Script Calls, evitando que o jogo trave em caso de erro.

### 1.2. Requisitos e Instalação

**Requisitos:**

- Este plugin foi feito exclusivamente para o **RPG Maker MZ** e não funcionará em outras versões do RPG Maker.

**Instalação:**
O `Core Engine` é um plugin de **Tier 0**. Isso significa que ele deve ser colocado no topo da sua lista no Gerenciador de Plugins, acima de plugins de tiers maiores (1, 2, 3, etc.). Essa ordem é crucial para garantir que os plugins da VisuStella funcionem corretamente e sem conflitos.

1. Faça o download do arquivo `VisuMZ_0_CoreEngine.js`.
2. Copie o arquivo para a pasta `js/plugins/` do seu projeto.
3. Abra o **Gerenciador de Plugins** no RPG Maker MZ.
4. Adicione o `VisuMZ_0_CoreEngine` à lista e certifique-se de que ele esteja no topo, ou pelo menos acima de todos os outros plugins da VisuStella.
5. Ative o plugin.

## 2. Configurações Iniciais (Plugin Parameters)

Esta seção detalha os "Parâmetros do Plugin", que permitem customizar o motor do seu jogo. Cada opção é explicada abaixo, com dicas de quando e como usá-la.

### 2.1. Quality of Life Settings (Melhorias de Qualidade de Vida)

Um conjunto de configurações opcionais para melhorar a experiência de desenvolvedores e jogadores.

#### **Play Test (Teste de Jogo)**

Opções que facilitam o processo de teste do seu jogo.

- **New Game on Boot:** Inicia um novo jogo automaticamente ao entrar no modo de teste.
  - **Quando usar:** Ative para pular a tela de título e ir direto para o jogo, agilizando os testes de mapas e eventos iniciais.
- **Open Console on Boot:** Abre o console de depuração (F12) automaticamente ao iniciar o teste.
  - **Quando usar:** Essencial para desenvolvedores que trabalham com JavaScript, permitindo ver logs e erros sem precisar abrir o console manualmente.
- **F6: Toggle Sound:** A tecla F6 alterna todo o áudio do jogo entre 100% e 0%.
  - **Quando usar:** Útil para testar o jogo em silêncio sem alterar as configurações de volume do seu computador.
- **F7: Toggle Fast Mode:** A tecla F7 ativa um modo rápido, acelerando o jogo.
  - **Quando usar:** Use para atravessar mapas e batalhas rapidamente durante os testes.

#### **Battle Test (Teste de Batalha)**

Configurações específicas para a função "Teste de Batalha" do banco de dados.

- **Add Item/Weapon/Armor Type:** Adiciona cópias de todos os itens, armas ou armaduras do banco de dados ao seu inventário durante o teste de batalha.
  - **Quando usar:** Facilita o teste de itens e equipamentos sem precisar adicioná-los manualmente à tropa.
- **Shift+R: Recover All:** Durante um teste de batalha, pressione SHIFT + R para restaurar completamente o HP/MP e remover status de todo o grupo.
  - **Quando usar:** Permite recomeçar uma luta ou testar diferentes estratégias rapidamente sem precisar reiniciar o teste.
- **Shift+T: Full TP:** Pressione SHIFT + T para encher o TP de todo o grupo.
  - **Quando usar:** Ideal para testar habilidades que consomem TP sem a necessidade de carregar a barra em batalha.

#### **Digit Grouping (Agrupamento de Dígitos)**

Formata números grandes com separadores para facilitar a leitura (ex: 1000000 vira 1,000,000).

- **Standard Text / Ex Text / Damage Sprites / Gauge Sprites:** Ativa o agrupamento para diferentes partes da interface.
- **Country/Locale:** Define o estilo de formatação (ex: `en-US` para `1,000.00` ou `pt-BR` para `1.000,00`).
  - **Quando usar:** Ative se seu jogo lida com números muito altos (dano, ouro, etc.) para que o jogador possa lê-los facilmente.

#### **Player Benefit (Benefícios para o Jogador)**

Pequenas ajudas para tornar a experiência do jogador menos frustrante.

- **Encounter Rate Min:** Define um número mínimo de passos que o jogador pode dar em um mapa antes que uma batalha aleatória ocorra.
  - **Quando usar:** Aumente este valor para dar ao jogador um "período de segurança" após uma batalha, evitando encontros consecutivos e frustrantes.
- **Escape Always:** Permite que o grupo sempre consiga fugir de batalhas com 100% de chance.
  - **Quando usar:** Ative se você prefere que a fuga seja uma opção tática garantida, em vez de uma questão de sorte.
- **Level Up -> Full HP/MP:** Recupera todo o HP ou MP de um ator quando ele sobe de nível.
  - **Quando usar:** Uma mecânica de recompensa comum que ajuda o jogador a continuar explorando após uma batalha difícil que resultou em um level up.

#### **Misc (Diversos)**

Outras melhorias e customizações variadas.

- **Modern Controls:** Habilita o uso das teclas Home/End para ir ao início/fim de listas e Shift + Cima/Baixo para paginar.
  - **Quando usar:** Ative se seu jogo possui menus com muitas opções (itens, habilidades), pois melhora drasticamente a navegação para o jogador.
- **Pixel Image Rendering:** Renderiza as imagens de forma pixelada, sem suavização.
  - **Quando usar:** Essencial para jogos com estética pixel art, garantindo que os gráficos permaneçam nítidos e fiéis ao estilo.
- **Require Focus?:** Pausa o jogo automaticamente se a janela do jogo não estiver em foco.
  - **Quando usar:** Útil para evitar que o jogador perca eventos ou diálogos importantes caso clique fora da janela do jogo.

### 2.2. Battle System (Sistema de Batalha)

Define o sistema de batalha padrão para o seu jogo.

- **Opções:** Você pode escolher entre `DTB` (padrão), `TPB (Active)` ou `TPB (Wait)`.
- **Outros Sistemas:** Para usar sistemas como `ATB`, `CTB`, `BTB`, etc., você precisa dos plugins específicos da VisuStella para cada um deles. Este parâmetro garante que o sistema correto seja carregado.
  - **Como usar:** Selecione o sistema de batalha que você planeja usar como padrão. Lembre-se que isso pode ser alterado durante o jogo via Notetags ou Comandos de Plugin.

### 2.3. Color Settings (Configurações de Cor)

Permite customizar as cores usadas em vários textos e elementos da interface do jogo.

- **Como usar:** Para cada opção (Normal, System, Crisis, HP Gauge, etc.), você pode usar um número para se referir à cor correspondente no arquivo `Window.png` do seu sistema, ou pode usar um código de cor hexadecimal (ex: `#FF0000` para vermelho puro).
  - **Exemplo prático:** Para deixar o dano de "Power Up" com uma cor dourada, você pode definir o parâmetro `Power Up` como `#FFD700`. Isso dá uma identidade visual única ao seu jogo.

## 3. Guia de Recursos por Eventos (Plugin Commands)

O Core Engine adiciona uma série de "Comandos de Plugin" que expandem o que você pode fazer através do sistema de eventos do RPG Maker, sem a necessidade de escrever JavaScript.

### 3.1. Usando os Plugin Commands

Para usar, crie um comando de evento "Comando de Plugin" (na terceira página) e selecione o plugin `VisuMZ_0_CoreEngine`. A lista de comandos disponíveis aparecerá.

#### **Animation (Animação)**

- **`Animation: Play at Coordinate`**: Toca uma animação em uma coordenada X e Y específica no mapa, em vez de em um personagem.
  - **Exemplo prático:** Em uma cutscene, um canhão dispara. Use este comando para mostrar uma animação de explosão no local exato onde a bala de canhão atinge uma parede, especificando as coordenadas X e Y do impacto.

#### **Audio (Áudio)**

- **`Audio: Change Current BGM Volume/Pitch/Pan`**: Altera o volume, tom (pitch) ou balanço (pan) da música de fundo (BGM) que está tocando no momento, sem reiniciá-la.
  - **Exemplo prático:** O jogador entra em uma área subaquática. Em vez de trocar a música, use `Change Current BGM Pitch` para diminuir o tom e `Change Current BGM Volume` para baixar o volume, criando uma versão "abafada" da música do mapa.

#### **Game (Jogo)**

- **`Game: Open URL`**: Abre uma URL no navegador padrão do jogador.
  - **Exemplo prático:** Crie um NPC que, ao interagir, oferece ao jogador a opção de visitar o site oficial do seu jogo ou sua página em redes sociais.

#### **Gold (Ouro)**

- **`Gold: Gain/Lose`**: Permite adicionar ou remover uma quantidade de ouro que excede o limite do editor de eventos padrão.
  - **Exemplo prático:** Use para dar recompensas de missões épicas que valem milhões de ouro, ou para criar um "ladrão" que rouba uma grande quantia do jogador.

#### **Map (Mapa)**

- **`Map: Once Parallel`**: Executa um Evento Comum em paralelo apenas uma vez, sem entrar em loop.
  - **Exemplo prático:** Quando o jogador pisa em uma armadilha, use este comando para chamar um evento comum que escurece a tela e toca um som, mas apenas uma vez, evitando que a armadilha dispare repetidamente.

#### **Picture (Imagem)**

- **`Picture: Easing Type`**: Aplica um efeito de "easing" (aceleração/desaceleração) a um movimento de imagem, tornando-o mais suave e profissional.
  - **Como usar:** Crie um comando `Move Picture`, desative a opção "Wait for Completion". Logo em seguida, insira o comando `Picture: Easing Type` e escolha um efeito como "Ease Out". O movimento da imagem começará rápido e terminará suavemente.
- **`Picture: Erase All` / `Picture: Erase Range`**: Apaga todas as imagens da tela ou um intervalo de imagens de uma só vez.
  - **Exemplo prático:** Ao final de uma cutscene complexa que usou dezenas de imagens, use `Erase All` para limpar a tela instantaneamente, em vez de apagar cada imagem uma por uma.
- **`Picture: Show Icon`**: Mostra um ícone do banco de dados como se fosse uma imagem.
  - **Exemplo prático:** Use para exibir um ícone de "!" sobre a cabeça de um NPC para indicar uma missão, controlando-o como uma imagem normal (mover, apagar, etc.).

#### **System (Sistema)**

- **`System: Battle System Change`**: Altera o sistema de batalha atual (DTB, TPB, etc.).
  - **Exemplo prático:** Crie uma "arena de desafios" no seu jogo. Ao entrar na arena, use este comando para mudar o sistema de batalha para `TPB (Active)` para um desafio mais dinâmico e baseado em tempo.
- **`System: Load Images`**: Pré-carrega um conjunto de imagens na memória.
  - **Exemplo prático:** Antes de uma cutscene importante com muitas imagens grandes, use este comando para pré-carregá-las. Isso evita que o jogo "engasgue" ou tenha atrasos para exibir as imagens pela primeira vez.
- **`System: Main Font Size`**: Altera o tamanho da fonte principal do jogo.
  - **Exemplo prático:** Crie um item "Lupa" que, ao ser usado, aumenta o tamanho da fonte para jogadores com dificuldade de leitura, ou crie um efeito de "confusão" que diminui a fonte temporariamente.

#### **Text Popup (Popup de Texto)**

- **`Text Popup: Show Text`**: Mostra uma pequena janela de texto que aparece e desaparece sem pausar o jogo.
  - **Exemplo prático:** Ao coletar um item de um baú, use este comando para notificar o jogador: "Você recebeu 1 Poção!". A mensagem aparece rapidamente e o jogador pode continuar se movendo, tornando a exploração mais fluida.

## 4. Guia de Recursos por Notetags (Database)

As Notetags são pequenas "etiquetas" de texto que você pode adicionar às caixas de notas no banco de dados (Atores, Classes, Itens, Mapas, etc.) para ativar funcionalidades especiais do plugin.

### 4.1. Atores, Classes e Inimigos

- **`<Max Level: x>`**
  - **Onde usar:** Atores.
  - **O que faz:** Define o nível máximo de um ator para `x`, ultrapassando o limite de 99 do editor.
  - **Exemplo prático:** Use `<Max Level: 500>` na caixa de notas do seu protagonista para permitir uma progressão de personagem mais longa em um jogo com muito conteúdo de endgame.

- **`<Learn At Level: x>`**
  - **Onde usar:** Na caixa de notas de uma habilidade, dentro da lista de habilidades de uma Classe.
  - **O que faz:** Permite que a classe aprenda a habilidade no nível `x`, mesmo que seja acima de 99.
  - **Exemplo prático:** Para ensinar uma habilidade "ultimate" no nível 120, adicione `<Learn At Level: 120>` na nota da habilidade na lista da classe.

- **`<Level: x>` e `<param: x>`**
  - **Onde usar:** Inimigos.
  - **O que faz:** Define o nível do inimigo como `x` (útil para fórmulas de dano) e seus parâmetros base (MaxHP, ATK, DEF, etc.) para `x`, ultrapassando os limites do editor.
  - **Exemplo prático:** Crie um super chefe. Na caixa de notas do inimigo, use `<Level: 200>` e `<ATK: 5000>` para torná-lo muito mais forte do que o editor permitiria, sem precisar de truques com estados.

### 4.2. Animações

- **`<Head>` ou `<Foot>`**
  - **Onde usar:** No nome da Animação no banco de dados.
  - **O que faz:** Fixa a animação na cabeça (`<Head>`) ou nos pés (`<Foot>`) do alvo, em vez de no centro.
  - **Exemplo prático:** Se você tem uma animação de magia de "confusão" que deve aparecer sobre a cabeça do inimigo, renomeie a animação para `Confusão <Head>`.

- **`<Anchor X: x>` e `<Anchor Y: y>`**
  - **Onde usar:** No nome da Animação.
  - **O que faz:** Define a âncora da animação em um ponto percentual do sprite do alvo (0.0 é esquerda/topo, 1.0 é direita/baixo).
  - **Exemplo prático:** Para uma animação de "escudo" que deve aparecer no braço de um personagem (que está a 70% da altura e 30% da largura), você pode nomear a animação como `Escudo Mágico <Anchor X: 0.3> <Anchor Y: 0.7>`.

### 4.3. Mapas

- **`<Minimum Encounter Steps: x>`**
  - **Onde usar:** Mapas.
  - **O que faz:** Define o número mínimo de passos `x` antes que uma batalha aleatória possa ocorrer naquele mapa, sobrepondo a configuração padrão do plugin.
  - **Exemplo prático:** Em uma cidade segura, use `<Minimum Encounter Steps: 9999>` na caixa de notas do mapa para efetivamente desativar encontros aleatórios.

- **`<Scroll Lock X>` ou `<Scroll Lock Y>`**
  - **Onde usar:** Mapas.
  - **O que faz:** Trava a rolagem da câmera no eixo horizontal (X) ou vertical (Y).
  - **Exemplo prático:** Em um corredor longo e estreito que tem exatamente a altura da tela, use `<Scroll Lock Y>` na nota do mapa para evitar que a câmera se mova para cima e para baixo desnecessariamente.

### 4.4. Parâmetros (Plus, Rate, Flat)

Essas notetags são usadas para modificar os parâmetros dos personagens e podem ser colocadas em Atores, Classes, Armas, Armaduras, Inimigos e Estados.

- **Explicando a diferença:**
  - **`Plus`**: Soma um valor ao cálculo base do parâmetro. É afetado por porcentagens.
  - **`Rate`**: Multiplica o valor do parâmetro. Vários `Rate` são multiplicados entre si.
  - **`Flat`**: Soma um valor no final de todos os outros cálculos. É um bônus (ou penalidade) direto.

- **`<param Plus: +x>` ou `<param Plus: -x>`**
  - **Exemplo prático:** Para uma "Espada Longa" que dá +10 de ataque, use `<ATK Plus: +10>` na caixa de notas da arma.

- **`<param Rate: x%`> ou `<param Rate: x.x>`**
  - **Exemplo prático:** Para um estado "Enfraquecido" que corta o ataque do alvo pela metade, use `<ATK Rate: 50%` (ou `<ATK Rate: 0.5>`) na caixa de notas do estado.

- **`<param Flat: +x>` ou `<param Flat: -x>`**
  - **Exemplo prático:** Para uma "Bênção Divina" que sempre adiciona +100 de HP no final de tudo, use `<MaxHP Flat: +100>` na nota do estado.

## 5. Guia de Recursos via JavaScript (Avançado)

Para desenvolvedores familiarizados com JavaScript, o Core Engine oferece ferramentas poderosas para criar mecânicas complexas que não seriam possíveis apenas com eventos.

### 5.1. Usando Notetags com JavaScript

Estas notetags permitem que você use código JavaScript para calcular dinamicamente os bônus de parâmetros. Elas podem ser usadas em Atores, Classes, Armas, Armaduras, Inimigos e Estados.

- **`<JS param Plus: code>`**
- **`<JS param Rate: code>`**
- **`<JS param Flat: code>`**

  - **O que fazem:** Assim como as notetags de parâmetro normais, elas modificam os atributos de um personagem, mas o valor é determinado pelo `code` JavaScript que você escreve. Dentro do código, você pode usar `user` para se referir ao personagem que possui a notetag.

  - **Exemplo prático:** Crie um estado "Fúria" que aumenta o ataque do personagem com base em sua vida perdida. Na caixa de notas do estado, use:
    `<JS ATK Rate: 2.0 - user.hpRate()>`
    - **Explicação:** `user.hpRate()` retorna a porcentagem de HP atual do personagem (de 1.0 para 100% a 0.0 para 0%). Com HP cheio, o bônus é `2.0 - 1.0 = 1.0` (sem alteração). Com HP quase zerado, o bônus se aproxima de `2.0 - 0.0 = 2.0` (o dobro de ataque).

### 5.2. Script Calls em Eventos (Atalhos)

O Core Engine cria vários atalhos de script para simplificar o código que você escreve no comando de evento "Script".

- **`$commonEvent(id)`**: Coloca um evento comum na fila para ser executado.
- **`$onceParallel(id)`**: Executa um evento comum em paralelo uma única vez.
- **`$scene`**: Refere-se à cena atual (mapa, menu, batalha, etc.).
- **`$gameParty`**: Refere-se ao grupo do jogador.
- **`$event`**: Refere-se ao evento que está executando o script.

  - **Exemplo prático:** Em vez de usar múltiplos comandos de evento para curar o líder do grupo, use um único comando "Script" com o seguinte código:
    `$gameParty.leader().gainHp(100);`
    - Isso cura 100 de HP do líder do grupo de forma rápida e limpa.

  - **Exemplo prático 2:** Para chamar um evento comum (ID 5) que toca um som e mostra uma animação sem travar o evento atual, use:
    `$onceParallel(5);`

### 5.3. "Show Scrolling Text" como Bloco de Script

O comando de evento "Script" tem um limite de 12 linhas, o que pode ser pouco para lógicas complexas. O Core Engine oferece uma solução inteligente para isso.

- **Como usar:** Crie um comando de evento "Show Scrolling Text" (Exibir Texto Rolante). Na primeira linha do texto, escreva exatamente `// Script Call`. Todo o texto que você escrever abaixo disso será executado como um único e grande bloco de código JavaScript.

- **Quando usar:** É a melhor abordagem quando você precisa de um script complexo com várias linhas, laços (`for`), ou condicionais (`if/else`) dentro de um único evento. Isso mantém seu código organizado em um só lugar, em vez de dividi-lo em vários comandos de "Script".

  - **Exemplo prático:** Crie um evento que verifica se o jogador possui 3 itens diferentes e, se possuir, remove-os e dá uma recompensa. Fazer isso com condicionais de evento seria longo. Com um bloco de script, fica mais fácil:

    '''javascript
    // Script Call
    if ($gameParty.hasItem($dataItems[10]) &&
        $gameParty.hasItem($dataItems[11]) &&
        $gameParty.hasItem($dataItems[12])) {

      $gameParty.loseItem($dataItems[10], 1);
      $gameParty.loseItem($dataItems[11], 1);
      $gameParty.loseItem($dataItems[12], 1);
      $gameParty.gainGold(500);
      $gameSystem.playSe({"name": "Shine", "volume": 90, "pitch": 100, "pan": 0});

    } else {
      // Código para caso o jogador não tenha os itens
    }
    '''

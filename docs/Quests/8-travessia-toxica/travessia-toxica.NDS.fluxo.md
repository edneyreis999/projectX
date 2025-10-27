# 🎮 Narrative Structure Document (NSD) - Fluxo Visual De Cenas

## 📄 Quest: Travessia Tóxica

### 1️ Resumo Geral *(Checkpoint 0)*

- [x] **Concluído**  
- **Nome da quest**: Travessia Tóxica  
- **Importância na campanha**: Main  
- **Arco narrativo**: Recusa do Chamado  
- **Quest anterior**: Travessia Perigosa  
- **Conflito central**: O grupo encontra a mina abandonada, adaptada como esgoto de Gildrat, infestada por mutações venenosas. Não há outro caminho, pois todos os outros foram bloqueados pela recente avalanche. Só resta ao grupo avançar. [Ler mais sobre a mina em](../../GDD/2-world-building/locais/mina-esgoto/mina-do-esgoto.md) -
- **Objetivo narrativo global**: Introduzir a primeira cena de retorno ao Coreto com Rheed e as crianças, criar atmosfera claustrofóbica, reforçar a ameaça das mutações e introduzir o Símbolo da Trégua como mecânica antes do retorno à Gildrat.
- **Premissa resumida**: Thorin e os guerreiros da Guarda de Ferro que o acompanham encontram a entrada de uma antiga mina/esgoto, enquanto fogem da tempestade de neve. Exploram dois níveis repletos de puzzles, armadilhas ambientais e criaturas mutantes, culminando no confronto com o chefe Pestesporo antes que possam deixar a Mina do Esgoto. [Ler mais sobre as criaturas da mina em](frontend/docs/GDD/4-personagens-inimigos-criaturas/mina-do-esgoto.md) -
- **Resumo**: Após a sequência da nevasca, o grupo encontra a entrada de uma mina abandonada que servia como sistema de esgoto anão. O 1º nível introduz puzzles, sinalizações, a nova cena de Rheed e o Símbolo da Trégua. O 2º nível intensifica os combates e conduz à Câmara de Decantação, onde o chefe Pestesporo desperta.
- **Locais principais**:  
  - Entrada da Mina do Esgoto
  - Coreto (dissipação da névoa das memórias e volta para a cena do Rheed)
  - Anel de Manutenção (1º andar)
  - Galerias de Drenagem (2º andar)
**NPCs principais**:  
  - Thorin  
  - Kilin  
  - Mhordred  
  - Tharok
  - Rheed
  - Crianças
**Criaturas principais**:
  - Pestesporo (boss)
  - Slimes tóxicos
  - Vermes do lodo
  - Cogumelos esporulantes

### 2️ Pré-condições Narrativas (Checkpoint 1)

- [x] **Concluído**

| Tipo | Descrição |
|------|-----------|
| **Flags / Decisões anteriores** | Jogador concluiu a quest “Travessia Perigosa.” |
| **Limitações ou bloqueios** | Caminho principal do Mapamúndi bloqueado por uma grande avalanche e deslizamento de rochas. Entrada da Mina do Esgoto desbloqueada. |

### 3️ Fluxo Visual Resumido *(Checkpoint 2)*

Quest: Travessia Tóxica - Mina do Esgoto
 ├── Cena 1: Entrada e Anel de Manutenção — Premissa: exploração inicial, puzzles, ambientação e avanço na narrativa
 │      ├── Beat 1: Descoberta da entrada sob neve (🎬)
 │      ├── Beat 2: Corredor circular e puzzles de válvulas (🎮)
 │      ├── Beat 3: Leitura de registros e runas (🎮)
 │      └── Beat 4: Primeira cena em que a névoa das lembranças é cortada e a cena volta ao Coreto com Rheed e as crianças(🎮)
        └── Beat 5: Aquisição do item Símbolo da Trégua (🎮)
 ├── Cena 2: Galerias de Drenagem — Premissa: combate intensificado e riscos ambientais
 │      ├── Beat 1: Travessia por passadiços sobre lodo (🎮)
 │      ├── Beat 2: Encontros com mutações “Poison” (🎮)
 │      ├── Beat 3: "Apagar das Luzes" Apartir deste ponto todo o ambiente ficará escuro e para avançar será necessário uma lamparina ou algo do tipo. Visão através da lamparina apenas 3 tiles em todas as direções (🎮)
 │  
 └── Cena 3: Câmara de Decantação Anóxica — Premissa: confronto contra Pestesporo
        ├── Beat 1: Descoberta da câmara e ambientação (🎬)
        ├── Beat 2: Confronto contra Pestesporo (fases de combate) (🎮)
        └── Beat 3: Volta para o World Map (🎬)

#### 4 Tabela de Cenas

| # | Nome da Cena                | Premissa resumida (expandida)                                                                                                                                                              |
| - | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | **Entrada e Anel de Manutenção**     | Forçados a se abrigar da nevasca, o grupo entra em uma mina abandonada. O primeiro nível foca na exploração, resolução de puzzles com válvulas e descoberta de lore, culminando em uma quebra narrativa com Rheed que introduz o item “Símbolo da Trégua”. |
| 2 | **Galerias de Drenagem**  | A descida para o segundo nível intensifica o perigo com combate contra novas mutações venenosas em passadiços precários. A tensão aumenta drasticamente quando as luzes se apagam, forçando a navegação em escuridão quase total com uma fonte de luz limitada. |
| 3 | **Câmara de Decantação Anóxica**  | O grupo alcança a câmara final do complexo. Após uma cena que revela a ameaça central, eles enfrentam o chefe Pestesporo em uma batalha de múltiplas fases. A vitória garante a saída segura da mina.         |

#### Beats por Cena

##### Cena 1 – Entrada e Anel de Manutenção

| #  | Beat                                             | Descrição / Decisões do Jogador                        | Controle |
| ---|-------------------------------------------------|-------------------------------------------------------|----------|
| 1  | Descoberta da entrada sob neve                                  | O grupo, fugindo da avalanche e da tempestade, encontra a entrada da antiga mina/esgoto, o único caminho possível.  | 🎬       |
| 2  | Corredor circular e puzzles de válvulas                         | O jogador explora o anel de manutenção e deve resolver puzzles ambientais, manipulando válvulas para drenar lodo ou abrir passagens.               | 🎬       |
| 3  | Leitura de registros e runas                             | Opcionalmente, o jogador pode encontrar e ler antigos registros anões, descobrindo mais sobre a história do local e a origem das criaturas.          | 🎬       |
| 4  | Névoa das lembranças                                  | A primeira cena de quebra narrativa ocorre: a realidade da mina se dissipa e o jogador é transportado para o Coreto, com Rheed e as crianças. | 🎮       |
| 5  | Aquisição do Símbolo da Trégua                            | Após a interação com Rheed, Thorin encontra o item "Símbolo da Trégua", que introduz uma nova mecânica de jogo. | 🎬       |
| 6  | Funcionalidade do Símbolo da Trégua       | O item permite acumular e absorver as batalhas convencionais do mapa mundi para serem enfrentadas em um combate único posteriormente. | 🎮       |

##### Cena 2 – Galerias de Drenagem

| #  | Beat                                      | Controle  |                                                                           | Descrição/ decisões do jogador |
-----------------------------------------------------------------------------------------------------------------------------------------------|----------|
| 1  | Travessia por passadiços sobre lodo         | O jogador deve atravessar por passadiços estreitos e perigosos suspensos sobre poças de lodo tóxico. | 🎮       |
| 2  | Encontros com mutações “Poison”     | Combates contra novos inimigos como Slimes Tóxicos e Vermes do Lodo, que aplicam o status de veneno e representam uma ameaça maior.| 🎮       |
| 3  | Apagar das Luzes           | Em um ponto específico, as luzes do ambiente se apagam. O jogador precisa usar uma lamparina (ou item similar) para iluminar uma área restrita (3 tiles) ao seu redor para poder avançar. | 🎮       |

##### Cena 3 –  Câmara de Decantação Anóxica

| #  | Beat                                          | Descrição                                                                                                            | Controle |
| ---|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------------|----------|
| 1  | Descoberta da câmara e ambientação             | O grupo entra na câmara final. Uma cutscene revela o ambiente e o chefe Pestesporo, adormecido no centro da área. | 🎬       |
| 2  | Confronto contra Pestesporo                        | Pestesporo desperta. O jogador deve lutar contra o chefe em um combate com múltiplas fases e mecânicas específicas. | 🎬       |
| 3  | Volta para o World Map                           | Após a derrota do chefe, uma passagem é liberada. Uma cutscene final mostra o grupo saindo da mina e retornando ao mapa do mundo, encerrando a quest. | 🎮       |

## 5 Fluxo de Gameplay (resumo)

Nível 1 (combate moderado): Entrada → corte para o Rheed → retorno ao jogo que leva à uma Câmara onde estará o Símbolo de Trégua → Leitura de sinalizações → Casa de Válvulas inativa → Descida ao Nível 2.

Nível 2 (Combate massivo): Plataformas sobre lodo → Salas de gradeamento → Corredores de condensado → Câmara (boss) → saída interna.

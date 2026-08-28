# NSD - Quando o Segundo Sol Chegar (Fluxo Visual de Quests)

## O Troféu Quebrado (Thordan - Quest de Prelúdio)

- Thorin, Mhordred, Filena e Balastrus retornam da Quest: "Quebra do selo em Mélios", que se encerra logo após a discussão do conselho onde Balastrus é absolvido das acusações e Thorin desafia o pai para se tornar membro da Guarda de Ferro.

- Thordan deixa a corte logo depois e vai para casa. Antes de sair, entretanto, ele diz a Thorin que deseja falar com ele. Isso encerra a quest anterior: "Quebra do Selo em Mélios", e dá início a quest: "Troféu Quebrado". Thorin encontra Thordan na cozinha de sua casa, o mesmo local onde a primeira discussão entre os dois aconteceu, ainda no início do jogo. Um de seus troféus de futebol rúnico está sobre a mesa, seu pai encara o objeto em silêncio. Thorin pode se aproximar e iniciar a conversa. Quando isso acontece, Thordan confessa o real motivo de seu ódio: "Mélia... ela adorava ver você jogar. Ela adorava esse jogo estúpido ainda mais do que eu. E no fim... ela amou mais a liberdade dela do que a nós." Ele revela que, após ela partir, ele não conseguia mais olhar para o campo e para o jogo, ou para Thorin, sem sentir a dor do abandono dela.

- O Jogador tem multipla escolha: Se Thorin for acusatório ("E você me culpou por isso.") - Thordan responde sem raiva: "Eu entendo que esteja com raiva de mim. Você tem os olhos dela e também o mesmo temperamento. Não deixe que o mundo quebre você... como me quebrou, filho. Isto é para você". Thordan entrega a Thorin um pequeno baú com sua velha funda dentro, feita com pele especial de um Lobo de Gelo, caçado por ele mesmo. Ele explica que em sua juventude, essa também era sua arma preferida.

- Se Thorin escolher ser empático, seu pai o chama para seus aposentos pessoais, um local que o garoto raramente visita. O quarto é austero, militar, exceto por um pequeno baú trancado e uma foto de sua mãe na parede. Seu pai o encara: "Eu rejeitei seu caminho. Eu tentei forçá-lo a ser o que eu queria. Hoje reconheço o erro que cometi". Ele abre o baú. Lá dentro está uma Funda (Sling) belíssima e elaborada, feita com pele de Lobo de Gelo.

- Descrição do Item: Não é uma funda de criança. Ela é tecida com tiras de couro e trançada com os fios de metal. O berço da funda, onde pedras se encaixam, é forrado com um pequeno pedaço de seda azul-claro, a cor do vestido favorito de Mélia.Thordan entrega a funda a Thorin. "Sua mãe a teceu. Que ela proteja o que restou da minha família".

- Thordan, em seguida, leva Thorin até um espaço de treinamento que fica dentro do vestiário, no estádio dos Machados Enferrujados, onde pequenos alvos estão espalhados. Ele ensina o filho a atirar com mais precisão e força, além de entregar alguns minérios com aparência rudimentar. "Isso é resultado do tempo da minha aliança com Balastrus, você sabe... antes dele trair a todos nós. Atire, você vai gostar".

- Enquanto estiver usando essa munição, os ataques de Thorin causam dano extra baseado no atributo escolhido (munição pode ser explosiva, bomba de fumaça, veneno entre outros).

- Após a escolha do caminho pelo jogador, a quest: "Troféu Quebrado" se encerra. Thordan pede que o filho tome cuidado, o manda sair em patrulha - e A quest "Quando o Segundo Sol Chegar" - (com todas as suas mini-quests) é iniciada!

## Resumo Geral (Checkpoint 0)

- Importância: Hub sistêmico de preparação para a defesa de Gildrat após "Quebra do Selo em Melios".
- Escopo: 19 quests distribuídas em 5 variáveis principais; escala 0-100 com Lei de Pareto (versão 2.0 do índice - 2025-11-04).
- Objetivo: permitir ao jogador fortalecer armadilhas, Guarda de Ferro, exército civil, influência dos Corvos e reforço com Sigmetal antes da batalha final.
- Resultado: cada variável pode chegar a 100 pontos; Sigmetal atua como multiplicador global de dano (+50% em 100).

## Variáveis e Totais

| Variável | Função | Quests | Pontuação Máxima |
| --- | --- | --- | --- |
| v_pontos_armadilhas | Reduz grupos de inimigos na Fase 1 | 3 | 100 |
| v_forca_guarda | Dano/impacto da Guarda de Ferro | 5 | 100 |
| v_forca_civil | Dano/impacto de rebeldes + civis + time rúnico | 5 | 100 |
| v_influencia_corvos | Dano/impacto dos Corvos | 3 | 100 |
| v_reforco_sigmetal | Multiplicador global de dano (0→+50%) | 3 | 100 |

## Quests por Variável (conforme 00-indice-quests)

### Armadilhas → v_pontos_armadilhas

| # | Quest | Dificuldade | Localização | Pontos | Requisitos |
| --- | --- | --- | --- | --- | --- |
| 01 | Testar Dinamite | Fácil | Estrada do Cão-luar | +50 | N/A |
| 02 | Testar Armadilhas | Fácil | Estrada do Cão-luar | +25 | N/A |
| 03 | Apaziguar Discussões | Fácil | Distrito Comercial | +25 | N/A |

### Guarda de Ferro → v_forca_guarda

| # | Quest | Dificuldade | Localização | Pontos | Requisitos |
| --- | --- | --- | --- | --- | --- |
| 01 | Treinando a Guarda de Ferro | Fácil | Campo de Treinamento | +30 | N/A |
| 02 | Resgatando Killin | Difícil | Campo de Treinamento | +30 | Ter completado "Treinando a Guarda de Ferro" |
| 03 | Boas-vindas à Guarda de Ferro | Fácil | Taverna da Pedra Vulcânica | +10 | Ter completado "Resgatando Killin" |
| 04 | Guerreiro Fragmentado | Fácil | Campo de Treinamento | +15 | Ter completado "Resgatando Killin" e "Boas-vindas à Guarda de Ferro" |
| 05 | O Novo Lorde Anão | Fácil | Taverna da Pedra Vulcânica | +15 | Ter completado "Resgatando Killin" |

### Exército Civil → v_forca_civil

| # | Quest | Dificuldade | Localização | Pontos | Requisitos |
| --- | --- | --- | --- | --- | --- |
| 01 | Resgatar Rebeldes e Borin em Kravens | Média | Casa da Filena | +30 | N/A |
| 02 | Resgatar Grupos de Rebeldes em Kravens | Fácil | Campo de Treinamento | +20 | Ter completado "Resgatar Rebeldes e Borin em Kravens" |
| 03 | Treinar Time Rúnico | Fácil | Campo de Treinamento | +15 | N/A |
| 04 | Recrutar Civis | Fácil | Campo de Treinamento | +20 | N/A |
| 05 | Treinar Civis | Fácil | Campo de Treinamento | +15 | Ter completado "Recrutar Civis" |

### Corvos → v_influencia_corvos

| # | Quest | Dificuldade | Localização | Pontos | Requisitos |
| --- | --- | --- | --- | --- | --- |
| 01 | Resgatar Corvos e Família Principal | Difícil | Sala do Conselho | +35 | N/A |
| 02 | Canção Ancestral | Mediana | Sala do Conselho | +35 | Ter completado "Resgatar Corvos e Família Principal" |
| 03 | Treinar Corvos | Mediana | Sala do Conselho | +30 | Ter completado "Canção Ancestral" |

### Sigmetal → v_reforco_sigmetal

| # | Quest | Dificuldade | Localização | Pontos Sigmetal | Requisitos |
| --- | --- | --- | --- | --- | --- |
| 01 | Coletar Sigmetal na Câmera Revelada | Difícil | Estrada do Cão-luar | 0 (desbloqueio) | N/A |
| 02 | Encontrar Ferreiro Para Armaduras | Mediano | Distrito Comercial | +50 | Ter completado "Coletar Sigmetal na Câmera Revelada" |
| 03 | Encontrar Ferreiro Para Armas | Mediano | Distrito Comercial | +50 | Ter completado "Coletar Sigmetal na Câmera Revelada" |

## Fluxo de Progressão Recomendado

### Fase 1 – Preparo inicial (sem requisitos)

- Testar Dinamite; Testar Armadilhas; Apaziguar Discussões.
- Resgatar Rebeldes e Borin em Kravens; Treinar Time Rúnico; Recrutar Civis.
- Treinando a Guarda de Ferro.
- Resgatar Corvos e Família Principal.
- Coletar Sigmetal na Câmera Revelada.
- Pontos estimados: 230 (sem Sigmetal escalar).

### Fase 2 – Cadeia de primeira camada

- Resgatar Grupos de Rebeldes em Kravens; Treinar Civis.
- Resgatando Killin.
- Canção Ancestral.
- Encontrar Ferreiro Para Armaduras; Encontrar Ferreiro Para Armas.
- Pontos estimados: 200.

### Fase 3 – Cadeias longas / payoff

- Boas-vindas à Guarda de Ferro; O Novo Lorde Anão; Guerreiro Fragmentado.
- Treinar Corvos.
- Pontos estimados: 70.

## Distribuição por Localização

- Estrada do Cão-luar: Testar Dinamite; Testar Armadilhas; Coletar Sigmetal na Câmera Revelada.
- Distrito Comercial: Apaziguar Discussões; Encontrar Ferreiro Para Armaduras; Encontrar Ferreiro Para Armas.
- Casa da Filena: Resgatar Rebeldes e Borin em Kravens.
- Campo de Treinamento: Resgatar Grupos de Rebeldes em Kravens; Treinar Time Rúnico; Recrutar Civis; Treinar Civis; Treinando a Guarda de Ferro; Resgatando Killin; Guerreiro Fragmentado.
- Taverna da Pedra Vulcânica: Boas-vindas à Guarda de Ferro; O Novo Lorde Anão.
- Sala do Conselho: Resgatar Corvos e Família Principal; Canção Ancestral; Treinar Corvos.

## Escalas e Fórmulas de Referência

- Grupos de inimigos (v_pontos_armadilhas):
  - 0–30 → 7 grupos; 31–60 → 6; 61–80 → 5; 81–100 → 4.

- Dano por exército (Guarda/Civil/Corvos):
  
function calcularDano(idVarForca) {
  const BASE = 1667;
  const forca = $gameVariables.value(idVarForca);
  const sigmetal = $gameVariables.value(5); // 0-100 escalar
  const multForca = 1 + (forca / 100);
  const multSigmetal = 1 + (sigmetal / 100) *0.5;
  return Math.floor(BASE* multForca * multSigmetal);
}

- Multiplicador Sigmetal:
  
```javascript
mult_sigmetal = 1 + (v_reforco_sigmetal / 100) * 0.5;
```

## Navegação para as Subquests

- Armadilhas: `docs/Quests/13-quando-segundo-sol-chegar/v_armadilhas`.
- Guarda de Ferro: `docs/Quests/13-quando-segundo-sol-chegar/V_força_guarda`.
- Exército Civil: `docs/Quests/13-quando-segundo-sol-chegar/V_força_civil`.
- Corvos: `docs/Quests/13-quando-segundo-sol-chegar/V_influência_corvos`.
- Sigmetal: `docs/Quests/13-quando-segundo-sol-chegar/V_sigmetal`.
- Índice-mestre: `docs/Quests/13-quando-segundo-sol-chegar/00-indice-quests.md`.

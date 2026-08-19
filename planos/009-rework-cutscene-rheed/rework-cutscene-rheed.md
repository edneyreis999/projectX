# Rework da cutscene de Rheed na Casa Forjaprata

## Objetivo

Transformar a aparição de Rheed e das 18 crianças em uma cutscene curta, clara e encantadora. O jogador deve compreender, mesmo sem áudio, que:

1. a Casa Forjaprata é o foco da cena;
2. Rheed apresenta o lugar;
3. uma criança reage fisicamente e verbaliza o encantamento;
4. o encantamento se espalha pelo grupo;
5. Rheed conduz as crianças adiante.

O alvo de ritmo é **aproximadamente 6 segundos**, medidos do início do `Fade In Screen` ao término do fade dos personagens. A tolerância inicial de playtest é **5,6 a 6,4 segundos**. O orçamento foi ampliado em relação à proposta silenciosa para acomodar duas Gabs sequenciais sem cortar nenhuma fala.

## Escopo e responsáveis

| Elemento | Responsabilidade |
|---|---|
| Map045, Evento 11 — Mélia | Inicia a sequência e leva à Visual Novel no Map049. |
| Map049, Evento 1 — VN Casa Forjaprata | Liga as Self Switches A que materializam Rheed e as crianças no Map045. |
| Map045, Evento 36 — Rheed | Controlador da cutscene: entrada, Gab, microações, condução, transição para a página B e encerramento. |
| Map045, Eventos 21–35 e 37–39 — Crianças | Elenco visual. Continuam sem listas próprias; o Evento 36 controla as ações selecionadas. |
| Map045, Evento 33 — Criança central | Recebe a Animação 35 como alvo técnico e será a criança expressiva. A animação é de tela inteira, não um efeito local dessa criança. |
| Map045, Eventos 11 e 12 | Mantêm as Self Switches atuais de encerramento. |

Este documento propõe o rework; não altera `Map045.json`, `Map049.json`, plugins ou assets.

## Evidência local confirmada

- O Evento 36 começa em `(11,6)`, com `Through` ativo e página A em processo paralelo.
- A entrada atual executa `Town1`, `Fade In Screen`, Animação 35 em E33, espera 60 frames e revela Rheed e todas as crianças por seis patamares de opacidade.
- A fala atual é uma `GabTextOnly` ancorada visualmente no Evento 36:

  > “Então, crianças, esta é a Casa da Família Forjaprata!”

- A rota atual `Move to:5,5` não espera conclusão.
- A página B repete a Animação 35, espera 60 frames, reduz a opacidade e executa o cleanup.
- A Animação 35, `Nevoeiro`, é de tela inteira. Ela dispara `Blind` e `Sand` no frame 0 e contém flash de 90 frames iniciado no frame 29.
- O Gab Window oferece `System: Wait For Gab Completion`. Essa barreira aguarda o encerramento automático da Gab; ela não representa confirmação de leitura pelo jogador.
- O padrão do Evento 7 confirma que `Jump(0,0)` e balão podem ser combinados, mas essa linguagem tem tom mais cômico e não deve ser copiada integralmente nesta cena.

## Resultado do brainstorm na `game-dev`

A rodada `thread_map045_rheed_magic_8s_v2` reuniu Game Design, Narrativa, Level Design, Áudio e Engenharia de Gameplay. O consenso foi:

- a magia deve vir da progressão **revelar → nomear → reagir → seguir**, não da quantidade de efeitos;
- usar uma única Animação 35, apenas na entrada;
- manter uma única Gab no MVP, a de Rheed;
- fazer uma criança demonstrar curiosidade pelo corpo, em vez de explicar “isso parece real”;
- usar no máximo uma segunda criança como eco visual;
- não adicionar outro flash, tremor, névoa, `Miss` ou camada sonora;
- permitir que a microação aconteça durante a permanência da Gab;
- usar `Wait For Gab Completion` somente como barreira final, impedindo que o fade corte a frase;
- terminar todas as rotas antes do cleanup.

A decisão de direção tomada depois do brainstorm adota a Variante B. Portanto, ela substitui especificamente as recomendações de manter apenas uma Gab e de deixar a reação infantil somente no corpo; os demais limites continuam válidos.

### Decisão sobre as falas infantis

“Uau! Que casa maneira!” foi descartada porque a gíria pode destoar do tom. “Isso parece real” também soa mais analítico do que infantil.

A direção escolhida é a **Variante B — reação expressiva com fala**. A fala infantil será:

> “Parece de verdade...”

Ela deve coexistir apenas com um único `Jump(0,0)`. Não adicionar balão, SE, segundo pulo ou outra fala infantil.

## Conceito adotado: reação expressiva com fala

Uma criança torna explícito o maravilhamento por meio de uma reação curta, física e verbal.

- A Gab de Rheed termina antes da reação infantil, preservando a hierarquia das falas.
- E33, ainda voltada para a casa, dá um único `Jump(0,0)` sem balão e sem SE.
- Ao concluir o pulo, E33 usa a Gab “Parece de verdade...”.
- E26 acompanha E33 com o olhar e depois volta a olhar para a casa, criando contágio sem coreografar as 18 crianças.
- Rheed começa a condução depois que o pulo ficou legível e pode se mover enquanto a Gab infantil permanece visível.
- E33 não sai do tile de origem, portanto não exige rota de recomposição antes do fade.

O texto elimina a ambiguidade da reação silenciosa. O uso de um único pulo, sem balão e sem efeito sonoro, mantém a reação breve e evita reproduzir o tom cômico do Evento 7.

## Sequência recomendada para o Evento 36

Os frames abaixo são orçamento de direção a 60 FPS. O timing real deve ser medido em playtest.

| Janela | Momento | Ação e significado |
|---:|---|---|
| 0–24 | Abertura | `Fade In Screen`. O mapa volta da VN sem reação imediata. |
| 24–84 | Materialização | Executar a Animação 35 uma única vez em E33 e esperar 60 frames. `Blind` e `Sand` já fornecem o impacto coletivo. |
| 84–94 | Revelação | Subir Rheed e todas as crianças de opacidade 0 para 255 nos seis patamares atuais. |
| 94 | Nomeação | Iniciar a Gab de Rheed com a fala atual. A Gab continua não bloqueante neste ponto. |
| 94–112 | Contemplação | Todos permanecem voltados para a casa por 18 frames. Nenhum balão ou pulo. |
| 112–~246 | Barreira de Rheed | Executar `Gab Window → System: Wait For Gab Completion`. A reação infantil só começa após o encerramento real da apresentação. |
| ~246–270 | Reação | E33 dá um único `Jump(0,0)`, com espera de conclusão. E26 vira em direção a E33. Nenhum balão ou SE. |
| ~270 | Fala infantil | Iniciar a Gab de E33: “Parece de verdade...”. A Gab é não bloqueante neste ponto. |
| ~282–330 | Condução | Após 12 frames de leitura da reação, E26 volta a olhar para a casa e Rheed percorre a rota manual curta `Esquerda → Cima → Esquerda`, com espera de conclusão. A Gab infantil pode permanecer visível durante o movimento. |
| até ~330 | Barreira infantil | Executar novamente `Gab Window → System: Wait For Gab Completion`. Se a Gab já terminou, a cena continua imediatamente. |
| ~330–342 | Respiro | Esperar 10–12 frames após o encerramento real da segunda Gab. |
| ~342–352 | Encerramento | Ativar Self Switch B. A página B faz somente fade curto e cleanup, sem repetir a Animação 35 nem esperar 60 frames. |

### Configuração local sugerida para as Gabs

Para a fala de Rheed, manter o texto e o vínculo com E36, usando overrides somente nessa Gab:

- `WaitTime`: 48;
- `TimePerCharacter`: 2;
- `ForceGab`: false;
- `EventID`: 36.

Para a fala infantil, vincular a Gab ao E33 e usar:

- `WaitTime`: 36;
- `TimePerCharacter`: 1;
- `ForceGab`: false;
- `EventID`: 33.

Os overrides mantêm as duas retenções dentro do orçamento de aproximadamente 6 segundos. Eles não devem alterar os parâmetros globais do Gab Window.

O texto de Rheed possui 52 caracteres visíveis sem a quebra de linha. As tags `<center>` podem influenciar a contagem interna do plugin; por isso a duração das duas Gabs precisa ser medida no jogo, não inferida apenas do JSON.

## Alteração conceitual da página B

A página B continua responsável pelo fade e pelo cleanup, mas deixa de repetir a materialização.

Ordem recomendada:

1. remover a segunda execução da Animação 35;
2. remover a espera inicial de 60 frames;
3. manter a redução de opacidade de 220 até 0, com duração aproximada de 10 frames;
4. preservar integralmente o cleanup atual:
   - crianças 21–35 e 37–39: Self Switch B;
   - Rheed 36: Self Switch C;
   - Sáparo 12: Self Switch B;
   - Mélia 11: Self Switch D.

Isso faz a primeira névoa significar **materialização**. A saída passa a significar **a memória se desfazendo**, sem repetir o mesmo clímax audiovisual.

## Comandos candidatos no RPG Maker MZ

### E33 — reação expressiva

Usar `Set Movement Route`, com `Wait for Completion`:

1. Turn Up;
2. Jump `(0,0)`.

Após a rota terminar, iniciar a Gab “Parece de verdade...” vinculada ao E33.

### E26 — eco visual

Usar duas mudanças de direção separadas pelo tempo de leitura inicial da reação:

1. olhar para E33;
2. voltar a olhar para a casa.

### Rheed — condução

Substituir o pathfinding não bloqueante `Move to:5,5` por uma rota manual com espera:

1. Move Left;
2. Move Up;
3. Move Left;
4. Turn Down;

Se for obrigatório preservar o destino `(5,5)`, manter `Move to:5,5`, mas ativar `Wait for Completion` e aceitar que a cena provavelmente ultrapassará 6 segundos. O percurso também deve ser testado contra clipping próximo do Evento 16.

## Variantes

### Variante B — reação expressiva com fala — **adotada**

- E33 dá um único `Jump(0,0)` sem balão e sem SE.
- E33 usa a Gab “Parece de verdade...”.
- E26 apenas acompanha com o olhar.
- Usa duas Gabs sequenciais, cada uma com sua própria barreira de conclusão.
- Trabalha com alvo de aproximadamente 6 segundos.

Esta é a direção que deve orientar a implementação e o playtest.

### Variante A — criança-batedora silenciosa — não adotada

- E33 olha para os lados, avança um tile em direção à casa e depois retorna à formação.
- E26 acompanha o gesto com o olhar.
- Não há fala infantil, pulo, balão ou SE.
- É mais curta, mas depende de o jogador interpretar corretamente a intenção espacial.

### Variante C — encantamento contagiante

- Três crianças representam esquerda, centro e direita do grupo.
- Primeira criança: pulo + `!`.
- 12 frames depois: segunda criança, pulo + `!`.
- 12 frames depois: terceira criança, somente `!`.
- Nenhuma fala infantil.

É a variante mais próxima do Evento 7, porém tem maior risco de parecer gag ou coreografia. Limites: três balões, dois pulos e nenhum SE adicional.

## Regras de prioridade

1. A Casa Forjaprata deve permanecer o foco visual.
2. A fala de Rheed tem prioridade sobre qualquer reação infantil.
3. A reação precisa parecer espontânea, não sincronizada.
4. Nenhuma informação essencial pode depender só de áudio, flash ou cor.
5. Animação 35, Gab, microação e movimento de Rheed não devem disputar o mesmo instante de maior intensidade.
6. O fade nunca começa com uma rota em andamento ou com a Gab ainda ativa.
7. Se o orçamento estourar, reduzir primeiro holds e `WaitTime`, preservando a legibilidade. Retirar a fala infantil significa abandonar a Variante B e exige nova decisão de direção.

## Critérios de aceite

### Compreensão

- Sem áudio, o jogador identifica a casa como objeto do maravilhamento.
- O jogador percebe o encantamento de E33 pelo pulo e pela fala “Parece de verdade...”.
- O olhar de E26 comunica que a curiosidade se espalhou.
- Rheed é percebido como guia, não como personagem fugindo sozinho.

### Ritmo

- A duração medida fica entre 5,6 e 6,4 segundos no cenário nominal.
- As frases de Rheed e E33 não se sobrepõem nem são cortadas pelo fade.
- Existe ao menos um hold legível após a revelação e outro antes do desaparecimento.
- Nenhuma pausa parece causada por travamento de rota ou fila de Gab.

### Legibilidade audiovisual

- A Animação 35 ocorre uma única vez.
- Não há `Miss`, segundo `Blind`, segundo `Sand`, flash extra ou tremor.
- `Town1` não mascara o impacto de `Blind + Sand`; testar iniciar a BGM após a materialização se houver sobreposição perceptiva.
- A cena continua compreensível com o jogo em mute e com redução de flash.

### Estado e recuperação

- E33 conclui o `Jump(0,0)` antes do fade e permanece no tile de origem.
- Rheed conclui a rota antes da Self Switch B.
- Todas as Self Switches atuais de cleanup continuam sendo aplicadas.
- Reentrada, save/load e FPS baixo não deixam Rheed ou crianças visíveis em página incorreta.

## Matriz mínima de playtest

| Teste | Pergunta observável |
|---|---|
| Primeira visualização, com som | O jogador acompanha casa → fala de Rheed → reação de E33 → condução sem desviar para o flash? |
| Primeira visualização, mute | O maravilhamento continua compreensível? |
| Flash reduzido | A materialização ainda parece intencional? |
| Texto localizado maior | As duas barreiras impedem cortes sem alongar demais os holds? |
| FPS baixo | Rotas e fade mantêm a ordem causal? |
| BGM já ativa | A entrada de `Town1` cria sobreposição ou reinício perceptível? |
| Save/reentrada | O cleanup continua idempotente e sem personagens residuais? |

## Hipótese de design

Se uma criança reage com um único pulo e diz “Parece de verdade...”, enquanto outra acompanha o gesto com o olhar, o jogador compreenderá o maravilhamento coletivo sem exigir uma reação coreografada de todo o grupo.

A hipótese é rejeitada se, em playtest cego, jogadores não perceberem encantamento, interpretarem o pulo como gag, acharem a fala excessivamente explicativa ou não identificarem a Casa Forjaprata como foco. Nesse caso, revisar primeiro o timing e a encenação; se o problema persistir, reavaliar explicitamente as Variantes A e C.

## Ajustes posteriores aprovados

Após a primeira implementação da Variante B, a direção da cena foi ampliada:

1. Rheed percorre primeiro a rota manual aguardada `Esquerda → Cima → Esquerda → Virar para baixo`, chegando a `(9,5)`.
2. Somente depois de chegar ao destino, Rheed apresenta a casa com a fala atual:

   > “Então, crianças, esta é a Casa da Família Forjaprata!”

3. Depois que a apresentação termina, quatro crianças representam o encantamento:
   - E33 mantém `Jump(0,0)` e a Gab “Parece de verdade...”;
   - E35 `(9,9)` e E39 `(15,9)` executam um giro rápido de 360 graus, simultaneamente, e terminam novamente voltadas para cima;
   - E29 `(12,12)` executa um giro de 360 graus mais lento, com pausas entre quartos de volta, enquanto usa a Gab “Uau!”.
4. Depois que todas as reações e Gabs infantis terminam, Rheed usa a Gab:

   > “HAHAHAHA! agora vamos voltar para história”

5. A barreira final aguarda a conclusão dessa fala. Em seguida, a Self Switch B ativa a página de fade e cleanup já implementada, sem alterar os destinos de encerramento.

As Gabs permanecem enfileiradas com `ForceGab: false`, e nenhuma reação adiciona balão, SE, flash, tremor ou outra Animação 35. A duração anterior de 5,6–6,4 segundos deixa de ser um critério rígido, pois as novas falas e reações ampliam deliberadamente a cena; o novo ritmo deve ser medido em Playtest.

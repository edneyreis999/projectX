# Grill Me with Docs — Relatório de entendimento

## Contexto e objetivo

O objetivo desta entrevista foi aproximar o NSD **A Semifinal** do nível de clareza já alcançado pelo NSD **Noite da História**, sem transformar o documento em uma descrição de um fluxo completo ainda não implementado.

A referência de maturidade é o NSD **noite-da-historia.NSD.fluxo-cenas.md**, que já apresenta fluxo consolidado, estados, transições, beats e distinção clara entre comportamento implementado e descrição narrativa.

Para **A Semifinal**, o entendimento consolidado é que o documento deve representar o recorte atualmente desejado para implementação, incluindo um atalho narrativo para a partida de futebol rúnico: a partida em si não será implementada agora e será resumida por Rheed em uma cutscene no mapa EX.

## Documentos analisados

- `noite-da-historia.NSD.fluxo-cenas.md`
  - Referência de estrutura e nível de consolidação.
  - Quest já descrita como concluída, com fluxo reconciliado à implementação atual.
- `semifinal.NSD.fluxo-cenas.md`
  - Documento-base da quest **A Semifinal**.
  - Cenas iniciais da Casa Forjaprata já descritas como implementadas.
  - Cenas posteriores ainda continham especificação narrativa, inconsistências de numeração e trechos fora do escopo imediato.

## Escopo

Faz parte do recorte consolidado agora:

- Chegada de Thorin ao estádio e conversa com Dragobur.
- Bronca de Dragobur pelo atraso.
- Constatação de que Thorin está sem capacete.
- Ordem para procurar um capacete no vestiário.
- Deslocamento jogável até os vestiários.
- Manutenção do gag do vestiário feminino.
- Busca do capacete no vestiário masculino.
- Interação com uma estátua de um antigo jogador da “seleção de ouro”.
- Obtenção do capacete antigo de Dragobur.
- Equipamento do capacete.
- Pequena cutscene de reação de Thorin após equipá-lo.
- Retorno a Dragobur para mostrar o capacete.
- Liberação de Thorin para entrar em campo.
- Substituição temporária de toda a partida por uma cutscene narrativa no mapa EX.
- Aparição de Rheed e das crianças sobre o cenário, em linguagem visual semelhante à apresentação da Casa Forjaprata.
- Narração de que o time de Thorin estava perdendo, Thorin entrou em campo e marcou o gol da virada.
- Retomada do fluxo após o jogo.
- Cutscene mais longa da comemoração interrompida pelos guardas reais.
- Evidência da insatisfação de Thorin, dos companheiros e de Dragobur com a interrupção.
- Evidência do desconforto de Filena com a chegada dos guardas.
- Manutenção de um tom cômico mesmo com a entrada do conflito de autoridade.

## Fora de escopo

- Implementação jogável da partida de futebol rúnico.
- Tutorial de futebol dentro de campo.
- Jogada controlável do gol da virada.
- Desenvolvimento detalhado das mecânicas da partida.
- Definição final do conteúdo de uma futura versão jogável da semifinal.

Esses elementos podem ser retomados em uma implementação futura sem impedir o fechamento do fluxo atual.

## Critérios de sucesso

O recorte estará bem representado no NSD quando:

- O jogador entender que Thorin chegou atrasado.
- Ficar claro que Dragobur está desesperado porque o time está perdendo e seu atacante ainda não entrou em campo.
- A bronca tiver tom predominantemente cômico, sem perder a urgência da situação.
- A falta do capacete gerar um objetivo claro e jogável.
- O vestiário oferecer exploração curta, humor e um pequeno elemento de história do time.
- O capacete antigo de Dragobur tiver valor narrativo além de servir apenas como requisito mecânico.
- O jogador receba uma confirmação visual/narrativa satisfatória após equipar o capacete.
- O retorno a Dragobur feche o microarco da busca pelo equipamento.
- A ausência temporária da partida jogável seja coberta de forma clara pela narração de Rheed.
- O jogador compreenda que o time estava perdendo e venceu pela atuação decisiva de Thorin.
- A interrupção da comemoração pelos guardas seja percebida como invasiva e incômoda para o grupo.
- Filena demonstre desconforto específico com a situação.
- A cena dos guardas mantenha humor, mesmo introduzindo o peso da autoridade de Tordan.

## Árvore de decisões

- **Chegada ao estádio**
  - Thorin chega atrasado.
  - O time já está perdendo.
  - Dragobur está desesperado pela ausência de seu atacante.
  - **Decisão consolidada:** apresentar a situação em uma cutscene cômica de bronca.

- **Entrada imediata em campo**
  - Dragobur inicialmente manda Thorin entrar.
  - Percebe que ele está sem capacete.
  - Impede sua entrada.
  - **Decisão consolidada:** transformar a falta do capacete em um objetivo obrigatório antes da entrada.

- **Busca pelo capacete**
  - Jogador guia Thorin até os vestiários.
  - O gag do vestiário feminino permanece.
  - Thorin entra no vestiário masculino.
  - Encontra uma estátua de um antigo jogador ligada à “seleção de ouro”.
  - Interage com a estátua.
  - Obtém o capacete antigo de Dragobur.
  - Equipa o capacete.
  - **Decisão consolidada:** inserir uma pequena cutscene de Thorin reagindo ao encaixe do capacete, em tom leve.

- **Retorno ao treinador**
  - Thorin volta até Dragobur.
  - Mostra que está equipado.
  - Dragobur finalmente permite sua entrada em campo.
  - **Decisão consolidada:** esse retorno acontece antes do salto narrativo da partida.

- **Partida de futebol rúnico**
  - A partida jogável não será implementada agora.
  - **Decisão consolidada:** substituir todo o trecho dentro do campo por uma cutscene no mapa EX.
    - Rheed e as crianças aparecem sobre o cenário.
    - A linguagem de apresentação deve lembrar a cena já usada na Casa Forjaprata.
    - Rheed conta que o time estava perdendo.
    - Rheed conta que Thorin entrou em campo.
    - Rheed conta que Thorin fez o gol da virada.
    - O time de Thorin vence.

- **Pós-jogo e interrupção**
  - A história retoma já depois da partida.
  - A comemoração é interrompida pelos guardas reais.
  - **Decisão consolidada:** esta cutscene deve ser um pouco maior que as anteriores.
    - Thorin demonstra insatisfação.
    - Os demais jogadores demonstram insatisfação.
    - Dragobur demonstra insatisfação.
    - Filena fica visivelmente desconfortável.
    - Os guardas são percebidos como pessoas que estão atrapalhando a comemoração.
    - A cena conserva um tom de humor.

## Decisões consolidadas

1. A bronca de Dragobur será uma cutscene cômica.
2. A razão dramática da bronca é dupla: Thorin chegou atrasado e o time está perdendo sem seu atacante.
3. Dragobur manda Thorin entrar em campo, mas imediatamente o barra ao perceber que ele está sem capacete.
4. Dragobur manda Thorin procurar um capacete no vestiário.
5. O deslocamento até o vestiário permanece jogável.
6. O gag do vestiário feminino será mantido.
7. No vestiário masculino haverá uma estátua de um jogador associado à antiga “seleção de ouro”.
8. O capacete disponível na estátua é um capacete antigo de Dragobur.
9. O jogador precisa interagir com a estátua para obter o capacete.
10. Após equipá-lo, haverá uma pequena cutscene de Thorin comentando que o capacete serviu ou reagindo de forma equivalente.
11. Thorin precisa retornar a Dragobur e mostrar que está usando o capacete.
12. Só então Dragobur autoriza sua entrada em campo.
13. A partida de futebol rúnico ficará fora desta implementação.
14. A partida será resumida por Rheed em uma cutscene no mapa EX, e não em um mapa VN.
15. Rheed e as crianças aparecerão sobre o cenário, em solução semelhante à apresentação da Casa Forjaprata.
16. Rheed narrará que o time estava perdendo, Thorin entrou e marcou o gol da virada.
17. O fluxo será retomado já depois do jogo.
18. A interrupção da comemoração pelos guardas será uma cutscene mais longa que as anteriores.
19. Thorin, os jogadores e Dragobur devem demonstrar incômodo com os guardas atrapalhando a comemoração.
20. Filena deve demonstrar desconforto claro com a situação.
21. Mesmo introduzindo os guardas e o conflito de autoridade, a cena deve preservar um tom cômico.

## Glossário do domínio

**Bronca de Dragobur**: cutscene cômica em que o treinador reage ao atraso de Thorin enquanto seu time está perdendo e seu atacante principal ainda não entrou em campo.

_Evitar_: tratar a cena apenas como “bronca pública” sem registrar a função cômica e o desespero esportivo.

**Busca do capacete**: microfluxo jogável que começa quando Dragobur impede Thorin de entrar em campo e termina quando Thorin retorna equipado ao treinador.

_Evitar_: “capacete perdido” quando isso sugerir que Thorin perdeu especificamente um item próprio; o item obtido é o capacete antigo de Dragobur.

**Seleção de ouro**: formação histórica associada ao uniforme exposto na estátua dentro do vestiário masculino.

_Evitar_: tratar como simples decoração sem função narrativa.

**Capacete antigo de Dragobur**: equipamento obtido por Thorin na estátua do vestiário e usado para cumprir o requisito de entrada em campo.

_Evitar_: “capacete de Thorin”.

**Salto narrativo da partida**: solução temporária que substitui a partida jogável por uma cutscene no mapa EX em que Rheed resume o resultado.

_Evitar_: “visual novel”, pois a cena não ocorre em mapa VN.

**Cutscene de Rheed no mapa EX**: aparição de Rheed e das crianças sobre o cenário para narrar um trecho não jogado da história, seguindo linguagem semelhante à apresentação da Casa Forjaprata.

_Evitar_: chamar essa sequência de VN.

**Comemoração interrompida**: sequência pós-jogo em que a vitória é celebrada até a chegada dos guardas reais, gerando incômodo, desconforto e humor antes da imposição da autoridade.

_Evitar_: reduzir a cena a uma simples “escolta” sem mostrar a reação do grupo.

## Cenários e casos extremos discutidos

- Se o jogador tentar seguir para o campo sem capacete, Dragobur não permite a entrada.
- Se o jogador explorar o vestiário feminino, o gag continua existindo como conteúdo cômico opcional.
- A partida não precisa existir como gameplay para que o jogador entenda seu resultado: Rheed cobre narrativamente o trecho.
- A cutscene narrativa da partida deve ocorrer no mapa EX, evitando a impressão de que o jogo entrou em uma VN.
- A chegada dos guardas não deve apagar imediatamente o clima da vitória; a cena precisa dar espaço para que a comemoração exista e seja visivelmente interrompida.
- O desconforto de Filena deve ser perceptível mesmo dentro do tom cômico geral.

## Contradições resolvidas

- O NSD anterior descrevia uma sequência de jogo em campo com tutorial e jogada decisiva. Isso não corresponde ao recorte de implementação atual desejado.
  - **Resolução:** a partida jogável fica fora de escopo por enquanto e é substituída por uma cutscene narrativa de Rheed.
- Durante a entrevista, a sequência de Rheed chegou a ser chamada de “visual novel”.
  - **Resolução:** o termo correto é **cutscene no mapa EX**, pois Rheed e as crianças aparecem diretamente no cenário.
- O fluxo anterior colocava o capacete como algo encontrado em um manequim.
  - **Resolução:** o elemento canônico desta entrevista passa a ser uma **estátua de um antigo jogador**, vestida com o uniforme da “seleção de ouro”, da qual Thorin obtém o capacete antigo de Dragobur.
- O fluxo anterior tratava a interrupção final principalmente como escolta.
  - **Resolução:** antes da condução de Thorin, deve existir uma cutscene de comemoração interrompida mais desenvolvida, enfatizando a reação dos personagens.

## Premissas

- Thorin é o atacante cuja ausência pesa diretamente no desempenho do time.
- Quando Thorin chega, seu time já está perdendo.
- Dragobur conhece a importância de Thorin para uma possível virada.
- O capacete antigo de Dragobur pode ser usado por Thorin.
- A aparição de Rheed e das crianças sobre cenários da história já é uma linguagem narrativa estabelecida pelo jogo.
- O jogador aceitará o salto temporal da partida desde que o resultado e a importância de Thorin sejam comunicados de forma clara.
- O humor é parte importante tanto da bronca inicial quanto da interrupção pós-jogo.

## Restrições

- A partida de futebol rúnico não será implementada neste momento.
- A solução substituta precisa funcionar sem mapa VN.
- O resultado da partida precisa continuar narrativamente claro.
- A busca do capacete precisa acontecer antes da entrada de Thorin em campo.
- A cutscene pós-jogo precisa comunicar conflito com os guardas sem abandonar completamente o tom cômico.

## Riscos e trade-offs

- **Pular a partida reduz agência no clímax esportivo.**
  - Em troca, permite avançar a implementação sem depender agora das mecânicas completas do futebol rúnico.
- **Rheed contar o resultado em vez de o jogador vivê-lo pode reduzir impacto.**
  - A solução preserva a informação dramática essencial: o time estava perdendo e venceu graças ao gol de Thorin.
- **Usar humor na chegada dos guardas pode diminuir a sensação de ameaça.**
  - Por outro lado, preserva a identidade tonal estabelecida para a sequência e torna a quebra da comemoração mais orgânica.
- **O capacete antigo de Dragobur adiciona valor simbólico, mas exige que a cena não o trate como um item genérico.**
- **A cutscene de pós-jogo será maior que as demais.**
  - Isso cria espaço para reação coletiva e para o desconforto de Filena, mas precisa evitar repetição ou perda de ritmo.

## Candidatas a ADR

### Substituir temporariamente a partida jogável por narração de Rheed

**Contexto:** a partida de futebol rúnico, incluindo entrada em campo, tutorial e gol da virada, está fora do escopo desta implementação.

**Decisão:** usar uma cutscene no mapa EX com Rheed e as crianças aparecendo sobre o cenário para contar que o time estava perdendo, Thorin entrou e marcou o gol da virada.

**Motivo:** é uma decisão estrutural que altera de forma relevante a experiência do clímax esportivo, mas permite manter continuidade narrativa sem implementar agora o sistema completo da partida.

**Alternativa relevante:** manter a partida jogável conforme o NSD anterior.

**Consequência:** o jogador recebe o resultado por narração, e não por gameplay, até que uma implementação futura substitua esse atalho.

### Transformar o capacete em objeto histórico ligado a Dragobur

**Contexto:** o fluxo anterior tratava o capacete como um item encontrado no vestiário.

**Decisão:** colocá-lo em uma estátua de um antigo jogador, vestida com o uniforme da “seleção de ouro”, e estabelecer que o capacete pertenceu a Dragobur.

**Motivo:** a escolha dá função narrativa ao equipamento e conecta a busca a uma memória da história do time, em vez de tratá-la apenas como bloqueio de tutorial.

## Pendências aceitas

- O conteúdo detalhado da futura partida jogável permanece deliberadamente indefinido.
- As falas exatas de Dragobur, Thorin, Rheed, Filena, jogadores e guardas ainda não foram escritas.
- A encenação exata da pequena cutscene após Thorin equipar o capacete ainda pode variar, desde que comunique que o item serviu e mantenha o tom leve.
- A composição visual exata da estátua e do uniforme da “seleção de ouro” ainda não foi detalhada.
- A coreografia completa da comemoração interrompida pelos guardas ainda precisa ser implementada, preservando as intenções narrativas consolidadas.
- O destino e a encenação posteriores à interrupção pelos guardas não foram refinados nesta entrevista além do recorte discutido.

## Evidências e referências

### `noite-da-historia.NSD.fluxo-cenas.md`

- **Resumo Geral / Fluxo Visual de Cenas / Referências e Recursos**
  - Usado como referência do nível de consolidação desejado.
  - O documento distingue estados, beats, transições, journal, outputs e fonte da verdade da revisão.
- **Cena 4 – Passagem para Thorin**
  - Estabelece a continuidade entre a moldura de Rheed e a história vivida como Thorin.

### `semifinal.NSD.fluxo-cenas.md`

- **Resumo Geral**
  - Estabelece o conflito entre a liberdade de Thorin e a autoridade de Tordan.
  - Define a semifinal como parte do Mundo Comum e apresenta Dragobur, Filena, guardas e demais personagens do recorte.
- **Cena 4 – Bronca no Gramado**
  - Base documental para a chegada atrasada, a bronca e a falta do capacete.
- **Cena 5 – Capacete Perdido**
  - Base documental para o deslocamento ao vestiário, o gag do feminino, a obtenção e o equipamento do capacete.
  - A entrevista altera o suporte do item: de manequim para estátua histórica.
- **Cena 6 – Pronto pra Jogar**
  - Base documental para o retorno a Dragobur e a liberação para entrar em campo.
  - O trecho posterior de gameplay foi retirado do escopo atual pela decisão do usuário.
- **Cena 7 – Comemoração Cortada** no documento existente
  - Base documental para a comemoração, Filena e a chegada dos guardas.
  - A entrevista reforça que essa cutscene deve ser mais longa, coletiva e cômica, mostrando claramente a insatisfação dos presentes.

### Declarações consolidadas da entrevista

- A partida de futebol rúnico será pulada nesta implementação.
- Rheed narrará o resultado em uma cutscene no mapa EX.
- A bronca de Dragobur e a interrupção dos guardas terão tom cômico.
- O capacete antigo de Dragobur será obtido em uma estátua associada à “seleção de ouro”.
- A comemoração interrompida deve mostrar a reação de Thorin, dos jogadores, de Dragobur e o desconforto de Filena.

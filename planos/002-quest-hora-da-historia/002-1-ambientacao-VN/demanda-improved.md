# Demanda enriquecida — Ambientação da VN do mapa 046

## Resumo

Melhorar a apresentação narrativa e audiovisual da Visual Novel (VN) principal do mapa 046, primeiro por meio de uma análise completa da cena e de propostas submetidas ao usuário e, somente depois que os assets solicitados forem adicionados ao projeto com os nomes combinados, por meio da implementação das mudanças aprovadas.

O trabalho deve abranger falas, expressões de busto, animações, eventual uso de Visual Cut-In e a descrição de um background coerente com o cenário. O sequenciamento análise → apresentação das impressões → solicitação e nomeação dos assets → disponibilização dos assets pelo usuário → implementação é obrigatório.

## Intenção original

A intenção original é melhorar a VN do mapa 046. Antes de qualquer implementação, o próximo executor deve analisar a cena, as falas e os personagens e apresentar sugestões sobre:

- enriquecimento das falas;
- expressões de busto adequadas a cada fala;
- animações que possam reforçar a cena;
- pertinência, momento e imagem de um possível Visual Cut-In;
- descrição de um background de VN coerente com o local do diálogo.

Depois da análise, o executor deve apresentar suas impressões, solicitar os assets necessários e definir nomes para eles. O usuário adicionará esses assets ao projeto com os nomes acordados. A implementação só poderá começar depois disso.

## Objetivo e resultado esperado

O objetivo é transformar a VN atual em uma cena mais rica, expressiva e visualmente coerente, preservando sua função narrativa e seu fluxo interativo.

O resultado esperado é composto por três entregas sequenciais:

1. uma análise acionável da cena atual, com propostas de texto e apresentação;
2. um manifesto de assets necessários, cada um com função, descrição e nome proposto;
3. após o gate humano e a presença dos assets, a implementação e validação das mudanças na VN do mapa 046.

## Contexto observado

- **[source]** `frontend/data/MapInfos.json` identifica o mapa 046 como `NV_Noite_da_Historia`.
- **[source]** `frontend/data/Map046.json` contém um único evento: ID 1, `VN — Noite da História: diálogo principal`, com uma página. Portanto, esse é o evento inequivocamente abrangido por “a VN do mapa 046”.
- **[source]** O evento contém 11 blocos de mensagem e uma escolha visual com as opções `Confirmar` e `Corrigir` (`qualSeuNome1` e `qualSeuNome2`).
- **[source]** A apresentação atual usa bustos do VisuStella VN Picture Busts, com as imagens `Portraits/Principal/Reed final` e `Portraits/Principal/CriancaOrc_`.
- **[source]** A cena está integrada à quest `noite-da-historia`: exige o estado `10`, usa a entrada `CENA_PRINCIPAL`, executa a transição `COMPLETE_VN` e finaliza a sessão de VN.
- **[inference]** Pelas falas e pela alternância dos bustos, a cena envolve um contador de histórias associado ao busto de Reed e a criança orc ou protagonista associada ao segundo busto. Essa atribuição deve ser confirmada durante a análise antes de nomear novas variações de expressão.
- **[source]** O diálogo faz referência a Dulgarin, Daratrine, Gildrat e Thorin e conduz da interação cômica inicial para a introdução de uma história sobre Gildrat.

## Escopo

### Análise e proposta

- Ler a totalidade do evento 1 do mapa 046, incluindo os dois caminhos da escolha visual.
- Analisar a função da cena, o ritmo, as falas, as vozes dos personagens e a transição entre humor, exposição de mundo e introdução da história.
- Propor melhorias de fala sem alterar silenciosamente fatos de lore, intenção da cena ou identidade dos personagens.
- Mapear expressões, movimentos, animações, Visual Cut-In e background aos momentos concretos da cena.
- Apresentar impressões e prioridades antes de solicitar qualquer asset.

### Assets

- Derivar da proposta aprovada uma lista fechada de assets novos ou variantes necessárias.
- Para cada asset, fornecer tipo, personagem ou uso, expressão ou conteúdo, descrição visual, momento de uso e nome de arquivo proposto.
- Manter os nomes estáveis entre a solicitação, a inserção feita pelo usuário e a implementação.

### Implementação condicionada

- A implementação está dentro da demanda original, mas só fica liberada após o usuário adicionar os assets solicitados ao projeto com os nomes acordados.
- Depois do gate, aplicar as mudanças à VN do mapa 046 e validar o fluxo completo, inclusive ambos os ramos da escolha.

## Mandato para o próximo executor

O próximo executor está autorizado a conduzir a demanda em fases, respeitando estes limites:

1. **Fase de análise, sem escrita no runtime:** inspecionar a cena completa, as falas, os personagens, a apresentação existente e as referências locais relevantes; produzir impressões e propostas rastreáveis por momento ou fala.
2. **Fase de especificação de assets, sem implementação:** consolidar somente os assets realmente necessários, definir nomes inequívocos e solicitar que o usuário os adicione.
3. **Gate humano e de disponibilidade:** aguardar a confirmação de que os assets foram adicionados exatamente com os nomes definidos. A ausência dessa confirmação bloqueia a fase seguinte.
4. **Fase de implementação:** usar os assets disponibilizados, preservar as integrações de quest e os dois ramos da escolha e preferir soluções VisuStella ou Coreto já disponíveis.
5. **Fase de validação:** executar validação estrutural dos dados e validação perceptível da cena no jogo. A implementação não deve ser declarada concluída apenas com inspeção estática.

As decisões criativas de redação, expressão, timing, animação, Visual Cut-In e composição do background são delegadas ao próximo executor como propostas justificadas. Mudanças que afetem lore, caracterização, sentido das escolhas ou estrutura da quest permanecem sujeitas à validação do usuário antes da implementação.

O workflow downstream específico ainda não foi escolhido por esta demanda enriquecida e não deve ser presumido a partir deste documento.

## Requisitos

### Requisitos de análise

- **R01.** Analisar o evento 1 completo de `frontend/data/Map046.json`, incluindo os caminhos `Confirmar` e `Corrigir`.
- **R02.** Explicar a função narrativa da cena, suas mudanças de tom, o papel dos personagens e os pontos fortes e fracos percebidos.
- **R03.** Avaliar se cada fala pode ficar mais rica e interessante; quando houver proposta, apresentar a fala atual, a versão sugerida e a justificativa da mudança.
- **R04.** Propor expressões de busto associadas às falas ou beats correspondentes, indicando personagem, emoção, intensidade e transição.
- **R05.** Propor animações somente quando elas reforçarem intenção, ritmo, reação ou transição; indicar alvo, momento, duração ou timing esperado e propósito.
- **R06.** Avaliar explicitamente se um Visual Cut-In beneficia a VN. Se a resposta for positiva, indicar o momento exato, a função dramática e uma descrição da imagem; se for negativa, registrar a justificativa.
- **R07.** Produzir uma descrição utilizável como briefing de um background para a VN, fundamentada no cenário em que o diálogo ocorre e coerente com hora, ambiente, personagens e atmosfera observáveis nas fontes.
- **R08.** Entregar ao usuário uma síntese das impressões e uma lista priorizada das sugestões antes de iniciar a especificação final de assets.

### Requisitos de assets

- **R09.** Criar um manifesto dos assets necessários com, no mínimo: ID, tipo, finalidade, personagem ou cena, descrição visual, momento de uso, nome proposto, diretório esperado e dependências.
- **R10.** Definir nomes de assets consistentes com as convenções efetivamente verificadas no projeto; não renomeá-los silenciosamente durante a implementação.
- **R11.** Solicitar ao usuário apenas os assets necessários à proposta que será implementada.
- **R12.** Aguardar o usuário adicionar os assets ao projeto com os nomes definidos e confirmar sua disponibilidade antes de editar a VN.

### Requisitos de implementação e validação

- **R13.** Implementar apenas depois que R12 estiver satisfeito.
- **R14.** Preservar os guards e identificadores da quest `noite-da-historia`, a entrada `CENA_PRINCIPAL`, a transição `COMPLETE_VN` e a finalização da sessão de VN, salvo decisão humana explícita em contrário.
- **R15.** Preservar e validar ambos os ramos da escolha `qualSeuNome` e suas consequências narrativas.
- **R16.** Nas alterações em `frontend/data`, dar preferência a notetags, comandos ou recursos VisuStella e Coreto e consultar primeiro a documentação existente em `docs/rpg-maker-for-ia` para verificar se um plugin já resolve a necessidade.
- **R17.** Usar no runtime apenas assets cuja existência e nome exato tenham sido confirmados.
- **R18.** Validar a estrutura dos dados alterados e realizar teste perceptível da VN completa no jogo.

## Restrições

- A ordem das fases é vinculante: análise e impressões → manifesto e solicitação de assets → adição dos assets pelo usuário → implementação → validação.
- A etapa de análise não autoriza alterações em `frontend/data` nem em assets.
- As propostas devem preservar fatos de lore e a função da cena; qualquer mudança material deve ser destacada para decisão humana.
- Para `frontend/data`, devem ser priorizados recursos VisuStella ou Coreto e a documentação local deve ser consultada antes de criar solução customizada.
- Os nomes propostos para assets devem ser tecnicamente válidos e estáveis, mas a convenção exata precisa ser verificada no repositório antes da solicitação final.

## Critérios de aceite

- **CA01 — Cobertura da cena:** a análise cobre os 11 blocos de mensagem, os dois ramos da escolha e a transição final da VN.
- **CA02 — Falas acionáveis:** toda mudança sugerida de fala contém original, proposta e justificativa; falas mantidas também podem ser marcadas como adequadas.
- **CA03 — Expressões rastreáveis:** cada expressão proposta está ligada a uma fala ou beat e identifica personagem, emoção e intensidade.
- **CA04 — Animações justificadas:** cada animação proposta possui momento, alvo e função; não há efeitos puramente ornamentais sem justificativa.
- **CA05 — Decisão sobre Visual Cut-In:** existe um veredito explícito; quando positivo, há momento, propósito e briefing da imagem.
- **CA06 — Background utilizável:** a descrição informa composição, ambiente, iluminação, atmosfera, profundidade, elementos obrigatórios e elementos a evitar, todos sustentados pelo cenário ou marcados como decisão criativa.
- **CA07 — Impressões entregues primeiro:** o usuário recebe uma síntese priorizada antes da solicitação final de assets.
- **CA08 — Manifesto completo:** todo asset solicitado tem nome proposto e campos suficientes para criação e posterior integração sem adivinhação.
- **CA09 — Gate respeitado:** nenhuma implementação ocorre antes da confirmação de disponibilidade dos assets com os nomes definidos.
- **CA10 — Integrações preservadas:** quest, entrada, transição, finalização da VN e ambos os ramos da escolha continuam funcionais.
- **CA11 — Validação proporcional:** dados alterados passam por validação estrutural e a cena é percorrida no jogo nos dois ramos, sem referências quebradas ou assets ausentes.

## Validators

| ID | Momento | Validator | Evidência esperada | Owner |
|---|---|---|---|---|
| V01 | Após a análise | Matriz de cobertura dos 11 blocos e dos dois ramos | Documento de análise com locators por fala ou beat | Próximo executor |
| V02 | Antes de solicitar assets | Completude e unicidade do manifesto | Lista sem nomes duplicados, com todos os campos de R09 | Próximo executor |
| V03 | Antes da implementação | Gate de assets | Confirmação do usuário e verificação local dos caminhos e nomes | Usuário e próximo executor |
| V04 | Durante a implementação | Conformidade com a documentação e recursos existentes | Referência ao plugin, comando, notetag ou mecanismo escolhido | Próximo executor |
| V05 | Após a implementação | Integridade estrutural de `Map046.json` | Parse válido e checks específicos do workflow de dados do RPG Maker MZ | Próximo executor |
| V06 | Após a implementação | Validação perceptível da VN | Registro de teste dos dois ramos, bustos, expressões, animações, Cut-In, background e transição final | Humano responsável pelo QA runtime |

## Premissas reversíveis

| ID | Premissa | Motivo e impacto | Como reverter | Validator |
|---|---|---|---|---|
| A01 | A versão atual de `frontend/data/Map046.json` será a baseline da análise. | **[assumption]** É a fonte local identificada para a cena; mudanças concorrentes podem invalidar contagens e locators. | Reler o arquivo e atualizar a análise antes de apresentar as propostas. | Hash, diff ou nova leitura do evento imediatamente antes da análise. |
| A02 | A atribuição dos bustos a Reed e à criança orc representa os falantes nos beats em que aparecem. | **[assumption]** Os comandos não trazem nomes de falante, apenas sequência de busto e texto. | Corrigir a atribuição na análise sem alterar os requisitos. | Conferência com contexto narrativo, documentação ou decisão humana. |
| A03 | Sugestões criativas podem avançar como propostas sem uma definição prévia e fechada de tom. | **[assumption]** Elas permanecem reversíveis porque são apresentadas antes de qualquer implementação. | Manter as falas atuais ou revisar as propostas após feedback. | Aceite humano das impressões antes de consolidar os assets. |

## Itens a validar depois

| ID | Item | Evidência futura esperada | Momento | Owner |
|---|---|---|---|---|
| VL01 | Convenções de pasta, extensão, dimensões e nomes para cada categoria de asset. | Inventário dos assets equivalentes e documentação local aplicável. | Antes de fechar o manifesto de assets. | Próximo executor |
| VL02 | Identidade exata dos falantes e limites de voz, humor e caracterização. | Contexto narrativo local e, se necessário, feedback do usuário sobre as impressões. | Durante a análise, antes da proposta final de falas. | Próximo executor e usuário |
| VL03 | Adequação de Visual Cut-In e necessidade real de novos assets de expressão ou animação. | Análise beat a beat da cena e inventário do que já existe. | Antes do manifesto de assets. | Próximo executor |
| VL04 | Disponibilidade de todos os assets nos caminhos e nomes acordados. | Verificação local posterior à inserção e confirmação do usuário. | Gate imediatamente anterior à implementação. | Próximo executor e usuário |
| VL05 | Resultado perceptível, timing e legibilidade da cena. | Playtest dos dois ramos no runtime. | Depois da implementação. | Humano responsável pelo QA runtime |
| VL06 | Escolha do workflow downstream apropriado. | Novo pedido explícito do usuário. | Depois desta demanda enriquecida. | Usuário |

## Riscos e mitigação esperada

| Risco | Impacto | Mitigação esperada |
|---|---|---|
| Enriquecer as falas e descaracterizar humor, voz ou lore | Cena mais polida, porém inconsistente com o jogo | Mostrar original, proposta e justificativa; destacar mudanças materiais para decisão humana |
| Solicitar assets antes de estabilizar a proposta | Retrabalho artístico e nomes obsoletos | Fechar primeiro a análise e as impressões; gerar manifesto apenas para a proposta escolhida |
| Nomes ou caminhos divergirem entre briefing e projeto | Referências quebradas no runtime | Verificar convenções, usar manifesto único e confirmar existência antes da implementação |
| Alterar apenas o ramo principal da escolha | Regressão narrativa em `Confirmar` ou `Corrigir` | Cobertura e playtest obrigatórios dos dois ramos |
| Quebrar guards ou transições da quest | VN inacessível ou quest sem progressão | Preservar IDs e comandos de integração e validar início e conclusão |
| Usar solução customizada onde já existe recurso de plugin | Complexidade e incompatibilidade desnecessárias | Consultar `docs/rpg-maker-for-ia` e preferir VisuStella ou Coreto |
| Sobrecarregar a cena com efeitos | Perda de foco e ritmo | Exigir função narrativa para cada expressão, animação e Cut-In |

## Referências e provenance

| Fonte | Locator | Classificação | Uso |
|---|---|---|---|
| Demanda original | `planos/004-ambientacao-VN/demanda.md:1` | `human-decision` | Intenção, escopo criativo e ordem obrigatória das fases |
| Dados do mapa | `frontend/data/Map046.json`, evento 1 | `source` | Cena, falas, ramos, bustos e integrações atuais |
| Índice de mapas | `frontend/data/MapInfos.json`, ID 46 | `source` | Nome interno do mapa |
| Parâmetros do Visual Choices | `frontend/js/plugins.js:771` | `source` | Textos visíveis `Confirmar` e `Corrigir` associados aos IDs da escolha |
| Instruções do projeto fornecidas pelo usuário para `E:\Projetos\projectX` | seção “Alteração na pasta frontend/data” | `human-decision` | Preferência por VisuStella ou Coreto e consulta prévia a `docs/rpg-maker-for-ia` |

Os critérios de aceite, validators e riscos são **inferências operacionais** derivadas dos requisitos originais e das fontes listadas; eles tornam o resultado verificável sem autorizar mudança de intenção, lore ou escopo. As premissas estão classificadas separadamente. Não foram incluídos few-shots porque nenhum exemplo foi fornecido ou aprovado e nenhuma fonte equivalente foi validada para esse propósito.

## Registro de lacunas classificadas

| ID | Categoria | Pergunta ou lacuna | Fonte ou evidência | Impacto | Resolução | Efeito na saída | Status |
|---|---|---|---|---|---|---|---|
| G01 | `answer_from_sources` | Qual evento do mapa 046 corresponde à VN citada? | `Map046.json` possui um único evento, ID 1, com nome explícito de VN principal. | Definia o alvo da análise e implementação. | Evento 1 adotado como alvo inequívoco. | Escopo e critérios ganharam locator exato. | Resolvida |
| G02 | `answer_from_sources` | Quais são os ramos e textos da escolha visual? | `Map046.json` referencia `qualSeuNome1/2`; `plugins.js:771` associa `Confirmar/Corrigir`. | Sem isso, um ramo poderia ser omitido. | Ambos foram incluídos na cobertura e validação. | Requisitos R01 e R15. | Resolvida |
| G03 | `reversible_assumption` | Quais bustos correspondem a quais falantes? | Sequência dos comandos de busto e falas, sem nome explícito no comando de mensagem. | Afeta expressões e nomes de assets. | Atribuição provisória documentada em A02. | Exige confirmação durante a análise. | Aberta, não bloqueante |
| G04 | `reversible_assumption` | Qual grau de reescrita e qual tom final devem ser usados? | A demanda pede falas mais ricas, sem prescrever intensidade. | Pode afetar voz e caracterização. | Produzir propostas reversíveis, com original e justificativa. | Gate humano antes de consolidar assets. | Aberta, não bloqueante |
| G05 | `validate_later` | Quais convenções técnicas devem reger os novos assets? | Nenhuma convenção específica foi indicada na demanda. | Afeta nomes, dimensões e integração. | Inventariar equivalentes e documentação antes do manifesto. | Registrada em VL01. | Pendente |
| G06 | `validate_later` | Visual Cut-In e novos assets são realmente necessários? | A própria demanda solicita avaliação, não uma decisão prévia. | Muda custo e volume de assets. | Decidir na análise, com justificativa, antes da solicitação. | Registrada em R06 e VL03. | Pendente |
| G07 | `validate_later` | Quando a implementação fica liberada? | A demanda determina que o usuário adicionará os assets antes da implementação. | É gate material de escrita em runtime. | Exigir confirmação e verificação local dos assets. | Registrada em R12, R13 e V03. | Pendente por desenho |
| G08 | `validate_later` | Qual workflow executará a próxima fase? | A demanda não seleciona um workflow específico. | Afeta o mecanismo de execução, não a intenção do produto. | Deixar a escolha para novo pedido do usuário. | Registrada em VL06. | Pendente |

Não há lacuna `must_ask_now`: as decisões criativas permanecem reversíveis durante a fase de análise, e a implementação já possui um gate humano explícito.

## Matriz de cobertura da intenção original

| Original ID | Resumo fiel | Destino na saída | Status | Evidence locator |
|---|---|---|---|---|
| O01 | Melhorar a VN do mapa 046 | Resumo; Objetivo; R01 | `preserved` | `demanda.md:1` |
| O02 | Primeiro analisar cena, falas e personagens e retornar sugestões | Intenção original; Escopo; Mandato fases 1–2; R02 | `preserved` | `demanda.md:2` |
| O03 | Avaliar falas mais ricas e interessantes | R03; CA02 | `preserved` | `demanda.md:3` |
| O04 | Sugerir expressões de busto de acordo com as falas | R04; CA03 | `preserved` | `demanda.md:4` |
| O05 | Sugerir animações | R05; CA04 | `preserved` | `demanda.md:5` |
| O06 | Avaliar Visual Cut-In, momento e imagem | R06; CA05 | `preserved` | `demanda.md:6` |
| O07 | Descrever background coerente com o cenário do diálogo | R07; CA06 | `preserved` | `demanda.md:7` |
| O08 | Depois da análise, passar impressões e solicitar assets | R08; Mandato fase 2; CA07 | `preserved` | `demanda.md:8` |
| O09 | Definir nomes para os assets | R09–R10; CA08 | `preserved` | `demanda.md:9` |
| O10 | Usuário adicionará os assets com os nomes escolhidos | R12; V03 | `preserved` | `demanda.md:10` |
| O11 | Implementar somente depois da adição dos assets | R13; Restrições; CA09 | `preserved` | `demanda.md:11` |


# Ajustes de ambientação da VN: indicador da elfa e composição dos bustos

## Resumo da demanda enriquecida

Ajustar dois momentos da ambientação visual ligados à Noite da História: encerrar corretamente o indicador de exclamação sobre a elfa após sua resposta em `Map022` e corrigir continuidade, posicionamento, orientação e participação dos bustos de Rheed e da criança na conversa principal de `Map046`.

O resultado deve eliminar a quebra visual causada pela saída e reentrada desnecessárias do busto de Rheed, apresentar a criança antes das escolhas e manter uma composição consistente: Rheed à direita e a criança à esquerda, virada para a direita.

## Intenção original

1. Fazer o ponto de exclamação sobre a elfa desaparecer depois que o jogador conversar com ela e terminar a resposta “Rápido! A história já vai começar... vá para o seu lugar!”.
2. Manter o busto de Rheed sempre à direita durante a conversa indicada.
3. Manter o busto da criança sempre à esquerda durante essa conversa.
4. Na transição para “Hum... esse rosto não me é estranho...”, preservar o busto de Rheed que já estava na tela, sem removê-lo e inseri-lo novamente.
5. Antes das escolhas, adicionar uma fala simples da criança e incluir seu busto na conversa.
6. Aplicar a decisão humana posterior que resolveu a contradição da entrada: a criança deve ficar à esquerda, virada para a direita.
7. Aplicar a decisão humana posterior de escopo: toda alteração desta demanda deve ficar restrita a `Map022` e `Map046`; `Map004` não deve ser alterado.

## Objetivo e resultado esperado

Entregar uma apresentação visual contínua e legível nas duas cenas, sem alterar a intenção narrativa nem o funcionamento das escolhas existentes.

Ao final:

- o indicador da elfa encerra sua exibição no momento perceptível correto;
- Rheed não sofre saída e reentrada entre falas consecutivas quando já está presente;
- Rheed ocupa o lado direito sempre que seu busto aparece na conversa principal indicada;
- a criança ocupa o lado esquerdo, olha para a direita e participa com uma fala curta antes das escolhas;
- o conteúdo e os resultados das escolhas continuam funcionando como antes.

## Contexto observado

- Em `frontend/data/Map022.json`, evento 30 (`EX — Noite da História: convocação`), página 1, a resposta da elfa está nos comandos 11–12. Nenhum comando de `Map022` atualiza a variável 26 (`v_qNoite_progress`).
- Em `frontend/data/Map022.json`, evento 31, página 1, um processo paralelo executa o balão de ID 1 sobre o evento 30. A página 2 passa a ser elegível quando a variável 26 alcança `1` e não contém novo comando de balão.
- Em `frontend/data/Map046.json`, evento 1 (`VN — Noite da História: diálogo principal`), página 1, o busto de Picture ID 1 sai após a fala inicial, entra novamente e troca para a expressão pensativa antes de “Hum... esse rosto não me é estranho...”; depois dessa fala ele volta a sair antes das escolhas.
- Nesse mesmo evento, a criança usa o Picture ID 2 apenas dentro das ramificações atuais, depois da abertura das escolhas.
- `VisuMZ_2_VNPictureBusts` está ativo em `frontend/js/plugins.js` e já é o mecanismo usado pelas duas cenas.
- A documentação local do plugin define posições de tela, espelhamento horizontal, entrada, saída e troca de gráfico sem alterar as demais propriedades do busto.
- A grafia canônica para novo texto é `Rheed`. O asset legado `Portraits/Principal/Reed final` permanece com o nome atual.

## Escopo

### Cena da elfa

- Fluxo perceptível do indicador sobre a elfa em `Map022`, envolvendo o evento 30 e seu controlador no evento 31.
- Momento de encerramento do indicador em relação ao término da resposta da elfa.

### Conversa principal da VN

- Staging dos bustos no evento 1, página 1, de `Map046`.
- Continuidade do busto de Rheed entre a fala anterior e “Hum... esse rosto não me é estranho...”.
- Entrada, posição, orientação e fala inicial da criança antes da abertura das escolhas.
- Preservação da estrutura e dos resultados das escolhas existentes.

`Map004` está explicitamente fora do escopo e não pode receber alterações desta demanda.

## Mandato para o próximo executor

O próximo executor deve implementar os comportamentos observáveis descritos nesta demanda nos eventos identificados, usando leitura e edição estruturadas do JSON do RPG Maker MZ.

Cabe ao executor:

- identificar e ajustar o mecanismo efetivo que mantém ou encerra o balão sobre a elfa, inclusive o estado visual já ativo;
- reorganizar os comandos existentes de busto e mensagem para preservar Rheed na tela sem saída e reentrada desnecessárias;
- posicionar e orientar os bustos conforme a composição aprovada;
- escrever uma fala curta e simples para a criança, coerente com o contexto imediato e sem introduzir lore, promessa ou consequência nova;
- inserir essa fala e o busto da criança antes da abertura das escolhas;
- preservar os Picture IDs 1 e 2, os assets existentes e as ramificações atuais;
- limitar toda alteração de runtime a `frontend/data/Map022.json` e `frontend/data/Map046.json`, sem modificar `Map004`;
- escolher os comandos e parâmetros concretos do `VisuMZ_2_VNPictureBusts` com base na documentação local e no estado real dos eventos;
- validar estrutura estaticamente e comportamento perceptível por Playtest humano.

Se o comportamento puder ser obtido com os comandos VisuStella/Coreto já ativos, eles devem ser preferidos a uma nova implementação customizada. Esta demanda não escolhe payloads específicos nem autoriza alegar validação runtime sem Playtest.

## Requisitos

### REQ-001 — Encerramento do indicador da elfa

Depois que a resposta “Rápido! A história já vai começar... vá para o seu lugar!” terminar, o ponto de exclamação sobre a cabeça da elfa deve desaparecer e não deve ser solicitado novamente durante a continuação desse fluxo.

### REQ-002 — Posição de Rheed

Sempre que o busto de Rheed estiver visível na conversa principal indicada de `Map046`, ele deve ocupar o lado direito da composição.

### REQ-003 — Posição e orientação da criança

Sempre que o busto da criança estiver visível nessa conversa, ele deve ocupar o lado esquerdo e estar virado para a direita, em direção a Rheed.

### REQ-004 — Continuidade de Rheed

Na passagem da fala anterior para “Hum... esse rosto não me é estranho. Deixe este velho testar a memória: Dulgarin, não é?”, o busto de Rheed deve permanecer na tela. Caso a expressão precise mudar, a troca deve preservar a presença e o posicionamento do busto, sem uma nova animação de saída e entrada.

### REQ-005 — Participação da criança antes das escolhas

Antes da abertura das escolhas `qualSeuNome1` e `qualSeuNome2`, a criança deve aparecer à esquerda, virada para a direita, e dizer uma fala curta e simples. A fala deve funcionar como reação ou resposta imediata a Rheed, sem adicionar informação narrativa nova e sem antecipar o resultado de qualquer escolha.

### REQ-006 — Preservação do fluxo de escolhas

As duas escolhas, sua ordem, seu cancelamento configurado, suas ramificações e seus efeitos devem permanecer semanticamente equivalentes ao estado anterior, exceto pelos ajustes visuais e pela fala explicitamente solicitados.

### REQ-007 — Preservação de identidade e assets

Usar `Rheed` como grafia canônica no texto e na documentação nova, sem renomear o asset legado `Reed final.png`. Preservar o Picture ID 1 para Rheed e o Picture ID 2 para a criança.

## Restrições

- Editar dados de mapa por parsing e serialização estruturados; não usar substituição textual ampla sobre listas de comandos.
- Preservar a estrutura de indentação dos comandos de evento e das escolhas.
- Usar a superfície existente do `VisuMZ_2_VNPictureBusts` para entrada, saída, troca gráfica, posição e espelhamento dos bustos, salvo evidência técnica posterior de insuficiência.
- Não criar ou renomear assets como consequência implícita desta demanda.
- Não mudar textos, escolhas, estados de quest ou progressão narrativa além da nova fala curta solicitada e dos ajustes necessários de apresentação.
- Não modificar `frontend/data/Map004.json`; os únicos mapas autorizados para esta demanda são `Map022` e `Map046`.
- Não considerar JSON válido como prova de comportamento visual correto; o resultado perceptível permanece dependente de Playtest humano.

## Critérios de aceite

1. Ao iniciar a interação com a elfa, o indicador pode estar visível; após o término da resposta indicada, ele desaparece sem permanecer suspenso ou reaparecer durante a sequência seguinte.
2. Não há corte, fade, deslocamento de saída nem nova entrada do busto de Rheed entre a fala anterior e “Hum... esse rosto não me é estranho...”.
3. Rheed aparece à direita em todas as aparições cobertas da conversa principal.
4. A criança aparece à esquerda e olha para a direita em todas as aparições cobertas da conversa principal.
5. Uma fala curta da criança é exibida antes da abertura visual das escolhas, com seu busto já presente na posição e orientação aprovadas.
6. As escolhas `qualSeuNome1` e `qualSeuNome2` continuam acessíveis, na mesma ordem, e cada ramificação mantém seus efeitos e sua terminação corretos.
7. O JSON de `Map022` e `Map046` continua válido, o diff fica restrito aos eventos e comandos necessários para esta demanda e `Map004` permanece sem alterações.
8. Um Playtest humano confirma timing do indicador, continuidade dos bustos, composição esquerda/direita, orientação da criança, legibilidade da nova fala e funcionamento das duas escolhas.

## Validators

### Validação estrutural

- Executar parse JSON de `Map022` e `Map046` após a implementação.
- Confirmar por seletores estruturais os mapas, eventos, páginas e comandos modificados.
- Revisar diff restrito, rejeitando reflow massivo ou alterações fora das superfícies declaradas.
- Confirmar ausência de diff em `frontend/data/Map004.json`.
- Confirmar que cada `Show Choices` mantém um `When` ordenado por opção, indentação correta e o `Choice End` correspondente.
- Confirmar que os Picture IDs e nomes de assets referenciados existem e permanecem consistentes.

### Validação semântica estática

- Confirmar que o controlador do indicador não continua solicitando o balão após o término da resposta da elfa e que o fluxo trata um balão já ativo.
- Confirmar que não existe comando de saída seguido de nova entrada do Picture ID 1 na transição coberta por REQ-004.
- Confirmar que a fala da criança e a apresentação do Picture ID 2 precedem a abertura das escolhas.
- Confirmar que os comandos de posição e espelhamento têm como resultado pretendido Rheed à direita e a criança à esquerda, virada para a direita.
- Confirmar que `VisuMZ_2_VNPictureBusts` continua ativo e que os payloads usados pertencem aos comandos documentados do plugin.

### Validação humana

- Realizar Playtest das duas cenas em execução real do jogo.
- Registrar evidência visual suficiente para verificar os lados, a orientação, a ausência de flicker/reentrada e o momento em que o indicador desaparece.
- Percorrer as duas escolhas separadamente e confirmar seus resultados.

## Premissas reversíveis

### ASSUMPTION-001 — Alcance de “sempre”

- **Hipótese:** “sempre” se refere à conversa principal identificada em `Map046`, especialmente ao trecho da fala citada e às escolhas relacionadas, e não a todas as cenas do jogo.
- **Motivo:** todos os requisitos de busto foram apresentados junto da fala localizada nesse evento.
- **Impacto:** limita a validação de composição ao evento 1, página 1, de `Map046`.
- **Como reverter:** ampliar explicitamente o escopo para outros mapas e eventos em uma demanda separada ou mediante decisão humana rastreável.
- **Validator:** inventário das aparições de Rheed e da criança dentro do evento coberto.

## Itens a validar depois

### VL-001 — Fala exata da criança

- **Owner:** responsável narrativo ou próximo executor com revisão humana.
- **Momento:** antes da aceitação final da implementação.
- **Evidência esperada:** texto curto inserido antes das escolhas, coerente com a voz da criança e sem informação narrativa nova.

### VL-002 — Encerramento perceptível do balão

- **Owner:** technical implementer e runtime QA.
- **Momento:** após a alteração estruturada de `Map022`.
- **Evidência esperada:** Playtest mostrando que o indicador desaparece ao final da resposta, inclusive quando sua animação já estava em andamento.

### VL-003 — Composição e continuidade dos bustos

- **Owner:** technical implementer e runtime QA.
- **Momento:** após a alteração estruturada de `Map046`.
- **Evidência esperada:** captura ou vídeo do fluxo completo até as escolhas e de ambas as ramificações.

## Riscos e mitigação esperada

| Risco | Impacto | Mitigação esperada |
| --- | --- | --- |
| Apenas trocar a condição da página não encerrar um balão já ativo | O ponto de exclamação continua visível após a fala | Validar o estado perceptível e tratar explicitamente o balão em andamento quando necessário |
| Reordenar comandos por índices frágeis | Alteração no lugar errado ou quebra das escolhas | Usar parsing estruturado, seletores estáveis e contagens esperadas |
| `Auto-Reverse` produzir orientação diferente da intenção visual | Criança ou Rheed olhar para o lado errado | Validar o resultado em Playtest e ajustar com comando documentado de espelhamento |
| Duplicar ou apagar Picture IDs incorretamente | Flicker, sobreposição ou desaparecimento de busto | Preservar IDs 1–2 e revisar ordem de Enter, Graphic Change e Exit |
| Inserir a fala dentro de uma única ramificação | Parte dos jogadores não vê a nova fala | Inserir a fala antes de `Show Choices` e validar a estrutura do grupo |
| Renomear o asset legado ao normalizar `Rheed` | Referência quebrada no runtime | Manter `Reed final.png` e normalizar apenas texto/documentação nova |

## Referências e provenance

| ID | Classificação | Fonte e locator | Informação sustentada |
| --- | --- | --- | --- |
| SRC-001 | original | `planos/004-ambientacao-VN/sub-demanda1.md` | Feedback original e comportamentos solicitados |
| DEC-001 | human-decision | Resposta do usuário em 2026-07-29 ao gate de posicionamento | Criança à esquerda, virada para a direita |
| DEC-002 | human-decision | Resposta do usuário em 2026-07-29 ao diagnóstico `loki-feedback` | Indicador em `Map022`, bustos em `Map046` e exclusão total de `Map004` |
| SRC-002 | source | `frontend/data/Map022.json` → evento 30, página 1, comandos 11–20 e scan estruturado do mapa | Fala da elfa e ausência de escrita local da variável 26 |
| SRC-003 | source | `frontend/data/Map022.json` → evento 31, páginas 1–2 | Controlador paralelo do balão sobre o evento 30 e condição baseada na variável 26 |
| SRC-004 | source | `frontend/data/Map046.json` → evento 1, página 1, comandos 2–45 | Ordem atual de mensagens, bustos e escolhas |
| SRC-005 | source | `frontend/js/plugins.js` → entrada `VisuMZ_2_VNPictureBusts` | Plugin ativo, Tier 2, versão 1.03 |
| SRC-006 | source | `docs/rpg-maker-for-ia/docs-visustella/narrative-plugins/visustella-visual-novel-picture-busts/conceitos/como-funciona-busts.md` | Modelo de posições, orientação padrão e Picture IDs |
| SRC-007 | source | `docs/rpg-maker-for-ia/docs-visustella/narrative-plugins/visustella-visual-novel-picture-busts/comandos/basicos.md` | Comandos de Enter, Exit, Graphic Change e Mirror |
| SRC-008 | source | `planos/004-ambientacao-VN/backlog.md` → gate `DG-NAMING` | `Rheed` canônico e preservação do asset legado |
| SRC-009 | source | `frontend/data/System.json` → `variables[26]` | Nome da variável 26: `v_qNoite_progress` |
| INF-001 | inference | SRC-001 + SRC-004 | O alcance de “sempre” é a conversa principal localizada em `Map046`; registrado como premissa reversível |
| INF-002 | inference | SRC-001 + SRC-004 | Como a demanda só pede inserção antes das escolhas, conteúdo e efeitos das escolhas devem ser preservados |

Todo acréscimo acima está classificado como fonte, inferência, premissa ou decisão humana. Nenhuma instrução encontrada nas fontes amplia o escopo ou a autoridade desta demanda.

## Few-shots

Omitidos. Nenhum exemplo foi fornecido ou aprovado para esse propósito, e não há necessidade de inventar uma fala para tornar a demanda executável.

## Matriz de cobertura da intenção original

| Original ID | Resumo fiel | Destino na saída | Status | Evidence locator |
| --- | --- | --- | --- | --- |
| ORI-001 | Exclamação da elfa some depois da resposta | REQ-001; critérios 1 e 8 | preserved | SRC-001, primeiro bullet |
| ORI-002 | Rheed sempre à direita | REQ-002; critérios 3 e 8 | preserved | SRC-001, segundo bullet |
| ORI-003 | Criança sempre à esquerda | REQ-003; critérios 4 e 8 | preserved | SRC-001, segundo bullet |
| ORI-004 | Não remover e recolocar Rheed antes de “Hum...” | REQ-004; critérios 2 e 8 | preserved | SRC-001, terceiro bullet |
| ORI-005 | Adicionar fala simples da criança antes das escolhas | REQ-005; critérios 5 e 8 | preserved | SRC-001, terceiro bullet |
| ORI-006 | Adicionar o busto da criança à conversa | REQ-003 e REQ-005; critérios 4–5 | preserved | SRC-001, terceiro bullet |
| ORI-007 | Entrada contraditória pedia criança à direita, virada para a esquerda | Intenção original 6; REQ-003; DEC-001 | clarified-by-human | Decisão humana de 2026-07-29: esquerda, virada para a direita |
| ORI-008 | Restringir todas as alterações aos mapas 022 e 046 | Intenção original 7; Escopo; Restrições; DEC-002 | clarified-by-human | Decisão humana de 2026-07-29: indicador em `Map022`, bustos em `Map046`, `Map004` excluído |

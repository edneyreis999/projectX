# Padronizar bustos em interações de Visual Novel

## Resumo da demanda enriquecida

Estabelecer e aplicar uma regra arquitetural para a composição de bustos na Visual Novel `Map049`: Thorin representa o jogador e deve estar presente à esquerda; os NPCs devem ocupar o lado direito. A regra não se aplica a mapas de exploração.

## Intenção original

Definir uma regra de arquitetura para bustos, garantindo a presença do busto do jogador nas VNs, com o jogador à esquerda e o NPC à direita. Confirmar previamente se alguma expressão adicional precisa ser produzida e alocada em `frontend/img/pictures`.

## Objetivo e resultado esperado

O `Map049` deve apresentar Thorin como o jogador à esquerda e os NPCs à direita, seguindo os recursos e comandos já disponíveis no Visual Novel Picture Busts. As interações de exploração permanecem fora da regra.

## Contexto observado

- O projeto usa o plugin ativo `VisuMZ_2_VNPictureBusts` para bustos em VNs.
- O plugin disponibiliza posições predeterminadas de `0` a `10`; na configuração atual, as posições `0` a `5` estão no lado esquerdo e `6` a `10` no lado direito.
- Thorin é o personagem definido pelo responsável como o jogador para essa convenção.
- `Map049` é o alvo desta demanda. A identidade nominal, o evento/página e o vínculo narrativo da VN devem ser confirmados nos dados atuais antes de implementar.
- Os assets de Thorin já cobrem expressões existentes; nenhuma expressão adicional foi solicitada para esta demanda.
- No beat final, a fala "Saudações, aventureiro!..." é de Rheed. O asset aprovado para esse beat é `Portraits/Principal/Reed final`.

## Decisões humanas registradas

| Decisão | Valor aprovado | Impacto na implementação |
| --- | --- | --- |
| Speaker do beat final | Rheed | O `Basic_EnterBust` final representa um NPC e deve usar Picture 1 no lado direito. |
| Asset/expressão do beat final | `Portraits/Principal/Reed final` | Substitui o `PictureName:str` vazio sem criar asset novo. |

## Escopo

Inclui:

- Aplicar a convenção de composição na VN `Map049`.
- Garantir a presença de Thorin no `Map049`, em posição do lado esquerdo.
- Posicionar os NPCs participantes do `Map049` no lado direito.
- Usar os comandos e assets existentes do Visual Novel Picture Busts, incluindo troca de gráfico quando uma expressão precisar mudar durante uma presença já estabelecida.
- Identificar e comunicar antes da implementação qualquer emoção necessária que não tenha asset de Thorin apropriado.

Não inclui:

- Interações em mapas de exploração, que devem continuar usando GabWindow e não bustos.
- Criação de novos bustos ou expressões sem uma necessidade narrativa identificada e comunicada ao responsável.

## Mandato para o próximo executor

Localizar as superfícies de evento da VN `Map049` e aplicar a convenção. O executor deve confirmar os comandos do plugin antes de editar eventos e avisar o responsável quando a cena exigir uma expressão inexistente de Thorin. A estratégia concreta de integração deve respeitar a arquitetura existente do projeto e os dados reais da cena, sem alcançar os mapas de exploração.

## Requisitos

1. No `Map049`, o busto de Thorin deve estar visível como representação do jogador.
2. O busto de Thorin deve ocupar uma posição configurada no lado esquerdo.
3. Os bustos de NPC devem ocupar posições configuradas no lado direito.
4. O fluxo não deve reintroduzir desnecessariamente um busto já presente apenas para trocar sua expressão; a troca deve preservar a presença quando o plugin permitir.
5. A regra deve ser aplicada somente a VNs, nunca como conversão de diálogos de exploração/GabWindow.
6. Os diálogos de exploração devem permanecer explicitamente excluídos da regra.
7. Caso uma emoção exigida pelo roteiro não possua busto de Thorin, a implementação deve parar nessa parte e informar o nome/emoção do asset necessário antes de substituir ou inventar uma expressão.
8. O beat final deve apresentar Rheed no lado direito usando o asset existente `Portraits/Principal/Reed final`, enquanto Thorin permanece no lado esquerdo.

## Restrições

- Preferir comandos e capacidades já fornecidos pelo VisuStella Visual Novel Picture Busts; não criar ou alterar plugin sem necessidade comprovada.
- Mudanças em mapas e eventos são dados estruturados de RPG Maker MZ e exigem edição estruturada, parse JSON posterior e diff restrito aos alvos autorizados.
- Mudanças perceptíveis de layout, entrada, saída e leitura dos bustos exigem Playtest humano; validação estática não basta.

## Critérios de aceite

1. O `Map049` mostra Thorin à esquerda durante a interação e o(s) NPC(s) à direita.
2. Thorin permanece presente quando o NPC fala, salvo um beat narrativo explicitamente autorizado que determine o contrário.
3. Os diálogos de exploração permanecem fora da regra.
4. O `Map049` aplica a composição definida sem introduzir referências a bustos inexistentes.
5. Não há referência a arquivo de busto inexistente introduzida pela mudança.
6. O Playtest humano confirma composição, espelhamento, camadas, entradas/saídas e troca de expressão nas cenas alteradas.
7. A fala final apresenta Rheed com `Portraits/Principal/Reed final` à direita e Thorin à esquerda, sem `PictureName:str` vazio.

## Validadores

- Conferência estruturada dos comandos `VisuMZ_2_VNPictureBusts` nos eventos alterados.
- Parse JSON dos arquivos `data/MapXXX.json` modificados.
- Diff limitado aos mapas/eventos autorizados.
- Verificação de existência dos arquivos de imagem referenciados em `frontend/img/pictures`.
- Playtest humano das VNs modificadas.

## Premissas reversíveis

| Premissa | Motivo | Como reverter | Validador |
| --- | --- | --- | --- |
| As posições numéricas específicas serão escolhidas entre as faixas laterais já configuradas, sem alterar parâmetros globais do plugin. | A decisão humana definiu lados, mas não uma posição numérica única. | Ajustar somente os comandos de evento das cenas afetadas após direção de arte. | Playtest de composição. |
| Expressões existentes de Thorin são suficientes até que um roteiro peça uma emoção sem cobertura. | Não há cena ou emoção nova especificada nesta demanda. | Adicionar o asset solicitado e atualizar a referência do evento correspondente. | Revisão do roteiro e verificação do asset. |

## Itens a validar depois

| Item | Responsável | Momento | Evidência esperada |
| --- | --- | --- | --- |
| Legibilidade e equilíbrio visual das posições escolhidas. | Responsável humano / QA de runtime. | Após a edição de cada VN. | Playtest registrado. |
| Necessidade de expressão adicional de Thorin. | Responsável narrativo e artístico. | Ao detalhar os beats de cada cena. | Solicitação de asset com emoção e nome de arquivo. |

## Riscos e mitigação esperada

- Uma edição baseada somente em posição pode quebrar a composição de cenas com múltiplos bustos. Mitigar revisando a cena completa e testando-a em runtime.
- Trocar expressões pela reentrada do busto pode causar fades ou camadas indesejados. Mitigar usando a troca de gráfico sobre o busto já presente quando aplicável.
- A regra pode alcançar indevidamente um diálogo de exploração. Mitigar restringindo os alvos ao `Map049`.

## Referências e provenance

| Tipo | Evidência | Uso |
| --- | --- | --- |
| Decisão humana | Conversa desta demanda | Thorin é o jogador; exploração usa GabWindow; a regra será aplicada no `Map049`. |
| Decisão humana | Preflight de decisão humana desta demanda | A fala final é de Rheed e usa `Portraits/Principal/Reed final`. |
| Fonte local | `frontend/js/plugins.js` | Confirma que `VisuMZ_2_VNPictureBusts` está ativo e sua configuração de posições. |
| Fonte local | `frontend/js/plugins/VisuMZ_2_VNPictureBusts.js` | Referência para os comandos e comportamento do plugin. |
| Fonte local | `frontend/data/Map049.json` e `frontend/data/MapInfos.json` | Confirmar o contexto, a VN e a superfície de evento do novo alvo. |
| Fonte local | `docs/domains/scene-presentation-designer/README.md` | Registra o lifecycle e a composição de cenas relevantes. |

## Matriz de cobertura da intenção original

| ID original | Requisito | Destino nesta demanda | Status | Evidência |
| --- | --- | --- | --- | --- |
| R1 | Seguir uma regra arquitetural para bustos. | Objetivo, mandato e requisitos 1-6. | clarified-by-human | Conversa desta demanda. |
| R2 | Busto do jogador sempre nas VNs. | Requisitos 1 e 5; critérios 1 e 2. | clarified-by-human | Thorin definido como jogador. |
| R3 | Jogador à esquerda. | Requisito 2; critério 1. | preserved | Conversa desta demanda. |
| R4 | NPC à direita. | Requisito 3; critério 1. | preserved | Conversa desta demanda. |
| R5 | Considerar as posições do plugin. | Contexto observado; premissa sobre faixas laterais. | source | Configuração de `VisuMZ_2_VNPictureBusts` em `frontend/js/plugins.js`. |
| R6 | Avisar se expressão adicional for necessária. | Escopo, requisito 7 e item a validar depois. | preserved | Conversa desta demanda. |
| R7 | Ignorar interações em exploração. | Escopo e requisito 5. | clarified-by-human | Conversa desta demanda. |
| R9 | Aplicar a regra no mapa indicado pelo responsável. | Resumo, objetivo, escopo, requisitos e critérios do `Map049`. | clarified-by-human | Conversa desta demanda. |

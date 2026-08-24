---
status: approved
owner: Narrative Designer
quest: A Semifinal
contract_version: 1.2.0
language: pt-BR
---
# A Semifinal — Contrato Canônico de Diálogos

## Autoridade e fronteiras

Este documento é a fonte exata de copy e intenção narrativa da semifinal. Gameplay Engineering pode transportar IDs e texto para o RPG Maker, mas não pode reescrever falas, fatos, intenção ou distinção de branches. Audio Design não pode tornar um fato dependente apenas de som. Scene Presentation possui staging, movimento, câmera, waits e cleanup, sem alterar o conteúdo abaixo.

Toda fala que avança a história principal ou a quest usa VN, mesmo quando nasce de uma interação em mapa `EX_`. Em exploração, Gab Message fica restrita a bloqueio, ambientação, fala isolada de cutscene que não carrega fato exclusivo e retomada pós-VN. `Target Gab anchor` identifica somente as Gabs ainda ativas; coordenadas, duração e waits pertencem ao contrato de cutscene. IDs são interfaces estáveis; IDs 010 explicitamente supersedidos abaixo permanecem apenas como rastreabilidade histórica.

## Fontes consultadas

- Foundation: `docs/GDD/00_Foundation/00.1_Core_Concept/Core _Concept.md`, `Core _Concept_Comercial.md`, `docs/GDD/00_Foundation/00.2_Fundation_details/Foundation_Details.md` e `docs/GDD/00_Foundation/00.3_Tone_Vibe/Tone_Vibe.md`.
- Perfis: `docs/GDD/02_Atlas_Folk/02.2_Personagens/Thorin.md`, `Filena.md`, `Killin.md`, `Mhordred.md`, `Rheed.md`, `Tordan.md` (filename protegido; display canônico Thordan) e `Dragobur.md`.
- Quest/direção: `docs/Quests/2-semifinal/semifinal.NSD.fluxo-cenas.md`, `planos/010-guia-migracao-nova-arquitetura/fase2/grill-me-with-docs-2026-08-19.md` e `planos/010-guia-migracao-nova-arquitetura/fase2/direcao-arte-cutscenes-semifinal-2026-08-19.md`.
- Correção de Playtest: `.compozy/tasks/011-semifinal-playtest-remediation/_spec.md`, `_user_stories.md`, `_dx.md`, `_tests.md` e ADR-001 a ADR-009 do mesmo slug.
- Worldbuilding: `docs/GDD/01_Worldbuilding/01.5_Social/Futebol Rúnico.md` e `docs/GDD/01_Worldbuilding/01.5_Social/Organização Social de Gildrat.md`.
- ADRs aceitos: `adr-001-narrated-match-elision.md`, `adr-002-dragobur-helmet-reward.md`, `adr-003-return-home-handoff.md`, `adr-004-iron-guard-command.md`, `adr-005-locked-non-skippable-cutscenes.md`, `adr-006-preserve-locker-room-gag.md`, `adr-007-canonical-name-normalization.md`, `adr-008-role-bounded-authoring-surfaces.md`, `adr-009-single-canonical-semifinal-machine.md`, `adr-010-quest-discipline-documents.md` e `adr-011-ex-cutscene-score-and-visual-choice.md`.
- Baseline protegido: `frontend/data/Map063.json`, evento 7.

## Conflitos resolvidos

- ADR-001 substitui a partida jogável pela elipse de Rheed e crianças no mapa EX.
- ADR-002 resolve a pendência do capacete: Dragobur o dá permanentemente a Thorin antes da interrupção.
- ADR-003 fixa o destino da escolta no exterior da Casa Forja-Prata.
- ADR-004 substitui o capitão genérico e registra Tharok como removido do cânone: Killin lidera e responde somente ao General Thordan; Mhordred apoia.
- ADR-006 prevalece sobre a restrição posterior de representação: a linha e o conteúdo do gag permanecem exatos.
- ADR-007 preserva filenames/links/IDs e normaliza display atual para Thordan, Dragobur e Killin.
- ADR-011 mantém Gentle/Resist distintos, sem branch persistente, convergindo antes da escolta.
- 011 ADR-001 supersede a rota EX integral de Dragobur e da intervenção: conversa que avança a quest usa VN; EX preserva staging, bloqueio, movimento e retomada.
- 011 ADR-004 supersede a interpretação de que Dragobur queria o elmo da estátua: ele pede um capacete velho comum; Thorin pega obrigatoriamente o elmo histórico por engano deliberadamente improvisado.
- 011 ADR-005 supersede Resist sem combate: Resist inicia batalha real de Thorin e Filena contra Mhordred; derrota normal e vitória excepcional convergem na mesma captura.
- 011 ADR-006 identifica os rivais como Martelos de Bronze patrocinados por Casas Mineradoras e usa a hostilidade para revelar classe sem palestra de lore.
- O feedback de Playtest de 2026-08-21 torna a estátua legível antes da ordem de Dragobur, mas somente como ambientação filler; V50 não concede item nem avança a quest.
- O feedback de Playtest de 2026-08-24 substitui a reconciliação por nova interação: em V70, equipar Armor 51 em Thorin conclui o objetivo automaticamente no primeiro frame do mapa após fechar o menu. Falar com a estátua ou com Dragobur permanece apenas como fallback de recuperação.

## Supersessão corretiva 011 — sequências canônicas

Esta seção é a autoridade atual para os trechos corrigidos. Os IDs 010 `DL-SEM-ARRIVAL-*`, `DL-SEM-HELMET-DRAGOBUR-001`, `DL-SEM-AUTHORIZE-DRAGOBUR-001`, `DL-SEM-CELEBRATION-TEAM-001`, `DL-SEM-GIFT-*`, `DL-SEM-GUARD-*`, `DL-SEM-ORDER-*`, `BR-SEM-*` e `DL-SEM-*-REACTION-001` permanecem abaixo somente para auditoria do baseline e não podem ser consumidos como Gabs de progressão. A implementação 011 usa os novos IDs desta seção.

| Momento | Apresentação | Entrada canônica | Estado/retomada |
| --- | --- | --- | --- |
| Primeira conversa com Dragobur | VN `SEMIFINAL_DRAGOBUR_ARRIVAL` | `VN-SEM-DRAGOBUR-ARRIVAL-*` | conclui em V60; EX retoma com `GAB-SEM-CONTINUE-HELMET-011` |
| Repetições no V60/V70 | Gab em EX | `GAB-SEM-DRAGOBUR-SEARCH-011`, `GAB-SEM-DRAGOBUR-EQUIP-011` | V60 não avança; V70 equipado reconcilia V80 e devolve controle |
| Retorno equipado | VN `SEMIFINAL_DRAGOBUR_AUTHORIZATION` | `VN-SEM-DRAGOBUR-AUTH-*` | conclui em V90; EX retoma com `GAB-SEM-CONTINUE-FIELD-011` |
| Celebração e rivais | VN `SEMIFINAL_CELEBRATION` | `VN-SEM-CELEBRATION-*` | termina depois do presente e antes da entrada dos guardas |
| Ordem e escolha | VN `SEMIFINAL_GUARD_INTERVENTION` | `VN-SEM-GUARD-*`, `VN-SEM-CHOICE-*` | termina depois da resposta Gentle/Resist; consequência física volta a EX |
| Captura e saída | EX/Gab | `GAB-SEM-ESCORT-*` | ambos os caminhos convergem em V120 |

### VN-SEM-DRAGOBUR-ARRIVAL-011

1. `VN-SEM-DRAGOBUR-ARRIVAL-DRAGOBUR-011` — Dragobur: “THORIN! Os Machados já estão perdendo, meu atacante resolveu passear por Gildrat e você aparece agora?!”
2. `VN-SEM-DRAGOBUR-ARRIVAL-THORIN-011` — Thorin: “Eu apareci antes do fim. Me põe em campo que ainda dá para virar.”
3. `VN-SEM-DRAGOBUR-ARRIVAL-DRAGOBUR-HELMET-011` — Dragobur: “Em campo sem capacete? Nem se você fosse filho de todas as Grandes Casas ao mesmo tempo.”
4. `VN-SEM-DRAGOBUR-ARRIVAL-THORIN-HELMET-011` — Thorin: “Então me dá um. Ou aponta onde esconderam um.”
5. `VN-SEM-DRAGOBUR-ARRIVAL-DRAGOBUR-ORDER-011` — Dragobur: “Vestiário. Pegue um capacete velho, qualquer um que ainda proteja essa sua cabeça, equipe e volte. E não invente moda.”

Fatos congelados: Dragobur pede um capacete velho comum no vestiário e não menciona a estátua da Seleção de Ouro; Thorin responde; `REQUIRE_HELMET` só ocorre depois da conclusão da VN.

### GAB-SEM-DRAGOBUR-SEARCH-011

- Speaker: `DRAGOBUR`
- Cópia exata: “Vestiário, Thorin. Um capacete velho. E rápido!”
- Target Gab anchor: `MAP062_E2_OR_E19_DRAGOBUR`

### GAB-SEM-DRAGOBUR-EQUIP-011

- Speaker: `DRAGOBUR`
- Cópia exata: “Carregar não protege essa cabeça. Equipe o capacete e volte aqui.”
- Target Gab anchor: `MAP062_E2_OR_E19_DRAGOBUR`

### GAB-SEM-CONTINUE-HELMET-011

- Speaker: `DRAGOBUR`
- Cópia exata: “Vestiário. Capacete velho. Equipado. Nessa ordem!”
- Target Gab anchor: `MAP062_E2_OR_E19_DRAGOBUR`

### VN-SEM-DRAGOBUR-AUTHORIZATION-011

1. `VN-SEM-DRAGOBUR-AUTH-ANGER-011` — Dragobur: “ERA PARA VOCÊ PEGAR UM CAPACETE VELHO NO VESTIÁRIO, NÃO O CAPACETE DA ESTÁTUA DO TIME DE OURO!”
2. `VN-SEM-DRAGOBUR-AUTH-THORIN-011` — Thorin: “Eu estava com pressa. Esse serviu certinho. E tenho certeza de que eu e o capacete vamos fazer história juntos.”
3. `VN-SEM-DRAGOBUR-AUTH-THORIN-INNOCENT-011` — Thorin: “Além disso... se ele estava numa estátua, ninguém estava usando.”
4. `VN-SEM-DRAGOBUR-AUTH-YIELD-011` — Dragobur: “O jogo está acabando e eu preciso do meu atacante. Entra antes que eu decida escalar a estátua no seu lugar.”

Fatos congelados: Thorin trata a escolha como improviso apressado e se faz de desentendido, não como furto premeditado; `AUTHORIZE_FIELD` ocorre somente depois da fala de concessão.

### GAB-SEM-CONTINUE-FIELD-011

- Speaker: `DRAGOBUR`
- Cópia exata: “Campo, atacante! Depois eu decido o que fazer com você e com esse capacete.”
- Target Gab anchor: `MAP062_E2_OR_E19_DRAGOBUR`

### VN-SEM-CELEBRATION-011

1. `VN-SEM-CELEBRATION-TEAM-011` — Time dos Machados: “MACHADOS! MACHADOS! THORIN!”
2. `VN-SEM-CELEBRATION-RIVAL-CLASS-011` — Martelo de Bronze: “Bonita a festa. Quando um time de bairro precisa do filho de uma Grande Casa para vencer, até a ferrugem parece ouro.”
3. `VN-SEM-CELEBRATION-RIVAL-SPONSOR-011` — Outro Martelo: “Sem patrocinador, sem equipamento e sem nome. Aí aparece um nobre e vocês chamam de mérito.”
4. `VN-SEM-CELEBRATION-THORIN-011` — Thorin: “Meu sobrenome não marcou o gol. E patrocínio de Casa Mineradora também não joga por vocês.”
5. `VN-SEM-CELEBRATION-FILENA-011` — Filena: “Ele correu com os Machados. Perdeu o fôlego com os Machados. A vitória é nossa. Engulam isso juntos.”
6. `VN-SEM-CELEBRATION-DRAGOBUR-011` — Dragobur: “Chega. Hoje meu time fez história com o que tinha — inclusive um atacante atrasado e um capacete roubado da decoração.”
7. `VN-SEM-CELEBRATION-GIFT-011` — Dragobur: “Fica com ele, Thorin. Depois desse gol, o capacete escolheu um dono tão teimoso quanto o anterior.”
8. `VN-SEM-CELEBRATION-THORIN-GIFT-011` — Thorin: “Eu avisei. Nós dois ainda vamos fazer história.”

Fatos congelados: os Martelos de Bronze têm patrocínio de Casas Mineradoras; os Machados são um time de bairros trabalhadores e poucos recursos; o time não rejeita Thorin por sua origem; a propriedade narrativa do Armor 51 muda sem novo grant.

### VN-SEM-GUARD-INTERVENTION-011

1. `VN-SEM-GUARD-DRAGOBUR-011` — Dragobur: “A comemoração ainda não acabou. Quem chamou a Guarda de Ferro?”
2. `VN-SEM-GUARD-KILLIN-ORDER-011` — Killin: “Thorin Forja-Prata. Sou Killin, Capitã da Guarda de Ferro. Por ordem direta do General Thordan, você volta para casa conosco. Agora.”
3. `VN-SEM-GUARD-THORIN-011` — Thorin: “Meu pai não manda no estádio. E não manda no meu time.”
4. `VN-SEM-GUARD-MHORDRED-011` — Mhordred: “Ele mandou em nós. Para hoje, isso basta.”
5. `VN-SEM-GUARD-FILENA-MOTIVE-011` — Filena: “Não basta. Vocês entram na nossa festa, tratam o time como se não existisse e esperam que ele abaixe a cabeça. Se levarem Thorin à força, vão ter que passar por mim também.”

Depois dessas falas, a VN apresenta Gentle/Resist. Gentle usa `VN-SEM-CHOICE-GENTLE-011` — Thorin: “Eu vou. Mas deixem o time terminar de comemorar.” Resist usa `VN-SEM-CHOICE-RESIST-011` — Thorin: “Eu não vou fingir que isso é justo. Filena, fica atrás de mim.” Filena responde em `VN-SEM-CHOICE-RESIST-FILENA-011`: “Nem pensar. A gente enfrenta isso junto.” A VN termina depois da reação imediata; não persiste branch.

### GAB-SEM-ESCORT-011

- Gentle: Killin conduz a formação sem combate.
- Resist: depois da batalha, Killin retoma o comando e Mhordred sustenta a retaguarda.
- Cópia de convergência de Killin: “Formação. Mhordred à retaguarda. Vamos levar Thorin até a Casa Forja-Prata.”
- Cópia de Filena: “A gente termina a comemoração quando você voltar. Isso não acaba aqui.”
- Apenas Thorin sai carregado; Filena permanece com os Machados no estádio.

## Perfis de vozes incidentais

| Speaker ID | Perfil suficiente | Registro | Vocabulário e padrão |
| --- | --- | --- | --- |
| `JOGADORA_VESTIARIO` | Jogadora anônima do evento protegido Map063 E7; atleta que reage à invasão do espaço do time. | Indignação direta e exagerada do gag aprovado, sem ampliar o conteúdo. | Uma ordem hostil curta; usa exatamente a fala protegida, sem improviso. |
| `CRIANCAS_CORETO` | Público infantil da moldura de Rheed, conforme o perfil de Rheed. | Curiosidade e entusiasmo; apoio, nunca exposição principal. | Frases muito curtas, concretas e reativas; não simulam a partida. |
| `TIME_MACHADOS` | Coletivo esportivo dos Machados Enferrujados sob o perfil de Dragobur. | Celebração recíproca e incômodo grupal. | Coro curto; fatos essenciais ficam em falas nomeadas. |

## Entradas canônicas

### DL-SEM-URGENT-THORIN-001
- Speaker: `THORIN`
- Beat: exploração urgente / entrada irrelevante bloqueada
- Intenção: lembrar a si mesmo da prioridade sem narrador externo
- Fatos obrigatórios: não há tempo; Thorin está atrasado; Dragobur já deve estar furioso
- Cópia exata: “Agora não! Eu já estou atrasado. O Dragobur deve estar soltando fumaça pelo nariz.”
- Target Gab anchor: `MAP061_ENTRANCE_BLOCKER`
- Perfis fonte: `Thorin.md`, `Dragobur.md`

### DL-SEM-ARRIVAL-DRAGOBUR-001
- Speaker: `DRAGOBUR`
- Beat: chegada atrasada ao estádio
- Intenção: transformar alívio em bronca esportiva
- Fatos obrigatórios: o time está perdendo; Thorin é o atacante necessário; ele chegou tarde
- Cópia exata: “THORIN! Meu time está perdendo, meu atacante resolveu passear por Gildrat e você aparece agora?!”
- Target Gab anchor: `MAP062_E2_DRAGOBUR`
- Perfis fonte: `Dragobur.md`, `Thorin.md`

### DL-SEM-ARRIVAL-THORIN-001
- Speaker: `THORIN`
- Beat: resposta à bronca
- Intenção: tentar encerrar a bronca pela ação
- Fatos obrigatórios: Thorin quer entrar imediatamente
- Cópia exata: “Eu cheguei. A gente ainda vira isso. Só me põe em campo!”
- Target Gab anchor: `MAP062_PLAYER`
- Perfis fonte: `Thorin.md`

### DL-SEM-HELMET-DRAGOBUR-001
- Speaker: `DRAGOBUR`
- Beat: ordem interrompida pela falta do capacete
- Intenção: autorizar e imediatamente barrar Thorin por segurança
- Fatos obrigatórios: Thorin não está de capacete; não pode entrar; deve procurar no vestiário
- Cópia exata: “Então entra e— pelas barbas da trave, cadê seu capacete? Sem capacete, sem campo. Vestiário. Agora!”
- Target Gab anchor: `MAP062_E2_DRAGOBUR`
- Perfis fonte: `Dragobur.md`

### DL-SEM-HELMET-DRAGOBUR-REPEAT-001
- Speaker: `DRAGOBUR`
- Beat: requisito repetido
- Intenção: reforçar somente o próximo passo
- Fatos obrigatórios: capacete designado precisa estar equipado
- Cópia exata: “Não basta carregar o capacete debaixo do braço, Thorin. Equipe o velho elmo e volte aqui.”
- Target Gab anchor: `MAP062_E2_DRAGOBUR`
- Perfis fonte: `Dragobur.md`, `Thorin.md`

### DL-SEM-LOCKER-THORIN-001
- Speaker: `THORIN`
- Beat: entrada no vestiário masculino
- Intenção: preservar o humor corporal juvenil sem esconder a busca
- Fatos obrigatórios: este é o vestiário correto; Thorin continua procurando o capacete
- Cópia exata: “Vestiário certo. Cheiro errado. Como é que meia molhada consegue ter vontade própria?”
- Target Gab anchor: `MAP063_PLAYER`
- Perfis fonte: `Thorin.md`

### DL-SEM-GAG-LOCKER-001
- Speaker: `JOGADORA_VESTIARIO`
- Beat: gag opcional do vestiário feminino
- Intenção: preservar integralmente a reação aprovada
- Fatos obrigatórios: Thorin invadiu o espaço errado e deve sair
- Cópia exata: “Você não tem nenhuma decência?! Saia já daqui, seu miserável!”
- Target Gab anchor: `MAP063_E7_LOCKER_PLAYER`
- Perfis fonte: `semifinal.dialogos.md#perfis-de-vozes-incidentais`, ADR-006, `Map063 E7`

### DL-SEM-GAG-LOCKER-REPEAT-001
- Speaker: `THORIN`
- Beat: repetição após o gag
- Intenção: impedir repetição da coreografia e devolver o foco ao objetivo
- Fatos obrigatórios: Thorin sabe que é a porta errada; rota masculina continua disponível
- Cópia exata: “Não. Essa porta já me explicou tudo. Com bastante impacto.”
- Target Gab anchor: `MAP063_PLAYER`
- Perfis fonte: `Thorin.md`

### DL-SEM-STATUE-PREQUEST-FILLER-011
- Speaker: `THORIN`
- Beat: leitura opcional da estátua antes da missão do capacete
- Intenção: manter o landmark visível e transformar o atraso de Thorin em humor ambiental sem antecipar a retirada
- Fatos obrigatórios: a estátua representa Dragobur; Thorin está atrasado; nenhuma solução ou objetivo é concedido
- Cópia exata: “A estátua do Dragobur parece estar me julgando por chegar atrasado. E ela nem sabe que o jogo já começou.”
- Target Gab anchor: `MAP063_E13_STATUE`
- Perfis fonte: `Thorin.md`, `Dragobur.md`

### DL-SEM-STATUE-THORIN-001
- Speaker: `THORIN`
- Beat: leitura da estátua íntegra
- Intenção: reconhecer memória do time antes de retirar o item
- Fatos obrigatórios: estátua da seleção de ouro; capacete pertenceu a Dragobur
- Cópia exata, apresentada em cinco Gabs curtas e consecutivas: “A seleção de ouro...” / “E esse é o velho capacete do Dragobur.” / “Ele vai me matar por chegar tarde.” / “Ou por mexer nisso.” / “Talvez pelos dois.”
- Target Gab anchor: `MAP063_E13_STATUE`
- Perfis fonte: `Thorin.md`, `Dragobur.md`

### DL-SEM-STATUE-THORIN-TAKE-001
- Speaker: `THORIN`
- Beat: retirada deliberada
- Intenção: assumir a solução improvisada
- Fatos obrigatórios: Thorin retira o capacete da estátua; a origem do item é explícita
- Cópia exata, apresentada em duas Gabs curtas e consecutivas: “Desculpa, seleção de ouro.” / “O presente precisa mais disto do que a estátua.”
- Target Gab anchor: `MAP063_E13_STATUE`
- Perfis fonte: `Thorin.md`

### DL-SEM-HELMET-THORIN-FIT-001
- Speaker: `THORIN`
- Beat: reação depois de equipar
- Intenção: confirmar encaixe com humor leve
- Fatos obrigatórios: o capacete correto está equipado e serviu
- Cópia exata, apresentada em três Gabs curtas e consecutivas: “Serviu!” / “Quer dizer...” / “Se eu não respirar muito fundo.”
- Target Gab anchor: `MAP063_PLAYER`
- Perfis fonte: `Thorin.md`

### DL-SEM-AUTHORIZE-DRAGOBUR-001
- Speaker: `DRAGOBUR`
- Beat: retorno equipado
- Intenção: reconhecer o objeto e fechar o microarco
- Fatos obrigatórios: é o capacete antigo de Dragobur; veio da seleção de ouro; Thorin está autorizado
- Cópia exata: “Meu velho capacete... Da seleção de ouro. Continua feio, continua inteiro e, por algum milagre, coube em você. Campo, atacante!”
- Target Gab anchor: `MAP062_E2_DRAGOBUR`
- Perfis fonte: `Dragobur.md`, `Thorin.md`

### DL-SEM-MATCH-RHEED-LOSING-001
- Speaker: `RHEED`
- Beat: elipse — situação inicial
- Intenção: abrir o relato com a desvantagem
- Fatos obrigatórios: os Machados Enferrujados estavam perdendo
- Cópia exata: “Quando Thorin alcançou o campo, os Machados Enferrujados já estavam atrás no placar.”
- Target Gab anchor: `MAP064_E9_RHEED`
- Perfis fonte: `Rheed.md`

### DL-SEM-MATCH-CHILDREN-001
- Speaker: `CRIANCAS_CORETO`
- Beat: elipse — reação à desvantagem
- Intenção: apoiar a oralidade sem assumir a exposição
- Fatos obrigatórios: nenhum fato novo exclusivo
- Cópia exata: “Aí não!”
- Target Gab anchor: `MAP064_CHILDREN_GROUP`
- Perfis fonte: `semifinal.dialogos.md#perfis-de-vozes-incidentais`, `Rheed.md`

### DL-SEM-MATCH-RHEED-ENTRY-001
- Speaker: `RHEED`
- Beat: elipse — entrada
- Intenção: ligar a chegada de Thorin à mudança do jogo
- Fatos obrigatórios: Thorin entrou em campo
- Cópia exata: “Mas o atacante atrasado finalmente entrou — de capacete torto, fôlego curto e olhos presos na virada.”
- Target Gab anchor: `MAP064_E9_RHEED`
- Perfis fonte: `Rheed.md`, `Thorin.md`

### DL-SEM-MATCH-RHEED-GOAL-001
- Speaker: `RHEED`
- Beat: elipse — ação decisiva
- Intenção: tornar explícita a contribuição de Thorin
- Fatos obrigatórios: Thorin marcou o gol da virada
- Cópia exata: “No último avanço, Thorin encontrou a brecha e marcou o gol da virada.”
- Target Gab anchor: `MAP064_E9_RHEED`
- Perfis fonte: `Rheed.md`, `Thorin.md`

### DL-SEM-MATCH-RHEED-VICTORY-001
- Speaker: `RHEED`
- Beat: elipse — resultado
- Intenção: fechar a cadeia causal antes da limpeza
- Fatos obrigatórios: o time de Thorin venceu
- Cópia exata: “E assim, quando o apito final soou, os Machados Enferrujados tinham vencido a semifinal.”
- Target Gab anchor: `MAP064_E9_RHEED`
- Perfis fonte: `Rheed.md`

### DL-SEM-MATCH-CHILDREN-002
- Speaker: `CRIANCAS_CORETO`
- Beat: elipse — celebração infantil
- Intenção: confirmar recepção do resultado
- Fatos obrigatórios: nenhum fato novo exclusivo
- Cópia exata: “EU SABIA!”
- Target Gab anchor: `MAP064_CHILDREN_GROUP`
- Perfis fonte: `semifinal.dialogos.md#perfis-de-vozes-incidentais`, `Rheed.md`

### DL-SEM-CELEBRATION-TEAM-001
- Speaker: `TIME_MACHADOS`
- Beat: celebração coletiva
- Intenção: estabelecer pertencimento antes da interrupção
- Fatos obrigatórios: vitória coletiva; Thorin participa do grupo
- Cópia exata: “MACHADOS! MACHADOS! THORIN!”
- Target Gab anchor: `MAP062_TEAM_GROUP`
- Perfis fonte: `semifinal.dialogos.md#perfis-de-vozes-incidentais`, `Dragobur.md`

### DL-SEM-GIFT-DRAGOBUR-001
- Speaker: `DRAGOBUR`
- Beat: presente permanente durante a celebração
- Intenção: converter alívio e orgulho em um gesto sincero e cômico
- Fatos obrigatórios: Dragobur dá o capacete permanentemente; não há novo item
- Cópia exata: “Fica com o capacete, Thorin! Depois desse gol, se você pedir minhas botas eu penso por três segundos antes de dizer não!”
- Target Gab anchor: `MAP062_E2_DRAGOBUR`
- Perfis fonte: `Dragobur.md`, `Thorin.md`

### DL-SEM-GIFT-THORIN-001
- Speaker: `THORIN`
- Beat: recepção do presente
- Intenção: reconhecer afeto e desconforto físico sem quebrar a festa
- Fatos obrigatórios: Thorin aceita o presente
- Cópia exata: “Valeu, treinador. Vou guardar com carinho. E usar com pouca respiração.”
- Target Gab anchor: `MAP062_PLAYER`
- Perfis fonte: `Thorin.md`, `Dragobur.md`

### DL-SEM-GUARD-DRAGOBUR-001
- Speaker: `DRAGOBUR`
- Beat: reconhecimento dos guardas
- Intenção: registrar a perda de reciprocidade da festa
- Fatos obrigatórios: os guardas interrompem; o capacete não causou a entrada
- Cópia exata: “Ei! A comemoração ainda não acabou. Quem chamou a Guarda de Ferro?”
- Target Gab anchor: `MAP062_E2_DRAGOBUR`
- Perfis fonte: `Dragobur.md`

### DL-SEM-GUARD-FILENA-001
- Speaker: `FILENA`
- Beat: desconforto depois do reconhecimento coletivo
- Intenção: dar a Filena uma leitura própria, sem fazê-la explicar toda a autoridade
- Fatos obrigatórios: a presença militar não é neutra para ela
- Cópia exata: “Eles não vieram assistir ao placar. Thorin... fica perto da gente.”
- Target Gab anchor: `MAP062_FILENA`
- Perfis fonte: `Filena.md`, `Thorin.md`

### DL-SEM-ORDER-KILLIN-001
- Speaker: `KILLIN`
- Beat: ordem da Capitã
- Intenção: assumir o comando com firmeza protetora e não cruel
- Fatos obrigatórios: Killin é Capitã da Guarda de Ferro; fala por ordem do General Thordan; Thorin deve voltar para casa
- Cópia exata: “Thorin Forja-Prata. Sou Killin, Capitã da Guarda de Ferro. Por ordem direta do General Thordan, você volta para casa conosco. Agora.”
- Target Gab anchor: `MAP062_KILLIN`
- Perfis fonte: `Killin.md`, `Tordan.md`, `Thorin.md`

### DL-SEM-ORDER-MHORDRED-001
- Speaker: `MHORDRED`
- Beat: apoio à ordem
- Intenção: reforçar a inevitabilidade sem substituir o comando de Killin
- Fatos obrigatórios: Mhordred acompanha; Killin continua líder
- Cópia exata: “Você ouviu a Capitã. Poupe suas pernas e a minha paciência.”
- Target Gab anchor: `MAP062_MHORDRED`
- Perfis fonte: `Mhordred.md`, `Killin.md`

### BR-SEM-THORIN-GENTLE
- Speaker: `THORIN`
- Beat: escolha Gentle
- Intenção: cooperar no tom sem tornar a escolta voluntária
- Fatos obrigatórios: Thorin irá; permanece contrariado; destino não muda
- Cópia exata: “Eu vou. Mas deixem o time terminar de comemorar — eles merecem isso.”
- Target Gab anchor: `MAP062_PLAYER`
- Perfis fonte: `Thorin.md`, `Filena.md`

### DL-SEM-GENTLE-KILLIN-REACTION-001
- Speaker: `KILLIN`
- Beat: reação ao Gentle
- Intenção: reconhecer o autocontrole sem afrouxar a ordem
- Fatos obrigatórios: a escolta continua
- Cópia exata: “Então venha sem transformar uma ordem difícil em uma cena pior.”
- Target Gab anchor: `MAP062_KILLIN`
- Perfis fonte: `Killin.md`, `Thorin.md`

### BR-SEM-THORIN-RESIST
- Speaker: `THORIN`
- Beat: escolha Resist
- Intenção: expressar a rebeldia e a perda de autonomia
- Fatos obrigatórios: Thorin contesta o direito dos guardas; destino não muda
- Cópia exata: “Ele não manda arrancar minha vida de mim toda vez que assobia! Eu não vou fingir que isto é justo.”
- Target Gab anchor: `MAP062_PLAYER`
- Perfis fonte: `Thorin.md`, `Tordan.md`

### DL-SEM-RESIST-MHORDRED-REACTION-001
- Speaker: `MHORDRED`
- Beat: reação ao Resist
- Intenção: responder com força e preservar a liderança de Killin
- Fatos obrigatórios: resistência não abre outra rota
- Cópia exata: “Justo ou não, a ordem continua de pé. E nós também.”
- Target Gab anchor: `MAP062_MHORDRED`
- Perfis fonte: `Mhordred.md`, `Killin.md`

### DL-SEM-ESCORT-KILLIN-001
- Speaker: `KILLIN`
- Beat: convergência e compromisso da escolta
- Intenção: encerrar os branches em uma consequência comum
- Fatos obrigatórios: ambos os branches convergem; Thorin será levado à casa; Killin lidera
- Cópia exata: “Formação. Mhordred à retaguarda. Vamos levar Thorin até a Casa Forja-Prata.”
- Target Gab anchor: `MAP062_KILLIN`
- Perfis fonte: `Killin.md`, `Mhordred.md`, `Thorin.md`

### DL-SEM-ESCORT-FILENA-001
- Speaker: `FILENA`
- Beat: despedida antes da transferência
- Intenção: preservar vínculo e incômodo sem criar resgate ou branch
- Fatos obrigatórios: Filena não acompanha; Thorin será levado
- Cópia exata: “A gente termina a comemoração quando você voltar. Isso não acaba aqui.”
- Target Gab anchor: `MAP062_FILENA`
- Perfis fonte: `Filena.md`, `Thorin.md`

### DL-SEM-HOME-THORIN-001
- Speaker: `THORIN`
- Beat: chegada ao exterior da casa
- Intenção: marcar a passagem da vitória pública ao conflito familiar
- Fatos obrigatórios: Thorin chegou em casa; ainda está do lado de fora; o próximo confronto pertence a outra quest
- Cópia exata: “Da semifinal para a porta de casa. Meu pai realmente sabe estragar uma vitória sem nem aparecer.”
- Target Gab anchor: `MAP044_PLAYER`
- Perfis fonte: `Thorin.md`, `Tordan.md`

## Contratos de branch e consumo

- Os IDs 010 `BR-SEM-THORIN-GENTLE` e `BR-SEM-THORIN-RESIST` foram substituídos por `VN-SEM-CHOICE-GENTLE-011` e `VN-SEM-CHOICE-RESIST-011`; continuam exclusivos e não persistem escolha.
- Gentle volta a EX e converge sem batalha. Resist volta a EX, forma temporariamente Thorin+Filena, enfrenta Mhordred e só converge depois do resultado e cleanup.
- Derrota normal e vitória excepcional da batalha consomem a mesma saída `GAB-SEM-ESCORT-011`.
- A entrega do capacete muda propriedade narrativa, não quantidade de inventário.
- A cadeia da partida exige, nesta ordem semântica: `LOSING`, `ENTRY`, `GOAL`, `VICTORY`.
- As falas das crianças e do time apenas apoiam fatos já disponíveis em texto nomeado.

## Critérios humanos pendentes

- Verificar separadamente se Dragobur parece desesperado, afetuoso, tecnicamente competente e digno.
- Verificar se o humor “quinta-série”, a fala exata do gag e a piada do capacete funcionam sem estereotipar as jogadoras.
- Pedir relato livre dos quatro fatos da partida antes de qualquer pergunta dirigida.
- Observar se alegria, hostilidade de classe, presente, saída dos Martelos, entrada dos guardas, Filena, ordem e destino são compreendidos na sequência correta.
- Confirmar que Dragobur pediu um capacete velho comum, que Thorin pegou o elmo da estátua por conta própria e que a bronca/autorização preservam o humor aprovado.
- Comparar Gentle e Resist: Gentle não inicia combate; Resist leva Thorin e Filena à batalha real contra Mhordred; nenhuma rota torna a escolta evitável.
- Repetir sem áudio; todos os fatos essenciais devem permanecer compreensíveis pelo texto e staging.
- Nada nesta aprovação documental conta como playtest executado.

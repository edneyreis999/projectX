---
title: "Checkpoint Human in the Loop — análise técnica EX_Coreto e EX_Casa da Família Forjaprata"
type: decision-checkpoint
date: "2026-08-18"
status: "decisoes-parciais"
source_analysis: "analise-tecnica.md"
---

# Checkpoint Human in the Loop

## Objetivo

Este documento registra as decisões tomadas e os aprendizados obtidos na conversa de revisão humana da análise técnica dos mapas `EX_Coreto` e `EX_Casa da Familia Forjaprata`.

Ele não substitui a análise técnica original. Seu objetivo é registrar quais recomendações foram aceitas, reinterpretadas, delegadas ou colocadas fora de escopo antes da implementação.

## Princípios esclarecidos durante a conversa

### EX e VN não são separados simplesmente por controle do jogador

A interpretação inicial de que mapas `EX` nunca poderiam bloquear o jogador foi refinada.

A regra acordada é:

- Mapas `EX` podem conter cutscenes em que o jogador perde temporariamente o controle.
- Portanto, perda de controle não é, isoladamente, critério para transformar uma cena em `VN`.
- Falas ambientais e interações comuns de exploração não devem bloquear o jogador desnecessariamente.
- A narrativa crítica da quest deve acontecer em `VN`.
- Cutscenes de exploração podem continuar acontecendo no próprio mapa `EX` quando fizer sentido.
- Uma cena deve ser classificada principalmente pela sua função narrativa, e não apenas pelo fato de o jogador estar ou não controlando o personagem.

### Human in the Loop

O backlog da análise técnica não deve ser tratado automaticamente como autorização de implementação.

Os itens devem ser classificados, conforme necessário, em:

- implementar;
- investigar antes de implementar;
- fora de escopo;
- decisão delegada a uma especialidade.

## Decisões sobre P0

### P0-01 — Contrato `EX -> VN -> EX`

**Decisão: IMPLEMENTAR.**

A ideia de formalizar um fluxo consistente entre exploração e VN foi aceita.

O objetivo continua sendo garantir entradas e retornos previsíveis, idempotência e segurança em situações como retorno e save/load, sem transformar isso desnecessariamente em uma abstração maior do que o problema exige.

### P0-02 — Reentrada de E18 / Map022

**Decisão: IMPLEMENTAR.**

A reentrada indevida após a progressão de `V106` é considerada um bug funcional.

A implementação deve impedir que um contato posterior com E18 reabra ou tente reabrir a VN em um estado incompatível.

### P0-03 — Loops de Autorun em E11 / Casa Forjaprata

**Decisão: IMPLEMENTAR, começando pelo mapeamento dos estados.**

Foi aceita a necessidade de corrigir os Autoruns que podem voltar a ficar elegíveis após o retorno da VN.

Antes da alteração definitiva, a implementação deve identificar claramente:

- os estados de entrada;
- os estados de retorno da `Map049`;
- o estado terminal esperado;
- quais páginas de E11 devem permanecer inelegíveis depois de concluídas.

O objetivo é eliminar loops e repetições sem introduzir uma transição de estado incorreta.

### P0-04 — Conversa Tordan–Thorin de E8

**Decisão: FORA DE ESCOPO desta rodada.**

Foi reafirmada a regra geral de que cenas críticas da quest devem acontecer em `VN`.

Entretanto, a conversa específica de Tordan–Thorin presente nesse mapa não pertence à quest que está sendo trabalhada agora. Ela está relacionada a uma quest posterior.

Por isso:

- não migrar essa conversa neste pacote;
- não alterar seu fluxo agora;
- não usar esse conteúdo futuro para expandir artificialmente o escopo atual.

Isso não invalida a regra arquitetural sobre narrativa crítica em VN; apenas reconhece que essa cena pertence a outro contexto de quest e deve ser tratada quando esse contexto entrar em escopo.

### P0-05 — E36, retorno de E11 e `WaitForGab`

**Decisão: IMPLEMENTAR, com a interpretação refinada.**

Remover bloqueios desnecessários de falas ambientais em mapas `EX`, incluindo os casos identificados em E36 e no retorno de E11.

A decisão **não** significa proibir qualquer bloqueio ou cutscene em mapas `EX`.

Contrato resultante:

- fala ambiental comum em `EX` não deve prender o jogador;
- `WaitForGab` não deve ser usado para transformar chatter ambiental em uma sequência bloqueante;
- uma interação pode produzir feedback imediato sem necessariamente bloquear movimento;
- mapas `EX` podem possuir cutscenes legítimas;
- uma cutscene no `EX` pode temporariamente retirar o controle do jogador;
- cenas narrativas críticas da quest continuam pertencendo ao fluxo `VN`.

Portanto, a distinção relevante é semântica/narrativa, e não simplesmente “controle disponível = EX; controle bloqueado = VN”.

### P0-06 — BGM `Dungeon5`

**Decisão: IMPLEMENTAR, com decisão criativa delegada ao Audio Design.**

A referência de áudio deve ser corrigida caso o asset `Dungeon5` realmente esteja ausente ou inválido.

Não é necessário escalar ao usuário a escolha manual do substituto.

O agente/especialidade de **Audio Design** deve decidir qual áudio é apropriado para o contexto e implementar/propor o substituto coerente com a direção audiovisual do mapa.

A validação técnica ainda deve garantir que a transição `EX -> VN -> EX` não produza silêncio inesperado, reinício abrupto ou resíduos de áudio.

## Estado consolidado dos P0

| Item | Estado | Observação |
| --- | --- | --- |
| P0-01 | IMPLEMENTAR | Formalizar o contrato EX/VN sem overengineering. |
| P0-02 | IMPLEMENTAR | Corrigir reentrada de E18 após progressão de `V106`. |
| P0-03 | IMPLEMENTAR | Primeiro mapear estados de entrada, retorno e terminal. |
| P0-04 | FORA DE ESCOPO | Cena pertence a uma quest futura. |
| P0-05 | IMPLEMENTAR | Remover bloqueios ambientais; cutscenes em EX continuam permitidas. |
| P0-06 | IMPLEMENTAR | Audio Design escolhe o BGM apropriado. |

## Aprendizados da conversa

### 1. “EX não bloqueia” era uma regra ampla demais

A análise original foi útil ao identificar `WaitForGab` e bloqueios inadequados, mas transformar isso em uma proibição absoluta de perda de controle no `EX` eliminaria um recurso legítimo: cutscenes realizadas diretamente no mapa.

A regra precisa distinguir **fala ambiental bloqueante** de **cutscene intencional**.

### 2. VN é uma classificação narrativa, não apenas mecânica

O fato de o jogador perder o controle não basta para caracterizar uma VN.

A VN é principalmente o espaço destinado à narrativa crítica da quest. Uma cutscene curta e espacialmente integrada à exploração pode permanecer no `EX`.

### 3. Escopo da quest importa tanto quanto localização física

A conversa Tordan–Thorin está no mesmo mapa analisado, mas isso não significa que deva ser alterada nesta implementação.

Como pertence a uma quest posterior, mexer nela agora aumentaria o escopo e acoplaria esta rodada de trabalho a conteúdo futuro.

### 4. Nem toda decisão criativa precisa subir para aprovação humana

O caso do `Dungeon5` mostrou uma segunda forma útil de Human in the Loop: o usuário pode delegar explicitamente decisões para uma especialidade.

Nesse caso, Audio Design possui autonomia para selecionar a solução musical apropriada, enquanto a implementação continua sujeita aos critérios técnicos de integração e continuidade.

### 5. “Implementar” pode incluir uma investigação técnica inicial

No P0-03, mapear estados não significa que o item permanece indefinidamente em investigação.

A correção já foi aprovada. O levantamento dos estados de E11/Map049 é uma etapa necessária da própria implementação para evitar uma correção baseada em suposição.

## Próxima rodada

Os itens P0 foram discutidos e classificados.

A próxima sessão de Human in the Loop deve continuar a partir dos itens **P1 — Leitura, exploração e apresentação**, começando pelo `P1-01`.

Nenhuma decisão sobre os P1 foi tomada nesta conversa.

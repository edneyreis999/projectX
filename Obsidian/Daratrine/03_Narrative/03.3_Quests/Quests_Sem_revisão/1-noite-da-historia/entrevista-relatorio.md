# Relatório de Entrevista Técnica
## Quest: Noite da História

**Data:** 2026-02-24
**Contexto:** NSD Fluxo de Cenas + Análise Técnica
**Objetivo:** Esclarecer gaps técnicos de implementação
**Rodadas:** 4
**Perguntas respondidas:** 13

---

## 1. Abordagem Escolhida

### Método: Entrevista Estruturada por Rodadas (4 rodadas)

**Justificativa:**
A entrevista foi estruturada em 4 rodadas baseadas em dependência de implementação:
1. **Rodada 1 (Posicionamento)** - Pré-requisitos visuais críticos
2. **Rodada 2 (Sistemas)** - Mecânicas de gameplay
3. **Rodada 3 (Mídia)** - Recursos audiovisuais dependentes
4. **Rodada 4 (Conflitos)** - Validação final com existentes

Esta abordagem permitiu esclarecer todos os gaps técnicos críticos que bloqueiam a implementação imediata da quest, mantendo o foco em decisões que afetam o código e eventos do RPG Maker MZ.

---

## 2. Trechos do Contexto Esclarecidos

### 2.1 Documento: `noite-da-historia.NSD.fluxo-cenas.xml`

| Trecho Original | Linha | Status |
|-----------------|-------|--------|
| "Jogador aparece no canto inferior da tela" | 295 | ✅ Coordenadas definidas: (2, 22) |
| "Crianças vão cada uma para sua posição no centro da praça" | 328 | ✅ Usar página 2 dos eventos (já existe) |
| "Aparece brilho/marcador no chão indicando onde o jogador deve ir" | 365 | ✅ Coordenadas definidas: (12, 15) |
| "Câmera faz pan até a elfa Darla" | 304 | ✅ Posição de Darla: (15, 12) |
| "Crianças de fundo se mexem aleatoriamente até o 5º passo do jogador" | 319 | ✅ Implementado via variável global |
| "Rheed pergunta o nome do jogador, com sugestão pré-definida 'Dulgarin'" | 418 | ✅ Sistema Choice já existe |
| "Inicia-se o vídeo mostrando o mapa de Ekios" | 484 | ✅ Arquivo de vídeo já existe |
| "Rheed consome uma poção mágica" | 465 | ✅ Efeito visual apenas |
| "Transita para cutscene de jogo mostrando Thorin dormindo" | 520 | ✅ Fade-out/in já existe |

### 2.2 Documento: `noite-da-historia.tech.xml`

| Trecho Original | Linha | Status |
|-----------------|-------|--------|
| "Switch 33: Reed começa a falar" | 101 | ✅ Corrigir para "Rheed" |
| "Switches 43, 44, 48, 49, 50: uso desconhecido" | 107-136 | ✅ Servem para NSD_FORMAT - não usar nesta quest |
| "31 eventos no mapa" | 175 | ✅ Preservar todos, modificar se necessário |

---

## 3. Gaps e Ambiguidades Esclarecidos

### 3.1 Categoria: Posicionamento (Rodada 1)

| Gap # | Pergunta Original | Resolução | Impacto na Implementação |
|-------|-------------------|-----------|--------------------------|
| POS-01 | Qual a posição exata de spawn do jogador (X, Y)? | **(2, 22)** | Evento de spawn ou transferência |
| POS-02 | Quantas crianças existem e quais são as coordenadas finais? | Usar **página 2 dos eventos** (já existem) | Não modificar eventos de crianças |
| POS-03 | Onde exatamente fica o brilho/marcador (X, Y)? | **(12, 15)** | Evento de indicador visual |
| POS-04 | Qual a posição de Darla (X, Y)? | **(15, 12)** | Validação do pan da câmera |

### 3.2 Categoria: Sistemas de Interação (Rodada 2)

| Gap # | Pergunta Original | Resolução | Impacto na Implementação |
|-------|-------------------|-----------|--------------------------|
| SYS-01 | Como implementar o contador de 5 passos? | **Variável global** (ID a definir) | Criar evento paralelo para contar passos |
| SYS-02 | Qual sistema usar para input de nome? | **Sistema Choice já existe** (manter) | Não implementar Name Input Processing |
| SYS-03 | Como implementar o bloqueio de menu? | **Plugin VisuMZ_1_MainMenuCore** já implementa | Configurar plugin, não criar lógica |

### 3.3 Categoria: Mídia e Transições (Rodada 3)

| Gap # | Pergunta Original | Resolução | Impacto na Implementação |
|-------|-------------------|-----------|--------------------------|
| MID-01 | Qual formato do arquivo de vídeo? | **Arquivo já existe** - reaproveitar | Usar evento "Play Movie" com arquivo existente |
| MID-02 | A poção é um item real do jogo? | **Efeito visual apenas** | Usar animation ou picture, não item do banco de dados |
| MID-03 | Qual tipo de transição entre vídeo e cutscene de Thorin? | **Fade-out/in já existe** - manter | Usar "Fadeout Screen" + "Fadein Screen" |

### 3.4 Categoria: Conflitos e Riscos (Rodada 4)

| Gap # | Pergunta Original | Resolução | Impacto na Implementação |
|-------|-------------------|-----------|--------------------------|
| CON-01 | Qual a abordagem com os 31 eventos pré-existentes? | **Preservar todos**, modificar se necessário | Não deletar eventos, apenas ajustar |
| CON-02 | Como lidar com switches 43, 44, 48, 49, 50? | **Não usar nesta quest** - diálogos diretos do NSD | Remover referências a NSD_FORMAT/Common Event 16 |
| CON-03 | Como tratar discrepância "Reed" vs "Rheed"? | **Corrigir Switch 33** para "Rheed começa a falar" | Atualizar nome do switch no database |

---

## 4. Decisões Técnicas Confirmadas

### 4.1 Decisão Crítica: Diálogos

**DECISÃO:** Todos os diálogos desta quest serão **texto direto** nas caixas de mensagem, exatamente como está no documento NSD.

**Implicações:**
- O sistema **NSD_FORMAT** (Common Event 16) **NÃO será usado** para esta quest
- Switches 43, 44, 48, 49, 50 (controladores do NSD_FORMAT) devem ser ignorados
- Isso simplifica a implementação pois remove dependência de formatação complexa

### 4.2 Recursos Já Existentes

| Recurso | Status | Ação |
|---------|--------|------|
| Vídeo de Ekios | ✅ Já existe | Reutilizar arquivo |
| Transição Fade | ✅ Já existe | Manter implementação |
| Sistema de Choice (nome) | ✅ Já existe | Não modificar |
| Plugin VisuMZ_1_MainMenuCore | ✅ Já existe | Configurar para bloquear menu |
| Posições das crianças | ✅ Já existe | Usar página 2 dos eventos |

---

## 5. Gaps Remanescentes (Baixo Impacto)

| Gap | Status | Quando Definir |
|-----|--------|----------------|
| ID da variável para contador de passos | ⏳ Implementação | Qualquer ID disponível (não conflita com 1, 26, 29) |
| Texto exato das Choices de nome | ✅ Já existe | Manter implementação atual |
| Localização dos arquivos de mídia | 📄 Documentação | Documentar separadamente |

---

## 6. Próximos Passos Recomendados

1. **Implementação imediata:**
   - Corrigir Switch 33: "Reed" → "Rheed"
   - Configurar plugin VisuMZ_1_MainMenuCore para bloquear menu
   - Criar evento paralelo para contador de 5 passos (variável disponível)

2. **Validação:**
   - Verificar se vídeo de Ekios está na pasta correta (movies/)
   - Confirmar que posições (2,22), (12,15), (15,12) existem no mapa 005

3. **Documentação:**
   - Registrar qual variável foi usada para contador de passos
   - Documentar localização do arquivo de vídeo

---

## 7. Metadados da Entrevista

| Campo | Valor |
|-------|-------|
| Data | 2026-02-24 |
| Arquivos de contexto | 2 (NSD fluxo + Tech analysis) |
| Rodadas | 4 |
| Perguntas | 13 |
| Gaps resolvidos | 13 |
| Duração estimada | 10-15 min |
| Status da implementação | ✅ Pronta para iniciar |

---

**Fim do Relatório**

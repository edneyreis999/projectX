# Quest: Primeiro Contrato

## 1. Visão Geral

* **Título interno:** `primeiro-contrato`
* **Premissa resumida:** Thorin é coagido a assinar um contrato de aprendiz de minerador com Balastrus e, sob a supervisão de Tusk e três guardas imperiais, parte rumo à mina de Kravens.
* **Objetivo principal do jogador:** Formalizar o contrato e acompanhar o novo grupo até o início da expedição na mina.
* **Emoção-âncora:** Tensão inicial seguida de expectativa pela aventura.
* **Localizações centrais:** Taverna de Gildrat (Mapa 012), Estrada do Cão‑Luar (Mapa 017), Mapamundi (transição), Entrada da Mina de Kravens (próxima quest).
* **Personagens chave:** Thorin (protagonista), Balastrus (mentor pragmático), Tusk (líder da expedição), Kilin (guarda‑chefe), Mhordred (guarda), Tharok (guarda), Taverneiro.

## 2. Configuração Técnica Global

| Item              | Valor / Descrição                                         |
| ----------------- | --------------------------------------------------------- |
| Switches globais  | N/A                                                       |
| Variáveis globais | `V_Q_PrimContrato_Progress` (0‑4)                         |
| Plugins / Scripts | N/A (usar eventos padrão; mineração opcional via eventos) |
| Restrições gerais | Sem restrições de voz, tempo de fala ou idioma            |

## 3. Cenas da Quest

### Cena 1 — “Chamada + Assinatura” ✅

| Item                   | Detalhe                                                                                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resumo de Premissa** | Thorin recebe o recado do taverneiro, dirige‑se à mesa dos fundos e, pressionado por Balastrus, assina o contrato de aprendiz de minerador.                       |
| **Contexto Narrativo** | Interior → Taverna de Gildrat (Mapa 012) do balcão (Evento 003) à mesa dos fundos (Evento 002). Horário: início da noite; luz de velas; som ambiente de clientes. |
| **Personagens**        | Thorin (PC), Balastrus, Taverneiro.                                                                                                                               |
| **Objetivo Dramático** | Estabelecer a autoridade de Balastrus e prender Thorin a uma obrigação inescapável.                                                                               |
| **Interatividade**     | Escolha “Hesitar” ou “Assinar logo” altera apenas diálogos. Em ambos os casos Thorin assina.                                                                      |
| **Fluxo Cronológico**  | Falar com Taverneiro → recado → diálogo com Balastrus → assinatura (SFX pena) → fade curto → teleporte 025 para Estrada 017.                                      |
| **Gatilhos**           | `V_Q_PrimContrato_Progress = 0` (pré‑cena) → **Falar com Taverneiro** ➜ `= 1` → **Assinatura** ➜ `= 2`                                                            |
| **Assets**             | Retratos: Balastrus, Thorin; ícone pergaminho/pena; SFX: murmúrio de taverna, som de pena, campainha de balcão.                                                   |
| **Integração**         | Mapa 012, Evento 003 (Taverneiro), Evento 002 (Balastrus), Teleporte 025; variável `V_Q_PrimContrato_Progress`.                                                   |
| **Emoções‑chave**      | Curiosidade → Pressão → Resignação.                                                                                                                               |
| **Restrições**         | ≤ 45 s de diálogo; texto ≥ 5 s por balão.                                                                                                                         |

---

### Cena 2 — “Entrega a Tusk + Partida” ✅

| Item                   | Detalhe                                                                                                                                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Resumo de Premissa** | Thorin entrega o contrato a Tusk, recebe sua primeira **Picareta de Mineração**, ouve Balastrus discutir com os guardas sobre vigiar o garoto e parte com o grupo rumo ao Mapamundi e à mina de Kravens.                                                                             |
| **Contexto Narrativo** | Exterior → Estrada do Cão‑Luar (Mapa 017) próxima a uma tenda iluminada. Noite tranquila; rochas mineráveis próximas à estrada.                                                                                                                                                      |
| **Personagens**        | Thorin (PC), Tusk, Balastrus, Guardas: Kilin, Mhordred, Tharok.                                                                                                                                                                                                                      |
| **Objetivo Dramático** | Confirmar Thorin como aprendiz, introduzir a mecânica opcional de mineração e preparar o grupo para a expedição.                                                                                                                                                                     |
| **Interatividade**     | • Entrega ➜ contrato removido, item **Picareta (I\_001)** adicionado.<br>• Cutscene na tenda (Balastrus × Guardas).<br>• Exploração opcional: rochas mineráveis (`EvtIDs 104‑106`) rendem loot se o jogador tiver a picareta.<br>• Partida segue Tusk até a borda leste (Mapamundi). |
| **Fluxo Cronológico**  | Chegada via Teleporte 025 → entrega & picareta → cutscene tenda → exploração livre → conversa final ou borda leste → transição para Mapamundi → seguir Tusk até evento de entrada da Mina.                                                                                           |
| **Gatilhos**           | `V_Q_PrimContrato_Progress = 2` (entrada) → **Entrega** ➜ `= 3` → **Saída Estrada 017** ➜ `= 4` (quest concluída).                                                                                                                                                                   |
| **Assets**             | Retratos: Tusk, Balastrus, Kilin, Mhordred, Tharok; ícone picareta; Rochas Mineráveis; SFX fogueira, passos em cascalho, clang de mineração.                                                                                                                                         |
| **Integração**         | Mapa 017, Evento 001 (Tusk), Evento 002 (Tenda/Balastrus), Evts 003‑005 (Guardas), Evts 104‑106 (Rochas mineráveis); variável `V_Q_PrimContrato_Progress`; item **Picareta** concedido.                                                                                              |
| **Emoções‑chave**      | Alívio → Desconfiança → Expectativa.                                                                                                                                                                                                                                                 |
| **Restrições**         | ≤ 40 s de diálogo; cutscene ≤ 15 s; mineração opcional, não mencionada em falas.                                                                                                                                                                                                     |

## 4. Pendências & Riscos

| ❓ Pendência                                      | Impacto | Próximo passo                           |
| ------------------------------------------------ | ------- | --------------------------------------- |
| IDs exatos de eventos para Tusk, tenda e guardas | Baixo   | Definir ao implementar map 017          |
| Loot table das Rochas Mineráveis                 | Médio   | Designer balancear recompensas iniciais |
| ID do Mapamundi e trigger de entrada da Mina     | Médio   | Confirmar layout do overworld           |

## 5. Histórico de Revisões

| Versão | Data       | Autor          | Mudança           |
| ------ | ---------- | -------------- | ----------------- |
| 0.1    | 2025‑06‑14 | Curiosão (GPT) | Documento inicial |

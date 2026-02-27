# Narrative Structure Document (NSD) - Recrutar Civis

## Quest: Recrutar Civis - V Força Civil

### 1 Resumo Geral (Checkpoint 0)

- [ ] Em andamento
- Nome da quest: Recrutar Civis do Distrito Comercial
- Importancia na campanha: amplia a força civil e mostra que a cidade toda está disposta a defender Gildrat
- Arco narrativo: motivação comunitária, solidariedade e liderança pública de Thorin
- Objetivo narrativo global: convencer cinco civis a se juntarem à defesa ativa e reforçar o discurso de união
- Premissa resumida: Filena identifica civis-chave no distrito comercial e pede que Thorin os escute, resolva dúvidas e ofereça proteção concreta.

- Locais principais
  - Distrito Comercial
  - Campo de Treinamento (relatório final)
- NPCs principais
  - Thorin
  - Filena
  - Civis variados (vendedores, ferreiros, cozinheiros, escribas)

### 2 Pré-condições Narrativas (Checkpoint 1)

| Tipo | Descrição |
| --- | --- |
| Flags / Decisões anteriores | Abertura da rede de rebeldes e apoio comunitário (quests anteriores com Borin e rebeldes). |
| Limitações ou bloqueios | Precisa falar com Filena e conseguir tempo para conversar no Distrito; nem todos aceitam convite imediato. |

### 3 Fluxo Visual Resumido (Checkpoint 2)

- [ ] Em andamento

```plaintext
Quest: Recrutar Civis - V Força Civil
 +-- Cena 1: Campo de Treinamento - Filena define a meta e entrega os nomes dos civis.
        +-- Beat 1: Thorin recebe a lista e a motivação de Filena.
 +-- Cena 2: Distrito Comercial (encontros individuais)
        +-- Beat 1: Conversa com o vendedor de metais, que teme perder clientes.
        +-- Beat 2: Conversa com a cozinheira, que quer garantir comida para os defensores.
        +-- Beat 3: Conversa com o ferreiro, que quer proteger a oficina.
        +-- Beat 4: Conversa com o escriba, que busca registros da luta.
        +-- Beat 5: Conversa com o mercador do porto, que questiona a segurança das rotas.
 +-- Cena 3: Relatório com Filena
 |      +-- Beat 1: Thorin explica que conseguiu cinco civis comprometidos e detalha o apoio que eles podem dar.
 |      +-- Beat 2: Filena ativa a flag `v_forca_civil` e celebra a ampliação da força.
```

#### Tabela de Cenas

| # | Nome da Cena | Premissa resumida (expandida) |
| --- | --- | --- |
| 1 | **Briefing de Filena** | Filena sinaliza a urgência de reforçar as defesas com civis confiáveis. |
| 2 | **Diálogos no Distrito** | Thorin precisa ouvir cinco civis diferentes, entender medos e respostas e oferecer segurança. |
| 3 | **Retorno ao Campo** | Filena recebe o relatório e marca o sucesso da missão junto ao flag. |

#### Beats por Cena

##### Cena 1 - Briefing de Filena

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **1-A - Lista de Civis** | Filena entrega a lista e explica o impacto da adesão de cada pessoa. | CS |
| **1-B - Escolhas de abordagem** | Jogador escolhe foco entre proteção passiva, logística ou comunicação. | CHOICE |

##### Cena 2 - Diálogos no Distrito

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **2-A - Vendedor de Metais** | Thorin garante segurança na cadeia de suprimentos. | CS |
| **2-B - Cozinheira** | Discute alimento para tropas; Thorin promete transporte seguro. | CS |
| **2-C - Ferreiro** | Mostra como armas e armaduras podem ter prioridade; Thorin garante apoio. | CS |
| **2-D - Escriba** | Promete que a história será registrada e sua família protegida. | CS |
| **2-E - Mercador do Porto** | Argumenta que rotas precisam de escolta; Thorin organiza patrulhas. | CS |

##### Cena 3 - Retorno ao Campo

| Beat | Premissa Resumida | Tipo |
| ---- | ---------------- | ---- |
| **3-A - Reporte a Filena** | Thorin detalha cada conversa e registra novas promessas. | CS |
| **3-B - Flag ativada** | `v_forca_civil` soma +20 pontos e aponta reforços nos mapas. | CS |

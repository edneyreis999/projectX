# Fluxo sigmetal

```mermaid
flowchart TD
%% =====================================================
%% Fluxo de Decisão do Item "Sigmetal" (Mermaid robusto)
%% =====================================================

%% ---- Estilos aproximando as cores do .puml ----
classDef green fill:#90EE90,stroke:#555,color:#000;
classDef coral fill:#F08080,stroke:#555,color:#000;
classDef blue fill:#ADD8E6,stroke:#555,color:#000;
classDef yellow fill:#FFFACD,stroke:#555,color:#000;

%% ---- Nós de início/fim ----
START((Start))
END((Stop))

%% =====================================================
%% Partição: Mina de Kravens (Final da Quest "Minerador Aprendiz")
%% =====================================================
subgraph KRAVENS["Mina de Kravens (Final da Quest 'Minerador Aprendiz')"]
    A1["Derrotar o boss Cristaleão"]
    A2["Obter o minério 'Sigmetal'"]:::green

    %% Nota: O jogador agora possui o item de quest.

    A3{"Jogador entrega o Sigmetal<br>para Tusk?"}

    A4["Entregar Sigmetal para Tusk"]
    %% Flags (puml note):
    %%  PLAYER_HAS_SIGMETAL=false; TUSK_CREDIT=true

    A5["Esconder o Sigmetal e<br>entregar 10 Kravens"]
    %% Flags (puml note):
    %%  PLAYER_HAS_SIGMETAL=true; TUSK_CREDIT=false

    A1 --> A2
    A2 --> A3
    A3 -- "Sim" --> A4
    A3 -- "Não" --> A5
end

%% Se entregou na mina, vai direto para a cena de crédito do Tusk
A4 --> C1

%% Se escondeu, prossegue (viagem/combates etc.)
A5 --> B1

%% =====================================================
%% Partição: Estrada do Cão Luar (Quest "A Travessia Perigosa")
%% =====================================================
subgraph ESTRADA["Estrada do Cão Luar (Quest 'A Travessia Perigosa')"]
    B1{"O jogador ainda<br>possui o Sigmetal?"}

    %% --- Ramo SIM: múltiplas decisões ---
    B2{"Escolhe entregar<br>para Tusk?"}
    B3["Entregar Sigmetal para Tusk"]

    B4["Entregar Sigmetal<br>para Balastros"]:::blue
    B5["Balastros analisa o item<br>em silêncio"]
    B6["Balastros age com mistério"]
    %% Flags:
    %%  PLAYER_HAS_SIGMETAL=false; BALASTROS_KNOWS=true

    B7["Colocar Sigmetal no Balaio<br>junto com outros minérios"]
    B8["Balastros faz comentário enigmático<br>(item perdido)"]:::yellow
    %% Flags:
    %%  PLAYER_HAS_SIGMETAL=false; SIGMETAL_LOST_TO_CHEST=true

    B9["Manter o Sigmetal escondido"]
    B10["Balastros faz comentário sobre<br>o bolso do Thorin"]:::yellow
    %% Flags:
    %%  PLAYER_HAS_SIGMETAL=true

    %% --- Ramo NÃO: já entregou antes, observa a consequência ---
    B1 -- "Não / Já entregou na mina" --> C1

    %% Encadeamentos do ramo SIM
    B1 -- "Sim" --> B2
    B2 -- "Sim" --> B3
    B2 -- "Não, entregar para Balastros?" --> B4
    B2 -- "Não, colocar no Balaio?" --> B7
    B2 -- "Não entregar a ninguém" --> B9

    %% Desdobramentos dos caminhos alternativos
    B3 --> C1
    B4 --> B5
    B5 --> B6
    B6 --> END
    B7 --> B8
    B8 --> END
    B9 --> B10
    B10 --> END
end

%% =====================================================
%% Cena comum: Tusk toma o crédito (label TuskTakesCredit)
%% =====================================================
C1["Tusk se gaba para Balastros"]:::coral
C2["Thorin reage à mentira"]

C1 --> C2
C2 --> END
```

Para concluir a migração da quest A Semifinal, faltam quatro mapas EX obrigatórios e, seguindo a separação narrativa
  atual, um mapa VN recomendado.

   Legado atual                     Novo mapa sugerido            Cenas
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   [008] Distrito Comercial         EX_Distrito_Comercial         Cena 3
  ───────────────────────────────  ────────────────────────────  ────────────────────────────────────────
   [014] Estádio                    EX_Estadio                    Cenas 4, 6 e parte da 7
  ───────────────────────────────  ────────────────────────────  ────────────────────────────────────────
   [010] Vestiário                  EX_Vestiario                  Cena 5
  ───────────────────────────────  ────────────────────────────  ────────────────────────────────────────
   [009] Campo de Futebol Rúnico    EX_Campo_de_Futebol_Runico    Tutorial, partida e comemoração física

  Para VN, recomendo criar:

  - VN_Estadio, com entradas distintas para:
      - BRONCA_DRAGOBUR;
      - LENDA_DO_CAPACETE;
      - ORDEM_DOS_GUARDAS.

  Isso mantém no EX a navegação, o movimento dos personagens, a partida, a torcida e a escolta; e leva para VN os
  diálogos narrativos, busts e a escolha Gentil/Resistir. É consistente com a regra existente de que staging físico
  permanece em EX, enquanto diálogos, escolhas e transições narrativas ficam em VN — documentada em docs/domains/
  scene-presentation-designer/README.md:56.

  Não vejo necessidade de criar VN_Distrito_Comercial, VN_Vestiario ou VN_Campo_de_Futebol_Runico: vendedor, bloqueio,
  gag e feedback do capacete podem continuar como Gabs/cutscenes curtas nos mapas EX. O padrão permite cutscenes em
  EX; apenas a narrativa crítica precisa ir para VN.

  A rota resultante ficaria:

  045 EX_Casa_Forjaprata
    → 044 EX_Distrito_Residencial_Nobre
    → novo EX_Distrito_Comercial
    → novo EX_Estadio
        ↔ novo EX_Vestiario
        ↔ novo EX_Campo_de_Futebol_Runico
        ↔ novo VN_Estadio
    → 044 EX_Distrito_Residencial_Nobre

  Pontos de integração que ainda comprovadamente usam mapas legados:

  - Map044 E18 transfere para [008] Distrito Comercial;
  - [008] transfere para [014] Estádio;
  - [014] transfere para [010] Vestiário e [009] Campo;
  - o encerramento de [014] transfere de volta para o antigo [007] Distrito Residencial, em vez do [044].

  Também devem ser auditadas as saídas opcionais do Distrito Comercial para [012] Taverna, [013] Loja de Armaduras e
  [052] Casa Filena. Esses mapas não precisam necessariamente ser migrados para terminar o NSD, mas seus retornos não
  podem jogar o jogador de volta no [008] legado.

  O próprio NSD confirma que somente as cenas 1 e 2 têm mapas novos definidos; as cenas 3–7 ainda não possuem
  atribuição de mapa em docs/Quests/2-semifinal/semifinal.NSD.fluxo-cenas.md:113. Portanto, o escopo mínimo é: 4 novos
  EX + 1 VN compartilhado. Esta conclusão é estrutural; não houve alteração de arquivos nem Playtest.
# Ecossistema de Inimigos — Ekios (Região de Gildrat)

**Autor**: Claude Code (Game Designer Sênior IA)
**Data de Criação**: 2026-01-07
**Versão**: 1.0
**Status**: Aprovado
**Jogo**: Daratrine: A Origem

---

## Resumo Executivo

Este documento define o ecossistema completo de inimigos do continente gelado **Ekios**, focado na região de **Gildrat**, no período de **200 anos após a fundação do império anão** e **ANTES da quebra do selo de Melios**.

**Contexto do Jogo**:
- **3 dungeons principais**: Kravens (mineração), Esgoto de Gildrat (tóxico), Melios (sagrada)
- **World map**: Encontros aleatórios na Estrada do Cão-Luar e cordilheira
- **Progressão**: Níveis 1-12 (Early 1-5, Mid 5-8, Late 8-12)
- **Loot**: Moeda única **Ludos** (sem sistema de crafting complexo)
- **Estilo visual**: Bestiário medieval em sépia monocromático, hachuras, alto contraste

**Ênfase**: 70% subterrâneo (minas/cavernas), 30% superfície (cordilheira gelada)

---

## 1. Visão Geral do Continente (Recorte Temporal)

### 1.1. Período Histórico

**Recorte Temporal**: Aproximadamente 4000 anos após a fundação de Gildrat, **ANTES** da quebra do selo de Melios (Cena 10 da timeline).

**Duração do Período de Paz**: ~3500-4000 anos de estabilidade relativa.

**Eventos Relevantes** (contexto narrativo):
- Consolidação do império anão de Gildrat (70.000 habitantes)
- Estabelecimento da Guarda de Ferro como força militar dominante
- Expedições regulares de mineração a Kravens e minas secundárias
- **Melios permanece respeitada** como mina sagrada/proibida (alertas culturais sobre não profanar o local)
- Comércio limitado com goblins (Metsa). trolls e rarissimos elfos no Distrito Externo de Gildrat

### 1.2. Geografia e Clima

**Localização**: Cordilheira gelada no norte de Ekios.

**Clima Dominante**:
- **Topos/cristas** (altitude >3000m): gelado, ventos fortes, neve perpétua
- **Encostas** (1000-3000m): frio a temperado, bosques de pinheiros
- **Vales/Gildrat** (0-1000m): temperado (aquecido por forjas anãs)
- **Subterrâneo** (minas/cavernas): temperado a frio; umidade variável

**Características Geológicas**: Montanhas rochosas, cavernas extensas, geleiras, fendas profundas.

### 1.3. População e Cultura

**Raças Dominantes**: Anões de Gildrat (70.000 habitantes no apogeu).

**Estrutura Social**: Sistema de castas rígido (nobreza, comerciantes, trabalhadores, desprivilegiados).

**Economia Principal**: Mineração e metalurgia; expedições de mineração são eventos cívicos celebrados.

**Força Militar**: **Guarda de Ferro** — exército elite anão; patrulhas regulares na cordilheira e escoltas de expedições.

---

## 2. Biomas, Dungeons e Pontos de Calor de Gameplay

### 2.1. Distribuição: 70% Subterrâneo, 30% Superfície

**Subterrâneo (70% do conteúdo)**:
- Mina de Kravens (ativa)
- Esgoto de Gildrat (infraestrutura urbana)
- Mina de Melios (sagrada, late game)
- Minas abandonadas (world map, transversal)

**Superfície (30% do conteúdo)**:
- Cordilheira Gelada (Estrada do Cão-Luar, passagens de montanha)
- Encostas (bosques de pinheiros, rios congelados)
- Vales (entorno de Gildrat, áreas seguras)

### 2.2. Dungeon 1 — Mina de Kravens (Early Game, Níveis 1-5)

**Localização**: Serra ao norte de Gildrat, acessível pela Estrada do Cão-Luar.

**Tema**: Mina ativa de exploração de minério Kraven; área de treinamento de mineradores.

**Bioma**: Túneis rochosos escavados, iluminação por cristais luminescentes e tochas; temperatura temperada (forjas de fundição).

**Estrutura**:
- **Túneis Ativos** (entrada/níveis superiores): área de trabalho regular dos anões; criaturas são "pragas" conhecidas
- **Andar Esquecido** (após queda de Thorin, Cena 6d): nível inferior selado há décadas; criaturas maiores/mais perigosas

**Inimigos**:

| Nome | Nível | Tipo | Comportamento | Localização |
|------|-------|------|---------------|-------------|
| **Morcego de Caverna** | 1-2 | Fauna (Fodder) | Voa em grupos de 3-5; ataque rápido mas fraco; foge se 50% do grupo morrer | Túneis Ativos |
| **Aranha Mineira** | 2-3 | Fauna (Fodder/Mid) | Tece teias (slow); veneno fraco; emboscada em tetos; patrulha em duplas | Túneis Ativos |
| **Aranha Gigante** | 3-4 | Fauna (Mid-tier) | Teia maior (imobiliza 2 turnos); veneno médio; patrulha em duplas ou trios | Andar Esquecido |
| **Rato Gigante Mutante** | 3-4 | Fauna (Mid-tier) | Roedor agressivo; ataque em bando (4-6); variação rara "Rato Alfa" (elite menor) | Andar Esquecido |
| **Cristaleão** | 5 | Boss (Criatura de cristal) | Ver seção de bosses | Andar Esquecido (câmara final) |

**Perigos Ambientais**:
- **Colapso pontual** (evento scriptado em área específica)

**Recompensas Narrativas**:
- **Sigmetal** (minério raro) dropado pelo Cristaleão (Cena 6e)
- Liberação de acesso ao 10º Kraven para completar contrato

### 2.3. Dungeon 2 — Esgoto de Gildrat (Mid Game, Níveis 5-8)

**Localização**: Sistema de drenagem subterrâneo de Gildrat, acessível por entrada na nevasca (Cena 7b.1).

**Tema**: Infraestrutura urbana degradada; ambiente tóxico e claustrofóbico; travessia forçada para escapar da tempestade.

**Bioma**: Túneis de pedra com água corrente (esgoto), câmaras de decantação, umidade alta, odor pútrido, iluminação escassa (tochas do grupo).

**Estrutura**:
- **Túneis Superiores**: esgotos ativos; água corrente; criaturas oportunistas
- **Câmara de Decantação** (nível inferior): câmara anóxica (baixo oxigênio); fungos gigantes; boss fight

**Inimigos**:

| Nome | Nível | Tipo | Comportamento | Localização |
|------|-------|------|---------------|-------------|
| **Rato de Esgoto** | 5-6 | Fauna (Fodder) | Ataque em enxames de 4-6; carrega doenças (debuff: -10% defesa, 3 turnos) | Túneis Superiores |
| **Limo Ácido** | 6 | Criatura Tóxica (Mid) | Gelatinoso; ataque corpo a corpo dissolve armadura (debuff: -15% defesa física, 5 turnos); lento (velocidade -30%) mas resistente (HP alto) | Túneis Superiores e Câmara |
| **Fungo Venenoso Gigante** | 7 | Criatura Tóxica (Elite) | Imóvel; lança esporos (AOE, raio 3m, veneno); precisa destruir "cabeça" (parte específica) para matar | Câmara de Decantação |
| **Gosma Tóxica** | 7 | Criatura Tóxica (Mid) | Variação maior do Limo; divide-se em 2 limos menores ao ser atacado com AOE; cuidado com magias de área | Câmara de Decantação |
| **Pestesporo** | 8 | Boss (Fungo colossal) | Ver seção de bosses | Câmara de Decantação (final) |

**Perigos Ambientais**:
- **Água tóxica** (dano leve contínuo se entrar; áreas claramente marcadas por cor esverdeada)
- **Vapor venenoso** (efeito visual; dano leve contínuo se entrar; dissipa em área aberta)

**Recompensas Narrativas**:
- **Liberação de passagem** para superfície (saída do esgoto)
- Retorno à Estrada do Cão-Luar (Cena 7b.3)

### 2.4. Dungeon 3 — Mina de Melios (Late Game, Níveis 8-12)

**Localização**: Mina sagrada ao norte de Gildrat, além de Kravens; acessível após obter mandato do Conselho (Cena 8).

**Tema**: Mina proibida por tradição; selos ancestrais; energia estranha (foreshadowing da quebra futura); guardiões construtos.

**Bioma**: Túneis antigos de pedra lavrada (pré-Gildrat?); runas gravadas nas paredes; cristais emitem brilho azulado instável; temperatura fria; atmosfera opressiva.

**Estrutura**:
- **Corredores/Entrada**: patrulhas de guardiões construtos; elementais de pedra
- **Câmara do Selo** (profunda): selo de ferro com runas; energia instável (foreshadowing); boss fight

**Inimigos**:

| Nome | Nível | Tipo | Comportamento | Localização |
|------|-------|------|---------------|-------------|
| **Guardião Menor de Pedra** | 8-9 | Construto (Elite) | Construto lento mas resistente (redução de dano físico 30%); ataque pesado; patrulha rígida em duplas; não foge | Corredores |
| **Elemental de Terra** | 9-10 | Criatura Mágica (Elite) | Criatura mágica; ataca com rochas projetadas (dano à distância); resistente a físico (redução 40%); fraco contra magia | Corredores e Câmara |
| **Guardião Ancião** | 10-11 | Construto (Elite/Sub-boss) | Construto maior; mecânica: armadura de pedra (precisa quebrar com 3 ataques pesados); ataques em área (cone frontal) | Câmara do Selo (entrada) |
| **Sombra Errante** | 11 | Criatura Mágica Espectral (Elite) | Criatura espectral; causa medo (debuff: -20% ataque, 4 turnos); ataque intangível (ignora armadura física); foreshadowing da energia selada | Câmara do Selo (perto do selo) |
| **[Boss de Melios - A Definir]** | 12 | Boss | Opções: (1) Guardião Colossal de Pedra OU (2) Manifestação da Energia Selada (sem revelar Ignotos diretamente) | Câmara do Selo (final, após quebra do selo narrativa) |

**Perigos Ambientais**:
- **Energia instável** (distorções visuais perto do selo; brilho azulado pulsante; som de zumbido grave; **sem dano mecânico**, apenas atmosfera)
- **Colapsos pontuais** (após quebra do selo na Cena 10b; jogador pode fugir facilmente)

**Recompensas Narrativas**:
- **Acesso a minérios raros** (salão após o selo; narrativa de riqueza efêmera antes da invasão dos Ignotos)

### 2.5. World Map — Encontros Aleatórios (Superfície)

**Estrada do Cão-Luar / Cordilheira Gelada**:
- Rota principal entre Gildrat e Kravens
- Clima: neve leve a tempestades ocasionais
- Patrulhas da Guarda de Ferro (neutras/aliadas)

**Minas Abandonadas** (transversal):
- Espalhadas pela cordilheira
- Refúgios de bandidos e goblins renegados

**Inimigos do World Map**:

| Nome | Nível | Tipo | Comportamento | Localização |
|------|-------|------|---------------|-------------|
| **Lobo de Gelo** | 4-6 | Predador (Mid-tier) | Matilha de 3-4; cooperação tática (foca alvo mais fraco); foge se líder morrer ou 50% da matilha cair | Estrada, Cordilheira |
| **Lobo Alpha de Gelo** | 7-8 | Predador (Elite) | Líder de matilha; aura gélida (debuff em área: -10% velocidade aliados, raio 5m); buffa lobos comuns (+20% ataque); cristais de gelo nas costas (fantasia vibrante) | Cordilheira (raro) |
| **Urso Colossal** | 8-9 | Predador (Elite, raro) | Urso gigante com pedra/cristais nas costas (fantasia vibrante); territorial; alto HP; ataque pesado (investida); não foge | Encostas, Cordilheira |
| **Bandido Anão Renegado** | 5-7 | Humanoide Hostil (Mid/Elite) | Exilados de Gildrat (reflexo do lado obscuro do sistema de castas); usam armadura/armas anãs; cooperam em grupos de 4-6; chamam reforços se HP <50%; fogem se isolados | Minas Abandonadas |
| **Goblin Saqueador** | 4-5 | Humanoide Hostil (Mid) | Renegados de Metsa (conecta com lore existente); arqueiros; fogem de corpo a corpo; emboscadas em terreno elevado | Encostas, Minas Abandonadas |

**Perigos Ambientais (World Map)**:
- **Tempestade de neve** (efeito visual; reduz visibilidade -70%; não causa dano; aumenta chance de encontro em 20%)
- **Avalanche** (evento raro/narrativo em passagens; jogador pode fugir com QTE simples)

---

## 3. Catálogo Completo de Inimigos por Família

### 3.1. Fauna de Caverna (Kravens, Minas Abandonadas)

**Características Gerais**: Criaturas naturais adaptadas à escuridão; comportamento animal (patrulha, emboscada, fuga); não cooperam com outras famílias.

| Nome | Nível | HP | Ataque | Defesa | Habilidades | Loot (Ludos) |
|------|-------|----|----|--------|-------------|--------------|
| Morcego de Caverna | 1-2 | 15-20 | 8-10 | 5-7 | Voo rápido, ataque em grupo | 2-5 |
| Aranha Mineira | 2-3 | 25-30 | 10-12 | 8-10 | Teia (slow 2 turnos), veneno fraco (-5 HP/turno, 3 turnos) | 3-7 |
| Aranha Gigante | 3-4 | 40-50 | 14-16 | 10-12 | Teia maior (imobiliza 2 turnos), veneno médio (-10 HP/turno, 3 turnos) | 8-12 |
| Rato Gigante Mutante | 3-4 | 35-45 | 12-14 | 8-10 | Ataque em bando (+20% ataque se 3+ ratos), mordida infecciosa | 5-10 |

**IA e Comportamentos**:
- **Patrulha**: movem-se em padrões circulares/lineares dentro de áreas específicas
- **Emboscada**: aranhas aguardam em tetos; morcegos atacam ao detectar movimento
- **Fuga**: fogem se 50% do grupo morrer (morcegos) ou se HP <25% (aranhas/ratos)
- **Cooperação**: atacam em grupo mas não usam táticas complexas

### 3.2. Criaturas Tóxicas (Esgoto de Gildrat)

**Características Gerais**: Organismos adaptados a ambientes contaminados; ataques causam debuffs (veneno, dissolução de armadura); lentos mas resistentes.

| Nome | Nível | HP | Ataque | Defesa | Habilidades | Loot (Ludos) |
|------|-------|----|----|--------|-------------|--------------|
| Rato de Esgoto | 5-6 | 30-40 | 12-14 | 8-10 | Doença (debuff: -10% defesa, 3 turnos), ataque em enxame | 5-8 |
| Limo Ácido | 6 | 60-70 | 10-12 | 15-18 | Dissolve armadura (debuff: -15% def. física, 5 turnos), resistente a físico | 10-15 |
| Fungo Venenoso Gigante | 7 | 80-90 | 15-18 | 12-15 | Esporos AOE (raio 3m, veneno -15 HP/turno, 4 turnos), imóvel, precisa quebrar cabeça | 15-20 |
| Gosma Tóxica | 7 | 70-80 | 13-16 | 16-19 | Divisão ao ser atingido por AOE (cria 2 limos menores 30% HP cada), ácido contínuo | 12-18 |

**IA e Comportamentos**:
- **Territorial/Estático**: fungos não se movem; limos patrulham áreas pequenas
- **Não fogem**: lutam até a morte
- **Divisão** (Gosma Tóxica): mecânica especial; evitar magias AOE prematuramente

### 3.3. Construtos e Guardiões (Melios, Ruínas Antigas)

**Características Gerais**: Criaturas mágicas artificiais; patrulha rígida; resistentes a físico; não fogem; protegem áreas/objetos específicos.

| Nome | Nível | HP | Ataque | Defesa | Habilidades | Loot (Ludos) |
|------|-------|----|----|--------|-------------|--------------|
| Guardião Menor de Pedra | 8-9 | 100-120 | 18-20 | 20-22 (red. dano físico 30%) | Ataque pesado (knockback), patrulha rígida | 20-30 |
| Elemental de Terra | 9-10 | 90-110 | 16-18 | 22-25 (red. físico 40%, fraco vs magia) | Rochas projetadas (dano à distância), resistência elemental | 25-35 |
| Guardião Ancião | 10-11 | 150-180 | 22-25 | 25-28 | Armadura de pedra (precisa quebrar 3x), ataque em cone frontal | 40-50 |
| Sombra Errante | 11 | 80-100 | 20-23 | 15-18 (intangível, ignora armadura) | Causa medo (debuff: -20% ataque, 4 turnos), ataque espectral | 30-40 |

**IA e Comportamentos**:
- **Patrulha rígida**: seguem rotas fixas; retornam a posição inicial se perder aggro
- **Não fogem**: lutam até destruição completa
- **Resistências específicas**: construtos resistem a físico; elementais fracos contra magia
- **Guardiões de área**: não perseguem além de zona definida

### 3.4. Predadores de Superfície (World Map, Cordilheira)

**Características Gerais**: Fauna gelada com variações mágicas (fantasia vibrante); cooperação em matilhas; Alphas buffam aliados.

| Nome | Nível | HP | Ataque | Defesa | Habilidades | Loot (Ludos) |
|------|-------|----|----|--------|-------------|--------------|
| Lobo de Gelo | 4-6 | 45-55 | 14-16 | 12-14 | Cooperação em matilha (+15% ataque se 3+ lobos), mordida gélida | 8-12 |
| Lobo Alpha de Gelo | 7-8 | 90-110 | 20-22 | 16-18 | Aura gélida (debuff área: -10% velocidade, raio 5m), buffa lobos (+20% ataque), cristais de gelo | 30-40 (+ item narrativo raro) |
| Urso Colossal | 8-9 | 140-160 | 24-26 | 18-20 | Investida (knockback + stun 1 turno), territorial, pedra/cristais nas costas | 35-45 (+ item narrativo) |

**IA e Comportamentos**:
- **Cooperação tática**: lobos focam alvo mais fraco; Alphas ficam atrás da matilha
- **Fuga condicional**: matilha foge se Alpha morrer OU se 50% dos lobos caírem
- **Territorial** (Urso): não persegue além de área (raio 50m); ataca se provocado

### 3.5. Humanoides Hostis (Transversal)

**Características Gerais**: Bandidos anões (exilados, reflexo da decadência de Gildrat) e goblins renegados (conexão com Metsa); táticos; usam cobertura; chamam reforços.

| Nome | Nível | HP | Ataque | Defesa | Habilidades | Loot (Ludos) |
|------|-------|----|----|--------|-------------|--------------|
| Goblin Saqueador | 4-5 | 30-40 | 12-14 | 8-10 | Arco curto (dano à distância), fuga rápida (+30% velocidade ao fugir), emboscada | 6-10 |
| Bandido Anão Renegado | 5-7 | 60-75 | 16-18 | 14-16 | Machado pesado, armadura de ferro (anã), chama reforços (se HP <50%, 2-3 aliados), cooperação | 15-25 |

**IA e Comportamentos**:
- **Tático**: usa cobertura (rochas, árvores); mantém distância (goblins)
- **Chama reforços** (Bandidos): sinaliza aliados próximos (raio 100m); reforços chegam em 3-5 turnos
- **Fuga condicional**: goblins fogem se superados (3+ aliados mortos); bandidos fogem se isolados (sem aliados em raio 20m)

---

## 4. Bosses de Dungeon — Mecânicas e Telégrafos

### 4.1. Cristaleão (Kravens, Nível 5)

**Tipo**: Criatura de cristal/mineral (fauna mágica rara).

**Localização**: Andar Esquecido de Kravens, câmara final (Cena 6e).

**Aparência Visual** (diretrizes de arte):
- Criatura quadrúpede (leão/pantera) feita de cristais transparentes azulados
- Corpo angular com facetas brilhantes
- Partes destacáveis: braços (garras), pernas, cauda cristalina
- Olhos brilham em azul intenso
- Hachuras internas sugerem estrutura cristalina

**Mecânicas de Combate**:

**Fase 1 (100%-60% HP)**:
- **Garras Cristalinas**: ataque corpo a corpo padrão (dano médio)
- **Projeção de Fragmentos**: dispara fragmentos de cristal (dano à distância, telegrafado por brilho nos ombros)
- **Telégrafo**: cristais nos ombros brilham 2 segundos antes do disparo

**Fase 2 (60%-30% HP)**:
- **Quebra de Partes**: jogador pode atacar braços/pernas individualmente
  - Quebrar 1 braço: -30% dano de garras
  - Quebrar 2 braços: Cristaleão usa apenas Projeção de Fragmentos
  - Quebrar 1 perna: -20% velocidade
- **Investida Cristalina**: corre em linha reta (telegrafado por recuo + rugido), alto dano + knockback
- **Telégrafo**: recua 3 metros, ruge (som grave), depois investe

**Fase 3 (<30% HP)**:
- **Fúria Cristalina**: velocidade aumenta +30%; ataques mais frequentes
- **Explosão de Fragmentos** (AOE): dispara fragmentos em todas as direções (telegrafado por corpo inteiro brilhando)
- **Telégrafo**: corpo inteiro pulsa com luz azulada intensa por 3 segundos, depois explode (raio 5m)

**Recompensa**:
- **1 unidade de Sigmetal** (minério raro, narrativa)
- **50 Ludos**

### 4.2. Pestesporo (Esgoto de Gildrat, Nível 8)

**Tipo**: Fungo colossal tóxico.

**Localização**: Câmara de Decantação, nível inferior do Esgoto (Cena 7b.2).

**Aparência Visual** (diretrizes de arte):
- Fungo gigante com cabeça bulbosa (3m de altura)
- Corpo de tronco grosso com raízes no chão
- Cabeça incha e desinfla (respiração de esporos)
- Olhos/boca: aberturas escuras que liberam esporos
- Hachuras grossas sugerem textura fúngica

**Mecânicas de Combate**:

**Fase 1 (100%-70% HP)**:
- **Esporos Venenosos** (AOE): libera nuvem de esporos (raio 4m, veneno -20 HP/turno, 5 turnos)
- **Telégrafo**: cabeça incha (animação de 2 segundos), depois explode esporos
- **Tentáculos de Raiz**: ataque corpo a corpo (alcance médio, dano baixo mas imobiliza 1 turno)

**Fase 2 (70%-40% HP)**:
- **Invocação de Fungos Menores**: cria 2-3 Fungos Venenosos Gigantes (HP 30 cada, imóveis)
- Fungos menores também lançam esporos (AOE menor, raio 2m)
- **Chuva de Esporos**: ataque em área maior (raio 6m, telegrafado por tremor no chão)
- **Telégrafo**: chão treme (partículas de poeira caem), 3 segundos depois chuva de esporos

**Fase 3 (<40% HP)**:
- **Ambiente Anóxico** (opcional): mecânica narrativa de barra de ar? Ou timer visual apenas
- **Fúria Fúngica**: velocidade de ataques aumenta +40%
- **Explosão Final**: ao morrer, libera nuvem tóxica massiva (raio 8m, alto dano se não fugir)
- **Telégrafo**: corpo inteiro começa a pulsar/vibrar; jogador tem 5 segundos para sair da área

**Recompensa**:
- **Liberação de passagem** para superfície (narrativa)
- **80 Ludos**

### 4.3. [Boss de Melios] (Nível 12) — A Definir

**Opções Sugeridas**:

**Opção A: Guardião Colossal de Pedra**
- Construto gigante (5m de altura)
- Mecânicas: armadura de pedra multicamadas (precisa quebrar 3 partes), ataques em área (terremoto, rochas caindo do teto), fases de invulnerabilidade (precisa ativar pilares rúnicos na arena)
- Telégrafo: runas no corpo brilham antes de ataques especiais

**Opção B: Manifestação da Energia Selada**
- Criatura espectral/elemental de energia azulada (não Ignoto, mas "eco" do selo)
- Mecânicas: ataques intangíveis (ignora armadura), teleporte pela arena, invoca Sombras Errantes menores, drena mana do jogador
- Telégrafo: distorções visuais (ar ondula) antes de teleporte; brilho intenso antes de dreno de mana
- **Foreshadowing sutil**: NPCs comentam que a energia "não deveria estar acordada"

**Recompensa** (ambas opções):
- **Acesso ao salão de minérios raros** (narrativa)
- **120 Ludos**
- **Item narrativo único** (artefato relacionado ao selo? Ou minério raro para quest futura)

---

## 5. IA, Comportamentos e Telégrafos

### 5.1. Padrões de IA por Família

| Família | Padrão de Patrulha | Detecção | Combate | Fuga |
|---------|-------------------|----------|---------|------|
| **Fauna de Caverna** | Circular/linear (raio 20-30m) | Visual 15m, som 10m | Ataca em grupo; foca alvo mais próximo | Foge se 50% grupo morrer OU HP <25% |
| **Criaturas Tóxicas** | Estático (limos) ou imóvel (fungos) | Proximidade 10m | Territorial; não persegue além de área | Nunca foge |
| **Construtos/Guardiões** | Rígida (rotas fixas) | Visual 20m | Ataque pesado; retorna a posição se perder aggro | Nunca foge |
| **Predadores** | Matilha (patrulha em grupo) | Farejamento 30m, visual 20m | Cooperação tática; foca alvo fraco | Foge se líder morrer OU 50% cair |
| **Humanoides** | Emboscada (bandidos) ou patrulha (goblins) | Visual 25m, som 15m | Usa cobertura; chama reforços; tático | Foge se isolado (bandidos) ou superado (goblins) |

### 5.2. Telégrafos Visuais e Sonoros

**Objetivo**: Permitir que jogador reaja a ataques especiais; garantir fairness.

| Inimigo | Ataque Especial | Telégrafo Visual | Telégrafo Sonoro | Tempo de Aviso |
|---------|-----------------|------------------|------------------|----------------|
| **Cristaleão** | Projeção de Fragmentos | Cristais nos ombros brilham | Som de cristais tilintando | 2 segundos |
| **Cristaleão** | Investida Cristalina | Recua 3m, corpo brilha | Rugido grave | 2 segundos |
| **Cristaleão** | Explosão de Fragmentos (AOE) | Corpo inteiro pulsa luz azul | Zumbido crescente agudo | 3 segundos |
| **Pestesporo** | Esporos Venenosos (AOE) | Cabeça incha (animação) | Sopro/exalação pesada | 2 segundos |
| **Pestesporo** | Chuva de Esporos | Chão treme (partículas caem) | Tremor grave/subterrâneo | 3 segundos |
| **Lobo Alpha** | Uivo de Comando (buff) | Cristais nas costas brilham | Uivo prolongado agudo | 2 segundos |
| **Guardião Ancião** | Ataque em Cone | Runas no peito brilham | Som de pedra rangendo | 2 segundos |
| **Sombra Errante** | Dreno de Mana | Ar ondula ao redor | Sussurro dissonante | 2 segundos |

### 5.3. Cooperação entre Inimigos

**Combinações Táticas**:

1. **Lobo de Gelo + Lobo Alpha**:
   - Alpha buffa velocidade/ataque de lobos comuns (+20% ataque)
   - Lobos comuns cercam jogador enquanto Alpha ataca por trás
   - **Contramedida**: Focar no Alpha primeiro para quebrar buff

2. **Bandido Anão + Goblin Saqueador**:
   - Goblin atira de posição elevada enquanto Bandido bloqueia em corpo a corpo
   - Bandido usa escudo (reduz dano frontal)
   - **Contramedida**: Flanquear goblin; usar cobertura contra flechas

3. **Aranha Gigante + Aranha Mineira**:
   - Aranha Gigante imobiliza com teia; Aranhas Mineiras atacam alvo preso
   - **Contramedida**: Matar Aranhas Mineiras primeiro (fodder); quebrar teia rapidamente

4. **Guardião de Pedra + Elemental de Terra**:
   - Elemental ataca à distância; Guardião tanque em corpo a corpo
   - **Contramedida**: Usar magia contra Elemental (fraqueza); kitar Guardião (lento)

### 5.4. Chamada de Reforços

**Quem**: Bandidos Anões, Goblins em grupo (raro).

**Condição**: HP <50% (Bandidos) OU detecção de jogador em emboscada (Goblins).

**Mecânica**:
- Bandido sinaliza (apito/grito)
- Reforços chegam em 3-5 turnos (2-3 aliados)
- Reforços vêm de áreas adjacentes (pré-definidas)

---

## 6. Loot e Economia Simplificada

### 6.1. Sistema de Loot (Moeda Única: Ludos)

**Loot de Inimigos**: Apenas moeda **Ludos** (sem crafting/materiais complexos conforme GDD).

| Categoria de Inimigo | Loot Médio (Ludos) | Notas |
|----------------------|-------------------|-------|
| **Fodder** (níveis 1-3) | 2-7 | Morcegos, ratos pequenos, goblins fracos |
| **Mid-tier** (níveis 4-7) | 8-18 | Aranhas grandes, lobos, bandidos, limos |
| **Elite** (níveis 8-11) | 20-50 | Alphas, ursos, construtos, sombras |
| **Bosses** (níveis 5-12) | 50-120 | Cristaleão (50), Pestesporo (80), Boss de Melios (120) |

### 6.2. Economia de Gildrat (Narrativa)

**Mercadores**:
- Compram loot (se houver itens narrativos: troféus, artefatos)
- Vendem itens básicos (poções de cura, equipamento de nível apropriado)

**Ferreiros**:
- Melhoram armas/armaduras (custo em Ludos)
- Reparam equipamento danificado

**Tavernas**:
- Informação (rumores, quests)
- Descanso (recupera HP/mana)

**Nota**: Sistema de loot é simplificado; foco está em combate e narrativa, não em crafting complexo.

### 6.3. Itens Narrativos Especiais

Alguns inimigos dropam itens narrativos (não equipáveis, mas usados em quests):

| Inimigo | Item Narrativo | Uso |
|---------|---------------|-----|
| **Lobo Alpha de Gelo** | Pele de Lobo Alpha | Quest de caça nobre; troféu de status social |
| **Urso Colossal** | Garra de Urso Colossal | Quest de caça nobre; troféu de status social |
| **Cristaleão** | Sigmetal (1x) | Narrativa: minério raro usado futuramente contra Ignotos (Cena 13d) |
| **[Boss de Melios]** | Fragmento do Selo? | Artefato relacionado ao selo; quest futura? |

---

## 7. Perigos Ambientais (Flavor, Não Punitivos)

### 7.1. Filosofia de Design

**Objetivo**: Adicionar imersão e atmosfera **sem punir excessivamente** o jogador. Perigos são **evitáveis** ou causam **debuffs leves**.

### 7.2. Perigos por Dungeon/Bioma

#### Kravens (Mina Ativa)

| Perigo | Condição | Efeito | Mecânica de Gameplay | Contramedida |
|--------|----------|--------|---------------------|--------------|
| **Colapso Pontual** | Evento scriptado em área específica | 30-50 dano se atingido; jogador pode esquivar | Aviso visual (rachaduras no teto, poeira caindo); jogador tem 3 segundos para sair da área | Percepção alta detecta rachaduras antes; movimento rápido |
| **Bolsões de Gás Tóxico** | Áreas específicas (vapor amarelado) | Debuff leve: -5 HP/turno se exposição >5 segundos | Sinalizados visualmente; jogador pode evitar ou atravessar rapidamente | Segurar respiração (mecânica narrativa); poção de resistência |

#### Esgoto de Gildrat

| Perigo | Condição | Efeito | Mecânica de Gameplay | Contramedida |
|--------|----------|--------|---------------------|--------------|
| **Água Tóxica** | Entrar em água esverdeada | -3 HP/segundo enquanto submerso | Áreas claramente marcadas (cor, borbulhas) | Evitar; usar pontes/passarelas |
| **Vapor Venenoso** | Câmaras específicas | Debuff: -5% velocidade enquanto na área | Efeito visual (névoa verde baixa); dissipa ao sair | Atravessar rapidamente; poção de resistência |

#### Melios (Mina Sagrada)

| Perigo | Condição | Efeito | Mecânica de Gameplay | Contramedida |
|--------|----------|--------|---------------------|--------------|
| **Energia Instável** | Proximidade do selo | **Sem dano mecânico**; apenas atmosfera opressiva | Efeitos visuais (brilho azulado pulsante, distorções no ar, som de zumbido grave) | Narrativa apenas; cria tensão |
| **Colapsos Pós-Quebra** | Após quebra do selo (Cena 10b) | 50 dano se atingido; jogador pode fugir | Aviso visual/sonoro; jogador tem 5 segundos para escapar | Correr para saída; QTE simples |

#### World Map (Superfície)

| Perigo | Condição | Efeito | Mecânica de Gameplay | Contramedida |
|--------|----------|--------|---------------------|--------------|
| **Tempestade de Neve** | Aleatório (10% chance ao entrar em zona) | Visibilidade -70%; +20% chance de encontro | Efeito visual (neve densa); duração: 5 minutos | Aguardar passar; cristal luminescente melhora visibilidade |
| **Avalanche** | Evento raro/narrativo (em passagens estreitas) | 70-100 dano se atingido; pode enterrar jogador | Aviso sonoro (estrondo); QTE para esquivar | QTE; agilidade alta facilita escape |

---

## 8. Diretrizes de Arte e VFX (Bestiário Medieval — Sépia)

### 8.1. Estilo Visual Geral

**Referências**: [Aberdeen Bestiary](https://www.openculture.com/2025/10/the-aberdeen-bestiary-one-of-the-great-medieval-illuminated-manuscripts-now-digitized.html), [Getty Museum Bestiary](https://www.getty.edu/art/exhibitions/bestiary/inner.html), gravuras medievais em xilogravura.

**Paleta de Cores**:
- **Monocromático sépia**: linhas pretas puras (#000000) + sombras marrom escuro (#2A221B a #3B2F2F)
- **Realces sutis**: camada de cor sépia (#F0E2C1 a #F5E6C8) com blend Multiply/Overlay (20-35% opacidade)

**Técnicas de Sombreamento**:
- **Hachuras paralelas**: ângulos 45°, 60°; cruzar em 90° para áreas mais escuras
- **Espaçamento**: 4-6 px entre linhas (em 1x); deixar 1-2 pixels de "respiro" entre hachura e contorno
- **Pontilhismo**: para transições suaves em áreas pequenas (bochechas, dobras)

**Contorno**:
- **Linha externa** (contorno principal): 8 px (ou 4 px em 1x)
- **Linhas internas** (detalhes): 4 px (ou 2 px em 1x)

**Silhuetas**: Distintas e legíveis; cada família de inimigos tem silhueta única.

### 8.2. Diretrizes por Família de Inimigos

#### Fauna de Caverna (Morcegos, Aranhas, Ratos)

**Silhuetas**:
- **Morcegos**: asas membranosas (triangulares); orelhas pontiagudas; corpo pequeno
- **Aranhas**: corpo segmentado (cefalotórax + abdômen); 8 patas aracnídeas (angulares); quelíceras visíveis
- **Ratos**: corpo alongado; cauda longa; focinhos proeminentes; orelhas arredondadas

**Texturas**:
- **Morcegos**: hachuras finas nas asas (linhas radiais); pelagem sugerida por pontilhismo
- **Aranhas**: hachuras cruzadas no abdômen; patas com segmentos angulares; pelos sugeridos por linhas curtas
- **Ratos**: pelagem densa (hachuras curtas paralelas); dentes proeminentes; olhos pequenos (círculos cheios)

**Elementos Fantásticos**:
- Aranhas Gigantes: olhos múltiplos brilham levemente (sépia claro)
- Ratos Mutantes: proporções exageradas (dentes maiores, garras); cicatrizes/marcas

#### Criaturas Tóxicas (Limos, Fungos)

**Silhuetas**:
- **Limos**: formas amorfas (gotas, massas irregulares); sem membros definidos
- **Fungos**: tronco grosso; cabeça bulbosa; raízes no chão; aberturas (boca/olhos) escuras

**Texturas**:
- **Limos**: contorno ondulado; hachuras suaves (curvas); bolhas internas (círculos vazios)
- **Fungos**: hachuras grossas verticais no tronco; cabeça com textura de esponja (pontilhismo denso); raízes angulares

**Elementos Tóxicos**:
- Limos: gotas/respingos ao redor (sugerem ácido)
- Fungos: esporos flutuando (pequenos círculos/pontos ao redor); vapor saindo das aberturas

#### Construtos e Guardiões (Pedra, Cristal)

**Silhuetas**:
- **Guardiões de Pedra**: formas geométricas (blocos, cilindros); proporções robustas; sem curvas orgânicas
- **Elementais**: humanoides abstratos; corpo segmentado (pedras flutuantes)
- **Cristaleão**: quadrúpede angular; facetas cristalinas; partes destacáveis

**Texturas**:
- **Pedra**: hachuras grossas paralelas; rachaduras (linhas irregulares); rugosidade sugerida
- **Cristal**: facetas (triângulos/losangos); brilho (áreas sem hachura, branco puro); transparência parcial

**Elementos Mágicos**:
- Runas gravadas (símbolos geométricos simples)
- Olhos/núcleo brilhante (sépia claro)
- Aura sutil (linhas radiantes ao redor)

#### Predadores de Superfície (Lobos, Ursos)

**Silhuetas**:
- **Lobos**: anatomia realista de canídeo; orelhas eretas; cauda longa
- **Ursos**: corpo robusto; patas largas; focinho curto

**Texturas**:
- **Pelagem**: hachuras médias seguindo direção do pelo; mais densas em áreas sombreadas
- **Garras/dentes**: preto puro; proeminentes

**Elementos Fantásticos** (Fantasia Vibrante):
- **Lobo Alpha**: cristais de gelo nas costas (facetas, brilho); aura gélida (linhas onduladas ao redor)
- **Urso Colossal**: pedra/cristais incrustados nas costas; proporções exageradas (1,5x tamanho normal)

#### Humanoides Hostis (Bandidos Anões, Goblins)

**Silhuetas**:
- **Anões**: robustos (baixos, largos); barba trançada; armadura pesada
- **Goblins**: esguios (altos, magros); orelhas pontiagudas; postura encurvada

**Texturas**:
- **Armadura/metal**: hachuras cruzadas; brilho em bordas (linha branca fina); detalhes de rebitamento
- **Tecido/couro**: hachuras paralelas; dobras (linhas curvas); desgaste (rasgos, remendos)

**Elementos de Profundidade Narrativa**:
- **Bandidos Anões**: armadura enferrujada/danificada (sugerindo exílio); insígnias rasuradas (marca de desonra)
- **Goblins**: roupas remendadas; armas improvisadas (sugerindo pobreza/renegação)

### 8.3. VFX e Partículas (Adaptar para Engine)

| Tipo de Inimigo | Efeito Visual | Descrição | Momento de Ativação |
|-----------------|---------------|-----------|---------------------|
| **Lobo de Gelo** | Rastro de névoa gélida | Vapor branco sai das narinas; chão congela levemente (brilho branco) | Durante movimento |
| **Lobo Alpha** | Aura de cristais | Cristais pequenos orbitam o corpo (partículas azuis claras) | Sempre ativo |
| **Elemental de Terra** | Rochas flutuantes | Pedras pequenas orbitam o corpo (partículas marrons) | Sempre ativo |
| **Sombra Errante** | Distorção espectral | Ar ondula ao redor (efeito de distorção); névoa escura | Sempre ativo |
| **Cristaleão** | Brilho de cristais | Cristais no corpo pulsam luz azulada | Ao carregar ataque especial |
| **Pestesporo** | Esporos flutuantes | Partículas verdes flutuam ao redor da cabeça | Sempre ativo (intensifica ao atacar) |
| **Limo Ácido** | Gotas ácidas | Gotas caem do corpo; sibilam ao tocar chão | Sempre ativo |

### 8.4. SFX (Diretrizes de Áudio)

| Tipo de Inimigo | Som de Presença | Som de Ataque | Som de Morte | Som Especial |
|-----------------|-----------------|---------------|--------------|--------------|
| **Morcego** | Chilreio agudo, bater de asas | Guincho + mordida | Chilreio fraco, queda | — |
| **Aranha** | Patas arranham pedra | Sibilar + mordida | Estalo (quitina quebrando) | Teia sendo tecida (fio sendo puxado) |
| **Rato** | Guincho leve, passos rápidos | Guincho alto + mordida | Guincho agonizante | — |
| **Limo Ácido** | Esguichar/borbulhar | Respingo ácido (sibilar) | Estouro gelatinoso | Dissolução (sibilar contínuo) |
| **Fungo** | Respiração pesada/exalação | Sopro (liberação de esporos) | Colapso (madeira podre caindo) | Esporos explodindo (puff) |
| **Guardião de Pedra** | Passos pesados (pedra rangendo) | Impacto de pedra (estrondo) | Desmoronamento (rochas caindo) | Runas ativando (zumbido grave) |
| **Elemental de Terra** | Pedras colidindo, ranger | Arremesso de rocha (assobio + impacto) | Desintegração (fragmentos caindo) | — |
| **Lobo de Gelo** | Uivo distante, passos na neve | Rosnado + mordida | Ganido fraco, corpo caindo na neve | Uivo de matilha (alerta) |
| **Lobo Alpha** | Uivo profundo, cristais tilintando | Rosnado grave + mordida | Uivo agonizante + cristais quebrando | Aura gélida (vento suave contínuo) |
| **Urso Colossal** | Respiração pesada, passos estrondosos | Rugido + golpe pesado | Rugido agonizante, queda estrondosa | Investida (estrondo crescente) |
| **Bandido Anão** | Passos pesados, tinir de metal | Grito de guerra + impacto de machado | Gemido + queda de armadura | Apito de alarme (chamada de reforços) |
| **Goblin** | Passos leves, resmungar | Assobio de flecha + grito agudo | Guincho agudo | — |
| **Cristaleão** | Cristais tilintando, passos rangendo | Rugido cristalino + garras | Estilhaçar massivo (cristais quebrando) | Projeção de fragmentos (assobio agudo) |
| **Pestesporo** | Respiração pesada/exalação | Sopro massivo (esporos) | Colapso (fungo desabando) | Invocação de fungos (pulso orgânico) |
| **Sombra Errante** | Sussurro dissonante, eco fantasmagórico | Grito espectral + toque gélido | Dissipação (sussurro desvanecendo) | Dreno de mana (sucção + zumbido) |

---

## 9. Integração Narrativa com Gildrat e Ekios

### 9.1. Conexões com a Cultura Anã de Gildrat

#### Expedições de Mineração

**Contexto**: Anões realizam expedições regulares para minas ativas (Kravens) e exploram minas secundárias. Expedições são eventos cívicos; sucesso é celebrado, falha é lamentada no Muro das Memórias.

**Inimigos Envolvidos**:
- **Fauna de Caverna** (morcegos, aranhas, ratos): "pragas" conhecidas; mineiros têm protocolos para lidar com elas
- **Bandidos Renegados**: saqueiam caravanas e minas abandonadas; ameaça constante
- **Criaturas de Melios**: consideradas "guardiãs" pela cultura; respeito cultural impede exploração

**Ganchos de Quest**:
1. **"Desobstrução de Kravens"**: Eliminar aranhas/morcegos de túnel bloqueado para retomar produção.
2. **"Escolta de Caravana"**: Proteger expedição de mineração de bandidos/predadores na Estrada do Cão-Luar.

#### Guarda de Ferro (Patrulhas)

**Contexto**: Guarda de Ferro patrulha fronteiras e rotas comerciais. **Kilin e Mhordred** (da timeline) são exemplos típicos; escoltas obrigatórias para expedições importantes.

**Inimigos Envolvidos**:
- **Bandidos Anões**: exilados que atacam patrulhas; Guarda tem ordens de capturar/eliminar
- **Predadores** (lobos, ursos): ameaça à segurança de rotas; Guarda realiza caças preventivas
- **Goblins Renegados**: atacam caravanas; Guarda os repele mas evita conflito em território goblin (Metsa)

**Ganchos de Quest**:
1. **"Rota Sitiada"**: Guarda pede ajuda para limpar Estrada do Cão-Luar infestada de lobos.
2. **"Caça ao Bandido"**: Capturar líder de bandidos renegados escondido em mina abandonada.

#### Caça Esportiva (Nobres Anões)

**Contexto**: Nobres anões praticam caça como esporte de status social. Troféus (peles, garras) de predadores raros são exibidos em salões. Thorin, por ser nobre (filho de Tordan), pode ser contatado para caças.

**Alvos de Caça**:
- **Lobo Alpha de Gelo**: troféu de alta estima (cristais de gelo, pele rara)
- **Urso Colossal**: troféu máximo (garra, pedra incrustada)

**Ganchos de Quest**:
1. **"Caça ao Alpha"**: Nobre contrata jogador para eliminar Lobo Alpha que ameaça rota comercial.
2. **"Fera Colossal"**: Rastrear e abater Urso Colossal que atacou acampamento de caçadores.

### 9.2. Conexões com Outras Raças

#### Goblins de Metsa

**Contexto**: Goblins comercializam com Gildrat no Distrito Externo. Alguns são renegados (exilados de Metsa) e se tornam bandidos.

**Inimigos Envolvidos**: **Goblin Saqueador** (renegado).

**Integração Narrativa**:
- Goblins pacíficos (comerciantes) vs Goblins renegados (hostis)
- Quest pode envolver negociar com tribo goblin para identificar renegados
- **Zik** (da timeline, Cena 7) é exemplo de goblin aliado

**Ganchos de Quest**:
1. **"Diplomacia Goblin"**: Negociar com tribo de Metsa para identificar renegados que saqueiam caravanas anãs.
   - **Recompensa**: Ludos + aliança com tribo (desconto em comércio)

#### Elfos de Arcaror (Menção Passiva)

**Contexto**: Elfos raramente visitam Gildrat (relação tensa pré-história principal). Criaturas mágicas (Elementais) podem ter ligação sutil com território élfico.

**Integração Narrativa**: NPCs anões comentam que "Elementais são coisa de elfo" (preconceito cultural); na verdade, Elementais são vestígios de civilização pré-Gildrat.

### 9.3. Foreshadowing de Melios (Sutil, Sem Revelar Ignotos)

**Objetivo**: Criar tensão e intriga **sem mencionar Ignotos diretamente**. Jogador percebe que "algo não está certo" em Melios, mas não sabe o quê.

#### Sinais Sutis

1. **Guardiões Inquietos** (Melios):
   - Construtos patrulham mais ativamente do que deveriam (programação original falha?)
   - NPCs comentam: "Os guardiões de Melios parecem... acordados. Nunca vi isso antes."

2. **Sombras Errantes** (Melios, perto do selo):
   - Criaturas espectrais aparecem em áreas profundas
   - NPCs: "Há relatos de sombras que se movem sozinhas. Dizem que é o selo rachando."

3. **Energia Instável** (Câmara do Selo):
   - Brilho azulado pulsante; distorções visuais; som de zumbido grave
   - NPCs: "O selo está... respirando? Isso não deveria acontecer."
   - Jogador (Thorin) pode ter visões breves (flashes oníricos) perto do selo

4. **Canções de Alerta** (cultura anã):
   - Mineiros cantam canções antigas sobre Melios: "Não toques o ferro selado, não quebres a promessa antiga"
   - Corvos (facção rebelde) mencionam: "O selo protege algo. Se romper, Gildrat cairá."

**Diálogos de NPCs** (exemplos):

- **Mineiro veterano**: "Trabalhei perto de Melios por 20 anos. Nunca entrei. Meu pai me ensinou: aquilo é sagrado. Quem quebrar o selo trará a ruína."
- **Corvos (líder)**: "Damburr quer explorar Melios. Ele não entende... ou não se importa. O que está selado lá embaixo não deve acordar."
- **Balastrus** (antes da quebra): "Superstição. Melios é apenas uma mina antiga com minérios raros. Vamos abri-la e enriquecer Gildrat."

---

## 10. Progressão de Dificuldade e Balanceamento

### 10.1. Curva de Progressão por Dungeon

| Dungeon | Níveis | Inimigos Principais | Dificuldade | Foco de Aprendizado |
|---------|--------|---------------------|-------------|---------------------|
| **Kravens** | 1-5 (Early) | Morcegos, Aranhas, Ratos, Cristaleão | Baixa a Média | Mecânicas básicas (combate em grupo, telégrafos simples, gestão de HP) |
| **Esgoto** | 5-8 (Mid) | Ratos de Esgoto, Limos, Fungos, Pestesporo | Média a Alta | Status effects (veneno, debuffs), AOE, divisão de inimigos |
| **Melios** | 8-12 (Late) | Guardiões, Elementais, Sombras, Boss | Alta a Muito Alta | Resistências específicas (físico vs mágico), quebra de armadura, foreshadowing |

### 10.2. Picos de Dificuldade (Skill Checks)

**Filosofia**: Alguns encontros/bosses são intencionalmente mais difíceis; exigem preparação (equipamento, nível, estratégia).

| Encontro | Nível | Dificuldade | Motivo | Preparação Recomendada |
|----------|-------|-------------|--------|------------------------|
| **Cristaleão** (Kravens) | 5 | Média-Alta | Primeiro boss; mecânica de quebra de partes | Nível 5 recomendado; armas de dano alto |
| **Pestesporo** (Esgoto) | 8 | Alta | Boss com AOE massivo e invocações | Nível 8; resistência a veneno; foco em AOE para fungos menores |
| **Lobo Alpha + Matilha** (World Map) | 7-8 | Alta | Elite com buff de grupo; superioridade numérica | Nível 7+; focar Alpha primeiro; usar AOE |
| **Guardião Ancião + Elemental** (Melios) | 10-11 | Muito Alta | Dupla com resistências opostas (físico/mágico) | Nível 10+; balancear ataques físicos e mágicos |
| **Boss de Melios** | 12 | Muito Alta | Boss final do Ato I (pré-Ignotos) | Nível 12; equipamento otimizado; grupo completo |

### 10.3. Densidade de Spawn e Ritmo

**Kravens** (mina ativa):
- **Túneis Ativos**: Alta densidade (encontro a cada 30-50m); inimigos fracos (morcegos, aranhas pequenas)
- **Andar Esquecido**: Média densidade (encontro a cada 70-100m); inimigos mais fortes (aranhas grandes, ratos)
- **Objetivo**: Aprendizado gradual; jogador se sente poderoso no final

**Esgoto de Gildrat** (travessia tóxica):
- **Túneis Superiores**: Média densidade (encontro a cada 50-70m); ratos/limos
- **Câmara de Decantação**: Baixa densidade (encontro controlado); fungos gigantes + boss
- **Objetivo**: Tensão crescente; ambiente hostil adiciona pressão

**Melios** (mina sagrada):
- **Corredores**: Baixa densidade (encontro a cada 100-150m); guardiões/elementais (todos elite)
- **Câmara do Selo**: Muito baixa (encontros narrativos); boss final
- **Objetivo**: Cada encontro é significativo; atmosfera opressiva

**World Map** (superfície):
- **Estrada do Cão-Luar**: Média densidade (encontro a cada 200-300m); lobos, bandidos
- **Cordilheira**: Baixa densidade (encontro a cada 400-500m); predadores raros (Alpha, Urso)
- **Objetivo**: Exploração; encontros são imprevisíveis

---

## 11. Perigos Ambientais e Clima (Resumo Consolidado)

Ver **Seção 7** para detalhes completos.

**Filosofia**: Perigos são **flavor** (imersão) e **raramente punitivos**. Jogador pode evitar ou mitigar facilmente.

**Resumo por Bioma**:
- **Kravens**: Colapsos pontuais (evitáveis), gases tóxicos (sinalizados)
- **Esgoto**: Água tóxica (áreas marcadas), vapor venenoso (debuff leve)
- **Melios**: Energia instável (visual apenas, sem dano), colapsos pós-quebra (fugíveis)
- **World Map**: Tempestades de neve (visuais, +20% encontros), avalanches (raras, QTE)

---

## 12. Notas de Produção

### Para Designers

- Use as tabelas de inimigos por dungeon (Seção 3) como base para implementação
- Progressão de níveis 1-12 está mapeada (Early 1-5, Mid 5-8, Late 8-12)
- Bosses têm mecânicas únicas detalhadas (Seção 4); telégrafos são críticos para fairness
- Perigos ambientais são **flavor** (Seção 7); não devem ser punitivos

### Para Artistas

- **Estilo visual**: Bestiário medieval sépia (Seção 8.1)
- **Diretrizes por família** (Seção 8.2): silhuetas, texturas, elementos fantásticos
- Referências: [Aberdeen Bestiary](https://www.openculture.com/2025/10/the-aberdeen-bestiary-one-of-the-great-medieval-illuminated-manuscripts-now-digitized.html), [Getty Museum](https://www.getty.edu/art/exhibitions/bestiary/inner.html)
- Priorize inimigos de alta frequência: Morcegos, Aranhas, Ratos, Lobos, Bandidos

### Para Programadores

- **IA**: Padrões por família (Seção 5.1); use estados claros (idle → alerta → combate → fuga)
- **Telégrafos**: 2-3 segundos de aviso antes de ataques especiais (Seção 5.2)
- **Cooperação**: Grupos coordenados (Seção 5.3); Alphas buffam aliados
- **Perigos ambientais**: Triggers e QTEs para colapsos/avalanches (Seção 7)
- **Loot**: Sistema simplificado; apenas Ludos (Seção 6)

### Para Escritores

- **Integração narrativa** (Seção 9): expedições anãs, Guarda de Ferro, caça esportiva
- **Foreshadowing de Melios** (Seção 9.3): diálogos de NPCs, canções de alerta, energia instável
- **Diálogos de inimigos humanoides**: Bandidos anões (cínicos, amargos), Goblins (pragmáticos, nervosos)
- **Ganchos de quest** (Seção 9.1): conectar inimigos a missões secundárias

### Para Sound Designers

- **SFX por inimigo** (Seção 8.4): presença, ataque, morte, especial
- **Telégrafos sonoros** (Seção 5.2): críticos para avisar jogador (uivos, estrondos, zumbidos)
- **Atmosfera ambiental**: Kravens (marteladas distantes, gotejamento), Esgoto (água corrente, borbulhas), Melios (zumbido grave, eco de passos)

---

## 14. Apêndices

### 14.1. Glossário de Termos

| Termo | Definição | Contexto |
|-------|-----------|----------|
| **Ludos** | Moeda oficial de Gildrat | Economia, loot |
| **Guarda de Ferro** | Exército elite dos anões | Facção militar; NPCs Kilin e Mhordred |
| **Melios** | Minas sagradas onde Ignotos estão selados | Localização proibida; dungeon late game |
| **Ignotos** | Criaturas sombrias seladas em Melios | **NÃO aparecem neste período** (documento cobre pré-quebra do selo) |
| **Sigmetal** | Minério raro dropado pelo Cristaleão | Item narrativo; usado futuramente contra Ignotos |
| **Kravens** | Mina ativa de exploração de minério Kraven | Dungeon early game |
| **Estrada do Cão-Luar** | Rota principal entre Gildrat e Kravens | World map; local de encontros aleatórios |
| **Corvos** | Facção rebelde de mineradores independentes | NPCs; protegem Melios; confronto na Cena 8 |
| **Cristaleão** | Boss de Kravens; criatura de cristal | Primeiro boss do jogo |
| **Pestesporo** | Boss do Esgoto; fungo colossal tóxico | Segundo boss do jogo |

### 14.2. Referências Externas (Inspiração)

**IMPORTANTE**: Estes materiais foram usados apenas como **inspiração estrutural**. Nomes, descrições e mecânicas foram **adaptados** para Ekios.

**Bestiário Medieval**:
- [Aberdeen Bestiary (digitizado)](https://www.openculture.com/2025/10/the-aberdeen-bestiary-one-of-the-great-medieval-illuminated-manuscripts-now-digitized.html)
- [Getty Museum — Book of Beasts](https://www.getty.edu/art/exhibitions/bestiary/inner.html)

**Criaturas Subterrâneas (D&D)**:
- [The 20 Best D&D Monsters for Underdark Adventures](https://www.cbr.com/dnd-best-monsters-underdark/)
- [10 Awesome Monsters for a D&D 5e Cave or Underground Encounter](https://www.tribality.com/2014/11/04/10-awesome-monsters-for-dnd-5e-cave-underground-encounter/)

**Mecânicas de Boss**:
- [Boss Battle Design and Structure](https://www.gamedeveloper.com/design/boss-battle-design-and-structure)
- [Combat Design, Mechanics and Systems](https://gamedesignskills.com/game-design/combat-design/)

### 14.3. Histórico de Revisões

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 2026-01-07 | Claude Code (Game Designer Sênior IA) | Versão inicial completa; aprovado pelo usuário (respostas da entrevista incorporadas) |

---

**FIM DO DOCUMENTO**

**Contato para revisões**: Consulte o Game Designer responsável antes de alterar informações críticas (recorte temporal, integração com timeline, foreshadowing de Melios).

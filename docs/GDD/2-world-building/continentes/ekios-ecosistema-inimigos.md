# Ecossistema de Inimigos — Ekios (Região de Gildrat)

**Autor**: Claude Code (Game Designer Sênior IA)
**Data de Criação**: 2026-01-07
**Data de Última Revisão**: 2026-01-07
**Versão**: 2.0
**Status**: Revisado (Progressão Lv 1-30 + RM MZ)
**Jogo**: Daratrine: A Origem
**Engine**: RPG Maker MZ

---

## Resumo Executivo

Este documento define o ecossistema completo de inimigos do continente gelado **Ekios**, focado na região de **Gildrat**, no período de **200 anos após a fundação do império anão** e **ANTES da quebra do selo de Melios**.

**Contexto do Jogo**:
- **3 dungeons principais**: Kravens (mineração), Esgoto de Gildrat (tóxico), Melios (sagrada)
- **World map**: Encontros aleatórios na Estrada do Cão-Luar e cordilheira
- **Progressão**: Níveis 1-30 com âncoras narrativas
  - **Lv 1**: Prólogo e saída de Gildrat
  - **Lv 10**: Kravens (Cristaleão + Sigmetal)
  - **Lv 15**: Esgoto (Pestesporo)
  - **Lv 20**: Corvos de Melios (boss humano)
  - **Lv 25**: Quebra do Selo (primeiros Ignotos)
  - **Lv 30**: Defesa de Gildrat (General Ignoto)
- **Loot**: Moeda única **Ludos** (sem sistema de crafting complexo)
- **Estilo visual**: Bestiário medieval em sépia monocromático, hachuras, alto contraste
- **Engine**: RPG Maker MZ (encontros por passos, sistema de turnos, troops, estados)

**Ênfase**: 70% subterrâneo (minas/cavernas), 30% superfície (cordilheira gelada)

*Fonte: [gildrat-v2.md](../racas/anoes/gildrat-v2.md)*

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
- Comércio limitado com goblins (Metsa), trolls e raríssimos elfos no Distrito Externo de Gildrat

*Fonte: [gildrat-v2.md](../racas/anoes/gildrat-v2.md) e [o-continente-de-ekios.md](../o-continente-de-ekios.md#s2--história-e-linha-do-tempo)*

### 1.2. Geografia e Clima

**Localização**: Cordilheira gelada no norte de Ekios.

**Clima Dominante**:
- **Topos/cristas** (altitude >3000m): gelado, ventos fortes, neve perpétua
- **Encostas** (1000-3000m): frio a temperado, bosques de pinheiros
- **Vales/Gildrat** (0-1000m): temperado (aquecido por forjas anãs)
- **Subterrâneo** (minas/cavernas): temperado a frio; umidade variável

**Características Geológicas**: Montanhas rochosas, cavernas extensas, geleiras, fendas profundas.

*Fonte: [o-continente-de-ekios.md](../o-continente-de-ekios.md#s3--geografia-e-biomas)*

### 1.3. População e Cultura

**Raças Dominantes**: Anões de Gildrat (70.000 habitantes no apogeu).

**Estrutura Social**: Sistema de castas rígido (nobreza, comerciantes, trabalhadores, desprivilegiados).

**Economia Principal**: Mineração e metalurgia; expedições de mineração são eventos cívicos celebrados.

**Força Militar**: **Guarda de Ferro** — exército elite anão; patrulhas regulares na cordilheira e escoltas de expedições.

*Fonte: [gildrat-v2.md](../racas/anoes/gildrat-v2.md) e [gildrat-arquitetura-v2.md](../racas/anoes/gildrat-arquitetura-v2.md)*

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

### 2.2. Dungeon 1 — Mina de Kravens (Níveis 5-10, Âncora Lv 10)

**Localização**: Serra ao norte de Gildrat, acessível pela Estrada do Cão-Luar.

**Tema**: Mina ativa de exploração de minério Kraven; área de treinamento de mineradores.

**Bioma**: Túneis rochosos escavados, iluminação por cristais luminescentes e tochas; temperatura temperada (forjas de fundição).

**Estrutura**:
- **Túneis Ativos** (entrada/níveis superiores): área de trabalho regular dos anões; criaturas são "pragas" conhecidas
- **Andar Esquecido** (após queda de Thorin, Cena 6d): nível inferior selado há décadas; criaturas maiores/mais perigosas

**Inimigos** (RM MZ):

| Nome | Nível | Tipo | Comportamento (Troops/Estados) | Localização |
|------|-------|------|---------------|-------------|
| **Morcego de Caverna** | 5-6 | Fauna (Fodder) | Troops de 3-5 unidades; ataque básico; habilidade passiva: **Fuga em Bando** (chance de fugir se restarem <50% do grupo) | Túneis Ativos |
| **Aranha Mineira** | 6-7 | Fauna (Fodder/Mid) | Troops de 2-3 unidades; habilidade: **Teia Pegajosa** (aplica estado Lento por 2 turnos, chance 70%) | Túneis Ativos |
| **Aranha Gigante** | 7-9 | Fauna (Mid-tier) | Troops de 2 unidades; habilidade: **Teia Paralisante** (aplica estado Paralisado por 2 turnos, chance 60%); veneno médio (DoT -10 HP/turno, 3 turnos) | Andar Esquecido |
| **Rato Gigante Mutante** | 7-9 | Fauna (Mid-tier) | Troops de 4-6 unidades; buff passivo: **Força da Horda** (se 3+ ratos vivos, +20% ATK); variação rara "Rato Alfa" (elite menor, buffa aliados) | Andar Esquecido |
| **Cristaleão** | 10 | Boss (Camaleão de minérios) | Ver seção de bosses | Andar Esquecido (câmara final) |

**Perigos Ambientais** (RM MZ):
- **Colapso pontual**: Evento de mapa com switch; dano fixo (30-50 HP) se personagem estiver na tile; aviso visual (rachaduras, poeira caindo) 3 segundos antes

**Recompensas Narrativas**:
- **Sigmetal** (minério raro) dropado pelo Cristaleão (Cena 6e)
- Liberação de acesso ao 10º Kraven para completar contrato

**Nota de Design**: Jogador chega aqui após **World Map (Lv 1-5)**, então Kravens é a primeira dungeon fechada do jogo.

### 2.3. Dungeon 2 — Esgoto de Gildrat (Níveis 10-15, Âncora Lv 15)

**Localização**: Sistema de drenagem subterrâneo de Gildrat, acessível por entrada na nevasca (Cena 7b.1).

**Tema**: Infraestrutura urbana degradada; ambiente tóxico e claustrofóbico; travessia forçada para escapar da tempestade.

**Bioma**: Túneis de pedra com água corrente (esgoto), câmaras de decantação, umidade alta, odor pútrido, iluminação escassa (tochas do grupo).

**Estrutura**:
- **Túneis Superiores**: esgotos ativos; água corrente; criaturas oportunistas
- **Câmara de Decantação** (nível inferior): câmara anóxica (baixo oxigênio); fungos gigantes; boss fight

**Inimigos** (RM MZ):

| Nome | Nível | Tipo | Comportamento (Troops/Estados) | Localização |
|------|-------|------|---------------|-------------|
| **Rato de Esgoto** | 10-11 | Fauna (Fodder) | Troops de 4-6 unidades; habilidade: **Mordida Doente** (aplica estado Doença: -10% DEF, 3 turnos, chance 50%) | Túneis Superiores |
| **Limo Ácido** | 11-12 | Criatura Tóxica (Mid) | Troop individual ou dupla; habilidade: **Dissolução Ácida** (aplica estado Armadura Dissolvida: -15% DEF física, 5 turnos); trait: Velocidade -30%, HP alto | Túneis Superiores e Câmara |
| **Fungo Venenoso Gigante** | 13-14 | Criatura Tóxica (Elite) | Troop fixo imóvel; habilidade: **Nuvem de Esporos** (atinge todos os personagens, aplica estado Envenenado: DoT -15 HP/turno, 4 turnos); mecânica de partes (destruir "cabeça" para derrotar) | Câmara de Decantação |
| **Gosma Tóxica** | 13-14 | Criatura Tóxica (Mid) | Troop individual; mecânica especial: **Divisão** (ao receber habilidade de área, divide-se em 2 Limos Ácidos menores com 30% HP cada via evento comum) | Câmara de Decantação |
| **Pestesporo** | 15 | Boss (Fungo colossal) | Ver seção de bosses | Câmara de Decantação (final) |

**Perigos Ambientais** (RM MZ):
- **Água tóxica**: Tiles específicas aplicam dano contínuo (3-5 HP/segundo) via evento paralelo; áreas marcadas com tint esverdeado
- **Vapor venenoso**: Zona específica com overlay visual; aplica debuff leve via evento (estado Intoxicado: -5% Velocidade) enquanto personagem estiver na região

**Recompensas Narrativas**:
- **Liberação de passagem** para superfície (saída do esgoto)
- Retorno à Estrada do Cão-Luar (Cena 7b.3)

### 2.4. Dungeon 3 — Mina de Melios (Níveis 15-20, Âncora Lv 20)

**Localização**: Mina sagrada ao norte de Gildrat, além de Kravens; acessível após obter mandato do Conselho (Cena 8).

**Tema**: Mina proibida por tradição; selos ancestrais; energia estranha (foreshadowing da quebra futura); guardiões construtos; **confronto com Corvos de Melios** (Lv 20).

**Bioma**: Túneis antigos de pedra lavrada (pré-Gildrat?); runas gravadas nas paredes; cristais emitem brilho azulado instável; temperatura fria; atmosfera opressiva.

**Estrutura**:
- **Corredores/Entrada**: patrulhas de guardiões construtos; elementais de pedra
- **Acampamento dos Corvos** (mid-dungeon): encontro narrativo com facção rebelde; boss fight humano (Lv 20)
- **Câmara do Selo** (profunda): selo de ferro com runas; energia instável (foreshadowing); Guardião Colossal de Pedra

**Mecânica Especial — Visão Limitada** (RM MZ):
- Toda a dungeon usa overlay/picture circular (raio ~7 tiles) ao redor do líder do party
- Implementação via plugin de fog of war OU picture que segue player com blend subtract/multiply
- Cristais luminescentes marcam pontos de interesse (brilho sutil atravessa a escuridão)
- Efeito narrativo: atmosfera opressiva, medo do desconhecido, foreshadowing

**Inimigos** (RM MZ):

| Nome | Nível | Tipo | Comportamento (Troops/Estados) | Localização |
|------|-------|------|---------------|-------------|
| **Guardião Menor de Pedra** | 15-17 | Construto (Elite) | Troops de 2 unidades; trait: Resistência Física 30%; baixa Velocidade; não foge; ataque pesado (high power, baixa accuracy) | Corredores |
| **Elemental de Terra** | 16-18 | Criatura Mágica (Elite) | Troop individual; habilidade: **Projétil Rochoso** (alvo único, elemento Terra); trait: Resistência Física 40%, Fraqueza Mágica 25%; não foge | Corredores e Câmara |
| **Guardião Ancião** | 18-19 | Construto (Elite/Sub-boss) | Troop individual fixo (evento); mecânica de partes: **Armadura de Pedra** (precisa causar 3x dano crítico ou quebrar via habilidade especial); habilidade: **Golpe Esmagador** (atinge linha frontal) | Câmara do Selo (entrada) |
| **Sombra Errante** | 19 | Criatura Mágica Espectral (Elite) | Troop individual; habilidade: **Sussurro do Medo** (aplica estado Medo: -20% ATK, 4 turnos, todos personagens); trait: ataques ignoram DEF física; foreshadowing da energia selada | Câmara do Selo (perto do selo) |
| **Corvos de Melios (Líder + 3-4 aliados)** | 20 | Boss Humano | Boss fight narrativo com facção rebelde; ver seção de bosses | Acampamento dos Corvos |
| **Guardião Colossal de Pedra** | 20 | Boss (Construto gigante) | Ver seção de bosses | Câmara do Selo (final) |

**Perigos Ambientais** (RM MZ):
- **Energia instável**: Efeito visual via picture/overlay pulsante (azul translúcido); SE de zumbido grave; **sem dano mecânico**, apenas atmosfera
- **Visão limitada**: Descrita acima; obriga jogador a explorar com cautela
- **Colapsos pontuais**: Após quebra do selo narrativa (Cena 10b); evento scriptado com timer (jogador tem 5 segundos para sair da tile)

**Recompensas Narrativas**:
- **Acesso a minérios raros** (salão após o selo; narrativa de riqueza efêmera antes da invasão dos Ignotos)
- **Sigmetal adicional** (se exploração pós-quebra)

**Nota de Design**: Boss dos **Corvos de Melios (Lv 20)** é o pico de dificuldade "humana" antes da quebra do selo e aparição dos Ignotos (Lv 25+).

### 2.5. World Map — Encontros Aleatórios (Superfície, Níveis 1-5)

**CRÍTICO**: Jogador explora World Map **ANTES de entrar em Kravens**. Esta é a área de **tutorial de combate** e apresentação do loop básico do jogo.

**Estrada do Cão-Luar / Cordilheira Gelada**:
- Rota principal entre Gildrat e Kravens
- Clima: neve leve a tempestades ocasionais
- Patrulhas da Guarda de Ferro (neutras/aliadas)

**Minas Abandonadas** (transversal):
- Espalhadas pela cordilheira
- Refúgios de bandidos e goblins renegados

**Inimigos do World Map** (RM MZ):

| Nome | Nível | Tipo | Comportamento (Troops/Encounter Rate) | Localização |
|------|-------|------|---------------|-------------|
| **Lobo Jovem** | 1-2 | Predador (Fodder) | Troops de 2-3 unidades; ataque básico; encounter rate alto (tutorial); habilidade passiva: **Fuga Instintiva** (foge se HP <30%) | Estrada (primeiras áreas) |
| **Lobo de Gelo** | 3-5 | Predador (Mid-tier) | Troops de 3-4 unidades; cooperação: **Caça em Matilha** (buff +15% ATK se 3+ lobos vivos); encounter rate médio | Estrada, Cordilheira |
| **Goblin Saqueador** | 2-4 | Humanoide Hostil (Mid) | Troops de 2-3 unidades; habilidade: **Flecha** (alvo único, elemento físico); trait: Foge se superado (1 goblin restante); encounter rate médio | Encostas, Minas Abandonadas |
| **Bandido Anão Renegado** | 3-5 | Humanoide Hostil (Mid) | Troops de 2-4 unidades; habilidade: **Chamado de Reforços** (event troop, adiciona 1-2 aliados se HP <50%); armor/weapon anãs; encounter rate baixo | Minas Abandonadas |
| **Lobo Alpha de Gelo** | 5 (Raro) | Predador (Elite) | Troop individual ou com 2 Lobos de Gelo; habilidade: **Uivo Gélido** (aplica estado Lento: -10% Velocidade, 3 turnos, todos personagens); buff passivo: **Líder de Matilha** (+20% ATK para lobos aliados); encounter rate muito baixo | Cordilheira (áreas remotas) |

**Progressão de Encounter Rate**:
- **Áreas próximas a Gildrat (Lv 1-2)**: encounter rate alto, inimigos fracos (Lobo Jovem, Goblin Saqueador)
- **Estrada do Cão-Luar (Lv 2-4)**: encounter rate médio, inimigos mid-tier (Lobo de Gelo, Bandido Anão)
- **Cordilheira remota (Lv 4-5)**: encounter rate baixo, possibilidade de elite (Lobo Alpha)

**Perigos Ambientais** (RM MZ):
- **Tempestade de neve**: Evento de mapa com switch; overlay visual (névoa branca); aumenta encounter rate em +20% enquanto ativo; duração: 2-3 minutos
- **Avalanche**: Evento narrativo scriptado em passagens específicas; aviso sonoro (estrondo crescente); jogador tem 5 segundos para mover-se para tile segura

**Objetivo de Design**:
1. **Ensinar loop básico**: ataque, defesa, habilidades, itens
2. **Apresentar famílias de inimigos**: predadores (lobos) e humanoides (goblins/bandidos)
3. **Introduzir status effects**: Lento (Lobo Alpha), Fuga (mecânica de escape)
4. **Preparar jogador para Kravens**: Lv 5 ao chegar na dungeon

*Fonte: [o-continente-de-ekios.md](../o-continente-de-ekios.md#s3--geografia-e-biomas)*

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

### 4.1. Cristaleão (Kravens, Nível 10)

**Tipo**: Camaleão de minérios (reptil mineral mimetizado).

**Localização**: Andar Esquecido de Kravens, câmara final (Cena 6e).

**Conceito**: Criatura capaz de **camuflar-se** perfeitamente entre os minérios e cristais de Kravens. Predador de emboscada que aguarda mineradores incautos.

**Aparência Visual** (diretrizes de arte):
- Criatura reptiliana (camaleão) quadrúpede com pele cristalina
- Corpo alongado com cauda preênsil
- Pele mimetiza textura e cor dos minérios ao redor (facetas angulares, brilho azulado)
- Partes destacáveis: membros anteriores (garras), membros posteriores, cauda
- Olhos com pupilas verticais brilham levemente
- Língua longa pode atacar à distância
- Hachuras sugerem escamas cristalinas

**Mecânicas de Combate** (RM MZ):

**Fase 1 (100%-60% HP)**:
- **Garras Cristalinas**: Ataque físico básico (alvo único, dano médio)
- **Língua Lacerante**: Habilidade especial (alvo único, dano médio, chance 30% de aplicar estado Sangramento: DoT -8 HP/turno, 3 turnos)
- **Projeção de Fragmentos** (Telegrafada):
  - **Turno de Carregamento**: Cristaleão entra em estado **Carregando** (mensagem: "Cristaleão brilha intensamente!"); animação de brilho nos ombros; não ataca neste turno
  - **Turno de Execução**: Habilidade **Projeção de Fragmentos** (atinge alvo aleatório, dano alto, elemento físico)

**Fase 2 (60%-30% HP)**:
- **Quebra de Partes** (mecânica via estados/traits):
  - Membros anteriores/posteriores têm "partes" destrutíveis
  - Ao causar dano crítico em membro específico, Cristaleão recebe trait permanente (ex.: **Pata Quebrada**: -30% dano de Garras, -20% Velocidade)
  - Se ambos membros anteriores quebrados: Cristaleão só usa Língua Lacerante e Projeção de Fragmentos
- **Investida Brutal** (Telegrafada):
  - **Turno de Carregamento**: Estado **Recuando** (mensagem: "Cristaleão recua e ruge!"); SE de rugido grave; não ataca
  - **Turno de Execução**: **Investida Brutal** (atinge linha frontal, dano alto, aplica estado Atordoado: 1 turno, chance 70%)

**Fase 3 (<30% HP)**:
- **Fúria Cristalina**: Trait permanente (+30% Velocidade, +20% frequência de ações)
- **Explosão de Fragmentos** (Telegrafada, AOE):
  - **Turno de Carregamento**: Estado **Pulsando** (mensagem: "O corpo de Cristaleão pulsa com energia instável!"); animação de pulso azul; não ataca
  - **Turno de Execução**: **Explosão de Fragmentos** (atinge todos os personagens, dano muito alto, elemento físico)

**Recompensa**:
- **1 unidade de Sigmetal** (minério raro, narrativa)
- **100 Ludos**

**Nota de Design**: Primeiros boss; ensina mecânicas de telegrafação (1 turno de aviso) e quebra de partes (alvo específico).

### 4.2. Pestesporo (Esgoto de Gildrat, Nível 15)

**Tipo**: Fungo colossal tóxico.

**Localização**: Câmara de Decantação, nível inferior do Esgoto (Cena 7b.2).

**Aparência Visual** (diretrizes de arte):
- Fungo gigante com cabeça bulbosa (3m de altura)
- Corpo de tronco grosso com raízes no chão
- Cabeça incha e desinfla (respiração de esporos)
- Olhos/boca: aberturas escuras que liberam esporos
- Hachuras grossas sugerem textura fúngica

**Mecânicas de Combate** (RM MZ):

**Fase 1 (100%-70% HP)**:
- **Tentáculos de Raiz**: Ataque físico básico (alvo único, dano baixo, aplica estado Enraizado: não pode fugir, 1 turno, chance 60%)
- **Esporos Venenosos** (Telegrafada, AOE):
  - **Turno de Carregamento**: Estado **Inflando** (mensagem: "A cabeça de Pestesporo incha!"); animação de expansão da cabeça; não ataca
  - **Turno de Execução**: **Esporos Venenosos** (atinge todos os personagens, aplica estado Envenenado: DoT -20 HP/turno, 5 turnos, elemento Veneno)

**Fase 2 (70%-40% HP)**:
- **Invocação de Fungos Menores**: Evento comum spawna 2-3 Fungos Venenosos Gigantes (HP baixo, imóveis, atacam com Esporos menores: alvo único, veneno)
- **Chuva de Esporos** (Telegrafada, AOE):
  - **Turno de Carregamento**: Estado **Tremor** (mensagem: "O chão treme e partículas caem!"); animação de tela tremendo; não ataca
  - **Turno de Execução**: **Chuva de Esporos** (atinge todos os personagens, dano alto + estado Envenenado, elemento Veneno)
- **Estratégia**: Jogador deve eliminar fungos menores rapidamente para reduzir pressão de veneno

**Fase 3 (<40% HP)**:
- **Fúria Fúngica**: Trait permanente (+40% Velocidade, +20% frequência de ações)
- **Ambiente Anóxico** (mecânica narrativa): Mensagens de batalha ("O ar está escasso!"); efeito visual (overlay escurecido); sem dano mecânico, apenas atmosfera
- **Explosão Final** (ao ser derrotado):
  - Pestesporo não morre imediatamente ao chegar a 0 HP
  - Entra em estado **Pulsando** (mensagem: "Pestesporo pulsa violentamente!")
  - Jogador tem 2 turnos para usar comando especial **Fugir da Explosão** OU evento comum força fuga automática
  - Se jogador não fugir: **Explosão Tóxica** (atinge todos os personagens, dano massivo, pode causar wipe)

**Recompensa**:
- **Liberação de passagem** para superfície (narrativa)
- **150 Ludos**

**Nota de Design**: Ensina mecânicas de priorização de adds (fungos menores) e escape condicional (explosão final).

### 4.3. Corvos de Melios (Melios, Nível 20, Boss Humano)

**Tipo**: Facção rebelde de mineradores independentes (boss fight narrativo).

**Localização**: Acampamento dos Corvos, mid-dungeon de Melios (Cena 8).

**Contexto Narrativo**: Os Corvos de Melios são mineradores independentes que protegem a mina sagrada. Confronto inevitável quando Thorin e grupo tentam acessar a Câmara do Selo.

**Composição do Encounter**:
- **Líder dos Corvos** (Lv 20, Guerreiro Anão): HP alto, DEF alta, ataque pesado
- **2-3 Capangas** (Lv 18-19, Mix de classes): Arqueiro, Guerreiro, Curandeiro

**Mecânicas de Combate** (RM MZ):

**Fase 1 (100%-50% HP do Líder)**:
- **Líder**: Ataque básico pesado (alvo único, dano alto); habilidade **Comando de Batalha** (buffa aliados: +20% ATK/DEF, 3 turnos)
- **Arqueiro**: **Flecha Perfurante** (alvo único, ignora 30% DEF)
- **Guerreiro**: **Golpe Duplo** (alvo único, 2 hits consecutivos)
- **Curandeiro** (se presente): **Cura** (alvo único, restaura ~30% HP); **Purificação** (remove 1 estado negativo)

**Fase 2 (<50% HP do Líder OU 2+ capangas derrotados)**:
- **Líder**: Entra em estado **Fúria** (+30% ATK, -10% DEF); habilidade **Investida Furiosa** (alvo único, dano massivo, aplica estado Atordoado: 1 turno, chance 50%)
- **Capangas restantes**: Aumentam agressividade (priorizam alvos com HP baixo)
- **Estratégia**: Jogador pode focar Líder primeiro (alta ameaça) OU eliminar capangas (reduzir suporte)

**Recompensa**:
- **Passagem liberada para Câmara do Selo** (narrativa)
- **200 Ludos**
- **Item narrativo**: Emblema dos Corvos (prova de confronto)

**Nota de Design**: Boss fight "humano" (pico de dificuldade não-sobrenatural). Ensina priorização de alvos e gestão de suporte (curandeiro).

*Fonte: [o-continente-de-ekios.md](../o-continente-de-ekios.md#s2--história-e-linha-do-tempo)*

---

### 4.4. Guardião Colossal de Pedra (Melios, Nível 20, Boss Construto)

**Tipo**: Construto gigante guardião do selo (5m de altura).

**Localização**: Câmara do Selo, profunda em Melios (final da dungeon).

**Conceito**: Guardião ancestral que protege o selo de Melios. Ativado quando jogador se aproxima do selo.

**Aparência Visual** (diretrizes de arte):
- Construto humanóide gigante feito de pedra lavrada
- Corpo segmentado: torso, braços, pernas com juntas rúnicas brilhantes (azul fraco)
- Runas gravadas no peito e ombros (pulsam ao atacar)
- Armadura de pedra multicamadas (visual de placas sobrepostas)
- Olhos vazios emanam brilho azulado
- Hachuras densas sugerem peso e solidez

**Mecânicas de Combate** (RM MZ):

**Fase 1 (100%-70% HP)**:
- **Punho de Pedra**: Ataque físico básico (alvo único, dano alto, chance 30% de aplicar estado Atordoado: 1 turno)
- **Armadura Multicamadas**: Trait permanente (Resistência Física 50%, Fraqueza Mágica 30%)
- **Terremoto** (Telegrafada, AOE):
  - **Turno de Carregamento**: Estado **Preparando Golpe** (mensagem: "Runas no peito do Guardião brilham!"); animação de runas pulsando; não ataca
  - **Turno de Execução**: **Terremoto** (atinge todos os personagens, dano alto, aplica estado Desequilibrado: -20% Evasão, 2 turnos, elemento Terra)

**Fase 2 (70%-40% HP)**:
- **Ativar Pilares Rúnicos** (mecânica de puzzle):
  - Guardião entra em estado **Invulnerável** (recebe 1 dano apenas)
  - 3 pilares rúnicos na arena acendem (eventos de mapa)
  - Jogador deve interagir com pilares na ordem correta (pista visual: runas pulsam em sequência)
  - Ao ativar todos pilares: Guardião perde invulnerabilidade e recebe debuff **Selado** (-30% DEF, 5 turnos)
- **Rochas Caindo** (Telegrafada):
  - **Turno de Carregamento**: Estado **Convocando** (mensagem: "Rochas se desprendem do teto!"); SE de rachadura
  - **Turno de Execução**: **Rochas Caindo** (atinge alvos aleatórios, dano médio, 3-4 hits)

**Fase 3 (<40% HP)**:
- **Fúria Ancestral**: Trait permanente (+40% Velocidade, +30% ATK)
- **Golpe Colossal** (Telegrafada, single-target massivo):
  - **Turno de Carregamento**: Estado **Carregando Poder** (mensagem: "O Guardião ergue ambos os braços!"); animação de brilho intenso nas runas
  - **Turno de Execução**: **Golpe Colossal** (atinge alvo com maior ameaça, dano massivo, pode one-shot se jogador não defendeu/usou buff)

**Recompensa**:
- **Acesso ao salão de minérios raros** (narrativa)
- **250 Ludos**
- **Sigmetal adicional** (minério raro)
- **Fragmento do Selo** (item narrativo, quest futura)

**Nota de Design**: Boss final de Melios pré-quebra do selo. Ensina mecânicas de puzzle ambiental (pilares) e gestão de invulnerabilidade. Foreshadowing: NPCs comentam que "o guardião não deveria ter acordado".

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

### 10.3. Densidade de Spawn e Ritmo (RM MZ)

Esta seção define **encounter rates**, **composição de troops**, e **variações** para cada região, usando nomenclatura de RPG Maker MZ.

---

#### World Map — Estrada do Cão-Luar (Lv 1-5, Tutorial)

**Encounter Rate**: 8-12 steps (alto, para ensinar loop básico)

**Troops (Encounter Table)**:
- **Troop 1**: 2-3 Lobos Jovens (70% chance, primeiras áreas)
- **Troop 2**: 2-3 Goblins Saqueadores (50% chance, encostas)
- **Troop 3**: 3-4 Lobos de Gelo (40% chance, áreas intermediárias)
- **Troop 4**: 2-4 Bandidos Anões (30% chance, minas abandonadas)
- **Troop 5 (Raro)**: 1 Lobo Alpha + 2 Lobos de Gelo (5% chance, cordilheira remota)

**Variações por Faixa de Level**:
- **Lv 1-2**: Apenas Troops 1-2 (encounter rate 10 steps)
- **Lv 3-4**: Troops 1-4 (encounter rate 12 steps)
- **Lv 5**: Todas troops incluindo rara (encounter rate 15 steps, aumenta dificuldade)

**Safe Spots**: Acampamentos da Guarda de Ferro (eventos de mapa sem encounters); entrada de Gildrat (zona segura)

**Gates Narrativos**: Jogador deve atingir Lv 5 antes de Kravens (gate via evento ou diálogo NPC)

---

#### Kravens — Mina Ativa (Lv 5-10)

**Túneis Ativos** (entrada/níveis superiores):
- **Encounter Rate**: 15-20 steps (médio-alto)
- **Troops**:
  - Troop 1: 3-5 Morcegos de Caverna (80% chance)
  - Troop 2: 2-3 Aranhas Mineiras (60% chance)
  - Troop 3: 4 Morcegos + 1 Aranha (40% chance, variação)
- **Safe Spots**: Sala de descanso dos mineradores (evento fixo no mapa)

**Andar Esquecido** (após queda de Thorin):
- **Encounter Rate**: 20-25 steps (médio)
- **Troops**:
  - Troop 1: 2 Aranhas Gigantes (70% chance)
  - Troop 2: 4-6 Ratos Gigantes Mutantes (60% chance)
  - Troop 3: 1 Aranha Gigante + 3 Ratos (50% chance, variação)
  - Troop 4: 1 Rato Alfa + 4 Ratos comuns (20% chance, elite menor)
- **Safe Spots**: Ante-sala do boss (zero encounters)

**Boss Encounter**: Cristaleão (evento fixo, sem encounters aleatórios na câmara)

**Objetivo**: Progressão gradual; jogador ganha confiança com morcegos/aranhas menores antes de enfrentar criaturas maiores.

---

#### Esgoto de Gildrat — Travessia Tóxica (Lv 10-15)

**Túneis Superiores**:
- **Encounter Rate**: 18-22 steps (médio)
- **Troops**:
  - Troop 1: 4-6 Ratos de Esgoto (70% chance)
  - Troop 2: 2 Limos Ácidos (60% chance)
  - Troop 3: 5 Ratos + 1 Limo (50% chance, variação)
- **Safe Spots**: Nenhum (travessia forçada, aumenta tensão)

**Câmara de Decantação**:
- **Encounter Rate**: 30-40 steps (baixo, encontros controlados)
- **Troops**:
  - Troop 1: 2 Fungos Venenosos Gigantes (fixos, imóveis, podem ser evitados parcialmente)
  - Troop 2: 1 Gosma Tóxica (fixo, evento específico)
- **Safe Spots**: Ante-sala do boss (zero encounters)

**Boss Encounter**: Pestesporo (evento fixo)

**Objetivo**: Ambiente hostil adiciona pressão; jogador deve gerenciar recursos (HP/MP) sem safe spots frequentes.

---

#### Melios — Mina Sagrada (Lv 15-20)

**Corredores/Entrada**:
- **Encounter Rate**: 35-45 steps (baixo, cada encontro é significativo)
- **Troops**:
  - Troop 1: 2 Guardiões Menores de Pedra (80% chance, elites)
  - Troop 2: 1 Elemental de Terra (70% chance, elite)
  - Troop 3: 1 Guardião + 1 Elemental (40% chance, variação)
  - Troop 4: 1 Sombra Errante (30% chance, elite espectral, perto do selo)
- **Safe Spots**: Ante-sala dos Corvos (zero encounters); ante-sala do Guardião Colossal (zero encounters)

**Acampamento dos Corvos** (mid-dungeon):
- **Encounter Rate**: 0 (encontro narrativo fixo)
- **Boss Encounter**: Corvos de Melios (evento fixo, Lv 20)

**Câmara do Selo**:
- **Encounter Rate**: 0 (encontros narrativos/fixos apenas)
- **Boss Encounter**: Guardião Colossal de Pedra (evento fixo, Lv 20)

**Mecânica Especial**: Visão limitada (descrita na Seção 2.4); aumenta tensão apesar de encounter rate baixo.

**Objetivo**: Atmosfera opressiva; cada encontro exige preparação; exploração cautelosa recompensada.

---

#### Gates Narrativos e Progressão

**Antes de Kravens** (Lv 5):
- Jogador deve atingir Lv 5 no World Map antes de entrada ser liberada (gate via NPC ou evento)

**Antes de Esgoto** (Lv 10):
- Jogador deve completar Kravens (obter Sigmetal) antes de nevasca forçar entrada no Esgoto

**Antes de Melios** (Lv 15):
- Jogador deve obter mandato do Conselho (Cena 8) após completar Esgoto

**Pós-Melios** (Lv 25-30):
- Quebra do Selo (Cena 10) desbloqueia novos encounters (Ignotos) e regiões (não coberto neste documento)

---

#### Pontos de Alívio (Safe Zones)

**Filosofia**: Safe spots são raros em dungeons para manter tensão, mas presentes em momentos narrativos chave.

**Implementação** (RM MZ):
- Regiões de mapa com encounter rate = 0
- Eventos que desabilitam encounters temporariamente
- Switches que controlam encounter rate por área

**Exemplos**:
- Acampamentos da Guarda de Ferro (World Map)
- Sala de descanso dos mineradores (Kravens)
- Ante-salas de bosses (todas dungeons)

---

**Nota de Design**: Encounter rates devem ser testadas e ajustadas em playtest para balancear ritmo narrativo vs grinding necessário.

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

### Para Designers (RM MZ)

- Use as tabelas de inimigos por dungeon (Seções 2-3) como base para implementação de Troops
- **Progressão Lv 1-30 está mapeada**:
  - Lv 1: Prólogo/World Map (tutorial)
  - Lv 10: Kravens (Cristaleão)
  - Lv 15: Esgoto (Pestesporo)
  - Lv 20: Melios (Corvos + Guardião Colossal)
  - Lv 25-30: Pós-quebra do selo (não coberto neste documento)
- Bosses têm mecânicas únicas detalhadas (Seção 4); **telégrafos baseados em turnos** (estado Carregando → Execução)
- Perigos ambientais são **flavor** (Seção 7); implementados via eventos, não punitivos
- **Encounter rates** detalhados na Seção 10.3; ajustar em playtest

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
| **Melios** | Minas sagradas onde Ignotos estão selados | Localização proibida; dungeon late game (Lv 15-20) |
| **Ignotos** | Criaturas sombrias seladas em Melios | **NÃO aparecem neste período** (documento cobre pré-quebra do selo) |
| **Sigmetal** | Minério raro dropado pelo Cristaleão | Item narrativo; usado futuramente contra Ignotos |
| **Kravens** | Mina ativa de exploração de minério Kraven | Primeira dungeon (Lv 5-10) |
| **Estrada do Cão-Luar** | Rota principal entre Gildrat e Kravens | World map; tutorial de combate (Lv 1-5) |
| **Corvos de Melios** | Facção rebelde de mineradores independentes | NPCs; protegem Melios; boss fight humano (Lv 20) |
| **Cristaleão** | Boss de Kravens; camaleão de minérios capaz de camuflagem | Primeiro boss do jogo (Lv 10) |
| **Pestesporo** | Boss do Esgoto; fungo colossal tóxico | Segundo boss do jogo (Lv 15) |
| **Guardião Colossal de Pedra** | Boss de Melios; construto gigante guardião do selo | Boss final pré-quebra do selo (Lv 20) |
| **RM MZ** | RPG Maker MZ | Engine do jogo; mecânicas baseadas em turnos, troops, encounter rates |

*Fonte: [o-continente-de-ekios.md](../o-continente-de-ekios.md) e [gildrat-v2.md](../racas/anoes/gildrat-v2.md)*

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
| 2.0 | 2026-01-07 | Claude Code (Game Designer Sênior IA) | **REVISÃO COMPLETA**: (1) Progressão ajustada para Lv 1-30 com âncoras narrativas (Lv 1, 10, 15, 20, 25, 30); (2) Todas mecânicas convertidas para RPG Maker MZ (troops, encounter rates, estados, turnos); (3) Cristaleão corrigido para camaleão de minérios com camuflagem; (4) Boss de Melios definido como Guardião Colossal de Pedra + adição de Corvos de Melios (Lv 20, boss humano); (5) Visão limitada adicionada em Melios; (6) Telégrafos adaptados para sistema de turnos (estado Carregando → Execução); (7) Seção 10.3 reescrita para encounter rates e gates narrativos; (8) World Map rebalanceado para Lv 1-5 (tutorial); (9) Fontes com links adicionadas seguindo padrão distrito-residencial.info.md |

---

**FIM DO DOCUMENTO**

**Contato para revisões**: Consulte o Game Designer responsável antes de alterar informações críticas (recorte temporal, integração com timeline, foreshadowing de Melios).

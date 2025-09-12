# Casa da Família Forja Prata — Descrição de Mapa

## 1) Sumário do mapa

Casa térrea anã, layout simples e funcional. Fluxo: porta → hall curto → cozinha/sala de jantar integrada → corredor estreito → quartos → despensa. Interações principais: conversa com Tordan na cozinha, pegar troféu antigo de Tordan na despensa, pegar a funda no baú da despensa (semifinal), dormir na cama do quarto de Thorin para encerrar.

## 2) Lista de Cômodos

### 2.1) Hall de Entrada

- Dimensão: pequeno (≈3×3 tiles).
- Objetos obrigatórios (nome · qtd · posição):
  1. Porta principal · 1 · parede sul.
  2. Tapete de entrada (estreito) · 1 · centralizado, 1 tile após a porta.
- Objetos opcionais (quando usar):
  - Suporte de botas · 1 · canto sudoeste; usar em versões mais rústicas.
  - Cabideiro de parede · 1 · parede leste; usar para enriquecer a entrada.

### 2.2) Cozinha/Sala de Jantar Integrada

- Dimensão: média (≈8×6 tiles).
- Objetos obrigatórios:
  1. Mesa retangular de jantar (4 lugares) · 1 · centro levemente deslocado ao norte.
  2. Cadeiras · 4 · duas a leste, duas a oeste da mesa.
  3. Bancada de cozinha com pia · 1 segmento longo · parede norte.
  4. forno · 1 · canto nordeste.
  5. Despensa · 1 · parede oeste.
  6. Porta interna para corredor · 1 · parede norte‑oeste (ligação para 2.3).
- Objetos opcionais (quando usar):
  - Prateleira de temperos · 1 · entre pia e forno;
  - Barril/ânfora · 1–2 · canto sudeste; usar em versão “rústica”.
  - Insígnias/estandartes militares discretos · 1–2 · parede oeste/sul;

### 2.3) Corredor

- Dimensão: estreito (largura 1 tile; comprimento 4–6 tiles).
- Objetos obrigatórios:
  1. Portas internas · 2–3 · parede leste/oeste (uma para quarto de Thorin, uma para quarto de Tordan, opcional para despensa).
  2. Tapetes estreitos em sequência · 2 · centralizados ao longo do corredor.
- Objetos opcionais (quando usar):
  - Nicha/estante baixa · 1 · parede livre; usar em versão “aprumada”.
  - Aplique de parede (decorativo, sem luz) · 1–2 · espaçados; usar apenas como prop.

### 2.4) Quarto de Thorin

- Dimensão: média (≈5×5 tiles).
- Objetos obrigatórios:
  1. Cama de solteiro · 1 · parede oeste, meio do vão.
  2. Mesa pequena/escrivaninha · 1 · canto sudeste; item neutro.
  3. Poleiro do Sáparo Boca‑de‑Corneta · 1 · canto nordeste, ao lado da cama
- Objetos opcionais (quando usar):
  - Cômoda/arcaz (sem troféu) · 1 · parede norte; uso decorativo.
  - Baú pequeno aos pés da cama · 1 · centro sul; usar quando inventário inicial exigir.
  - Tapete médio retangular · 1 · centralizado sob cama/mesa; variação estética.
  - Prateleiras extras com bugigangas esportivas · 1–2 · parede leste; usar se quiser enfatizar paixão por futebol rúnico.

### 2.5) Quarto de Tordan

- Dimensão: pequena a média (≈4×4 a 5×5 tiles).
- Objetos obrigatórios:
  1. Cama robusta (casal) · 1 · parede oeste; cabeceira alinhada.
  2. Retrato da esposa de Tordan · 1 · parede norte, acima da cabeceira; item memorial.
  3. Suporte/estante para armadura full‑body · 1 · canto sudeste; manequim com conjunto completo.
- Objetos opcionais:
  - Cômoda militar baixa · 1 · parede sul; uso decorativo.
  - Insígnias/estandartes discretos · 1–2 · paredes livres; reforço de status.
- Variações rápidas:
  1. Porta com brasão/insígnia (reforça autoridade).
  2. Porta simples (perfil discreto, foco no retrato e na armadura).

### 2.6) Despensa/Serviço (Memorial do Rúnico)

- Dimensão: pequena a média (≈3×3 a 5×4 tiles).
- Objetos obrigatórios:
  1. Estante de troféus · 1 · parede norte; contém o troféu antigo de Tordan — interação “pegar troféu”.
  2. Baú médio da funda · 1 · canto sudoeste; interação “pegar funda” (Semifinal).
  3. Prateleiras com mantimentos e tralhas de jogo · 2 · paredes leste e oeste.
  4. Quadro “Entrada no Time” (Thorin) · 1 · parede sul; item comemorativo.
- Objetos opcionais:
  - Ganchos para medalhas/insígnias · 2–3 · faixa superior de parede.
  - Caixa para bolas rúnicas · 1 · canto sudeste; uso estético.
- Variações rápidas:
  1. Converter estante de troféus em aparador baixo + prateleiras superiores.
  2. Substituir baú da funda por armário estreito com nicho trancado.
  3. Enxugar mantimentos e focar 100% em memorabilia esportiva.

## 3) Tabela de Substituições por Categoria

- Guarda‑roupa ↔ Estante alta
- Mesa de jantar 4L ↔ Aparador + mesa bistrô 2L
- Cadeira ↔ Banco corrido
- Cama solteiro ↔ Tatame + baú pequeno
- Armário alto ↔ Prateleiras abertas
- Estante baixa ↔ Baú grande

## 4) Checklist de Validação

- Circulação ≥ 1 tile em rotas: porta → mesa → corredor → quarto de Thorin → cama.
- Portas livres (sem props bloqueando batentes ou caminho imediato).
- Alinhamento rígido à grade; evitar diagonais fora do tileset.
- Sem clima/iluminação/relevo.

## 5) Observações de Implementação (Gatilhos/Interações)

- Porta principal (Hall): aciona cutscene de entrada/fechadura (Fim de Jogo, Cena 2).
- Cadeira/cabeceira de Tordan (Cozinha): inicia discussão/diálogo.
- Estante de troféus (Despensa): “Pegar troféu antigo de Tordan”.
- Baú da funda (Despensa): “Pegar funda” (Semifinal).
- Poleiro do Sáparo (Quarto de Thorin): fala provocativa (Sáparo‑boca‑de‑corneta).
- Cama (Quarto de Thorin): “Dormir & Encerrar” quando objetivo ativo.

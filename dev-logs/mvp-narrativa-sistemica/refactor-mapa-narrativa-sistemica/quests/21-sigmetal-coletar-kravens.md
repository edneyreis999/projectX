# Coletar Sigmetal na Câmara Revelada

## Identificação

- **Tipo:** Multiplicador Global de Todos os Exércitos
- **Dificuldade:** Média (Requer ter derrotado Cristaleão e possuir dinamite de Balastrus)
- **Localização:** Kravens (câmara secreta revelada pelo Cristaleão)

## Contexto Narrativo

Quest crucial que aprofunda o arco de Balastrus e a descoberta do Sigmetal como arma anti-Ignoto. Na Cena 6e, Thorin derrotou o Cristaleão que revelou uma passagem bloqueada por pedra gigante. Na Cena 10b, Balastrus entregou dinamites a Thorin. Esta quest conecta esses dois momentos - Thorin usa os explosivos para abrir a câmara e descobre depósito massivo de Sigmetal, o minério lilás proibido que é a fraqueza primária dos Ignotos.

Esta descoberta tem peso narrativo: o minério que Tusk proibiu de tocar na Cena 6b (por ordens de Damburr) acaba sendo a salvação de Gildrat. Aprofunda tema de "conhecimento proibido pode salvar vidas".

## Gatilhos

- **Condições de início:** Retornar a Kravens com dinamite de Balastrus e ter derrotado Cristaleão
- **Requisitos:**
  - `flag_cristaleao_derrotado = ON` (Cena 6e)
  - Possuir dinamite de Balastrus (recebida na Cena 10b)
  - Passagem para Kravens liberada

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Thorin (protagonista/descobridor)
  - Filena (companheira, testemunha da descoberta)
  - Balastrus (diálogo posterior em Gildrat sobre importância do Sigmetal)
  - Cristaleão (boss derrotado anteriormente que revelou passagem)
- **Variáveis / Flags Alteradas:**
  - `v_reforco_sigmetal` (0→1)
  - `flag_sigmetal_coletado` (switch)
- **Consequências:**
  - TODOS os 3 exércitos ganham armas de Sigmetal
  - Multiplicador de +50% de dano para Guarda, Civil e Corvos
  - Balastrus cria armas anti-Ignoto em massa
  - Narrativa: Thorin prova que conhecimento (mesmo proibido) salva vidas

## Desfechos Possíveis

- **Final A (Sigmetal Coletado):** Thorin detona dinamite, abre câmara, encontra veio massivo de Sigmetal lilás — Coleta minério suficiente para armar todos (`v_reforco_sigmetal = 1`, `flag_sigmetal_coletado = ON`)
  - **Impacto Global:**
    - Dano da Guarda: ×1.5
    - Dano do Civil: ×1.5
    - Dano dos Corvos: ×1.5

- **Final B (Ignora/Não Tem Dinamite):** Câmara permanece selada — Exércitos lutam com armas convencionais, menos eficazes (`v_reforco_sigmetal = 0`)
  - **Impacto:** Todos os exércitos têm dano reduzido, batalhas finais mais difíceis

## Recompensas

- **v_reforco_sigmetal:** 0→1 (multiplicador binário)
- **Efeito Mecânico:** Multiplica dano de TODOS os exércitos por 1.5 (+50%)
- **Narrativa:**
  - Cena de Thorin e Filena maravilhados com o brilho lilás do Sigmetal
  - Balastrus em Gildrat: "Você encontrou! Com isso, temos chance de vencer!"
  - Cutscene mostrando forjas de Gildrat criando armas de Sigmetal
  - Armeiros: "Nunca vi metal que corta Ignotos assim..."

## Notas de Design

**Importância Estratégica:**

- Esta é a ÚNICA quest que afeta todos os 3 exércitos simultaneamente
- É matematicamente necessária para atingir dano máximo de 5000 HP
- Sem Sigmetal, dano máximo é ~3334 HP (Força 10 × 1667 base × 1.0)
- Com Sigmetal, dano máximo é 5000 HP (Força 10 × 1667 base × 1.5)

**Conexões Narrativas:**

- Referencia Cena 6b (proibição de Tusk sobre Sigmetal)
- Usa dinamite da Cena 10b (Balastrus)
- Resolve mistério da Cena 6e (passagem revelada por Cristaleão)
- Justifica por que Ignotos temem este minério específico

**Gatilho de Dificuldade:**
Esta quest é classificada como "Média" porque:

- Requer ter ido a Kravens (não é em Gildrat)
- Requer ter progredido até Cena 10b para ter dinamite
- Mas NÃO requer pontuação alta (qualquer jogador pode fazer)
- É acessível mas não trivial

**Impacto nos Exércitos:**

```javascript
// Sem Sigmetal (v_reforco_sigmetal = 0):
Guarda com força 10: 1667 × 2.0 × 1.0 = 3334 HP
Civil com força 10:  1667 × 2.0 × 1.0 = 3334 HP
Corvos com força 10: 1667 × 2.0 × 1.0 = 3334 HP

// Com Sigmetal (v_reforco_sigmetal = 1):
Guarda com força 10: 1667 × 2.0 × 1.5 = 5000 HP ✓
Civil com força 10:  1667 × 2.0 × 1.5 = 5000 HP ✓
Corvos com força 10: 1667 × 2.0 × 1.5 = 5000 HP ✓
```

**Recomendação de Implementação:**

- Tornar esta quest visualmente marcante (efeito de luz lilás)
- Adicionar música especial quando câmara é aberta
- Cutscene curta mas impactante da descoberta
- Diálogo de Filena reconhecendo importância histórica
- Feedback visual nas armas dos NPCs em Gildrat (brilho lilás sutil)

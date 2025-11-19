# Coletar Sigmetal na Câmara Revelada

## Identificação

- **Tipo:** Reforço em Armaduras e Armas.
- **Dificuldade:** Difícil (Requer ir à Kravens).
- **Localização:** Estrada do Cão-luar.
- **Nome Artístico:** 1/4 de Bravura, 3/4 de Idiotice!
- **Desbloqueia ao Iniciar:** 3º Andar da mina, onde o Crista-Leão foi derrotado.

## Contexto Narrativo

Quest crucial que aprofunda o arco de Valamir e a descoberta do Sigmetal como arma anti-Ignoto. Na Cena 6e, Thorin derrotou o Cristaleão que revelou uma passagem bloqueada por pedra gigante. Na Cena 10b, Valamir entregou dinamites a Thorin. Esta quest conecta esses dois momentos - Thorin usa os explosivos para abrir a câmara e descobre depósito massivo de Sigmetal, o minério lilás proibido, que é a fraqueza primária dos Ignotos.

## Gatilhos

- **NPC com a quest:** Valamir.
- **Requisitos:** N/A.
- **Gatilho:** Thorin recebe a missão quando fala com Valamir na Estrada do Cão-luar.
 **Condição para concluir:** Ir até Kravens e voltar com ao menos 10 Minérios de Sigmetal.

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Thorin (protagonista/descobridor)
  - Filena (companheira, testemunha da descoberta)
  - Valamir (diálogo posterior em Gildrat sobre importância do Sigmetal)
  - **Variáveis / Flags Alteradas:**
  - `v_reforco_sigmetal`

## Desfechos Possíveis

- **Final A (Sigmetal Coletado):** Thorin detona dinamite, abre câmara, encontra veio massivo de Sigmetal lilás — Coleta minério suficiente para armar todos.
  - **Impacto Global:**
    - Dano da Guarda: ×1.5
    - Dano do Civil: ×1.5
    - Dano dos Corvos: ×1.5

- **Final B (Ignora/Não Tem Dinamite):** Câmara permanece selada — Exércitos lutam com armas convencionais, menos eficazes.
  
## Recompensas

- N/A.

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

NPC + Trigger

- Local
  Npc + Trigger + Local que Termina a missão

  O que a missão libera quando é iniciada

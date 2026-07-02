# Estrutura Base das Cenas VN2 e VN3

## Objetivo

Cada cena VN será composta por uma sequência de tópicos obrigatórios de conversa entre Johnny e o jogador.

O objetivo não é criar uma árvore narrativa complexa, mas um funil de diálogo onde as respostas do jogador influenciam a quantidade de informação revelada por Johnny sobre seu sofrimento emocional.

Todas as rotas convergem para o próximo tópico obrigatório.

---

# Estrutura Geral da Cena

A cena é composta por 5 tópicos de conversa.

```text
Tópico 1
↓
Tópico 2
↓
Tópico 3
↓
Tópico 4
↓
Tópico 5
↓
Fim da Cena
```

Cada tópico segue exatamente a mesma estrutura.

---

# Estrutura de um Tópico

## 1. Fala Inicial do Johnny

Johnny introduz o assunto daquele tópico.

Exemplo:

- Futuro
    
- Corridas
    
- Amigos
    
- Relacionamentos
    
- Curva do Diabo
    

---

## 2. Resposta do Jogador

O jogador sempre recebe três opções.

As opções não precisam usar exatamente as mesmas palavras, mas devem representar uma destas três posturas:

### A. Incentivar comportamento de risco

O jogador reforça impulsividade, fuga, negação ou atitudes perigosas.

### B. Minimizar o problema

O jogador ignora sinais emocionais, muda de assunto ou trata a questão como algo sem importância.

### C. Escutar ativamente

O jogador demonstra curiosidade genuína, acolhimento e interesse pelo que Johnny está sentindo.

---

## 3. Resposta do Johnny

A resposta de Johnny depende da postura escolhida.

### Se o jogador escolheu A ou B

Johnny mantém a máscara.

- Faz piadas.
    
- Muda de assunto.
    
- Responde superficialmente.
    
- Não revela informações importantes.
    

O diálogo segue para o próximo tópico.

### Se o jogador escolheu C

Johnny baixa parcialmente a guarda.

- Compartilha uma preocupação.
    
- Revela uma pista.
    
- Faz uma confissão indireta.
    
- Demonstra vulnerabilidade.
    

O diálogo segue para o próximo tópico.

---

## 4. Próximo Tópico Obrigatório

Independentemente da escolha, a conversa converge para o próximo tópico.

Não existem ramificações permanentes.

O objetivo é controlar escopo e manter a narrativa compacta para a Game Jam.

---

# Sistema de Revelação

A lógica é baseada apenas em caminhos narrativos.

Escolhas de escuta ativa liberam informações.

Escolhas de risco ou minimização ocultam informações.

O jogador não acumula pontos. O jogador acumula conhecimento.

---

# Possibilidade de Reconsideração

Opcional para testes futuros.

Em momentos específicos da conversa, pode surgir a opção: 
"Espera. O que você quis dizer com isso?"

ou

"Pensando melhor..."

Essa opção permite retornar ao tópico anterior e selecionar uma resposta diferente.

Objetivos possíveis:

- Dar sensação de reflexão.
    
- Simular arrependimento.
    
- Reforçar o tema de perceber sinais tarde demais.
    

A implementação desta mecânica será avaliada posteriormente.

---

# Estrutura Esperada para Cada Cena

## Cena VN2 — Quarto

Objetivo:  
Criar suspeita.

Estado emocional:  
Primeiras rachaduras.

Função:  
Mostrar que algo está errado.

---

## Cena VN3 — Beira da Estrada

Objetivo:  
Revelação.

Estado emocional:  
Calma estranha e fatalismo.

Função:  
Permitir que o jogador descubra o plano de Johnny.

---

# Template de Produção

TÓPICO X

Fala inicial do Johnny

↓

Resposta A  
(Incentiva risco)

↓

Resposta de Johnny

OU

↓

Resposta B  
(Minimiza)

↓

Resposta de Johnny

OU

↓

Resposta C  
(Escuta ativamente)

↓

Resposta de Johnny com revelação de pista

↓

Próximo tópico obrigatório
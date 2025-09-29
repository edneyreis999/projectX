# Controle de Estados da Variável `state_EntradaKravens`

Este documento detalha os estados da variável `state_EntradaKravens`, descrevendo os eventos que causam a transição entre estados, o contexto e os locais envolvidos.

---

## Estado 0

**Descrição**: O player acaba de chegar na entrada da Mina de Kravens.  
**Troca para o Estado 1**:  

- **Evento**: Guarda - Início da cena
- **Aba**: 1  
- **Map ID**: 30  

---

## Estado 1

**Descrição**: O guarda termina de verificar o documento de Thorin.  
**Troca para o Estado 2**:

- **Evento**: Tusk  
- **Aba**: 1  
- **Map ID**: 30  

---

## Estado 2

**Descrição**: Thorin termina de falar com Tusk, que entra na barraca dele. Agora Thorin deve falar com os guardas.  
**Troca para o Estado 3**:

- **Evento**: Kilin  
- **Aba**: 3  
- **Map ID**: 30  

---

## Estado 3

**Descrição**: Thorin termina de falar com os guardas e acaba de jantar.  
**Troca para o Estado 4**:  

- **Evento**: Cama  
- **Aba**: 1  
- **Map ID**: 31 (A tenda do Thorin)  

---

## Estado 4

**Descrição**: Thorin vai dormir e sonha com a mãe.  
**Troca para o Estado 5**:  

- **Evento**: Melia  
- **Aba**: 1  
- **Map ID**: 31 (A tenda do Thorin)  

---

## Estado 5

**Descrição**: Thorin acorda, e Tusk entra na sua barraca dizendo que está na hora de começar a trabalhar.  
**Troca para o Estado 6**:  

- **Evento**: Tusk  
- **Aba**: 1  
- **Map ID**: 33 (Mina de Kravens)  

---

## Estado 6

**Descrição**: Thorin recebe a missão de minerar 9 minérios de Kraven.  
**Troca para o Estado 7**:  

- **Evento**: Transfer (Mina de Kravens 1F)  
- **Aba**: 2  
- **Map ID**: 33 (Mina de Kravens)  

---

## Estado 7

**Descrição**: Kilin, Mhordred e Tharok chegam atrasados, mas acabam entrando no grupo de Thorin. Eles entram no 1F da Mina de Kravens para minerar os minérios de Kraven.  
**Troca para o Estado 8**:  

- **Evento**: Tusk  
- **Aba**: 3  
- **Map ID**: 33 (Mina de Kravens)  

---

## Estado 8

**Descrição**: Thorin fala com Tusk depois de encontrar o minério de Sigmetal.  
**Troca para o Estado 9**:  

- **Evento**: Tusk  
- **Aba**: 5  
- **Map ID**: 30 (Clareira da Mina de Kravens)  

---

## Estado 9

**Descrição**: Thorin e seus guardas estão prontos para viajar de volta a Gildrat.  
**Troca para o Estado 10**:  

- **Evento**: ???  
- **Aba**: ??  
- **Map ID**: ??

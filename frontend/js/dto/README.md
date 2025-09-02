# DTOs - Data Transfer Objects

Esta pasta contém os DTOs (Data Transfer Objects) para a comunicação entre as camadas Use Case e Domain.

## Arquivos

- `MineracaoRequestDTO.js` - DTO para dados de entrada da mineração
- `MineracaoResponseDTO.js` - DTO para dados de saída da mineração

## Ordem de Carregamento no RPG Maker MZ

**IMPORTANTE**: Para funcionar corretamente no RPG Maker MZ, os scripts devem ser carregados na seguinte ordem:

1. `MineracaoRequestDTO.js` (primeiro)
2. `MineracaoResponseDTO.js` (segundo)
3. `MinaKravensDomain.js` (terceiro)
4. `MineracaoUseCase.js` (quarto)

## Exemplo de uso

```javascript
// Criar um request DTO
const request = new MineracaoRequestDTO({
  kravensJaColetados: 2,
  pilhasJaMineradas: 3,
  rachaduraJaAtivada: false
});

// Executar mineração
const domain = new MinaKravensDomain(5, 10);
const response = domain.executarMineracao(request);

// Usar métodos do response DTO
if (response.isKraven()) {
  console.log('Coletou um Kraven!');
}

if (response.shouldActivateCrack()) {
  console.log('Ativar rachadura!');
}
```

## Validação

Os DTOs incluem validação automática:

```javascript
// Isso gerará erro
const invalidRequest = new MineracaoRequestDTO({
  kravensJaColetados: -1,  // Erro: deve ser não negativo
  pilhasJaMineradas: 'abc', // Erro: deve ser número
  rachaduraJaAtivada: 'sim' // Erro: deve ser boolean
});
```
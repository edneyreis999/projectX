# Plano — Migrar DTOs para Interfaces TypeScript (sem runtime)

Objetivo: transformar os DTOs em interfaces TypeScript (apenas tipos), mover TODAS as validações para o Domain e adaptar Use Case/Plugin/Testes para não depender de classes de DTO em runtime. Garantir todos os testes passando e o jogo rodando no NW.js.

## Contexto atual

- DTOs existem como classes (`MineracaoRequestDTO`, `MineracaoResponseDTO`) e são carregadas via `<script>` pelo plugin.
- Domain/Use Case usam essas classes e métodos utilitários dos DTOs.
- Após a migração, interfaces não geram JS; logo, o runtime não deve depender de DTOs.

## Tarefas

1) Definir interfaces de tipos para DTOs

- Criar `frontend/js/dto/types.ts` com:
  - `export interface MineracaoRequest { kravensJaColetados: number; pilhasJaMineradas: number; rachaduraJaAtivada: boolean; }`
  - `export type TipoMineracao = 'Kraven' | 'Pedra'`
  - `export interface MineracaoResponse { tipo: TipoMineracao; questCompleta: boolean; deveAtivarRachadura: boolean; pilhasRestantes: number; kravensColetados: number; chanceCalculada: number; }`
- Não usar `export` nos arquivos compilados para o browser. Para evitar `exports` no JS final, colocar as interfaces num `.ts` usado apenas por tipos com `import type` e sem importações em arquivos que emitem.

1) Refatorar Domain para usar interfaces e validar

- Alterar assinatura: `executarMineracao(request: MineracaoRequest): MineracaoResponse`.
- Remover dependência de classes/`instanceof`/fábricas de DTO.
- Implementar validação interna do Domain (substitui validações dos DTOs):
  - `kravensJaColetados` e `pilhasJaMineradas` devem ser números ≥ 0.
  - `rachaduraJaAtivada` deve ser boolean.
  - Ao construir a resposta, validar: `tipo` ∈ {'Kraven','Pedra'}, `chanceCalculada` ∈ [0,100], `pilhasRestantes` numérico ≥ 0, etc.
  - Preservar mensagens de erro que os testes esperam (ex: "kravensJaColetados deve ser um número não negativo", "tipo deve ser \"Kraven\" ou \"Pedra\"").
- Substituir chamadas a métodos de DTO (ex.: `isQuestComplete`, `shouldActivateCrack`, `getStats`) por:
  - Funções do Domain (ex.: `isQuestCompleta`, `shouldAtivarRachadura`) e/ou acesso direto às propriedades do `MineracaoResponse`.
- Remover resoluções de DTO no Domain (ex.: `resolveDomainDTOs()`), já que o Domain não deve mais importar/depender de DTOs em runtime.

3) Refatorar Use Case para interfaces

- Construir o request como objeto literal `MineracaoRequest` (sem `new`):
  - `{ kravensJaColetados, pilhasJaMineradas, rachaduraJaAtivada }`.
- Adequar o processamento do resultado usando apenas propriedades do `MineracaoResponse`:
  - Ex.: `resultado.tipo === 'Kraven'` (no lugar de `resultado.isKraven()`), `resultado.deveAtivarRachadura` (no lugar de `shouldActivateCrack()`), `resultado.questCompleta` (no lugar de `isQuestComplete()`), `resultado.kravensColetados` e `resultado.pilhasRestantes` (no lugar de `getStats()`).
- Remover qualquer fallback/carga dinâmica de DTOs no Use Case (ex.: `resolveUseCaseDTOs`).

4) Fase de compatibilidade do plugin (temporária)

- Atualizar `frontend/js/plugins/Coreto_Quest_Mina_Kravens.js` para não carregar os scripts de DTO:
  - Remover as entradas de `loadScript('./js/dto/MineracaoRequestDTO.js')` e `MineracaoResponseDTO.js`.
  - Manter apenas o carregamento de Domain e Use Case.
- Caso precise manter temporariamente, substituir o carregamento por no-ops (scripts vazios) até finalizar a refatoração.

5) Atualizar/Unificar testes

- Remover instâncias `new MineracaoRequestDTO(...)` e `new MineracaoResponseDTO(...)` dos testes.
- Criar objetos literais conforme as interfaces. Ex.: `const req: MineracaoRequest = { ... }`.
- Migrar asserções das DTOs para os testes do Domain:
  - As mensagens de erro de validação agora são responsabilidade do Domain (input e output), então cobrir esses casos nas suítes do Domain.
- Atualizar testes do Use Case para usar apenas propriedades do response (sem métodos dos DTOs).

6) Limpeza dos arquivos antigos de DTO

- Converter os arquivos `.ts` de DTO atuais em um de dois caminhos:
  - (a) Apagar os arquivos de classes e manter apenas `types.ts` (sem emissão JS), já que o runtime não precisa mais deles.
- Garantir que o plugin não tente mais carregar os `.js` de DTO após a refatoração.

1) Ajustes de configuração

- garantir que o `tsconfig.domain-dto.json`/`tsconfig.application.json` inclui os caminhos para tipos.
- Se necessário, usar `import type` nos arquivos TS para consumir os tipos sem emitir imports no JS final.

1) Validar e concluir

- Rodar `npm run build:types && npm run build:app-types`.
- Rodar `npm test` e corrigir eventuais quebras até 0 falhas.
- Rodar `npm run debug:ts-all` e validar o jogo (sem erros no console do NW.js).

## Critérios de Aceite

- Nenhuma dependência de classes de DTO no runtime (Domain/Use Case/Plugin).
- `npm test` com 0 falhas; mensagens de validação preservadas no Domain.
- `npm run debug:ts-all` funciona sem erros de carregamento de DTOs.

## Riscos e Mitigações

- Risco: testes dependem de métodos dos DTOs. Mitigar substituindo por asserções em propriedades e helpers do Domain.
- Risco: importações de tipos gerarem código JS. Mitigar usando `import type`.
- Risco: plugin ainda carregar scripts de DTO. Mitigar removendo cargas e validando ordem (Domain → Use Case).

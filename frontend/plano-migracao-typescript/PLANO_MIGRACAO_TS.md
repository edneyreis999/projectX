# Plano de Migração para TypeScript — Domain e DTO

Este plano descreve como migrar apenas os módulos desacoplados da engine (camadas `domain` e `dto`) para TypeScript, mantendo o restante da engine em JavaScript. A estratégia é incremental, com baixo risco, e compatível com o fluxo atual de runtime do RPG Maker MZ/NW.js e com a suíte de testes via Jest + SWC.

## Escopo e Objetivos

- Escopo: migrar `frontend/js/domain` e `frontend/js/dto` para TypeScript.
- Fora de escopo: engine do RPG Maker (`rmmz_*`), `plugins` e `application` (por ora permanecem em JS).
- Objetivo: tipagem forte para regras de negócio e contratos (DTOs), mantendo a compatibilidade do runtime (scripts carregados via `<script>` e `plugins.js`).

## Referências

- Projeto de referência: Rpg-Maker-MZ-Typescript
  - GitHub: <https://github.com/niokasgami/Rpg-Maker-MZ-Typescript>
  - Discussão: <https://forums.rpgmakerweb.com/index.php?threads/rpg-maker-mz-typescript-edition.124983/>
- Observação: diferente do projeto de referência, não converteremos toda a engine; migraremos somente o que é desacoplado (Domain/DTO).

## Estratégia Técnica

- Arquitetura atual preservada: arquivos permanecem em `frontend/js/{domain,dto}`; o plugin carrega `./js/dto/*.js` e `./js/domain/*.js` dinamicamente (ver `Coreto_Quest_Mina_Kravens.js`).
- Compilação side-by-side: arquivos `.ts` serão compilados para `.js` no mesmo diretório, mantendo os nomes e caminhos esperados pelo runtime (sem alterar `index.html` nem `plugins.js`).
- Compatibilidade Node/Browser: manter o padrão atual de export global (atribuir em `window.*`) e `module.exports` para Node/testes.
- Testes continuam a rodar com Jest + `@swc/jest` (já configurado para `.ts`).

## Alterações de Configuração (propostas)

1) Criar `tsconfig.domain-dto.json` para compilar apenas Domain/DTO:

```jsonc
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",        // Mantém require/module.exports nos testes
    "strict": true,                // Tipagem forte onde fizer sentido
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "declaration": true,          // Gera .d.ts para melhor DX
    "noEmitOnError": true,
    // Sem outDir: emite .js ao lado do .ts (side-by-side)
    // Importante: manter allowJs para não forçar conversão do resto da codebase
    "allowJs": true
  },
  "include": [
    "frontend/js/domain/**/*.ts",
    "frontend/js/dto/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "frontend/js/plugins",
    "frontend/js/application"
  ]
}
```

2) Scripts npm (no `package.json` raiz):

- `build:types`: `tsc -p tsconfig.domain-dto.json`
- `watch:types`: `tsc -p tsconfig.domain-dto.json -w`
- `debug:ts`: `npm run build:types && npm run debug`

Obs.: não é necessário alterar `jest.config.ts`; ele já transforma `.ts` com `@swc/jest`.

## Padrão de Código em TS (Domain/DTO)

- Nome de arquivos: manter `camelCase` (ex.: `MineracaoResponseDTO.ts`).
- Export/Global:
  - Escrever classes normalmente em TS e, ao final, expor explicitamente para Node/Browser como hoje:

```ts
declare const window: any; // apenas para TS saber do global
// class MineracaoResponseDTO { ... }
if (typeof module !== 'undefined' && (module as any).exports) {
  (module as any).exports = MineracaoResponseDTO;
} else if (typeof window !== 'undefined') {
  window.MineracaoResponseDTO = MineracaoResponseDTO;
}
```

- Tipos e contratos:
  - Em `DTOs`: representar contratos com tipos/`type` e `readonly` onde fizer sentido.
  - Em `Domain`: parametrizar entradas/saídas com os tipos dos DTOs; substituir validações fracas por type guards quando aplicável.
- Evitar dependência da engine: Domain/DTO continuam puros, sem acessar APIs do RPG Maker.

## Roteiro de Migração (Fases)

Fase 0 — Preparação

- Adicionar `tsconfig.domain-dto.json` e scripts npm propostos.
- Rodar `npm run build:types` para validar emissão side-by-side.

Fase 1 — Migrar DTOs

- Converter `frontend/js/dto/MineracaoRequestDTO.js` -> `MineracaoRequestDTO.ts`.
  - Tipar propriedades, construtor e métodos utilitários (`toPlainObject`, `isValid`, etc.).
  - Manter validação de dados de runtime onde necessário.
- Converter `frontend/js/dto/MineracaoResponseDTO.js` -> `MineracaoResponseDTO.ts`.
  - Tipar o discriminante `tipo: 'Kraven' | 'Pedra'` e helpers (`isKraven`, `getStats`, etc.).
- Expor globals (Node/Browser) conforme padrão acima.
- Rodar testes e `npm run debug:ts` para smoke test in-game.

Fase 2 — Migrar Domain

- Converter `frontend/js/domain/MinaKravensDomain.js` -> `MinaKravensDomain.ts`.
  - Tipar parâmetros do construtor e métodos (`executarMineracao`, `calcularChanceKraven`, etc.).
  - Avaliar substituição de `instanceof MineracaoRequestDTO` por type guard estrutural para evitar edge cases entre ambientes; exemplo:

```ts
function isMineracaoRequestDTO(x: any): x is MineracaoRequestDTO {
  return x && typeof x.kravensJaColetados === 'number' && typeof x.pilhasJaMineradas === 'number';
}
```

- Manter o wrapper de export global.
- Rodar testes e `npm run debug:ts`.

Fase 3 — Limpezas e Garantias

- Garantir cobertura mínima dos DTOs/Domain (testes já existentes devem continuar verdes).
- Adicionar `frontend/js/**/**.d.ts` ao `.gitignore` se decidirmos não versionar declarações.
- Documentar no README como usar `debug:ts`/`watch:types` durante desenvolvimento.

## Critérios de Aceite

- `npm test` passa com cobertura estável ou maior.
- `npm run debug:ts` inicia o jogo e o plugin continua carregando `./js/dto/*.js` e `./js/domain/*.js` sem alterações em `index.html`.
- Sem regressões de comportamento na mineração (resultados/variáveis/rachadura).
- Tipos dos DTOs e Domain claros e úteis (melhor orientação durante manutenção).

## Riscos e Mitigações

- UMD/CommonJS no Browser: evitar `import/export` nativos de ES Modules nestes arquivos, mantendo o padrão de atribuição explícita a `window` e `module.exports` para compatibilidade.
- `instanceof` entre ambientes: preferir type guards estruturais no Domain (ver Fase 2) para não depender da mesma referência de classe.
- Arquivos `.js` gerados ao lado dos `.ts`: manter o fluxo side-by-side para runtime, e considerar ignorar `.d.ts`/`.map` se gerados.

## Divisão de PRs (sugestão)

1. Infra: `tsconfig.domain-dto.json` + scripts npm.
2. DTOs: migração + testes verdes.
3. Domain: migração + testes verdes.
4. Docs: README e limpeza/ignores.

## Dicas Práticas

- Durante dev: `npm run watch:types` em um terminal e `npm run debug` em outro.
- Validar sempre o carregamento dinâmico no plugin `Coreto_Quest_Mina_Kravens.js` (ordem: DTOs → Domain → UseCase).
- Considerar futuramente tipar a camada `application` com interfaces para serviços (Core/Quest), sem tocar na engine.

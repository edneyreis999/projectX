# Plano: Resolver Erro "Unexpected token 'export'" no `npm run debug:ts`

## **Diagnóstico do Problema**

### Sintoma

```
SyntaxError
Unexpected token 'export'
```

Ao executar `npm run debug:ts`

### Análise da Causa Raiz

**Comando afetado**: `npm run debug:ts` executa:

1. `npm run build:types` (compila `tsconfig.domain-dto.json`)
2. `npm run build:app-types` (compila `tsconfig.application.json`)
3. `npm run debug` (executa NW.js)

**Problema identificado**:

- Arquivos `frontend/js/dto/MineracaoRequestDTO.js` e `MineracaoResponseDTO.js` contêm `export {};` (linha 5)
- NW.js carrega scripts via `<script>` tags sem bundler
- Ambiente browser não reconhece `export` sem módulos ES6

**Evidência confirmada**:

```bash
# Arquivos problemáticos encontrados:
frontend/js/dto/MineracaoRequestDTO.js:5    export {};
frontend/js/dto/MineracaoResponseDTO.js:5   export {};
```

## **Estratégia de Correção**

### **Task 1 — Eliminar exports dos arquivos DTO**

**Objetivo**: Remover `export {}` dos arquivos JavaScript compilados dos DTOs

**Ação**:

```bash
# Remover linha "export {};" dos arquivos:
frontend/js/dto/MineracaoRequestDTO.js
frontend/js/dto/MineracaoResponseDTO.js
```

**Resultado esperado**: Arquivos JS não terão sintaxe de módulo

### **Task 2 — Verificar arquivos TypeScript source**

**Objetivo**: Identificar se há `export` residual nos arquivos `.ts` que causam o TypeScript a emitir como módulo

**Verificar**:

```bash
rg -n "export" frontend/js/dto/*.ts
rg -n "import" frontend/js/dto/*.ts
```

**Ação se encontrar exports**:

- Remover `export {}` ou qualquer `export`/`import` dos arquivos `.ts`
- DTOs devem ser apenas interfaces/tipos globais

### **Task 3 — Ajustar configuração TypeScript**

**Objetivo**: Garantir que TypeScript não trate arquivos como módulos

**Verificar em `tsconfig.domain-dto.json`**:

```json
{
  "compilerOptions": {
    "module": "esnext",           // ou "none" se persistir problema
    "moduleDetection": "legacy",  // força detecção legacy
    "esModuleInterop": false      // desabilita interop ESM
  }
}
```

**Alternativa**: Se arquivos não têm `import`/`export`, usar `"module": "none"`

### **Task 4 — Rebuild limpo**

**Objetivo**: Recompilar tudo sem cache

**Comandos**:

```bash
# Limpar caches incrementais
rm -f tsconfig.domain-dto.tsbuildinfo
rm -f tsconfig.application.tsbuildinfo

# Recompilar
npm run build:types
npm run build:app-types

# Verificar que não há exports
rg -n "export" frontend/js/dto/*.js frontend/js/domain/*.js frontend/js/application/*.js
```

**Resultado esperado**: Nenhum `export` em arquivos compilados

### **Task 5 — Validação final**

**Objetivo**: Confirmar que o erro foi resolvido

**Teste**:

```bash
npm run debug:ts
```

**Resultado esperado**:

- ✅ NW.js abre sem erro de `export`
- ✅ Scripts carregam normalmente via `<script>` tags
- ⚠️ Avisos de `app.nw` em modo unpacked são normais e podem ser ignorados

## **Prevenção Futura**

### **Regras para evitar recorrência**

1. **DTOs como interfaces globais**:
   - Usar apenas `interface` e `type` em `.d.ts`
   - Nunca usar `export`/`import` em arquivos carregados via `<script>`

2. **Arquivos Domain/Application**:
   - IIFE com attach global: `globalThis.MinhaClasse = MinhaClasse`
   - Compatibilidade Node: `if (typeof module !== 'undefined') module.exports = MinhaClasse`
   - Nunca usar `export`/`import`

3. **Configuração TypeScript**:
   - Manter `"moduleDetection": "legacy"` para evitar auto-detecção de módulo
   - Usar `"module": "esnext"` ou `"none"` conforme necessário

## **Lições Aprendidas**

- **RPG Maker MZ/NW.js**: Ambiente sem bundler exige cuidado com sintaxe de módulos
- **TypeScript**: `export {}` força emissão como módulo mesmo sem exports reais
- **Solução**: Clean Architecture funciona bem com IIFE + globals para compatibility

## **Referências**

- `PLANO_CORRECAO_EXPORTS_NW.md` - Estratégia original para compatibilidade NW.js
- `DIAGNOSTICO_EXPORTS_E_TESTES.md` - Análise detalhada do problema
- `PLANO_CORRECAO_EXPORTS_E_TESTES.md` - Tasks de correção sistêmica

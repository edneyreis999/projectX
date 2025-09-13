# Plano: Corrigir erro "ReferenceError: exports is not defined" no NW.js

## Contexto

- Ao rodar `npm run debug`, o NW.js carrega os scripts de `frontend/js` diretamente via `<script>`, sem bundler.
- Após migrar Domain/DTO para TypeScript, os arquivos compilados passaram a conter trechos CommonJS como `Object.defineProperty(exports, "__esModule", ...)` e `exports.default = ...` — isso ocorre quando o arquivo `.ts` contém `export`/`export default`.
- Em ambiente browser puro, a variável `exports` não existe, gerando o erro: `ReferenceError: exports is not defined`.

## Causa Raiz

- Os arquivos `.ts` de Domain/DTO foram tratados como módulos (module files) por conter `export`/`export default`, levando o TypeScript a emitir código CommonJS para `exports`.

## Objetivo

- Manter compatibilidade dupla:
  - Node/Jest: `require()` + `module.exports` para testes.
  - Browser/NW.js: expor as classes em `globalThis` (antigo `window`) e carregar via `<script>`.

## Estratégia de Correção

1) Remover exportações de módulo dos `.ts` (Domain/DTO)

- Eliminar `export default` e `export` (inclusive `export type`) dos arquivos TS.
- Manter a exposição manual no final do arquivo, com fallback para Node/Browser:

```
// No final do arquivo .ts
if ((globalThis as any) && (globalThis as any).module && (globalThis as any).module.exports) {
  (globalThis as any).module.exports = MinhaClasse;
} else {
  (globalThis as any).MinhaClasse = MinhaClasse;
}
```

2) Usar `globalThis` em vez de `window`/`module` declarados

- Evita conflitos de declaração TS e funciona tanto em Node quanto Browser.
- Exemplo de acesso seguro: `(globalThis as any).MineracaoRequestDTO`.

3) Compilação side‑by‑side (já configurado)

- `tsconfig.domain-dto.json` compila para `frontend/js` (mesmo diretório), preservando os caminhos esperados pelo runtime e pelo plugin.
- Não é necessário alterar `index.html` nem `plugins.js`.

4) Validar

- Recompilar: `npm run build:types`.
- Testar Node/Jest: `npm test` (esperado: verde).
- Testar NW.js: `npm run debug` (erro de `exports` deixa de ocorrer; logs do NW sobre `app.nw` são aviso normal em modo “unpacked”).

## Checklist de Regressão

- Ordem de carregamento no plugin: DTOs → Domain → Use Case (confirmado).
- Nenhum `const` global compartilhado entre arquivos TS (evitar colisões); preferir `globalThis` inline.
- Mensagens de erro dos DTOs preservadas (compatíveis com testes).

## Próximos Passos

- Deixar `npm run watch:types` ativo durante a depuração no NW.js.
- Se surgirem novos módulos TS, repetir o padrão: sem `export` e com exposição via `globalThis` + `module.exports` no final do arquivo.

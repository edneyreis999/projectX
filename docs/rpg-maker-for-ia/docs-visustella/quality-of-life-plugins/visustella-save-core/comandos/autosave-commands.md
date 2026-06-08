# Autosave Plugin Commands

## Visão Geral

Os comandos de autosave operam em três estágios com níveis crescentes de força. Todos requerem **Database → System 1 → [x] Enable Autosave** habilitado.

## Comandos

### Autosave: Enable/Disable

- **Função**: Habilitar ou desabilitar autosave na sessão local
- **Escopo**: Aplica-se SOMENTE à sessão local atual. Não afeta outros saves ou new games.
- **Parâmetros**:
  - `Enable or Disable?` — Habilitar ou desabilitar?

---

### Autosave: (Stage 1) Request

- **Função**: Solicita autosave no ponto atual se habilitado
- **Respeita Enable/Disable**: Sim
- **Respeita Options Menu**: Sim (não autosave se o jogador desativou)
- **Comportamento**: Autosave só ocorre se habilitado no Database E via plugin command E no Options Menu

---

### Autosave: (Stage 2) Execute

- **Função**: Executa autosave no ponto atual
- **Respeita Enable/Disable**: Não (ignora estado do "Autosave: Enable/Disable")
- **Respeita Options Menu**: Sim (não autosave se o jogador desativou)
- **Comportamento**: Exige autosave habilitado no Database, mas ignora o plugin command de enable/disable

---

### Autosave: (Stage 3) Force

- **Função**: Força autosave no ponto atual
- **Respeita Enable/Disable**: Não
- **Respeita Options Menu**: Não
- **Comportamento**: Exige autosave habilitado no Database, ignora tudo o mais

## Tabela Resumo

| Command | Database | Enable/Disable | Options Menu |
|---|---|---|---|
| Request | Requer | Respeita | Respeita |
| Execute | Requer | Ignora | Respeita |
| Force | Requer | Ignora | Ignora |

## Fluxo de Decisão

```
Precisa autosave?
│
├── Jogador pode ter desativado? → Use Request (Stage 1)
│
├── Quer ignorar plugin command mas respeitar jogador? → Use Execute (Stage 2)
│
└── Precisa forçar de qualquer forma? → Use Force (Stage 3)
```

## Relacionado

- [Save Commands](save-commands.md)
- [Autosave Settings](../configuracao/autosave-settings.md)
- [Confirm Window Settings](../configuracao/confirm-window-settings.md)

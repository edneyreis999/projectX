# Sumário executivo

## Veredito

O pacote 012 produziu contratos, regressões e um writer úteis, mas também
acumulou evidência autorreferente, hashes opacos e tooling distante da quest.
A demanda 013 preserva a parte verificável e remove as superfícies que poderiam
ficar stale com aparência de rigor.

O estado atual sustenta apenas `authoring_integrity`. Runtime, percepção,
aceite humano e release continuam fora dessa alegação.

## Superfície atual

- Contratos: `docs/Quests/2-semifinal/*.md`.
- Descoberta: `docs/Quests/2-semifinal/quest-tooling.json`.
- Writer, validador e manifesto de assets:
  `docs/Quests/2-semifinal/tooling`.
- Gate compartilhado: `config/validation-impact-map.json` e
  `scripts/validation-impact.js`.
- Snapshot staged: `scripts/validate-staged.js`.
- CI: `.github/workflows/authoring-integrity.yml`.
- Tasks 010/011: somente proveniência histórica, sem dependência de execução.

Foram removidos o pseudo-writer narrativo, inventários e snapshots derivados
sem consumidor real, o subsistema órfão de evidência e campos de aprovação
humana do manifesto de assets.

## Garantias e limites

O gate bloqueia target protegido sem regra, materialização sem writer,
divergência do writer, check vermelho e check que modifica o checkout. Um
resultado verde comprova somente as invariantes realmente implementadas pelos
checks atuais.

O manifesto de assets permanece porque valida arquivos consumidos pelo jogo:
existência, case, formato PNG, dimensões, alpha, checksum e referências
declaradas. O checksum prova identidade de bytes, não qualidade visual.

## Próximos passos

1. Configurar `Authoring integrity` como required check nas branches protegidas.
2. Executar o gate no snapshot final desta mudança.
3. Conduzir playtest e revisões perceptivas separadamente quando o critério
   exigir julgamento.
4. Ampliar manifestos e checks somente junto de um consumidor e de uma falha
   que eles consigam detectar deterministicamente.

## Navegação

- [HANDOFF.md](HANDOFF.md): comandos e diagnóstico atuais.
- [POST-MORTEM.md](POST-MORTEM.md): histórico e causas.
- [LEARNINGS.md](LEARNINGS.md): aprendizados reutilizáveis.
- [FRAMEWORK-GAPS.md](FRAMEWORK-GAPS.md): lacunas restantes.
- [CHECKLIST.md](CHECKLIST.md): registro do ciclo anterior.

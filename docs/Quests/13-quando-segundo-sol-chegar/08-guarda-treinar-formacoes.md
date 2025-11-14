# Treinar Formações de Combate

## Identificação

- **Tipo:** Reforço Exército Guarda de Ferro
- **Dificuldade:** Fácil (Soft Core)
- **Localização:** Gildrat (campo de treinamento)

## Contexto Narrativo

Quest que aprofunda o papel de Thorin como instrutor e líder. A Guarda de Ferro precisa aprender táticas específicas anti-Ignoto baseadas no conhecimento que Thorin adquiriu em combate real em Kravens e Melios. Esta quest mostra Thorin ensinando outros, consolidando sua experiência e liderança. Se Kilin já foi resgatado, ele co-lidera o treinamento, criando um momento de mentoria invertida.

## Gatilhos

- **Condições de início:** Completar "Organizar Logística Militar"
- **Requisitos:** `flag_logistica_organizada = ON`

## Estrutura Sistêmica

- **Atores Envolvidos:**
  - Thorin (protagonista/instrutor)
  - Guardas recrutas (NPCs)
  - Kilin (se resgatado - co-instrutor)
- **Variáveis / Flags Alteradas:**
  - `v_forca_guarda`
  - `flag_formacoes_treinadas` (switch)
- **Consequências:**
  - Guarda aprende táticas anti-Ignoto
  - Boost adicional se Kilin estiver presente

## Desfechos Possíveis

- **Final A (com Kilin):** Thorin e Kilin treinam a Guarda em formações de cerco e contra-ataque — Sinergia perfeita (`v_forca_guarda + 25`, `flag_formacoes_treinadas = ON`)
- **Final B (sem Kilin):** Thorin treina sozinho — Eficiente mas sem a experiência de Kilin (`v_forca_guarda + 20`, `flag_formacoes_treinadas = ON`)
- **Final C (Ignora):** Guarda usa táticas padrão, menos eficaz contra Ignotos

## Recompensas

- **v_forca_guarda:** +20-25 pontos (20-25% do total de 100, dependendo de Kilin)
- **Narrativa:** Cena de Thorin ensinando e sendo reconhecido como líder nato

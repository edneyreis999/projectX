# Compatibilidade com VisuStella MZ

---

## Battle Core VisuStella MZ

### Damage/Healing Multiplier Vocabulary

Se o Battle Core estiver instalado, alterar "Damage Multiplier" ou "Healing Multiplier" do Shop Status Window **NÃO** é feito nos Plugin Parameters do Items & Equips Core.

Em vez disso, ir em:
> Battle Core > Plugin Parameters > Damage Settings > Damage Styles > ajustar "Damage Multiplier" ou "Healing Multiplier" do style

**Por quê?** Nem todos os damage styles funcionam com "Multipliers", então cada style tem seu próprio vocabulário para ser mais preciso.

O Items & Equips Core deve ter um lembrete na descrição do parâmetro sobre isso.

---

## Weapon Swap System VisuStella MZ

O recurso de custom equip slots do Items & Equips Core permitia adicionar slots extras de arma. Agora está limitado a **máximo de um weapon slot por personagem**. Isso é necessário para o Weapon Swap System funcionar.

Armas **não podem** ser amaldiçoadas (`<Cursed>`) se o Weapon Swap System estiver instalado, para permitir livre troca de armas.

---

## Veja Também

- [notetags/equipment.md](../notetags/equipment.md) - Notetag `<Cursed>`
- [extension-plugins.md](extension-plugins.md) - Plugins de extensão

# Compatibilidade - VisuStella MZ

## Visão Geral

Embora este plugin seja compatível com a maioria da biblioteca de plugins VisuStella MZ, não é compatível com plugins específicos ou recursos específicos. Esta seção destaca os principais plugins/features que não serão compatíveis com este plugin ou foca em como tornar certos recursos compatíveis.

---

## VisuMZ_3_StateTooltips

### Compatibilidade

Se você está usando um **Dragonbones Battler** e quer aplicar um state tooltip a ele, a área de acesso do battler será baseada no **tamanho do hitbox** que você declarar para o Dragonbones Battler com notetags.

### Motivo

Todos os battlers Dragonbones **não têm tamanhos de hitbox calculados automaticamente** como resultado de sua natureza animada dinamicamente.

### Solução

Consulte a seção de notetags do plugin Dragonbones Union para **Dragonbones Battler hitboxes** para aprender como aplicar tamanhos de hitbox.

### Notetags Relacionados

```
<Dragonbones Battler Size: width, height>
<Dragonbones Battler Width: x>
<Dragonbones Battler Height: x>
```

---

## Links Relacionados

- [Notetags Battler](../notetags/battlers.md) - Notetags para Battlers
- [Battler Settings](../configuracao/battler-settings.md) - Configurações de Battler

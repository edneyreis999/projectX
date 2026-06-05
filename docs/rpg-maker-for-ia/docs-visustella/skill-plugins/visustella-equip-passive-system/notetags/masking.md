# Notetags - Masking

Notetags que controlam como passivos **não aprendidos** aparecem na lista (mascarados vs revelados).

## Override de Masking

```xml
<!-- Forçar mascaramento (override: sim) -->
<Mask If Not Learned Equip Passive>

<!-- Forçar NÃO mascaramento (override: não) -->
<No Mask If Not Learned Equip Passive>
```
- State Notetags
- Bypassa a configuração global de masking do Plugin Parameter
- Útil para passivos específicos que devem sempre ser visíveis ou ocultos

## Nome de Máscara Customizado

```xml
<Equip Passive Mask Name: name>
```
- State Notetag
- Em vez de exibir `?` como nome mascarado, usa o texto customizado
- Exemplo: `<Equip Passive Mask Name: ??? Habilidade Secreta>`

## Configuração Global (Plugin Parameters)

O masking padrão é controlado por Plugin Parameters em **Window Settings**:

| Parâmetro | Descrição |
|-----------|-----------|
| Show Unlearned? | Mostra passivos não aprendidos na lista |
| Separate Unlearned? | Separa não aprendidos dos aprendidos |
| Mask Unlearned? | Aplica máscara nos não aprendidos |
| Mask Icon | Ícone usado para passivos mascarados |
| Mask Character | Caractere usado para substituir letras (ex: `?`) |
| Italics? | Usa itálico para nomes mascarados |

# Cost-Related Notetags

Notetags para definir custos personalizados de compra e venda em shops. Aplicam-se a **Item, Weapon e Armor** no database.

## Item Cost

### Compra

```
<Item id Buy Cost: x>
<Item name Buy Cost: x>
```

- Define o item e quantidade necessária para **comprar** este objeto
- `id` = ID numérico do item a ser consumido
- `name` = nome do item a ser consumido
- `x` = quantidade consumida
- Insira múltiplas cópias para custos compostos

### Venda

```
<Item id Sell Cost: x>
<Item name Sell Cost: x>
```

- Define o item e quantidade recebida ao **vender** este objeto
- Mesmas regras de substituição que compra

### Compra + Venda

```
<Item id Cost: x>
<Item name Cost: x>
```

- Define custo tanto para compra quanto para venda
- Na venda, a quantidade é reduzida pelo **sell rate** (ver Plugin Parameters > General > Automatic Sell Rate)
- **Não pode** ser usado junto com variantes Buy/Sell — se Buy ou Sell for detectado, esta notetag é ignorada

---

## Weapon Cost

### Compra

```
<Weapon id Buy Cost: x>
<Weapon name Buy Cost: x>
```

- Define a weapon e quantidade necessária para **comprar** este objeto

### Venda

```
<Weapon id Sell Cost: x>
<Weapon name Sell Cost: x>
```

- Define a weapon e quantidade recebida ao **vender**

### Compra + Venda

```
<Weapon id Cost: x>
<Weapon name Cost: x>
```

- Mesmas regras da variante Item (sell rate automático, incompatível com Buy/Sell)

---

## Armor Cost

### Compra

```
<Armor id Buy Cost: x>
<Armor name Buy Cost: x>
```

- Define a armor e quantidade necessária para **comprar** este objeto

### Venda

```
<Armor id Sell Cost: x>
<Armor name Sell Cost: x>
```

- Define a armor e quantidade recebida ao **vender**

### Compra + Venda

```
<Armor id Cost: x>
<Armor name Cost: x>
```

- Mesmas regras da variante Item (sell rate automático, incompatível com Buy/Sell)

---

## Variable Cost

### Compra

```
<Variable id Buy Cost: x>
```

- Define a variável e quantidade necessária para **comprar** este objeto
- `id` = ID numérico da variável a ser decrementada
- `x` = quantidade decrementada

### Venda

```
<Variable id Sell Cost: x>
```

- Define a variável e quantidade incrementada ao **vender** este objeto

### Compra + Venda

```
<Variable id Cost: x>
```

- Define custo para compra e venda via variável
- Na venda, a quantidade é reduzida pelo sell rate
- **Não pode** ser usado junto com variantes Buy/Sell

---

## Notas Comuns a Todas as Notetags

- Todas se aplicam a **Item, Weapon e Armor** no database
- Múltiplas cópias da mesma notetag criam **custos compostos** (ex: 2 items + 1 weapon + 30 de uma variável)
- A variante sem Buy/Sell é **incompatível** com as variantes Buy/Sell do mesmo tipo de recurso
- O sell rate automático é configurável em [[../configuracao/parametros-gerais.md|Plugin Parameters > General > Automatic Sell Rate]]

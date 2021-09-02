#Common Mistakes

###Items and Variations
An easy mistake to make:

```js
let item = new Catalog_Item();
let itemConfig = item.spawn();
itemConfig.addSomeDetails("details");

itemConfig.fardel;
// => Error - something is undefined

item.fardel;
// => hey it worked!
```

Because the fardel is on the item variable, not the configuration variable.

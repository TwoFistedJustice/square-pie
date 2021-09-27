**Building a discount**

For each discount you would like to add,call the build_discount method.

.add() - pushes the discount you built onto the discounts array. This goes last. You will not
be able to chain anything after this sub-method.

###METHODS
**"build" methods**
These are sort of like `make()` but with less room for error. Where `make()` directly accesses the setters and lets you pass whatever,
build() does a lot to prevent you from passing incorrect structures or values. They will often simply set the correct value and structure for you.
You call a build method for each property you want to set.

`yourVar.build_someproperty().someValue()`

**build_state**\
Sets the `state` property.
yourVar.build_state().someMethod()

`.build_state().open() => "OPEN"`
`.build_state().completed() => "COMPLETED"`
`.build_state().canceled() => "CANCELED"`
`.build_state().draft() => "DRAFT"`

**build_discount**\
It creates a discount object within its own scope that it then passes to the setter when you call .add().

It builds out the `discount` object by creating new properties. If you make a mistake and set an incorrect value, simply call the same
sub-method again and pass a value of "undefined". It will get filtered out at when you call `.request()` later. Call .`add()` to finalize the build.

What happens when you call .add()

- It checks to see if you gave the object a 'uid' - uid is a unique string name. It only has to be unique within the specific order object you are building.
  If you do not provide a uid but you do provide a name, the .add method will take convert the name to lowercase and replace spaces with dashes and set the uid
  value for you.
- It validates the object. It checks it for a `catalog_object_id` property and if one is not present, checks it for `type` property. Because Square requires that you have one or the other.

`.build_discount().uid(name) => discount.uid: name`\
`.build_discount().name(name) => discount.name: name`\
`.build_discount().catalog_object_id(id) => discount.catalog_object_id: id `\
`.build_discount().scope_line() => discount.scope: "LINE_ITEM"`\
`.build_discount().scope_order() => discount.scope: "ORDER"`\
`.build_discount().type_percentage() => discount.type: "FIXED_PERCENTAGE"`\
`.build_discount().type_amount() => discount.type: "FIXED_AMOUNT"`\
`.build_discount().amount_money(amount, currency) => discount.amount_money: {amount_money: {amount, currency}}`\
`.build_discount().applied_money(amount, currency) => discount.applied_money: {amount_money: {amount, currency}}`\
`.build_discount().add() => passes the discount object to the setter.`\

**build_service_charge_amount && build_service_charge_applied**\
These are clones with the only difference being in the property name they pass. one passes "amount_money" and one passes "applied_money".
They work exactly the same way.

It takes two arguments: amount and currency.
If you leave out the currency argument, it will automatically set the currency to "USD"

.build_service_charge_amount(amount, currency) => service_charges : [{amount_money: {amount, currency}}]
.build_service_charge_applied(amount, currency) => service_charges : [{applied_money: {amount, currency}}]

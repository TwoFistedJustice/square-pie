#Catalog_Item and Catalog_Item_Variation classes

1. Every Item must have at least one variation. Square's rules, not ours.
2. Items come in two sub-types: Regular (stuff you sell), and Appointment Service (stuff you do)

- You can always set this manually.
- It will be set automatically when you instantiate an item. The default is Regular. But you can change
  the default by changing configuration.auto_set_appointment_service to false.
- You can use the old fashioned setter.
- You can use the make method. Don't look for the methods in the code. They are built by javascript gnomes that live in the repo.

```js
let somevar = item.spawn();
somevar.product_type().REGULAR();
OR;
somevar.product_type().APPOINTMENTS_SERVICE();
```

'product_type' will also be set to 'APPOINTMENTS_SERVICE' if any of the item variations you add have the properties `service_duration` or 'available_for_booking'
In other words, you must not try to mix and match Regular and Appointment items. Square may let you do this. But we don't.

## Item Variation

Note: This is for upserting a new object. It does not cover updating an existing one.

###Pricing a new item:
If you wish to set a fixed price, there is no need to set pricing type. This will be done automatically
when you add a price.

Conversely, if you made a mistake and wish to change to variable pricing, you need only set the pricing type to variable. The price data will be
cleared automatically.

### Currency

catalog_object_item_variation.js has a default value of "USD". If you need a different currency, change this value the one you want.
This package does not currently support multiple simultaneous currencies.

To set the price you need only pass in the price in cents, without the currency. (This is different than the Square docs)

### pricing_type

You don't need to set this property, pretty much ever. It will be automatically set to the required
type when you set a property that requires that pricing type. This will happen every time
you add a price, or a service duration, or mark a service available for booking. Whatever you
did last is how it will be set. But if you are bound and determined to break it, you can still
set it manually, as long as you do it after the other stuff.

These properties also will not allow you to feed them the wrong kind of food. They will cough up
a TypeError if you do.

### Incomplete Parts:

The following properties on the item variation object were not priorities and remain
uncompleted. You can still pass in properly formatted data. But there is not auto formatting.
You pretty much have to set it manually.

**location_overrides**

- is quite complex, almost a class unto itself

**stockable_conversion**

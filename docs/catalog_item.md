#Catalog_Item and Catalog_Item_Variation classes

1. Every Item must have at least one variation. Square's rules, not ours.
2. Items come in two sub-types: Regular (stuff you sell), and Appointment Service (stuff you do)

- You can always set this manually.
- It will be set automatically when you instantiate an item. The default is Regular. But you can change
  the default by changing configuration.auto_set_appointment_service to false.
- You can use the old fashioned setter.
- You can use the spawn method. Don't look for the methods in the code. They are built by javascript gnomes that live in the repo.

```js
let somevar = item.spawn();
somevar.product_type().REGULAR();
OR;
somevar.product_type().APPOINTMENTS_SERVICE();
```

'product_type' will also be set to 'APPOINTMENTS_SERVICE' if any of the item variations you add have the properties `service_duration` or 'available_for_booking'
In other words, you must not try to mix and match Regular and Appointment items. Square may let you do this. But we don't.

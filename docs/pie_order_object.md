# Pie Order Object

# TO DO - Super Structure - property

- [x] version
- [x] id :str
- [x] location_id :str
- [x] reference_id : str
- [x] customer_id: str
- [x] ticket_name: str
- [x] state: str - fixed
- [x] source { simple }
- [x] pricing_options : { simple }
- [x] service_charges: []
- [x] discounts: []
- [x] taxes []
- [x] fulfillments: []
- [x] line_items: []
- [ ] metadata: map - not supported in v1

<br/>

# TO DO - Super Structure - getter

- [x] version
- [x] id :str
- [x] location_id :str
- [x] reference_id : str
- [x] customer_id: str
- [x] ticket_name: str
- [x] state: str - fixed
- [x] source { simple }
- [x] pricing_options : { simple }
- [x] service_charges: []
- [x] discounts: []
- [x] taxes []
- [x] fulfillments: []
- [x] line_items: []
- [ ] metadata: map - not supported in v1

<br/>

# TO DO - Super Structure - setter

- [x] version
- [x] id :str
- [x] location_id :str
- [x] reference_id : str
- [x] customer_id: str
- [x] ticket_name: str
- [x] state: str - fixed
- [x] source { simple }
- [x] pricing_options : { simple }
- [x] service_charges: []
- [x] discounts: []
- [x] taxes []
- [x] fulfillments: []
- [x] line_items: []
- [ ] metadata: map - not supported in v1

<br/>

# TO DO - BUILD METHODS

- [x] build_state
- [x] build_service_charge_amount
- [x] build_service_charge_applied
- [x] build_discount
- [ ] build_fulfillment_pickup
- [ ] build_fulfillment_shipping
- [ ] build_line_item

### TO DO - Length Limits - setters

- [x] customer_id 191

<br/>

### TO DO - Length Limits - build-methods

- [x] discount.name 255
- [x] discount.percentage 10
- [x] discount.catalog_object_id 192
- [ ] fulfillment.uid 60
- [ ] fulfillment.cancel_reason 100
- [ ] fulfillment.pickup_details.note 500
- [ ] fulfillment.pickup_details.curbside_pickup_details.curbside_details 250
- [ ] shipment_details.carrier 50
- [ ] shipment_details.failure_reason 100
- [ ] shipment_details.shipping_note 500
- [ ] shipment_details.shipping_type 50
- [ ] shipment_details.tracking_number 100
- [ ] shipment_details.tracking_url 2000
- [ ] shipment_details.display_name 255
- [ ] shipment_details.email_address 255
- [ ] shipment_details.phone_number 17

<br/>

## METHODS

### **"build" methods**

These are sort of like `make()` but with less room for error. Where `make()` directly accesses the setters and lets you pass whatever,
build() does a lot to prevent you from passing incorrect structures or values. They will often simply set the correct value and structure for you.
In general you call a build method for a property you want to set.

```js
yourVar.build_someproperty().someValue();
```

### **#spawn_state**

Private methods that sets the `state` property. Referenced inside the make() method.
yourVar.make().state().desired-value()

```js
.make().state().open() => "OPEN"
.make().state().completed() => "COMPLETED"
.make().state().canceled() => "CANCELED"
.make().state().draft() => "DRAFT"
```

### **build_discount**

It creates a discount object within its own scope that it then passes to the setter when you call .add().

You can call the sub-methods individually or chain them together.

It builds out the `discount` object by creating new properties. If you make a mistake and set an incorrect value, simply call the same
sub-method again and pass a value of "undefined". It will get filtered out at when you call `.request()` later. Call .`add()` to finalize the build.

What happens when you call `.add()`

- It checks to see if you gave the object a 'uid' - uid is a unique string name. It only has to be unique within the specific order object you are building.
  If you do not provide a uid but you do provide a name, the .add method will take convert the name to lowercase and replace spaces with dashes and set the uid
  value for you.
- It validates the object. It checks it for a `catalog_object_id` property and if one is not present, checks it for `type` property. Because Square requires that you have one or the other.

```js
.build_discount().uid(name) => discount.uid: name
.build_discount().name(name) => discount.name: name
.build_discount().catalog_object_id(id) => discount.catalog_object_id: id
.build_discount().scope_line() => discount.scope: "LINE_ITEM"
.build_discount().scope_order() => discount.scope: "ORDER"
.build_discount().percentage(7.25) -> discount.percentage: "7.25"
.build_discount().type_percentage() => discount.type: "FIXED_PERCENTAGE"
.build_discount().type_amount() => discount.type: "FIXED_AMOUNT"
.build_discount().amount_money(amount, currency) => discount.amount_money: {amount_money: {amount, currency}}
.build_discount().applied_money(amount, currency) => discount.applied_money: {amount_money: {amount, currency}}
.build_discount().pricing_rule_id("someId") => discount.pricing_rule_id: "someId"
.build_discount().reward_ids("some id").reward_ids("some other id") => discount.reward_ids: ["some id", "some other id"]
.build_discount().add() => passes the discount object to the setter.
```

\*\* note:
both .type_percentage and .type_amount set a key called "type". But they each set a different mutually exclusive value.

### **build_service_charge_amount && build_service_charge_applied**

These are clones with the only difference being in the property name they pass. one passes "amount_money" and one passes "applied_money".
They work exactly the same way.

It takes two arguments: amount and currency.
If you leave out the currency argument, it will automatically set the currency to "USD"

```js
.build_service_charge_amount(amount, currency) => service_charges : [{amount_money: {amount, currency}}]
.build_service_charge_applied(amount, currency) => service_charges : [{applied_money: {amount, currency}}]
.build_service_charge_amount(amount) => service_charges : [{amount_money: {amount, currency: "USD"}}]
.build_service_charge_applied(amount) => service_charges : [{applied_money: {amount, currency "USD"}}]
```

### **[Fulfillments](https://developer.squareup.com/docs/orders-api/how-it-works#fulfillments)**

Square docs explicityl state that all fulfillment orders must have `delay_capture` set to true. They do not mention it again in any context. So what does that mean? What do you get when you cross an elephant and a rhinoceros?

### **build_fulfillment_pickup**

type - PICKUP - set automatically\
metadata\
state - PROPOSED RESERVED PREPARED COMPLETED CANCELED\
uid - max: 60\
pickup_details

<br/>

- accepted_at
  - auto_complete_duration
  - cancel_reason - max 100
- canceled_at
- expired_at
- is_curbside_pickup - boolean
- note - max 500
- pickup_at
- pickup_window_duration
- prep_time_duration
- recipient
- schedule_type
- curbside_pickup_details
  1. buyer_arrived_at
  2. curbside_details - max 250

### **build_fulfillment_shipment**

type - SHIPMENT - set automatically\
metadata\
state - PROPOSED RESERVED PREPARED COMPLETED CANCELED\
uid - max: 60

`.shipment_details`

- cancel_reason - max 100
- canceled_at
- carrier - max 50
- expected_shipped_at
- failure_reason - max 100
- shipping_note - max 500
  - shipping_type - max 50
- tracking_number - max 100
  - tracking_url - max 2000

`.recipient`

- customer_id
- address : {address object} - create an actual #address method with .street1, .street2 etc
- display_name max 255
- email_address max 255
- phone_number -max 17

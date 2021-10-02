## TO DO

build_line_items

- quantity: str
- applied_discounts: []
- applied_taxes: []
- base_price_money: {money}
- catalog_object_id: max 192
- catalog_version
- gross_sales_money: {money}
- item_type: ITEM, CUSTOM_AMOUNT, GIFT_CARD
- metadata
- modifiers []
- name
- note
- pricing_blocklists
- quantity_unit
- uid MAX 60
- variation_name MAX 400
-

READ ONLY
total_discount_money
total_money
total_tax_money
variation_total_price_money

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

You can call the sub-methods individually or chain them together.

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
`.build_discount().percentage(7.25) -> discount.percentage: "7.25"`\
`.build_discount().type_percentage() => discount.type: "FIXED_PERCENTAGE"`\
`.build_discount().type_amount() => discount.type: "FIXED_AMOUNT"`\
`.build_discount().amount_money(amount, currency) => discount.amount_money: {amount_money: {amount, currency}}`\
`.build_discount().applied_money(amount, currency) => discount.applied_money: {amount_money: {amount, currency}}`\
`.build_discount().pricing_rule_id("someId") => discount.pricing_rule_id: "someId"`\
`.build_discount().reward_ids("some id").reward_ids("some other id") => discount.reward_ids: ["some id", "some other id"]`\
`.build_discount().add() => passes the discount object to the setter.`

**build_service_charge_amount && build_service_charge_applied**\
These are clones with the only difference being in the property name they pass. one passes "amount_money" and one passes "applied_money".
They work exactly the same way.

It takes two arguments: amount and currency.
If you leave out the currency argument, it will automatically set the currency to "USD"

`js .build_service_charge_amount(amount, currency) => service_charges : [{amount_money: {amount, currency}}]`\
`.build_service_charge_applied(amount, currency) => service_charges : [{applied_money: {amount, currency}}]`\
`.build_service_charge_amount(amount) => service_charges : [{amount_money: {amount, currency: "USD"}}]`\
`.build_service_charge_applied(amount) => service_charges : [{applied_money: {amount, currency "USD"}}]`

**[Fulfillments](https://developer.squareup.com/docs/orders-api/how-it-works#fulfillments)**
Square docs explicityl state that all fulfillment orders must have `delay_capture` set to true. They do not mention it again in any context. So what does that mean? What do you get when you cross an elephant and a rhinoceros?

**build_fulfillment_pickup**\
type - PICKUP - set automatically
metadata
state - PROPOSED RESERVED PREPARED COMPLETED CANCELED
uid - max: 60
pickup_details

- accepted_at
  -auto_complete_duration
  -cancel_reason - max 100
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
  1.buyer_arrived_at

2. curbside_details - max 250

**build_fulfillment_shipment**\
type - SHIPMENT - set automatically
metadata
state - PROPOSED RESERVED PREPARED COMPLETED CANCELED
uid - max: 60

.shipment_details
-cancel_reason - max 100

- canceled_at
- carrier - max 50
- expected_shipped_at
- failure_reason - max 100
- shipping_note - max 500
  -shipping_type - max 50
- tracking_number - max 100
  -tracking_url - max 2000

.recipient

- customer_id
- address : {address object} - create an actual #address method with .street1, .street2 etc
- -display_name max 255
  -email_address max 255
  -phone_number -max 17
-

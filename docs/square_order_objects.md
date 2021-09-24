##[Square Order Objects](https://developer.squareup.com/docs/orders-api/how-it-works#orders-objects-and-datatypes)

**SQUARE DOCS**\

- [Create Order ENDPOINT](https://developer.squareup.com/reference/square/orders-api/create-order)
- [Create order how to ](https://developer.squareup.com/docs/orders-api/create-orders)
- [Square Order Objects](https://developer.squareup.com/docs/orders-api/how-it-works#orders-objects-and-datatypes)
- [READ ONLY properties are NOT request properties - no matter what the docs say](https://developer.squareup.com/forums/t/order-api-create-order-read-only-properties/3658)

**Order Object Structure:**

Whenever possible it is best to reference Catalog Object IDs to enable Square's automatic features.

- has a version - nap this from Item or whatev

line_items: array of objects,which appear to or have data pulled from or be item_variations

**Fullfillments**

- shipment
- pickup

**Prevent orders orphaning - copied from Square's docs**
"A created order must be either paid (a successful payment attached to the order) or canceled (the order status set to CANCELED). Partner applications must ensure that there are no orphan orders."

**Taxes and Discounts**
Modifies order total.
Best to use Object IDs

**Versions**
Same as version is Customer - Retrieve_Update_Delete

**UIDs** <- only one "U"
each object in an order requires some kind of identifier. Square isn't clear on how this works (surprise)
I don't know yet if they require you to set a NEW ID on all object or if they just mean that if you
are doing it ad-hoc you have to give it a new id or accept theirs.

Types of Objects or sub-objects I need to define:
Line item
Order fullfillment

| Level One Objects | Super | Idempotent | Implemented | Unit Tests in Place | Short Notes | Square Doc |
| ----------------- | ----- | ---------- | ----------- | ------------------- | ----------- | ---------- |
| Order             |       | YES        |

| Level Two Objects | Super | Idempotent | Implemented | Unit Tests in Place | Short Notes | Square Doc                                                                                            |
| ----------------- | ----- | ---------- | ----------- | ------------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| Fulfillment       |       |            |             |                     |             | [Curbside pickup](https://developer.squareup.com/blog/introducing-curbside-pickup-in-the-orders-api/) |

Add fulfilment to create a pick up order.

Fulfillment is a an object inside an array
The response provides a UID which needs to be persisted in the application.

## Not to be supported in V1

```
_tenders; //`BETA` [] READ ONLY - complex
_metadata; // `BETA` READ ONLY - limits on L and content
```

## Corrections to the Square Docs:

The docs (current as of 9/23/21) state that there are a whole bunch of read only properties on the Request body. This is wrong. They are actually on the Response body.
Square is aware of this issue and it is in queue for correction.

Those properties ARE:

```
_closed_at;
_created_at;
_updated_at;
_total_discount_money;
_total_money;
_total_service_charge_money;
_total_tax_money;
_total_tip_money;
_net_amounts;
_refunds;
_returns;
_return_amounts;
_rewards;
_rounding_adjustment;
```

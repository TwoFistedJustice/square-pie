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

## Square Docs JSON: Request vs Response

Here are the actual examples from their docs, parsed into JS objects for readability.

This is the from the Request body:

```js
var requestBody = {
  order: {
    reference_id: "my-order-001",
    location_id: "057P5VYJ4A5X1",
    line_items: [
      {
        name: "New York Strip Steak",
        quantity: "1",
        base_price_money: {
          amount: 1599,
          currency: "USD",
        },
      },
      {
        quantity: "2",
        catalog_object_id: "BEMYCSMIJL46OCDV4KYIKXIB",
        modifiers: [
          {
            catalog_object_id: "CHQX7Y4KY6N5KINJKZCFURPZ",
          },
        ],
        applied_discounts: [
          {
            discount_uid: "one-dollar-off",
          },
        ],
      },
    ],
    taxes: [
      {
        uid: "state-sales-tax",
        name: "State Sales Tax",
        percentage: "9",
        scope: "ORDER",
      },
    ],
    discounts: [
      {
        uid: "membership-discount",
        catalog_object_id: "DB7L55ZH2BGWI4H23ULIWOQ7",
        scope: "ORDER",
      },
      {
        uid: "labor-day-sale",
        name: "Labor Day Sale",
        percentage: "5",
        scope: "ORDER",
      },
      {
        uid: "one-dollar-off",
        name: "Sale - $1.00 off",
        amount_money: {
          amount: 100,
          currency: "USD",
        },
        scope: "LINE_ITEM",
      },
    ],
  },
};
```

This is what resulting Response body

```js
var responseBody = {
  order: {
    id: "CAISENgvlJ6jLWAzERDzjyHVybY",
    location_id: "057P5VYJ4A5X1",
    line_items: [
      {
        uid: "8uSwfzvUImn3IRrvciqlXC",
        name: "New York Strip Steak",
        quantity: "1",
        applied_taxes: [
          {
            uid: "aKG87ArnDpvMLSZJHxWUl",
            tax_uid: "state-sales-tax",
            applied_money: {
              amount: 136,
              currency: "USD",
            },
          },
        ],
        applied_discounts: [
          {
            uid: "jWdgP1TpHPFBuVrz81mXVC",
            discount_uid: "membership-discount",
            applied_money: {
              amount: 8,
              currency: "USD",
            },
          },
          {
            uid: "jnZOjjVY57eRcQAVgEwFuC",
            discount_uid: "labor-day-sale",
            applied_money: {
              amount: 79,
              currency: "USD",
            },
          },
        ],
        base_price_money: {
          amount: 1599,
          currency: "USD",
        },
        gross_sales_money: {
          amount: 1599,
          currency: "USD",
        },
        total_tax_money: {
          amount: 136,
          currency: "USD",
        },
        total_discount_money: {
          amount: 87,
          currency: "USD",
        },
        total_money: {
          amount: 1648,
          currency: "USD",
        },
        variation_total_price_money: {
          amount: 1599,
          currency: "USD",
        },
      },
      {
        uid: "v8ZuEXpOJpb0bazLuvrLDB",
        name: "New York Steak",
        quantity: "2",
        catalog_object_id: "BEMYCSMIJL46OCDV4KYIKXIB",
        variation_name: "Larger",
        modifiers: [
          {
            uid: "Lo3qMMckDluu9Qsb58d4CC",
            catalog_object_id: "CHQX7Y4KY6N5KINJKZCFURPZ",
            name: "Well",
            base_price_money: {
              amount: 50,
              currency: "USD",
            },
            total_price_money: {
              amount: 100,
              currency: "USD",
            },
          },
        ],
        applied_taxes: [
          {
            uid: "v1dAgrfUVUPTnVTf9sRPz",
            tax_uid: "state-sales-tax",
            applied_money: {
              amount: 374,
              currency: "USD",
            },
          },
        ],
        applied_discounts: [
          {
            uid: "nUXvdsIItfKko0dbYtY58C",
            discount_uid: "membership-discount",
            applied_money: {
              amount: 22,
              currency: "USD",
            },
          },
          {
            uid: "qSdkOOOernlVQqsJ94SPjB",
            discount_uid: "labor-day-sale",
            applied_money: {
              amount: 224,
              currency: "USD",
            },
          },
          {
            uid: "y7bVl4njrWAnfDwmz19izB",
            discount_uid: "one-dollar-off",
            applied_money: {
              amount: 100,
              currency: "USD",
            },
          },
        ],
        base_price_money: {
          amount: 2200,
          currency: "USD",
        },
        gross_sales_money: {
          amount: 4500,
          currency: "USD",
        },
        total_tax_money: {
          amount: 374,
          currency: "USD",
        },
        total_discount_money: {
          amount: 346,
          currency: "USD",
        },
        total_money: {
          amount: 4528,
          currency: "USD",
        },
        variation_total_price_money: {
          amount: 4400,
          currency: "USD",
        },
      },
    ],
    taxes: [
      {
        uid: "state-sales-tax",
        name: "State Sales Tax",
        type: "ADDITIVE",
        percentage: "9",
        applied_money: {
          amount: 510,
          currency: "USD",
        },
        scope: "ORDER",
      },
    ],
    discounts: [
      {
        uid: "membership-discount",
        catalog_object_id: "DB7L55ZH2BGWI4H23ULIWOQ7",
        name: "Membership Discount",
        type: "FIXED_PERCENTAGE",
        percentage: "0.5",
        applied_money: {
          amount: 30,
          currency: "USD",
        },
        scope: "ORDER",
      },
      {
        uid: "labor-day-sale",
        name: "Labor Day Sale",
        type: "FIXED_PERCENTAGE",
        percentage: "5",
        applied_money: {
          amount: 303,
          currency: "USD",
        },
        scope: "ORDER",
      },
      {
        uid: "one-dollar-off",
        name: "Sale - $1.00 off",
        type: "FIXED_AMOUNT",
        amount_money: {
          amount: 100,
          currency: "USD",
        },
        applied_money: {
          amount: 100,
          currency: "USD",
        },
        scope: "LINE_ITEM",
      },
    ],

    created_at: "2020-01-17T20:47:53.293Z",
    updated_at: "2020-01-17T20:47:53.293Z",
    state: "OPEN",
    version: 1,
    reference_id: "my-order-001",
    total_money: {
      amount: 6176,
      currency: "USD",
    },
    total_tax_money: {
      amount: 510,
      currency: "USD",
    },
    total_discount_money: {
      amount: 433,
      currency: "USD",
    },
    total_tip_money: {
      amount: 0,
      currency: "USD",
    },
    total_service_charge_money: {
      amount: 0,
      currency: "USD",
    },
    net_amounts: {
      total_money: {
        amount: 6176,
        currency: "USD",
      },
      tax_money: {
        amount: 510,
        currency: "USD",
      },
      discount_money: {
        amount: 433,
        currency: "USD",
      },
      tip_money: {
        amount: 0,
        currency: "USD",
      },
      service_charge_money: {
        amount: 0,
        currency: "USD",
      },
    },
    source: {
      name: "My App",
    },
  },
};
```

**Version**\
This needs to be the same as whatever is currently in Square's database. You can ignore it when creating a new
order. But to update an existing order, you must either fetch this from Square, or persist it in your own db and send
the correct number with the update.

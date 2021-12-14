## Retrieve

order.ids - required. Can take one or more than one. Pass in each id indvidually

methods:
location(id)
clear_location(id)
add_order(id)
order_array - take an array of ids and merge it
order-remove by id
order remove via pop

## [Order_Search](https://developer.squareup.com/reference/square/orders-api/search-orders)

```js
const yourVar = new Order_Search();
```

```js
const yourVar = new Order_Search("locationID");
```

or

```js
const yourVar = new Order_Search( ["locationID1","locationID2","locationID3","locationID4", ...] );
```

You can construct a new instance with no arguments, a single ID string, or an array of location_id strings.
No matter how you start, you can always add more location_id strings via make().location_id() or by calling the
setter. Square REQUIRES that there be at least one location_id in every Order_Search. There is no stated upper
limit.

### The Properties on Body

location_ids: an array
It holds location_id strings. Upper limit unknown. Required to have at least one entry.

cursor: a pagination cursor.

limit: an integer.
The maximum number of returned results.

return_entries: a boolean.
If true, returns [order entry objects](https://developer.squareup.com/reference/square/objects/OrderEntry)
if false, returns complete order objects.

query: and object.
This is where you construct filters. A basic query object has two properties: filter and sort.

You can add filters by building a query object. Do this with build_query() method.

### [Search Query Object](https://developer.squareup.com/reference/square/objects/SearchOrdersQuery)

The query object structure looks like this:

```js
let query = {
  filter: {
    customer_filter: {
      customer_ids: [], // max 10
    },
    date_time_filter: {
      // you can only use one at a time. The sort_field is automatically set to match to comply with Square's requirements.
      close_at: { end_at, start_at }, // arche_time_start_end
      created_at: { end_at, start_at },
      updated_at: { end_at, start_at },
    },
    fulfillment_filter: {
      fulfillment_states: [], //ENUM -PROPOSED, RESERVED, PREPARED, COMPLETED, CANCELED, FAILED  order_fulfillment_enum.js
      fulfillment_types: [], // ENUM PICKUP, SHIPMENT order_fulfillment_enum
    },
    source_filter: {
      source_name: [], // max 10 - returns any orders with a source.name that matches any of entries
    },
    state_filter: {
      states: [], // ENUM -OPEN, COMPLETED, CANCELED, DRAFT  order_object_enum.js
    },
  },

  sort: {
    // arche_sorting_enum.js
    sort_field: "", //<REQUIRED> ENUM -CREATED_AT, UPDATED_AT, CLOSED_AT -  - DEFAULT: CREATED_AT
    sort_order: "", // ENUM - DESC, ASC - DEFAULT: ASC
  },
};
```

### The build_query() Method

It has sub-methods with the same names as properties of filter, and one called 'sort' (there is no 'filter' method)
As with most Pie build functions the methods and sub-method follow the property names. When there are restricted values (aka ENUM),
the final sub-method name will be the name of the value. The various filter arrays can have a maximum of ten entries.

date_time_filter & sort:
If you filter for orders by time range, you must set sort using the same field. This is done automatically when you set a date_time filter.
You can break it by re-setting the sort_field value to something else. If they don't match, Square will reject the request. You can only
have one date_time_filter set at a time.

### make().query()

Will push whatever object you feed it without verification. Only use this if you have a pre-build query object. You can safely
add to your pre-built with the build_query() method.

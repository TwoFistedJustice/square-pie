# Using Order_Search Class

Square searches orders documents by location_id. You can search orders by up to ten locations. Read the intro to the Square doc and familiarize yourself with the Request Body structure:
[Square docs search orders](https://developer.squareup.com/reference/square/orders-api/search-orders)

The request body properties that require special attention are location_ids and query.

<br/>

### location_id

location_ids is an array. It can hold up to ten location_ids. You can push location_ids onto the array
in five ways. You can use any combination of these ways. You will be prevented from adding more than ten
location_ids.

1. As a string argument when you instantiate the class.
2. Singly ids via yourVar.make().location("id1").location("id1").
3. You can add an array of ids by calling yourVar.make().concat_locations(array)
4. Via the single setter yourVar.location_id = "id1".
5. Via the array setter yourVar.location_array_concat = array

<br/>

### query

query is an object with two properties: `filter`, and `sort`. It has its own `make_query()` method.

###sort

`sort` is relatively simple. It holds an object two properties: `sort_field` and `sort_order`.

To build the `sort` property call the sort() sub-method of make_query(). It has two sub-methods,
`sort_field()` and `sort_order()`. Each of those have their own sub-methods which have names
based on the allowable values. There are also aliases to make it a little easier to remember.

`sort_order():`

To sort ascending set the value to _"ASC"_:

- ascending()
- up()
- oldest_first()

To sort descending set the value to _"DESC"_:

- descending()
- down()
- newest_first()

`sort_field`

to set the value to:

_"CREATED_AT"_

- created_at()
- created()

_"UPDATED_AT"_

- updated_at()
- updated()

_"CLOSED_AT"_

- closed_at()
- closed()

###filter

An object with the properties:

- customer_filter: has an array that holds up to ten customer_ids
- date_time_filter: has three properties with indentical features: begin and end times.
- fulfillment_filter: has two arrays, to hold fulfillment states and types
- source_filter: has an array that holds up to ten source_names
- state_filter: has an array that holds entries from the state enum.

**To set:**

_customer filter:_

pass a customer id string to make_query().customer_filter("id"). Chain up to ten.

_date_time_filter_

Each sub-method of this takes two arguments (start, end) which are simply the start and end
time brackets for your search. They must be RFC3339 compliant.

_make_query().date_time_filter()_

- .close_at(start, end)
- .created_at(start, end)
- .updated_at(start, end)

_fulfillment_filter_

This sets the value for you when you call the method with the name matching (lowercase) the value you want to set.
make_query().fulfillment_filter()

.fulfillment_types().[lowercase value you want to set]()
.fulfillment_states().[lowercase value you want to set]()
i.e.make_query().fulfillment_filter().fulfillment_states().open()

_source_filter_

pass a source name string to make_query().source_filter("name"). Chain up to ten.

_state_filter:_

This sets the value for you when you call the method with the name matching (lowercase) the value you want to set.
call make_query().state_filter().[lowercase value you want to set]()
i.e. make_query().state_filter().open()

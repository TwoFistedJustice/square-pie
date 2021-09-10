To use this class you will need to conform to the data structures specified by Square [CatalogQuery](https://developer.squareup.com/reference/square/objects/CatalogQuery)
. In general these are
objects with two or three properties. Usually you specify the property name you want to search and an expected value.
The property name has to be exactly the same, but the value can be exactly or partly the same.

The Search Objects endpoint is NOT a pure search. It is a combination of Retrieve-Batch and Search.
The Retrieve-Batch portion isn't called that. You just give it an array of Object IDs which all correspond
to specific objects.

You can broadly divide the query-property into two categories, combinable searches, where you can layer on
additional criteria, and the other is an array of specific object IDs. You must use one type or the other.
Square will reject a request which has an array of IDs along with any kind of refining details.
The kind which takes the array of IDs will have the word "for" in the property name (i.e. "items_for_item_options_query" )

How to search:
To restrict the type of object
call the .object_types().TYPE_OF_OBJECT()
If Square Catalog has the object as a type, add that type in ALL_CAPS as a method call.
Your autocomplete will not recognize this. Some common calls look like"
.object_types().ITEM_VARIATION()
.object_types().CATEGORY()
.object_types().ITEM()

You could also do something like below to get two types:
.object_types().CATEGORY().object_types().ITEM_VARIATION()

```js
const search = new Catalog_Search_Objects();
search.item;
search.variation;
search.name;
```

##methods

### exact_query

make

- include_related_objects (bool)
- begin_time (time) - time must be in RFC 3339 format

item

- name
- description
- abbreviation

variation

- name
- upc
- sku

name

- item
- variation
- category
- tax
- discount
- modifier

exact
prefix
range
sorted
text

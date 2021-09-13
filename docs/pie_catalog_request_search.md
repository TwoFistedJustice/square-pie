To use this class you will need to conform to the data structures specified by Square [CatalogQuery](https://developer.squareup.com/reference/square/objects/CatalogQuery)
. In general these are
objects with two or three properties. Usually you specify the property name you want to search and an expected value.
The property name has to be exactly the same, but the value can be exactly or partly the same.

Square provides two ways to search with a single endpoint. One way is to filter using different searchable properties and values. The other way
is to provide it an array of IDs for specific modifiers such as taxes or modifier_lists. So if you want all objects that use a tax called "sales tax"
you would find the Object ID of that tax and then put that ID into the array. It would then return all objects that use that tax. You cannot filter such a
request. You must use one type or the other. Square will reject a request which has an array of IDs along with any kind of refining details.

This is what a search objects request body may look like:

```json
{
  "object_types": ["ITEM"],
  "query": {
    "prefix_query": {
      "attribute_name": "name",
      "attribute_prefix": "vista"
    }
  },
  "limit": 100
}
```

**How to search:**\
To restrict the type of object

- call the `yourVar.object_types().TYPE_OF_OBJECT()`\
- use setter notation `yourVar.object_types = "ITEM"`

If Square Catalog has the object as a type, add that type in ALL_CAPS as a method call.
Your autocomplete will not recognize this. Some common calls look like"\
`.object_types().ITEM_VARIATION()`\
`.object_types().CATEGORY()`\
`.object_types().ITEM()`\

You could also do something like below to get two types:
.object_types().CATEGORY().object_types().ITEM_VARIATION()

```js
const search = new Catalog_Search_Objects();
search.item;
search.variation;
search.name;
```

## Catalog_Search_Objects_Super

The common elements between the two types of Catalog Object Search live here.
This sets the endpoint and method and has the configuration property for the auto generator.
It holds the following properties on the `._body` property:

- cursor
- include_related_objects
- begin_time
- object_types
- query

## Catalog_Search_Objects_Filter

This class sets the `_body.query` property on Super.\
This is the class to use if:

- you want to **combine elements** to get a refined search. All the methods can be used
  to layer on additional criteria.
- you want to search for **deleted** objects

###Adding an object type
You can directly access the setter:\
`yourVar.object.type = "ITEM"`

You can access the alias on the make method:\
`yourVar.make().add_object_type("ITEM")`

You can access one of the auto generated chain setters on the make method:\
`yourVar.make().object_type().ITEM();`

Make sure that you use ALLCAPS to reference the type. Any Square Catalog Object type is valid.

###make()
Chainable setter methods. Includes refernces to all the below methods plus one other.
The extra on is `add_object_type`
make.add_object_type(type): takes a Catablog Object TYPE name as an argument. Adds that type
to the object_types array.

---

These are the methods you can use to build up a filter for your search. Any method that ends in `_query` corresponds directly
to the property names on the query property in the Square docs for [Search catalog objects](https://developer.squareup.com/reference/square/catalog-api/search-catalog-objects)
The outlines below show how the argument should be structured.

**NOTE: if an arg property is not marked "// OPTIONAL" it is REQUIRED**
###exact_query(obj)

```js
obj = {
  attribute_name: "some_property_name",
  attribute_value: "some value",
};
```

###set_query(obj)

```js
obj = {
  attribute_name: "some_property_name",
  attribute_values: ["some value", "some other value"],
};
```

###prefix_query(obj)

```js
obj = {
  attribute_name: "some_property_name",
  attribute_prefix: "some value",
};
```

###range_query(obj)

```js
obj = {
  attribute_name: "some_property_name",
  attribute_max_value: number, // OPTIONAL
  attribute_min_value: number, // OPTIONAL
};
```

###sorted_attribute_query(obj)

```js
obj = {
  attribute_name: "The attribute whose value is used as the sort key",
  initial_attribute_value:
    "The first attribute value to be returned by the query", // OPTIONAL
  sort_order: `"ASC" or "DESC"`, // OPTIONAL
};
```

###text_query(arr)
Takes an array of \_no more than\* three strings. Throws an error on an empty array or if the array has a length greater than 3

```js
arr = ["word1", "word2", "word3"];
```

###text_query_add(word)

Caches the keywords array if there is one. Makes a new array if not.
Adds the new word to the array.
Warning: If the array length is greater than 2, this method will remove every elment past the second before
adding the new word.

```js
word = "some word";
```

###text_query_remove(word)
If the word you pass it is in the text_query array, it removes that word.

```js
word = "some word";
```

This will be converted by the class to the format Square expects:

```js
keywords: {
  ["the", "values", "entered"];
}
```
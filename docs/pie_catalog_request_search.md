# Pie Catalog Request Search

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

<br/>

## How to search

To restrict the type of object

- call the `yourVar.object_types().TYPE_OF_OBJECT()`
- use setter notation `yourVar.object_types = "ITEM"`

If Square Catalog has the object as a type, add that type in ALL_CAPS as a method call.
Your autocomplete will not recognize this. Some common calls look like"

```js
.object_types().ITEM_VARIATION()
.object_types().CATEGORY()
.object_types().ITEM()
```

You could also do something like below to get two types:
`.object_types().CATEGORY().object_types().ITEM_VARIATION()`

```js
const search = new Catalog_Search_Objects();
search.item;
search.variation;
search.name;
```

<br/>

## Catalog_Search_Objects_Super

The common elements between the two types of Catalog Object Search live here.
This sets the endpoint and method and has the configuration property for the auto generator.
It holds the following properties on the `._body` property:

- cursor
- include_related_objects
- begin_time
- object_types
- query

<br/>

## Catalog_Search_Objects_Filter

### What this class does

It lets you search for all objects that have certain values at certain keys. You can search just about any
writable property.

This class sets the `_body.query` property on Super.\
This is the class to use if:

- you want to **combine elements** to get a refined search. All the methods can be used
  to layer on additional criteria.
- you want to search for **deleted** objects

To use this class you will need to conform to the data structures specified by Square [CatalogQuery](https://developer.squareup.com/reference/square/objects/CatalogQuery)
. In general these are
objects with two or three properties. Usually you specify the property name you want to search and an expected value.
The property name has to be exactly the same, but the value can be exactly or partly the same.

### Adding an object type

You can directly access the setter:

```js
yourVar.object.type = "ITEM"
```

You can access the alias on the make method:

```js
yourVar.make().add_object_type("ITEM")
```

You can access one of the auto generated chain setters on the make method:

```js
yourVar.make().object_type().ITEM();
```

Make sure that you use ALLCAPS to reference the type. Any Square Catalog Object type is valid.

### make()

Chainable setter methods. Includes references to all the below methods plus one other.
The extra one is `add_object_type`
`make.add_object_type(type)`: takes a Catalog Object TYPE name as an argument. Adds that type
to the object_types array.

<br/>

## Chainable Methods

These are the methods you can use to build up a filter for your search. Any method that ends in `_query` corresponds directly
to the property names on the query property in the Square docs for [Search catalog objects](https://developer.squareup.com/reference/square/catalog-api/search-catalog-objects)
The outlines below show how the argument should be structured.

<br/>

> **NOTE:** if an arg property is not marked "// OPTIONAL" it is **REQUIRED**

### **exact_query(obj)**

```js
obj = {
  attribute_name: "some_property_name",
  attribute_value: "some value",
};
```

#### :warning: Will throw errors on

- The input is incorrectly formatted.
- either property is not of type "string"

### **set_query(obj)**

```js
obj = {
  attribute_name: "some_property_name",
  attribute_values: ["some value", "some other value"],
};
```

#### :warning: Will throw errors on

- The input is incorrectly formatted.
- attribute_name is not of type "string"
- attribute_values is not an array

### **prefix_query(obj)**

```js
obj = {
  attribute_name: "some_property_name",
  attribute_prefix: "some value",
};
```

#### :warning: Will throw errors on:

- The input is incorrectly formatted.
- either property is not of type "string"

### **range_query(obj)**

```js
obj = {
  attribute_name: "some_property_name",
  attribute_max_value: number, // OPTIONAL
  attribute_min_value: number, // OPTIONAL
};
```

#### :warning: Will throw errors on

- The input is incorrectly formatted.
- attribute_name is not of type "string"

### **sorted_attribute_query(obj)**

```js
obj = {
  attribute_name: "The attribute whose value is used as the sort key",
  initial_attribute_value:
    "The first attribute value to be returned by the query", // OPTIONAL
  sort_order: `"ASC" or "DESC"`, // OPTIONAL
};
```

#### :warning: Will throw errors on

- The input is incorrectly formatted.
- sort_order contains any value other than "ASC" or "DESC";

### **text_query(arr)**

Takes an array of \_no more than\* three strings. Throws an error on an empty array or if the array has a length greater than 3

```js
arr = ["word1", "word2", "word3"];
```

#### :warning: Will throw errors on

- The array passed has more than 3 elements.

### **text_query_add(word)**

Caches the keywords array if there is one. Makes a new array if not.
Adds the new word to the array.
Warning: If the array length is greater than 2, this method will remove every elment past the second before
adding the new word.

```js
word = "some word";
```

#### :warning: Will throw errors on

- None. See setter.

### **text_query_remove(word)**

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

#### :no_entry: Errors

- Will throw an error if there are no keywords or no keyword array.

<br/>

## Catalog_Search_Objects_Cross_Reference

> **Note**: Square docs misrepresent the way the query property works.
> They say that cross-reference properties sit on the query property. They do not.
> They replace it. This class takes care of that so you don't have to worry about it.

### **What this class does**

It allows you to cross-reference objects with other objects they reference. For example, you may want to find
all products that use a particular tax. That tax will have its own unique object ID that is stored in all objects
that use it. This lets you find them.

You can use it to cross-reference items, item-variations, modifier-lists, and taxes. You can only do it for one of those
types at a time.

#### **How to USE**

1. Instantiate the class, as usual.
2. Add the IDs you want to cross reference.
3. Tell it which type of object you want. This MUST be done AFTER step 2.
4. `await` the request.
5. The data will be cached on the delivery property.

#### **Details**

1. `const xref = new Catalog_Search_Objects_Cross_Reference()`
2. `xref.addId("some id").addId("some other id") ...`
3. `xref.items()` // you can also chain this on to the previous step as long as it is last
4. `await xref.request`
5. `console.log(xref.delivery)`

### **Adding IDs**

simply call `.addId("the id you want toadd")`
You can chain on as many as you want or call it multiple times from different lines. It's all the same.

### **Item types**

You can chain these, as many times as you like. But only the one at the very end of the whole chain will work. Which means
that if you make a mistake and call the wrong one, just call the right one afterwards and all wil be good.

Your options for step 3 in Details are:
(these are called without arguments)

- `.items()`
- `.variations()`
- `.modifiers()`
- `.taxes()`

### **Removing IDs**

You can clear all your IDs by calling `.clearIds()`

There is not a way presently to remove just one id. There is a feature request for this: see Issue #85

<br/>

## Catalog_Search_Items

Use this class when you want to search only Items and Item-Variations
It is analogous to Square's [Search catalog items](https://developer.squareup.com/reference/square/catalog-api/search-catalog-items)

### **Sort Order**

Possible values are "ASC" _or_ "DESC". You can use one or the other.

**To use:**

- `.sort_order = "ASC";`
- `.sort_order = "DESC";`
- `.make().sort_order("ASC")`
- `.make().sort_order("DESC")`
- `.sortup()`
- `.sortdown()`

### **Stock Levels**

Search by whether you are completely or amost out of something. If you don't have inventory enabled for the item, this wil fudge up your search.
Can accept two values "OUT" and "LOW". You can use both at the same time.

**To use:**

- `.stock_levels = str;`
- `.make().stock_levels(str)`
- `.low()`
- `.out()`
- `.lowout()`
- `.outlow()`

`.lowout()` and `.outlow()` do exactly the same thing. They set the vaue to both "LOW" and "OUT".
Whichever one sticks in your brain is the correct one to use.

### **Text Filter**

It's what it sounds like. You give it a string, it looks for that string.

For items it searches the fields

- `name`
- `description`
- `abbreviation`

For item-variations it searches the fields

- `name`
- `sku`
- `upc`

**To use:**

- `.text_filter = str`
- `.make().text_filter(str)`
- `.text(str)`

### **Product Types**

You can limit your search to either "REGULAR" or "APPOINTMENTS_SERVICE"

It will only accept those two values. Any other input will throw an error.
To make it easy you can just all `.regular` or `.appt()` without arguments and the exact
value will be set.

**To use:**

- `.product_type = str`
- `.make().product_type(str)`
- `.regular()`
- `.appt()`

### **Category IDs**

Feed it the object ID of the category you want to filter by. It would be nice if we could just use the category name, but we can't, not allowed.

**To use:**

- `.category_ids = id;`
- `.make().category_ids(id)`
- `.category(id)`

### **Enabled Location IDs**

Feed it the object ID of the category you want to filter by.

**To use:**

- `.enabled_location_ids = id;`
- `.make().enabled_location_ids(id)`
- `.location(id)`

### **Custom Attribute Filters**

Custom attributes are unsuppored. You can still use that feature, but you will have to carefully construct your own data structures. I chose not
to support this feature in depth because [Pieville USA](https://www.pievilleusa.com/) does not and will not use it, and it would require
substantial time and work to implement. If you like this feature of Square's API and would like to build it for this package please consider becoming a code contributor for this FOSS package.

Pass your object as an argument to the methods `make().custom_attribute_filters` or `.custom()`.

Other than enforcing the maximum array length, there is no error checking in these methods. So if you do it wrong, Square will reject your request.

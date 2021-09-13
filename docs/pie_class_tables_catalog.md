**Structures**

| Level One Classes | Super | Implemented | Short Notes |
| ----------------- | ----- | ----------- | ----------- |
| SquareRequest     | none  | yes         |

| Level Two Classes | Super         | Implemented | Short Notes |
| ----------------- | ------------- | ----------- | ----------- |
| Catalog_Request   | SquareRequest | !           |

| Level Three Classes                    | Super           | Implemented | Short Notes                                                                                                                   |
| -------------------------------------- | --------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Catalog_list                           | Catalog_Request |             |
| Catalog_Upsert                         | Catalog_Request |             | This class could probably be simplified like Delete and Retrieve, but maybe leave it in case we need a model to expand later? |
| Catalog_Delete                         | Catalog_Request |             |
| Catalog_Retrieve                       | Catalog_Request |             |
| Catalog_Search_Items                   | Catalog_Request | !           |
| Catalog_Search_Objects_Filter          | Catalog_Request |             | This is the stackable side of the Objects Search endpoint                                                                     |
| Catalog_Search_Objects_Cross_Reference | Catalog_Request | !           | This is the non-stackable side of the Objects Search endpoint                                                                 |
| Catalog_Info                           | Catalog_Request | !           |
| Catalog_Image                          | Catalog_Request | !           |

# Cross Reference: Pie and Square

| API     | Command              | Method | Resource Location                     | Class                                  | Square Docs                                                                                                     | Additional Information |
| ------- | -------------------- | ------ | ------------------------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Catalog | UPSERT one           | POST   | '/catalog/object'                     | Catalog_Upsert                         | [UPSERT one](https://developer.squareup.com/reference/square/catalog-api/upsert-catalog-object)                 |
| Catalog | UPSERT many          | POST   | '/catalog/batch-upsert'               | Catalog_Upsert                         | [UPSERT many](https://developer.squareup.com/reference/square/catalog-api/batch-upsert-catalog-objects)         |
| Catalog | RETRIEVE one         | POST   | '/catalog/object/{object_id}'         | Catalog_Retrieve                       | [RETRIEVE one](https://developer.squareup.com/reference/square/catalog-api/retrieve-catalog-object)             |
| Catalog | RETRIEVE many        | POST   | '/catalog/batch-retrieve'             | Catalog_Retrieve                       | [RETRIEVE many](https://developer.squareup.com/reference/square/catalog-api/batch-retrieve-catalog-objects)     |
| Catalog | UPDATE modifer lists | POST   | '/catalog/update-item-modifier-lists' | Catalog_Update                         | [UPDATE modifier lists](https://developer.squareup.com/reference/square/catalog-api/update-item-modifier-lists) |
| Catalog | UPDATE item taxes    | POST   | '/catalog/update-item-taxes'          | Catalog_Update                         | [UPDATE taxes](https://developer.squareup.com/reference/square/catalog-api/update-item-taxes)                   |
| Catalog | DELETE               | POST   | '/catalog/batch-delete'               | Catalog_Delete                         | [DELETE many](https://developer.squareup.com/reference/square/catalog-api/batch-delete-catalog-objects)         |
| Catalog | SEARCH items         | POST   | '/catalog/search-catalog-items'       | Catalog_Search_Items                   | [SEARCH Items](https://developer.squareup.com/reference/square/catalog-api/search-catalog-items)                |
| Catalog | SEARCH objects       | POST   | '/catalog/search'                     | Catalog_Search_Objects_Filter          | [SEARCH Objects](https://developer.squareup.com/reference/square/catalog-api/search-catalog-items)              |
| Catalog | SEARCH objects       | POST   | '/catalog/search'                     | Catalog_Search_Objects_Cross_Reference | [SEARCH Objects](https://developer.squareup.com/reference/square/catalog-api/search-catalog-items)              |
| Catalog | LIST                 | GET    | '/catalog/list'                       | Catalog_List                           | [LIST](https://developer.squareup.com/reference/square/catalog-api/list-catalog)                                |
| Catalog | INFO                 | GET    | '/catalog/info'                       | Catalog_Info                           | [INFO](https://developer.squareup.com/reference/square/catalog-api/catalog-info)                                |
| Catalog | CREATE image         | POST   | '/catalog/images'                     | Catalog_Image                          | [CREATE image](https://developer.squareup.com/reference/square/catalog-api/create-catalog-image)                |

##delete
method: POST
Nope, sorry, NOT DELETE. waaaaaahhhhhh?
Square has TWO delete endpoints. One for single items and one for batches.
The only functional difference between them is one takes a string, and one takes an array of strings.
BUT the one that takes the array will accept an array of one. So we didn't see a point in writing
two classes to do one thing when we could write one class to do one thing.

A note on deleting objects from Square: as long as the request is correctly formatted Square will return a
200 OKIEDOKE, meaning, that even if you send it gibberesh, as long as it is correctly formatted gibberish
Square will accept it, but also apparently confirm the delete that didn't even happen.

If the response is missing the "deleted_object_ids" array, that means it didn't delete anything.

```js
const del = new Catalog_Delete();
del.nix("not_even_a_real_id");
await del.request();
```

begets

```sh
{ deleted_at: '2021-09-03T23:00:53.445Z' }
```

##retrieve
method: POST
Only used 'batch' since that can handle just one

##upsert
This can probably be simplified the way Delete and Retrieve have been.
method: POST
. batch
.one

##update
method: super
.taxes
.modifier_lists

##search items can only search for items or item variations

#search objects can search for any type of catalog objects.
Square's endpoint does two mutually exclusive things. It allows you to stack criteria to create a filter. Or it allows you to
cross reference objects that contain references to other objects of certain types. Therefore we breakt the functionality into
two distince classes, both subs of Catalog_Request_Search

## Catalog_Request_Object_Search_Filter

With this class you can stack on all the allowable filters pretty much without limit. The class will correctly format the request.body
at a high level. You must still pass arguments with specific structures, gernally an object with one to three properties. The setters
enforce these structures so you can't accidentally pass in an incorrect structure, as the class will reject them. The error messages
will tell you what you did wrong.

**With the [Catalog_Search_Filter]("./pie_catalog_request_search.md") class you can:**

- _exact_query_ - this one is not very forgiving. If you are even one letter off it won't return anything.
- _set_query_ - Searches one property name and returns all matching objects. Pass it an array of string values. `["coffee", "tea"]`. There is no limit to how many values you can pass in.
  Values must be spelled exactly and are case insensitive.
- _prefix_query_ - as far as I can tell this may be the "fuzzy" version of exact_query. It does the basically same thing but allows partial values. for example: Find names that start with a given letter.
- _range_query_ - for finding numeric values. If searching by price, use "amount" for attribute_name.
- _text_query_ - Indiscriminate property search. Pass it up to three string values. If any property has that value, the object is returned.

## Catalog_Request_Object_Search_Cross_Reference

#info
method: get

#create image
method: get

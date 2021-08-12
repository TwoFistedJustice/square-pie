quick notes: there are no PUTs for Catalog
allowed methods are POST, GET, DELETE
< > METHOD is probably not the best way to group these, since some GET and POST are nearly the same
Batch actions are generally POST - even when POST isn't usual
Single actions are generally the usual command

Maybe group them by Batch or One since they seem to line up that way
Argument against: They line up better on the response side by doing them by overall action type

**Structures**

| Level One Classes | Super | Implemented | Short Notes |
| ----------------- | ----- | ----------- | ----------- |
| SquareRequest     | none  | !           |

| Level Two Classes | Super         | Method | Implemented | Short Notes |
| ----------------- | ------------- | ------ | ----------- | ----------- |
| Batch             | SquareRequest | POST   | !           |

### RETRIEVE - Batch vs One

< > These are basically the same except for the endpoint and method

|       | Method | Resource Location            | payload                 | Square Docs                                                                                                  |
| ----- | ------ | ---------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| batch | POST   | 'catalog/batch-retrieve'     | object_ids: ["id", ...] | [Retrieve batch](https://developer.squareup.com/reference/square/catalog-api/batch-retrieve-catalog-objects) |
| one   | GET    | 'catalog/object/{object_id}' | object_id: "id"         | [Retrieve one](https://developer.squareup.com/reference/square/catalog-api/retrieve-catalog-object)          |

### UPSERT - Batch vs One

< > these two are basically the same, except one sends an array of objects and the other a single object
Post 2: Batch upsert\
Post 2: Upsert one
Differences:

|       | Method | Resource Location      | Body Properties     | Square Docs                                                                                              |
| ----- | ------ | ---------------------- | ------------------- | -------------------------------------------------------------------------------------------------------- |
| batch | POST   | 'catalog/batch-upsert' | batches: [ {}, ...] | [Upsert batch](https://developer.squareup.com/reference/square/catalog-api/batch-upsert-catalog-objects) |
| one   | POST   | 'catalog/object'       | object: {}          | [Upsert one](https://developer.squareup.com/reference/square/catalog-api/upsert-catalog-object)          |

< > I think I can make a single class that handles both with a simple chainer
upsert.one() and upsert.many() or upsert.alot()

### DELETE - Batch vs One

< > These are basically the same except for the endpoint and method

|       | Method | Resource Location            | Body Properties         | Square Docs                                                                                              |
| ----- | ------ | ---------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------- |
| batch | POST   | 'catalog/batch-retrieve'     | object_ids: ["id", ...] | [Delete batch](https://developer.squareup.com/reference/square/catalog-api/batch-delete-catalog-objects) |
| one   | DELETE | 'catalog/object/{object_id}' | object_id: "id"         | [Delete one](https://developer.squareup.com/reference/square/catalog-api/delete-catalog-object)          |

### UPDATE - Taxes - Modifier Lists

< > Same except for the endpoint, method, and names of body properties

|                | Method | Resource Location                    | Body Properties                        | Square Docs                                                                                                     |
| -------------- | ------ | ------------------------------------ | -------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| item Taxes     | POST   | 'catalog/update-item-taxes'          | item_ids: ["id", ...]                  | [Update taxes](https://developer.squareup.com/reference/square/catalog-api/update-item-taxes)                   |
|                |        |                                      | modifier_lists_to_enable: ["id", ...]  |
|                |        |                                      | modifier_lists_to_disable: ["id", ...] |
| Modifier Lists | POST   | 'catalog/update-item-modifier-lists' | item_ids: ["id", ...]                  | [Update modifier lists](https://developer.squareup.com/reference/square/catalog-api/update-item-modifier-lists) |
|                |        |                                      | taxes_to_enable: ["id", ...]           |
|                |        |                                      | taxes_to_disable: ["id", ...]          |

### SEARCH - Items

|     | Method | Resource Location              | Body Properties                   | Square Docs                                                                                |
| --- | ------ | ------------------------------ | --------------------------------- | ------------------------------------------------------------------------------------------ |
|     | POST   | 'catalog/search-catalog-items' | ^^^text_filter: Str               | [Search](https://developer.squareup.com/reference/square/catalog-api/search-catalog-items) |
|     |        |                                | category_ids: ["id", ...]         |
|     |        |                                | ^^^stock_levels: Str              |
|     |        |                                | enabled_location_ids: ["id", ...] |
|     |        |                                | cursor: Str                       |
|     |        |                                | Limit: Number 1-100               |
|     |        |                                | ^^^sort_order: Str                |
|     |        |                                | ^^^product_types: []              |
|     |        |                                | ^^^custom_attribute_filters: []   |

### SEARCH - Objects

|     | Method | Resource Location | Body Properties                  | Square Docs                                                                                  | Short notes             |
| --- | ------ | ----------------- | -------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------- |
|     | POST   | 'catalog/search'  |                                  | [Search](https://developer.squareup.com/reference/square/catalog-api/search-catalog-objects) |
|     |        |                   | cursor: Str                      |
|     |        |                   | ^^^object_types: [Str, ...]      |
|     |        |                   | include_deleted_objects: boolean |
|     |        |                   | include_related_objects: boolean |
|     |        |                   | begin_time: str                  |
|     |        |                   | ^^^query: CatalogQuery           |                                                                                              | Might be complicated... |
|     |        |                   | Limit: Number 1-100              |

###Post

IMAGE looks more complex than the others...
Post 3: Create - upload an image -- CAREFUL - this one can cause DB bloat! it allows floaters.

###GET
Get: Info - definitely its own thing - just returns a set of parameters you must live by\
Get: List - Except for the method this is very similar to Search (this one uses 'type' only)

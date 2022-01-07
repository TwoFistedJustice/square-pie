# Square API Tables: Catalog Requests

> Quick Notes: there are no PUTs for Catalog

Allowed methods are POST, GET, DELETE

< > METHOD is probably not the best way to group these, since some GET and POST are nearly the same

Batch actions are generally POST - even when POST isn't usual

Single actions are generally the usual command

Maybe group them by Batch or One since they seem to line up that way
Argument against: They line up better on the response side by doing them by overall action type

<br/>

## Structures

<br/>

### Level One Classes

| Level One Classes | Super | Implemented | Short Notes |
| ----------------- | ----- | ----------- | ----------- |
| Square_Request    | none  | !           |

<br/>

### Level Two Classes

| Level Two Classes | Super          | Implemented | Short Notes |
| ----------------- | -------------- | ----------- | ----------- |
| Catalog_Request   | Square_Request |

<br/>

### Level Three Classes

| Level Three Classes                    | Super           | Method         | Implemented | Short Notes                                                                               |
| -------------------------------------- | --------------- | -------------- | ----------- | ----------------------------------------------------------------------------------------- |
| Catalog_Upsert                         | Catalog_Request | POST           |             |
| Catalog_List                           | Catalog_Request | GET            |             |
| Catalog_Delete                         | Catalog_Request | POST && DELETE |             | Square has TWO, we have one that handles both because Square's are functional duplicates. |
| Catalog_Retrieve                       | Catalog_Request | POST && GET    |             | Square has TWO, we have one that handles both because Square's are functional duplicates. |
| Catalog_Search_Items                   | Catalog_Request | POST           |             |
| Catalog_Search_Objects_Filter          | Catalog_Request | POST           |             |
| Catalog_Search_Objects_Cross_Reference | Catalog_Request | POST           |             |
| Catalog_Create_Image                   | Catalog_Request | GET            | !           |
| Catalog_Info                           | Catalog_Request | GET            |             |

<br/>

### UPSERT - Batch vs One

< > these two are basically the same, except one sends an array of objects and the other a single object

|       | Method | Resource Location      | Body Properties     | Response Fields         | Square Docs                                                                                              | Short notes |
| ----- | ------ | ---------------------- | ------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------- | ----------- |
| batch | POST   | 'catalog/batch-upsert' |                     |                         | [Upsert batch](https://developer.squareup.com/reference/square/catalog-api/batch-upsert-catalog-objects) |
|       |        |                        | batches: [ {}, ...] |                         |                                                                                                          |             |
|       |        |                        |                     | objects: [ ]            |                                                                                                          |             |
|       |        |                        |                     | updated_at: str         |                                                                                                          |             |
|       |        |                        |                     | id_mappings: []         |                                                                                                          |             |
| one   | POST   | 'catalog/object'       |                     |                         | [Upsert one](https://developer.squareup.com/reference/square/catalog-api/upsert-catalog-object)          |
|       |        |                        | object: {}          |                         |                                                                                                          |             |
|       |        |                        |                     | catalog_object: cat-obj |                                                                                                          |             |
|       |        |                        |                     | id_mappings: [ ]        |                                                                                                          |             |

< > I think I can make a single class that handles both with a simple chainer
`upsert.one()` and `upsert.many()` or `upsert.alot()`

<br/>

### RETRIEVE - Batch vs One

< > These are basically the same except for the endpoint and method

|       | Method | Resource Location            | Body Properties         | Response Fields      | Square Docs                                                                                                  | Short notes |
| ----- | ------ | ---------------------------- | ----------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------ | ----------- |
| batch | POST   | 'catalog/batch-retrieve'     | object_ids: ["id", ...] |                      | [Retrieve batch](https://developer.squareup.com/reference/square/catalog-api/batch-retrieve-catalog-objects) |
|       |        |                              |                         | objects: [ ]         |                                                                                                              |             |
|       |        |                              |                         | related_objects: [ ] |                                                                                                              |             |
| one   | GET    | 'catalog/object/{object_id}' | object_id: "id"         |                      | [Retrieve one](https://developer.squareup.com/reference/square/catalog-api/retrieve-catalog-object)          |
|       |        |                              |                         | object: cat-obj      |                                                                                                              |             |
|       |        |                              |                         | related_objects: [ ] |                                                                                                              |             |

<br/>

### DELETE - Batch vs One

< > These are basically the same except for the endpoint and method

- the batch version can handle single deletes just fine. No reason to code both of them.

|       | Method | Resource Location            | Body Properties         | Response Fields          | Square Docs                                                                                              | Short notes |
| ----- | ------ | ---------------------------- | ----------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------- | ----------- |
| batch | POST   | 'catalog/batch-retrieve'     | object_ids: ["id", ...] |                          | [Delete batch](https://developer.squareup.com/reference/square/catalog-api/batch-delete-catalog-objects) |
| one   | DELETE | 'catalog/object/{object_id}' | object_id: "id"         |                          | [Delete one](https://developer.squareup.com/reference/square/catalog-api/delete-catalog-object)          |
|       |        |                              |                         | deleted_objects_ids: [ ] |                                                                                                          |
|       |        |                              |                         | deleted_at: str          |                                                                                                          |

<br/>

### UPDATE - Taxes - Modifier Lists

|                | Method | Resource Location                    | Body Properties                        | Response Fields | Square Docs                                                                                                     | Short notes |
| -------------- | ------ | ------------------------------------ | -------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------- | ----------- |
| item Taxes     | POST   | 'catalog/update-item-taxes'          |                                        |                 | [Update taxes](https://developer.squareup.com/reference/square/catalog-api/update-item-taxes)                   |
|                |        |                                      | item_ids: ["id", ...]                  |
|                |        |                                      | modifier_lists_to_enable: ["id", ...]  |
|                |        |                                      | modifier_lists_to_disable: ["id", ...] |
| Modifier Lists | POST   | 'catalog/update-item-modifier-lists' | item_ids: ["id", ...]                  |                 | [Update modifier lists](https://developer.squareup.com/reference/square/catalog-api/update-item-modifier-lists) |
|                |        |                                      | taxes_to_enable: ["id", ...]           |
|                |        |                                      | taxes_to_disable: ["id", ...]          |
|                |        |                                      |                                        | updated_at: str |

<br/>

### SEARCH - Items

|     | Method | Resource Location              | Body Properties                   | Response Fields        | Square Docs                                                                                      | Short notes |
| --- | ------ | ------------------------------ | --------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------ | ----------- |
|     | POST   | 'catalog/search-catalog-items' |                                   |                        | [Search Items](https://developer.squareup.com/reference/square/catalog-api/search-catalog-items) |
|     |        |                                | ^^^text_filter: Str               |                        |                                                                                                  |
|     |        |                                | category_ids: ["id", ...]         |
|     |        |                                | ^^^stock_levels: Str              |
|     |        |                                | enabled_location_ids: ["id", ...] |
|     |        |                                | cursor: Str                       |
|     |        |                                | Limit: Number 1-100               |
|     |        |                                | ^^^sort_order: Str                |
|     |        |                                | ^^^product_types: []              |
|     |        |                                | ^^^custom_attribute_filters: []   |
|     |        |                                |                                   | items: [cat-obj, ... ] |                                                                                                  |             |

<br/>

### SEARCH - Objects

We are treating this as TWO endpoints in one.

1. a filter for layering on criteria
2. a cross-reference for matching objects which contain references to other specific objects

|     | Method | Resource Location | Body Properties                  | Response Fields      | Square Docs                                                                                          | Short notes                                                                                                              |
| --- | ------ | ----------------- | -------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
|     | POST   | 'catalog/search'  |                                  |                      | [Search Objects](https://developer.squareup.com/reference/square/catalog-api/search-catalog-objects) |
|     |        |                   | cursor: str                      |
|     |        |                   | ^^^object_types: [str, ...]      |
|     |        |                   | include_deleted_objects: boolean |
|     |        |                   | include_related_objects: boolean |
|     |        |                   | begin_time: str                  |
|     |        |                   | ^^^query: CatalogQuery           |                      |                                                                                                      | has several stackable features and several non-stackable features. stackable and non-stackable will be separate classes. |
|     |        |                   | Limit: Number 1-100              |
|     |        |                   |                                  | objects: [ ]         |
|     |        |                   |                                  | related_objects: [ ] |

<br/>

### lIST - Objects

|     | Method | Resource Location | Body Properties      | Response Fields | Square Docs                                                                      | Short notes |
| --- | ------ | ----------------- | -------------------- | --------------- | -------------------------------------------------------------------------------- | ----------- |
|     | GET    | 'catalog/list'    |                      |                 | [List](https://developer.squareup.com/reference/square/catalog-api/list-catalog) |
|     |        |                   | cursor : str         |                 |
|     |        |                   | ^^^types: str,csv    |                 |
|     |        |                   | catalog_version: int |                 |
|     |        |                   |                      | objects: [ ]    |

<br/>

### CREATE IMAGE

IMAGE looks more complex than the others...
Post 3: Create - upload an image -- CAREFUL - this one can cause DB bloat! it allows floaters.

|     | Method | Resource Location | Body Properties      | Response Fields | Square Docs                                                                      | Short notes                                  |
| --- | ------ | ----------------- | -------------------- | --------------- | -------------------------------------------------------------------------------- | -------------------------------------------- |
|     | GET    | 'catalog/images'  |                      |                 | [Info](https://developer.squareup.com/reference/square/catalog-api/catalog-info) | returns a set of parameters you must live by |
|     |        |                   | idempotency_key: str |                 |
|     |        |                   | object_id: "id"      |                 |
|     |        |                   | image                |                 |
|     |        |                   |                      |                 |
|     |        |                   |                      |                 |
|     |        |                   |                      | image: cat-obj  |

<br/>

### INFO

|     | Method | Resource Location | Body Properties | Response Fields                    | Square Docs                                                                      | Short notes                                  |
| --- | ------ | ----------------- | --------------- | ---------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------- |
|     | GET    | 'catalog/info'    | empty           |                                    | [Info](https://developer.squareup.com/reference/square/catalog-api/catalog-info) | returns a set of parameters you must live by |
|     |        |                   |                 | ^^^limits                          |
|     |        |                   |                 | ^^^standard_unit_description_group |

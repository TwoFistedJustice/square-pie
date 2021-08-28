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
| Square_Request    | none  | !           |

| Level Two Classes      | Super         | Method         | Implemented | Short Notes |
| ---------------------- | ------------- | -------------- | ----------- | ----------- |
| Catalog_Upsert         | SquareRequest | POST           | !           |
| Catalog_List_Objects   | SquareRequest | GET            | !           |
| Catalog_Delete         | SquareRequest | POST && DELETE | !           |
| Catalog_Retrieve       | SquareRequest | POST && GET    | !           |
| Catalog_Search_Items   | SquareRequest | POST           | !           |
| Catalog_Search_Objects | SquareRequest | POST           | !           |
| Catalog_Create_Image   | SquareRequest | GET            | !           |
| Catalog_Info           | SquareRequest | GET            | !           |

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
upsert.one() and upsert.many() or upsert.alot()

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

### DELETE - Batch vs One

< > These are basically the same except for the endpoint and method

|       | Method | Resource Location            | Body Properties         | Response Fields          | Square Docs                                                                                              | Short notes |
| ----- | ------ | ---------------------------- | ----------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------- | ----------- |
| batch | POST   | 'catalog/batch-retrieve'     | object_ids: ["id", ...] |                          | [Delete batch](https://developer.squareup.com/reference/square/catalog-api/batch-delete-catalog-objects) |
| one   | DELETE | 'catalog/object/{object_id}' | object_id: "id"         |                          | [Delete one](https://developer.squareup.com/reference/square/catalog-api/delete-catalog-object)          |
|       |        |                              |                         | deleted_objects_ids: [ ] |                                                                                                          |
|       |        |                              |                         | deleted_at: str          |                                                                                                          |

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

### SEARCH - Items

|     | Method | Resource Location              | Body Properties                   | Response Fields        | Square Docs                                                                                | Short notes |
| --- | ------ | ------------------------------ | --------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------ | ----------- |
|     | POST   | 'catalog/search-catalog-items' |                                   |                        | [Search](https://developer.squareup.com/reference/square/catalog-api/search-catalog-items) |
|     |        |                                | ^^^text_filter: Str               |                        |                                                                                            |
|     |        |                                | category_ids: ["id", ...]         |
|     |        |                                | ^^^stock_levels: Str              |
|     |        |                                | enabled_location_ids: ["id", ...] |
|     |        |                                | cursor: Str                       |
|     |        |                                | Limit: Number 1-100               |
|     |        |                                | ^^^sort_order: Str                |
|     |        |                                | ^^^product_types: []              |
|     |        |                                | ^^^custom_attribute_filters: []   |
|     |        |                                |                                   | items: [cat-obj, ... ] |                                                                                            |             |

### SEARCH - Objects

|     | Method | Resource Location | Body Properties                  | Response Fields      | Square Docs                                                                                  | Short notes |
| --- | ------ | ----------------- | -------------------------------- | -------------------- | -------------------------------------------------------------------------------------------- | ----------- |
|     | POST   | 'catalog/search'  |                                  |                      | [Search](https://developer.squareup.com/reference/square/catalog-api/search-catalog-objects) |
|     |        |                   | cursor: str                      |
|     |        |                   | ^^^object_types: [str, ...]      |
|     |        |                   | include_deleted_objects: boolean |
|     |        |                   | include_related_objects: boolean |
|     |        |                   | begin_time: str                  |
|     |        |                   | ^^^query: CatalogQuery           |                      | Might be complicated...                                                                      |
|     |        |                   | Limit: Number 1-100              |
|     |        |                   |                                  | objects: [ ]         |
|     |        |                   |                                  | related_objects: [ ] |

### lIST - Objects

|     | Method | Resource Location | Body Properties      | Response Fields | Square Docs                                                                      | Short notes |
| --- | ------ | ----------------- | -------------------- | --------------- | -------------------------------------------------------------------------------- | ----------- |
|     | GET    | 'catalog/list'    |                      |                 | [List](https://developer.squareup.com/reference/square/catalog-api/list-catalog) |
|     |        |                   | cursor : str         |                 |
|     |        |                   | ^^^types: str,csv    |                 |
|     |        |                   | catalog_version: int |                 |
|     |        |                   |                      | objects: [ ]    |

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

###INFO
| | Method | Resource Location | Body Properties | Response Fields | Square Docs | Short notes |
| --- | ------ | ----------------- | -------------------- | --------------- | -------------------------------------------------------------------------------- | ----------- |
| | GET | 'catalog/info' | empty | | [Info](https://developer.squareup.com/reference/square/catalog-api/catalog-info) |returns a set of parameters you must live by
| | | | | ^^^limits |
| | | | | ^^^standard_unit_description_group |

**Structures**

| Level One Classes | Super | Implemented | Short Notes |
| ----------------- | ----- | ----------- | ----------- |
| SquareRequest     | none  | yes         |

#Catalog_Request
api_name: 'catalog

| Level Two Classes | Super         | Implemented | Short Notes |
| ----------------- | ------------- | ----------- | ----------- |
| Catalog_Request   | SquareRequest | !           |

| Level Three Classes | Super          | Implemented | Short Notes |
| ------------------- | -------------- | ----------- | ----------- |
| Catalog_URDU        | Square_Request | !           |
| Catalog_Search      | Square_Request | !           |
| Catalog_Info        | Square_Request | !           |
| Catalog_list        | Square_Request | !           |
| Catalog_Image       | Square_Request | !           |

# Upsert_Retrieve_Update_Delete (URDU )

method: post

#Search
method: post

#info
method: get

#list
method: get

#create image
method: get

| Level Four Classes     | Super           | Implemented | Short Notes |
| ---------------------- | --------------- | ----------- | ----------- |
| Catalog_Upsert         | Catalog_Request |             |
| Catalog_Retrieve       | Catalog_Request | !           |
| Catalog_Update         | Catalog_Request | !           |
| Catalog_Delete         | Catalog_Request |             |
| Catalog_Search_Items   | Catalog_Search  | !           |
| Catalog_Search_Objects | Catalog_Search  | !           |

##delete
method: POST
Nope, sorry, NOT DELETE. waaaaaahhhhhh?
Square has TWO delete endpoints. One for single items and one for batches.
The only functional difference between them is on takes a string, and one takes an array of strings.
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
super: URDU
method: super
. batch
.one

##upsert
super: URDU
method: super
. batch
.one

##update
super: URDU
method: super
.taxes
.modifier_lists

< > response fields are pretty different
< > THESE NEED BETTER NAMES - TOO EASILY CONFUSED...
##search items can only search for items or item variations
method: post
super: Search

#search objects can search for any type of catalog objects.
method: post
super: Search

| API     | Command              | Method | Resource Location                     | Class                  | Square Docs                                                                                                     | Additional Information |
| ------- | -------------------- | ------ | ------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Catalog | UPSERT one           | POST   | '/catalog/object'                     | Catalog_Upsert         | [UPSERT one](https://developer.squareup.com/reference/square/catalog-api/upsert-catalog-object)                 |
| Catalog | UPSERT many          | POST   | '/catalog/batch-upsert'               | Catalog_Upsert         | [UPSERT many](https://developer.squareup.com/reference/square/catalog-api/batch-upsert-catalog-objects)         |
| Catalog | RETRIEVE one         | POST   | '/catalog/object/{object_id}'         | Catalog_Retrieve       | [RETRIEVE one](https://developer.squareup.com/reference/square/catalog-api/retrieve-catalog-object)             |
| Catalog | RETRIEVE many        | POST   | '/catalog/batch-retrieve'             | Catalog_Retrieve       | [RETRIEVE many](https://developer.squareup.com/reference/square/catalog-api/batch-retrieve-catalog-objects)     |
| Catalog | UPDATE modifer lists | POST   | '/catalog/update-item-modifier-lists' | Catalog_Update         | [UPDATE modifier lists](https://developer.squareup.com/reference/square/catalog-api/update-item-modifier-lists) |
| Catalog | UPDATE item taxes    | POST   | '/catalog/update-item-taxes'          | Catalog_Update         | [UPDATE taxes](https://developer.squareup.com/reference/square/catalog-api/update-item-taxes)                   |
| Catalog | DELETE one           | DELETE | '/catalog/object/{object_id}'         | Catalog_Delete         | [DELETE delete](https://developer.squareup.com/reference/square/catalog-api/delete-catalog-object)              |
| Catalog | DELETE many          | POST   | '/catalog/batch-delete'               | Catalog_Delete         | [DELETE many](https://developer.squareup.com/reference/square/catalog-api/batch-delete-catalog-objects)         |
| Catalog | SEARCH items         | POST   | '/catalog/search-catalog-items'       | Catalog_Search_Items   | [SEARCH Items](https://developer.squareup.com/reference/square/catalog-api/search-catalog-items)                |
| Catalog | SEARCH objects       | POST   | '/catalog/search'                     | Catalog_Search_Objects | [SEARCH Objects](https://developer.squareup.com/reference/square/catalog-api/search-catalog-items)              |
| Catalog | LIST                 | GET    | '/catalog/list'                       | Catalog_List           | [LIST](https://developer.squareup.com/reference/square/catalog-api/list-catalog)                                |
| Catalog | INFO                 | GET    | '/catalog/info'                       | Catalog_Info           | [INFO](https://developer.squareup.com/reference/square/catalog-api/catalog-info)                                |
| Catalog | CREATE image         | POST   | '/catalog/images'                     | Catalog_Image          | [CREATE image](https://developer.squareup.com/reference/square/catalog-api/create-catalog-image)                |

| End User Classes | Constructor Arguments | Response Field | Short Notes |
| ---------------- | --------------------- | -------------- | ----------- |
|                  |                       |                |

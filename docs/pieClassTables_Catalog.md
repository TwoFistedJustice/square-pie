quick notes: there are no PUTs for Catalog
allowed methods are POST, GET, DELETE

**Structures**

| Level One Classes | Super | Implemented | Short Notes |
| ----------------- | ----- | ----------- | ----------- |
| SquareRequest     | none  | !        |


| Level Two Classes    | Super         | Method |Implemented | Short Notes |
| -------------------- | ------------- | ----------- |----------- | ----------- |
| Batch                 | SquareRequest | POST         | !




Post
Post 1: Batch delete [array of "ids"]
Post 1: Batch retrieve [array of "ids"]
Post 1: Update item modifier list [ array of "ids" ]- updates PART of an item
Post 1: Update item tax [array of "ids"]


[comment]: <> (these two are basically same, except one sends an array of objects and the other a single object)
Post 2: Batch upsert
Post 2: Upsert one

Post 3: Create - upload an image -- CAREFUL - this one can cause DB bloat! it allows floaters.

Post : Search objects (Broad strokes - rake)
Post : Search Items (Narrow strokes - pick)




GET
Get: Info - definitely its own thing - just returns a set of parameters you must live by
Get: List  - Except for the method this is very similar to Search (this one uses 'type' only) 

Get: One {id}

DELETE
Delete: One {id}
**Structures**

| Level One Classes | Super | Implemented | Short Notes |
| ----------------- | ----- | ----------- | ----------- |
| SquareRequest     | none  | yes         |

| Level Two Classes | Super | Implemented | Short Notes |
| ----------------- | ----- | ----------- | ----------- |
|                   |       |             |

#info
method: get

#create image
method: get

#URDU ( Upsert Retrieve Update Delete)
method: post

#Search
method: post

| Level Three Classes | Super | Implemented | Short Notes |
| ------------------- | ----- | ----------- | ----------- |
|                     |       |             |
|                     |       |             |

##delete
super: URDU
method: multiple
. batch (super)
.one (delete) (override this.\_method)

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
##search items can only search for items or item variations
method: post
super: Search

#search objects can search for any type of catalog objects.
method: post
super: Search

| Level Four Classes | Super | Implemented | Short Notes |
| ------------------ | ----- | ----------- | ----------- |
|                    |       |             |
|                    |       |             |

| API      | Command     | Method | Resource Location | Class | Square Docs    | Additional Information |
| -------- | ----------- | ------ | ----------------- | ----- | -------------- | ---------------------- |
| API name | COMMAND mod | GET    | '/url'            |       | [COMMAND](url) |

| End User Classes | Constructor Arguments | Response Field | Short Notes |
| ---------------- | --------------------- | -------------- | ----------- |
|                  |                       |                |

**Structures**

| Level One Classes | Super | Implemented | Short Notes |
| ----------------- | ----- | ----------- | ----------- |
| SquareRequest     | none  | yes         |

| Level Two Classes | Super         | Implemented | Short Notes |
| ----------------- | ------------- | ----------- | ----------- |
| Customer          | SquareRequest | yes         |

| Level Three Classes  | Super           | Implemented | Short Notes                |
| -------------------- | --------------- | ----------- | -------------------------- |
| CustomerList         | CustomerRequest | yes         |
| CustomerCreate       | Create          | yes         | needs duplicate prevention |
| CustomerSearch       | Search          | yes         |
| RetrieveUpdateDelete | CustomerRequest | yes         |
| CustomerGroup        | CustomerRequest | !           |
| CustomerUngroup      | CustomerRequest | !           |

| Level Four Classes | Super                | Implemented | Short Notes                                 |
| ------------------ | -------------------- | ----------- | ------------------------------------------- |
| CustomerDelete     | RetrieveUpdateDelete | yes         |
| CustomerRetrieve   | RetrieveUpdateDelete | yes         |
| CustomerUpdate     | RetrieveUpdateDelete | yes         | needs normalization for email and addresses |

| API      | Command               | Method | Resource Location                            | Class            | Square Docs                                                                                              | Additional Information                                                                                                  |
| -------- | --------------------- | ------ | -------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Customer | LIST all              | GET    | '/customers'                                 | CustomerList     | [LIST](https://developer.squareup.com/reference/square/customers-api/list-customers)                     |
| Customer | CREATE one            | POST   | '/customers'                                 | CustomerCreate   | [CREATE](https://developer.squareup.com/reference/square/customers-api/create-customer)                  |
| Customer | SEARCH by Attribute   | POST   | '/customers/search'                          | CustomerSearch   | [SEARCH](https://developer.squareup.com/reference/square/customers-api/search-customers)                 |
| Customer | DELETE one            | DELETE | '/customers/{customer_id}'                   | CustomerDelete   | [DELETE](https://developer.squareup.com/reference/square/customers-api/delete-customer)                  |
| Customer | RETRIEVE by ID        | POST   | '/customers/{customer_id}'                   | CustomerRetrieve | [RETRIEVE](https://developer.squareup.com/reference/square/customers-api/retrieve-customer)              |
| Customer | UPDATE one            | PUT    | '/customers/{customer_id}'                   | CustomerUpdate   | [UPDATE](https://developer.squareup.com/reference/square/customers-api/update-customer)                  | [Version Control](https://developer.squareup.com/docs/customers-api/use-the-api/keep-records#update-a-customer-profile) |
| Customer | REMOVE group from one | DELETE | '/customers/{customer_id}/groups/{group_id}' | !                | [Remove GROUP](https://developer.squareup.com/reference/square/customers-api/remove-group-from-customer) |
| Customer | ADD group from one    | PUT    | '/customers/{customer_id}/groups/{group_id}' | !                | [Add GROUP](https://developer.squareup.com/reference/square/customers-api/add-group-to-customer)         |

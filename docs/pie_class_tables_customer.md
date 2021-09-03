**Structures**

| Level One Classes | Super | Implemented | Short Notes |
| ----------------- | ----- | ----------- | ----------- |
| Square_Request    | none  | yes         |

| Level Two Classes | Super          | Implemented | Short Notes |
| ----------------- | -------------- | ----------- | ----------- |
| Customer          | Square_Request | yes         |

| Level Three Classes    | Super            | Implemented | Short Notes                |
| ---------------------- | ---------------- | ----------- | -------------------------- |
| Customer_List          | Customer_Request | yes         |
| Customer_Create        | Customer_Request | yes         | needs duplicate prevention |
| Customer_Search        | Customer_Request | yes         |
| Retrieve_Update_Delete | Customer_Request | yes         |
| Customer_Group         |                  | !           |
| Customer_Ungroup       |                  | !           |

| Level Four Classes | Super                  | Implemented | Short Notes                                 |
| ------------------ | ---------------------- | ----------- | ------------------------------------------- |
| Customer_Delete    | Retrieve_Update_Delete | yes         |
| Customer_Retrieve  | Retrieve_Update_Delete | yes         |
| Customer_Update    | Retrieve_Update_Delete | yes         | needs normalization for email and addresses |

| API      | Command               | Method | Resource Location                            | Class             | Square Docs                                                                                              | Additional Information                                                                                                  |
| -------- | --------------------- | ------ | -------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Customer | LIST all              | GET    | '/customers'                                 | Customer_List     | [LIST](https://developer.squareup.com/reference/square/customers-api/list-customers)                     |
| Customer | CREATE one            | POST   | '/customers'                                 | Customer_Create   | [CREATE](https://developer.squareup.com/reference/square/customers-api/create-customer)                  |
| Customer | SEARCH by Attribute   | POST   | '/customers/search'                          | Customer_Search   | [SEARCH](https://developer.squareup.com/reference/square/customers-api/search-customers)                 |
| Customer | DELETE one            | DELETE | '/customers/{customer_id}'                   | Customer_Delete   | [DELETE](https://developer.squareup.com/reference/square/customers-api/delete-customer)                  |
| Customer | RETRIEVE by ID        | POST   | '/customers/{customer_id}'                   | Customer_Retrieve | [RETRIEVE](https://developer.squareup.com/reference/square/customers-api/retrieve-customer)              |
| Customer | UPDATE one            | PUT    | '/customers/{customer_id}'                   | Customer_Update   | [UPDATE](https://developer.squareup.com/reference/square/customers-api/update-customer)                  | [Version Control](https://developer.squareup.com/docs/customers-api/use-the-api/keep-records#update-a-customer-profile) |
| Customer | REMOVE group from one | DELETE | '/customers/{customer_id}/groups/{group_id}' | !                 | [Remove GROUP](https://developer.squareup.com/reference/square/customers-api/remove-group-from-customer) |
| Customer | ADD group from one    | PUT    | '/customers/{customer_id}/groups/{group_id}' | !                 | [Add GROUP](https://developer.squareup.com/reference/square/customers-api/add-group-to-customer)         |

| End User Classes  | Constructor Arguments | Response Field     | Short Notes     |
| ----------------- | --------------------- | ------------------ | --------------- |
| Customer_List     | none                  | customers: [ ]     |
| Customer_Create   | Customer - Object     | customer: cust-obj |
| Customer_Search   | none                  | customers: [ ]     |
| Customer_Retrieve | ID                    | customer: cust-obj |
| Customer_Update   | ID                    | customer: cust-obj |
| Customer_Delete   | ID                    | empty or errors    |
| CustomerGroup     |                       | empty or errors    | not implemented |
| CustomerUngroup   |                       | empty or errors    | not implemented |

###Customer_List
Method | Expected Argument | Short Notes |
| -------------------- | --------------- | ----------- |
| none exist

###Customer_Create
Method |Type| Expected Argument | Short Notes |
| -------------------- | --------------- | ----------- | ----------- |
| getIdempotency_key | getter | -
| customer | setter - computed | Customer - Object | sets idempotency key and normalizes email
|super.normalizeEmail | email address - String

###Customer_Search
Method |Type| Expected Argument | Short Notes |
| -------------------- | --------------- | ----------- | ----------- |
| ⋈ ♾ query|method - chainer|-| beginning of chain - must call query.fuzzy() or query.exact()
|♾ ^ .fuzzy|method - chainer + link| sets type of query to fuzzy | returns a chain of methods
|♾ ^ .exact|method - chainer + link | sets type of query to exact | returns a chain of methods
|^ .email | method - chain link | email address- String | will get normalized automatically
|^ .phone | method - chain link | phone number - String | Validated by Square. - digits and phone number special characters only
|^ .id | method - chain link | A square ID - String | Validated by Square.
|^ .limit |method - chain link | Integer - Number | 1 -100 - default is 100
|^ .sortUp |method - chain link | - | Sets sort order to Ascending
|^ .sortDown |method - chain link | - | Sets sort order to Descending
|^ .sortByFirstName |method - chain link | - | Sorts the results by first name. This is actually the Square default.
|^ .sortByDate |method - chain link | - | Sorts the results by creation date
|^ .sortByMostRecent |method - chain link | - | Sorts the results by creation date with most recent first. (ascending)

###Customer_Retrieve
Method |Type| Expected Argument | Short Notes |
| -------------------- | --------------- | ----------- | ----------- |
|super.id|getter
|super.id|setter|square customer ID - String | sets the url endpoint and prepends '/'

###Customer_Update
Method |Type| Expected Argument | Short Notes |
| -------------------- | --------------- | ----------- | ----------- |
|super.normalizeEmail | email address - String
|super.id|getter
|super.id|setter|square customer ID - String | sets the url endpoint and prepends '/'
|given_name |getter/setter | String
| family_name|getter/setter | String
| company_name|getter/setter | String
| nickname|getter/setter | String
|email_address |getter/setter | email address - String| will be normalized automatically
| address|getter/setter | a complete adress - Object |
| phone_number|getter/setter | phone number - String | Validated by Square. - digits and phone number special characters only
| reference_id|getter/setter | Non-Square ID - String | not validated, can be any string
| note|getter/setter | - String
| version|getter/setter | Integer - Number | Must first fetch it from Square- must match the version number in their database
| ⋈ ♾ make|method - chainer|-| beginning of chain
|^ .firstName | method - chain link | String
|^ .lastName | method - chain link | String
|^ .company | method - chain link | String
|^ .nickname | method - chain link | String
|^ .email | method - chain link | email address -String | will be normalized automatically
|^ .phone | method - chain link | phone number -String | Validated by Square. - digits and phone number special characters only
|^ .note | method - chain link | String
|^ .birthday | method - chain link | Date - String | YYYY-MM-DD format.

###Customer_Delete
Method |Type| Expected Argument | Short Notes |
| -------------------- | --------------- | ----------- | ----------- |
|super.id|getter
|super.id|setter|square customer ID - String | sets the url endpoint and prepends '/'

###CustomerGroup
Method |Type| Expected Argument | Short Notes |
| -------------------- | --------------- | ----------- | ----------- |
###CustomerUngroup
Method |Type| Expected Argument | Short Notes |
| -------------------- | --------------- | ----------- | ----------- |

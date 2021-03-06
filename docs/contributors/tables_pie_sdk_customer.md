# Pie Class Tables: Customer

<br/>

## Structures

### Level One Classes

| Level One Classes | Super | Short Notes |
| ----------------- | ----- | ----------- |
| Square_Request    | none  |
| Customer_Object   | none  |

| Level Two Classes | Super          | Short Notes |
| ----------------- | -------------- | ----------- |
| Customer_Request  | Square_Request |

<br/>

### Level Three Classes

| Level Three Classes             | Super            | Implemented | Short Notes                |
| ------------------------------- | ---------------- | ----------- | -------------------------- |
| Customer_List                   | Customer_Request | yes         |
| Customer_Create                 | Customer_Request | yes         | needs duplicate prevention |
| Customer_Search                 | Customer_Request | yes         |
| Customer_Retrieve_Update_Delete | Customer_Request | yes         |
| Customer_Group                  |                  | !           |
| Customer_Ungroup                |                  | !           |

<br/>

### Level Four Classes

| Level Four Classes | Super                           | Implemented | Short Notes                       |
| ------------------ | ------------------------------- | ----------- | --------------------------------- |
| Customer_Delete    | Customer_Retrieve_Update_Delete | yes         |
| Customer_Retrieve  | Customer_Retrieve_Update_Delete | yes         |
| Customer_Update    | Customer_Retrieve_Update_Delete | yes         | needs normalization for addresses |

<br/>

### API

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
| Customer | -                     | -      | -                                            | Customer_Object   | [Customer ](https://developer.squareup.com/reference/square/objects/Customer)                            |

<br/>

### End User Classes

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

<br/>

### Customer_List

| Method | Expected Argument | Short Notes |
| ------ | ----------------- | ----------- |

| none exist

<br/>

### Customer_Create

| Method             | Type              | Expected Argument | Short Notes          |
| ------------------ | ----------------- | ----------------- | -------------------- |
| getIdempotency_key | getter            | -                 |
| customer           | setter - computed | Customer - Object | sets idempotency key |

<br/>

### Customer_Search

| Method              | Type                    | Expected Argument             | Short Notes                                                            |
| ------------------- | ----------------------- | ----------------------------- | ---------------------------------------------------------------------- |
| ??? ??? query           | method - chainer        | -                             | beginning of chain - must call query.fuzzy() or query.exact()          |
| ??? ^ .fuzzy          | method - chainer + link | sets type of query to fuzzy   | returns a chain of methods                                             |
| ??? ^ .exact          | method - chainer + link | sets type of query to exact   | returns a chain of methods                                             |
| ^ .email_address    | method - chain link     | email_address address- String | will get normalized automatically                                      |
| ^ .phone            | method - chain link     | phone number - String         | Validated by Square. - digits and phone number special characters only |
| ^ .id               | method - chain link     | A square ID - String          | Validated by Square.                                                   |
| ^ .limit            | method - chain link     | Integer - Number              | 1 -100 - default is 100                                                |
| ^ .sortUp           | method - chain link     | -                             | Sets sort order to Ascending                                           |
| ^ .sortDown         | method - chain link     | -                             | Sets sort order to Descending                                          |
| ^ .sortByFirstName  | method - chain link     | -                             | Sorts the results by first name. This is actually the Square default.  |
| ^ .sortByDate       | method - chain link     | -                             | Sorts the results by creation date                                     |
| ^ .sortByMostRecent | method - chain link     | -                             | Sorts the results by creation date with most recent first. (ascending) |

<br/>

### Customer_Retrieve

| Method   | Type   | Expected Argument           | Short Notes                            |
| -------- | ------ | --------------------------- | -------------------------------------- |
| super.id | getter |
| super.id | setter | square customer ID - String | sets the url endpoint and prepends '/' |

<br/>

### Customer_Update

| Method           | Type                | Expected Argument              | Short Notes                                                                      |
| ---------------- | ------------------- | ------------------------------ | -------------------------------------------------------------------------------- |
| super.id         | getter              |
| super.id         | setter              | square customer ID - String    | sets the url endpoint and prepends '/'                                           |
| given_name       | getter/setter       | String                         |
| family_name      | getter/setter       | String                         |
| company_name     | getter/setter       | String                         |
| nickname         | getter/setter       | String                         |
| email_address    | getter/setter       | email_address address - String | will be normalized automatically                                                 |
| address          | getter/setter       | a complete adress - Object     |
| phone_number     | getter/setter       | phone number - String          | Validated by Square. - digits and phone number special characters only           |
| reference_id     | getter/setter       | Non-Square ID - String         | not validated, can be any string                                                 |
| note             | getter/setter       | - String                       |
| version          | getter/setter       | Integer - Number               | Must first fetch it from Square- must match the version number in their database |
| ??? ??? make         | method - chainer    | -                              | beginning of chain                                                               |
| ^ .first_name    | method - chain link | String                         |
| ^ .last_name     | method - chain link | String                         |
| ^ .company_name  | method - chain link | String                         |
| ^ .nickname      | method - chain link | String                         |
| ^ .email_address | method - chain link | email_address address -String  | will be normalized automatically                                                 |
| ^ .phone         | method - chain link | phone number -String           | Validated by Square. - digits and phone number special characters only           |
| ^ .note          | method - chain link | String                         |
| ^ .birthday      | method - chain link | Date - String                  | YYYY-MM-DD format.                                                               |

<br/>

### Customer_Delete

| Method   | Type   | Expected Argument           | Short Notes                            |
| -------- | ------ | --------------------------- | -------------------------------------- |
| super.id | getter |
| super.id | setter | square customer ID - String | sets the url endpoint and prepends '/' |

<br/>

### CustomerGroup

| Method | Type | Expected Argument | Short Notes |
| ------ | ---- | ----------------- | ----------- |

<br/>

### CustomerUngroup

| Method | Type | Expected Argument | Short Notes |
| ------ | ---- | ----------------- | ----------- |

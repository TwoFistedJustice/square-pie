# Square API Tables: Invoice API

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
| Invoice_Request   | Square_Request | !           |

<br/>

### Level Three Classes

| Level Three Classes | Super           | Method | Short Notes |
| ------------------- | --------------- | ------ | ----------- |
| Invoice_List        | Invoice_Request | GET    |             |
| Invoice_Create      | Invoice_Request | POST   |             |
| Invoice_Search      | Invoice_Request | POST   |             |
| Invoice_Delete      | Invoice_Request | DELETE |             |
| Invoice_Retrieve    | Invoice_Request | GET    |             |
| Invoice_Update      | Invoice_Request | PUT    |             |
| Invoice_Cancel      | Invoice_Request | POST   |             |
| Invoice_Publish     | Invoice_Request | POST   |             |

<br/>

### lIST

| Method | Resource Location | Body Properties | Response Fields | Query Params | Square Docs                                                                        | Short notes |
| ------ | ----------------- | --------------- | --------------- | ------------ | ---------------------------------------------------------------------------------- | ----------- |
| GET    |                   |                 |                 |              | [List](https://developer.squareup.com/reference/square/invoices-api/list-invoices) |
|        |                   |                 | invoices: [ ]   |              |
|        |                   |                 |                 | location_id  |
|        |                   |                 |                 | cursor       |
|        |                   |                 |                 | limit        |

<br/>

### CREATE

| Method | Resource Location | Body Properties     | Response Fields | Query Params | Square Docs                                                                            | Short notes                                          |
| ------ | ----------------- | ------------------- | --------------- | ------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| POST   |                   |                     |                 |              | [Invoice](https://developer.squareup.com/reference/square/invoices-api/create-invoice) |                                                      |
|        |                   | invoice             |                 |              |                                                                                        |                                                      |
|        |                   | idempotency_key:128 |                 |              |                                                                                        | different max length than others: 128 instead of 192 |
|        |                   |                     | invoice         |              |                                                                                        |                                                      |

<br/>

### SEARCH

| Method | Resource Location | Body Properties        | Response Fields | Query Params | Square Docs                                                                            | Short notes                                                                                                              |
| ------ | ----------------- | ---------------------- | --------------- | ------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| POST   | "search"          |                        |                 |              | [Search](https://developer.squareup.com/reference/square/invoices-api/search-invoices) |
|        |                   | ^^^query: InvoiceQuery |                 |              |                                                                                        | has several stackable features and several non-stackable features. stackable and non-stackable will be separate classes. |
|        |                   | Limit: int 1-200       |
|        |                   | cursor: str            |
|        |                   |                        | invoices: [ ]   |

<br/>

### DELETE

| Method | Resource Location | Body Properties | Response Fields | Query Params  | Square Docs                                                                           | Short notes |
| ------ | ----------------- | --------------- | --------------- | ------------- | ------------------------------------------------------------------------------------- | ----------- |
| DELETE | {invoice_id}      |                 |                 |               | [Delete](https://developer.squareup.com/reference/square/invoices-api/delete-invoice) |
|        |                   |                 |                 | version-int32 |                                                                                       |             |

<br/>

### RETRIEVE (GET)

| Method | Resource Location | Body Properties | Response Fields | Query Params | Square Docs                                                                          | Short notes |
| ------ | ----------------- | --------------- | --------------- | ------------ | ------------------------------------------------------------------------------------ | ----------- |
| GET    | {invoice_id}      |                 |                 |              | [Retrieve](https://developer.squareup.com/reference/square/invoices-api/get-invoice) |             |
|        |                   |                 | invoice         |              |                                                                                      |             |

<br/>

### UPDATE

| Method | Resource Location | Body Properties     | Response Fields | Query Params | Square Docs                                                                           | Short notes                                          |
| ------ | ----------------- | ------------------- | --------------- | ------------ | ------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| PUT    | {invoice_id}      |                     |                 |              | [Update](https://developer.squareup.com/reference/square/invoices-api/update-invoice) |
|        |                   | invoice             |
|        |                   | idempotency_key:128 |                 |              |                                                                                       | different max length than others: 128 instead of 192 |
|        |                   |                     | invoice         |              |                                                                                       |                                                      |

<br/>

### CANCEL

| Method | Resource Location   | Body Properties    | Response Fields | Query Params | Square Docs                                                                           | Short notes |
| ------ | ------------------- | ------------------ | --------------- | ------------ | ------------------------------------------------------------------------------------- | ----------- |
| POST   | {invoice_id}/cancel |                    |                 |              | [Cancel](https://developer.squareup.com/reference/square/invoices-api/cancel-invoice) |
|        |                     | version (REQUIRED) |                 |              |                                                                                       |             |
|        |                     |                    | invoice         |              |                                                                                       |             |

<br/>

### PUBLISH

| Method | Resource Location    | Body Properties | Response Fields | Query Params | Square Docs                                                                            | Short notes |
| ------ | -------------------- | --------------- | --------------- | ------------ | -------------------------------------------------------------------------------------- | ----------- |
| POST   | {invoice_id}/publish |                 |                 |              | [Publish](https://developer.squareup.com/reference/square/invoices-api/cancel-invoice) |
|        |                      |                 | invoice         |              |                                                                                        |             |

<br/>

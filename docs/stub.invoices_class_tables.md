# Pie Class Tables: Invoice SDK

<br/>

## Structures

<br/>

### Level One Classes

| Level One Classes | Super | Square Docs                                                                |
| ----------------- | ----- | -------------------------------------------------------------------------- |
| SquareRequest     | none  |                                                                            |
| Invoice_Object    | none  | [Invoice](https://developer.squareup.com/reference/square/objects/Invoice) |

<br/>

### Level Two Classes

| Level Two Classes | Super          | Short Notes |
| ----------------- | -------------- | ----------- |
| Invoice_Request   | Square_Request |

<br/>

### Level Three Classes

| Level Three Classes | Super           | Short Notes |
| ------------------- | --------------- | ----------- |
| Invoice_RUDCP       | Invoice_Request |             |
| Invoice_List        | Invoice_Request |             |
| Invoice_Search      | Invoice_Request |             |
| Invoice_Create      | Invoice_Request |             |

<br/>

### Level Four Classes

| Level Three Classes | Super         | Short Notes |
| ------------------- | ------------- | ----------- |
| Invoice_Retrieve    | Invoice_RUDCP |             |
| Invoice_Update      | Invoice_RUDCP |             |
| Invoice_Delete      | Invoice_RUDCP |             |
| Invoice_Cancel      | Invoice_RUDCP |             |
| Invoice_Publish     | Invoice_RUDCP |             |

<br/>

## Cross Reference: Pie and Square

| Class            | Method | Resource Location    | Response Location | Consctructor Arg | Square Docs                                                                            |
| ---------------- | ------ | -------------------- | ----------------- | ---------------- | -------------------------------------------------------------------------------------- |
| Invoice_List     | GET    |                      | invoices: []      | -                | [List](https://developer.squareup.com/reference/square/invoices-api/list-invoices)     |
| Invoice_Search   | POST   | "search"             | invoices: []      | -                | [Search](https://developer.squareup.com/reference/square/invoices-api/search-invoices) |
| Invoice_Create   | POST   |                      | invoice           | order_id         | [Create](https://developer.squareup.com/reference/square/invoices-api/create-invoice)  |
| Invoice_Delete   | DELETE | {invoice_id}         |                   | invoice_id       | [Delete](https://developer.squareup.com/reference/square/invoices-api/delete-invoice)  |
| Invoice_Retrieve | GET    | {invoice_id}         | invoice           | invoice_id       | [Retrieve](https://developer.squareup.com/reference/square/invoices-api/get-invoice)   |
| Invoice_Update   | PUT    | {invoice_id}         | invoice           | invoice_id       | [Update](https://developer.squareup.com/reference/square/invoices-api/update-invoice)  |
| Invoice_Cancel   | POST   | {invoice_id}/cancel  | invoice           | invoice_id       | [Cancel](https://developer.squareup.com/reference/square/invoices-api/cancel-invoice)  |
| Invoice_Publish  | POST   | {invoice_id}/publish | invoice           | invoice_id       | [Publish](https://developer.squareup.com/reference/square/invoices-api/cancel-invoice) |

<br/>

## Sqaure Endpoints

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

### GET (pie - RETRIEVE)

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

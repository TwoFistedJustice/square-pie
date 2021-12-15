# Pie Class Tables: Invoice Requests

<br/>

## Structures

<br/>

### Level One Classes

| Level One Classes | Super | Implemented | Short Notes |
| ----------------- | ----- | ----------- | ----------- |
| SquareRequest     | none  | yes         |

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

<br/>

### Level Four Classes

| Level Three Classes | Super         | Short Notes |
| ------------------- | ------------- | ----------- |
| Invoice_Create      | Invoice_RUDCP |             |
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
| Invoice_Create   | POST   |                      | invoice           | order_id         | [Invoice](https://developer.squareup.com/reference/square/invoices-api/create-invoice) |
| Invoice_Delete   | DELETE | {invoice_id}         |                   | invoice_id       | [Delete](https://developer.squareup.com/reference/square/invoices-api/delete-invoice)  |
| Invoice_Retrieve | GET    | {invoice_id}         | invoice           | invoice_id       | [Retrieve](https://developer.squareup.com/reference/square/invoices-api/get-invoice)   |
| Invoice_Update   | PUT    | {invoice_id}         | invoice           | invoice_id       | [Update](https://developer.squareup.com/reference/square/invoices-api/update-invoice)  |
| Invoice_Cancel   | POST   | {invoice_id}/cancel  | invoice           | invoice_id       | [Cancel](https://developer.squareup.com/reference/square/invoices-api/cancel-invoice)  |
| Invoice_Publish  | POST   | {invoice_id}/publish | invoice           | invoice_id       | [Publish](https://developer.squareup.com/reference/square/invoices-api/cancel-invoice) |

<br/>

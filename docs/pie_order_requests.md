# Pie Class Tables: Order Requests

<br/>
## Structures

<br/>

### Level One Classes

| Level One Classes | Super | Implemented | Short Notes |
| ----------------- | ----- | ----------- | ----------- |
| SquareRequest     | none  | yes         |

<br/>

### Level Two Classes

| Level Two Classes | Super          | Implemented | Short Notes |
| ----------------- | -------------- | ----------- | ----------- |
| Order_Request     | Square_Request |

<br/>

### Level Three Classes

| Level Three Classes  | Super         | Implemented | Short Notes |
| -------------------- | ------------- | ----------- | ----------- |
| Order_Create         | Order_Request |             |
| Order_Retrieve       | Order_Request | !           |
| Order_Retrieve_Batch | Order_Request | !           |
| Order_Calculate      | Order_Request | !           |
| Order_Clone          | Order_Request | !           |
| Order_Search         | Order_Request | !           |
| Order_Update         | Order_Request | !           |
| Order_Pay            | Order_Request | !           |

<br/>

## Cross Reference: Pie and Square

| Class                | Method | Resource Location        | Body Properties                  | Square Docs                                                                                        |
| -------------------- | ------ | ------------------------ | -------------------------------- | -------------------------------------------------------------------------------------------------- |
| Order_Create         | POST   | 'orders'                 |                                  | [Create Order](https://developer.squareup.com/reference/square/orders-api/create-order)            |
|                      |        |                          | idempotency_key                  |
|                      |        |                          | order                            |
| Order_Retrieve       | GET    | 'orders/{object_id}'     | NA                               |
| Order_Retrieve_Batch | POST   | 'orders/batch-retrieve'  | order_ids: []                    | [Retrieve Batch](https://developer.squareup.com/reference/square/orders-api/batch-retrieve-orders) |
| Order_Calculate      | POST   | 'orders/calculate'       | order                            | [Calculate Order](https://developer.squareup.com/reference/square/orders-api/calculate-order)      |
| Order_Clone          | POST   | 'orders/clone '          |
|                      | POST   | 'orders/clone '          | idempotency_key                  |
|                      | POST   | 'orders/clone '          | order_id                         |
|                      | POST   | 'orders/clone '          | version (useless do not support) |
| Order_Update         | PUT    | 'orders/{object_id}'     |                                  | [Update Order](https://developer.squareup.com/reference/square/orders-api/update-order)            |
|                      |        |                          | fields_to_clear: []              |                                                                                                    |
|                      |        |                          | idempotency_key                  |
|                      |        |                          | order: (special)                 |
|                      |        |                          | fields_to_clear: []              |
| Order_Pay            | POST   | 'orders/{object_id}/pay' |                                  | [Pay Order](https://developer.squareup.com/reference/square/orders-api/pay-order)                  |
|                      |        |                          | idempotency_key                  |
|                      |        |                          | order_version                    |
|                      |        |                          | payments_ids: []                 |
| Order_Search         | POST   | 'orders/search'          |                                  | [Search Orders](https://developer.squareup.com/reference/square/orders-api/search-orders)          |
|                      |        |                          | location_ids: []                 |
|                      |        |                          | cursor: str                      |
|                      |        |                          | query: {} (complex)              |
|                      |        |                          | limit: num                       |
|                      |        |                          | return_entries: boolean          |

<br/>

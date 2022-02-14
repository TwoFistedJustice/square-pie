# Pie Class Tables: Template

## Structures

<br/>

### Level One Classes

| Level One Classes | Super | Implemented | Short Notes |
| ----------------- | ----- | ----------- | ----------- |
| Square_Request    | none  | yes         |

<br/>

### Level Two Classes

| Level Two Classes | Super          | Implemented | Short Notes |
| ----------------- | -------------- | ----------- | ----------- |
| Location_Request  | Square_Request | no          |

<br/>

### Level Three Classes

| Level Three Classes | Super            | Square Docs                                                                                          |
| ------------------- | ---------------- | ---------------------------------------------------------------------------------------------------- |
| Location_List       | Location_Request | [List locations](https://developer.squareup.com/reference/square/locations-api/list-locations)       |
| Location_Create     | Location_Request | [Create Location](https://developer.squareup.com/reference/square/locations-api/create-location)     |
| Location_Retrieve   | Location_Request | [Retrieve Location](https://developer.squareup.com/reference/square/locations-api/retrieve-location) |
| Location_Update     | Location_Request | [Update Location](https://developer.squareup.com/reference/square/locations-api/update-location)     |

<br/>
## Cross Reference: Pie and Square

| Class             | Method | Resource Location | Response Location | Constructor Arg | Square Docs                                                                           |
| ----------------- | ------ | ----------------- | ----------------- | --------------- | ------------------------------------------------------------------------------------- |
| Location_List     | GET    |                   | locations: []     | -               | [List](https://developer.squareup.com/reference/square/invoices-api/list-invoices)    |
| Location_Create   | POST   |                   | location          |                 | [Create](https://developer.squareup.com/reference/square/invoices-api/create-invoice) |
| Location_Retrieve | GET    | {location_id}     | location          | location_id     | [Retrieve](https://developer.squareup.com/reference/square/invoices-api/get-invoice)  |
| Location_Update   | PUT    | {location_id}     | location          | location_id     | [Update](https://developer.squareup.com/reference/square/invoices-api/update-invoice) |

<br/>

## Sqaure Endpoints

<br/>

### lIST

| Method | Resource Location | Body Properties | Response Fields | Query Params | Square Docs                                                                        | Short notes |
| ------ | ----------------- | --------------- | --------------- | ------------ | ---------------------------------------------------------------------------------- | ----------- |
| GET    |                   |                 |                 |              | [List](https://developer.squareup.com/reference/square/invoices-api/list-invoices) |
|        |                   |                 | locations: [ ]  |              |

<br/>

### CREATE

| Method | Resource Location | Body Properties | Response Fields | Query Params | Square Docs                                                                            | Short notes |
| ------ | ----------------- | --------------- | --------------- | ------------ | -------------------------------------------------------------------------------------- | ----------- |
| POST   |                   |                 |                 |              | [Invoice](https://developer.squareup.com/reference/square/invoices-api/create-invoice) |             |
|        |                   | location        |                 |              |                                                                                        |             |
|        |                   |                 | location        |              |                                                                                        |             |

<br/>

### RETRIEVE

| Method | Resource Location | Body Properties | Response Fields | Query Params | Square Docs                                                                          | Short notes |
| ------ | ----------------- | --------------- | --------------- | ------------ | ------------------------------------------------------------------------------------ | ----------- |
| GET    | {location_id}     |                 |                 |              | [Retrieve](https://developer.squareup.com/reference/square/invoices-api/get-invoice) |             |
|        |                   |                 | location        |              |                                                                                      |             |

<br/>

### UPDATE

| Method | Resource Location | Body Properties | Response Fields | Query Params | Square Docs                                                                           | Short notes |
| ------ | ----------------- | --------------- | --------------- | ------------ | ------------------------------------------------------------------------------------- | ----------- |
| PUT    | {location_id}     |                 |                 |              | [Update](https://developer.squareup.com/reference/square/invoices-api/update-invoice) |
|        |                   | location        |
|        |                   |                 | location        |              |                                                                                       |             |

<br/>

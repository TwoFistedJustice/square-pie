# How to make an API call

> Everything is a subclass of SqauareRequest class

Every call must receive a boolean argument. True makes it call the production api. False sandboxes it.
You must provide your API key to the request call. It does not have the ability to get it for itself.
You get the secret by calling getSecret(someclass.secretName)
and passing that value to someclass.request(secretName)

The simplest example is fetching a list of customers:

```js
  let list = new Customer_List(false)
  let secret = await getSecret(list.secretName);
  return await list.request(secret);
```

<br/>

## Class Levels

### Top Level Classes

- Set headers
- Make the actual http request
- Normalize emails

### Mid Level Classes

- May provide the http method
- Set the fetch request options
- Set the document ID

### Bottom Level Classes

- May provide the http method
- Set the endpoint for the http request (api name)
- provide details to the http request (like customer or invoice details)

### Wrapper Classes

- Will have "Wrapper" in the class name
- Serves as a container for another object - Catalog Object Wrapper is an example
- This the equivalent of the UPS truck, but in code.

### Helper/Structural Classes

- Will have "Helper" in the name or the name
- Structural classes will be named with an acronym (URDU is an example Upsert Retrieve Delete Update)
- Do not conform to anything in Square's actual API
- Similar to a Mixin, but not a mixin
- Carries common properties and methods for classes that do conform to something in Square's actual API

<br/>

## Class Breakdowns

### Square_Request

Super of all request classes

- takes a boolean argument which determines production or sandbox
- sets the basic http options structure
- sets the http headers
- normalizes email addresses
- makes the actual http request

### Retrieve_Update_Delete

Super of all classes that fetch with a document ID
Subclass of SquareRequest

- sets the endpoint to the value of the ID

## Customer Request Classes

### Customer_List

Super of classes that fetch lists
Subclass of SquareRequest

- sets the apiName to 'customers'
- sets the method: GET

### Customer_Search

- sets the apiName to 'customers'
- sets the method: POST
- Has a pre-established `\_body` structure
- Has a chainable 'query' method
  - call it with either 'fuzzy' or 'exact' method then chain on sub-methods to create a filter

### Customer_Retrieve

Subclass of RetrieveUpdateDelete

- sets the apiName to 'customers'
- sets the method: GET

### Customer_Delete

Subclass of RetrieveUpdateDelete

- sets the apiName to 'customers'
- sets the method: DELETE

### Customer_Create

Subclass of Create

- sets the apiName to 'customers'
- receives the http request body data via its 'customer' setter (foo = bar)
- adds idempotency_key to request body
- normalizes the email address in the input

<br/>

## Catalog Object Classes

### Catalog_Object classes in general

Whenever you upsert a new object it MUST have a temporary ID that you give it. This is just for your own reference
and for referencing that object within that upsert request. Square will replace it with its own unique ID as soon
as you upsert it. It can be pretty much anything, a word, or the ID you use in your own db. The class will
automatically prepend the required "#" character so you don't have to.

Many classes have a 'make' method that allows you chain together properties you want to set so you can do most of
that with one line of code. Anytime a Square property has specific expected string values there will be an automatic
function generator that reads from the expected properties and creates a chainable function to quickly set the correct
values without having to worry about typos.

example: Square has a property called "product_type". Square requires that it be set to either "REGULAR" or "APPOINTMENTS_SERVICE"
Any other value will cause the request to fail with 400 "bad request".
The class with that property will auto generate a setter in the form of `someConst.product_type().APPOINTMENTS_SERVICE()`
allowing you to quickly and without error set that value. In some cases a default value will be provided. The default value
will tend to favor tangible, in-person products.

Every mutable property (one Square wants you to set yourself) will also have an old fashioned getter and setter so you can change
any values you want prior to upsert.

Every object class except the Wrapper have a `.\_fardel` property. Oxford English Dictionary defines a "fardel" as "bundle". The fardel is what you pass to the next step in the process. You access it by calling

```js
yourClass.fardel;
```

The Wrapper class has TWO fardel methods because it can pass one or more than one bundles.

### Catalog_Object_Wrapper

Wrapper Class

- Holds all the Catalog Objects that get upserted
- Automatically adjusts it's payload form for one or many objects.

Usage:
Instantiate the wrap

```js
const foo = new Catalog_Object_Wrapper()
```

Cram in one or more Catalog Objects you created. Don't be gentle, it can eat as many as you serve up.

`foo.attach(obj).attach(obj)` Or `foo.add(obj).add(obj)`

Tell it when you are done adding objects.

```js
foo.finalize()
```

The correctly formatted catalog object payload now sits on the fardel property.

```js
let payload = foo.fardel;
```

How to make an API call.

Everything is a subclass of SqauareRequest class.

Every call must receive a boolean argument. True makes it call the production api. False sandboxes it.
You must provide your API key to the request call. It does not have the ability to get it for itself.
You get the secret by calling getSecret(someclass.secretName)
and passing that value to someclass.makeRequest(secretName)

The simplest example is fetching a list of customers:

```let list = new Customer_List(false)
  let secret = await getSecret(list.secretName);
  return await list.makeRequest(secret);
```

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

## Class Breakdowns

**SquareRequest**\
Super of all request classes

- takes a boolean argument which determines production or sandbox
- sets the basic http options structure
- sets the http headers
- normalizes email addresses
- makes the actual http request

**List**\
Super of classes that fetch lists
Subclass of SquareRequest

- sets the method: GET

**Create**\
Super of all classes that create a new document
Subclass of SquareRequest

- is idempotent
- dependent on npm/uuid

**Search**\
Super of all classes that search on fields other than ID
Subclass of SquareRequest

- Sets the method 'post'
- Sets the endpoint '/search'

**RetrieveUpdateDelete**\
Super of all classes that fetch with a document ID
Subclass of SquareRequest

- sets the endpoint to the value of the ID

## Customer Request Classes

**Customer_List**\
Subclass of List

- sets the apiName to 'customers'

**Customer_Search**\
Subclass of Search

- sets the apiName to 'customers'
- Has a pre-established \_body structure
- Has a chainable 'query' method
  - call it with either 'fuzzy' or 'exact' method then chain on sub-methods to create a filter

**Customer_Retrieve**\
Subclass of RetrieveUpdateDelete

- sets the apiName to 'customers'
- sets the method: GET

**Customer_Delete**\
Subclass of RetrieveUpdateDelete

- sets the apiName to 'customers'
- sets the method: DELETE

**Customer_Create**\
Subclass of Create

- sets the apiName to 'customers'
- receives the http request body data via its 'customer' setter (foo = bar)
- adds idempotency_key to request body
- normalizes the email address in the input

## Catalog Object Classes

**Catalog_Object_Wrapper**\
Wrapper Class

- Holds all the Catalog Objects that get upserted
- Automatically adjusts it's payload form for one or many objects.

Usage:
Instantiate the wrap\

`const foo = new Catalog_Object_Wrapper()`

Cram in one or more Catalog Objects you created. Don't be gentle, it can eat as many as you serve up.

`foo.attach(obj).attach(obj)`
Or
`foo.add(obj).add(obj)`

Tell it when you are done adding objects.\
`foo.finalize()`

The correctly formatted catalog object payload now sits on the fardel property.\
`let payload = foo.fardel;`

**Category**\
`const someCategory = new Category("The name you chose for it")`\
You are done.

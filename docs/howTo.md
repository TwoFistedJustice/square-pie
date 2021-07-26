How to make an API call.

Everything is a subclass of SqauareRequest class. 

Every call must receive a boolean argument. True makes it call the production api. False sandboxes it.
You must provide your API key to the request call. It does not have  the ability to get it for itself.
You get the secret by calling getSecret(someclass.secretName) 
and passing that value to someclass.makeRequest(secretName)


The simplest example is fetching a list of customers:
```let list = new CustomerList(false)
  let secret = await getSecret(list.secretName);
  return await list.makeRequest(secret);
  ```


## General Features:

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


**RetrieveUpdateDelete**\
Super of all classes that fetch with a document ID
Subclass of SquareRequest
- sets the endpoint to the value of the ID

**Create**\
Super of all classes that create a new document
Subclass of SquareRequest
- is idempotent
- dependent on npm/uuid

**CustomerList**\
Subclass of List
- sets the apiName to 'customers'

**CustomerRetrieve**\
Subclass of RetrieveUpdateDelete
- sets the apiName to 'customers'
- sets the method: GET

**CustomerDelete**\
Subclass of RetrieveUpdateDelete
- sets the apiName to 'customers'
- sets the method: DELETE


**CustomerCreate**\
Subclass of Create
- sets the apiName to 'customers'
- receives the http request body data via its 'customer' setter (foo = bar)
- adds idempotency_key to request body
- normalizes the email address in the input




How to make an API call.

Everything is a subclass of SqauareRequest class. 

Every call must receive a boolean argument. True makes it call the production api. False sandboxes it.
You must provide your API key to the request call. It does not have  the ability to get it for itself.
You get the secret by calling getSecret(someclass.secretName) 
and passing that value to someclass.makeRequest(secretName)


The simplest example is fetching a list of customers:
```let list = new CustomerList(false)
  let secret = await getSecret(list.secretName);
  return await list.makeRequest(secret);```


General Features:

Top Level Classes
Sets headers
Makes the actual http request
Normalize emails


Mid Level Classes
Provide the http method
Set the fetch request options
Set the document ID 



Bottom Level Classes
 Set the endpoint for the http request (api name)
 provide details to the http request (like customer or invoice details)



SquareRequest
Super of all classes

## Pie Requests

<br/>

### What happens behind the scenes - the short version

Square Pie has two general types of classes: Objects, and Requests. Object classes build the data that you send to Square. Requests make the http requests to Square and store
the data returned from Square.

Object classes have a property called "fardel" which mimics the object structure of a Square Object. When you create a Request, you pass it the fardel property of an object and the Request
class turns it into the request body, discarding any key:value pairs where the value is set to the Javascript primitive value 'undefined'.

To actually make the request, you call the .request() method on the Request class with no arguments.

The Request class then sends your data and waits for response. If all goes well data comes back and is stored on the .delivery property of the Request class.

If something goes wrong, the Request class will grab the error codes and log them to the console.

### How does the returned data get stored on the .delivery property

The top level .request() method (on the Square_Request class) calls the .delivery SETTER and passes it the stringified request.body via the Fetch API httpResponse.json() method

The lower Request class, which will be a sub of Square_Request should have its own SETTER which picks the data off the request body. For example, when customer data is returned from Square,
it sits on the response.body.customer. So that is what is passed to the setter so that the customer data will sit on the .delivery property. That way you don't have to memorize which of
Square's 3 gazillion property names holds which data set. You only need to memorize one property: .delivery

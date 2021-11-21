# The Basics of Building a Square Pie Class

## Objects

Every Object that will be instantiated by an end user should have the following properties:

### **.\_fardel**

a .\_fardel property to hold all the stuff that will get sent to square. It should conform to Square's expected structures.

Properties on fardel generally conform to Square's expectations for the shape of a given object. If the property does not have a fixed
value, set it to `undefined`. That way it is visible and more easily set. An undeclared property has to be created programatically and
dot notation does not always work for this inside a class. An undefined property will be ignored by `JSON.stringify`

### **.make()**

A method on the class.

The `make()` method is a curried method that allows access to the Setters. Every `make()` should return an exectued "methods" function,
which in turn returns a "properties" object. The first property should be `self: this,`. That allows you to access the class context via
`this.self.some-setter`

Some objects will have length limits or other peculiarities that need to be handled. Those objects may have a `.configuration` property.
(note that it does not have a leading underbar). This property will have no setter. Its value is fixed. It may have a getter if that is
considered useful.

Follow this model extracted from the Catalog_Item class.

```js
this.configuration = {
  maximums: {
    name: 512,
    description: 4096,
    abbreviation: 24,
  },
  defaults: {
    auto_set_appointment_service: false,
  },
  keys: ["product_type"], // array of property names where Square expects specific values
  product_type: ["REGULAR", "APPOINTMENTS_SERVICE"],
};
```

## Handling Length Limits

Create a property on the class called `configuration` (no leading underbar).
Create a sub-property called "maximums".
Create a key for each Square property that has a lengthlimit and set the value to a Number equal to that limit.

Require the "maxLength" utility from utilities.js. It returns true if the passed in value is within the assigned length limit.

In the Setter for the length limited property, use maxLength to check the length.

## The Auto Function Generator

Notice "keys" and "product_type" in .configuration
The keys array holds property names that have specific allowable values.
The "product_type" property is named exactly the same as an entry in the keys array. It holds the values that Square may expect.

```js
const { setter_chain_generator_config } = require("./utilities_curry");
```

Then inside the make method at the very bottom of the methods function:

```js
setter_chain_generator_config(this.configuration, properties, this);
return properties;
```

## Connecting an Object to a Request

The Request will have .body setter. Feed the fardel to that setter.
`some-request.body = some-object.fardel`

**When there are Square Properties with LOTS of fixed allowable properties.**
A common example is currency. Currency has about 50 different allowable values that must be spelled exactly. As a stopgap measure
so I wouldn't have to code and maintain multiple methods across multiple classes I created a function that will read arrays of values
and auto generate named property functions on the `make()` method.

### Requests

Every request should be a sub class of Square_Request.

### Square_Request

Square Request handles headers, secrets, and base urls. It will automatically choose the correct base endpoint based on
whether you set `process.env.NODE_ENV` to "production". Any value other than "production" will call the sandbox.

The two main properties you will use are `.body` and `.delivery`

#### **.body**

Call the setter and pass it the fardel. Everythng on the fardel will be stringified and become the `request.body`.

```js
yourClass.body = yourObject.fardel;
```

#### **.request()**

The .request method triggers the http request. It takes no arguments.\

```js
yourClass.request();
```

#### **.delivery**

The `.delivery` property is set to and remains `undefined` until after the http request returns a 200 and a response.body.
Square Request automatically stashes the response.body on the delivery property. Use its getter to retrieve it

```js
var somevar = yourClass.delivery;
```

### Other Request Classes

The very lowest level classes, those that have no sub-classes set several important properties which will bubble up
to Square_Request

#### **.\_endpoint**

The final part of the Square API url you need to call. It must be preceded with a "/". For example, a create endpoint might be set to "/create"

#### **.\_method**

This is the http request method used for the given endpoint and action.

## Making it easy on the end user

As a general rule try to extract away anything that requires very specific values. For example sorting; which
generally requires either a value of "ASC" or "DESC". So we will often insert a method called
`sortup()` or `sortdown()` which when called automatically sets those values. In those situations try to keep
the names conversational, intuitive, easy to remember, and consistent across classes with similar functions.

<br/>

# Handling Square's Specific Requirements

As a rule we try to extract away as much of this stuff as possible.

## DRY (Don't Repeat Yourself)

Square's API sometimes violates DRY. When we find an instance, we try to eliminate it by focusing on
the part of Square's API that can handle all parts. For example in the Square Catalog API there are two Delete commands. One for batch deletes and one for single deletes.
The only difference between them is that one sends on string and one sends an array of strings. So we simply ignore the single delete because the batch can send an array of one string.

## Response Body Data Fields

Square is inconsistent in the way they send data back. Different endpoints and http commands net different property names. It is time-consuming to look up each one. So every request
class simply ports that data to the `.delivery` property so the end-coder need not care whether it comes back on the customer, customers, order, orders, etc, etc property.

## Idempotency

[Idempotency Keys](https://developer.squareup.com/docs/working-with-apis/idempotency) need to be unique within a given action. They need not be unique in all the world. These are not security keys to keep hackers at bay.
So we use [nanoid non-secure](https://github.com/ai/nanoid#non-secure) to prioritize performance.

## Names of Documents and Sub-documents

Square often asks for a `name` or `uid` property. These are generally to identify a sub-document within a larger document. These are like mini-idempotency keys. They need only be unique within
a given document. So we automatically set these using `uid: nanoid(12)` to limit the size of the key and allow for large quantities of sub-documents. We also provide a setter to allow the end-coder
override and choose a name.

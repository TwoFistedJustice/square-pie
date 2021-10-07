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
  lengthLimits: {
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

lengthLimits: set a key to the name of a property with a length limit and the value to the limit.

Create a method called "maxLength" on the highest level super class in that class chain. You can just grab it off the
catalog_object_super.js file. (see contribution_ideas.md to make it a utility).

Use that method inside the setters to validate user input.

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

## Other Request Classes

The very lowest level classes, those that have no sub-classes set several important properties which will bubble up
to Square_Request

### **.\_endpoint**

The final part of the Square API url you need to call. It must be preceded with a "/". For example, a create endpoint might be set to "/create"

### **.\_method**

This is the http request method used for the given endpoint and action.

## Making it easy on the end user

As a general rule try to extract away anything that requires very specific values. For example sorting; which
generally requires either a value of "ASC" or "DESC". So we will often insert a method called
`sortup()` or `sortdown()` which when called automatically sets those values. In those situations try to keep
the names conversational, intuitive, easy to remember, and consistent across classes with similar functions.

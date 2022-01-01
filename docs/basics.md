# Square Pie Basics

Square Pie is a collection of ES6 classes that help you build compliant Square API documents. In general
the methods and sub-methods you will be using have the exact same name as the property they are meant to
modify. It will be very helpful to have the Square docs open when using Square Pie as our property names
and methods closely follow their API structure. Oftentimes the name of the method used to modify a property
is exactly the same as the name of the property. For some methods there are also alias methods with shorter
names.

Square Pie uses a chaining syntax throughout to speed up your development. You can often build
entire structures using just a handful of lines of code. Many of the methods can be infinitely chained,
some not. There is a pattern to this that will help you know when you can and cannot.

Generally speaking if a method takes a single argument, it can be chained infinitely. If it takes more than
one argument, or no argument, it will be a finite chain.

# Fardel vs Body

**Body**

A Request class has a 'body' property. This will be automatically converted into the request.body when you make
the http request. You never have to even think about it.

**Fardel**

An Object class has a fardel (this is a real word). The fardel is the structure that contains the data that gets
exported to the request class. When you finish building your structure you export the fardel by calling the fardel
getter: `myVar.fardel`.

# Methods used to build structures

**_Make_() Methods**

Most classes have a method titled simply "make". These always have sub-method names that exactly match the property names
of the response body or object structure in the Square docs. Make sub-methods chain together and are called like this:

```js
myVar.make().someProp(val).someOtherProp(val).so_on(val).so_forth(val)...
```

**_Query_() Methods**

A _query_ method is the same as a _make_ method, except that it is for building a search query which has options of _fuzzy_
or _exact_. They take one string argument, "fuzzy" or "exact". So far there is only one class that uses a _query_
instead of a _make_ method. It would be called like this:

```js
myVar.query("fuzzy").someProp(val).someOtherProp(val).so_on(val).so_forth(val)...
```

**_Build_ and _Add_ Methods**

Sometimes there are structures that just don't fit within the confines of a "make" method but that don't merit their own
class. For those we have "build" and "add" methods. _Build_ and _add_ methods are exactly the same with one difference:
The _build_ method builds and returns the object, where the _add_ does the same but also adds the object to the property in
fardel.

When using a _build_ method you pass its output as an argument to a _make_ sub-method. You would NOT do that with an _add_ method.
In general _add_ methods are only present when the output is destined to be stored in an array. You will also have the option
of building the object and adding it yourself via _make_.

If it is destined to be a single object sitting as a value on a property, then there will be only a _build_ method.

_Add_ methods are always accompanied by _build_ methods (they actually call the _build_ method, like an alias). However, _build_ methods
will often exist alone.

# Making the HTTP Request

It's as easy as eating actual pie. From within an async function, you simply call the _request_ method on the Request class, like this:

```js
let response = await myRequestClass.request();
```

As of the _version 1.0 Alpha_ there is no option to change the request headers or options other than by modifying the source code located at:
`src/ib/square_request_abstract.js`

The headers and options in the Alpha version are about as basic as it gets. Just enough to make it work. To modify them, locate the methods
called _headers_ and _options_ and make your changes to their return values.

You can view the un-minified code here:
[https://github.com/TwoFistedJustice/square-pie/blob/main/src/lib/square_request_abstract.js](https://github.com/TwoFistedJustice/square-pie/blob/main/src/lib/square_request_abstract.js)

#Setting Values in Square Pie

There are generally two ways to set any given value in Square Pie.

1. You can just use the property setter and set it to whatever value you want. `myVar.someProperty = "some value"`.
   This is fast and easy. And while some setters have built in error checking, others may let you set values that Square will reject.
2. You can call a method made expressly to set that value. These will often prevent you from setting a value that Square will reject.

There are three types of values that Square will usually expect on document properties:

- a fixed set of strings which you must choose from, such as: "DRAFT", "OPEN", "PAID", "CANCELED"
- an archetypal object, such as a 'money' object which always looks the same and has the same restrictions. {amount: 42, currency: "EUR"}
- An unfixed string or number, meaning a string or number you choose. There will often be a size limitation.

**Fixed Sets of Strings aka "[enums](https://en.wikipedia.org/wiki/Enumerated_type#:~:text=In%20computer%20programming%2C%20an%20enumerated,or%20enumerators%20of%20the%20type.)"**
Square uses enums frequently. The most common properties that use them are `status` and `sort`.
We have two ways of setting enums. We can use a setter. `myVar.someProp = "`

Whenever we encounter an enum, there will be a method for each allowable value. Sometimes a property will take just
one such value, other times it will hold an array of such values. When it takes just one, subsequent calls to that
set of methods will replace the previous value. When it takes an array, subsequent calls will add new values, up to
the allowable limit.

**Archetypal Objects**

Square frequently re-uses small object structures. We call these "archetypes". Mostly because we think it's an easy
word to remember and the actual meaning is close enough.

When an archetype is small and relatively simple, the function that builds it will exist as a method on a class. The
`money` archetype is one such. You will often not even notice these as they appear simply as a method that takes one
or more arguments. Generally these terminate a chain, and the next chain will need to be a new line of code.

When an archetype is somewhat complicated there will be a helper-function or class you can call to help you build it.
A customer's `address` is a complicated archetype that has its own class and you will pass the output of that function
to the method that sets the property.

**Other Values**

Many properties on a Square document take unfixed values, usually a string, a boolean, or a number. These are set by
passing the desired value as an argument to a method.

Strings almost always have a specified limit. And number are almost always expected to be integers. Error checking is
usually in place to prevent you from exceeding a hard limit.

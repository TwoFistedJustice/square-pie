# Square Pie Basics

Square Pie is a collection of ES6 classes that help you build compliant Square API documents. In general
the methods and sub-methods you will be using have the exact same name as the property they are meant to
modify. Square Pie uses a chaining syntax throughout to speed up your development. You can often build
entire structures using just a handful of lines of code.

Many of the methods can be infinitely chained, some not. There is a pattern to this that will help you know
when you can and cannot.

Generally speaking if a method takes a single argument, it can be chained infinitely. If it takes more than
one argument, or no argument, it will be a finite chain.

There are generally two ways to set any given value in Square Pie.

1. You can just use the property setter and set it to whatever value you want. `myVar.someProperty = "some value"`. This is fast and easy. And while some setters have built in error checking, others may let you set values that Square will reject.
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

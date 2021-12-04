# Conventions Used

<br/>

## Tables Legend

| Symbol       | Meaning                                                                                                     |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| ⋈            | Bowtie symbol indicates a METHOD meant to be called by a user as opposed to one meant to operate internally |
| ♾            | Circle infinity (permanent paper symbol) indicates method is chainable and has chainable submethods         |
| ♾ ^          | Circle infinity plus caret indicates same as circle infinity, plus it is itself a chainable submethod       |
| ^            | Lone caret indicates method is a chainable submethod that has no submethods of its own.                     |
| !            | Lone exclamation indicates a pure NOT - as in "NOT even begun"                                              |
| ! someName   | Indicates "started, but NOT finished- Under Construction."                                                  |
| ! [number]   | Indicates "Implemented but being worked on". The number is the associated github Issue.                     |
| ^^^someName  | Three carets preceding a property name indicate complex values are expected                                 |
| " val "      | Generic name for an argument passed to a function                                                           |
| someName [ ] | Indicates an array of the named type                                                                        |
| < >          | A note or comment, meant to be displayed to the end user                                                    |

<br/>

## File Names

File names for classes follow the following convention

- snake_case
- lower case

< API Name >< request || object >< abstract || empty >< descriptor >< super || empty >< .js >

`API Name`: the name of the Square API the class is built for.

`request || object`: indicates the class is an HTTP request or an Object destined to become a database document.

`abstract || empty` : if the class is not meant to be instantiated by the user add 'abstract'. Otherwise leave this field empty.
the reason for this is to group them all at the top of the visible file tree. This simplifies manual searching.

`descriptor`: the request action performed or type of object.

`super || empty`: All super classes are also 'abstract'. And all abstract class are technically super classes. But we
only designate that way if the class is an immediate pre-cursor to a limited set of specialized classes. Otherwise leave this field empty.
This is a bit cumbersome. But we do it this because the file name name should reflect the actual class name to make it easy
to manually find stuff when necessary.

<br/>

# Class Names

- Snake_Case -
- Every first letter is Upper_Case
- The class name NEVER includes the word 'abstract' - that is reserved for file names only.

< Api name >< Type of class || empty >< Descriptor >< >< Super || empty >

`Api name`: the name of the Square API the class is built for.

`Type of class || empty `:
If the class is a Request and is a super class to ALL other request class for that
Square API, then enter "Request". Otherwise leave this field empty. There will only be ONE per API.

`Descriptor`: the request action performed or type of object.

`Super || empty`: Super indicates that it is used to hold common elements to a limited set of other
related classes.

<br/>

## Common Features

### Fardel

> **far·del**\
> /ˈfärdl/\
> Fardel is Middle English for "package", "bundle"", or "burden".

In this repo it is used when constructing an object that is NOT an http-request . It serves
as a central container for data you add to the object. Everything in fardel gets passed as an
argument to the http request to be added to the request body.

<br/>

### Body

Body is used in Request classes. Everything in it gets put directly into the Request body.
It is analogous to the 'fardel' property of the Object classes but unlike its cousin, is
not passed by you as an argument to any other class.

<br/>

### Delivery

Delivery is a property that sits on the http-request classes. This is where parsed
repsonse json is stashed and accessible. Calling yourVar.delivery will fetch the parsed
json.

<br/>

### Variable Case

Every variable should be in snake_case.

<br/>

## Display Name

Every class has a display_name property which holds the string of the class name. This enables
a user to find the class of a variable simply by calling its display_name() getter.
<br/>

## Configuration

May user intantiable classes have an immuatable configuration property. This holds values usable within the class such as
default values and length limits. These are generally used within error checking utilities and computed properties. Do not
create getters or setters for these.
<br/>

## Make Functions

Every class that gets instantiated by an end user has at least one make() function. All make-functions
are curried, meaning you can call them by chaining their methods.

The most basic form, which is in every end-user class is `make()`. This function is used to set mutable
properties on fardel or body. It has at least one method for each mutable property called by exactly the
same name as the property itself. There may be additional alias methods for calling those functions using
an abbreviated form.

There may be other complex properties on a class such as "modifier" that will have their own make-function.

<br/>

## Private Methods

Private methods are used to help other functions in the same class do their job. They are often used to
construct objects that comply with Square's requirements.

Sometimes you may want such a method in a super class to work with several sub-classes. In that case you cannot
make it private since sub-classes cannot access super-class private methods. But this is okay since users generally
will not be instantiating super-classes by themselves.
<br/>

## Build Methods

Build methods come in two flavors: "build" and "add". They are almost always private methods.

Build methods always begin their name with "build\_" followed by the name of the thing they build. Build functions
build an object out their arguments then return the object they build.

Add methods begin with "add" instead of "build". The work exactly as build methods with one difference: namely they
add the thing they build to fardel or body. Usually they simply call their analogous build-method rather than
duplicating a bunch of code.

<br/>

## Enum Methods

Sometimes a Square endpoint has a property which expects a value from a set of predetermined values, like
{"LEFT", "RIGHT", "UP", "DOWN"}. It will reject any request where that field has a value not in the approved list.
Sometimes these are case-sensitive, sometimes not. In these situations we use "enum mehtods".

Enum methods are curried functions. They follow similar syntax to make-methods where every sub-method is the lowercase
version of the allowed value. It accesses the property setter and sets the value to the UPPERCASE version of the desired
value. Even if the field is case-insensitive we set it to UPPERCASE. This way we NEVER have to worry about whether it is
case-sensitive or not.

<br/>

## Arrayify

Arrayify is a handy dandy utility that creates and array at a property if one does not already exist and then returns true.
Use it whenever a Square property may or may not expect an array of values. This happens often.

<br/>

## Define

define() is a utility used to create a property inside a class. ES6 classes are finicky about how you add properties to objects
in a class. The define utility always works and prevents surprises. When in doubt, use it.

<br/>

## Shazam Utilities

Shazam utilities are for error prevention. They check to see if something is in compliance and if it is, they return true. If
the thing is not in compliance, they throw an error which tells what class and method generated the error, what was expected,
and the value that was received.

<br/>

## Arche Utilities

Arche utilities are for building what we call "archetypes", which is just our word for small repeatable object structures
that Square uses throughout their API. Address objects and money objects are examples of archetypes. They always follow the
same form. So we have utilities to build them.

They always begin with the 'arche\_' followed by the name of the thing they build. So 'arche_money' builds a money object and
returns it.

Arche utilties are NEVER curried. They are old timey functions that do a thing and return a value.

<br/>

## The Request Method

The request method exists on EVERY request class. It lives on the class Square_Request which is the super of all
other request classes. Calling the request methods initiates the http request.

<br/>

# DEPRECATED

## Parcel - DEPRECATED - this is too complicated - just call the argument whatever it was in its past life

"parcel" is used only as a name for a function argument. Whenever a fardel, body, or delivery is passed to a
function, call it a parcel. This keeps the code more readable since there won't be multiple names for essentially
the same thing in different places.

<br/>

## setter_chain_generator_config() - DEPRECATED - no longer used - replaced by enum functions

`setter_chain_generator_config()` is an imported function that automatically generates curried (chainable) sub-methods
on the make() method. It reads an array of propety names and an array of possible values both of which you provide, and
generates functions to set those properties to the allowable values.

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

###Fardel
Fardel is Middle English for "package", "bundle"", or "burden".

In this repo it is used when constructing an object that is NOT an http-request . It serves
as a central container for data you add to the object. Everything in fardel gets passed on to
the http request to be added to the request body.

##Delivery
Delivery is a property that sits on the http-request classes. This is where parsed
repsonse json is stashed and accessible. Calling yourVar.delivery will fetch the parsed
json.

##Parcel
"parcel" is used only as a name for a function argument. Whenever a fardel, body, or delivery is passed to a
function, call it a parcel. This keeps the code more readable since there won't be multiple names for essentially
the same thing in different places.

##make()
make() is a curried method on many classes. It allows you to access the setters by chaining them together on
a single line using dot-notation. _In general_ make()'s methods will have the same name as the request properties
in the Square docs.

##setter_chain_generator_config()
setter_chain_generator_config() is an imported function that automatically generates curried (chainable) sub-methods
on the make() method. It reads an array of propety names and an array of possible values both of which you provide, and
generates functions to set those properties to the allowable values.

General Square Pie Class Patterns

Applies to classes that will be instantiated by the end coder

Object Classes

Inside the constructor function:
\_fardel - this contains all the properties Square expects, usually set to a value of undefined
configuration - holds constant values used by the particular class such as string length limits.

<br/>
Getters

Generally just generic getters.
May contain error checking, but usually do not.

<br/>
Setters

Often contain some kind of error checking, usually for length and/or type.
Properties that are expected to hold an array will have the array created here on
first use with the `arrayify` utility.

<br/>
Private Methods

Used by other methods to construct complex objects
enums (fixed values) will be set with these

<br/>
Builder Methods

Not curried.
Build less complex objects and return the object to the coder.

Add Methods

Call the analogous Builder method
Send the received object to the setter
Return the received object to the coder.

<br/>
Maker Methods

Always curried.

There is ALWAYS one called simply `make()` which modifies the properties on .\_fardel.

Follow the exact same pattern, always.

Builds the more complext objects by chaining sub-methods that have the same name as the property
they modify. If a 'shortcut' name is used, it simply references the full length sub-method.

# Pie Utilities

#SHAZAM UTILITIES
These are generally used for checking argument quality. Some check for a value type, some for length, some for compliance with a specification. All either throw and error, or return true.
All are used in the exact same way. They follow the pattern:

shazam_check_something(thing_to_check, class_display_name_property, calling_function_name).

If the test is passed it returns true. If it fails it throws an error message that tells what was expected, where the error originated from, and what the passed in value was. It may also suggest
a troubleshooting tip.

`if shazam_check_something returns true, do the thing(s)`

## setter_chain_generator_config

### **Note about IDE and text editor auto-completion:**

They generally don't pick up on the named functions created these functions.
The functions are dynamically created using nested for-loops.
WebStorm has shown the ability to pick up on the functions generated in the outer loops only.
VS Code has failed to pick up on any of them.
What this means is that you still need to read square's actual docs as well as ours. And you will need to type the
names of the functions manually. You can also just use the setters for the given class. But you will still have to pass
them the expected value (which would be the name of the generated function.)

[This is a really neat function that we don't use anymore. It is the precursor the #enum functions]

When to use this function: When you are interfacing with an API that expects certain
properties to contain explicit values:

Example: Dr. Evil's API has the property:
.ransomDemand which only accepts the following values:
"OneMillionDollars", "OneHundredMillionDollars", "AustinPowers"

You would feed it:

```js
keys: ["ransomDemand"];
ransomDemand: ["OneMillionDollars", "OneHundredMillionDollars", "AustinPowers"];
```

This will create the chainable methods:

```js
ransomDemand().OneMillionDollars() => yourClass.ransomDemand = "OneMillionDollars"
ransomDemand().OneHundredMillionDollars() => yourClass.ransomDemand = "OneHundredMillionDollars"
ransomDemand().AustinPowers() => yourClass.ransomDemand = "AustinPowers"
```

- Creates `[n = keyArray.length]` new methods each with a set of `[n = valueArray.length]` sub methods (channels)
- each channel sets the property named in key to the value named in its associated value array
- config: an object containing the arrays needed - see example below
- methods: The object which holds the generated methods.
- that: the class `(this)` which holds the final values. Pass in `'this'` as an argument.
- channels: a synonym for methods, basically because it's adding methods to methods and I needed syntactic separation

Example:

```js
const configuration_object = {
  keys: ["property_1", "property_2"], // this property MUST be named "keys"
  property_1: ["someValue", "someOtherValue"],
  property_2: [
    "valueMustNotContainSpaces",
    "value_must_conform_to_js_naming_rules",
  ],
};
```

### Edge Cases

#### Spaces

Notice in the example there are ZERO spaces in the values array. At this point, it is an error to use
values with spaces. That can be fixed with a normalizer function that has not yet been added.

#### Non-alpha characters

Javascript does not allow all characters in function names. If the character is not
allowed by JavaScript, this function won't work for you.

## setter_chain_generator_separate_arrays

Exactly the same as `setter_chain_generator_config` except that instead of a config object, this one takes two separate arrays.

- keys: an array of property names that already exist on your class.
- values: an array of function names. These are the fixed string values expected by the API you are interfacing to.

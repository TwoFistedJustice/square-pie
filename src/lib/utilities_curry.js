/*
 *  may need to be refactored for 'this' inside the class
 * */
//
// requires that you feed it an array of keys to work on, after that it
// churns out curried methods
// make a version that allows the passing in of a custom function

/* setter_chain_generator_config
When to use this function: When you are interfacing with an API that expects certain
properties to contain explicit values:

Example: Dr. Evil's API has the property:
 .ransomDemand which only accepts the following values:
  "OneMillionDollars", "OneHundredMillionDollars", "AustinPowers"
  
  You would feed it:
     keys: ["ransomDemand"]
     values: ["OneMillionDollars", "OneHundredMillionDollars", "AustinPowers"]
   This will create the chainable methods:
    ransomDemand().OneMillionDollars() => yourClass.ransomDemand = "OneMillionDollars"
    ransomDemand().OneHundredMillionDollars() => yourClass.ransomDemand = "OneHundredMillionDollars"
    ransomDemand().AustinPowers() => yourClass.ransomDemand = "AustinPowers"
   

 *  Creates [n = keyArray.length] new methods each with a set of [n = valueArray.length] sub methods (channels)
 * each channel sets the property named in key to the value named in its associated value array
 
 * methods: The object which holds the generated methods.
 * that: the class (this) which holds the final values. Pass in 'this' as an argument.
 * channels: a synonym for methods, basically because it's adding methods to methods and I needed syntactic separation
 
 
 Edge Cases:
 Spaces. Notice in the example there are ZERO spaces in the values array. At this point, it is an error to use
 values with spaces. That can be fixed with a normalizer function that has not yet been added.
 
 Non-alpha characters. Javascript does not allow all characters in function names. If the character is not
 allowed by JavaScript, this function won't work for you.
 * */

const setter_chain_generator_config = function (config, methods, that) {
  config.keys.forEach((key) => {
    methods[key] = function () {
      let channels = {};
      config[key].forEach((value) => {
        channels[value] = function () {
          //this requires a setter of [key] name on the class
          that[key] = value;
          return this;
        };
      });
      return channels;
    };
  });
};

/* setter_chain_generator_separate_arrays
 *  Exactly the same as setter_chain_generator_config except that instead of a config object, this
 * one takes two separate arrays.
 *
 * keys: an array of property names that already exist on your class.
 * values: an array of function names. These are the fixed string values expected by the API you are interfacing to.
 * */

const setter_chain_generator_separate_arrays = function (
  keys,
  values,
  methods,
  that
) {
  keys.forEach((key) => {
    methods[key] = function () {
      let channels = {};
      values[key].forEach((value) => {
        channels[value] = function () {
          //this requires a setter of [key] name on the class
          that[key] = value;
          return this;
        };
      });
      return channels;
    };
  });
};

module.exports = {
  setter_chain_generator_config,
  setter_chain_generator_separate_arrays,
};

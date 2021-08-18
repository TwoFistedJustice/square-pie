/*
 *  may need to be refactored for 'this' inside the class
 * */
//
// requires that you feed it an array of keys to work on, after that it
// churns out curried methods
// make a version that allows the passing in of a custom function

/*
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
 * keys: an array of property names that already exist on your class.
 * values: an array of function names. These are the fixed string values expected by the API you are interfacing to.
 * methods: The object which holds the generated methods.
 * that: the class (this) which holds the final values. You may have to pass 'this' into the function you are calling this one from.
 * channels: a synonym for methods, basically because it's adding methods to methods and I needed syntactic separation
 
 
 Edge Cases:
 Spaces. Notice in the example there are ZERO spaces in the values array. At this point, it is an error to use
 values with spaces. That can be fixed with a normalizer function that has not yet been added.
 
 Non-alpha characters. Javascript does not allow all characters in function names. If the character is not
 allowed by JavaScript, this function won't work.
 
 * */

const freeze_dried_curry = function (keys, values, methods, that) {
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

/*
 *  Creates [n = keyArray.length] new methods each with a set of [n = valueArray.length] sub methods (channels)
 * each channel is a copy of the function you pass in
 *
 * */

const microwaved_curry = function (keys, values, obj, props) {
  keys.forEach((key) => {
    obj[key] = function () {
      let channels = {};
      values[key].forEach((value) => {
        channels[value] = function () {
          //this requires a setter of [key] name on the class
          props[key] = value;
          return this;
        };
      });
      return channels;
    };
  });
};

module.exports = {
  microwaved_curry,
  freeze_dried_curry,
};

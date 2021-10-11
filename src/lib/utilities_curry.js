/* defines a property on an object and makes it enumerable
 * arg [object_to_modify]: the name of the object you want to modify
 * art [prop]: the name of the property to be added
 * arg [val]: the value to be set on the property. Can be pretty much anything.
 *
 * Use Case:
 * Use this for building those lovely complex objects that Square likes in the request body.
 *
 * It's an arrow function on purpose
 * */
const define = (object_to_modify, prop, val) => {
  Object.defineProperty(object_to_modify, prop, {
    value: val,
    enumerable: true,
  });
};

/*
 *  may need to be refactored for 'this' inside the class
 * */
//
// requires that you feed it an array of keys to work on, after that it
// churns out curried methods
// make a version that allows the passing in of a custom function

/* setter_chain_generator_config
The class it resides in should have a "configuration" property.
The configuration property should have
 : a "keys" property which is an array of strings
where each string is a property name expected by the Square API.
: for each "key", it should have a property of name ```keys[n]```, and each of those
should contain an array of strings of values expected by the Square API. For an example see
catalog_object_item.js

the generated methods will probably not be recognized by your auto-completion. But they are
there nonethless.

 * */

const setter_chain_generator_config = function (config, methods, that) {
  config.keys.forEach((key) => {
    methods[key] = function () {
      let channels = {};
      config[key].forEach((value) => {
        channels[value] = function () {
          //this calls a setter of [key] name on the class
          that[key] = value;
          return this;
        };
      });
      return channels;
    };
  });
};

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

/*
Returns true if the string is less than or equal to the max length
* */

const maxLength = function (max, str = "") {
  if (str.length > max) {
    throw new Error(`Surpassed maximum character limit of ${max}.\n${str}`);
  }
  return true;
};

module.exports = {
  define,
  setter_chain_generator_config,
  setter_chain_generator_separate_arrays,
  maxLength,
};

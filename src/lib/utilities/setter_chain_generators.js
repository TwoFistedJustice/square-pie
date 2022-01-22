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
https://github.com/TwoFistedJustice/square-pie/blob/d5636284b02f742736e2a54d7523cdd84a74cbcf/src/lib/catalog_object_item.js

the generated methods will probably not be recognized by your auto-completion. But they are
there nonethless.

 * */

/** @function  setter_chain_generator_config - deprecated but left in because frankly, I think this function is cool!
 * @param {object} config - the configuratin object on a class
 * @param {object} methods - a factory function returned object you want to add methods to
 * @param {object} that - the enclosing class of the previous two arguments
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example
 * let klass = {
      configuration: {
        keys: ["doe", "re", "mi"],
        doe: ["deer", "female_deer"],
        re: ["golden_sun"],
        mi: ["myself"]
      },
      methods: {}
    };
 
 setter_chain_generator_config(klass.configuration, klass.methods, klass);
 klass.methods.doe().deer(); => klass.doe = "deer"
 klass.methods.re().golden_sun(); => klass.re = "golden_sun"
 klass.methods.mi().myself(); => klass.mi = "myself"
 * */

const setter_chain_generator_config = function (config, methods, that) {
  // const setter_chain_generator_config = function (that) {
  config.keys.forEach((key) => {
    methods[key] = function () {
      let channels = {};
      config[key].forEach((value) => {
        channels[value] = function () {
          //this creates a setter of [key] name on the class
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

module.exports = {
  setter_chain_generator_config,
  setter_chain_generator_separate_arrays,
};

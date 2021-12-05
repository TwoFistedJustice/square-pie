const { isEmail, normalizeEmail, isISO4217, isRFC3339 } = require("validator");
// const validator = require ("validator");

// TODO a CSV string builder that takes one string and adds it to an existing
//   string such that every entry except the last on is followed by a comma
//  use in Catalog_Request_List for the types

/** normalize_email validates an email address and removes any nonsense that can clutter up
 *  the database or cause sending errors.
 * @param {string} email - an email address
 * @throws Throws an error if argument is not a valid email
 * @returns a normalized email address
 * */
const normalize_email = function (
  email,
  displayName = "unspecified class",
  caller = "unspecified function"
) {
  let normalizeOptions = {
    yahoo_remove_subaddress: false,
  };
  if (!isEmail(email)) {
    throw new Error(
      `${displayName}.${caller} expects a valid email address.\nReceived: ${email}`
    );
  }
  return normalizeEmail(email, normalizeOptions);
};

/** Use define() for building those lovely complex objects that Square likes in the request body.
 *
 *  creates new properties that are configurable, enumerable, and writable.
 *
 * @param {object} object_to_modify is a reference to the object you want to modify
 * @param {string} prop is the name of the property you want to add
 * @param {any} val can be pretty much any valid javascript value
 * @return mutates the object you pass in as the first argument
 *
 * (It's an arrow function on purpose - don't change it)
 * */
const define = (object_to_modify, prop, val) => {
  Object.defineProperty(object_to_modify, prop, {
    value: val,
    configurable: true,
    enumerable: true,
    writable: true,
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

/* Returns true = good
Returns true if the string is less than or equal to the max length
* */
/** shazam_maxLength validates string length, returning true if the string is equal to or less than
 * the maximum allowable length and otherwise throwing an error.
 *
 * * usage:
 *  `if( shazam_maxLength(...) { do stuff }`
 *
 * @param {number} max is the upper limit of allowable string length
 * @param {string} str is the string you want to validate
 * @param {string} displayName is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws Throws and error is the string is longer than allowed
 * @returns {boolean} Returns `true` of the string is less than or equal to the allowed limit
 *
 *  To check for minimum length use shazam_minLength
 * */
const shazam_maxLength = function (
  max,
  str = "",
  displayName = "unspecified class",
  caller = "- unspecified class setter"
) {
  if (str.length > max) {
    throw new Error(
      `${displayName}.${caller} - surpassed maximum character limit of ${max}.\nReceived: ${str}`
    );
  }
  return true;
};

/** shazam_minLength validates string length, returning true if the string is equal to or greater than
 * the minimum allowable length and otherwise throwing an error. Returns true = good
 *
 * usage:
 *  `if( shazam_minLength(...) { do stuff }`
 *
 * @param {number} min is the lower limit of allowable string length
 * @param {string} str is the string you want to validate
 * @param {string} displayName is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws Throws and error is the string is shorter than allowed
 * @returns {boolean} Returns `true` of the string is less than or equal to the allowed limit
 *
 *  To check for maximum length use shazam_maxLength
 * */
const shazam_minLength = function (
  min,
  str = "",
  displayName = "unspecified class",
  caller = "- unspecified class setter"
) {
  if (str.length < min) {
    throw new Error(
      `${displayName}.${caller} - failed to meet minimum character count of ${min}.\n${str}`
    );
  }
  return true;
};

/* Returns true = good
 *  checks if a property holds an array
 *  if not, sets it and returns true
 *  if it does have an array, returns false
 *  usage: if arrayify(args) do something
 *
 * We use [bracket] notation in order to enable to error message
 * to explicitly state whence the problem originated
 *
 * */

const arrayify = function (object_to_check, property_name) {
  if (!Array.isArray(object_to_check[property_name])) {
    object_to_check[property_name] = [];
  }
  if (!Array.isArray(object_to_check[property_name])) {
    throw new Error(`Unable to set array at ${property_name}`);
  }
  return true;
};

/** arche_money builds and returns a compliant Square money object
 * @param {number}  amt is the amount in the smallest currency designation (cents)
 * @param {string} currency expects a three character string forming an ISO 4217 compliant currency desgination
 * If currency argument is not provided, currency will be set to "USD"
 * @throws Throws a Typerror if amt is a boolean
 * @throws Throws a Typerror if amt is not convertible to a Number
 * @throws Throws an error if currency is not a valid ISO 4217 currency
 * @return Returns a Square money object
 * */
const arche_money = function (amt, currency = "USD") {
  let amount = Number(amt);
  if (isNaN(amount) || typeof amt === "boolean") {
    throw new TypeError(`'amount' must be a number. received: ${typeof amt}`);
  }
  if (!isISO4217(currency)) {
    throw new Error(
      `Received ${currency} --  money_helper currency arg must be ISO 4217 compliant.`
    );
  }
  return { amount, currency };
};

/*
 * key is the property name you are adding the time to
 * expected_type is the type of value you expect
 * type_received is what it actually is
 * */

const generate_error_message = function (key, expected_type, received) {
  let type_received = typeof received;
  return `${key}\n expected type: ${expected_type}\n received type: ${type_received}\nvalue received: ${received} `;
};

/**
 * @param {string} time - expects a date code in RFC3339 format
 * @param {string} displayName - the _display_name static from the calling class
 * @param {string} caller - the name variable from the calling function
 * @throws throws and error if the `time` argument is not in RFC3339 format
 * @return {boolean} returns true if `time` argument is a valid RFC3339 date code
 * */
const shazam_RFC3339 = function (time, displayName, caller) {
  if (!isRFC3339(time)) {
    throw new Error(
      `${displayName}.${caller} expects RFC3339 date code. Received: ${time}`
    );
  }
  return true;
};

/**
 * @param {string} num - expects a string that can be converted to an integer
 * @param {string} displayName - the _display_name static from the calling class
 * @param {string} caller - the name variable from the calling function
 * @throws throws and error if the `num` argument cannot be coerced to an integer
 * @return {boolean} returns true if the `num` argument can be coerced to an integer
 * */
const shazam_integer = function (
  num,
  displayName = "unspecified class",
  caller = "- unspecified class setter"
) {
  let parsed = parseInt(num);
  if (isNaN(parsed) || num != parsed) {
    throw new TypeError(
      `${displayName}.${caller} expects an integer or a string that can be coerced to an integer. Received: ${num}`
    );
  }
  return true;
};

/** shazam_boolean strictly verifies argument is a boolean. Does not allow for type coercion.
 * Will throw an error on every value except true and false.
 *
 * @param {boolean} bool - expects a boolean
 * @param {string} displayName - the _display_name static from the calling class
 * @param {string} caller - the name variable from the calling function
 * @throws throws and error if the `bool` argument is not a boolean.
 * @return {boolean} returns true  if the `bool` argument is a boolean.
 * */
const shazam_boolean = function (
  bool,
  displayName = "unspecified class",
  caller = "- unspecified class setter"
) {
  if (typeof bool !== "boolean") {
    throw new Error(
      `${displayName}.${caller} expects a boolean. Received: ${bool}\nMake sure you didn't pass a string that looks like a boolean.`
    );
  }
  return true;
};

module.exports = {
  normalize_email,
  define,
  setter_chain_generator_config,
  setter_chain_generator_separate_arrays,
  shazam_minLength,
  shazam_maxLength,
  arrayify,
  arche_money,
  generate_error_message,
  shazam_RFC3339,
  shazam_integer,
  shazam_boolean,
};

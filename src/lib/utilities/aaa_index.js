const { isISO4217, isRFC3339 } = require("validator");
const normalize_email = require("./normalize_email");
const define = require("./define");
const {
  setter_chain_generator_config,
  setter_chain_generator_separate_arrays,
} = require("./setter_chain_generators");

const shazam_max_length = require("./shazam_max_length");

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
 *  To check for maximum length use shazam_max_length
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
  shazam_max_length,
  arrayify,
  arche_money,
  generate_error_message,
  shazam_RFC3339,
  shazam_integer,
  shazam_boolean,
};

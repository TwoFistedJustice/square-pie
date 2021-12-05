const normalize_email = require("./normalize_email");
const define = require("./define");
const {
  setter_chain_generator_config,
  setter_chain_generator_separate_arrays,
} = require("./setter_chain_generators");

const shazam_max_length = require("./shazam_max_length");
const shazam_min_length = require("./shazam_min_length");
const arrayify = require("./arrayify");
const arche_money = require("./arche_money");
const generate_error_message = require("./generate_error_message");
const shazam_RFC3339 = require("./shazam_RFC3339");

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
  shazam_min_length,
  shazam_max_length,
  arrayify,
  arche_money,
  generate_error_message,
  shazam_RFC3339,
  shazam_integer,
  shazam_boolean,
};

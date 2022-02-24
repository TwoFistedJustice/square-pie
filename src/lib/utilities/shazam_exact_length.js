/* Returns true = good
Returns true if the string is less than or equal to the max length
* */
/** shazam_exact_length validates string length, returning true if the string is equal to the specification.
 * @param {string} str is the string you want to validate
 * @param {number} exact is the exact expected string length
 * @param {string} display_name is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws Throws and error is the string length is not exactly equal to `exact`
 * @returns {boolean} Returns `true` of the string is less than or equal to the allowed limit
 * @example
 *  `if( shazam_exact_length(...) { do stuff }`
 *
 *  To check for minimum length use shazam_min_length
 *  @ignore
 * */

const shazam_exact_length = function (
  str,
  exact,
  display_name = "unspecified class",
  caller = "unspecified class setter"
) {
  let len = str.length;

  if (str.length !== exact) {
    throw new Error(
      `${display_name}.${caller} -length ${len} is not equal to the spefification. Lenght must equal ${exact}.\nReceived: ${str}`
    );
  }
  return true;
};

module.exports = shazam_exact_length;

/* Returns true = good
Returns true if the string is less than or equal to the max length
* */
/** shazam_max_length validates string length, returning true if the string is equal to or less than
 * the maximum allowable length and otherwise throwing an error.
 *
 * * usage:
 *  `if( shazam_max_length(...) { do stuff }`
 *
 * @param {number} max is the upper limit of allowable string length
 * @param {string} str is the string you want to validate
 * @param {string} displayName is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws Throws and error is the string is longer than allowed
 * @returns {boolean} Returns `true` of the string is less than or equal to the allowed limit
 *
 *  To check for minimum length use shazam_min_length
 * */
const shazam_max_length = function (
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

module.exports = shazam_max_length;

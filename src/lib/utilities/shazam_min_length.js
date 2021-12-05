/** shazam_min_length validates string length, returning true if the string is equal to or greater than
 * the minimum allowable length and otherwise throwing an error. Returns true = good
 *
 * usage:
 *  `if( shazam_min_length(...) { do stuff }`
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
const shazam_min_length = function (
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

module.exports = shazam_min_length;

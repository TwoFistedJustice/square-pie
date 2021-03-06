/* Returns true = good
Returns true if the string is less than or equal to the max length
* */
/** shazam_max_length validates string length, returning true if the string is equal to or less than
 * the maximum allowable length and otherwise throwing an error. If the string being checked exceeds 255
 * characters and it triggers an error, it will be truncated to the first and last 20 characters within the error message.
 * @param {string} str is the string you want to validate
 * @param {number} max is the upper limit of allowable string length
 * @param {string} display_name is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws Throws and error is the string is longer than allowed
 * @returns {boolean} Returns `true` of the string is less than or equal to the allowed limit
 * @example
 *  `if( shazam_max_length(...) { do stuff }`
 *
 *  To check for minimum length use shazam_min_length
 *  @ignore
 * */

const shazam_max_length = function (
  str,
  max,
  display_name = "unspecified class",
  caller = "unspecified class setter"
) {
  if (str.length > max) {
    let len = str.length;
    let replacement_string;
    if (str.length > 255) {
      replacement_string = str.slice(0, 20) + "..." + str.slice(-20);
    } else {
      replacement_string = str;
    }
    throw new Error(
      `${display_name}.${caller} -length ${len} surpasses maximum character limit of ${max}.\nReceived: ${replacement_string}`
    );
  }
  return true;
};

module.exports = shazam_max_length;

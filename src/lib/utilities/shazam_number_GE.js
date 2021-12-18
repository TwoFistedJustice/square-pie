/* Returns true = good
 * */
/** @function shazam_number_GE compares a number to a limit. If the number is greater than or equal the limit it returns true and otherwise throws an error.
 *
 * @param {limit} limit is the allowable limit
 * @param {num} num is the value you want to validate
 * @param {string} display_name is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws Throws and error is the string is longer than allowed
 * @returns {boolean} Returns `true` of the string is less than or equal to the allowed limit
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example
 *  `if( shazam_some_comparison(...) { do stuff }`
 * */

const shazam_number_GE = function (
  num,
  limit,
  display_name = "unspecified class",
  caller = "unspecified method"
) {
  if (!(num >= limit)) {
    let message =
      display_name +
      "." +
      caller +
      " number must be no larger than " +
      limit +
      " . Received " +
      num;
    throw new Error(message);
  }
  return true;
};

module.exports = shazam_number_GE;

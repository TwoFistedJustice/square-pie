/* Returns true = good
 * */
/**   @function shazam_number_between_equals Determines if a number is between or equal to two boundary numbers.
 *
 * @param {number} lower is the allowable limit
 * @param {number} upper is the allowable limit
 * @param {number} patient is the value you want to validate
 * @param {string} display_name is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws Throws and error is the string is longer than allowed
 * @returns {boolean} Returns `true` of the string is less than or equal to the allowed limit
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example
 *  `if( shazam_some_comparison(...) { do stuff }`
 *  @ignore
 * */

const shazam_number_between_equals = function (
  lower,
  upper,
  patient,
  display_name = "unspecified class",
  caller = "unspecified method"
) {
  let name = display_name + "." + caller;
  // check if lower is less than upper,
  if (upper < lower) {
    // if not throw a descriptive error
    let message =
      "shazam_number_between_equals(lower, upper) - lower must be less than upper. \nReceived:\nlower: " +
      lower +
      "\nupper: " +
      upper +
      "\nCalled from " +
      name;
    throw new RangeError(message);
  }

  // if it is,
  // then check if patient is greater or equal to lower,
  // if it is not throw a descriptive error
  if (lower > patient || upper < patient) {
    let message =
      name +
      " expects a number between " +
      lower +
      " and " +
      upper +
      ". Received: " +
      patient;
    throw new RangeError(message);
  }

  return true;
};

module.exports = shazam_number_between_equals;

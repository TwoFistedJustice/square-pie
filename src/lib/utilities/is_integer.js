/**   @function is_integer determines if a number is an integer and returns true if it is, and false
 * if it is not. Do not use for meeting Square's requirements. For validating that a value is an
 * integer in order to meet Square's specifications, use shazam_integer().
 *
 * @param {any} num is the value you want to validate
 * @returns {boolean} Returns `true` if value ia an integer and false otherwise.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example
 *  `if( isInteger(some_value) { set some intermediate variable }`
 * */

const is_integer = function (num) {
  let parsed = parseInt(num);
  if (isNaN(parsed) || num != parsed) {
    return false;
  }
  return true;
};

module.exports = is_integer;

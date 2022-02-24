/* Returns true = good
 * */

/** shazam_max_length_array checks if an array is within allowable length.
 * Use this to check the length of an array BEFORE or AFTER adding to that array. Do not
 * use it for checking the length of an array you are concatenating (the input) to another
 * array.
 * * usage:
 *  `if( shazam_max_length_array(20 , ['a', 'b'], display_name, caller) { do stuff }`
 * @param {arr}  arr is the array you want to test
 * @param {number} max is the upper limit.
 * @param {string} display_name is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws Throws an error if `arr` exceeds limit
 * @returns {boolean} Returns `true` if `arr` does not exceed the limit
 *
 *  To check for minimum length use shazam_min_length
 *  @ignore
 * */

const shazam_max_length_array = function (
  arr,
  max,
  display_name = "unspecified class",
  caller = "unspecified method"
) {
  if (arr.length >= max) {
    let message =
      display_name +
      "." +
      caller +
      " surpassed maximum array length limit of " +
      max +
      " Array length: " +
      arr.length;
    throw new Error(message);
  }
  return true;
};

module.exports = shazam_max_length_array;

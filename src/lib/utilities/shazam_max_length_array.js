/* Returns true = good
 * */

/** shazam_max_length_array checks if an array is within allowable length.
 *
 * * usage:
 *  `if( shazam_max_length_array(20 , ['a', 'b'], display_name, caller) { do stuff }`
 *
 * @param {number} max is the upper limit.
 * @param {arr}  arr is the array you want to test
 * @param {string} display_name is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws Throws an error if `arr` exceeds limit
 * @returns {boolean} Returns `true` if `arr` does not exceed the limit
 *
 *  To check for minimum length use shazam_min_length
 * */

const shazam_max_length_array = function (
  max,
  arr,
  display_name = "unspecified class",
  caller = "unspecified method"
) {
  if (arr.length > max) {
    let message =
      display_name +
      "." +
      caller +
      " surpassed maximum array length limit of " +
      max +
      " Received length: " +
      arr.length;
    throw new Error(message);
  }
  return true;
};

module.exports = shazam_max_length_array;

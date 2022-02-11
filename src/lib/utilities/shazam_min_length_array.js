/* Returns true = good
 * */

/** shazam_min_length_array checks if an array at least the minimum allowable length.
 *
 * @param {arr}  arr is the array you want to test
 * @param {number} min is the upper limit.
 * @param {string} display_name is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws Throws an error if `arr` is under minimum
 * @returns {boolean} Returns `true` if `arr` is at least the minimum
 * @example `if( shazam_min_length_array( 1 , ['a', 'b'], display_name, caller) { do stuff }`
 *
 *  To check for maximum length use shazam_max_length
 * */

const shazam_min_length_array = function (
  arr,
  min,
  display_name = "unspecified class",
  caller = "unspecified method"
) {
  if (arr.length < min) {
    let message =
      display_name +
      "." +
      caller +
      " array needs to have at least " +
      min +
      " elements. Received length: " +
      arr.length;
    throw new Error(message);
  }
  return true;
};

module.exports = shazam_min_length_array;

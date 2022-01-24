/** @function shazam_is_array - verifies that the first argument is a populated array.
 * @param {array} arr - a value that SHOULD be an array. Maybe it is, maybe it ain't.
 * @param {string} display_name - the _display_name static from the calling class
 * @param {string} caller - the name variable from the calling function
 * @throws throws and error if the `arr` argument is not an array with at least one member.
 * @return {boolean} returns true if `arr` argument an array with at least one member.
 * */

const shazam_is_array = function (
  arr,
  display_name = "unspecified class",
  caller = "unspecified method"
) {
  let isArray = Array.isArray(arr);
  if (!isArray || arr.length < 1) {
    let type = isArray ? "empty array" : typeof arr;
    let message =
      display_name +
      "." +
      caller +
      " expects an array with at least 1 member but received: " +
      type +
      " : " +
      arr;
    throw new Error(message);
  }
  return true;
};

module.exports = shazam_is_array;

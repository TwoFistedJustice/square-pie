/** @function  array_prevent_duplicate_strings - does not return a value
 * @param {string} value the string value to look for in the array
 * @param {array<string>} array_to_check the array in which to search
 * @param {string} display_name is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws Throws an error if the value is already in the array
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * */

const array_prevent_duplicate_strings = function (
  value,
  array_to_check,
  display_name,
  caller
) {
  let callback = (word) => word === value;
  if (array_to_check.some(callback)) {
    let message =
      display_name + "." + caller + ' array already contains "' + value + '"';
    throw new Error(message);
  }
};

module.exports = array_prevent_duplicate_strings;

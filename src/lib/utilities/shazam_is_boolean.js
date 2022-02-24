/** shazam_is_boolean strictly verifies argument is a boolean. Does not allow for type coercion.
 * Will throw an error on every value except true and false.
 *
 * @param {boolean} bool - expects a boolean
 * @param {string} displayName - the _display_name static from the calling class
 * @param {string} caller - the name variable from the calling function
 * @throws throws an error if the `bool` argument is not a boolean.
 * @return {boolean} returns true  if the `bool` argument is a boolean.
 * @example if(shazam_is_boolean(arg, "Some_Class", "some_method")) {do stuff}
 * @ignore
 * */
const shazam_is_boolean = function (
  bool,
  displayName = "unspecified class",
  caller = "- unspecified class setter"
) {
  if (typeof bool !== "boolean") {
    throw new Error(
      `${displayName}.${caller} expects a boolean. Received: ${bool}\nMake sure you didn't pass a string that looks like a boolean.`
    );
  }
  return true;
};

module.exports = shazam_is_boolean;

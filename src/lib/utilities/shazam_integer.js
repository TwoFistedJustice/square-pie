/**
 * @param {string} num - expects a string that can be converted to an integer
 * @param {string} displayName - the _display_name static from the calling class
 * @param {string} caller - the name variable from the calling function
 * @throws throws and error if the `num` argument cannot be coerced to an integer
 * @return {boolean} returns true if the `num` argument can be coerced to an integer
 * */
const shazam_integer = function (
  num,
  displayName = "unspecified class",
  caller = "- unspecified class setter"
) {
  let parsed = parseInt(num);
  if (isNaN(parsed) || num != parsed) {
    throw new TypeError(
      `${displayName}.${caller} expects an integer or a string that can be coerced to an integer. Received: ${num}`
    );
  }
  return true;
};

module.exports = shazam_integer;
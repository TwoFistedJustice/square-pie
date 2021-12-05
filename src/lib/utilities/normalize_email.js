const { isEmail, normalizeEmail } = require("validator");

/** normalize_email validates an email address and removes any nonsense that can clutter up
 *  the database or cause sending errors.
 * @param {string} email - an email address
 * @throws Throws an error if argument is not a valid email
 * @returns a normalized email address
 * */
const normalize_email = function (
  email,
  displayName = "unspecified class",
  caller = "unspecified function"
) {
  let normalizeOptions = {
    yahoo_remove_subaddress: false,
  };
  if (!isEmail(email)) {
    throw new Error(
      `${displayName}.${caller} expects a valid email address.\nReceived: ${email}`
    );
  }
  return normalizeEmail(email, normalizeOptions);
};

module.exports = normalize_email;

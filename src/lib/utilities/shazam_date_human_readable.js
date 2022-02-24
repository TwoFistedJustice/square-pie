const { isDate } = require("validator");

/* Returns true = good
 * */
/**   @function shazam_date_human_readable validates that a date is in formatted as YYYY-MM-DD. Returns true if it passes and otherwise throws an error.
 *
 * @param {date} date is the value you want to validate
 * @param {string} display_name is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws Throws and error is the string is longer than allowed
 * @returns {boolean} Returns `true` of the string is less than or equal to the allowed limit
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example
 *  `if( shazam_some_comparison(...) { do stuff }`
 *  @ignore
 * */

const shazam_date_human_readable = function (date, display_name, caller) {
  // Square excpects dash delimited date for dates displayed to a consumer
  let options = {
    format: "YYYY-MM-DD",
    strictMode: true,
    delimiters: ["-"],
  };
  if (!isDate(date, options)) {
    let message =
      display_name +
      "." +
      caller +
      " expects dates displayed to consumers to follow the format YYYY-MM-DD. Received: " +
      date;
    throw new Error(message);
  }
  return true;
};

module.exports = shazam_date_human_readable;

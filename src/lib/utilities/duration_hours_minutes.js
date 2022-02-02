/** @function hours_minutes() creates an ISO 8601 duration string.
 * @param {number} hours - can be a integer or decimal
 * @param {number} minutes - can be a integer or decimal
 * @returns {string} Returns a string in the form of an ISO8601 duration.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://en.wikipedia.org/wiki/ISO_8601#Durations | Wikipedia}
 * */

const duration_hours_minutes = function (hours, minutes) {
  return "PT" + hours + "H" + minutes + "M";
};

module.exports = duration_hours_minutes;

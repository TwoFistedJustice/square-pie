/** @function duration_months_days() creates an ISO 8601 duration string.
 * @param {number} months - can be a integer or decimal
 * @param {number} days - can be a integer or decimal
 * @returns {string} Returns a string in the form of an ISO8601 duration.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://en.wikipedia.org/wiki/ISO_8601#Durations | Wikipedia}
 * */

const duration_months_days = function (months, days) {
  return "P" + months + "M" + days + "D";
};

module.exports = duration_months_days;

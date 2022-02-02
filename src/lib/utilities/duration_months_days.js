/** @function duration_months_days() creates an ISO 8601 duration string.
 * @param {number} months - can be a integer or decimal. Pass the number zero to exclude.
 * @param {number} days - can be a integer or decimal. Pass the number zero to exclude.
 * @returns {string} Returns a string in the form of an ISO8601 duration.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://en.wikipedia.org/wiki/ISO_8601#Durations | Wikipedia}
 * */

const duration_months_days = function (months, days = 0) {
  let duration = "P";
  if (months !== 0) {
    duration += months + "M";
  }
  if (days !== 0) {
    duration += days + "D";
  }
  return duration;
};

module.exports = duration_months_days;

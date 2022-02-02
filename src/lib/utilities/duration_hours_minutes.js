/** @function hours_minutes() creates an ISO 8601 duration string. To omit a value,
 *  pass zero in its place. Especially useful when building Order_Fulfillment.
 * @param {number} hours - can be a integer or decimal
 * @param {number} minutes - can be a integer or decimal
 * @returns {string} Returns a string in the form of an ISO8601 duration.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://en.wikipedia.org/wiki/ISO_8601#Durations | Wikipedia}
 * @example
 * duration_hours_minutes(3, 10) => "PT3H10M"
 *
 * duration_hours_minutes(3, 0) => "PT3H"
 *
 * */

const duration_hours_minutes = function (hours, minutes) {
  let duration = "PT";
  if (hours !== 0) {
    duration += hours + "H";
  }
  if (minutes !== 0) {
    duration += minutes + "M";
  }
  return duration;
};

module.exports = duration_hours_minutes;

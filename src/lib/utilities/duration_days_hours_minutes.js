/** @function days_hours_minutes() creates an ISO 8601 duration string. To omit a value,
 * pass zero in its place. Especially useful when building Order_Fulfillment.
 * @param {number} days - can be a integer or decimal
 * @param {number} hours - can be a integer or decimal
 * @param {number} minutes - can be a integer or decimal
 * @returns {string} Returns a string in the form of an ISO8601 duration.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://en.wikipedia.org/wiki/ISO_8601#Durations | Wikipedia}
 * @example
 * duration_days_hours_minutes(3, 10, 30) => "P3DT10H30M"
 *
 * duration_days_hours_minutes(3, 0, 30) => "P3DT30M"
 *
 * */

const duration_days_hours_minutes = function (days, hours = 0, minutes = 0) {
  let duration = "P";
  if (days !== 0) {
    duration += days + "D";
  }
  if (hours !== 0) {
    duration += "T" + hours + "H";
    if (minutes !== 0) {
      duration += minutes + "M";
    }
  }

  if (hours === 0) {
    if (minutes !== 0) {
      duration += "T" + minutes + "M";
    }
  }
  return duration;
};

module.exports = duration_days_hours_minutes;

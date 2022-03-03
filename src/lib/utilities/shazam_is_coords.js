const { isLatLong } = require("validator");

/* Returns true = good
 * */
/**   @function shazam_is_coords validates a set latitude, longtitude coordindates
 *
 * @param {object} coords - a coordinates object int he form {latitude: number, longitude: number}
 * @param {string} display_name is the name of the class making the function call
 * @param {string} caller  is the name of the method making the function call
 * @throws Throws and error is the coordinates are not valid
 * @returns {boolean} Returns `true` of the string is less than or equal to the allowed limit
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example
 *  `if( shazam_some_comparison(...) { do stuff }`
 *  @ignore
 * */

const shazam_is_coords = function (
  coords,
  display_name = "unspecified class",
  caller = "unspecified class setter"
) {
  let latitude = coords.latitude + ""; // coerce into strings
  let longitude = coords.longitude + ""; // for validator
  if (!isLatLong(latitude + "," + longitude)) {
    let message = `${display_name}.${caller}: coordinates are invalid. Received {latitude: ${latitude}, longitude: ${longitude}}`;
    throw new Error(message);
  } else {
    return true;
  }
};

module.exports = shazam_is_coords;

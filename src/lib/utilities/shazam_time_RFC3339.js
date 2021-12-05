const { isRFC3339 } = require("validator");
/**
 * @param {string} time - expects a date code in RFC3339 format
 * @param {string} displayName - the _display_name static from the calling class
 * @param {string} caller - the name variable from the calling function
 * @throws throws and error if the `time` argument is not in RFC3339 format
 * @return {boolean} returns true if `time` argument is a valid RFC3339 date code
 * */
const shazam_time_RFC3339 = function (time, displayName, caller) {
  if (!isRFC3339(time)) {
    throw new Error(
      `${displayName}.${caller} expects RFC3339 date code. Received: ${time}`
    );
  }
  return true;
};

module.exports = shazam_time_RFC3339;

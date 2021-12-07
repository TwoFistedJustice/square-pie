/** Do not use this utility to check for a property prior to defining that property
 *
 *  This utility verifies that a required property exists on an object. If the property exists,
 *  the function returns true.
 *
 *  It does not:
 *   - not return false - ever.
 *   - not define the property
 *   - not validate any value or type
 *
 * @param {object} obj - the object we are validating
 * @param {string} property_name - the name of the required property
 * @param {string} display_name - The name of the class calling the function.
 * @param {string} caller - The name of the class.method calling the function.
 * @throws {Error} Throws an error if the object does not contain the specified property name
 * @return {boolean} Returns true if the object under examination has the specified property.
 * */

const shazam_object_has_property = function (
  obj,
  property_name,
  display_name = "unspecified class",
  caller = "unspecified method"
) {
  if (!Object.prototype.hasOwnProperty.call(obj, property_name)) {
    let message =
      "The object provided to " +
      display_name +
      "." +
      caller +
      " must have the property: " +
      property_name;
    throw new Error(message);
  }
  return true;
};

module.exports = shazam_object_has_property;

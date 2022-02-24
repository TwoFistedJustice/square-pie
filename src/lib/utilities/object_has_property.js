/** @function object_has_property - returns true if object has the property
 * @param {object} object
 * @param {string} property
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example
 *  if (object_has_property(obj, "prop"){
 *    // do something
 *  }
 * @ignore
 * */
const object_has_property = function (object, property) {
  return Object.prototype.hasOwnProperty.call(object, property) ? true : false;
};

module.exports = object_has_property;

/** @function object_does_not_have_property - returns true if object lacks the property
 * @param {object} object
 * @param {string} property
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example
 *  if (object_does_not_have_property(obj, "prop"){
 *    // define (obj, "prop");
 *  }
 * @ignore
 * */
const object_does_not_have_property = function (object, property) {
  return Object.prototype.hasOwnProperty.call(object, property) ? false : true;
};

module.exports = object_does_not_have_property;

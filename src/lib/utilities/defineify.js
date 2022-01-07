/** @function defineify - checks if a provided property name exists on an object, and creates it with a
 * value of undefined. Note this is not the same as the 'define' utility.
 * @param {object} object_to_modfiy is a reference to the object you want to modify
 * @param {string} property_name the name of the property you want to add
 * @param {any} val - the value to set
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * */

const defineify = function (object_to_modfiy, property_name, val) {
  if (!Object.prototype.hasOwnProperty.call(object_to_modfiy, property_name)) {
    Object.defineProperty(object_to_modfiy, property_name, {
      value: val,
      configurable: true,
      enumerable: true,
      writable: true,
    });
  }
};

module.exports = defineify;

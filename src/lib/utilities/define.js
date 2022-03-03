/** Use define() for building those lovely complex objects that Square likes in the request body.
 *
 *  creates new properties that are configurable, enumerable, and writable.
 *
 * @param {object} object_to_modify is a reference to the object you want to modify
 * @param {string} prop is the name of the property you want to add
 * @param {any} val can be pretty much any valid javascript value
 * @return mutates the object you pass in as the first argument
 *
 * (It's an arrow function on purpose - don't change it)
 *  @ignore
 * */
const define = (object_to_modify, prop, val) => {
  Object.defineProperty(object_to_modify, prop, {
    value: val,
    configurable: true,
    enumerable: true,
    writable: true,
  });
};

module.exports = define;

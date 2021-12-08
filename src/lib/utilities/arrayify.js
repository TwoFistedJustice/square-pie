/** Checks if an array exists at a an object property. If it does not, then it creates one.
 *  If there is already an array present, it returns true.
 * @param {object} object_to_check - the object that is supposed to contain the array.
 * @param {string} property_name - the name of the property where the array is to be located.
 * @param {string} display_name
 * @param {string} caller
 * @throws {Error} Throws an error if it is unable to create an array at the specified location.
 * @author Russ Bain aka TwoFistedJustice
 * @example You have an object called `_body` which has a property called `foo`. Foo is set to undefined
 * by default (this is common throughout Square-Pie). When foo is included in your request body
 * Square expects it to have an array of values. If you try to push a value to it before it has an array, node will throw an
 * error and stop execution. So you need to create the array before you can add a value to it.
 *
 * Use arrayify() to create the array. Arrayify will create the array if none exists. And it will simply
 * return true if one is already present.
 *
 * You have:  `{foo: undefined}`
 * You want: `{foo: ["bar"]}`
 * You do:
 * `if(arrayify(this._body, "foo")) {
 *   this._body.foo.push("bar")
 * }`
 * */
const arrayify = function (
  object_to_check,
  property_name,
  display_name = "unspecified class",
  caller = "unspecified method"
) {
  if (!Array.isArray(object_to_check[property_name])) {
    object_to_check[property_name] = [];
  }
  if (!Array.isArray(object_to_check[property_name])) {
    let message =
      display_name +
      "." +
      caller +
      " was unable to create a new array at " +
      property_name;
    throw new Error(message);
  }
  return true;
};

module.exports = arrayify;

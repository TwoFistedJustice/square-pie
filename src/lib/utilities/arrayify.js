/** Checks if an array exists at a an object property. If it does not, then it creates one.
 *  If there is already an array present, it does nothing.
 * @param {object} object_to_check - the object that is supposed to contain the array.
 * @param {string} property_name - the name of the property where the array is to be located.
 * @param {string} display_name
 * @param {string} caller
 * @throws {Error} Throws an error if it is unable to create an array at the specified location.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example You have an object called `_body` which has a property called `foo`. Foo is set to undefined
 * by default (this is common throughout Square-Pie). When foo is included in your request body
 * Square expects it to have an array of values. If you try to push a value to it before it has an array, node will throw an
 * error and stop execution. So you need to create the array before you can add a value to it.
 *
 * Use arrayify() to create the array. Arrayify will create the array if none exists and do nothing if one does.
 *
 * You have:  `{foo: undefined}`
 * You want: `{foo: ["bar"]}`
 * You do:
 * (arrayify(this._body, "foo"))
 *   this._body.foo.push("bar")
 *
 * */
const arrayify = function (
  object_to_check,
  property_name,
  display_name = "unspecified class",
  caller = property_name
) {
  try {
    if (!Array.isArray(object_to_check[property_name])) {
      object_to_check[property_name] = [];
    }
  } catch (error) {
    let message = display_name + "." + caller + " " + error.message;
    throw new Error(message);
  }
};

module.exports = arrayify;

// can I override the error mesage of

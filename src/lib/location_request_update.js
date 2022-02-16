const Location_RU = require("./location_request_abstract_RU_super");
const man =
  "\n" +
  "https://developer.squareup.com/reference/square/locations-api/update-location";

/** @class Location_Update
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/locations-api/update-location | Square Docs}
 * */

class Location_Update extends Location_RU {
  _display_name = "Location_Update";
  _last_verified_square_api_version = "2021-01-20";
  _help = this.display_name + ": " + man;
  constructor(id) {
    super(id);
    this._method = "PUT";
    this._body = {
      location: undefined,
    };
  }

  get location() {
    return this._body.location;
  }
  set location(fardel) {
    this._body.location = fardel;
  }

  /** @function make()  method of Location_Update - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method id - sets the id in the endppoint, overrides constructor argument.
   * @param {string} id -
   * @method location
   * @param {object} fardel - Location_Object.fardel
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *
   * */
  make() {
    return {
      self: this,
      id: function (id) {
        this.self.id = id;
        return this;
      },
      location: function (fardel) {
        this.self.location = fardel;
        return this;
      },
    };
  }
}

module.exports = Location_Update;

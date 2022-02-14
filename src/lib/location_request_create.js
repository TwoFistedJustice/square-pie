const Location_Request = require("./location_request_abstract");
const man =
  "an http request to create a new location document.\n" +
  "Create the location using the Location_Create class. Pass its fardel as an argument to make().location(myVar.fardel)\n" +
  "https://developer.squareup.com/reference/square/invoices-api/create-invoice";

/** @class  Location_Create
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/locations-api/create-location | Square Docs}
 * */
class Location_Create extends Location_Request {
  _display_name = "Location_Create";
  _last_verified_square_api_version = "2021-01-20";
  _help = this.display_name + ": " + man;
  constructor() {
    super();
    this._method = "POST";
    this._endpoint = "";
    this._body = {
      location: undefined,
    };
  }
  // GETTERS
  get location() {
    return this._body.location;
  }
  // SETTERS
  set location(fardel) {
    this._body.location = fardel;
  }
  // MAKE METHODS
  /** @function make()  method of Location_Create - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method location
   * @param {object} fardel - a location object fardel
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
      location: function (fardel) {
        this.self.location = fardel;
        return this;
      },
    };
  }
}

module.exports = Location_Create;

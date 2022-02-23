const Location_Request = require("./location_request_abstract");
const man =
  "an http request to create a new location document.\n" +
  "Create the location using the Location_Create class. Pass its fardel as an argument to make().location(myVar.fardel)\n" +
  "https://developer.squareup.com/reference/square/invoices-api/create-invoice";

/**
 * {@link https://developer.squareup.com/reference/square/locations-api/create-location |  **-------> Link To Square Docs <-------**}
 * @class Location_Create
 * @extends Square_Request
 * @classdesc
 *
 * An http request to create a new location document.<br>
 * Create the location using the Location_Create class. Then pass its fardel as an argument to `make().location(myVar.fardel)`
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
  /**
   *  make() method of Location_Create
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Location_Create.make
   * @method
   * @public
   * @memberOf Location_Create
   * @property location(fardel) {fardel} - a location object fardel
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *    //is the same as
   *   myVar.make().gizmo().gremlin()
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

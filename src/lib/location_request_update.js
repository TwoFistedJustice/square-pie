const Location_RU = require("./location_request_abstract_RU_super");
const man =
  "Updates an existing location. Add only the fields you want to change.\n" +
  "https://developer.squareup.com/reference/square/locations-api/update-location";

/**
 * {@link https://developer.squareup.com/reference/square/locations-api/update-location |  **-------> Link To Square Docs <-------**}
 * @class Location_Update
 * @extends Square_Request
 * @classdesc
 *
 * Updates an existing location.<br><br>
 * Build your with the Location_Object class with only the fields you want to change
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

  /**
   *  make() method of Location_Update
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Location_Update.make
   * @method
   * @public
   * @memberOf Location_Update
   * @property id(id) {string} - sets the id in the endppoint, overrides constructor argument.
   * @property location(fardel) {fardel} - Location_Object.fardel
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

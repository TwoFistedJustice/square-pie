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

module.exports = Location_Update;

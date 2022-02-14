const Square_Request = require("./square_request_abstract");

/** @class Location_Request super class of all Location API request classes
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/locations-api | Square Docs}
 * */

class Location_Request extends Square_Request {
  _display_name = "Location_Request";
  constructor() {
    super();
    this._api_name = "locations";
    this._delivery;
  }

  get delivery() {
    return this._delivery;
  }

  set delivery(parcel) {
    this._delivery = parcel.location;
  }
}
module.exports = Location_Request;

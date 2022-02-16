//https://developer.squareup.com/reference/square/locations-api/list-locations

const Location_Request = require("./location_request_abstract");

const man =
  "http request to list all locations.\n" +
  "https://developer.squareup.com/reference/square/locations-api/list-locations";

/** @class  Location_List - lists location objects. Has no make() method.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/locations-api/list-locations | Square Docs}
 * */

class Location_List extends Location_Request {
  _display_name = "Location_List";
  _last_verified_square_api_version = "2021-01-20";
  _help = this.display_name + ": " + man;
  constructor() {
    super();
    this._method = "GET";
    this._delivery = undefined;
  }
  get delivery() {
    return this._delivery;
  }
  set delivery(parcel) {
    if (Object.prototype.hasOwnProperty.call(parcel, "locations")) {
      this._delivery = parcel.locations;
    } else {
      this._delivery = parcel;
    }
  }
}
module.exports = Location_List;

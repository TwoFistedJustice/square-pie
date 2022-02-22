const Square_Request = require("./square_request_abstract");
/**
 * {@link https://developer.squareup.com/reference/square/locations-api |  **-------> Link To Square Docs <-------**}
 * @class Location_Request
 * @abstract
 * @ignore
 * @classdesc
 *
 * Super class of all Location API request classes
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
    if (Object.prototype.hasOwnProperty.call(parcel, "location")) {
      this._delivery = parcel.location;
    } else {
      this._delivery = parcel;
    }
  }
}
module.exports = Location_Request;

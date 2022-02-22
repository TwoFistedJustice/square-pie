const Location_RU = require("./location_request_abstract_RU_super");
const man =
  "http request to retrieve one location. \n" +
  "Pass the id of the location to be retrieved as a string argument when you instantiate the class. Then\n" +
  "call .request() This class has no make() method.  You can change or add the id after instantiation by\n" +
  " using the `id` setter.\n" +
  "https://developer.squareup.com/reference/square/locations-api/retrieve-location";

/**
 * {@link https://developer.squareup.com/reference/square/invoices-api/get-invoice |  **-------> Link To Square Docs <-------**}
 * @class Location_Retrieve
 * @classdesc
 *
 * An http request to retrieve one location.<br><br>
 * Pass the id of the location to be retrieved as a string argument when you instantiate the class. Then call .request()<br> <br>
 *You can change or add the id after instantiation by using the `id` setter.<br><br>
 * Has no make() method.
 *
 * @example
 * const retrieve = new Location_Retrieve("some_location_id");
 * await retrieve.request();
 * retrieve.delivery => where the response is kept
 *
 * */
class Location_Retrieve extends Location_RU {
  _display_name = "Location_Retrieve";
  _last_verified_square_api_version = "2021-01-20";
  _help = this.display_name + ": " + man;
  constructor(id) {
    super(id);
    this._method = "GET";
  }
}

module.exports = Location_Retrieve;

const Location_RU = require("./location_request_abstract_RU_super");
const man =
  "http request to retrieve one location. \n" +
  "Pass the id of the location to be retrieved as a string argument when you instantiate the class. Then\n" +
  "call .request() This class has no make() method.\n" +
  "https://developer.squareup.com/reference/square/locations-api/retrieve-location";

/** @class Location_Retrieve - represents an http request to GET an invoice. (calling it "retrieve" to be
 * consistent with the rest of the API.
 * @param {string} id The invoice_id of the invoice you want
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * * {@link https://developer.squareup.com/reference/square/invoices-api/get-invoice | Square Docs}
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

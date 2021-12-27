const Invoice_RUDCnP = require("./invoice_request_abstract_RUDCP_super");

/** @class Invoice_Retrieve - represents an http request to GET an invoice. (calling it "retrieve" to be
 * consistent with the rest of the API.
 * @param {string} id The invoice_id of the invoice you want
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * * {@link https://developer.squareup.com/reference/square/invoices-api/get-invoice | Square Docs}
 *
 *  About the only thing this does that isn't done in the Super is send up the request method
 * */
class Invoice_Retrieve extends Invoice_RUDCnP {
  _display_name = "Invoice_Retrieve";
  _last_verified_square_api_version = "2021-12-15";
  constructor(id) {
    super(id);
    this._method = "GET";
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
}

module.exports = Invoice_Retrieve;

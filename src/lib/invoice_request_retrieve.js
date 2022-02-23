const Invoice_RUDCnP = require("./invoice_request_abstract_RUDCP_super");
const man =
  'http request to retrieve one invoice. Square docs call this the "Get" endpoint.\n' +
  "Pass the id of the invoice to be retrieved as a string argument when you instantiate the class. Then\n" +
  "call .request()\n" +
  "https://developer.squareup.com/reference/square/invoices-api/get-invoice";

/**
 * {@link https://developer.squareup.com/reference/square/invoices-api/get-invoice |  **-------> Link To Square Docs <-------**}
 * @class Invoice_Retrieve
 * @extends Square_Request
 * @param {string} id The invoice_id of the invoice to be fetched
 * @classdesc
 *
 * http request to retrieve one invoice. Square docs call this the "Get" endpoint.
 * Pass the id of the invoice to be retrieved as a string argument when you instantiate the class. Then call .request()
 * Note: Square calls this endpoint 'get' rather than 'retrieve'. We are calling it 'retrieve' in order to be consistent with the rest of the API. (less to memorize that way)
 * */
class Invoice_Retrieve extends Invoice_RUDCnP {
  _display_name = "Invoice_Retrieve";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor(id) {
    super(id);
    this._method = "GET";
  }
}

module.exports = Invoice_Retrieve;

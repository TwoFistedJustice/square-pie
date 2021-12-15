const Invoice_RUDCnP = require("./stub.invoice_request_abstract_RUDCP_super");

/** @class Invoice_Retrieve
 * @param {string} id The invoice_id of the invoice you want
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * * {@link https://developer.squareup.com/reference/square/invoices-api/get-invoice | Square Docs}
 * */
class Invoice_Retrieve extends Invoice_RUDCnP {
  _display_name = "Invoice_Retrieve";
  _last_verified_square_api_version = "2021-11-17";
  constructor(id) {
    super(id);
    this._method = "GET";
  }

  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get delivery() {
    return this._delivery;
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
    };
  }
}

module.exports = Invoice_Retrieve;

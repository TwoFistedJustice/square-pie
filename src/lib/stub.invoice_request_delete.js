const Invoice_RUDCnP = require("./stub.invoice_request_abstract_RUDCP_super");

/** @class Invoice_Delete
 * @param {string} id The invoice_id of the invoice you want
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * * {@link https://developer.squareup.com/reference/square/invoices-api/delete-invoice | Square Docs}
 * */
class Invoice_Delete extends Invoice_RUDCnP {
  _display_name = "Invoice_Delete";
  _last_verified_square_api_version = "2021-11-17";
  constructor(id) {
    super(id);
    this._method = "";
  }

  // todo delete gets its own .delivery which is empty - override

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

module.exports = Invoice_Delete;

const Invoice_RUDCnP = require("./invoice_request_abstract_RUDCP_super");

/** @class Invoice_Delete
 * @param {string} id The invoice_id of the invoice you want
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * * {@link https://developer.squareup.com/reference/square/invoices-api/delete-invoice | Square Docs}
 * */
class Invoice_Delete extends Invoice_RUDCnP {
  _display_name = "Invoice_Delete";
  _last_verified_square_api_version = "2021-12-15";
  constructor(id) {
    super(id);
    this._method = "DELETE";
    this._delivery;
  }

  set delivery(parcel) {
    this._delivery = parcel;
  }

  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get delivery() {
    return this._delivery;
  }
}

module.exports = Invoice_Delete;

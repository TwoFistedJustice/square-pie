const Invoice_RUDCnP = require("./invoice_request_abstract_RUDCP_super");
const man =
  " http request to delete an invoice.\n" +
  "Pass the id of the invoice to be deleted as a string argument when you instantiate the class.\n" +
  "There is no option to add it afterwards. There is no make() method on this class." +
  "\n\nhttps://developer.squareup.com/reference/square/invoices-api/delete-invoice";
/** @class Invoice_Delete
 * @param {string} id The invoice_id of the invoice you want
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * * {@link https://developer.squareup.com/reference/square/invoices-api/delete-invoice | Square Docs}
 * */
class Invoice_Delete extends Invoice_RUDCnP {
  _display_name = "Invoice_Delete";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
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
  get help() {
    return this._help;
  }
  get delivery() {
    return this._delivery;
  }
}

module.exports = Invoice_Delete;

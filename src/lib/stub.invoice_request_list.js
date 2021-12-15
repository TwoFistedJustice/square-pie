const Invoice_Request = require("./stub.invoice_request_abstract");

/** @class  Invoice_List
 * @param {}
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/invoices-api/list-invoices | Square Docs}
 * */
class Invoice_List extends Invoice_Request {
  _display_name = "Invoice_Create";
  _last_verified_square_api_version = "2021-11-17";
  constructor() {
    super();

    this._method = "GET";
    this._endpoint = "";
    this._delivery = undefined;

    this._body = {};
    this.configuration = {
      maximums: {
        idempotency_key: 128,
      },
    };
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

  set delivery(parcel) {
    this._delivery = parcel.invoices;
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
    };
  }
}

module.exports = Invoice_List;

const Invoice_Request = require("./stub.invoice_request_abstract");
const nanoid = require("nanoid");

/** @class  Invoice_Create
 * @param {}
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/invoices-api/create-invoice | Square Docs}
 * */
class Invoice_Create extends Invoice_Request {
  _display_name = "Invoice_Create";
  _last_verified_square_api_version = "2021-11-17";
  constructor() {
    super();

    this._method = "POST";
    this._endpoint = "";

    this._body = {
      idempotency_key: nanoid(), // 128
    };
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

  // MAKER METHODS
  make() {
    return {
      self: this,
    };
  }
}

module.exports = Invoice_Create;

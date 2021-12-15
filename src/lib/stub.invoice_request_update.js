const Invoice_RUDCnP = require("./stub.invoice_request_abstract_RUDCP_super");
const nanoid = require("nanoid");

/** @class Invoice_Update
 * @param {string} id The invoice_id of the invoice you want
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/invoices-api/update-invoice | Square Docs}
 * */
class Invoice_Update extends Invoice_RUDCnP {
  _display_name = "Invoice_Update";
  _last_verified_square_api_version = "2021-11-17";
  constructor(id) {
    super(id);
    this._method = "PUT";
    this._body = {
      idempotency_key: nanoid(), // 128
      version: undefined, //int32
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

module.exports = Invoice_Update;

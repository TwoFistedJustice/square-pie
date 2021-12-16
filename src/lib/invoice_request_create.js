const Invoice_Request = require("./stub.invoice_request_abstract");
const { nanoid } = require("nanoid");
const { shazam_max_length } = require("./utilities/aaa_index");

/** @class  Invoice_Create
 * @param {}
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/invoices-api/create-invoice | Square Docs}
 * */
class Invoice_Create extends Invoice_Request {
  _display_name = "Invoice_Create";
  _last_verified_square_api_version = "2021-12-15";
  constructor() {
    super();

    this._method = "POST";
    this._endpoint = "";

    this._body = {
      idempotency_key: nanoid(), // 128
      invoice: undefined,
    };
    this.configuration = {
      maximums: {
        idempotency_key: 128,
      },
    };
  }
  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get endpoint() {
    return this._endpoint;
  }

  get body() {
    return this._body;
  }
  get idempotency_key() {
    return this._body.idempotency_key;
  }

  // SETTERS

  set idempotency_key(key) {
    if (
      shazam_max_length(
        this.configuration.maximums.idempotency_key,
        key,
        this.display_name,
        "idempotency_key"
      )
    ) {
      this._body.idempotency_key = key;
    }
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
      idempotency_key: function (key) {
        this.self.idempotency_key = key;
        return this;
      },
      invoice: function (order) {
        this.self.invoice = order;
        return this;
      },
    };
  }
}

module.exports = Invoice_Create;

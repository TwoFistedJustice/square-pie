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
  _help =
    "When creating a new invoice you MUST include the order_id on the invoice object";
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
  get help() {
    return this._help;
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
  get invoice() {
    return this._body.invoice;
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
  /** @method invoice - setter checks for order_id, if not present, it throws an error
   * @param {object} fardel - Invoice_Object.fardel
   * @throws an error if order_id is not present on the object passed
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * */
  set invoice(fardel) {
    if (fardel.order_id === undefined || typeof fardel.order_id !== "string") {
      let message =
        "To create a new invoice, order_id must be specified. Received: " +
        fardel.order_id;
      throw new Error(message);
    } else {
      this._body.invoice = fardel;
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
      invoice: function (fardel) {
        this.self.invoice = fardel;
        return this;
      },
    };
  }
}

module.exports = Invoice_Create;

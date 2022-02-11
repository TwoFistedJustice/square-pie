const Invoice_Request = require("./invoice_request_abstract");
const { nanoid } = require("nanoid");
const { shazam_max_length } = require("./utilities");
const man =
  "an http request to create a new invoice document.\n" +
  "Create the invoie using the Invoice_Object class. Pass its fardel as an argument to make().invoice(myVar.fardel)" +
  '"When creating a new invoice you MUST include the order_id on the invoice object";' +
  "\nhttps://developer.squareup.com/reference/square/invoices-api/create-invoice";

/** @class  Invoice_Create
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/invoices-api/create-invoice | Square Docs}
 * */
class Invoice_Create extends Invoice_Request {
  _display_name = "Invoice_Create";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;

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
        key,
        this.configuration.maximums.idempotency_key,
        this.display_name,
        "idempotency_key"
      )
    ) {
      this._body.idempotency_key = key;
    }
  }
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
  /** @function make()  method of Invoice_Create - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method idempotency_key - this is automatically set
   * @param {string} key -
   * @method invoice
   * @param {object} fardel - an invoice object fardel
   * @throws an error if order_id is not present on the object passed
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *
   * */
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

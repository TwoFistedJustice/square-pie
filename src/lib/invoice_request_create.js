const Invoice_Request = require("./invoice_request_abstract");
const { nanoid } = require("nanoid");
const { shazam_max_length } = require("./utilities");
const man =
  "an http request to create a new invoice document.\n" +
  "Create the invoie using the Invoice_Object class. Pass its fardel as an argument to make().invoice(myVar.fardel)" +
  '"When creating a new invoice you MUST include the order_id on the invoice object\n"' +
  "https://developer.squareup.com/reference/square/invoices-api/create-invoice";

/**
 * {@link https://developer.squareup.com/reference/square/invoices-api/create-invoice |  **-------> Link To Square Docs <-------**}
 * @class Invoice_Create
 * @classdesc
 *
 * An http request to create a new invoice document.<br>
 * Create the invoie using the Invoice_Object class. Pass its fardel as an argument to make().invoice(myVar.fardel)<br>
 * When creating a new invoice you MUST include the order_id on the invoice object<br>
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

  // MAKE METHODS
  /**
   *  make() method of Invoice_Create
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Invoice_Create.make
   * @method
   * @public
   * @memberOf Invoice_Create
   * @property idempotency_key(key) {string} - use only if you want to use your own key in place of the automatically generated one.
   * @property invoice(fardel) {fardel} - invoice_obejct.fardel - will throw an error if the order_id is not present
   * @throws Error if the order_id is not present on the invoice
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *
   *  let invoice = new Invoice_Object()
   *             // build your invoice object then pass its fardel to the request class
   *  let create = new Invoice_Create(invoice.fardel)
   *              //OR
   *  let create = new Invoice_Create()
   *  create.make().invoice(invoice.fardel)
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

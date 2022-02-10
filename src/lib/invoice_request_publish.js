const Invoice_RUDCnP = require("./invoice_request_abstract_RUDCP_super");
const { nanoid } = require("nanoid");
const { shazam_is_integer, shazam_max_length } = require("./utilities");
const man =
  "http request to publish an invoice.\n" +
  "A published invoice MUST have a customer_id set in the primary_recipient field. This must be done before calling Publish endpoint.\n" +
  "You MUST provide the invoice VERSION. If you do not know the version, call Invoice_Retrieve or Invoice_List.\n" +
  "You can add the invoice_id either as an argument when you instantiate the class, calling the .id setter, or calling make().id()" +
  "\n\nhttps://developer.squareup.com/reference/square/invoices-api/publish-invoice";
/** @class Invoice_Publish
 * @param {string} id The invoice_id of the invoice you want
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * * {@link https://developer.squareup.com/reference/square/invoices-api/publish-invoice | Square Docs}
 * */

class Invoice_Publish extends Invoice_RUDCnP {
  _display_name = "Invoice_Publish";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;

  constructor(id) {
    super();
    this._method = "POST";
    this._endpoint = `/${id}/publish`;
    this._body = {
      idempotency_key: nanoid(),
      version: undefined, //int32 REQUIRED
    };
    this.configuration = {
      maximums: {
        idempotency_key: 128,
      },
    };
  }
  // GETTERS
  get id() {
    return this._endpoint;
  }
  get version() {
    return this._body.version;
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

  set id(someId) {
    this._endpoint = "/" + someId + "/publish";
  }

  set version(ver) {
    if (shazam_is_integer(ver, this._display_name, "version")) {
      this._body.version = ver;
    }
  }

  // MAKER METHODS
  /** @function make()  method of Invoice_Publish - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method id
   * @param {string} id -
   * @method version
   * @param {number} ver -
   * @method
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
      id: function (id) {
        this.self.id = id;
        return this;
      },
      version: function (ver) {
        this.self.version = ver;
        return this;
      },
    };
  }
}

module.exports = Invoice_Publish;

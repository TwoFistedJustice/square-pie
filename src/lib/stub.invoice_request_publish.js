const Invoice_RUDCnP = require("./stub.invoice_request_abstract_RUDCP_super");
const { nanoid } = require("nanoid");
const { shazam_integer, shazam_max_length } = require("./utilities/aaa_index");

/** @class Invoice_Publish
 * @param {string} id The invoice_id of the invoice you want
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * * {@link https://developer.squareup.com/reference/square/invoices-api/publish-invoice | Square Docs}
 * */
class Invoice_Publish extends Invoice_RUDCnP {
  _display_name = "Invoice_Publish";
  _last_verified_square_api_version = "2021-11-17";
  _help =
    "You must provide the invoice VERSION. If you do not know the version, call Invoice_Retrieve or Invoice_List.\nYou can add the invoice_id either as an argument when yuo instantiate the class, calling the setter, or calling make().id()";
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
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }

  get id() {
    return this._endpoint;
  }
  get version() {
    return this._body.version;
  }

  get help() {
    return this._help;
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
    if (shazam_integer(ver, this._display_name, "version")) {
      this._body.version = ver;
    }
  }

  // MAKER METHODS
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

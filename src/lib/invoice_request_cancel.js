const Invoice_RUDCnP = require("./invoice_request_abstract_RUDCP_super");
const { shazam_integer } = require("./utilities/aaa_index");
/** @class Invoice_Cancel
 * @param {string} id The invoice_id of the invoice you want
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * * {@link https://developer.squareup.com/reference/square/invoices-api/cancel-invoice | Square Docs}
 * */
class Invoice_Cancel extends Invoice_RUDCnP {
  _display_name = "Invoice_Cancel";
  _last_verified_square_api_version = "2021-11-17";
  _help =
    "You must provide the invoice VERSION. If you do not know the version, call Invoice_Retrieve or Invoice_List.\nYou cannot cancel an invoice in the DRAFT state or in a terminal state: PAID, REFUNDED, CANCELED, or FAILED.\nYou can add the invoice_id either as an argument when yuo instantiate the class, calling the setter, or calling make().id()";
  constructor(id) {
    super();
    this._method = "POST";
    this._endpoint = `/${id}/cancel`;
    this._body = {
      version: undefined, //int32 REQUIRED
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

  // SETTERS

  set id(someId) {
    this._endpoint = "/" + someId + "/cancel";
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

module.exports = Invoice_Cancel;

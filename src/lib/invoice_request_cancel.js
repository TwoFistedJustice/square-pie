const Invoice_RUDCnP = require("./invoice_request_abstract_RUDCP_super");
const { shazam_is_integer } = require("./utilities");
const man =
  "http request to cancel an invoice. Pass the id of the invoice to cancel as an argument\n" +
  "when you instantiate the class.\n" +
  "You must provide the invoice VERSION. If you do not know the version, call Invoice_Retrieve or\n" +
  "Invoice_List.\nYou cannot cancel an invoice in the DRAFT state or in a terminal state: PAID, REFUNDED,\n" +
  "CANCELED, or FAILED.\nYou can add the invoice_id either as an argument when yuo instantiate the class,\n" +
  "calling the setter, or calling make().id()\n";
("https://developer.squareup.com/reference/square/invoices-api/cancel-invoice");

/**
 * {@link https://developer.squareup.com/reference/square/invoices-api/cancel-invoice  |  **-------> Link To Square Docs <-------**}
 * @class Invoice_Cancel
 * @extends Square_Request
 * @param {string} id The invoice_id of the invoice you want
 * @classdesc
 *
 *http request to cancel an invoice.<br>
 * Pass the id of the invoice to cancel as an argument when you instantiate the class.<br>
 * You must provide the invoice VERSION. If you do not know the version, call Invoice_Retrieve or Invoice_List.You cannot cancel an invoice in the DRAFT state or in a terminal state: PAID, REFUNDED, CANCELED, or FAILED.<br>
 * You can add the invoice_id either as an argument when yuo instantiate the class, calling the setter, or calling make().id()<br>
 * */

class Invoice_Cancel extends Invoice_RUDCnP {
  _display_name = "Invoice_Cancel";
  _last_verified_square_api_version = "2021-11-17";
  _help = this.display_name + ": " + man;

  constructor(id) {
    super();
    this._method = "POST";
    this._endpoint = `/${id}/cancel`;
    this._body = {
      version: undefined, //int32 REQUIRED
    };
  }
  // GETTERS
  get id() {
    return this._endpoint;
  }
  get version() {
    return this._body.version;
  }
  // SETTERS

  set id(someId) {
    this._endpoint = "/" + someId + "/cancel";
  }

  set version(ver) {
    if (shazam_is_integer(ver, this._display_name, "version")) {
      this._body.version = ver;
    }
  }

  // MAKER METHODS

  /**
   *  make() method of Invoice_Cancel
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Invoice_Cancel.make
   * @method
   * @public
   * @memberOf Invoice_Cancel
   * @property (id) {string<id>} -
   * @property (ver) {integer} -
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *    //is the same as
   *   myVar.make().gizmo().gremlin()
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

module.exports = Invoice_Cancel;

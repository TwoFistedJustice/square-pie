const Invoice_Request = require("./invoice_request_abstract");

/**
 * {@link https://developer.squareup.com/reference/square/invoices-api |  **-------> Link To Square Docs <-------**}
 * @class Invoice_RUDCnP
 * @extends Square_Request
 * @param {id}  Sets the endpoint to the id your pass in.
 * @abstract
 * @ignore
 * @classdesc
 *
 * super class of Invoice: Retrieve, Update, Delete,  Cancel, Delete
 * */
class Invoice_RUDCnP extends Invoice_Request {
  _display_name = "Invoice_RUDCnP";
  constructor(id) {
    super();
    this._endpoint = `/${id}`;
  }
  get id() {
    return this._endpoint;
  }
  set id(someId) {
    this._endpoint = `/${someId}`;
  }
  make() {
    return {
      self: this,
      id: function (id) {
        this.self.id = id;
        return this;
      },
    };
  }
}

module.exports = Invoice_RUDCnP;

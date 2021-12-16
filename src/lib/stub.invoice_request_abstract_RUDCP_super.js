const Invoice_Request = require("./stub.invoice_request_abstract");

/** @class Invoice_RUDCnP super class of Invoice: Retrieve, Update, Delete,  Cancel, Delete
 * @param {id}  Sets the endpoint to the id your pass in.
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * */
class Invoice_RUDCnP extends Invoice_Request {
  _display_name = "Invoice_RUDCnP";
  constructor(id) {
    super();
    this._endpoint = `/${id}`;
  }
  get display_name() {
    return this._display_name;
  }

  get id() {
    return this._endpoint;
  }

  get endpoint() {
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

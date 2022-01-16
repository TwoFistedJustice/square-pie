const Square_Request = require("./square_request_abstract");

class Invoice_Request extends Square_Request {
  _display_name = "Invoice_Request";
  constructor() {
    super();
    this._api_name = "invoices";
    this._delivery;
  }

  get delivery() {
    return this._delivery;
  }

  set delivery(parcel) {
    this._delivery = parcel.invoice;
  }
}
module.exports = Invoice_Request;

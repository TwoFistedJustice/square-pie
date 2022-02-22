const Square_Request = require("./square_request_abstract");

/**
 * {@link https://developer.squareup.com/reference/square/invoices-api |  **-------> Link To Square Docs <-------**}
 * @class Invoice_Request
 * @abstract
 * @ignore
 * @classdesc
 *
 * super class of all Invoice API request classes
 * */

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
    if (Object.prototype.hasOwnProperty.call(parcel, "invoice")) {
      this._delivery = parcel.invoice;
    } else {
      this._delivery = parcel;
    }
  }
}
module.exports = Invoice_Request;

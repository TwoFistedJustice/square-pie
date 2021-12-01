const Square_Request = require("./square_request");

class Order_Request extends Square_Request {
  _display_name = "Order_Request";
  constructor() {
    super();
    this._apiName = "orders";
    this._delivery;
  }

  get delivery() {
    return this._delivery;
  }

  set delivery(parcel) {
    this._delivery = parcel.order;
  }
}

module.exports = Order_Request;

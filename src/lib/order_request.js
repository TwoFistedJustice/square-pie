const Square_Request = require("./square_request");

class Order_Request extends Square_Request {
  _display_name = "Order_Request";
  _last_verified_square_api_version = "2021-07-21";
  constructor() {
    super();
    this._api_name = "orders";
    this._delivery;
  }
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get delivery() {
    return this._delivery;
  }

  set delivery(parcel) {
    this._delivery = parcel.order;
  }
}

module.exports = Order_Request;

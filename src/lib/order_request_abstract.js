const Square_Request = require("./square_request_abstract");

class Order_Request extends Square_Request {
  _display_name = "Order_Request";
  constructor() {
    super();
    this._api_name = "orders";
    this._delivery;
    this.configuration = {
      maximums: {
        idempotency_key: 192,
      },
    };
  }
  get display_name() {
    return this._display_name;
  }
  get delivery() {
    return this._delivery;
  }

  set delivery(parcel) {
    this._delivery = parcel.order;
  }
}

module.exports = Order_Request;

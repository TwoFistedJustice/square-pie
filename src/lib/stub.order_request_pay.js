const Order_Request = require("./order_request_abstract");
const { nanoid } = require("nanoid");

class Order_Pay extends Order_Request {
  _display_name = "Order_Pay";
  _last_verified_square_api_version = "2021-07-21";
  constructor(props) {
    super(props);
    this._method = "post";
    this._endpoint = "";
    this._body = {
      idempotency_key: nanoid(),
      order_version: undefined,
      payments_ids: [],
    };
  }
  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get body() {
    return this._body;
  }

  // SETTERS

  // TODO --  MAKER METHODS
  // add payment id
  // remove payment id by id
  // add array of payment ids
  // clear payment ids
  //version

  make() {
    return {
      self: this,
    };
  }
}

module.exports = Order_Pay;

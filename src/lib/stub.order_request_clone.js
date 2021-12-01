const Order_Request = require("./order_request");
const { nanoid } = require("nanoid");

class Order_clone extends Order_Request {
  _display_name = "Order_clone";
  _last_verified_square_api_version = "2021-07-21";
  constructor(props) {
    super(props);
    this._method = "post";
    this._endpoint = "clone";
    this._body = {
      idempotency_key: nanoid(),
      order_id: undefined,
      version: undefined, // assume it works same as order_version in Clone
    };
  }
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get body() {
    return this._body;
  }

  // TODO --  MAKER METHODS
  // merge array of fields
  // remove a field to clear by name

  make() {
    return {
      self: this,
    };
  }
}

module.exports = Order_clone;

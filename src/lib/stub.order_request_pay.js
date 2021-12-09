const Order_Request = require("./order_request_abstract");
const { nanoid } = require("nanoid");

class Order_Pay extends Order_Request {
  _display_name = "Order_Pay";
  _last_verified_square_api_version = "2021-07-21";
  constructor(id) {
    super();
    this._method = "post";
    this._endpoint = `/${id}/pay`;
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

  // GETTERS
  get idempotency_key() {
    return this._body.idempotency_key;
  }
  get order_version() {
    return this._body.order_version;
  }
  get payment_ids() {
    return this._body.payment_ids;
  }

  // SETTERS
  set idempotency_key(val) {
    this._body.idempotency_key = val;
  }
  set order_version(val) {
    this._body.order_version = val;
  }
  set payment_ids(val) {
    this._body.payment_id = val;
  }

  // MAKER METHODS

  make() {
    return {
      self: this,
      idempotency_key: function (val) {
        this.self.idempotency_key = val;
        return this;
      },
      order_version: function (val) {
        this.self.order_version = val;
        return this;
      },
      payment_ids: function (val) {
        this.self.payment_ids = val;
        return this;
      },
    };
  }
}

module.exports = Order_Pay;

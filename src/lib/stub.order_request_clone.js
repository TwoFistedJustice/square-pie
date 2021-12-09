const Order_Request = require("./order_request_abstract");
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
  get idempotency_key() {
    return this._body.idempotency_key;
  }
  get order_id() {
    return this._body.order_id;
  }
  get version() {
    return this._body.version;
  }

  set idempotency_key(key) {
    this._body.idempotency_key = key;
  }
  set order_id(id) {
    this._body.order_id = id;
  }
  set version(ver) {
    this._body.version = ver;
  }

  // TODO --  MAKER METHODS
  // merge array of fields
  // remove a field to clear by name

  make() {
    return {
      self: this,
      idempotency_key: function (key) {
        this.self.idempotency_key = key;
        return this;
      },
      order_id: function (id) {
        this.self.order_id = id;
        return this;
      },
      version: function (ver) {
        this.self.version = ver;
        return this;
      },
      id: function (id) {
        return this.order_id(id);
      },
    };
  }
}

module.exports = Order_clone;

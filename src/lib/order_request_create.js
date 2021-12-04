const Order_Request = require("./order_request_abstract");
const { nanoid } = require("nanoid");

class Order_Create extends Order_Request {
  _display_name = "Order_Create";
  _last_verified_square_api_version = "2021-07-21";
  constructor(props) {
    super(props);
    this._method = "post";
    this._endpoint = "";

    this._body = {
      idempotency_key: nanoid(),
      order: undefined,
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

  set body(fardel) {
    this._body.order = fardel;
  }

  make() {
    return {
      self: this,
      body: function (fardel) {
        this.body = fardel;
        return this;
      },
    };
  }
}

module.exports = Order_Create;

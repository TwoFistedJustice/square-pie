const Order_Request = require("./order_request");
const { nanoid } = require("nanoid");

class Order_Create extends Order_Request {
  constructor(props) {
    super(props);
    this._method = "post";
    this._endpoint = "";

    this._body = {
      idempotency_key: nanoid(),
      order: undefined,
    };
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
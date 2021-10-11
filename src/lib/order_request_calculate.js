const Order_Request = require("./order_request");

class Order_Calculate extends Order_Request {
  constructor(props) {
    super(props);
    this._method = "post";
    this._endpoint = "calculate";

    this._body = {
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
    const methods = () => {
      let properties = {
        self: this,
        body: function (fardel) {
          this.body = fardel;
          return this;
        },
      };
      return properties;
    };
    return methods();
  }
}

module.exports = Order_Calculate;

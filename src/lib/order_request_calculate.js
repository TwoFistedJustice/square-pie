const Order_Request = require("./order_request_abstract");
const { shazam_max_length } = require("./utilities");
const { nanoid } = require("nanoid");

/** @class Order_Calculate representing an http request to calculate an order
 * @param {object} order  orderObject.fardel -You can also do this later by calling the order setter. You must add this before calling .request()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/orders-api/calculate-order | Square Docs}
 * */
class Order_Calculate extends Order_Request {
  _display_name = "Order_Calculate";
  _last_verified_square_api_version = "2021-11-17";
  constructor(order) {
    super();
    this._method = "post";
    this._endpoint = "calculate";

    this._body = {
      idempotency_key: nanoid(),
      order: order,
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
  get order() {
    return this._body.order;
  }
  get endpoint() {
    return this._endpoint;
  }
  set order(fardel) {
    this._body.order = fardel;
  }

  set idempotency_key(key) {
    if (
      shazam_max_length(
        this.configuration.maximums.idempotency_key,
        key,
        this.display_name,
        "idempotency_key"
      )
    ) {
      this._body.idempotency_key = key;
    }
  }

  make() {
    return {
      self: this,
      idempotency_key: function (key) {
        this.self.idempotency_key = key;
        return this;
      },
      order: function (fardel) {
        this.self.order = fardel;
        return this;
      },
    };
  }
}

module.exports = Order_Calculate;

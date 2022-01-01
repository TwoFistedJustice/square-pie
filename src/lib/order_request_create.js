const Order_Request = require("./order_request_abstract");
const { nanoid } = require("nanoid");
const { shazam_max_length } = require("./utilities");
const man =
  "Upserts a new Order Object. Use the Order_Object class to create the object. Then add it to this class\n" +
  "by calling make().order(fardel)\n" +
  "\nhttps://developer.squareup.com/reference/square/orders-api/create-order";

/** @class  Order_Create representing an http request to create a new order
 * @param {object} order  orderObject.fardel -You can also do this later by calling the order setter. You must add this before calling .request()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/orders-api/create-order | Square Docs}
 * */

class Order_Create extends Order_Request {
  _display_name = "Order_Create";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor(order) {
    super();
    this._method = "post";
    this._endpoint = "";

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
  get help() {
    return this._help;
  }
  get endpoint() {
    return this._endpoint;
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
  set order(fardel) {
    this._body.order = fardel;
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

module.exports = Order_Create;

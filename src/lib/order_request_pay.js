const Order_Request = require("./order_request_abstract");
const { nanoid } = require("nanoid");
const { shazam_max_length } = require("./utilities/aaa_index");
/** @class Order_Pay representing a payment on an existing order.
 * @param {string} id - the id of the order you want to pay. You can also add this later. You must do this before calling .request()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * */
class Order_Pay extends Order_Request {
  _display_name = "Order_Pay";
  _last_verified_square_api_version = "2021-11-17";
  constructor(id) {
    super();
    this._order_id = id;
    this._method = "post";
    this._endpoint = `/${id}/pay`;
    this._body = {
      idempotency_key: nanoid(),
      order_version: undefined,
      payment_ids: [],
    };
  }
  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get order_id() {
    return this._order_id;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
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
  get order_version() {
    return this._body.order_version;
  }
  get payment_ids() {
    return this._body.payment_ids;
  }

  // SETTERS
  set order_id(id) {
    this._order_id = id;
    this._endpoint = `/${id}/pay`;
  }
  set order_version(val) {
    this._body.order_version = val;
  }
  set payment_ids(id) {
    this._body.payment_ids.push(id);
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

  // MAKER METHODS
  /*@method make*/
  make() {
    return {
      self: this,
      idempotency_key: function (key) {
        this.self.idempotency_key = key;
        return this;
      },
      order_version: function (ver) {
        this.self.order_version = ver;
        return this;
      },
      payment_ids: function (id) {
        this.self.payment_ids = id;
        return this;
      },
      order_id: function (id) {
        this.self.order_id = id;
        return this;
      },
    };
  }
}

module.exports = Order_Pay;

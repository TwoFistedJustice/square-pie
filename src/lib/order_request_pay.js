const Order_Request = require("./order_request_abstract");
const { nanoid } = require("nanoid");
const { shazam_max_length, shazam_is_array } = require("./utilities");
const man =
  "pay for an order. Add the order_id when you instantiate the class.\n" +
  'myVar = new Order_Pay("order_id"). You can also do this later by calling make().order("order_id")\n' +
  "You can concatenate an array of payment_ids by calling make().concat_payments(array). Note: square does" +
  "not specify an upper limit to the number of payments you can collect.\n" +
  "\nhttps://developer.squareup.com/reference/square/orders-api/pay-order";

/** @class Order_Pay representing a payment on an existing order.
 * @param {string} id - the id of the order you want to pay. You can also add this later. You must do this before calling .request()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/orders-api/pay-order | Square Docs}
 * */
class Order_Pay extends Order_Request {
  _display_name = "Order_Pay";
  _last_verified_square_api_version = "2021-11-17";
  _help = this.display_name + ": " + man;

  constructor(id) {
    super();
    this._order_id = id;
    this._method = "POST";
    this._endpoint = `/${id}/pay`;
    this._body = {
      idempotency_key: nanoid(),
      order_version: undefined,
      payment_ids: [],
    };
  }
  // GETTERS
  get order_id() {
    return this._order_id;
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

  set payment_array_concat(arr) {
    let caller = "payment_array_concat";
    let name = this._display_name;
    // check that arr is an array [NI - no limit specified] and that the existing array does not exceed allowable length
    if (shazam_is_array(arr, name, caller)) {
      let joined_array = this._body.payment_ids.concat(arr);
      // If we ever find a limit, check it here. See Order_Search for example.
      this._body.payment_ids = joined_array;
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
      order: function (id) {
        return this.order_id(id);
      },
      pay: function (id) {
        return this.payment_ids(id);
      },
      concat_payments: function (arr) {
        this.self.payment_array_concat = arr;
        return this;
      },
    };
  }
}

module.exports = Order_Pay;

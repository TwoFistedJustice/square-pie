const Order_Request = require("./order_request_abstract");
const { nanoid } = require("nanoid");
const { shazam_max_length, arrayify } = require("./utilities/aaa_index");
/** @class Order_Update representing a desired update to an existing order.
 * @param {string} id - the id of the order you want to update. You can also add this later. You must do this before calling .request()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * */
class Order_Update extends Order_Request {
  _display_name = "Order_Update";
  _last_verified_square_api_version = "2021-11-17";

  constructor(id = "") {
    super(id);
    this._method = "put";
    this._endpoint = `/${id}`;
    this._body = {
      idempotency_key: nanoid(),
      fields_to_clear: undefined,
      order: undefined,
    };
    this.configuration = {
      maximums: {
        idempotency_key: 192,
      },
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
  get endpoint() {
    if (this._endpoint === undefined) {
      throw new Error(
        "Order_Update does not have an entry for the order_id. Please add an id by calling yourVar.order_id(id)"
      );
    }
    return this._endpoint;
  }
  /**  For more information, see https://developer.squareup.com/reference/square_2021-11-17/orders-api/update-order
   * @param {string} field - The dot notation paths fields to clear. For example, "line_items[uid].note". OR "discounts"
   * */
  set fields_to_clear(field) {
    if (
      arrayify(
        this._body,
        "fields_to_clear",
        this.display_name(),
        "fields_to_clear"
      )
    ) {
      this._body.fields_to_clear.push(field);
    }
  }
  set order_id(id) {
    this._endpoint = `/${id}`;
  }
  /**
   * @param {object} sparse_order_object - an order object containing only the fields you want to update.
   * */
  set order(sparse_order_object) {
    this._body.order = sparse_order_object;
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
      order_id: function (id) {
        this.order_id = id;
        return this;
      },
      fields_to_clear: function (field) {
        this.fields_to_clear = field;
        return this;
      },
      idempotency_key: function (key) {
        this.idempotency_key = key;
        return this;
      },
    };
  }
}

module.exports = Order_Update;

const Order_Request = require("./order_request_abstract");
const { nanoid } = require("nanoid");
const { arrayify, shazam_max_length } = require("./utilities");
const man =
  "send a sparse order object with only the fields you want to update. Pass the id of the order you want to update\n" +
  "as an argument when you instantiate the class. You can add the id anytime prior to sending the update by calling\n" +
  'make().order_id("id")\n' +
  "Build your sparse order object using the Order_Object class. Add it to update by passing the fardel to make().order(fardel)." +
  'If you want to clear fields in your order, then pass the field names as strings to make().fields_to_clear("some_property_name")\n' +
  "\n\nhttps://developer.squareup.com/reference/square/orders-api/update-order";

/** @class Order_Update representing a desired update to an existing order.
 * @param {string} id - the id of the order you want to update. You can also add this later. You must do this before calling .request()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/orders-api/update-order | Square Docs}
 * */
class Order_Update extends Order_Request {
  _display_name = "Order_Update";
  _last_verified_square_api_version = "2021-11-17";
  _help = this.display_name + ": " + man;

  constructor(id = "") {
    super();
    this._method = "put";
    this._endpoint = `/${id}`;
    this._body = {
      idempotency_key: nanoid(),
      fields_to_clear: undefined,
      order: undefined,
    };
  }
  // GETTERS

  get endpoint() {
    if (this._endpoint === "/") {
      throw new Error(
        "Order_Update does not have an entry for the order_id. Please add an id by calling yourVar.order_id(id)"
      );
    }
    return this._endpoint;
  }
  get fields_to_clear() {
    return this._body.fields_to_clear;
  }
  get order() {
    return this._body.order;
  }

  // SETTERS
  /**  For more information, see https://developer.squareup.com/reference/square_2021-11-17/orders-api/update-order
   * @param {string} field - The dot notation paths fields to clear. For example, "line_items[uid].note". OR "discounts"
   * */
  set fields_to_clear(field) {
    arrayify(this._body, "fields_to_clear", this.display_name);
    this._body.fields_to_clear.push(field);
  }
  set order_id(id) {
    this._endpoint = `/${id}`;
  }
  /**
   * @param {object} sparse_order - an order object containing only the fields you want to update.
   * */
  set order(sparse_order) {
    this._body.order = sparse_order;
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
  make() {
    return {
      self: this,
      order_id: function (id) {
        this.self.order_id = id;
        return this;
      },
      order: function (sparse_order) {
        this.self.order = sparse_order;
        return this;
      },
      fields_to_clear: function (field) {
        this.self.fields_to_clear = field;
        return this;
      },
      idempotency_key: function (key) {
        this.self.idempotency_key = key;
        return this;
      },
    };
  }
}

module.exports = Order_Update;

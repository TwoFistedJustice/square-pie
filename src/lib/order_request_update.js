const Order_Request = require("./order_request_abstract");
const { nanoid } = require("nanoid");
const { arrayify, shazam_max_length } = require("./utilities");
const man =
  "send a sparse order object with only the fields you want to update. Pass the id of the order you want to update\n" +
  "as an argument when you instantiate the class. You can add the id anytime prior to sending the update by calling\n" +
  'make().order_id("id")\n' +
  "Build your sparse order object using the Order_Object class. Add it to update by passing the fardel to make().order(fardel).\n" +
  'If you want to clear fields in your order, then pass the field names as strings to make().fields_to_clear("some_property_name")\n' +
  "https://developer.squareup.com/reference/square/orders-api/update-order";

/**
 * {@link https://developer.squareup.com/reference/square/orders-api/update-order |  **-------> Link To Square Docs <-------**}
 * @class Order_Update
 * @extends Square_Request
 * @param {string} id - the id of the order you want to update. You can also add this later. You must do this before calling .request()
 * @classdesc
 *
 * Update an order.<br><br>
 * Send a sparse order object with only the fields you want to update. Pass the id of the order you want to update
 * as an argument when you instantiate the class. You can add the id anytime prior to sending the update by calling make().order_id(id)'<br><br>
 * Build your sparse order object using the Order_Object class. Add it to update by passing the fardel to make().order(fardel).<br><br>
 * If you want to clear fields in your order, then pass the field names as strings to make().fields_to_clear(some_property_name)'
 * */
class Order_Update extends Order_Request {
  _display_name = "Order_Update";
  _last_verified_square_api_version = "2021-11-17";
  _help = this.display_name + ": " + man;

  constructor(id = "") {
    super();
    this._method = "PUT";
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

  get idempotency_key() {
    return this._body.idempotency_key;
  }

  get fields_to_clear() {
    return this._body.fields_to_clear;
  }
  get order() {
    return this._body.order;
  }

  // SETTERS
  set fields_to_clear(field) {
    arrayify(this._body, "fields_to_clear", this.display_name);
    this._body.fields_to_clear.push(field);
  }
  set order_id(id) {
    this._endpoint = `/${id}`;
  }
  set order(sparse_order) {
    this._body.order = sparse_order;
  }
  set idempotency_key(key) {
    if (
      shazam_max_length(
        key,
        this.configuration.maximums.idempotency_key,
        this.display_name,
        "idempotency_key"
      )
    ) {
      this._body.idempotency_key = key;
    }
  }
  // MAKE METHODS

  /**
   * {@link https://developer.squareup.com/reference/square/orders-api/update-order | Square Docs}<br>
   *  make() method of Order_Update
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Order_Update.make
   * @method
   * @public
   * @memberOf Order_Update
   * @property idempotency_key(key) {string} - use only if you want to use your own key in place of the automatically generated one.
   * @property order_id(id) {string<id>} -
   * @property order(sparse_order) {object}
   * @property fields_to_clear(field) {string} -
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *    //is the same as
   *   myVar.make().gizmo().gremlin()
   * */

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
      order: function (sparse_order) {
        this.self.order = sparse_order;
        return this;
      },
      fields_to_clear: function (field) {
        this.self.fields_to_clear = field;
        return this;
      },
    };
  }
}

module.exports = Order_Update;

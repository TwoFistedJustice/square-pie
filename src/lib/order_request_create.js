const Order_Request = require("./order_request_abstract");
const { nanoid } = require("nanoid");
const { shazam_max_length } = require("./utilities");
const man =
  "Upserts a new Order Object. Use the Order_Object class to create the object. Then add it to this class\n" +
  "by calling make().order(fardel)\n" +
  "https://developer.squareup.com/reference/square/orders-api/create-order";

/**
 * {@link https://developer.squareup.com/reference/square/orders-api/create-order |  **-------> Link To Square Docs <-------**}
 * @class Order_Create
 * @extends Square_Request
 * @param {object} order  orderObject.fardel -You can also do this later by calling the order setter. You must add this before calling .request()
 * @classdesc
 *
 * Upserts a new Order Object.<br>
 * Use the Order_Object class to create the object. Then add it to this class by calling `make().order(fardel)`
 * */
class Order_Create extends Order_Request {
  _display_name = "Order_Create";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor(order) {
    super();
    this._method = "POST";
    this._body = {
      idempotency_key: nanoid(),
      order: order,
    };
  }
  // GETTERS
  get idempotency_key() {
    return this._body.idempotency_key;
  }
  get order() {
    return this._body.order;
  }
  // SETTERS
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
  set order(fardel) {
    this._body.order = fardel;
  }

  /**
   *  make() method of Order_Create
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Order_Create.make
   * @method
   * @public
   * @memberOf Order_Create
   * @property idempotency_key(key) {string} - use only if you want to use your own key in place of the automatically generated one.
   * @property order(fardel) {Fardel}
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
      order: function (fardel) {
        this.self.order = fardel;
        return this;
      },
    };
  }
}

module.exports = Order_Create;

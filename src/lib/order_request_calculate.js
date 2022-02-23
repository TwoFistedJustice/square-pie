const Order_Request = require("./order_request_abstract");
const { shazam_max_length } = require("./utilities");
const { nanoid } = require("nanoid");
const man =
  "lets you preview order pricing without creating an order. Send up the whole order object, not just the id.\n" +
  "You can create a new order using the Order_Object class. Or you can send an existing order document to get the preview.\n" +
  "Add the order by calling make().order(order_object). The Computer is Your Friend." +
  "https://developer.squareup.com/reference/square/orders-api/calculate-order\n";

/**
 * {@link https://developer.squareup.com/reference/square/orders-api/calculate-order |  **-------> Link To Square Docs <-------**}
 * @class Order_Calculate
 * @extends Square_Request
 * @param {object} order  orderObject.fardel -You can also do this later by calling the order setter. You must add this before calling .request()
 * @classdesc
 *
 * Lets you preview order pricing without creating an order. Send up the whole order object, not just the id.<br><br>
 * You can create a new order using the Order_Object class. Or you can send an existing order document to get the preview.<br><br>
 * Add the order by calling `make().order(order_object)`. The Computer is Your Friend.
 * */

class Order_Calculate extends Order_Request {
  _display_name = "Order_Calculate";
  _last_verified_square_api_version = "2021-11-17";
  _help = this.display_name + ": " + man;

  constructor(order) {
    super();
    this._method = "POST";
    this._endpoint = "calculate";

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
  get endpoint() {
    return this._endpoint;
  }
  // SETTERS
  set order(fardel) {
    this._body.order = fardel;
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

  /**
   *  make() method of Order_Calculate
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Order_Calculate.make
   * @method
   * @public
   * @memberOf Order_Calculate
   * @property idempotency_key(key) {string} - use only if you want to use your own key in place of the automatically generated one.
   * @property order(fardel) {fardel} - an Order_Object fardel property
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

module.exports = Order_Calculate;

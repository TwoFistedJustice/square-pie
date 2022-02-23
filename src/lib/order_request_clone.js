const Order_Request = require("./order_request_abstract");
const { nanoid } = require("nanoid");
const { shazam_max_length } = require("./utilities");
const man =
  "creates a new order document in a DRAFT state by copying core fields from an existing order.\n" +
  'Add the order_id of the one you want to clone by calling make().order("order_id")\n' +
  "https://developer.squareup.com/reference/square/orders-api/clone-order";

/**
 * {@link https://developer.squareup.com/reference/square/orders-api/clone-order |  **-------> Link To Square Docs <-------**}
 * @class Order_Clone
 * @extends Square_Request
 * @param {string} id - the id of the order you want to clone. You can also add this later. You must do this before calling .request()
 * @classdesc
 *
 * Creates a new order document in a DRAFT state by copying core fields from an existing order.
 * Add the order_id of the one you want to clone by calling `make().order("order_id")`
 * */

class Order_Clone extends Order_Request {
  _display_name = "Order_Clone";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;

  constructor(id) {
    super(id);
    this._method = "POST";
    this._endpoint = "clone";
    this._body = {
      idempotency_key: nanoid(),
      order_id: id,
      version: undefined, // int32
    };
  }
  get idempotency_key() {
    return this._body.idempotency_key;
  }
  get order_id() {
    return this._body.order_id;
  }
  get version() {
    return this._body.version;
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
  set order_id(id) {
    this._body.order_id = id;
  }
  set version(ver) {
    this._body.version = ver;
  }

  // MAKE METHODS
  /**
   *  make() method of Order_Clone
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Order_Clone.make
   * @method
   * @public
   * @memberOf Order_Clone
   * @property idempotency_key(key) {string} - use only if you want to use your own key in place of the automatically generated one.
   * @property order_id(id) {string} -
   * @property version(ver) {integer} -
   * @property order(id) {string}  - alias of `order_id`
   * @property id(id) {string}  - alias of `order_id`
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
      version: function (ver) {
        this.self.version = ver;
        return this;
      },
      order: function (id) {
        return this.order_id(id);
      },
      id: function (id) {
        return this.order_id(id);
      },
    };
  }
}

module.exports = Order_Clone;

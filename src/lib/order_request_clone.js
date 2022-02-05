const Order_Request = require("./order_request_abstract");
const { nanoid } = require("nanoid");
const { shazam_max_length } = require("./utilities");
const man =
  "creates a new order document in a DRAFT state by copying core fields from an existing order.\n" +
  'Add the order_id of the one you want to clone by calling make().order("order_id")' +
  "\nhttps://developer.squareup.com/reference/square/orders-api/clone-order";
/** @class Order_clone representing a call to clone an existing order.
 * @param {string} id - the id of the order you want to clone. You can also add this later. You must do this before calling .request()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/orders-api/clone-order | Square Docs}
 * */

class Order_clone extends Order_Request {
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
  /** @function make()  method of Order_clone - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method idempotency_key - set automatically
   * @param {string} key -
   * @method order_id
   * @param {string} id -
   * @method version
   * @param {number} ver -
   * @method order - alias of order_id
   * @method id - alias of order_id
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *
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

module.exports = Order_clone;

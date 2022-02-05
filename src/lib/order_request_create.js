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
  /** @function make()  method of Order_Create - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method idempotency_key - set automatically
   * @param {string} key -
   * @method order
   *  @param {object} fardel - an Order_Object fardel property
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
      order: function (fardel) {
        this.self.order = fardel;
        return this;
      },
    };
  }
}

module.exports = Order_Create;

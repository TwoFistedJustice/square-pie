const Square_Request = require("./square_request_abstract");

/** @class Order_Request super class of all Order Request classes
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * */

class Order_Request extends Square_Request {
  _display_name = "Order_Request";
  constructor() {
    super();
    this._api_name = "orders";
    this._delivery;
    this.configuration = {
      maximums: {
        idempotency_key: 192,
      },
    };
  }
  get delivery() {
    return this._delivery;
  }
  set delivery(parcel) {
    this._delivery = parcel.order;
  }
}

module.exports = Order_Request;

const Order_Request = require("./order_request");
const { nanoid } = require("nanoid");

// todo simplify MAKERS
//todo swap in nanoid

class Order_Pay extends Order_Request {
  constructor(props) {
    super(props);
    this._method = "post";
    this._endpoint = "";
    this._body = {
      idempotency_key: nanoid(),
      order_version: undefined,
      payments_ids: [],
    };
  }
  // GETTERS
  get body() {
    return this._body;
  }

  // SETTERS

  // TODO --  HANDY DANDY METHODS
  // add payment id
  // remove payment id by id
  // add array of payment ids
  // clear payment ids
  //version

  make() {
    const methods = () => {
      let properties = {
        self: this,
      };
      return properties;
    };
    return methods();
  }
}

module.exports = Order_Pay;

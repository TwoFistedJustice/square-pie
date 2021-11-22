const Order_Request = require("./order_request");
const { nanoid } = require("nanoid");

// todo simplify MAKERS
//todo swap in nanoid

class Order_clone extends Order_Request {
  constructor(props) {
    super(props);
    this._method = "post";
    this._endpoint = "clone";
    this._body = {
      idempotency_key: nanoid(),
      order_id: undefined,
      version: undefined, // assume it works same as order_version in Clone
    };
  }

  get body() {
    return this._body;
  }

  // TODO --  HANDY DANDY METHODS
  // merge array of fields
  // remove a field to clear by name

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

module.exports = Order_clone;

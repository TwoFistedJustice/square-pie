const Order_Request = require("./order_request");
const { nanoid } = require("nanoid");

class Order_Update extends Order_Request {
  constructor(props) {
    super(props);
    this._method = "put";
    this._endpoint = "";
    this._body = {
      idempotency_key: nanoid(),
      fields_to_clear: undefined,
      order: undefined,
    };
  }

  get body() {
    return this._body;
  }

  set fields_to_clear(val) {
    // todo - make sure is array before adding val
  }

  // add a field to clear
  // order - requires a 'sparse' order - just the fields to update
  // may be able to just take a regular order object

  make() {
    return {
      self: this,
    };
  }
}

module.exports = Order_Update;

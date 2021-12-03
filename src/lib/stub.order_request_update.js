const Order_Request = require("./order_request");
const { nanoid } = require("nanoid");

class Order_Update extends Order_Request {
  _display_name = "Order_Update";
  _last_verified_square_api_version = "";
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
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
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

const Order_Request = require("./order_request");
const { v4: uuidv4 } = require("uuid");

class Order_Update extends Order_Request {
  constructor(props) {
    super(props);
    this._method = "put";
    this._endpoint = "";
    this._body = {
      idempotency_key: uuidv4(),
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

  // TODO --  HANDY DANDY METHODS
  //
  // add a field to clear
  // order - requires a 'sparse' order - just the fields to update
  // may be able to just take a regular order object

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

module.exports = Order_Update;

const Order_Request = require("./order_request");

class Order_Search extends Order_Request {
  constructor(props) {
    super(props);
    this._method = "post";
    this._endpoint = "search";
    this._body = {};
  }

  get body() {
    return this._body;
  }

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

module.exports = Order_Search;
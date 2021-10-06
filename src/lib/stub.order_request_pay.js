const Order_Request = require("./order_request");

class someClass extends Order_Request {
  constructor(props) {
    super(props);
    this._method = "";
    this._endpoint = "";
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

module.exports = someClass;

const Square_Request = require("./square_request");

class Order_Request extends Square_Request {
  constructor() {
    super();
    this._apiName = "orders";
  }
}

module.exports = Order_Request;

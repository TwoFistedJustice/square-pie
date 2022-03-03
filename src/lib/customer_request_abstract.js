const Square_Request = require("./square_request_abstract");

/**
 * @ignore
 * @class Customer_Request
 * @extends Square_Request
 * @classdesc
 * Super class of Customer API Request classes
 * */

class Customer_Request extends Square_Request {
  _display_name = "Customer_Request";
  constructor() {
    super();
    this._api_name = "customers";
  }
}

module.exports = Customer_Request;

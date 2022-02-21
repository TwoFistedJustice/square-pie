const Square_Request = require("./square_request_abstract");

/** @class Customer_Request super class of Customer API Request classes
 *  */
class Customer_Request extends Square_Request {
  _display_name = "Customer_Request";
  constructor() {
    super();
    this._api_name = "customers";
  }
}

module.exports = Customer_Request;

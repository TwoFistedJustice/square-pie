const Square_Request = require("./square_request");

/** @class Customer_Request super class of Customer API Request classes
 *  @author Russ Bain
 *  */
class Customer_Request extends Square_Request {
  _display_name = "Customer_Request";
  constructor() {
    super();
    this._apiName = "customers";
  }
  get display_name() {
    return this._display_name;
  }
}

module.exports = Customer_Request;

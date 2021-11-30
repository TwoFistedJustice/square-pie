const Square_Request = require("./square_request");

/** @class Customer_Request super class of Customer API Request classes
 *  @author Russ Bain
 *  */
class Customer_Request extends Square_Request {
  constructor() {
    super();
    this._apiName = "customers";
  }
}

module.exports = Customer_Request;

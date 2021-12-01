const Square_Request = require("./square_request");

/** @class Customer_Request super class of Customer API Request classes
 *  @author Russ Bain
 *  */
class Customer_Request extends Square_Request {
  _display_name = "Customer_Request";
  _last_verified_square_api_version = "2021-07-21";
  constructor() {
    super();
    this._apiName = "customers";
  }
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
}

module.exports = Customer_Request;

const Square_Request = require("./square_request");
const validator = require("validator");

/** @class Customer_Request super class of Customer API Request classes
 *  @author Russ Bain
 *  */
class Customer_Request extends Square_Request {
  constructor() {
    super();
    this._apiName = "customers";
  }
  // METHODS
  // todo REFACTOR -extract into utility
  //  have the yahoo thing pull from pie_defaults
  normalizeEmail(email) {
    let normalizeOptions = {
      yahoo_remove_subaddress: false,
    };
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid. Please use a valid email address.");
    }
    return validator.normalizeEmail(email, normalizeOptions);
  }
}

module.exports = Customer_Request;

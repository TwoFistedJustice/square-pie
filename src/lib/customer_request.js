const Square_Request = require("./square_request");
const validator = require("validator");

class Customer_Request extends Square_Request {
  constructor() {
    super();
    // todo refactor - this is not mutable - remove the underscore
    this._apiName = "customers";
  }
  // METHODS
  // todo REFACTOR -move this into new Customer Objects
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

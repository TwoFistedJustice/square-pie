const Retrieve_Update_Delete = require("./customer_request_R_U_D");

/** @class Customer_Retrieve representing an http request to retrieve a customer records
 *  @see Retrieve_Update_Delete
 *  @author Russ Bain
 *  */
class Customer_Retrieve extends Retrieve_Update_Delete {
  _display_name = "Customer_Retrieve";
  _last_verified_square_api_version = "2021-07-21";
  constructor(id) {
    super(id);
    this._method = "get";
    this._delivery;
  }
  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
}

module.exports = Customer_Retrieve;

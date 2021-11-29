const Retrieve_Update_Delete = require("./customer_request_R_U_D");

/** @class Customer_Retrieve representing an http request to retrieve a customer records
 *  @see Retrieve_Update_Delete
 *  @author Russ Bain
 *  */
class Customer_Retrieve extends Retrieve_Update_Delete {
  _displayName = "Customer_Retrieve";
  constructor(id) {
    super(id);
    this._method = "get";
    this._delivery;
  }
  // GETTERS
  get displayName() {
    return this._displayName;
  }
}

module.exports = Customer_Retrieve;

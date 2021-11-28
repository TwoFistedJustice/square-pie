const Retrieve_Update_Delete = require("./customer_request_R_U_D");

/** @class Customer_Retrieve representing an http request to retrieve a customer records
 *  @see Retrieve_Update_Delete
 *  @author Russ Bain
 *  */
class Customer_Retrieve extends Retrieve_Update_Delete {
  constructor(id) {
    super(id);
    this._method = "get";
    this._delivery;
  }
}

module.exports = Customer_Retrieve;

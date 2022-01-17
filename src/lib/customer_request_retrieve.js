const Retrieve_Update_Delete = require("./customer_request_abstract_R_U_D_super");
const man =
  "fetches one customer record.\n" +
  "Add the Square id of the customer record to delete as an argument when you create the class. This is required. \n" +
  "There is no make() method for this class." +
  "https://developer.squareup.com/reference/square/customers-api/retrieve-customer\n";

/** @class Customer_Retrieve representing an http request to retrieve a customer records
 *  @see Retrieve_Update_Delete
 *  @author Russ Bain
 *  */
class Customer_Retrieve extends Retrieve_Update_Delete {
  _display_name = "Customer_Retrieve";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor(id) {
    super(id);
    this._method = "GET";
    this._delivery;
  }
}

module.exports = Customer_Retrieve;

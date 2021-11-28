const Customer_Request = require("./customer_request");

/** @class Customer_List representing an http request to retrieve a list of customer records
 *  @see Customer_Request
 *  @author Russ Bain
 *  */
class Customer_List extends Customer_Request {
  constructor() {
    super();
    this._method = "get";
    this._delivery;
  }
  //GETTERS
  get delivery() {
    return this._delivery;
  }

  // SETTERS
  set delivery(parcel) {
    this._delivery = parcel.customers;
  }
}

module.exports = Customer_List;

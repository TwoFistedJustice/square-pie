const Customer_Request = require("./customer_request");

class Customer_List extends Customer_Request {
  constructor() {
    super();
    this._method = "get";
    this._delivery;
  }
  // g/s override super
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

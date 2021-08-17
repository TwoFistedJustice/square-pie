const Customer_Request = require("./customer_request");

class Customer_List extends Customer_Request {
  constructor() {
    super();
    this._method = "get";
  }
  // g/s override super
  //GETTERS
  get fardel() {
    return this._fardel;
  }

  // SETTERS
  set fardel(parcel) {
    this._fardel = parcel.customers;
  }
}

module.exports = Customer_List;

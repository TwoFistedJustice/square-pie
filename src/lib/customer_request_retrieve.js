const Retrieve_Update_Delete = require("./customer_request_R_U_D");

class Customer_Retrieve extends Retrieve_Update_Delete {
  constructor(id) {
    super(id);
    this._method = "get";
    this._delivery;
  }

  get delivery() {
    return this._delivery;
  }

  set delivery(parcel) {
    this._delivery = parcel.orders;
  }
}

module.exports = Customer_Retrieve;

const Retrieve_Update_Delete = require("./customer_request_R_U_D");

class Customer_Delete extends Retrieve_Update_Delete {
  constructor(id) {
    super(id);
    this._method = "delete";
    this._delivery;
  }
  // GETTERS
  get delivery() {
    return this._delivery;
  }

  // SETTERS
  set delivery(parcel) {
    this._delivery = parcel;
  }
}

module.exports = Customer_Delete;

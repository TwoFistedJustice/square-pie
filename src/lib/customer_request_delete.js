const Retrieve_Update_Delete = require("./customer_request_R_U_D");

class Customer_Delete extends Retrieve_Update_Delete {
  constructor(id) {
    super(id);
    this._method = "delete";
  }
  // GETTERS
  get delivery() {
    return this._fardel;
  }

  // SETTERS
  set delivery(parcel) {
    this._fardel = parcel;
  }
}

module.exports = Customer_Delete;

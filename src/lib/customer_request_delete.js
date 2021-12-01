const Retrieve_Update_Delete = require("./customer_request_R_U_D");

/** @class Customer_Delete representing an http request to delete one or more customer records
 *  @see Retrieve_Update_Delete
 *  @author Russ Bain
 *  */
class Customer_Delete extends Retrieve_Update_Delete {
  _display_name = "Customer_Delete";
  constructor(id) {
    super(id);
    this._method = "delete";
    this._delivery;
  }
  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get delivery() {
    return this._delivery;
  }

  // SETTERS
  set delivery(parcel) {
    this._delivery = parcel;
  }
}

module.exports = Customer_Delete;

const Retrieve_Update_Delete = require("./customer_request_abstract_R_U_D_super");
const man =
  "deletes one customer record. There is no option to delete multiple customer records.\n" +
  "Add the Square id of the customer record to delete as an argument when you create the class. This is required. \n" +
  "To enforce optimistic concurrency you may also add the version number of the Square customer record. To get this\n" +
  "you will have to fetch it from Square beforehand. Add it using make().version(version)" +
  "\nhttps://developer.squareup.com/reference/square/customers-api/delete-customer";

/** @class Customer_Delete representing an http request to delete one or more customer records
 *  @see Retrieve_Update_Delete
 *  @author Russ Bain
 *  */
class Customer_Delete extends Retrieve_Update_Delete {
  _display_name = "Customer_Delete";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;

  constructor(id) {
    super(id);
    this._method = "delete";
    this._delivery;
  }
  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get help() {
    return this._help;
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

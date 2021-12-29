const Customer_Request = require("./customer_request_abstract");
const man =
  "fetches a list of customers\n" +
  "You can add a sort field and sort order using make()." +
  "\nhttps://developer.squareup.com/reference/square/customers-api/list-customers";

/** @class Customer_List representing an http request to retrieve a list of customer records
 *  @see Customer_Request
 *  @author Russ Bain
 *  */
class Customer_List extends Customer_Request {
  _display_name = "Customer_List";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;

  constructor() {
    super();
    this._method = "get";
    this._delivery;
  }
  //GETTERS
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
    this._delivery = parcel.customers;
  }
}

module.exports = Customer_List;

const Customer_Request = require("./customer_request_abstract");
const { nanoid } = require("nanoid/non-secure");
const { normalize_email } = require("./utilities/aaa_index");

/** @class Customer_Create representing an http request to create a customer record
 * You can pass a customer object in either via the customer setter or via the constructor
 *
 *  @param {customer object} pass a compliant customer object when you instantiate
 *  @see Customer_Request
 *  @author Russ Bain
 *  */
class Customer_Create extends Customer_Request {
  _display_name = "Customer_Create";
  _last_verified_square_api_version = "2021-07-21";
  constructor(customer) {
    super();
    this._method = "post";
    this.idempotency_key = nanoid();
    this.customer = customer;
    this._delivery;
  }
  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get getIdempotency_key() {
    return this.idempotency_key;
  }
  get delivery() {
    return this._delivery;
  }

  // SETTERS
  set delivery(parcel) {
    this._delivery = parcel.customer;
  }

  // COMPUTED PROPERTIES
  set customer(customer) {
    customer.idempotency_key = this.idempotency_key;
    customer.email_address = normalize_email(customer.email_address);
    this.body = customer;
  }
}

module.exports = Customer_Create;

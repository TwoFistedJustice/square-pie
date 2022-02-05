const Customer_Request = require("./customer_request_abstract");
const { nanoid } = require("nanoid/non-secure");
const { normalize_email } = require("./utilities");
const man =
  "upserts one customer object. There is no option to upsert multiples.\n" +
  "Add the customer by passing the fardel to make.().customer(fardel) or by calling the setter\n" +
  "yourVar.customer = fardel\n" +
  "Create_Customer has no make() method.  " +
  "\nhttps://developer.squareup.com/reference/square/customers-api/create-customer";

/** @class Customer_Create representing an http request to create a customer record
 * You can pass a customer object in either via the customer setter or via the constructor
 *  @param {customer object} pass a compliant customer object when you instantiate this class
 *  @see Customer_Request
 *  @author Russ Bain
 *  */
class Customer_Create extends Customer_Request {
  _display_name = "Customer_Create";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;
  constructor(customer) {
    super();
    this._method = "POST";
    this._idempotency_key = nanoid();
    this.customer = customer;
    this._delivery;
  }
  // GETTERS
  get idempotency_key() {
    return this._idempotency_key;
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

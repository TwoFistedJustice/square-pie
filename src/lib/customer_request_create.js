const Customer_Request = require("./customer_request_abstract");
const { nanoid } = require("nanoid/non-secure");
const { normalize_email } = require("./utilities");
const man =
  "upserts one customer object. There is no option to upsert multiples.\n" +
  "Add the customer by passing the fardel to make.().customer(fardel) or by calling the setter\n" +
  "yourVar.customer = fardel\n" +
  "Create_Customer has no make() method.\n  " +
  "https://developer.squareup.com/reference/square/customers-api/create-customer";

/**
 * {@link https://developer.squareup.com/reference/square/customers-api/create-customer |  **-------> Link To Square Docs <-------**}
 * @class Customer_Create
 * @extends Square_Request
 * @param {customer_object} customer - pass a compliant customer object when you instantiate this class
 * @classdesc
 * Upserts exactly one customer object. There is no option to upsert multiples.<br>
 * Has no make() method.
 * @example
 * //first build a Customer_Object, then inside of an asynchronous function:
 * const create = new Customer_Create(customer.fardel);
 * await create.request();
 * */
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
    if (Object.prototype.hasOwnProperty.call(parcel, "customer")) {
      this._delivery = parcel.customer;
    } else {
      this._delivery = parcel;
    }
  }

  // COMPUTED PROPERTIES
  set customer(customer) {
    customer.idempotency_key = this.idempotency_key;
    customer.email_address = normalize_email(customer.email_address);
    this.body = customer;
  }
}

module.exports = Customer_Create;

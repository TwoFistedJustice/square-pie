const Customer_Request = require("./customer_request");
const { v4: uuidv4 } = require("uuid");

// creates a new document in the db
class Customer_Create extends Customer_Request {
  constructor(customer) {
    super();
    this._method = "post";
    this.idempotency_key = uuidv4();
    this.customer = customer;
    this._delivery;
  }
  // GETTERS
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
    customer.email_address = super.normalizeEmail(customer.email_address);
    this.body = customer;
  }
}

module.exports = Customer_Create;

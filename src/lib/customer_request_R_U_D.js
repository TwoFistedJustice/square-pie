const Customer_Request = require("./customer_request");

// https://developer.squareup.com/docs/customers-api/use-the-api/keep-records#update-a-customer-profile
//ToDO whenever something is updated or deleted, log it to a file in some retrievable location
class Retrieve_Update_Delete extends Customer_Request {
  constructor(id = "you_still_need_to_set_the _id") {
    super();
    this._endpoint = `/${id}`;
  }
  // GETTERS
  get id() {
    return this._endpoint;
  }
  get delivery() {
    return this._fardel;
  }

  // SETTERS
  set delivery(parcel) {
    this._fardel = parcel.customer;
  }

  // METHODS
  set id(someId) {
    this._endpoint = `/${someId}`;
  }
}

module.exports = Retrieve_Update_Delete;

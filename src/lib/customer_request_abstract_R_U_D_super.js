const Customer_Request = require("./customer_request_abstract");
const {
  query_param_regex,
} = require("./utilities/regular_expression_patterns");
// https://developer.squareup.com/docs/customers-api/use-the-api/keep-records#update-a-customer-profile
//ToDO whenever something is updated or deleted, log it to a file in some retrievable location

/** @class Customer_Retrieve_Update_Delete_Super super class of Customer API request classes to retrieve, update, and delete customer records
 * @param {id} id is fed in via the sub class constructor argument
 *
 *
 *  @see Customer_Request
 *  @author Russ Bain
 *  */

class Customer_Retrieve_Update_Delete_Super extends Customer_Request {
  _display_name = "Customer_Retrieve_Update_Delete_Super";
  _last_verified_square_api_version = "2021-07-21";
  constructor(id = "you_still_need_to_set_the _id") {
    super();
    this._endpoint = `/${id}`;
    this._delivery;
  }
  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get id() {
    return this._endpoint;
  }
  get delivery() {
    return this._delivery;
  }

  // SETTERS
  set delivery(parcel) {
    this._delivery = parcel.customer;
  }
  set id(someId) {
    this._endpoint = `/${someId}`;
  }

  /** @function  append_query_param - adds query parameters - for Customer_Delete sub class only.
   * First it checks to see if the parameter is already set on the endpoint, and if it is, replaces it.
   * If the parameter is not set, it sppends a new query parameter to the endpoint.
   * @param {string}  param - the name of the parameter
   * @param {integer}  value - the value to set the parameter to
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * */
  append_query_param(param, value) {
    let endpoint = this.endpoint;
    if (query_param_regex.version.test(endpoint)) {
      let replacement = "version=" + value;
      endpoint.replace(query_param_regex.version, replacement);
    } else {
      if (!query_param_regex.start.test(endpoint)) {
        endpoint += "?";
      }
      if (query_param_regex.continuation.test(endpoint)) {
        endpoint += "&";
      }
      endpoint += param + "=" + value;
    }
    this._endpoint = endpoint;
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
      id: function (id) {
        this.self.id = id;
        return this;
      },
    };
  }
}

module.exports = Customer_Retrieve_Update_Delete_Super;

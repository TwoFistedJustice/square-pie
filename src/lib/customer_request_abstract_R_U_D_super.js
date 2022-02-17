const Customer_Request = require("./customer_request_abstract");

const {
  query_param_regex,
} = require("./utilities/regular_expression_patterns");
// https://developer.squareup.com/docs/customers-api/use-the-api/keep-records#update-a-customer-profile
//ToDO whenever something is updated or deleted, log it to a file in some retrievable location

/** @class Customer_Retrieve_Update_Delete_Super super class of Customer API request classes to retrieve, update, and delete customer records
 * @param {id} id is fed in via the sub class constructor argument
 *  @see Customer_Request
 *  @author Russ Bain
 *  */

class Customer_Retrieve_Update_Delete_Super extends Customer_Request {
  _display_name = "Customer_Retrieve_Update_Delete_Super";
  _last_verified_square_api_version = "2021-07-21";
  constructor(id = "you_still_need_to_set_the_id") {
    super();
    this._endpoint = `/${id}`;
    this._delivery;
  }
  // GETTERS
  get id() {
    return this._endpoint;
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
  set id(someId) {
    this._endpoint = `/${someId}`;
  }

  /** @function  append_query_param - adds query parameters - for Customer_Delete sub class only.
   * First it checks to see if the parameter is already set on the endpoint, and if it is, replaces it.
   * If the parameter is not set, it appends a new query parameter to the endpoint.
   * @param {string}  param - the name of the parameter
   * @param {integer}  value - the value to set the parameter to
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * */
  append_query_param(param, value) {
    let endpoint = this.endpoint;
    if (param === "version" && query_param_regex.version.test(endpoint)) {
      let replacement = "version=" + value;
      endpoint = endpoint.replace(query_param_regex.version, replacement);
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

  // MAKE METHODS
  /** @function make()  method of SOME_CLASS - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method id
   * @param {string} id - Sets the id portion of the endpoint
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *
   * */
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

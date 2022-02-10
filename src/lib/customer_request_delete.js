const Retrieve_Update_Delete = require("./customer_request_abstract_R_U_D_super");
const {
  shazam_is_integer,
  query_param_is_query_string,
  query_param_replace_value,
} = require("./utilities");
const man =
  "deletes one customer record. There is no option to delete multiple customer records.\n" +
  "Add the Square id of the customer record to delete as an argument when you create the class. This is required. \n" +
  "To enforce optimistic concurrency you may also add the version number of the Square customer record. To get this\n" +
  "you will have to fetch it from Square beforehand.\n" +
  "You may add the version as a second argument to the constructor or you can add it later using make().version(version)\n" +
  "\nhttps://developer.squareup.com/reference/square/customers-api/delete-customer";

/** @class Customer_Delete representing an http request to delete one or more customer records
 *  @see Retrieve_Update_Delete
 *  @author Russ Bain
 *  */
class Customer_Delete extends Retrieve_Update_Delete {
  _display_name = "Customer_Delete";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;

  constructor(id, version) {
    super(id);
    this._method = "DELETE";
    this._delivery;
    if (version !== undefined) {
      this.version = version;
    }
  }
  // GETTERS
  get delivery() {
    return this._delivery;
  }
  // SETTERS
  set delivery(parcel) {
    this._delivery = parcel;
  }
  set #endpoint(str) {
    this._endpoint = str;
  }
  set version(int) {
    if (shazam_is_integer(int, this.display_name, "version"))
      this.#query_param_replace("version", int + "");
  }
  // PRIVATE METHODS
  #init_query_param_sequence(param, value) {
    let modified_endpoint = this.endpoint;
    // check if endpoint is already formatted as a query string.
    if (!query_param_is_query_string(modified_endpoint)) {
      // if not then append ?param=value and return false
      modified_endpoint += "?" + param + "=" + value;
      this.#endpoint = modified_endpoint;
      return false;
    } else {
      return true;
    }
  }

  #query_param_replace(param, value) {
    if (this.#init_query_param_sequence(param, value)) {
      this.#endpoint = query_param_replace_value(this.endpoint, param, value);
    }
  }

  /** @function make()  method of SOME_CLASS - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method version
   * @param {number} version - Expects an integer. Sets the 'version' query parameter
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
      version: function (version) {
        this.self.version = version;
      },
    };
  }
}

module.exports = Customer_Delete;

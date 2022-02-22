const Retrieve_Update_Delete = require("./customer_request_abstract_R_U_D_super");
const {
  endpoint_id_replace,
  shazam_is_integer,
  query_param_is_query_string,
  query_param_replace_value,
} = require("./utilities");
const man =
  "deletes one customer record. There is no option to delete multiple customer records.\n" +
  "Add the Square id of the customer record to delete as an argument when you create the class. You can also do it later. \n" +
  'To add the id after instantiation call make().id("some_id") or use the `replace_id` setter.\n' +
  "To enforce optimistic concurrency you may also add the version number of the Square customer record. To get this\n" +
  "you will have to fetch it from Square beforehand.\n" +
  "You may add the version as a second argument to the constructor or you can add it later using make().version(version)\n" +
  "https://developer.squareup.com/reference/square/customers-api/delete-customer";

/**
 * {@link https://developer.squareup.com/reference/square/customers-api/delete-customer |  **-------> Link To Square Docs <-------**}
 * @class Customer_Delete
 * @classdesc
 * Deletes exactly one customer record. SQuare has no built-in option to delete multiple customer records.<br>
 * Add the Square id of the customer record to delete as an argument when you create the class. You can also do it later.<br>
 * To add the id after instantiation call make().id("some_id") or use the `replace_id` setter.<br>
 * To enforce optimistic concurrency you may also add the version number of the Square customer record. To get this you will have to fetch it from Square beforehand.<br>
 * You may add the version as a second argument to the constructor or you can add it later using make().version(version)<br>
 * */

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

  set replace_id(id) {
    let replacement = endpoint_id_replace(this.endpoint, id);
    this._endpoint = replacement;
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

  /**
   *  make() method of Customer_Delete
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Customer_Delete.make
   * @method
   * @public
   * @memberOf Customer_Delete
   * @property id(id) {string} -  replaces or set the /{id} portion of the endpoint - can be used any time before calling .request().
   * @property version(version) {integer} - Expects an integer. Sets the 'version' query parameter
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *    //is the same as
   *   myVar.make().gizmo().gremlin()
   * */
  make() {
    return {
      self: this,
      id: function (id) {
        this.self.replace_id = id;
        return this;
      },
      version: function (version) {
        this.self.version = version;
        return this;
      },
    };
  }
}

module.exports = Customer_Delete;

const Invoice_Request = require("./invoice_request_abstract");
const {
  query_param_is_present,
  query_param_is_query_string,
  query_param_replace_value,
  shazam_is_integer,
  shazam_number_LE,
} = require("./utilities");
const man =
  "http request to fetch a list of invoices for a given location.\n" +
  "Pass the location_id as a string argument when you instantiate the class. You can also pass it later by calling\n" +
  'make().location("id")\n' +
  "Delivery is an array because this endpoint has a pagination cursor.\n" +
  "https://developer.squareup.com/reference/square/invoices-api/list-invoices";

/**
 * {@link https://developer.squareup.com/reference/square/invoices-api/list-invoices |  **-------> Link To Square Docs <-------**}
 * @class Invoice_List
 * @classdesc
 *
 * http request to fetch a list of invoices for a given location.<br>
 * Pass the location_id as a string argument when you instantiate the class. You can also pass it later by calling `make().location(id)`<br>
 * */

class Invoice_List extends Invoice_Request {
  _display_name = "Invoice_List";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor(location_id) {
    super();
    this._method = "GET";
    this._endpoint =
      typeof location_id === "string"
        ? `?location_id=${location_id}`
        : undefined;
    this._delivery = [];

    this.configuration = {
      maximums: {
        limit: 200,
      },
    };
  }
  get delivery() {
    return this._delivery;
  }
  set cursor(value) {
    this.#query_param_replace("cursor", value);
  }

  set #endpoint(str) {
    this._endpoint = str;
  }
  set location_id(id) {
    this.#query_param_replace("location_id", id);
  }
  set limit(int) {
    let name = this.display_name;
    let caller = "limit";
    if (
      shazam_is_integer(int, name, caller) &&
      shazam_number_LE(int, this.configuration.maximums.limit, name, caller)
    ) {
      this.#query_param_replace("limit", int + "");
    }
  }

  set delivery(parcel) {
    if (Object.prototype.hasOwnProperty.call(parcel, "invoices")) {
      if (Object.prototype.hasOwnProperty.call(parcel, "cursor")) {
        this.#query_param_replace("cursor", parcel.cursor);
      }
      this._delivery.push(parcel.invoices);
    } else {
      this._delivery = parcel;
    }
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
      // if it is modified - check for presence of param
      if (!query_param_is_present(modified_endpoint, param)) {
        // if param is not present- append &param=value and return false
        modified_endpoint += "&" + param + "=" + value;
        this.#endpoint = modified_endpoint;
        return false;
      } else {
        // if param is present return true.
        return true;
      }
    }
  }

  #query_param_replace(param, value) {
    if (this.#init_query_param_sequence(param, value)) {
      this.#endpoint = query_param_replace_value(this.endpoint, param, value);
    }
  }

  // MAKE METHODS
  /**
   *  make() method of Invoice_List
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Invoice_List.make
   * @method
   * @public
   * @memberOf Invoice_List
   * @property limit(int) {integer} -  sets the query parameter of the same name
   * @property location_id(id) {string} -  sets the query parameter of the same name
   * @property location(id) {string} - alias of  `location_id`
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
      limit: function (int) {
        this.self.limit = int;
        return this;
      },
      location_id: function (id) {
        this.self.location_id = id;
        return this;
      },
      location: function (id) {
        return this.location_id(id);
      },
    };
  }
}

module.exports = Invoice_List;

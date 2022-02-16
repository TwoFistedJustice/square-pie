const Customer_Request = require("./customer_request_abstract");
const {
  query_param_is_present,
  query_param_replace_value,
  shazam_is_integer,
} = require("./utilities/index");
const man =
  "fetches a list of customers\n" +
  "You can add a limit, a sort field and sort order using make(). Cursor is appended automatically." +
  "\nhttps://developer.squareup.com/reference/square/customers-api/list-customers";

/** @class Customer_List representing an http request to retrieve a list of customer records
 *  @see Customer_Request
 *  @author Russ Bain
 *  */
class Customer_List extends Customer_Request {
  _display_name = "Customer_List";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;

  constructor() {
    super();
    this._method = "GET";
    this._delivery;
    this._endpoint = "";
  }
  //GETTERS

  get delivery() {
    return this._delivery;
  }
  get endpoint() {
    return this._endpoint;
  }

  // SETTERS

  set endpoint(str) {
    this._endpoint = str;
  }
  set delivery(parcel) {
    if (Object.prototype.hasOwnProperty.call(parcel, "customers")) {
      this._delivery = parcel.customers;
      if (Object.prototype.hasOwnProperty.call(parcel, "cursor")) {
        this.cursor = parcel.cursor;
      }
    } else {
      this._delivery = parcel;
    }
  }

  set limit(value) {
    let param = "limit";
    if (shazam_is_integer(value, this._display_name, "limit")) {
      this.#endpoint_setter(param, value);
    }
  }
  set sort_field(value) {
    let param = "sort_field";
    this.#endpoint_setter(param, value);
  }
  set sort_order(value) {
    let param = "sort_order";
    this.#endpoint_setter(param, value);
  }
  set cursor(value) {
    let param = "cursor";
    this.#endpoint_setter(param, value);
  }

  #endpoint_setter(param, value) {
    if (!query_param_is_present(this.endpoint, param)) {
      let query_param = param + "=" + value;
      this.#build_endpoint(query_param);
    } else {
      let endpoint = query_param_replace_value(this._endpoint, param, value);
      this.endpoint = endpoint;
    }
  }

  #build_endpoint(str) {
    let endpoint = this.endpoint;
    if (endpoint === "") {
      endpoint += "?";
    }
    if (endpoint.length > 1) {
      endpoint += "&";
    }
    endpoint += str;
    this.endpoint = endpoint;
  }

  #sort_field_enum() {
    return {
      default: () => {
        this.sort_field = "DEFAULT";
      },
      created_at: () => {
        this.sort_field = "CREATED_AT";
      },
    };
  }

  #sort_order_enum() {
    return {
      asc: () => {
        this.sort_order = "ASC";
      },
      desc: () => {
        this.sort_order = "DESC";
      },
    };
  }

  /** @function make()  method of SOME_CLASS - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method limit
   * @param {number} int -
   * @method sort_field - enumerated
   * {@link https://developer.squareup.com/reference/square/enums/CustomerSortField | Square Docs}
   * @method sort_order enumerated
   * {@link https://developer.squareup.com/reference/square/enums/SortOrder | Square Docs}
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
      limit: function (int) {
        this.self.limit = int;
        return this;
      },
      sort_field: function () {
        return this.self.#sort_field_enum();
      },
      sort_order: function () {
        return this.self.#sort_order_enum();
      },
    };
  }
}

module.exports = Customer_List;

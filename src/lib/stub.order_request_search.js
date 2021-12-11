const Order_Request = require("./order_request_abstract");
const {
  shazam_boolean,
  shazam_integer,
  shazam_min_length_array,
} = require("./utilities/aaa_index");
/** @class Order_Search representing a search for an existing order.
 * @param {string} id - the id of the order you want to pay. You can also add this later. You must do this before calling .request()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/orders-api/search-orders| Square Docs}
 * */
class Order_Search extends Order_Request {
  _display_name = "Order_Search";
  _last_verified_square_api_version = "2021-11-17";
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "search";
    this._body = {
      location_ids: [], // required: min1
      cursor: undefined,
      limit: undefined, // int
      return_entries: undefined, //bool - if set to true returns only the object id,  location id, and version
      query: undefined, // {} (complex)
    };
    this.configuration = {
      minimums: {
        location_ids: 1,
      },
    };
    this._delivery;
  }

  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get endpoint() {
    return this._endpoint;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get body() {
    // if loc ids doesn't have at least 1 entry, throw
    if (
      shazam_min_length_array(
        this.configuration.minimums.location_ids,
        this._body.location_ids,
        this.display_name,
        "body"
      )
    ) {
      return this._body;
    } else {
      // this is just to appease the linter
      return false;
    }
  }
  git;
  get delivery() {
    return this._delivery;
  }
  get location_ids() {
    return this._body.location_ids;
  }
  get cursor() {
    return this._body.cursor;
  }
  get limit() {
    return this._body.limit;
  }
  get return_entries() {
    return this._body.return_entries;
  }
  get query() {
    return this._body.query;
  }
  // SETTERS

  set delivery(parcel) {
    this._body.return_entries === true
      ? (this._delivery = parcel.order_entries)
      : (this._delivery = parcel.orders);

    if (Object.hasOwnProperty.call(parcel, "cursor")) {
      this._body.cursor = parcel.cursor;
    }
  }
  set location_ids(location_id) {
    this._body.location_ids.push(location_id);
  }
  set cursor(pagination_cursor) {
    this._body.cursor = pagination_cursor;
  }
  set limit(int) {
    if (shazam_integer(int, this._display_name, "limit")) {
      this._body.limit = int;
    }
  }
  set return_entries(bool) {
    if (shazam_boolean(bool, this.display_name, "return_entries")) {
      this._body.return_entries = bool;
    }
  }
  set query(search_orders_query) {
    this._body.query = search_orders_query;
  }

  // query - base on catalog search

  make() {
    return {
      self: this,
      location_ids: function (location_id) {
        this.self.location_ids = location_id;
        return this;
      },
      limit: function (int) {
        this.self.limit = int;
        return this;
      },
      return_entries: function (bool) {
        this.self.return_entries = bool;
        return this;
      },
      query: function (search_orders_query) {
        this.self.query = search_orders_query;
        return this;
      },
    };
  }
}

module.exports = Order_Search;

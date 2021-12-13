const Order_Request = require("./order_request_abstract");
const {
  // arche_time_start_end,
  define,
  shazam_boolean,
  shazam_integer,
  shazam_max_length_array,
  shazam_min_length_array,
} = require("./utilities/aaa_index");

// const {arche_sorting_enum,order_object_enum,order_fulfillment_enum} = require("./enum/index");

/** @class Order_Search representing a search for an existing order.
 * @param {string | array} id - the id or array of ids of an order(s) you want to search for. You can also add this later. You must do this before calling .request()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/orders-api/search-orders| Square Docs}
 * */
class Order_Search extends Order_Request {
  _display_name = "Order_Search";
  _last_verified_square_api_version = "2021-11-17";
  constructor(id) {
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
      maximums: {
        filter_array: 10,
      },
    };
    this._delivery;
    if (typeof id === "string") {
      this._body.location_ids.push(id);
    }
    if (Array.isArray(id)) {
      this._body.location_ids = id;
    }
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

  // PRIVATE METHODS
  // checks for presence of undefined value or filter property and sets object
  #define_query() {
    if (this._body.query === undefined) {
      this._body.query = {};
      define(this._body.query, "filter", undefined);
      define(this._body.query, "sort", undefined);
    }
  }

  // if query.filter is undefined, set it to an empty query
  #define_filter() {
    if (this._body.query.filter === undefined) {
      // JSON stringify will ignore undefined values
      this._body.query.filter = {
        customer_filter: undefined,
        date_time_filter: undefined,
        fulfillment_filter: undefined,
        source_filter: undefined,
        state_filter: undefined,
      };
    }
  }
  #define_customer_filter() {
    if (this.body.query.filter.customer_filter === undefined) {
      this.body.query.filter.customer_filter = {};
      define(this.body.query.filter.customer_filter, "customer_ids", []);
    }
  }
  #define_source_filter() {
    if (this.body.query.filter.source_filter === undefined) {
      this.body.query.filter.source_filter = {};
      define(this.body.query.filter.source_filter, "source_name", []);
    }
  }

  #build_date_time_query() {
    let filter = this._body.query.fulfillment_filter;
    // const name = this.display_name + ".#build_date_time_query";
    return {
      self: this,
      fulfillment_types: () => {
        // [], ENUM - order_fulfillment_enum.js
        // check if prop exists
        if (
          !Object.prototype.hasOwnProperty.call(filter, "fulfillment_types")
        ) {
          // if(!filter.hasOwnProperty("fulfillment_types")){
          // if not define it, set to empty array
          define(filter, "fulfillment_types", []);
        }
        return {
          // using arrow functions hoping this will allow the currying the whole method
          pickup: () => {
            filter.fulfillment_types.push("PICKUP");
            return this;
          },
          shipment: () => {
            filter.fulfillment_types.push("SHIPMENT");
            return this;
          },
        };
      },
      fulfillment_states: () => {
        return this;
      },
    };
  }

  // BUILDER METHODS
  build_query() {
    const name = this.display_name + ".build_query";
    this.#define_query();
    return {
      self: this,
      customer_filter: function (id) {
        let caller = "customer_filter";
        this.self.#define_filter();
        this.self.#define_customer_filter();
        // if it is an array, check that the length is within limits
        if (
          shazam_max_length_array(
            this.self.configuration.maximums.filter_array,
            this.self._body.query.filter.customer_filter.customer_ids,
            name,
            caller
          )
        ) {
          // if it is then push the val
          this.self._body.query.filter.customer_filter.customer_ids.push(id);
        }
        return this;
      },
      source_filter: function (id) {
        let caller = "source_filter";
        this.self.#define_filter();
        this.self.#define_source_filter();
        // if it is an array, check that the length is within limits
        if (
          shazam_max_length_array(
            this.self.configuration.maximums.filter_array,
            this.self._body.query.filter.source_filter.source_name,
            name,
            caller
          )
        ) {
          // if it is then push the val
          this.self._body.query.filter.source_filter.source_name.push(id);
        }
        return this;
      },
      // need to be able to add a whole array or a single id
      // date_time_filter: function(){
      //   this.self.#define_filter();
      //   return this;
      // },
      // fulfillment_filter: function(){
      //   this.self.#define_filter();
      //   return this;
      // },

      //   state_filter: function(){
      //     this.self.#define_filter();
      //     // arrayify
      //     //order_object_enum.js
      //     // push to array
      //     return this;
      //   },
    };
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

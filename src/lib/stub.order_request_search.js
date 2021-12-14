const Order_Request = require("./order_request_abstract");
const {
  // arche_time_start_end,
  define,
  shazam_boolean,
  shazam_integer,
  shazam_max_length_array,
  shazam_min_length_array,
} = require("./utilities/aaa_index");

const {
  arche_sorting_enum,
  // order_object_enum,
  order_fulfillment_enum,
} = require("./enum/index");

/** @class Order_Search representing a search for an existing order.
 * @param {string | array} id - the id or array of ids of an order(s) you want to search for. You can also add this later. You must do this before calling .request()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/orders-api/search-orders | Square Docs}
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
  /** @method  define_query
   * @private
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   *
   *  Creates a new Query Object with the `filter` property set to a filter object with
   *  all properties set to undefined.
   *
   *  Sets `sort` to a default SearchOrdersSort object with default values:
   * sort_field: "CREATED_AT"
   * sort_order: "ASC"
   *
   * */

  #define_query() {
    // JSON stringify will ignore undefined values
    if (this._body.query === undefined) {
      this._body.query = {
        filter: {
          customer_filter: undefined,
          date_time_filter: undefined,
          fulfillment_filter: undefined,
          source_filter: undefined,
          state_filter: undefined,
        },
        sort: {
          sort_field: "CREATED_AT",
          sort_order: "ASC",
        },
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

  /**@private
   * @method  build_fulfillment_filter
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/SearchOrdersFulfillmentFilter | Square Docs}
   *
   * Important: If you filter for orders by time range, you must set sort to use the same field.
   * */
  #build_fulfillment_filter() {
    if (this._body.query.filter.fulfillment_filter === undefined) {
      this._body.query.filter.fulfillment_filter = {};
    }
    let filter = this._body.query.filter.fulfillment_filter;
    return {
      // check if prop exists
      // if not define it, set to empty array
      fulfillment_types: function () {
        if (
          !Object.prototype.hasOwnProperty.call(filter, "fulfillment_types")
        ) {
          define(filter, "fulfillment_types", []);
        }
        return order_fulfillment_enum.fulfillment_types_arrays(filter);
      },
      fulfillment_states: () => {
        if (
          !Object.prototype.hasOwnProperty.call(filter, "fulfillment_states")
        ) {
          define(filter, "fulfillment_states", []);
        }
        return order_fulfillment_enum.fulfillment_state_arrays(filter);
      },
    };
  }

  #build_state_filter() {
    if (this._body.query.filter.state_filter === undefined) {
      this._body.query.filter.state_filter = {};
    }
    let filter = this._body.query.filter.state_filter;
    return {
      state: function () {
        if (!Object.prototype.hasOwnProperty.call(filter, "states")) {
          define(filter, "states", []);
        }
        return order_fulfillment_enum.state_filter_arrays(filter);
      },
    };
  }

  /**@private
   * @method  build_date_time_filter
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/SearchOrdersDateTimeFilter | Square Docs}
   *
   * Important: If you filter for orders by time range, you must set sort to use the same field.
   * */
  #build_date_time_filter() {}

  // BUILDER METHODS
  /** @method  build_query -
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/SearchOrdersQuery  | Square Docs}
   * */
  build_query() {
    const name = this.display_name + ".build_query";
    this.#define_query();
    return {
      self: this,
      customer_filter: function (id) {
        let caller = "customer_filter";
        // this.self.#define_filter();
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
      //   return this;feat
      // },
      fulfillment_filter: function () {
        return this.self.#build_fulfillment_filter();
      },
      /** @method state_filter
       * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
       * {@link https://developer.squareup.com/reference/square/objects/SearchOrdersStateFilter | Square Docs}
       * */
      state_filter: function () {
        return this.self.#build_state_filter();
      },

      /** @method sort_field
       * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
       * {@link https://developer.squareup.com/reference/square/objects/SearchOrdersQuery | Square Docs}
       *  Default values are set. If you want to change them use this.
       *  sort values of "CREATED_AT" and "ASC" (ascending - oldest first)
       *
       * */
      sort: function () {
        let sort = this.self.query.sort;
        return {
          sort_order: function () {
            return arche_sorting_enum.sort_order(sort);
          },
          sort_field: function () {
            return arche_sorting_enum.sort_field(sort);
          },
        };
      },
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

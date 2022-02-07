const Order_Request = require("./order_request_abstract");
const {
  arche_time_start_end,
  define,
  shazam_boolean,
  shazam_integer,
  shazam_max_length_array,
  shazam_min_length_array,
  shazam_is_array,
} = require("./utilities");

const { arche_sorting_enum, order_fulfillment_enum } = require("./enum/index");
const man =
  "searches all orders based on up to ten locations. Add location_ids by calling make().location(location_id)\n" +
  "You can also add an array of location_ids by calling make().concat_location(array).\n" +
  "" +
  "\nhttps://developer.squareup.com/reference/square/orders-api/search-orders";

/** @class Order_Search representing a search for an existing order.
 * @param {string | array} id - the id or array of ids of an order(s) you want to search for. You can also add this later. You must do this before calling .request()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/orders-api/search-orders | Square Docs}
 * */
class Order_Search extends Order_Request {
  _display_name = "Order_Search";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;

  constructor(id) {
    super();
    this._method = "POST";
    this._endpoint = "search";
    this._body = {
      location_ids: [], // required: min1
      cursor: undefined,
      limit: undefined, // int
      return_entries: undefined, //bool - if set to true returns only the order entry objects {order_id, version, location_id},  location id, and version. If set to true returns complete order objects
      query: undefined, // {} (complex)
    };
    this.configuration = {
      minimums: {
        location_ids: 1,
      },
      maximums: {
        filter_array: 10,
        location_ids: 10,
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
    let caller = "location_ids";
    let name = this._display_name;
    let limit = this.configuration.maximums.location_ids;
    // check that array does not exceed allowable length
    if (shazam_max_length_array(limit, this._body.location_ids, name, caller)) {
      this._body.location_ids.push(location_id);
    }
  }
  /**
   * @param {array} arr - an array of ids not longer than 10
   * @throws {Error} Throws an error if the any array or combination of arrays exceeds a length of 10
   * @throws {Error} Throws an error if the argument is not an array
   * @return Replaces the existing array with a new one consisting of the old one plus the one you passed in.
   * */
  set location_array_concat(arr) {
    let caller = "location_array_concat";
    let name = this._display_name;
    let limit = this.configuration.maximums.location_ids;
    // check that arr is an array and that the existing array does not exceed allowable length
    if (
      shazam_is_array(arr, name, caller) &&
      shazam_max_length_array(
        limit,
        this._body.location_ids,
        name,
        `${caller}.unmodified_length`
      )
    ) {
      // make a new joined array
      let joined_array = this._body.location_ids.concat(arr);
      if (
        // check that joined array is less than limit + 1 (bc joined can be UP TO the limit)
        shazam_max_length_array(
          limit + 1,
          joined_array,
          name,
          `${caller}.combined_length`
        )
      )
        this._body.location_ids = joined_array;
    }
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
      this.body.query.filter.customer_filter.customer_ids = [];
    }
  }
  #define_source_filter() {
    if (this.body.query.filter.source_filter === undefined) {
      this.body.query.filter.source_filter = {};
      this.body.query.filter.source_filter.source_name = [];
    }
  }
  #define_date_time_filter() {
    if (this._body.query.filter.date_time_filter === undefined) {
      this._body.query.filter.date_time_filter = {
        close_at: undefined,
        created_at: undefined,
        updated_at: undefined,
      };
    }
  }

  /**@private
   * @method  build_fulfillment_filter
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/SearchOrdersFulfillmentFilter | Square Docs}
   *
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

  /** @method  build_date_time_filter
   * @private
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/SearchOrdersDateTimeFilter | Square Docs}
   *
   * Important: If you filter for orders by time range, you must set sort to use the same field.
   * */
  #build_date_time_filter() {
    let name = this.display_name + ".#build_date_time_filter";
    this.#define_date_time_filter();
    let filter = this._body.query.filter.date_time_filter;
    return {
      self: this,
      close_at: function (start, end) {
        let date_range = arche_time_start_end(start, end);
        if (
          !Object.prototype.hasOwnProperty.call(
            filter,
            "close_at",
            name,
            "close_at"
          )
        ) {
          define(filter, "close_at", undefined);
        }
        filter.close_at = date_range;
        this.self._body.query.sort.sort_field = "CLOSED_AT";
      },
      created_at: function (start, end) {
        let date_range = arche_time_start_end(start, end);
        if (
          !Object.prototype.hasOwnProperty.call(
            filter,
            "created_at",
            name,
            "created_at"
          )
        ) {
          define(filter, "created_at", undefined);
        }
        filter.created_at = date_range;
        this.self._body.query.sort.sort_field = "CREATED_AT";
      },
      updated_at: function (start, end) {
        let date_range = arche_time_start_end(start, end);
        if (
          !Object.prototype.hasOwnProperty.call(
            filter,
            "updated_at",
            name,
            "updated_at"
          )
        ) {
          define(filter, "updated_at", undefined);
        }
        filter.updated_at = date_range;
        this.self._body.query.sort.sort_field = "UPDATED_AT";
      },
    };
  }

  // BUILDER METHODS
  // todo need to be able to add whole arrays with length validation
  /** @function make_query()  method of Order_Search - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method customer_filter
   * @param {string} id -
   * @method source_filter
   * @param {string} id -
   * @method date_time_filter - calls #build_date_time_filter()
   *
   * @method fulfillment_filter - calls #build_fulfillment_filter()
   *
   * @method state_filter - calls #build_state_filter()
   *
   * @method sort
   *
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/SearchOrdersQuery  | Square Docs}
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *
   * */
  make_query() {
    const name = this.display_name + ".make_query";
    const sort = this.self.query.sort;
    this.#define_query();
    return {
      self: this,
      customer_filter: function (id) {
        let caller = "customer_filter";
        this.self.#define_customer_filter();
        // if array is within limits
        if (
          shazam_max_length_array(
            this.self.configuration.maximums.filter_array,
            this.self._body.query.filter.customer_filter.customer_ids,
            name,
            caller
          )
        ) {
          this.self._body.query.filter.customer_filter.customer_ids.push(id);
        }
        return this;
      },
      source_filter: function (id) {
        let caller = "source_filter";
        this.self.#define_source_filter();
        // if array is within limits
        if (
          shazam_max_length_array(
            this.self.configuration.maximums.filter_array,
            this.self._body.query.filter.source_filter.source_name,
            name,
            caller
          )
        ) {
          this.self._body.query.filter.source_filter.source_name.push(id);
        }
        return this;
      },

      date_time_filter: function () {
        return this.self.#build_date_time_filter();
      },
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
      // sort: function () {
      //
      //   return {
      //     sort_order: function () {
      //       return arche_sorting_enum.sort_order(sort);
      //     },
      //     sort_field: function () {
      //       return arche_sorting_enum.sort_field(sort);
      //     },
      //   };
      // },
      sort_order: function () {
        return arche_sorting_enum.sort_order(sort);
      },
      sort_field: function () {
        return arche_sorting_enum.sort_field(sort);
      },
    };
  }

  /** @function make()  method of Order_Search - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method location_ids
   * @param {string} location_id -
   * @method limit
   * @param {number} int -
   * @method return_entries
   * @param {bool} bool -
   * @method query
   *  @param {object} search_orders_query -
   * @method location - alias of `location_ids`
   * @method concat_locations - adds the contents of an array of IDs to the `location_ids` array
   @param {array} arr - an array of location_ids
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
      location: function (location_id) {
        return this.location_ids(location_id);
      },
      concat_locations: function (arr) {
        this.self.location_array_concat = arr;
        return this;
      },
    };
  }
}

module.exports = Order_Search;

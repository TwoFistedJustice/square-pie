const Order_Request = require("./order_request_abstract");
const {
  arche_time_start_end,
  define,
  shazam_is_boolean,
  shazam_is_integer,
  shazam_max_length_array,
  shazam_min_length_array,
  shazam_is_array,
} = require("./utilities");

const { arche_sorting_enum, order_fulfillment_enum } = require("./enum/index");
const man =
  "searches all orders based on up to ten locations. Add location_ids by calling make().location(location_id)\n" +
  "You can also add an array of location_ids by calling make().concat_location(array).\n" +
  "https://developer.squareup.com/reference/square/orders-api/search-orders";

/**
 * {@link https://developer.squareup.com/reference/square/orders-api/search-orders |  **-------> Link To Square Docs <-------**}
 * @class Order_Search
 * @extends Square_Request
 * @param {string|array} id - the id or array of ids of an order(s) you want to search for. You can also add this later. You must do this before calling .request()
 * @classdesc
 *
 * Searches all orders based on up to ten locations. <br><br>
 * Add location_ids by calling `make().location(location_id)`<br><br>
 * You can also add an array of location_ids by calling make().concat_location(array).
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
        this._body.location_ids,
        this.configuration.minimums.location_ids,
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
    if (Object.hasOwnProperty.call(parcel, "cursor")) {
      this._body.cursor = parcel.cursor;
    }
    if (Object.prototype.hasOwnProperty.call(parcel, "order_entries")) {
      this._delivery = parcel.order_entries;
    } else if (Object.prototype.hasOwnProperty.call(parcel, "orders")) {
      this._delivery = parcel.orders;
    } else {
      this._delivery = parcel;
    }
  }
  set location_ids(location_id) {
    let caller = "location_ids";
    let name = this._display_name;
    let limit = this.configuration.maximums.location_ids;
    // check that array does not exceed allowable length
    if (shazam_max_length_array(this._body.location_ids, limit, name, caller)) {
      this._body.location_ids.push(location_id);
    }
  }
  /**
   * @ignore
   * @function
   * @param {array<id>} arr - an array of ids not longer than 10
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
        this._body.location_ids,
        limit,
        name,
        `${caller}.unmodified_length`
      )
    ) {
      // make a new joined array
      let joined_array = this._body.location_ids.concat(arr);
      if (
        // check that joined array is less than limit + 1 (bc joined can be UP TO the limit)
        shazam_max_length_array(
          joined_array,
          limit + 1,
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
    if (shazam_is_integer(int, this._display_name, "limit")) {
      this._body.limit = int;
    }
  }
  set return_entries(bool) {
    if (shazam_is_boolean(bool, this.display_name, "return_entries")) {
      this._body.return_entries = bool;
    }
  }
  set query(search_orders_query) {
    this._body.query = search_orders_query;
  }

  // PRIVATE METHODS
  /** define_query
   *
   *  Creates a new Query Object with the `filter` property set to a filter object with
   *  all properties set to undefined.
   *
   *  Sets `sort` to a default SearchOrdersSort object with default values:
   * sort_field: "CREATED_AT"
   * sort_order: "ASC"
   * @ignore
   * @method
   * @private
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

  #init_fulfillment_filter() {
    if (this._body.query.filter.fulfillment_filter === undefined) {
      this._body.query.filter.fulfillment_filter = {};
    }
  }

  /**
   *  * {@link https://developer.squareup.com/reference/square/enums/OrderFulfillmentType | Link To Square Docs}<br>
   * <br>{@link Order_Search.make|Back to make()}<br>
   * <br>{@link Order_Search.make_query|Back to make_query()}<br>
   *  #build_fulfillment_types<br>
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   *  @typedef {function} Order_Search.build_fulfillment_types
   * @private
   * @abstract
   * @memberOf Order_Search
   * @property pickup() -  pushes value "PICKUP"
   * @property shipment() -  pushes value "SHIPMENT"
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */
  #build_fulfillment_types(calling_this) {
    this.#init_fulfillment_filter();
    let filter = this._body.query.filter.fulfillment_filter;
    if (!Object.prototype.hasOwnProperty.call(filter, "fulfillment_types")) {
      define(filter, "fulfillment_types", []);
    }
    return order_fulfillment_enum.fulfillment_types_arrays(
      filter,
      calling_this
    );
  }

  /**
   * {@link https://developer.squareup.com/reference/square/enums/OrderState | Link To Square Docs}<br>
   * <br>{@link Order_Search.make|Back to make()}<br>
   * <br>{@link Order_Search.make_query|Back to make_query()}<br>
   *  #build_fulfillment_states<br>
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   *  @typedef {function} Order_Search.build_fulfillment_states
   * @private
   * @abstract
   * @memberOf Order_Search
   * @property proposed() - sets value to "PROPOSED"
   * @property reserved() - sets value to "RESERVED"
   * @property prepared() - sets value to "PREPARED"
   * @property completed() - sets value to "COMPLETED"
   * @property canceled() - sets value to "CANCELED"
   * @property failed() - sets value to "FAILED"
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */

  #build_fulfillment_states(calling_this) {
    this.#init_fulfillment_filter();
    let filter = this._body.query.filter.fulfillment_filter;
    if (!Object.prototype.hasOwnProperty.call(filter, "fulfillment_states")) {
      define(filter, "fulfillment_states", []);
    }
    return order_fulfillment_enum.fulfillment_state_arrays(
      filter,
      calling_this
    );
  }

  /**
   * {@link https://developer.squareup.com/reference/square/enums/OrderState | Link To Square Docs}<br>
   * <br>{@link Order_Search.make|Back to make()}<br>
   * <br>{@link Order_Search.make_query|Back to make_query()}<br>
   *  #build_state_filter<br>
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   *  @typedef {function} Order_Search.build_state_filter
   * @private
   * @abstract
   * @memberOf Order_Search
   * @property proposed() - pushes value "PROPOSED"
   * @property reserved() - pushes value "RESERVED"
   * @property prepared() - pushes value "PREPARED"
   * @property completed() - pushes value "COMPLETED"
   * @property canceled() - pushes value "CANCELED"
   * @property failed() - pushes value "FAILED"
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */

  #build_state_filter(calling_this) {
    if (this._body.query.filter.state_filter === undefined) {
      this._body.query.filter.state_filter = {};
    }
    let filter = this._body.query.filter.state_filter;
    if (!Object.prototype.hasOwnProperty.call(filter, "states")) {
      define(filter, "states", []);
    }
    return order_fulfillment_enum.state_filter_arrays(filter, calling_this);
  }

  /**
   * * {@link https://developer.squareup.com/reference/square/objects/SearchOrdersDateTimeFilter | Link To Square Docs}<br>
   * <br>{@link Order_Search.make|Back to make()}<br>
   * <br>{@link Order_Search.make_query|Back to make_query()}<br>
   * **Important:** If you filter for orders by time range, you must set sort to use the same field.
   * @typedef {function} Order_Search.build_date_time_filter
   * @memberOf Order_Search
   * @private
   * @method
   * @property close_at(start,end){time_range}
   * @property created_at(start,end){time_range}
   * @property updated_at(start,end){time_range}
   * @param {time} start - the earlier time - an RFC3339 compliant date code
   * @param {time} end - the later time - an RFC3339 compliant date code
   * @throws {error} Throws an error if either time argument is not in RFC3339 format.
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

  // todo need to be able to add whole arrays with length validation
  /**
   * {@link https://developer.squareup.com/reference/square/objects/SearchOrdersQuery  | Link To Square Docs}<br>
   * <br>{@link Order_Search.make|Back to make()}<br>
   *  **make_query() method of Order_Search**<br>
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * @typedef {function} Order_Search.make_query
   * @method
   * @public
   * @memberOf Order_Search
   * @property customer_filter(){string}  -
   * @property source_filter(){string}  -
   * @property date_time_filter() {time_range}- calls {@link Order_Search.build_date_time_filter|#build_date_time_filter()}
   * @property fulfillment_states() - calls {@link Order_Search.build_fulfillment_states|#build_fulfillment_states()}
   * @property f_states() - alias of `fulfillment_states`
   * @property fulfillment_types() - calls {@link Order_Search.build_fulfillment_types|#build_fulfillment_types()}
   * @property f_types() - alias of `fulfillment_types`
   * @property state_filter() - calls {@link Order_Search.build_state_filter|build_state_filter()}
   * @property sort_order()  {Enumerated} Calls on {@link |arche_sorting_enum} module.
   * @property sort_field()  {Enumerated} Calls on {@link |arche_sorting_enum} module.
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
  make_query() {
    const name = this.display_name + ".make_query";
    this.#define_query();
    const sort = this.query.sort;
    return {
      self: this,
      customer_filter: function (id) {
        let caller = "customer_filter";
        this.self.#define_customer_filter();
        // if array is within limits
        if (
          shazam_max_length_array(
            this.self._body.query.filter.customer_filter.customer_ids,
            this.self.configuration.maximums.filter_array,
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
            this.self._body.query.filter.source_filter.source_name,
            this.self.configuration.maximums.filter_array,
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
      fulfillment_states: function () {
        return this.self.#build_fulfillment_states(this);
      },
      fulfillment_types: function () {
        return this.self.#build_fulfillment_types(this);
      },
      f_states: function () {
        return this.fulfillment_states();
      },
      f_types: function () {
        return this.fulfillment_types();
      },
      /**
       * {@link https://developer.squareup.com/reference/square/objects/SearchOrdersStateFilter | Link To Square Docs}<br>
       * @ignore
       * */
      state_filter: function () {
        return this.self.#build_state_filter(this);
      },

      /**
       * {@link https://developer.squareup.com/reference/square/objects/SearchOrdersQuery | Link To Square Docs}<br>
       * @ignore
       * */

      sort_order: function () {
        return arche_sorting_enum.sort_order(sort, this);
      },

      sort_field: function () {
        return arche_sorting_enum.sort_field(sort, this);
      },
    };
  }

  /**
   *  make() method of Order_Search
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * @typedef {function} Order_Search.make
   * @method
   * @public
   * @memberOf Order_Search
   * @property location_ids(location_id) {string} -
   * @property limit(int) {integer} -
   * @property return_entries(bool) {boolean}
   * @property query(search_orders_query) {object}
   * @property location(location_id) {string} - alias of `location_ids`
   * @property concat_locations(arr) {array<id>}- adds the contents of an array of IDs to the `location_ids` array
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

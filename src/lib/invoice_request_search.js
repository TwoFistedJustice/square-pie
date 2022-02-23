const Invoice_Request = require("./invoice_request_abstract");
const {
  shazam_is_integer,
  shazam_number_LE,
  arrayify,
} = require("./utilities");
const man =
  "http request to search for invoices for a given location\n" +
  "Pass the location_id as a string argument when you instantiate the class. You can also pass it later by calling\n" +
  'make().location("id")' +
  "Build a query using the make() method. Only call the setter or make().query() if you are passing a fully formed query object as it will replace everything.\n" +
  "Limit has a default of 100 and max of 200.\nDelivery is an array because this endpoint has a pagination cursor.\n" +
  "https://developer.squareup.com/reference/square/invoices-api/search-invoices";

/**
 * {@link https://developer.squareup.com/reference/square/invoices-api/search-invoices |  **-------> Link To Square Docs <-------**}
 * @class Invoice_Search
 * @extends Square_Request
 * @param {string} location_id - useful if you only need to search one location. You can leave it out and add location_ids using make() or build_query()
 * @classdesc
 *
 * http request to search for invoices for a given location.<br>
 * Pass the location_id as a string argument when you instantiate the class. You can also pass it later by calling `make().location(id)`<br>
 *  Build a query using the make() method. Only call the setter or make().query() if you are passing a fully formed query object as it will replace everything. <br>
 * Limit has a default of 100 and max of 200. Delivery is an array because this endpoint has a pagination cursor.<br>
 *
 * @example
 *  const search = new Invoice_Search("some_location_id");  // creates a search with one location_id added to the location_ids array
 *  const search = new Invoice_Search();  // creates a search with an empty location_ids array
 *
 *  search.make().limit(20) // limits response to 20 invoices
 *
 *  search.make().customer_id("some_customer_id").customer_id("OTHER_customer_id") // add several customer ids to the customer_ids array
 *  search.make().add_customer_ids_array(["id2", "id3"]) // adds an the values in the passed array of ids to the existing array of ids
 *   // ^ use the same syntax but substitute 'location' for 'customer' to work with the location_ids array
 *
 *  await search.request() // tells it to go
 *
 *  search.delivery // where you will find the returned results stored in an array - each call places one big object of results on the array
 
 * */

class Invoice_Search extends Invoice_Request {
  _display_name = "Invoice_Search";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;

  constructor(location_id) {
    super();
    this._method = "POST";
    this._endpoint = "/search";
    this._delivery = [];
    this._body = {
      query: {
        filter: {
          location_ids: typeof location_id === "undefined" ? [] : [location_id],
          customer_ids: undefined,
        },
        sort: {
          field: "INVOICE_SORT_DATE",
          order: "ASC",
        },
      },
      limit: undefined, // int max 200, default 100
      cursor: undefined, // gets set automatically
    };

    this.configuration = {
      maximums: {
        limit: 200,
      },
    };
  }
  // GETTERS
  get delivery() {
    return this._delivery;
  }
  get query() {
    return this._body.query;
  }
  get limit() {
    return this._body.limit;
  }
  get cursor() {
    return this._body.cursor;
  }
  get location_ids() {
    return this._body.query.filter.location_ids;
  }
  get customer_ids() {
    return this._body.query.filter.customer_ids;
  }
  get sort() {
    return this._body.query.sort;
  }
  // SETTERS

  set query(query_object) {
    this._body.query = query_object;
  }
  set limit(int) {
    let name = this.display_name;
    let caller = "limit";
    if (
      shazam_is_integer(int, name, caller) &&
      shazam_number_LE(int, this.configuration.maximums.limit, name, caller)
    ) {
      this._body.limit = int;
    }
  }

  set delivery(parcel) {
    if (Object.prototype.hasOwnProperty.call(parcel, "invoices")) {
      if (Object.prototype.hasOwnProperty.call(parcel, "cursor")) {
        this._body.cursor = parcel.cursor;
      }
      this._delivery.push(parcel.invoices);
    } else {
      this._delivery = parcel;
    }
  }

  // PRIVATE SETTERS

  set #customer_id(id) {
    let filter = this._body.query.filter;
    arrayify(filter, "customer_ids", this.display_name, "#customer_id");
    filter.customer_ids.push(id);
  }

  set #location_id(id) {
    this._body.query.filter.location_ids.push(id);
  }

  set #location_ids_array(arr) {
    let replacement_array = this._body.query.filter.location_ids.concat(arr);
    this._body.query.filter.location_ids = replacement_array;
  }

  set #customer_ids_array(arr) {
    arrayify(
      this._body.query.filter,
      "customer_ids",
      this.display_name,
      "#customer_ids_array"
    );
    let replacement_array = this._body.query.filter.customer_ids.concat(arr);
    this._body.query.filter.customer_ids = replacement_array;
  }

  /** * {@link https://developer.squareup.com/reference/square/enums/SortOrder | Link To Square Docs}
   *
   *  #sort_order
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   *  @typedef {function} Invoice_Search.sort_order
   * @private
   * @abstract
   * @memberOf Invoice_Search
   * @property ascending() sets value to "ASC"
   * @property up() alias of `ascending`
   * @property oldest_first() alias of `ascending`
   * @property descending() sets value to "DESC"
   * @property down() alias of `descending`
   * @property newest_first() alias of `descending`
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */

  #sort_order() {
    return {
      self: this,
      ascending: function () {
        this.self._body.query.sort.order = "ASC";
        return this;
      },
      up: function () {
        return this.ascending();
      },
      oldest_first: function () {
        return this.ascending();
      },
      descending: function () {
        this.self._body.query.sort.order = "DESC";
        return this;
      },
      down: function () {
        return this.descending();
      },
      newest_first: function () {
        return this.descending();
      },
    };
  }

  // MAKE METHODS
  /**
   *  make() method of Invoice_Search
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Invoice_Search.make
   * @method
   * @public
   * @memberOf Invoice_Search
   * @property limit(limit) {integer} - an integer up to 200 - default is 100
   * @property query(query_object) {object} **DANGER WILL ROBINSON!** This wil replace the entire query object withwhatever you pass it. Only pass in a complete query object.
   * @property location_id(id) {string} - adds an id the array on the filter object
   * @property customer_id(id) {string} - adds an id the array on the filter object
   * @property add_location_ids_array(arr) {array<id>} - (concat) adds the contents of an array of ids to filter object.
   * @property add_customer_ids_array(arr) {array<id>} - (concat) adds the contents of an array of ids to filter object.
   * @property sort() {Enumerated} - Calls `#sort_order()`
   * @property location(id - alias of `location_id`
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
      limit: function (limit) {
        this.self.limit = limit;
        return this;
      },
      query: function (query_object) {
        this.self.query = query_object;
        return this;
      },
      location_id: function (id) {
        this.self.#location_id = id;
        return this;
      },
      customer_id: function (id) {
        this.self.#customer_id = id;
        return this;
      },
      add_location_ids_array: function (arr) {
        this.self.#location_ids_array = arr;
        return this;
      },
      add_customer_ids_array: function (arr) {
        this.self.#customer_ids_array = arr;
        return this;
      },
      sort: function () {
        return this.self.#sort_order();
      },
      location: function (id) {
        return this.location_id(id);
      },
    };
  }
}

module.exports = Invoice_Search;

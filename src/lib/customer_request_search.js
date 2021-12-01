const Customer_Request = require("./customer_request");

// THREE props on body: query, limit, cursor - these are same as for Invoices
// differentiation begins inside the query object

/** @class Customer_Search representing an http request to retrieve to search customer records
 *  @see Customer_Request
 *  @author Russ Bain
 *  */
class Customer_Search extends Customer_Request {
  _display_name = "Customer_Search";
  _last_verified_square_api_version = "2021-07-21";
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "/search";
    this._body = {
      query: {
        filter: {},
        sort: {
          field: "CREATED_AT",
          order: "ASC",
        },
        limit: "",
      },
    };
    this._delivery;
  }

  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get delivery() {
    return this._delivery;
  }

  // SETTERS
  set delivery(parcel) {
    this._delivery = parcel.customers;
  }
  // METHODS
  // this works like so:
  // the 'this' inside  query() is the class
  // call Search.query.fuzzy.the-method-you-want
  // call Search.query.exact.the-method-you-want
  /**
   * @param {}
   * @throws
   * @return
   * */
  query() {
    const methods = (fuzzacto) => {
      return {
        self: this,
        typeOfSearch: `${fuzzacto}`,
        email: function (email) {
          this.self._body.query.filter.email_address = {
            [this.typeOfSearch]: email,
          };
          return this;
        },
        phone: function (phone) {
          this.self._body.query.filter.phone_number = {
            [this.typeOfSearch]: phone,
          };
          return this;
        },
        id: function (id) {
          this.self._body.query.filter.reference_id = {
            [this.typeOfSearch]: id,
          };
          return this;
        },
        limit: function (limit) {
          this.self._body.limit = limit;
          return this;
        },
        sortUp: function () {
          this.self._body.query.sort.order = "ASC";
          return this;
        },
        sortDown: function () {
          this.self._body.query.sort.order = "DESC";
          return this;
        },
        sortByFirstName: function () {
          this.self._body.query.sort.field = "DEFAULT";
          return this;
        },
        sortByDate: function () {
          this.self._body.query.sort.field = "CREATED_AT";
          return this;
        },
        sortByMostRecent: function () {
          this.self._body.query.sort.field = "CREATED_AT";
          this.self._body.query.sort.order = "ASC";
          return this;
        },
      };
    };
    return {
      fuzzy: () => {
        return methods("fuzzy");
      },
      exact: () => {
        return methods("exact");
      },
    };
  } // END query method
}

module.exports = Customer_Search;

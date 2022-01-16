const Customer_Request = require("./customer_request_abstract");
const man =
  "searches for a customer record using either exact criteria or fuzzy matching.\n" +
  "There is no make() method on this class. Instead it has a query() method which operates with one difference. \n" +
  'The difference is that query() takes a string argument. The arguments you may pass are "fuzzy" or "exact"\n' +
  "After that it works just like make(). See the Square docs for options and details." +
  "\nhttps://developer.squareup.com/reference/square/customers-api/search-customers\n";

/** @class Customer_Search representing an http request to retrieve to search customer records
 *  @see Customer_Request
 *  @author Russ Bain
 *  */
class Customer_Search extends Customer_Request {
  _display_name = "Customer_Search";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;

  constructor() {
    super();
    this._method = "POST";
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

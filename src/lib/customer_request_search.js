const Customer_Request = require("./customer_request_abstract");
const man =
  "searches for a customer record using either exact criteria or fuzzy matching.\n" +
  "There is no make() method on this class. Instead it has a query() method which operates with one difference. \n" +
  'The difference is that query() has two "top level" methods `fuzzy` and `exact`, one of which must be called first.\n' +
  "After that it works just like make(). See the Square docs for options and details." +
  "\nhttps://developer.squareup.com/reference/square/customers-api/search-customers\n";

/**
 * {@link https://developer.squareup.com/reference/square/customers-api/search-customers |  **-------> Link To Square Docs <-------**}
 * @class Customer_Search
 * @extends Square_Request
 * @classdesc
 * Searches for a customer record using either exact criteria or fuzzy matching.<br>
 * There is no make() method on this class. Instead it has a query() method which operates with one difference.<br>
 * The difference is that query() has two "top level" methods `fuzzy` and `exact`, one of which must be called first.<br>
 * After that it works just like make(). See the Square docs for options and details.<br>
 * */

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
          field: "DEFAULT",
          order: "ASC",
        },
      },
      limit: undefined,
    };
    this._delivery;
  }

  // GETTERS
  get delivery() {
    return this._delivery;
  }

  // SETTERS
  set delivery(parcel) {
    if (Object.prototype.hasOwnProperty.call(parcel, "customers")) {
      this._delivery = parcel.customers;
    } else {
      this._delivery = parcel;
    }
  }
  // attn devs: In this class, the make-analog "query" pulls double duty as a multi-setter
  // because of the necessity of prefaceing all queries with fuzzy or exact.
  /**
   * {@link https://developer.squareup.com/reference/square/objects/CustomerQuery | Square Docs}<br>
   *
   *  query() method of Customer_Search
   *  Operates similarly to a make() method with one big difference.
   *  Query has two top level methods: 'fuzzy' and 'exact', one of which must be called before calling the setting
   *  sub-methods. Sub-method names are exactly the same as the property names listed in the Square docs. There may
   *  be additional methods and/or shortened aliases of other methods. You may not mix fuzzy and exact searches.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Customer_Search.query
   * @method
   * @public
   * @memberOf Customer_Search
   * @property fuzzy() - top-level method (call one of these first), all non-top-level methods are the same for both fuzzy() and exact()
   * @property exact() - top-level method (call one of these first), all non-top-level methods are the same for both fuzzy() and exact()
   * @property email(email) {string} -
   * @property phone(phone) {string} -
   * @property id(id) {string<id>} -
   * @property limit(limit) {integer} -
   * @property sortUp()  - sets sort.order to "ASC"
   * @property sortDown()  - sets sort.order to "DESC"
   * @property sortByFirstName()  - sets sort.field to "DEFAULT" - this is the default value.
   * @property sortByDate()  - sets sort.field to "CREATED_AT"
   * @property sortByMostRecent()  - sets sort.field to "CREATED_AT" and sort.order to"ASC"
   * @example
   *  You must use parentheses with every call to query() and with every sub-method.
   *
   *  myVar.query().fuzzy().email("mail@mail.com")...
   *  // OR
   *  myVar.query().exact().email("mail@mail.com")...
   *
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

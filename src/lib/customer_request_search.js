const Customer_Request = require("./customer_request_abstract");
const man =
  "searches for a customer record using either exact criteria or fuzzy matching.\n" +
  "There is no make() method on this class. Instead it has a query() method which operates with one difference. \n" +
  'The difference is that query() takes a string argument. The arguments you may pass are "fuzzy" or "exact"\n' +
  "After that it works just like make(). See the Square docs for options and details." +
  "\nhttps://developer.squareup.com/reference/square/customers-api/search-customers\n";

/** @class Customer_Search representing an http request to retrieve to search customer records
 *  @see Customer_Request
 *  {@link https://developer.squareup.com/reference/square/customers-api/search-customers | Square Docs}
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
  /** @function query()  method of Customer_Search - Operates similarly to a make() method with one big difference.
   *  Query has two top level methods: 'fuzzy' and 'exact', one of which must be called before calling the setting
   *  sub-methods. Sub-method names are exactly the same as the property names listed in the Square docs. There may
   *  be additional methods and/or shortened aliases of other methods. You may not mix fuzzy and exact searches.
   * @method fuzzy - top-level method, all non-top-level methods are the same for both fuzzy() and exact()
   * @method exact - top-level method, all non-top-level methods are the same for both fuzzy() and exact()
   * @method email -
   * @param {string} email -
   * @method phone
   * @param {string}  -
   * @method id
   * @param {string} id -
   * @method limit
   * @param {number} limit -
   * @method sortUp - sets the sort order to "ASC" - this is the default value.
   * @method sortDown - sets the sort order to "DESC"
   * @method sortByFirstName  - sets the sort field to "DEFAULT" - this is the default value.
   * @method sortByDate  - sets the sort field to "CREATED_AT"
   * @method sortByMostRecent - sets the sort field to "CREATED_AT" and sort order to "ASC".
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/CustomerQuery | Square Docs}
   * @example
   *  You must use parentheses with every call to query and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set query() to a
   *  variable.
   *  let exact_query = myVar.query().exact();
   *  let fuzzy_query = myVar.query().fuzzy();
   *   exact_query.the-method-you-want().the-next-method-you-want();
   *   fuzzy_query.the-method-you-want().the-next-method-you-want();
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

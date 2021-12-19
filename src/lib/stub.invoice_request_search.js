const Invoice_Request = require("./stub.invoice_request_abstract");
const {
  shazam_integer,
  shazam_number_LE,
  arrayify,
} = require("./utilities/aaa_index");

/** @class  Invoice_Search
 * @param {string} location_id - useful if you only need to search one location. You can leave it out and add location_ids using make() or build_query()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/invoices-api/search-invoices | Square Docs}
 * */
class Invoice_Search extends Invoice_Request {
  _display_name = "Invoice_Search";
  _last_verified_square_api_version = "2021-12-15";
  _help =
    "Build a query using the build_query() method. Only call the setter or make().query() if you are passing a fully formed query object as it will replace everything." +
    "For this class only, you can also use the make() submethods to build your query: location_id(), customer_id(), and sort() - these are exactly the same as the build_query methods." +
    '\nLimit has a default of 100 and max of 200.\\nDelivery is an array because this endpoint has a pagination cursor.";';
  constructor(location_id) {
    super();
    this._method = "POST";
    this._endpoint = "/search";
    this._delivery = [];
    this._body = {
      query: {
        filter: {
          // todo write test - test both
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
  get help() {
    return this._help;
  }

  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
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

  set query(val) {
    this._body.query = val;
  }
  set limit(int) {
    let name = this.display_name;
    let caller = "limit";
    if (
      shazam_integer(int, name, caller) &&
      shazam_number_LE(int, this.configuration.maximums.limit, name, caller)
    ) {
      this._body.limit = int;
    }
  }

  set delivery(parcel) {
    if (Object.prototype.hasOwnProperty.call(parcel, "cursor")) {
      this._body.cursor = parcel.cursor;
    }
    this._delivery.push(parcel.invoices);
  }

  // PRIVATE SETTERS

  set #customer_id(id) {
    let filter = this._body.query.filter;
    if (arrayify(filter, "customer_ids", this.display_name, "#customer_id")) {
      filter.customer_ids.push(id);
    }
  }

  set #location_id(id) {
    this._body.query.filter.location_ids.push(id);
  }

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

  //todo add whole arrays
  // BUILDER METHODS
  build_query() {
    return {
      self: this,
      location_id: function (id) {
        this.self.#location_id = id;
        return this;
      },
      customer_id: function (id) {
        this.self.#customer_id = id;
        return this;
      },
      sort: function () {
        return this.self.#sort_order();
      },
    };
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
      limit: function (val) {
        this.self.limit = val;
        return this;
      },
      query: function (val) {
        this.self.query = val;
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
      sort: function () {
        return this.self.#sort_order();
      },
    };
  }
}

module.exports = Invoice_Search;

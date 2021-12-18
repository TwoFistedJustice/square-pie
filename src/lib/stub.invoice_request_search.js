const Invoice_Request = require("./stub.invoice_request_abstract");
const { shazam_integer, shazam_number_LE } = require("./utilities/aaa_index");

/** @class  Invoice_Search
 * @param {}
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/invoices-api/search-invoices | Square Docs}
 * */
class Invoice_Search extends Invoice_Request {
  _display_name = "Invoice_Search";
  _last_verified_square_api_version = "2021-12-15";
  _help =
    "Build a query using the build_query() method. Only call the setter or make().query() if you are passing a fully formed query object as it will replace everything." +
    '\nLimit has a default of 100 and max of 200.\\nDelivery is an array because this endpoint has a pagination cursor.";';
  constructor() {
    super();
    this._method = "POST";
    this._endpoint = "/search";
    this._delivery = [];
    this._body = {
      query: {},
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
    };
  }
}

module.exports = Invoice_Search;

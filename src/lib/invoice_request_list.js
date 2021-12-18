const Invoice_Request = require("./stub.invoice_request_abstract");
const { shazam_integer, shazam_number_LE } = require("./utilities/aaa_index");

/** @class  Invoice_List
 * @param {}
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/invoices-api/list-invoices | Square Docs}
 * */
class Invoice_List extends Invoice_Request {
  _display_name = "Invoice_List";
  _last_verified_square_api_version = "2021-12-15";
  _help =
    "Invoice_List must be called with a location_id. Set it by passing it to the constructor, the setter, or make().\nDelivery is an array because this endpoint " +
    "has a pagination cursor.";
  constructor(location_id) {
    super();
    this._method = "GET";
    this._endpoint =
      typeof location_id === "string"
        ? `?location_id=${location_id}`
        : undefined;
    this._delivery = [];
    this._query_params = {
      location_id: typeof location_id === "string" ? location_id : undefined, // REQUIRED
      limit: undefined, // int max 200, default 100
      cursor: undefined, // gets set automatically
    };

    this.configuration = {
      maximums: {
        limit: 200,
      },
    };
  }

  get endpoint() {
    let has_id =
      typeof this._query_params.location_id === "string" ? true : false;
    let has_limit = typeof this._query_params.limit === "number" ? true : false;
    let has_cursor =
      typeof this._query_params.cursor === "string" ? true : false;
    let endpoint;
    // if it has an id but no limit or cursor, just return the endpoint
    if (has_id && !has_limit && !has_cursor) {
      return this._endpoint;
    } else {
      // if no id has been added throw an error- the message is the help
      if (!has_id) {
        let message = this.help;
        throw new Error(message);
      } else {
        // create a new endpoint
        endpoint = "?location_id=" + this._query_params.location_id;
        // if it has a limit but no cursor
        if (has_limit && !has_cursor) {
          endpoint += "&limit=" + this._query_params.limit;
        }
        // if it has both limti and cursor
        else if (has_limit && has_cursor) {
          endpoint +=
            "&limit=" +
            this._query_params.limit +
            "&cursor=" +
            this._query_params.cursor;
        }
        // if it has cursor but no limit
        else if (!has_limit && has_cursor) {
          endpoint += "&cursor=" + this._query_params.cursor;
        }
        return endpoint;
      }
    }
  }
  get help() {
    return this._help;
  }

  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get delivery() {
    return this._delivery;
  }

  get location_id() {
    return this._query_params.location_id;
  }
  get limit() {
    return this._query_params.limit;
  }
  get cursor() {
    return this._query_params.cursor;
  }

  set location_id(id) {
    this._endpoint = "?location_id=" + id;
    this._query_params.location_id = id;
  }
  set limit(int) {
    let name = this.display_name;
    let caller = "limit";
    if (
      shazam_integer(int, name, caller) &&
      shazam_number_LE(int, this.configuration.maximums.limit, name, caller)
    ) {
      this._query_params.limit = int;
    }
  }

  set delivery(parcel) {
    if (Object.prototype.hasOwnProperty.call(parcel, "cursor")) {
      this._query_params.cursor = parcel.cursor;
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
      location_id: function (id) {
        this.self.location_id = id;
        return this;
      },
    };
  }
}

module.exports = Invoice_List;

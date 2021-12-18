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
    "Must be called with a location_id. Set it by passing it to the constructor, the setter, or make().\nDelivery is an array because this endpoint " +
    "has a pagination cursor.";
  constructor(location_id) {
    super();
    this._method = "GET";
    this._endpoint = "";
    this._delivery = [];
    this._body = {
      location_id: location_id, // REQUIRED
      limit: undefined, // int max 200, default 100
      cursor: undefined, // gets set automatically
    };
    this.configuration = {
      maximums: {
        limit: 200,
      },
    };
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
    return this._body.location_id;
  }
  get limit() {
    return this._body.limit;
  }
  get cursor() {
    return this._body.cursor;
  }

  set location_id(id) {
    this._body.location_id = id;
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
      location_id: function (id) {
        this.self.location_id = id;
        return this;
      },
    };
  }
}

module.exports = Invoice_List;

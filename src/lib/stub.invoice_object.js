// const { nanoid } = require("nanoid");
// const {
//   define,
//   shazam_max_length,
//   normalize_email,
//   shazam_time_RFC3339,
//   shazam_integer,
//   shazam_boolean,
//
// } = require("./utilities/aaa_index");
// const { uid_length } = require("./pie_defaults");

/** @class Invoice_Object representing a
 * @param {}  You must do this before calling .request()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * @example
 *
 *  const myVar = new Generic_Object()
 *
 *  myVar.fardel => pass this to a request class to send your data
 *
 * */

class Invoice_Object {
  _display_name = "";
  _last_verified_square_api_version = "";
  _help = "";
  constructor() {
    this._fardel = {
      version: undefined, // int32
      location_id: undefined, // 255
      order_id: undefined, // 255 REQUIRED when creating -todo add validation to Create_Request
      primary_recipient: undefined, //{customer_id}
      payment_requests: undefined, // []
      delivery_method: undefined, //str  ENUM
      invoice_number: undefined, //str  191
      title: undefined, //str 255
      description: undefined, //str 65536
      scheduled_at: undefined, //RFC3339
      accepted_payment_methods: undefined, //{bank_account: bool, card: bool, square_gift_card: bool}
      custom_fields: undefined, //[] complex -subscription only do last
      sale_or_service_date: undefined, //str YYYY-MM-DD (validate?)
      payment_conditions: undefined, // str 2000, FRANCE ONLY - Fait le en francais
    };

    this.configuration = {
      maximums: {},
    };
  }

  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }

  get help() {
    return this._help;
  }
  get fardel() {
    return this._fardel;
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
    };
  }
}

module.exports = Invoice_Object;

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

  // FARDEL GETTERS
  get version() {
    return this._fardel.version;
  }
  get location_id() {
    return this._fardel.location_id;
  }
  get primary_recipient() {
    return this._fardel.primary_recipient;
  }
  get payment_requests() {
    return this._fardel.payment_requests;
  }
  get delivery_method() {
    return this._fardel.delivery_method;
  }

  get invoice_number() {
    return this._fardel.invoice_number;
  }
  get title() {
    return this._fardel.title;
  }
  get description() {
    return this._fardel.description;
  }
  get scheduled_at() {
    return this._fardel.scheduled_at;
  }
  get accepted_payment_methods() {
    return this._fardel.accepted_payment_methods;
  }
  get custom_fields() {
    return this._fardel.custom_fields;
  }
  get sale_or_service_date() {
    return this._fardel.sale_or_service_date;
  }
  get payment_conditions() {
    return this._fardel.payment_conditions;
  }

  // FARDEL SETTERS
  set version(val) {
    this._fardel.version = val;
  }
  set location_id(val) {
    this._fardel.location_id = val;
  }
  set primary_recipient(val) {
    this._fardel.primary_recipient = val;
  }
  set payment_requests(val) {
    this._fardel.payment_requests = val;
  }
  set delivery_method(val) {
    this._fardel.delivery_method = val;
  }
  set invoice_number(val) {
    this._fardel.invoice_number = val;
  }
  set title(val) {
    this._fardel.title = val;
  }
  set description(val) {
    this._fardel.description = val;
  }
  set scheduled_at(val) {
    this._fardel.scheduled_at = val;
  }
  set accepted_payment_methods(val) {
    this._fardel.accepted_payment_methods = val;
  }
  set custom_fields(val) {
    this._fardel.custom_fields = val;
  }
  set sale_or_service_date(val) {
    this._fardel.sale_or_service_date = val;
  }
  set payment_conditions(val) {
    this._fardel.payment_conditions = val;
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
    };
  }
}

module.exports = Invoice_Object;

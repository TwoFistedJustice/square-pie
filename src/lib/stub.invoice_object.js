// const { nanoid } = require("nanoid");
const {
  arrayify,
  //   define,
  generate_error_message,
  shazam_max_length,
  shazam_time_RFC3339,
  shazam_integer,
  // shazam_boolean,
} = require("./utilities/aaa_index");

const { isDate } = require("validator");

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
  _display_name = "Invoice_Object";
  _last_verified_square_api_version = "2021-12-15";
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
      maximums: {
        ids: 255,
        invoice_number: 191,
        title: 255,
        description: 65536,
        payment_conditions: 2000,
      },
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
  get order_id() {
    return this._fardel.order_id;
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
  set version(int) {
    if (shazam_integer(int, this.display_name, "version")) {
      this._fardel.version = int;
    }
  }
  set location_id(id) {
    if (
      shazam_max_length(
        this.configuration.maximums.ids,
        id,
        this._display_name,
        "location_id"
      )
    ) {
      this._fardel.location_id = id;
    }
  }
  set order_id(id) {
    if (
      shazam_max_length(
        this.configuration.maximums.ids,
        id,
        this._display_name,
        "order_id"
      )
    ) {
      this._fardel.order_id = id;
    }
  }
  set primary_recipient(customer_id) {
    this._fardel.primary_recipient = { customer_id: customer_id };
  }
  // todo complex?
  // https://developer.squareup.com/docs/invoices-api/overview#payment-requests
  set payment_requests(pay_req) {
    if (
      arrayify(
        this._fardel,
        "payment_requests",
        this._display_name,
        "payment_requests"
      )
    ) {
      this._fardel.payment_requests = pay_req;
    }
  }
  // todo ENUM
  set delivery_method(str) {
    this._fardel.delivery_method = str;
  }

  set invoice_number(inv_num) {
    if (
      shazam_max_length(
        this.configuration.maximums.invoice_number,
        inv_num,
        this._display_name,
        "invoice_number"
      )
    ) {
      this._fardel.invoice_number = inv_num;
    }
  }
  set title(str) {
    if (
      shazam_max_length(
        this.configuration.maximums.invoice_number,
        str,
        this._display_name,
        "title"
      )
    ) {
      this._fardel.title = str;
    }
  }
  set description(str) {
    if (
      shazam_max_length(
        this.configuration.maximums.invoice_number,
        str,
        this._display_name,
        "description"
      )
    ) {
      this._fardel.description = str;
    }
  }
  set scheduled_at(time) {
    if (shazam_time_RFC3339(time, this._display_name, "scheduled_at")) {
      this._fardel.scheduled_at = time;
    }
  }
  // todo BUILDER
  set accepted_payment_methods(obj) {
    this._fardel.accepted_payment_methods = obj;
  }
  // todo BUILDER - last
  set custom_fields(val) {
    this._fardel.custom_fields = val;
  }
  // todo - check that this only accepts  dates with '-' - if it doesn't make one that does
  set sale_or_service_date(YYYYMMDD) {
    let name = this._display_name + ".sale_or_service_date";
    if (!isDate(YYYYMMDD, ["-"])) {
      let message =
        generate_error_message(name, string, YYYYMMDD) +
        "\nDate must be in format YYYY-MM-DD";
      throw new Error(message);
    }
    this._fardel.sale_or_service_date = YYYYMMDD;
  }
  set payment_conditions(str) {
    if (
      shazam_max_length(
        this.configuration.maximums.invoice_number,
        str,
        this._display_name,
        "payment_conditions"
      )
    ) {
      this._fardel.payment_conditions = str;
    }
  }

  set conditions_de_paiement(chaine) {
    if (
      shazam_max_length(
        this.configuration.maximums.invoice_number,
        chaine,
        this._display_name,
        "conditions_de_paiement"
      )
    ) {
      this._fardel.payment_conditions = chaine;
    }
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
    };
  }
}

module.exports = Invoice_Object;

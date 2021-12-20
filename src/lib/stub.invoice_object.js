// const { nanoid } = require("nanoid");
const {
  arrayify,
  //   define,
  generate_error_message,
  shazam_max_length,
  shazam_max_length_array,
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
  _help = "accepted_payment_methods- card is default true";
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
      accepted_payment_methods: {
        bank_account: false,
        card: true,
        square_gift_card: false,
      }, //{bank_account: bool, card: bool, square_gift_card: bool}
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
        custom_fields: 2,
        custom_fields_label: 30,
        custom_fields_value: 2000,
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
  set accepted_payment_methods(obj) {
    this._fardel.accepted_payment_methods = obj;
  }

  set custom_fields(custom_field) {
    let caller = "custom_fields";
    if (
      arrayify(this._fardel, "custom_fields", this._display_name, caller) &&
      shazam_max_length_array(
        this.configuration.maximums.custom_fields,
        custom_field,
        this._display_name,
        caller
      )
    ) {
      this._fardel.custom_fields.push(custom_field);
    }
  }
  // todo - check that this only accepts  dates with '-' - if it doesn't make one that does
  set sale_or_service_date(YYYYMMDD) {
    let name = this._display_name + ".sale_or_service_date";
    if (!isDate(YYYYMMDD, ["-"])) {
      let message =
        generate_error_message(name, "string", YYYYMMDD) +
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

  // PRIVATE METHODS
  #delivery_method_enum() {
    return {
      self: this,
      email: function () {
        this.self._fardel.delivery_method = "EMAIL";
        return this;
      },
      share_manually: function () {
        this.self._fardel.delivery_method = "SHARE_MANUALLY";
        return this;
      },
      manually: function () {
        return this.share_manually();
      },
    };
  }

  #accepted_payment_methods_enum(property_name) {
    return {
      self: this,
      yes: function () {
        this.self._fardel.accepted_payment_methods[property_name] = true;
        return this;
      },
      no: function () {
        this.self._fardel.accepted_payment_methods[property_name] = false;
        return this;
      },
    };
  }

  #build_accepted_payment_methods() {
    return {
      self: this,
      bank_account: function () {
        let property_name = "bank_account";
        return this.self.#accepted_payment_methods_enum(property_name);
      },
      card: function () {
        let property_name = "card";
        return this.self.#accepted_payment_methods_enum(property_name);
      },
      square_gift_card: function () {
        let property_name = "square_gift_card";
        return this.self.#accepted_payment_methods_enum(property_name);
      },
    };
  }

  #build_custom_field() {
    let limit = this.configuration.maximums;
    let name = this._display_name;
    let caller = "#build_custom_field";
    let field = {
      label: undefined, // str 30
      placement: "ABOVE_LINE_ITEMS",
      value: undefined, // str 20000
    };

    return {
      label(str) {
        if (shazam_max_length(limit.custom_fields_label, str, name, caller)) {
          field.label = str;
        }
        return this;
      },
      value(str) {
        if (shazam_max_length(limit.custom_fields_value, str, name, caller)) {
          field.value = str;
        }
        return this;
      },
      placement: () => {
        return {
          above_line_items: function () {
            field.placement = "ABOVE_LINE_ITEMS";
            return this;
          },
          below_line_items: function () {
            field.placement = "BELOW_LINE_ITEMS";
            return this;
          },
          above: function () {
            return this.above_line_items();
          },
          below: function () {
            return this.below_line_items();
          },
        };
      },
    };
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
      version: function (val) {
        this.self.version = val;
        return this;
      },
      location_id: function (val) {
        this.self.location_id = val;
        return this;
      },
      order_id: function (val) {
        this.self.order_id = val;
        return this;
      },
      primary_recipient: function (val) {
        this.self.primary_recipient = val;
        return this;
      },
      payment_requests: function (val) {
        this.self.payment_requests = val;
        return this;
      },
      delivery_method: function (val) {
        this.self.delivery_method = val;
        return this;
      },
      invoice_number: function (val) {
        this.self.invoice_number = val;
        return this;
      },
      title: function (val) {
        this.self.title = val;
        return this;
      },
      description: function (val) {
        this.self.description = val;
        return this;
      },
      scheduled_at: function (val) {
        this.self.scheduled_at = val;
        return this;
      },
      accepted_payment_methods: function (val) {
        this.self.accepted_payment_methods = val;
        return this;
      },
      custom_fields: function (val) {
        this.self.custom_fields = val;
        return this;
      },
      sale_or_service_date: function (val) {
        this.self.sale_or_service_date = val;
        return this;
      },
      payment_conditions: function (val) {
        this.self.payment_conditions = val;
        return this;
      },
    };
  }
}

module.exports = Invoice_Object;

const {
  arrayify,
  shazam_max_length,
  shazam_max_length_array,
  shazam_time_RFC3339,
  shazam_date_human_readable,
  shazam_integer,
} = require("./utilities");
const man =
  "creates a compliant Square invoice object. Follows standard Pie syntax.\n" +
  "\nhttps://developer.squareup.com/reference/square/objects/Invoice";

/** @class Invoice_Object  representing an invoice
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/objects/Invoice | Square Docs}
 * @example
 * */
class Invoice_Object {
  _display_name = "Invoice_Object";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;

  constructor() {
    this._fardel = {
      version: undefined, // int32
      location_id: undefined, // 255
      order_id: undefined, // 255 REQUIRED when creating
      primary_recipient: undefined, //{customer_id}
      payment_requests: undefined, // []
      delivery_method: undefined, //str  ENUM
      invoice_number: undefined, //str  191
      title: undefined, //str 255
      description: undefined, //str 65536
      scheduled_at: undefined, //RFC3339
      accepted_payment_methods: undefined,
      custom_fields: undefined, //[] - subscription only
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
  get conditions_de_paiement() {
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
  // https://developer.squareup.com/docs/invoices-api/overview#payment-requests
  set payment_requests(payment_request_object) {
    arrayify(this._fardel, "payment_requests", this._display_name);
    this._fardel.payment_requests.push(payment_request_object);
  }
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
        this.configuration.maximums.title,
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
        this.configuration.maximums.description,
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
  // do not use unless you have a fully formed accepted_payment_methods object
  set accepted_payment_methods(obj) {
    this._fardel.accepted_payment_methods = obj;
  }

  set custom_fields(custom_field) {
    arrayify(this._fardel, "custom_fields", this._display_name);
    if (
      shazam_max_length_array(
        this.configuration.maximums.custom_fields,
        this._fardel.custom_fields,
        this._display_name,
        "custom_fields"
      )
    ) {
      this._fardel.custom_fields.push(custom_field);
    }
  }
  set sale_or_service_date(YYYYMMDD) {
    if (
      shazam_date_human_readable(
        YYYYMMDD,
        this._display_name,
        "sale_or_service_date"
      )
    ) {
      this._fardel.sale_or_service_date = YYYYMMDD;
    }
  }

  set payment_conditions(str) {
    if (
      shazam_max_length(
        this.configuration.maximums.payment_conditions,
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
        this.configuration.maximums.payment_conditions,
        chaine,
        this._display_name,
        "conditions_de_paiement"
      )
    ) {
      this._fardel.payment_conditions = chaine;
    }
  }

  // PRIVATE METHODS

  #define_accepted_payment_methods() {
    if (this.accepted_payment_methods === undefined) {
      this._fardel.accepted_payment_methods = {
        bank_account: false,
        card: false,
        square_gift_card: false,
      };
    }
  }

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
      true: function () {
        this.self._fardel.accepted_payment_methods[property_name] = true;
        return this;
      },
      false: function () {
        this.self._fardel.accepted_payment_methods[property_name] = false;
        return this;
      },
      yes: function () {
        return this.true();
      },
      no: function () {
        return this.false();
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
  make_custom_field() {
    let limit = this.configuration.maximums;
    let name = this._display_name;
    let caller = "make_custom_field";
    let field = {
      label: undefined, // str 30
      placement: "ABOVE_LINE_ITEMS",
      value: undefined, // str 20000
    };

    return {
      self: this,
      add: function () {
        this.self.custom_fields = field;
      },
      label: function (str) {
        if (shazam_max_length(limit.custom_fields_label, str, name, caller)) {
          field.label = str;
        }
        return this;
      },
      value: function (str) {
        if (shazam_max_length(limit.custom_fields_value, str, name, caller)) {
          field.value = str;
        }
        return this;
      },
      below: function () {
        field.placement = "BELOW_LINE_ITEMS";
        return this;
      },
      above: function () {
        field.placement = "ABOVE_LINE_ITEMS";
        return this;
      },
    };
  }

  // MAKER METHODS
  make() {
    return {
      self: this,
      version: function (int) {
        this.self.version = int;
        return this;
      },
      location_id: function (id) {
        this.self.location_id = id;
        return this;
      },
      order_id: function (id) {
        this.self.order_id = id;
        return this;
      },
      primary_recipient: function (customer_id) {
        this.self.primary_recipient = customer_id;
        return this;
      },
      payment_requests: function (payment_request_object) {
        this.self.payment_requests = payment_request_object;
        return this;
      },
      /** @method make.delivery_method   method of Invoice_Object
       * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
       * @example
       *
       * myVar.make().delivery_method().email()
       * myVar.make().delivery_method().share_manually()
       * myVar.make().delivery_method().manually() - alias of share_manually
       * */
      delivery_method: function () {
        return this.self.#delivery_method_enum();
      },
      invoice_number: function (inv_num) {
        this.self.invoice_number = inv_num;
        return this;
      },
      title: function (str255) {
        this.self.title = str255;
        return this;
      },
      description: function (str65536) {
        this.self.description = str65536;
        return this;
      },
      scheduled_at: function (time) {
        this.self.scheduled_at = time;
        return this;
      },

      /** @method make.accepted_payment_methods   method of Invoice_Object
       * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
       * @example
       *
       * myVar.make().accepted_payment_methods()[property you want to set].yes() => true
       * myVar.make().accepted_payment_methods()[property you want to set].no() => false
       *  Properties to choose from:
       *  - bank_account
       *  - card
       *  - square_gift_card
       * */
      accepted_payment_methods: function () {
        this.self.#define_accepted_payment_methods();
        return this.self.#build_accepted_payment_methods();
      },
      /** @method make.custom_fields    method of Invoice_Object
       * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
       * @example
       * Note: You can only have TWO custom fields per invoice, you must be subscribed to
       * Square's Invoices Plus subscription.
       *
       * Note: Thou mustest call .add() as the last step else all shalt hath been for naught...
       *
       * Note: Every time you call custom_fields it starts over with an empty object, so either do it
       * all with one chain or set a variable.
       *
       *  One chain:
       *  myVar.make().custom_fields().label("coffee").value("decaf is evil").placement().above().add()
       *
       *  Setting a variable:
       *  let custom =  myVar.make().custom_fields();
       *  custom.label("coffee").value("decaf is evil")
       *  custom.above()
       *  custom.add() <- this adds the object to the array, if you don't do this, then it doesn't get saved.
       *
       *  Methods you can call:
       *  .label(string) - 30 char max - REQUIRED
       *  .value(sring) - 2,000 char max - optional
       *  .above() - sets placement to: "ABOVE_LINE_ITEMS" - no need to call this if you want the default
       *  .below() - sets placement to: "BELOW_LINE_ITEMS"
       *  .add() - MUST BE CALLED LAST - calls the setter to push the custom fields item to the
       *  custom_fields array
       * */
      custom_fields: function () {
        return this.self.make_custom_field();
      },
      /** @method make.sale_or_service_date()    method of Invoice_Object
       * @param {date} The date of the transaction.  YYY-MM-DD format. Is displayed on invoice.
       * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
       * @example
       *
       * myVar.make().sale_or_service_date(1945-05-08)
       *
       * */
      sale_or_service_date: function (YYYYMMDD) {
        this.self.sale_or_service_date = YYYYMMDD;
        return this;
      },

      /** @method make.conditions_de_paiement()    la France seulement methode de Invoice_Object
       * @param {string} str2000   un chaine de moins de 2,001 caracteres
       * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
       * @example
       *
       * myVar.make().conditions_de_paiement("payer en liquide")
       * */
      conditions_de_paiement: function (str2000) {
        this.self.payment_conditions = str2000;
        return this;
      },
      /** @method make.payment_conditions()    France Only method of Invoice_Object
       * @param {string} str2000   a string of up to 2,000 characters
       * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
       * @example
       *
       * myVar.make().payment_conditions("cash only")
       * */

      payment_conditions: function (str2000) {
        return this.conditions_de_paiement(str2000);
      },
    };
  }
}

module.exports = Invoice_Object;

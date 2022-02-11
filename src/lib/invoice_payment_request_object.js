const {
  arrayify,
  shazam_is_boolean,
  arche_money,
  shazam_date_human_readable,
  shazam_is_integer,
  shazam_number_between_equals,
  shazam_max_length,
} = require("./utilities");
const man =
  "creats a Payment Request OBJECT. This is NOT a 'http-request' class.\n" +
  "tipping: if tipping is enabled request_type must be BALANCE or INSTALLMENT\n" +
  "percentage_requested: You cannot specify percentage_requested when the payment request_type is BALANCE or\n" +
  "when the payment request specifies the fixed_amount_requested_money field.\n" +
  "\nhttps://developer.squareup.com/reference/square/objects/InvoicePaymentRequest";

/** @class Invoice_Payment_Request_Object representing a payment request for an invoice
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/objects/InvoicePaymentRequest | Square Docs}
 * @example
 *
 *  const myVar = new Generic_Object()
 *
 *  myVar.fardel => pass this to a request class to send your data
 *
 * */

class Invoice_Payment_Request_Object {
  _display_name = "Invoice_Payment_Request_Object";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;

  constructor() {
    this._fardel = {
      uid: undefined, //generated by Square
      request_type: undefined, // str ENUM BALANCE, DEPOSIT, [INSTALLMENT (subscription only value)]
      due_date: undefined, // str  YYYY-MM-DD //
      fixed_amount_requested_money: undefined, // ARCHE MONEY
      percentage_requested: undefined, // str - SPECIAL see DOCS // todo in fardel getter
      tipping_enabled: undefined, // boolean - SPECIAL //todo in fardel getter
      automatic_payment_source: undefined, // str ENUM
      card_id: undefined, // str Square generated ID
      reminder: undefined, // [{}, ...] complex //
    };

    this.configuration = {
      maximums: {
        relative_scheduled_days: 32767, // +-
        pie_relative_scheduled_days: 365, // +-
        message: 1000,
      },
    };
  }

  // GETTERS
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
    // enforce Square's rules on tipping_enabled
    if (this._fardel.tipping_enabled === true) {
      if (
        this._fardel.request_type !== "BALANCE" ||
        this._fardel.request_type !== "INSTALLMENT"
      ) {
        let message =
          "When enable_tipping is set to true, request_type must be set to either BALANCE or INSTALLMENT.";
        throw new Error(message);
      }
    }
    // enforce Square's rules on percentage_requested
    if (this._fardel.percentage_requested !== undefined) {
      let prefix = "It is not allowed to specify percentage_requested when ";
      if (this._fardel.request_type === "BALANCE") {
        let message = prefix + "the payment request_type is BALANCE.";
        throw new Error(message);
      } else if (this._fardel.fixed_amount_requested_money !== undefined) {
        let message =
          prefix + "also specifying the fixed_amount_requested_money field.";
        throw new Error(message);
      }
    }
    return this._fardel;
  }

  // FARDEL GETTERS
  get uid() {
    return this._fardel.uid;
  }
  get request_type() {
    return this._fardel.request_type;
  }
  get due_date() {
    return this._fardel.due_date;
  }
  get fixed_amount_requested_money() {
    return this._fardel.fixed_amount_requested_money;
  }

  get percentage_requested() {
    return this._fardel.percentage_requested;
  }
  get tipping_enabled() {
    return this._fardel.tipping_enabled;
  }
  get automatic_payment_source() {
    return this._fardel.automatic_payment_source;
  }
  get card_id() {
    return this._fardel.card_id;
  }
  get reminder() {
    return this._fardel.reminder;
  }

  // SETTERS
  set uid(id) {
    this._fardel.uid = id;
  }
  set request_type(val) {
    this._fardel.request_type = val;
  }
  set due_date(YYYMMDD) {
    if (shazam_date_human_readable(YYYMMDD, this._display_name, "due_date")) {
      this._fardel.due_date = YYYMMDD;
    }
  }
  set fixed_amount_requested_money(val) {
    this._fardel.fixed_amount_requested_money = val;
  }
  set percentage_requested(percent) {
    this._fardel.percentage_requested = percent;
  }
  set tipping_enabled(bool) {
    if (shazam_is_boolean(bool, this._display_name, "tipping_enabled")) {
      this._fardel.tipping_enabled = bool;
    }
  }
  set automatic_payment_source(val) {
    this._fardel.automatic_payment_source = val;
  }
  set card_id(id) {
    this._fardel.card_id = id;
  }
  set reminder(obj) {
    arrayify(this._fardel, "reminder", this._display_name);
    this._fardel.reminder.push(obj);
  }

  // PRIVATE ENUM METHODS
  /** @function #request_type_enum()
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   * @private
   * @param {object} calling_this - pass in the calling function's 'this'
   * @method balance sets value to "BALANCE"
   * @method deposit sets value to "DEPOSIT"
   * @method installment sets value to "INSTALLMENT"
   
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/enums/InvoiceRequestType | Square Docs}
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */
  #request_type_enum(calling_this) {
    return {
      self: this,
      balance: function () {
        this.self.request_type = "BALANCE";
        return calling_this;
      },
      deposit: function () {
        this.self.request_type = "DEPOSIT";
        return calling_this;
      },
      installment: function () {
        this.self.request_type = "INSTALLMENT";
        return calling_this;
      },
    };
  }

  /** @function
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   * @private
   * @param {object} calling_this - pass in the calling function's 'this'
   * @method none  sets value to "NONE"
   * @method card  sets value to "CARD_ON_FILE"
   * @method bank sets value to "BANK_ON_FILE"
   
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/enums/InvoiceAutomaticPaymentSource | Square Docs}
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */
  #automatic_payment_source_enum(calling_this) {
    return {
      self: this,
      none: function () {
        this.self.automatic_payment_source = "NONE";
        return calling_this;
      },
      card: function () {
        this.self.automatic_payment_source = "CARD_ON_FILE";
        return calling_this;
      },
      bank: function () {
        this.self.automatic_payment_source = "BANK_ON_FILE";
        return calling_this;
      },
    };
  }

  /** @method #build_reminder - creates a Square compliant reminder object. Square allows reminders to be sent as much as
   * EIGHTY NINE YEARS, before or after a payment is due. Square Pie finds this, ummm, impractical...
   *
   * Square-Pie limits the days to plus or minus 365. There is a third argument which is NOT limited. If you really want
   * to have square send a reminder 89 years before or after a payment is due, this is the one to use. The third argument
   * completely overrides the second. If you pass a number as the third argument, whatever you passed as the second argument
   * will be ignored.
   * @private
   * @param {string}  message The reminder message - 1,000 char max
   * @param {int32}  days - Max: +-365 - The number of days before (negative number)  or after (positive number) the reminder is sent.
   * @param {int32}  whoa_nelly - Slow down thar! If you need less than one year, use 'days' and leave this field empty. Max:  +-32,767 The number of days before (negative number)  or after (positive number) the reminder is sent. If whoa_nelly is specified, the 'days' argument is ignored.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link  https://developer.squareup.com/reference/square/objects/InvoicePaymentReminder | Square Docs}
   * */

  #build_reminder(message, days, whoa_nelly) {
    let send_delay = days;
    let name = this._display_name;
    let caller = "#build_reminder";
    let limits = this.configuration.maximums;
    let schedule_limit =
      this.configuration.maximums.pie_relative_scheduled_days;

    if (
      whoa_nelly !== undefined &&
      shazam_is_integer(whoa_nelly, name, caller)
    ) {
      send_delay = whoa_nelly;
      schedule_limit = this.configuration.maximums.relative_scheduled_days;
    }
    // if message is less than limit and send_delay shazams an integer and  if send_delay is within bounds
    if (
      shazam_max_length(message, limits.message, name, caller) &&
      shazam_is_integer(send_delay, name, caller) &&
      shazam_number_between_equals(
        -schedule_limit,
        schedule_limit,
        send_delay,
        name,
        caller
      )
    ) {
      // if ALL of the above,
      return {
        message: message,
        relative_scheduled_days: send_delay,
      };
    }
  }

  // MAKER METHODS
  /** @function make()  method of Invoice_Payment_Request_Object - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method uid
   *@param {string} id - The Square-generated ID
   * @method request_type - enumerated - calls #request_type_enum()
   * @method due_date
   * @param {string} YYYYMMDD -
   * @method fixed_amount_requested_money - Standard compliant money object builder.
   * @param {number} amount - an integer. The price in the smallest currency designation. Usually cents.
   * @param {string} currency - Three letter currency designation. Enforces ISO 4217 format. Case insensitive.
   * @method percentage_requested - You cannot specify percentage_requested when the payment request_type is BALANCE or
   * when the payment request specifies the fixed_amount_requested_money field
   * @param {number}  percent
   * @method tipping_enabled - This field is allowed only on the final payment request and the payment request_type must
   *  be BALANCE or INSTALLMENT. If set to true, the Square-hosted invoice page (the public_url field
   *  of the invoice) provides a place for the customer to pay a tip.
   * @param {boolean} bool
   * @method automatic_payment_source - enumerated - shortened names. Calls #automatic_payment_source_enum().
   * @method card_id
   * @param {string} id -
   * @method reminder
   * @param {string}  message The reminder message - 1,000 char max
   * @param {int32}  days - Max: +-365 - The number of days before (negative number)  or after (positive number) the reminder is sent.
   * @param {int32}  whoa_nelly - Slow down thar! If you need less than one year, use 'days' and leave this field empty. Max:  +-32,767 The number of days before (negative number)  or after (positive number) the reminder is sent. If whoa_nelly is specified, the 'days' argument is ignored.
   
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *
   * */
  make() {
    return {
      self: this,
      uid: function (id) {
        this.self.uid = id;
        return this;
      },
      request_type: function () {
        return this.self.#request_type_enum(this);
      },
      due_date: function (YYYMMDD) {
        this.self.due_date = YYYMMDD;
        return this;
      },
      fixed_amount_requested_money: function (amount, currency) {
        this.self.fixed_amount_requested_money = arche_money(amount, currency);
        return this;
      },
      percentage_requested: function (percent) {
        this.self.percentage_requested = percent;
        return this;
      },
      tipping_enabled: function (bool) {
        this.self.tipping_enabled = bool;
        return this;
      },
      automatic_payment_source: function () {
        return this.self.#automatic_payment_source_enum(this);
      },
      card_id: function (id) {
        this.self.card_id = id;
        return this;
      },
      reminder: function (message, days, whoa_nelly) {
        let obj = this.self.#build_reminder(message, days, whoa_nelly);
        this.self.reminder = obj;
        return this;
      },
    };
  }
}

module.exports = Invoice_Payment_Request_Object;

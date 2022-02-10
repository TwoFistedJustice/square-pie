const {
  shazam_max_length,
  normalize_email,
  shazam_is_time_RFC3339,
  shazam_is_integer,
  shazam_is_boolean,
} = require("./utilities");

const man =
  "creates a compliant customer object for sending to Square. Can be used to create a new record,\n" +
  "or update an existing one. Follows standard Pie syntax. Use make(). to set values." +
  "\nhttps://developer.squareup.com/reference/square/objects/Customer";

/** @class Customer_Object
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/objects/Customer | Square Docs}
 * @example
 * */

class Customer_Object {
  _display_name = "Customer_Object";
  _last_verified_square_api_version = "2021-11-17";
  _help = this.display_name + ": " + man;
  constructor() {
    this._fardel = {
      id: undefined,
      given_name: undefined,
      family_name: undefined,
      company_name: undefined,
      nickname: undefined,
      email_address: undefined,
      phone_number: undefined, //str 11
      address: undefined, // archetype
      birthday: undefined, //  RFC 3339
      reference_id: undefined,
      note: undefined,
      version: undefined, // int64
      creation_source: undefined, // ENUM
      preferences: undefined, // {boolean} // Square defaults this to `false` even if you tell it not to.
      tax_ids: undefined, // {str20}
    };
    this.configuration = {
      maximums: {
        phone_number: 11,
        tax_ids: 20,
      },
    };
  }
  // ENUMS
  /**
   *  @private
   *  Sets fixed string values on fardel.creation_source
   */
  #enum_creation_source(calling_this) {
    return {
      self: this,
      other: function () {
        this.self.creation_source = "OTHER";
        return calling_this;
      },
      appointments: function () {
        this.self.creation_source = "APPOINTMENTS";
        return calling_this;
      },
      coupon: function () {
        this.self.creation_source = "COUPON";
        return calling_this;
      },
      deletion_recovery: function () {
        this.self.creation_source = "DELETION_RECOVERY";
        return calling_this;
      },
      directory: function () {
        this.self.creation_source = "DIRECTORY";
        return calling_this;
      },
      egifting: function () {
        this.self.creation_source = "EGIFTING";
        return calling_this;
      },
      email_collection: function () {
        this.self.creation_source = "EMAIL_COLLECTION";
        return calling_this;
      },
      feedback: function () {
        this.self.creation_source = "FEEDBACK";
        return calling_this;
      },
      import: function () {
        this.self.creation_source = "IMPORT";
        return this;
      },
      invoices: function () {
        this.self.creation_source = "INVOICES";
        return calling_this;
      },
      loyalty: function () {
        this.self.creation_source = "LOYALTY";
        return calling_this;
      },
      marketing: function () {
        this.self.creation_source = "MARKETING";
        return calling_this;
      },
      merge: function () {
        this.self.creation_source = "MERGE";
        return calling_this;
      },
      online_store: function () {
        this.self.creation_source = "ONLINE_STORE";
        return calling_this;
      },
      instant_profile: function () {
        this.self.creation_source = "INSTANT_PROFILE";
        return calling_this;
      },
      terminal: function () {
        this.self.creation_source = "TERMINAL";
        return calling_this;
      },
      third_party: function () {
        this.self.creation_source = "THIRD_PARTY";
        return calling_this;
      },
      third_party_import: function () {
        this.self.creation_source = "THIRD_PARTY_IMPORT";
        return calling_this;
      },
      unmerge_recovery: function () {
        this.self.creation_source = "UNMERGE_RECOVERY";
        return calling_this;
      },
      appt: function () {
        return this.appointments();
      },
      unmerge: function () {
        return this.unmerge_recovery();
      },
      undelete: function () {
        return this.deletion_recovery();
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
    return this._fardel;
  }
  get id() {
    return this._fardel.id;
  }
  get given_name() {
    return this._fardel.given_name;
  }
  get family_name() {
    return this._fardel.family_name;
  }
  get company_name() {
    return this._fardel.company_name;
  }
  get nickname() {
    return this._fardel.nickname;
  }
  get email_address() {
    return this._fardel.email_address;
  }
  get phone_number() {
    return this._fardel.phone_number;
  }
  get address() {
    return this._fardel.address;
  }
  get birthday() {
    return this._fardel.birthday;
  }
  get reference_id() {
    return this._fardel.reference_id;
  }
  get note() {
    return this._fardel.note;
  }
  get version() {
    return this._fardel.version;
  }
  get creation_source() {
    return this._fardel.creation_source;
  }
  get preferences() {
    return this._fardel.preferences;
  }
  get tax_ids() {
    return this._fardel.tax_ids;
  } // {str20}

  // SETTERS

  set id(val) {
    this._fardel.id = val;
  }
  set given_name(val) {
    this._fardel.given_name = val;
  }
  set family_name(val) {
    this._fardel.family_name = val;
  }
  set company_name(val) {
    this._fardel.company_name = val;
  }
  set nickname(val) {
    this._fardel.nickname = val;
  }
  set email_address(email) {
    let caller = "email_address";
    let shazam = normalize_email(email, this.display_name, caller);
    this._fardel.email_address = shazam;
  }
  set phone_number(phone) {
    if (
      shazam_max_length(
        this.configuration.maximums.phone_number,
        phone,
        this.display_name,
        "phone_number"
      )
    )
      this._fardel.phone_number = phone;
  }
  set address(val) {
    this._fardel.address = val;
  }
  set birthday(time) {
    if (shazam_is_time_RFC3339(time, this._display_name, "birthday")) {
      this._fardel.birthday = time;
    }
  }
  set reference_id(val) {
    this._fardel.reference_id = val;
  }
  set note(val) {
    this._fardel.note = val;
  }
  set version(int) {
    if (shazam_is_integer(int, this.display_name, "version")) {
      this._fardel.version = int;
    }
  }
  set creation_source(val) {
    this._fardel.creation_source = val;
  }
  set preferences(bool) {
    if (shazam_is_boolean(bool, this.display_name, "preferences")) {
      this._fardel.preferences = {
        email_unsubscribed: bool,
      };
    }
  }

  set tax_ids(id) {
    if (
      shazam_max_length(
        this.configuration.maximums.tax_ids,
        id,
        this.display_name,
        "tax_ids"
      )
    ) {
      this._fardel.tax_ids = {
        eu_vat: id,
      };
    }
  }

  // MAKE METHODS
  /** @function make()  method of Customer_Object - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method id
   * @param {string} val -
   * @method given_name
   * @param {string} val -
   * @method family_name
   * @param {string} val -
   * @method company_name
   * @param {string} val -
   * @method nickname
   * @param {string} val -
   * @method email_address
   * @param {string} val -expects a valid email address
   * @throws Throws an error if email is not valid
   * @method phone_number
   * @param {string} val -should be a phone number of no more than 11 characters
   * @throws Throws an error is `phone` is longer than 11 characters
   * @method address
   * @param {object} val - an Address Object
   * @method birthday
   * @param {string} val -  time a date in RFC3339 format
   * @throws Error Will throw and error if argument is not a valid RFC3339 date code
   * @method reference_id
   * @param {string} val -
   * @method note
   * @param {string} val -
   * @method version
   * @param {string} val -  int a string that can be coerced to integer
   * @throws Will throw and error if argument  cannot be coerced to integer
   * @method creation_source - enumerated
   * {@link https://developer.squareup.com/reference/square/enums/CustomerCreationSource | Square Docs}
   * @method preferences
   * @param {bool} bool -
   * @method tax_ids
   * @param {string} eu_vat -a European Union VAT ID of no more than 20 characters
   * @throws throws an error if the length is greater than 20
   * @method first_name
   * @param {string} val -
   * @method last_name
   * @param {string} val -
   * @method company
   * @param {string} val -
   * @method email
   * @param {string} val -
   * @method phone
   * @param {string} val -
   * @method
   * @param {string} val -
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
      id: function (val) {
        this.self.id = val;
        return this;
      },
      given_name: function (val) {
        this.self.given_name = val;
        return this;
      },
      family_name: function (val) {
        this.self.family_name = val;
        return this;
      },
      company_name: function (val) {
        this.self.company_name = val;
        return this;
      },
      nickname: function (val) {
        this.self.nickname = val;
        return this;
      },
      email_address: function (val) {
        this.self.email_address = val;
        return this;
      },
      phone_number: function (val) {
        this.self.phone_number = val;
        return this;
      },
      address: function (val) {
        this.self.address = val;
        return this;
      },
      birthday: function (val) {
        this.self.birthday = val;
        return this;
      },
      reference_id: function (val) {
        this.self.reference_id = val;
        return this;
      },
      note: function (val) {
        this.self.note = val;
        return this;
      },
      version: function (val) {
        this.self.version = val;
        return this;
      },
      /**
       *
       * Returns a set of curried functions that set the value of creation_source such that the name
       * of the function is the lowercase analog of the value set.
       * @see this.#enum_creation_source()
       * */
      creation_source: function () {
        return this.self.#enum_creation_source(this);
      },
      preferences: function (bool) {
        this.self.preferences = bool;
        return this;
      },
      tax_ids: function (eu_vat) {
        this.self.tax_ids = eu_vat;
        return this;
      },
      first_name: function (val) {
        this.given_name(val);
        return this;
      },
      last_name: function (val) {
        this.family_name(val);
        return this;
      },
      company: function (val) {
        this.company_name(val);
        return this;
      },
      email: function (val) {
        this.email_address(val);
        return this;
      },
      phone: function (val) {
        this.phone_number(val);
        return this;
      },
    };
  }
}

module.exports = Customer_Object;

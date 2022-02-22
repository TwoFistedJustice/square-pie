const {
  shazam_max_length,
  normalize_email,
  shazam_is_time_RFC3339,
  shazam_is_integer,
  shazam_is_boolean,
} = require("./utilities");

const man =
  "creates a compliant customer object for sending to Square. Can be used to create a new record,\n" +
  "or update an existing one. Follows standard Pie syntax. Use make(). to set values.\n" +
  "https://developer.squareup.com/reference/square/objects/Customer";

/**
 * {@link https://developer.squareup.com/reference/square/objects/Customer |  **-------> Link To Square Docs <-------**}
 * @class Customer_Object
 * @classdesc
 * Creates a compliant customer object for sending to Square. Can be used to create a new record or update an existing one.
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

  set id(id) {
    this._fardel.id = id;
  }
  set given_name(first_name) {
    this._fardel.given_name = first_name;
  }
  set family_name(last_name) {
    this._fardel.family_name = last_name;
  }
  set company_name(company) {
    this._fardel.company_name = company;
  }
  set nickname(nick) {
    this._fardel.nickname = nick;
  }
  set email_address(email) {
    let caller = "email_address";
    let shazam = normalize_email(email, this.display_name, caller);
    this._fardel.email_address = shazam;
  }
  set phone_number(phone) {
    if (
      shazam_max_length(
        phone,
        this.configuration.maximums.phone_number,
        this.display_name,
        "phone_number"
      )
    )
      this._fardel.phone_number = phone;
  }
  set address(address_object) {
    this._fardel.address = address_object;
  }
  set birthday(time) {
    if (shazam_is_time_RFC3339(time, this._display_name, "birthday")) {
      this._fardel.birthday = time;
    }
  }
  set reference_id(id) {
    this._fardel.reference_id = id;
  }
  set note(note) {
    this._fardel.note = note;
  }
  set version(int) {
    if (shazam_is_integer(int, this.display_name, "version")) {
      this._fardel.version = int;
    }
  }
  set creation_source(source) {
    this._fardel.creation_source = source;
  }
  set preferences(bool) {
    if (shazam_is_boolean(bool, this.display_name, "preferences")) {
      this._fardel.preferences = {
        email_unsubscribed: bool,
      };
    }
  }

  set tax_ids(eu_vat) {
    if (
      shazam_max_length(
        eu_vat,
        this.configuration.maximums.tax_ids,
        this.display_name,
        "tax_ids"
      )
    ) {
      this._fardel.tax_ids = {
        eu_vat: eu_vat,
      };
    }
  }
  // ENUMS

  /** * {@link https://developer.squareup.com/reference/square/enums/CustomerCreationSource | Link To Square Docs}
   *
   *  #enum_creation_source
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   *  @typedef {function} Customer_Object.enum_creation_source
   * @private
   * @abstract
   * @memberOf Customer_Object
   * @property other() sets value to "OTHER"
   * @property appointments() sets value to "APPOINTMENTS"
   * @property coupon() sets value to "COUPON"
   * @property deletion_recovery() sets value to "DELETION_RECOVERY"
   * @property directory() sets value to "DIRECTORY"
   * @property egifting() sets value to "EGIFTING"
   * @property email_collection() sets value to "EMAIL_COLLECTION"
   * @property feedback() sets value to "FEEDBACK"
   * @property import() sets value to "IMPORT"
   * @property invoices() sets value to "INVOICES"
   * @property loyalty() sets value to "LOYALTY"
   * @property marketing() sets value to "MARKETING"
   * @property merge() sets value to "MERGE"
   * @property online_store() sets value to "ONLINE_STORE"
   * @property instant_profile() sets value to "INSTANT_PROFILE"
   * @property terminal() sets value to "TERMINAL"
   * @property third_party() sets value to "THIRD_PARTY"
   * @property third_party_import() sets value to "THIRD_PARTY_IMPORT"
   * @property unmerge_recovery() sets value to "UNMERGE_RECOVERY"
   * @property appt() alias of `appointments`
   * @property unmerge() alias of `unmerge_recovery`
   * @property undelete() alias of `deletion_recovery`
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */

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
  // MAKE METHODS
  /**
   *  make() method of Customer_Object
   *  Make sure to have the Square Docs open in front of you.
   * Sub-Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   *
   * You should read the generated docs as:
   *     method_name(arg) {type} description of arg
   *
   * @typedef {function} Customer_Object.make
   * @method
   * @public
   * @memberOf Customer_Object
   * @property id(id) {string} -
   * @property given_name(first_name) {string} -
   * @property family_name(last_name) {string} -
   * @property company_name(company) {string} -
   * @property nickname(nick) {string} -
   * @property email_address(email) {string} -
   * @property phone_number(phone) {string} - should be a phone number of no more than 11 characters
   * @property address(address_object) {object} - an Address Object
   * @property birthday(time) {string} - a date in RFC3339 format
   * @property reference_id(id) {string} -
   * @property note(note) {string}
   * @property version(int) {integer}
   * @property creation_source() {Enumerated} -
   * @property preferences() {string}
   * @property tax_ids(eu_vat) {string} - a European Union VAT ID of no more than 20 characters
   * @property first_name(first_name) {string} - alias of `given_name`
   * @property last_name(last_name) {string} - alias of `family_name`
   * @property company(company) {string} - alias of `company_name`
   * @property email(email) {string} - alias of `email_address`
   * @property phone(phone) {string} - alias of `phone_number`
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *    //is the same as
   *   myVar.make().gizmo().gremlin()
   * */

  make() {
    return {
      self: this,
      id: function (id) {
        this.self.id = id;
        return this;
      },
      given_name: function (first_name) {
        this.self.given_name = first_name;
        return this;
      },
      family_name: function (last_name) {
        this.self.family_name = last_name;
        return this;
      },
      company_name: function (company) {
        this.self.company_name = company;
        return this;
      },
      nickname: function (nick) {
        this.self.nickname = nick;
        return this;
      },
      email_address: function (email) {
        this.self.email_address = email;
        return this;
      },
      phone_number: function (phone) {
        this.self.phone_number = phone;
        return this;
      },
      address: function (address_object) {
        this.self.address = address_object;
        return this;
      },
      birthday: function (time) {
        this.self.birthday = time;
        return this;
      },
      reference_id: function (id) {
        this.self.reference_id = id;
        return this;
      },
      note: function (note) {
        this.self.note = note;
        return this;
      },
      version: function (int) {
        this.self.version = int;
        return this;
      },
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
      first_name: function (first_name) {
        return this.given_name(first_name);
      },
      last_name: function (last_name) {
        return this.family_name(last_name);
      },
      company: function (company) {
        return this.company_name(company);
      },
      email: function (email) {
        return this.email_address(email);
      },
      phone: function (phone) {
        return this.phone_number(phone);
      },
    };
  }
}

module.exports = Customer_Object;

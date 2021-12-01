const {
  maxLength,
  normalize_email,
  shazam_RFC3339,
  shazam_integer,
  shazam_boolean,
} = require("./utilities");

/** @class Customer_Object representing a Customer
 *  @author: Russ Bain
 * */
class Customer_Object {
  _displayName = "Customer_Object"; //todo test
  /**
   * Creates an instance of a customer
   *  */
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
  #enum_creation_source() {
    return {
      self: this,
      other: function () {
        this.self.creation_source = "OTHER";
        return this;
      },
      appointments: function () {
        this.self.creation_source = "APPOINTMENTS";
        return this;
      },
      coupon: function () {
        this.self.creation_source = "COUPON";
        return this;
      },
      deletion_recovery: function () {
        this.self.creation_source = "DELETION_RECOVERY";
        return this;
      },
      directory: function () {
        this.self.creation_source = "DIRECTORY";
        return this;
      },
      egifting: function () {
        this.self.creation_source = "EGIFTING";
        return this;
      },
      email_collection: function () {
        this.self.creation_source = "EMAIL_COLLECTION";
        return this;
      },
      feedback: function () {
        this.self.creation_source = "FEEDBACK";
        return this;
      },
      import: function () {
        this.self.creation_source = "IMPORT";
        return this;
      },
      invoices: function () {
        this.self.creation_source = "INVOICES";
        return this;
      },
      loyalty: function () {
        this.self.creation_source = "LOYALTY";
        return this;
      },
      marketing: function () {
        this.self.creation_source = "MARKETING";
        return this;
      },
      merge: function () {
        this.self.creation_source = "MERGE";
        return this;
      },
      online_store: function () {
        this.self.creation_source = "ONLINE_STORE";
        return this;
      },
      instant_profile: function () {
        this.self.creation_source = "INSTANT_PROFILE";
        return this;
      },
      terminal: function () {
        this.self.creation_source = "TERMINAL";
        return this;
      },
      third_party: function () {
        this.self.creation_source = "THIRD_PARTY";
        return this;
      },
      third_party_import: function () {
        this.self.creation_source = "THIRD_PARTY_IMPORT";
        return this;
      },
      unmerge_recovery: function () {
        this.self.creation_source = "UNMERGE_RECOVERY";
        return this;
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
  get displayName() {
    return this._displayName;
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
  /** sets Customer_Object.email_address
   * @param {string} email expects a valid email address
   * @throws Throws an error if email is not valid
   * */
  set email_address(email) {
    let caller = "email_address";
    let shazam = normalize_email(email, this.displayName, caller);
    this._fardel.email_address = shazam;
  }
  /** sets Customer_Object.phone_number
   * @param {string }phone should be a phone number of no more than 11 characters
   * @throws Throws an error is `phone` is longer than 11 characters
   * */
  set phone_number(phone) {
    if (
      maxLength(
        this.configuration.maximums.phone_number,
        phone,
        this.displayName,
        "phone_number"
      )
    )
      this._fardel.phone_number = phone;
  }
  set address(val) {
    this._fardel.address = val;
  }
  /* sets Customer_Object.birthday
   * @param {string} time a date in RFC3339 format
   * * @throws Will throw and error if argument is not a valid RFC3339 date code
   * */
  set birthday(time) {
    if (shazam_RFC3339(time, this._displayName, "birthday")) {
      this._fardel.birthday = time;
    }
  }
  set reference_id(val) {
    this._fardel.reference_id = val;
  }
  set note(val) {
    this._fardel.note = val;
  }
  /* sets Customer_Object.version
   * @param {string} int a string that can be coerced to integer
   * * @throws Will throw and error if argument  cannot be coerced to integer
   * */
  set version(int) {
    if (shazam_integer(int)) {
      this._fardel.version = int;
    }
  }

  set preferences(bool) {
    if (shazam_boolean(bool, this.displayName, "preferences")) {
      this._fardel.preferences = {
        email_unsubscribed: bool,
      };
    }

    // check if object and property
    // set to object, define property with bool
  }
  /** sets Customer_Object.tax_ids - only for UK, Ireland, et la France. Vive la Republique! Vive Marieanne!
   *
   * @param id - a European Union VAT ID of no more than 20 characters
   * @throws throws an error if the length is greater than 20
   * */
  set tax_ids(id) {
    if (
      maxLength(
        this.configuration.maximums.tax_ids,
        id,
        this.displayName,
        "tax_ids"
      )
    ) {
      this._fardel.tax_ids = {
        eu_vat: id,
      };
    }
  }

  // MAKER METHODS
  /** Standard Square Pie Make method*/
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
        return this.self.#enum_creation_source();
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

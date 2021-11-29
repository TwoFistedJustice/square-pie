const { maxLength, shazam_RFC3339, shazam_integer } = require("./utilities");

// TODO normalize email utility
//    pie defaults for email normalize
/** @class Customer_Object representing a Customer
 *  @author: Russ Bain
 * */
class Customer_Object {
  _displayName = "Customer_Object";
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
      address: undefined, // archtype
      birthday: undefined, //  RFC 3339
      reference_id: undefined,
      note: undefined,
      group_ids: undefined, //[str]
      segment_ids: undefined, //[str]
      version: undefined, // int64
      creation_source: undefined, // ENUM
      preferences: undefined, // {boolean}
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
      // 12 or so
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
  get group_ids() {
    return this._fardel.group_ids;
  }
  get segment_ids() {
    return this._fardel.segment_ids;
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
  set email_address(val) {
    this._fardel.email_address = val;
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
  set group_ids(val) {
    this._fardel.group_ids = val;
  }
  set segment_ids(val) {
    this._fardel.segment_ids = val;
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
      group_ids: function (val) {
        this.self.group_ids = val;
        return this;
      },
      segment_ids: function (val) {
        this.self.segment_ids = val;
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
      preferences: function (val) {
        this.self.preferences = val;
        return this;
      },
      tax_ids: function (val) {
        this.self.tax_ids = val;
        return this;
      },
    };
  }
}

module.exports = Customer_Object;

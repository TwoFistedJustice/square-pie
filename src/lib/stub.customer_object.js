// TODO normalize email utility
//    pie defaults for email normalize

class Customer_object {
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
  }
  // ENUMS
  #enum_creation_source() {
    return {
      self: this,
      // 12 or so
    };
  }
  // GETTERS
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
  set phone_number(val) {
    this._fardel.phone_number = val;
  }
  set address(val) {
    this._fardel.address = val;
  }
  set birthday(val) {
    this._fardel.birthday = val;
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
  set version(val) {
    this._fardel.version = val;
  }

  set preferences(bool) {
    // check if object and property
    // set to object, define property with bool
  }

  set tax_ids(id) {
    // check if object and property
    // set to object, define prop with id
  }

  // MAKER METHODS

  make() {
    return {
      self: this,
      id: function (val) {
        this.id = val;
        return this;
      },
      given_name: function (val) {
        this.given_name = val;
        return this;
      },
      family_name: function (val) {
        this.family_name = val;
        return this;
      },
      company_name: function (val) {
        this.company_name = val;
        return this;
      },
      nickname: function (val) {
        this.nickname = val;
        return this;
      },
      email_address: function (val) {
        this.email_address = val;
        return this;
      },
      phone_number: function (val) {
        this.phone_number = val;
        return this;
      },
      address: function (val) {
        this.address = val;
        return this;
      },
      birthday: function (val) {
        this.birthday = val;
        return this;
      },
      reference_id: function (val) {
        this.reference_id = val;
        return this;
      },
      note: function (val) {
        this.note = val;
        return this;
      },
      group_ids: function (val) {
        this.group_ids = val;
        return this;
      },
      segment_ids: function (val) {
        this.segment_ids = val;
        return this;
      },
      version: function (val) {
        this.version = val;
        return this;
      },
      creation_source: function (val) {
        this.creation_source = val;
        return this;
      },
      preferences: function (val) {
        this.preferences = val;
        return this;
      },
      tax_ids: function (val) {
        this.tax_ids = val;
        return this;
      },
    };
  }
}

module.exports = Customer_object;

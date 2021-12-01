const Retrieve_Update_Delete = require("./customer_request_R_U_D");
const { normalize_email } = require("./utilities");

// change constructor arg to bec customer object and extract id

/** @class Customer_Update representing an http request to update a customer record
 *  @see Retrieve_Update_Delete
 *  @param {customer id} pass the Square id of the customer you want ot update to the class on instantiation
 *  @author Russ Bain
 *  */
class Customer_Update extends Retrieve_Update_Delete {
  _displayName = "Customer_Update"; //todo test
  constructor(id) {
    super(id);
    this._method = "put";
    // the props on _body aren't necessary, at this point they are just here for reference
    // the curly braces are necessary
    // todo- refactor- move into new cusomer object classes as fardel
    this._body = {
      given_name: undefined,
      family_name: undefined,
      company_name: undefined,
      nickname: undefined,
      email_address: undefined,
      address: {
        address_line_1: undefined,
        address_line_2: undefined,
        locality: undefined, // city
        administrative_district_level_1: undefined, // state/province
        postal_code: undefined,
        country: undefined,
      },
      phone_number: undefined,
      reference_id: undefined,
      note: undefined,
      birthday: undefined, // specify this value in YYYY-MM-DD format.
      version: undefined, // Square will automatically increment this on their end when update is made
    };
  }

  //GETTERS
  get displayName() {
    return this._displayName;
  }
  get given_name() {
    return this._body.given_name;
  }
  get family_name() {
    return this._body.family_name;
  }
  get company_name() {
    return this._body.company_name;
  }
  get nickname() {
    return this._body.nickname;
  }
  get email_address() {
    return this._body.email_address;
  }
  get address() {
    return this._body.address;
  }
  get phone_number() {
    return this._body.phone_number;
  }
  get reference_id() {
    return this._body.reference_id;
  }
  get note() {
    return this._body.note;
  }

  get version() {
    return this._body.version;
  }

  // SETTERS
  /** If you already have a compliant customer object you can just call the body setter
   * @param {customer object} add the Customer_Object fardel
   * */
  set body(fardel) {
    this._body = fardel;
  }
  set given_name(val) {
    this._body.given_name = val;
  }
  set family_name(val) {
    this._body.family_name = val;
  }
  set company_name(val) {
    this._body.company_name = val;
  }
  set nickname(val) {
    this._body.nickname = val;
  }
  set email_address(val) {
    this._body.email_address = normalize_email(val);
  }

  //TODO normalize addresses
  // todo archetype address
  set address(preFormattedAddressObject) {
    this._body.address = preFormattedAddressObject;
  }
  set city(city) {
    this._body.address.locality = city;
  }
  set postalCode(val) {
    this.body.address.postal_code = val;
  }

  set state(province) {
    this.body.administrative_district_level_1 = province;
  }

  // TODO provide localized normalizer for phone numbers
  set phone_number(val) {
    this._body.phone_number = val;
  }
  set reference_id(val) {
    this._body.reference_id = val;
  }
  set note(val) {
    this._body.note = val;
  }

  set version(val) {
    this._body.version = val;
  }

  // METHODS
  // allows chaining
  make() {
    return {
      self: this,
      given_name: function (val) {
        this.self.given_name = val;
        return this;
      },
      family_name: function (val) {
        this.self.family_name = val;
        return this;
      },
      company_name: function (val) {
        this.self._body.company_name = val;
        return this;
      },
      nickname: function (val) {
        this.self._body.nickname = val;
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
      note: function (val) {
        this.self.note = val;
        return this;
      },
      //TODO normalize birthday input with dayjs
      birthday: function (val) {
        //specify val in YYYY-MM-DD format.
        this.self._body.birthday = val;
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

module.exports = Customer_Update;

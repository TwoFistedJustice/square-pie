const Retrieve_Update_Delete = require("./customer_request_R_U_D");
const {
  maxLength,
  normalize_email,
  shazam_RFC3339,
  shazam_integer,
} = require("./utilities");

// change constructor arg to bec customer object and extract id

/** @class Customer_Update representing an http request to update a customer record
 * Some fields that are available on Customer_Object are not updatable. This class has its own
 * make() method which omits those fields.
 *
 * You do not need to use the Customer_Object class to send and update. You can. But you don't have to.
 *
 * To use the Customer_Object class simply call the body setter and set it equal to the object.
 *  yourUpdate.body = yourCustomer.fardel
 *
 *  @see Retrieve_Update_Delete
 *  @param {customer id} pass the Square id of the customer you want ot update to the class on instantiation
 *  @author Russ Bain
 *  */
class Customer_Update extends Retrieve_Update_Delete {
  _displayName = "Customer_Update"; //todo test
  constructor(id) {
    super(id);
    this._method = "put";
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
      phone_number: undefined, // str11
      reference_id: undefined,
      note: undefined,
      birthday: undefined, // RFC3339
      version: undefined, // int64 Square will automatically increment this on their end when update is made
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
  get birthday() {
    return this._body.birthday;
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
  /** sets Customer_Update.email_address
   * @param {string} email expects a valid email address
   * @throws Throws an error if email is not valid
   * */
  set email_address(email) {
    let caller = "email_address";
    let shazam = normalize_email(email, this.displayName, caller);
    this._body.email_address = shazam;
  }
  /** sets Customer_Update.phone_number
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
      this._body.phone_number = phone;
  }

  set address(address) {
    this._body.address = address;
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
  /* sets Customer_Update.birthday
   * @param {string} time a date in RFC3339 format
   * * @throws Will throw and error if argument is not a valid RFC3339 date code
   * */
  set birthday(time) {
    if (shazam_RFC3339(time, this._displayName, "birthday")) {
      this._body.birthday = time;
    }
  }

  set reference_id(val) {
    this._body.reference_id = val;
  }
  set note(val) {
    this._body.note = val;
  }
  /* sets Customer_Update.version
   * @param {string} int a string that can be coerced to integer
   * * @throws Will throw and error if argument  cannot be coerced to integer
   * */
  set version(int) {
    if (shazam_integer(int)) {
      this._body.version = int;
    }
  }

  // MAKER METHODS
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
      birthday: function (val) {
        this.self.birthday = val;
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

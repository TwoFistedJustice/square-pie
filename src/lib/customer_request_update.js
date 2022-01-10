const Retrieve_Update_Delete = require("./customer_request_abstract_R_U_D_super");
const {
  define,
  shazam_max_length,
  normalize_email,
  shazam_time_RFC3339,
  shazam_integer,
} = require("./utilities");
const man =
  "updates a Square customer record.\n" +
  "Update a record by sending a sparse customer object containing only the fields you want to update, along with\n" +
  "the current version of the record in Square's db. You can add the sparse object in two ways:\n" +
  "Firstly, you can make one using Customer_Object and pass the fardel as an argument to make().customer(fardel)\n" +
  "or you can build one using the make() method of this class, which works just like the one in Customer_Object.\n" +
  "To add the version, first fetch it from Square, then add it using make().version(version). This is not absolutely\n" +
  "necessary. But is a good idea if there is more than one potential source of updates." +
  "\nhttps://developer.squareup.com/reference/square/customers-api/update-customer";

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
  _display_name = "Customer_Update";
  _last_verified_square_api_version = "2021-12-15";
  _help = this.display_name + ": " + man;
  constructor(id) {
    super(id);
    this._method = "PUT";
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
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get help() {
    return this._help;
  }
  get body() {
    return this._body;
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

  // todo remove some tape layers from mouse button
  set body(fardel) {
    for (let prop in fardel) {
      this._body[prop] = fardel[prop];
    }
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
    let shazam = normalize_email(email, this.display_name, caller);
    this._body.email_address = shazam;
  }
  /** sets Customer_Update.phone_number
   * @param {string }phone should be a phone number of no more than 11 characters
   * @throws Throws an error is `phone` is longer than 11 characters
   * */
  set phone_number(phone) {
    if (
      shazam_max_length(
        this.configuration.maximums.phone_number,
        phone,
        this.display_name,
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
    if (shazam_time_RFC3339(time, this._display_name, "birthday")) {
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
    if (!Object.prototype.hasOwnProperty.call(this._body, "version")) {
      define(this._body, "version");
    }
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
      customer: function (fardel) {
        this.body = fardel;
        return this;
      },
    };
  }
}

module.exports = Customer_Update;
